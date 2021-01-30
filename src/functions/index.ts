// Auto generated file. DO NOT EDIT
import { QueryBase } from "../query_base";
import { _PARSER } from "../symbols";
import { SimpleObj } from "../types";
import { RulesObject } from "../parser";
import { isPlainObject, merge } from "../utils";
import { Matcher } from "./types";

export const functions = [
    {
        name: 'first',
        inputType: [String, Array, 'IterableIterator'],
        outputType: ['T', undefined],
        fn: function <T>(collection: string | Array<any> | IterableIterator<any>): T | undefined {
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
        fn: function <T>(collection: string | Array<any> | IterableIterator<any>): T | undefined {
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
        fn: function* (collection: string | Array<any> | IterableIterator<any>) {
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
        fn: function* (collection: string | Array<any> | IterableIterator<any>, size: number) {
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
        fn: function* (collection1: Array<any> | IterableIterator<any>, collection2: Array<any> | IterableIterator<any>) {
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
        fn: function* (collection: Array<any> | IterableIterator<any>, predicate: (e, i) => boolean) {
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
        fn: function (collection: Array<any> | IterableIterator<any> | string): number {
            if (collection.hasOwnProperty("length")) {
                return (collection as Array<any>).length;
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
        fn: function* (collection: Array<any> | IterableIterator<any>, iteratee: (e, i) => boolean) {
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
        fn: function (collection: Array<any> | IterableIterator<any>) {
            return Array.from(collection);
        }
    },
    {
        name: 'text',
        inputType: HTMLElement,
        outputType: String,
        fn: function (node: HTMLElement, collapseSpaces: boolean): string {
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
        fn: function (node: HTMLElement): string {
            return node.innerHTML;
        }
    },
    {
        name: 'fullHtml',
        inputType: HTMLElement,
        outputType: String,
        fn: function (node: HTMLElement): string {
            return node.outerHTML;
        }
    },
    {
        name: 'attr',
        inputType: HTMLElement,
        outputType: String,
        fn: function (node: HTMLElement, attr_name: string): string {
            return node.getAttribute(attr_name);
        }
    },
    {
        name: 'value',
        inputType: HTMLInputElement,
        outputType: String,
        fn: function (node: HTMLInputElement): string {
            return node.value;
        }
    },
    {
        name: 'classes',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement): Array<string> {
            return Array.from(node.classList);
        }
    },
    {
        name: 'dataset',
        inputType: HTMLElement,
        outputType: Object,
        fn: function (node: HTMLElement): Object {
            return node.dataset;
        }
    },
    {
        name: 'children',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement): HTMLElement[] {
            return Array.from(node.children) as HTMLElement[];
        }
    },
    {
        name: 'parent',
        inputType: HTMLElement,
        outputType: HTMLElement,
        fn: function (node: HTMLElement): HTMLElement {
            return node.parentNode as HTMLElement;
        }
    },
    {
        name: 'parents',
        inputType: HTMLElement,
        fn: function (node: HTMLElement, until?: string, filter?: string) {
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
        fn: function (node: HTMLElement): HTMLElement[] {
            return Array.from(node.parentNode.children).filter((child) => child !== node) as HTMLElement[];
        }
    },
    {
        name: 'closest',
        inputType: HTMLElement,
        outputType: HTMLElement,
        fn: function (node: HTMLElement, selector: string): HTMLElement {
            return node.closest(selector);
        }
    },
    {
        name: 'find',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement, selector: string): HTMLElement[] {
            return Array.from(node.querySelectorAll(selector));
        }
    },
    {
        name: 'next',
        inputType: HTMLElement,
        outputType: Element,
        fn: function (node: HTMLElement): Element {
            return node.nextElementSibling;
        }
    },
    {
        name: 'prev',
        inputType: HTMLElement,
        outputType: Element,
        fn: function (node: HTMLElement): Element {
            return node.previousElementSibling;
        }
    },
    {
        name: 'nextAll',
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement, filter?: string): HTMLElement[] {
            const siblings = [];
            let elm: Element = node.nextElementSibling;
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
        fn: function (node: HTMLElement, filter?: string): HTMLElement[] {
            const siblings = [];
            let elm: Element = node.previousElementSibling;
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
        fn: function (nodes: Element[], rules: RulesObject) {
            let nodeData = [], nodeMergableData = [];
            for (const node of nodes) {
                let ruleData, ruleMeta: SimpleObj = {};
                ruleData = this[_PARSER].parse(node, rules);
                ruleMeta = ruleData._meta;
                if (ruleMeta?.$namespaced ?? true) {
                    nodeData.push(ruleData);
                }
                else {
                    nodeMergableData.push(ruleData);
                }
                delete ruleMeta?.$namespaced;
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
        fn: function (data, fn: QueryBase | Function) {
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
        fn: function (input: string): string {
            return input.trim();
        }
    },
    {
        name: 'upperCase',
        inputType: String,
        outputType: String,
        fn: function (input: string): string {
            return input.toUpperCase();
        }
    },
    {
        name: 'lowerCase',
        inputType: String,
        outputType: String,
        fn: function (input: string): string {
            return input.toLowerCase();
        }
    },
    {
        name: 'regex',
        inputType: String,
        outputType: [Array, null],
        fn: function (input: string, matcher: Matcher): Array<string> | null {
            return input.match(matcher);
        }
    },
    {
        name: 'repeat',
        inputType: String,
        outputType: String,
        fn: function (input: string, n: number): string {
            return input.repeat(n);
        }
    },
    {
        name: 'replace',
        inputType: String,
        outputType: String,
        fn: function (input: string, searchValue: string | RegExp, replacer: string | ((substring: string, ...args: any[]) => string)): string {
            return input.replace(searchValue, replacer as any);
        }
    },
    {
        name: 'split',
        inputType: String,
        outputType: Array,
        fn: function (input: string, splitter: string, limit?: number): Array<string> {
            return input.split(splitter, limit);
        }
    },
    {
        name: 'startsWith',
        inputType: String,
        fn: function (input: string, searchString: string, position?: number): boolean {
            return input.startsWith(searchString, position);
        }
    }
];