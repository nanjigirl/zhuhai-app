var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');


// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            title:'',
            content:'',
            date:'',
            num:0,
            count:0,
            newsDetail:[
                {
                    title:'市委常委谢晓丹赴白云、花都两区调研河涌合治理工作',
                    content:[
                        {
                            img:'img/cropper/cropper.jpg'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        }
                    ],
                    date:'2017-08-31',
                    num:26,
                    count:18
                },{
                    title:'市委常委谢晓丹赴白云、花都两区调研河涌合治理工作',
                    content:[
                        {
                            img:'img/cropper/cropper.jpg'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        }
                    ],
                    date:'2017-08-31',
                    num:26,
                    count:18
                },{
                    title:'市委常委谢晓丹赴白云、花都两区调研河涌合治理工作',
                    content:[
                        {
                            img:'img/cropper/cropper.jpg'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        },{
                            text:'6日上午，广州市委常委、政法委书记谢晓丹作为市级河长，再次赴白云、花都两区调研河涌综合治理工作，实地检查督导整改河涌污水直排等问题。'
                        }
                    ],
                    date:'2017-08-31',
                    num:26,
                    count:18
                }
            ]
        }
    },
    methods: {
        returnParent:function(){
            eventHelper.emit('returnNewsHome');
        }
    },
    mounted: function () {
        eventHelper.on('openDetail',function(newsIndex){
            this.newsDetail.forEach(function(value,index){
                if(index === newsIndex){
                    this.title = value.title;
                    this.content = value.content;
                    this.date = value.date;
                    this.num = value.num;
                    this.count = value.count;
                }
            }.bind(this))
        }.bind(this));
    },
    components: {

    }
});
module.exports = comm;