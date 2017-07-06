define(function () {
    var Map = cesc.require("esri/map"),
        TDTLayer = require('./TDTLayer'),
        TomcatLayer = require('./TomcatLayer'),
        TDTAnnoLayer = require('./TDTAnnoLayer'),
        ArcGISDynamicMapServiceLayer = cesc.require('esri/layers/ArcGISDynamicMapServiceLayer'),
        deviceModel = require('./deviceModel');
    var map;
    var deviceList = {};
    var savedPoint;
    return {
        /**
         * 天地图WMTS
         **/
        tdWmtsServer: function (layerURL, centerX, centerY) {
            map = new Map("mapDiv", {
                center: [centerX, centerY],
                zoom: 10
            });
            window.cesc.map = map;
            var basemap = new TDTLayer();
            //var tomcatLayer = new TomcatLayer({url:'http://172.17.5.150:8080/shenzhen/ArcgisServerTiles/_alllayers'});
            //console.log(tomcatLayer);
            //map.addLayer(tomcatLayer);
            //console.log(basemap);
            map.addLayer(basemap);
            var annolayer = new TDTAnnoLayer();
            map.addLayer(annolayer);
            var labels = new ArcGISDynamicMapServiceLayer(layerURL, {opacity: 0.6});
            map.addLayer(labels);
            map.on('click', function (event) {
                console.log(event);
            });
            deviceModel.createTextSymbol(map);
            return map;
        },
        createPoints: function (facilitys,legend) {
            facilitys.forEach(function (item) {
                var icon = './img/toolbar/'+legend.icon+'.png';
                var fid = legend.id;
                item.fid = fid;
                deviceModel.ssjkCreatePoint(map, item.id, 'f' + item.id, item.name, item.type, item.x, item.y, '', icon, '22', '22', legend.facilityTypeName, item);
            });
        },
        createDistrict: function (map) {
            deviceModel.ssjkCreatePoint(map, 999, 'f999', '兴宁区 1', 'abc', 108.36375263916017, 22.857919934082034, '', './img/mapLegend/district.png', '50', '30', 'abc', {
                fid: 123,
                name: 123
            });
        },
        removePoints: function (list) {
            list.forEach(function (item) {
                map.removeLayer(map.getLayer('f' + item.id));
            });
        }
    }
});