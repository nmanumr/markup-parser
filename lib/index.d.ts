interface FnOptions {
    inputType?: any | any[];
    outputType?: any | any[];
}
declare class Query {
    constructor();
    run(nodes: Array<Element>, parser: any): any[];
    registerFn(name: string, fn: (...args: any[]) => any, options?: FnOptions): void;
}
declare const q: Query;

declare type SimpleObj = {
    [name: string]: any;
};

interface RuleHandlerFn {
    (nodes: Array<Element>, parser: Parser): any;
}
declare type RuleHandler = Query | RulesObject | RuleHandlerFn;
interface RulesObject {
    [selector: string]: RuleHandler;
}
declare class Parser {
    private errors;
    private warnings;
    registerError(error: any): void;
    registerWarning(warning: any): void;
    private sortRules;
    parse(markup: string | Element, rules: RulesObject | Query): SimpleObj;
}

export { Parser, q };
