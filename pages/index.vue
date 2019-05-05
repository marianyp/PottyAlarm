<template>
  <div class="w-full flex justify-center">
    <p class="font-light opacity-50 mb-4">
      Search for a song to scan
    </p>
  </div>
</template>

<script>
export default {
  layout: 'initial',

  // beforeRouteEnter doesn't get ran when directly accessing a page.
  // This allows for us to commit "viewed splash", only get's rendered once (when they initially go to the page), and not when clicking on logo
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit('viewedSplash')
    })
  }
}
</script>

<style>
.full-minus-nav-desktop {
  height: calc(100vh - 76px);
}
</style>
