define(['./serviceHelper'], function (serviceHelper) {
    return {
        formatLocation: function (x, y, cb, errorCb) {
            var parm = {
                id: 'formatLocation',
                parameter: {
                    x: x,
                    y: y
                }
            }
            $.get(serviceHelper.getPath(parm), function (result) {
                if (!!result) {
                    if (result.success) {
                        cb(result.data);
                    }
                }
                else {
                }
            });
        },
    }

});
