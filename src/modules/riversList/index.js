var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var riversListSecond = require('modules/riversListSecond');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
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
            riversList:[
                {
                    title:'黄河',
                    area:'高青县',
                    children:[
                        {
                            title:'金坑水',
                            area:'常家镇'
                        },{
                            title:'东边坑',
                            area:'木李镇'
                        },{
                            title:'芦湖街道（左岸）',
                            area:'芦湖街道'
                        },
                    ]
                },{
                    title:'小清河',
                    area:'高青县',
                    children:[
                        {
                            title:'黑里寨镇（右岸）',
                            area:'黑里寨镇'
                        },{
                            title:'花沟镇（右岸）',
                            area:'花沟镇'
                        },{
                            title:'高城镇（左岸）',
                            area:'高城镇'
                        },
                    ]
                },{
                    title:'支脉河',
                    area:'高青县',
                    children:[
                        {
                            title:'金坑水',
                            area:'花沟镇'
                        },{
                            title:'东边坑',
                            area:'田镇街道'
                        },{
                            title:'黄浦区（左岸）',
                            area:'高城镇'
                        },
                    ]
                },{
                    title:'北支新河',
                    area:'高青县',
                    children:[
                        {
                            title:'黑里寨镇（左岸）',
                            area:'黑里寨镇 '
                        },{
                            title:'青城镇（左岸）',
                            area:'青城镇'
                        },{
                            title:'花沟镇（左岸）',
                            area:'花沟镇'
                        },{
                            title:'常家镇（左岸）',
                            area:'常家镇'
                        },
                    ]
                },
            ]
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