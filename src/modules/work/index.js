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
                    img:'img/icon/icon-upload-white.png',
                    text:'本地草稿'
                },{
                    id:'trsb',
                    img:'img/icon/icon-upload-white.png',
                    text:'他人上报'
                }
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