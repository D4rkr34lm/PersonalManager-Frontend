<template>
    <div :class="moving ? 'shadow-task' : 'task'">
        <div  @mousedown="startMove" @mouseup="stopMove" @mouseleave="stopMove">
            <h2>{{ title }}</h2>
            <basic-task-body v-if="type == 'basic'" :text="body?.text" />
        </div>
    </div>
</template>
<script lang="ts">
    import BasicTaskBody from '@/components/taskmanager/taskbodys/BasicTaskBody.vue'

    export default{
        data(){
            return {
                moving: false
            }
        },
        props:{
            uuid: String,
            title: String,
            type: String,
            body: Object
        },
        methods: {
            startMove(){
                this.moving = true;
            },
            stopMove(){
                this.moving = false;
            }
        },
        components: {BasicTaskBody}
    }
</script>
<style scoped>
    .task{
        border: 1px #959595 solid;
        border-radius: 5px;

        margin-bottom: 5px;
    }

    .shadow-task{
        border: 1px #e5e5e5 solid;
        border-radius: 5px;

        margin-bottom: 5px;

        color: #e5e5e5;
        background-color: #e5e5e5;
    }

    h2{
        margin-bottom: 5px;
        margin-top: 0px;

        border-radius: 5px 5px 0px 0px;

        padding: 5px;

        font-weight: normal;

        background-color: #e5e5e5;
    }


</style>