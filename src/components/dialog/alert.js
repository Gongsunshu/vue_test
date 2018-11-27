import Vue from 'vue';
import alert from './alert.vue';

let htmlBody = document.body;
export default function showAlert(text,title='提示', menu_value='确认'){
  return new Promise((resolve,reject)=>{
    let vm = null;
    let alertSettings = {
      name:'alertSettings',
      data:function(){
        return {
          'config':{
            title: title,
            text: text,
            menu_value: menu_value,
            type:0,
            style:{},
            beforeDestroy:function () {

            },
            destroyed:function () {

            },
          }
        }
      },
      methods:{
        confirm() {
          console.log('弹出框消失');
          this.show = false;
          resolve(true);
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
  });
}

/**
 * 删除这个弹出框，并且在vue实例中销毁
 * @param vm 弹出框实例
 */
function dialogClose(vm){
  htmlBody.removeChild(vm.$el);
  vm.$destroy();
}
