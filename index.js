var RecordRTC = require('recordrtc')
  , io = require('socket.io-client')
  , EventEmitter = require('events').EventEmitter

// options for record RTC
var recOptions = {
    type: 'video',
    mimeType: 'video/webm',
    video: {
        width: 320,
        height: 240,
    },
    frameInterval: 10,
    disableLogs: true,
}

// continually records chunks of length `duration`
// from a RecordRTC instance that gets passed in.
// calls `cb` on each binary blob of video
// whenever one becomes available.
function startRecordingChunks (stream, duration, cb) {
    var rrtc = RecordRTC(stream, recOptions)
    // start it recording
    rrtc.startRecording()
        .setRecordingDuration(duration)
        // when it stops,
        .onRecordingStopped(videoURL => {
            // call cb on the video blob
            cb(rrtc.getBlob())
            // start recording again
            startRecordingChunks(stream, duration, cb)
        })
}


function setup (webcam_stream, clip_duration, url) {


    var conn = new EventEmitter()

    var socket = io(url)

    // sends a 'video' event
    // with some binary blob
    function send (blob) {
        socket.emit('video', blob)
    }

    // and a fn to start recording
    function start() {
        startRecordingChunks(webcam_stream, clip_duration, send)
    }

    // start recording chunks right away
    start()

    // the returned object has the connection
    // and methods to start and stop sending webcam data over the wire
    return {

        socket: socket,

        //stop: stop, // TODO stop fn

        start: start,
    }

}

module.exports = setup
