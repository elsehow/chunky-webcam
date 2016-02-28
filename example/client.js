var chunky = require('../index.js')
  , getUserMedia = require('get-user-media')
  , attachMediaStream = require('attachmediastream')
  // element in which we show video
  , video_el = document.getElementById('my-video')
  // element in which we show server messages
  , msg_el = document.getElementById('server-messages')

// get user webcam
getUserMedia({ video: true, audio: false}, (err, stream) => {

    // if the browser doesn't support user media 
    // or the user says "no" the error gets passed 
    // as the first argument. 
    if (err)
        console.log('failed getting your webcam!', err);

    else
        console.log('got stream!', stream)

    // put the webcam stream in a video element
    attachMediaStream(stream,video_el, {
        muted: true,
        mirror: true,
    })

    // setup chunky-webcam, with our stream
    // it will record 1000ms chunks,
    // and send them with a 'video' event to 'localhost:9999'
    // where our server runs
    chunk = chunky(stream, 1000, 'localhost:9999')

    console.log('chunky-webcam', chunk)

    // our server will send 'data' events
    chunk.socket.on('data', data => {
        // we will add them to our msg element
        var d = document.createTextNode(JSON.stringify(data) + '\n')
        msg_el.appendChild(d)
        
    })
})
