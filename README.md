# chunky webcam 

send .webm recordings from a webcam stream, in chunks of user-specified time, to a socket.io server

## installation

    npm install chunky-webcam

## usage

```javascript
var chunky = require('chunky-webcam')

// TODO fill in with code from example
// show data
```

see examples/ for an example client and server

## api

### var chunk = chunky(webcam_stream, chunk_duration_ms, uri)

start sending .webm files of length `chunk_duration_ms` to a socket.io server `uri`

takes a [webcam media stream](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API).

the client will emit `'video'` events over the socket.io connection, each containing binary blobs of the video

### chunk.start()

start recording.

note that recording starts when you call the chunky() method.

### chunk.stop()

stop recording.

note that recording startsk

### chunk.socket

the underlying websocket connection.

use this to, for example, subscribe to events coming from your socket.io server.
or to emit other kinds of events to this server.

## license

BSD