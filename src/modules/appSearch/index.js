var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var appMenuController = require('controllers/appMenuController');
var menuData = require('services/mockMenu');
var facilityService = require('services/facilityService');
// var serviceHelper = require('services/serviceHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showSearch: false,
            isToggleMenu: false,
            account:6,
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
                value: '南宁市交警支队',
                label: '南宁市交警支队'
            }],
            pollutions: [{
                value: '',
                label: ''
            },{
                value: '工地',
                label: '工地'
            }, {
                value: '消纳场',
                label: '消纳场'
            }, {
                value: '采石场',
                label: '采石场'
            }, {
                value: '混凝土搅拌站',
                label: '混凝土搅拌站'
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
            }, {
                value: '江南区',
                label: '江南区'
            }, {
                value: '良庆区',
                label: '良庆区'
            }, {
                value: '邕宁区',
                label: '邕宁区'
            }, {
                value: '高新区',
                label: '高新区'
            }],
            facilityTableData: [{
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
        getFacilityTableData:function () {
            var self =this;
            facilityService.getFacilityLists('','','',' ',function (result) {
                console.log(result);
                result.facilityList.forEach(function (value) {
                    self.facilityTableData.push({
                        name:value.name,
                        status:'在线'
                    })
                })
            });
        },
        searchRecord:function () {
            var self = this;
            self.facilityTableData.splice(0);
            facilityService.getFacilityLists(self.form.name,self.form.address,self.form.data,self.form.pollute,function (result) {
                console.log(result);
                result.facilityList.forEach(function (value) {
                    self.facilityTableData.push({
                        name:value.name,
                        status:'在线'
                    })
                })
            });
        },
        close:function (formName) {
            this.showSearch = false;
            // this.$refs[formName].resetFields();
        },
    },
    mounted: function () {
        this.getFacilityTableData();
        eventHelper.on('openPointSearch', function () {
            this.showSearch = !this.showSearch;
        }.bind(this));
        eventHelper.on('toggle-menu', function (flag) {
            this.isToggleMenu = flag;
        }.bind(this));
    },
    computed: {
        //搜索功能（当前是按照名字和在线情况进行过滤）
        // searchEquipment: function () {
        //     // return this.searchFilter();
        //     var that = this;
        //
        //     var search = that.facilityTableData.filter(function (user) {
        //         var addressSearch =user.name.toLowerCase().indexOf(that.form.name.toLowerCase()) !== -1;
        //         var dataSearch = user.name.toLowerCase().indexOf(that.form.data.toLowerCase()) !==-1;
        //         var pollutionSearch = user.name.toLowerCase().indexOf(that.form.pollute.toLowerCase()) !==-1;
        //         var areaSearch = user.name.toLowerCase().indexOf(that.form.address.toLowerCase()) !==-1;
        //         return (addressSearch && dataSearch && pollutionSearch && areaSearch);
        //     });
        //     that.account = search.length;
        //     return search;
        // }
    },
    components: {}
});
module.exports = comm;