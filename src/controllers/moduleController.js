define([
    'modules/appContent',
    'modules/arcgisPlugin',
    'modules/appUnknown',
    'modules/appWidgets',
], function (appContent,
             arcgisPlugin,
             appUnknown,
             appWidgets){
    return {
        'app-content': appContent,
        'arcgis-plugin': arcgisPlugin,
        'app-unknown': appUnknown,
        'app-widgets': appWidgets
    }
});