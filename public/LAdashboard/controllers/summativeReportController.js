function summativeReportController($scope) {
	$scope.report = {

		overallDataOnTheSG: [
			{
				"legend" : "your class",
				"avgTime" : 2.8,
				"avgScore":5,
				"highestScore":11,
				"upperQuartile": 8,
				"lowerQuartile": 3,
				"lowestScore": 0
			},
			{
				"legend" : "boys",
				"avgTime" : 4.2,
				"avgScore":6,
				"highestScore":12,
				"upperQuartile": 9,
				"lowerQuartile": 3,
				"lowestScore": 1
			},
			{
				"legend" : "14 and 16 years old",
				"avgTime" : 3.1,
				"avgScore":7,
				"highestScore":13,
				"upperQuartile": 9,
				"lowerQuartile": 4,
				"lowestScore": 2
			}
		],
	
		previousGameplay: [
			{
				id: 0,
				timeSpent: 141,
				timeStarted:"18:03", 
				finalScores:[{outcomeName: "european_capitals", score:1}],
				actions:[
					{timestamp:0, score:0},
					{timestamp:15, action:"associateCountryCapital", parameters:["Paris", "France"], mark:1, score:1},
					{timestamp:40, action:"associateCountryCapital", parameters:["Warsow", "Denmark"], mark:-1, score:0},
					{timestamp:58, action:"associateCountryCapital", parameters:["Warsow", "Poland"], mark:2, score:2}, 
					{timestamp:75, action:"associateCountryCapital", parameters:["Rome", "Germany"], mark:-1, score:1},
					{timestamp:89, action:"associateCountryCapital", parameters:["London", "UK"], mark:1, score:2},
					{timestamp:112, action:"associateCountryCapital", parameters:["Dublin", "Germany"], mark:-1, score:1},
					{timestamp:130, action:"associateCountryCapital", parameters:["Dublin", "Ireland"], mark:1, score:2},
					{timestamp:141, action:"associateCountryCapital", parameters:["Lisbon", "Spain"], mark:-1, score:1}
				]
			},
			{
				id: 1,
				timeSpent: 103,
				timeStarted:"17:42", 
				finalScores:[{outcomeName: "european_capitals", score:5}],
				actions:[
					{timestamp:0, score:0},
					{timestamp:3, action:"associateCountryCapital", parameters:["Paris", "France"], mark:1, score:1},
					{timestamp:15, action:"associateCountryCapital", parameters:["Warsow", "Denmark"], mark:-1, score:0},
					{timestamp:22, action:"associateCountryCapital", parameters:["Warsow", "Poland"], mark:2, score:2}, 
					{timestamp:36, action:"associateCountryCapital", parameters:["Rome", "Italy"], mark:1, score:3},
					{timestamp:45, action:"associateCountryCapital", parameters:["London", "UK"], mark:1, score:4},
					{timestamp:52, action:"associateCountryCapital", parameters:["Dublin", "Germany"], mark:-1, score:3},
					{timestamp:64, action:"associateCountryCapital", parameters:["Dublin", "Ireland"], mark:1, score:4},
					{timestamp:71, action:"associateCountryCapital", parameters:["Berlin", "Germany"], mark:1, score:5},
					{timestamp:81, action:"associateCountryCapital", parameters:["Helsinki" , "Finland"], mark:2, score:7},
					{timestamp:99, action:"associateCountryCapital", parameters:["Prague", "France"], mark:-1, score:6},
					{timestamp:120, action:"associateCountryCapital", parameters:["Madrid", "Spain"], mark:1, score:7},
					{timestamp:128, action:"associateCountryCapital", parameters:["Prague", "Czech Republic"], mark:2, score:9},
					{timestamp:141, action:"associateCountryCapital", parameters:["Lisbon", "Spain"], mark:-1, score:8}
				]
			},
			{
				id: 2,
				timeSpent: 172,
				timeStarted:"14:12", 
				finalScores:[{outcomeName: "european_capitals", score:9}],
				actions:[
					{timestamp:0, score:0},
					{timestamp:10, action:"associateCountryCapital", parameters:["Paris", "France"], mark:1, score:1},
					{timestamp:32, action:"associateCountryCapital", parameters:["Warsow", "Denmark"], mark:-1, score:0},
					{timestamp:54, action:"associateCountryCapital", parameters:["Dublin", "Germany"], mark:-1, score:-1},
					{timestamp:60, action:"associateCountryCapital", parameters:["Warsow", "Poland"], mark:2, score:1}, 
					{timestamp:71, action:"associateCountryCapital", parameters:["Rome", "Italy"], mark:1, score:2},
					{timestamp:89, action:"associateCountryCapital", parameters:["London", "UK"], mark:1, score:3},
					{timestamp:100, action:"associateCountryCapital", parameters:["Dublin", "Ireland"], mark:1, score:4},
					{timestamp:107, action:"associateCountryCapital", parameters:["Lisbon", "Spain"], mark:-1, score:3},
					{timestamp:121, action:"associateCountryCapital", parameters:["Berlin", "Germany"], mark:1, score:4},
					{timestamp:130, action:"associateCountryCapital", parameters:["Prague", "France"], mark:-1, score:3},
					{timestamp:145, action:"associateCountryCapital", parameters:["Helsinki" , "Finland"], mark:2, score:5},
					{timestamp:152, action:"associateCountryCapital", parameters:["Madrid", "Spain"], mark:1, score:6},
					{timestamp:168, action:"associateCountryCapital", parameters:["Prague", "Czech Republic"], mark:2, score:8},
					{timestamp:172, action:"associateCountryCapital", parameters:["Lisbon", "Portugal"], mark:1, score:9},
				]
			}
		],
		gameplay: {
			id: 3,
			timeSpent: 159,
			timeStarted:"15:27", 
			finalScores:[{outcomeName: "european_capitals", score:11}],
			actions:[
				{timestamp:0, score:0},
				{timestamp:3, action:"associateCountryCapital", parameters:["Paris", "France"], mark:1, score:1},
				{timestamp:15, action:"associateCountryCapital", parameters:["Warsow", "Denmark"], mark:-1, score:0},
				{timestamp:22, action:"associateCountryCapital", parameters:["Warsow", "Poland"], mark:2, score:2}, 
				{timestamp:36, action:"associateCountryCapital", parameters:["Rome", "Italy"], mark:1, score:3},
				{timestamp:45, action:"associateCountryCapital", parameters:["London", "UK"], mark:1, score:4},
				{timestamp:52, action:"associateCountryCapital", parameters:["Dublin", "Germany"], mark:-1, score:3},
				{timestamp:64, action:"associateCountryCapital", parameters:["Dublin", "Ireland"], mark:1, score:4},
				{timestamp:71, action:"associateCountryCapital", parameters:["Berlin", "Germany"], mark:1, score:5},
				{timestamp:81, action:"associateCountryCapital", parameters:["Helsinki" , "Finland"], mark:2, score:7},
				{timestamp:99, action:"associateCountryCapital", parameters:["Prague", "France"], mark:-1, score:6},
				{timestamp:120, action:"associateCountryCapital", parameters:["Madrid", "Spain"], mark:1, score:7},
				{timestamp:128, action:"associateCountryCapital", parameters:["Prague", "Czech Republic"], mark:2, score:9},
				{timestamp:139, action:"associateCountryCapital", parameters:["Lisbon", "Spain"], mark:-1, score:8},
				{timestamp:147, action:"associateCountryCapital", parameters:["Lisbon", "Portugal"], mark:1, score:9},
				{timestamp:159, action:"associateCountryCapital", parameters:["Warsow", "Poland"], mark:2, score:11}
			]
		},

		totalTime: function() {
			var totalTime = 0;
			for (var i = $scope.report.previousGameplay.length - 1; i >= 0; i--) {
				totalTime += $scope.report.previousGameplay[i].timeSpent;
			};
			totalTime += $scope.report.gameplay.timeSpent;
			return Math.round(totalTime * 10 / 60) / 10 ;
		},

		avgTime: function() {
			return Math.round($scope.report.totalTime() * 10 / ($scope.report.previousGameplay.length + 1)) / 10 ;
		},

		thisTime: function () {
			return Math.round($scope.report.gameplay.timeSpent * 10 / 60) / 10
		},

		scoreLO: function(outcome) {
			for (var i = $scope.report.gameplay.finalScores.length - 1; i >= 0; i--) {
				if ($scope.report.gameplay.finalScores[i].outcomeName == outcome) {
					return $scope.report.gameplay.finalScores[i].score;
				}
			};
			return "not found";
		},

		avgScore: function(outcome) {
			var scoreSum = 0;
			var gameplays = 0;
			for (var i = $scope.report.previousGameplay.length - 1; i >= 0; i--) {
				for (var j = $scope.report.previousGameplay[i].finalScores.length - 1; j >= 0; j--) {
					if ($scope.report.previousGameplay[i].finalScores[j].outcomeName == outcome) {
						scoreSum += $scope.report.previousGameplay[i].finalScores[j].score;
						gameplays += 1;
					};
				};
			};
			for (var j = $scope.report.gameplay.finalScores.length - 1; j >= 0; j--) {
				if ($scope.report.gameplay.finalScores[j].outcomeName == outcome) {
					scoreSum += $scope.report.gameplay.finalScores[j].score;
					gameplays += 1;
				};
			};

			return Math.round(scoreSum / gameplays);
		},

		highestScore: function(outcome) {
			var higherScore = 0;
			for (var i = $scope.report.previousGameplay.length - 1; i >= 0; i--) {
				for (var j = $scope.report.previousGameplay[i].finalScores.length - 1; j >= 0; j--) {
					if ($scope.report.previousGameplay[i].finalScores[j].outcomeName == outcome) {
						if (higherScore < $scope.report.previousGameplay[i].finalScores[j].score) {
							higherScore = $scope.report.previousGameplay[i].finalScores[j].score;
						};
					};
				};
			};
			for (var j = $scope.report.gameplay.finalScores.length - 1; j >= 0; j--) {
				if ($scope.report.gameplay.finalScores[j].outcomeName == outcome) {
					if (higherScore < $scope.report.gameplay.finalScores[j].score) {
						higherScore = $scope.report.gameplay.finalScores[j].score;
					};
				};
			};

			return higherScore;
		},

		lowestScore: function(outcome) {
			var lowestScore = $scope.report.scoreLO(outcome);
			for (var i = $scope.report.previousGameplay.length - 1; i >= 0; i--) {
				for (var j = $scope.report.previousGameplay[i].finalScores.length - 1; j >= 0; j--) {
					if ($scope.report.previousGameplay[i].finalScores[j].outcomeName == outcome) {
						if (lowestScore > $scope.report.previousGameplay[i].finalScores[j].score) {
							lowestScore = $scope.report.previousGameplay[i].finalScores[j].score;
						};
					};
				};
			};
			for (var j = $scope.report.gameplay.finalScores.length - 1; j >= 0; j--) {
				if ($scope.report.gameplay.finalScores[j].outcomeName == outcome) {
					if (lowestScore > $scope.report.gameplay.finalScores[j].score) {
						lowestScore = $scope.report.gameplay.finalScores[j].score;
					};
				};
			};

			return lowestScore;
		},

		setCharts: function(outcome) {

			var dataSet = [];
			for (var i = 0; i < $scope.report.gameplay.actions.length; i++) {
				var point = [];
				point[0] = $scope.report.gameplay.actions[i].timestamp;
				point[1] = $scope.report.gameplay.actions[i].score;
				dataSet[i] =  point;
			};

			var dataSet0 = [];
			for (var i = 0; i < $scope.report.previousGameplay[0].actions.length; i++) {
				var point = [];
				point[0] = $scope.report.previousGameplay[0].actions[i].timestamp;
				point[1] = $scope.report.previousGameplay[0].actions[i].score;
				dataSet0[i] =  point;
			};

			var dataSet1 = [];
			var l = $scope.report.previousGameplay.length-1;
			for (var i = 0; i < $scope.report.previousGameplay[l].actions.length; i++) {
				var point = [];
				point[0] = $scope.report.previousGameplay[l].actions[i].timestamp;
				point[1] = $scope.report.previousGameplay[l].actions[i].score;
				dataSet1[i] =  point;
			};
			
			$('#containerChart').highcharts({
		        title: {
		            text: 'Evolution of your score during the game',
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
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            headerFormat: '<b>{series.name} : {point.y}</b><br/>',
		            pointFormat: 'You choose Lisbon as capital of Spain    . . .',
		            footerFormat: '<br/><b>-1</b>'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: 'Your score',
		            data: dataSet
		        },
		        {
		            name: 'Your first try',
		            data: dataSet0
		        },
		        {
		            name: 'Your last try',
		            data: dataSet1
		        }]
		    });	

			var categoriesList = [];
			var scores = [];

			for (var i = 0; i < $scope.report.overallDataOnTheSG.length; i++) {
				categoriesList[i] = $scope.report.overallDataOnTheSG[i].legend;
				var scoreI = [];
				scoreI[0] = $scope.report.overallDataOnTheSG[i].lowestScore;
				scoreI[1] = $scope.report.overallDataOnTheSG[i].lowerQuartile;
				scoreI[2] = $scope.report.overallDataOnTheSG[i].avgScore;
				scoreI[3] = $scope.report.overallDataOnTheSG[i].upperQuartile;
				scoreI[4] = $scope.report.overallDataOnTheSG[i].highestScore;

				scores[i] = scoreI;
			};

			categoriesList[i] = "You";

			$('#containerBoxPlotScore').highcharts({

		        chart: {
		            type: 'boxplot'
		        },

		        title: {
		            text: 'You score compared to others'
		        },

		        subtitle: {
		            text: outcome
		        },

		        legend: {
		            enabled: false
		        },

		        xAxis: {
		            categories: categoriesList,
		            title: {
		                text: 'Others'
		            }
		        },

		        yAxis: {
		            title: {
		                text: 'Score'
		            },
		            plotLines: [{
		                value: $scope.report.avgScore(outcome),
		                color: 'orange',
		                width: 2,
		                label: {
		                    text: 'Your average',
		                    align: 'right',
		                    style: {
		                        color: 'gray'
		                    }
		                }
		            },
		            {
		                value: $scope.report.highestScore(outcome),
		                color: 'green',
		                width: 2,
		                label: {
		                    text: 'Your higher score',
		                    align: 'right',
		                    style: {
		                        color: 'gray'
		                    }
		                }
		            },
		            {
		                value: $scope.report.lowestScore(outcome),
		                color: 'red',
		                width: 2,
		                label: {
		                    text: 'Your lowest score',
		                    align: 'right',
		                    style: {
		                        color: 'gray'
		                    }
		                }
		            }]
		        },

		        series: [{
		            name: 'Score',
		            data: scores,
		            tooltip: {
		                headerFormat: '<em>You within {point.key}</em><br/>'
		            }
		        }, {
		            name: 'Your score',
		            color: Highcharts.getOptions().colors[0],
		            type: 'scatter',
		            data: [ // x, y positions where 0 is the first category
		                [categoriesList.length -1, $scope.report.scoreLO(outcome)]
		            ],
		            marker: {
		            	symbol: 'circle',
		                fillColor: 'grey',
		                lineWidth: 1,
		                lineColor: Highcharts.getOptions().colors[0]
		            },
		            tooltip: {
		                pointFormat: '<b>{point.y}</b>'
		            }
		        }]

		    });		
		}
	}
}