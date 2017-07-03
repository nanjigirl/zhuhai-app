var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var orderService = require('services/orderService');
var userService = require('services/userService');
// 定义组件
var comm = Vue.extend({
    template: template,

    data: function () {
        return {
            allowCreate: false,
            isDisabled: true,
            active: 0,
            dialogFormVisible: false,
            isCreateProject: false,
            totalPrice: 0,
            options: [],
            rules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'change'}
                ]
                // menu: [
                //     { required: true, message: '请选择活动区域', trigger: 'change' }
                // ]
            },
            form: {
                name: '',
                options4: [],
                name: '',
                list: [],
                loading: false,
                states: [],
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
        //name change
        selectName: function () {
            if (!!this.form.name) {
                localStorage.setItem('userName', this.form.name);
            }
            this.isDisabled = false;
            this.active = 1;
        },
        //选择菜单时，步骤2改变，创建按钮允许操作
        selectMenu: function () {
            var temp = []; //临时数组1
            var temparray = [];//临时数组2
            for (var i = 0; i < this.form.menu.length; i++) {
                temp[this.form.menu[i]] = true;//把数组1的值当成临时数组1的键并赋值为真
            }
            ;
            for (var i = 0; i < this.options.length; i++) {
                if (temp[this.options[i].value]) {
                    temparray.push(this.options[i].price);//同时把数组2的值当成临时数组1的键并判断是否为真，如果为真说明重复，就合并到一个新数组里，这样就可以得到一个全新的重复的数组
                }
                ;
            }
            ;
            this.totalPrice = 0;
            for (var i = 0; i < temparray.length; i++) {
                this.totalPrice += temparray[i];
            }
            if (!this.isDisabled) {
                this.active = 2;
                this.allowCreate = true;

            }
        },
        //模态框初始状态
        createProject: function (formName) {
            this.dialogFormVisible = true;
            this.isCreateProject = true;
            this.active = 0;
            this.isDisabled = true;
            this.allowCreate = false;
            //如果已经有名字的话，下面下拉列表可操作
            if (!!this.form.name) {
                this.isDisabled = false;
                this.active = 1;
            }
            this.$nextTick(function () {
                this.resetForm('form');
            }.bind(this));

            // this.form.name = '';
            // this.form.region = '';
            // this.form.date1 = '2017-1-1';
            // this.form.email = '';
            // this.form.sex = '';
            // this.form.desc = '';
            // this.form.type = [];
        },

        //增加表格内容
        makeOrder: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var self = this;
                    orderService.makeOrder(self.form, self.totalPrice, function () {
                        alert('预定成功!');
                        this.dialogFormVisible = false;
                        this.gridData.push({
                            name: self.form.name,
                            menu: self.form.menu.join(","),
                            price: self.totalPrice
                            // sex: self.form.sex,
                            // birth: self.form.date1.toLocaleDateString(),
                            // birthplace:self.form.region,
                            // email:self.form.email,
                            // interest:self.form.type.join(","),
                            // address: self.form.desc
                        });
                        this.$refs[formName].resetFields();
                    }.bind(this));
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //点击返回按钮重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClose: function () {
            this.resetForm('form');
        },
        //删除当前行
        deleteThisRow: function (index) {
            var index = index;
            this.gridData.splice(index, 1);
        },
        queryOrders: function () {
            var self = this;
            orderService.getOrders(function (data) {
                if (!!data) {
                    self.gridData.splice(0);
                }
                data.forEach(function (order) {
                    self.gridData.push({
                        name: order.name,
                        menu: order.options,
                        price: order.price
                    });
                })
            })
        },
        queryMenus: function () {
            var self = this;

            orderService.getMenus(function (data) {
                if (!!data) {
                    self.options.splice(0);
                }
                data.forEach(function (menu) {
                    self.options.push({
                        value: menu.name,
                        label: menu.name + ' ' + menu.price,
                        price: menu.price
                    });
                })
            });
        },
        queryEmployee: function () {
            var self = this;

            userService.getAllEmployee(function (data) {
                if (!!data) {
                    //self.form.states.splice(0);
                }
                data.forEach(function (employee) {
                    self.form.states.push(employee.name);
                });
                self.form.list = self.form.states.map(item => {
                    return {value: item, label: item};
                });
            });
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
        }
    },
    mounted: function () {
        var userName = localStorage.getItem('userName');
        if (!!userName) {
            this.form.name = userName;
        }

        this.queryOrders();
        this.queryMenus();
        this.queryEmployee();
        // this.$refs.selectOnne.$on('change',function (event) {
        //     console.log(event);
        // })
    },
    components: {},
    computed: {
        //搜索功能（当前是按照名字和性别进行过滤）
        searchUsers: function () {//根据名字和性别过滤
            var that = this;
            return that.gridData.filter(function (user) {
                return (user.name.toLowerCase().indexOf(that.searchQuery.toLowerCase()) !== -1);

            })
        },
        total: function (val) {
            if (typeof (val) == Object) {

            }
        }

    }
});
module.exports = comm;