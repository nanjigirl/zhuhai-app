var template = require('./rightPanel.html');
var controller = require('controllers/rightPanelController');
// var monitor = require('./monitor');
// var statistics = require('./statistics');
// var dateController = require('./dateControl');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var eventHelper = require('utils/eventHelper');
var detailGridHeader = [{key: 'startDate', value: '起始时间'}, {key: 'deep', value: '最大积水深度'}, {
    key: 'period',
    value: '积水时长'
}];
var realTimeUpdate = function (self, monitorObj) {
    controller.getMonitorItemCurrentValue(monitorObj, function (result) {
        // self.lastUpdateTime = moment().format('YYYY-MM-DD hh:mm:ss', new Date());
        self.$refs.monitorPlugin.$emit('update-monitor', result);
        self.$refs.statisticPlugin.$emit('update-statistic', {
            data: result,
            facility: self.facility
        });
    });
};
var refreshTime = 1000;
var currentThread;
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            msgLists:[
                {
                    children:[
                        {
                            name: '证号',
                            value: '201630002'
                        },
                        {
                            name:'临时消纳场名称',
                            value:'南宁市仙葫经济开发区五合社区消纳场'
                        }
                    ]
                },
                {
                    children:[
                        {
                            name: '地址',
                            value: '南宁市仙葫经济开发区蒲旧公路'
                        },
                        {
                            name:'有效期限',
                            value:'2016.05.20-2017.05.20'
                        }
                    ]
                },
                {
                    children:[
                        {
                            name: '联系人',
                            value: '韦绍陆'
                        },
                        {
                            name:'电话',
                            value:'18878876669'
                        }
                    ]
                },
                {
                    children:[
                        {
                            name: '行政主管部门',
                            value: '市城管局'
                        },
                        {
                            name:'分管领导',
                            value:'李军'
                        }
                    ]
                },
                {
                    children:[
                        {
                            name: '联系人',
                            value: '陈明'
                        },
                        {
                            name:'电话',
                            value:'15177925360'
                        }
                    ]
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
            waterGrade: 1,
            waterGradeTitle: '',
            heads: detailGridHeader,
            // rows: [{
            //     startDate: '2016-10-09',
            //     deep: '0.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-19',
            //     deep: '0.1m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-11-09',
            //     deep: '0.4m',
            //     period: '7h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }]
        }
    },
    computed: {
        classObject: function () {
            return {
                'one': this.waterGrade === 1,
                'two': this.waterGrade === 2,
                'three': this.waterGrade === 3,
                'four': this.waterGrade === 4,
                'five': this.waterGrade === 5,
                'six': this.waterGrade === 6
            }
        }
    },
    mounted: function () {
        eventHelper.on('monitor-status', function (status) {
            this.alarmStatus = status;
        }.bind(this));
        this.$on('query-history', function (date) {
            // controller.getHistoricalDataByMonitor(this.waterLevelID ,date.startDate,date.endDate,function(result){
            this.$refs.statisticPlugin.$emit('init-statistic-history', {
                facility: this.facility,
                date: date
            });
        });
        eventHelper.on('current-grade', function (grade) {
            this.waterGrade = grade.grade;
            this.waterGradeTitle = grade.title;
        }.bind(this));
        eventHelper.on('close-right-panel', function () {
            this.closePanel();
        }.bind(this));
        this.initHKVideo();
    },
    methods: {
        newCarOpen:function () {
            window.open("http://19.2.81.254:66/Service/dv?device_code=1000001,1000000");
        },
        initHKVideo: function () {
            var ip = "180.139.134.6";
            var port = "443";
            var username = "admin";
            var password = "Wmdx1234";
            var CameraIndexCodeArray = "001642|001646|001647|001644|001643|001645|001680".split("|");

            function LoginPlat() {
                //alert("LoginPlat()");
                var cameraCount = 1;
                if (CameraIndexCodeArray.length == 1) {
                    cameraCount = 1;
                } else if (1 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 4) {
                    cameraCount = 2;
                } else if (4 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 9) {
                    cameraCount = 3;
                } else if (9 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 16) {
                    cameraCount = 4;
                } else if (16 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 25) {
                    cameraCount = 5;
                } else {
                    cameraCount = 3;
                }
                OCX.SetLayoutType(cameraCount);

                var v1 = "<?xml version=\"1.0\" encoding=\"utf-8\"?><LoginInfo><LoginType>2</LoginType><SynLogin>1</SynLogin><IP>" + ip + "</IP><Port>" + port + "</Port><UserName>" + username + "</UserName><Password>" + password + "</Password></LoginInfo>";

                var v = OCX.LoginPlat(v1);
                if (v != 0)
                    alert("登录失败，请查看日志preview.log");
            }

//新的预览接口，需先登录平台，登录需要耗点时间，稍等（控件自身取Token）
            function StartPreview() {
                //alert("StartPreview()");
                $(CameraIndexCodeArray).each(function (index, item) {
                    var _param = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Preview><CamIndexCode>" + item + "</CamIndexCode></Preview>";
                    OCX.StartPreviewByIndex(_param, index);
                });
            }

            setTimeout(function () {
                //alert("mmp");
                LoginPlat();
                StartPreview();
            }, 1000);
        },
        initGDVideo: function () {

        },
        initJJVideo: function () {

        },
        handleSelect: function () {
            console.log('select');
        },
        closePanel: function () {
            eventHelper.emit('right-panel-close');
            this.reset();
        },
        reset: function () {
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
            this.$nextTick(function () {
                this.activeIndex = '1';
                this.facility = facility;
                if (!!this.$refs.monitorPlugin) {
                    this.$refs.monitorPlugin.$emit('reset');
                }
                var facilityID = facility.id.substring(1);
                if (facilityID == '35') {
                    this.facilityType = 'ylz';
                    this.facilityPic = '../src/img/yuliang.jpg';
                } else if (facilityID == '36') {
                    this.facilityType = 'xs';
                    this.facilityPic = '../src/img/xushui.jpg';
                } else if (facilityID == '37') {
                    this.facilityType = 'hd';
                    this.facilityPic = '../src/img/hedao.jpg';
                }
                this.facilityName = facility.item.name;
                facilityController.getDeviceDetailByFacility(facilityID, function (result) {
                    console.log(result);
                    if (!!result.pics && result.pics.length > 0) {
                        this.facilityPic = serviceHelper.getPicUrl(result.pics[0].url);
                    }
                    if (result.devices.length > 0) {
                        var monitorIDs = [];
                        var monitors = [];
                        result.devices.forEach(function (device) {
                            device.items.forEach(function (monitor) {
                                if (monitor.itemTypeName === 'Precipitation') {
                                    monitorIDs.push(monitor.RainfalldurationID);
                                }
                                else if (monitor.itemTypeName === 'waterLevel') {
                                    self.waterLevelID = monitor.itemID;
                                }
                                monitorIDs.push(monitor.itemID);
                                monitors.push(monitor);
                            });
                        });
                        realTimeUpdate(this, monitorIDs);
                        currentThread = setInterval(function () {
                            realTimeUpdate(this, monitorIDs);
                        }.bind(this), refreshTime);
                    }
                    // this.$refs.monitorPlugin.$emit('init-monitor', {
                    //     facility: facility,
                    //     devices: result.devices
                    // });
                    // this.$refs.statisticPlugin.$emit('init-statistic', {
                    //     facility: facility,
                    //     devices: result.devices
                    // });

                    // this.lastUpdateTime = result.currentDate;
                }.bind(this));

                facilityController.getAlarmInfoByFacility(facilityID, function (result) {
                    console.log(result);
                    if (!!result && result.length > 0) {
                        result.forEach(function (alarmItem) {
                            if (!!alarmItem.isAlarm) {
                                this.$refs.monitorPlugin.$emit('monitor-alarm', {
                                    facility: facility,
                                    alarmItem: alarmItem
                                });
                                this.alarmStatus = 2;
                                this.alertMessage = '正在报警';
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }.bind(this));

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
            // this.$refs.monitorPlugin.$emit('switchMode', this.isRealTimeMode);
            // this.$refs.statisticPlugin.$emit('switchMode', this.isRealTimeMode);
            // if (!this.isRealTimeMode) {
            //     //query by default date
            //     // this.$refs.dateController.queryByDefaultDate();
            // }
        }
    },
    components: {
        // monitor: monitor,
        // statistics: statistics,
        // dateControl: dateController
    }
});
module.exports = comm;