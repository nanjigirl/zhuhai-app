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
            message: 'Vue Module Seed'
        }
    },
    methods: {
        test:function(){

        }
    },
    mounted: function () {
        eventHelper.on('openUploadBtn',function(){
            console.log(123);
        });
    },
    components: {
        'arcgis-plugin':arcgisPlugin
    }
});
module.exports = comm;