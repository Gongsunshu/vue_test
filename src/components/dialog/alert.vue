<template>
  <div class="dialog">
    <div class="dialog-mask">
    </div>
    <div class="dialog-container">
      <div class="dialog-top"><label>{{config.title}}</label></div>
      <div class="dialog-content" v-html="config.content">{{config.content}}</div><!--可以接受带样式的文本 -->
      <div class="dialog-bottom">
        <input type="button" class="dialog-button button button-tiny" @click="ok" :value="config.okText">
        <!-- 确认按钮，父组件可监听confirm事件 -->
      </div>
    </div>
  </div>
</template>

<script>
  let globalUtils = require('./../../gloabl_utils');

  export default {
    name: "alert",
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
        type:{
          type:Number,
        },
        content:'',
        beforeDestroy: function () {//弹出框销毁前回调，参数是当前弹出框组件实例

        },
        destroyed: function () {

        },
        okAction:function () {

        },
      },
    },
    methods: {
      ok: function () {
        this.$emit('confirm', true);
        if (globalUtils.judgeType(this.config.okAction, Function)) {
          return this.config.okAction(true);
        }
      }
    },
    beforeDestroy: function () {
      if (globalUtils.judgeType(this.config.beforeDestroy, Function)) {
        return this.config.beforeDestroy(this);
      }
    },
    destroyed: function () {
      if (globalUtils.judgeType(this.config.destroyed, Function)) {
        return this.config.destroyed();
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
    position: absolute;
    left: 25%;
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
