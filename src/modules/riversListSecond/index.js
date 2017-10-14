var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var riversListDetail = require('modules/riversListDetail');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showRiversListDetail:false,
            riversSecondList:[
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
            ],
            title:'',
            content:[],
            date:'',
            num:0,
            count:0,
        }
    },
    methods: {
        openrRiversListDetail:function (item,index) {
            this.showRiversListDetail = true;
            var itemObj = {};
            itemObj.item = item;
            itemObj.index = index;
            eventHelper.emit('openrRiversListDetail',itemObj);
        },
        returnParent:function(){
            eventHelper.emit('returnNewsHome');
        }
    },
    mounted: function () {
        eventHelper.on('returnRiverSecond',function(){
            this.showRiversListDetail = false;
        }.bind(this));
        eventHelper.on('openrRiversListInfo',function(riverList){
            this.riversSecondList.splice(0,this.riversSecondList.length);
            riverList.item.children.forEach(function (item) {
                this.riversSecondList.push({
                    title:item.title,
                    area :item.area
                })
            }.bind(this));
        }.bind(this));
    },
    components: {
        'rivers-list-detail':riversListDetail
    }
});
module.exports = comm;