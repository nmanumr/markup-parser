import {isEmpty, clone} from 'lodash-es'
import {functions} from './functions';

const _QUERY = Symbol('_query');
const _ROOT_NODES = Symbol('_root_nodess');
const _PARSER = Symbol('_parser');
const _FUNC_DATA = Symbol('_func_data');
const _META = Symbol('_meta');

export interface FnOptions {
    inputType?: any | any[],
    outputType?: any | any[],
}

class Query {
    constructor() {
        this[_QUERY] = [];
        this[_ROOT_NODES] = null;
        this[_PARSER] = null;
    }

    run(nodes: Array<HTMLElement>, parser) {
        this[_PARSER] = parser;
        this[_ROOT_NODES] = nodes;
        this[_META] = {};

        const data = this[_QUERY].reduce((acc, func) => func(acc, ...func[_FUNC_DATA].args), nodes);
        const meta = this[_META];
        if (typeof data === "object" && !isEmpty(meta)) {
            data._meta = meta;
        }

        this[_PARSER] = null;
        this[_META] = null;
        return [data, meta];
    }

    registerFn(name: string, fn: (...args) => any, options: FnOptions) {
        if (this[name]) {
            throw new Error(`Function with name "${name}" is already defined in Query instance.`);
        }

        const func = function (...args) {
            const query_func = fn.bind(this);
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
functions.forEach((fn) => {
    q.registerFn(fn.name, fn.fn, fn);
})

export {Query, q};
