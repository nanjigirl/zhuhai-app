define(['./model/appMenuModel'],function(appMenuModel){
	return{
		getAllAppMenu:function(){
			return appMenuModel;
		},
		getAppMenuByUser:function(token,cb){
			appMenuModel.getApplicationMenu(token,cb);
		}
	}
});