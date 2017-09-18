var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var mapHelper = require('utils/mapHelper');
var echarts = require('echarts');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: 'Vue Module Seed',
            currentDate:new Date().toLocaleDateString(),
        }
    },
    methods: {},
    mounted: function () {
        var option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     top:'10%',
            //     data: ['路面','雨水口','各类检查井','管道、渠箱','边沟','倒虹管','排放口','闸门、阀门、拍门']
            // },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '50%'],
                    data:[
                        {value:650, name:'路面'},
                        {value:310, name:'雨水口'},
                        {value:234, name:'各类检查井'},
                        {value:135, name:'管道、渠箱'},
                        {value:224, name:'边沟'},
                        {value:335, name:'倒虹管'},
                        {value:333, name:'排放口'},
                        {value:312, name:'闸门、阀门、拍门'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        var chartsDiv = document.getElementById('xunChaEcharts');
        var xunChaEcharts = echarts.init(chartsDiv);
        xunChaEcharts.setOption(option);
        console.log(123);
        console.log(echarts);
        var lineArr = [
            {x:44291.429939729016,y:28800.045292982253},
            {x: 44551.780460430055,y:28772.528571282142},
            {x: 44556.01380223008,y: 28387.2944674806},
            {x:44516.85539057992,y: 28344.96104948043},
            {x:44285.07992702899,y: 28369.302764830525},
            {x:44291.429939729016,y:28800.045292982253},];
        this.map = mapHelper.getArcGISTiledMap('xunChaMap', 'http://10.194.148.18:6080/arcgis/rest/services/guangzhoumap_gz/MapServer');
        this.map.on('click',function (event) {
                console.log(event);
        });
        this.map.on('load', function (event) {
            mapHelper.setCenter(44407.60210154524, 28578.197386459644,this.map,7);
            for(var i=0;i<lineArr.length-1;i++){
                mapHelper.drawLine(this.map, [lineArr[i].x,lineArr[i].y ], [lineArr[i+1].x,lineArr[i+1].y],5,'#f00');
            }
            mapHelper.addPointAndName(this.map, 44290.52374238852, 28800.580122891788, './img/icon/qidian.png',20,20,true,{facilityType: 'tupian'});
        }.bind(this));

    },
    components: {}
});
module.exports = comm;