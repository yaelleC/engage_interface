define("ace/mode/engage_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
var _ = {require: require, exports: exports, module: module};
exports = undefined; module = undefined;
function define(name, deps, m) {
    if (typeof name == "function") {
        m = name; deps = ["require", "exports", "module"]; name = _.module.id
    }
    if (typeof name == "object") {
        m = deps; deps = name; name = _.module.id
    }
    if (typeof deps == "function") {
        m = deps; deps = [];
    }
   var ret = m.apply(_.module, deps.map(function(n){return _[n] || require(n)}))
   if (ret) _.module.exports = ret;
}
define.amd = true;define("ace/mode/engage_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var EngageHighlightRules = function() {

    var keywords = (
        "Serious-game|Player|Learning-outcomes|Feedback-messages|Evidence-model|Feedback-model|Badge-model|Action-sequence|Timer-actions|When|End"
    );

    var builtinParams = (
        "SGname|SGdeveloper|SGdesc|SGageRange|SGlanguage|SGcountry|SGgenre|SGsubject|SGpublic|inactivity"
    );

    var builtinConstants = (
        "true|false"
    );

    var builtinTypes = (
        "Int|Float|String|Bool|Char|Text|Enum|any|others|else|immediate|numberGameplays|numberWin|totalTime|averageTime|sumScore|averageScore|maxScore|minScore"
    );

    var builtinTypesLOandFeedback = (
        "knowledge|skill|competence|positive|negative|neutral|badge|hint|final|win|lose"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinParams,
        "keyword": keywords,
        "constant.language": builtinConstants,
        "variable.parameter": builtinTypesLOandFeedback,
        "entity.other": builtinTypes
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",
            start : "/\\*",
            end : "\\*/"
        }, {
            token : "string",           // " string
            regex : '".*?"'
        }, {
            token : "string",           // ' string
            regex : "'.*?'"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_\\-$][a-zA-Z0-9_\\-$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
    this.normalizeRules();
};

oop.inherits(EngageHighlightRules, TextHighlightRules);

exports.EngageHighlightRules = EngageHighlightRules;
});});

define("ace/mode/engage",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/engage_highlight_rules","ace/range","ace/worker/worker_client"], function(require, exports, module) {
var _ = {require: require, exports: exports, module: module};
exports = undefined; module = undefined;
function define(name, deps, m) {
    if (typeof name == "function") {
        m = name; deps = ["require", "exports", "module"]; name = _.module.id
    }
    if (typeof name == "object") {
        m = deps; deps = name; name = _.module.id
    }
    if (typeof deps == "function") {
        m = deps; deps = [];
    }
   var ret = m.apply(_.module, deps.map(function(n){return _[n] || require(n)}))
   if (ret) _.module.exports = ret;
}
define.amd = true;define("ace/mode/engage",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sql_highlight_rules","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var EngageHighlightRules = require("./engage_highlight_rules").EngageHighlightRules;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = EngageHighlightRules;
};
oop.inherits(Mode, TextMode);
var WorkerClient = require("ace/worker/worker_client").WorkerClient;
(function() {

    this.lineCommentStart = "--";

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/engage_worker", "WorkerModule");
        worker.attachToDocument(session.getDocument());
        worker.on("errors", function(e) {
            session.setAnnotations(e.data);
        });
        return worker;
    };
    this.$id = "ace/mode/engage";
}).call(Mode.prototype);

exports.Mode = Mode;

});
});
