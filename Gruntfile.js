  
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "./style.css": "./style.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['./*.less', './src/*.js'],
                tasks: ['less', 'concat'],
                options: {
                    nospawn: true
                }
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
            },
            dist: {
                src: ['./src/main.js'],
                dest: 'dist/built.js',
            },
        },
        autoprefixer: {
            options: {
              browsers: ["defaults"]
            },
            single_file: {
                   src: './style.css',
                   dest: './style.css'
            },
          },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './*.css',
                        './*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './app'
                }
            }
        }
    });
    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('concat-js', ['concat', 'watch']);
    grunt.registerTask('build', ['copy', 'string-replace:fontawesome', 'less', 'autoprefixer','concat', 'uglify']);
    grunt.registerTask('default', ['browserSync', 'watch']);

};