import {includes, keys, clone} from 'lodash-es';

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
  if(includes(keys(obj), key)) {
    obj[newKey] = clone(obj[key]);

    delete obj[key];
  }
  return obj;
}
