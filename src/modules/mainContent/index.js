var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var data = require('services/mock/PS_PIPE_ZY.json');
var infoWindow = require('modules/infoWindow');
var echarts = require('echarts');
require('utils/bmap.min');
//var BMap = require('utils/bmap.min');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            show: false,
            rightMonitors: [
                {
                    name: '猎德涌001-平江路',
                    flow: 2.84,
                    water: 0.56,
                    lng: 23.131742,
                    lat: 113.392945
                }, {
                    name: '猎德涌002-马场路',
                    flow: 1.84,
                    water: 0.28
                }, {
                    name: '猎德涌003-海清路',
                    flow: 1.34,
                    water: 0.32
                }, {
                    name: '猎德涌004-西浦大街',
                    flow: 2.24,
                    water: 0.21
                }, {
                    name: '猎德涌005-冼村路',
                    flow: 1.81,
                    water: 0.33
                }, {
                    name: '猎德涌006-马场路金穗路',
                    flow: 1.24,
                    water: 0.46
                }, {
                    name: '猎德涌007-新快报',
                    flow: 2.84,
                    water: 0.68
                }, {
                    name: '沙河涌001-东侧截污管',
                    flow: 2.84,
                    water: 0.56
                }, {
                    name: '沙河涌002-西侧截污管',
                    flow: 1.99,
                    water: 0.67
                }, {
                    name: '沙河涌003-12号闸',
                    flow: 1.88,
                    water: 0.36
                },
            ],
            leftMonitors: [
                {
                    name: '中山大道001-骏北街',
                    flow: 1.84,
                    water: 0.56,
                    lng: 23.130986,
                    lat: 113.387519
                }, {
                    name: '中山大道002-骏南街',
                    flow: 2.04,
                    water: 0.26
                }, {
                    name: '中山大道003-骏中街',
                    flow: 2.34,
                    water: 0.56
                }, {
                    name: '中山大道004-稚乐街',
                    flow: 1.84,
                    water: 0.51
                }, {
                    name: '中山大道005-绿茵路',
                    flow: 1.84,
                    water: 0.56
                }, {
                    name: '中山大道006-科新路',
                    flow: 1.44,
                    water: 0.26
                }, {
                    name: '中山大道007-员村五横路',
                    flow: 1.14,
                    water: 0.51
                }, {
                    name: '瑞华路001',
                    flow: 1.04,
                    water: 0.16
                }, {
                    name: '中山大道西001-棠东东南路',
                    flow: 1.24,
                    water: 0.32
                }
            ]
        }
    },
    methods: {
        closePanel: function () {
            this.show = !this.show;
        }
    },
    mounted: function () {
        setInterval(function () {
            //  var rightMonitors = this.rightMonitors.splice(0);
            this.rightMonitors.forEach(function (monitor) {
                if (monitor.name == '猎德涌001-平江路') {
                    if (monitor.water < 2) {
                        monitor.water = parseFloat((monitor.water + Math.random() * 0.1).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow + Math.random() * 0.1).toFixed(2));
                    }
                    else if (monitor.water > 2 ||monitor.water ==2 ) {
                        monitor.water = parseFloat((monitor.water - Math.random() - 1).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow - Math.random() - 1).toFixed(2));
                    }
                } else {
                    if (monitor.water < 1.4) {
                        monitor.water = parseFloat((monitor.water + Math.random() * 0.1).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow + Math.random() * 0.1).toFixed(2));
                    }
                    else {
                        monitor.water = parseFloat((monitor.water - Math.random() * 0.1 - 1).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow - Math.random() * 0.1 - 1).toFixed(2));
                    }
                }


            });
            this.leftMonitors.forEach(function (monitor) {
                if (monitor.name == '中山大道001-骏北街') {
                    if (monitor.water < 0.1) {
                        monitor.water = parseFloat((monitor.water + Math.random()).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow + Math.random()).toFixed(2));
                    }
                    else {
                        monitor.water = parseFloat((monitor.water - Math.random() * 0.1).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow - Math.random() * 0.1).toFixed(2));
                    }
                } else {
                    if (monitor.water < 0.6) {
                        monitor.water = parseFloat((monitor.water + Math.random()).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow + Math.random()).toFixed(2));
                    }
                    else {
                        monitor.water = parseFloat((monitor.water - Math.random() * 0.1).toFixed(2));
                        monitor.flow = parseFloat((monitor.flow - Math.random() * 0.1).toFixed(2));
                    }
                }
                if (monitor.flow < 0.1) {
                    monitor.flow = 0.51;
                }
            });
            var alertPoint = [];
            var pt1 = new BMap.Point(this.rightMonitors[0].lat, this.leftMonitors[0].lng);
            if (this.rightMonitors[0].water > 1.5) {
                pt1.items = [
                    {
                        title: '报警点',
                        content: this.rightMonitors[0].name

                    },
                    {
                        title: '水位报警',
                        content: this.rightMonitors[0].water,
                        type:'warn'

                    }
                ];
                alertPoint.push(pt1);
                if (!this.isRightAdd) {
                    this.isRightAdd = true;
                    var myIcon = new BMap.Icon("./img/dirtyPipe.png", new BMap.Size(20, 20));
                    myIcon.imageSize = new BMap.Size(20, 20);
                    this.rightMarker = new BMap.Marker(pt1, {icon: myIcon});  // 创建标注
                    this.map.addOverlay(this.rightMarker);
                }
            }
            else {
                if (!!this.isRightAdd) {
                    this.isRightAdd = false;
                    this.map.removeOverlay(this.rightMarker);
                }
                eventHelper.emit('alert-point-close', pt1);
            }

            var pt2 = new BMap.Point(this.leftMonitors[0].lat, this.leftMonitors[0].lng);
            if (this.leftMonitors[0].water < 0.2) {
                pt2.items = [
                    {
                        title: '报警点',
                        content: this.leftMonitors[0].name

                    },
                    {
                        title: '压力报警',
                        content: this.leftMonitors[0].water,
                        type:'warn'

                    }
                ];
                alertPoint.push(pt2);
                if (!this.isLeftAdd) {
                    this.isLeftAdd = true;
                    var myIcon = new BMap.Icon("./img/rainPipe.png", new BMap.Size(20, 20));
                    myIcon.imageSize = new BMap.Size(20, 20);
                    this.leftMarker = new BMap.Marker(pt2, {icon: myIcon});  // 创建标注
                    this.map.addOverlay(this.leftMarker);
                }
            }
            else {
                if (!!this.isLeftAdd) {
                    this.isLeftAdd = false;
                    this.map.removeOverlay(this.leftMarker);
                }
                eventHelper.emit('alert-point-close', pt2);
            }
            eventHelper.emit('alert-point', alertPoint);


        }.bind(this), 2000);
        setTimeout(function () {
            this.show = true;
            this.$nextTick(function () {
                //initialize chart
                var myChart = echarts.init($('#mainMap')[0]);

                //read data and set coordinates

                var colorBySort = {'雨水': '#fdafff', '污水': '#10fdff', '雨污合流': '#e6c61f'};
                var lines = data.map(function (line) {
                    return {
                        coords: line[0].points.map(function (seg, idx) {
                            return seg.coord;
                        }),
                        lineStyle: {
                            normal: {
                                //set color from pipe sort
                                color: colorBySort[line[0].sort]
                            }
                        }
                    };
                });
                var option = {
                    //map setting
                    bmap: {
                        center: [113.390259, 23.130512],
                        zoom: 18,
                        roam: true,
                        mapStyle: {
                            'styleJson': [
                                {
                                    'featureType': 'water',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#031628'
                                    }
                                },
                                {
                                    'featureType': 'land',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#000102'
                                    }
                                },
                                {
                                    'featureType': 'highway',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'geometry.stroke',
                                    'stylers': {
                                        'color': '#0b3d51'
                                    }
                                },
                                {
                                    'featureType': 'local',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'geometry.stroke',
                                    'stylers': {
                                        'color': '#071829'
                                    }
                                },
                                {
                                    'featureType': 'subway',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'lightness': -70
                                    }
                                },
                                {
                                    'featureType': 'building',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'all',
                                    'elementType': 'labels.text.fill',
                                    'stylers': {
                                        'color': '#857f7f'
                                    }
                                },
                                {
                                    'featureType': 'all',
                                    'elementType': 'labels.text.stroke',
                                    'stylers': {
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'building',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#022338'
                                    }
                                },
                                {
                                    'featureType': 'green',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#062032'
                                    }
                                },
                                {
                                    'featureType': 'boundary',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#465b6c'
                                    }
                                },
                                {
                                    'featureType': 'manmade',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#022338'
                                    }
                                },
                                {
                                    'featureType': 'label',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                }
                            ]
                        }
                    },
                    //Drawing settings
                    series: [{
                        //static lines
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        polyline: true,
                        data: lines,
                        silent: true,
                        lineStyle: {
                            normal: {
                                //color: 'rgb(100, 150, 250)',
                                opacity: 0.2,
                                width: 2
                            }
                        },
                        progressiveThreshold: 500,
                        progressive: 200
                    }, {
                        //moving lines
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        polyline: true,
                        data: lines,
                        lineStyle: {
                            normal: {
                                //color: 'rgb(100, 150, 250)',
                                width: 0
                            }
                        },
                        effect: {
                            constantSpeed: 20,
                            show: true,
                            trailLength: 0.15,
                            symbolSize: 1.5
                        },
                        zlevel: 1
                    }]
                }
                myChart.setOption(option);
                //get BMap entity
                var bmap = myChart.getModel().getComponent('bmap').getBMap();
                eventHelper.emit('mapCreated', bmap);
                bmap.addEventListener('click', function (data) {
                    console.log(data);
                });
                this.map = bmap;
                //  bmap.addControl(new BMap.MapTypeControl());

                //柱状图
                var option1 = {
                    color: ['#2de8ef'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                            shadowStyle: {
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    },
                    grid: {
                        left: '8%',
                        right: '8%',
                        bottom: 0,
                        top: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['中心城区', '白云区', '花都区', '番禺区', '南沙区', '从化区', '增城区'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#2de8ef'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: '日生产量(万m3/d)',
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#2de8ef'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '日生产量',
                            type: 'bar',
                            barWidth: '60%',
                            data: [445, 19, 32.5, 128, 48, 31.6, 73.2]
                        }
                    ]
                };
                var option2 = {
                    color: ['#2de8ef'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                            shadowStyle: {
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    },
                    grid: {
                        left: '8%',
                        right: '8%',
                        bottom: 0,
                        top: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['猎德', '京溪', '大坦沙', '沥滘', '西朗', '龙归', '竹料', '大沙地', '江高-石井'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#2de8ef'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: '日生产量(万m3/d)',
                            type: 'value',
                            max: 150,
                            axisLine: {
                                lineStyle: {
                                    color: '#2de8ef'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '日生产量',
                            type: 'bar',
                            barWidth: '60%',
                            data: [120, 10, 55, 50, 20, 14, 6, 20, 15]
                        }
                    ]
                };
                var leftChart = echarts.init($('.chartContain')[0]);
                leftChart.setOption(option1);
                var rightChart = echarts.init($('.chartContain')[1]);
                rightChart.setOption(option2);
                var option3 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        top: 0,
                        left: 0,
                        orient: 'horizontal',
                        data: ['已达标', '未达标'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [{
                        name: '达标情况',
                        type: 'pie',
                        radius: '68%',
                        center: ['50%', '50%'],
                        clockwise: false,
                        data: [{
                            value: 8,
                            name: '已达标',
                            selected: true
                        }, {
                            value: 2,
                            name: '未达标'
                        }],
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#2de8ef',
                                    fontSize: '16',
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false,
                                length: 0.001
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    }],
                    color: [
                        '#2de8ef',
                        '#cccccc'
                    ]
                };
                //饼图
                var leftPie = echarts.init($('.chartPie')[0]);
                leftPie.setOption(option3);
                var rightPie = echarts.init($('.chartPie')[1]);
                rightPie.setOption(option3);
            }.bind(this));
        }.bind(this), 500);
    },
    components: {
        'info-window': infoWindow
    }
});
module.exports = comm;