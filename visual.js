visual = {
  format: {},

  /**
   * Splice variables into a template with format identifiers.
   *
   * @param {string|object} text A template, either a string or jQuery content.
   * @param {Object} variables A hash keyed by variable name.
   *
   * Any placeholder with a corresponding variable will be replaced.
   * The variable will be processed either by the specified format, or the one
   * matching its name, or the "plaintext" formatter by default.
   * @return {string} The rendered text.
   */
  formatText: function(text, variables) {
    if (typeof(text) === 'string') text = $('<span>').text(text);
    text.find('*').addBack() // include all descendants and the top element.
      .replaceText(/({(?:(\w+):)?(\w+)})/g, function(rep, format, key) {
        if (key in variables) {
          if ((format || key) in visual.format) {
            return visual.format[format || key](variables[key]);
          }
          return variables[key];
        }
        return rep;
      });
    return text;
  }
};
