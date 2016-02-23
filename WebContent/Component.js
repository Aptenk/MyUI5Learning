sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel"
], function(UIComponent, ODataModel, JSONModel) {
    "use strict";
    return UIComponent.extend("sap.ui.practice.Component", {
        metadata: {
            manifest: "json"
        },
        init: function() {
            // call the init function of the parent 给this继承init方法
            /*Our component inherits from the base class sap.ui.core.UIComponent and it is obligatory 
            to make the super 
            call to the init function of the base class in the overridden init method.*/
            UIComponent.prototype.init.apply(this, arguments);
            // create the views based on the url/hash
            this.getRouter().initialize();
            // set invoice model - local
           
            // set invoice model - remote
           
        }
    });
});
