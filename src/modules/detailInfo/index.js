var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var serviceHelper = require('services/serviceHelper');
//加载地图组件
var arcgisPlugin = require('modules/arcgisPlugin');
var mapHelper = require('utils/mapHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            reportQuestion:'./img/icon/icon-cloud.png',
            delOperation:false,
            uploadImgs:[

            ],
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
            reqMsg: '',
            setBtn: false,
            dialogImageUrl: '',
            dialogVisible: false,
            questionTitle: '',
            isLocated: false
        }
    },
    methods: {
        saveQuestion:function(){
           this.$toast({
               message:'保存成功！！'
           });
        },
        uploadQuestion:function () {
            this.$toast({
                message:'提交成功！！'
            });
            eventHelper.emit('openSub');
            eventHelper.emit('closeUploadBtn');
        },
        init: function () {
            this.isLocated = false;
            this.questionTitle = '';
            this.setBtn = false;
        },
        returnMain: function () {
            eventHelper.emit('returnBack');
            eventHelper.emit('change-menu','new-question');
        },
        addNewItem: function () {
            eventHelper.emit('setNormalQues', this.questionTitle);
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
            this.isLocated = !this.isLocated;
        },
        openRecord: function () {
            var self = this;
            this.$toast({
                message: '正在识别语音',
                position: 'middle',
                duration: 1000
            });
            cordova.plugins.TransformVoiceToText.transform("aaa", function (msg) {
                self.reqMsg = self.reqMsg + msg;
            }, function (err) {
                self.reqMsg = self.reqMsg + err;
            });
        }
    },
    mounted: function () {
        eventHelper.on('openDetailInfo', function (title) {
            if (!!title) {
                this.init();
                this.questionTitle = title;
            } else {
                this.init();
                this.setBtn = true;
            }
        }.bind(this));
        this.map = mapHelper.getArcGISTiledMap('locateMap', 'http://10.194.148.18:6080/arcgis/rest/services/guangzhoumap_gz/MapServer');
        this.map.on('load', function () {
            mapHelper.addPoint(this.map, 39366.73260040782, 29446.950962383147, 'img/dirtyPipe.png', {facilityType: 'CP'});
        }.bind(this));
    },
    components: {
        'arcgis-plugin': arcgisPlugin
    }
});
module.exports = comm;