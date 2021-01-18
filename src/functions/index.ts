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
    }
];