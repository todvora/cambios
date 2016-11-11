var read = function (configuration) {
  var simpleGit = require('simple-git')(configuration.path);
  return new Promise((resolve, reject) => {
    var options = {
      format: {
        date: '%ai',
        message: '%s',
        author: '%aN',
        author_email: '%ae',
        refs: '%d'
      }
    };
    simpleGit.log(options, (err, commits) => {
      if (err) {
        reject(err);
      } else {
        resolve(commits);
      }
    });
  });
};

module.exports = read;
