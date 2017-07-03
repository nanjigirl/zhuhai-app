var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
// var orderService = require('services/orderService');
// var userService = require('services/userService');
// 定义组件
var comm = Vue.extend({
    template: template,

    data: function () {
        return {
            stepIndex:1,
            allowCreate:false,
            allowOprate: false,
            isDisabled: true,
            active: 0,
            active1:1,
            isDisableInput:true,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            rules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'change'}
                ]
                // menu: [
                //     { required: true, message: '请选择活动区域', trigger: 'change' }
                // ]
            },
            ruleForm: {
                name: '',
                sex:'',
                eMail:'',
                telphone:'',
                date:''
            },
            form: {
                name: '',
                options4: [],
                name: '',
                list: [],
                loading: false,
                states: ['张三','李四','王五','marry','jack'],
                menu: [],
                desc: ''
            },
            searchQuery: '',
            datatheads: ['姓名', '点餐', '价格', '操作'],
            gridData: [
                // {name: 'zhangsan',sex: '男',  birth: '1991-10-24',birthplace: '广州',interest: '篮球，羽毛球',email: '123@qq.com',address: '万胜围',delete:'删除'},
                // {name: 'marry',sex: '女',  birth: '1992-11-11',birthplace: '佛山',interest: '篮球，羽毛球',email: '123@qq.com',address: '大沥',delete:'删除'},
                // {name: 'jack',sex: '男',  birth: '1993-3-24',birthplace: '深圳',interest: '篮球，羽毛球',email: '123@qq.com',address: '前海湾',delete:'删除'}
            ]
        }
    },


    methods: {
        //选择菜单时，步骤2改变，创建按钮允许操作
        selectMenu: function () {
            if (!this.isDisabled) {
                    this.active = 2;
                    this.isDisableInput = false;
                }
            },
        payOrder:function () {
            if (!this.isDisableInput) {
                this.active = 3;
                this.allowCreate = true;
            }
        },
        //name change
        selectName: function () {
            if (!!this.form.name) {
                localStorage.setItem('userName', this.form.name);
            }
            this.isDisabled = false;
            this.active = 1;
        },
        remoteMethod: function (query) {
            if (query !== '') {
                this.form.loading = true;
                setTimeout(() => {
                    this.form.loading = false;
                    this.form.options4 = this.form.list.filter(item => {
                        return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.form.options4 = [];
            }
        },
        next:function () {
            if(this.active1<3){
                this.active1++;
            }else {
                return;
            }
            this.allowOprate = true;
            if(this.stepIndex<3){
                this.stepIndex++;
                $('#step-'+this.stepIndex).addClass('show').siblings('.cesc-step').removeClass('show');
            }
        },
        before:function () {
            if(this.active1>1){
                this.active1--;
            } else {
                this.$nextTick(function () {
                    this.allowOprate = false;
                }.bind(this));
                return;
            }
            if(this.stepIndex>1){
                this.stepIndex--;
                $('#step-'+this.stepIndex).addClass('show').siblings('.cesc-step').removeClass('show');
            }
        }
    },
    mounted: function () {
        var userName = localStorage.getItem('userName');
        if (!!userName) {
            this.form.name = userName;
        }
        this.form.list = this.form.states.map(item => {
            return { value: item, label: item };
        });

    },
    components: {},
    computed: {
        //搜索功能（当前是按照名字和性别进行过滤）
        // searchUsers: function () {//根据名字和性别过滤
        //     var that = this;
        //     return that.gridData.filter(function (user) {
        //         return (user.name.toLowerCase().indexOf(that.searchQuery.toLowerCase()) !== -1);
        //
        //     })
        // },

    }
});
module.exports = comm;