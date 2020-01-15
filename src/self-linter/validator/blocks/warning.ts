import { writeError } from '../../utils/validationHelper';
import { validationData } from '../../data/validationData';
import { errorData } from '../../data/errorData';

function setCurrentBlock (store: any, prop: any): any {
	const key = prop.key.value;
	const value = prop.value.value;

	switch (key) {
	case 'block':
		store.currentBlock = {
			name: value,
			prop: prop
		};
		break;

	case 'content':
	case 'elem':
		store.currentBlock.name = '';
		break;
	}
}

export function warning(store: any, key: any, value: any, prop: any): any {
	const currentWarning = store.warnings[store.warnings.length - 1];
	const errors = store.errors;

	setCurrentBlock(store, prop);

	switch (store.currentBlock.name) {
	case 'button':
		if (key === 'block') {
			store.warningBlockInfo.button.exist = true;
			store.warningBlockInfo.button.obj = store.currentObj;
		}

		if (key === 'size') {
			const buttonSizeValue = validationData.sizes[validationData.sizes.indexOf(value) - 1];

			if (store.textSizeMod && store.textSizeMod !== buttonSizeValue) {
				writeError(store.warningBlockInfo.button.obj, errorData.warning.buttonSize, errors);
			}
		}

		break;

	case 'placeholder':
		if (key === 'block') {
			store.warningBlockInfo.placeholder.obj = store.currentObj;

			if (store.warningBlockInfo.button.exist) {
				writeError(store.warningBlockInfo.button.obj, errorData.warning.buttonPosition, errors);
				store.warningBlockInfo.button.exist = false;
			}
		}

		if (key === 'size') {
			if (value !== 's' && value !== 'm' && value !== 'l') {
				writeError(store.warningBlockInfo.placeholder.obj, errorData.warning.placeholderSize, errors);
			}
		}

		break;

	case 'text':
		if (key === 'size' && !currentWarning.textInvalid) {
			store.textSizeMod = !store.textSizeMod ? value : store.textSizeMod;

			if (store.textSizeMod && store.textSizeMod !== value) {
				currentWarning.textInvalid = true;
				writeError(currentWarning.rootProp, errorData.warning.textSizeEqual, errors);
			}
		}

		break;
	}
}
