var template = require('./reservoir.html');
var echarts = require('echarts');
var helper = require('modules/rightPanel/reservoir/reservoirHelper');
var eventHelper = require('utils/eventHelper');


var transferGrade = function (grade) {
    //  8,25,41,60,76,93
    switch (grade) {
        case 1:
            return 8;
        case 2:
            return 25;
        case 3:
            return 41;
        case 4:
            return 60;
        case 5:
            return 76;
        case 6:
            return 93;
    }
};
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            monitors: []
        }
    },
    methods: {
        update: function (values) {
            var list = values.data;
            var currentGradeArr = [];
            list.forEach(function (value) {
                if (!!this.chartOptions[value.itemId]) {
                    var formatter = this.chartOptions[value.itemId].series[0].detail.formatter;
                    var grade = helper.getGrade(value.itemId, value.dValue);
                    currentGradeArr.push(grade);
                    this.chartOptions[value.itemId].series[0].data = {
                        name: helper.transferGradeTitle(grade),
                        value: transferGrade(grade)
                    };
                    this.chartOptions[value.itemId].series[0].detail.formatter = value.dValue.toFixed(1) + formatter.substring(formatter.indexOf('\n'));
                    this.charts[value.itemId].setOption(this.chartOptions[value.itemId]);
                }
            }.bind(this));
            var currentGrade = Math.max(currentGradeArr[0], currentGradeArr[1], currentGradeArr[2], currentGradeArr[3], currentGradeArr[4], currentGradeArr[5], currentGradeArr[6], currentGradeArr[7])
            eventHelper.emit('current-grade', {grade: currentGrade, title: helper.transferGradeTitle(currentGrade)});

        },
        init: function (monitors) {
            this.monitors = monitors;
            this.charts = {};
            this.chartOptions = {};
            this.$nextTick(function () {
                for (var i = 0; i < monitors.length; i++) {
                    var obj = monitors[i];
                    var myChart = echarts.init($('.reservoirItemChart')[i]);
                    var unit = !!obj.unit ? '(' + obj.unit + ')' : '';
                    var option = {
                        title: {
                            left: 'center',
                            text: obj.name,
                            textStyle: {
                                fontSize: 12,
                                color: 'black'
                            },
                        },
                        tooltip: {
                            formatter: "{a} <br/>监测等级 : {b}"
                        },
                        series: [{
                            name: obj.name,
                            type: 'gauge',
                            // startAngle: 180,
                            // endAngle: 0,
                            center: ['50%', '55%'],
                            min: 0,
                            max: 100,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 10,
                                    shadowBlur: 0,
                                    color: [[0.16, '#11c5fa'], [0.33, '#13a9f0'], [0.5, '#60d41c'], [0.67, '#20b660'], [0.84, '#fec109'], [1, '#fc5304']]
                                }
                            },
                            pointer: {
                                width: 3
                            },
                            axisTick: {
                                show: false,
                                splitNumber: 10
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                formatter: function (e) {
                                    switch (e + "") {
                                        case "10":
                                            return "1";
                                        case "20":
                                            return "2";
                                        case "40":
                                            return "3";
                                        case "60":
                                            return "4";
                                        case "80":
                                            return "5";
                                        case "90":
                                            return "6";
                                        default:
                                            return "7";
                                    }
                                },
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 15,
                                    fontWeight: ""
                                }
                            },
                            detail: {
                                formatter: '0\n' + unit,
                                offsetCenter: [0, '65%'],
                                textStyle: {
                                    fontSize: 12
                                }
                            },
                            data: [{
                                name: "I",
                                value: 8 //8,25,41,60,76,93
                            }]
                        }]
                    };
                    this.chartOptions[obj.itemID] = option;
                    this.charts[obj.itemID] = myChart;
                    myChart.setOption(option);

                }
            }.bind(this));

        }
    },
    mounted: function () {
    }
});
module.exports = comm;