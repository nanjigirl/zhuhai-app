var Vue = require('vue');
var template = require('./map.html');
var loginCtrl = require('../../controllers/loginController');
var eventHelper = require('../../utils/eventHelper');
var toolBar = require('./plugin/toolBar/toolBar');
//var arcgisExpand = require('./plugin/arcgisExpand/arcgisExpand');
var mapType = require('./plugin/mapType/mapType');
var global = require('./plugin/global');
var facilityController = require('controllers/facilityController');
var arcgisHelper = require('./plugin/arcgisExpand/arcgis-load-map');
var rightPanel = require('modules/rightPanel');
// var flexMapLegend = require('./plugin/flexMapLegend');
// var appCarMonitor = require('modules/appCarMonitor');
// var appCarPlayback = require('modules/appCarPlayback');
// var appCarIllegal = require('modules/appCarIllegal');
// var appCarCase = require('modules/appCarCase');
// var appCarPollution = require('modules/appCarPollution');
var initBaseMap = function () {
    //init map
    var layerURL = 'http://112.74.51.12:6080/arcgis/rest/services/hwShow201705/MapServer';
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
        eventHelper.emit('mapCreated', map);
        this.$on('openMapLegend', function (legend) {
            eventHelper.emit('loading-start');
            console.log(legend);
            if (!!legend.showIcon) {
                var cacheFacilities = self.facilityArr[legend.facilityTypeName];
                if (!!cacheFacilities && cacheFacilities.length > 0) {
                    arcgisHelper.createPoints(cacheFacilities, legend);
                    eventHelper.emit('loading-end');
                } else {
                    facilityController.getFacilityByType(legend.id, function (subFacilities) {
                        if (legend.facilityTypeName == 'WD') {
                            subFacilities.forEach(function (subFacility) {
                                subFacility.icon = './css/images/huawei-yj.png'
                            })
                        } else if (legend.facilityTypeName == 'WP') {
                            subFacilities.forEach(function (subFacility) {
                                subFacility.icon = './css/images/huawei-yld.png'
                            })
                        }
                        var graLayer = arcgisHelper.createPoints(subFacilities, legend);
                        self.facilityArr[legend.facilityTypeName] = {
                            data: subFacilities,
                            layer: graLayer
                        };
                        eventHelper.emit('loading-end');
                    });
                }
            } else {
                arcgisHelper.removePoints(self.facilityArr[legend.facilityTypeName]);
                eventHelper.emit('loading-end');
            }
        });
        eventHelper.on('subFacility-clicked', function (point) {
            console.log(point);
            map.centerAt([parseFloat(point.center[0]) + 0.001, point.center[1]]);
            this.$refs.rightPanel.open(point.item, point.facilityTypeName);
        }.bind(this));
    },
    components: {
        'right-panel': rightPanel,
        // 'flex-map-legend': flexMapLegend,
        // 'app-car-illegal': appCarIllegal,
        // 'app-car-case': appCarCase,
        // 'app-car-pollution': appCarPollution,
        // 'app-car-playback': appCarPlayback,
        // 'app-car-monitor': appCarMonitor
    }
});
module.exports = comm;