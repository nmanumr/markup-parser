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
first<T>(collection: string | Array<any> | IterableIterator<any>): 'QueryFunctions';

/**
 * Gets the last element of collection.
 */
last<T>(collection: string | Array<any> | IterableIterator<any>): 'QueryFunctions';

/**
 * Creates an array with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 */
compact(collection: string | Array<any> | IterableIterator<any>): 'QueryFunctions';

/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 */
chunk(collection: string | Array<any> | IterableIterator<any>, size: number): 'QueryFunctions';

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 */
concat(collection1: Array<any> | IterableIterator<any>, collection2: Array<any> | IterableIterator<any>): 'QueryFunctions';


filter(collection: Array<any> | IterableIterator<any>, predicate: (e, i) => boolean): 'QueryFunctions';

// @ts-ignore
length(collection: Array<any> | IterableIterator<any> | string): 'QueryFunctions';


map(collection: Array<any> | IterableIterator<any>, iteratee: (e, i) => boolean): 'QueryFunctions';


toList(collection: Array<any> | IterableIterator<any>): 'QueryFunctions';

/**
 * Get the text content of input element including its descendants.
 *
 * @param node: HTML element
 * @param collapseSpaces: should collapse spaces
 * @returns inner text of the input HTML element
 */
text(node: HTMLElement, collapseSpaces: boolean): 'QueryFunctions';

/**
 * Get the html content of descendants of input element
 *
 * @param node: HTML element
 * @returns inner html of the input HTML element
 */
html(node: HTMLElement): 'QueryFunctions';

/**
 * Get the html content of input element including its descendants (also includes element itself)
 *
 * @param node: HTML element
 * @returns outer html of the input HTML element
 */
fullHtml(node: HTMLElement): 'QueryFunctions';

/**
 * Get the value of an attribute of the input element
 *
 * @param node: HTML element
 * @param attr_name: attribute name to get value of
 * @returns attribute value
 */
attr(node: HTMLElement, attr_name: string): 'QueryFunctions';

/**
 * Get value if input field of given element
 * @param node: HTML input element
 * @returns value of input field
 */
value(node: HTMLInputElement): 'QueryFunctions';

/**
 * Get classes of HTML Element
 * @param node: HTML element
 * @returns Array of all applied classes
 */
classes(node: HTMLElement): 'QueryFunctions';

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
dataset(node: HTMLElement): 'QueryFunctions';

/**
 * Get the children of the input element
 * @param node HTML element
 * @returns children of given element
 */
children(node: HTMLElement): 'QueryFunctions';

// @ts-ignore
parent(node: HTMLElement): 'QueryFunctions';

/**
 * Get the ancestors of the input element up to but not including the given until selector.
 * if no util selector provided will return all the ancestors
 * @param node HTML element
 * @param until A selector expression to indicate where to stop matching ancestor elements
 * @param filter A string containing a selector expression to match elements against
 * @returns ancestors of the input element up to the given until selector or root of tree
 */
parents(node: HTMLElement, until?: string, filter?: string): 'QueryFunctions';

/**
 * Get the siblings of the input element no includes the input element
 * @param node HTML element
 * @returns the siblings of the input element no includes the input element
 */
siblings(node: HTMLElement): 'QueryFunctions';

/**
 * Get the first element that matches the selector by testing the element itself
 * and traversing up through its ancestors in the DOM tree.
 * @param node HTML element
 * @param selector A string containing a selector expression to match elements against
 */
closest(node: HTMLElement, selector: string): 'QueryFunctions';

/**
 * Get the descendants of the given element matched by the given selector
 * @param node HTML element
 * @param selector A string containing a selector expression to match elements against
 */
find(node: HTMLElement, selector: string): 'QueryFunctions';

/**
 * Get the immediately following sibling of the input element
 * @param node HTML element
 */
next(node: HTMLElement): 'QueryFunctions';

/**
 * Get the immediately preceding sibling of the input element
 * @param node HTML element
 */
prev(node: HTMLElement): 'QueryFunctions';

/**
 * Get all the following sibling of the input element. Optionally filter by given filter.
 * @param node HTML element
 * @param filter A string containing a selector expression to match elements against
 */
nextAll(node: HTMLElement, filter?: string): 'QueryFunctions';

/**
 * Get all the preceding sibling of the input element. Optionally filter by given filter
 * @param node HTML element
 * @param filter A string containing a selector expression to match elements against
 */
prevAll(node: HTMLElement, filter?: string): 'QueryFunctions';


rules(nodes: Element[], rules: RulesObject): 'QueryFunctions';


tap(data, fn: QueryBase | Function): 'QueryFunctions';


trim(input: string): 'QueryFunctions';


upperCase(input: string): 'QueryFunctions';


lowerCase(input: string): 'QueryFunctions';


regex(input: string, matcher: Matcher): 'QueryFunctions';


repeat(input: string, n: number): 'QueryFunctions';


replace(input: string, searchValue: string | RegExp, replacer: string | ((substring: string, ...args: any[]) => string)): 'QueryFunctions';


split(input: string, splitter: string, limit?: number): 'QueryFunctions';


startsWith(input: string, searchString: string, position?: number): 'QueryFunctions';
}