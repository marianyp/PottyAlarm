/* eslint-disable vue/require-prop-types */
<template>
  <span
    class="cursor-pointer ml-2"
    @mouseleave="censored = !censored"
    @mouseover="censored = !censored"
  >{{ censored ? censoredText : text }}</span>
</template>

<script>
export default {
  props: ['text'],
  data() {
    return {
      censored: true,
      censoredText: ''
    }
  },
  mounted() {
    this.censorText()
  },
  methods: {
    censorText() {
      // The idea behind this component is that it holds both the text of a swear and it's censored form
      // Below, we are setting censoredText to the text prop but every charecter except the first value to a *.
      // censoredText get's shown when censored is true

      this.censoredText = this.text
        .split('')
        .map((val, index) => {
          if (index === 0) {
            return val
          } else {
            return '*'
          }
        })
        .join('')
    }
  }
}
</script>

<style></style>
