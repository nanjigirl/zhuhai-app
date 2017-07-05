var template = require('./rightPanel.html');
var controller = require('controllers/rightPanelController');
// var monitor = require('./monitor');
// var statistics = require('./statistics');
var dateController = require('./dateControl');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var eventHelper = require('utils/eventHelper');
var detailGridHeader=[{key:'startDate',value:'起始时间'},{key:'deep',value:'最大积水深度'},{key:'period',value:'积水时长'}];
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
            waterGradeTitle:'',
            heads:detailGridHeader,
            rows:[{
                startDate:'2016-10-09',
                deep:'0.4m',
                period:'6h'
            },{
                startDate:'2016-10-19',
                deep:'0.1m',
                period:'6h'
            },{
                startDate:'2016-11-09',
                deep:'0.4m',
                period:'7h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            },{
                startDate:'2016-10-29',
                deep:'1.4m',
                period:'6h'
            }]
        }
    },
    computed:{
        classObject:function(){
            return{
                'one':this.waterGrade === 1,
                'two':this.waterGrade === 2,
                'three':this.waterGrade === 3,
                'four':this.waterGrade === 4,
                'five':this.waterGrade === 5,
                'six':this.waterGrade === 6
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
        eventHelper.on('close-right-panel',function () {
            this.closePanel();
        }.bind(this));
    },
    methods: {
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
                if(!!this.$refs.monitorPlugin){
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
            if (!this.isRealTimeMode) {
                //query by default date
                // this.$refs.dateController.queryByDefaultDate();
            }
        }
    },
    components: {
        // monitor: monitor,
        // statistics: statistics,
        dateControl: dateController
    }
});
module.exports = comm;