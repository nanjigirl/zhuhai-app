var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            messageList:[
                {
                    date:'2017-11-16 12:22:22'
                },{
                    date:'2017-11-16 12:22:22'
                },{
                    date:'2017-11-16 12:22:22'
                }
            ]
        }
    },
    methods: {
        returnHome:function(){
            eventHelper.emit('change-menu','user');
        }
    },
    mounted: function () {

    },
    components: {

    }
});
module.exports = comm;