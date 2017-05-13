export default (socket) => {
  socket.emit('connected');
  const timeInterval = setInterval(()=> {
    socket.emit('time',Date.now());
  },1000);


  socket.on('disconnect',()=> {
    clearInterval(timeInterval);
  })

};