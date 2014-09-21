'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        files: {
          'src/build/css/style.css': 'src/styl/main.styl'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'src/build/css/style.css',
        dest: 'src/build/css/'
      }
    },
    cssmin: {
      combine: {
        files: {
          'css/style.min.css': 'src/build/css/style.css'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: {
          'images/nola.min.svg': 'src/images/nola.svg'
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'index.html': ['src/*.jade']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['src/styl/*.styl'],
        tasks: ['stylus', 'autoprefixer', 'cssmin'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['src/images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      },
      svg: {
        files: 'src/images/*.svg',
        tasks: ['svgmin'],
        options: {
          spawn: false
        }
      },
      jade: {
        files: ['src/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: '1337',
          base: './'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['stylus', 'autoprefixer', 'cssmin', 'imagemin', 'svgmin', 'jade']);

  grunt.registerTask('dev', ['connect', 'watch']);
}
