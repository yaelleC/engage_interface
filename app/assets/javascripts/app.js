/***
 * App.js
 * Defines the behaviour of the EngAGe visual editor.
 */
/*global $:false */
var COUNTRIES = ['UK', 'FR'];
var LANGUAGES = ['EN', 'FR'];

(function (angular, COUNTRIES, LANGUAGES) {
    "use strict";

    // This create a new Angular modu)le called EnGAge
    var engage = angular.module('EnGAge', ['ngResource']);


    // This creates a angular resources to handle the communication with EnGAge backend.
    engage.factory('Config', function ($resource) {
//        return $resource('/monwebservice/:id', {}, {
        return $resource('/mocks/json_example.json', {}, {
            get: {method: 'GET'},
            save: {method: 'POST'}
        });
    });

    // This defines the main controller
    engage.controller('GameCtrl', function ($scope, Config) {
        // Initialization
        $scope.countries = COUNTRIES;
        $scope.languages = LANGUAGES;
        $scope.config = Config.get();
//        $scope.config = Config.get({id: 111});
//        $scope.config.$save();
        // /monwebservice/111

        /**
         * This adds a new player
         */
        $scope.addPlayer = function () {
            $scope.config.player.push({
                name: '',
                type: 'String'
            });
        };
        /**
         * This removes the player at a given index
         * @param idx: index of the player to be remove
         */
        $scope.remPlayer = function (idx) {
            $scope.config.player.splice(idx, 1);
        };

        /**
         * This set the currently selected object
         */
        $scope.selectObj = function (objType, obj) {
            $scope.selection = obj;
            $scope.selectionType = objType;
            $scope.$apply();
            $('#selection').collapse('show');
        };

        /**
         *
         * @param ass
         * @returns {Array}
         */
        $scope.filterFeedbacks = function (ass) {
            var results = [];
            for (var i = 0; i < ass.feebacks.length; i++) {
                results.push$($scope.evidenceModel.feedbacks[ass.feedback[i]]);
            }
            return results;
        };

        /**
         * This adds a new learning outcome
         * @param name Name of the new lo
         */
        $scope.addLearningOutcome = function (name) {
            $scope.config.learningOutcomes[name] = {
                desc: 'Learning Outcome Description',
                value: 1,
                feedbackTriggered: [],
                x: 100,
                y: 10
            };
        };


        /**
         * This adds a new assessment
         * @param name Name of the new lo
         */
        $scope.addAssessment = function (name) {
            $scope.config.evidenceModels.push({
                "action": name,
                "params": {
                    "country": "String",
                    "size": "Int"
                },
                "x": 25,
                "y": 120,
                "values": [],
                "mark": {
                    "learningOutcome": Object.keys($scope.config.learningOutcomes)[0],
                    "mark": 1
                },
                "feedback": []
            });
        };

        /**
         * This adds a new feedback
         * @param name Name of the new lo
         */
        $scope.addFeedback = function (name) {
            $scope.config.feedback[name] = {
                "message": "Well done!",
                "type": "POSITIVE",
                "x": 80,
                "y": 300
            };
        };

        /**
         * This adds a new activity feedback
         * @param name Name of the new lo
         */
        $scope.addInactivityFeedback = function (feedback) {
            console.log(feedback);
            $scope.config.inactivityFeedback.push({

                "limit": 30,
                "sign": ">",
                "feedback": feedback,
                "x": 100,
                "y": 300
            });
        };
    });

    // This create a directive to draw a svg box
    engage.directive('eagBox', function () {
        return {
            restrict: 'A',
            scope: {
                'x': '=x',
                'y': '=y',
                'title': '@title',
                'select': '&select'
            },
            template: '<svg x="{{x}}" y="{{y}}" style="cursor:pointer">' +
                '<rect x="0" y="0" rx="10" ry="10" width="{{width}}" height="{{height}}" style="fill:{{color}}; stroke:black; stroke-width:1"></rect>' +
                '<text x="{{width/2}}" y="30" font-family="Verdana" font-size="15" fill="black" style="text-anchor: middle;">{{title}}</text>' +
                '<rect class="handle" x="3" y="3" width="10" height="10" style="cursor: move; style="fill:black"></rect>' +
                '</svg>',
            link: function (scope, element, attrs) {
                scope.color = attrs.color || 'DarkCyan';
                scope.height = 70;
                scope.width = 200;
                var selected = false;
                var diffX, diffY;
                $(element).draggable({
//                    handle:"rect.handle",
                    start: function (e) {
                        diffX = e.pageX - scope.x;
                        diffY = e.pageY - scope.y;
                    },
                    drag: function (e) {
                        scope.x = e.pageX - diffX;
                        scope.y = e.pageY - diffY;
                        scope.$apply();
                    }
                });
            }
        };
    });
}(angular, COUNTRIES, LANGUAGES));
