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
                    people:'区河长：吴黎明',
                    area:'天河区',
                    job:'政协副主席',
                    phone:'13825126213'
                },{
                    people:'区河长：卢柳金',
                    area:'天河区 黄阁镇',
                    job:'党委委员、副镇长',
                    phone:'13825126212'
                },{
                    people:'区河长：李胜芬',
                    area:'天河区',
                    job:'政协副主席',
                    phone:'13825126414'
                },
            ],
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