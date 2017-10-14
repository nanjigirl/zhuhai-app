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
                    title:'市委常委谢晓丹赴白云、花都两区调研河涌合治理工作',
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
                    title:'白云湖管理处加强暑期野泳预防治理，未成年人溺水事故零报告',
                    content:[
                        // {
                        //     img:'img/cropper/cropper.jpg'
                        // },
                        {
                            text:'结合湖区暑期外来务工人员及其子女野泳高发的顽疾，白云湖管理处采取多种措施加强预防溺水工作：一是加强临水巡查，及时消除安全隐患。加强日常巡查，共安排15名维管巡查人员，同时设立安保大队机动巡查小组，在重点时段对重点水域进行重点排查。二是完善临水防护设施，提高水域安全防护系数。新增铸铁围栏、铁刺围栏、双侧刺网围栏等防护设施共1635米。三是加强安全警示告知，确保不留真空地带。对已安装的120多个涉水安全警示牌进行修复和增补，严格落实行业标准要求。四是强化宣传教育，提前做好青少年预防管控。各出入口门禁禁止无成年人陪同的青少年进入园区，通过视频监控及时调配人手关注并制止有下水嬉戏倾向的青少年，加强对周边城中村住户的防溺水知识宣传普及等。与往年同比，今年暑期青少年儿童尤其是外来务工人员子女戏水问题大大改善，未成年人溺水事故发生零起。'
                        }
                    ],
                    date:'2017-09-13',
                    num:26,
                    count:18
                },{
                    title:'市人大组织暗访流溪河流域黄埔区九龙镇水环境治理工作',
                    content:[
                        // {
                        //     img:'img/cropper/cropper.jpg'
                        // },
                        {
                            text:'8月22日上午，市人大常委会城建环资工委余世喜副主任按照流溪河市级河长、市人大常委会陈建华主任指示精神，带队前往黄埔区九龙镇现场暗访、督导流溪河一级支流凤凰河水环境治理工作，并在黄埔区九龙镇镇政府召开座谈会。市水务局邱慰荣副巡视员，市河长办，市流溪河办赵登礼主任及相关部门的同志参加了暗访和座谈。'
                        },{
                            text:'本次暗访发现两个污染点，一个是位于凤凰河黄埔区九龙镇凤尾庄段，白云泵业集团围墙边的一条黑臭排水渠，疑似工业污水和生活污水直排，水体最终流入凤凰河，排水渠跨越九龙大道位置被覆盖，底部临时埋设两条管径为80CM的过水涵管，断面过窄，遇强降水易导致上游水浸;另一个是位于黄埔区九龙镇与白云区钟落潭镇交接处惠亚集团下游的凤凰河主干流，河涌水体产生大量白色泡沫，疑似工业污水直排河涌。'
                        },{
                            text:'现场暗访结束后，在黄埔区九龙镇政府召开了座谈会。在听取了黄埔区九龙镇关于凤凰河水环境治理工作的情况汇报后，余世喜副主任要求各区相关部门认真贯彻落实建华主任的指示精神，紧紧围绕《流溪河流域水污染治理方案》的任务和目标，大力开展凤凰河水环境治理工作。一是层层夯实责任，将责任和压力传导到基层一线，强化村居级河长履职尽责，深化“洗楼”行动，把污染源找出来，查清楚，登记好;二是加快完善本辖区内的作战图，实现精准摸底、挂图作战，靶向灭原;三是大力整治工地施工造成的水体污染，对工地提出具体要求，遇降雨等特殊情况时要采取应急措施，防止工地黄泥水排入河道;四是加快污水处理厂及截污管网和农村污水处理设施的建设进度，提高污水收集、处理能力;五是加强与白云区相邻镇街沟通协作，发现问题及时提醒，及时沟通，及时处理。六是严肃处置本次暗访发现的两个水污染问题，溯清源头，查清责任，落实整改。'
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