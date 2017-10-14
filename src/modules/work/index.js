var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            workBannerImg:'./img/Banner.jpg',
            topNavArr: [
                {
                    id: 'upload',
                    img: 'img/icon/icon-upload-white.png',
                    text: '问题上报'
                }, {
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
            contentList: [
                {
                    id: 'xwdt',
                    class:'icon-news color-news',
                    text: '新闻中心'
                }, {
                    id: 'zdgz',
                    class:'icon-falvfagui color-dongtai',
                    text: '法律法规'
                }, {
                    id: 'tszs',
                    class:'icon-gonggao color-gonggao',
                    text: '通知公告'
                }, {
                    id: 'zcfg',
                    class:'icon-yonghushouce color-yhsc',
                    text: '用户手册'
                }, {
                    id: 'szxx',
                    class:'icon-shuizhixinxi color-szxx',
                    text: '水质信息'
                },{
                    id: 'hhml',
                    class:'icon-hehuminglu color-news',
                    text: '河湖名录'
                }, {
                    id: 'hzml',
                    class:'icon-hzcard color-dongtai',
                    text: '河长名录'
                },
            ],
            questionList: [
                {
                    title: '工业废水排放',
                    address: '高青县芦湖公园',
                    solution: '专项检测',
                    people: '许军',
                    date: '2017-9-2',
                    num: 32,
                    count: 15,
                    describe: '工业废水排放',
                    img: 'img/detail-jgds.png'
                }, {
                    title: '建筑废弃物',
                    address: '高青县金都花园西门',
                    solution: '清理',
                    people: '陈红',
                    date: '2017-8-31',
                    num: 26,
                    count: 18,
                    describe: '建筑废弃物',
                    img: 'img/detail-wsyl.jpg'
                }
            ]
        }
    },
    methods: {
        showSub: function (subId, content) {
            if (!!content) {
                eventHelper.emit('openComment', content);
            }
            if (subId === 'upload') {
                eventHelper.emit('change-menu', subId);
                eventHelper.emit('toggleTabClass', subId);
            } else if (subId === 'zcfg' || subId === 'tszs') {
                return;
            } else {
                eventHelper.emit('openSub', subId);
            }
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;