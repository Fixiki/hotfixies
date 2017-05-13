export let connection;

export default (socket) => {
  connection = socket;
  socket.emit('connected');
  const timeInterval = setInterval(()=> {
    socket.emit('time',Date.now());
  },1000);

  socket.on('disconnect',()=> {
    clearInterval(timeInterval);
  })
}