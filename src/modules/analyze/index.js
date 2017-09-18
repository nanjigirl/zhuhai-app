var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var mapHelper = require('utils/mapHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: 'Vue Module Seed'
        }
    },
    methods: {},
    mounted: function () {
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
            setTimeout(function () {
                mapHelper.setCenter(44407.60210154524, 28578.197386459644,this.map,8);
            }.bind(this),1500);
            for(var i=0;i<lineArr.length-1;i++){console.log(1);
                mapHelper.drawLine(this.map, [lineArr[i].x,lineArr[i].y ], [lineArr[i+1].x,lineArr[i+1].y],5,'#f00');
            }
            mapHelper.addPointAndName(this.map, 44290.52374238852, 28800.580122891788, './img/icon/qidian.png',20,20,true,{facilityType: 'tupian'});
        }.bind(this));

    },
    components: {}
});
module.exports = comm;