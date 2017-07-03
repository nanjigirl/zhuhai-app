var template = require('./reservoirHistory.html');
var echarts = require('echarts');
var reservoirController = require('controllers/reservoirController');
var eventHelper = require('utils/eventHelper');
var ifExist = function (obj, value) {
    return obj.indexOf(value) !== -1;
}
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            message: ''
        }
    },
    methods: {
        init: function (devices) {
            var monitors = devices.items;
            var monitorIds = [];
            var monitorNames = [];
            monitors.forEach(function (monitor) {
                monitorIds.push(monitor.itemID);
                monitorNames.push(monitor.name);
            });
            var myChart1 = echarts.init($(".reservoir-history-chart")[0]);//xiao
            reservoirController.initReservoirDetail(monitorNames, monitorIds, function (result) {
                myChart1.setOption(result.option);
                var myChart2 = echarts.init($(".reservoir-history-chart")[1]);//da
                reservoirController.initReservoirSummary(monitorNames, monitorIds, function (result) {
                    myChart2.setOption(result.option);
                    var currentThread = {};
                    eventHelper.on('waterGrade-detail', function (parm) {
                        /*{name: '高锰酸盐指数', max: 6},0
                         {name: '总磷', max: 6},1
                         {name: '溶解氧', max: 6},2
                         {name: '化学需氧量', max: 6},3
                         {name: '五日生化需氧量', max: 6},4
                         {name: 'PH值', max: 6},5
                         {name: '氨氮', max: 6},6
                         {name: '水温', max: 6} 7
                         */
                        if(!!currentThread){
                            clearTimeout(currentThread);
                        }
                        currentThread= setTimeout(function () {
                            console.log('run');
                           var newValue = [0, 0, 0, 0, 0, 0, 0, 0];
                           parm.forEach(function (waterGrade) {
                               for (var key in waterGrade) {
                                   var value = reservoirController.transferGrade(waterGrade[key]);
                                   if (ifExist(key, 'fiveDayOxygenDemand')) {
                                       newValue[4] = value;
                                   }else if(ifExist(key, 'dissolvedOxygen')) {
                                       newValue[2] = value;
                                   }else if(ifExist(key, 'permanganateIndex')) {
                                       newValue[0] = value;
                                   }else if(ifExist(key, 'chemicalOxygenDemand')) {
                                       newValue[3] = value;
                                   }else if(ifExist(key, 'ammoniaNitrogen')) {
                                       newValue[6] = value;
                                   }else if(ifExist(key, 'totalPhosphorus')) {
                                       newValue[1] = value;
                                   }else if(ifExist(key, 'waterTemperature')) {
                                       newValue[7] = value;
                                   }else if(ifExist(key, 'ph')) {
                                       newValue[5] = value;
                                   }
                               }
                           });
                           result.option.series[1].data[0].value = newValue;
                           myChart2.setOption(result.option);
                       },500);
                    });
                    eventHelper.emit('isLoading');

                })
            });
        }
    },
    mounted: function () {

    }
});
module.exports = comm;