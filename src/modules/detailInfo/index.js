var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
//加载地图组件
var arcgisPlugin = require('modules/arcgisPlugin');
var mapHelper = require('utils/mapHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            setBtn:false,
            dialogImageUrl: '',
            dialogVisible: false,
            questionTitle:'',
            isLocated:false
        }
    },
    methods: {
        returnMain:function(){
            eventHelper.emit('returnBack');
        },
        addNewItem:function(){
            eventHelper.emit('setNormalQues',this.questionTitle);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        locatePosition:function(){
            this.isLocated = true;
        }
    },
    mounted: function () {
        eventHelper.on('openDetailInfo',function(title){
            if(!!title){
                this.questionTitle = title;
                this.setBtn = false;
                this.isLocated = false;
            }else{
                this.isLocated = false;
                this.questionTitle = '';
                this.setBtn = true;
            }
        }.bind(this));
        this.map = mapHelper.getArcGISTiledMap('locateMap', 'http://10.194.148.18:6080/arcgis/rest/services/guangzhoumap_gz/MapServer');
        this.map.on('load', function () {
            mapHelper.addPoint(this.map, 39366.73260040782, 29446.950962383147, 'img/dirtyPipe.png', {facilityType: 'CP'});
        }.bind(this));
    },
    components: {
        'arcgis-plugin': arcgisPlugin
    }
});
module.exports = comm;