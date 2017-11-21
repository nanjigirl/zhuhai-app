var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            uploadCheck:'',
            showType:false,
            showDateExpand:false,
            draftList:[
                {
                    month:'09/02',
                    year:'2017',
                    content:[
                        {
                            img:'./img/factoryImg/deviceImg-sg.png',
                            title:'栅格前后液位差异常',
                            deviceName:'2#细栅格',
                            inspectorTime:'2017-11-16 12:22:22'
                        },{
                            img:'./img/factoryImg/deviceImg-pzk.png',
                            title:'排渣口异常',
                            deviceName:'2#细栅格',
                            inspectorTime:'2017-11-16 12:20:15'
                        }
                    ]
                },
                {
                    month:'08/31',
                    year:'2017',
                    content:[
                        {
                            img:'./img/factoryImg/deviceImg-sg.png',
                            title:'栅格前后液位差异常',
                            deviceName:'2#细栅格',
                            inspectorTime:'2017-11-16 14:35:56'
                        },{
                            img:'./img/factoryImg/deviceImg-pzk.png',
                            title:'排渣口异常',
                            deviceName:'2#细栅格',
                            inspectorTime:'2017-11-16 12:20:15'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        returnHome:function(){
            eventHelper.emit('change-menu','user');
        },
        expandDate:function(){
            this.showDateExpand = !this.showDateExpand;
        }
    },
    mounted: function () {

    },
    components: {

    }
});
module.exports = comm;