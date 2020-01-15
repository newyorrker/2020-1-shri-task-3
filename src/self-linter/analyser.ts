import { Validator } from './validator/validator';

import { walk } from './walker';

export function analyser (tree: any): any {
	const validator = Validator();

	walk(tree, validator);

	return validator.errors;
}
