var path = require('path');

var getDefault = function () {
  return {
    path: process.cwd(),
    template: path.join(__dirname, 'default.handlebars'),
    headAlias: 'HEAD',
    json: false,
    noFilter: false
  };
};

var extendDefault = function (userConfig) {
  return Object.assign({}, getDefault(), userConfig);
};

module.exports = {
  build: extendDefault
};
