var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            dialogFormVisible: false,
            isCreateProject: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''},
            projects: [
                {
                    name: '竹皮河水环境治理',
                    startDate: '2017-06-01',
                    members: [
                        {name: 'Sam'}
                    ],
                    progress: 20,
                    status: '立项'

                },
                {
                    name: '华为开发者大赛',
                    startDate: '2017-06-11',
                    members: [
                        {name: 'Sam'},
                        {name: 'Sam'},
                        {name: 'Sam'}
                    ],
                    progress: 50,
                    status: '正在开发'

                },
                {
                    name: '车陂涌排水户治理',
                    startDate: '2017-05-11',
                    members: [
                        {name: 'Sam'},
                        {name: 'Sam'},
                        {name: 'Sam'},
                        {name: 'Sam'}
                    ],
                    progress: 10,
                    status: '已经签约'

                }
            ]
        }
    },
    methods: {
        viewDetail: function () {
            this.dialogFormVisible = true;
        },
        createProject:function () {
            this.dialogFormVisible = true;
            this.isCreateProject = true;

        },
        addProject:function () {
            var self = this;
            this.projects.push( {
                name: self.form.name,
                startDate: '2017-06-01',
                members: [
                    {name: 'Sam'}
                ],
                progress: 20,
                status: self.form.resource

            })
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;