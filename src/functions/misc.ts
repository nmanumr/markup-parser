import {_PARSER} from "../symbols";
import {QueryBase} from "../query_base";
import {SimpleObj} from "../types";
import {RulesObject} from "../parser";
import {isPlainObject, merge} from '../utils';

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
        nodeMergableData = nodeMergableData.reduce((acc, obj) => merge(acc, obj), {});
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

function tap(data, fn: QueryBase | Function) {
    if (fn instanceof QueryBase) {
        return fn.run(data, this[_PARSER]);
    } else if (typeof fn === 'function') {
        return fn(data, this[_PARSER]);
    }
}
