function first<T>(arr: Array<T>): T | undefined {
    return arr[0];
}

function last<T>(arr: Array<T>): T | undefined {
    return arr[arr.length - 1];
}
