/**
 * Gets the first element of collection.
 */
function first<T>(collection: IterableIterator<any>): T | undefined {
    return collection.next().value;
}

/**
 * Gets the last element of collection.
 */
function last<T>(collection: IterableIterator<any>): T | undefined {
    let value;
    for (value of collection);
    return value;
}

/**
 * Creates an array with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 */
function* compact(collection: Array<any> | IterableIterator<any>) {
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
function* chunk(collection: Array<any> | IterableIterator<any>, size: number) {
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
    for (const e of collection1) {yield e;}
    for (const e of collection2) {yield e;}
}

function* filter(collection: Array<any> | IterableIterator<any>, predicate: (e, i) => boolean) {
    let i = 0;
    for (const e of collection) {
        if (predicate(e, i++))
            yield e;
    }
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
