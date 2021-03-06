# Trochaic

An ultra-light-weight template engine for Javascript based on [jQuery](https://jquery.com/)
and [jQuery replaceText](https://github.com/cburschka/jquery-replacetext).

## Template language

A template is either a string or a jQuery object. (HTML markup in the former
is ignored and printed literally.)

The placeholder syntax is one of the following:

* `{type:var1:...:varN}` invokes the renderer function "type" with the variables
  "var1" through "varN". Empty variable names will become `undefined` values.
* `{:var1:...:varN}` is short for `{var1:var1:...:varN}`, effectively using
  the first variable's name as the render type.
* `{var1}` is short for `{:var1}`.

Both types and variable names can contain periods to refer to nested object
properties.

## Requirements

Both [jQuery](https://jquery.com/) and [jQuery replaceText](https://github.com/cburschka/jquery-replacetext)
must be installed to use this library.

## Usage

A renderer system is a standard object of the form:

```js
var types = {
  type1: function(var1, /* ..., */ varN) {
    return "string";
  },

  type2: function(var) {
    return $('<span>Markup</span>');
  },

  person: function(person) {
    return person.firstname + " " + person.lastname;
  }
}
```

A newly constructed `Trochaic` object has a `render()` and a `process()`
function. The former renders templates, the latter renders a single variable.

```js
var trochaic = new Trochaic(types)
trochaic.render("Hello, {person}", {
  person: {
    firstname: 'John',
    lastname: 'Smith'
  }
});

trochaic.process('person', {
  firstname: 'John',
  lastname: 'Smith'
});
```

## License

The MIT License (MIT)

Copyright (c) 2014-2015 Christoph Burschka

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
