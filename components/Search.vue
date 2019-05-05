<template>
  <transition
    v-if="transitionPlaying"
    appear
    mode="out-in"
    name="test"
    @leave="leave"
  >
    <div :key="transitionPlaying" class="outline-none w-5/6 xl:w-1/2 flex">
      <div @click="search()">
        <touch-ripple :speed="2" :opacity="0.3" color="#fff" transition="ease">
          <button
            ripple
            :class="
              submitted && !error
                ? 'submitted'
                : error
                  ? 'error cursor-not-allowed'
                  : ''
            "
            class="z-0 search outline-none bg-custom-pink h-12 px-10 rounded-full text-sm text-white font-bold uppercase"
          >
            Search
          </button>
        </touch-ripple>
      </div>
      <input
        v-model="searchValue"
        class="outline-none w-full h-12 pl-34 rounded-full"
        type="text"
        @keyup.enter="search"
      >
    </div>
  </transition>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchValue: '',
      lastSearchValue: '',
      transitionPlaying: true,
      submitted: false,
      error: false
    }
  },
  mounted() {
    this.$root.$on('timeoutDone', () => { // Whenever the timeoutDone event happens, clear and reset everything
      this.error = false
      this.submitted = false
      this.lastSearchValue = ''
    })
  },
  methods: {
    search(event) {
      if (this.error || this.searchValue === this.lastSearchValue) return // If theres an error/timeout, or if the user hasn't changed their input, stop
      this.submitted = true
      if (this.searchValue) {
        // Fetch info and add to store
        axios
          .get(`/api/search/${this.searchValue}`)
          .then((res) => {
            this.$store.commit('clear')
            this.$store.commit('add', res.data)
          })
          .then(() => {
            if (this.$nuxt.$route.name !== 'results') { // Toggle transition playing animation when user is not on the results page
              this.transitionPlaying = !this.transitionPlaying
            }
            this.submitted = false
            this.error = false

            this.lastSearchValue = this.searchValue
          })
          .catch((err) => {
            if (err.response.status === 429) { // If the response status is 429 (Too Many Requests) emit the timeoutStart event
              this.error = true
              this.submitted = false
              this.$root.$emit('timeoutStart')
            }
          })
      } else {
        setTimeout(() => { // This timeout is to allow for the button color to change for a while.
          this.submitted = false
        }, 500)
      }
    },
    leave(el) {
      this.$nuxt.$router.push({ name: 'results' })
    }
  }
}
</script>

<style>
* {
  outline: 0 !important;
}

.v-touch-ripple {
  position: absolute !important;
}

.ripple-inner {
  border-radius: 9999px;
  transform: translateX(-2px) scale(1.01);
}

.search {
  transition: all 0.5s;
  transform: translateX(-2px) scale(1.01);
}

.search::selection {
  outline: none;
}

.submitted {
  background: #56ce9e;
}

.error {
  background: rgb(155, 143, 143);
}

/* .search:hover {
    background: rgb(214, 60, 119);
    color: white;
} */
</style>
