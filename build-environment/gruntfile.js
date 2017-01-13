'use strict';

module.exports = function (grunt) {

  // CONFIGURATION
  var globalConfig = {
    devBuild: "builds/dev",
    prodBuild: "builds/prod",
  };

  grunt.initConfig({
    // load global config
    globalConfig: globalConfig,

    watch: {
      app: {
        files: ['app/**/*'],
        tasks: ['build:dev']
      }
    },

    //////////
    // BASH
    /////////

    exec: {
      jekyllBuildDev: {
        command: 'cd app; bundle exec jekyll build --incremental; cd ../',
        stderr: false,
        callback: function (error, stdout, stderr) {
          if (stderr) {
            grunt.warn(stderr)
          }
        }
      },
      jekyllBuildProd: {
        command: 'cd app; bundle exec jekyll build; cd ../',
        stderr: false,
        callback: function (error, stdout, stderr) {
          if (stderr) {
            grunt.warn(stderr)
          }
        }
      },
      cleanProdBuild: {
        command: 'cd builds; rm -rf prod; cd ../',
        stderr: false,
        callback: function (error, stdout, stderr) {
          if (stderr) {
            grunt.warn(stderr)
          }
        }
      }
    },

    //////////
    // HTML
    /////////

    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeEmptyAttributes: true,
          customAttrCollapse: /(srcset)|(sizes)/,
        },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.devBuild %>',
          src: '**/*.html',
          dest: '<%= globalConfig.prodBuild %>/'
        }]
      }
    },

    //////////
    // Other Files to Move Around
    //////////
    copy: {
      js: {
        expand: true,
        cwd: '<%= globalConfig.devBuild %>/assets/javascripts',
        src: '*',
        dest: '<%= globalConfig.prodBuild %>/assets/javascripts/'
      },
      fonts: {
        expand: true,
        cwd: '<%= globalConfig.devBuild %>/assets/fonts',
        src: '*',
        dest: '<%= globalConfig.prodBuild %>/assets/fonts/'
      },
      files: {
        expand: true,
        cwd: '<%= globalConfig.devBuild %>/assets/files',
        src: '*',
        dest: '<%= globalConfig.prodBuild %>/assets/files/'
      },
      images: {
        expand: true,
        cwd: '<%= globalConfig.devBuild %>/assets/images',
        src: '*',
        dest: '<%= globalConfig.prodBuild %>/assets/images/'
      },
      thumbs: {
        expand: true,
        cwd: '<%= globalConfig.devBuild %>/assets/thumbs',
        src: '**',
        dest: '<%= globalConfig.prodBuild %>/assets/thumbs/'
      },
      serverconfig: {
        expand: true,
        cwd: '<%= globalConfig.devBuild %>',
        src: ['.htaccess', 'robots.txt', 'sitemap.xml'],
        dest: '<%= globalConfig.prodBuild %>/'
      }
    },

    //////////
    // CSS
    //////////

    // sass (libsass) config
    sass: {
      dev: {
        options: {
          style: "expanded"
        },
        files: [{
          src: 'app/_scss/main.scss',
          dest: '<%= globalConfig.devBuild %>/assets/css/main.css'
        }]
      }
    },

    // purify css
    purifycss: {
      options: {},
      target: {
        src: ['<%= globalConfig.devBuild %>/**/*.html', '<%= globalConfig.devBuild %>/assets/**/*.js'],
        css: ['<%= globalConfig.devBuild %>/assets/css/main.css'],
        dest: '<%= globalConfig.prodBuild %>/assets/css/main.css'
      }
    },

    // minify css
    cssmin: {
      target: {
        files: [{
          src: '<%= globalConfig.prodBuild %>/assets/css/main.css',
          dest: '<%= globalConfig.prodBuild %>/assets/css/main.css',
        }]
      }
    },

    //////////
    // Validation, etc.
    //////////

    // html validation
    htmllint: {
      all: ["<%= globalConfig.devBuild %>/**/*.html"]
    },

    // broken links
    linkChecker: {
      options: {
        initialProtocol: "https",
        ignoreInvalidSSL: true,
        maxConcurrency: 20,
        callback: function (crawler) {
          crawler.addFetchCondition(function(parsedURL) {
            // mailto links are obfuscated and confuse the crawler, exclude them
            return !parsedURL.path.match(/&$/i);
          });
          crawler.addFetchCondition(function(parsedURL) {
            // don't check the assets folder, causes error and doesn't make sense
            return !parsedURL.path.match(/assets/i);
          });
        }
      },
      dev: {
        site: '<%= globalConfig.linkCheckerURL %>',
      }
    }

  });


  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-purifycss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Hack to stop contrib concat (and maybe other things) from failing silently
  // https://github.com/gruntjs/grunt-contrib-concat/issues/17
  grunt.registerTask('warn-fail', 'Fail on warning log', function() {
    var log = grunt.log;
    var _warn = log.warn;
    log.warn = function() {
      _warn.apply(log, arguments);
      grunt.fail.warn("Warning log has triggered failure");
    };
  });

  // Register the grunt tasks
  grunt.registerTask('build:dev', [
    'warn-fail',
    'exec:jekyllBuildDev',
    'sass'
  ]);

  grunt.registerTask('build:prod', [
    'warn-fail',
    'exec:jekyllBuildProd',
    'sass',
    'exec:cleanProdBuild',
    'htmlmin',
    'copy:js',
    'copy:fonts',
    'copy:files',
    'copy:images',
    'copy:thumbs',
    'copy:serverconfig',
    'purifycss',
    'cssmin'
  ]);

  // Register the default task
  grunt.registerTask('default', ['build:dev', 'watch']);

};
