var Vue = require('vue');
var template = require('./map.html');
var loginCtrl = require('../../controllers/loginController');
var eventHelper = require('../../utils/eventHelper');
var toolBar = require('./plugin/toolBar/toolBar');
//var arcgisExpand = require('./plugin/arcgisExpand/arcgisExpand');
var mapType = require('./plugin/mapType/mapType');
var mapLegend = require('./plugin/mapLegend/mapLegend');
var flexMapLegend = require('./plugin/flexMapLegend');
var global = require('./plugin/global');
var facilityController = require('controllers/facilityController');
var arcgisHelper = require('./plugin/arcgisExpand/arcgis-load-map');
var rightPanel = require('modules/rightPanel');

var initBaseMap = function () {
    var layerURL = 'http://112.74.51.12:6080/arcgis/rest/services/hwShow201705/MapServer';
    var centerX = 113.42536;
    var centerY = 23.1803;
    var map = arcgisHelper.tdWmtsServer(layerURL, centerX, centerY);
    return map;
}
var initPlugin = function (facilityArr) {
    global.init();
    facilityController.getAllFacility(function (list) {
        $("#mapLegend").mapLegend({type: 2, data: list});
        list.forEach(function (station) {
            facilityArr[station.facilityTypeName] = station.facilitys;
            arcgisHelper.createPoints(station);
        })
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
    mounted: function () {
        this.facilityArr = {};
        initPlugin(this.facilityArr);
        var self = this;
        var map = initBaseMap();
        eventHelper.on('facility-checked', function (subFacilities) {
            arcgisHelper.createPoints(subFacilities);
            self.facilityArr[subFacilities.facilityTypeName] = subFacilities.facilitys;
        });
        eventHelper.on('facility-unchecked', function (subFacilities) {
            arcgisHelper.removePoints(self.facilityArr[subFacilities.facilityTypeName]);
        });
        eventHelper.on('subFacility-clicked', function (point) {
            console.log(point);
            map.centerAt([point.center[0] + 0.05, point.center[1]]);
            this.$refs.rightPanel.open(point);
        }.bind(this));
    },
    components: {
        'right-panel': rightPanel,
        'flex-map-legend':flexMapLegend
    }
});
module.exports = comm;