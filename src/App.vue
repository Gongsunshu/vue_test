<template>
  <div id="app">
    <img :src="img">
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
      this.$http.post('', querystring.stringify({
        username: '',
        password: '',
        yzm:'',
        random:Math.random(),
      })).then(function (response) {
            console.log(response)
      }).catch(function (error) {
        console.log(error);
      })
    },
    con: function () {

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
