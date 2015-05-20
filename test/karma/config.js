var config = {
    "feedback": {
        "novice_time": {
            "message": "You played more than 10 minutes",
            "type": "badge"
        },
        "endLose": {
            "message": "Too bad! Try again.",
            "final": "lose"
        },
        "wrongEU": {
            "message": "Sorry! [country] is not part of the EU!",
            "type": "negative"
        },
        "correctEU": {
            "message": "[country] is part of the EU!",
            "type": "positive"
        },
        "effort": {
            "message": "You played 5+ times",
            "type": "badge"
        },
        "silver_medal": {
            "message": "You found 100 EU countries",
            "type": "badge"
        },
        "bronze_medal": {
            "message": "You found 50 EU countries",
            "type": "badge"
        },
        "endWin": {
            "message": "Coungratulations! you're a champion",
            "final": "win"
        },
        "master_time": {
            "message": "You played more than 30 minutes",
            "type": "badge"
        },
        "speedGame": {
            "message": "You're too good, let's make things more challenging",
            "type": "adaptation"
        },
        "gold_medal": {
            "message": "Well found 200 EU countries",
            "type": "badge"
        },
        "performance": {
            "message": "You won 10+ times",
            "type": "badge"
        },
        "slowGame": {
            "message": "Hey, let's slow things down a bit",
            "type": "adaptation"
        },
        "expert_time": {
            "message": "You played more than 60 minutes",
            "type": "badge"
        }
    },
    "learningOutcomes": {
        "eu_countries": {
            "desc": "the number of unique EU countries found",
            "feedbackTriggered": [
                {
                    "sign": ">",
                    "limit": 24,
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "endWin"
                        }
                    ]
                },
                {
                    "sign": ">",
                    "limit": 10,
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "speedGame"
                        }
                    ]
                }
            ],
            "value": 0
        },
        "lives": {
            "desc": "the number of lives left to the player",
            "feedbackTriggered": [
                {
                    "sign": "<",
                    "limit": 1,
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "endLose"
                        }
                    ]
                },
                {
                    "sign": "<",
                    "limit": 2,
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "slowGame"
                        }
                    ]
                }
            ],
            "value": 3
        },
        "eu_score": {
            "desc": "the number of EU countries found by the player",
            "feedbackTriggered": [],
            "value": 0
        }
    },
    "inactivityFeedback": [],
    "player": [
        {
            "name": "age",
            "question": "How old are you?",
            "type": "Int"
        },
        {
            "name": "gender",
            "question": "Are you a boy or a girl?",
            "type": "Char"
        },
        {
            "name": "country",
            "question": "Where do you live?",
            "type": "String"
        }
    ],
    "evidenceModel": {
        "newCountrySelected": {
            "desc": "When a player selects a country for the first time",
            "reactions": [
                {
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "correctEU"
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
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "wrongEU"
                        }
                    ],
                    "marks": [
                        {
                            "mark": -1,
                            "learningOutcome": "lives"
                        }
                    ]
                }
            ],
            "listParams": {
                "country": [
                    "albania",
                    "andorra",
                    "armenia",
                    "austria",
                    "azerbaijan",
                    "belarus",
                    "belgium",
                    "bosnia_and_herzegovina",
                    "bulgaria",
                    "croatia",
                    "cyprus",
                    "czech_republic",
                    "denmark",
                    "estonia",
                    "finland",
                    "france",
                    "georgia",
                    "germany",
                    "greece",
                    "hungary",
                    "iceland",
                    "ireland",
                    "italy",
                    "kazakhstan",
                    "kosovo",
                    "latvia",
                    "liechtenstein",
                    "lithuania",
                    "luxembourg",
                    "macedonia",
                    "malta",
                    "moldova",
                    "monaco",
                    "montenegro",
                    "netherlands",
                    "norway",
                    "poland",
                    "portugal",
                    "romania",
                    "russia",
                    "san_marino",
                    "serbia",
                    "slovakia",
                    "slovenia",
                    "spain",
                    "sweden",
                    "switzerland",
                    "turkey",
                    "ukraine",
                    "united_kingdom",
                    "vatican_city"
                ]
            },
            "params": {
                "country": "String"
            }
        },
        "countrySelectedAgain": {
            "desc": "When a player selects a country again",
            "reactions": [
                {
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "correctEU"
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
                    "feedback": [
                        {
                            "immediate": true,
                            "name": "wrongEU"
                        }
                    ],
                    "marks": [
                        {
                            "mark": -1,
                            "learningOutcome": "lives"
                        }
                    ]
                }
            ],
            "listParams": {
                "country": [
                    "albania",
                    "andorra",
                    "armenia",
                    "austria",
                    "azerbaijan",
                    "belarus",
                    "belgium",
                    "bosnia_and_herzegovina",
                    "bulgaria",
                    "croatia",
                    "cyprus",
                    "czech_republic",
                    "denmark",
                    "estonia",
                    "finland",
                    "france",
                    "georgia",
                    "germany",
                    "greece",
                    "hungary",
                    "iceland",
                    "ireland",
                    "italy",
                    "kazakhstan",
                    "kosovo",
                    "latvia",
                    "liechtenstein",
                    "lithuania",
                    "luxembourg",
                    "macedonia",
                    "malta",
                    "moldova",
                    "monaco",
                    "montenegro",
                    "netherlands",
                    "norway",
                    "poland",
                    "portugal",
                    "romania",
                    "russia",
                    "san_marino",
                    "serbia",
                    "slovakia",
                    "slovenia",
                    "spain",
                    "sweden",
                    "switzerland",
                    "turkey",
                    "ukraine",
                    "united_kingdom",
                    "vatican_city"
                ]
            },
            "params": {
                "country": "String"
            }
        }
    },
    "badgeModel": [
        {
            "sign": ">",
            "limit": 4,
            "feedback": [
                "effort"
            ],
            "function": "numberGameplays"
        },
        {
            "sign": ">",
            "limit": 10,
            "feedback": [
                "performance"
            ],
            "function": "numberGameplays"
        },
        {
            "sign": ">",
            "limit": 60,
            "feedback": [
                "expert_time"
            ],
            "function": "totalTime"
        },
        {
            "sign": ">",
            "limit": 30,
            "feedback": [
                "master_time"
            ],
            "function": "totalTime"
        },
        {
            "sign": ">",
            "limit": 10,
            "feedback": [
                "novice_time"
            ],
            "function": "totalTime"
        },
        {
            "sign": ">",
            "limit": 199,
            "feedback": [
                "gold_medal"
            ],
            "outcome": "eu_score",
            "function": "sumScore"
        },
        {
            "sign": ">",
            "limit": 99,
            "feedback": [
                "silver_medal"
            ],
            "outcome": "eu_score",
            "function": "sumScore"
        },
        {
            "sign": ">",
            "limit": 49,
            "feedback": [
                "bronze_medal"
            ],
            "outcome": "eu_score",
            "function": "sumScore"
        }
    ],
    "seriousGame": {
        "genre": "endless runner",
        "idDeveloper": 2,
        "ageMin": 10,
        "description": "This is a mini serious game that teaches you to identify countries part of the European Union. Click the screen to make the mouse fly and collect ALL the EU countries.",
        "subject": "Europe, Capitals, Geography",
        "name": "EU Mouse",
        "ageMax": 99,
        "public": "false",
        "lang": "EN",
        "country": "UK"
    }
};