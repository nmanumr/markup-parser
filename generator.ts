import * as fs from 'fs';
import * as path from 'path';

import * as ts from "typescript";
import * as doctrine from 'doctrine';

const BASE_DIR = './src/functions';
const GITHUB_URL = 'https://github.com/nmanumr/mark-parser/tree/master/';
const TYPE_KIND_MAP = {
    150: 'undefined',
    147: 'string',
    144: 'number',
}
const TYPE_MAP = {
    'IterableIterator': 'IterableIterator',
    'RulesObject': 'Object',
    'T': 'T',
};

const dummyFile = ts.createSourceFile("dummy.ts", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
const declarationFunctions = [];
const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed, removeComments: true});


function getFiles() {
    return fs
        .readdirSync(BASE_DIR)
        .filter((e) => !['index.ts', 'types.ts', 'declarations.ts'].includes(e))
        .map((p) => path.join(BASE_DIR, p));
}

function getLeadingComment(node, source) {
    let comment = "";
    const commentRanges = ts.getLeadingCommentRanges(source.getFullText(), node.getFullStart());
    if (commentRanges?.length) {
        const commentStrings = commentRanges.map(r => source.getFullText().slice(r.pos, r.end));
        comment = commentStrings[commentStrings.length - 1];
    }
    return comment;
}

function parseType(typeNode) {
    if (!typeNode) return;
    if (typeNode.kind === 182) { // Union type
        return typeNode.types.map(t => parseType(t));
    } else if (Object.keys(TYPE_KIND_MAP).includes(typeNode.kind.toString())) {
        return TYPE_KIND_MAP[typeNode.kind];
    } else if (typeNode.kind === 191 && typeNode.literal.kind === 103) {
        return 'null';
    } else if (typeNode.kind === 178) { // Array Type
        return 'Array';
    } else if (typeNode.kind === 173 && typeNode.typeName.kind === 78) { // identifier
        return typeNode.typeName.escapedText;
    }
}

function parseParam(param, tags, source) {
    const paramTag = tags.find((e) => e.name === param.name.text && e.title === 'param');
    return {
        name: param.name.text,
        type: parseType(param.type),
        default: param.initializer?.getText(source),
        optional: !!param.questionToken || !!param.initializer,
        description: paramTag ? paramTag.description : ''
    };
}

function parseFile(source, file) {
    const functions = [], imports = [];

    ts.forEachChild(source, node => {
        let name = "";
        if (ts.isFunctionDeclaration(node)) {
            name = node.name.text;
            const unparsedComment = getLeadingComment(node, source);
            let comment = doctrine.parse(unparsedComment, {unwrap: true});
            comment.tags = comment.tags.map(t => ({
                ...t,
                description: t.description ? t.description.replace(/^\s*:\s*/, '') : t.description,
            }));

            const {line} = source.getLineAndCharacterOfPosition(node.getStart(source));
            const typeParams = node.typeParameters?.map(p => p.getText(source));

            const code = printer.printNode(ts.EmitHint.Unspecified, ts.factory.createMethodDeclaration(
                undefined,
                undefined,
                undefined,
                node.name,
                undefined,
                node.typeParameters,
                node.parameters.slice(1).map((p) => {
                    // @ts-ignore
                    p.initializer = undefined;
                    return p;
                }),
                ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral('QueryFunctions', true)),
                undefined
            ), dummyFile);
            declarationFunctions.push(unparsedComment + '\n' + code);

            const func = {
                name,
                ...comment,
                typeParams,
                source: path.join(GITHUB_URL, file + `#L${line + 1}`),
                input: parseParam(node.parameters[0], comment.tags, source),
                output: parseType(node.type),
                params: node.parameters.slice(1).map(p => parseParam(p, comment.tags, source)),
            }
            node.getFullStart = () => node.getStart(source);
            func.node = node;
            functions.push(func);
        } else if (node?.kind === ts.SyntaxKind.ImportDeclaration) {
            imports.push(node);
        }
    });

    return [functions, imports];
}

