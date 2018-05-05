import * as ts from "typescript";
import * as Lint from "tslint";

export {
	Rule
};

// tslint:disable:no-class
// tslint:disable:no-this
// tslint:disable:readonly-array
// tslint:disable:no-expression-statement
class Rule extends Lint.Rules.AbstractRule {
	public static readonly FAILURE_STRING: string = `
		Use function declaration instead of arrow functions for named functions.
		Use arrow functions only on anonymous functions.
	`;
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(
			new PreferFunctionDeclarationForNamedFunctions(sourceFile, this.getOptions())
		);
	}
}

// The walker takes care of all the work.
class PreferFunctionDeclarationForNamedFunctions extends Lint.RuleWalker {
	public visitArrowFunction(node: ts.ArrowFunction): void {
		if (node.parent !== undefined) {
			const isNamedArrowFunction = ts.isVariableDeclaration(node.parent);
			if (isNamedArrowFunction) {
				this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
			}
		}
		super.visitArrowFunction(node);
	}
}