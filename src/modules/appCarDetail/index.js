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
                updateDate:new Date().toLocaleString(),
                carDetailPanel: false,
                carDetailData:{
                    driver:'',
                    licenseType:'',
                    driverId:'',
                    truckType:'',
                    carNumber:'',
                    company:'',
                    currentCapacity:'5吨',
                    ratedCapacity:'5吨',
                    inBlackList:'',
                }
            }
        },
        computed: {},
        mounted: function () {

        },
        methods: {
            closeCarDetailPanel:function () {
                this.carDetailPanel = false;
            },
            open: function (carMsg) {
                console.log(carMsg);
                this.carDetailPanel = true;
                this.carDetailData.carNumber = carMsg.truckNum;
                this.carDetailData.driver = carMsg.driver;
                this.carDetailData.licenseType = carMsg.licenseType;
                this.carDetailData.driverId = carMsg.driverId;
                this.carDetailData.truckType = carMsg.truckType;
                this.carDetailData.company = carMsg.company;
                if(!carMsg.inBlackList){
                    this.carDetailData.inBlackList = '是';
                }else {
                    this.carDetailData.inBlackList = '否';
                }
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