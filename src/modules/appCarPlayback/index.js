var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var eventHelper = require('../../utils/eventHelper');
var echarts = require('echarts');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            carOprationPanel:false,
            activeIndex: '1',
            isCarDetail:true,
            isDriverDetail:false,
        }
    },
    computed: {},
    mounted: function () {
        eventHelper.on('app-car-playback', function () {
            this.carOprationPanel = true;
        }.bind(this));
        var myChart = echarts.init(document.getElementById('myChart'));
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                }
            },
            series: [
                {
                    name: '速度',
                    type: 'gauge',
                    z: 3,
                    min: 0,
                    max: 220,
                    splitNumber: 11,
                    radius: '90%',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 15,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    title : {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 20,
                            fontStyle: 'italic'
                        }
                    },
                    detail : {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder'
                        }
                    },
                    data:[{value: 50, name: 'km/h'}]
                }
            ]
        };

        setInterval(function () {
            option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart.setOption(option, true);
        },2000);
    },
    methods: {
        reset: function () {
            this.isCarDetail = true;
            this.activeIndex = '1';
        },
        selectCar:function () {
            this.isCarDetail = true;
            this.isDriverDetail = false;
            $('#driverDetail').removeClass('is-active');
            $('#carDetail').addClass('is-active');
        },
        selectDriver:function () {
            this.isCarDetail = false;
            this.isDriverDetail = true;
            $('#carDetail').removeClass('is-active');
            $('#driverDetail').addClass('is-active');
        },
        closeOprationPanel:function () {
            this.carOprationPanel = false;
            eventHelper.emit('app-car-monitor');
        }
    },
    computed:{

    },
    components: {}
});
module.exports = comm;