<template>
  <div class="w-full custom-full flex flex-col items-center justify-center p-4">
    <h5 class="text-3xl text-center">
      <span class="text-custom-aqua">{{ title }}</span> contains
      <span class="text-custom-aqua">{{ swears.length }}</span> inappropriate
      word<span v-if="swears.length > 1">s</span>
    </h5>
    <hr v-if="swears.length > 0" class="custom-hr">
    <div class="flex flex-wrap justify-center md:flex-row">
      <div
        v-for="(count, word) in swearData"
        :key="word + count"
        class="mx-4 text-2xl"
      >
        <CensoredText :text="word" /><span class="text-custom-yellow text-4xl">*{{ count }}</span>
      </div>
    </div>
    <EditSwears class="lg:flex hdden" @customSwearsChanged="swearScan()" />
  </div>
</template>

<script>
import axios from 'axios'
import fuhk from 'fuhk'
import _ from 'lodash'

import CensoredText from '~/components/CensoredText'
import EditSwears from '~/components/EditSwears'

export default {
  components: {
    CensoredText,
    EditSwears
  },
  data() {
    return {
      swears: [],
      swearData: {},
      lyrics: ''
    }
  },
  async asyncData({ params, app }) {
    // On page load, fetch data
    const data = await app.$axios.get(`/api/lyrics/${params.id}`)
    return { lyrics: data.data.lyrics, title: data.data.full_title }
  },
  mounted() {
    // Scan lyrics once page is mounted
    this.swearScan()
  },
  methods: {
    swearScan() {
      // Get custom swears (user added) from localstorage if it exists, if not set customSwears to a list
      const customSwears = JSON.parse(localStorage.getItem('customSwears')) || []

      // Split the lyrics up by individual words. Iterate over each word and push a word if it's in knownCustomSwears
      const knownCustomSwears = []
      this.lyrics.split(' ').forEach((el) => {
        customSwears.forEach((swear) => {
          if (el.toLowerCase().indexOf(swear.toLowerCase()) !== -1) { // Lowercase so 'example' would match 'Example'
            knownCustomSwears.push(swear)
          }
        })
      })

      // fuhk tool considers 'xx' to be a swear, so I manually removed this unnecessity
      const unnecessaryFix = fuhk(this.lyrics).filter((e) => {
        if (e.toLowerCase() === 'xx') {
          return false
        } else {
          return true
        }
      })

      // If unnecessaryFix isn't null (so if the lyrics have swears minus 'xx') or if any of the users custom swears got added,
      // set swears to both, unnecessaryFix and knownCustomSwears combined
      if (unnecessaryFix || knownCustomSwears) {
        this.swears = [...unnecessaryFix, ...knownCustomSwears]
      }

      this.countSwears()
    },

    countSwears() {
      this.swearData = _.countBy(this.swears.map(v => v.toLowerCase())) // Using lodash to count the elements in the swears array, which is mapping the known swears to be lowercase to improve matching
      this.swearData = Object.entries(this.swearData) // Sorting the swear data from greatest occurrences to least occurrences.
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {})
    }
  }
}
</script>

<style>
.custom-hr {
  width: 46%;
  height: 3px;
  background: white;
  margin: 2em 0;
}

.custom-full {
  min-height: calc(100vh - 156px);
}
</style>
