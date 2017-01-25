const gulp = require('gulp');
const gutil = require('gulp-util');

gutil.log('cwd:' + process.cwd());

var distIncludes = ['package.json', 'README.*', 'CHANGELOG.*', 'LICENSE.*', 'LICENCE.*'];
