define(['./serviceHelper', './mock/mock'], function (serviceHelper, mock) {
    return {
        getAllFacility: function (cb) {
            $.get(serviceHelper.getPath('facilityList'), function (result) {
                console.log(result);
                if (!!result.success) {
                    cb(result.data);
                    console.log('get data');
                    return;
                }
                console.log('Error:', result);
            });
        },
        getFacilityByType: function (facilityType, cb) {
            var parameter = {
                id: 'getFacilityByType',
                parameter: {
                    facilityType: facilityType
                }
            }
            $.get(serviceHelper.getPath(parameter), function (result) {
                console.log(result);
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });
        },
        getFacilityDetail: function (facilityId, cb) {
            var parameter = {
                id: 'getFacilityDetail',
                parameter: {
                    facilityId: facilityId
                }
            }
            $.get(serviceHelper.getPath(parameter), function (result) {
                console.log(result);
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });
        },
        getAlarmInfoByFacility: function (facilityId, cb, errorcb) {
            setTimeout(function () {
                cb([]);
            }, 1000);
        }
    }

});