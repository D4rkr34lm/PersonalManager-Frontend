import { defineStore } from 'pinia'
import type { Task } from './containers'

const useMovingTaskStore = defineStore('movingTask', {
  state() {
    return {
      isMoving: false,
      index: -1,
      movingTask: {} as Task
    }
  },
  getters: {},
  actions: {}
})

export default useMovingTaskStore
