var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            isRegister:false,
            regText:'打卡',
            menuArr:[
                {
                    class:'icon-kaishixunjian',
                    text:'开始巡检',
                    id:'routing-inspection'
                },{
                    class:'icon-bendicaogao',
                    text:'本地草稿',
                    id:'draft-detail'
                },{
                    class:'icon-shangchuan',
                    text:'我的上报',
                    id:'upload-detail'
                },{
                    class:'icon-xinxi',
                    text:'我的消息',
                    id:'my-message'
                }
            ]
        }
    },
    methods: {
        dailyRegister:function(){
            this.isRegister = true;
            this.regText = '已打卡'
        },
        openSubItem:function(component){
            eventHelper.emit('change-menu', component);
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;