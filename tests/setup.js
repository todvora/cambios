var tmp = require('tmp');
var path = require('path');
var fs = require('fs');

var initGit = function () {
  var tempDir = tmp.dirSync().name;

  var git = require('simple-git')(tempDir);

  return git
      .init()
      .addConfig('user.name', 'Foo Bar')
      .addConfig('user.email', 'foo.bar@example.com')

      .then(() => fs.writeFileSync(path.join(tempDir, 'first.txt'), ''))
      .add('./first.txt')
      .commit('first commit!', {'--date': '"Fri Nov 6 20:00:00 2015 +0100"'})
      .addTag('v1.0.0')

      .then(() => fs.writeFileSync(path.join(tempDir, 'second.txt'), ''))
      .add('./second.txt')
      .commit('second commit!', {'--date': '"Fri Nov 6 20:00:00 2015 +0100"'})
      .addTag('v2.0.0')

      .then(() => fs.writeFileSync(path.join(tempDir, 'third.txt'), ''))
      .add('./third.txt')
      .commit('third commit!', {'--date': '"Fri Nov 6 20:00:00 2015 +0100"'})

      .addConfig('user.name', 'Lorem Ipsum')
      .addConfig('user.email', 'lorem.ipsum@example.com')
      .then(() => fs.writeFileSync(path.join(tempDir, 'fourth.txt'), ''))
      .add('./fourth.txt')
      .commit('fourth commit!', {'--date': '"Sun Nov 6 20:00:00 2016 +0100"'});
};

module.exports = {
  initGit: initGit
};
