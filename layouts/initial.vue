<template>
  <div class="w-full min-h-screen text-white font-heebo">
    <transition appear name="scale" @after-enter="splashDone">
      <div v-if="splash && !$store.state.viewedSplash" class="splash">
        <img src="~/assets/logo-img.png" alt="potty 🚨 alarm" class="sm:h-10 h-6">
      </div>
    </transition>
    <header class="p-4">
      <img src="~/assets/logo-img.png" alt="potty 🚨 alarm" class="sm:h-10 h-6">
    </header>
    <div
      class="full-minus-nav-desktop flex flex-col items-center justify-center"
    >
      <nuxt />
      <Search />
    </div>
  </div>
</template>

<script>
import Search from '~/components/Search'

export default {
  components: {
    Search
  },
  data() {
    return {
      splash: true
    }
  },
  methods: {
    splashDone() {
      // Turn off splash once viewed
      this.splash = false
      this.$store.commit('viewedSplash')
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Heebo:300,500,700,900");

body {
  /* background: #0D0221; */
}

header {
  transition: all 1.7s;
}

.splash {
  background: #0d0221;
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
}

.splash img {
  transform: scale(1.4);
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s 0.45s;
}
.scale-enter-active img,
.scale-leave-active img {
  transition: all 0.5s 0.45s;
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
}
.scale-enter img,
.scale-leave-to img {
  transform: scale(0);
}
</style>
