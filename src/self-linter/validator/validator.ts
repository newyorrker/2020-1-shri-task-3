import { warning as processWarningBlock } from './blocks/warning';
import { grid as processGridBlock } from './blocks/grid';
import { text as processTextBlock } from './blocks/text';

export function Validator(): any {
	const store = {
		currentBlock: {},
		textSizeMod: '',
		warnings: [],
		grids: [],
		texts: [],
		currentObj: {},
		warningBlockInfo: {
			button: {
				exist: false,
				obj: {}
			},
			placeholder: {
				obj: {}
			}
		},
		textInfo: {
			exist: {
				h1: false,
				h2: false,
				h3: false
			}
		},
		errors: []
	};

	function validate (prop: any) {
		const key = prop.key.value;
		const value = prop.value.value;

		if (store.warnings.length > 0) {
			processWarningBlock(store, key, value, prop);
		}

		if (store.grids.length > 0) {
			processGridBlock(store, key, value);
		}

		if (store.texts.length > 0) {
			processTextBlock(store, key, value);
		}
	}

	return {
		validate: validate,
		store: store,
		errors: store.errors
	};
}
