/*globals describe, config, beforeEach, afterEach, it, expect, inject */
/*jslint nomen: true*/
"use strict";
describe('Editor ', function () {
    beforeEach(module('EnGAge'));


    describe('GameCtrl ', function () {
        var $scope, $httpBackend, $controller, createController;
        /*jslint nomen: true*/
        beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
            $scope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $controller = _$controller_;

            createController = function () {
                var ctlr = $controller('GameCtrl', {'$scope' : $scope });
                $httpBackend.flush();
                return ctlr;
            };

            /* Mock call to the backend*/
            $httpBackend.when('GET', 'http://146.191.107.189:8080/seriousgame/89/version/0').respond(config);
        }));

        it('should fetch config from webservice', function () {
            $httpBackend.expectGET('http://146.191.107.189:8080/seriousgame/89/version/0');
            createController();
        });

        describe('Initialization ', function () {
            beforeEach(function () {
                createController();
            });

            it('should filter learning outcomes having end_win fb', function () {
                expect($scope.endWins).toEqual([{
                    learningOutcome: 'eu_countries',
                    feedbackTriggeredIdx: 0,
                    feedbackIdx: 0
                }]);
            });

            it('should filter learning outcomes having end_lose fb', function () {
                expect($scope.endLoses).toEqual([{
                    learningOutcome: 'lives',
                    feedbackTriggeredIdx: 0,
                    feedbackIdx: 0
                }]);
            });

            it('should filter badges', function () {
                var badges = [
                    "master_time",
                    "novice_time",
                    "gold_medal",
                    "performance",
                    "effort",
                    "silver_medal",
                    "expert_time",
                    "bronze_medal"
                ];
                expect($scope.badges).toEqual(badges);
            });

        });

        it('should delete learning outcome', function () {
            createController();
            $scope.deleteLearningOutcome("eu_countries");
            expect($scope.config.learningOutcomes.eu_countries).toBeUndefined();
        });


        describe('add learning outcome ', function () {
            
            beforeEach(function () {
                createController();
                $scope.newLoName = "loName";
                $scope.addLearningOutcome();
            });

            it('should add default data', function () {
                expect($scope.config.learningOutcomes.loName).toEqual({
                    desc: "",
                    feedbackTriggered: [],
                    value: 0
                });
            });

            it('should make the new LO editable', function () {
                expect($scope.loInserted).toEqual("loName");
            });

            it('should reset the input field', function () {
                $scope.addLearningOutcome("loName");
                expect($scope.newLoName).toEqual("");
            });
        });


        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});