//ECMAScript6（以下简称es6） demo

module.exports = {
    //数组（array）用法
    arrayDemo: function () {
        //测试数据
        var rows = [];
        rows.push({name: "张三", age: 23});
        rows.push({name: "李四", age: 50});
        rows.push({name: "王五", age: 47});

        //es6的array支持类似java 1.8 lambda表达式，以下是他的写法

        //把name等于张三的项输出成一个新的array
        var rowFilters = rows.filter(t => t.name == "张三");

        //如果用传统的for循环实现，代码要多很多，可以看出es6的优势
        rowFilters = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.name == "张三") {
                rowFilters.push(row);
            }
        }

        //过滤出age大于30的，并且只输出name
        rowFilters = rows.filter(t => t.age > 30).map(t => t.name);
    }
};