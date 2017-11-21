define(['service/reportProblemService'],function(reportProblemService){
    return {
        getNewProblemDetail:function(cb){
            reportProblemService.getNewProblemDetail(cb);
        },
        getProblemDetail:function(fileId,cb){
            reportProblemService.getProblemDetail(fileId,cb);
        },
        saveReportFile:function(reportFile,cb){
            reportProblemService.saveReportFile(reportFile,cb);
        }
    }
});