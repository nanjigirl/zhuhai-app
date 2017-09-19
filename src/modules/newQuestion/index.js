var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var detailInfo = require('modules/detailInfo');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showDetailInfo:false,
            updateNewArr:{}
        }
    },
    methods: {
        returnMain:function(){
            eventHelper.emit('closeQuestion');
        },
        openDetail:function(val){
            this.showDetailInfo = true;
            eventHelper.emit('openDetailInfo',val);
        }
    },
    mounted: function () {
        eventHelper.on('returnBack',function(){
            this.showDetailInfo = false;
        }.bind(this));
        eventHelper.on('setNormalQues',function(val){
            debugger;
            this.updateNewArr.push(val);
        }.bind(this));
        eventHelper.on('uploadList',function(val){
           this.updateNewArr = val;
        }.bind(this));
    },
    components: {
        'detail-info':detailInfo
    }
});
module.exports = comm;