var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var userService = require('services/userService');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            users: []
        }
    },
    methods: {},
    mounted: function () {
        userService.getAllEmployee(function (list) {
            list.forEach(function (user) {
                this.users.push({
                    title: user.title,
                    name: user.name,
                    phone: user.phone,
                    id: user.employeeID
                })
            }.bind(this));
        }.bind(this));
    },
    components: {}
});
module.exports = comm;