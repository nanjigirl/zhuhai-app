var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
// var echarts = require('echarts');
// var sparkline = require('gentelella/vendors/jquery-sparkline/dist/jquery.sparkline.min');
// var jqvmap = require('gentelella/vendors/jqvmap/dist/jquery.vmap');
// var world = require('gentelella/vendors/jqvmap/dist/maps/jquery.vmap.world');
// var usa = require('gentelella/vendors/jqvmap/dist/maps/jquery.vmap.usa');
// var sampledata = require('gentelella/vendors/jqvmap/examples/js/jquery.vmap.sampledata');
// var easypiechart = require('gentelella/vendors/jquery.easy-pie-chart/dist/jquery.easypiechart.min');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {

        }
    },
    methods: {

},
    mounted: function () {
        // function init_JQVmap(){
        //
        //     //console.log('check init_JQVmap [' + typeof (VectorCanvas) + '][' + typeof (jQuery.fn.vectorMap) + ']' );
        //
        //     if(typeof (jQuery.fn.vectorMap) === 'undefined'){ return; }
        //
        //     console.log('init_JQVmap');
        //
        //     if ($('#world-map-gdp').length ){
        //
        //         $('#world-map-gdp').vectorMap({
        //             map: 'world_en',
        //             backgroundColor: null,
        //             color: '#ffffff',
        //             hoverOpacity: 0.7,
        //             selectedColor: '#666666',
        //             enableZoom: true,
        //             showTooltip: true,
        //             values: sampledata,
        //             scaleColors: ['#E6F2F0', '#149B7E'],
        //             normalizeFunction: 'polynomial'
        //         });
        //
        //     }
        //
        //     if ($('#usa_map').length ){
        //
        //         $('#usa_map').vectorMap({
        //             map: 'usa_en',
        //             backgroundColor: null,
        //             color: '#ffffff',
        //             hoverOpacity: 0.7,
        //             selectedColor: '#666666',
        //             enableZoom: true,
        //             showTooltip: true,
        //             values: sampledata,
        //             scaleColors: ['#E6F2F0', '#149B7E'],
        //             normalizeFunction: 'polynomial'
        //         });
        //
        //     }
        //
        // };
        // /* SPARKLINES */
        //
        // function init_sparklines() {
        //
        //     if(typeof (jQuery.fn.sparkline) === 'undefined'){ return; }
        //     console.log('init_sparklines');
        //
        //
        //     $(".sparkline_one").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
        //         type: 'bar',
        //         height: '125',
        //         barWidth: 13,
        //         colorMap: {
        //             '7': '#a1a1a1'
        //         },
        //         barSpacing: 2,
        //         barColor: '#26B99A'
        //     });
        //
        //
        //     $(".sparkline_two").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
        //         type: 'bar',
        //         height: '40',
        //         barWidth: 9,
        //         colorMap: {
        //             '7': '#a1a1a1'
        //         },
        //         barSpacing: 2,
        //         barColor: '#26B99A'
        //     });
        //
        //
        //     $(".sparkline_three").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
        //         type: 'line',
        //         width: '200',
        //         height: '40',
        //         lineColor: '#26B99A',
        //         fillColor: 'rgba(223, 223, 223, 0.57)',
        //         lineWidth: 2,
        //         spotColor: '#26B99A',
        //         minSpotColor: '#26B99A'
        //     });
        //
        //
        //     $(".sparkline11").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3], {
        //         type: 'bar',
        //         height: '40',
        //         barWidth: 8,
        //         colorMap: {
        //             '7': '#a1a1a1'
        //         },
        //         barSpacing: 2,
        //         barColor: '#26B99A'
        //     });
        //
        //
        //     $(".sparkline22").sparkline([2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6], {
        //         type: 'line',
        //         height: '40',
        //         width: '200',
        //         lineColor: '#26B99A',
        //         fillColor: '#ffffff',
        //         lineWidth: 3,
        //         spotColor: '#34495E',
        //         minSpotColor: '#34495E'
        //     });
        //
        //
        //     $(".sparkline_bar").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
        //         type: 'bar',
        //         colorMap: {
        //             '7': '#a1a1a1'
        //         },
        //         barColor: '#26B99A'
        //     });
        //
        //
        //     $(".sparkline_area").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        //         type: 'line',
        //         lineColor: '#26B99A',
        //         fillColor: '#26B99A',
        //         spotColor: '#4578a0',
        //         minSpotColor: '#728fb2',
        //         maxSpotColor: '#6d93c4',
        //         highlightSpotColor: '#ef5179',
        //         highlightLineColor: '#8ba8bf',
        //         spotRadius: 2.5,
        //         width: 85
        //     });
        //
        //
        //     $(".sparkline_line").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
        //         type: 'line',
        //         lineColor: '#26B99A',
        //         fillColor: '#ffffff',
        //         width: 85,
        //         spotColor: '#34495E',
        //         minSpotColor: '#34495E'
        //     });
        //
        //
        //     $(".sparkline_pie").sparkline([1, 1, 2, 1], {
        //         type: 'pie',
        //         sliceColors: ['#26B99A', '#ccc', '#75BCDD', '#D66DE2']
        //     });
        //
        //
        //     $(".sparkline_discreet").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 2, 4, 3, 7, 8, 9, 7, 6, 4, 3], {
        //         type: 'discrete',
        //         barWidth: 3,
        //         lineColor: '#26B99A',
        //         width: '85',
        //     });
        //
        //
        // };
        // /* EASYPIECHART */
        //
        // function init_EasyPieChart() {
        //
        //     if( typeof ($.fn.easyPieChart) === 'undefined'){ return; }
        //     console.log('init_EasyPieChart');
        //
        //     $('.chart').easyPieChart({
        //         easing: 'easeOutElastic',
        //         delay: 3000,
        //         barColor: '#26B99A',
        //         trackColor: '#fff',
        //         scaleColor: false,
        //         lineWidth: 20,
        //         trackWidth: 16,
        //         lineCap: 'butt',
        //         onStep: function(from, to, percent) {
        //             $(this.el).find('.percent').text(Math.round(percent));
        //         }
        //     });
        //     var chart = window.chart = $('.chart').data('easyPieChart');
        //     $('.js_update').on('click', function() {
        //         chart.update(Math.random() * 200 - 100);
        //     });
        // };
        // init_JQVmap();
        // init_sparklines();
        // init_EasyPieChart();
    },
    components: {}
});
module.exports = comm;