visual = {
  formatText: function(text, variables) {
    text = text.replace(/\{([a-z]+)\}|\[([a-z]+)\]/g, function(rep, plain, raw) {
      var key = plain || raw;
      return variables[key] ? (plain ? visual.textPlain(variables[key]) : variables[key]) : rep;
    });
    return text;
  },

  textPlain: function(text) {
    var replacers = {'<': '&lt;', '>': '&gt;', '&':'&amp;'};
    return text.replace(/[<>&]/g, function(x) { return replacers[x]; });
  }
};
