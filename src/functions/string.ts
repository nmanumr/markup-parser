import { Matcher } from "./types";

function trim(input: string): string {
    return input.trim();
}

function upperCase(input: string): string {
    return input.toUpperCase();
}

function lowerCase(input: string): string {
    return input.toLowerCase();
}

function regex(input: string, matcher: Matcher): Array<string> | null {
    return input.match(matcher);
}

function repeat(input: string, n: number): string {
    return input.repeat(n);
}

function replace(input: string, searchValue: string | RegExp, replacer: string | ((substring: string, ...args: any[]) => string)): string {
    return input.replace(searchValue, replacer as any);
}

function split(input: string, splitter: string, limit?: number): Array<string> {
    return input.split(splitter, limit);
}

function startsWith(input: string, searchString: string, position?: number): boolean {
    return input.startsWith(searchString, position);
}
