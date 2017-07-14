//引用组件或视图

//此功能对应的视图（html）
var template = require('./appInterfaceTest.html');
var eventHelper = require('utils/eventHelper');
var serviceHelper = require('services/serviceHelper.js');

var comm = Vue.extend({
    //设置模板
    template: template,
    // data: function () {
    //     return {}
    // },
    methods: {
        btnTestClick: function () {
            var formData = {};
            formData.token = serviceHelper.getToken();
            formData.r = Math.random();
            //通过测站id获取设备和监测项
            // formData.facilityId = 35;
            //通过itemId获取实时数据
            // formData.itemIds = JSON.stringify(["TEST001"]);
            //通过itemId获取历史数据
            // formData.itemId = "TEST001";
            // formData.dateStart = "2017-04-14 16:10:00";
            // formData.dateEnd = "2017-04-14 17:30:00";
            //根据测站id获取监测数据历史预统计
            // formData.dateType = "day";

            // //获取车辆坐标
            //formData.terminalNum = "62215001";
            //获取车辆历史轨迹
            //formData.startDate = "2017-04-07";
            //formData.endDate = "2017-04-09";
            //获取车辆历史轨迹（分页信息）
            //formData.pageNum = "0";

            // //创建案件
            // formData.name = "测试0708";
            // //formData.createType = "巡查上报";
            // formData.createType = "系统预警";
            // formData.disposeDepartment = "城管局";
            // formData.description = "井盖溢水";
            // //formData.createUser = "张三";
            // formData.alarmId = 6666666;
            //
            //formData.facilityId = 16170;

            //查询案件
            //formData.validCode = "123456";

            $.ajax({
                type: "get",
                dataType: "json",
                //登录
                // url: serviceHelper.getBasicPath() + "/login/updateToken",

                //在线监控
                //获取当前用户测站
                // url: serviceHelper.getBasicPath() + "/facility/getFacilitysCurrentUser",
                //通过测站id获取设备和监测项
                // url: serviceHelper.getBasicPath() + "/device/getDeviceInfosByFacilityId",
                //通过itemId获取实时数据
                // url: serviceHelper.getBasicPath() + "/dataReal/getDataRealByItemIds",
                //通过itemId获取历史数据
                // url: serviceHelper.getBasicPath() + "/dataHistory/getDataHistoryByItemId",
                //通过测站id获取报警信息
                // url: serviceHelper.getBasicPath() + "/facility/getAlarmInfoByFacilityId",
                //根据测站id获取监测数据历史预统计
                // url: serviceHelper.getBasicPath() + "/hisStatPreset/getHisStatPresetByFacilityId",

                //获取车辆列表
                // url: serviceHelper.getBasicPath() + "/truck/getTruckList",
                //获取车辆坐标
                // url: serviceHelper.getBasicPath() + "/truck/getTruckInfo",
                //获取车辆历史轨迹（总数统计）
                // url: serviceHelper.getBasicPath() + "/truck/getTruckHistoryTrackCount",
                //获取车辆历史轨迹（分页信息）
                //url: serviceHelper.getBasicPath() + "/truck/getTruckHistoryTrack",

                //创建案件
                //url: serviceHelper.getBasicPath() + "/case/getCase",
                //url: serviceHelper.getBasicPath() + "/facility/getOneFacilityInfo",
                // url: serviceHelper.getBasicPath() + "/alarmType/getAlarmTypeTreeData",

                //登录
                url: serviceHelper.getBasicPath() + "/iotDevice/login",
                data: formData,
                success: function (ajaxResult) {
                    if (ajaxResult) {
                        if (ajaxResult.success == true) {
                            var result = ajaxResult.data;
                        } else {
                            //后台操作失败的代码
                            alert(ajaxResult.msg);
                        }
                    }
                }.bind(this)
            });
        }
    }
});

module.exports = comm;