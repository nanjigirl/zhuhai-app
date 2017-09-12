var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            updateNewArr:[
                {
                    id:1,
                    title:'管线老化'
                },{
                    id:2,
                    title:'管线衔接有误'
                },{
                    id:3,
                    title:'爆管'
                },{
                    id:4,
                    title:'管道断裂'
                }
            ]
        }
    },
    methods: {
        returnMain:function(){
            eventHelper.emit('change-menu','upload');
            eventHelper.emit('closeUploadBtn');
        },
        openDetail:function(title){
            eventHelper.emit('change-menu','detail-info');
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;