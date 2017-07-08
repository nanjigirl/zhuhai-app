var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var eventHelper = require('utils/eventHelper');
var historySearchServices = require('services/historySearchServices');
var refreshTime = 1000;
var currentThread;
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            carData: {
                num: '',
                type:'',
                dateStart:'',
                dateEnd:''
            },
            carLists:[
                {
                    num:'桂AD2375',
                    name:'南宁泰斗运输信息咨询有限公司（渣土）',
                }
            ],
            datatheads:[' ','车辆编号','车辆公司'],
            historyTableHead:['车辆编号','车辆公司','操作'],
            carLists1:[
                {
                    num:'桂AD2375',
                    name:'南宁泰斗运输信息咨询有限公司（渣土）',
                }
            ],
            rightPanelOpen: false,
            isRealTimeMode: true,
            realTimeName: '实时监测',
            historyName: '历史记录',
            // lastUpdateTime: '',
            alarmStatus: 0,
            alertMessage: '',
            activeIndex: '1',
            facilityPic: '../src/img/combImg.png',
            facilityName: '',
            selectedMode: '',
            facilityType: '',
            search: {
                dateStart:'',
                dateEnd:''
            },
            rules: {
                dateStart: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                dateEnd: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
    },
    mounted: function () {
        this.queryCarData();
        this.getTerminalNum();
        eventHelper.on('close-right-panel', function () {
            this.closePanel();
        }.bind(this));
        eventHelper.on('openHistoryPanel', function () {
           this.rightPanelOpen = true;
        }.bind(this));
        // this.initGDVideo();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    this.$refs[formName].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getTerminalNum:function(){
            historySearchServices.getCarListData(function (data) {//获取车辆终端号
                var terminalNum = [];
                if (!!data) {

                }
                data.forEach(function (menu) {
                    terminalNum.push(menu.terminalNum);
                });
                // console.log(terminalNum);
                return terminalNum;
            });
        },
        queryCarData: function () {
            var self = this;
            historySearchServices.getCarListData(function (data) {//获取后台车辆信息数据
                if (!!data) {
                    self.carLists.splice(0);
                    self.carLists1.splice(0);
                }
                data.forEach(function (menu) {
                    self.carLists.push({
                        num: menu.truckNum,
                    });
                })
                // for(var i = 0;i<10;i++){
                //     self.carLists.push({
                //         num:data[i].truckNum
                //     });
                // }
                for(var i = 0;i<10;i++){
                    self.carLists1.push({
                        num:data[i].truckNum
                    });
                }
            });
        },
        handleSelect: function () {
            console.log('select');
        },
        closePanel: function () {
            eventHelper.emit('right-panel-close');
            this.reset();
        },
        reset: function () {
            //this.stopJJVideo();
            this.rightPanelOpen = false;
            this.isRealTimeMode = true;
            this.activeIndex = '1';
        },
        open: function (facility) {
            eventHelper.emit('isLoading');
            var self = this;
            clearInterval(currentThread);
            if (!this.isRealTimeMode) {
                $('#historicalMode').removeClass('is-active');
                setTimeout(function () {
                    $('#realTimeMode').addClass('is-active');
                }.bind(this), 100);
            }
            this.isRealTimeMode = true;
            this.rightPanelOpen = true;
        },
        switchMode: function (key, keyPath) {
            this.isRealTimeMode = key === '1';
            if (!this.isRealTimeMode) {
                eventHelper.emit('isLoading');
                $('#realTimeMode').removeClass('is-active');
                $('#historicalMode').addClass('is-active');
            }
            else {
                $('#historicalMode').removeClass('is-active');
                $('#realTimeMode').addClass('is-active');
            }
        }
    },
    components: {
    }
});
module.exports = comm;
// var template = require('./content.html');
// var eventHelper = require('../../utils/eventHelper');
// var controller = require('controllers/rightPanelController');
// var facilityController = require('controllers/facilityController');
// var serviceHelper = require('services/serviceHelper');
// var moment = require('moment');
// var historySearchServices = require('services/historySearchServices');
//
// // 定义组件
// var comm = Vue.extend({
//     template: template,
//
//     data: function () {
//         return {
//             rightPanelOpen: false,
//             carData: {
//                 num: '',
//                 type:'',
//                 dateStart:'',
//                 dateEnd:''
//             },
//             datatheads:['车辆编号','车队名称','驾驶员','定位状态','在线状态','更新时间','查看历史'],
//             carLists:[
//                 {
//                     num:'桂AD2375',
//                     name:'南宁泰斗运输信息咨询有限公司（渣土）'
//                     ,driver:'张晓春',
//                     positionStatus:'定位有效',
//                     onlineStatus:'在线',
//                     updateTime:'2017-06-03 10:27:02',
//                     history:'车辆追踪'
//                 }
//             ],
//             dialogFormVisible: false,
//         }
//     },
//
//
//     methods: {
//         queryCarData: function () {
//             var self = this;
//             historySearchServices.getCarListData(function (data) {
//                 if (!!data) {
//                     self.carLists.splice(0);
//                 }
//                 data.forEach(function (menu) {
//                     self.carLists.push({
//                         num: menu.truckNum,
//                     });
//                 })
//             });
//         },
//     },
//     mounted: function () {
//         eventHelper.on('openHistoryDialog', function () {
//             this.dialogFormVisible = true;
//         }.bind(this));
//         this.queryCarData();
//         // this.queryOrders();
//         // this.queryMenus();
//         // this.queryEmployee();
//         // this.$refs.selectOnne.$on('change',function (event) {
//         //     console.log(event);
//         // })
//     },
//     components: {},
//     computed: {
//
//
//     }
// });
// module.exports = comm;