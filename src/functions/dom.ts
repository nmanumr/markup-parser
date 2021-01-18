/**
 * Get inner text from HTML Element
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
 * Get inner html from HTML Element
 * @param node: HTML element
 * @returns inner html of the input HTML element
 */
function html(node: HTMLElement): string {
    return node.innerHTML;
}

/**
 * Get inner html from HTML Element
 * @param node: HTML element
 * @returns outer html of the input HTML element
 */
function fullHtml(node: HTMLElement): string {
    return node.outerHTML;
}

/**
 * Get attribute from HTML Element
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
