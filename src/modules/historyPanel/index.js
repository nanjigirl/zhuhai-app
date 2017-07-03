var template=require('./history-panel.html');
var echarts=require('echarts');
var detailGridHeader=[{key:'startDate',value:'起始时间'},{key:'deep',value:'最大积水深度'},{key:'period',value:'积水时长'}];
var eventHelper = require('utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data:function () {
        return {
            paishui:false,
            yilao:false,
            yuliang:false,
            bengzhan:false,
            seeperDetail:false,
            reservoir:false,
            hideHistoryChart:false,
            showBackButton:false,
            heads:detailGridHeader,
            rows:[{
            	startDate:'2016-10-09',
            	deep:'0.4m',
            	period:'6h'
            },{
            	startDate:'2016-10-19',
            	deep:'0.1m',
            	period:'6h'
            },{
            	startDate:'2016-11-09',
            	deep:'0.4m',
            	period:'7h'
            },{
            	startDate:'2016-10-29',
            	deep:'1.4m',
            	period:'6h'
            }]
        }
    },
    mounted:function(){
    	this.$on('switchMode',function(facility){
    		this.facility = facility;
    		if(facility.facilityTypeName ==='WP'){
    			this.yilao = true;
    			this.paishui=false;
                this.yuliang=false;
                this.bengzhan=false;
                this.seeperDetail=false;
                this.reservoir=false;
    		}else if(facility.facilityTypeName ==='WD'){
                this.yilao = false;
                this.paishui=true;
                this.yuliang=false;
                this.bengzhan=false;
                this.seeperDetail=false;
                this.reservoir=false;
            }else if(facility.facilityTypeName ==='RF'){
                this.yilao = false;
                this.paishui=false;
                this.yuliang=true;
                this.bengzhan=false;
                this.seeperDetail=false;
                this.reservoir=false;
                this.$nextTick(function(){
                    var rainChart = echarts.init($('.warningCounter')[0]);
                    var option = {
                        title: {
                            text: '暴雨预警',
                            left: 'center',
                            textStyle: {
                                color: '#5097B5',
                                fontSize:15
                            }
                        },

                        tooltip : {
                            trigger: 'item',
                            formatter: "{b} : {c}次"
                        },
                        series : [
                            {
                                name:'预警次数(次)',
                                type:'pie',
                                radius : '73%',
                                center: ['50%', '40%'],
                                data:[
                                    {value:4, name:'蓝色预警',
                                        itemStyle:{
                                            normal:{color:'#3265FF'}
                                        }

                                    },
                                    {value:2, name:'橙色预警',
                                        itemStyle:{
                                            normal:{color:'#FE9900'}
                                        }


                                    },
                                    {value:4, name:'黄色预警',
                                        itemStyle:{
                                            normal:{color:'#FFFF02'}
                                        }},
                                    {value:3, name:'红色预警',
                                        itemStyle:{
                                            normal:{color:'#D72E29'}
                                        }}
                                ],
                                label: {
                                    normal: {
                                        formatter:'{c}次',
                                        textStyle:{
                                            color:'black'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length:1
                                    }
                                },
                                animationType: 'scale',
                                animationEasing: 'elasticOut',
                                animationDelay: function (idx) {
                                    return Math.random() * 200;
                                }
                            }
                        ]
                    };
                    rainChart.setOption(option);
                    eventHelper.emit('closeLoading');
                });
            }else if(facility.facilityTypeName ==='PP'){
                this.yilao = false;
                this.paishui=false;
                this.yuliang=false;
                this.bengzhan=true;
                this.seeperDetail=false;
                this.reservoir=false;
            }
            else if(facility.facilityTypeName ==='SG'){
                this.yilao = false;
                this.paishui=false;
                this.yuliang=false;
                this.bengzhan=true;
                this.seeperDetail=false;
                this.reservoir=false;
            }else if(facility.facilityTypeName ==='RV' || facility.facilityTypeName ==='RC'){
                this.yilao = false;
                this.paishui=false;
                this.yuliang=false;
                this.bengzhan=false;
                this.seeperDetail=false;
                this.reservoir=true;
            }
    	}.bind(this));
        var myChart = echarts.init($('.historyChart')[0]);
       var placeHolderStyle = {
            normal: {
                label: {
                    show: false,
                    position: "center"
                },
                labelLine: {
                    show: false
                },
                color: "#dedede",
                borderColor: "#dedede",
                borderWidth: 0
            },
            emphasis: {
                color: "#dedede",
                borderColor: "#dedede",
                borderWidth: 0
            }
        };
       var option = {
            backgroundColor: '#fff',
            color: ['#fc7a26', '#fff', '#ffa127', '#fff', "#ffcd26"],
            legend: [{
                orient: '',
                icon: 'circle',
                left: 'right',
                top: 'center',
                data: ['1#泵', '2#泵', '3#泵']
            }],
            series: [{
                name: '值',
                type: 'pie',
                clockWise: true, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: ['89%', '90%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'outside'
                        },
                        labelLine: {
                            show: true,
                            length: 40,
                            smooth: 0.5
                        },
                        borderWidth: 5,
                        shadowBlur: 40,
                        borderColor: "#fc7a26",
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [{
                    value: 7,
                    name: '70'
                }, {
                    value: 3,
                    name: '',
                    itemStyle: placeHolderStyle
                }]
            }, {
                name: '白',
                type: 'pie',
                clockWise: false,
                radius: ['80%', '80%'],
                hoverAnimation: false,
                data: [{
                    value: 1
                }]
            }, {
                name: '值',
                type: 'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['69%', '70%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        labelLine: {
                            show: true,
                            length: 40,
                            smooth: 0.5
                        },
                        borderWidth: 5,
                        shadowBlur: 40,
                        borderColor: "#ffa127",
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [{
                    value: 6,
                    name: '60'
                }, {
                    value: 4,
                    name: '',
                    itemStyle: placeHolderStyle
                }]
            }, {
                name: '白',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                radius: ['59%', '60%'],
                data: [{
                    value: 1
                }]
            }, {
                name: '值',
                type: 'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: ['49%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        labelLine: {
                            show: true,
                            length: 40,
                            smooth: 0.5
                        },
                        borderWidth: 5,
                        shadowBlur: 40,
                        borderColor: "#ffcd26",
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [{
                    value: 4,
                    name: '40'
                }, {
                    value: 6,
                    name: '',
                    itemStyle: placeHolderStyle
                }]
            }, {
                type: 'pie',
                color: ['#fc7a26', '#ffa127', "#ffcd26"],
                data: [{
                    value: '',
                    name: '1#泵'
                }, {
                    value: '',
                    name: '2#泵'
                }, {
                    value: '',
                    name: '3#泵'
                }]
            }, {
                name: '白',
                type: 'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: [100,100],
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: 1,
                    label: {
                        normal: {
                            formatter: '查询总时长',
                            textStyle: {
                                color: '#666666',
                                fontSize: 12
                            }
                        }
                    }
                }, {
                    tooltip: {
                        show: false
                    },
                    label: {
                        normal: {
                            formatter: '\n100小时',
                            textStyle: {
                                color: '#666666',
                                fontSize: 12
                            }
                        }
                    }
                }]
            }]
        };
        myChart.setOption(option);
        var myChart1 = echarts.init($(".reservoir-history-chart")[0]);
        var option1 = {
            title: {
                text: '水质监测',
                x:'center',
                top:10
            },
            tooltip: {
                trigger: 'axis'
            },
            color: ["#FF0000", "#00BFFF", "#FF00FF", "#1ce322", "#000000", '#EE7942','red','pink'],
            legend: {
                data:['水温','PH值','溶解氧','高锰酸盐指数','化学需氧量','五日生化需氧量','氨氮','总磷'],
                bottom:0
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                offset:'40',
                boundaryGap: false,
                data: ['2017/1/24','2017/1/25','2017/1/26','2017/2/3','2017/2/6','2017/2/7','2017/2/8']
            },
            yAxis: [{
                type: 'value',
                offset:'20',
                axisLabel: {
                    formatter: '{value} '
                },
                min: 0,
                max: 6
            }],
            series: [{
                "name": "1级",
                "type": "bar",
                "stack": "总量",
                "barMaxWidth": 35,
                "itemStyle": {
                    "normal": {
                        "color": "#11c5fa"
                    }
                },
                "data": [
                    1
                ],
            },
                {
                    "name": "2级",
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
                },{
                    "name": "3级",
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
                },{
                    "name": "4级",
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
                },{
                    "name": "5级",
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
                },{
                    "name": "6级",
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
                },{
                    name: '水温',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[0.5, 1.5, 0.5, 2.5, 4.5, 2.5, 1.5]
                }, {
                    name: 'PH值',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[0.5, 2.5, 1.5, 2.5, 3.5, 2.5, 0.5]
                }, {
                    name: '溶解氧',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[2.5, 1.5, 3.5, 2.5, 4.5, 5.5, 1.5]
                }, {
                    name: '高锰酸盐指数',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[5.5, 1.5, 2.5, 3.5, 4.5, 0.5, 3.5]
                }, {
                    name: '化学需氧量',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[2.5, 1.5, 3.5, 0.5, 4.5, 1.5, 1.5]
                }, {
                    name: '五日生化需氧量',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[3.5, 4.5, 2.5, 0.5, 4.5, 3.5, 1.5]
                }, {
                    name: '氨氮',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[1.5, 2.5, 2.5, 3.5, 4.5, 0.5, 1.5]
                }, {
                    name: '总磷',
                    type: 'line',
                    smooth:true,
                    lineStyle: {
                        normal: {
                            width: 2,
                        }
                    },
                    data:[4.5, 2.5, 0.5, 1.5, 2.5, 3.5, 0.5]
                }]
        };
        myChart1.setOption(option1);
    },
    methods:{
    	goBack:function(){
		if(this.facility.facilityTypeName ==='WP'){
			this.yilao = true;
		}
		else if(this.facility.facilityTypeName ==='WD'){
			this.paishui=true;
		}else if(this.facility.facilityTypeName ==='RF'){
            this.yuliang=true;
        }else if(this.facility.facilityTypeName ==='PP'){
            this.bengzhan=true;
        }else if(this.facility.facilityTypeName ==='SG'){
            this.bengzhan=true;
        }
    	}
    }

});
module.exports=comm;