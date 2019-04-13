var express = require('express');
var app = express();
var io = require('socket.io')();

const port = process.env.PORT || 3000;

//tel express where our static files are -> js, images, css
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
io.attach(server);

// socket.io chat app 

io.on('connection', function (socket) {
  console.log('a user has connected');
  socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });
  // listen to an incoming message from nayone connected to the app
  socket.on('chat message', function (msg) {
    console.log('message: ', msg, 'socket: ', socket.id);

    //send the message to everyone connected to the app
    io.emit('chat message', { id: `${socket.id}`, message: msg });
  })
  socket.set('nickname', 'Guest');

  socket.on('disconnect', function () {
    console.log('a user has disconnected');
  })
})