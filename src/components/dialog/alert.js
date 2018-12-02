import Vue from 'vue';
import alert from './Alert.vue';

let htmlBody = document.body;
export default function showAlert(config) {
  let vm = null;
  let alertSettings = {
    name: 'alertSettings',
    data: function () {
      return {
        config: {
          title: !!config.title ? config.title : '提示',
          okText: !!config.okText ? config.okText : '确定',
          content: '测试测试测试测试',
          styleType: !!config.type ? config.type : 0,
          beforeDestroy: !!config.beforeDestroy ? config.beforeDestroy : null,
          destroyed: !!config.destroyed ? config.destroyed : null,
          okAction: !!config.okAction ? config.okAction : null,
          width:config.width || '350px',
          height:config.height || '250px',
          style:config.style || null,
        },
      }
    },
    methods: {
      confirm: function () {
        dialogClose(vm);
      }
    },
    template: '<alert @confirm="confirm" :config="config"></alert>',
    components: {alert},
  };
  //创建一个vue元素，并挂载到一个元素上 Vue.extend() 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
  let factory = Vue.extend(alertSettings);
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
