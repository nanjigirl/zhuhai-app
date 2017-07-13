var template = require('./rightPanel.html');
var controller = require('controllers/rightPanelController');
// var monitor = require('./monitor');
// var statistics = require('./statistics');
// var dateController = require('./dateControl');
var facilityController = require('controllers/facilityController');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
var eventHelper = require('utils/eventHelper');
var detailGridHeader = [{key: 'startDate', value: '起始时间'}, {key: 'deep', value: '最大积水深度'}, {
    key: 'period',
    value: '积水时长'
}];
var getURLParameter = function (str) {
    return str.substring(str.indexOf('=') + 1, str.length);
}
var realTimeUpdate = function (self, monitorObj) {
    controller.getMonitorItemCurrentValue(monitorObj, function (result) {
        // self.lastUpdateTime = moment().format('YYYY-MM-DD hh:mm:ss', new Date());
        self.$refs.monitorPlugin.$emit('update-monitor', result);
        self.$refs.statisticPlugin.$emit('update-statistic', {
            data: result,
            facility: self.facility
        });
    });
};
var refreshTime = 1000;
var currentThread;
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            msgLists: [
                {
                    children: [
                        {
                            name: '证号',
                            value: '201630002'
                        },
                        {
                            name: '临时消纳场名称',
                            value: '南宁市仙葫经济开发区五合社区消纳场'
                        }
                    ]
                },
                {
                    children: [
                        {
                            name: '地址',
                            value: '南宁市仙葫经济开发区蒲旧公路'
                        },
                        {
                            name: '有效期限',
                            value: '2016.05.20-2017.05.20'
                        }
                    ]
                },
                {
                    children: [
                        {
                            name: '联系人',
                            value: '韦绍陆'
                        },
                        {
                            name: '电话',
                            value: '18878876669'
                        }
                    ]
                },
                {
                    children: [
                        {
                            name: '行政主管部门',
                            value: '市城管局'
                        },
                        {
                            name: '分管领导',
                            value: '李军'
                        }
                    ]
                },
                {
                    children: [
                        {
                            name: '联系人',
                            value: '陈明'
                        },
                        {
                            name: '电话',
                            value: '15177925360'
                        }
                    ]
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
            heads: detailGridHeader,
            // rows: [{
            //     startDate: '2016-10-09',
            //     deep: '0.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-19',
            //     deep: '0.1m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-11-09',
            //     deep: '0.4m',
            //     period: '7h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }, {
            //     startDate: '2016-10-29',
            //     deep: '1.4m',
            //     period: '6h'
            // }]
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
        eventHelper.on('monitor-status', function (status) {
            this.alarmStatus = status;
        }.bind(this));
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
        // this.initGDVideo();
    },
    methods: {
        newCarOpen: function () {
            window.open("http://19.2.81.254:66/Service/dv?device_code=1000001,1000000");
        },
        initHKVideo: function (videoURL) {
            var videoFix = videoURL.split('?')[1].split('&');
            var ip = getURLParameter(videoFix[0]);
            var port = getURLParameter(videoFix[1]);
            var username = getURLParameter(videoFix[2]);
            var password = getURLParameter(videoFix[3]);
            var CameraIndexCodeArray = getURLParameter(videoFix[4]).split("|");

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
        initGDVideo: function (videoURL) {
            var videoFix = videoURL.split('?')[1].split('&');
            var cid = getURLParameter(videoFix[0]);
            var ch = getURLParameter(videoFix[1]);
            if (!ch) ch = 1;
            setTimeout(function () {
                OCX.StartView("http://58.59.133.6&ID=" + cid + "&IP=58.59.133.6&port=9000&CH=" + ch + "&username=admin12345&password=admin12345");
            }, 1000)
        },
        initJJVideo: function (videoURL) {
            var videoFix = videoURL.split('?')[1].split('&');

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
            /*  //ip=172.32.0.28&port=554&cid=4089&status=1
             var ip = getURLParameter(videoFix[0]);
             var port = getURLParameter(videoFix[1]);
             var cid = getURLParameter(videoFix[2]);*/

            if (!!ip && !!port && !!cid) {
                chServerIP = ip;
                nServerPort = port;
                chStreamName = cid;
            }
            var ip = getURLParameter(videoFix[0]);
            var port = getURLParameter(videoFix[1]);
            var cid = getURLParameter(videoFix[2]);

            if (!!ip && !!port && !!cid) {
                chServerIP = ip;
                nServerPort = port;
                chStreamName = cid;
            }
            var obj = document.getElementById("videoobj");
            //obj.SetFrameMode(1,1);alert("SetFrameMode OK");
            //obj.SetShowMode(0);alert("SetShowMode OK");
            //videoobj.StartPlay(nChannel, chServerIP, nServerPort, chStreamName, chDevName, chUser, chPwd, chProtocol, frameSpeed, streamNameSmall, nStreamFlag);
            obj.StartPlay(nChannel, chServerIP, nServerPort, chStreamName, chDevName, chUser, chPwd, chProtocol, frameSpeed, streamNameSmall, nStreamFlag);
            setTimeout(function () {
                init();
            }, 2000);
        },
        initDHVideo: function (videoURL) {
            var videoFix = videoURL.split('?')[1].split('&');
            var szServerIp = getURLParameter(videoFix[0]),//平台IP
                nPort = getURLParameter(videoFix[1]),//平台端口（默认9000）
                szUsername = getURLParameter(videoFix[2]),//登陆用户名
                szPassword = getURLParameter(videoFix[3]);//登陆密码
            var CameraIndexCodeArray = getURLParameter(videoFix[4]).split("|");

//平台固化参数
            var gWndId = 0;
            var nDirect = -1;
            var nOper = -1;
            var gXmlRecords;
            var gRecordPath;
            var bLogin = 0;
            var bIVS = 1;
            var nStreamType = "1";//流码类型
            var nMediaType = "1";//媒体类型
            var nTransType = "1";//传输类型
            var cameraCount = 4;//屏幕数量
            if (CameraIndexCodeArray.length == 1) {
                cameraCount = 1;
            } else if (1 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 4) {
                cameraCount = 4;
            } else if (4 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 9) {
                cameraCount = 9;
            } else if (9 < CameraIndexCodeArray.length && CameraIndexCodeArray.length <= 16) {
                cameraCount = 16;
            } else {
                cameraCount = 4;
            }
            setTimeout(function () {
                var obj = document.getElementById("DPSDK_OCX");

                gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);
                var obj = document.getElementById("DPSDK_OCX");
                obj.DPSDK_SetWndCount(gWndId, cameraCount);
                obj.DPSDK_SetSelWnd(gWndId, 0);
                obj.DPSDK_Login(szServerIp, 9000, szUsername, szPassword);

                obj.DPSDK_AsyncLoadDGroupInfo();
                var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
                for (var i = CameraIndexCodeArray.length - 1; i >= 0; i--) {
                    obj.DPSDK_DirectRealplayByWndNo(gWndId, i, CameraIndexCodeArray[i], 1, 1, 1);
                }
            },1000);

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
        stopJJVideo: function () {
            document.getElementById("videoobj").StopPlay(0);
        },
        open: function (facility, facilityTypeName) {
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
                var facilityID = facility.id;
                facilityController.getFacilityDetail(facilityID, function (data) {
                    console.log(data);
                    data.devices.forEach(function (device) {
                        if (device.devName.toUpperCase().indexOf('VIDEO') !== -1) {
                            var videoURL = device.items[0].value;
                            if (videoURL.indexOf('dh-video' !== -1)) {
                                facilityTypeName = 'DH';
                            }
                            this.facilityType = facilityTypeName;
                            if (facilityTypeName == 'DS') {
                                this.initHKVideo(videoURL);
                            } else if (facilityTypeName == 'CS') {
                                this.initGDVideo(videoURL);
                            } else if (facilityTypeName == 'TP') {
                                this.initJJVideo(videoURL);
                            }
                            else if (facilityTypeName == 'DH') {
                                this.initDHVideo(videoURL);
                            }
                            return;
                        }
                    }.bind(this));
                }.bind(this));
                /*     if (facilityID == '35') {
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
                 }*/
                this.facilityName = facility.name;
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
            // this.$refs.monitorPlugin.$emit('switchMode', this.isRealTimeMode);
            // this.$refs.statisticPlugin.$emit('switchMode', this.isRealTimeMode);
            // if (!this.isRealTimeMode) {
            //     //query by default date
            //     // this.$refs.dateController.queryByDefaultDate();
            // }
        }
    },
    components: {
        // monitor: monitor,
        // statistics: statistics,
        // dateControl: dateController
    }
});
module.exports = comm;