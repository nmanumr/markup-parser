import {includes, keys, clone} from 'lodash-es';

// TODO: improve to something like this:
// https://github.com/puleos/object-hash/blob/master/index.js#L167
export function simpleHash(obj) {
  return obj
      .toString()
      .split('')
      .reduce((hash, char) => {
        hash = ((hash << 5) - hash) + char;
        return hash & hash;
      }, 0);
}

export function getPathTo(node) {
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

  let path = `${getPathTo(node.parentNode)}/${node.tagName}`;
  if (sameTagSiblings.length > 1) {
    path += `[${index + 1}]`;
  }
  return path;
}

export function rename(obj, key, newKey) {
  if(includes(keys(obj), key)) {
    obj[newKey] = clone(obj[key]);

    delete obj[key];
  }
  return obj;
}
