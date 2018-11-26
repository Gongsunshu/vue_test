<template>
  <div class="table-body-div wrap" v-if="init_data_success">
    <div class="inner" v-if="!!navButton && Object.keys(navButton).length !== 0">
      <nav class="nav nav-button-nav">
        <input type="button" class="button button-tiny nav-button" v-for="(n,i) in navButton" :class="n.class"
                :style="n.style" @click="n.action(checked, data_rows)" name="" :value="n.name" :name="i" @click.stop/>

      </nav>
    </div>
    <div>
      <table class="table-sm table-striped table-bordered table-hover table-lt inner" :style="table_extra_style">
        <tr v-if="!!init_data_error">
          <td class="error_tr">error</td>
        </tr>
        <thead>
        <tr>
          <th v-if="choose && init_data_success" class="menu">
            <input type="checkbox" value="all"
                   v-on:click="chooseAll"/>
          </th>
          <th v-for="i in table_title">
            {{i}}
          </th>
          <th v-if="!!menu">
            {{menu.title}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in table_td_data" @click="clickToSelectSingle(index)" :value="index">
          <td v-if="choose">
            <input type="checkbox" :value="checked[index]" :checked="checked[index]"/>
          </td>
          <td v-for="(i,s) in item" v-if="s<table_title.length" v-html="i">
            {{i}}
          </td>
          <td v-if="menu">
            <div class="row-deal-td">
              <input type="button" v-for="m in menu.menuGroup" :value="m.name" @click="m.action(item,index)" @click.stop
                     :class="m.class" class="button button-tiny oper-button" :style="m.style"/>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
      <!--操作插槽-->
      <!--<slot name="oper"></slot>-->
    <div class="troot" v-if="init_data_success">
      总共{{total_page}}页，当前是第<i class="i-text">{{cur_page}}</i>页
    </div>
    <div class="pagination-div inner" v-if="init_data_success">
      <span class="pagination">
        <a href="#" aria-label="Previous" @click="next_page(cur_page-1)">&laquo;</a>
      </span>
      <span v-for="c in total_page" v-bind:class="{pagination:clicked===0, pagination_clicked:clicked===c}" class="pagination" v-if="c<11">
        <a href="javascript:void(0);" v-on:click="next_page(c)">{{c}}</a>
      </span>
      <span v-for="c in total_page" v-bind:class="{pagination:clicked===0,pagination_clicked:clicked===c}" class="pagination" v-if="c>=11 && c<13">
        ..
      </span>
      <span v-for="c in total_page" v-bind:class="{pagination:clicked===0,pagination_clicked:clicked===c}" class="pagination"
            v-if="c === total_page && c>=13">
        <a href="javascript:void(0);" v-on:click="next_page(c)" :value="c">{{c}}</a>
      </span>
      <span class="pagination">
        <a href="#" aria-label="Previous" @click="next_page(cur_page+1)">&raquo;</a>
      </span>
      <input type="text" v-if="skip_page" v-model="selected" class="fancyInput caret pagination"/>
      <input type="button" v-if="skip_page" v-on:click="next_page(selected)" value="跳转"
             class="button button-tiny skip_page_button"/>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
  import Vue from 'vue'

  var globalUtils = require('./../gloabl_utils');

  export default {
    name: "TableBox",
    props: {
      config: {
        type: Object,
      },
    },
    data: function () {
      return {
        table_td_data: [],
        clicked: 0,
        selected: 1,
        cur_page: 1,
        page_size: 10,
        total_page: 0,
        table_title: [],
        choose: [],
        is_choose_all:false,
        skip_page: false,
        data_rows: {
          type: [],
        },
        checked: '',
        clickToSelect: false,
        init_data_success: false,
        menu:{},
        init_data_error:'',
        table_extra_style:{},
        navButton:{},
      };
    },
    computed: {//计算属性

    },
    watch: {
      'data_rows': {
        handler: function (cur_rows, old_rows) {
          let rrd = [];//最终返回的数据
          let columns = this.config.columns;
          let table_title_length = columns.length;
          let rows_length = cur_rows.length;
          for (let i =0;i< rows_length;i++){
            Vue.set(this.checked, i, false);
          }
          for (let i = 0; i < table_title_length; i++) {
            let k = columns[i].id;
            this.table_title.push(columns[i].text);
            for (let j = 0; j < rows_length; j++) {
              let rr = rrd[j];
              if (!rr) {
                rr = [];
                rrd[j] = rr;
              }
              rr = rrd[j];
              let tr;
              if (!!cur_rows[j][k]) {
                if (!!columns[i]['formatter'] && typeof columns[i]['formatter'] === 'function') {
                  tr = columns[i]['formatter'](cur_rows[j][k], j, cur_rows);
                } else {
                  tr = cur_rows[j][k];
                }
              } else {
                if (!!columns[i]['default']) {
                  tr = columns[i]['default'];
                } else if (!!this.config.undefinedText) {
                  tr = this.config.undefinedText;
                } else {
                  tr = '..';
                }
              }

              rr.push(tr);
              rrd[j] = rr;
            }
          }
          this.table_td_data = rrd;
          //在数据初始化加载完成后，相关配置初始化
          this.init_table_config();
        },
        immediate: false,
        deep: false,
      },
    },
    methods: {
      next_page: function (c) {
        if (c<1){
          c = 1;
        }

        if (c>this.total_page){
          c = this.total_page;
        }

        this.cur_page = c;
        this.clicked = c;
        this.query_table_rows({
          pageSize: this.page_size,
          page: c,
        });
        // this.$emit('next_page_listen',{skip_page:c}); $emit 通过父组件上监听器，向父组件传值
      },
      query_table_rows: function (params) {//如果异步加载数据
        if (!!this.config.ajax && this.config.ajax instanceof Function){
          console.log(params);
          this.config.ajax(params);
        }else{
          if (this.config.async) {//
            let data = Qs.stringify(params);
            let axios_config = {
              url: this.config.url,
              data: data,
              method: !!this.config.method ? this.config.method : 'post',
            };
            axios_config = globalUtils.expandProperty(axios_config, this.config.ajaxOptions);
            this.$http(axios_config
            ).then((response) => {
                let data;
                if (typeof this.config.data === 'function') {
                  data = this.config.data(response);
                }
                if (!!data) {
                  //数据的初始化工作
                  this.data_rows = data.rows;
                  this.total_page = globalUtils.computeTotalPage(data.total, this.page_size);
                  this.table_title = [];
                  this.checked = new Array(this.page_size);
                  this.menu = [];
                }
              }
            ).catch(function (error) {
              this.init_data_error = error;
              //查询失败，所有的组件都不显示
              this.checked = [];
              this.skip_page = false;
              this.choose = false;
              this.clickToSelect = false;
              this.init_data_success = false;
            });
          } else { //同步加载数据，一次性从属性 data中取出数据
            this.data_rows = [];
            if (!!this.config.data && this.config.data instanceof Array) {
              //数据的初始化工作
              this.table_title = [];
              this.checked = new Array(this.page_size);
              this.menu = [];
              let data_rows_length = this.config.data.length;
              this.total_page = globalUtils.computeTotalPage(data_rows_length, this.page_size);

              let start_index = (this.cur_page - 1) * this.page_size;
              let end_index = this.cur_page * this.page_size;
              for (let i = start_index; i < end_index; i++) {
                this.data_rows.push(this.config.data[i]);
              }
            }
          }
        }
      },
      chooseAll: function () {
        for (let i = 0; i< this.checked.length; i++) {
          if (this.is_choose_all){//已经被全选的，取消全选
            Vue.set(this.checked, i, false);
          }else{
            Vue.set(this.checked, i, true);
          }
        }
        this.is_choose_all = !this.is_choose_all;
      },
      clickToSelectSingle: function (index) {
        if (this.clickToSelect){
          Vue.set(this.checked, index, !this.checked[index]);
        }
      },
      init_table_config: function () {
        //在数据初始化加载完成后，相关配置初始化
        this.skip_page = !!this.config.skip_page;
        this.choose = !!this.config.choose;
        this.clickToSelect = !!this.config.clickToSelect;
        this.init_data_success = true;
        if (globalUtils.objectEmpty(this.config.rowMenu)){
          this.menu =this.config.rowMenu;
        }

        if (globalUtils.objectEmpty(this.config.ext_style)){
          this.table_extra_style = this.config.ext_style;
        }

        if (globalUtils.objectEmpty(this.config.navButton)){
          this.navButton = this.config.navButton;
        }
      },
    },
    mounted: function () {
      this.page_size = !!this.config.page_size ? this.config.page_size : this.page_size;
      this.clickToSelect = this.config.clickToSelect?this.config.clickToSelect: this.clickToSelect;
      let params = this.config.params;
      params['pageSize'] = this.page_size;
      params['page'] = this.cur_page;
      params = globalUtils.expandProperty(params, this.config.params);
      //初始化属性，与状态有关的属性全部置为初始值，根据之后的状态再进行改变
      this.query_table_rows(params);
    },
    render:function (createElement) {
      return createElement('',{
        methods:{
          objectEmpty:function(object){
            globalUtils.objectEmpty(object);
          }
        }
      })
    }
  }
</script>

<style scoped>
  @import './../assets/css/commonbutton.css';
  @import './../assets/css/fancy-input.css';
  @import './../assets/css/bootstrap.css';

  .pagination-div {
    display: flex;
    text-align: center;
    vertical-align: middle;
    margin: 0 0 0 30%;
    position: relative;
  }

  .pagination {
    margin: auto 4px auto 4px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
  }

  .pagination a {
    text-decoration: none;
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }

  .pagination_clicked a {
    text-decoration: none;
    color: #ff0000;
  }
  .pagination a:hover {
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }

  .pagination a:focus {
    z-index: 2;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .pagination a:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  div > input[type=text] {
    width: 22px;
    height: auto;
    text-align: center;
    border-radius: 3px 3px 3px 3px;
    font-weight: normal;
  }

  .skip_page_button {
    height: auto;
    background: #ccc6c6;
    color: #0056b3;;
    font-size-adjust: 0.58;
    font-size: 0.78em;
    font-weight: normal;
  }

  .skip_page_button input:hover{
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }

  .menu {
    padding: 5px;
  }

  .button-tiny-checkbox {
    border-radius: 5px;
    color: black;
    font-weight: normal;
  }

  .troot {
    left: -28%;
    position: relative;
  }

  .table-body-div {
    display: inline;
    width: auto;
    align-items: center;
    justify-content: center;
  }

  .table-lt {
    width: 80% !important;
  }

  .i-text {
    display: inline-block;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: #4cb0f9;
  }

  .oper-button{
    margin: 0 0 0 5px;

  }

  .wrap {
    float: left; /* 自适应内容宽度 */
    position: relative;
    left: 50%;
  }
  .inner {
    position: relative;
    left: -50%;
  }

  .nav-button{
    margin: auto 5px 5px 5px;
  }

  .error_tr{
    width: 100%;
    color: red;
    font-size: 2em;
    text-align: center;
  }

  .row-deal-td{
    display: inline-flex;
    height: 100%;
    vertical-align: middle;
    text-align: center;
  }

  .nav-button-nav{
    /*display: flex;*/
  }
</style>
