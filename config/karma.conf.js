module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
        "app/assets/javascripts/jquery.min.js",
        "app/assets/javascripts/angular.js",
        "app/assets/javascripts/angular-resource.js",
        "app/assets/javascripts/xeditable.min.js",
        "app/assets/javascripts/bootstrap.min.js",
        "app/assets/javascripts/select.min.js",
        "app/assets/javascripts/ui-bootstrap-tpls-0.12.0.min.js",
        "app/assets/javascripts/editor.js",
        "test/karma/**/*.js",
        // fixtures
        {pattern: 'public/demo.json', watched: true, served: true, included: false}
    ],

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine'
            ],
    singleRun: true,
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};