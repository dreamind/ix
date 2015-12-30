var path = require('path');
var mkdirp = require('mkdirp');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('print-pdf', function () {
    /*
     * phantomjs path/to/print-pdf.js "http://localhost:9001/index.html?print-pdf" file-name.pdf
     *
     */
    var childProcess = require('child_process'),
        phantomPath = 'node_modules/grunt-mocha-phantomjs/node_modules/phantomjs/bin/phantomjs',
        done = grunt.task.current.async();

    var childArgs = [
      'conf/lib/print-pdf.js',
      'http://localhost:9001/index.html?print-pdf',
      'target/slide.pdf'
    ];

    var prefix = 'http://localhost:9001/';
    var files = [
      "lectures/viz/viz2.html",
      "lectures/analysis/langid.html",
      "lectures/i18n/charset/build.html",
      "lectures/i18n/charset/table.html",
      "lectures/i18n/i18n-print-test.html",
      "lectures/i18n/i18n.html",
      "lectures/information/information.html",
      "lectures/information/meaning.html",
      "lectures/information/theory.html",
      "lectures/introduction/introduction.html",
      "lectures/introduction/overview.html",
      "lectures/introduction/reader/reader.html",
      "lectures/network/network.html",
      "lectures/viz/theory.html"
    ];
    var i = 0, recursive = 0;

    function print () {

      function doPrint() {
        childProcess.execFile(phantomPath, childArgs,
          function (error, stdout, stderr) {
            grunt.log.writeln(stdout);
            if (error) {
              done(error);
            } else {
              i++;
              print();
            }
          }
        );
      }

      if (i < files.length) {
        childArgs[1] = prefix + files[i] + '?print-pdf';
        console.log('printing ' + childArgs[1]);
        var dir = path.dirname(files[i]);
        if (recursive) {
          childArgs[2] = 'target/' + dir + '/' + path.basename(files[i], '.html') + '.pdf';
          mkdirp('target/' + dir, function (err) {
            if (err) {
              console.error(err);
              done(err);
            } else {
              doPrint();
            }
          });
        } else {
          childArgs[2] = 'target/' + dir.replace(/\//g,'-') + '-' + path.basename(files[i], '.html') + '.pdf';
          doPrint();
        }

      } else {
        done();
      }
    }
    print();

  });

  // Default task(s).
  grunt.registerTask('default', ['connect']);

};