var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
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
        },
        deteleItem:function(parentIndex,subIndex){
            var self = this;
            this.$confirm('确定删除该条记录?').then(action => {
                self.draftList.forEach(function(value,index){
                    if(index === parentIndex){
                        self.draftList[parentIndex].content.splice(subIndex,1);
                    }
                })
            });
        }
    },
    mounted: function () {

    },
    components: {

    }
});
module.exports = comm;