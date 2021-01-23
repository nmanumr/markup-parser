import {Query} from "./expression";
import {merge, isEmpty, isPlainObject} from 'lodash-es'
import {rename} from './utils';

type SimpleObj = {[name: string]: any};

export class Parser {
  errors = [];
  warnings = [];

  registerError(error) {
    this.errors.push(error);
  }

  registerWarning(warning) {
    this.warnings.push(warning);
  }

  parse(markup, rules) {
    let data: SimpleObj = {}, meta: SimpleObj = {};

    if (typeof markup === 'string') {
      // TODO: handle nodejs env
      const domparser = new DOMParser();
      markup = domparser.parseFromString(markup, 'text/html');
    }
    const firstCharScore = {'$': 0, '#': 1}
    const sortedEntries = Object.entries(rules)
        .sort(
            (a, b) => {
              return (firstCharScore[b[0][0]] || 2) - (firstCharScore[a[0][0]] || 2)
            }
        );

    for (let [query, rule] of sortedEntries) {
      if (query.startsWith('$')) {
        meta[query] = rule;
        continue;
      }

      let selector = query;
      if (query.startsWith('#!')) {
        query = query.slice(2);
        selector = (meta.$refs ?? {})[query] || '';
      }

      const nodes = markup.querySelectorAll(selector);
      let nodeData, nodeMeta: SimpleObj = {};

      if (rule instanceof Query) {
        [nodeData, nodeMeta] = rule.run(nodes, this);
      } else if (typeof rule === 'function') {
        nodeData = rule(nodes, this);
      } else if (typeof rule === 'object') {
        nodeData = [];
        let nodeMergableData = [];

        for (const node of nodes) {
          let ruleData, ruleMeta: SimpleObj = {};

          const mergedRules = merge({$names: meta.$names, $refs: meta.$refs}, rule)
          ruleData = this.parse(node, mergedRules);
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
      }

      if ((nodeMeta?.$namespaced ?? true) && typeof nodeData === 'object') {
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
