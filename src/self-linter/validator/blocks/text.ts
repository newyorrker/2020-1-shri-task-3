import { writeError } from '../../utils/validationHelper';
import { errorData } from '../../data/errorData';

export function text(store: any, key: any, value: any): any {
	const currentTextBlock = store.texts[store.texts.length - 1];
	const errors = store.errors;

	if (key === 'type') {
		switch (value) {
		case 'h1':

			if (store.textInfo.exist.h1) {
				writeError(currentTextBlock.rootProp, errorData.text.severalH1, errors);
			}

			if (store.textInfo.exist.h2) {
				writeError(currentTextBlock.rootProp, errorData.text.positionH2, errors);
			}

			store.textInfo.exist.h1 = true;
			store.textInfo.exist.h2 = false;

			break;
		case 'h2':

			store.textInfo.exist.h2 = true;

			if (store.textInfo.exist.h3) {
				writeError(currentTextBlock.rootProp, errorData.text.positionH3, errors);
			}

			store.textInfo.exist.h3 = false;

			break;
		case 'h3':
			store.textInfo.exist.h3 = true;
			break;
		}
	}
}
