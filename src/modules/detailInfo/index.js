var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var serviceHelper = require('services/serviceHelper');
var approval = require('modules/approval');
//加载地图组件
var arcgisPlugin = require('modules/arcgisPlugin');
var mapHelper = require('utils/mapHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            defaultLocate:false,
            address:'',
            reportQuestion:'./img/icon/icon-cloud.png',
            delOperation:false,
            uploadImgs:[],
            status:'',
            facilityTitle:'',
            actions:[{
                name:'拍照',
                method:this.selectCamera
            },{
                name:'从相册里选取',
                method:this.selectPhotolibrary
            }
            ],
            sheetVisible:false,
            voiceActions:[{
                name:'普通话',
                method:this.useLocalism1
            },{
                name:'粤语',
                method:this.useLocalism2
            },{
                name:'四川话',
                method:this.useLocalism3
            },
            ],
            voicesheetVisible:false,
            reqMsg: '',
            setBtn: false,
            dialogImageUrl: '',
            dialogVisible: false,
            infoArr:[],
            isLocated: false,
            showApproval:false,
            showCheckList:false,
            checkList:[]
        }
    },
    methods: {
        relateSp:function(){
            this.showApproval = true;
        },
        saveQuestion:function(){
           this.$toast({
               message:'保存成功！！'
           });
        },
        uploadQuestion:function () {
            reqMsg='';
            this.$toast({
                message:'提交成功！！'
            });
            eventHelper.emit('openSub');
            eventHelper.emit('change-menu','upload');
            eventHelper.emit('closeUploadBtn');
            eventHelper.emit('returnBack');
            eventHelper.emit('closeQuestion');
        },
        init: function () {
            this.isLocated = false;
            this.infoArr = [];
            this.setBtn = false;
        },
        returnMain: function () {
            eventHelper.emit('returnBack');
        },
        addNewItem: function () {
            eventHelper.emit('setNormalQues', this.infoArr);
        },
        showDelOperation:function (index,event) {
            var that = this;
            this.uploadImgs[index].showDelOperation = true;
            setTimeout(function () {
                that.uploadImgs[index].showDelOperation = false;
            },2000)
        },
        //删除该图片
        deleteFacilityImage:function (index) {
            this.uploadImgs.splice(index,1);
        },
        //调用相机拍照
        selectCamera:function(){
            this.openCarma(Camera.PictureSourceType.CAMERA);
        },
        //调用相册
        selectPhotolibrary:function () {
            this.openCarma(Camera.PictureSourceType.PHOTOLIBRARY);
        },
        openActionSheet:function () {
            this.sheetVisible =true;
        },
        openCarma: function (sourceType) {
            if (this.status === 1) {
                return;
            }
            var cameraOptions = {
                quality: 100,                                            //相片质量0-100
                destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
                sourceType: sourceType,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
                allowEdit: false,                                        //在选择之前允许修改截图
                encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
                targetWidth: 800,                                        //照片宽度
                targetHeight: 600,                                       //照片高度
                mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            };
            var self = this;
            navigator.camera.getPicture(function (imageUri) {
                self.uploadImgs.push({
                        facilityImageUri:imageUri,
                        showDelOperation:false
                    });
            }, function (error) {
                self.facilityTitle = error;
            }, cameraOptions);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.facilityImageUri = file.url;
            this.dialogVisible = true;
        },
        locatePosition: function () {
            var self = this;
            this.isLocated = !this.isLocated;
            if(this.defaultLocate){
                this.map = new AMap.Map('locateMap',
                    {
                        resizeEnable: true,
                        zoom:16,
                        center: [self.x,self.y]
                    });
                this.marker = new AMap.Marker({
                    icon:"./img/icon/pipe.png",
                    position:new AMap.LngLat(self.x,self.y),
                    extData:{
                        facilityType:'CP'
                    }
                });
                this.marker.setMap(this.map);
            }else {
                this.map = new AMap.Map('locateMap',
                    {
                        resizeEnable: true,
                        zoom:16,
                        center: [113.333542,23.122644]
                    });
                this.marker = new AMap.Marker({
                    icon:"./img/icon/pipe.png",
                    position:new AMap.LngLat(113.333542,23.122644),
                    extData:{
                        facilityType:'CP'
                    }
                });
                this.marker.setMap(this.map);
            }
        },
        openRecord: function () {
            this.voicesheetVisible=true;
        },

        //普通话：mandarin 粤 语：cantonese 四川话：lmz
        useLocalism1:function () {
            this.voicesheetVisible=false;
            var self = this;
            this.$toast({
                message: '正在识别语音',
                position: 'middle',
                duration: 1000
            });
            cordova.plugins.TransformVoiceToText.transform("mandarin", function (msg) {
                self.reqMsg = self.reqMsg + msg;
            }, function (err) {
                self.reqMsg = self.reqMsg + err;
            });
        },
        useLocalism2:function () {
            this.voicesheetVisible=false;
            var self = this;
            this.$toast({
                message: '正在识别语音',
                position: 'middle',
                duration: 1000
            });
            cordova.plugins.TransformVoiceToText.transform("cantonese", function (msg) {
                self.reqMsg = self.reqMsg + msg;
            }, function (err) {
                self.reqMsg = self.reqMsg + err;
            });
        },
        useLocalism3:function () {
            this.voicesheetVisible=false;
            var self = this;
            this.$toast({
                message: '正在识别语音',
                position: 'middle',
                duration: 1000
            });
            cordova.plugins.TransformVoiceToText.transform("lmz", function (msg) {
                self.reqMsg = self.reqMsg + msg;
            }, function (err) {
                self.reqMsg = self.reqMsg + err;
            });
        },
    },
    mounted: function () {
        eventHelper.on('get-current-address',function (item) {
            this.address = item.address;
            this.x = item.x;
            this.y = item.y;
            this.defaultLocate = true;
        }.bind(this));
        eventHelper.on('returnDetail',function(){
            this.showApproval = false;
        }.bind(this));
        eventHelper.on('openDetailInfo', function (val) {
            if (!!val) {
                this.init();
                this.infoArr = val;
            } else {
                this.init();
                this.setBtn = true;
            }
        }.bind(this));
        eventHelper.on('loadApproval',function(approvalList){
            this.showCheckList = true;
            this.checkList = approvalList;
        }.bind(this));
    },
    components: {
        'arcgis-plugin': arcgisPlugin,
        'approval':approval
    }
});
module.exports = comm;