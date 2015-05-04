/*globals jasmine, angular, describe, config, beforeEach, afterEach, it, expect, inject */
/*jslint nomen: true*/
"use strict";
describe('Editor ', function () {
    beforeEach(
        module('EnGAge')
    );


    // Mock modal service 
    beforeEach(module(function ($provide) {
        $provide.service('$modalInstance', function () {
            this.open = jasmine.createSpy('open');
            this.close = jasmine.createSpy('close');
            this.dismiss = jasmine.createSpy('dismiss');
        });
    }));

    // Mock location service 
    beforeEach(module(function ($provide) {
        var path = "/89/version/0";
        $provide.service('$location', function () {
            this.absUrl = function () { return path; };
            this.path = function (newPath) {
                if (newPath) { path = newPath; }
                return path;
            };
        });
    }));

    describe('Editor ', function () {
        var $scope,
            $httpBackend,
            $controller,
            createController,
            createFeedbackController,
            $modalInstance,
            $location,
            newConfig;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _$modalInstance_, _$location_) {
            $scope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
            $modalInstance = _$modalInstance_;
            $location = _$location_;

            createController = function () {
                var ctlr = $controller('GameCtrl', {'$scope' : $scope });
                $httpBackend.flush();
                return ctlr;
            };

            createFeedbackController = function () {
                return $controller('feedbackCtrl', {'$scope' : $scope });
            };

            /* Mock new config*/
            newConfig = angular.copy(config);
            newConfig.seriousGame.version = 1;

            /* Mock call to the backend*/
            $httpBackend.when('GET', 'http://146.191.107.189:8080/seriousgame/89/version/0').respond(config);
            $httpBackend.when('GET', 'myModalContent.html').respond("");
            $httpBackend.when('POST', 'http://146.191.107.189:8080/seriousgame/89/createVersion').respond(newConfig);
        }));

        describe('Initialization', function () {
            it('should fetch config from webservice', function () {
                $httpBackend.expectGET('http://146.191.107.189:8080/seriousgame/89/version/0');
                createController();
            });

            describe('GameCtrl', function () {
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


                it('should parse idSeriousGame from url', function () {
                    expect($scope.idSeriousGame).toEqual("89");
                });

                it('should parse idVersion from url', function () {
                    expect($scope.idVersion).toEqual("0");
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

            describe('save', function () {
                beforeEach(function () {
                    createController();
                });
                it('should call the webservice to save the updated config', function () {

                    $httpBackend.expectPOST('http://146.191.107.189:8080/seriousgame/89/createVersion');
                    $scope.save();
                    $httpBackend.flush();
                });

                it('should update the config with the data returned by the webservice', function () {
                    $scope.save();
                    $httpBackend.flush();
                    expect(angular.equals($scope.config, newConfig)).toBeTruthy();
                });

                it('should update the idVersion in the scope', function () {
                    $scope.save();
                    $httpBackend.flush();
                    expect($scope.idVersion).toBe(1);
                });

                it('should update the idVersion in the path', function () {
                    $scope.save();
                    $httpBackend.flush();
                    expect($location.path()).toBe('/89/version/1');
                });
            });

            describe('openFeedbackModal', function () {
                beforeEach(function () {
                    createController();
                });

                it('should open modal', function () {
                    $scope.openFeedbackModal();
                    $httpBackend.expectGET('myModalContent.html');
                    $httpBackend.flush();
                });

                it('should add feedback on select', function () {
                    $scope.openFeedbackModal();
                    $httpBackend.flush();
                });
            });
        });

        describe('feedbackCtrl', function () {
            beforeEach(function () {
                createFeedbackController();
            });

            describe('select', function () {
                it('should close the modal on select', function () {
                    var feedback = "feedback";
                    $scope.select(feedback);
                    expect($modalInstance.close).toHaveBeenCalledWith(feedback);
                });
            });

            describe('cancel', function () {
                it('should close the modal ', function () {
                    $scope.cancel();
                    expect($modalInstance.dismiss).toHaveBeenCalled();
                });
            });
        });


        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});