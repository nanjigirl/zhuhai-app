var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var riversListSecond = require('modules/riversListSecond');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            gzAreas: [{
                value: '天河区',
                label: '天河区'
            }, {
                value: '白云区',
                label: '白云区'
            }, {
                value: '黄浦区',
                label: '黄浦区'
            }, {
                value: '番禺区',
                label: '番禺区'
            }, {
                value: '南沙区',
                label: '南沙区'
            }, {
                value: '海珠区',
                label: '海珠区'
            }, {
                value: '荔湾区',
                label: '荔湾区'
            }, {
                value: '花都区',
                label: '花都区'
            }, {
                value: '越秀区',
                label: '越秀区'
            }, {
                value: '从化区',
                label: '从化区'
            }, {
                value: '增城区',
                label: '增城区'
            }, {
                value: '全部',
                label: '全部'
            }],
            gzArea: '天河区',
            hzName:'',
            testTime:'',
            datetime2:'',
            showRiversListSecond:false,
            riversList:[
                {
                    title:'流溪河（太平）',
                    area:'天河区',
                    children:[
                        {
                            title:'金坑水',
                            area:'丁龙围水库'
                        },{
                            title:'东边坑',
                            area:'东边坑鱼塘'
                        },{
                            title:'黄浦区（左岸）',
                            area:'乌涌（天河段）'
                        },
                    ]
                },{
                    title:'西福河',
                    area:'天河区',
                    children:[
                        {
                            title:'金坑水1',
                            area:'丁龙围水库'
                        },{
                            title:'东边坑1',
                            area:'东边坑鱼塘'
                        },{
                            title:'黄浦区（左岸）1',
                            area:'乌涌（天河段）'
                        },
                    ]
                },{
                    title:'金洲涌',
                    area:'天河区',
                    children:[
                        {
                            title:'金坑水2',
                            area:'丁龙围水库'
                        },{
                            title:'东边坑2',
                            area:'东边坑鱼塘'
                        },{
                            title:'黄浦区（左岸）2',
                            area:'乌涌（天河段）'
                        },
                    ]
                },{
                    title:'东大湖',
                    area:'天河区',
                    children:[
                        {
                            title:'金坑水3',
                            area:'丁龙围水库'
                        },{
                            title:'东边坑3',
                            area:'东边坑鱼塘'
                        },{
                            title:'黄浦区（左岸）3',
                            area:'乌涌（天河段）'
                        },
                    ]
                },{
                    title:'乌涌（天河段）',
                    area:'天河区',
                    children:[
                        {
                            title:'金坑水4',
                            area:'丁龙围水库'
                        },{
                            title:'东边坑4',
                            area:'东边坑鱼塘'
                        },{
                            title:'黄浦区（左岸）4',
                            area:'乌涌（天河段）'
                        },
                    ]
                },{
                    title:'乌蛇坑',
                    area:'天河区',
                    children:[
                        {
                            title:'金坑水5',
                            area:'丁龙围水库'
                        },{
                            title:'东边坑5',
                            area:'东边坑鱼塘'
                        },{
                            title:'黄浦区（左岸）5',
                            area:'乌涌（天河段）'
                        },
                    ]
                },{
                    title:'农科院鱼塘',
                    area:'天河区',
                    children:[
                        {
                            title:'金坑水6',
                            area:'丁龙围水库'
                        },{
                            title:'东边坑6',
                            area:'东边坑鱼塘'
                        },{
                            title:'黄浦区（左岸）6',
                            area:'乌涌（天河段）'
                        },
                    ]
                }
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