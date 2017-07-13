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
        openFormDialog:function () {
            eventHelper.emit('app-check-dialog');
        },
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
        getCoordinate: function (list) {
            var lineArr = [
                {x:108.27371624694825,y:22.838436367797854},
                {x:108.31234005676271,y:22.84478783874512},
                {x: 108.32877663360597,y:22.851697209167483},
                {x:108.33180216537477,y: 22.857126000213626}];
            var lineArr2 = [
                {x: 108.34761646972657,y:22.84727692871094},
                {x: 108.3654692529297,y: 22.816721203613284},
                {x: 108.38057545410157,y: 22.783762219238284},
                {x:108.3932783959961,y: 22.756983044433596}];
            for(var i=0;i<lineArr2.length-1;i++){
                mapHelper.drawLine(this.map, [lineArr2[i].x,lineArr2[i].y ], [lineArr2[i+1].x,lineArr2[i+1].y],2);
            }
            for(var i=0;i<lineArr.length-1;i++){
                mapHelper.drawLine(this.map, [lineArr[i].x,lineArr[i].y ], [lineArr[i+1].x,lineArr[i+1].y],2);
            }
            deviceModel.ssjkCreatePoint(this.map, 123, 'f' + 123, 123456, 'abc', 108.27371624694825, 22.838436367797854, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 123456,
                id: 123,
                truckNum: 123456
            });
            deviceModel.ssjkCreatePoint(this.map, 12345, 'f' + 12345, 123456, 'abc', 108.34761646972657, 22.84727692871094, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 123456,
                id: 123,
                truckNum: 123456
            });
            deviceModel.ssjkCreatePoint(this.map, 1234, 'f' + 1234, 123456, 'abc', 108.29620388732911, 22.82007627137499, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 123456,
                id: 1234,
                truckNum: 123456
            });
            var lineArr1 = [
                {x:108.29620388732911,y: 22.82007627137499},
                {x:108.32289723144532,y:22.786258980115225},
                {x: 108.32658795104982,y: 22.77312688477831},];
            for(var i=0;i<lineArr1.length-1;i++){
                mapHelper.drawLine(this.map, [lineArr1[i].x,lineArr1[i].y ], [lineArr1[i+1].x,lineArr1[i+1].y],2);
            }
            //通过点击车辆列表进行获取该车辆的坐标
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