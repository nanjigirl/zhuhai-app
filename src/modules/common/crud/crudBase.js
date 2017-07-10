//增删改功能基类

var crudBase = Vue.extend({
    data: function () {
        return {
            //容器（默认）
            containerMain: {},
            //当前最大html元素的id，因为jquery经常用id查询，为防止不同功能间id重号，因此在查询时限制在本功能范围，id随机生成，保证不重复
            mainContentDivId: "mainContentDiv" + Math.random().toString(36).substr(2),
        }
    },
    mounted: function () {
        //日期控件初始化
        //注意：日期控件初始化在全局基类执行，而不在容器
        this.initDatetimepicker();
    },
    methods: {
        //日期控件初始化（默认格式）
        //这是日期控件的默认格式，如果实际需求需要其他格式，可以重写此方法
        initDatetimepicker: function () {
            //以class为datetimepicker匹配日期控件
            $('.datetimepicker', $("#" + this.mainContentDivId)).datetimepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                autoclose: true,
                startView: 2,
                minView: 2
            }).on('changeDate', function (ev) {

            });
        }
    },
});

module.exports = crudBase;