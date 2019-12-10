

export const CLICK_MENU = 'CLICK_MENU';
export const LOGOUT_ACTION = 'USER_LOGOUT';

export function clickMenuAction(payload) {
	return { type: CLICK_MENU, payload };
}

export function logoutAction() {
	return { type: LOGOUT_ACTION };
}
