var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var echarts = require('echarts');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: 'Vue Module Seed',
            show:false
        }
    },
    methods: {},
    mounted: function () {
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
                    data : ['1#厂', '2#厂', '3#厂', '4#厂', '5#厂', '6#厂', '7#厂'],
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
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };
        setTimeout(function(){
            this.show = true;
            this.$nextTick(function(){
                var leftChart = echarts.init($('.chartContain')[0]);
                leftChart.setOption(option1);
                var rightChart = echarts.init($('.chartContain')[1]);
                rightChart.setOption(option1);
            });
        }.bind(this),500);
    },
    components: {}
});
module.exports = comm;