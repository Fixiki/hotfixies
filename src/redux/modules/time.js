export const UPDATE_TIME = 'UPDATE_TIME'

const initialState = {
  serverTime: Date.now(),
};

export default function time(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_TIME:
      return {
        ...state,
        serverTime: action.data
      };
    default:
      return state;
  }
}

export function updateTime(time) {
  return {
    type: UPDATE_TIME,
    data: time,
  }
}

