define(['services/loginService','services/serviceHelper'],function(loginService,serviceHelper){
    return{
        login:function(userName,password,cb){
            loginService.login(userName,password,cb);
        },
        getUserRole:function(token,cb){
            loginService.getUserRole(token,cb,function(){
                console.log('Error');
            })
        },
        setToken:function (token) {
            serviceHelper.setToken(token);
        }
        
    }
});