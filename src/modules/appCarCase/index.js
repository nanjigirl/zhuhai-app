var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var removePic = require('../arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var mathUtils = require('utils/mathUtils');
var eventHelper = require('../../utils/eventHelper');
var historySearchServices = require('services/historySearchServices');
var deviceModel = require('modules/arcgisPlugin/plugin/arcgisExpand/deviceModel');
var mapHelper = require('utils/mapHelper');
var arcgisHelper = require('modules/arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var echarts = require('echarts');
var Q = require('q');
var refreshTime = 1000;
var defaultSpeed = 1000;
var currentThread;

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            tableCaseHead: ['预警时间', '预警类型', '地点'],
            caseLists: [{
                date: '2017-4-8',
                type: '蓝色',
                address: '青秀区'
            }, {
                date: '2017-4-9',
                type: '黄色',
                address: '兴宁区'
            }, {
                date: '2017-4-8',
                type: '绿色',
                address: '金州区'
            }],
            carLists: [
                {
                    num: '',
                    name: '',
                    truckNum: '',
                    check: false,
                    id: ''
                }
            ],
            datatheads: ['实时位置', '车辆编号', '所属公司'],
            // historyTableHead: ['车辆编号', '所属公司', '操作'],
            // carLists1: [
            //     {
            //         num: '桂AD2375',
            //         name: '南宁泰斗运输信息咨询有限公司（渣土）',
            //         terminalNum: ''
            //     }
            // ],
            // playSpeed: defaultSpeed,
            rightPanelOpen: false,
            isRealTimeMode: true,
            // isPlay: true,
            alertMessage: '',
            activeIndex: '1',
            // facilityPic: '../src/img/combImg.png',
            facilityName: '',
            selectedMode: '',
            facilityType: '',
        }
    },
    computed: {},
    mounted: function () {
        var carCases = echarts.init(document.getElementById('carCases'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['路面泥土撒漏', 'PM2.5', 'PM10']
            },
            series: [
                {
                    name: '污染来源',
                    type: 'pie',
                    radius: '80%',
                    label: {
                        normal: {
                            show: false,
                            position: 'outside'
                        }, emphasis: {
                            show: false
                        }
                    },
                    center: ['50%', '60%'],
                    data: [
                        {value: 22, name: '路面泥土撒漏'},
                        {value: 8, name: 'PM2.5'},
                        {value: 12, name: 'PM10'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        carCases.setOption(option, true);
        // this.queryCarData();
        eventHelper.on('close-right-panel', function () {
            this.closePanel();
        }.bind(this));
        eventHelper.on('mapCreated', function (map) {
            this.map = map;
        }.bind(this));
        eventHelper.on('app-car-case', function () {
            this.rightPanelOpen = true;
            this.queryCarData();
            this.cacheCarList = [];
            this.cacheGraphies = [];
            var symbol0 = [108.46863774047853, 22.796465161132815];//青秀区
            var symbol1 = [108.36770085083009, 22.860666516113284];//兴宁区
            var symbol2 = [108.27706364379884, 22.791658642578128];//江南区
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '30', symbol0[0], symbol0[1], 60, [70, 50, 212, 0.6]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '10', symbol1[0], symbol1[1], 20, [220, 230, 52, 0.6]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '2', symbol2[0], symbol2[1], 15, [99, 230, 52, 0.6]));
        }.bind(this));
    },
    methods: {
        queryCarData: function () {
            var self = this;
            //从后台获取车辆信息数据
            historySearchServices.getCarListData(function (data) {
                if (!!data) {//初始化数组
                    self.carLists.splice(0);
                    // self.carLists1.splice(0);
                }
                for (var i = 0; i < 10; i++) {
                    self.carLists.push({
                        truckNum: data[i].truckNum,
                        terminalNum: data[i].terminalNum,
                        check: false,
                        id: data[i].id
                    });
                }
            });
        },
        getCoordinate: function (list, index) {//通过点击车辆列表进行获取该车辆的坐标
            this.pointer = setTimeout(function () {
                if (!!this.pointer) {
                    clearTimeout(this.pointer);
                }
                if (list.check == true) {//如果车辆被选中获取该车辆的坐标
                    historySearchServices.getCoordinateData(list.terminalNum, function (data) {
                        this.cacheCarList.push(arcgisHelper.createPoint({
                            x: data.x,
                            y: data.y,
                            name: list.truckNum,
                            icon: './img/toolbar/car.png'
                        }));
                    }.bind(this));
                } else {
                    arcgisHelper.removePoints({layer: this.cacheCarList[index]});
                }
            }.bind(this), 100);
        },
        closePanel: function () {
            eventHelper.emit('right-panel-close');
            this.cacheGraphies.forEach(function (graphic) {
                mapHelper.removeGraphic(this.map, graphic);
            }.bind(this));
            this.cacheCarList.forEach(function (car) {
                arcgisHelper.removePoints({layer: car});
            });
            this.rightPanelOpen = false;
        },
    },
    computed: {},
    components: {}
});
module.exports = comm;