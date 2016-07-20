module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jasmine: {
            src: 'src/**/*.js',
            options: {
                specs: 'spec/**/*.js',
                vendor: [
                    "node_modules/jquery/dist/jquery.min.js",
                    "vendor/jasmine-jquery/jasmine-jquery.js"
                ]
            }
        },
        jshint: {
            src: ['src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'jasmine']);

    grunt.registerTask('default', ['test']);

};
