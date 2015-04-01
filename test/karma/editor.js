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

        describe('Initialization', function () {
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

        describe('delete learning outcome', function () {
            beforeEach(function () {
                createController();
                $scope.deleteLearningOutcome("eu_countries");
            });

            it('should delete learning outcome', function () {
                expect($scope.config.learningOutcomes.eu_countries).toBeUndefined();
            });

            it('should delete mark references to the learning outcome', function () {
                var reaction = $scope.config.evidenceModel.newCountrySelected.reactions[0];
                expect(reaction.marks[0].learningOutcome).not.toBe("eu_countries");
            });
        });


        describe('add learning outcome', function () {
            beforeEach(function () {
                createController();
                $scope.newLoName = "loName";
                $scope.addLearningOutcome();
            });

            it('should set default values for the new learning outcome', function () {
                expect($scope.config.learningOutcomes.loName).toEqual({
                    desc: "",
                    feedbackTriggered: [],
                    value: 0
                });
            });

            it('should reset the input field', function () {
                $scope.addLearningOutcome("loName");
                expect($scope.newLoName).toEqual("");
            });
        });


        describe('rename learning outcome', function () {
            beforeEach(function () {
                createController();
                $scope.renameLearningOutcome("eu_countries", "new_name");
            });

            it('should rename the LO', function () {
                expect($scope.config.learningOutcomes.new_name).toBeDefined();
                expect($scope.config.learningOutcomes.eu_countries).toBeUndefined();
            });

            it('should rename marks references to the LO', function () {
                var reaction = $scope.config.evidenceModel.newCountrySelected.reactions[0];
                expect(reaction.marks[0].learningOutcome).toBe("new_name");
            });
        });


        describe('available Learning Outcomes', function () {
            it('should return the list of learning outcome that could be added', function () {
                createController();
                var reaction =  $scope.config.evidenceModel.countryReSelected.reactions[0],
                    learningOutcomes = $scope.availableLearningOutcomes(reaction.marks),
                    expected = [ "lives", "eu_countries"];
                expect(learningOutcomes.sort()).toEqual(expected.sort());
            });

        });


        describe('add mark', function () {
            var reaction;

            beforeEach(function () {
                createController();
                reaction =  $scope.config.evidenceModel.countryReSelected.reactions[0];
            });

            it('should add new mark', function () {
                $scope.addMark(reaction, "lives");
                expect(reaction.marks[1].learningOutcome).toBe("lives");
            });

            it('should set default mark', function () {
                $scope.addMark(reaction, "lives");
                expect(reaction.marks[1].mark).toBe(1);
            });
            it('should fail is the learning outcome is already present', function () {
                $scope.addMark(reaction, "lives");
                $scope.addMark(reaction, "lives");
                expect(reaction.marks.length).toBe(2);
            });

        });


        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});