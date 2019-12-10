

export const SetTimezoneActionType = 'SET_TIMEZONE';

export default function setTimezoneAction(timezone) {
  return {
    type: SetTimezoneActionType,
    timezone,
  };
}
