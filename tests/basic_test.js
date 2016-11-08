var assert = require('assert');
var path = require('path');
var fs = require('fs');
var setup = require('./setup');

var notes = require('../src/index');

var git;
describe('Changelog generator', () => {
  before(() => {
    git = setup.initGit();
    return git;
  });

  it('should read and format changelog', () => {
    return notes({path: git._baseDir, headAlias: '2.1.0'})
      .then(data => {
        var expected = fs.readFileSync(path.join(__dirname, 'assets', 'expected.md'), 'utf8');
        assert.equal(expected.trim(), data.trim());
      });
  });

  it('should render changelog according to provided template', () => {
    return notes({path: git._baseDir, headAlias: '2.1.0', template: path.join(__dirname, 'assets', 'condensed.handlebars')})
      .then(data => {
        var expected = fs.readFileSync(path.join(__dirname, 'assets', 'condensed.md'), 'utf8');
        assert.equal(expected.trim(), data.trim());
      });
  });

  it('should alias HEAD to whatever configuration says', () => {
    return notes({path: git._baseDir, headAlias: 'LATEST', template: path.join(__dirname, 'assets', 'condensed.handlebars')})
      .then(data => {
        var expected = fs.readFileSync(path.join(__dirname, 'assets', 'condensed_latest.md'), 'utf8');
        assert.equal(expected.trim(), data.trim());
      });
  });

  it('should return results as a JSON', () => {
    return notes({path: git._baseDir, json: true})
      .then(data => {
        var expected = require('./assets/expected.json');
        assert.deepEqual(expected, JSON.parse(data));
      });
  });
});
