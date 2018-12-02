<template>
  <div class="dialog">
    <div class="dialog-mask">
    </div>
    <div class="dialog-container container" :style="style">
      <div class="row">
        <div class="col-md-12 dialog-top">{{config.title}}</div>
        <div class="col-md-12 dialog-content" >
          <p v-html="config.content">
            {{config.content}}
          </p>
        </div>
        <div class="col-md-12 dialog-bottom">
          <input type="button" class="dialog-button button button-action button-rounded button-small" @click="ok" :value="config.okText">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let globalUtils = require('./../../gloabl_utils');

  export default {
    name: "alert",
    data:function(){
      return {
        style:{
          width:'',
          height:'',
        },
      }
    },
    props: {
      config: {
        title: {
          type: String,
        },
        okText: {
          type: String,
        },
        styleType: {
          type: Number,
        },
        content: '',
        beforeDestroy: null,//弹出框销毁前回调，参数是当前弹出框组件实例
        destroyed: null,
        okAction: null,
        width:null,
        height:null,
        style:null,
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
    },
    beforeMount:function () {
      if (globalUtils.objectEmpty(this.config)){
        this.style.width = this.config.width;
        this.style.height = this.config.height;
      }


      if (!globalUtils.objectEmpty(this.config.style)){
        this.style = globalUtils.expandProperty(this.style, this.config.style);
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
    padding: 2% 8% 0 0;
    background: #dadada;
  }

  .dialog-button {
    float: right;
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