function parseFiles(files) {
    const program = ts.createProgram(files, {});
    const functions = [], imports = [];

    for (let file of files) {
        const source = program.getSourceFile(file);
        const [fileFunctions, fileImports] = parseFile(source, file);
        functions.push(...fileFunctions);
        imports.push(...fileImports)
    }

    return [functions, imports];
}

function generateDocs(fns) {
    let md = '';
    const serializeType = (t) => Array.isArray(t) ? t.join(' | ') : t;

    for (let fn of fns) {
        md += `## \`${fn.name}(${fn.params.map(p => p.optional ? `[${p.name}]` : p.name).join(', ')})\`
[Source](${fn.source})

${fn.description}

### Input

* \`${serializeType(fn.input.type)}${fn.typeParams ? `<${fn.typeParams}>` : ''}\`: ${fn.input.description || ''}

### Output

* \`${serializeType(fn.output)}\`: ${fn.tags.find(e => e.title === 'returns')?.description || ''}

`;

        if (fn.params.length > 0) {
            md += '### Parameters\n\n';
            for (const param of fn.params) {
                md += `* \`${param.name}${param.optional ? '?' : ''}${param.type ? `(${serializeType(param.type)})` : ''}\`: ${param.description || ''}${param.default ? `(default ${param.default})` : ''}\n`;
            }
            md += '\n';
        }
    }
    fs.writeFileSync('./docs/functions.md', md);
}

function getTypeFactoryCode(type) {
    if (Array.isArray(type)) {
        return ts.factory.createArrayLiteralExpression(type.map(d => getTypeFactoryCode(d)));
    } else if (type === 'null') {
        return ts.factory.createNull();
    } else if (Object.values(TYPE_KIND_MAP).includes(type) && type !== 'undefined') {
        return ts.factory.createIdentifier(type.charAt(0).toUpperCase() + type.slice(1));
    } else if (Object.keys(TYPE_MAP).includes(type)) {
        return ts.factory.createStringLiteral(TYPE_MAP[type], true);
    }
    return ts.factory.createIdentifier(type);
}

function generateCode(fns, imports) {
    let functionNodes = [];

    for (let fn of fns) {
        const syntheticObj = [
            ts.factory.createPropertyAssignment(
                'name',
                ts.factory.createStringLiteral(fn.name, true)
            )
        ];
        if (fn.input && fn.input.type) {
            syntheticObj.push(ts.factory.createPropertyAssignment(
                'inputType',
                getTypeFactoryCode(fn.input.type)
            ));
        }
        if (fn.output) {
            syntheticObj.push(ts.factory.createPropertyAssignment(
                'outputType',
                getTypeFactoryCode(fn.output)
            ));
        }
        functionNodes.push(
            ts.factory.createObjectLiteralExpression([
                ...syntheticObj,
                ts.factory.createPropertyAssignment(
                    ts.factory.createIdentifier("fn"),
                    ts.factory.createFunctionExpression(
                        undefined,
                        fn.node.asteriskToken,
                        undefined,
                        fn.node.typeParameters,
                        fn.node.parameters,
                        fn.node.type,
                        fn.node.body
                    )
                ),
            ], true),
        );
    }

    const rootNode = ts.factory.createVariableStatement(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createVariableDeclarationList(
            [ts.factory.createVariableDeclaration(
                ts.factory.createIdentifier("functions"),
                undefined,
                undefined,
                ts.factory.createArrayLiteralExpression(functionNodes, true),
            )],
            ts.NodeFlags.Const
        )
    )

    const code = printer.printNode(ts.EmitHint.Unspecified, rootNode, dummyFile);
    const importsCode = [...new Set(imports.map((node) => printer.printNode(ts.EmitHint.Unspecified, node, dummyFile)))]
        .join('\n');
    fs.writeFileSync(
        './src/functions/index.ts',
        `// Auto generated file. DO NOT EDIT\n${importsCode}\n\n${code}`,
    );
    fs.writeFileSync(
        './src/functions/declaration.ts',
        `${importsCode}\n\nexport declare class QueryFunctions {\n${declarationFunctions.join('\n\n') + '\n'}}`,
    );
}

const [functions, imports] = parseFiles(getFiles());
generateDocs(functions);
generateCode(functions, imports);
