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
function startRecordingChunks (recordRTC, duration, cb) {
    // start it recording
    recordRTC
        .startRecording()
        .setRecordingDuration(duration)
        // when it stops,
        .onRecordingStopped(videoURL => {
            // post the video data
            var blob = recordRTC.getBlob()
            cb(blob)
            // start recording again
            recordASec(err, stream)
        })
}

function stopRecordingChunks (recordRTC) {
    // make sure no more data will be uploaded
    recordRTC.onRecordingStopped(_ => return)
    // stop recording
    recordRTC.stopRecording()
}


function setup (webcam_stream, clip_duration, url) {

    var rrtc = RecordRTC(stream, recOptions)

    var conn = new EventEmitter()

    var socket = io(url)

    // sends a 'video' event
    // with some binary blob
    function _send (blob) {
        socket.emit('video', blob)
    }

    // we expose a fn to stop recording
    function stop () {
        stopRecordingChunks(rrtc)
    }

    // and a fn to start recording
    function start() {
        startRecordingChunks(rrtc, clip_duration, send_data)
    }

    // the returned object has the connection
    // and methods to start and stop sending webcam data over the wire
    return {

        socket: socket,

        stop: stop,

        start: start,
    }

}

module.exports = setup
