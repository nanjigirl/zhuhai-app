var template = require('./pumpStationBar.html');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            pumpStations: [],
            gateStations: [],
            showPumpStation: true,
            showStationDetail: false,
            showPumpStationDetail: true,
            currentStatus: {}
        }
    },
    mounted: function () {
        this.$on('init-pump-station-bar', function (_, devices, facility) {
            devices.forEach(function (device) {
                var newStation = {
                    stationName: device.name,
                    gateId: device.gateId,
                    stationStatus: 2
                };
                var monitorItems = device.items;
                monitorItems.forEach(function (monitor) {
                    if (monitor.itemTypeName == "RunningState" || monitor.itemTypeName.endsWith('controlState')) {
                        newStation.stationStatusID = monitor.itemID;
                    }
                });
                    this.pumpStations.push(newStation);
            }.bind(this));
        }.bind(this));
        this.$on('update-pump-station-bar', function (result) {
            result.forEach(function (realTimeValue) {
                this.pumpStations.forEach(function (pump) {
                    if (pump.stationStatusID === realTimeValue.itemId) {
                        pump.stationStatus = realTimeValue.dValue;
                    }
                });
                this.gateStations.forEach(function (gate) {
                    if (gate.stationStatusID === realTimeValue.itemId) {
                        gate.stationStatus = realTimeValue.dValue;
                    }
                });
            }.bind(this));
        }.bind(this));
    },
    methods: {
        showDetail: function () {

        },
        changeToPumpStation: function () {
            this.showPumpStation = true;
        },
        changeToLockStation: function () {
            this.showPumpStation = false;
        }
    }
});
module.exports = comm;