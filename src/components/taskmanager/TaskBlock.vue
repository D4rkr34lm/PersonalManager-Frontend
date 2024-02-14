<template>
  <div
    ref="wrapper"
    :class="movingTask.uuid == uuid ? 'shadow-task' : 'task'"
    @mousedown="startMove"
  >
    <h2>{{ title }}</h2>
    <basic-task-body v-if="type == 'basic'" :text="body?.text" />
  </div>
</template>
<script lang="ts">
import { mapState } from 'pinia'

import BasicTaskBody from '@/components/taskmanager/taskbodys/BasicTaskBody.vue'

import useMovingTaskStore from '@/stores/movingTask'

export default {
  data() {
    return {}
  },
  props: {
    index: Number,
    uuid: String,
    containerID: String,
    title: String,
    type: String,
    body: Object
  },
  computed: {
    ...mapState(useMovingTaskStore, ['movingTask', 'isMoving'])
  },
  methods: {
    startMove(event: MouseEvent) {
      if (!this.isMoving) {
        const box = (this.$refs['wrapper'] as HTMLElement).getBoundingClientRect()

        const clickPosition = { x: event.clientX - box.left, y: event.clientY - box.top }

        useMovingTaskStore().$patch({
          movingTask: { uuid: this.uuid, type: this.type, title: this.title, body: this.body },
          index: this.index,
          containerID: this.containerID,
          isMoving: true,
          clickPosition: clickPosition
        })
      }
    }
  },
  components: { BasicTaskBody }
}
</script>
<style scoped>
.task {
  border: 1px #959595 solid;
  border-radius: 5px;

  background-color: white;
}

.shadow-task {
  border: 1px #e5e5e5 solid;
  border-radius: 5px;

  color: #e5e5e5;
  background-color: #e5e5e5;
}

h2 {
  margin-bottom: 5px;
  margin-top: 0px;

  border-radius: 5px 5px 0px 0px;

  padding: 5px;

  font-weight: normal;

  background-color: #e5e5e5;
}
</style>
