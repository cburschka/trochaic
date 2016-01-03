visual = {
  /**
   * Poor man's sprintf, with some features from Drupal's t().
   * Splice variables into a template, optionally escaping them.
   *
   * @param {string} text A format string with placeholders like {a} and [b].
   * @param {Object} variables A hash keyed by variable name.
   *
   * Any placeholder with a corresponding variable will be replaced.
   * If the placeholder is in curly brackets, the variable will be HTML-escaped.
   * @return {string} The rendered text.
   */
  formatText: function(text, variables) {
    text = text.replace(/\{([a-z]+)\}|\[([a-z]+)\]/g, function(rep, plain, raw) {
      var key = plain || raw;
      return typeof variables[key] == 'string' ? (plain ? visual.textPlain(variables[key]) : variables[key]) : rep;
    });
    return text;
  },

  /**
   * Escape < and > in a text.
   *
   * Wherever possible, this function should be avoided in favor of DOM
   * and jQuery methods like $.text() and Text().
   * Only use it when working on strings.
   */
  textPlain: function(text) {
    var replacers = {'<': '&lt;', '>': '&gt;', '&':'&amp;'};
    return text.replace(/[<>&]/g, function(x) { return replacers[x]; });
  }
};
