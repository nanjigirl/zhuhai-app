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
                    title:'县政协召开十四届三次常委会议',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-10-15',
                    num:26,
                    count:18
                },{
                    title:'县委办公室　县政府办公室关于印发《高青县全面实行河长制实施方案》的通知',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-02',
                    num:26,
                    count:18
                },{
                    title:'全县政务信息资源目录编制工作正式启动',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-01',
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