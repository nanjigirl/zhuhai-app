var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var echarts = require('echarts');
var sparkline = require('gentelella/vendors/jquery-sparkline/dist/jquery.sparkline.min');
var easypiechart = require('gentelella/vendors/jquery.easy-pie-chart/dist/jquery.easypiechart.min');
var progressbar = require('gentelella/vendors/bootstrap-progressbar/bootstrap-progressbar.min');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            userImgSrc:'img/widget/user.png'
        }
    },
    methods: {

    },
    mounted: function () {
        // Progressbar
        if ($(".progress .progress-bar")[0]) {
            $('.progress .progress-bar').progressbar();
        }
        function init_sparklines() {
                if (typeof (jQuery.fn.sparkline) === 'undefined') {
                    return;
                }
                console.log('init_sparklines');
                $(".sparkline_two").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
                    type: 'bar',
                    height: '40',
                    barWidth: 9,
                    colorMap: {
                        '7': '#a1a1a1'
                    },
                    barSpacing: 2,
                    barColor: '#26B99A'
                });
                $(".sparkline_three").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
                    type: 'line',
                    width: '200',
                    height: '40',
                    lineColor: '#26B99A',
                    fillColor: 'rgba(223, 223, 223, 0.57)',
                    lineWidth: 2,
                    spotColor: '#26B99A',
                    minSpotColor: '#26B99A'
                });

            }

            //init charts
        function init_charts() {

            console.log('run_charts  typeof [' + typeof (Chart) + ']');

            if (typeof (Chart) === 'undefined') {
                return;
            }

            console.log('init_charts');
            Chart.defaults.global.legend = {
                enabled: false
            };
            if ($('#canvas_line').length ){

                var canvas_line_00 = new Chart(document.getElementById("canvas_line"), {
                    type: 'line',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: "rgba(38, 185, 154, 0.31)",
                            borderColor: "rgba(38, 185, 154, 0.7)",
                            pointBorderColor: "rgba(38, 185, 154, 0.7)",
                            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointBorderWidth: 1,
                            data: [31, 74, 6, 39, 20, 85, 7]
                        }, {
                            label: "My Second dataset",
                            backgroundColor: "rgba(3, 88, 106, 0.3)",
                            borderColor: "rgba(3, 88, 106, 0.70)",
                            pointBorderColor: "rgba(3, 88, 106, 0.70)",
                            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(151,187,205,1)",
                            pointBorderWidth: 1,
                            data: [82, 23, 66, 9, 99, 4, 2]
                        }]
                    },
                });

            }
            if ($('#canvas_line1').length ){

                var canvas_line_01 = new Chart(document.getElementById("canvas_line1"), {
                    type: 'line',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: "rgba(38, 185, 154, 0.31)",
                            borderColor: "rgba(38, 185, 154, 0.7)",
                            pointBorderColor: "rgba(38, 185, 154, 0.7)",
                            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointBorderWidth: 1,
                            data: [31, 74, 6, 39, 20, 85, 7]
                        }, {
                            label: "My Second dataset",
                            backgroundColor: "rgba(3, 88, 106, 0.3)",
                            borderColor: "rgba(3, 88, 106, 0.70)",
                            pointBorderColor: "rgba(3, 88, 106, 0.70)",
                            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(151,187,205,1)",
                            pointBorderWidth: 1,
                            data: [82, 23, 66, 9, 99, 4, 2]
                        }]
                    },
                });

            }

            if ($('#canvas_line2').length ){
                var canvas_line_02 = new Chart(document.getElementById("canvas_line2"), {
                    type: 'line',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: "rgba(38, 185, 154, 0.31)",
                            borderColor: "rgba(38, 185, 154, 0.7)",
                            pointBorderColor: "rgba(38, 185, 154, 0.7)",
                            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointBorderWidth: 1,
                            data: [31, 74, 6, 39, 20, 85, 7]
                        }, {
                            label: "My Second dataset",
                            backgroundColor: "rgba(3, 88, 106, 0.3)",
                            borderColor: "rgba(3, 88, 106, 0.70)",
                            pointBorderColor: "rgba(3, 88, 106, 0.70)",
                            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(151,187,205,1)",
                            pointBorderWidth: 1,
                            data: [82, 23, 66, 9, 99, 4, 2]
                        }]
                    },
                });
            }

            if ($('#canvas_line3').length ){

                var canvas_line_03 = new Chart(document.getElementById("canvas_line3"), {
                    type: 'line',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: "rgba(38, 185, 154, 0.31)",
                            borderColor: "rgba(38, 185, 154, 0.7)",
                            pointBorderColor: "rgba(38, 185, 154, 0.7)",
                            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointBorderWidth: 1,
                            data: [31, 74, 6, 39, 20, 85, 7]
                        }, {
                            label: "My Second dataset",
                            backgroundColor: "rgba(3, 88, 106, 0.3)",
                            borderColor: "rgba(3, 88, 106, 0.70)",
                            pointBorderColor: "rgba(3, 88, 106, 0.70)",
                            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(151,187,205,1)",
                            pointBorderWidth: 1,
                            data: [82, 23, 66, 9, 99, 4, 2]
                        }]
                    },
                });

            }


            if ($('#canvas_line4').length ){

                var canvas_line_04 = new Chart(document.getElementById("canvas_line4"), {
                    type: 'line',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: "rgba(38, 185, 154, 0.31)",
                            borderColor: "rgba(38, 185, 154, 0.7)",
                            pointBorderColor: "rgba(38, 185, 154, 0.7)",
                            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointBorderWidth: 1,
                            data: [31, 74, 6, 39, 20, 85, 7]
                        }, {
                            label: "My Second dataset",
                            backgroundColor: "rgba(3, 88, 106, 0.3)",
                            borderColor: "rgba(3, 88, 106, 0.70)",
                            pointBorderColor: "rgba(3, 88, 106, 0.70)",
                            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(151,187,205,1)",
                            pointBorderWidth: 1,
                            data: [82, 23, 66, 9, 99, 4, 2]
                        }]
                    },
                });

            }
        }
        //init easychart
        function init_EasyPieChart() {
            if (typeof ($.fn.easyPieChart) === 'undefined') {
                return;
            }
            console.log('init_EasyPieChart');

            $('.chart').easyPieChart({
                easing: 'easeOutElastic',
                delay: 3000,
                barColor: '#26B99A',
                trackColor: '#fff',
                scaleColor: false,
                lineWidth: 20,
                trackWidth: 16,
                lineCap: 'butt',
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
            // var chart = window.chart = $('.chart').data('easyPieChart');
            // $('.js_update').on('click', function () {
            //     chart.update(Math.random() * 200 - 100);
            // });
        }
        init_sparklines();
        init_charts();
        init_EasyPieChart();
    },
    components: {}
});
module.exports = comm;