var template = require('./content.html');
var mainView = require('modules/mainView');
var newsCenter = require('modules/newsCenter');
var comment = require('modules/comment');
var draftDetail = require('modules/draftDetail');
var uploadDetail = require('modules/uploadDetail');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            selected:'work',
            showUpLoadBtn:false,
            showMain:true,
            showSubId:'',
            footerArr:[
                {
                    id:'work',
                    img:'./img/icon/highLight-work.png',
                    text:'日常工作'
                },{
                    id:'upload',
                    img:'./img/icon/icon-upload.png',
                    text:'问题上报'
                },{
                    id:'analyze',
                    img:'./img/icon/icon-data.png',
                    text:'数据分析'
                },{
                    id:'user',
                    img:'./img/icon/icon-user.png',
                    text:'我的'
                }
            ]
        }
    },
    watch:{
        selected:function(data,oldData){
            this.footerArr.forEach(function(value){
                if(value.id === data){
                    switch(value.id){
                        case 'work':
                            value.img = 'img/icon/highLight-work.png';
                            break;
                        case 'upload':
                            value.img = 'img/icon/highLight-upload.png';
                            break;
                        case 'analyze':
                            value.img = 'img/icon/highLight-data.png';
                            break;
                        case 'user':
                            value.img = 'img/icon/highLight-user.png';
                            break;
                    }
                }
                if(value.id === oldData){
                    switch(value.id){
                        case 'work':
                            value.img = 'img/icon/icon-work.png';
                            break;
                        case 'upload':
                            value.img = 'img/icon/icon-upload.png';
                            break;
                        case 'analyze':
                            value.img = 'img/icon/icon-data.png';
                            break;
                        case 'user':
                            value.img = 'img/icon/icon-user.png';
                            break;
                    }
                }
            }.bind(this));
            eventHelper.emit('change-menu',data);
        }
    },
    methods: {
    },
    mounted: function () {
        eventHelper.on('openUploadBtn',function(){
            this.showUpLoadBtn = true;
        }.bind(this));
        eventHelper.on('closeUploadBtn',function(){
            this.showUpLoadBtn = false;
        }.bind(this));
        eventHelper.on('openSub',function(subId){
            if(this.showMain){
                this.showMain = false;
                this.showSubId = subId;
            }else{
                this.showMain = true;
            }
        }.bind(this));
    },
    components: {
        'main-view':mainView,
        'news-center':newsCenter,
        'comment':comment,
        'draft-detail':draftDetail,
        'upload-detail':uploadDetail
    }
});
module.exports = comm;