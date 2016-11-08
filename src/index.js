var logs = require('./logs');
var transform = require('./transform');
var render = require('./render');

var config = require('./config');

module.exports = function (userConfig) {
  var configuration = config.build(userConfig);
  return logs(configuration.path)
    .then(data => transform(data, configuration.headAlias))
    .then(data => render(data, configuration));
};
