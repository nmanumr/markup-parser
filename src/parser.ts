import {q} from "./query";
import {QueryBase} from "./query_base";
import {rename, isEmpty, merge} from './utils';
import {SimpleObj} from "./types";

interface RuleHandlerFn {
    (nodes: Array<Element>, parser: Parser): any;
}
type RuleHandler = QueryBase | RulesObject | RuleHandlerFn;

export interface RulesObject {
    [selector: string]: RuleHandler;
}

export class Parser {
    private errors = [];
    private warnings = [];

    registerError(error) {
        this.errors.push(error);
    }

    registerWarning(warning) {
        this.warnings.push(warning);
    }

    private sortRules(rules: RulesObject | QueryBase) {
        if (rules instanceof QueryBase) return [];

        const firstCharScore = {'$': 0, '#': 1}
        return Object.entries(rules)
            .sort(
                (a, b) => {
                    return (firstCharScore[b[0][0]] || 2) - (firstCharScore[a[0][0]] || 2)
                }
            );
    }

    parse(markup: string | Element, rules: RulesObject | QueryBase) {
        let data: SimpleObj = {}, meta: SimpleObj = {};

        if (typeof markup === 'string') {
            if (!window || !window.DOMParser) {
                throw new Error(`Unparsed markup is not supported for NodeJs environment. Try parsing it with JsDOM first.`);
            }
            const domparser = new DOMParser();
            markup = domparser.parseFromString(markup, 'text/html').documentElement;
        }
        if (typeof markup !== 'object') {
            throw new Error(`Invalid markup. Expected 'string' or 'HTMLElement' got '${typeof markup}'`);
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
                selector = (meta.$refs ?? {})[query] || '';
            }

            let nodes;
            if (selector === ':self') {
                nodes = [markup]
            } else {
                nodes = markup.querySelectorAll(selector);
            }
            let nodeData, nodeMeta: SimpleObj = {};

            if (typeof rule === 'object' && !(rule instanceof QueryBase)) {
                const mergedRules = merge({$names: meta.$names, $refs: meta.$refs}, rule);
                rule = (q as any).rules(mergedRules);
            }

            if (rule instanceof QueryBase) {
                [nodeData, nodeMeta] = rule.run(Array.from(nodes), this);
            } else if (typeof rule === 'function') {
                nodeData = rule(Array.from(nodes), this);
            }

            if (!(nodeMeta?.$namespaced ?? true) && typeof nodeData === 'object') {
                data = {...data, ...nodeData}
            } else {
                data[query] = nodeData;
            }
        }

        for (const [key, val] of Object.entries(meta.$names || {})) {
            rename(data, key, val);
        }
        delete meta.$names;
        delete meta.$refs;

        if (!isEmpty(meta)) data._meta = meta
        return data;
    }
}
