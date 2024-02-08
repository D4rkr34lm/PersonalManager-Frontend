<template>
    <div id="view-root">
        <task-container v-for="container in containers" :key="container.uuid" :tasks="container.tasks"/>
    </div>
</template>
<script lang="ts">
    import { mapState } from 'pinia';

    import TaskContainer from '@/components/taskmanager/TaskContainer.vue'
    import useContainersStore from '@/stores/containers'

    export default{
        computed:{
            ...mapState(useContainersStore, ['containers'])
        },
        components: {TaskContainer},
        created() {
            useContainersStore().loadContainers()
        }
    }
</script>

<style scoped>
    #view-root{
        display: flex;

        flex-direction: row;
        justify-content: left;

        height: 97vh;

        padding: 10px;

        user-select: none;
    }
</style>