import {NodeExpression} from "./expression";
import { merge, isPlainObject, omit } from 'lodash-es'

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

    for (const [query, rule] of Object.entries(rules)) {
      if (query.startsWith('$')) {
        meta[query] = rule;
        continue;
      }

      const nodes = markup.querySelectorAll(query);
      let nodeData = [], nodeMergableData = [];

      for (const node of nodes) {
        let ruleData, ruleMeta = {};

        if (rule instanceof NodeExpression) {
          [ruleData, ruleMeta] = rule.run(node, this);
        } else if (typeof rule === 'function') {
          ruleData = rule(node, this);
        } else if (typeof rule === 'object') {
          ruleData = this.parse(node, rule);
          ruleMeta = ruleData._meta;
        }

        if (ruleMeta?.$namespaced ?? true) {
          nodeData.push(ruleData);
        } else {
          nodeMergableData.push(ruleData)
        }

        delete ruleMeta.$namespaced;
      }

      if (nodeMergableData.length > 0 && nodeMergableData.every((d) => isPlainObject(d))) {
        nodeMergableData = nodeMergableData.reduce((a, d) => merge(a, d), {});
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

    data._meta = meta
    return data;
  }
}
