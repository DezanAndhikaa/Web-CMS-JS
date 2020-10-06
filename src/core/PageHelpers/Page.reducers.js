import { SetPageDisplayModeActionType } from './Page.actions';

let initialPageDisplayMode = 'web';
if (window.innerWidth < 600) initialPageDisplayMode = 'mobile';
if (window.innerWidth < 1026) initialPageDisplayMode = 'tab';

export default function setPageDisplayModeReducer(state = initialPageDisplayMode, action) {
	if (action.type === SetPageDisplayModeActionType) {
		return action.mode;
	}
	return state;
}