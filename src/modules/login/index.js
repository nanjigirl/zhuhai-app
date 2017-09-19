var template = require('./login.html');
var loginCtrl = require('controllers/loginController');
var eventHelper = require('../../utils/eventHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            ruleForm10: {
                name: '',
                sex: '',
                eMail: '',
                telphone: '',
                date: ''
            },
            password: '123456',
            userName: 'eadmin',
            loginComplete: false
        }
    },
    methods: {
        login: function () {
            eventHelper.emit('loading-start');
            loginCtrl.login(this.userName, this.password, function (token) {
                eventHelper.emit('loading-end');
                eventHelper.emit('loginSuccess', token);
                console.log('Login Success:', token);
                this.loginComplete = true;
            }.bind(this));
        }
    },
    mounted: function () {
        this.login();
        // var cache = window.sessionStorage.getItem('cescToken');
        // var cache = '1234567';
        // if (!!cache) {
        //     this.$nextTick(function () {
        //         loginCtrl.setToken(cache);
        //         eventHelper.emit('loading-end');
        //         eventHelper.emit('loginSuccess', cache);
        //         console.log('Login Success:', cache);
        //         this.loginComplete = true;
        //     }.bind(this));
        // }
        /* if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
         $('input:not(input[type=submit])').each(function(){
         var outHtml = this.outerHTML;
         $(this).append(outHtml);
         });
         }*/
    },
    components: {}
});
module.exports = comm;