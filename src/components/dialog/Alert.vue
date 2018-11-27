<template>
  <div class="dialog">
    <div class="dialog-mask">
    </div>
    <div class="dialog-container">
      <div class="list-group">
        <div class="list-group-item dialog-top">{{config.title}}</div>
        <div class="list-group-item tab-content" v-html="config.content">{{config.content}}</div>
        <div class="modal-footer">
          <input type="button" class="dialog-button button button-tiny" @click="ok" :value="config.okText">
        </div>
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
        },
        okText: {
          type: String,
        },
        styleType:{
          type:Number,
        },
        content:'',
        beforeDestroy: null,//弹出框销毁前回调，参数是当前弹出框组件实例
        destroyed: null,
        okAction:null,
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
    display: grid;
  }

  .dialog-content {
    height: 70%;
    position: absolute;
    top: 25%;
  }

  .dialog-bottom {
    position: absolute;
    height: 15%;
    top: 83%;
    width: 100%;
  }

  .dialog-button {
    position: absolute;
    left: 25%;
  }

  .dialog-top {
    position: relative;
    height: 25%;
    /*top: 0;*/
    /*padding: 0 0 0 5%;*/
    /*border-radius: 5%;*/
    /*margin: 0 0 5px 0;*/
    font: 1.2em Arial, Tahoma, Verdana;
    /*color: #c8c1cc;*/
    background-color: #ccc6c6;
    /*width: 100%;*/
    /*border-top: #4cb0f9 1px solid;*/
  }
</style>
