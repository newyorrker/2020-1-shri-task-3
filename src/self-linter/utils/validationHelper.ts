export function writeError (prop: any, errorData: any, errors: any): any {
	const errorModel = {
		code: errorData.code,
		key: errorData.error,
		loc: {
			start: { column: prop.loc.start.column, line: prop.loc.start.line, offset: prop.loc.start.offset },
			end: { column: prop.loc.end.column, line: prop.loc.end.line, offset: prop.loc.end.offset }
		}
	};
	// console.error(errorData.code);
	errors.push(errorModel);
}
