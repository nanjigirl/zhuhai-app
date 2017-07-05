var template = require('./navigator.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: 'Vue Module Seed'
        }
    },
    methods: {
        showAlertBox:function () {
            eventHelper.emit('showAlertBox');
        },
        showMessageBox:function () {
            eventHelper.emit('showMessageBox');
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;