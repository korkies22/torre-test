<template>
  <div class="videoViewer">
    <div
      v-video-player:myVideoPlayer="videoOptions"
      :playsinline="true"
      @click="$emit('videoClicked')"
    />
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
export default {
  props: {
    fileURL: { type: String, required: true },
  },
  data() {
    return {
      formats: {
        ogg: 'video/ogg; codecs="theora"',
        h264: 'video/mp4; codecs="avc1.42E01E"',
        webm: 'video/webm; codecs="vp8, vorbis"',
        vp9: 'video/webm; codecs="vp9"',
        hls: 'application/x-mpegURL; codecs="avc1.42E01E"',
        mp4: 'video/mp4',
        mpeg: 'video/mpeg',
      },
    }
  },
  computed: {
    getFileType() {
      const fileURL = this.$props.fileURL
      if (!fileURL) {
        return ''
      }
      const arr = fileURL.split('.')
      const type = arr[arr.length - 1]
      return type
    },
    videoOptions() {
      return {
        muted: false,
        language: 'es',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            src: this.$props.fileURL,
            type: this.formats[this.getFileType],
          },
        ],
        // poster: "/static/images/author.jpg",
      }
    },
  },
}
</script>
