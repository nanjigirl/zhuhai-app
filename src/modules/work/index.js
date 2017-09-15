var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
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
                    img: 'img/icon/icon-news.png',
                    text: '新闻动态'
                }, {
                    id: 'zdgz',
                    img: 'img/icon/icon-care.png',
                    text: '重点关注'
                }, {
                    id: 'tszs',
                    img: 'img/icon/icon-mountain.png',
                    text: '他山之石'
                }, {
                    id: 'zcfg',
                    img: 'img/icon/icon-law.png',
                    text: '政策法规'
                }
            ],
            questionList: [
                {
                    title: '管道埋深不达标',
                    address: '海珠区南边路',
                    solution: '需要重新填埋管道',
                    people: '许军',
                    date: '2017-9-2',
                    num: 32,
                    count: 15,
                    describe: '管道埋的深度不达标',
                    img: 'img/pipe.png'
                }, {
                    title: '爆管',
                    address: '海珠区南边路',
                    solution: '需要重新更换管道',
                    people: '许军',
                    date: '2017-8-31',
                    num: 26,
                    count: 18,
                    describe: '管道埋的深度不达标',
                    img: 'img/pipe.png'
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
            } else if (subId === 'zcfg' || subId === 'tszs' || subId === 'zdgz') {
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