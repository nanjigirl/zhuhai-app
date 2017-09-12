var Vue = require('vue');
var template = require('./map.html');
var loginCtrl = require('../../controllers/loginController');
var eventHelper = require('../../utils/eventHelper');
var toolBar = require('./plugin/toolBar/toolBar');
//var arcgisExpand = require('./plugin/arcgisExpand/arcgisExpand');
var mapType = require('./plugin/mapType/mapType');
// var flexMapLegend = require('./plugin/flexMapLegend');
var global = require('./plugin/global');
var facilityController = require('controllers/facilityController');
var arcgisHelper = require('./plugin/arcgisExpand/arcgis-load-map');
var mapHelper = require('utils/mapHelper');
var rightPanel = require('modules/rightPanel');

var initBaseMap = function () {
    //init map
    var layerURL = 'http://10.194.148.18:6080/arcgis/rest/services/guangzhoumap_gz/MapServer';
    var centerX = 120.50464819480258;
    var centerY = 31.505256080886113;
    var map = arcgisHelper.tdWmtsServer(layerURL, centerX, centerY);
    return map;
}
var initPlugin = function (facilityArr, self) {
    global.init();
    facilityController.getAllFacilityType(function (list) {
        self.$refs.mapLegend.init(list);
        // list.forEach(function (station) {
        //     facilityArr[station.facilityTypeName] = station.facilitys;
        //     arcgisHelper.createPoints(station);
        // })
    });
}

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: '',
            roleName: '',
            userName: '',
            loginSuccess: false,
            detailOpen: false,
            facility: '',
            showtools: false
        }
    },
    methods: {
        toggleSearch: function () {
            eventHelper.emit('openPointSearch');
            // eventHelper.emit('app-car-illegal');
            // eventHelper.emit('app-car-cases');
            // eventHelper.emit('app-car-pollution');
        }
    },
    mounted: function () {
        this.facilityArr = {};
        initPlugin(this.facilityArr, this);
        var self = this;
        var map = initBaseMap();
        var mapParams = {
            'id':'graphic',
            'map':map,
            'x':120.50392399836858,
            'y':31.504902029296147,
            'iconUrl':'./css/images/huawei-hd.png',
            'name':'测试点',
            'height':20,
            'width':20,
            'angel':270
        }
        mapHelper.createSymbol(mapParams.map, mapParams.x,mapParams.y, mapParams.iconUrl, mapParams.name, mapParams.height, mapParams.width, mapParams.angel,mapParams);
        eventHelper.emit('mapCreated', map);
        // this.$on('openMapLegend', function (legend) {
        //     eventHelper.emit('loading-start');
        //     console.log(legend);
        //     if (!!legend.showIcon) {
        //         var cacheFacilities = self.facilityArr[legend.facilityTypeName];
        //         if (!!cacheFacilities && cacheFacilities.length > 0) {
        //             arcgisHelper.createPoints(cacheFacilities, legend);
        //             eventHelper.emit('loading-end');
        //         } else {
        //             facilityController.getFacilityByType(legend.id, function (subFacilities) {
        //                 if (legend.facilityTypeName == 'WD') {
        //                     subFacilities.forEach(function (subFacility) {
        //                         subFacility.icon = './css/images/huawei-yj.png'
        //                     })
        //                 } else if (legend.facilityTypeName == 'WP') {
        //                     subFacilities.forEach(function (subFacility) {
        //                         subFacility.icon = './css/images/huawei-yld.png'
        //                     })
        //                 }
        //                 var graLayer = arcgisHelper.createPoints(subFacilities, legend);
        //                 self.facilityArr[legend.facilityTypeName] = {
        //                     data: subFacilities,
        //                     layer: graLayer
        //                 };
        //                 eventHelper.emit('loading-end');
        //             });
        //         }
        //     } else {
        //         arcgisHelper.removePoints(self.facilityArr[legend.facilityTypeName]);
        //         eventHelper.emit('loading-end');
        //     }
        // });
        // eventHelper.on('subFacility-clicked', function (point) {
        //     console.log(point);
        //     map.centerAt([parseFloat(point.center[0]) + 0.001, point.center[1]]);
        //     this.$refs.rightPanel.open(point.item, point.facilityTypeName);
        // }.bind(this));
    },
    components: {
        'right-panel': rightPanel,
        // 'flex-map-legend': flexMapLegend,
    }
});
module.exports = comm;