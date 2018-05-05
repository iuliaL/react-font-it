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
        return this.applyWithWalker(new PreferFunctionDeclarationForNamedFunctions(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "\n\t\tUse function declaration instead of arrow functions for named functions.\n\t\tUse arrow functions only on anonymous functions.\n\t";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var PreferFunctionDeclarationForNamedFunctions = /** @class */ (function (_super) {
    __extends(PreferFunctionDeclarationForNamedFunctions, _super);
    function PreferFunctionDeclarationForNamedFunctions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferFunctionDeclarationForNamedFunctions.prototype.visitArrowFunction = function (node) {
        if (node.parent !== undefined) {
            var isNamedArrowFunction = ts.isVariableDeclaration(node.parent);
            if (isNamedArrowFunction) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    return PreferFunctionDeclarationForNamedFunctions;
}(Lint.RuleWalker));
