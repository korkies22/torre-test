<template>
  <form class="createGroupForm" @click.prevent>
    <div class="createGroupForm__item">
      <p class="createGroupForm__item--title">Name</p>
      <input
        v-model="name"
        type="text"
        class="createGroupForm__input"
        placeholder="Group name"
        maxlength="20"
      />
      <p
        v-if="$v.name.$dirty && !$v.name.required"
        class="createGroupForm__error"
      >
        Name is required
      </p>
      <p
        v-else-if="$v.name.$dirty && !$v.name.minLength"
        class="createGroupForm__error"
      >
        Name must be at least 6 characters long
      </p>
    </div>
    <div class="createGroupForm__item">
      <p class="createGroupForm__item--title">Description</p>
      <textarea
        v-model="description"
        type="text"
        rows="5"
        class="createGroupForm__input"
        placeholder="Group description (Optional)"
        maxlength="1000"
      />
    </div>
    <div
      v-show="video === null || video === undefined"
      class="video__container"
    >
      <div data-vjs-player>
        <video
          id="myVideo1"
          ref="video1"
          playsinline
          width="100%"
          height="100%"
          class="video-js vjs-default-skin vjs-fill"
        ></video>
      </div>

      <p>O adjunta un video donde se vea tu rostro</p>
    </div>
    <button
      v-if="!file"
      class="videoPage__addFile"
      @click.prevent="selectVideo"
    >
      Adjuntar video
    </button>
    <div v-else-if="video" class="video__container">
      <div
        v-video-player:myVideoPlayer="video"
        class="videoPage__videoPreview"
        :playsinline="true"
        @loadeddata="onPlayerLoadeddata($event)"
      ></div>

      <p class="videoPage__iconDelete" @click="deleteFile">X</p>
    </div>
    <input
      id="file"
      ref="inputFiles"
      type="file"
      style="display: none"
      @change="onSelect"
    />
    <div class="createGroupForm__item">
      <p class="createGroupForm__item--title">Members</p>
      <div class="createGroupForm__item--row">
        <input
          v-model="curMemberName"
          type="text"
          class="createGroupForm__input"
          placeholder="Member name"
          maxlength="20"
        />
        <button class="createGroupForm__item--button" @click="addMember">
          Add
        </button>
      </div>
      <UserCard :user="$store.getters['auth/user']"> </UserCard>
      <UserCard
        v-for="(member, index) in members"
        :key="member.publicId"
        :user="member"
        :removable="true"
        @removeUser="removeMember(index)"
      >
      </UserCard>
    </div>
    <p v-if="$props.errorMsg" class="createGroupForm__error">
      {{ $props.errorMsg }}
    </p>
    <button class="createGroupForm__button" @click="createGroup">
      Create group
    </button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-record/dist/css/videojs.record.css'
import UserCard from '@/components/users/UserCard'
import { parseError } from '~/utils/error'
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
  components: { UserCard },
  props: {
    errorMsg: { type: String, default: '' },
  },
  data() {
    return {
      name: '',
      description: '',
      curMemberName: '',
      members: [],
      player1: null,
      file: null,
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
      const fileUrl = this.file
      if (!fileUrl) {
        return ''
      }
      const arr = fileUrl.split('.')
      const type = arr[arr.length - 1]
      return type
    },
    video() {
      if (this.file) {
        const videoSource = URL.createObjectURL(this.file)
        return {
          // videojs options
          muted: false,
          language: 'es',
          fill: true,
          sources: [
            {
              src: videoSource + '#.x-matroska',
              type: this.file.type,
            },
          ],
        }
      }
      return null
    },
  },
  mounted() {
    this.player1 = videojs(this.$refs.video1, videoJsOptions, () => {
      // print version information at startup
    })
    // error handling
    this.player1.on('error', (element, error) => {
      console.error(error)
    })
    // device is ready
    this.player1.on('deviceReady', () => {
      console.log('device is ready!')
    })
    // user clicked the record button and started recording
    this.player1.on('startRecord', () => {
      console.log('started recording!')
    })
    // user completed recording and stream is available
    const vm = this
    this.player1.on('finishRecord', () => {
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player1.recordedData)
      console.log('finished recording2: ', this.player1)
      vm.file = this.player1.recordedData
    })
  },
  beforeDestroy() {
    if (this.player1) {
      this.player1.dispose()
      this.player1 = null
    }
  },
  methods: {
    async addMember() {
      this.$emit('error', null)
      try {
        if (!this.curMemberName) {
          return
        }
        if (this.curMemberName === this.$store.getters['auth/username']) {
          this.$emit('error', 'You are already part of your group')
          return
        }

        const existingMember = this.members.find(
          (member) => member.publicId === this.curMemberName
        )

        if (existingMember) {
          this.$emit('error', 'Member is already in group')
          return
        }

        const user = await this.$axios.$get(
          `members/checkTorre?user=${this.curMemberName}`
        )
        if (!user) {
          this.$emit('error', 'User not found in Torre.co')
          return
        }
        this.members.push(user)
        this.curMemberName = ''
      } catch (err) {
        this.$emit('error', parseError(err))
      }
    },
    removeMember(index) {
      this.$emit('error', null)
      this.members.splice(index, 1)
    },
    createGroup() {
      this.$emit('error', null)
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if (this.members.length === 0) {
        this.$emit('error', 'Group must have at least 1 additional member')
        return
      }
      const members = this.members.map((member) => {
        return member.publicId
      })
      this.$emit('createGroup', {
        name: this.name,
        description: this.description,
        members,
      })
    },
    selectVideo() {
      this.$refs.inputFiles.click()
    },
    deleteFile() {
      this.$refs.inputFiles.value = null
      this.file = null
    },
    onPlayerLoadeddata(e) {
      if (e.cache_.duration !== Infinity && e.cache_.duration > 61) {
        this.errorMsg = 'El video no debe durar más de un minuto'
        this.file = null
      }
    },
    onSelect() {
      this.errorMsg = null
      const file = this.$refs.inputFiles.files[0]
      if (!file) return
      this.file = file
      if (file.type.match('video.*') && /\.(webm|ogg|mp4)$/i.test(file.name)) {
        const question = this.curAchievement.achievementVideoQuestions[
          this.$props.step - 1
        ]
        question.file = file
        this.curAchievement.achievementVideoQuestions[
          this.$props.step - 1
        ] = question
      } else {
        this.file = null
        this.errorMsg = 'El archivo debe ser un video'
      }
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
  },
}
</script>

<style lang="scss" scoped>
.createGroupForm {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include formItem;

  &__button {
    padding: 0.6rem 2rem;
    margin-top: 1rem;
  }

  &__error {
    margin-bottom: 1rem;
  }
}
</style>

<style lang="scss" scoped>
.video__container {
  width: 100%;
  height: 20rem;
}

.videoPage__videoPreview {
  width: 100%;
  height: 20rem;
}
</style>
