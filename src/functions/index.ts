// Auto generated file. DO NOT EDIT
export const functions = [
    {
        name: "first",
        inputType: Array,
        outputType: ['T', undefined],
        fn: function <T>(arr: Array<T>): T | undefined {
            return arr[0];
        }
    },
    {
        name: "last",
        inputType: Array,
        outputType: ['T', undefined],
        fn: function <T>(arr: Array<T>): T | undefined {
            return arr[arr.length - 1];
        }
    },
    {
        name: "text",
        inputType: HTMLElement,
        outputType: String,
        fn: function (node: HTMLElement, collapseSpaces: boolean = true): string {
            let text = node.innerText;
            if (collapseSpaces && text) {
                text = text.replace(/\s+/g, " ").trim();
            }
            return text;
        }
    },
    {
        name: "html",
        inputType: HTMLElement,
        outputType: String,
        fn: function (node: HTMLElement): string {
            return node.innerHTML;
        }
    },
    {
        name: "fullHtml",
        inputType: HTMLElement,
        outputType: String,
        fn: function (node: HTMLElement): string {
            return node.outerHTML;
        }
    },
    {
        name: "attr",
        inputType: HTMLElement,
        outputType: String,
        fn: function (node: HTMLElement, attr_name: string): string {
            return node.getAttribute(attr_name);
        }
    },
    {
        name: "value",
        inputType: HTMLInputElement,
        outputType: String,
        fn: function (node: HTMLInputElement): string {
            return node.value;
        }
    },
    {
        name: "classes",
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement): Array<string> {
            return Array.from(node.classList);
        }
    },
    {
        name: "dataset",
        inputType: HTMLElement,
        outputType: Object,
        fn: function (node: HTMLElement): Object {
            return node.dataset;
        }
    },
    {
        name: "children",
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement): HTMLElement[] {
            return Array.from(node.children) as HTMLElement[];
        }
    },
    {
        name: "parent",
        inputType: HTMLElement,
        outputType: HTMLElement,
        fn: function (node: HTMLElement): HTMLElement {
            return node.parentNode as HTMLElement;
        }
    },
    {
        name: "parents",
        inputType: HTMLElement,
        fn: function (node: HTMLElement, until?: string, filter?: string) {
            const result = [];
            const matchesSelector = node.matches || node.webkitMatchesSelector;
            node = node.parentElement;
            while (node && !(until && matchesSelector.call(node, until))) {
                if (!filter) {
                    result.push(node);
                }
                else {
                    if (matchesSelector.call(node, filter)) {
                        result.push(node);
                    }
                }
                node = node.parentElement;
            }
            return result;
        }
    },
    {
        name: "siblings",
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement): HTMLElement[] {
            return Array.from(node.parentNode.children).filter((child) => child !== node) as HTMLElement[];
        }
    },
    {
        name: "closest",
        inputType: HTMLElement,
        outputType: HTMLElement,
        fn: function (node: HTMLElement, selector: string): HTMLElement {
            return node.closest(selector);
        }
    },
    {
        name: "find",
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement, selector: string): HTMLElement[] {
            return Array.from(node.querySelectorAll(selector));
        }
    },
    {
        name: "next",
        inputType: HTMLElement,
        outputType: Element,
        fn: function (node: HTMLElement): Element {
            return node.nextElementSibling;
        }
    },
    {
        name: "prev",
        inputType: HTMLElement,
        outputType: Element,
        fn: function (node: HTMLElement): Element {
            return node.previousElementSibling;
        }
    },
    {
        name: "nextAll",
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement, filter?: string): HTMLElement[] {
            const siblings = [];
            let elm: Element = node.nextElementSibling;
            while (elm) {
                if (elm.nodeType === 3)
                    continue;
                if (!filter || elm.matches(filter))
                    siblings.push(elm);
                elm = elm.nextElementSibling;
            }
            return siblings;
        }
    },
    {
        name: "prevAll",
        inputType: HTMLElement,
        outputType: Array,
        fn: function (node: HTMLElement, filter?: string): HTMLElement[] {
            const siblings = [];
            let elm: Element = node.previousElementSibling;
            while (elm) {
                if (elm.nodeType === 3)
                    continue;
                if (!filter || elm.matches(filter))
                    siblings.push(elm);
                elm = elm.previousElementSibling;
            }
            return siblings;
        }
    }
];