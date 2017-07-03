var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var echarts = require('echarts');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            galleries:[
                {edit:'Your text',imgSrc:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming for the South'},
                {edit:'Your text',imgSrc:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming for the South'},
                {edit:'Your text',imgSrc:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming for the South'},
                {edit:'Your text',imgSrc:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming for the South'},
                {edit:'Your text',imgSrc:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming for the South'}
            ],
            images:[
                {src:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming',name:'Image Name'},
                {src:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming',name:'Image Name'},
                {src:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming',name:'Image Name'},
                {src:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming',name:'Image Name'},
                {src:'img/mediaGallery/media.jpg',desc:'Snow and Ice Incoming',name:'Image Name'}
            ]
        }
    },
    methods: {

    },
    mounted: function () {

    },
    components: {}
});
module.exports = comm;