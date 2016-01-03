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
    return render(processor(types));
  }

  /**
   * placeholder = "{" , [ [ type ] , ":" , { [ argument ] , ":" } ] key "}"
   * type        = identifier
   * argument    = identifier
   * key         = identifier
   * identifier  = character, { character }
   * character   = alphabetic | digit | "_"
   *
   * If "type" is not given, it will default to "key".
   */
  var pattern = /({(?:(\w*):(?:([\w:]*):)?)?(\w+)})/g;

  function render(processor) {
    /**
     * Render a template.
     *
     * @param {string|object} template A template, either a string or jQuery content.
     * @param {object} variables A hash keyed by variable name.
     *
     * @return {object} The rendered DOM tree.
     */
    return function (template, variables) {
      if (typeof(template) === 'string') template = $('<span>').text(template);
      template.find('*').addBack() // include all descendants and the top element.
        .replaceText(pattern, processor(variables));
      return template;
    }
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
      /**
       * Process a placeholder.
       *
       * @param {string} rep The entire placeholder.
       * @param {string} type The renderer (possibly empty).
       * @param {string} args A colon-separated string of arguments (or null).
       * @param {key} key The variable name.
       *
       * @return {string|object} The rendered output.
       */
      return function(rep, type, args, key) {
        return (variables && key in variables) ?
          (types[type || key] || id).apply(this, 
            [variables[key]].concat(args && args.split(":"))
          )
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
