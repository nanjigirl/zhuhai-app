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
                    check:'',
                    open:true,
                    subList:[
                        '海珠区南边路38号自编3号',
                        '海珠区鹤洞大桥以南，南边路以西（原广州锌片厂）',
                        '海珠区南边路43号一栋',
                        '南边路38号',
                        '海珠区南边路34号'
                    ]
                },{
                    title:'施工临时排水许可批准',
                    check:'',
                    open:false,
                    subList:[]
                },{
                    title:'排水接驳意见审批',
                    check:'',
                    open:false,
                    subList:[]
                },{
                    title:'水质检测审批',
                    check:'',
                    open:false,
                    subList:[]
                },{
                    title:'排水许可审批',
                    check:'',
                    open:false,
                    subList:[]
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