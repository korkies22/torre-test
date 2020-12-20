import Vue from 'vue'
import RecordRTC from 'recordrtc'
import 'webrtc-adapter'
const Record = require('videojs-record/dist/videojs.record.js')
Vue.use(Record)
Vue.use(RecordRTC)
