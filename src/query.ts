import {clone, isEmpty} from 'lodash-es'
import {_FUNC_DATA, _META, _PARSER, _QUERY, _ROOT_NODES} from "./symbols";

interface FnOptions {
    inputType?: any | any[],
    outputType?: any | any[],
}

export class Query {
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
            (acc, func) => func.fn.bind(this)(acc, ...func.args),
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
            const q = new Query();
            q[_QUERY] = clone(this[_QUERY]);
            q[_QUERY].push({fn, args, });
            return q;
        }

        func[_FUNC_DATA] = {name, ...options};
        // @ts-ignore
        this.__proto__[name] = func;
    }
}
export const q = new Query();

