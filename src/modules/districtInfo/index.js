var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var deviceInfo = require('modules/deviceInfo');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            mainTitle:'',
            deviceList:'',
            showDeviceInfo:false
        }
    },
    methods: {
        returnLast:function(){
            this.$parent.$emit('returnToLast');
        },
        openDeviceInfo:function(item){
            if(item.status === 0){
                this.$toast({
                    message:'未巡检'
                })
            }else{
                this.showDeviceInfo = true;
                this.$refs.deviceInfo.$emit('loadDeviceInfo',item);
            }
        }
    },
    mounted: function () {
        this.$on('loadDistrictInfo',function(item){
           this.mainTitle = item.text;
           this.deviceList = item.children;
        });
        this.$on('returnToLast',function(){
            this.showDeviceInfo = false;
        })
    },
    components: {
        'device-info':deviceInfo
    }
});
module.exports = comm;