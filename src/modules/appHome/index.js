var template = require('./home.html');
var eventHelper = require('../../utils/eventHelper');
var caladenar = require('fullcalendar');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            fcEvents: [],
            showInput: false,
        }
    },
    methods: {},
    mounted: function () {


        var date = new Date(),
            d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear(),
            started,
            ended,
            categoryClass;
        console.log(1);
        var calendar = $('#calendar').fullCalendar({
            buttonText: {
                today: '今天',
                month: '月视图',
                week: '周视图',
                day: '日视图'
            },
            allDayText: "全天",
            weekMode: "variable",
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            selectHelper: true,
            select: function(start, end, allDay) {
                $('#fc_create').click();

                started = start;
                ended = end;

                $(".antosubmit").on("click", function() {
                    var title = $("#title").val();
                    if (end) {
                        ended = end;
                    }

                    categoryClass = $("#event_type").val();

                    if (title) {
                        calendar.fullCalendar('renderEvent', {
                                title: title,
                                start: started,
                                end: end,
                                allDay: allDay
                            },
                            true // make the event "stick"
                        );
                    }

                    $('#title').val('');

                    calendar.fullCalendar('unselect');

                    $('.antoclose').click();

                    return false;
                });
            },
            eventClick: function(calEvent, jsEvent, view) {
                $('#fc_edit').click();
                $('#title2').val(calEvent.title);

                categoryClass = $("#event_type").val();

                $(".antosubmit2").on("click", function() {
                    calEvent.title = $("#title2").val();

                    calendar.fullCalendar('updateEvent', calEvent);
                    $('.antoclose2').click();
                });

                calendar.fullCalendar('unselect');
            },
            editable: true,
            events: [{
                title: '儿童节',
                start: new Date(y, m, 1)
            }, {
                title: '华为比赛启动',
                start: new Date(y, m, d - 4),
                end: new Date(y, m, d+1)
            }, {
                title: '篮球比赛训练',
                start: new Date(y, m, d, 18, 30),
                allDay: false
            }, {
                title: '篮球比赛',
                start: new Date(y, m, d+1, 18, 30),
                allDay: false
            }, {
                title: '前端框架讨论',
                start: new Date(y, m, d+1, 10, 0),
                allDay: false,
                url: 'http://120.77.246.153:9000/admin-demo/production/'
            }]
        });
    },
    components: {
    }
});
module.exports = comm;