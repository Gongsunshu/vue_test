<template>
  <div id="app">
    <img :src="img" v-on:click="login">
    <TestVue v-bind:height="height"></TestVue>
  </div>
</template>

<script>
import TestVue from "./components/TestVue";
import querystring from 'querystring';
import img from '@/assets/logon.png';

export default {
  name: 'App',
  data:function () {
    return {
      height: 10,
      img:img,
    }
  },
  methods:{
    login:function () {
      this.$http.post('http://127.0.0.1:8080/ordercenter/formlogin', querystring.stringify({
        username: 'AGYKF001',
        password: '123',
        yzm:'',
        random:Math.random(),
      })).then(function (response) {
            console.log(response)
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  components: {TestVue},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

div>img{
  width: 5%;
  height: auto;
}
</style>
