<template>
  <div id="view-root">
    <moving-task v-if="isMoving"/>
    <task-container
      v-for="container in containers"
      :key="container.uuid"
      :tasks="container.tasks"
    />
  </div>
</template>
<script lang="ts">
import { mapState } from 'pinia'

import TaskContainer from '@/components/taskmanager/TaskContainer.vue'
import MovingTask from '@/components/taskmanager/MovingTask.vue'

import useContainersStore from '@/stores/containers'
import useMovingTaskStore from '@/stores/movingTask'

export default {
  computed: {
    ...mapState(useContainersStore, ['containers']),
    ...mapState(useMovingTaskStore, ['isMoving'])
  },
  components: { TaskContainer, MovingTask },
  created() {
    useContainersStore().loadContainers()
  }
}
</script>

<style scoped>
#view-root {
  display: flex;

  flex-direction: row;
  justify-content: left;

  height: 97vh;

  padding: 10px;

  user-select: none;
}
</style>
