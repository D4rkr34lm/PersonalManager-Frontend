<template>
    <div id="view-root">
        
        <h1><img src="/fh.png"> Personal Task Manager</h1>
        <login-form/>       
    </div>
</template>

<script lang="ts">
    import LoginForm from '@/components/login/LoginForm.vue';

    export default{
        components:{LoginForm}
    }
</script>

<style scoped>
    #view-root{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    h1{
        display: inline-block;

        font-weight: normal;
        font-size: 5vh;

        text-align: center;
    }

    img{
        width: 15%;
    }
</style>