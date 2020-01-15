import { parseJson } from './utils/jsonParser';

import { analyser } from './analyser';

export function lint(json: any): any {
	const tree = parseJson(json);

	const errors = analyser(tree);

	// console.log(errors, 'at errors');

	return errors;
}
