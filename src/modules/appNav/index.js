var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var moment = require('moment');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        moment.lang('zh-cn');
        return {
            day: moment().format('dddd'),
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm')
        }
    },
    methods: {},
    mounted: function () {
        setInterval(function () {
            this.time = moment().format('HH:mm');
        }.bind(this), 60000);
    },
    components: {}
});
module.exports = comm;