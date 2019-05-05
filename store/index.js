export const state = () => ({
  results: [],
  viewedSplash: false
})

export const mutations = {
  add(state, newResults) {
    state.results = [...newResults, ...state.results].slice(0, 5)
  },
  clear(state) {
    state.results = []
  },
  viewedSplash(state) {
    state.viewedSplash = true
  }
}
