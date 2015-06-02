/***
 * access_student_games.js
 * Defines the behaviour of the Game Access page
 */

(function (angular) {
    "use strict";

    // This create a new Angular modu)le called EnGAge
    var access = angular.module('Access', ['ngResource', 'ui.bootstrap', 'xeditable', 'angular.filter']);

    // configure csrftoken
   access.config(["$httpProvider", function ($httpProvider) {
       $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
   }]);

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
        AccessList.get(
            function(data){
                $scope.accessList = data;
                $scope.gameSelected = data.Games[0].id;
            }
        );
        $scope.groupSelected = 'all';

        /**
         * Returns the version of a game to be played by a particular student
         * @param  {Object} accessList  list of games and students with access
         * @param  {String} idGame      ID of game
         * @param  {String} idStudent   ID of student
         * @return {Int}                version to be played (-1 if none)
         */
        $scope.gameAccessByStudent = function (studentAccess, idGame) {
            var result = -1;
            if (studentAccess.access[idGame] != null)
            {
                result = studentAccess.access[idGame];
            }
            return result;
        };

        $scope.getGameVersions = function (games)
        {
            var idSG = $scope.gameSelected;
            var versions;
            angular.forEach(games, function (game) {
                if (game.id == idSG) {
                    versions = game.versions;
                }
            });
            return versions;
        }


        $scope.updateTable = function (studentsAccess)
        {
            angular.forEach(studentsAccess, function (studentAccess) {
                angular.forEach(studentAccess.group, function (group) {
                    if (group.id.toString() === $scope.groupSelected || $scope.groupSelected == 'all') {
                        if ($scope.versionSelected) {
                            studentAccess.access[$scope.gameSelected] = $scope.versionSelected;
                        }
                    }
                });
            });
        }

        /**
         * modify the version to be played by a specific player
         * @param  int idGame       ID of the the game
         * @param  {json} studentAccess    game access to student
         * @param  int version      version to be played
         */
        $scope.modifyAccessByStudentAndGame = function (studentAccess, idGame, version) {

            // if version == -1, delete the access
            if (version === -1)
            {
                delete studentAccess.access[idGame];
            }
            else
            {
                studentAccess.access[idGame] = version;
            }
        };

        /**
         * Save new table
         */
        $scope.save = function () {
            $scope.accessList.$save( 
                function () {                    
                    alert("Your changes have been saved");
                },
                function () {                    
                    alert("Sorry, something went wrong, try again");
                }
             );

        }
    });
}(window.angular));