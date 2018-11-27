import Vue from 'vue';
import confirmdialog from './Confirm.vue';

let htmlBody = document.body;
export default function showConfirm(config) {
  console.log(confirmdialog);
  let vm = null;
  let confirmSettings = {
    template: '<confirmdialog @confirm="confirm" :config="config"></confirmdialog>',
    components: {confirmdialog},
    name: 'confirmSettings',
    data: function () {
      return {
        config: {
          title: !!config.title ? config.title : '请确认',
          okText: !!config.okText ? config.okText : '确认',
          cancelText: !!config.cancelText ? config.cancelText : '取消',
          content: '',
          styleType: !!config.type ? config.type : 0,
          beforeDestroy: !!config.beforeDestroy ? config.beforeDestroy : null,
          destroyed: !!config.destroyed ? config.destroyed : null,
          okAction: !!config.okAction ? config.okAction : null,
          cancelAction: !!config.cancelAction ? config.cancelAction : null,
        }
      }
    },
    methods: {
      confirm: function () {
        dialogClose(vm);
      }
    },
  };
  //创建一个vue元素，并挂载到一个元素上 Vue.extend() 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
  let factory = Vue.extend(confirmSettings);
  vm = new factory().$mount();
  htmlBody.appendChild(vm.$el);
}

/**
 * 删除这个弹出框，并且在vue实例中销毁
 * @param vm 弹出框实例
 */
function dialogClose(vm) {
  htmlBody.removeChild(vm.$el);
  vm.$destroy();
}
