import { ToggleMenuActionType } from './NavbarComponent.actions';

const initialMenuIsOpen = false;

export default function toggleMenuReducer(state = initialMenuIsOpen, action) {
	if (action.type === ToggleMenuActionType) {
		return action.isOpen;
	}
	return state;
}
