define([
    './model/facilityModel',
    'services/facilityService',
    'services/historySearchServices',
    'utils/maps/mapHelper'], function (facilityModel, facilityService, historySearchServices, mapHelper) {
    return {
        getAllFacility: function (cb) {
            facilityService.getAllFacility(function (data) {
                cb(data);
            });

        },
        getFacilityByType: function (facilityType, cb) {
            facilityService.getFacilityByType(facilityType, function (data) {
                cb(data);
            });
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
        traceCarHistory: function ( terminalNum, dateStart, dateEnd, pageNumber,resultArr) {
            historySearchServices.getCarHistoryData(terminalNum, dateStart, dateEnd, pageNumber, function (data) {
                resultArr.push(...data);
            }.bind(this));
        }
    }
});