var logs = require('./logs');
var transform = require('./transform');
var render = require('./render');

var config = require('./config');

module.exports = function (userConfig) {
  var configuration = config.build(userConfig);
  return logs(configuration)
    .then(data => transform(data, configuration))
    .then(data => render(data, configuration));
};
