<template>
  <div class="task-container">
    <div class="inner-task-container" @mouseenter="taskMoveOverHandler(tasks!.length, uuid!)">
      <div
        class="task-colision-box"
        v-for="(task, index) in tasks"
        :key="index"
        @mouseenter="taskMoveOverHandler(index, uuid!)"
      >
        <task-block
          :index="index"
          :uuid="task.uuid"
          :containerID="uuid"
          :title="task.title"
          :type="task.type"
          :body="task.body"
        />
      </div>
    </div>
    <div class="create-new-button-container">
      <button class="create-new-button">+</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Task } from '@/stores/containers'
import useMovingTaskStore from '@/stores/movingTask'

import TaskBlock from '@/components/taskmanager/TaskBlock.vue'

export default {
  props: {
    uuid: String,
    tasks: Array<Task>
  },
  methods: {
    taskMoveOverHandler(index: number, containerID: string) {
      if (!useMovingTaskStore().isMoving) return
      useMovingTaskStore().moveTask(index, containerID)
    }
  },
  components: { TaskBlock }
}
</script>
<style>
.task-container {
  display: flex;
  flex-direction: column;

  width: 50%;
  max-width: 250px;

  margin-left: 10px;
  margin-right: 10px;

  border: 1px #959595 solid;
  border-radius: 10px;

  background-color: white;
}

.inner-task-container {
  overflow-y: scroll;
  flex-grow: 1;

  scrollbar-width: none;
}

.task-colision-box {
  padding: 5px;
  padding-bottom: 0px;
}

.create-new-button {
  border: none;
  border-top: #959595 1px solid;

  flex-grow: 1;

  background: none;

  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: none;
  margin-top: none;
  padding: 5px;

  font-size: x-large;
  color: #626262;
}

.create-new-button-container {
  display: flex;
  flex-direction: row;

  border-radius: 0px 0px 10px 10px;
}

.create-new-button-container:hover {
  background-color: #cfcfcf;
}
</style>
