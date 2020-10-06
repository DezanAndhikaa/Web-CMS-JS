export const ToggleMenuActionType = 'TOGGLE_MENU';

export function toggleMenuAction(isOpen) {
	return {
		type: ToggleMenuActionType,
		isOpen,
	};
}
