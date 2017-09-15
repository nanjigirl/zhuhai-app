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
                    title:'广州在省内首推“掌上治水”',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-15',
                    num:26,
                    count:18
                },{
                    title:'白云湖管理处加强暑期野泳预防治理，未成年人溺水事故零报告',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-13',
                    num:26,
                    count:18
                },{
                    title:'市人大组织暗访流溪河流域黄埔区九龙镇水环境治理工作',
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