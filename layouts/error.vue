<template>
  <div class="w-full h-screen flex flex-col items-center justify-center text-center z-0 text-white font-heebo">
    <span v-if="error.statusCode == 404" class="text-4xl">Error 404 😐 | Page Not Found</span>
    <span v-else class="text-4xl">Error {{ error.statusCode }} 😕</span>
    <nuxt-link to="/" class="text-4xl mt-4 no-underline link">
      Go home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error-layout',

  mounted() {
    this.$store.viewedSplash = true
  }
}
</script>

<style>
.link {
    color: #56CE9E;
}

.link:hover {
    color: rgb(56, 150, 112);
}
</style>
