# chunky webcam 

send .webm recordings from a webcam stream, in chunks of user-specified time, to a socket.io server

## installation

    npm install chunky-webcam

## usage


```javascript
var chunky = require('../index.js')
  , getUserMedia = require('get-user-media')

// get user webcam
getUserMedia({ video: true, audio: false}, (err, stream) => {

    // setup chunky-webcam, with our stream
    // it will record 1000ms chunks,
    // and send them with a 'video' event to 'localhost:9999'
    // where our server runs
    chunk = chunky(stream, 1000, 'localhost:9999')

    console.log('chunky-webcam', chunk)

    // let's say our server will send 'data' events
    chunk.socket.on('data', data => {
        // we will add them to our msg element
        console.log('heard from server!', data)
    })
})
```
*see `examples/` for a robust client/server example.*

## api

### var chunk = chunky(webcam_stream, chunk_duration_ms, uri)

start sending .webm files of length `chunk_duration_ms` to a socket.io server `uri`

takes a [webcam media stream](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API).

the client will emit `'video'` events over the socket.io connection, each containing binary blobs of the video

### chunk.socket

the underlying socket.io connection.

use this to, for example, subscribe to events coming from your socket.io server.
or to emit other kinds of events to this server.

## license

BSD
