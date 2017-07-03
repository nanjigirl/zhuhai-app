define(function () {
    var facilityType = {
        27: '排水管道水情站',
        28: '易涝水情站'
    }

    return {
        getFacilityType: function (typeID) {
            return facilityType[typeID];
        }
    }
});