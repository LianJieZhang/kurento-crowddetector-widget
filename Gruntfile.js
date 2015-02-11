/* 
 * @copyright 2014 CoNWeT Lab., Universidad Politécnica de Madrid
 * @license Apache v2 (http://www.apache.org/licenses/)
 */

/*jshint node:true*/
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: ' * @version <%= pkg.version %>\n' +
            ' * \n' +
            ' * @copyright 2014 <%= pkg.author %>\n' +
            ' * @license <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */',

        bower : {
            install: {
                options: {
                    layout: function(type, component, source){
                        return type;
                    },
                    targetDir: './src/lib'
                }
            }
        },


        compress: {
            widget: {
                options: {
                    mode: 'zip',
                    archive: 'build/<%= pkg.vendor %>_<%= pkg.name %>_<%= pkg.version %>-dev.wgt'
                },
                files: [
                    {expand: true, src: ['config.xml', 'index.html', 'js/**/*', 'css/**/*', 'images/**/*'], cwd: 'src'},
                    {expand: true, src: ['js/adapter.js'], dest: 'lib', cwd: 'src/bower_components/adapter.js/samples/web'},
                    {expand: true, src: ['css/bootstrap.min.css', 'js/bootstrap.min.js'], dest:'lib', cwd: 'src/bower_components/bootstrap/dist'},
                    {expand: true, src: ['ekko-lightbox.min.css'], dest:'lib/css', cwd: 'src/bower_components/ekko-lightbox/dist'},
                    {expand: true, src: ['ekko-lightbox.min.js'], dest:'lib/js', cwd: 'src/bower_components/ekko-lightbox/dist'},
                    {expand: true, src: ['jquery.min.js'], dest:'lib/js', cwd: 'src/bower_components/jquery/dist'},
                    {expand: true, src: ['js/kurento-utils.js'], dest:'lib', cwd: 'src/bower_components/kurento-utils'},
                ]
            }
        },
        
        jasmine: {
            src: ['src/js/*.js'],
            options: {
                specs: 'src/test/js/*Spec.js',
                helpers: ['src/test/helpers/*.js'],
                vendor: ['node_modules/jquery/dist/jquery.js',
                         'src/lib/js/jquery.dataTables.js',
                         'node_modules/jasmine-jquery/lib/jasmine-jquery.js']
            }
        },

        replace: {
            version: {
                src: ['src/config.xml'],
                overwrite: true,
                replacements: [{
                    from: /version=\"[0-9]+\.[0-9]+\.[0-9]+(-dev)?\"/g,
                    to: 'version="<%= pkg.version %>"'
                }]
            }
        },

        clean: ['build'],

        jshint: {
            options: {
                jshintrc: true
            },
            all: ['src/js/**/*', 'src/test/**/*', 'Gruntfile.js', '!src/test/fixtures/']
        }

    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('zip', 'compress:widget');
    grunt.registerTask('version', ['replace:version']);
    grunt.registerTask('install', ['bower:install']);
    grunt.registerTask('static', ['jshint']);

    grunt.registerTask('default', ['install', 'static', 'version', 'zip' ]);
};
