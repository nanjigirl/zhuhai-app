var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            content:{},
            commentArr:[
                {
                    people: '黄振宇',
                    date: '2017-9-2',
                    num: 32,
                    count: 15,
                    describe: '该管老化严重,需要进行更换'
                }, {
                    people: '张丰',
                    date: '2017-8-23',
                    num: 16,
                    count: 21,
                    describe: '污水溢流'
                },
            ]
        }
    },
    methods: {
        returnHome:function(){
            eventHelper.emit('openSub');
        }
    },
    mounted: function () {
        eventHelper.on('openComment',function(content){
            this.content = content;
        }.bind(this));
    },
    components: {

    }
});
module.exports = comm;