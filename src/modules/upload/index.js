var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var moduleController = require('controllers/moduleController');
//加载地图组件
var arcgisPlugin = require('modules/arcgisPlugin');
var arcgisHelper = require('modules/arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var mapHelper = require('utils/mapHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            locationTips: false,
            locationStatus: '',
            dialogFormVisible: false,
            reportQuestion: './img/icon/icon-cloud.png',
            searchInput: '',
            showUpLoadBtn: false,
            topNavArr: [
                {
                    id: 'wdsb',
                    img: 'img/icon/icon-history.png',
                    text: '我的上报'
                }, {
                    id: 'bdcg',
                    img: 'img/icon/icon-draft.png',
                    text: '本地草稿'
                }, {
                    id: 'trsb',
                    img: 'img/icon/icon-report.png',
                    text: '他人上报'
                }
            ],
        }
    },
    // watch: {
    //     value:function(val){
    //         if(!!val){
    //             eventHelper.emit('openSub', {type:'sbwt',val:val});
    //             this.dialogFormVisible = false;
    //             //eventHelper.emit('uploadList',val);
    //         }
    //     }
    // },
    methods: {
        locate: function () {
            var self = this;
            self.locationTips = true;
            self.locationStatus = '正在定位...';
            self.locationStatus = '定位成功!'
            setTimeout(function () {
                self.locationTips = false;
            }, 2000);
            mapHelper.setCenter(117.81823210976921, 37.15700529790023, self.map, 18);
            mapHelper.addPoint(self.map, 117.81823210976921, 37.15700529790023, "./img/icon/position.png", {});
            // AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.Geocoder', 'AMap.Geolocation'], function () {
            //     var geolocation = new AMap.Geolocation({
            //         // enableHighAccuracy: true,//是否使用高精度定位，默认:true
            //         timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            //         buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            //         zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            //         buttonPosition: 'LT',
            //         showButton: false,
            //     });
            //     // self.map.addControl(geolocation);
            //     geolocation.getCurrentPosition();
            //     var geocoder = new AMap.Geocoder({
            //         city: "020"//城市，默认：“全国”
            //     });
            //     AMap.event.addListener(geolocation, 'error', function () {
            //         self.locationStatus = '定位失败!';
            //         setTimeout(function () {
            //             self.locationTips = false;
            //         }, 2000);
            //
            //     }.bind(this));      //返回定位出错信息
            //     AMap.event.addListener(geolocation, 'complete', function (data) {
            //         var x = data.position.getLng();
            //         var y = data.position.getLat();
            //         geocoder.getAddress([x, y], function (status, result) {
            //             if (status == 'complete') {
            //                 self.map.setZoomAndCenter(16, [x, y]);
            //                 var marker = new AMap.Marker({
            //                     icon: "./img/icon/position.png",
            //                     position: new AMap.LngLat(x, y),
            //                 });
            //                 marker.setMap(self.map);
            //                 self.locationStatus = '定位成功!'
            //                 setTimeout(function () {
            //                     self.locationTips = false;
            //                 }, 2000);
            //                 var address = result.regeocode.addressComponent;
            //                 this.location = x + ',' + y;
            //                 self.address = address.city + address.district + address.township + address.street + address.streetNumber;
            //                 var item = {};
            //                 item.address = self.address;
            //                 item.x = x;
            //                 item.y = y;
            //                 eventHelper.emit('get-current-address', item);
            //                 console.log(self.address)
            //             } else {
            //                 this.location = '无法获取地址';
            //             }
            //         }.bind(this));
            //     }.bind(this));//返回定位信息
            //
            // }.bind(this));
        },
        addNewPoint: function () {
            this.$toast({
                message: '请点击问题点',
                position: 'middle',
                duration: 1000
            });
            this.showUpLoadBtn = true;
            this.isAddingPoint = true;
        },
        query: function () {
            this.$toast({
                message: '查看问题点',
                position: 'middle',
                duration: 1000
            });
        },
        showSub: function (subId, content) {
            if (!!content) {
                eventHelper.emit('openComment', content);
            }
            if (subId === 'upload') {
                eventHelper.emit('change-menu', subId);
                eventHelper.emit('toggleTabClass', subId);
            } else {
                eventHelper.emit('openSub', subId);
            }
        },
        updateNew: function () {
            this.showSub('entrance');
        }
    },
    mounted: function () {
        var self = this;
        eventHelper.on('openUploadBtn', function () {
            this.showUpLoadBtn = true;
        }.bind(this));
        //self.map = mapHelper.initGaoDeServer('mainMap', '', 113.333542, 23.122644, 14);
        self.map = arcgisHelper.tdWmtsServer('mainMap', '', 117.82812946103415, 37.16944001889327, 14);
        /*     setTimeout(function () {
         mapHelper.setCenter(113.333542,23.122644,self.map,10);
         },1000);*/
        // self.map = new AMap.Map('mainMap',
        //     {
        //         resizeEnable: true,
        //         zoom:16,
        //         center: [113.333542,23.122644]
        //     });
        // self.marker = new AMap.Marker({
        //     icon: "./img/icon/pipe.png",
        //     position:new AMap.LngLat(113.333542,23.122644),
        //     extData:{
        //         facilityType:'CP'
        //     }
        // });
        // self.marker.setMap(self.map);  //在地图上添加点
        // self.marker.on('click',function (event) {
        //     this.showUpLoadBtn = true;
        //     eventHelper.emit('openUploadBtn');
        // });

        // var mapServerLayer = new AMap.TileLayer({
        //     zIndex:2,
        //     getTileUrl: 'http://112.74.51.12:6080/arcgis/rest/services/gzpsfacility_GaoDe_WGS/MapServer'
        // });
        // mapServerLayer.setMap(self.map);
        /*        self.map.on('click',function (event) {
         console.log(event);
         if (!!this.isAddingPoint) {
         var marker = new AMap.Marker({
         icon:"./img/icon/pipe.png",
         position:new AMap.LngLat(event.lnglat.lng,event.lnglat.lat),
         extData:{
         facilityType:'CP'
         }
         });
         marker.setMap(self.map);
         this.isAddingPoint = false;
         marker.on('click',function (event) {
         this.showUpLoadBtn = true;
         eventHelper.emit('openUploadBtn');
         });
         }
         }.bind(this));*/
        // this.map = mapHelper.getArcGISTiledMap('mainMap', 'http://10.194.148.18:6080/arcgis/rest/services/guangzhoumap_gz/MapServer');
        // this.map.on('load', function () {
        //   mapHelper.addPoint(this.map, 39366.73260040782, 29446.950962383147, './img/dirtyPipe.png', {facilityType: 'CP'});
        // }.bind(this));
        this.map.on('click', function (evt) {
            if (!!evt.graphic && evt.graphic.attributes.facilityType == 'CP') {
                this.showUpLoadBtn = true;
                window.cesc.currentReportPoint = evt.mapPoint;
                eventHelper.emit('openUploadBtn');
            } else if (!!this.isAddingPoint) {
                mapHelper.addPoint(this.map, evt.mapPoint.x, evt.mapPoint.y, './img/dirtyPipe.png', {facilityType: 'CP'});
                this.isAddingPoint = false;
            }
        }.bind(this));
    },
    components: {
        'arcgis-plugin': arcgisPlugin
    }
});
module.exports = comm;