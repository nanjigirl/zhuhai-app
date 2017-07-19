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
            account:6,
            datatheads: ['测站名称', '状态'],
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
                value: '易捞点',
                label: '易捞点'
            }, {
                value: '窨井',
                label: '窨井'
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
                value: '静安区',
                label: '静安区'
            }, {
                value: '黄埔区',
                label: '黄埔区'
            }],
            tableData: [{
                name: '黄埔区沙井大道监测点',
                status: '在线'
            }, {
                name: '静安区保盖监测点',
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
                var addressSearch =user.name.toLowerCase().indexOf(that.form.name.toLowerCase()) !== -1;
                var dataSearch = user.name.toLowerCase().indexOf(that.form.data.toLowerCase()) !==-1;
                var pollutionSearch = user.name.toLowerCase().indexOf(that.form.pollute.toLowerCase()) !==-1;
                var areaSearch = user.name.toLowerCase().indexOf(that.form.address.toLowerCase()) !==-1;
                return (addressSearch && dataSearch && pollutionSearch && areaSearch);
            });
            that.account = search.length;
            return search;
        }
    },
    components: {}
});
module.exports = comm;