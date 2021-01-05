export class Parser {
  constructor() {
    this.rules = {};
    this.errors = [];
    this.warnings = [];
  }

  registerBlock(name, rules) {
    this.rules[name] = rules;
  }

  registerError(error) {
    this.errors.append(error);
  }

  registerWarning(warning) {
    this.warnings.append(warning);
  }

  parse(markup) {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(markup, 'text/html');
    let data = {};

    debugger;
    for (const [query, rule] of Object.entries(this.rules['main'])) {
      const node = doc.querySelector(query)
      if (typeof rule === 'function') {
        const ruleData = rule(node, this);
        if (typeof ruleData === 'object') {
          data = {...data, ...ruleData}
        }
      }
    }

    return data;
  }
}
