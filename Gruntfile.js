/*!
 *   Copyright 2014-2015 CoNWeT Lab., Universidad Politecnica de Madrid
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */


module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    layout: function (type, component, source) {
                        return type;
                    },
                    targetDir: './build/lib/lib'
                }
            }
        },


        compress: {
            widget: {
                options: {
                    mode: 'zip',
                    archive: 'dist/<%= pkg.vendor %>_<%= pkg.name %>_<%= pkg.version %>.wgt'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'css/**/*',
                            'doc/**/*',
                            'images/**/*',
                            'index.html',
                            'config.xml'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'build/lib',
                        src: [
                            'lib/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'build/src',
                        src: [
                            'js/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: [
                            'LICENSE'
                        ]
                    }
                ]
            }
        },

        clean: {
            build: {
                src: ['build', 'bower_components']
            },
            temp: {
                src: ['build/src']
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/js', src: '*', dest: 'build/src/js'}
                ]
            }
        },

        strip_code: {
            multiple_files: {
                src: ['build/src/js/**/*.js']
            }
        },

        replace: {
            version: {
                overwrite: true,
                src: ['src/config.xml'],
                replacements: [{
                    from: /version=\"[0-9]+\.[0-9]+\.[0-9]+(([ab]|rc)?[0-9]+)?(-dev)?\"/g,
                    to: 'version="<%= pkg.version %>"'
                }]
            }
        },

        jscs: {
            src: 'src/js/**/*',
            options: {
                config: ".jscsrc"
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            all: {
                files: {
                    src: ['src/js/**/*.js']
                }
            },
            grunt: {
                options: {
                    jshintrc: '.jshintrc-node'
                },
                files: {
                    src: ['Gruntfile.js']
                }
            },
            test: {
                options: {
                    jshintrc: '.jshintrc-jasmine'
                },
                files: {
                    src: ['src/test/**/*.js', '!src/test/fixtures/']
                }
            }
        },

        jasmine: {
            test:{
                src: ['src/js/*.js', '!src/js/main.js'],
                options: {
                    specs: 'src/test/js/*Spec.js',
                    helpers: ['src/test/helpers/*.js'],
                    vendor: ['bower_components/jquery/dist/jquery.js',
                             'bower_components/adapter.js/src/adapter.js',
                             'bower_components/bootstrap/dist/js/bootstrap.js',
                             'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                             'bower_components/mock-socket/dist/mock-socket.js',
                             'node_modules/mock-applicationmashup/lib/vendor/mockMashupPlatform.js',
                             'src/test/vendor/*.js']
                }
            },
            coverage: {
                src: '<%= jasmine.test.src %>',
                options: {
                    helpers: '<%= jasmine.test.options.helpers %>',
                    specs: '<%= jasmine.test.options.specs %>',
                    vendor: '<%= jasmine.test.options.vendor %>',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions : {
                        coverage: 'build/coverage/json/coverage.json',
                        report: [
                            {type: 'html', options: {dir: 'build/coverage/html'}},
                            {type: 'cobertura', options: {dir: 'build/coverage/xml'}},
                            {type: 'text-summary'}
                        ]
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-strip-code');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('zip', 'compress:widget');
    grunt.registerTask('version', 'replace:version');
    grunt.registerTask('install', 'bower:install');
    grunt.registerTask('static', ['jshint:grunt', 'jshint', 'jscs']);
    grunt.registerTask('test_t', 'jasmine:coverage');
    grunt.registerTask('mcopy', 'copy:main');
    grunt.registerTask('clean_tmp', 'clean:temp');

    grunt.registerTask('test', ['install', 'static', 'test_t']);

    grunt.registerTask('deploy', ['test',
                                  'clean_tmp', 'mcopy', 'strip_code',
                                  'version', 'zip']); // Maybe clean_tmp at the end again?

    grunt.registerTask('default', 'deploy');
};
