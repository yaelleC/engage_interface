function gameController($scope, $http) {

	// $http.get("http://www.w3schools.com/website/Customers_JSON.php")
    //.success(function(response) {$scope.names = response;});
	$scope.game = {
		SGname: "SoundRight!",
		id: 1,
		version: 0,
	
		players: [
			{ id:7, idStudent: 1, language: "FR", country: "France", level: "C2" },
			{ id:5, idStudent: 2, language: "EN", country: "UK", level: "A2" },
			{ id:2, idStudent: 3, language: "IT", country: "Italy", level: "B1" },
			{ id:4, idStudent: 4, language: "EN", country: "USA", level: "B1" },
			{ id:3, idStudent: 5, language: "FR", country: "Canada", level: "B2" },
			{ id:6, idStudent: 6, language: "EN", country: "UK", level: "A2" },
			{ id:1, idStudent: 7, language: "IT", country: "Italy", level: "A1" }
		],

		gameplays: [
			{player:1},
			{player:2},
			{player:1},
			{player:3},
			{player:5},
			{player:4},
			{player:1},
			{player:1},
			{player:6},
			{player:1},
			{player:1},
			{player:1},
			{player:5},
			{player:5},
			{player:1},
			{player:1},
			{player:1},
			{player:2},
			{player:1},
			{player:3},
			{player:1},
			{player:4},
			{player:1},
			{player:1},
			{player:7},
			{player:7},
			{player:7},
			{player:3},
			{player:3},
			{player:5},
		],

		display: "",
		
		setCharts: function() {
			var view = $('#view').val()
			if ( view != $scope.game.display)
			{
				$scope.game.display = view

				if (view == "gameplay")
				{
					var dataset = []
					for (var i = $scope.game.gameplays.length - 1; i >= 0; i--) {
						var idP = $scope.game.gameplays[i].player
						
						for (var j = $scope.game.players.length - 1; j >= 0; j--) {
							if ($scope.game.players[j].id == idP)
							{								
								dataset[dataset.length] = $scope.game.players[j]
							}
						};
					};
				}


				if (view == "player")
				{
					var dataset = $scope.game.players
				}

				var data1 = []
				for (var i = dataset.length - 1; i >= 0; i--) {
					var lang = dataset[i].language;
					var nb = 0;
						
					var langInData = false;

					for (var j = data1.length - 1; j >= 0; j--) {
						if (data1[j][0] == lang)
						{
							langInData = true
						}
					};

					if (!langInData)
					{
						for (var j = dataset.length - 1; j >= 0; j--) {
							if (dataset[j].language == lang)
							{
								var nb = nb + 1
							}
						};
						data1[data1.length] = [lang, nb];
					};					
				};

				var data2 = []
				for (var i = dataset.length - 1; i >= 0; i--) {
					var country = dataset[i].country;
					var nb = 0;
						
					var countryInData = false;

					for (var j = data2.length - 1; j >= 0; j--) {
						if (data2[j][0] == country)
						{
							countryInData = true
						}
					};

					if (!countryInData)
					{
						for (var j = dataset.length - 1; j >= 0; j--) {
							if (dataset[j].country == country)
							{
								var nb = nb + 1
							}
						};
						data2[data2.length] = [country, nb];
					};					
				};

				var data3 = []
				for (var i = dataset.length - 1; i >= 0; i--) {
					var level = dataset[i].level;
					var nb = 0;
						
					var levelInData = false;

					for (var j = data3.length - 1; j >= 0; j--) {
						if (data3[j][0] == level)
						{
							levelInData = true
						}
					};

					if (!levelInData)
					{
						for (var j = dataset.length - 1; j >= 0; j--) {
							if (dataset[j].level == level)
							{
								var nb = nb + 1
							}
						};
						data3[data3.length] = [level, nb];
					};					
				};
				

			    $('#container1').highcharts({
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: 1,//null,
			            plotShadow: false
			        },
			        title: {
			            text: 'By language'
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
			        series: [{
			            type: 'pie',
			            name: 'Language share',
			            data: data1
			        }]
			    });

				$('#container2').highcharts({
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: 1,//null,
			            plotShadow: false
			        },
			        title: {
			            text: 'By country'
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
			        series: [{
			            type: 'pie',
			            name: 'Country share',
			            data: data2
			        }]
			    });

				$('#container3').highcharts({
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: 1,//null,
			            plotShadow: false
			        },
			        title: {
			            text: 'By level'
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
			        series: [{
			            type: 'pie',
			            name: 'Language share',
			            data: data3
			        }]
			    });
			}
		}
	}
}