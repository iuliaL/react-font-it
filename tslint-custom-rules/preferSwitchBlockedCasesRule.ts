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
		Wrap the switch cases in curly braces, to separate them block-wisely from the rest of the code
	`;
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(
			new PreferSwitchBlockedCases(sourceFile, this.getOptions())
		);
	}
}

// The walker takes care of all the work.
class PreferSwitchBlockedCases extends Lint.RuleWalker {
	public visitCaseClause(node: ts.CaseClause): void {
		const isBlocked =
			node.statements.length === 0
			||  node.statements.length === 1 && ts.isBlock(node.statements[0]);
		if (!isBlocked) {
			this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
		}
		super.visitCaseClause(node);
	}
}