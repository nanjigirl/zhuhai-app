var template = require('./content.html');
var eventHelper = require('utils/eventHelper');
var wysiwyg = require('gentelella/vendors/bootstrap-wysiwyg/js/bootstrap-wysiwyg.min');
var hotkeys = require('gentelella/vendors/jquery.hotkeys/jquery.hotkeys');
var prettify = require('gentelella/vendors/google-code-prettify/src/prettify');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm3.checkPass !== '') {
                    this.$refs.ruleForm3.validateField('checkPass');
                }
                callback();
            }
        };
        return {
            options1:['option1','option2','option3','option4','option5','option6'],
            options3: [{
                label: '热门城市',
                options: [{
                    value: 'Shanghai',
                    label: '上海'
                }, {
                    value: 'Beijing',
                    label: '北京'
                }]
            }, {
                label: '城市名',
                options: [{
                    value: 'Chengdu',
                    label: '成都'
                }, {
                    value: 'Shenzhen',
                    label: '深圳'
                }, {
                    value: 'Guangzhou',
                    label: '广州'
                }, {
                    value: 'Dalian',
                    label: '大连'
                }]
            }],
            ruleForm1: {
                name: '',
                sex:'',
                eMail:'',
                telphone:'',
                telphone1:'',
                defaultInput:'',
                disableInput:'',
                readonlyInput:'',
                date: ''
            },
            ruleForm2: {
                name: '',
                sex:'',
                eMail:'',
                date: '',
                address:'',
                speciality:[],
                detail:''
            },
            ruleForm3: {
                name: '',
                mixRadio:'Checked',
                mixCheckbox:[],
                eMail:'',
                switch: true,
                switch1: false,
                switch2: false,
                switch3:true,
                resource: '',
                detail: '',
                defaultInput:'',
                disableInput:'',
                readonlyInput:'',
                password:'',
                address:'',
                city:''
            },
            ruleForm4: {
                url:'',
                restaurant:'',
                select:''
            },
            ruleForm10: {
                name: '',
                sex:'',
                eMail:'',
                telphone:'',
                date:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                // password: [
                //     { validator: validatePass, trigger: 'blur' }
                // ],
                eMail: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                telphone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                ],
                telphone1: [
                    { required: true, message: '请输入紧急联系人联系方式', trigger: 'blur' },
                ],
                detail: [
                    { required: true, message: '请填写详细信息', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                speciality: [
                    { type: 'array', required: true, message: '请至少选择一个特长 ', trigger: 'change' }
                ],
                city: [
                    { required: true, message: '请选择地址', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请选择地址', trigger: 'change' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],

                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    mounted: function () {

        /* WYSIWYG EDITOR */

        function init_wysiwyg() {

            if( typeof ($.fn.wysiwyg) === 'undefined'){ return; }
            console.log('init_wysiwyg');

            function init_ToolbarBootstrapBindings() {
                var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                        'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                        'Times New Roman', 'Verdana'
                    ],
                    fontTarget = $('[title=Font]').siblings('.dropdown-menu');
                $.each(fonts, function(idx, fontName) {
                    fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
                });
                $('a[title]').tooltip({
                    container: 'body'
                });
                $('.dropdown-menu input').click(function() {
                    return false;
                })
                    .change(function() {
                        $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
                    })
                    .keydown('esc', function() {
                        this.value = '';
                        $(this).change();
                    });

                $('[data-role=magic-overlay]').each(function() {
                    var overlay = $(this),
                        target = $(overlay.data('target'));
                    overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
                });

                if ("onwebkitspeechchange" in document.createElement("input")) {
                    var editorOffset = $('#editor').offset();

                    $('.voiceBtn').css('position', 'absolute').offset({
                        top: editorOffset.top,
                        left: editorOffset.left + $('#editor').innerWidth() - 35
                    });
                } else {
                    $('.voiceBtn').hide();
                }
            }

            function showErrorAlert(reason, detail) {
                var msg = '';
                if (reason === 'unsupported-file-type') {
                    msg = "Unsupported format " + detail;
                } else {
                    console.log("error uploading file", reason, detail);
                }
                $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
            }

            $('.editor-wrapper').each(function(){
                var id = $(this).attr('id');	//editor-one

                $(this).wysiwyg({
                    toolbarSelector: '[data-target="#' + id + '"]',
                    fileUploadError: showErrorAlert
                });
            });


            window.prettyPrint;
            prettyPrint();

        };
        init_wysiwyg();
    },
    components: {}
});
module.exports = comm;