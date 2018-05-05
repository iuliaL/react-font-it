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
        return this.applyWithWalker(new PreferExportStatementWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "\n\t\tUse export statement instead of export modifier.\n\t\tRead https://www.typescriptlang.org/docs/handbook/modules.html#export-statements\n\t\tfor more information\n\t";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var PreferExportStatementWalker = /** @class */ (function (_super) {
    __extends(PreferExportStatementWalker, _super);
    function PreferExportStatementWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferExportStatementWalker.prototype.visitNode = function (node) {
        // create a failure at the current position
        var nodeIsExportedWithExportModifier = node.modifiers !== undefined && node.modifiers.some(function (modifier) { return modifier.kind === ts.SyntaxKind.ExportKeyword; });
        var nodeIsExportedWithExportAssignment = ts.isExportAssignment(node);
        if (nodeIsExportedWithExportModifier || nodeIsExportedWithExportAssignment) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitNode.call(this, node);
    };
    return PreferExportStatementWalker;
}(Lint.RuleWalker));
