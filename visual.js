visual = {
  textPlain: function(text) {
    var replacers = {'<': '&lt;', '>': '&gt;', '&':'&amp;'};
    return text.replace(/[<>&]/g, function(x) { return replacers[x]; });
  }
};
