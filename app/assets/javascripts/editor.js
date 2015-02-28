/***
 * App.js
 * Defines the behaviour of the EngAGe visual editor.
 */
/*global $:false */
(function (angular) {
    "use strict";

    // This create a new Angular modu)le called EnGAge
    var engage = angular.module('EnGAge', ['ngResource', 'xeditable']);

    // xeditable options
    engage.run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

    // This creates a angular resources to handle the communication with EnGAge backend.
    engage.factory('Config', function ($resource) {
//        return $resource('/monwebservice/:id', {}, {
        return $resource('/demo.json', {}, {
            get: {method: 'GET'}
        });
    });

    // This defines the main controller
    engage.controller('GameCtrl', function ($scope, Config) {
        // Initialization
        // 
        $scope.config = Config.get();
    });
}(window.angular));
