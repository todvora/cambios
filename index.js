var process = require('process');
var path = require('path');
var notes = require('./src/index');
var argv = require('minimist')(process.argv.slice(2));

notes(argv)
.then(data => console.log(data))
.catch(err => console.error(err));
