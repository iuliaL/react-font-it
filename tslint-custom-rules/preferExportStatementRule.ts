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
		Use export statement instead of export modifier.
		Read https://www.typescriptlang.org/docs/handbook/modules.html#export-statements
		for more information
	`;
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new PreferExportStatementWalker(sourceFile, this.getOptions()));
	}
}

// The walker takes care of all the work.
class PreferExportStatementWalker extends Lint.RuleWalker {
	public visitNode(node: ts.Node): void {
		// create a failure at the current position
		const nodeIsExportedWithExportModifier = node.modifiers !== undefined && node.modifiers.some(
			(modifier: ts.Modifier): boolean => modifier.kind === ts.SyntaxKind.ExportKeyword
		);

		const nodeIsExportedWithExportAssignment = ts.isExportAssignment(node);

		if (nodeIsExportedWithExportModifier || nodeIsExportedWithExportAssignment) {
			this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
		}

		// call the base version of this visitor to actually parse this node
		super.visitNode(node);
	}
}