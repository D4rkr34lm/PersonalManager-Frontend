<template>
  <div id="moving-task">
    <task-block  
      uuid="0"
      :title="movingTask.title"
      :type="movingTask.type"
      :body="movingTask.body" 
    />
  </div>
</template>
<script lang="ts">
import { mapState } from 'pinia';
import TaskBlock from './TaskBlock.vue';

import useMovingTaskStore from '@/stores/movingTask';

export default{
  components: {TaskBlock},
  computed: {
    ...mapState(useMovingTaskStore, ['movingTask'])
  }
}
</script>
<style scoped>
  #moving-task{
    max-width: 250px;
    width: 50%;

    position: absolute;
    z-index: 2;
  }
</style>
