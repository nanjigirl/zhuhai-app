var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var moment = require('moment');
var daterangepicker = require('daterangepicker');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: 'Vue Module Seed',
            checked:''
        }
    },
    methods: {
        openDatePicker:function(){
            $("#single_cal2").daterangepicker({
                singleDatePicker: true,
                calender_style: "picker_2"
            }, function(start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });
        },
        changeStatus:function(n){
            this.checked = n;
        }
    },
    mounted: function () {
        // initialize the validator function
        validator.message.date = 'not a real date';

        // validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':
        $('form')
            .on('blur', 'input[required], input.optional, select.required', validator.checkField)
            .on('change', 'select.required', validator.checkField);

        $('.multi.required').on('keyup blur', 'input', function() {
            validator.checkField.apply($(this).siblings().last()[0]);
        });

        $('form').submit(function(e) {
            e.preventDefault();
            var submit = true;

            // evaluate the form using generic validaing
            if (!validator.checkAll($(this))) {
                submit = false;
            }

            if (submit)
                this.submit();

            return false;
        });
    },
    components: {}
});
module.exports = comm;