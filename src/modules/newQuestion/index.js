var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var detailInfo = require('modules/detailInfo');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showDetailInfo:false,
            // updateNewArr:{}
            //10.14新增
            updateNewArr:[{
                title:'工业废水排放',
                solution:'下发环卫部门整改'
            },{
                title:'养殖污染',
                solution:'下发环卫部门整改'
            },{
                title:'排水设施',
                solution:'专项检测'
            },{
                title:'违法建设',
                solution:'下发城管部门整改'
            },{
                title:'建筑废弃物',
                solution:'下发环卫部门整改'
            },{
                title:'堆场码头',
                solution:'下发城管部门整改'
            },{
                title:'工程维护',
                solution:'专项检测'
            },{
                title:'其他',
                solution:'专项检测'
            },]
        }
    },
    methods: {
        returnMain:function(){
            // eventHelper.emit('closeQuestion');
            //10.14新增
            eventHelper.emit('openSub');
            eventHelper.emit('change-menu','upload');
            eventHelper.emit('closeUploadBtn');

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