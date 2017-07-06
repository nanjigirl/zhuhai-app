var Vue = require('vue');
var template = require('./flexMapLegend.html');
var eventHelper = require('utils/eventHelper');
var facilityController = require('controllers/facilityController');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            isActive: false,
            isOpen: false,
            isHorizontal: false,
            isShowSubLegend: false,
            legendList: [/*{
             title: '工地视频',
             facilityTypeName: "BD",
             icon: 'buliding-video',
             id: '',
             showIcon: false,
             showSub: false,
             facilitys: [
             {
             "name": "火炉山雨量站",
             "icon": "",
             "checked": true,
             "x": 113.38227299438478,
             "y": 23.187853103205285,
             "id": 35
             },
             {
             "name": "天远路雨量站",
             "icon": "",
             "checked": true,
             "x": 113.3755782006836,
             "y": 23.12227845720919,
             "id": 40
             },
             {
             "name": "新村北路雨量站",
             "icon": "",
             "checked": true,
             "x": 113.403984,
             "y": 23.170845,
             "id": 41
             },
             {
             "name": "钟楼村雨量站",
             "icon": "",
             "checked": true,
             "x": 113.43,
             "y": 23.006845,
             "id": 42
             },
             {
             "name": "新田村委雨量站",
             "icon": "",
             "checked": true,
             "x": 113.4960844873047,
             "y": 23.047262435480675,
             "id": 43
             },
             {
             "name": "七星水库雨量站",
             "icon": "",
             "checked": true,
             "x": 113.133984,
             "y": 23.076845,
             "id": 44
             },
             {
             "name": "东沙街雨量站",
             "icon": "",
             "checked": true,
             "x": 113.33984,
             "y": 23.076845,
             "id": 45
             },
             {
             "name": "大夫田村雨量站",
             "icon": "",
             "checked": true,
             "x": 113.31984,
             "y": 23.04,
             "id": 46
             },
             {
             "name": "城郊小学雨量站",
             "icon": "",
             "checked": true,
             "x": 113.833984,
             "y": 23.176845,
             "id": 47
             }
             ]
             }, {
             title: '道路路面视频',
             facilityTypeName: "RD",
             icon: 'road-video',
             id: '',
             showIcon: true,
             showSub: false,
             "facilitys": [
             {
             "name": "思成河道",
             "icon": "",
             "checked": true,
             "x": 113.3477690576172,
             "y": 23.1803,
             "id": 37
             },
             {
             "name": "珠江河道",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.0803,
             "id": 60,
             type: 'warn'
             },
             {
             "name": "车陂河道",
             "icon": "",
             "checked": true,
             "x": 113.34124592529297,
             "y": 23.11146379046114,
             "id": 61
             },
             {
             "name": "开发大道河道",
             "icon": "",
             "checked": true,
             "x": 113.12536,
             "y": 23.2803,
             "id": 62,
             type: 'warn'
             },
             {
             "name": "猎德河道",
             "icon": "",
             "checked": true,
             "x": 113.12536,
             "y": 23.1803,
             "id": 63
             },
             {
             "name": "童心路河道",
             "icon": "",
             "checked": true,
             "x": 113.5536,
             "y": 23.1803,
             "id": 64,
             type: 'warn'
             },
             {
             "name": "天源路",
             "icon": "",
             "checked": true,
             "x": 113.46758869873047,
             "y": 23.085199599787313,
             "id": 65,
             type: 'warn'
             }
             ]
             }, {
             title: '采石场视频',
             facilityTypeName: "SP",
             icon: 'stonePit-video',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }, {
             title: '消纳场视频',
             facilityTypeName: "CP",
             icon: 'consumptive',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }, {
             title: '混凝土场视频',
             facilityTypeName: "JT",
             icon: 'jetereting-video',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }, {
             title: '巡查人员',
             facilityTypeName: "PO",
             icon: 'people',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }, {
             title: '车辆',
             facilityTypeName: "CAR",
             icon: 'car',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }, {
             title: '投诉点',
             facilityTypeName: "RP",
             icon: 'reportPoint',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }, {
             title: '卡口监控',
             facilityTypeName: "KK",
             icon: 'bayonet',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }, {
             title: '联合执法点',
             facilityTypeName: "EF",
             icon: 'enfroce-video',
             id: '',
             showIcon: true,
             showSub: false,
             facilitys: [
             {
             "name": "岭南窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.176147,
             "id": 36
             },
             {
             "name": "天寿路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.116147,
             "id": 50,
             type: 'warn'
             },
             {
             "name": "员村窨井",
             "icon": "",
             "checked": true,
             "x": 113.43325642333986,
             "y": 23.13755631975802,
             "id": 51
             },
             {
             "name": "民主直街窨井",
             "icon": "",
             "checked": true,
             "x": 113.92536,
             "y": 23.116147,
             "id": 52
             },
             {
             "name": "茅岗窨井",
             "icon": "",
             "checked": true,
             "x": 113.6,
             "y": 23.116147,
             "id": 53
             },
             {
             "name": "开发大道窨井",
             "icon": "",
             "checked": true,
             "x": 113.21,
             "y": 23.116147,
             "id": 54
             },
             {
             "name": "建阳路窨井",
             "icon": "",
             "checked": true,
             "x": 113.42536,
             "y": 23.78,
             "id": 55
             },
             {
             "name": "大南路窨井",
             "icon": "",
             "checked": true,
             "x": 113.29489735351564,
             "y": 23.128629928156457,
             "id": 56
             },
             {
             "name": "江燕路窨井",
             "icon": "",
             "checked": true,
             "x": 113.26468495117189,
             "y": 23.185621505304894,
             "id": 57
             }
             ]
             }*/]
        }
    },
    mounted: function () {

    },
    methods: {
        init: function (list) {
            list.forEach(function (type) {
                this.legendList.push({
                    title: type.nameCn,
                    facilityTypeName: type.name,
                    icon: type.icon,
                    id: type.id,
                    showIcon: false,
                    showSub: false
                });
            }.bind(this));
        },
        openMapLegend: function () {
            this.isActive = !this.isActive;
            this.isOpen = !this.isOpen;
            this.isShowSubLegend = false;
        },
        changeDirection: function () {
            this.isHorizontal = !this.isHorizontal;
        },
        showSubLegend: function (index, list) {
            // this.$emit('openMapLegend',)
            list.showIcon = !list.showIcon;
            this.$parent.$emit('openMapLegend',list);
        },
        showSub: function (index) {
            if (index + 1) {
                this.isShowSubLegend = true;
                this.legendList[index].showSub = true;
                for (var i = 0; i < this.legendList.length; i++) {
                    if (i != index) {
                        this.legendList[i].showSub = false;
                    }
                }
            } else {
                this.isShowSubLegend = false;
            }
        }
    },
    components: {}
});
module.exports = comm;