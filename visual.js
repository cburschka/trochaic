visual = {
  format: {},

  /**
   * Splice variables into a template with format identifiers.
   *
   * @param {string} text A format string with placeholders like {name1} and {format:name2}.
   * @param {Object} variables A hash keyed by variable name.
   * @param {bool} html Optional flag that causes text to be evaluated as HTML.
   *
   * Any placeholder with a corresponding variable will be replaced.
   * The variable will be processed either by the specified format, or the one
   * matching its name, or the "plaintext" formatter by default.
   * @return {string} The rendered text.
   */
  formatText: function(text, variables, html) {
    return $('<span>')[html ? 'html' : 'text'](text)
      .replaceText(/({(?:(\w+):)?(\w+)})/g, function(rep, format, key) {
        if (key in variables) {
          if ((format || key) in visual.format) {
            return visual.format[format || key](variables[key]);
          }
          return variables[key];
        }
        return rep;
      });
  }
};
