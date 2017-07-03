define(['services/statisticsService','moment'], function (statisticsService,moment) {
    return {
        getRainDetail: function (itemId, cb) {
            statisticsService.getHistoricalData([itemId], '2017-05-10 00:00:00', '2017-05-20 00:00:00', function (data) {
                console.log(data);
                var rainDetail = [];
                var summary = [];
                var i = 0;
                data.forEach(function (item) {
                    var detailObj = {name: item.deviceUpdateTime, value: [item.deviceUpdateTime,item.dValue]};
                    if (i > 0) {
                        var summaryObj = {name: item.deviceUpdateTime, value: [item.deviceUpdateTime,(parseFloat(summary[i - 1].value[1]) + item.dValue).toFixed(2)]};
                    }
                    else {
                        var summaryObj = {name: item.deviceUpdateTime, value: [item.deviceUpdateTime,item.dValue.toFixed(2)]};
                    }
                    i++;
                    summary.push(summaryObj);
                    rainDetail.push(detailObj);
                });
                cb({detail: rainDetail, summary: summary});
            });
        }
    }
});