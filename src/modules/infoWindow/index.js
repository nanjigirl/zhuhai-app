var template = require('./infoWindow.html');
var eventHelper = require('utils/eventHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            infoBoxes: [],
            fcEvents: [],
            showInput: false,
            isHidden: false,
        }
    },
    methods: {
        relocate: function () {
            for (var i = 0; i < this.infoBoxes.length; i++) {
                var screenPoint = this.map.pointToPixel(this.infoBoxes[i]);

                var boxID = '#infoBox-' + i;
                console.log(boxID, screenPoint);
                $(boxID).css('top', screenPoint.y - 16);
                $(boxID).css('left', screenPoint.x - 99);
            }
        },
        highLight: function (infoID) {
            $('#' + infoID).css('z-index', 9999);
        },
        normalize: function (infoID) {
            $('#' + infoID).css('z-index', 1);
        }
    },
    mounted: function () {
        /* y:-85
         x:-106*/
        this.map = {};
        eventHelper.on('mapCreated', function (map) {
            this.map = map;
            this.map.addEventListener('zoomstart', function () {
                this.isHidden = true;
            }.bind(this));
            this.map.addEventListener('zoomend', function () {
                setTimeout(function () {
                    this.relocate();
                    this.isHidden = false;
                }.bind(this), 10);
            }.bind(this));
            this.map.addEventListener('dragging', function () {
                this.isHidden = true;
            }.bind(this));
            this.map.addEventListener('dragend', function () {
                setTimeout(function () {
                    this.relocate();
                    this.isHidden = false;
                }.bind(this), 10);
            }.bind(this));
        }.bind(this));

        eventHelper.on('alert-point', function (points, isReplace) {
            if (!!isReplace) {
                this.infoBoxes = points;
            }
            else {
                var testStr = JSON.stringify(this.infoBoxes);
                points.forEach(function (point) {
                    if (testStr.indexOf((point.lng + '')) > 0 && testStr.indexOf((point.lat + '')) > 0) {
                        this.infoBoxes.forEach(function (addedPoint) {
                            if (addedPoint.lng == point.lng) {
                                addedPoint.items = point.items;
                            }
                        })

                    } else {
                        this.infoBoxes.push(point);
                    }
                }.bind(this));
            }
            this.$nextTick(function () {
                this.relocate();
            }.bind(this));
        }.bind(this));
        eventHelper.on('alert-point-close', function (point) {
            if (!point) {
                this.infoBoxes = [];
            }
            else {
                for (var i = 0; i < this.infoBoxes.length; i++) {
                    var item = this.infoBoxes[i];
                    if (item.lat == point.lat && item.lng == point.lng) {
                        this.infoBoxes.splice(i, 1);
                    }
                }
            }
        }.bind(this));

    },
    components: {}
});
module.exports = comm;