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
                carNumber:'',
                updateDate:'',
                updateTime:'',
                currentDate:moment().format('YYYY-MM-DD HH:mm:ss'),
                carOprationPanel: false,
                isCarDetail:true,
                isDriverDetail:false,
            }
        },
        computed: {},
        mounted: function () {
            eventHelper.on('app-car-playback', function () {
                this.carOprationPanel = true;
            }.bind(this));
            this.myChart = echarts.init(document.getElementById('myChart'));
            var option = {
                tooltip: {
                    formatter: "{a} <br/>{c} {b}"
                },
                toolbox: {
                    feature: {}
                },
                series: [
                    {
                        name: '速度',
                        type: 'gauge',
                        z: 3,
                        min: 0,
                        max: 160,
                        splitNumber: 16,
                        radius: '90%',
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 6
                            }
                        },
                        pointer: {
                            width: 3//指针长度
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 10,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length: 10,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto',
                                fontSize:8
                            }
                        },
                        title: {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 15,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize:15
                            }
                        },
                        data: [{value: 0, name: 'km/h'}]
                    }
                ]
            };
            eventHelper.on('car-speed-change', function (car) {
                this.car = car;
                this.carNumber = car.num;
                var dateArr = car.date.split(' ');
                 this.updateDate = dateArr[0];//2017-07-01 13:31:52
                 this.updateTime = dateArr[1];
                option.series[0].data[0].value = parseFloat(car.speed);
                this.myChart.setOption(option, true);
            }.bind(this));
        },
        methods: {
            open: function () {


            },
            pause: function () {
                eventHelper.emit('car-trace-pause',this.car);
            },
            move: function () {
                eventHelper.emit('car-trace-move',this.car);
            },
            replay: function () {
                eventHelper.emit('car-trace-replay',this.car);
            },
            play: function () {
            eventHelper.emit('car-trace-play',this.car);
            },
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
                eventHelper.emit('stop-player');
            }
        },
        computed: {},
        components: {}
    })
;
module.exports = comm;