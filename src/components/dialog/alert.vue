<template>
  <div class="dialog">
    <div class="dialog-mask">
    </div>
    <div class = "dialog-container">
      <div class="dialog-top">{{config.title}}</div>
      <div class = "dialog-content" v-html="config.text">{{config.text}}</div><!--可以接受带样式的文本 -->
      <div class="dialog-bottom">
        <input type="button" class="dialog-button button button-tiny" @click="$emit('confirm')" :value="config.menu_value"> <!-- 确认按钮 -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert",
    props: {
      config:{
        title: {
          type: String,
          require: true,
        },
        text: {
          type: String,
          required: true,
        },
        method: {},
        menu_value:{
          type:String,
        },
      },
    }
  }
</script>

<style scoped>
  @import './../../assets/css/commonbutton.css';
  @import './../../assets/css/fancy-input.css';
  @import './../../assets/css/bootstrap.css';
  .dialog{

  }

  .dialog-mask{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    background-color: silver;
    z-index: 9999;
  }

  .dialog-container{
    position: fixed;
    width: 300px;
    height: 150px;
    left: 45%;
    top: 25%;
    background-color: white;
    z-index: 10001;
    border-radius: 5%;
  }

  .dialog-content{

  }

  .dialog-bottom{

  }

  .dialog-button{

  }

  .dialog-top{
    position: relative;
    left: 5%;
  }
</style>
