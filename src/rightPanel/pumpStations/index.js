var template=require('./pumpStations.html');
var echarts = require('echarts');
// 定义组件
var comm = Vue.extend({
    template: template,
    data:function () {
        return {
            message:''
        }
    },
    mounted:function(){
        var myChart1 = echarts.init($('.pumpChart')[0]);
        var myChart2 = echarts.init($('.pumpChart')[1]);
        var myChart3 = echarts.init($('.pumpChart')[2]);
        var myChart4 = echarts.init($('.pumpChart')[3]);
        var option = {
            title:{
                text:"XXX#闸",
                x:'center',
                y:5
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['闸前水位','闸位','闸后水位'],
                bottom:5
            },
            grid: {
                left: '3%',
                right: '4%',
                top:65,
                bottom: 75,
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['1#闸站']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name:'水位(m)',
                    max:10
                }
            ],
            series : [
                {
                    name:'闸前水位',
                    type:'bar',
                    barWidth:'20%',
                    itemStyle:{
                        normal:{
                            color:'#2AA4C7'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}m'
                        }
                    },
                    data:[3]
                },
                {
                    name:'闸位',
                    type:'bar',
                    barWidth:'10%',
                    barGap:'-1%',
                    itemStyle:{
                        normal:{
                            color:'#403E2F'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}m'
                        }
                    },
                    data:[6]
                },
                {
                    name:'闸后水位',
                    type:'bar',
                    barWidth:'20%',
                    itemStyle:{
                        normal:{
                            color:'#1E6E85'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}m'
                        }
                    },
                    data:[5]
                }
            ]
        }
        myChart1.setOption(option);
        myChart2.setOption(option);
        myChart3.setOption(option);
        myChart4.setOption(option);
    }
});
module.exports=comm;