## `first()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L7)

Gets the first element of collection.

### Input

* `string | Array | IterableIterator<T>`: 

### Output

* `T | undefined`: 

## `last()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L17)

Gets the last element of collection.

### Input

* `string | Array | IterableIterator<T>`: 

### Output

* `T | undefined`: 

## `compact()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L30)

Creates an array with all falsey values removed.
The values false, null, 0, "", undefined, and NaN are falsey.

### Input

* `string | Array | IterableIterator`: 

### Output

* `undefined`: 

## `chunk(size)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L42)

Creates an array of elements split into groups the length of size.
If array can't be split evenly, the final chunk will be the remaining elements.

### Input

* `string | Array | IterableIterator`: 

### Output

* `undefined`: 

### Parameters

* `size(number)`: 

## `concat(collection2)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L57)

Creates a new array concatenating array with any additional arrays and/or values.

### Input

* `Array | IterableIterator`: 

### Output

* `undefined`: 

### Parameters

* `collection2(Array | IterableIterator)`: 

## `filter(predicate)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L66)



### Input

* `Array | IterableIterator`: 

### Output

* `undefined`: 

### Parameters

* `predicate`: 

## `length()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L75)

// @ts-ignore

### Input

* `Array | IterableIterator | string`: 

### Output

* `number`: 

## `map(iteratee)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L86)



### Input

* `Array | IterableIterator`: 

### Output

* `undefined`: 

### Parameters

* `iteratee`: 

## `toList()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/collection.ts#L96)



### Input

* `Array | IterableIterator`: 

### Output

* `undefined`: 

## `text(collapseSpaces)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L8)

Get the text content of input element including its descendants.

### Input

* `HTMLElement`: HTML element

### Output

* `string`: inner text of the input HTML element

### Parameters

* `collapseSpaces`: should collapse spaces

## `html()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L22)

Get the html content of descendants of input element

### Input

* `HTMLElement`: HTML element

### Output

* `string`: inner html of the input HTML element

## `fullHtml()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L32)

Get the html content of input element including its descendants (also includes element itself)

### Input

* `HTMLElement`: HTML element

### Output

* `string`: outer html of the input HTML element

## `attr(attr_name)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L43)

Get the value of an attribute of the input element

### Input

* `HTMLElement`: HTML element

### Output

* `string`: attribute value

### Parameters

* `attr_name(string)`: attribute name to get value of

## `value()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L52)

Get value if input field of given element

### Input

* `HTMLInputElement`: HTML input element

### Output

* `string`: value of input field

## `classes()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L61)

Get classes of HTML Element

### Input

* `HTMLElement`: HTML element

### Output

* `Array`: Array of all applied classes

## `dataset()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L80)

Get map of all data attributes. For example:

```html
<div data-lang="en" data-test="123"></div>
```

will return
```js
{lang: 'en', test: '123'}
```

### Input

* `HTMLElement`: HTML element

### Output

* `Object`: Map of all data attributes

## `children()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L89)

Get the children of the input element

### Input

* `HTMLElement`: HTML element

### Output

* `Array`: children of given element

## `parent()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L99)

// @ts-ignore

### Input

* `HTMLElement`: 

### Output

* `HTMLElement`: 

## `parents([until], [filter])`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L111)

Get the ancestors of the input element up to but not including the given until selector.
if no util selector provided will return all the ancestors

### Input

* `HTMLElement`: HTML element

### Output

* `undefined`: ancestors of the input element up to the given until selector or root of tree

### Parameters

* `until?(string)`: A selector expression to indicate where to stop matching ancestor elements
* `filter?(string)`: A string containing a selector expression to match elements against

## `siblings()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L134)

Get the siblings of the input element no includes the input element

### Input

* `HTMLElement`: HTML element

### Output

* `Array`: the siblings of the input element no includes the input element

## `closest(selector)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L144)

Get the first element that matches the selector by testing the element itself
and traversing up through its ancestors in the DOM tree.

### Input

* `HTMLElement`: HTML element

### Output

* `HTMLElement`: 

### Parameters

* `selector(string)`: A string containing a selector expression to match elements against

## `find(selector)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L153)

Get the descendants of the given element matched by the given selector

### Input

* `HTMLElement`: HTML element

### Output

* `Array`: 

### Parameters

* `selector(string)`: A string containing a selector expression to match elements against

## `next()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L161)

Get the immediately following sibling of the input element

### Input

* `HTMLElement`: HTML element

### Output

* `Element`: 

## `prev()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L169)

Get the immediately preceding sibling of the input element

### Input

* `HTMLElement`: HTML element

### Output

* `Element`: 

## `nextAll([filter])`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L178)

Get all the following sibling of the input element. Optionally filter by given filter.

### Input

* `HTMLElement`: HTML element

### Output

* `Array`: 

### Parameters

* `filter?(string)`: A string containing a selector expression to match elements against

## `prevAll([filter])`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L194)

Get all the preceding sibling of the input element. Optionally filter by given filter

### Input

* `HTMLElement`: HTML element

### Output

* `Array`: 

### Parameters

* `filter?(string)`: A string containing a selector expression to match elements against

## `rules(rules)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/misc.ts#L7)



### Input

* `Array`: 

### Output

* `undefined`: 

### Parameters

* `rules(RulesObject)`: 

## `tap(fn)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/misc.ts#L40)



### Input

* `undefined`: 

### Output

* `undefined`: 

### Parameters

* `fn(QueryBase | Function)`: 

## `trim()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L3)



### Input

* `string`: 

### Output

* `string`: 

## `upperCase()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L7)



### Input

* `string`: 

### Output

* `string`: 

## `lowerCase()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L11)



### Input

* `string`: 

### Output

* `string`: 

## `regex(matcher)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L15)



### Input

* `string`: 

### Output

* `Array | null`: 

### Parameters

* `matcher(Matcher)`: 

## `repeat(n)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L19)



### Input

* `string`: 

### Output

* `string`: 

### Parameters

* `n(number)`: 

## `replace(searchValue, replacer)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L23)



### Input

* `string`: 

### Output

* `string`: 

### Parameters

* `searchValue(string | RegExp)`: 
* `replacer(string | )`: 

## `split(splitter, [limit])`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L27)



### Input

* `string`: 

### Output

* `Array`: 

### Parameters

* `splitter(string)`: 
* `limit?(number)`: 

## `startsWith(searchString, [position])`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/string.ts#L31)



### Input

* `string`: 

### Output

* `undefined`: 

### Parameters

* `searchString(string)`: 
* `position?(number)`: 

