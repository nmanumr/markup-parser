import * as fs from 'fs';
import * as path from 'path';

import * as ts from "typescript";
import * as doctrine from 'doctrine';

const BASE_DIR = './src/functions';
const GITHUB_URL = 'https://github.com/nmanumr/mark-parser/tree/master/';
const TYPE_MAP = {
    150: 'undefined',
    147: 'string',
    144: 'number',
}

function getFiles() {
    return fs
        .readdirSync(BASE_DIR)
        .filter((e) => e !== 'index.ts')
        .map((p) => path.join(BASE_DIR, p));
}

function getLeadingComment(node, source) {
    let comment = "";
    const commentRanges = ts.getLeadingCommentRanges(source.getFullText(), node.getFullStart());
    if (commentRanges?.length) {
        const commentStrings = commentRanges.map(r => source.getFullText().slice(r.pos, r.end));
        comment = commentStrings[commentStrings.length - 1];
    }
    return doctrine.parse(comment, {unwrap: true});
}

function parseType(typeNode) {
    if (typeNode.kind === 182) { // Union type
        return typeNode.types.map(t => parseType(t));
    } else if (Object.keys(TYPE_MAP).includes(typeNode.kind.toString())) {
        return TYPE_MAP[typeNode.kind];
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
    const functions = [];

    ts.forEachChild(source, node => {
        let name = "";
        if (ts.isFunctionDeclaration(node)) {
            name = node.name.text;
            let comment = getLeadingComment(node, source);
            comment.tags = comment.tags.map(t => ({
                ...t,
                description: t.description ? t.description.replace(/^\s*:\s*/, '') : t.description,
            }));

            const {line} = source.getLineAndCharacterOfPosition(node.getStart(source));
            const typeParams = node.typeParameters?.map(p => p.getText(source));

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
        }
    });

    return functions;
}

function parseFiles(files) {
    const program = ts.createProgram(files, {});
    const functions = [];

    for (let file of files) {
        const source = program.getSourceFile(file);
        const fileFunctions = parseFile(source, file);
        functions.push(...fileFunctions);
    }

    return functions;
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
    } else if (Object.values(TYPE_MAP).includes(type) && type !== 'undefined') {
        return ts.factory.createIdentifier(type.charAt(0).toUpperCase() + type.slice(1));
    } else if (type === 'T') {
        return ts.factory.createStringLiteral(type, true);
    }
    return ts.factory.createIdentifier(type);
}

function generateCode(fns) {
    const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed, removeComments: true});
    const outputFile = ts.createSourceFile("index.ts", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
    let functionNodes = [];

    for (let fn of fns) {
        const syntheticObj = [
            ts.factory.createPropertyAssignment(
                'name',
                ts.factory.createStringLiteral(fn.name)
            )
        ];
        if (fn.input) {
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
                    'fn',
                    ts.createFunctionExpression(
                        undefined, undefined, undefined,
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

    const code = printer.printNode(ts.EmitHint.Unspecified, rootNode, outputFile);
    fs.writeFileSync(
        './src/functions/index.ts',
        `// Auto generated file. DO NOT EDIT\n${code}`,
    );

}

const functions = parseFiles(getFiles());
generateDocs(functions);
generateCode(functions);
