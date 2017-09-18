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
            dialogFormVisible: false,
            value: '',
            options: ['路面', '雨水口', '各类检查井', '管道、渠箱', '边沟', '倒虹管', '排放口', '闸门、阀门、拍门'],
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
    watch: {
        value:function(val){
            if(!!val){
                eventHelper.emit('openSub', {type:'sbwt',val:val});
                this.dialogFormVisible = false;
                //eventHelper.emit('uploadList',val);
            }
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
            this.value = '';
            this.dialogFormVisible = true;
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