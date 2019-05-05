<template>
  <div>
    <button
      class="edit shadow-lg font-bold uppercase text-custom-purple bg-white p-4 px-6 rounded-lg"
      @click="modalShown = !modalShown"
    >
      Edit Swears
    </button>

    <transition name="modalAnim">
      <div v-if="modalShown" class="blur">
        <div class="modal shadow-lg sm:p-0 flex">
          <div class="close-modal select-none" @click="modalShown = !modalShown">
            &#10006;
          </div>
          <div class="content pt-12">
            <h3>Enter word in form below:</h3>
            <div class="form">
              <input
                v-model="customSwearInput"
                class="outline-none"
                type="text"
                @keyup.enter="addCustomSwear"
              >
              <button @click="addCustomSwear">
                Submit
              </button>
            </div>
            <hr class="modal-hr">
            <ul>
              <li v-for="swear in listedCustomSwears" :key="swear">
                <span class="flex items-center">
                  <span
                    class="text-red text-sm cursor-pointer select-none mr-2"
                    @click="removeCustomSwear(swear)"
                  >&#10006;</span>
                  {{ swear }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShown: false,
      customSwearInput: '',
      listedCustomSwears: []
    }
  },
  mounted() {
    // Get users custom swears if they exist, if not then just make an empty array
    this.listedCustomSwears =
      JSON.parse(localStorage.getItem('customSwears')) || []
  },
  methods: {
    addCustomSwear() {
      // Make a copy of the current state of localStorage's customSwears
      const localCustomSwears =
        JSON.parse(localStorage.getItem('customSwears')) || []

      if ( // If the user is trying to add something that already exists, clear the input and return
        localCustomSwears.includes(this.customSwearInput) ||
        this.customSwearInput === ''
      ) {
        this.customSwearInput = ''
        return
      }
      localCustomSwears.push(this.customSwearInput)
      this.listedCustomSwears.push(this.customSwearInput)

      localStorage.setItem('customSwears', JSON.stringify(localCustomSwears)) // Turn localCustomSwears to a string so localstorage can store it

      this.$emit('customSwearsChanged') // Emit that swears have been updated, so a swearscan can be performed with the new swears
      this.customSwearInput = '' // Clear user input
    },
    removeCustomSwear(swear) {
      // Make a copy of the current state of localStorage's customSwears
      const localCustomSwears =
        JSON.parse(localStorage.getItem('customSwears')) || []
      let spliceIndex

      // This entire for loop is here to get the index of the swear trying to be removed. Once it finds the swear, it get's it's index from 'i'
      for (let i = localCustomSwears.length - 1; i > 0; i--) {
        if (localCustomSwears[i] === swear) {
          spliceIndex = i
          break
        }
      }

      localCustomSwears.splice(spliceIndex, 1) // Remove the swear based on the index we got previously
      this.listedCustomSwears.splice(spliceIndex, 1) // Splice the listed custom swears too

      localStorage.setItem('customSwears', JSON.stringify(localCustomSwears)) // Update local storage

      this.$emit('customSwearsChanged') // Emit that swears have been updated, so a swearscan can be performed with the new swears
    }
  }
}
</script>

<style>
.modalAnim-enter-active,
.modalAnim-leave-active {
  transition: all 0.3s ease-in;
}

.modalAnim-enter,
.modalAnim-leave-to {
  transform: scale(0);
  opacity: 0;
}

.edit {
  position: absolute;
  bottom: 16px;
  right: 16px;
  transition: all 0.45s;
}

.edit:hover {
  transform: scale(0.975);
  opacity: 0.4;
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background: rgba(0, 0, 0, 0.651); */

  /* transition: 1s all; */
}

.modal-hr {
  width: 100%;
  height: 2px;
  background: rgb(175, 175, 175);

  margin: 1em 0;
}

.modal {
  width: 50em;
  height: 575px;

  padding: 2em;

  border-radius: 8px;

  background: white;
  color: black;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: start;
}

.close-modal {
  position: absolute;
  top: 14px;
  right: 24px;

  font-size: 2.5em;

  cursor: pointer;
}

.modal .form {
  display: flex;
  justify-content: center;
  /* margin-top: 2em; */
}

.modal h3 {
  font-weight: lighter;
}

.modal .form input {
  max-width: 20em;
  width: 20em;
  height: 46px;
  border: 2px solid #cbcbcb;
  margin: 0;

  font-weight: lighter;

  background: #e9e9e9;
}

.modal .form button {
  padding: 0.7em 3em;
  margin: 0;

  background: #6d96d4;
  color: white;
  border-bottom: #5582c5 2px solid;

  transition: all 0.2s;
}
.modal .form button:hover {
  opacity: 0.85;
}

.content ul {
  list-style-type: none;
  margin-top: 1em;
  padding: 0;
  font-size: 1.45em;
  width: 100%;
}

.content ul li {
  margin: 0;
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
}

.content {
  max-width: 100%;
}

.modal {
  overflow: hidden;
  overflow-y: auto;
}
</style>
