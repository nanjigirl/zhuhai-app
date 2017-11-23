var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var uploadInfo = require('modules/uploadInfo');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            mainTitle:'',
            isError:false,
            uploadText:'上报',
            showUpload:false,
            showRfLabel:true,
            deviceBaseInfo:{
                deviceName:'循环式钉耙清污机(细格栅)系统',
                deviceType:'ZGC-1200',
                type:'A'
            },
            inspectList:[
                {
                    text:'进水',
                    status:1
                },{
                    text:'格栅前后液位差',
                    status:1
                },{
                    title:'细栅格'
                },{
                    text:'链条',
                    status:1
                },{
                    text:'栅耙位置',
                    status:1
                },{
                    text:'运转声音',
                    status:1
                },{
                    text:'油位',
                    status:1
                }
            ]
        }
    },
    methods: {
        returnLast:function(){
            this.$parent.$emit('returnToLast');
        },
        changeStatus:function(item){
            if(item.status === '1'){
                this.$refs.uploadDetail.$emit('openUploadInfo',item);
            }
        },
        openUpload:function(){
            this.showUpload = true;
        }
    },
    mounted: function () {
        this.$on('loadDeviceInfo',function(item){
            this.mainTitle = '扫描';
            cordova.plugins.readRFID.readRFID("cantonese",function (msg) {
                alert("success--->"+msg);
                this.mainTitle = item.text;
                this.showRfLabel = false;
            },function (err) {
                alert("err--->"+err);
            }.bind(this));
        });
        this.$on('returnToLast',function(){
            this.showUpload = false;
        }.bind(this));
    },
    components: {
        'upload-info':uploadInfo
    }
});
module.exports = comm;