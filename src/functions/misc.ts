import {RulesObject, SimpleObj} from "../types";
import {_PARSER} from "../symbols";
import {isPlainObject, merge} from "lodash-es";
import {Query} from "../query";

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

function tap(data, fn: Query | Function) {
    if (fn instanceof Query) {
        return fn.run(data, this[_PARSER]);
    } else if (typeof fn === 'function') {
        return fn(data, this[_PARSER]);
    }
}
