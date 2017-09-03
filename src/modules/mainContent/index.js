var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var data = require('services/mock/PS_PIPE_ZY.json');
var echarts = require('echarts');
require('utils/bmap.min');
//var BMap = require('utils/bmap.min');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            show: false
        }
    },
    methods: {},
    mounted: function () {
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
              //  bmap.addControl(new BMap.MapTypeControl());

                var option1 = {
                    color: ['#2de8ef'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                            shadowStyle:{
                                color:'rgba(255,255,255,0.5)'
                            }
                        }
                    },
                    grid: {
                        left: '8%',
                        right: '8%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['中心城区', '白云区', '花都区', '番禺区', '南沙区', '从化区', '增城区'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#2de8ef'
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name:'日生产量(万m3/d)',
                            type : 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'#2de8ef'
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'日生产量',
                            type:'bar',
                            barWidth: '60%',
                            data:[445,19, 32.5, 128, 48, 31.6, 73.2]
                        }
                    ]
                };
                var option2 = {
                    color: ['#2de8ef'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                            shadowStyle:{
                                color:'rgba(255,255,255,0.5)'
                            }
                        }
                    },
                    grid: {
                        left: '8%',
                        right: '8%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['猎德', '京溪', '大坦沙', '沥滘', '西朗', '龙归', '竹料','大沙地','江高-石井'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#2de8ef'
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name:'日生产量(万m3/d)',
                            type : 'value',
                            max:150,
                            axisLine:{
                                lineStyle:{
                                    color:'#2de8ef'
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'日生产量',
                            type:'bar',
                            barWidth: '60%',
                            data:[120, 10, 55, 50, 20, 14, 6,20,15]
                        }
                    ]
                };
                var leftChart = echarts.init($('.chartContain')[0]);
                leftChart.setOption(option1);
                var rightChart = echarts.init($('.chartContain')[1]);
                rightChart.setOption(option2);
            }.bind(this));
        }.bind(this), 500);
    },
    components: {}
});
module.exports = comm;