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
                zoom: 9
            });
            window.cesc.map=map;
            var basemap = new TDTLayer();
            //var tomcatLayer = new TomcatLayer({url:'http://172.17.5.150:8080/shenzhen/ArcgisServerTiles/_alllayers'});
            //console.log(tomcatLayer);
            //map.addLayer(tomcatLayer);
            //console.log(basemap);
            map.addLayer(basemap);
            var annolayer = new TDTAnnoLayer();
            map.addLayer(annolayer);
            var labels = new ArcGISDynamicMapServiceLayer(layerURL,{opacity:0.6});
            map.addLayer(labels);
            map.on('click', function (event) {
              console.log(event);
            });
            deviceModel.createTextSymbol(map);
            return map;
        },
        createPoints: function (facility) {
            facility.facilitys.forEach(function (item) {
                var icon = '';
                var fid = '';
                if(facility.facilityTypeName==='RF'){
                    icon = './img/mapLegend/huawei-yl.png';
                    fid = 35;
                }else if(facility.facilityTypeName==='RV'){
                    icon = './img/mapLegend/huawei-xs.png';
                    if(item.id==50 || item.id==52|| item.id==53|| item.id==57){
                        icon = './img/mapLegend/huawei-xs-red.png';
                    }
                    fid = 36;
                }else if(facility.facilityTypeName==='RC'){
                    icon = './img/mapLegend/huawei-hd.png';
                    fid = 37;
                    if(item.type=='warn'){
                        icon = './img/mapLegend/huawei-hd-yellow.png';
                    }
                }

                item.fid = fid;
                deviceModel.ssjkCreatePoint(map, item.id, 'f' + item.id, item.name, item.type, item.x, item.y, '', icon, '22', '30', facility.facilityTypeName,item);
            });
        },
        removePoints: function (list) {
            list.forEach(function (item) {
                map.removeLayer(map.getLayer('f' + item.id));
            });
        }
    }
});