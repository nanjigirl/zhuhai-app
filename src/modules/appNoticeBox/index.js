var template = require('./noticeBox.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            isLoginSuccess: false,
            showMessageBox: false,
            showAlertBox: false,
            activeName: 'first',
            selectedDepartments: [],
            alertItems: [{
                status: 0,
                alertType: '污染报警',
                alertDetail: 'XXX路PM2.5超标',
                owner: '环保局XXX区分队',
                alertTitle: '污染程度',
                alertGrade: '严重'
            },
                {
                    status: 1,
                    alertType: '污染报警',
                    alertDetail: 'XXX路PM2.5超标',
                    owner: '环保局XXX区分队',
                    alertTitle: '污染程度',
                    alertGrade: '严重'
                }, {
                    status: 2,
                    alertType: '污染报警',
                    alertDetail: 'XXX路PM2.5超标',
                    owner: '环保局XXX区分队',
                    alertTitle: '污染程度',
                    alertGrade: '严重'
                }],
            departments: [{
                name: '交警',
                isChecked: false
            }, {
                name: '城管',
                isChecked: true
            }, {
                name: '建委',
                isChecked: false
            }, {
                name: '环保',
                isChecked: false
            }, {
                name: '国土',
                isChecked: false
            }, {
                name: '工信委',
                isChecked: false
            }],
            messageList: [
                {
                    title: '收到建委XXXX执法信息',
                    detail: '凌晨2点，市民举报河堤的一处工地缺少降尘设备，同时在五一路和江南大道上发现共有三辆泥头车行驶过程中发生撒漏，严重污染道路。为及时打击在扬尘污染专项治理行动中“越线者”的嚣张气焰，指挥中心立即启动紧急处置预案，立即将案件派遣至相应的城管特勤大队和城区住建局，同时协调城区环卫部门清洗被污染的城市路面',
                    showDetail: false
                },
                {
                    title: '收到交警上报XXXX执法信息',
                    detail: '凌晨2点，市民举报河堤的一处工地缺少降尘设备，同时在五一路和江南大道上发现共有三辆泥头车行驶过程中发生撒漏，严重污染道路。为及时打击在扬尘污染专项治理行动中“越线者”的嚣张气焰，指挥中心立即启动紧急处置预案，立即将案件派遣至相应的城管特勤大队和城区住建局，同时协调城区环卫部门清洗被污染的城市路面',
                    showDetail: false
                },
                {
                    title: '收到环保xxx共享信息',
                    detail: '凌晨2点，市民举报河堤的一处工地缺少降尘设备，同时在五一路和江南大道上发现共有三辆泥头车行驶过程中发生撒漏，严重污染道路。为及时打击在扬尘污染专项治理行动中“越线者”的嚣张气焰，指挥中心立即启动紧急处置预案，立即将案件派遣至相应的城管特勤大队和城区住建局，同时协调城区环卫部门清洗被污染的城市路面',
                    showDetail: false
                },
                {
                    title: '收到消纳场XXXX共享信息',
                    detail: '凌晨2点，市民举报河堤的一处工地缺少降尘设备，同时在五一路和江南大道上发现共有三辆泥头车行驶过程中发生撒漏，严重污染道路。为及时打击在扬尘污染专项治理行动中“越线者”的嚣张气焰，指挥中心立即启动紧急处置预案，立即将案件派遣至相应的城管特勤大队和城区住建局，同时协调城区环卫部门清洗被污染的城市路面',
                    showDetail: false
                },
                {
                    title: '收到公众上报XXXX污染信息',
                    detail: '凌晨2点，市民举报河堤的一处工地缺少降尘设备，同时在五一路和江南大道上发现共有三辆泥头车行驶过程中发生撒漏，严重污染道路。为及时打击在扬尘污染专项治理行动中“越线者”的嚣张气焰，指挥中心立即启动紧急处置预案，立即将案件派遣至相应的城管特勤大队和城区住建局，同时协调城区环卫部门清洗被污染的城市路面',
                    showDetail: false
                },
                {
                    title: '交警已接受AXDDXXX案件',
                    detail: '凌晨2点，市民举报河堤的一处工地缺少降尘设备，同时在五一路和江南大道上发现共有三辆泥头车行驶过程中发生撒漏，严重污染道路。为及时打击在扬尘污染专项治理行动中“越线者”的嚣张气焰，指挥中心立即启动紧急处置预案，立即将案件派遣至相应的城管特勤大队和城区住建局，同时协调城区环卫部门清洗被污染的城市路面',
                    showDetail: false
                },
                {
                    title: 'XXX案件已处理完成',
                    detail: '凌晨2点，市民举报河堤的一处工地缺少降尘设备，同时在五一路和江南大道上发现共有三辆泥头车行驶过程中发生撒漏，严重污染道路。为及时打击在扬尘污染专项治理行动中“越线者”的嚣张气焰，指挥中心立即启动紧急处置预案，立即将案件派遣至相应的城管特勤大队和城区住建局，同时协调城区环卫部门清洗被污染的城市路面',
                    showDetail: false
                }
            ]
        }
    },
    methods: {
        handleClick: function (tab, event) {
            console.log(tab, event);
        },
        checkDepartment: function (dept) {
            this.$nextTick(function () {
                dept.isChecked = true;
            });
        }
    },
    mounted: function () {
        eventHelper.on('loginSuccess', function () {
            this.isLoginSuccess = true;
        }.bind(this));
        eventHelper.on('showMessageBox', function () {
            this.showMessageBox = !this.showMessageBox;
        }.bind(this));
        eventHelper.on('showAlertBox', function () {
            this.showAlertBox = !this.showAlertBox;
        }.bind(this));

        this.$refs.departmentGroup.$on('change', function () {
            console.log('change', this.selectedDepartments);
        }.bind(this));
    },
    components: {}
});
module.exports = comm;