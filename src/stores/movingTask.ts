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
      const newContainer = useContainersStore().containers.find(container => container.uuid === this.containerID)
      if(newContainer === undefined) return
      const newPrev = this.index === 0 ? newContainer.uuid : newContainer.tasks[this.index - 1].uuid

      useContainersStore().updateTaskUpstream(this.movingTask.uuid, newPrev, this.containerID)
      this.$reset()
    }
  }
})

export default useMovingTaskStore
