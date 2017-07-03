var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var appDemoChart = require('modules/appDemoChart');

// 定义组件
var comm = Vue.extend({
    template: template,
    // props:{
    //     datatheads:Array,
    //     gridData:Array,
    //     filterKey: String
    // },
    data: function () {
        return {
            dialogFormVisible: false,
            isCreateProject: false,
            form: {
                name: '',
                region: '',
                date1: '',
                type: [],
                email: '',
                sex: '',
                desc: ''},
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写详细地址', trigger: 'blur' }
                ]
            },
            searchQuery:'',
            datatheads: ['姓名','性别','生日 ','户口','特长','邮箱','详细地址','操作'],
            gridData: [
                {name: 'zhangsan',sex: '男',  birth: '1991-10-24',birthplace: '广州',interest: '篮球，羽毛球',email: '123@qq.com',address: '万胜围',delete:'删除'},
                {name: 'marry',sex: '女',  birth: '1992-11-11',birthplace: '佛山',interest: '篮球，羽毛球',email: '123@qq.com',address: '大沥',delete:'删除'},
                {name: 'jack',sex: '男',  birth: '1993-3-24',birthplace: '深圳',interest: '篮球，羽毛球',email: '123@qq.com',address: '前海湾',delete:'删除'}
            ]
        }
    },
    methods: {
        //模态框初始状态
        createProject:function (formName) {
            this.dialogFormVisible = true;
            this.isCreateProject = true;
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
        addProject:function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('创建成功!');
                    this.dialogFormVisible = false;
                    var self = this;
                    this.gridData.push( {
                        name: self.form.name,
                        sex: self.form.sex,
                        birth: self.form.date1.toLocaleDateString(),
                        birthplace:self.form.region,
                        email:self.form.email,
                        interest:self.form.type.join(","),
                        address: self.form.desc
                    });
                    this.$refs[formName].resetFields();
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
        handleClose:function () {
            this.resetForm('form');
        },
        //删除当前行
        deleteThisRow: function (index) {
            var index = index;
            this.gridData.splice(index,1);
        }
    },
    mounted: function () {

    },
    components: {
        'app-demo-chart':appDemoChart
    },
    computed:{
        //搜索功能（当前是按照名字和性别进行过滤）
        searchUsers: function () {//根据名字和性别过滤
            var that = this;
            return that.gridData.filter(function (user) {
                return (user.name.toLowerCase().indexOf(that.searchQuery.toLowerCase()) !== -1 || user.sex.toLowerCase().indexOf(that.searchQuery.toLowerCase()) !== -1);

            })
        }

    }
});
module.exports = comm;