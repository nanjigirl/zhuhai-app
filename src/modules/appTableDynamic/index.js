var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var orderService = require('services/orderService');
var userService = require('services/userService');
// 定义组件
var comm = Vue.extend({
    template: template,

    data: function () {
        return {
            tableData4: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1515 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }],
            tableData2: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            tableData6: [{
                id: '12987122',
                name: '王小虎',
                amount1: '234',
                amount2: '3.2',
                amount3: 10
            }, {
                id: '12987123',
                name: '王小虎',
                amount1: '165',
                amount2: '4.43',
                amount3: 12
            }, {
                id: '12987124',
                name: '王小虎',
                amount1: '324',
                amount2: '1.9',
                amount3: 9
            }, {
                id: '12987125',
                name: '王小虎',
                amount1: '621',
                amount2: '2.2',
                amount3: 17
            }, {
                id: '12987126',
                name: '王小虎',
                amount1: '539',
                amount2: '4.1',
                amount3: 15
            }],
            tableData7: [{
                date: '1',
                name: '王小虎1',
                address: '上海市普陀区金沙江路 1510 弄'
            }, {
                date: '2',
                name: '王小虎2',
                address: '上海市普陀区金沙江路 1511 弄'
            }, {
                date: '3',
                name: '王小虎3',
                address: '上海市普陀区金沙江路 1512 弄'
            }, {
                date: '4',
                name: '王小虎4',
                address: '上海市普陀区金沙江路 1513 弄'
            }, {
                date: '5',
                name: '王小虎5',
                address: '上海市普陀区金沙江路 1514 弄'
            }, {
                date: '6',
                name: '王小虎6',
                address: '上海市普陀区金沙江路 1515 弄'
            }, {
                date: '7',
                name: '王小虎7',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '8',
                name: '王小虎8',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '9',
                name: '王小虎9',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '10',
                name: '王小虎10',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            currentPage4: 4,
            pageSize: 1,
            totalPage: 0,
            tableSearch: '',
            displayData: [],
            pageSizes: [1, 2, 3, 4],
        }
    },


    methods: {
        //点击搜索触发
        search: function () {
            // //通过过滤条件返回搜索后的数组对象(this.dataBySearch是指经过过滤后的数据集合)
            // //item => (~item.name.indexOf(this.tableSearch) || ~item.date.indexOf(this.tableSearch) || ~item.address.indexOf(this.tableSearch))这个是根据字段返回过滤结果
            // this.dataBySearch = this.tableData7.filter( item => (~item.name.indexOf(this.tableSearch) || ~item.date.indexOf(this.tableSearch) || ~item.address.indexOf(this.tableSearch)));
            // this.totalPage = this.dataBySearch.length;
            // //初始化展示的数据
            // this.displayData.splice(0);
            //
            // this.displayData.push(...this.dataBySearch.slice((this.currentPage4 - 1) * this.pageSize, (this.currentPage4) * this.pageSize));
        },
        handleSizeChange: function (size) {
            console.log(size);
            this.pageSize = size;
            this.currentPage4 = 1;

            this.displayData.splice(0);
            if(!!this.dataBySearch){
                this.displayData.push(...this.dataBySearch.slice(0, size));
            }else {
                this.displayData.push(...this.tableData7.slice(0, size));
            }
        },
        //改变页码进行选择，用slice方法对table数据进行对应截取数据
        handleCurrentPageChange: function (currentPage) {
            this.currentPage4 = currentPage;
            this.displayData.splice(0);
            if(!!this.dataBySearch){
                this.displayData.push(...this.dataBySearch.slice((currentPage - 1) * this.pageSize, (currentPage) * this.pageSize));
            }else{
                this.displayData.push(...this.tableData7.slice((currentPage - 1) * this.pageSize, (currentPage) * this.pageSize));
            }
        },
        initTable: function () {
            this.totalPage = this.tableData7.length / this.pageSize;
            this.displayData.push(...this.tableData7.slice((this.currentPage4 - 1) * this.pageSize, (this.currentPage4) * this.pageSize));
        },
        //合计尾行值
        getSummaries: function (param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = 'N/A';
                }
            });

            return sums;
        },
        //自定义模版操作
        handleEdit: function (index, row) {
            console.log(index, row);
        },
        handleDelete: function (index, row) {
            console.log(index, row);
        },
        //过滤后地址跟随着变换
        formatter: function (row, column) {
            return row.address;
        },
        //含有checkbox的表格
        toggleSelection: function (rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange: function (val) {
            this.multipleSelection = val;
        },
        //根据button对表格进行操作
        setCurrent: function (row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange: function (val) {
            this.currentRow = val;
        },
        //操作行的操作
        handleClick: function () {
            console.log(1);
        },
        //改变不同行的颜色
        tableRowClassName: function (row, index) {
            if (index === 1) {
                return 'info-row';
            } else if (index === 3) {
                return 'positive-row';
            }
            return '';
        }
    },
    mounted: function () {
        this.initTable();

    },
    watch: {
        tableSearch: function(item, oldVal){
            //通过过滤条件返回搜索后的数组对象(this.dataBySearch是指经过过滤后的数据集合)
            //item => (~item.name.indexOf(this.tableSearch) || ~item.date.indexOf(this.tableSearch) || ~item.address.indexOf(this.tableSearch))这个是根据字段返回过滤结果
            this.dataBySearch = this.tableData7.filter( item => (~item.name.indexOf(this.tableSearch) || ~item.date.indexOf(this.tableSearch) || ~item.address.indexOf(this.tableSearch)));
            this.totalPage = this.dataBySearch.length;
            this.currentPage4 = 1;
            //初始化展示的数据
            this.displayData.splice(0);

            this.displayData.push(...this.dataBySearch.slice((this.currentPage4 - 1) * this.pageSize, (this.currentPage4) * this.pageSize));

        }
    },
    components: {},
    computed: {}
});
module.exports = comm;