var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {

        }
    },
    methods: {
        returnMain:function(){
            eventHelper.emit('change-menu','upload');
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;