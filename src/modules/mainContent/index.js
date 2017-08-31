var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var data = require('services/mock/PS_PIPE_ZY.json');
var echarts = require('echarts');
require('utils/bmap.min');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: 'Vue Module Seed',
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
                        center: [113.374, 23.140],
                        zoom: 16,
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
            }.bind(this));
        }.bind(this), 500);
    },
    components: {}
});
module.exports = comm;