"use strict";

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '// <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy.mm.dd") %>)\n// Copyright (c) 2014, Jaewe Heo. All rights reserved.\n// Use of this source code is governed by a BSD-style\n// license that can be found in the LICENSE file.\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globalstrict: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          "angular": true,
          "after": true,
          "afterEach": true,
          "before": true,
          "beforeEach": true,
          "describe": true,
          "expect": true,
          "inject": true,
          "it": true
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            cwd: '.',
            dot: false,
            src: ['src/css/angular-github-snippet.css'],
            dest: 'dist/angular-github-snippet.css'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat', 'jshint', 'copy', 'uglify']);
};