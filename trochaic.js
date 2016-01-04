/*!
 * Trochaic
 *
 * Copyright 2014-2015 Christoph Burschka
 * Released under the MIT license.
 */
var Trochaic = (function($) {
  /**
   * Initialize the template engine.
   *
   * @param {object} types An object containing rendering functions.
   */
  function Trochaic(types) {
    return render(processor(types));
  }

  /**
   * placeholder = "{" ,
   *                (
   *                  ( [ type ] , ":" , variable1 , { ":" , [ variable ] } )
   *                  | variable1
   *                ) ,
   *               "}"
   * type        = identifier
   * variable1   = variable
   * variable    = identifier
   * identifier  = token , { "." , token }
   * token       = character, { character }
   * character   = alphabetic | digit | "_"
   *
   * If "type" is not given, it will default to "variable1".
   */
  var pattern = /{(?:([\w.]*):([\w:.]*)|([\w.]+))}/g;

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
   * types -> variables -> (rep, type, args, arg) -> output
   */
  function processor(types) {
    return function(variables) {
      /**
       * Process a placeholder.
       *
       * @param {string} type The renderer (possibly empty).
       * @param {string} args A colon-separated string of variable names (or null).
       * @param {string} arg A single variable name.
       *
       * @return {string|object} The rendered output.
       */
      return function(type, args, arg) {
        args = args ? args.split(":") : [arg];
        return (get(type || args[0], types) || id).apply(this,
          args.map(function(i) { return i ? get(i, variables) : undefined; })
        );
      }
    }
  }

  /**
   * Identity function.
   */
  function id(x) {
    return x;
  }

  /**
   * Retrieve a dot-separated path of properties from an object.
   */
  function get(query, object) {
    query = query.split('.');
    for (var i in query) {
      object = object && object[query[i]] || (typeof object == 'function' && object(query[i]));
    }
    return object;
  }

  return Trochaic;
})(jQuery);
