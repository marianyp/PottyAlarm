<template>
  <div v-if="promptVisible" class="prompt-wrapper">
    <div class="prompt">
      <h5>Woah, slow down!</h5>
      <span>{{ time.minutes }} : {{ time.seconds }} Remaining</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: { minutes: '01', seconds: '00' },
      promptVisible: false
    }
  },
  mounted() {
    // Throughout the entire app, if the timeoutStart event occurs, make the timeout prompt visible and start counting down
    this.$root.$on('timeoutStart', () => {
      this.promptVisible = true
      this.countDown()
    })
  },
  methods: {
    countDown() {
      let time = 60 // 60 seconds / 1 minute to finsh

      const t = setInterval(
        function (ctx) {
          time = time - 1 // Reduce time by on second, every interval
          ctx.time.minutes = Math.floor(time / 60)
          ctx.time.seconds = Math.floor(time - ctx.time.minutes * 60)

          if (ctx.time.minutes.toString().length === 1) { ctx.time.minutes = `0${ctx.time.minutes}`.toString() }
          if (ctx.time.seconds.toString().length === 1) { ctx.time.seconds = `0${ctx.time.seconds}`.toString() }

          if (time === 0) { // Once 60 seconds are over with, emit globally the timeoutDone event and hide the prompt
            ctx.$root.$emit('timeoutDone')
            ctx.promptVisible = false
            clearInterval(t)
          }
        },
        1000,
        this
      )
    }
  }
}
</script>

<style>
.prompt-wrapper {
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.555);
}

.prompt {
  background: white;
  color: gray;

  width: 40em;
  height: 15em;

  border-radius: 6px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

.prompt h5 {
  font-size: 3em;
  color: rgb(41, 41, 41);
  font-style: italic;
  margin-bottom: 0.5em;
}
.prompt span {
  font-size: 2em;
}
</style>
