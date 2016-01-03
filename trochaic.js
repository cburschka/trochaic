/*!
 * Trochaic
 *
 * Copyright 2014-2015 Christoph Burschka
 * Released under the MIT license.
 */
var Trochaic = (function() {
  /**
   * Initialize the template engine.
   *
   * @param {object} types An object containing rendering functions.
   */
  function Trochaic(types) {
    return {
      types: types,
      render: render
    };
  }

  /**
   * Render a template.
   *
   * @param {string|object} template A template, either a string or jQuery content.
   * @param {object} variables A hash keyed by variable name.
   *
   * @return {object} The rendered DOM tree.
   */
  function render(template, variables) {
    if (typeof(text) === 'string') text = $('<span>').text(text);
    text.find('*').addBack() // include all descendants and the top element.
      .replaceText(/({(?:(\w+):)?(\w+)})/g, function(rep, type, key) {
        if (variables && key in variables) {
          if ((type || key) in this.types) {
            return this.types[type || key](variables[key]);
          }
          return variables[key];
        }
        return rep;
      });
    return text;
  }

  return Trochaic;
})();
