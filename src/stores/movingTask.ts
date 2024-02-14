import { defineStore } from 'pinia'
import type { Task } from './containers'
import useContainersStore from './containers'

interface Vector {
  x: number
  y: number
}

const useMovingTaskStore = defineStore('movingTask', {
  state() {
    return {
      isMoving: false,
      index: -1,
      containerID: '',
      movingTask: {} as Task,
      clickPosition: {} as Vector
    }
  },
  getters: {},
  actions: {
    moveTask(newIndex: number, newContainerID: string) {
      useContainersStore().moveTask(this.index, this.containerID, newIndex, newContainerID)
      this.$patch({
        index: newIndex,
        containerID: newContainerID
      })
    },
    stopMoving() {
      this.$reset()
    }
  }
})

export default useMovingTaskStore
