import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Maybe } from 'tsmonad';

export {
	ReactFontIt,
	Config
};

interface Config {
	readonly google?: ReadonlyArray<string>;
	readonly file?: ReadonlyArray<string>;
}

function ReactFontIt<TOriginalProps extends {}>(
	// tslint:disable-next-line:no-any
	WrappedComponent: React.SFC<TOriginalProps>,
	config: Config
): React.SFC<TOriginalProps> {
	return function FontIt(props: TOriginalProps): JSX.Element {
		if (!config.google && !config.file) {
			throw Error('no fonts configured for react-font-face');
		} else {
			const google = config.google
				? Maybe.just<ReadonlyArray<string>>(config.google)
				: Maybe.nothing<ReadonlyArray<string>>();

			// BUILD THE IMPORT FOR GOOFLE FONTS
			const googleImport = google.caseOf({
				just: (googleValue: ReadonlyArray<string>): string => {
					const fonts = googleValue.reduce(
						(acc: string, item: string) => `${acc}${item.replace(/ /g, "+")}|`,
						"");
					const cleanFonts = fonts.slice(0, -1);
					return `@import url('https://fonts.googleapis.com/css?family=${cleanFonts}');`;
				},
				nothing: (): string => ''
			});

			// BUILD THE DECLARATION FOR LOCAL FILES
			const file = config.file
				? Maybe.just<ReadonlyArray<string>>(config.file)
				: Maybe.nothing<ReadonlyArray<string>>();

			const fontList = file.caseOf({
				just: (fileValue: ReadonlyArray<string>): string => {
					// tslint:disable-next-line:no-any
					const fontListArray = fileValue.map((item: any) => {
						return (
							`@font-face {
								font-family: '${item.fontFamily}';
								font-style: '${item.fontStyle}';
								font-weight: '${item.fontWeight}';
								src: local(${item.fileLocal}), url(${item.file}) format('${item.fontType}');
								unicode-range: '${item.unicodeRange}';
							  }`
						);
					});
					return fontListArray.join("");
				},
				nothing: (): string => ''
			});

			const importRule = `${googleImport}${fontList}`;
			return (
				<div>
					<Helmet>
						<style type='text/css'>{importRule}</style>
					</Helmet>
					<WrappedComponent {...props} />
				</div>
			);
		}
	};
}