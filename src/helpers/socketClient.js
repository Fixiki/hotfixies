import io from 'socket.io-client';

import { updateTime } from '../redux/modules/time';
import { setMessage } from '../redux/modules/processing';

export default (store) => {
  const { dispatch, getState } = store;
  const socket = io('', { path: '/ws' });
  socket.on('time', (data) => {
    dispatch(updateTime(data));
  });

  socket.on('processing',(data)=> {
    dispatch(setMessage(data));
    console.log('processing message recieved');
  });

  return socket;
}