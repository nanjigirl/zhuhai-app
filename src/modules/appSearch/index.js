var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var appMenuController = require('controllers/appMenuController');
var menuData = require('services/mockMenu');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showSearch: false,
            isToggleMenu: false,
            datatheads: ['设备名称', '状态'],
            form: {
                name: '',
                address: '',
                data: '',
                pollute: ''
            },
            datas: [{
                value: '',
                label: ''
            }, {
                value: '南宁市建设委员会',
                label: '南宁市建设委员会'
            }, {
                value: '南宁市交警大队',
                label: '南宁市交警大队'
            }],
            pollutions: [{
                value: '',
                label: ''
            },{
                value: '建筑工地',
                label: '建筑工地'
            }, {
                value: '消纳场',
                label: '消纳场'
            }, {
                value: '采石场',
                label: '采石场'
            }, {
                value: '道路',
                label: '道路'
            }],
            areas: [{
                value: '',
                label: ''
            },{
                value: '青秀区',
                label: '青秀区'
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
            }, {
                name: '南宁市建设委员会-吊塔视频',
                status: '在线'
            }, {
                name: '石灰厂-吊塔视频',
                status: '在线'
            }],
        }
    },
    methods: {
        close:function (formName) {
            this.showSearch = false;
            this.$refs[formName].resetFields();
        },
    },
    mounted: function () {
        eventHelper.on('openPointSearch', function () {
            this.showSearch = !this.showSearch;
        }.bind(this));
        eventHelper.on('toggle-menu', function (flag) {
            this.isToggleMenu = flag;
        }.bind(this));
    },
    computed: {
        //搜索功能（当前是按照名字和在线情况进行过滤）
        searchEquipment: function () {
            // return this.searchFilter();
            var that = this;
            var search = that.tableData.filter(function (user) {
                return (user.name.toLowerCase().indexOf(that.form.name.toLowerCase()) !== -1 && user.name.toLowerCase().indexOf(that.form.data.toLowerCase()) !==-1);
            });
            return search;
        }
    },
    components: {}
});
module.exports = comm;