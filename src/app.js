require('./css/main.css');
require('vue-ydui/dist/ydui.rem.css');
require('mint-ui/lib/style.css');
var Vue = require('vue');
var VueRouter = require('vue-router');
var moduleController = require('controllers/moduleController');
var appLogin = require('modules/login');
var appNav = require('modules/appNav');
var mainContent = require('modules/mainContent');
var eventHelper = require('utils/eventHelper');
var ElementUI = require('element-ui');
var MintUi = require('mint-ui');
var YDUI = require('vue-ydui');
require('vue-ydui/dist/ydui.flexible.js');


Vue.use(ElementUI);
Vue.use(YDUI);
Vue.use(MintUi);
Vue.use(VueRouter);
window.eventHelper = eventHelper;
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
/*var routes = [{
 path: '/' ,
 component: appHome
 }];
 for (var key in moduleController) {
 routes.push({
 path: '/' + key,
 component: moduleController[key]
 })
 }


 // 3. 创建 router 实例，然后传 `routes` 配置
 // 你还可以传别的配置参数, 不过先这么简单着吧。
 var router = new VueRouter({
 routes // （缩写）相当于 routes: routes
 });
 */
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
var app = new Vue({
    mounted: function () {
        $('#loadingMask').hide();
        eventHelper.on('loginSuccess', function () {
            this.isLoginSuccess = true;
        }.bind(this));
        eventHelper.on('loading-start', function () {
            $('#loadingMask').show();
        });
        eventHelper.on('loading-end', function () {
            $('#loadingMask').hide();
        });
        eventHelper.on('toggle-menu', function (flag) {
            this.isMenuToggleOff = flag;
        }.bind(this));
    }
    , data: function () {
        return {
            isLoginSuccess: false,
            isMenuToggleOff: false
        }
    },
    components: {
        'app-login': appLogin,
        'app-nav': appNav,
        'main-content' : mainContent
    }
}).$mount('#app');