var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            isSignIn:false,
            isRegister:false,
            regText:'签到'
        }
    },
    methods: {
        dailyRegister:function(){
            this.isRegister = true;
            this.regText = '已签到'
        },
        signIn:function(){
            this.isSignIn = true;
        },
        signOut:function(){
            this.isSignIn = false;
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;