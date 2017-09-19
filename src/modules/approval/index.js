var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            reportQuestion:'./img/icon/icon-cloud.png',
            returnArr:[],
            approvalList:[
                {
                    title:'排水设计咨询意见审批',
                    check:'选项一',
                    subList:['选项一','选项二','选项三']
                },{
                    title:'施工临时排水许可批准',
                    check:'',
                    subList:['选项一','选项二','选项三']
                },{
                    title:'排水接驳意见审批',
                    check:'',
                    subList:['选项一','选项二','选项三']
                },{
                    title:'水质检测审批',
                    check:'',
                    subList:['选项一','选项二','选项三']
                },{
                    title:'排水许可审批',
                    check:'',
                    subList:['选项一','选项二','选项三']
                }
            ]
        }
    },
    methods: {
        cancel:function(){
           this.$toast({
               message:'取消关联！！'
           });
            this.returnMain();
        },
        relate:function () {
            this.$toast({
                message:'关联成功！！'
            });
            this.returnMain();
            eventHelper.emit('loadApproval',this.approvalList);
        },
        returnMain: function () {
            eventHelper.emit('returnDetail');
        }
    },
    mounted: function () {

    },
    components: {

    }
});
module.exports = comm;