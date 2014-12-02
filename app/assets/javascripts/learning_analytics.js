var learningAnalytics = angular.module('learningAnalytics', ['ui.bootstrap']);

learningAnalytics.factory('utils', function() {
  var utils = {
    getGameplayDataset: function (la) {
        var dataset = [];
        for (var i = la.gameplays.length - 1; i >= 0; i--) {
            var idP = la.gameplays[i].idPlayer;
            for (var j = la.players.length - 1; j >= 0; j--) {
                if (la.players[j].idPlayer == idP) {
                    dataset[dataset.length] = $.extend(la.gameplays[i], la.players[j]);
                }
            }
        }
        return dataset;
    },
    sortFunctionTimeStarted: function (a, b) {
        var timeStartedA = a.timeStarted;
        var timeStartedB = b.timeStarted;

        var dateA = new Date(timeStartedA);
        var dateB = new Date(timeStartedB);

        return dateA - dateB;
    },
    getMedian : function (arrayNumbersOrdered) {
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
    },
    getPlayerLastDataset: function (la) {
        var dataset = [];
        var i, j;
        for (i = la.gameplays.length - 1; i >= 0; i--) {
            var alreadyIn = false;
            var gp = la.gameplays[i];
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
                    var gp2 = la.gameplays[j];
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

                for (j = la.players.length - 1; j >= 0; j--) {
                    if (la.players[j].idPlayer == idP) {
                        dataset[dataset.length] = $.extend(playerLast, la.players[j]);
                    }
                }
            }
        }
        return dataset;
    },
    getPlayerBestDataset: function (la, outcome) {
        var dataset = [];
        var i, j;
        for (i = la.gameplays.length - 1; i >= 0; i--) {
            var alreadyIn = false;
            var gp = la.gameplays[i];
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
                    var gp2 = la.gameplays[j];
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

                for (j = la.players.length - 1; j >= 0; j--) {
                    if (la.players[j].idPlayer == idP) {
                        dataset[dataset.length] = $.extend(playerBest, la.players[j]);
                    }
                }
            }
        }
        return dataset;
    },
    getArrayStats: function (arrayNumbers) {
        
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
        arrayStats[1] = this.getMedian(firstHalf);
        // median
        arrayStats[2] = this.getMedian(arrayNumbers);
        // upper quartile
        var secondHalf = arrayNumbers.slice(Math.ceil(arrayNumbers.length / 2));
        arrayStats[3] = this.getMedian(secondHalf);
        // maximum
        arrayStats[4] = arrayNumbers[arrayNumbers.length - 1];

        return arrayStats;
    }, 
    getPlayerDataset: function (la) {
        var dataset = [];
        var i, j;
        for (i = la.gameplays.length - 1; i >= 0; i--) {
            var alreadyIn = false;
            var gp = la.gameplays[i];
            for (j = dataset.length - 1; j >= 0; j--) {
                if (gp.idPlayer == dataset[j].idPlayer) {
                    alreadyIn = true;
                }
            }

            if (!alreadyIn) {
                var idP = gp.idPlayer;
                var timeSpent = gp.timeSpent;
                var time = gp.timeStarted.split(' ')[1];
                var hours = parseInt(time.split(":")[0]);
                var minutes = parseInt(time.split(":")[1]);
                var timeStarted = hours * 60 + minutes;
                var nb = 1;

                // get average timeSpent and time
                for (j = i - 1; j >= 0; j--) {
                    var gp2 = la.gameplays[j];
                    if (gp2.idPlayer == idP) {
                        timeSpent += gp2.timeSpent;

                        var time1 = gp2.timeStarted.split(' ')[1];
                        timeStarted += parseInt(time2.split(":")[0]) * 60;
                        timeStarted += parseInt(time2.split(":")[1]);
                        nb++;
                    }
                }

                var avgTimeStarted = Math.round(timeStarted / nb);

                hours = Math.floor(avgTimeStarted / 60);
                minutes = avgTimeStarted - hours * 60;
                var avgTimeStart = hours + ":" + minutes;

                var avgForPlayer = {"idPlayer": idP, "timeSpent": Math.round(timeSpent / nb),
                    "timeStarted": avgTimeStart};

                for (j = la.players.length - 1; j >= 0; j--) {
                    if (la.players[j].idPlayer == idP) {
                        dataset[dataset.length] = $.extend(avgForPlayer, la.players[j]);
                    }
                }
            }
        }
        return dataset;
    }
  };

  return utils;
});

