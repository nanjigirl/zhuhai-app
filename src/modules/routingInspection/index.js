var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var districtInfo = require('modules/districtInfo');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showDistrictInfo:false,
            inspectionList:[
                {
                    text:'储泥池',
                    status:1,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'脱泥机房',
                    status:1,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'粗格栅',
                    status:1,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'提升泵房',
                    status:1,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'生物除臭系统',
                    status:2,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'细格栅',
                    status:3,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        },{
                            text:'2#细格栅',
                            status:3
                        },{
                            text:'3#细格栅',
                            status:0
                        },{
                            text:'4#细格栅',
                            status:0
                        },{
                            text:'5#细格栅',
                            status:0
                        },{
                            text:'6#细格栅',
                            status:0
                        },{
                            text:'7#细格栅',
                            status:0
                        },{
                            text:'8#细格栅',
                            status:0
                        }
                    ]
                },{
                    text:'曝气沉砂池',
                    status:0,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        },{
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'1号生化池',
                    status:0,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'2号生化池',
                    status:0,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                },{
                    text:'积泥配水井',
                    status:0,
                    children:[
                        {
                            text:'1#细格栅',
                            status:1
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        returnHome:function(){
            eventHelper.emit('change-menu','user');
        },
        openDistrictInfo:function(item){
            if(item.status === 0){
                this.$toast({
                    message:'未巡检'
                })
            }else{
                this.showDistrictInfo = true;
                this.$refs.districtInfo.$emit('loadDistrictInfo',item);
            }
        }
    },
    mounted: function () {
        this.$on('returnToLast',function(){
            this.showDistrictInfo = false;
        }.bind(this));
    },
    components: {
        'district-info':districtInfo
    }
});
module.exports = comm;