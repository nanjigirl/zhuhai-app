var transferGrade = function (grade) {
    switch (grade) {
        case 1:
            return 0.5;
        case 2:
            return 1.5;
        case 3:
            return 2.5;
        case 4:
            return 3.5;
        case 5:
            return 4.5;
        case 6:
            return 5.5;
    }
};

define(['services/statisticsService', 'echarts', 'moment', 'modules/rightPanel/reservoir/reservoirHelper', 'utils/eventHelper'], function (statisticsService, echarts, moment, reservoirHelper, eventHelper) {
    return {
        transferGrade: transferGrade,
        initReservoirDetail: function (itemNames, itemIds, cb) {
            statisticsService.getHistoricalData(itemIds,moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'), moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'), function (data) {
                var dataList = {};
                var timeDataMapping = {};
                data.forEach(function (obj) {
                    var value = obj.dValue.toFixed(2);
                    var grade = reservoirHelper.getGrade(obj.itemId, value);
                    var dateObj = {};
                    dateObj[obj.itemId] = grade;
                    if (!!dataList[obj.itemId]) {
                        dataList[obj.itemId].push(transferGrade(grade));
                    } else {
                        dataList[obj.itemId] = [transferGrade(grade)];
                    }
                    if (!!timeDataMapping[obj.deviceUpdateTime]) {
                        timeDataMapping[obj.deviceUpdateTime].push(dateObj);
                    } else {
                        timeDataMapping[obj.deviceUpdateTime] = [dateObj];
                    }
                });
                var chartData = [];
                for (var i = 0; i < itemNames.length; i++) {
                    var dataObj = {
                        name: itemNames[i],
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                width: 2,
                            }
                        },
                        data: dataList[itemIds[i]]
                    }
                    chartData.push(dataObj);
                }
                var dates = [];
                for (var key in timeDataMapping) {
                    dates.push(key);
                }
                var summary = [];
                for (var i = 0; i < chartData[0].data.length; i++) {
                    summary.push(Math.max(chartData[0].data[i], chartData[1].data[i], chartData[2].data[i], chartData[3].data[i], chartData[4].data[i], chartData[5].data[i], chartData[6].data[i], chartData[7].data[i]));
                }
                this.summary = summary;
                this.dates = dates;
                this.timeDataMapping = timeDataMapping;
                var option = {
                    title: {
                        text: '各项水质指标',
                        x: 'center',
                        top: 10,
                        textStyle: {
                            fontSize: 12,
                            color: 'black'
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (param) {
                            var toolTip = '';
                            param.forEach(function (obj) {
                                if (obj.data !== 1) {
                                    toolTip += obj.seriesName + ':' + reservoirHelper.transferGradeTitle(Math.ceil(obj.data)) + '<br />';
                                }
                            });
                            return toolTip;
                        }
                    },

                    color: ["#FF0000", "#00BFFF", "#FF00FF", "#1ce322", "#000000", '#EE7942', 'red', 'pink'],
                    legend: {
                        data: itemNames,
                        bottom: 0
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '18%',

                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        offset: '60',
                        boundaryGap: false,
                        data: dates
                    },
                    yAxis: [{
                        type: 'value',
                        offset: '2',
                        axisLabel: {
                            formatter: ''
                        },
                        min: 0,
                        max: 6
                    }],
                    series: [{
                        "name": "Ⅰ",
                        "type": "bar",
                        "stack": "总量",
                        "barMaxWidth": 10,
                        "itemStyle": {
                            "normal": {
                                "color": "#11c5fa"
                            }
                        },
                        "data": [
                            1
                        ],
                    }, {
                        "name": "Ⅱ",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": "#13a9f0",
                                "barBorderRadius": 0
                            }
                        },
                        "data": [
                            1,
                        ]
                    }, {
                        "name": "Ⅲ",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": "#60d41c",
                                "barBorderRadius": 0,
                            }
                        },
                        "data": [
                            1,
                        ]
                    }, {
                        "name": "Ⅳ",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": "#20b660",
                                "barBorderRadius": 0
                            }
                        },
                        "data": [
                            1,
                        ]
                    }, {
                        "name": "Ⅴ",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": "#fec109",
                                "barBorderRadius": 0,
                            }
                        },
                        "data": [
                            1,
                        ]
                    }, {
                        "name": "劣Ⅴ",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": "#fc5304",
                                "barBorderRadius": 0,
                            }
                        },
                        "data": [
                            1,
                        ]
                    }].concat(chartData)
                };
                cb({
                    option: option
                })
            }.bind(this));
        },
        initReservoirSummary: function (monitorNames, itemIds, cb) {
            var dates = this.dates;
            var summary = this.summary;
            var mapping = this.timeDataMapping;
            var data = [];
            for (var i = 0; i < dates.length; i++) {
                data.push([dates[i], summary[i]]);
            }

            var option = {
                tooltip: {
                    formatter: function (param) {
                        if(param.seriesType!=="radar"){
                            var toolTip = '监测时间:' + param.data[0] + '<br/>' + '水质等级:' + reservoirHelper.transferGradeTitle(Math.ceil(param.data[1]));
                            eventHelper.emit('waterGrade-detail', mapping[param.data[0]]);
                            return toolTip;
                        }
                    }
                },
                title: [{
                    text: '总体水质',
                    x:'center',
                    top: '2%',
                    textStyle: {
                        fontSize: 12,
                        color: 'black'
                    },
                }, {
                    text: '各项系数指标详情',
                    x:'center',
                    top: '52%',
                    textStyle: {
                        fontSize: 12,
                        color: 'black'
                    },
                }],
                legend: {
                    show: true,
                },
                grid: {
                    left: '6%',
                    right: '6%',
                    top: '16%',
                    bottom: '50%',
                    containLabel: true
                },
                visualMap: {
                    show: false,
                    pieces: [{
                        gt: 0,
                        lte: 1,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(129, 227, 238)'
                        }, {
                            offset: 1,
                            color: 'rgb(17, 197, 250)'
                        }])
                    }, {
                        gt: 1,
                        lte: 2,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(159, 209, 254)'
                        }, {
                            offset: 1,
                            color: 'rgb(19, 169, 240)'
                        }])
                    }, {
                        gt: 2,
                        lte: 3,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(189, 255, 151)'
                        }, {
                            offset: 1,
                            color: 'rgb(96, 212, 28)'
                        }])
                    }, {
                        gt: 3,
                        lte: 4,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(104, 254, 168)'
                        }, {
                            offset: 1,
                            color: 'rgb(32, 182, 96)'
                        }])
                    }, {
                        gt: 4,
                        lte: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(254, 227, 184)'
                        }, {
                            offset: 1,
                            color: 'rgb(254, 193, 9)'
                        }])
                    }, {
                        gt: 5,
                        lte: 6,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(253, 191, 162)'
                        }, {
                            offset: 1,
                            color: 'rgb(252, 83, 4)'
                        }])
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                xAxis: {
                    splitLine: false,
                    data: dates
                },
                yAxis: {
                    min: 0,
                    splitLine: false,
                    scale: true,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        {name: '高锰酸盐指数', max: 6},
                        {name: '总磷', max: 6},
                        {name: '溶解氧', max: 6},
                        {name: '化学需氧量', max: 6},
                        {name: '五日生化需氧量', max: 6},
                        {name: 'PH值', max: 6},
                        {name: '氨氮', max: 6},
                        {name: '水温', max: 6}
                    ],
                    splitNumber: 6,
                    splitArea: {
                        areaStyle: {
                            color: ['rgb(17, 197, 250)',
                                'rgb(19, 169, 240)', 'rgb(96, 212, 28)',
                                'rgb(32, 182, 96)', 'rgb(254, 193, 9)', 'rgb(252, 83, 4)'],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    center: ['50%', '78%'],
                    radius: 50
                },
                series: [{
                    data: data,
                    type: 'scatter',
                    symbolSize: 20,
                    label: {
                        normal: {
                            formatter: function (param) {
                                var a = param.data[1];
                                return reservoirHelper.transferGradeTitle(Math.ceil(a));
                            },
                            position: 'inside',

                            textStyle: {
                                color: '#666',
                                fontSize: 16
                            },
                            show: true
                        },
                        emphasis: {
                            textStyle: {
                                color: '#666',
                                fontSize: 16
                            },
                            formatter: function (param) {
                                var a = param.data[1];
                                return reservoirHelper.transferGradeTitle(Math.ceil(a));
                            },
                            position: 'inside'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgb(251, 118, 123)'
                            }, {
                                offset: 1,
                                color: 'rgb(204, 46, 72)'
                            }])
                        }
                    }
                }, {
                    name: '指标',
                    type: 'radar',
                    data: [
                        {
                            value: [0, 0, 0, 0, 0, 0, 0, 0],
                            areaStyle: {
                                normal: {
                                    color: '#666'
                                }
                            }
                        }
                    ]
                }]
            };
            cb({
                option: option
            })
        }
    }
})