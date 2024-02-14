<template>
  <div id="moving-task" :style="position">
    <task-block
      uuid="0"
      :title="movingTask.title"
      :type="movingTask.type"
      :body="movingTask.body"
    />
  </div>
</template>
<script lang="ts">
import { mapState } from 'pinia'
import TaskBlock from './TaskBlock.vue'

import useMovingTaskStore from '@/stores/movingTask'
import useMouse from '@/stores/mouse'

export default {
  components: { TaskBlock },
  computed: {
    ...mapState(useMovingTaskStore, ['movingTask']),
    position() {
      return {
        left: `${useMouse().x - useMovingTaskStore().clickPosition.x}px`,
        top: `${useMouse().y - useMovingTaskStore().clickPosition.y}px`
      }
    }
  }
}
</script>
<style scoped>
#moving-task {
  max-width: 240px;
  width: 50%;

  position: absolute;
  z-index: 2;

  pointer-events: none;
}
</style>
