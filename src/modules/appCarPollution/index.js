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
            carCases:[{
                name:'路面泥土撒漏：',
                value:22
            },{
                name:'PM2.5:',
                value:8
            },{
                name:'PM10：',
                value:10
            }],
            carLists: [
                {
                    num: '',
                    name: '',
                    truckNum: '桂A35721',
                    check: true,
                    id: '',
                    throughTimes:'6'
                },{
                    num: '',
                    name: '',
                    truckNum: '桂A35906',
                    check: true,
                    id: '',
                    throughTimes:'4'
                },{
                    num: '',
                    name: '',
                    truckNum: '桂A36969',
                    check: true,
                    id: '',
                    throughTimes:'3'
                }
            ],
            datatheads: [' ', '车辆编号', '经过次数'],
            pollutionPanelOpen: false,
            alertMessage: '',
            activeIndex: '1',
            facilityType: '',
        }
    },
    computed: {},
    mounted: function () {
        var carPolluteLine = echarts.init(document.getElementById('carPolluteLine'));
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            color:['red','blue','#FFC000'],
            legend: {
                data:['7月11日','7月12日','7月13日'],
                y:'bottom'
            },
            grid: {
                x:10,
                y:20,
                x2:10,
                y2:10,
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            toolbox: {
                feature: {
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['0','2','4','6','8','10','12','14','16','18','20','22','24']
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 60,
                interval:20,
            },
            series: [
                {
                    name:'7月11日',
                    type:'line',
                    symbol:'none',
                    stack: '总量1',
                    data:[24, 18, 22, 30, 24, 33, 40, 34,28,38,45,31,28],
                },
                {
                    name:'7月12日',
                    type:'line',
                    symbol:'none',
                    stack: '总量2',
                    data:[25, 19, 21, 31, 26, 32, 38,33,28,39,41,33,26]
                },
                {
                    name:'7月13日',
                    type:'line',
                    symbol:'none',
                    stack: '总量3',
                    data:[23, 20, 18, 29, 25, 31, 39,31,27,27,41,33,27]
                }
            ]
        };
        carPolluteLine.setOption(option, true);
        // eventHelper.on('close-right-panel', function () {
        //     this.closePanel();
        // }.bind(this));
        eventHelper.on('mapCreated', function (map) {
            this.map = map;
        }.bind(this));
        eventHelper.on('app-car-pollution', function () {
            this.pollutionPanelOpen = true;
            // this.queryCarData();
        }.bind(this));
    },
    methods: {
        //去掉车辆logo
        removeCarLogo:function () {
            removePic.removePoints({layer: this.map.getLayer('f' + 1203)});
            removePic.removePoints({layer: this.map.getLayer('f' + 12034)});
            removePic.removePoints({layer: this.map.getLayer('f' + 120345)});
            removePic.removePoints({layer: this.map.getLayer('f' + 12304567)});
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
            var lineArr = [
                {x:108.27371624694825,y:22.838436367797854},
                {x:108.2882216333008,y:22.834286340285647},
                {x: 108.30822018371583,y:22.84269774775635},
                {x:108.29963711486818,y: 22.856258996535647},
                {x:108.32341221557618,y: 22.861323007155764},
                {x:108.33225277648928,y: 22.86598801879883},
                {x:108.35594204650882,y: 22.86598801879883},];
            var lineArr2 = [
                {x: 108.29457310424806,y:22.820133321854513},
                {x: 108.29062489257814,y: 22.794126623246115},
                {x: 108.28916577087404,y: 22.790693395707052},
                {x:108.3076193688965,y: 22.791294210526388},
                {x:108.30744770751954,y:22.779878728959005},
                {x:108.32135227905275,y: 22.785886877152365}];
            for(var i=0;i<lineArr2.length-1;i++){
                var graLayer1 = mapHelper.drawLine(this.map, [lineArr2[i].x,lineArr2[i].y ], [lineArr2[i+1].x,lineArr2[i+1].y],3);
                this.cardistanceArr1.push(graLayer1);
            }
            for(var i=0;i<lineArr.length-1;i++){
                var graLayer2 = mapHelper.drawLine(this.map, [lineArr[i].x,lineArr[i].y ], [lineArr[i+1].x,lineArr[i+1].y],3);
                this.cardistanceArr2.push(graLayer2);
            }
            deviceModel.ssjkCreatePoint(this.map, 1203, 'f' + 1203, 123405, 'abc', 108.27371624694825, 22.838436367797854, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 123405,
                id: 1203,
                truckNum: 123405
            });
            deviceModel.ssjkCreatePoint(this.map, 120345, 'f' + 120345, 123450, 'abc', 108.29457310424806, 22.820133321854513, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 123450,
                id: 120345,
                truckNum: 123450
            });
            deviceModel.ssjkCreatePoint(this.map, 12034, 'f' + 12034, 123456, 'abc', 108.33062199340822, 22.87251115112305, '', './img/toolbar/car.png', '22', '22', 'abc', {
                terminalNum: 123456,
                id: 12034,
                truckNum: 123456
            });
            deviceModel.ssjkCreatePoint(this.map, 12304567, 'f' + 12304567, 123456, 'abc', 108.33079365478517, 22.84126878051758, '', './img/mapLegend/huawei-hd-red.png', '22', '22', 'abc', {
                terminalNum: 123456,
                id: 12304567,
                truckNum: 123456
            });
            var lineArr1 = [
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
            for(var i=0;i<lineArr1.length-1;i++){
                var graLayer3 = mapHelper.drawLine(this.map, [lineArr1[i].x,lineArr1[i].y ], [lineArr1[i+1].x,lineArr1[i+1].y],3);
                this.cardistanceArr3.push(graLayer3);
            }
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
                // for (var i = 0; i < 10; i++) {
                //     self.carLists1.push({
                //         num: data[i].truckNum,
                //         terminalNum: data[i].terminalNum
                //     });
                // }
            });
        },
        // getCoordinate: function (list) {//通过点击车辆列表进行获取该车辆的坐标
        //     list.check = !list.check;
        //     if (list.check == true) {//如果车辆被选中获取该车辆的坐标
        //         historySearchServices.getCoordinateData(list.terminalNum, function (data) {
        //             deviceModel.ssjkCreatePoint(this.map, list.id, 'f' + list.id, list.truckNum, 'abc', data.x, data.y, '', './img/toolbar/car.png', '22', '22', 'abc', {
        //                 terminalNum: list.terminalNum,
        //                 id: list.id,
        //                 truckNum: list.truckNum
        //             });
        //         }.bind(this));
        //     } else {
        //         removePic.removePoints({layer: this.map.getLayer('f' + list.id)});
        //     }
        // },
        closePanel: function () {
            this.pollutionPanelOpen = false;
            this.removeDistance();
            this.removeCarLogo();
        },
    },
    computed: {

    },
    components: {}
});
module.exports = comm;