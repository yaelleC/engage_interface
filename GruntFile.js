/* jshint strict: false */
"use strict";
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        },
        watch: {
            karma: {
                files: ['test/karma/**/*.js', 'app/assets/javascripts/**/*.js'],
                tasks: ['karma']
            }
        },
        protractor: {
            options: {
                configFile: "config/protractor.conf.js",
                keepAlive: true,
                noColor: false,
                args: {}
            },
            all: {},
        }
    });

    /*Loading tasks*/
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-protractor-runner');
};
