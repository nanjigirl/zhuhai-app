var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            uploadCheck: ['我的上报'],
            uploads:['我的上报','他人上报'],
            draftList:[
                {
                    month:'09/02',
                    year:'2017',
                    content:[
                        {
                            title:'管道埋深不达标',
                            address:'海珠区南边路',
                            solution:'需要重新填埋管道'
                        },{
                            title:'爆管',
                            address:'海珠区南边路',
                            solution:'需要重新更换管道'
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
                            solution:'需要重新填埋管道'
                        },{
                            title:'爆管',
                            address:'海珠区南边路',
                            solution:'需要重新更换管道'
                        },{
                            title:'爆管',
                            address:'海珠区南边路',
                            solution:'需要重新更换管道'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        returnHome:function(){
            eventHelper.emit('openSub');
        }
    },
    mounted: function () {
        eventHelper.on('openUploadDetail',function(id){
            console.log(id);
            if(id === 'wdsb'){
                this.uploadCheck = ['我的上报']
            }else if(id === 'trsb'){
                this.uploadCheck = ['他人上报']
            }
        }.bind(this));
    },
    components: {

    }
});
module.exports = comm;