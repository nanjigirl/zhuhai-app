var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var appMenuController = require('controllers/appMenuController');
var menuData = require('services/mockMenu');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            datatheads:['设备名称','状态'],
            form:{
                name:'',
                address:[],
                data:[],
                pollute:[]
            },
            datas: [{
                value: '南宁市建设委员会',
                label: '南宁市建设委员会'
            }, {
                value: '南宁市交警大队',
                label: '南宁市交警大队'
            }],
            pollutions:[{
                value: '石灰厂',
                label: '石灰厂'
            }, {
                value: '烧腊档',
                label: '烧腊档'
            }],
            areas:[{
                value: '江南区',
                label: '江南区'
            }, {
                value: '兴宁区',
                label: '兴宁区'
            }],
            tableData: [{
                name: '荣和悦澜山-吊塔视频',
                status: '在线'
            }, {
                name: '儿童康复中心综合大楼-门口视频',
                status: '在线'
            }, {
                name: '林里苑小区-吊塔视频',
                status: '在线'
            }, {
                name: '荣和大地-公园大道-1号门吊塔视频',
                status: '在线'
            },{
                name: '南宁市建设委员会-吊塔视频',
                status: '在线'
            },{
                name: '石灰厂-吊塔视频',
                status: '在线'
            }],
        }
    },
    methods: {

    },
    mounted: function () {

    },
    computed: {
        //搜索功能（当前是按照名字和性别进行过滤）
        searchEquipment: function () {//根据名字和性别过滤
            var that = this;
            return that.tableData.filter(function (user) {
                return (user.name.toLowerCase().indexOf(that.form.name.toLowerCase()) !== -1 || user.status.toLowerCase().indexOf(that.form.name.toLowerCase()) !== -1);
            })
        }
    },
    components: {}
});
module.exports = comm;