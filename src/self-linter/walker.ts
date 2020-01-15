export function getCurrentBlockRootObj (array: any) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].key.value === 'elem') {
			return '';
		}
	}

	for (let i = 0; i < array.length; i++) {
		if (array[i].key.value === 'block') {
			return array[i].value.value;
		}
	}

	return '';
}

function setScopeStart (item: any, currentBlockRootObj: any, validator: any): any {
	validator.store.currentObj = item;

	if (!currentBlockRootObj) return;

	switch (currentBlockRootObj) {
	case 'warning':

		validator.store.warnings.push({
			rootProp: item,
			textInvalid: false
		});
		break;

	case 'grid':
		validator.store.grids.push({
			columns: 0,
			elements: [],
			rootProp: item
		});
		break;

	case 'text':
		validator.store.texts.push({
			rootProp: item
		});
		break;
	}
}

function setScopeEnd (currentBlockRootObj: any, validator: any): any {
	switch (currentBlockRootObj) {
	case 'warning':
		validator.store.warnings.pop();
		break;

	case 'grid':
		validator.store.grids.pop();
		break;

	case 'text':
		validator.store.texts.pop();
		break;
	}
}

export function walk (item: any, validator: any): any {
	switch (item.type) {
	case 'Object':

		setScopeStart(item, getCurrentBlockRootObj(item.children), validator);

		item.children.forEach((element: any) => {
			validator.validate(element);
			walk(element.value, validator);
		});

		setScopeEnd(getCurrentBlockRootObj(item.children), validator);
		break;

	case 'Array':
		item.children.forEach((element: any) => {
			walk(element, validator);
		});
		break;
	}
};
