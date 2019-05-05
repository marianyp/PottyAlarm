<template>
  <div
    :class="
      $store.state.results.length === 0
        ? 'flex w-full full-minus-nav-desktop justify-center items-center'
        : ''
    "
  >
    <ul class="p-0">
      <li
        v-for="result in $store.state.results"
        :key="result.id"
        class="lg:px-32"
      >
        <nuxt-link class="text-white no-underline" :to="'scan/' + result.id">
          <SearchResult
            :id="result.id"
            :name="result.full_title"
            :image="result.header_image_url"
          />
        </nuxt-link>
      </li>
    </ul>
    <p v-if="$store.state.results.length === 0" class="text-3xl">
      No results
    </p>
  </div>
</template>

<script>
import SearchResult from '~/components/SearchResult'

export default {
  components: {
    SearchResult
  }
}
</script>

<style>
li {
  list-style: none;
}
</style>
