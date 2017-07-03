var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,

    data: function () {
        return {
            fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
    },


    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    mounted: function () {

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