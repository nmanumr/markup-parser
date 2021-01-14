import {NodeExpression} from "./expression";
import {merge, isPlainObject, isEmpty} from 'lodash-es'
import {rename} from './utils';

export class Parser {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  registerError(error) {
    this.errors.append(error);
  }

  registerWarning(warning) {
    this.warnings.append(warning);
  }

  parse(markup, rules) {
    let data = {}, meta = {};

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
      let nodeData = [], nodeMergableData = [];

      for (const node of nodes) {
        let ruleData, ruleMeta = {};

        if (rule instanceof NodeExpression) {
          [ruleData, ruleMeta] = rule.run(node, this);
        } else if (typeof rule === 'function') {
          ruleData = rule(node, this);
        } else if (typeof rule === 'object') {
          const mergedRules = merge({$names: meta.$names, $refs: meta.$refs}, rule)
          ruleData = this.parse(node, mergedRules);
          ruleMeta = ruleData._meta;
        }

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

      data[query] = nodeData;
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
