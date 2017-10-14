var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var echarts = require('echarts');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            activeColor:'#20a0ff',
            title:'',
            waterInfo:{
                waterInfoTitle:'',
                waterLevel:{},
                waterInfoArea:'',
                waterInfoTime:'',
                do1:'',
                cod:'',
                nh3:'',
                tp:''
            },
            content:[],
            date:'',
            num:0,
            count:0,
            newsDetail:[
                {
                    title:'县政协召开十四届三次常委会议',
                    content:[
                        // {
                        //     img:'img/cropper/cropper.jpg'
                        // },
                        {
                            text:'近日，广州市河长办举行“广州河长APP”全市试运行仪式。我市在省内率先推出“广州河长APP”，并在沙河涌进行试点，利用信息技术手段，搭建了一个河长日常事务管理和市民举报水污染问题的平台。'
                        },{
                            text:'中央、省、市关于全面推行河长制的意见、方案均明确要求建立完善“互联网+河长制”，充分运用信息化手段为河长制工作提供有力支撑。6月29日，省河长办召开“互联网+河长制”技术研讨会，广州积极响应，研究开发广州河长管理信息系统，搭建一个河长日常事务管理和市民举报水污染问题的平台。上个月，推出 “广州河长APP”，并在沙河涌进行试点，利用互联网技术，督促河长履职，提升治水效率。'
                        },{
                            text:'市水务信息技术保障中心负责人郭彦娟介绍： “广州河长APP”充分参考广州河长制建设需求，面向广州市、区、镇、村的各级河长办、各级河长、各级职能部门、公众四类用户，提供不同层次、不同纬度、不同载体的查询、上报和管理服务。从试点经验看，“广州河长APP”为各级河长与市民参与到治水工作提供了很多便利：河长签到、巡河轨迹都能实时记录、上传以供查询，巡河动态信息实时进行公示，发现问题可即时上报、流转以及可查询;同时还有水环境治理相关新闻动态、政策法规、经验交流等动态信息公布;河长信息、河湖信息、水质信息也都能在这里公示和查询。”'
                        },{
                            text:'目前，“广州河长APP” 已在沙河涌流域完成为期四周的试运行，现已覆盖全市 1300多条河流(涌)，4000多河段,串接2700多名市、区、镇、村各级河长，其中镇、村河长APP安装率已达100%。'
                        },{
                            text:'市河长办常务副主任、市水务局局长龚海杰介绍，举办“广州河长APP”全市试运行启动仪式，目的就是深化各级河长对于“广州河长APP”重要性的认识，形成强大合力促进“广州河长APP”全面铺开、充分应用，推动 “互联网+河长制”在我市落地生根、开花结果。'
                        },{
                            text:'“广州河长APP”的广泛使用，一是能提升监督力度。可以通过APP快速统计、实时公示各级河长、各相关部门的履职情况，减少“懒政”、“怠政”现象，推动治理工作实现机制化、规范化、长效化;二是提升办公效率。可以推进河长制业务的无纸化办公、提高问题转办和处理的效率，还可以通过用图片、视频等多种方式展示河涌治理信息，强化各类信息发布成效;三是提升社会参与积极性。市民群众可以随时通过手机微信参与河涌治理，市民维护美丽家园的动力和积极性得以极大提高。'
                        },{
                            text:'会上，市政府副秘书长、市河长办主任李红卫强调：各级河长要正确认识当前的严峻形势，务必采取治水的“笨功夫”“真功夫”“苦功夫”，以实实在在的行动、坚决有力的举措，切实解决河涌黑臭问题，有力回应社会的关切。他要求：各级河长要正确认识当前治水工作的严峻形势，学好用好“广州河长APP”，全面提升河湖治理能力。市河长办要加强督查，不定期检查各区各级河长的“河长APP”安装使用率，“广州河长APP”正式上线运行后，河长的巡河率，问题处理率、群众投诉问题的处理效率等，都将成为河长考核的指标。各级河长在使用过程中，要多沟通交流，总结经验与问题，及时提出、反馈自己的意见建议，让“广州河长APP”在实践中不断优化完善，更加快捷便利。'
                        }
                    ],
                    date:'2017-09-15',
                    num:26,
                    count:18
                },{
                    title:'全县政务信息资源目录编制工作正式启动',
                    content:[
                        // {
                        //     img:'img/cropper/cropper.jpg'
                        // },
                        {
                            text:'全县政务信息资源目录编制工作正式启动'
                        }
                    ],
                    date:'2017-09-13',
                    num:26,
                    count:18
                },{
                    title:'县委办公室　县政府办公室关于印发《高青县全面实行河长制实施方案》的通知',
                    content:[
                        // {
                        //     img:'img/cropper/cropper.jpg'
                        // },
                        {
                            text:'2017年10月底前，全面实行河长制，建立起县、镇、村三级河长组织体系以及责任明确、协调有序、监管严格、保护有力的河湖管理保护体制和良性运行机制。其中，2017年4月底前，县、镇（街道）党委、政府分别公布县、镇、村三级河长名单，建立完善三级河长制组织体系并出台实施方案；5月底前各级出台相关制度和考核办法；6月底前，负责牵头的县有关部门就牵头事项提出专项实施方案和考核细则；7月份完成河长制工作进展情况中期评估。.'
                        },
                        {
                            text:'到2020年，重要河湖水功能区水质达标率提高到82.5%；省控重点河流水质基本达到水环境功能区划要求，重点流域水质优良（达到或优于III类）比例总体达到60%以上；城市建成区黑臭水体控制在10%以内；城市集中式饮用水水源水质优良（达到或优于III类）比例总体高于98%；自然湿地保护率达到70%；骨干河道、重要湖泊、重点水库的生态水量基本得到维持；乱占乱建、乱围乱堵、乱采乱挖、乱倒乱排等“八乱”现象基本消除，基本建成河湖健康保障体系和管理机制。.'
                        },
                        {
                            text:'到2030年，重要河湖水功能区水质达标率提高到95.9%；重点流域水质优良（达到或优于III类）比例总体达到65%以上；城市建成区总体基本消除黑臭水体；除地质原因外，城市集中式饮用水水源水质优于III类比例达到100%；自然湿地保护率达到80%以上；城乡重要河道基本保有生态基流；岸线利用规范有序，河湖水事秩序良好；省控重点河流全面恢复水环境功能，水环境风险得到控制，河湖生态系统基本恢复.5%；省控重点河流水质基本达到水环境功能区划要求，重点流域水质优良（达到或优于III类）比例总体达到60%以上；城市建成区黑臭水体控制在10%以内；城市集中式饮用水水源水质优良（达到或优于III类）比例总体高于98%；自然湿地保护率达到70%；骨干河道、重要湖泊、重点水库的生态水量基本得到维持；乱占乱建、乱围乱堵、乱采乱挖、乱倒乱排等“八乱”现象基本消除，基本建成河湖健康保障体系和管理机制。.'
                        }
                    ],
                    date:'2017-09-01',
                    num:26,
                    count:18
                }
            ]
        }
    },
    methods: {
        returnParent:function(){
            eventHelper.emit('returnNewsHome');
        }
    },
    mounted: function () {
        if ($('#doCharts').length ){
            var doCharts = echarts.init(document.getElementById('doCharts'));
            var option1 = {
                color: ['#20a0ff'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['溶氧量(mg/L)'],
                    left:'0',
                    top:'15%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['2017.05', '2017.06', '2017.07', '2017.08'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'溶氧量(mg/L)',
                        type:'line',
                        barWidth: '60%',
                        data:[4, 4.2, 4.5, 5.5]
                    }
                ]
            };
            doCharts.setOption(option1, true);
        }
        if ($('#codCharts').length ){
            var codCharts = echarts.init(document.getElementById('codCharts'));
            var option2 = {
                color: ['#20a0ff'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['化学需氧量(mg/L)'],
                    left:'0',
                    top:'15%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['2017.05', '2017.06', '2017.07', '2017.08'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'化学需氧量(mg/L)',
                        type:'line',
                        barWidth: '60%',
                        data:[14.4, 10, 16, 10]
                    }
                ]
            };
            codCharts.setOption(option2, true);
        }
        if ($('#nh3Charts').length ){
            var nh3Charts = echarts.init(document.getElementById('nh3Charts'));
            var option3 = {
                color: ['#20a0ff'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['氨氮(mg/L)'],
                    left:'0',
                    top:'15%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['2017.05', '2017.06', '2017.07', '2017.08'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'氨氮(mg/L)',
                        type:'line',
                        barWidth: '60%',
                        data:[1.82, 1.2, 0.61, 0.4]
                    }
                ]
            };
            nh3Charts.setOption(option3, true);
        }
        if ($('#tpCharts').length ){
            var tpCharts = echarts.init(document.getElementById('tpCharts'));
            var option4 = {
                color: ['#20a0ff'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['总磷(mg/L)'],
                    left:'0',
                    top:'15%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['2017.05', '2017.06', '2017.07', '2017.08'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'总磷(mg/L)',
                        type:'line',
                        barWidth: '60%',
                        data:[0.31, 0.28, 0.39, 0.08]
                    }
                ]
            };
            tpCharts.setOption(option4, true);
        }
        eventHelper.on('openWaterDetail',function(waterInfoIndex){
            this.waterInfo.waterInfoTitle = waterInfoIndex.item.title;
            this.waterInfo.waterLevel.levelNum = waterInfoIndex.item.levelNum;
            this.waterInfo.waterLevel.level = waterInfoIndex.item.level;
            this.waterInfo.waterInfoArea = waterInfoIndex.item.area;
            this.waterInfo.waterInfoTime = waterInfoIndex.item.date;
            this.waterInfo.do1 = waterInfoIndex.item.do1;
            this.waterInfo.cod = waterInfoIndex.item.cod;
            this.waterInfo.nh3 = waterInfoIndex.item.nh3;
            this.waterInfo.tp = waterInfoIndex.item.tp;
            this.newsDetail.forEach(function(value,index){
                if(index === waterInfoIndex.index){
                    this.title = value.title;
                    this.content = value.content;
                    this.date = value.date;
                    this.num = value.num;
                    this.count = value.count;
                }
            }.bind(this))
        }.bind(this));
    },
    components: {

    }
});
module.exports = comm;