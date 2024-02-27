import { defineStore } from 'pinia'
import { v4 as uuidv4 } from "uuid"

import router from '@/router'


export interface TaskContainer {
  uuid: string
  tasks: Task[]
}

export class Task {
  uuid: string = '0-0-0-0-0'
  title: string = ''
  type: string = ''
  body: any
}

const useContainersStore = defineStore('counters', {
  state() {
    return {
      containers: [] as TaskContainer[]
    }
  },
  getters: {},
  actions: {
    async load() {
      const res = await fetch('http://home.local:9001/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (res.status === 200) {
        const resData = await res.json()
        this.containers = resData.containers
        console.log(this.containers)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        router.push('/login')
      }
    },
    moveTask(index: number, containerID: string, newIndex: number, newContainerID: string) {
      if (this.containers.length === 0) return

      const oldContainer = this.containers.find(container => container.uuid === containerID )
      const task = oldContainer!.tasks[index]

      oldContainer!.tasks.splice(index, 1)

      const newContainer = this.containers.find((container) => container.uuid == newContainerID)
      newContainer!.tasks.splice(newIndex, 0, task)
    },
    updateTaskUpstream(taskId: string, newPrevId: string, newContainerId: string) {
      const orderBody = {
        taskId: taskId,
        prevId: newPrevId
      }
      
      fetch('http://home.local:9001/data/alter/task/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderBody)
      })

      const ownershipBody = {
        taskId: taskId,
        containerId: newContainerId
      }
      
      fetch('http://home.local:9001/data/alter/task/ownership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(ownershipBody)
      })
    },
    createTask(containerId: string, title: string, type: string, body: any) {
      const id = uuidv4()

      const container = this.containers.find(container => container.uuid === containerId)
      if(container === undefined) return

      const task: Task = {
        uuid: id,
        title: title,
        type: type,
        body: body
      }

      const reqBody = {
        task: task,
        containerId: containerId,
        prevId: container.tasks[container.tasks.length - 1].uuid
      }

      fetch('http://home.local:9001/data/create/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reqBody)
      })

      container.tasks.push(task)
    },
    createContainer(){
      const id = uuidv4()

      const reqBody = {
        containerId: id
      }

      fetch('http://home.local:9001/data/create/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reqBody)
      })

      this.containers.push({uuid: id, tasks: []})
    }
  }
})

export default useContainersStore
