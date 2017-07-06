var Vue = require('vue');
var template = require('./main-view.html');
var eventHelper = require('../../utils/eventHelper');
var moduleController = require('controllers/moduleController');
var serviceHelper = require('../../services/serviceHelper');
var appNoticeBox = require('modules/appNoticeBox');

var mapHelper = require('utils/maps/mapHelper');
var components = {
    'app-notice-box': appNoticeBox
};
components = $.extend(components, moduleController);
var userTemplate = '';
for (var key in moduleController) {
    components[key.toLowerCase()] = moduleController[key];
    userTemplate += '<' + key.toLowerCase() + '>' + '</' + key.toLowerCase() + '>';
}
template = template.replace('@@', userTemplate);
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            isLoading: false,
            currentView: '',
            isLoginSuccess: false
        }
    },
    methods: {
        changeView: function (view) {
            clearTimeout(this.changeViewTimer);
            this.changeViewTimer = setTimeout(function () {
                if (!!components[view]) {
                    this.currentView = view;
                } else {
                    console.log('出错了！！');
                }
            }.bind(this),100);
        },
        toggleSearch:function () {
            eventHelper.emit('openPointSearch');
        },
        carTrace:function(){
            mapHelper.drawLine(this.map,[108.34109333740236,22.84727692871094],[108.43310383544923,22.83457398681641]);
        }
    },
    mounted: function () {
        eventHelper.on('loginSuccess', function () {
            this.isLoginSuccess = true;
        }.bind(this));
        eventHelper.on('mapCreated',function (map) {
            this.map  = map;
        }.bind(this));

        this.currentView = 'arcgis-plugin';
        eventHelper.on('change-menu', function (model) {
            this.changeView(model.menuurl);
        }.bind(this));
        eventHelper.on('active-tab', function (tabID) {
            this.changeView(tabID);
        }.bind(this));
    },
    components: components
});
module.exports = comm;