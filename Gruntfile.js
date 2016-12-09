/*global __dirname:false*/
const path = require('path');

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  let gruntConfig = {
    clean: {
      public: ['frontend/public']
    },
    browserify: {
      dist: {
        options: {
          transform: [
            [
              'babelify',
              {
                presets: ['es2015', 'react']
              }
            ]]
        },
        files: {
          './frontend/public/js/profile.js': './frontend/src/js/profile.js'
        }
      }
    },
    copy: {
      css: {
        expand: true,
        cwd: './frontend/src/css',
        src: ['**'],
        dest: './frontend/public/css/'
      },
      html: {
        files: [
          {
            expand: true,
            cwd: './frontend/src/templates',
            src: ['**'],
            dest: './frontend/public/templates/'
          }
        ]
      }
    },
    watch: {
      css: {
        files:
        [
          './frontend/src/css/**/*.css',
          './frontend/src/css/**/*.tff',
          './frontend/src/css/**/*.woff',
          './frontend/src/css/img/**/*'
        ],
        tasks: ['copy:css']
      },
      js: {
        files: ['./frontend/src/js/**/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['./frontend/src/templates/**/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false
        }
      }
    }
  };
  grunt.initConfig(gruntConfig);
  grunt.registerTask('frontend', ['clean', 'copy', 'browserify']);
};
