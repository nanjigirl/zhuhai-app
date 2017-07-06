var template = require('./content.html');
var controller = require('controllers/rightPanelController');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var eventHelper = require('utils/eventHelper');
var refreshTime = 1000;
var currentThread;
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            checked:false,
            carData: {
                num: '',
                type:'',
                dateStart:'',
                dateEnd:''
            },
            carLists:[
                {
                    num:'桂AD2375',
                    name:'南宁泰斗运输信息咨询有限公司（渣土）',
                }
            ],
            datatheads:['车辆编号','经过时间','时段录像'],
            complaintImg:'../src/img/reportPic.jpg',
            complaintMsg:[
                {name:'投诉类型',val:'路面污染'},
                {name:'地址',val:'五合大道中国石化旁'},
                {name:'投诉时间',val:'2017-04-05 14:23:21'}
            ],
            complaintLists:[
                {
                    name:'桂AE5271',time:'--',videoSrc:'../src/img/video_player.png'
                },
                {
                    name:'桂AE5271',time:'--',videoSrc:'../src/img/video_player.png'
                },
                {
                    name:'桂AE5271',time:'--',videoSrc:'../src/img/video_player.png'
                },
                {
                    name:'桂AE5271',time:'--',videoSrc:'../src/img/video_player.png'
                },
                {
                    name:'桂AE5271',time:'--',videoSrc:'../src/img/video_player.png'
                },
                {
                    name:'桂AE5271',time:'--',videoSrc:'../src/img/video_player.png'
                },
                {
                    name:'桂AE5271',time:'--',videoSrc:'../src/img/video_player.png'
                }
            ],
            rightPanelOpen: false,
            isRealTimeMode: true,
            realTimeName: '实时监测',
            historyName: '历史记录',
            // lastUpdateTime: '',
            alarmStatus: 0,
            alertMessage: '',
            activeIndex: '1',
            facilityPic: '../src/img/combImg.png',
            facilityName: '',
            selectedMode: '',
            facilityType: '',
            waterGrade: 1,
            waterGradeTitle: '',
            register: {
                title: '',
                content:'',
                people:'',
                date:''
            },
            rules: {
                title: [
                    { required: true, message: '请输入违章标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入违章内容', trigger: 'blur' }
                ],
                people: [
                    { required: true, message: '请选择登记人', trigger: 'change' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        classObject: function () {
            return {
                'one': this.waterGrade === 1,
                'two': this.waterGrade === 2,
                'three': this.waterGrade === 3,
                'four': this.waterGrade === 4,
                'five': this.waterGrade === 5,
                'six': this.waterGrade === 6
            }
        }
    },
    mounted: function () {
        this.$on('query-history', function (date) {
            // controller.getHistoricalDataByMonitor(this.waterLevelID ,date.startDate,date.endDate,function(result){
            this.$refs.statisticPlugin.$emit('init-statistic-history', {
                facility: this.facility,
                date: date
            });
        });
        eventHelper.on('current-grade', function (grade) {
            this.waterGrade = grade.grade;
            this.waterGradeTitle = grade.title;
        }.bind(this));
        eventHelper.on('close-right-panel', function () {
            this.closePanel();
        }.bind(this));
        eventHelper.on('openHistoryPanel', function () {
           this.rightPanelOpen = true;
        }.bind(this));
        // this.initGDVideo();
    },
    methods: {
        initHKVideo: function () {
            var ip = "180.139.134.6";
            var port = "443";
            var username = "admin";
            var password = "Wmdx1234";
            var CameraIndexCodeArray = "001642|001646|001647|001644|001643|001645|001680".split("|");

            function LoginPlat() {
                //alert("LoginPlat()");
                var cameraCount = 1;
                if (CameraIndexCodeArray.length == 1) {
                    cameraCount = 1;
                } else if (1 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 4) {
                    cameraCount = 2;
                } else if (4 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 9) {
                    cameraCount = 3;
                } else if (9 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 16) {
                    cameraCount = 4;
                } else if (16 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 25) {
                    cameraCount = 5;
                } else {
                    cameraCount = 3;
                }
                OCX.SetLayoutType(cameraCount);

                var v1 = "<?xml version=\"1.0\" encoding=\"utf-8\"?><LoginInfo><LoginType>2</LoginType><SynLogin>1</SynLogin><IP>" + ip + "</IP><Port>" + port + "</Port><UserName>" + username + "</UserName><Password>" + password + "</Password></LoginInfo>";

                var v = OCX.LoginPlat(v1);
                if (v != 0)
                    alert("登录失败，请查看日志preview.log");
            }

//新的预览接口，需先登录平台，登录需要耗点时间，稍等（控件自身取Token）
            function StartPreview() {
                //alert("StartPreview()");
                $(CameraIndexCodeArray).each(function (index, item) {
                    var _param = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Preview><CamIndexCode>" + item + "</CamIndexCode></Preview>";
                    OCX.StartPreviewByIndex(_param, index);
                });
            }

            setTimeout(function () {
                //alert("mmp");
                LoginPlat();
                StartPreview();
            }, 1000);
        },
        initGDVideo: function () {
            var cid = 3301061000036;
            var ch = 1;
            if (!ch) ch = 1;
            setTimeout(function () {
                OCX.StartView("http://58.59.133.6&ID=" + cid + "&IP=58.59.133.6&port=9000&CH=" + ch + "&username=admin12345&password=admin12345");
            }, 1000)
        },
        initJJVideo: function () {
            var nChannel = 0; //通道编号：如果只有一个视频，通道编号是多少？0
            var chServerIP = "172.32.0.2"; //设备IP地址：设备IP是否都是一样的？通过视频平台播放，所以可能是一样的
            var nServerPort = "554"; //设备端口号，端口号很多都是一样的？通过视频平台播放，所以可能是一样的
            var chStreamName = "1001"; //视频流名称：视频流名称哪里获取，是否会影响加载视频？视频流名称为设备编号，如1001
            var chDevName = ""; //设备名称：设备哪里获取，是否会影响加载视频？额外的显示信息，可以不填
            var chUser = "admin"; //用户名:用户名密码是否是admin/123，不填也行
            var chPwd = "123456"; //密码
            var chProtocol = "RTSP"; //协议类型：协议RTSP
            var frameSpeed = 25; //帧速
            var streamNameSmall = ""; //视频子码流名称，视频子码流从哪里获取？可以不填
            var nStreamFlag = 1; //播放码流标志位：怎么设置？
//看到平台中有个设备编号，但是该接口没有该编号，IP和端口一样的情况下没有编号是否指定不到设备？
//ip=172.32.0.28&port=554&cid=4089&status=1
            function init() {
                var ip = "172.32.0.28";
                var port = "554";
                var cid = "4089";

                if (!!ip && !!port && !!cid) {
                    chServerIP = ip;
                    nServerPort = port;
                    chStreamName = cid;
                }
                var obj = document.getElementById("videoobj");
                obj.StartPlay(nChannel, chServerIP, nServerPort, chStreamName, chDevName, chUser, chPwd, chProtocol, frameSpeed, streamNameSmall, nStreamFlag);
            };
            setTimeout(function () {
                init();
            }, 2000);
        },
        handleSelect: function () {
            console.log('select');
        },
        closePanel: function () {
            eventHelper.emit('right-panel-close');
            this.reset();
        },
        reset: function () {
            //this.stopJJVideo();
            this.rightPanelOpen = false;
            this.isRealTimeMode = true;
            this.activeIndex = '1';
        },
        stopJJVideo:function () {
            document.getElementById("videoobj").StopPlay(0);
        },
        open: function (facility) {
            eventHelper.emit('isLoading');
            var self = this;
            clearInterval(currentThread);
            if (!this.isRealTimeMode) {
                $('#historicalMode').removeClass('is-active');
                setTimeout(function () {
                    $('#realTimeMode').addClass('is-active');
                }.bind(this), 100);
            }
            this.isRealTimeMode = true;
            this.rightPanelOpen = true;
            this.$nextTick(function () {
                this.activeIndex = '1';
                this.facility = facility;
                if (!!this.$refs.monitorPlugin) {
                    this.$refs.monitorPlugin.$emit('reset');
                }
                var facilityID = facility.id.substring(1);
                if (facilityID == '35') {
                    this.facilityType = 'ylz';
                    this.facilityPic = '../src/img/yuliang.jpg';
                    this.$nextTick(function () {
                        this.initHKVideo();
                    }.bind(this));

                } else if (facilityID == '36') {
                    this.facilityType = 'xs';
                    this.facilityPic = '../src/img/xushui.jpg';
                    this.$nextTick(function () {

                        this.initJJVideo();
                    }.bind(this));
                } else if (facilityID == '37') {
                    this.facilityType = 'hd';
                    this.facilityPic = '../src/img/hedao.jpg';
                    this.$nextTick(function () {
                        this.initGDVideo();
                    }.bind(this));
                }
                this.facilityName = facility.item.name;
            }.bind(this));
        },
        switchMode: function (key, keyPath) {
            this.isRealTimeMode = key === '1';
            if (!this.isRealTimeMode) {
                eventHelper.emit('isLoading');
                $('#realTimeMode').removeClass('is-active');
                $('#historicalMode').addClass('is-active');
            }
            else {
                $('#historicalMode').removeClass('is-active');
                $('#realTimeMode').addClass('is-active');
            }
        }
    },
    components: {
    }
});
module.exports = comm;
// var template = require('./content.html');
// var eventHelper = require('../../utils/eventHelper');
// var controller = require('controllers/rightPanelController');
// var facilityController = require('controllers/facilityController');
// var serviceHelper = require('services/serviceHelper');
// var moment = require('moment');
// var historySearchServices = require('services/historySearchServices');
//
// // 定义组件
// var comm = Vue.extend({
//     template: template,
//
//     data: function () {
//         return {
//             rightPanelOpen: false,
//             carData: {
//                 num: '',
//                 type:'',
//                 dateStart:'',
//                 dateEnd:''
//             },
//             datatheads:['车辆编号','车队名称','驾驶员','定位状态','在线状态','更新时间','查看历史'],
//             carLists:[
//                 {
//                     num:'桂AD2375',
//                     name:'南宁泰斗运输信息咨询有限公司（渣土）'
//                     ,driver:'张晓春',
//                     positionStatus:'定位有效',
//                     onlineStatus:'在线',
//                     updateTime:'2017-06-03 10:27:02',
//                     history:'车辆追踪'
//                 }
//             ],
//             dialogFormVisible: false,
//         }
//     },
//
//
//     methods: {
//         queryCarData: function () {
//             var self = this;
//             historySearchServices.getCarListData(function (data) {
//                 if (!!data) {
//                     self.carLists.splice(0);
//                 }
//                 data.forEach(function (menu) {
//                     self.carLists.push({
//                         num: menu.truckNum,
//                     });
//                 })
//             });
//         },
//     },
//     mounted: function () {
//         eventHelper.on('openHistoryDialog', function () {
//             this.dialogFormVisible = true;
//         }.bind(this));
//         this.queryCarData();
//         // this.queryOrders();
//         // this.queryMenus();
//         // this.queryEmployee();
//         // this.$refs.selectOnne.$on('change',function (event) {
//         //     console.log(event);
//         // })
//     },
//     components: {},
//     computed: {
//
//
//     }
// });
// module.exports = comm;