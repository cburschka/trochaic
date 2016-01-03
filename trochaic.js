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
      processor: processor(types),
      render: render,
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
    if (typeof(template) === 'string') template = $('<span>').text(template);
    template.find('*').addBack() // include all descendants and the top element.
      .replaceText(/({(?:(\w+):)?(\w+)})/g, this.processor(variables));
    return template;
  }

  /**
   * Generate a processor generator.
   *
   * This function is curried to successively fill the scope with the types
   * (once on initialization), the variables (once per invocation), and the
   * placeholder (once per match).
   *
   * types -> variables -> (rep, type, key) -> output
   */
  function processor(types) {
    return function(variables) {
      return function(rep, type, key) {
        return (variables && key in variables) ?
               (types[type || key] || id)(variables[key])
             : rep;
      }
    }
  }

  /**
   * Identity function.
   */
  function id(x) {
    return x;
  }

  return Trochaic;
})();
