define(['./serviceHelper'],function(serviceHelper){
	return {
	getApplicationMenu:function(token,cb,errorCb){
	$.get(serviceHelper.getPath('userMenu'),function(result){
			if(!!result){
				var resultObj = JSON.parse(result);
			if(resultObj.state==1){
				cb(resultObj.data.result.appmenu);
			}
			}
			else{
				errorCb();
			}
		});
	}
	}
});