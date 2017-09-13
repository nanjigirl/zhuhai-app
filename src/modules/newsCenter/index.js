var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var newsDetail = require('modules/newsDetail');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showNewsDetail:false,
            newsList:[
                {
                    title:'市委常委谢晓丹赴白云、花都两区调研河涌合治理工作',
                    imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    '<img src="img/cropper/cropper.jpg">' +
                    '<img src="img/cropper/cropper.jpg">',
                    date:'2017-08-31',
                    num:26,
                    count:18
                },{
                    title:'市委常委谢晓丹赴白云、花都两区调研河涌合治理工作',
                    imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    '<img src="img/cropper/cropper.jpg">' +
                    '<img src="img/cropper/cropper.jpg">',
                    date:'2017-08-31',
                    num:26,
                    count:18
                },{
                    title:'市委常委谢晓丹赴白云、花都两区调研河涌合治理工作',
                    imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    '<img src="img/cropper/cropper.jpg">' +
                    '<img src="img/cropper/cropper.jpg">',
                    date:'2017-08-31',
                    num:26,
                    count:18
                }
            ]
        }
    },
    methods: {
        returnHome:function(){
            eventHelper.emit('openSub');
        },
        openNewsInfo:function(id){
            this.showNewsDetail = true;
            eventHelper.emit('openDetail',id);
        }
    },
    mounted: function () {
        eventHelper.on('returnNewsHome',function(){
            this.showNewsDetail = false;
        }.bind(this));
    },
    components: {
        'news-detail':newsDetail
    }
});
module.exports = comm;