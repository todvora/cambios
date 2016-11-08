var fs = require('fs');
var Handlebars = require('handlebars');

var render = function (notes, configuration) {
  return new Promise((resolve, reject) => {
    if (configuration.json) {
      resolve(JSON.stringify(notes));
    } else {
      fs.readFile(configuration.template, 'utf8', (err, template) => {
        if (err) {
          reject(err);
        } else {
          var compiled = Handlebars.compile(template);
          resolve(compiled({releases: notes}));
        }
      });
    }
  });
};
module.exports = render;
