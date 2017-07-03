var template = require('./footer.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            isLoginSuccess: false
        }
    },
    methods: {},
    mounted: function () {
        eventHelper.on('loginSuccess',function () {
            this.isLoginSuccess = true;
        }.bind(this));
    },
    components: {}
});
module.exports = comm;