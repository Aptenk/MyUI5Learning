jQuery.sap.declare("sap.ui.practice.util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.model.type.Currency");
sap.ui.practice.util.Formatter = {
    _statusStateMap: {
        "P": "Success",
        "N": "Warning"
    },
    statusText: function(value) {
        if (value == 'P') {
            return "In Process";
        } else if (value == 'N') {
            return "New";
        }
    },
    statusState: function(value) {
        var map = sap.ui.practice.util.Formatter._statusStateMap;
        return (value && map[value]) ? map[value] : "None";
    },
    date: function(value) {
        if (value) {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            return oDateFormat.format(new Date(value));
        } else {
            return value;
        }
    },
    formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
        var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
        var oLocale = new sap.ui.core.Locale(sBrowserLocale);
        var oLocaleData = new sap.ui.core.LocaleData(oLocale);
        var oCurrency = new sap.ui.model.type.Currency(oLocaleData.mData.currencyFormat);
        return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
    },
    quantity: function(value) {
        try {
            return (value) ? parseFloat(value).toFixed(0) : value;
        } catch (err) {
            return "Not-A-Number";
        }
    },
    price: function(value){
       try {
            return (value) ? parseFloat(value).toFixed(2) : value;
        } catch (err) {
            return "Not-A-Number";
        }
    }

};
