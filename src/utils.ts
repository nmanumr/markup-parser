export function getPathTo(node: HTMLElement) {
    if (node.id !== '') {
        return `id("${node.id}")`;
    }
    if (node.parentElement === null) {
        return `/${node.tagName}`;
    }

    const sameTagSiblings = Array
        .from(node.parentNode.childNodes)
        .filter(e => e.nodeName === node.nodeName);
    const index = sameTagSiblings.indexOf(node);

    let path = `${getPathTo(node.parentNode as HTMLElement)}/${node.tagName}`;
    if (sameTagSiblings.length > 1) {
        path += `[${index + 1}]`;
    }
    return path;
}

export function rename(obj, key, newKey) {
    if (Object.keys(obj).includes(key)) {
        obj[newKey] = clone(obj[key]);

        delete obj[key];
    }
    return obj;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function isPlainObject(obj) {
    return obj !== null && typeof (obj) === "object" && Object.getPrototypeOf(obj) === Object.prototype
}

export function merge(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, {[key]: source[key]});
                else
                    output[key] = merge(target[key], source[key]);
            } else {
                Object.assign(output, {[key]: source[key]});
            }
        });
    }
    return output;
}

function isPrototype(value) {
    const Ctor = value && value.constructor
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype
    return value === proto
}

export function isEmpty(value) {
    if (value == null) {
        return true
    }
    if (typeof value !== 'object') {
        return !value;
    }
    // TODO: have better check for array-like objects
    if (value.hasOwnProperty('length')) {
        return !value.length
    }
    if (value.toString() == '[object Map]' || value.toString() == '[object Set]') {
        return !value.size
    }
    if (isPrototype(value)) {
        return !Object.keys(value).length
    }
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            return false
        }
    }
    return true
}

export function clone(obj) {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const temp = obj.constructor(); // changed
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}

