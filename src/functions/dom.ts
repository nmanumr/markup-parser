/**
 * Get the text content of input element including its descendants.
 *
 * @param node: HTML element
 * @param collapseSpaces: should collapse spaces
 * @returns inner text of the input HTML element
 */
function text(node: HTMLElement, collapseSpaces: boolean = true): string {
    let text = node.innerText;
    if (collapseSpaces && text) {
        text = text.replace(/\s+/g, ' ').trim();
    }
    return text;
}

/**
 * Get the html content of descendants of input element
 *
 * @param node: HTML element
 * @returns inner html of the input HTML element
 */
function html(node: HTMLElement): string {
    return node.innerHTML;
}

/**
 * Get the html content of input element including its descendants (also includes element itself)
 *
 * @param node: HTML element
 * @returns outer html of the input HTML element
 */
function fullHtml(node: HTMLElement): string {
    return node.outerHTML;
}

/**
 * Get the value of an attribute of the input element
 *
 * @param node: HTML element
 * @param attr_name: attribute name to get value of
 * @returns attribute value
 */
function attr(node: HTMLElement, attr_name: string): string {
    return node.getAttribute(attr_name);
}

/**
 * Get value if input field of given element
 * @param node: HTML input element
 * @returns value of input field
 */
function value(node: HTMLInputElement): string {
    return node.value;
}

/**
 * Get classes of HTML Element
 * @param node: HTML element
 * @returns Array of all applied classes
 */
function classes(node: HTMLElement): Array<string> {
    return Array.from(node.classList);
}

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
function dataset(node: HTMLElement): Object {
    return node.dataset;
}

/**
 * Get the children of the input element
 * @param node HTML element
 * @returns children of given element
 */
function children(node: HTMLElement): HTMLElement[] {
    return Array.from(node.children) as HTMLElement[];
}

/**
 * Get the parent of the input element
 * @param node HTML element
 * @returns children of given element
 */
// @ts-ignore
function parent(node: HTMLElement): HTMLElement {
    return node.parentNode as HTMLElement;
}

/**
 * Get the ancestors of the input element up to but not including the given until selector.
 * if no util selector provided will return all the ancestors
 * @param node HTML element
 * @param until A selector expression to indicate where to stop matching ancestor elements
 * @param filter A string containing a selector expression to match elements against
 * @returns ancestors of the input element up to the given until selector or root of tree
 */
function parents(node: HTMLElement, until?: string, filter?: string) {
    const result = [];
    const matchesSelector = node.matches || node.webkitMatchesSelector;

    node = node.parentElement;
    while (node && !(until && matchesSelector.call(node, until))) {
        if (!filter) {
            result.push(node);
        } else {
            if (matchesSelector.call(node, filter)) {
                result.push(node);
            }
        }
        node = node.parentElement;
    }
    return result;
}

/**
 * Get the siblings of the input element no includes the input element
 * @param node HTML element
 * @returns the siblings of the input element no includes the input element
 */
function siblings(node: HTMLElement): HTMLElement[] {
    return Array.from(node.parentNode.children).filter((child) => child !== node) as HTMLElement[];
}

/**
 * Get the first element that matches the selector by testing the element itself
 * and traversing up through its ancestors in the DOM tree.
 * @param node HTML element
 * @param selector A string containing a selector expression to match elements against
 */
function closest(node: HTMLElement, selector: string): HTMLElement {
    return node.closest(selector);
}

/**
 * Get the descendants of the given element matched by the given selector
 * @param node HTML element
 * @param selector A string containing a selector expression to match elements against
 */
function find(node: HTMLElement, selector: string): HTMLElement[] {
    return Array.from(node.querySelectorAll(selector));
}

/**
 * Get the immediately following sibling of the input element
 * @param node HTML element
 */
function next(node: HTMLElement): Element {
    return node.nextElementSibling;
}

/**
 * Get the immediately preceding sibling of the input element
 * @param node HTML element
 */
function prev(node: HTMLElement): Element {
    return node.previousElementSibling;
}

/**
 * Get all the following sibling of the input element. Optionally filter by given filter.
 * @param node HTML element
 * @param filter A string containing a selector expression to match elements against
 */
function nextAll(node: HTMLElement, filter?: string): HTMLElement[] {
    const siblings = [];
    let elm: Element = node.nextElementSibling;
    while (elm) {
        if (elm.nodeType === 3) continue; // ignore text nodes
        if (!filter || elm.matches(filter)) siblings.push(elm);
        elm = elm.nextElementSibling
    }
    return siblings;
}

/**
 * Get all the preceding sibling of the input element. Optionally filter by given filter
 * @param node HTML element
 * @param filter A string containing a selector expression to match elements against
 */
function prevAll(node: HTMLElement, filter?: string): HTMLElement[] {
    const siblings = [];
    let elm: Element = node.previousElementSibling;
    while (elm) {
        if (elm.nodeType === 3) continue; // ignore text nodes
        if (!filter || elm.matches(filter)) siblings.push(elm);
        elm = elm.previousElementSibling
    }
    return siblings;
}
