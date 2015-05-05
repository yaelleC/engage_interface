/***
 * access_student_games.js
 * Defines the behaviour of the Game Access page
 */

(function (angular) {
    "use strict";

    // This create a new Angular modu)le called EnGAge
    var access = angular.module('Access', ['ngResource', 'ui.bootstrap', 'xeditable', 'angular.filter']);

    // xeditable options
    access.run(function (editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        editableOptions.buttons = 'yes'; // bootstrap3 theme. Can be also 'bs2', 'default'

    });

    // This creates an angular resource to retrieve the access json
    access.factory('AccessList', function ($resource) {
        return $resource('/access_student_games.json', {}, {
            get: {method: 'GET'},
            save: {method: 'POST'}
        });
    });

    // Absolute
    access.filter('abs', function () {
        return function (input) {
            return Math.abs(input);
        };
    });

    // This defines the main controller
    access.controller('AccessCtrl', function ($scope, AccessList, $location, $modal) {


        // Fetch Config
        $scope.accessList = AccessList.get();

        /**
         * Returns the version of a game to be played by a particular student
         * @param  {Object} accessList  list of games and students with access
         * @param  {String} idGame      ID of game
         * @param  {String} idStudent   ID of student
         * @return {Int}                version to be played (-1 if none)
         */
        $scope.accessByStudentAndGame = function (accessList, idGame, idStudent) {
            var result = -1;
            angular.forEach(accessList.studentAccess, function (sAccess) {
                if (sAccess.id === idStudent)
                {
                    angular.forEach(sAccess.access, function (access) {
                        if (access.idSG === idGame) {
                            return access.versionPlayed;
                        }
                    });
                }
            });
            return result;
        };

        /**
         * Returns the version of a game to be played by a particular student
         * @param  {Object} accessList  list of games and students with access
         * @param  {String} idGame      ID of game
         * @param  {String} idStudent   ID of student
         * @return {Int}                version to be played (-1 if none)
         */
        $scope.gameAccessByStudent = function (studentAccess, idGame) {
            var result = -1;
            angular.forEach(studentAccess.access, function (access) {
                console.log(access.idSG, idGame);
                console.log(access.idSG === idGame);
                if (access.idSG === idGame) {
                    result = access.versionPlayed;
                }
            });
            return result;
        };

        /**
         * modify the version to be played by a specific player
         * @param  int idGame       ID of the the game
         * @param  int idStudent    ID of the the student
         * @param  int version      version to be played
         */
        $scope.modifyAccessByStudentAndGame = function (idGame, idStudent, version) {

            angular.forEach($scope.accessList.studentAccess, function (sAccess) {
                if (sAccess.id === idStudent)
                {
                    angular.forEach(sAccess.access, function (access, idx) {
                        if (access.idSG === idGame) {
                            // if version == -1, delete the access
                            if (version === -1)
                            {
                                sAccess.access.splice(idx, 1);
                            }
                            else
                            {
                                access.versionPlayed = version;
                            }
                            return;
                        }
                    });

                    // if the access was not already in the file, add it
                    sAccess.push({
                        idSG: idGame,
                        versionPlayed: version
                    });
                }
            });
        };
    });
}(window.angular));