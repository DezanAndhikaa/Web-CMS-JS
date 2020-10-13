import { SetTimezoneActionType } from './Timezone.actions';

const initialTimezoneState = { timezone: '00:00', indonesianTimezone: '' };

export default function setTimezoneReducer(state = initialTimezoneState, action) {
  if (action.type === SetTimezoneActionType) {
    if (action.timezone === '+07:00') return { timezone: '+07:00', indonesianTimezone: 'WIB' };
    if (action.timezone === '+08:00') return { timezone: '+08:00', indonesianTimezone: 'WITA' };
    if (action.timezone === '+09:00') return { timezone: '+09:00', indonesianTimezone: 'WIT' };
    return { ...state, indonesianTimezone: '' };
  }
  return state;
}