var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var eventHelper = require('../../utils/eventHelper');
var echarts = require('echarts');
// 定义组件
var comm = Vue.extend({
        template: template,
        data: function () {
            return {
                carNumber:'',
                updateDate:'2017-07-01 13:31:52',
                updateTime:'星期一',
                carDetailPanel: false,
            }
        },
        computed: {},
        mounted: function () {

        },
        methods: {
            open: function (carMsg) {

                console.log(carMsg);
                this.carDetailPanel = true;
                this.carNumber = carMsg.truckNum;
            },
            closeOprationPanel:function () {
                this.carDetailPanel = false;
            }
        },
        computed: {},
        components: {}
    })
;
module.exports = comm;