import { defineStore } from 'pinia'

const useMouse = defineStore('mouse', {
  state() {
    return {
      x: 0,
      y: 0
    }
  }
})

export default useMouse
