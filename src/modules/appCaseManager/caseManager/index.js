//引用组件或视图

//此功能对应的视图（html）
var template = require('./caseManager.html');
//用于获取token，url头部等
var serviceHelper = require('services/serviceHelper.js');
//增删改列表基类
var crudBase = require('modules/common/crud/crudBase');
//增删改列表容器（代表一个表格的列表）
var container = require('modules/common/crud/listContainer');

var comm = crudBase.extend({
    //设置模板
    template: template,
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
            },
            methods: {
                //获取自定义查询条件
                getCustomQueryParam: function () {
                    //返回结果的类型是object
                    var formData = {};
                    //可以通过如下方式添加任意值
                    formData.name = this.containerMain.toolbarQueryParam.name;

                    return formData;
                }.bind(this),
            }
        });
    },
    mounted: function () {
        //容器初始化，初始化必须在页面加载完成，也就是mounted时触发
        //参数：this（传入全局vue对象）；controller的url；grid的列头设置
        this.containerMain.init(this, "/case", [{
            //列绑定数据的属性的名称
            field: 'name',
            //列的显示名称
            title: '案件名称'
        }, {
            field: 'createType',
            title: '案件创建类型'
        }, {
            field: 'disposeDepartment',
            title: '处置部门名称'
        }, {
            field: 'createDate',
            title: '创建时间'
        }, {
            field: 'flowState',
            title: '案件流程状态'
        }]);

        //刷新列表
        this.containerMain.refreshList();
    },
    methods: {}
});

module.exports = comm;