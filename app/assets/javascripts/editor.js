/*global window, $:false */

/***
 * App.js
 * Defines the behaviour of the EngAGe visual editor.
 */
(function (angular) {
    "use strict";

    // This create a new Angular modu)le called EnGAge
    var engage = angular.module('EnGAge', ['ngResource', 'ui.bootstrap', 'xeditable', 'ui.select']);

    // xeditable options
    engage.run(function (editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        editableOptions.buttons = 'yes'; // bootstrap3 theme. Can be also 'bs2', 'default'

    });

    // This creates a angular resources to handle the communication with EnGAge backend.
    engage.factory('Config', function ($resource) {
        return $resource(
            'http://146.191.107.189:8080/seriousgame/:idSeriousGame/:action/:idVersion',
            {action: 'version'},
            {
                get: {method: 'GET'},
                createVersion: {method: 'POST'}
            }
        );
    });

    // Absolute
    engage.filter('abs', function () {
        return function (input) {
            return Math.abs(input);
        };
    });

    // This defines the main controller
    engage.controller('GameCtrl', function ($scope, Config, $location, $modal) {
        var feedbackByType, learningOutcomesByFeedback, path;

        /**
         * Returns the list of learning outcome matching a given feedback
         * @param  {Object} config configuration file
         * @param  {String} name   feedback name
         * @return {Array}         list of learning outcomes
         */
        learningOutcomesByFeedback = function (config, type) {
            var result = [],
                feedback = [];
            // extact all the feedback of a given type
            angular.forEach($scope.config.feedback, function (fb, fbName) {
                if (fb.final === type) {
                    feedback.push(fbName);
                }
            });
            angular.forEach(config.learningOutcomes, function (learningOutcome, loname) {
                angular.forEach(learningOutcome.feedbackTriggered, function (fbt, feedbackTriggeredIdx) {
                    angular.forEach(fbt.feedback, function (fb, feedbackIdx) {
                        if (feedback.indexOf(fb.name) > -1) {
                            result.push({
                                "learningOutcome": loname,
                                "feedbackTriggeredIdx": feedbackTriggeredIdx,
                                "feedbackIdx": feedbackIdx
                            });
                        }
                    });
                });

            });
            return result;
        };

        /**
         * Returns the feedback of a given type
         * @param  {Object} config configuration file
         * @param  {String} type   filtering type 
         * @return {Array}         List of feedbacks  
         */
        feedbackByType = function (config, type) {
            var result = [];
            angular.forEach(config.feedback, function (fb, fbname) {
                if (fb.type === type) {
                    result.push(fbname);
                }
            });
            return result;
        };

        /**
         * remove a given learning outcome 
         * @param  String lo name of the learning outcome
         */
        $scope.deleteLearningOutcome = function (lo) {
            // First remove the learning outcome
            delete $scope.config.learningOutcomes[lo];

            // Then remove all the marks pointing to the given LO in the evidenceModel
            angular.forEach($scope.config.evidenceModel, function (evidenceModel) {
                angular.forEach(evidenceModel.reactions, function (reaction) {
                    angular.forEach(reaction.marks, function (mark, idx) {
                        if (mark.learningOutcome === lo) {
                            reaction.marks.splice(idx, 1);
                        }
                    });
                });
            });

        };

        /**
         * rename learning outcome and its references
         * @param  {string} oldName old name for the learning outcome
         * @param  {string} newName new name for the learning outcome
         */
        $scope.renameLearningOutcome = function (oldName, newName) {
            // first rename learning outcome
            $scope.config.learningOutcomes[newName] = angular.copy($scope.config.learningOutcomes[oldName]);
            delete $scope.config.learningOutcomes[oldName];

            // Then rename all the references
            angular.forEach($scope.config.evidenceModel, function (evidenceModel) {
                angular.forEach(evidenceModel.reactions, function (reaction) {
                    angular.forEach(reaction.marks, function (mark) {
                        if (mark.learningOutcome === oldName) {
                            mark.learningOutcome = newName;
                        }
                    });
                });
            });

        };

        /**
         * Return the list of learning outcome not already present in a list of marks
         * @param  {array}  marks 
         * @return {array}        learning outcomes
         */
        $scope.availableLearningOutcomes = function (marks) {
            // get all the learning outcomes
            var learningOutcomes = Object.keys($scope.config.learningOutcomes);

            // remove the ones used in the marks
            angular.forEach(marks, function (mark) {
                var index = learningOutcomes.indexOf(mark.learningOutcome);
                if (index > -1) {
                    learningOutcomes.splice(index, 1);
                }
            });
            return learningOutcomes;

        };

        /**
         * Add mark of a given learningOutcome.
         * @param {[type]} reaction        reaction that will hold the new mark 
         * @param {[type]} learningOutcome learningOutcome associated to the new mark.
         */
        $scope.addMark = function (reaction, learningOutcome) {
            // check if the learning outcome is already present

            var learningOutcomeAlreadyPresent = false;
            angular.forEach(reaction.marks, function (mark) {
                if (mark.learningOutcome === learningOutcome) {
                    learningOutcomeAlreadyPresent = true;
                }
            });
            if (!learningOutcomeAlreadyPresent) {
                reaction.marks.push({
                    learningOutcome: learningOutcome,
                    mark: 1
                });
            }
        };

        /**
         * add a new learning outcome 
         */
        $scope.addLearningOutcome = function () {
            // Initialize the data
            $scope.config.learningOutcomes[$scope.newLoName] = {
                desc: $scope.newLoDesc,
                feedbackTriggered: [],
                value: 0
            };

            // Should reset new name field
            $scope.newLoName = "";
            $scope.newLoDesc = "";
        };

        /**
         * add player characteristic 
         */
        $scope.addPlayerCharacteristic = function () {
            // Initialize the data
            $scope.config.player.push({
                name: "name",
                question: "question",
                type: "String"
            });
        };

        /**
         * add evidence reaction 
         */
        $scope.addReaction = function (evidence) {
            evidence.reactions.splice(evidence.reactions.length - 1, 0, {
                feedback: [],
                marks: [],
                values: []
            });
        };

        $scope.$watch('config', function () {
            // Get the list of learning outcome having end_win fb
            $scope.endWins = learningOutcomesByFeedback($scope.config, 'win');
            $scope.endLoses = learningOutcomesByFeedback($scope.config, 'lose');
            $scope.end = learningOutcomesByFeedback($scope.config, 'end');
            $scope.badges = feedbackByType($scope.config, 'badge');
            $scope.listParamsUpdated = $scope.listParamsUpdated || {};
            angular.forEach($scope.config.evidenceModel, function (evidence, name) {
                $scope.listParamsUpdated[name] = $scope.listParamsUpdated[name] || {};
                angular.forEach(evidence.listParams, function (paramList, paramName) {
                    var newList = paramList.map(function (e) {
                        var out = {};
                        out[paramName] = e;
                        return out;
                    });
                    // trick to avoid having ui-select showing existant items 
                    // in the dropdown (because a new list was generated).
                    if (!angular.equals($scope.listParamsUpdated[name][paramName], newList)) {
                        $scope.listParamsUpdated[name][paramName] = newList;
                    }
                });
            });
        }, true);

        /**
         * Open Feedback modal. 
         */
        $scope.openFeedbackModal = function (reaction) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'feedbackCtrl',
                size: 'lg',
                scope: $scope
            });

            modalInstance.result.then(
                function (feedback) {
                    reaction.feedback.push({
                        immediate: true,
                        name: feedback
                    });

                }
            );
        };

        /**
         * return the number of keys. 
         */
        $scope.numberOfKeys = function (o) {
            return Object.keys(o).length;
        };


        /**
         * Save config
         */
        $scope.save = function () {
            $scope.config.$createVersion(
                {
                    action: 'createVersion',
                    idSeriousGame: $scope.idSeriousGame
                },
                function (data) {
                    var path = $location.path().split('/');
                    $scope.config = data;
                    $scope.idVersion = data.seriousGame.version;
                    path[3] = $scope.idVersion;
                    $location.path(path.join('/'));
                }
            );

        };

        /**
         * Initialization
         */
        $scope.signs = {
            ">": "greater than",
            "<": "lower than"
        };

        $scope.badgeFeedback = {
            sumScore: "the total score",
            averageScore: "the player's average score",
            maxScore: "the player's maximum scrore",
            minScore: "the player's minimum scrore",
            averageTime: "the average time played",
            totalTime: "the total time played",
            numberWin: "the number of games won",
            numberGameplays: "the number of games played",
        };

        $scope.feedbackTypes = ['positive', 'negative'];
        $scope.newFeedbackType = $scope.feedbackTypes[0];

        // parse URL
        path = /(\d+)\/version\/(\d+)/.exec($location.absUrl());
        $scope.idSeriousGame = path[1];
        $scope.idVersion = path[2];

        // Fetch Config
        $scope.config = Config.get({
            idSeriousGame: $scope.idSeriousGame,
            idVersion: $scope.idVersion
        });

    });

    engage.controller('feedbackCtrl', function ($scope, $modalInstance) {

        $scope.select = function (feedback) {
            $modalInstance.close(feedback);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /**
         * Create a new feedback
         */
        $scope.createFeedback = function (name, message, type) {
            $scope.config.feedback[name] = {
                message: message,
                type: type
            };
            $scope.newFeedbackName = "";
            $scope.newFeedbackMessage = "";
        };

    });
}(window.angular));