var semver = require('semver');

var re = /\(tag:\s(.*)\)/;

var getReleaseDate = function (commits) {
  if (commits && commits.length > 0) {
    return commits[0].date.split(' ')[0];
  }
  return 'Unknown date';
};

var getContributors = function (commits) {
  return commits.reduce((acc, curr) => {
    if (!acc.some(val => JSON.stringify(val) === JSON.stringify(curr.author))) { // deep equal
      acc.push(curr.author);
    }
    return acc;
  }, [])
  .sort((a, b) => a.name.localeCompare(b.name));
};

var filterCommits = function (commits, configuration) {
  if (configuration.noFilter) {
    return commits;
  } else {
    return commits
      .filter(commit => { return !semver.valid(commit.message); }); // skip pure tagging messages
  }
};

var read = function (commits, configuration) {
  var data = commits.all.map(commit => {
    var parts = commit.refs
      .trim()
      .split(',')
      .filter(part => part.match(re))
      .map(part => {
        return re.exec(part)[1];
      })
      .filter(semver.valid)
      .map(semver.clean);

    var result = {
      date: commit.date,
      author: {
        name: commit.author,
        email: commit.author_email
      },
      message: commit.message
    };

    if (parts.length > 0) {
      result.tag = parts[0];
    }

    return result;
  });
  data[0].tag = configuration.headAlias;
  var currentTag = null;
  data = data.reduce((acc, curr) => {
    if (curr.tag) {
      currentTag = curr.tag;
    }
    if (currentTag in acc) {
      acc[currentTag].push(curr);
    } else {
      acc[currentTag] = [curr];
    }
    return acc;
  }, {});
  return Object.keys(data).map(release => {
    var commits = data[release];
    return {
      version: release,
      date: getReleaseDate(commits),
      commits: filterCommits(commits, configuration),
      contributors: getContributors(commits)
    };
  });
};

module.exports = read;
