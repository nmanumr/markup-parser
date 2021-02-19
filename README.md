# Markup Parser
A rule-based markup parser for fast web scrapping.

## Why `markup-parser`?
The main motivation behind the development of markup-parser
was to write a scrapping tool that can provide following:

1. Parsing should be done based on straightforward rules.
Instead of a lot of query selectors all spread across the JS code.
2. If the structure of the markup we are parsing is changed our parser
should be aware something has been changed. (this feature is still underdevelopment)


## Getting Started

Install required Packages

```bash
npm i @nmanumr/markup-parser

# For NodeJs environment JsDOM is required
# you can install it using:
npm i jsdom
```

### For NodeJs environment
```js
const { JSDOM } = require('jsdom');
const { Parser, q } = require('@nmanumr/markup-parser');

const rules = {
  'p': q.first().text(),
};
const dom = new JSDOM('<html><p>Hello world</p>');
const data = new Parser()
    .parse(dom.window.document.documentElement, rules);

console.log(data);
// => { 'p': 'Hello world' }
```

### For browsers
```js
import { Parser, q } from '@nmanumr/markup-parser');

const rules = {
  'p': q.first().text(),
};

// or alternatively you can also pass a query selected element
// like this: 
// const ma
const markup = '<html><p>Hello world</p>';
const data = new Parser()
    .parse(markup, rules);
console.log(data);
// should return text of first p tag
```

Alternatively, you can also pass a query selected element like this:
```js
const element = document.querySelector('SOME_QUERY');
const data = new Parser()
    .parse(element, rules);
```

## Basic Concepts

### Query
Query is a 

