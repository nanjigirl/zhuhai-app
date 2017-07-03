var template=require('./report.html');
var comm = Vue.extend({
    template: template,
    data:function () {
        return {
            message:''
        }
    }
});
module.exports=comm;