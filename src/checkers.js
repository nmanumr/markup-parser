import {simpleHash} from "./utils.js";
// import * as XRegExp from 'xregexp';

function nodeChecker(expected, checkText = false, shouldThrowError = true) {
  return (node, parser) => {
    const computedHash = simpleHash(checkText ? node.innerText : node.innerHTML);
    if (computedHash !== hash) {
      const fn = shouldThrowError ? parser.registerError : parser.registerWarning;
      fn(node, `Hash doesn't match expected value. Expected '${hash}' got '${computedHash}'.`);
    }
  }
}

function nodeCheckerFactory(options) {
  if (typeof options === 'function') {
    options = {
      computeFn: options
    }
  }
  if (!options) {
    options = {}
  }
  if (!options.computeFn) {
    options.computeFn = (text) => text;
  }
  if (!options.compareFn) {
    options.compareFn = (expected, computed) => expected === computed;
  }
  if (!options.computeData) {
    options.computeData = () => null;
  }

  return (expected, shouldThrowError = false, checkType = 'html') => {
    return (node, parser) => {
      const type = options.textOnly ? 'text' : (options.htmlOnly ? 'html' : checkType);
      const text = type === 'text' ? node.innerText : node.innerHTML;
      const computed = options.computeFn(text, expected, type, parser);

      if (!options.compareFn(expected, computed, node, type, parser)) {
        const fn = shouldThrowError ? parser.registerError : parser.registerWarning;
        fn(node, `Value doesn't match expected value. Expected '${expected}' got '${computed}'.`);
      }

      return options.computeData(expected, computed, node, type, parser);
    };
  }
}

export const checkHash = nodeCheckerFactory(simpleHash);
export const checkLength = nodeCheckerFactory((text) => text.length);
export const checkSum = nodeCheckerFactory(
    (text) => text.split('').reduce((a, c) => a + c.charCodeAt(0), 0),
);

export const checkRegex = nodeCheckerFactory({
  textOnly: true,
  compareFn: (expected, computed) =>  !!XRegExp.match(computed, XRegExp(expected)),
  computeData: (expected, computed) => {
    return XRegExp.exec(computed, XRegExp(expected));
  }
});

export function ignore() {
  return () => {};
}
