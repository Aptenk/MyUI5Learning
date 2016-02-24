sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/practice/util/Formatter",
], function(Controller, JSONModel) {
    //var tempData = new Array();
    "use strict";
    sap.ui.core.BusyIndicator.hide();
    var oBasicModel = new sap.ui.model.json.JSONModel({
        firstName: "Peter",
        lastName: "Pan",
        enabled: true,
    });
    return Controller.extend("sap.ui.practice.view.dataBinding", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("dataBinding").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var oView = this.getView();
            //setModel的时候，取一个命名空间的重要性。
            oView.setModel(oBasicModel, 'basic');
            var oProductModel = new sap.ui.model.json.JSONModel();
            oProductModel.loadData("./Products.json");
            //setModel的时候，取一个命名空间的重要性。
            oView.setModel(oProductModel, "products");
        },
        handleNavButtonPress: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("navView", true);
        },
        changeBindingMode: function() {
            /*If the default binding mode should be changed, this method should be called directly after model instance 
                creation  and before any binding creation.
                 Otherwise it is not guaranteed that the existing bindings will be updated with the new binding mode.*/
            var that = this.getView();
            var defaultBindingMode = oBasicModel.getDefaultBindingMode();
            //console.log(defaultBindingMode);
            if (defaultBindingMode == "TwoWay") {
                var oTempModel = new sap.ui.model.json.JSONModel({
                    firstName: "Peter",
                    lastName: "Pan",
                    enabled: true,
                });
                oTempModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                oBasicModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                that.setModel(oTempModel, 'basic');
                that.byId("modeStatus").setText("OneWay Now");

            } else if (defaultBindingMode == "OneWay") {
                var oTempModel = new sap.ui.model.json.JSONModel({
                    firstName: "Peter",
                    lastName: "Pan",
                    enabled: true,
                });
                oTempModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                oBasicModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                that.setModel(oTempModel, 'basic');
                that.byId("modeStatus").setText("TwoWay Now");
            }

        },
        onItemPressed: function(oEvent) {

            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("products");
            //  console.log(oContext);
            var sPath = oContext.getPath();
            var oProductDetailPanel = this.getView().byId("productDetailsPanel");
            oProductDetailPanel.bindElement({
                path: sPath,
                model: "products"
            });
        },

    });
});
