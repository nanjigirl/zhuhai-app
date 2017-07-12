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
            illegalInfos:[{
                name:'禁行区域：',
                value:'凤岭片区'
            },{
                name:'禁行时间：',
                value:'00:00-07:00'
            },{
                name:'泥头车：',
                value:'1辆'
            },{
                name:'搅拌车：',
                value:'1辆'
            },{
                name:'渣土车：',
                value:'1辆'
            },{
                name:'合计：',
                value:'3辆'
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
        var carData = echarts.init(document.getElementById('carData'));
        var option = {
            tooltip : {
                axisPointer:{
                    type:'none'
                },
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['泥头车','搅拌车','渣土车']
            },

            series : [
                {
                    name: '违规车辆信息',
                    type: 'pie',
                    radius : '90%',
                    label:{
                        normal:{
                            show:false ,
                            position : 'outside'
                        },emphasis:{
                            show :false
                        }
                    },
                    // center: ['50%', '60%'],
                    data:[
                        {value:1, name:'泥头车'},
                        {value:1, name:'搅拌车'},
                        {value:1, name:'渣土车'},
                    ],
                    itemStyle: {
                        emphasis: {
                            // shadowBlur: 10,
                            // shadowOffsetX: 0,
                            // shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                }
            ]
        };
        carData.setOption(option, true);
        eventHelper.on('close-right-panel', function () {
            this.closePanel();
        }.bind(this));
        eventHelper.on('mapCreated', function (map) {
            this.map = map;
        }.bind(this));
        eventHelper.on('app-car-illegal', function () {
            this.rightPanelOpen = true;
            this.queryCarData();
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
                data.forEach(function (menu) {//把后台接口车辆数据加入到数组里
                    self.carLists.push({
                        truckNum: menu.truckNum,
                        terminalNum: menu.terminalNum,
                        check: false,
                        id: menu.id
                    });
                })
            });
        },
        getCoordinate: function (list) {//通过点击车辆列表进行获取该车辆的坐标
            list.check = !list.check;
            if (list.check == true) {//如果车辆被选中获取该车辆的坐标
                historySearchServices.getCoordinateData(list.terminalNum, function (data) {
                    deviceModel.ssjkCreatePoint(this.map, list.id, 'f' + list.id, list.truckNum, 'abc', data.x, data.y, '', './img/toolbar/car.png', '22', '22', 'abc', {
                        terminalNum: list.terminalNum,
                        id: list.id,
                        truckNum: list.truckNum
                    });
                }.bind(this));
            } else {
                removePic.removePoints({layer: this.map.getLayer('f' + list.id)});
            }
        },
        closePanel: function () {
            eventHelper.emit('right-panel-close');
            this.rightPanelOpen = false;
        },
    },
    computed: {

    },
    components: {}
});
module.exports = comm;