import { QueryBase } from "../query_base";
import { _PARSER } from "../symbols";
import { SimpleObj } from "../types";
import { RulesObject } from "../parser";
import { isPlainObject, merge } from "../utils";
import { Matcher } from "./types";

export declare class QueryFunctions {
/**
 * Gets the first element of collection.
 */
first<T>(): this;

/**
 * Gets the last element of collection.
 */
last<T>(): this;

/**
 * Creates an array with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 */
compact(): this;

/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 */
chunk(size: number): this;

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 */
concat(collection2: Array<any> | IterableIterator<any>): this;


filter(predicate: (e, i) => boolean): this;

// @ts-ignore
length(): this;


map(iteratee: (e, i) => boolean): this;


toList(): this;

/**
 * Get the text content of input element including its descendants.
 *
 * @param node: HTML element
 * @param collapseSpaces: should collapse spaces
 * @returns inner text of the input HTML element
 */
text(collapseSpaces: boolean): this;

/**
 * Get the html content of descendants of input element
 *
 * @param node: HTML element
 * @returns inner html of the input HTML element
 */
html(): this;

/**
 * Get the html content of input element including its descendants (also includes element itself)
 *
 * @param node: HTML element
 * @returns outer html of the input HTML element
 */
fullHtml(): this;

/**
 * Get the value of an attribute of the input element
 *
 * @param node: HTML element
 * @param attr_name: attribute name to get value of
 * @returns attribute value
 */
attr(attr_name: string): this;

/**
 * Get value if input field of given element
 * @param node: HTML input element
 * @returns value of input field
 */
value(): this;

/**
 * Get classes of HTML Element
 * @param node: HTML element
 * @returns Array of all applied classes
 */
classes(): this;

/**
 * Get map of all data attributes. For example:
 *
 * ```html
 * <div data-lang="en" data-test="123"></div>
 * ```
 *
 * will return
 * ```js
 * {lang: 'en', test: '123'}
 * ```
 *
 * @param node: HTML element
 * @returns Map of all data attributes
 */
dataset(): this;

/**
 * Get the children of the input element
 * @param node HTML element
 * @returns children of given element
 */
children(): this;

// @ts-ignore
parent(): this;

/**
 * Get the ancestors of the input element up to but not including the given until selector.
 * if no util selector provided will return all the ancestors
 * @param node HTML element
 * @param until A selector expression to indicate where to stop matching ancestor elements
 * @param filter A string containing a selector expression to match elements against
 * @returns ancestors of the input element up to the given until selector or root of tree
 */
parents(until?: string, filter?: string): this;

/**
 * Get the siblings of the input element no includes the input element
 * @param node HTML element
 * @returns the siblings of the input element no includes the input element
 */
siblings(): this;

/**
 * Get the first element that matches the selector by testing the element itself
 * and traversing up through its ancestors in the DOM tree.
 * @param node HTML element
 * @param selector A string containing a selector expression to match elements against
 */
closest(selector: string): this;

/**
 * Get the descendants of the given element matched by the given selector
 * @param node HTML element
 * @param selector A string containing a selector expression to match elements against
 */
find(selector: string): this;

/**
 * Get the immediately following sibling of the input element
 * @param node HTML element
 */
next(): this;

/**
 * Get the immediately preceding sibling of the input element
 * @param node HTML element
 */
prev(): this;

/**
 * Get all the following sibling of the input element. Optionally filter by given filter.
 * @param node HTML element
 * @param filter A string containing a selector expression to match elements against
 */
nextAll(filter?: string): this;

/**
 * Get all the preceding sibling of the input element. Optionally filter by given filter
 * @param node HTML element
 * @param filter A string containing a selector expression to match elements against
 */
prevAll(filter?: string): this;


rules(rules: RulesObject): this;


tap(fn: QueryBase | Function): this;


trim(): this;


upperCase(): this;


lowerCase(): this;


regex(matcher: Matcher): this;


repeat(n: number): this;


replace(searchValue: string | RegExp, replacer: string | ((substring: string, ...args: any[]) => string)): this;


split(splitter: string, limit?: number): this;


startsWith(searchString: string, position?: number): this;
}