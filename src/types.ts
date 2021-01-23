import {Query} from "./query";
import {Parser} from "./parser";

export type SimpleObj = { [name: string]: any };

export interface FnOptions {
    inputType?: any | any[],
    outputType?: any | any[],
}

export interface RuleHandlerFn {
    (nodes: Array<Element>, parser: Parser): any;
}

export type RuleHandler = Query | RulesObject | RuleHandlerFn;

export interface RulesObject {
    [selector: string]: RuleHandler;
}
