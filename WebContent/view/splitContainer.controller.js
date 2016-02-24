sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/practice/util/Formatter",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller) {
    var masterData = new Array();
    "use strict";

    sap.ui.core.BusyIndicator.show(0);
    return Controller.extend("sap.ui.practice.view.splitContainer", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("splitContainer").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var that = this.getView();

            // console.log(oGuid);
            var sRootPath = "http://services.odata.org/V3/Northwind/Northwind.svc/";
            var oModel = new sap.ui.model.odata.ODataModel(sRootPath, false, null, null);
            var toOrderMaster = "Orders";
            //console.log(toDetailData);
            var toOrderDetail = "Order_Details";
            oModel.read(toOrderMaster, {
                "success": function(data, response) {
                    var OrderData = data.results;
                    masterData = OrderData;
                    //console.log(OrderData);
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(OrderData);
                    that.setModel(oModel);
                    // that.setBusy(false);
                    sap.ui.core.BusyIndicator.hide();

                },
                "error": function(error) {
                    sap.m.MessageToast.show("读取主数据失败！");
                },

                "async": false
            });
        },
        handleNavButtonPress: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("navView", true);
        },

        listItemPress: function(evt) {
            sap.ui.core.BusyIndicator.show(0);
            var that = this.getView();
            this.getSplitContObj().toDetail(this.createId("detailOrder"));
            //alert("11");
            var oItem = evt.getSource();
            var sPath = oItem.getBindingContext().sPath.substr(1);
            var bindContext = oItem.getBindingContext();
            // console.log(sPath);
            var detailData = masterData[sPath];
            var detailPage = this.getSplitContObj().getDetailPages()[1];
            var sRootPath = "http://services.odata.org/V3/Northwind/Northwind.svc/";
            var oDetailModel = new sap.ui.model.odata.ODataModel(sRootPath, false, null, null);
            //var toOrderMaster = "Orders";
            //console.log(toDetailData);
            var toOrderDetail = "Order_Details";
            oDetailModel.read(toOrderDetail, {
                "success": function(data, response) {
                    var orderDetailData = data.results;
                    // console.log(data.results);
                    var oDetailModel = new sap.ui.model.json.JSONModel();
                    oDetailModel.setData(orderDetailData);
                    ////that.setModel(oDetailModel); Error!!!!
                    // that.setBusy(false);
                    that.byId("productsTable").setModel(oDetailModel);
                    sap.ui.core.BusyIndicator.hide();

                },
                "error": function(error) {
                    sap.m.MessageToast.show("读取详细数据失败！");
                },

                "async": false
            });
            //console.log(detailPage);
            detailPage.setBindingContext(detailData); ///!!!!! binding
            //masterPage.setBindingContext(masterData);
            detailData = [];
            //masterData = [];


        },
        getSplitContObj: function() {
            var result = this.byId("splitContainer");
            if (!result) {
                jQuery.sap.log.error("SplitApp object can't be found");
            }
            return result;
        }


    });
});
