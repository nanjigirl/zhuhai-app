var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: 'Vue Module Seed',
            show:false
        }
    },
    methods: {},
    mounted: function () {
        setTimeout(function(){
            this.show = true;
        }.bind(this),500);
    },
    components: {}
});
module.exports = comm;