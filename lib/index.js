function rename(obj, key, newKey) {
    if (Object.keys(obj).includes(key)) {
        obj[newKey] = clone(obj[key]);
        delete obj[key];
    }
    return obj;
}
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
function isPlainObject(obj) {
    return obj !== null && typeof (obj) === "object" && Object.getPrototypeOf(obj) === Object.prototype;
}
function merge(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = merge(target[key], source[key]);
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
function isPrototype(value) {
    const Ctor = value && value.constructor;
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
    return value === proto;
}
function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (typeof value !== 'object') {
        return !value;
    }
    // TODO: have better check for array-like objects
    if (value.hasOwnProperty('length')) {
        return !value.length;
    }
    if (value.toString() == '[object Map]' || value.toString() == '[object Set]') {
        return !value.size;
    }
    if (isPrototype(value)) {
        return !Object.keys(value).length;
    }
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
function clone(obj) {
    if (obj === null || typeof (obj) !== 'object')
        return obj;
    const temp = obj.constructor(); // changed
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}

const _QUERY = Symbol('_query');
const _ROOT_NODES = Symbol('_root_nodess');
const _PARSER = Symbol('_parser');
const _FUNC_DATA = Symbol('_func_data');
const _META = Symbol('_meta');

class QueryBase {
    constructor() {
        this[_QUERY] = [];
        this[_ROOT_NODES] = null;
        this[_PARSER] = null;
    }
    run(nodes, parser) {
        this[_PARSER] = parser;
        this[_ROOT_NODES] = nodes;
        this[_META] = {};
        const data = this[_QUERY].reduce((acc, func) => func.fn.bind(this)(acc, ...func.args), nodes);
        const meta = this[_META];
        if (typeof data === "object" && !isEmpty(meta)) {
            data._meta = meta;
        }
        this[_PARSER] = null;
        this[_META] = null;
        return [data, meta];
    }
    registerFn(name, fn, options = {}) {
        if (this[name]) {
            throw new Error(`Function with name "${name}" is already defined in Query instance.`);
        }
        const func = function (...args) {
            const q = new QueryBase();
            q[_QUERY] = [...this[_QUERY]];
            q[_QUERY].push({ fn, args, });
            return q;
        };
        func[_FUNC_DATA] = Object.assign({ name }, options);
        // @ts-ignore
        this.__proto__[name] = func;
    }
}

const q = (new QueryBase());

class Parser {
    constructor() {
        this.errors = [];
        this.warnings = [];
    }
    registerError(error) {
        this.errors.push(error);
    }
    registerWarning(warning) {
        this.warnings.push(warning);
    }
    sortRules(rules) {
        if (rules instanceof QueryBase)
            return [];
        const firstCharScore = { '$': 0, '#': 1 };
        return Object.entries(rules)
            .sort((a, b) => {
            return (firstCharScore[b[0][0]] || 2) - (firstCharScore[a[0][0]] || 2);
        });
    }
    parse(markup, rules) {
        var _a, _b;
        let data = {}, meta = {};
        if (typeof markup === 'string') {
            // TODO: handle nodejs env
            const domparser = new DOMParser();
            markup = domparser.parseFromString(markup, 'text/html').documentElement;
        }
        if (rules instanceof QueryBase) {
            const ruleData = rules.run([markup], this);
            data = ruleData[0];
            meta = ruleData[1];
        }
        for (let [query, rule] of this.sortRules(rules)) {
            if (query.startsWith('$')) {
                meta[query] = rule;
                continue;
            }
            let selector = query;
            if (query.startsWith('#!')) {
                query = query.slice(2);
                selector = ((_a = meta.$refs) !== null && _a !== void 0 ? _a : {})[query] || '';
            }
            let nodes;
            if (selector === ':self') {
                nodes = [markup];
            }
            else {
                nodes = markup.querySelectorAll(selector);
            }
            let nodeData, nodeMeta = {};
            if (typeof rule === 'object' && !(rule instanceof QueryBase)) {
                const mergedRules = merge({ $names: meta.$names, $refs: meta.$refs }, rule);
                rule = q.rules(mergedRules);
            }
            if (rule instanceof QueryBase) {
                [nodeData, nodeMeta] = rule.run(Array.from(nodes), this);
            }
            else if (typeof rule === 'function') {
                nodeData = rule(Array.from(nodes), this);
            }
            if (!((_b = nodeMeta === null || nodeMeta === void 0 ? void 0 : nodeMeta.$namespaced) !== null && _b !== void 0 ? _b : true) && typeof nodeData === 'object') {
                data = Object.assign(Object.assign({}, data), nodeData);
            }
            else {
                data[query] = nodeData;
            }
        }
        for (const [key, val] of Object.entries(meta.$names || {})) {
            rename(data, key, val);
        }
        delete meta.$names;
        delete meta.$refs;
        if (!isEmpty(meta))
            data._meta = meta;
        return data;
    }
}

// Auto generated file. DO NOT EDIT
const functions = [
    {
        name: 'first',
        inputType: [String, Array, 'IterableIterator'],
        outputType: ['T', undefined],
        fn: function (collection) {
            if (typeof collection["next"] === "function") {
                return collection["next"]().value;
            }
            return collection[0];
        }
    },
    {
        name: 'last',
        inputType: [String, Array, 'IterableIterator'],
        outputType: ['T', undefined],
        fn: function (collection) {
            if (typeof collection["length"] === "number") {
                return collection[collection["length"] - 1];
            }
            let value;
            for (value of collection)
                ;
            return value;
        }
    },
    {
        name: 'compact',
        inputType: [String, Array, 'IterableIterator'],
        fn: function* (collection) {
            for (const e of collection) {
                if (e) {
                    yield e;
                }
            }
        }
    },
    {
        name: 'chunk',
        inputType: [String, Array, 'IterableIterator'],
        fn: function* (collection, size) {
            let chunk = [];
            for (const e of collection) {
                if (chunk.length >= size) {
                    yield chunk;
                    chunk = [];
                }
                chunk.push(e);
            }
            yield chunk;
        }
    },
    {
        name: 'concat',
        inputType: [Array, 'IterableIterator'],
        fn: function* (collection1, collection2) {
            for (const e of collection1) {
                yield e;
            }
            for (const e of collection2) {
                yield e;
            }
        }
    },
    {
        name: 'filter',
        inputType: [Array, 'IterableIterator'],
        fn: function* (collection, predicate) {
            let i = 0;
            for (const e of collection) {
                if (predicate(e, i++))
                    yield e;
            }
        }
    },
    {
        name: 'length',
        inputType: [Array, 'IterableIterator', String],
        outputType: Number,
        fn: function (collection) {
            if (collection.hasOwnProperty("length")) {
                return collection.length;
            }
            let i = 0;
            for (let e of collection) {
                i++;
            }
            return i;
        }
    },
    {
        name: 'map',
        inputType: [Array, 'IterableIterator'],
        fn: function* (collection, iteratee) {
            let i = 0;
            for (const e of collection) {
                if (iteratee instanceof QueryBase)
                    yield iteratee.run(e, this[_PARSER]);
                else
                    yield iteratee(e, i++);
            }
        }
    },
    {
        name: 'toList',
        inputType: [Array, 'IterableIterator'],
        fn: function (collection) {
            return Array.from(collection);
        }
    },
    {
        name: 'text',
        inputType: HTMLElement,
        outputType: String,
        fn: function (node, collapseSpaces) {
            let text = node.innerText;
            if (collapseSpaces && text) {
                text = text.replace(/\s+/g, " ").trim();
            }
            return text;
        }
    },
    {
        name: 'html',
        inputType: HTMLElement,
        outputType: String,
        fn: function (node) {
            return node.innerHTML;
        }
    },
    {
        name: 'fullHtml',
        inputType: HTMLElement,
        outputType: String,
        fn: function (node) {
            return node.outerHTML;
        }
    },
    {
        name: 'attr',
        inputType: HTMLElement,
        outputType: String,
        fn: function (node, attr_name) {
            return node.getAttribute(attr_name);
        }
    },
    {
        name: 'value',
        inputType: HTMLInputElement,
        outputType: String,
        fn: function (node) {
            return node.value;
        }
    },
    {
        name: 'classes',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node) {
            return Array.from(node.classList);
        }
    },
    {
        name: 'dataset',
        inputType: HTMLElement,
        outputType: Object,
        fn: function (node) {
            return node.dataset;
        }
    },
    {
        name: 'children',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node) {
            return Array.from(node.children);
        }
    },
    {
        name: 'parent',
        inputType: HTMLElement,
        outputType: HTMLElement,
        fn: function (node) {
            return node.parentNode;
        }
    },
    {
        name: 'parents',
        inputType: HTMLElement,
        fn: function (node, until, filter) {
            const result = [];
            const matchesSelector = node.matches || node.webkitMatchesSelector;
            node = node.parentElement;
            while (node && !(until && matchesSelector.call(node, until))) {
                if (!filter) {
                    result.push(node);
                }
                else {
                    if (matchesSelector.call(node, filter)) {
                        result.push(node);
                    }
                }
                node = node.parentElement;
            }
            return result;
        }
    },
    {
        name: 'siblings',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node) {
            return Array.from(node.parentNode.children).filter((child) => child !== node);
        }
    },
    {
        name: 'closest',
        inputType: HTMLElement,
        outputType: HTMLElement,
        fn: function (node, selector) {
            return node.closest(selector);
        }
    },
    {
        name: 'find',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node, selector) {
            return Array.from(node.querySelectorAll(selector));
        }
    },
    {
        name: 'next',
        inputType: HTMLElement,
        outputType: Element,
        fn: function (node) {
            return node.nextElementSibling;
        }
    },
    {
        name: 'prev',
        inputType: HTMLElement,
        outputType: Element,
        fn: function (node) {
            return node.previousElementSibling;
        }
    },
    {
        name: 'nextAll',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node, filter) {
            const siblings = [];
            let elm = node.nextElementSibling;
            while (elm) {
                if (elm.nodeType === 3)
                    continue;
                if (!filter || elm.matches(filter))
                    siblings.push(elm);
                elm = elm.nextElementSibling;
            }
            return siblings;
        }
    },
    {
        name: 'prevAll',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node, filter) {
            const siblings = [];
            let elm = node.previousElementSibling;
            while (elm) {
                if (elm.nodeType === 3)
                    continue;
                if (!filter || elm.matches(filter))
                    siblings.push(elm);
                elm = elm.previousElementSibling;
            }
            return siblings;
        }
    },
    {
        name: 'rules',
        inputType: Array,
        fn: function (nodes, rules) {
            var _a;
            let nodeData = [], nodeMergableData = [];
            for (const node of nodes) {
                let ruleData, ruleMeta = {};
                ruleData = this[_PARSER].parse(node, rules);
                ruleMeta = ruleData._meta;
                if ((_a = ruleMeta === null || ruleMeta === void 0 ? void 0 : ruleMeta.$namespaced) !== null && _a !== void 0 ? _a : true) {
                    nodeData.push(ruleData);
                }
                else {
                    nodeMergableData.push(ruleData);
                }
                ruleMeta === null || ruleMeta === void 0 ? true : delete ruleMeta.$namespaced;
            }
            if (nodeMergableData.length > 0 && nodeMergableData.every((d) => isPlainObject(d))) {
                nodeMergableData = nodeMergableData.reduce((acc, obj) => merge(acc, obj), {});
                nodeData.push(nodeMergableData);
            }
            else {
                nodeData = [...nodeData, ...nodeMergableData];
            }
            if (nodeData.length === 1) {
                nodeData = nodeData[0];
            }
            else if (nodeData.length === 0) {
                nodeData = null;
            }
            return nodeData;
        }
    },
    {
        name: 'tap',
        fn: function (data, fn) {
            if (fn instanceof QueryBase) {
                return fn.run(data, this[_PARSER]);
            }
            else if (typeof fn === "function") {
                return fn(data, this[_PARSER]);
            }
        }
    },
    {
        name: 'trim',
        inputType: String,
        outputType: String,
        fn: function (input) {
            return input.trim();
        }
    },
    {
        name: 'upperCase',
        inputType: String,
        outputType: String,
        fn: function (input) {
            return input.toUpperCase();
        }
    },
    {
        name: 'lowerCase',
        inputType: String,
        outputType: String,
        fn: function (input) {
            return input.toLowerCase();
        }
    },
    {
        name: 'regex',
        inputType: String,
        outputType: [Array, null],
        fn: function (input, matcher) {
            return input.match(matcher);
        }
    },
    {
        name: 'repeat',
        inputType: String,
        outputType: String,
        fn: function (input, n) {
            return input.repeat(n);
        }
    },
    {
        name: 'replace',
        inputType: String,
        outputType: String,
        fn: function (input, searchValue, replacer) {
            return input.replace(searchValue, replacer);
        }
    },
    {
        name: 'split',
        inputType: String,
        outputType: Array,
        fn: function (input, splitter, limit) {
            return input.split(splitter, limit);
        }
    },
    {
        name: 'startsWith',
        inputType: String,
        fn: function (input, searchString, position) {
            return input.startsWith(searchString, position);
        }
    }
];

functions.forEach((fn) => {
    q.registerFn(fn.name, fn.fn, fn);
});

export { Parser, q };
