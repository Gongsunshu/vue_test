<template>
  <div>
    <TableBox :config="table_box_config">
    </TableBox>
  </div>
</template>

<script>
  import TableBox from "./TableBox";

  export default {
    name: "TestVue",
    components: {TableBox},
    methods: {},
    beforeMount: function () { //在组件被正式渲染前执行

    },
    data: function () {
      return {
        table_box_config: {
          url: '',//table数据查询接口
          undefinedText: '',//当数据为 undefined 时显示的字符，所有的数据统一设置
          id: true,//是否显示序列号，默认是1，2，3，4，也可以是数据中的某一个property
          columns: [
            {
              text: '归属地', id: 'gsd',
              menu: [{// 每一行的操作按
                text: '操作',
                action: function (d, index, row) {
                  //具体动作，选中某一行之后进行的操作

                },
                icon: '',//按钮图标
                background_color: '',//按钮背景色
              }],
              default: '未知',//当数据为 undefined 时显示的字符，某一行的单独设置
              formatter: function (d, index, row) {//格式化这个数据，传入三个值，一个数据的旧值，一个索引，一个当前行数据；返回一个经处理后的数据，可以是一个标准HTML
                return '<span style="color: red">' + d + '</span>';
              },
            },
            {
              text: '详细地址', id: 'custAddr', menu: {
                text: '操作', action: function () {
                }
              },
            },
            {
              text: '角色', id: 'custType', menu: function f() {
              },
            },
            {
              text: '顾客名', id: 'custName', menu: function f() {
              },
            },
            {
              text: '手机号码', id: 'custPhone', menu: function f() {
              },
            },
            {
              text: '来源', id: 'orderSrc', menu: function f() {
              },
            },
            {
              text: '订单号', id: 'orderId', menu: function f() {
              },
            },
          ],//table 具体标题
          total: 'data.data.totalPages',//总页数function，如何从响应中取出数据与总页数
          rows: 'data.data.rows',//后台返回的数据key
          page_size: 5,//每页页数，默认10
          params: {},//查询参数
          skip_page: true,//是否开启跳页
          ext_style: {},//表格附加样式.
          // data: function (response) {
          //   if (response.data.success) {
          //     return {
          //       rows: response.data.data.rows,
          //       total: response.data.data.total,
          //     }
          //   } else {
          //
          //   }
          // },//异步从后台取出数据时，需要是函数，返回total_page与rows；
          data: [{
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          },{
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          }, {
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          }, {
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          }, {
            "custAddr": "山东省枣庄市中区山东省枣庄市市中区文化路街道文化东路国泰花园[FTTH]",
            "custName": "邓晓宁",
            "custPhone": "15562225306",
            "custType": "实体轻触点",
            "gsd": "枣庄",
            "orderId": "20181103094718423153",
            "orderSrc": "实体轻触点",
          }, {
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          }, {
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          }, {
            "custAddr": "山东省青岛0532",
            "custName": "潘凯旋",
            "custPhone": "13260333724",
            "custType": "实体轻触点",
            "gsd": "青岛",
            "orderId": "20181103112718714769",
            "orderSrc": "沃扫码",
          }, {
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          }, {
            "custAddr": "阿斯建档立卡手机类的",
            "custName": "全进口",
            "custPhone": "1289812938912",
            "custType": "1891892",
            "gsd": "枣庄",
            "orderId": "201811261615281289129",
            "orderSrc": "省考江苏看",
          }],
          async: false,//是否异步从后端加载数据
          showRefresh: true,//是否显示刷新按钮
          choose: true, //选择某一些行的数据后，进行一些操作
          // ajax: function () {//自定义的获取后台表格数据方法
          //
          // },//自定义ajax方法
          contentType: '',// 发送到服务器的数据编码类型
          dataType: "",//服务器返回的数据类型,
          ajaxOptions: "",//向服务器提交请求时，使用的附加配置
          method: "",
          clickToSelect: true,//是否启用点击选中行
          toolbar: '',//使用什么组件作为这个表格的工具栏，可以添加额外按钮
          rowMenu: { //对于每一行的操作按钮
            title: '操作',
            menuGroup: [{// 每一行的操作，数组格式
              name: '详情',
              action: function (row, index) {
                //具体动作，选中某一行之后进行的操作
                console.log(row);
                console.log(index);
              },
              class: ['button-action'],//按钮样式， button-action button-primary button-highlight button-caution button-royal
              style: {
                // 'color':'red',
              },//额外的样式
            },
              {//导航栏的操作按钮
                name: '添加',
                action: function (row, index) {
                  //具体动作，选中某一行之后进行的操作
                  console.log(row);
                  console.log(index);
                },
                class: ['button-highlight'],//按钮样式， button-action button-primary button-highlight button-caution button-royal
                style: {
                  // 'color':'red',
                },

              }],
          },
          navButton: [{//导航栏的操作按钮
            name: '添加',
            action: function (checked, rows) {
              //具体动作，选中某一行之后进行的操作
              console.log(checked);
              console.log(rows);
            },
            class: ['button-highlight'],//按钮样式， button-action button-primary button-highlight button-caution button-royal
            style: {
              // 'color':'red',
            },

          }, {//导航栏的操作按钮
            name: '更新',
            action: function (checked, rows) {
              //具体动作，选中某一行之后进行的操作
              console.log(checked);
              console.log(rows);
            },
            class: ['button-caution'],//按钮样式， button-action button-primary button-highlight button-caution button-royal
            style: {
              // 'color':'red',
            },

          }],
        },
      }
    },
  }

  function get_params() {
    return {};
  }
</script>

<style scoped>

</style>
