//引用组件或视图

//此功能对应的视图（html）
var template = require('./containerDeviceType.html');
//用于获取token，url头部等
var serviceHelper = require('services/serviceHelper.js');
//增删改列表容器（代表一个表格的列表）
var container = require('modules/common/crud/listContainer');

var comm = container.extend({
    //设置模板
    template: template,
    data: function () {
        return {
            //列表id，同一页面如果有多个实体列表需要修改
            tableId: "tableDeviceType",
            //表单（弹窗）id，同一页面如果有多个实体列表需要修改
            formId: "formDeviceType",
            //当前测站类型id
            currentFacilityTypeId: 0,
            //控制列表是否显示（此属性在容器基类），子表默认不显示
            showList: false,
            //上一级列表的容器（用于返回）
            lastContainer: null,
            //是否添加默认的操作列（当需要自定义操作列的功能时可以设为false）
            addDefaultOperateColumn: false,
        }
    },
    methods: {
        getCustomQueryParam: function () {
            var formData = {};
            //查询前把当前主表id传到后台，列表查询用到
            formData.facilityTypeId = this.currentFacilityTypeId;

            return formData;
        },
        getCustomSaveValue: function () {
            var formData = {};
            //保存前把当前主表id传到后台，保存时用到
            formData.facilityTypeId = this.currentFacilityTypeId;

            return formData;
        },
        //返回上一列表
        backToLastList: function () {
            //把上一列表显示
            this.lastContainer.showList = true;
            //隐藏当前列表
            this.showList = false;
        },
        //初始化容器
        initContainer: function (vm) {
            this.init(vm, "/deviceType", [{
                //checkbox列，用于勾选多选行
                field: 'state',
                checkbox: 'true'
            }, {
                field: 'name',
                title: '名称'
            }, {
                field: 'nameCn',
                title: '中文名'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                //点击事件
                events: {
                    //事件字符串格式：click .+a的class名称
                    'click .edit': function (e, value, row, index) {
                        //编辑
                        this.edit(row.id);
                    }.bind(this),
                    'click .delete': function (e, value, row, index) {
                        //删除（一条）
                        this.deleteOne(row.id);
                    }.bind(this),
                    'click .itemType': function (e, value, row, index) {
                        this.vm.showItemTypeList(e, value, row, index);
                    }.bind(this),
                    'click .deviceTypeField': function (e, value, row, index) {
                        this.vm.showDeviceTypeFieldList(e, value, row, index);
                    }.bind(this),
                    'click .deviceRelateType': function (e, value, row, index) {
                        this.vm.showDeviceRelateTypeList(e, value, row, index);
                    }.bind(this),
                },
                //操作类的内容
                formatter: function (value, row, index) {
                    return [
                        '<a class="itemType" href="javascript:;">',
                        '监测项类型',
                        '</a>  ',
                        '<a class="deviceTypeField" href="javascript:;">',
                        '设备类型字段',
                        '</a>  ',
                        '<a class="deviceRelateType" href="javascript:;">',
                        '设备关联类型',
                        '</a>  ',
                        '<a class="edit" href="javascript:;" title="编辑">',
                        '<i class="glyphicon glyphicon-edit"></i>',
                        '</a>  ',
                        '<a class="delete" href="javascript:;" title="删除">',
                        '<i class="glyphicon glyphicon-remove"></i>',
                        '</a>'
                    ].join('');
                }
            }]);
        }
    }
});

module.exports = comm;