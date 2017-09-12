var template = require('./content.html');
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
        click:function () {
            this.$messagebox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
            });
        },
        test:function(){
            alert(1);
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;