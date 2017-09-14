var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            content:{}
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