var template = require('./content.html');
var mainView = require('modules/mainView');
var newsCenter = require('modules/newsCenter');
var comment = require('modules/comment');
var draftDetail = require('modules/draftDetail');
var uploadDetail = require('modules/uploadDetail');
var entrance = require('modules/entrance');
var newQuestion = require('modules/newQuestion');
var law = require('modules/law');
const waterQualityInfo = require('modules/waterQualityInfo');
const riversList = require('modules/riversList');
const hezhangList = require('modules/hezhangList');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            selected:'upload',
            showUpLoadBtn:false,
            showMain:true,
            showSubId:'',
            footerArr:[
                {
                    id:'work',
                    // img:'./img/icon/highLight-work.png',
                    class:'icon-gongzuo',
                    text:'日常工作'
                },{
                    id:'upload',
                    // img:'./img/icon/icon-upload.png',
                    class:'icon-quote',
                    text:'问题上报'
                },{
                    id:'analyze',
                    // img:'./img/icon/icon-data.png',
                    class:'icon-shuju',
                    text:'数据分析'
                },{
                    id:'user',
                    // img:'./img/icon/icon-user.png',
                    class:'icon-wode',
                    text:'我的'
                }
            ]
        }
    },
    watch:{
        selected:function(data){
            eventHelper.emit('change-menu',data);
        }
    },
    methods: {
    },
    mounted: function () {
        eventHelper.on('openSub',function(subId){
            if(this.showMain){
                this.showMain = false;
                this.showSubId = subId;
            }else{
                this.showMain = true;
            }
            if(subId === 'wdsb'|| subId === 'trsb'){
                eventHelper.emit('openUploadDetail',subId);
            }
        }.bind(this));
        eventHelper.on('toggleTabClass',function(subId){
            this.selected = subId;
        }.bind(this));
    },
    components: {
        'main-view':mainView,
    }
});
module.exports = comm;