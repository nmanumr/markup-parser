import {q, Query} from "./query";
import {merge, isEmpty} from 'lodash-es'
import {rename} from './utils';
import {SimpleObj} from "./types";

interface RuleHandlerFn {
    (nodes: Array<Element>, parser: Parser): any;
}
type RuleHandler = Query | RulesObject | RuleHandlerFn;

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

    private sortRules(rules: RulesObject | Query) {
        if (rules instanceof Query) return [];

        const firstCharScore = {'$': 0, '#': 1}
        return Object.entries(rules)
            .sort(
                (a, b) => {
                    return (firstCharScore[b[0][0]] || 2) - (firstCharScore[a[0][0]] || 2)
                }
            );
    }

    parse(markup: string | Element, rules: RulesObject | Query) {
        let data: SimpleObj = {}, meta: SimpleObj = {};

        if (typeof markup === 'string') {
            // TODO: handle nodejs env
            const domparser = new DOMParser();
            markup = domparser.parseFromString(markup, 'text/html').documentElement;
        }
        if (rules instanceof Query) {
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

            if (typeof rule === 'object' && !(rule instanceof Query)) {
                const mergedRules = merge({$names: meta.$names, $refs: meta.$refs}, rule);
                rule = (q as any).rules(mergedRules);
            }

            if (rule instanceof Query) {
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
