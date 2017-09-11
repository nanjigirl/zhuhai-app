define([
    './model/facilityModel',
    'services/facilityService',
    'services/historySearchServices',
    'utils/mapHelper'], function (facilityModel, facilityService, historySearchServices, mapHelper) {
    return {
        getAllFacilityType: function (cb) {
            facilityService.getAllFacilityType(function (data) {
                cb(data);
            });

        },
        getFacilityByType: function (facilityType, cb) {
            facilityService.getFacilityByType(facilityType, function (data) {
                cb(data);
            });
        }, getDevicesByFacility: function (facilityId, cb) {
            facilityService.getDevicesByFacility(facilityId, function (data) {
                cb(data);
            });
        },
        getMonitorDetailByDevice: function (itemID, cb) {
            facilityService.getMonitorDetailByDevice(itemID, function (data) {
                cb(data);
            });
        }, getMonitorsByDevice: function (deviceId, cb) {
            facilityService.getMonitorsByDevice(deviceId, function (data) {
                cb(data);
            });
        },
        saveMonitor: function (monitor, cb) {
            facilityService.saveMonitor(monitor, function (data) {
                cb(data);
            });
        },
        getItemFieldByItemTypeId: function (itemTypeId, itemId, cb) {
            facilityService.getItemFieldByItemTypeId(itemTypeId, itemId, function (data) {
                cb(data);
            });
        },
        getAllFacilities: function (cb) {
            facilityService.getAllFacilities(function (data) {
                cb(data.records);
            })
        },
        getFacilityDetail: function (facilityID, cb) {
            facilityService.getFacilityDetail(facilityID, function (data) {
                cb(data);
            });
        },
        getAlarmInfoByFacility: function (facilityId, cb) {
            facilityService.getAlarmInfoByFacility(facilityId, function (data) {
                cb(data);
            })
        },
        getDeviceDetailByFacility: function (facilityId, cb) {
            facilityService.getDeviceDetailByFacility(facilityId, function (data) {
                cb(data);
            });
        },
        getDeviceList: function (cb) {
            facilityService.getDeviceList(function (data) {
                cb(data);
            });
        },
        getDeviceInfo: function (deviceID, cb) {
            facilityService.getDeviceInfo(deviceID, function (data) {
                cb(data);
            });
        },
        traceCarHistory: function (terminalNum, dateStart, dateEnd, pageNumber, resultArr) {
            console.log('start');
            historySearchServices.getCarHistoryData(terminalNum, dateStart, dateEnd, pageNumber, function (data) {
                console.log('done');
                resultArr.push(...data);
            }.bind(this));
        }
    }
});