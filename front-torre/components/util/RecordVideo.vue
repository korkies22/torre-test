<template>
  <div class="recordVideo">
    <div
      v-show="video === null || video === undefined"
      class="recordVideo__container recordVideo__container--column"
    >
      <div data-vjs-player>
        <video
          id="myVideo1"
          ref="video1"
          playsinline
          width="100%"
          height="100%"
          class="video-js vjs-default-skin vjs-fill vjs-16-9"
        ></video>
      </div>

      <p>Or upload a video where we can see you</p>
    </div>
    <button
      v-if="!$props.file"
      class="recordVideo__button"
      @click.prevent="selectVideo"
    >
      <img
        class="recordVideo__icon"
        :src="require('@/assets/icons/file.svg')"
      />
      Add file
    </button>
    <div
      v-else-if="video"
      class="recordVideo__container recordVideo__container--deletable"
    >
      <div
        v-video-player:myVideoPlayer="video"
        class="recordVideo__videoPreview"
        :playsinline="true"
        @loadeddata="onPlayerLoadeddata($event)"
      ></div>
      <p class="recordVideo__iconDelete" @click="deleteFile">X</p>
    </div>
    <input
      id="file"
      ref="inputFiles"
      type="file"
      accept="video/*"
      style="display: none"
      @change="onSelect"
    />
    <p v-if="errorMsg" class="recordVideo__error">{{ errorMsg }}</p>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-record/dist/css/videojs.record.css'
const videoJsOptions = {
  controls: true,
  language: 'en',
  muted: false,
  responsive: true,
  plugins: {
    record: {
      audio: true,
      video: true,
      maxLength: 60,
      videoMimeType: 'video/webm;codecs=vp8,opus',
    },
  },
  controlBar: {
    fullscreenToggle: false,
  },
}
export default {
  props: { file: { type: Blob, default: null } },
  data() {
    return {
      errorMsg: null,
      player1: null,
      firstTimeCamera: true,
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
      const fileUrl = this.$props.file
      if (!fileUrl) {
        return ''
      }
      const arr = fileUrl.split('.')
      const type = arr[arr.length - 1]
      return type
    },
    video() {
      if (this.$props.file) {
        const videoSource = URL.createObjectURL(this.$props.file)
        return {
          // videojs options
          muted: false,
          language: 'es',
          fill: true,
          aspectRatio: '16:9',
          sources: [
            {
              src: videoSource + '#.x-matroska',
              type: this.$props.file.type,
            },
          ],
        }
      }
      return null
    },
  },
  mounted() {
    this.player1 = videojs(this.$refs.video1, videoJsOptions)

    // Saving this to be used inside a method
    const vm = this
    // device is ready
    this.player1.on('deviceReady', () => {
      // This is so the user doesnt have to double click on successive times
      if (!vm.firstTimeCamera) {
        this.player1.record().start()
      } else {
        vm.firstTimeCamera = false
      }
    })

    // Record finished
    this.player1.on('finishRecord', () => {
      // recordedData contains the Blob to be used
      this.player1.record().stopDevice()
      vm.$emit('setFile', this.player1.recordedData)
    })
  },
  beforeDestroy() {
    if (this.player1) {
      this.player1.dispose()
      this.player1 = null
    }
  },
  methods: {
    selectVideo() {
      this.$refs.inputFiles.click()
    },
    deleteFile() {
      this.$refs.inputFiles.value = null
      this.$emit('setFile', null)
    },
    onPlayerLoadeddata(e) {
      if (e.cache_.duration !== Infinity && e.cache_.duration > 61) {
        this.errorMsg = 'Video should last lest than a minute'
        this.$emit('setFile', null)
      }
    },
    onSelect() {
      this.errorMsg = null
      const file = this.$refs.inputFiles.files[0]
      if (!file) return

      if (file.type.match('video.*') && /\.(webm|ogg|mp4)$/i.test(file.name)) {
        this.$emit('setFile', file)
      } else {
        this.$emit('setFile', null)

        this.errorMsg = 'File should be a video'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.recordVideo {
  @include error;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;

  &__button {
    @include button;
    display: flex;
    align-items: center;
  }
  &__icon {
    margin-right: 0.5rem;
  }

  &__container {
    width: 100%;
    display: flex;
    align-items: center;

    &--column {
      flex-direction: column;
    }
  }

  &__iconDelete {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    margin-left: 2rem;
    margin-right: 1rem;
  }

  &__videoPreview {
    width: 100%;
  }
}
</style>
