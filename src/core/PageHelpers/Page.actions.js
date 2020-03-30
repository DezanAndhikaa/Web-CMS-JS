

export const SetPageDisplayModeActionType = 'SET_PAGE_DISPLAY_MODE';

export function setPageDisplayModeAction(mode) {
  return {
    type: SetPageDisplayModeActionType,
    mode,
  };
}
