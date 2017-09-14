var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            topNavArr:[
                {
                    id:'wtsb',
                    img:'img/icon/icon-upload-white.png',
                    text:'问题上报'
                },{
                    id:'wdsb',
                    img:'img/icon/icon-upload-white.png',
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
            contentList:[
                {
                    id:'xwdt',
                    img:'img/icon/icon-news.png',
                    text:'新闻动态'
                },{
                    id:'zdgz',
                    img:'img/icon/icon-care.png',
                    text:'重点关注'
                },{
                    id:'tszs',
                    img:'img/icon/icon-mountain.png',
                    text:'他山之石'
                },{
                    id:'zcfg',
                    img:'img/icon/icon-law.png',
                    text:'政策法规'
                }
            ]
        }
    },
    methods: {
        showSub:function(subId){
            eventHelper.emit('openSub',subId);
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;