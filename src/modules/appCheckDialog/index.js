var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var removePic = require('../arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var mathUtils = require('utils/mathUtils');
var eventHelper = require('../../utils/eventHelper');
var historySearchServices = require('services/historySearchServices');
var deviceModel = require('modules/arcgisPlugin/plugin/arcgisExpand/deviceModel');
var mapHelper = require('utils/mapHelper');
var arcgisHelper = require('modules/arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var echarts = require('echarts');
var Q = require('q');
var refreshTime = 1000;
var defaultSpeed = 1000;
var currentThread;

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            checkDialogVisible:false,
            options: [{
                value: '张三',
                label: '张三'
            }, {
                value: '李四',
                label: '李四'
            }],
            illegalCheck:{
                title:'',
                content:'',
                date:'',
                people:''
            },
        }
    },
    computed: {},
    mounted: function () {
        eventHelper.on('app-check-dialog', function () {
            this.checkDialogVisible = true;
        }.bind(this));
    },
    methods: {
        submitForm:function(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm:function(formName) {
            this.$refs[formName].resetFields();
        }
    },
    computed: {

    },
    components: {}
});
module.exports = comm;