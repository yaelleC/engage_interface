define("ace/mode/sql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var SqlHighlightRules = function() {

    var keywords = (
        "Serious-game|Player|Learning-outcomes|Feedback-messages|Evidence-model|Feedback-model|Action-sequence|Timer-actions|When|End"
    );

    var builtinParams = (
        "SGname|SGdeveloper|SGdesc|SGageRange|SGlanguage|SGcountry|SGgenre|SGsubject|SGpublic|inactivity"
    );

    var builtinConstants = (
        "true|false"
    );

    var builtinTypes = (
        "Int|Float|String|Bool|Char|Text|Enum|any"
    );

    var builtinTypesLOandFeedback = (
        "knowledge|skill|competence|positive|negative|neutral|badge|hint|final"
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

oop.inherits(SqlHighlightRules, TextHighlightRules);

exports.SqlHighlightRules = SqlHighlightRules;
});

define("ace/mode/sql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sql_highlight_rules","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var SqlHighlightRules = require("./sql_highlight_rules").SqlHighlightRules;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = SqlHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "--";

    this.$id = "ace/mode/sql";
}).call(Mode.prototype);

exports.Mode = Mode;

});
