<template>
  <div>
    <p v-if="loginFailed">Username-Password combination does not exsist</p>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import router from '@/router'

export default {
  data() {
    return {
      username: '',
      password: '',
      loginFailed: false
    }
  },
  methods: {
    async login() {
      const data = {
        username: this.username,
        password: this.password
      }

      const answer = await fetch('http://home.local:9001' + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const body = await answer.text()

      if (answer.status === 200) {
        localStorage.setItem('token', body)
        localStorage.setItem('username', this.username)
        router.push('/')
      } else {
        this.password = ''
        this.loginFailed = true
      }
    }
  }
}
</script>

<style scoped>
div {
  display: flex;

  flex-direction: column;
  justify-content: center;

  height: 25%;
  max-width: 500px;
  width: 50%;

  border: 1px #959595 solid;
  border-radius: 10px;

  padding: 3vh;

  background-color: rgb(255, 254, 254);
}

button,
input {
  height: 5vh;

  font-size: x-large;

  margin-top: 1vh;
  margin-bottom: 1vh;
}

p {
  height: 5vh;
  font-size: x-large;
  color: rgb(214, 33, 33);

  text-align: center;

  margin: 0px;
}
</style>
