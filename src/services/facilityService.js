define(['./serviceHelper'], function (serviceHelper) {
    return {
        getAllFacilityType: function (cb) {
            $.get(serviceHelper.getPath('getAllFacilityType'), function (result) {
                console.log(result);
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });
        },
        getAllFacilities: function (cb) {
            var parameter = {
                id: 'getAllFacilities',
                parameter: {
                    pageNumber: 1,
                    pageSize: 100
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
        getDevicesByFacility: function (facility, cb) {
            var parameter = {
                id: 'getDevicesByFacility',
                parameter: {
                    facilityId: facility,
                    pageNumber: 1,
                    pageSize: 100
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
        getMonitorsByDevice: function (device, cb) {
            var parameter = {
                id: 'getMonitorsByDevice',
                parameter: {
                    deviceId: device,
                    pageNumber: 1,
                    pageSize: 100
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
        getDeviceDetailByFacility: function (facilityId, cb) {
            var param = {
                id: 'deviceDetail',
                parameter: {
                    facilityId: facilityId
                }
            };
            $.get(serviceHelper.getPath(param), function (result) {
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });

        },
        getItemFieldByItemTypeId: function (itemTypeId, itemId, cb) {
            var param = {
                id: 'getItemFieldByItemTypeId',
                parameter: {
                    itemTypeId: itemTypeId,
                    itemId: itemId
                }
            };
            $.get(serviceHelper.getPath(param), function (result) {
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });

        },
        getMonitorDetailByDevice: function (itemId, cb) {
            var param = {
                id: 'getMonitorDetailByDevice',
                parameter: {
                    id: itemId
                }
            };
            $.get(serviceHelper.getPath(param), function (result) {
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });

        },
        saveMonitor: function (monitor, cb) {
            var url = serviceHelper.getPath('saveMonitor');
            $.ajax({
                type: 'post', dataType: 'json', url: url, data: monitor, success: function (result) {
                    if (result) {
                        if (!!result.success) {
                            cb(result.data);

                        }
                    }
                }
            })
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
                    console.log('get data getFacilityByType');
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
        },
        getDeviceList: function (cb) {
            var parameter = {
                id: 'getDeviceList',
                parameter: {
                    pageNumber: 1,
                    pageSize: 50
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                console.log(result);
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });
        },
        getDeviceInfo: function (iotDeviceId, cb) {
            var parameter = {
                id: 'getDeviceInfo',
                parameter: {
                    iotDeviceId: iotDeviceId
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                console.log(result);
                if (!!result.success) {
                    cb(result.data);
                    return;
                }
                console.log('Error:', result);
            });
        }
    }

});