// Gruntfile

module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  /**
   * Define Configuration Variables.
   * Note: cwd is './setup' so the `setup` variable defined below is only to be used
   *       when cwd has been changed to `app` and grunt needs to reference './setup'
   */
  var gruntConfig = grunt.file.readJSON('Gruntconfig.json');

  // Grunt Config
  grunt.initConfig({
    cvars: gruntConfig.configVars,
    bower: {
      setup: {
        options: { install: true, copy: false }
      }
    },
    copy: {
      setup: {
        files: [
          // Javascript with standard .min.js naming convention
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appjs %>/ext/',
            src: gruntConfig.bowerFiles
          },
          // CSS with standard .min.css naming convention
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appcss %>/ext/',
            src: gruntConfig.cssFiles
          },
          // CSS Fonts
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appcss %>/fonts/',
            src: gruntConfig.cssFonts
          }
        ]
      },
      build: {
        files: [
          {
            cwd: '<%= cvars.app %>/', expand: true,
            dest: '<%= cvars.build %>/',
            src: gruntConfig.buildFiles
          }
        ]
      },
      deploy: {
        files: [
          {
            cwd: '<%= cvars.build %>/', expand: true,
            dest: '<%= cvars.dist %>/',
            src: ['css/**', 'images/**', 'data/**']
          }
        ]
      }
    },
    clean: {
      options: { force: true },
      build: ['<%= cvars.build %>'],
      deploy: [
        '<%= cvars.dist %>/*'
      ]
    },
    cssmin: {
      build: {
        files: {
          '<%= cvars.build %>/<%= cvars.appcss %>/style.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            '<%= cvars.app %>/<%= cvars.appcss %>/style.css'
          ]
        }
      }
    },
    preprocess: {
      build: {
        src : '<%= cvars.app %>/index.html',
        dest : '<%= cvars.build %>/index.build.html'
      }
    },
    htmlmin: {
      // See https://github.com/yeoman/grunt-usemin/issues/44 for using 2 passes
      build: {
        options: {
          removeComments: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          // Cannot remove empty elements with angular directives
          removeEmptyElements: false
        },
        files: [
          { '<%= cvars.build %>/index.html': '<%= cvars.build %>/index.build.html' },
          {
            cwd: '<%= cvars.app %>/view/', expand: true, flatten: false,
            dest: '<%= cvars.build %>/view/',
            src: ['*.html']
          }
        ]
      },
      deploy: {
        options: {
          collapseWhitespace: true
        },
        files: [
          { '<%= cvars.dist %>/index.html': '<%= cvars.build %>/index.html' },
          {
            cwd: '<%= cvars.build %>/js/directive/template/', expand: true, flatten: false,
            dest: '<%= cvars.dist %>/js/directive/template/',
            src: ['*.html']
          },
          {
            cwd: '<%= cvars.build %>/view/', expand: true, flatten: false,
            dest: '<%= cvars.dist %>/view/',
            src: ['*.html']
          }
        ]

      }
    },
    requirejs: {
      build: {
        options: {
          baseUrl: '<%= cvars.app %>/js',
          mainConfigFile: '<%= cvars.app %>/js/main.js',
          removeCombined: true,
          findNestedDependencies: true,
          optimize: 'none',
          dir: '<%= cvars.build %>/js/',
          modules: [
            { name: 'main' },
            {
              name: 'controller/home_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/matches_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/match_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/players_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/player_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/teams_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/team_ctrl',
              exclude: ['main']
            }
          ]
        }
      }
    },
    uglify: {
      deploy: {
        options: {
          preserveComments: 'some'
        },
        files: [
          {
            cwd: '<%= cvars.build %>/js/', expand: true,
            dest: '<%= cvars.dist %>/js/',
            src: ['*.js', 'ext/require.js', 'controller/*.js']
          }
        ]
      }
    },
    jshint: {
      build: {
        options: {
          jshintrc: '<%= cvars.app %>/js/jshintrc.json'
        },
        files: {
          src: [
            '<%= cvars.app %>/js/*.js',
            '<%= cvars.app %>/js/controller/*.js',
            '<%= cvars.app %>/js/directive/*.js',
            '<%= cvars.app %>/js/provider/*.js'
          ]
        }
      }
    },

    watch: {
      www: {
        files: ['<%= cvars.app %>/**/*'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    connect: {
      server: {
        livereload: true,
        options: {
          port: gruntConfig.configVars.port,
          base: '<%= cvars.app %>'
        }
      }
    }
  });


  /**
   * setup task
   * Run the initial setup, sourcing all needed upstream dependencies
   */
  grunt.registerTask('setup', ['bower:setup', 'copy:setup']);


  /**
   * devel task
   * Launch webserver and watch for changes
   */
  grunt.registerTask('devel', [
    'connect:server', 'watch:www'
  ]);

  /**
   * build task
   * Use r.js to build the project
   */
  grunt.registerTask('build', [
    'jshint:build',
    'clean:build',
    'preprocess:build',
    'htmlmin:build',
    'cssmin:build',
    'requirejs:build',
    'copy:build'
  ]);


  /**
   * deploy task
   * Deploy to dist_www directory
   */
  grunt.registerTask('deploy', [
    'build',
    'clean:deploy',
    'htmlmin:deploy',
    'uglify:deploy',
    'copy:deploy'
  ]);

  grunt.registerTask('hello', function () {
    grunt.log.write('hello task called with: ', gruntConfig);
  });

};
