var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var removePic = require('../arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');

var eventHelper = require('../../utils/eventHelper');
var historySearchServices = require('services/historySearchServices');
var getCoordinateService = require('services/getCoordinateService');
var getCarHistoryService = require('services/getCarHistoryService');
var getCarHistoryCountService = require('services/getCarHistoryCountService');
var deviceModel = require('modules/arcgisPlugin/plugin/arcgisExpand/deviceModel');
var mapHelper = require('utils/maps/mapHelper');
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
                    truckNum:'',
                    name:'',
                    terminalNum:'',
                    check:false,
                    id:''
                }
            ],
            datatheads:[' ','车辆编号','车辆公司'],
            historyTableHead:['车辆编号','车辆公司','操作'],
            carLists1:[
                {
                    num:'桂AD2375',
                    name:'南宁泰斗运输信息咨询有限公司（渣土）',
                    terminalNum:''
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
        eventHelper.on('close-right-panel', function () {
            this.closePanel();
        }.bind(this));
        eventHelper.on('mapCreated',function (map) {
            this.map  = map;
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
        queryCarData: function () {
            var self = this;
            //从后台获取车辆信息数据
            historySearchServices.getCarListData(function (data) {
                if (!!data) {//初始化数组
                    self.carLists.splice(0);
                    self.carLists1.splice(0);
                }
                data.forEach(function (menu) {//把后台接口车辆数据加入到数组里
                    self.carLists.push({
                        truckNum: menu.truckNum,
                        terminalNum:menu.terminalNum,
                        check:false,
                        id:menu.id
                    });
                })
                // for(var i = 0;i<10;i++){
                //     self.carLists.push({
                //         num:data[i].truckNum
                //     });
                // }
                for(var i = 0;i<10;i++){
                    self.carLists1.push({
                        num:data[i].truckNum,
                        terminalNum:data[i].terminalNum
                    });
                }
            });
        },
        getCoordinate:function(list){//通过点击车辆列表进行获取该车辆的坐标
            list.check = !list.check;
            if(list.check ==true){//如果车辆被选中获取该车辆的坐标
                getCoordinateService.getCoordinateData(list.terminalNum,function (data) {
                    deviceModel.ssjkCreatePoint(this.map, list.id, 'f'+list.id, list.truckNum, 'abc', data.x, data.y, '', './img/toolbar/car.png', '22', '22', 'abc', {
                        terminalNum:"62215510",
                        id:17263,
                        truckNum:"桂A35721"
                    });
                }.bind(this));
            }else{
                removePic.removePoints([{id:list.id}])
            }
        },
        //点击查看历史轨迹进行调用
        drawCarHistory:function (car) {
            if(!this.search.dateStart || !this.search.dateEnd){
                return;
            }else {
                var dateStart = this.search.dateStart.getFullYear()+'-'+(this.search.dateStart.getMonth()+1)+'-'+this.search.dateStart.getDate();
                var dateEnd = this.search.dateEnd.getFullYear()+'-'+(this.search.dateEnd.getMonth()+1)+'-'+this.search.dateEnd.getDate();
                if(dateStart && dateEnd){
                    getCarHistoryCountService.getCarHistoryCountData(car.terminalNum,dateStart,dateEnd,function(data){
                        console.log(data);
                        var carHistoryCount = parseInt(data.count);
                        console.log(carHistoryCount);
                        var pageCount;
                        if(carHistoryCount%200 !== 0){
                            pageCount =  parseInt(carHistoryCount/200) + 1;
                        }else{
                            pageCount =  parseInt(carHistoryCount/200);
                        }
                        getCarHistoryService.getCarHistoryData(car.terminalNum,dateStart,dateEnd,0,function(data){
                            var coordinateArr = [];
                            console.log(data)
                            data.forEach(function(data){
                                coordinateArr.push({
                                    x:data.x,
                                    y:data.y
                                })
                            });
                            // console.log(coordinateArr[0].x);
                            // console.log(coordinateArr[1].x);
                            for(var i = 0;i<coordinateArr.length-1;i++){
                                // console.log(coordinateArr[i].x);
                                // console.log(coordinateArr[i+1].x);
                                mapHelper.drawLine(this.map,[coordinateArr[i].x,coordinateArr[i].y],[coordinateArr[i+1].x,coordinateArr[i+1].y]);
                            }

                        }.bind(this));
                        // var pageIndex = 0;
                        //
                        // for(var i=0;pageIndex<pageCount;){
                        //
                        //     // pageIndex++;
                        //     getCarHistoryService.getCarHistoryData(car.terminalNum,dateStart,dateEnd,pageIndex,function(data){
                        //
                        //
                        //     });
                        // }
                    }.bind(this));

                }
            }

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