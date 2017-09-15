var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            uploadCheck:'',
            showType:false,
            showDateExpand:false,
            draftList:[
                {
                    month:'09/02',
                    year:'2017',
                    content:[
                        {
                            title:'管道埋深不达标',
                            address:'海珠区南边路',
                            solution:'需要重新填埋管道',
                            people:'许军',
                            date:'2017-9-2',
                            num:13,
                            count:22
                        },{
                            title:'爆管',
                            address:'海珠区南边路',
                            solution:'需要重新更换管道',
                            people:'张梅',
                            date:'2017-9-2',
                            num:13,
                            count:22
                        }
                    ]
                },
                {
                    month:'08/31',
                    year:'2017',
                    content:[
                        {
                            title:'管道埋深不达标',
                            address:'海珠区南边路',
                            solution:'需要重新填埋管道',
                            people:'许军',
                            date:'2017-9-2',
                            num:13,
                            count:22
                        },{
                            title:'爆管',
                            address:'海珠区南边路',
                            solution:'需要重新更换管道',
                            people:'许军',
                            date:'2017-9-2',
                            num:13,
                            count:22
                        },{
                            title:'爆管',
                            address:'海珠区南边路',
                            solution:'需要重新更换管道',
                            people:'许军',
                            date:'2017-9-2',
                            num:13,
                            count:22
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        returnHome:function(){
            eventHelper.emit('openSub');
        },
        toggleData:function(){
            console.log(this.uploadCheck);
            if(this.uploadCheck === '我的上报'){
                this.showType = false;
            }else if(this.uploadCheck === '他人上报'){
                this.showType = true;
            }
        },
        expandDate:function(){
            this.showDateExpand = !this.showDateExpand;
        }
    },
    mounted: function () {
        eventHelper.on('openUploadDetail',function(id){
            if(id === 'wdsb'){
                this.uploadCheck = '我的上报'
            }else if(id === 'trsb'){
                this.uploadCheck = '他人上报'
            }
        }.bind(this));
    },
    components: {

    }
});
module.exports = comm;