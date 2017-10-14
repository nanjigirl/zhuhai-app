var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var waterInfoDetail = require('modules/waterInfoDetail');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            pickerValue:'',
            hzName:'',
            testTime:'',
            datetime2:'',
            showWaterInfoDetail:false,
            newsList:[
                {
                    title:'黄河',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-15',
                    levelNum:'level-num-2',
                    level:'Ⅱ',
                    area:'高青县黑里寨镇官庄村',
                    do1:'5.62(mg/L)',
                    cod:'9(mg/L)',
                    nh3:'0.375(mg/L)',
                    tp:'0.08(mg/L)'
                },{
                    title:'小清河',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-13',
                    levelNum:'level-num-2',
                    level:'Ⅱ',
                    area:'高青县黑里寨镇贾庄村',
                    do1:'4.62(mg/L)',
                    cod:'7(mg/L)',
                    nh3:'0.377(mg/L)',
                    tp:'0.09(mg/L)'
                },{
                    title:'支脉河',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-01',
                    levelNum:'level-num-3',
                    level:'Ⅲ',
                    area:'高青县花沟镇阎家村',
                    do1:'5.72(mg/L)',
                    cod:'10(mg/L)',
                    nh3:'0.38(mg/L)',
                    tp:'0.10(mg/L)'
                },{
                    title:'北支新河',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-01',
                    levelNum:'level-num-3',
                    level:'Ⅲ',
                    area:'高青县黑里寨镇张官店村',
                    do1:'5.72(mg/L)',
                    cod:'10(mg/L)',
                    nh3:'0.38(mg/L)',
                    tp:'0.10(mg/L)'
                },{
                    title:'干二排',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-01',
                    levelNum:'level-num-5',
                    level:'Ⅴ',
                    area:'木李镇杨坊村',
                    do1:'5.72(mg/L)',
                    cod:'10(mg/L)',
                    nh3:'0.38(mg/L)',
                    tp:'0.10(mg/L)'
                },{
                    title:'杜姚沟',
                    // imgHtml:'<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">' +
                    // '<img src="img/cropper/cropper.jpg">',
                    date:'2017-09-01',
                    levelNum:'level-num-4',
                    level:'Ⅳ',
                    area:'开发区刘王庄村 ',
                    do1:'5.72(mg/L)',
                    cod:'10(mg/L)',
                    nh3:'0.38(mg/L)',
                    tp:'0.10(mg/L)'
                }
            ]
        }
    },
    methods: {
        openDatePicker:function () {
            this.$refs.picker.open();
            // if(!!this.datetime2){
            //     this.testTime = this.datetime2;
            // }
        },
        handleConfirm:function () {
            if(!!this.pickerValue){
                this.testTime = this.pickerValue.toLocaleDateString();
            }
        },
        returnHome:function(){
            eventHelper.emit('openSub');
        },
        openWaterInfo:function(item,index){
            this.showWaterInfoDetail = true;
            var itemObj = {};
            itemObj.item = item;
            itemObj.index = index;
            eventHelper.emit('openWaterDetail',itemObj);
        }
    },
    mounted: function () {
        eventHelper.on('returnNewsHome',function(){
            this.showWaterInfoDetail = false;
        }.bind(this));
    },
    components: {
        'water-info-detail':waterInfoDetail
    }
});
module.exports = comm;