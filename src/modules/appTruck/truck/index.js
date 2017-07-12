//引用组件或视图

//此功能对应的视图（html）
var template = require('./truck.html');
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
            watch: {
                currentEntity: function (val) {
                    if (val && val.id && val.id > 0) {

                    }
                    else {
                        //新建时的默认值
                        //是否黑名单
                        val.inBlackList = "false";
                        //是否显示
                        val.display = "true";
                    }
                },
            },
            methods: {
                //同步车辆数据
                syncFromGps: function () {
                    layer.confirm('此功能会修改车辆数据，且执行时间可能较长，确定开始？', {
                        //定义按钮，可以多个
                        btn: ['确定', '取消']
                        //接下来是每个按钮的回调函数，一般有一个按钮就有几个回调
                        //参数1是弹窗的index，可以用此标识弹窗
                    }, function (index) {
                        //关闭弹窗（代码关闭弹窗的方法，但有时不用这句都会自己关闭，原因不明）
                        layer.close(index);

                        //formData存放传入参数
                        var formData = {};
                        //在此系统，所有后台请求都要传入token进行认证
                        formData.token = serviceHelper.getToken();
                        //加随机数防止浏览器缓存
                        formData.r = Math.random();

                        //loading效果
                        var index = layer.load(0, {shade: [0.3, '#000']});

                        $.ajax({
                            type: "get",
                            dataType: "json",
                            url: serviceHelper.getBasicPath() + this.controllerUrl + "/syncFromGps",
                            data: formData,
                            success: function (ajaxResult) {
                                //关闭loading效果
                                layer.close(index);

                                if (ajaxResult) {
                                    if (ajaxResult.success == true) {
                                        //ajaxResult.data是返回的数据
                                        this.refreshList();
                                    } else {
                                        //后台操作失败的代码
                                        alert(ajaxResult.msg);
                                    }
                                }
                            }.bind(this)
                        });
                    }.bind(this), function () {

                    }.bind(this));
                },
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
        this.containerMain.init(this, "/truck", [{
            //checkbox列，用于勾选多选行
            field: 'state',
            checkbox: 'true'
        }, {
            field: 'terminalNum',
            title: '车辆终端编号'
        }, {
            field: 'truckNum',
            title: '车牌号'
        },
        //     {
        //     field: 'truckType',
        //     title: '车辆类型'
        // }, {
        //     field: 'licenseType',
        //     title: '牌照类型'
        // }, {
        //     field: 'driver',
        //     title: '驾驶员'
        // },
            {
            field: 'company',
            title: '所属单位'
        }, {
            field: 'inBlackList',
            title: '是否黑名单'
        }, {
            field: 'display',
            title: '是否显示'
        }]);

        //刷新列表
        this.containerMain.refreshList();
    },
    methods: {}
});

module.exports = comm;