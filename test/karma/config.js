var config = {
    "feedback": {
        "master_time": {
            "message": "You played more than 30 minutes",
            "type": "badge"
        },
        "end_win": {
            "message": "Well done, you won the game :)",
            "final": "win"
        },
        "novice_time": {
            "message": "You played more than 10 minutes",
            "type": "badge"
        },
        "gold_medal": {
            "message": "You found 200 EU countries",
            "type": "badge"
        },
        "performance": {
            "message": "You won 10+ times",
            "type": "badge"
        },
        "end_lose": {
            "message": "Sorry, you lost the game :(",
            "final": "lose"
        },
        "correct_country": {
            "message": "Well done, [country] is indeed part of the EU",
            "type": "positive"
        },
        "effort": {
            "message": "You played 10+ times",
            "type": "badge"
        },
        "silver_medal": {
            "message": "You found 100 EU countries",
            "type": "badge"
        },
        "expert_time": {
            "message": "You played more than 60 minutes",
            "type": "badge"
        },
        "wrong_country": {
            "message": "Nope, [country] is not part of the EU",
            "type": "negative"
        },
        "bronze_medal": {
            "message": "You found 50 EU countries",
            "type": "badge"
        }
    },
    "learningOutcomes": {
        "eu_countries": {
            "desc": "distinct countries of the EU left to find",
            "feedbackTriggered": [
                {
                    "limit": 1,
                    "sign": "<",
                    "feedback": [
                        {
                            "immediate": false,
                            "name": "end_win"
                        }
                    ]
                }
            ],
            "value": 28
        },
        "lives": {
            "desc": "number of lives the player has",
            "feedbackTriggered": [
                {
                    "limit": 1,
                    "sign": "<",
                    "feedback": [
                        {
                            "immediate": false,
                            "name": "end_lose"
                        }
                    ]
                }
            ],
            "value": 3
        },
        "eu_score": {
            "desc": "overall score, number of correct countries identified",
            "feedbackTriggered": [],
            "value": 0
        }
    },
    "inactivityFeedback": [],
    "player": [
        {
            "name": "age",
            "type": "Int"
        },
        {
            "name": "grade",
            "type": "String"
        },
        {
            "name": "gender",
            "type": "Char"
        }
    ],
    "evidenceModel": {
        "countryReSelected": {
            "desc": "When a player selects a country he/she had already selected",
            "reactions": [
                {
                    "feedback": [
                        {
                            "immediate": false,
                            "name": "correct_country"
                        }
                    ],
                    "values": [
                        {
                            "country": "austria"
                        },
                        {
                            "country": "belgium"
                        },
                        {
                            "country": "bulgaria"
                        },
                        {
                            "country": "croatia"
                        },
                        {
                            "country": "cyprus"
                        },
                        {
                            "country": "czech_republic"
                        },
                        {
                            "country": "denmark"
                        },
                        {
                            "country": "estonia"
                        },
                        {
                            "country": "finland"
                        },
                        {
                            "country": "france"
                        },
                        {
                            "country": "germany"
                        },
                        {
                            "country": "greece"
                        },
                        {
                            "country": "hungary"
                        },
                        {
                            "country": "ireland"
                        },
                        {
                            "country": "italy"
                        },
                        {
                            "country": "latvia"
                        },
                        {
                            "country": "lithuania"
                        },
                        {
                            "country": "luxembourg"
                        },
                        {
                            "country": "malta"
                        },
                        {
                            "country": "netherlands"
                        },
                        {
                            "country": "poland"
                        },
                        {
                            "country": "portugal"
                        },
                        {
                            "country": "romania"
                        },
                        {
                            "country": "slovakia"
                        },
                        {
                            "country": "slovenia"
                        },
                        {
                            "country": "spain"
                        },
                        {
                            "country": "sweden"
                        },
                        {
                            "country": "united_kingdom"
                        }
                    ],
                    "marks": [
                        {
                            "mark": 1,
                            "learningOutcome": "eu_score"
                        }
                    ]
                },
                {
                    "else": "true",
                    "feedback": [],
                    "marks": [
                        {
                            "mark": -1,
                            "learningOutcome": "lives"
                        }
                    ]
                }
            ],
            "params": {
                "country": "String"
            }
        },
        "newCountrySelected": {
            "desc": "When a player selects a country for the first time",
            "reactions": [
                {
                    "feedback": [
                        {
                            "immediate": false,
                            "name": "correct_country"
                        }
                    ],
                    "values": [
                        {
                            "country": "austria"
                        },
                        {
                            "country": "belgium"
                        },
                        {
                            "country": "bulgaria"
                        },
                        {
                            "country": "croatia"
                        },
                        {
                            "country": "cyprus"
                        },
                        {
                            "country": "czech_republic"
                        },
                        {
                            "country": "denmark"
                        },
                        {
                            "country": "estonia"
                        },
                        {
                            "country": "finland"
                        },
                        {
                            "country": "france"
                        },
                        {
                            "country": "germany"
                        },
                        {
                            "country": "greece"
                        },
                        {
                            "country": "hungary"
                        },
                        {
                            "country": "ireland"
                        },
                        {
                            "country": "italy"
                        },
                        {
                            "country": "latvia"
                        },
                        {
                            "country": "lithuania"
                        },
                        {
                            "country": "luxembourg"
                        },
                        {
                            "country": "malta"
                        },
                        {
                            "country": "netherlands"
                        },
                        {
                            "country": "poland"
                        },
                        {
                            "country": "portugal"
                        },
                        {
                            "country": "romania"
                        },
                        {
                            "country": "slovakia"
                        },
                        {
                            "country": "slovenia"
                        },
                        {
                            "country": "spain"
                        },
                        {
                            "country": "sweden"
                        },
                        {
                            "country": "united_kingdom"
                        }
                    ],
                    "marks": [
                        {
                            "mark": -1,
                            "learningOutcome": "eu_countries"
                        },
                        {
                            "mark": 1,
                            "learningOutcome": "eu_score"
                        }
                    ]
                },
                {
                    "else": "true",
                    "feedback": [],
                    "marks": [
                        {
                            "mark": -1,
                            "learningOutcome": "lives"
                        }
                    ]
                }
            ],
            "params": {
                "country": "String"
            }
        }
    },
    "badgeModel": [
        {
            "limit": 4,
            "sign": ">",
            "feedback": [
                "effort"
            ],
            "function": "numberGameplays"
        },
        {
            "limit": 9,
            "sign": ">",
            "feedback": [
                "performance"
            ],
            "function": "numberWin"
        },
        {
            "limit": 60,
            "sign": ">",
            "feedback": [
                "expert_time"
            ],
            "function": "totalTime"
        },
        {
            "limit": 30,
            "sign": ">",
            "feedback": [
                "master_time"
            ],
            "function": "totalTime"
        },
        {
            "limit": 10,
            "sign": ">",
            "feedback": [
                "novice_time"
            ],
            "function": "totalTime"
        },
        {
            "limit": 199,
            "sign": ">",
            "feedback": [
                "gold_medal"
            ],
            "outcome": "eu_score",
            "function": "sumScore"
        },
        {
            "limit": 99,
            "sign": ">",
            "feedback": [
                "silver_medal"
            ],
            "outcome": "eu_score",
            "function": "sumScore"
        },
        {
            "limit": 49,
            "sign": ">",
            "feedback": [
                "bronze_medal"
            ],
            "outcome": "eu_score",
            "function": "sumScore"
        }
    ],
    "seriousGame": {
        "genre": "runner",
        "idDeveloper": 1,
        "ageMin": 10,
        "description": "This is a mini serious game that teaches you to identify countries part of the European Union",
        "subject": "geography",
        "name": "EU mouse",
        "ageMax": 99,
        "public": "true",
        "lang": "EN",
        "country": "UK"
    }
}