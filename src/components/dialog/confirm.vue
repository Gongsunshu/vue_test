<template>
  <div class="dialog">
    <div class="dialog-mask"></div>
    <div class="dialog-container">
      <div class="dialog-top"><label>{{config.title}}</label></div>
      <div class="dialog-content" v-html="config.text">{{config.text}}</div><!--可以接受带样式的文本 -->
      <div class="dialog-bottom">
        <input type="button" class="dialog-button button button-tiny" @click="confirm(true)" :value="config.okText">
        <input type="button" class="dialog-button button button-tiny" @click="confirm(false)" :value="config.cancelText">
        <!-- 确认按钮，父组件可监听confirm事件 -->
      </div>
    </div>
  </div>
</template>

<script>
  let globalUtils = require('./../../gloabl_utils');
  export default {
    name: "confirm",
    props: {
      config: {
        title: {
          type: String,
          require: true,
        },
        okText: {
          type: String,
          required: true,
        },
        cancelText: {
          type:String,
        },
        type:{
          type:Number,
        },
        beforeDestroy: function () {//弹出框销毁前回调，参数是当前弹出框组件实例

        },
        destroyed: function () {

        },
        okAction:function () {

        },
        cancelAction:function () {

        }
      },
    },
    methods: {
      confirm: function (okOrCancel) {
        if (okOrCancel){
          if (globalUtils.judgeType(this.config.okAction, Function)){
            this.config.okAction(okOrCancel);
          }
        }else{
          if (globalUtils.judgeType(this.config.okAction, Function)){
            this.config.cancelAction(okOrCancel);
          }
        }
        this.$emit('confirm', okOrCancel);
      }
    },
    beforeDestroy: function () {
      if (!!this.config.beforeDestroy && this.config.beforeDestroy instanceof Function) {
        return this.config.beforeDestroy(this);
      }
    },
    destroyed: function () {
      if (!!this.config.destroyed() && this.config.destroyed instanceof Function) {
        return this.config.destroyed(this);
      }
    }
  }

</script>

<style scoped>
  @import './../../assets/css/commonbutton.css';
  @import './../../assets/css/fancy-input.css';
  @import './../../assets/css/bootstrap.css';
  @import './../../assets/css/dialog.css';

  .dialog {

  }

  .dialog-content {

  }

  .dialog-bottom {

  }

  .dialog-button {

  }

  .dialog-top {
    position: relative;
    padding: 0 0 0 5%;
    border-radius: 5%;
    margin: 0 0 5px 0;
    font: 1.2em Arial, Tahoma, Verdana;
    color: #c8c1cc;
    background-color: #9df7f7;
  }
</style>
