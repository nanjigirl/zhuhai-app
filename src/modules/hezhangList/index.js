var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var riversListSecond = require('modules/riversListSecond');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            riversListDetail:[
                {
                    people:'河长：王其凯',
                    area:'黑里寨镇',
                    job:'书记',
                    phone:'13825126213'
                },{
                    people:'河长：吴涛',
                    area:'黑里寨镇',
                    job:'镇长',
                    phone:'13825126212'
                },{
                    people:'河长：蔡亮',
                    area:'黑里寨镇',
                    job:'副书记',
                    phone:'13825126414'
                },
            ],
            gzAreas: [{
                value: '高青县 ',
                label: '高青县'
            }, {
                value: '木李镇',
                label: '木李镇'
            }, {
                value: '田镇街道',
                label: '田镇街道'
            }, {
                value: '高城镇',
                label: '高城镇'
            }, {
                value: '常家镇',
                label: '常家镇'
            }, {
                value: '芦湖街道',
                label: '芦湖街道'
            }, {
                value: '唐坊镇',
                label: '唐坊镇'
            }, {
                value: '青城镇',
                label: '青城镇'
            }, {
                value: '花沟镇',
                label: '花沟镇'
            }, {
                value: '黑里寨镇',
                label: '黑里寨镇'
            }, {
                value: '全部',
                label: '全部'
            }],
            gzArea: '高青县',
            hzName:'',
            testTime:'',
            datetime2:'',
            showRiversListSecond:false,
        }
    },
    methods: {
        openDatePicker:function () {
            this.$refs.picker.open();
            // if(!!this.datetime2){
            //     this.testTime = this.datetime2;
            // }
        },
        handleConfirm:function () {
            if(!!this.pickerValue){
                this.testTime = this.pickerValue.toLocaleDateString();
            }
        },
        returnHome:function(){
            eventHelper.emit('openSub');
        },
        openrRiversListInfo:function(item,index){
            this.showRiversListSecond = true;
            var itemObj = {};
            itemObj.item = item;
            itemObj.index = index;
            eventHelper.emit('openrRiversListInfo',itemObj);
        }
    },
    mounted: function () {
        eventHelper.on('returnNewsHome',function(){
            this.showRiversListSecond = false;
        }.bind(this));
    },
    components: {
        'rivers-list-second':riversListSecond
    }
});
module.exports = comm;