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
      var replacers = {'<': '&lt;', '>': '&gt;', '&':'&amp;'};
      return text.replace(/[<>&]/g, function(x) { return replacers[x]; });
    },

    raw: function(text) {
      return text;
    }
  },

  /**
   * Poor man's sprintf, with some features from Drupal's t().
   * Splice variables into a template, optionally escaping them.
   *
   * @param {string} text A format string with placeholders like {a}.
   * @param {Object} variables A hash keyed by variable name.
   *
   * Any placeholder with a corresponding variable will be replaced.
   * If the variable is named "<f>.x", then it will be passed through format.<f>().
   *
   * @return {string} The rendered text.
   */
  formatText: function(text, variables) {
    for (var key in variables) if (!variables[key]) delete variables[key];
    for (var key in variables) {
      var m = /([a-z]+)\.[a-z]+/.exec(key);
      var type = m ? m[1] : key;
      type = this.format[type] ? type : 'plain';
      variables[key] = this.format[type](variables[key]);
    }
    text = text.replace(/\{([a-z\.]+)\}/g, function(rep, key) {
      return typeof variables[key] == 'string' ? variables[key] : rep;
    });
    return text;
  }
};
