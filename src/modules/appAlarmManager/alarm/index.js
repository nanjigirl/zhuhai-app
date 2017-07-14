//引用组件或视图

//此功能对应的视图（html）
var template = require('./alarm.html');
//用于获取token，url头部等
var serviceHelper = require('services/serviceHelper.js');
//增删改列表基类
var crudBase = require('modules/common/crud/crudBase');
//增删改列表容器（代表一个表格的列表）
var container = require('modules/common/crud/listContainer');

var comm = crudBase.extend({
    //设置模板
    template: template,
    // data: function () {
    //     return {}
    // },
    created: function () {
        //列表容器定义，一个容器代表一个表的编辑，有子表就要为子表设置容器
        //默认容器叫containerMain，第二个后之后的容器名称自己命名
        //容器必须要在created时new，而不能在mounted，否则vue绑定会有错
        this.containerMain = new container({
            data: function () {
                return {
                    //是否添加默认的操作列（当需要自定义操作列的功能时可以设为false）
                    addDefaultOperateColumn: false,

                    toolbarQueryParam:{name:''},
                }
            }
        });

    },
    mounted: function () {
        //容器初始化，初始化必须在页面加载完成，也就是mounted时触发
        //参数：this（传入全局vue对象）；controller的url；grid的列头设置
        this.containerMain.init(this, "/alarm", [{
            //checkbox列，用于勾选多选行
            field: 'state',
            checkbox: 'true'
        }, {
            //列绑定数据的属性的名称
            field: 'alarmType1',
            //列的显示名称
            title: '预警类型1'
        }, {
            field: 'alarmType2',
            title: '预警类型2'
        }, {
            field: 'alarmType3',
            title: '预警类型3'
        }, {
            field: 'realTimeValue',
            title: '检测值'
        }, {
            field: 'alarmLimitValue',
                title: '预警超限'
        }, {
            field: 'description',
                title: '描述'
        }, {
            field: 'alarmDate',
                title: '预警时间'
        }]);

        //刷新列表
        this.containerMain.refreshList();
    },
    methods: {}
});

module.exports = comm;