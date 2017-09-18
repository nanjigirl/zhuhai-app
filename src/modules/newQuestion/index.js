var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var detailInfo = require('modules/detailInfo');

var updateList = [
    {
        type:'路面',
        val:[
            {
                title:'积水'
            },{
                title:'内涝'
            },{
                title:'污水溢流'
            }
        ]
    },{
        type:'雨水口',
        val:[
            {
                title:'雨水篦丢失'
            },{
                title:'雨水篦破损'
            },{
                title:'井环破损'
            },{
                title:'井框差'
            },{
                title:'防盗装置破损'
            },{
                title:'违章占压'
            },{
                title:'接管'
            },{
                title:'井壁结垢'
            },{
                title:'井底积泥'
            },{
                title:'井体机构破损'
            }
        ]
    },{
        type:'各类检查井',
        val:[
            {
                title:'井盖丢失'
            },{
                title:'井盖破损'
            },{
                title:'井环破损'
            },{
                title:'井框差'
            },{
                title:'防盗装置破损'
            },{
                title:'违章占压'
            },{
                title:'接管'
            },{
                title:'井壁结垢'
            },{
                title:'井底积泥'
            },{
                title:'井体机构破损'
            }
        ]
    },{
        type:'管道、渠箱',
        val:[
            {
                title:'违章占压'
            },{
                title:'支管暗接'
            },{
                title:'地面塌陷'
            },{
                title:'水位水流(目测数值)'
            },{
                title:'积泥'
            }
        ]
    },{
        type:'边沟',
        val:[
            {
                title:'违章占压'
            },{
                title:'接管'
            },{
                title:'边坡稳定'
            },{
                title:'渠边种植'
            },{
                title:'水位水流(目测数值)'
            },{
                title:'淤泥'
            },{
                title:'改板缺损'
            },{
                title:'墙体结构'
            }
        ]
    },{
        type:'倒虹管',
        val:[
            {
                title:'两端水位差'
            },{
                title:'水流水位'
            }
        ]
    },{
        type:'排放口',
        val:[
            {
                title:'违章占压'
            },{
                title:'挡土墙破损'
            },{
                title:'淤积情况'
            },{
                title:'底坡冲刷'
            }
        ]
    },{
        type:'闸门、阀门、拍门',
        val:[
            {
                title:'淤积'
            },{
                title:'机构腐蚀'
            },{
                title:'缺损'
            },{
                title:'启闭灵活性'
            },{
                title:'密闭性'
            }
        ]
    }
];
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showDetailInfo:false,
            updateNewArr:[]
        }
    },
    methods: {
        returnMain:function(){
            eventHelper.emit('openSub');
            eventHelper.emit('change-menu','upload');
            eventHelper.emit('closeUploadBtn');
        },
        openDetail:function(title){
            this.showDetailInfo = true;
            eventHelper.emit('openDetailInfo',title);
        }
    },
    mounted: function () {
        eventHelper.on('returnBack',function(){
            this.showDetailInfo = false;
        }.bind(this));
        eventHelper.on('setNormalQues',function(itemTitle){
            var itemId = this.updateNewArr.length + 1;
            this.updateNewArr.push({
                id:itemId,
                title:itemTitle
            });
        }.bind(this));
        eventHelper.on('uploadList',function(val){
            updateList.forEach(function(value){
                if(value.type === val){
                    this.updateNewArr = value.val;
                }
            }.bind(this))
        }.bind(this));
    },
    components: {
        'detail-info':detailInfo
    }
});
module.exports = comm;