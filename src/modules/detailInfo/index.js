var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        returnMain:function(){
            eventHelper.emit('change-menu','new-question');
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;