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
            cardistanceArr1:[],
            cardistanceArr2:[],
            cardistanceArr3:[],
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
            pollutionPanelOpen: false,
            isRealTimeMode: true,
            alertMessage: '',
            activeIndex: '1',
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
                formatter: "{a} <br/>{b} :{c}例 ({d}%)"
            },
            color:['#f00','#0CAD47','#ED7D31'],
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
        // eventHelper.on('close-right-panel', function () {
        //     this.closePanel();
        // }.bind(this));
        eventHelper.on('mapCreated', function (map) {
            this.map = map;
        }.bind(this));
        eventHelper.on('app-car-case', function () {
            this.pollutionPanelOpen = true;
            this.queryCarData();
            this.cacheCarList = [];
            this.cacheGraphies = [];
            var symbol1 = [108.36770085083009, 22.860666516113284];//兴宁区
            var symbol2 = [108.30744770751954, 22.780500653076174];
            var symbol3 = [108.33182362304689, 22.861868145751956];
            var symbol4 = [108.30779103027345, 22.843328717041018];
            var symbol5 = [108.3376601098633, 22.823415997314456];
            var symbol6 = [108.30710438476564, 22.843328717041018];
            var symbol7 = [108.28959492431642, 22.792173626708987];
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '6', symbol1[0], symbol1[1], 45, [255, 0, 0, 0.8]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '8', symbol2[0], symbol2[1], 55, [237, 125, 49, 0.8]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '10', symbol3[0], symbol3[1], 60, [255, 0, 0, 0.8]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '8', symbol4[0], symbol3[1], 55, [112, 173, 71, 0.8]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '3', symbol5[0], symbol5[1], 30, [255, 0, 0, 0.8]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '4', symbol6[0], symbol6[1], 35, [112, 173, 71, 0.8]));
            this.cacheGraphies.push(...mapHelper.addMarkSymbol(this.map, '3', symbol7[0], symbol7[1], 35, [255, 0, 0, 0.8]));
        }.bind(this));
    },
    methods: {
        //去掉车辆logo
        removeCarLogo:function () {
            removePic.removePoints({layer: this.map.getLayer('f' + 1230)});
            removePic.removePoints({layer: this.map.getLayer('f' + 12340)});
            removePic.removePoints({layer: this.map.getLayer('f' + 123450)});
        },
        //去掉线路
        removeDistance: function () {
            this.cardistanceArr1.forEach(function (graphic) {
                arcgisHelper.removeGraphic(graphic);
            });
            this.cardistanceArr2.forEach(function (graphic) {
                arcgisHelper.removeGraphic(graphic);
            });
            this.cardistanceArr3.forEach(function (graphic) {
                arcgisHelper.removeGraphic(graphic);
            })
        },
        queryCarData: function () {
            //画线和画车辆logo
            var lineArr = [
                {x:108.27371624694825,y:22.838436367797854},
                {x:108.2882216333008,y:22.834286340285647},
                {x: 108.30822018371583,y:22.84269774775635},
                {x:108.29963711486818,y: 22.856258996535647},
                {x:108.32341221557618,y: 22.861323007155764},
                {x:108.33225277648928,y: 22.86598801879883},
                {x:108.35594204650882,y: 22.86598801879883},];
            var lineArr1 = [
                {x:108.33903340087892,y: 22.88246751098633},
                {x:108.33062199340822,y: 22.87251115112305},
                {x:108.33568600402833,y:22.858692410278323},
                {x: 108.33637264953614,y: 22.856117489624026},
                {x: 108.3438399194336,y: 22.859121563720706},
                {x: 108.35834530578614,y: 22.8587782409668},
                {x: 108.36306599365236,y: 22.86126733093262},
                {x: 108.37430981384279,y: 22.83328652648926},
                {x: 108.37482479797364,y: 22.81680703430176},
                {x: 108.36864498840333,y: 22.807451489257815},
                {x: 108.35662869201661,y: 22.79929757385254},
                {x: 108.32418469177247,y: 22.7873671081543}];
            var lineArr2 = [
                {x: 108.29457310424806,y:22.820133321854513},
                {x: 108.29062489257814,y: 22.794126623246115},
                {x: 108.28916577087404,y: 22.790693395707052},
                {x:108.3076193688965,y: 22.791294210526388},
                {x:108.30744770751954,y:22.779878728959005},
                {x:108.32135227905275,y: 22.785886877152365}];
            for(var i=0;i<lineArr.length-1;i++){
                var graLayer2 = mapHelper.drawLine(this.map, [lineArr[i].x,lineArr[i].y ], [lineArr[i+1].x,lineArr[i+1].y],3);
                this.cardistanceArr2.push(graLayer2);
            }
            for(var i=0;i<lineArr1.length-1;i++){
                var graLayer3 = mapHelper.drawLine(this.map, [lineArr1[i].x,lineArr1[i].y ], [lineArr1[i+1].x,lineArr1[i+1].y],3);
                this.cardistanceArr3.push(graLayer3);
            }
            for(var i=0;i<lineArr2.length-1;i++){
                var graLayer1 = mapHelper.drawLine(this.map, [lineArr2[i].x,lineArr2[i].y ], [lineArr2[i+1].x,lineArr2[i+1].y],3);
                this.cardistanceArr1.push(graLayer1);
            }
            deviceModel.ssjkCreatePoint(this.map, 1230, 'f' + 1230, 123456, 'abc', 108.27371624694825, 22.838436367797854, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 123456,
                id: 1230,
                truckNum: 123456
            });
            deviceModel.ssjkCreatePoint(this.map, 123450, 'f' + 123450, 223456, 'abc', 108.29457310424806, 22.820133321854513, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 223456,
                id: 123450,
                truckNum: 223456
            });
            deviceModel.ssjkCreatePoint(this.map, 12340, 'f' + 12340, 54321, 'abc', 108.33903340087892, 22.88246751098633, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 54321,
                id: 12340,
                truckNum: 54321
            });
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
            this.removeCarLogo();
            this.removeDistance();
            this.cacheGraphies.forEach(function (graphic) {
                mapHelper.removeGraphic(this.map, graphic);
            }.bind(this));
            this.cacheCarList.forEach(function (car) {
                arcgisHelper.removePoints({layer: car});
            });
            this.pollutionPanelOpen = false;
        },
    },
    computed: {},
    components: {}
});
module.exports = comm;