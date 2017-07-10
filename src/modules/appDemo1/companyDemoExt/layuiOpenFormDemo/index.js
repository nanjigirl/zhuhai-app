//bootstrap的js
require('bootstrap/dist/js/bootstrap.js');

//此功能对应的视图（html）
var template = require('./layuiOpenFormDemo.html');
var serviceHelper = require('services/serviceHelper.js');

// Vue.extend实现vue组件
module.exports = Vue.extend({
    //设置模板
    template: template,
    //vue组件外部给组件内部传值使用props
    props: ["companyName"],
    data: function () {
        return {
            //当前整个html元素的id，考虑到页面内可能同时存在多个这个控件，因此id随机生成，保证不重复
            //需要id是因为bootstrap的model弹窗是基于jquery实现的
            divId: "div" + Math.random().toString(36).substr(2),
            //选择后的回调
            okHandler: null,
            //layui弹窗的索引（作为弹窗的唯一标识）
            layuiIndex: "",
        }
    },
    created: function () {

    },
    mounted: function () {

    },
    methods: {
        //初始化
        init: function () {

        },
        //弹窗
        showForm: function () {
            //打开layui弹窗
            this.layuiIndex = layer.open({
                //layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                type: 1,
                title: "layui弹窗demo",
                //此demo的内容是使用当前页面某个dom作为弹窗里面的内容，用这种为了可以用vue绑定（而嵌入iframe、动态加载html内容不可以）
                content: $("#" + this.divId),
                //默认大小（宽和高）
                // area: ['320px', '195px'],
                //是否显示最大化按钮
                maxmin: true,
                //弹窗成功打开回调
                success: function (layero, index) {

                }
            });
            //把弹窗最大化
            layer.full(this.layuiIndex);
        },
        //关闭窗体
        hideForm: function () {
            //关闭弹窗
            layer.close(this.layuiIndex);
        },
        //确定按钮点击事件
        okClick: function () {
            //调用选择后回调函数
            if (this.okHandler) {
                this.okHandler(this.companyName);
            }
            //关闭窗体
            this.hideForm();
        }
    }
});