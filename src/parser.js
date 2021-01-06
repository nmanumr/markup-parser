import {NodeExpression} from "./expression";

export class Parser {
  constructor() {
    this.rules = {};
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
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(markup, 'text/html');
    let data = {};

    for (const [query, rule] of Object.entries(rules)) {
      const nodes = doc.querySelectorAll(query);
      let ruleData;

      if (rule instanceof NodeExpression) {
        ruleData = rule.run(nodes, this);
      } else if (typeof rule === 'function') {
        ruleData = rule(nodes, this);
      }

      if (typeof ruleData === 'object') {
        data = {...data, ...ruleData}
      }
    }

    return data;
  }
}
