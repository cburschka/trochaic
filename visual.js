visual = {
  format: {
    /**
     * Escape < and > in a text.
     *
     * Wherever possible, this function should be avoided in favor of DOM
     * and jQuery methods like $.text() and Text().
     * Only use it when working on strings.
     */
    plain: function(text) {
      var replacers = {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'};
      return text ? text.replace(/[<>&"]/g, function(x) { return replacers[x]; }) : '';
    },

    raw: function(text) {
      return text;
    }
  },

  /**
   * Splice variables into a template with format identifiers.
   *
   * @param {string} text A format string with placeholders like {name1} and {format:name2}.
   * @param {Object} variables A hash keyed by variable name.
   *
   * Any placeholder with a corresponding variable will be replaced.
   * The variable will be processed either by the specified format, or the one
   * matching its name, or the "plaintext" formatter by default.
   * @return {string} The rendered text.
   */
  formatText: function(text, variables) {
    return text.replace(/{(?:(\w+):)?(\w+)}/g, function(rep, format, key) {
      if (key in variables) {
        var out = (visual.format[format || key] || visual.format.plain)(variables[key]);
        if (typeof out == 'string') return out;
      }
      return rep;
    });
  }
};
