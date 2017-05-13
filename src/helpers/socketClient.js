import io from 'socket.io-client';

import { updateTime } from '../redux/modules/time';

export default (store) => {
  const { dispatch, getState } = store;
  const socket = io('', { path: '/ws' });
  console.log('store', store);
  socket.on('time', (data) => {
    dispatch(updateTime(data));
  });

  return socket;
}