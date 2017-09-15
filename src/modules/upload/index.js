var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var moduleController = require('controllers/moduleController');
//加载地图组件
var arcgisPlugin = require('modules/arcgisPlugin');
var mapHelper = require('utils/mapHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            searchInput:'',
            showUpLoadBtn: false,
            topNavArr:[
                {
                    id:'wdsb',
                    img:'img/icon/icon-history.png',
                    text:'我的上报'
                },{
                    id:'bdcg',
                    img:'img/icon/icon-draft.png',
                    text:'本地草稿'
                },{
                    id:'trsb',
                    img:'img/icon/icon-report.png',
                    text:'他人上报'
                }
            ],
        }
    },
    methods: {
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
        updateNew: function () {
            eventHelper.emit('change-menu', 'new-question');
        }
    },
    mounted: function () {
        eventHelper.on('openUploadBtn', function () {
            this.showUpLoadBtn = true;
        }.bind(this));
        this.map = mapHelper.getArcGISTiledMap('mainMap', 'http://10.194.148.18:6080/arcgis/rest/services/guangzhoumap_gz/MapServer');
        this.map.on('load', function () {
            mapHelper.addPoint(this.map, 39366.73260040782, 29446.950962383147, './img/dirtyPipe.png', {facilityType: 'CP'});
        }.bind(this));
        this.map.on('click', function (evt) {
            if (!!evt.graphic && evt.graphic.attributes.facilityType == 'CP') {
                this.$toast({
                    message: '提示',
                    position: 'middle',
                    duration: 5000
                });
                this.showUpLoadBtn = true;
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