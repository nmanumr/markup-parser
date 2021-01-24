/**
 * Gets the first element of collection.
 */
function first<T>(collection: string | Array<any> | IterableIterator<any>): T | undefined {
    if (typeof collection['next'] === 'function') {
        return collection['next']().value;
    }
    return collection[0];
}

/**
 * Gets the last element of collection.
 */
function last<T>(collection: string | Array<any> | IterableIterator<any>): T | undefined {
    if (typeof collection['length'] === 'number') {
        return collection[collection['length'] - 1];
    }
    let value;
    for (value of collection) ;
    return value;
}

/**
 * Creates an array with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 */
function* compact(collection: string | Array<any> | IterableIterator<any>) {
    for (const e of collection) {
        if (e) {
            yield e;
        }
    }
}

/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 */
function* chunk(collection: string | Array<any> | IterableIterator<any>, size: number) {
    let chunk = []
    for (const e of collection) {
        if (chunk.length >= size) {
            yield chunk;
            chunk = [];
        }
        chunk.push(e);
    }
    yield chunk;
}

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 */
function* concat(collection1: Array<any> | IterableIterator<any>, collection2: Array<any> | IterableIterator<any>) {
    for (const e of collection1) {
        yield e;
    }
    for (const e of collection2) {
        yield e;
    }
}

function* filter(collection: Array<any> | IterableIterator<any>, predicate: (e, i) => boolean) {
    let i = 0;
    for (const e of collection) {
        if (predicate(e, i++))
            yield e;
    }
}

// @ts-ignore
function length(collection: Array<any> | IterableIterator<any> | string): number {
    if (collection.hasOwnProperty('length')) {
        return (collection as Array<any>).length;
    }
    let i = 0;
    for (let e of collection) {
        i++;
    }
    return i;
}

function* map(collection: Array<any> | IterableIterator<any>, iteratee: (e, i) => boolean) {
    let i = 0;
    for (const e of collection) {
        yield iteratee(e, i++);
    }
}

function* tap(collection: Array<any> | IterableIterator<any>, iteratee: (e, i) => boolean) {
    let i = 0;
    for (const e of collection) {
        iteratee(e, i);
        yield e;
    }
}

function toList(collection: Array<any> | IterableIterator<any>) {
    return Array.from(collection);
}
