var app      = require('http').createServer()
  , io       = require('socket.io')(app)

app.listen(9999);
console.log('socket.io server listening on 9999')

io.on('connection', (socket) => {
    console.log('got a socket.io client connection!')
    // when we get a 'video' event, it contains a binary blob `blob`
    socket.on('video', blob => {
        console.log('i see a video blob!!')
        // emit a response 'data' to the client
        socket.emit('data', 'got your video blob!!!')
    })
})

var http = require('http');
var ecstatic = require('ecstatic');

http.createServer(
    ecstatic({ root: __dirname  })
).listen(8000);

console.log('point your browser to http://localhost:8000');
