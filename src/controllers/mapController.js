define(['services/mapService', 'utils/eventHelper'], function (mapService, eventHelper) {
    return {
        formatLocation: function (x, y, cb) {
            mapService.formatLocation(x, y, function (data) {
                cb(data.x, data.y);
            });
        }

    }

});
