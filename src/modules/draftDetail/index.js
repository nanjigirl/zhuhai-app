var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showDateExpand:false,
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
            this.$dialog.confirm({
                mes: '确定删除该条记录?！',
                opts: () => {
                    self.draftList.forEach(function(value,index){
                        if(index === parentIndex){
                            self.draftList[parentIndex].content.splice(subIndex,1);
                            if(self.draftList[parentIndex].content.length ===0){
                                self.draftList.splice(parentIndex,1);
                            }
                        }
                    })
                }
            });
        },
        expandDate:function(){
            this.showDateExpand = !this.showDateExpand;
        }
    },
    mounted: function () {

    },
    components: {

    }
});
module.exports = comm;