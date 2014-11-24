var learningAnalytics = angular.module('learningAnalytics', []);

learningAnalytics.controller('LA_basicInfoController',
    ['$scope', '$http', function ($scope, $http) {
        $scope.LA = {};

        $scope.uniquePlayers = function () {
                var players = [];
                for (var i = $scope.LA.gameplays.length - 1; i >= 0; i--) {
                    var alreadyIn = false;
                    for (var j = players.length - 1; j >= 0; j--) {
                        if ($scope.LA.gameplays[i].idPlayer == players[j]) {
                            alreadyIn = true;
                        }
                    }
                    if (!alreadyIn) {
                        players[players.length] = $scope.LA.gameplays[i].idPlayer
                    }
                }
                return players;
            }

            $scope.getExtraCharacteristics = function () {
                if (!Object.getOwnPropertyNames($scope.LA).length){ return [] };
                var characteristics = angular.copy($scope.LA.game.playerCharacteristics);
                characteristics.push("player");

                return characteristics;
            }
            $scope.getLearningOutcomesList = function () {
                if (!Object.getOwnPropertyNames($scope.LA).length){ return [] };
                return Object.keys($scope.LA.game.learningOutcomes);
            }

            $scope.getGameplayDataset = function () {
                var dataset = [];
                for (var i = $scope.LA.gameplays.length - 1; i >= 0; i--) {
                    var idP = $scope.LA.gameplays[i].idPlayer;
                    for (var j = $scope.LA.players.length - 1; j >= 0; j--) {
                        if ($scope.LA.players[j].id == idP) {
                            dataset[dataset.length] = $.extend($scope.LA.gameplays[i], $scope.LA.players[j]);
                        }
                    }
                }
                return dataset;
            }

            $scope.getPlayerDataset=function () {
                var dataset = [];
                var i, j;
                for (i = $scope.LA.gameplays.length - 1; i >= 0; i--) {
                    var alreadyIn = false;
                    var gp = $scope.LA.gameplays[i];
                    for (j = dataset.length - 1; j >= 0; j--) {
                        if (gp.idPlayer == dataset[j].idPlayer) {
                            alreadyIn = true;
                        }
                    }

                    if (!alreadyIn) {
                        var idP = gp.idPlayer;
                        var timeSpent = gp.timeSpent;
                        var hours = parseInt(gp.timeStarted.split(":")[0]);
                        var minutes = parseInt(gp.timeStarted.split(":")[1]);
                        var timeStarted = hours * 60 + minutes;
                        var nb = 1;

                        // get average timeSpent and time
                        for (j = i - 1; j >= 0; j--) {
                            var gp2 = $scope.LA.gameplays[j];
                            if (gp2.idPlayer == idP) {
                                timeSpent += gp2.timeSpent;
                                timeStarted += parseInt(gp2.timeStarted.split(":")[0]) * 60;
                                timeStarted += parseInt(gp2.timeStarted.split(":")[1]);
                                nb++;
                            }
                        }

                        var avgTimeStarted = Math.round(timeStarted / nb);

                        hours = Math.floor(avgTimeStarted / 60);
                        minutes = avgTimeStarted - hours * 60;
                        var avgTimeStart = hours + ":" + minutes;

                        var avgForPlayer = {"idPlayer": idP, "timeSpent": Math.round(timeSpent / nb),
                            "timeStarted": avgTimeStart};

                        for (j = $scope.LA.players.length - 1; j >= 0; j--) {
                            if ($scope.LA.players[j].id == idP) {
                                dataset[dataset.length] = $.extend(avgForPlayer, $scope.LA.players[j]);
                            }
                        }
                    }
                }
                return dataset;
            }

            $scope.getPlayerLastDataset = function () {
                var dataset = [];
                var i, j;
                for (i = $scope.LA.gameplays.length - 1; i >= 0; i--) {
                    var alreadyIn = false;
                    var gp = $scope.LA.gameplays[i];
                    for (j = dataset.length - 1; j >= 0; j--) {
                        if (gp.idPlayer == dataset[j].idPlayer) {
                            alreadyIn = true;
                        }
                    }
                    if (!alreadyIn) {
                        var idP = gp.idPlayer;
                        var idGP = gp.id;
                        var timeSpent = gp.timeSpent;
                        var timeStarted = gp.timeStarted;
                        var finalScores = gp.finalScores;
                        var actions = gp.actions;

                        // get last gameplay
                        for (j = i - 1; j >= 0; j--) {
                            var gp2 = $scope.LA.gameplays[j];
                            if (gp2.idPlayer == idP && gp2.id > idGP) {
                                idGP = gp2.id;
                                timeSpent = gp2.timeSpent;
                                timeStarted = gp2.timeStarted;
                                finalScores = gp2.finalScores;
                                actions = gp2.actions;
                            }
                        }
                        var playerLast = {"id": idGP, "idPlayer": idP, "timeSpent": timeSpent,
                            "timeStarted": timeStarted, "finalScores": finalScores, "actions": actions};

                        for (j = $scope.LA.players.length - 1; j >= 0; j--) {
                            if ($scope.LA.players[j].id == idP) {
                                dataset[dataset.length] = $.extend(playerLast, $scope.LA.players[j]);
                            }
                        }
                    }
                }
                return dataset;
            }

            $scope.getPlayerBestDataset = function (outcome) {
                var dataset = [];
                var i, j;
                for (i = $scope.LA.gameplays.length - 1; i >= 0; i--) {
                    var alreadyIn = false;
                    var gp = $scope.LA.gameplays[i];
                    for (j = dataset.length - 1; j >= 0; j--) {
                        if (gp.idPlayer == dataset[j].idPlayer) {
                            alreadyIn = true;
                        }
                    }

                    if (!alreadyIn) {
                        var idP = gp.idPlayer;
                        var idGP = gp.id;
                        var timeSpent = gp.timeSpent;
                        var timeStarted = gp.timeStarted;
                        var finalScores = gp.finalScores;
                        var actions = gp.actions;

                        // get last gameplay
                        for (j = i - 1; j >= 0; j--) {
                            var gp2 = $scope.LA.gameplays[j];
                            if (gp2.idPlayer == idP && gp2.finalScores[outcome] > finalScores[outcome]) {
                                idGP = gp2.id;
                                timeSpent = gp2.timeSpent;
                                timeStarted = gp2.timeStarted;
                                finalScores = gp2.finalScores;
                                actions = gp2.actions;
                            }
                        }


                        var playerBest = {"id": idGP, "idPlayer": idP, "timeSpent": timeSpent,
                            "timeStarted": timeStarted, "finalScores": finalScores, "actions": actions};

                        for (j = $scope.LA.players.length - 1; j >= 0; j--) {
                            if ($scope.LA.players[j].id == idP) {
                                dataset[dataset.length] = $.extend(playerBest, $scope.LA.players[j]);
                            }
                        }
                    }
                }
                return dataset;
            }

            $scope.getMedian = function (arrayNumbersOrdered) {
                // even number
                if (Math.floor(arrayNumbersOrdered.length / 2) == arrayNumbersOrdered.length / 2) {
                    var num1 = arrayNumbersOrdered[Math.floor(arrayNumbersOrdered.length / 2)];
                    var num2 = arrayNumbersOrdered[Math.floor(arrayNumbersOrdered.length / 2) - 1];
                    return Math.round((num1 + num2) * 10 / 2) / 10;
                }
                // odd number
                else {
                    return arrayNumbersOrdered[Math.floor(arrayNumbersOrdered.length / 2)];
                }
            }

            $scope.getArrayStats = function (arrayNumbers) {

                // if empty array return 0

                if (arrayNumbers.length == 0) {
                    return [0, 0, 0, 0, 0];
                }

                // if only one number return it 5 times.
                if (arrayNumbers.length == 1) {
                    var n = arrayNumbers[0];
                    return [n, n, n, n, n];
                }

                // otherwise

                arrayNumbers.sort(function (a, b) {
                    return a - b
                });

                var arrayStats = [];
                // minimum
                arrayStats[0] = arrayNumbers[0];
                // lower quartile
                var firstHalf = arrayNumbers.slice(0, Math.floor(arrayNumbers.length / 2));
                arrayStats[1] = $scope.getMedian(firstHalf);
                // median
                arrayStats[2] = $scope.getMedian(arrayNumbers);
                // upper quartile
                var secondHalf = arrayNumbers.slice(Math.ceil(arrayNumbers.length / 2));
                arrayStats[3] = $scope.getMedian(secondHalf);
                // maximum
                arrayStats[4] = arrayNumbers[arrayNumbers.length - 1];

                return arrayStats;
            }

            $scope.setChartFinalScores= function (view, outcome) {

                // set the view
                var dataset = [];
                var i, j, k;
                var scoresList;
                if (view == "gameplay") {
                    dataset = $scope.getGameplayDataset();
                }
                else if (view == "playerLast") {
                    dataset = $scope.getPlayerLastDataset();
                }
                else if (view == "playerBest") {
                    dataset = $scope.getPlayerBestDataset(outcome);
                }

                if (dataset.length < 1) {
                    return 0;
                }

                // for each characteristic, draw a bar chart
                for (i = $scope.LA.game.playerCharacteristics.length - 1; i >= 0; i--) {
                    var characteristic = $scope.LA.game.playerCharacteristics[i];

                    // find data to show in good format = array of {name:"...", data:[avg, max, min]}
                    var data = [];
                    var categories = [];

                    // check all characteristics values
                    for (j = dataset.length - 1; j >= 0; j--) {
                        var characteristicValue = dataset[j][characteristic];

                        var charInData = false;

                        // check if characteristic is already in the data array
                        for (k = categories.length - 1; k >= 0; k--) {
                            if (categories[k] == characteristicValue) {
                                charInData = true;
                            }
                        }

                        // if it's a new characteristic:
                        // count how many times it appear, calculate the avg, max and min
                        if (!charInData) {
                            categories[categories.length] = characteristicValue;

                            scoresList = [];
                            scoresList[0] = dataset[j].finalScores[outcome];

                            for (k = j - 1; k >= 0; k--) {
                                if (dataset[k][characteristic] == characteristicValue) {
                                    // if there is a new gp
                                    scoresList[scoresList.length] = dataset[k].finalScores[outcome];
                                }
                            }
                            data[data.length] = $scope.getArrayStats(scoresList);
                        }
                    }

                    // add the total
                    scoresList = [];

                    for (j = 0; j < dataset.length; j++) {
                        scoresList[j] = dataset[j].finalScores[outcome];
                    }

                    categories[categories.length] = "Total";
                    data[data.length] = $scope.getArrayStats(scoresList);


                    $('#containerBoxPlotScoreBy' + characteristic).highcharts({

                        chart: {
                            type: 'boxplot'
                        },

                        title: {
                            text: 'Final scores by ' + characteristic
                        },

                        subtitle: {
                            text: outcome
                        },

                        legend: {
                            enabled: false
                        },

                        xAxis: {
                            categories: categories
                        },

                        yAxis: {
                            title: {
                                text: 'Score'
                            }
                        },

                        series: [
                            {
                                name: 'Scores',
                                data: data,
                                tooltip: {
                                    headerFormat: '<em>Score for {point.key}</em><br/>'
                                }
                            }
                        ]

                    });
                }
            }

            $scope.setChartLearningCurve= function (view) {

                var outcome = $('#lo6').val();
                var i, j, k;
                var point, score;
                // set the view
                var dataset = [];
                if (view == "gameplay") {
                    dataset = $scope.getGameplayDataset();
                }
                else if (view == "playerLast") {
                    dataset = $scope.getPlayerLastDataset();
                }
                else if (view == "playerBest") {
                    dataset = $scope.getPlayerBestDataset(outcome);
                }

                if (dataset.length < 1) {
                    return 0;
                }

                // for each characteristic, draw a bar chart
                for (i = $scope.LA.game.playerCharacteristics.length; i >= 0; i--) {

                    var characteristic;
                    // find data to show in good format
                    var data = [];


                    if (i === $scope.LA.game.playerCharacteristics.length) {
                        characteristic = "player";

                        // draw every line
                        for (j = dataset.length - 1; j >= 0; j--) {
                            //initialise score
                            point = [];
                            score = $scope.LA.game.learningOutcomes[outcome];
                            point[0] = 0;
                            point[1] = score;

                            points = [];
                            points[0] = point;

                            dataset[j].actions.sort(function (a, b) {
                                return a.timestamp - b.timestamp
                            });

                            for (k = 0; k < dataset[j].actions.length; k++) {
                                point = [];
                                point[0] = dataset[j].actions[k].timestamp;
                                score += dataset[j].actions[k].mark;
                                point[1] = score;

                                points[points.length] = point;
                            }
                            data[data.length] = {"name": "player " + dataset[j].idPlayer, "data": points};
                        }
                    }
                    else {
                        characteristic = $scope.LA.game.playerCharacteristics[i];
                        var characteristics = [];

                        // draw a line foreach characteristic value
                        for (j = dataset.length - 1; j >= 0; j--) {

                            var characteristicValue = dataset[j][characteristic];

                            if (characteristics.indexOf(characteristicValue) == -1) {
                                characteristics.push(characteristicValue);
                            }

                            //initialise score
                            point = [];
                            score = $scope.LA.game.learningOutcomes[outcome];
                            point[0] = 0;
                            point[1] = score;

                            var points = [];
                            points[0] = point;

                            dataset[j].actions.sort(function (a, b) {
                                return a.timestamp - b.timestamp
                            });

                            for (k = 0; k < dataset[j].actions.length; k++) {
                                point = [];
                                point[0] = dataset[j].actions[k].timestamp;
                                score += dataset[j].actions[k].mark;
                                point[1] = score;

                                points[points.length] = point;
                            }
                            data[data.length] = {"name": characteristicValue + " (" + dataset[j].idPlayer + ")",
                                "data": points,
                                "color": Highcharts.getOptions().colors[characteristics.indexOf(characteristicValue) % 10]
                            };
                        }
                    }


                    // draw chart in containerLearningCurveBy + characteristic
                    $('#containerLearningCurveBy' + characteristic).highcharts({
                        title: {
                            text: 'Learning curve by ' + characteristic,
                            x: -20 //center
                        },
                        subtitle: {
                            text: outcome,
                            x: -20
                        },
                        xAxis: {
                            title: {
                                text: 'time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'score'
                            },
                            plotLines: [
                                {
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }
                            ]
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name} : {point.y}</b><br/>'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: data
                    });
                }
            }

            $scope.sortFunctionTimeStarted = function (a, b) {
                var timeStartedA = a.timeStarted;
                var timeStartedB = b.timeStarted;

                var dateA = new Date(timeStartedA);
                var dateB = new Date(timeStartedB);

                return dateA - dateB;

            }

            $scope.setChartLearningCurve2 = function () {
                var point;
                var outcome = $('#lo7').val();
                // set the view
                var dataset = $scope.getGameplayDataset();

                if (dataset.length < 1) {
                    return 0;
                }


                dataset.sort($scope.LA.sortFunctionTimeStarted);

                // for each characteristic, draw a bar chart
                for (var i = $scope.LA.game.playerCharacteristics.length; i >= 0; i--) {

                    var characteristic;
                    var characteristics = [];
                    var players = [];
                    // find data to show in good format
                    var data = [];


                    if (i === $scope.LA.game.playerCharacteristics.length) {
                        characteristic = "player";
                    }
                    else {
                        characteristic = $scope.LA.game.playerCharacteristics[i];
                    }

                    // draw every line
                    for (var j = dataset.length - 1; j >= 0; j--) {
                        //initialise score
                        var c = (characteristic == "player") ? "idPlayer" : characteristic;
                        var characteristicValue = dataset[j][c];
                        var idP = dataset[j].idPlayer;

                        if (characteristics.indexOf(characteristicValue) == -1) {
                            characteristics.push(characteristicValue);
                        }

                        if (players.indexOf(idP) == -1) {
                            players.push(idP);

                            var tryNumber = 0;

                            point = [];
                            point[0] = tryNumber;
                            point[1] = $scope.LA.game.learningOutcomes[outcome];

                            var points = [];
                            points[0] = point;

                            for (var k = 0; k < dataset.length; k++) {
                                if (idP === dataset[k].idPlayer) {
                                    tryNumber++;
                                    point = [];
                                    point[0] = tryNumber;
                                    point[1] = dataset[k].finalScores[outcome];

                                    points.push(point);
                                }
                            }
                            var value = (characteristic == "player") ? "player" : characteristicValue;
                            data[data.length] = {"name": value + " (" + dataset[j].idPlayer + ")",
                                "data": points,
                                "color": Highcharts.getOptions().colors[characteristics.indexOf(characteristicValue) % 10]
                            };
                        }
                    }

                    // draw chart in containerLearningCurveBy + characteristic
                    $('#containerLearningCurve2By' + characteristic).highcharts({
                        title: {
                            text: 'Learning curve by ' + characteristic,
                            x: -20 //center
                        },
                        subtitle: {
                            text: outcome,
                            x: -20
                        },
                        xAxis: {
                            title: {
                                text: 'number of gameplay'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'score'
                            },
                            plotLines: [
                                {
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }
                            ]
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name} : {point.y}</b><br/>'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: data
                    });
                }
            }

            $scope.setChartsHowManyTimes= function () {
                var numGPs;
                var i, j, k;
                // for each characteristic, draw a bar chart
                for (i = $scope.LA.game.playerCharacteristics.length; i >= 0; i--) {

                    var characteristic;
                    var categories = [];

                    if (i == $scope.LA.game.playerCharacteristics.length) {
                        characteristic = "player";

                        var playerIds = [];
                        numGPs = [];

                        for (k = $scope.LA.players.length - 1; k >= 0; k--) {
                            playerIds[playerIds.length] = "player " + $scope.LA.players[k].id;
                            var numGPsForP = 0;
                            for (j = $scope.LA.gameplays.length - 1; j >= 0; j--) {
                                if ($scope.LA.gameplays[j].idPlayer === $scope.LA.players[k].id) {
                                    numGPsForP++;
                                }
                            }
                            numGPs[numGPs.length] = numGPsForP;
                        }

                        categories = playerIds;
                    }
                    else {
                        characteristic = $scope.LA.game.playerCharacteristics[i];
                        numGPs = [];

                        for (k = $scope.LA.players.length - 1; k >= 0; k--) {

                            var characteristicValue = $scope.LA.players[k][characteristic];
                            // if haven't counted this characteristicValue
                            if (categories.indexOf(characteristicValue) == -1) {
                                categories.push(characteristicValue);

                                var numGPsForChar = 0;
                                var playersWithChar = [];

                                var dataset = $scope.getGameplayDataset();

                                for (j = dataset.length - 1; j >= 0; j--) {
                                    if (dataset[j][characteristic] == characteristicValue) {
                                        numGPsForChar++;

                                        if (playersWithChar.indexOf(dataset[j].idPlayer) == -1) {
                                            playersWithChar.push(dataset[j].idPlayer);
                                        }
                                    }
                                }

                                numGPs.push(Math.round(numGPsForChar * 10 / playersWithChar.length) / 10);
                            }
                        }
                    }

                    $('#containerHowManyTimesBy' + characteristic).highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'How many gameplay per student?'
                        },
                        xAxis: {
                            categories: categories
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'number of gameplays'
                            }
                        },
                        series: [
                            {
                                name: 'Gameplays per player',
                                data: numGPs,
                                color: Highcharts.getOptions().colors[categories.length % 10]
                            }
                        ]
                    });
                }
            }

            $scope.setChartsWhen = function (view) {
            // set the view
            var dataset = []
            if (view == "gameplay")
            {
                dataset = $scope.getGameplayDataset();
            }
            else if (view == "player")
            {
                dataset = $scope.getPlayerDataset();
            }

            if (dataset.length < 1) { return 0; }


            // for each characteristic, draw an area chart
            for (var i = 0; i <= $scope.LA.game.playerCharacteristics.length; i++) {

                var data = [];
                var characteristic;
                
                // data by player
                if (i == $scope.LA.game.playerCharacteristics.length)
                {
                    characteristic = "player";


                    // check all players
                    for (var j = 0 ; j < $scope.LA.players.length ; j++) {
                        var idP = $scope.LA.players[j].id;

                        var playerPerHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        
                        for (var k = dataset.length - 1; k >= 0; k--) {
                            if (dataset[k].idPlayer === idP)
                            {
                                // if there is a new gp
                                var timeStart = dataset[k].timeStarted;
                                var hour = parseInt(timeStart.split(" ")[1].split(":")[0]);
                                playerPerHour[hour]++;
                            }
                        };
                        data[data.length] = {"type":"column", "name":"player " + idP, "data":playerPerHour };
                    };
                }
                else {
                    characteristic = $scope.LA.game.playerCharacteristics[i];

                    // check all characteristics values
                    for (var j = dataset.length - 1; j >= 0; j--) {
                        var characteristicValue = dataset[j][characteristic];
                        var nb = 0;
                            
                        var charInData = false;

                        // check if characteristic is already in the data array
                        for (var k = data.length - 1; k >= 0; k--) {
                            if (data[k].name == characteristicValue)
                            {
                                charInData = true;
                            }
                        };

                        // if it's a new characteristic:
                        // count how many times it appear, calculate the avg, max and min
                        if (!charInData)
                        {
                            var hour = parseInt(dataset[j].timeStarted.split(" ")[1].split(":")[0]);
                            var playerPerHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            playerPerHour[hour]++;

                            for (var k = j - 1; k >= 0; k--) {
                                if (dataset[k][characteristic] == characteristicValue)
                                {
                                    // if there is a new gp
                                    hour = parseInt(dataset[k].timeStarted.split(" ")[1].split(":")[0]);
                                    playerPerHour[hour]++;
                                }
                            };
                            data[data.length] = {"type":"column", "name":characteristicValue, "data":playerPerHour };
                        };                  
                    };
                }
                // add the total
                
                var playerPerHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                       
                var morning = 0;
                var afternoon = 0;
                var evening = 0;
                var night = 0;
                var nb = 0;

                while (dataset.length > nb)
                {
                    hour = parseInt(dataset[nb++].timeStarted.split(" ")[1].split(":")[0]);
                    playerPerHour[hour]++;

                    if (hour>5 && hour <12)
                    {
                        morning++;
                    }
                    else if (hour>11 && hour <18)
                    {
                        afternoon++;
                    }
                    else if (hour>17 && hour <23)
                    {
                        evening++;
                    }
                    else 
                    {
                        night++;
                    }
                }

                data[data.length] = {"type":"spline", "name":"total", "data":playerPerHour, 
                                        marker: {
                                        lineWidth: 2,
                                        lineColor: Highcharts.getOptions().colors[data.length % 10],
                                        fillColor: 'white'
                                    } };

                var pieData = [{name:"morning", y:morning, color: Highcharts.getOptions().colors[data.length]},
                                {name:"afternoon", y:afternoon, color: Highcharts.getOptions().colors[data.length+1]}, 
                                {name:"evening", y:evening, color: Highcharts.getOptions().colors[data.length+2]}, 
                                {name:"night", y:night, color: Highcharts.getOptions().colors[data.length+3]}];

                data[data.length] = {"type":"pie", "name":"Summary", "data":pieData, 
                                        center: [80, 60],
                                        size: 80,
                                        showInLegend: false,
                                        dataLabels: {
                                            enabled: true
                                    } };
                
                // draw combined chart
                $('#containerWhenBy'+characteristic).highcharts({
                    title: {
                        text: 'When did they play? (by ' + characteristic + ')'
                    },
                    xAxis: {
                        title: {
                            text: 'Hour'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of players'
                        }
                    },
                    labels: {
                        items: [{
                            html: 'Summary',
                            style: {
                                left: '50px',
                                top: '18px',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                            }
                        }]
                    },
                    series: data
                });
                $('#containerWhenBy2'+characteristic).highcharts({
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'When did they play? (by ' + characteristic + ')'
                    },
                    xAxis: {
                        allowDecimals: false,
                        labels: {
                            formatter: function () {
                                return this.value; // clean, unformatted number for year
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of players'
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                    },
                    plotOptions: {
                        area: {
                            pointStart: 0,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    series: data
                });
            };
            }

            $scope.setChartsHowLong= function (view) {
                var i, j, k, nb;
                var totalTimeSpent, maxTimeSpent, minTimeSpent, timeS, avgTimeSpent;
                // set the view
                var dataset = [];
                if (view == "gameplay") {
                    dataset = $scope.getGameplayDataset();
                }
                else if (view == "player") {
                    dataset = $scope.getPlayerDataset();
                }

                if (dataset.length < 1) {
                    return 0;
                }

                // for each characteristic, draw a bar chart
                for (i = $scope.LA.game.playerCharacteristics.length - 1; i >= 0; i--) {
                    var characteristic = $scope.LA.game.playerCharacteristics[i];

                    // find data to show in good format = array of {name:"...", data:[avg, max, min]}
                    var data = [];
                    var categories = ["average", "max", "min"];

                    // check all characteristics values
                    for (j = dataset.length - 1; j >= 0; j--) {
                        var characteristicValue = dataset[j][characteristic];
                        nb = 0;

                        var charInData = false;

                        // check if characteristic is already in the data array
                        for (k = data.length - 1; k >= 0; k--) {
                            if (data[k].name == characteristicValue) {
                                charInData = true;
                            }
                        }

                        // if it's a new characteristic:
                        // count how many times it appear, calculate the avg, max and min
                        if (!charInData) {
                            totalTimeSpent = dataset[j].timeSpent;
                            maxTimeSpent = dataset[j].timeSpent;
                            minTimeSpent = dataset[j].timeSpent;
                            nb = 1;
                            for (k = j - 1; k >= 0; k--) {
                                if (dataset[k][characteristic] == characteristicValue) {
                                    // if there is a new gp
                                    nb++;
                                    timeS = dataset[k].timeSpent;
                                    totalTimeSpent += timeS;
                                    if (maxTimeSpent < timeS) {
                                        maxTimeSpent = timeS;
                                    }
                                    if (minTimeSpent > timeS) {
                                        minTimeSpent = timeS;
                                    }
                                }
                            }
                            avgTimeSpent = Math.round(totalTimeSpent / nb);
                            data[data.length] = {"name": characteristicValue, "data": [avgTimeSpent, maxTimeSpent, minTimeSpent] };
                        }
                    }

                    // add the total

                    totalTimeSpent = 0;
                    nb = 0;

                    while (dataset.length > nb) {
                        timeS = dataset[nb++].timeSpent;
                        totalTimeSpent += timeS;
                        if (maxTimeSpent < timeS) {
                            maxTimeSpent = timeS;
                        }
                        if (minTimeSpent > timeS) {
                            minTimeSpent = timeS;
                        }
                    }

                    avgTimeSpent = Math.round(totalTimeSpent / nb);
                    data[data.length] = {"name": "all", "data": [avgTimeSpent, maxTimeSpent, minTimeSpent] };

                    // draw bar chart
                    $('#containerHowLongBy' + characteristic).highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Time spent (by ' + characteristic + ')'
                        },
                        xAxis: {
                            categories: categories
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Time spent (second)'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} sec</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.1,
                                borderWidth: 0
                            }
                        },
                        series: data
                    });
                }
            }

            $scope.whoPlayedView = 'gameplay';

            $scope.setChartsWhoPlayed = function () {

                // set the view
                var dataset = [];
                var i, j, k, idP, nb;
                if ($scope.whoPlayedView == "gameplay") {
                    for (i = $scope.LA.gameplays.length - 1; i >= 0; i--) {
                        idP = $scope.LA.gameplays[i].idPlayer;

                        for (j = $scope.LA.players.length - 1; j >= 0; j--) {
                            if ($scope.LA.players[j].id == idP) {
                                dataset[dataset.length] = $scope.LA.players[j]
                            }
                        }
                    }
                }
                else if ($scope.whoPlayedView == "player") {
                    for (i = $scope.LA.gameplays.length - 1; i >= 0; i--) {
                        var alreadyIn = false;
                        for (j = dataset.length - 1; j >= 0; j--) {
                            if ($scope.LA.gameplays[i].idPlayer == dataset[j].idPlayer) {
                                alreadyIn = true;
                            }
                        }
                        if (!alreadyIn) {
                            idP = $scope.LA.gameplays[i].idPlayer;
                            for (j = $scope.LA.players.length - 1; j >= 0; j--) {
                                if ($scope.LA.players[j].id == idP) {
                                    dataset[dataset.length] = $scope.LA.players[j];
                                }
                            }
                        }
                    }
                }

                // for each characteristic, draw a piechart
                for (i = $scope.LA.game.playerCharacteristics.length - 1; i >= 0; i--) {
                    var characteristic = $scope.LA.game.playerCharacteristics[i];

                    // find data to show in good format = array of ["value of characteristic", share]
                    var data = [];

                    // check all characteristics values
                    for (j = dataset.length - 1; j >= 0; j--) {
                        var characteristicValue = dataset[j][characteristic];
                        nb = 0;

                        var charInData = false;

                        // check if characteristic is already in the data array
                        for (k = data.length - 1; k >= 0; k--) {
                            if (data[k][0] == characteristicValue) {
                                charInData = true
                            }
                        }

                        // if it's a new characteristic count how many times it appear
                        if (!charInData) {
                            for (k = dataset.length - 1; k >= 0; k--) {
                                if (dataset[k][characteristic] == characteristicValue) {
                                    nb = nb + 1
                                }
                            }
                            data[data.length] = [characteristicValue + "", nb];
                        }
                    }

                    // draw pie chart
                    $('#containerWhoPlayedBy' + characteristic).highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: 1,//null,
                            plotShadow: false
                        },
                        title: {
                            text: 'Who played? (by ' + characteristic + ')'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        },
                        series: [
                            {
                                type: 'pie',
                                name: characteristic + ' share',
                                data: data
                            }
                        ]
                    });
                }
            }

            $scope.setChartRelationShip= function () {
                // update containerRelationship
            }


        $http.get('http://docker:8080/learninganalytics/seriousgame/47/version/0')
            .success(function (data) {
                $scope.LA = data;
                $scope.setChartsWhoPlayed();
                $scope.setChartsHowLong('gameplay');
                $scope.setChartsWhen('gameplay');
                $scope.setChartsHowManyTimes('gameplay');
                $scope.setChartFinalScores('gameplay');
                $scope.setChartLearningCurve('gameplay');
                $scope.setChartLearningCurve2();
                $scope.setChartLearningCurve('playerBest');
            });
    }]
);
