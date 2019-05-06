<template>
  <div class="w-full min-h-screen text-white font-heebo">
    <header class="p-4">
      <nuxt-link to="/">
        <img src="~/assets/logo-img.png" alt="potty 🚨 alarm" class="sm:h-10 h-6">
      </nuxt-link>
    </header>
    <div class="flex w-full justify-center py-4">
      <Search />
    </div>
    <nuxt />
    <transition name="fade">
      <TimeOutPrompt />
    </transition>
  </div>
</template>

<script>
import Search from '~/components/Search'
import TimeOutPrompt from '~/components/TimeOutPrompt'

export default {
  components: {
    Search,
    TimeOutPrompt
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Heebo:300,500,700,900");

body {
  background: #0d0221;
  overflow-x: hidden;
}

.full-minus-nav-desktop {
  height: calc(100vh - 76px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.65s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
