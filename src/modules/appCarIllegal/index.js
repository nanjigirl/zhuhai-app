var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var arcgisPlugin = require('../arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var mathUtils = require('utils/mathUtils');
var eventHelper = require('../../utils/eventHelper');
var historySearchServices = require('services/historySearchServices');
var deviceModel = require('modules/arcgisPlugin/plugin/arcgisExpand/deviceModel');
var mapHelper = require('utils/mapHelper');
var echarts = require('echarts');
var refreshTime = 1000;
var defaultSpeed = 1000;
var currentThread;
var polygonArr = [[108.30897167534597, 22.84253525627857],
    [108.34433391899832, 22.858843087089117],
    [108.36321667046316, 22.860559700858648],
    [108.37025478691824, 22.84528183830982],
    [108.33454922051199, 22.830862282645757],
    [108.32802608818777, 22.824854134452398],
    [108.3213312944866, 22.823137520682867]
];
var car1 = [
    {x: 108.31620243774415, y: 22.85826325683594},
    {x: 108.31774739013673, y: 22.84676194458008},
    {x: 108.32401303039552, y: 22.835088970947268},
    {x: 108.32650212036134, y: 22.83629060058594},
    {x: 108.34083584533693, y: 22.824445965576174}
];
var car2 = [
    {x: 108.2998946069336, y: 22.82307267456055},
    {x: 108.3270171044922, y: 22.837148907470706},
    {x: 108.33474186645509, y: 22.846075299072268},
    {x: 108.33663014160157, y: 22.85603165893555},
    {x: 108.33062199340822, y: 22.870451214599612}
];
var car3 = [
    {x: 108.36752918945314, y: 22.834230664062503},
    {x: 108.35602787719728, y: 22.832857373046878},
    {x: 108.34589985595704, y: 22.826849224853518},
    {x: 108.34160832153322, y: 22.83079743652344},
    {x: 108.33958411905108, y: 22.833584236156838},
    {x: 108.33443427774249, y: 22.83032266999473},
    {x: 108.32731033059893, y: 22.836159156811135},
    {x: 108.30379272195636, y: 22.824400352489846}
];
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            illegalInfos: [{
                name: '禁行区域：',
                value: '西乡塘片区'
            }, {
                name: '禁行时间：',
                value: '00:00-07:00'
            }, {
                name: '泥头车：',
                value: '1辆'
            }, {
                name: '搅拌车：',
                value: '1辆'
            }, {
                name: '渣土车：',
                value: '1辆'
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
            datatheads: ['历史轨迹', '车辆编号', '所属公司'],
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
        this.cacheArr = {};
        var carData = echarts.init(document.getElementById('carData'));
        var option = {
            tooltip: {
                axisPointer: {
                    type: 'none'
                },
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['泥头车', '搅拌车', '渣土车']
            },

            series: [
                {
                    name: '违规车辆信息',
                    type: 'pie',
                    radius: '90%',
                    label: {
                        normal: {
                            show: false,
                            position: 'outside'
                        }, emphasis: {
                            show: false
                        }
                    },
                    // center: ['50%', '60%'],
                    data: [
                        {value: 1, name: '泥头车'},
                        {value: 1, name: '搅拌车'},
                        {value: 1, name: '渣土车'},
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
            mapHelper.setCenter(108.336887633667, 22.843255647231448, this.map, 11);
        }.bind(this));
    },
    methods: {
        openCheckDialog:function () {
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
                for (var i = 0; i < 3; i++) {
                    self.carLists.push({
                        truckNum: data[i].truckNum,
                        terminalNum: data[i].terminalNum,
                        check: false,
                        id: data[i].id
                    });
                }

                /*  data.forEach(function (menu) {//把后台接口车辆数据加入到数组里
                 self.carLists.push({
                 truckNum: menu.truckNum,
                 terminalNum: menu.terminalNum,
                 check: false,
                 id: menu.id
                 });
                 })*/
            });
            this.areaPolyon = mapHelper.createPolyon(polygonArr, false);
        },
        getCoordinate: function (point, index) {
            this.pointer = setTimeout(function () {
                if (!!this.pointer) {
                    clearTimeout(this.pointer);
                }
                console.log(point.check);
                if (!!point.check) {
                    this.cacheArr[this.carLists[index].terminalNum] = {
                        lines: [],
                        point: {}
                    };
                    var lineArr = car1;
                    if (index == 1) {
                        lineArr = car2;
                    } else if (index == 2) {
                        lineArr = car3;
                    }
                    for (var i = 0; i < lineArr.length - 1; i++) {
                        var graphic = mapHelper.drawLine(this.map, [lineArr[i].x, lineArr[i].y], [lineArr[i + 1].x, lineArr[i + 1].y], 2);
                        this.cacheArr[this.carLists[index].terminalNum].lines.push(graphic);
                    }
                    this.cacheArr[this.carLists[index].terminalNum].point = arcgisPlugin.createPoint({
                        x: lineArr[0].x,
                        y: lineArr[0].y,
                        name: this.carLists[index].truckNum,
                        icon: './img/toolbar/car.png'
                    });
                } else {
                    arcgisPlugin.removePoints({layer: this.cacheArr[this.carLists[index].terminalNum].point});
                    this.cacheArr[this.carLists[index].terminalNum].lines.forEach(function (graphic) {
                        mapHelper.removeGraphic(this.map, graphic);
                    }.bind(this));
                }
            }.bind(this), 100);
        },
        closePanel: function () {
            eventHelper.emit('right-panel-close');
            mapHelper.removeGraphic(this.map, this.areaPolyon);
            for (var key in this.cacheArr) {
                arcgisPlugin.removePoints({layer: this.cacheArr[key].point});
                this.cacheArr[key].lines.forEach(function (graphic) {
                    mapHelper.removeGraphic(this.map, graphic);
                }.bind(this))
            }
            this.rightPanelOpen = false;
        },
    },
    computed: {},
    components: {}
});
module.exports = comm;