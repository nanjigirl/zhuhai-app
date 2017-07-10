//引用组件或视图

//此功能对应的视图（html）
var template = require('./facilityType.html');
//用于获取token，url头部等
var serviceHelper = require('services/serviceHelper.js');
//增删改列表基类
var crudBase = require('modules/common/crud/crudBase');
//增删改列表容器（代表一个表格的列表）
var container = require('modules/common/crud/listContainer');

//测站类型字段
var containerFacilityTypeField = require('modules/appFacilityManager/facilityType/containerFacilityTypeField');
//测站关联类型
var containerFacilityRelateType = require('modules/appFacilityManager/facilityType/containerFacilityRelateType');
//设备类型
var containerDeviceType = require('modules/appFacilityManager/facilityType/containerDeviceType');
//设备类型字段
var containerDeviceTypeField = require('modules/appFacilityManager/facilityType/containerDeviceTypeField');
//设备关联类型
var containerDeviceRelateType = require('modules/appFacilityManager/facilityType/containerDeviceRelateType');
//监测项类型
var containerItemType = require('modules/appFacilityManager/facilityType/containerItemType');
//监测项类型字段
var containerItemTypeField = require('modules/appFacilityManager/facilityType/containerItemTypeField');

var comm = crudBase.extend({
    //设置模板
    template: template,
    // data: function () {
    //     return {

    //     }
    // },
    components: {
        //测站类型字段
        'containerFacilityTypeField': containerFacilityTypeField,
        //测站关联类型
        'containerFacilityRelateType': containerFacilityRelateType,
        //设备类型
        'containerDeviceType': containerDeviceType,
        //设备类型字段
        'containerDeviceTypeField': containerDeviceTypeField,
        //设备关联类型
        'containerDeviceRelateType': containerDeviceRelateType,
        //监测项类型
        'containerItemType': containerItemType,
        //监测项类型字段
        'containerItemTypeField': containerItemTypeField,
    },
    created: function () {
        //列表容器定义，一个容器代表一个表的编辑，有子表就要为子表设置容器
        //默认容器叫containerMain，第二个后之后的容器名称自己命名
        //容器必须要在created时new，而不能在mounted，否则vue绑定会有错
        this.containerMain = new container({
            data: function () {
                return {
                    //是否添加默认的操作列（当需要自定义操作列的功能时可以设为false）
                    addDefaultOperateColumn: false,
                }
            }
        });
    },
    mounted: function () {
        //由于此功能子表太多，因此除了主表以外其他表都封装成组件
        //子表组件对象即容器，此处把组件赋值回容器的属性，保留原来“容器”的设计模式
        //测站类型字段
        this.containerFacilityTypeField = this.$refs.containerFacilityTypeField1;
        //初始化
        this.containerFacilityTypeField.initContainer(this);
        //测站关联类型
        this.containerFacilityRelateType = this.$refs.containerFacilityRelateType1;
        this.containerFacilityRelateType.initContainer(this);
        //设备类型
        this.containerDeviceType = this.$refs.containerDeviceType1;
        this.containerDeviceType.initContainer(this);
        //设备类型字段
        this.containerDeviceTypeField = this.$refs.containerDeviceTypeField1;
        this.containerDeviceTypeField.initContainer(this);
        //设备关联类型
        this.containerDeviceRelateType = this.$refs.containerDeviceRelateType1;
        this.containerDeviceRelateType.initContainer(this);
        //监测项类型
        this.containerItemType = this.$refs.containerItemType1;
        this.containerItemType.initContainer(this);
        //监测项类型字段
        this.containerItemTypeField = this.$refs.containerItemTypeField1;
        this.containerItemTypeField.initContainer(this);

        //容器初始化，初始化必须在页面加载完成，也就是mounted时触发
        //参数：this（传入全局vue对象）；controller的url；grid的列头设置
        this.containerMain.init(this, "/facilityType", [{
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
                }.bind(this.containerMain),
                'click .delete': function (e, value, row, index) {
                    //删除（一条）
                    this.deleteOne(row.id);
                }.bind(this.containerMain),
                'click .deviceType': function (e, value, row, index) {
                    this.vm.showDeviceTypeList(e, value, row, index);
                }.bind(this.containerMain),
                'click .facilityTypeField': function (e, value, row, index) {
                    this.vm.showFacilityTypeFieldList(e, value, row, index);
                }.bind(this.containerMain),
                'click .facilityRelateType': function (e, value, row, index) {
                    this.vm.showFacilityRelateTypeList(e, value, row, index);
                }.bind(this.containerMain),
            },
            //操作类的内容
            formatter: function (value, row, index) {
                return [
                    '<a class="deviceType" href="javascript:;">',
                    '设备类型',
                    '</a>  ',
                    '<a class="facilityTypeField" href="javascript:;">',
                    '测站类型字段',
                    '</a>  ',
                    '<a class="facilityRelateType" href="javascript:;">',
                    '测站关联类型',
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

        //刷新列表
        this.containerMain.refreshList();
    },
    methods: {
        /**
         * 跳转到下一列表
         * @param row
         * @param containerThis 当前列表容器
         * @param containerNext 下一列表容器
         * @param fkFieldName 下一列表容器字段名
         */
        showNextList: function (row, containerThis, containerNext, fkFieldName) {
            //隐藏当前列表
            containerThis.showList = false;
            //显示下一列表
            containerNext.showList = true;

            //对下一列表容器赋值外键
            containerNext[fkFieldName] = row.id;
            //对下一列表容器赋值当前列表容器
            containerNext.lastContainer = containerThis;
            //刷新下一列表
            containerNext.refreshList();
        },
        //测站类型跳转到设备类型列表
        showDeviceTypeList: function (e, value, row, index) {
            this.showNextList(row, this.containerMain, this.containerDeviceType, "currentFacilityTypeId");
            //
            // //隐藏测站类型列表
            // this.containerMain.showList = false;
            // //显示设备类型列表
            // this.containerDeviceType.showList = true;
            //
            // //给设备类型容器赋值当前测站类型id
            // this.containerDeviceType.currentFacilityTypeId = row.id;
            // //给设备类型赋值上一列表的容器
            // this.containerDeviceType.lastContainer = this.containerMain;
            // //刷新设备类型列表
            // this.containerDeviceType.refreshList();
        },
        //测站类型跳转到测站类型字段列表
        showFacilityTypeFieldList: function (e, value, row, index) {
            this.showNextList(row, this.containerMain, this.containerFacilityTypeField, "currentFacilityTypeId");
        },
        //测站类型跳转到测站关联类型列表
        showFacilityRelateTypeList: function (e, value, row, index) {
            this.showNextList(row, this.containerMain, this.containerFacilityRelateType, "currentFacilityTypeId");
        },
        //设备类型跳转到监测项类型列表
        showItemTypeList: function (e, value, row, index) {
            this.showNextList(row, this.containerDeviceType, this.containerItemType, "currentDeviceTypeId");
        },
        //设备类型跳转到设备类型字段列表
        showDeviceTypeFieldList: function (e, value, row, index) {
            this.showNextList(row, this.containerDeviceType, this.containerDeviceTypeField, "currentDeviceTypeId");
        },
        //设备类型跳转到设备关联类型列表
        showDeviceRelateTypeList: function (e, value, row, index) {
            this.showNextList(row, this.containerDeviceType, this.containerDeviceRelateType, "currentDeviceTypeId");
        },
        //监测项类型跳转到监测项类型字段列表
        showItemTypeFieldList: function (e, value, row, index) {
            this.showNextList(row, this.containerItemType, this.containerItemTypeField, "currentItemTypeId");
        },
    }
});

module.exports = comm;