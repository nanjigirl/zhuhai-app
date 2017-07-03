define(['echarts'],function (echarts) {
    return{
        initPumpStation:function(domElc,title,dataTitles,xArr,yArrs){
            var myChart = echarts.init($(domElc)[0]);
            var series=[];
            for(var i =0;i<dataTitles.length;i++){
                series.push(
                {
                    name:dataTitles[i],
                    type:'line',
                    stack: '总量',
                    data:yArrs[i]
                });
            }
            var option = {
                title: {
                    text: title
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:dataTitles
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xArr
                },
                yAxis: {
                    type: 'value'
                },
                series: series
            };
            myChart.setOption(option);
            return{
                chart:myChart,
                option:option
            }
        }
    }
})