export const SET_PROCESSING_MESSAGE = 'SET_PROCESSING_MESSAGE';
export const RESET_PROCESSING_MESSAGE = 'RESET_PROCESSING_MESSAGE';

const initialState = {
  display: false,
  message: '',
  level: '',
  status: '',
};

export default function time(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PROCESSING_MESSAGE:
      let {
        display = false,
        message = '',
        level = '',
        status = '',
      } = action.data;
      return {
        ...state,
        display,
        message,
        level,
        status,
      };
    case RESET_PROCESSING_MESSAGE:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export function setMessage(data) {
  return {
    type: SET_PROCESSING_MESSAGE,
    data,
  }
}

export function sendFile() {
  console.log('sending file');
  console.log(fetch);
  return {
    type: SET_PROCESSING_MESSAGE,
    data: {
      display: true,
      message: 'Loading files',
      level: 'info',
      status: 'pending',
    },
  }
}

