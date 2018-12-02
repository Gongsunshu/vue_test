<template>
  <div class="dialog">
    <div class="dialog-mask"></div>
    <div class="dialog-container container" :style="{'width':config.width,'height':config.height}">
      <div class="row">
        <div class="dialog-top col-md-12">{{config.title}}</div>
        <div class="dialog-content col-md-12" v-html="config.content">{{config.content}}</div><!--可以接受带样式的文本 -->
        <div class="dialog-bottom col-md-12">
          <input type="button" class="dialog-button button button-action button-rounded button-small" @click="confirm(true)" :value="config.okText">
          <input type="button" class="dialog-button button button-action button-rounded button-small" @click="confirm(false)" :value="config.cancelText">
          <!-- 确认按钮，父组件可监听confirm事件 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let globalUtils = require('./../../gloabl_utils');
  export default {
    name: "confirmdialog",
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
        styleType:{
          type:Number,
        },
        width:'350px',
        height:'250px',
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
      if (globalUtils.judgeType(this.config.beforeDestroy, Function)) {
        return this.config.beforeDestroy(this);
      }
    },
    destroyed: function () {
      if (globalUtils.judgeType(this.config.destroyed, Function)) {
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
    height: 70%;
    width: 100%;
    position: absolute;
    top: 12%;
    border-top: 1px #b5cccc solid;
  }

  .dialog-bottom {
    height: 20%;
    width: 100%;
    position: absolute;
    top: 80%;
    border-top: 1px #b5cccc solid;
    background: #dadada;
    text-align: center;
    vertical-align: middle;
    padding: 2% 0 0 0;
  }

  .dialog-button {
    background-color: #9eb1cc;
  }

  .dialog-button:hover {
    background-color: #494bff;
  }

  .dialog-top {
    position: relative;
    height: 15%;
    width: 100%;
    padding: 5px 0 5px 20px;
    font: 1em Arial, Tahoma, Verdana;
    background-color: #dadada;
  }
</style>
