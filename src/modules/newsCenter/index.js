var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var detailInfo = require('modules/detailInfo');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showDetailInfo:false,
            updateNewArr:[
                {
                    id:1,
                    title:'管线老化'
                },{
                    id:2,
                    title:'管线衔接有误'
                },{
                    id:3,
                    title:'爆管'
                },{
                    id:4,
                    title:'管道断裂'
                }
            ]
        }
    },
    methods: {
        returnMain:function(){
            eventHelper.emit('change-menu','upload');
            eventHelper.emit('closeUploadBtn');
        },
        openDetail:function(title){
            this.showDetailInfo = true;
            eventHelper.emit('openDetailInfo',title);
        }
    },
    mounted: function () {
        eventHelper.on('returnBack',function(){
            this.showDetailInfo = false;
        }.bind(this));
        eventHelper.on('setNormalQues',function(itemTitle){
            var itemId = this.updateNewArr.length + 1;
            this.updateNewArr.push({
                id:itemId,
                title:itemTitle
            });
        }.bind(this));
    },
    components: {
        'detail-info':detailInfo
    }
});
module.exports = comm;