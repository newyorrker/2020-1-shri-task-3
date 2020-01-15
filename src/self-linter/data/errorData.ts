export const errorData: any = {
	warning: {
		buttonSize: {
			code: 'WARNING__INVALID_BUTTON_SIZE',
			error: 'Некорректный размер блока button'
		},
		buttonPosition: {
			code: 'WARNING__INVALID_BUTTON_POSITION',
			error: 'Некорректное расположение блока button'
		},
		placeholderSize: {
			code: 'WARNING__INVALID_PLACEHOLDER_SIZE',
			error: 'Некорректный размер блока placeholder'
		},
		textSizeEqual: {
			code: 'WARNING__TEXT_SIZES_SHOULD_BE_EQUAL',
			error: 'Размер текста в блоке warning должен быть одинаковым'
		}
	},
	text: {
		severalH1: {
			code: 'TEXT__SEVERAL_H1',
			error: 'Заголовок H1 должен быть на странице в единственном экземпляре'
		},
		positionH2: {
			code: 'TEXT__INVALID_H2_POSITION',
			error: 'Некорректное расположение заголовка H2'
		},
		positionH3: {
			code: 'TEXT__INVALID_H3_POSITION',
			error: 'Некорректное расположение заголовка H3'
		}
	},
	grid: {
		toMuchMarketing: {
			code: 'GRID__TOO_MUCH_MARKETING_BLOCKS',
			error: 'Маркетинговые блоки занимают больше половины от всех колонок блока grid'
		}
	}
}
