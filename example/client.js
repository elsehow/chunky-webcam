var chunky = require('../index.js')
  , getUserMedia = require('getusermedia')
  , attachMediaStream = require('attachmediastream')
  // element in which we show video
  , video_el = document.getElementById('my-video')
  // element in which we show server messages
  , msg_el = document.getElementById('server-messages')

// get user media 
getUserMedia((err, stream) => {
    // if the browser doesn't support user media 
    // or the user says "no" the error gets passed 
    // as the first argument. 
    if (err)
        console.log('failed getting your webcam!', err);

    else
        console.log('got stream!', stream)

    // put the webcam stream in a video element
    attachMediaStream(stream,video_el, {
        muted: true
    })

    // setup chunky-webcam, with 1000ms duration
    // on 'localhost:9999', where our server runs
    chunk = chunky(stream, 1000, 'localhost:9999')

    console.log(chunk)

    // our server will send 'data' events
    // TODO we will add them to our msg element
    chunk.socket.on('data', data => console.log(data))

})
