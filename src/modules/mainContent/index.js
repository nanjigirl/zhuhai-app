var template = require('./content.html');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            sheetVisible: false,
            actions: [
                {name:'天假',method:function () {
                    alert(1)
                }},
                {name:'天假2',method:function () {
                    alert(2)
                }}
            ],
            show1: false,
            myItems1: [
                {
                    label: '拍照',
                    callback: () => {
                        this.$dialog.toast({mes: '咔擦，此人太帅！'});
                        /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
                    }
                },
                {
                    label: '从相册中偷取',
                    callback: () => {
                        this.$dialog.toast({mes: '看到了不该看到的东西！'});
                    }
                }
            ]
        }
    },
    methods: {
        closePanel: function () {
            this.show = !this.show;
        }
    },
    mounted: function () {

    },
    components: {}
});
module.exports = comm;