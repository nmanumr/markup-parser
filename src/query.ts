import {isEmpty, clone, merge, isPlainObject} from 'lodash-es'
import {functions} from './functions';
import {FnOptions, RulesObject, SimpleObj} from "./types";
import {_FUNC_DATA, _META, _PARSER, _QUERY, _ROOT_NODES} from "./symbols";

class Query {
    constructor() {
        this[_QUERY] = [];
        this[_ROOT_NODES] = null;
        this[_PARSER] = null;
    }

    run(nodes: Array<Element>, parser) {
        this[_PARSER] = parser;
        this[_ROOT_NODES] = nodes;
        this[_META] = {};

        const data = this[_QUERY].reduce(
            (acc, func) => func.bind(this)(acc, ...func[_FUNC_DATA].args),
            nodes
        );
        const meta = this[_META];
        if (typeof data === "object" && !isEmpty(meta)) {
            data._meta = meta;
        }

        this[_PARSER] = null;
        this[_META] = null;
        return [data, meta];
    }

    registerFn(name: string, fn: (...args) => any, options: FnOptions = {}) {
        if (this[name]) {
            throw new Error(`Function with name "${name}" is already defined in Query instance.`);
        }

        const func = function (...args) {
            const query_func = fn;
            query_func[_FUNC_DATA] = {name, args, ...options};

            const q = new Query();
            q[_QUERY] = clone(this[_QUERY]);
            q[_QUERY].push(query_func);
            return q;
        }

        func[_FUNC_DATA] = {name, ...options};
        // @ts-ignore
        this.__proto__[name] = func;
    }
}
const q = new Query();

// TODO: handle import in generator and move it to functions
function rules(nodes: Element[], rules: RulesObject) {
    let nodeData = [], nodeMergableData = [];

    for (const node of nodes) {
        let ruleData, ruleMeta: SimpleObj = {};
        ruleData = this[_PARSER].parse(node, rules);
        ruleMeta = ruleData._meta;

        if (ruleMeta?.$namespaced ?? true) {
            nodeData.push(ruleData);
        } else {
            nodeMergableData.push(ruleData)
        }

        delete ruleMeta?.$namespaced;
    }

    if (nodeMergableData.length > 0 && nodeMergableData.every((d) => isPlainObject(d))) {
        nodeMergableData = merge({}, ...nodeMergableData);
        nodeData.push(nodeMergableData);
    } else {
        nodeData = [...nodeData, ...nodeMergableData];
    }

    if (nodeData.length === 1) {
        nodeData = nodeData[0];
    } else if (nodeData.length === 0) {
        nodeData = null;
    }

    return nodeData;
}
q.registerFn('rules', rules);

functions.forEach((fn) => {
    q.registerFn(fn.name, fn.fn, fn);
})

export {Query, q};
