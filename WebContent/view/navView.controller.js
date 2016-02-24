sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, JSONModel) {
    //var tempData = new Array();
    "use strict";
     sap.ui.core.BusyIndicator.hide();
    return Controller.extend("sap.ui.practice.view.navView", {
        onInit: function() {
            // var oConfig = this.getView().getMetadata().getConfig();
            var oHardCodeLocalModel = new JSONModel(jQuery.sap.getModulePath('sap.ui.practice', '/data.json'));
            this.getView().setModel(oHardCodeLocalModel);
        },
        navPress: function() {
            var oView = this.getView();
            var oComboBox = oView.byId("navDestination");
            var oComboBoxInput = oComboBox.getValue();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);      
            switch(oComboBoxInput){
                case "chart":
               oRouter.navTo("chartContainer");
                break;
                case "dataBinding":
                 oRouter.navTo("dataBinding");
                break;
                case "layout":
              oRouter.navTo("layout");
                break;
                case "splitContainer":
                oRouter.navTo("splitContainer");
                break;
                default:
                sap.m.MessageToast.show("No type is chosen now.");
                break;
            }
        }


    });
});
