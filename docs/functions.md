## `first()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/array.ts#L1)



### Input

* `Array<T>`: 

### Output

* `T | undefined`: 

## `last()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/array.ts#L5)



### Input

* `Array<T>`: 

### Output

* `T | undefined`: 

## `text([collapseSpaces])`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L7)

Get inner text from HTML Element

### Input

* `HTMLElement`: HTML element

### Output

* `string`: inner text of the input HTML element

### Parameters

* `collapseSpaces?`: should collapse spaces(default true)

## `html()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L20)

Get inner html from HTML Element

### Input

* `HTMLElement`: HTML element

### Output

* `string`: inner html of the input HTML element

## `fullHtml()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L29)

Get inner html from HTML Element

### Input

* `HTMLElement`: HTML element

### Output

* `string`: outer html of the input HTML element

## `attr(attr_name)`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L39)

Get attribute from HTML Element

### Input

* `HTMLElement`: HTML element

### Output

* `string`: attribute value

### Parameters

* `attr_name(string)`: attribute name to get value of

## `value()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L48)

Get value if input field of given element

### Input

* `HTMLInputElement`: HTML input element

### Output

* `string`: value of input field

## `classes()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L57)

Get classes of HTML Element

### Input

* `HTMLElement`: HTML element

### Output

* `Array`: Array of all applied classes

## `dataset()`
[Source](https:/github.com/nmanumr/mark-parser/tree/master/src/functions/dom.ts#L76)

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

