"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ts = require("typescript");
var Lint = require("tslint");
// tslint:disable:no-class
// tslint:disable:no-this
// tslint:disable:readonly-array
// tslint:disable:no-expression-statement
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferSwitchBlockedCases(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "\n\t\tWrap the switch cases in curly braces, to separate them block-wisely from the rest of the code\n\t";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var PreferSwitchBlockedCases = /** @class */ (function (_super) {
    __extends(PreferSwitchBlockedCases, _super);
    function PreferSwitchBlockedCases() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferSwitchBlockedCases.prototype.visitCaseClause = function (node) {
        var isBlocked = node.statements.length === 0
            || node.statements.length === 1 && ts.isBlock(node.statements[0]);
        if (!isBlocked) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitCaseClause.call(this, node);
    };
    return PreferSwitchBlockedCases;
}(Lint.RuleWalker));