learningAnalytics.directive('laWhoPlayed', function(){
    // set the view
    function process(la, view, characteristic) {
        var dataset = [];
        var data = [];
        var i, j, k, idP, nb;
        
        if (view == "gameplay") {
            for (i = la.gameplays.length - 1; i >= 0; i--) {
                idP = la.gameplays[i].idPlayer;

                for (j = la.players.length - 1; j >= 0; j--) {
                    if (la.players[j].idPlayer == idP) {
                        dataset[dataset.length] = la.players[j]
                    }
                }
            }
        }
        else if (view == "player") {
            for (i = la.gameplays.length - 1; i >= 0; i--) {
                var alreadyIn = false;
                for (j = dataset.length - 1; j >= 0; j--) {
                    if (la.gameplays[i].idPlayer == dataset[j].idPlayer) {
                        alreadyIn = true;
                    }
                }
                if (!alreadyIn) {
                    idP = la.gameplays[i].idPlayer;
                    for (j = la.players.length - 1; j >= 0; j--) {
                        if (la.players[j].idPlayer == idP) {
                            dataset[dataset.length] = la.players[j];
                        }
                    }
                }
            }
        }

        // find data to show in good format = array of ["value of characteristic", share]
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
        return data;
    }

    function draw(element, characteristic, data){
        element.highcharts({
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
    
    return {
        scope: {
            la: '=la',
            view: '=view',
            characteristic: '=characteristic'
        },
        link: function (scope, element) {
            
            scope.$watchGroup(['la', 'view', 'characteristic'], function (){
                var data = process(scope.la, scope.view, scope.characteristic);
                draw(element, scope.characteristic, data);
            });
        
        }
    };
});

learningAnalytics.directive('laWhen', function(utils){
    // set the view
    function process(la, view, characteristic, categories){
        // set the view
        var dataset = []
        if (view == "gameplay")
        {
            dataset = utils.getGameplayDataset(la);
        }
        else if (view == "player")
        {
            dataset = utils.getPlayerDataset(la);
        }

        if (dataset.length < 1) { return 0; }

        // for each characteristic, draw an area chart

        var data = [];
                
        // data by player
        if (characteristic === "player")
        {
            // check all players
            for (var j = 0 ; j < la.players.length ; j++) {
                var idP = la.players[j].idPlayer;

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
                    console.log(dataset[j].timeStarted);
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
        
        return data
    }

    function draw(element, characteristic, data, categories){
        // draw combined chart
        element.highcharts({
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
    }
    
    return {
        scope: {
            la: '=la',
            view: '=view',
            characteristic: '=characteristic'
        },
        link: function (scope, element) {
            var categories = ["average", "max", "min"];
            scope.$watchGroup(['la', 'view', 'characteristic'], function (){
                var data = process(scope.la, scope.view, scope.characteristic, categories);
                draw(element, scope.characteristic, data, categories);
            });
        
        }
    };
});

learningAnalytics.directive('laHowLong', function(utils){
    // set the view
    function process(la, view, characteristic, categories) {
        var i, j, k, nb;

        var totalTimeSpent, maxTimeSpent, minTimeSpent, timeS, avgTimeSpent;
        // set the view
        var dataset = [];
        if (view == "gameplay") {
            dataset = utils.getGameplayDataset(la);
        }
        else if (view == "player") {
            dataset = utils.getPlayerDataset(la);
        }

        if (dataset.length < 1) {
            return 0;
        }

        // find data to show in good format = array of {name:"...", data:[avg, max, min]}
        var data = [];

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
        return data;

    }

    function draw(element, characteristic, data, categories){
        element.highcharts({
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
    
    return {
        scope: {
            la: '=la',
            view: '=view',
            characteristic: '=characteristic'
        },
        link: function (scope, element) {
            var categories = ["average", "max", "min"];
            scope.$watchGroup(['la', 'view', 'characteristic'], function (){
                var data = process(scope.la, scope.view, scope.characteristic, categories);
                draw(element, scope.characteristic, data, categories);
            });
        
        }
    };
});

learningAnalytics.directive('laHowManyTimes', function(utils){
    // set the view
    function process(la, view, characteristic) {
        var numGPs;
        var i, j, k;
        // for each characteristic, draw a bar chart

        var categories = [];

        if (characteristic === 'player') {

            var playerIds = [];
            numGPs = [];

            for (k = la.players.length - 1; k >= 0; k--) {
                playerIds[playerIds.length] = "player " + la.players[k].idPlayer;
                var numGPsForP = 0;
                for (j = la.gameplays.length - 1; j >= 0; j--) {
                    if (la.gameplays[j].idPlayer === la.players[k].idPlayer) {
                        numGPsForP++;
                    }
                }
                numGPs[numGPs.length] = numGPsForP;
            }

            categories = playerIds;
        }
        else {
            numGPs = [];

            for (k = la.players.length - 1; k >= 0; k--) {

                var characteristicValue = la.players[k][characteristic];
                // if haven't counted this characteristicValue
                if (categories.indexOf(characteristicValue) == -1) {
                    categories.push(characteristicValue);

                    var numGPsForChar = 0;
                    var playersWithChar = [];

                    var dataset = utils.getGameplayDataset(la);

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

        // draw bar chart
        return { data: numGPs, categories: categories};

    }

    function draw(element, characteristic, data, categories){
        element.highcharts({
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
                        data: data,
                        color: Highcharts.getOptions().colors[categories.length % 10]
                    }
                ]
            });
    }
    
    return {
        scope: {
            la: '=la',
            view: '=view',
            characteristic: '=characteristic'
        },
        link: function (scope, element) {
            scope.$watchGroup(['la', 'view', 'characteristic'], function (){
                var output = process(scope.la, scope.view, scope.characteristic);
                draw(element, scope.characteristic, output.data, output.categories);
            });
        
        }
    };
});

learningAnalytics.directive('laFinalScores', function(utils){
    // set the view
    function process(la, view, characteristic, outcome) {
        // set the view
        var dataset = [];
        var i, j, k;
        var scoresList;
        if (view == "gameplay") {
            dataset = utils.getGameplayDataset(la);
        }
        else if (view == "playerLast") {
            dataset = utils.getPlayerLastDataset(la);
        }
        else if (view == "playerBest") {
            dataset = utils.getPlayerBestDataset(la, outcome);
        }

        if (dataset.length < 1) {
            return 0;
        }

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
                data[data.length] = utils.getArrayStats(scoresList);
            }
        }

        // add the total
        scoresList = [];

        for (j = 0; j < dataset.length; j++) {
            scoresList[j] = dataset[j].finalScores[outcome];
        }

        categories[categories.length] = "Total";
        data[data.length] = utils.getArrayStats(scoresList);

        // draw bar chart
        return { data: data, categories: categories};

    }

    function draw(element, characteristic, data, categories, outcome){
        element.highcharts({

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
    
    return {
        scope: {
            la: '=la',
            view: '=view',
            outcome: '=outcome',
            characteristic: '=characteristic'
        },
        link: function (scope, element) {
            scope.$watchGroup(['la', 'view', 'characteristic', 'outcome'], function (){
                var output = process(scope.la, scope.view, scope.characteristic, scope.outcome);
                draw(element, scope.characteristic, output.data, output.categories, scope.outcome);
            });
        
        }
    };
});

learningAnalytics.directive('laLearningCurves', function(utils){
    // set the view
    function process(la, view, characteristic, outcome) {
        // set the view
        var i, j, k;
        var point, score;
        // set the view
        var dataset = [];
        if (view == "gameplay") {
            dataset = utils.getGameplayDataset(la);
        }
        else if (view == "playerLast") {
            dataset = utils.getPlayerLastDataset(la);
        }
        else if (view == "playerBest") {
            dataset = utils.getPlayerBestDataset(la, outcome);
        }

        if (dataset.length < 1) {
            return 0;
        }

        // find data to show in good format
        var data = [];


        if (characteristic === "player") {

            // draw every line
            for (j = dataset.length - 1; j >= 0; j--) {
                //initialise score
                point = [];
                score = la.game.learningOutcomes[outcome].value;
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
            var characteristics = [];

            // draw a line foreach characteristic value
            for (j = dataset.length - 1; j >= 0; j--) {

                var characteristicValue = dataset[j][characteristic];

                if (characteristics.indexOf(characteristicValue) == -1) {
                    characteristics.push(characteristicValue);
                }

                //initialise score
                point = [];
                score = la.game.learningOutcomes[outcome].value;
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

        // draw bar chart
        return data;

    }

    function draw(element, characteristic, data, outcome){
        element.highcharts({
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
    
    return {
        scope: {
            la: '=la',
            view: '=view',
            outcome: '=outcome',
            characteristic: '=characteristic'
        },
        link: function (scope, element) {
            scope.$watchGroup(['la', 'view', 'characteristic', 'outcome'], function (){
                var data = process(scope.la, scope.view, scope.characteristic, scope.outcome);
                draw(element, scope.characteristic, data, scope.outcome);
            });
        
        }
    };
});

learningAnalytics.directive('laLearningCurvesWithinGameplays', function(utils){

    function process(la, characteristic, outcome) {
        var point;
        var dataset = utils.getGameplayDataset(la);

        if (dataset.length < 1) {
            return 0;
        }


        dataset.sort(utils.sortFunctionTimeStarted);

        var characteristics = [];
        var players = [];
        // find data to show in good format
        var data = [];


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
                point[1] = la.game.learningOutcomes[outcome].value;

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
        return data;
    }

    function draw(element, characteristic, data, outcome){
        // draw chart in containerLearningCurveBy + characteristic
        element.highcharts({
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
    
    return {
        scope: {
            la: '=la',
            outcome: '=outcome',
            characteristic: '=characteristic'
        },
        link: function (scope, element) {
            scope.$watchGroup(['la', 'characteristic', 'outcome'], function (){
                var data = process(scope.la, scope.characteristic, scope.outcome);
                draw(element, scope.characteristic, data, scope.outcome);
            });
        
        }
    };
});

learningAnalytics.controller('LA_basicInfoController',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
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

        // Initialize the radio buttons

        $scope.whoPlayedView = 'gameplay';
        $scope.howLongView = 'gameplay';
        $scope.whenView = 'gameplay';
        $scope.howManyTimesView = 'gameplay';
        $scope.finalScoresView = 'gameplay';
        $scope.learningCurvesView = 'gameplay';
        
        // Get the learning analytics
        var path = /learning_analytics\/(\d+)\/(\d+)/.exec($location.absUrl());
        $http.get('http://docker:8080/learninganalytics/seriousgame/' + path[1] + '/version/' + path[2])
            .success(function (data) {
                $scope.LA = data;
                // update the select boxes
                $scope.loFinalScoresOutcome = $scope.getLearningOutcomesList()[0];
                $scope.loLearningCurvesOutcome = $scope.getLearningOutcomesList()[0];
                $scope.loLearningCurvesWithinGameplaysOutcome = $scope.getLearningOutcomesList()[0];
            });
    }]
);
