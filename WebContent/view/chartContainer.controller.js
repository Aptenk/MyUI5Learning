sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";
    sap.ui.core.BusyIndicator.hide();
    return Controller.extend("sap.ui.practice.view.chartContainer", {
        handleNavButtonPress: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("navView", true);
        },
        onInit: function() {

            var oSelect1 = this.getView().byId("idoSelect1");
            // -------- oSelect1 ----------------
            var item0 = new sap.ui.core.Item({
                key: "0",
                text: "Sales by Product"
            });
            var item1 = new sap.ui.core.Item({
                key: "1",
                text: "Sales by Country"
            });

            oSelect1.addItem(item0);
            oSelect1.addItem(item1);

            //--------bubble chart vizframe---------
            var oVizFrame3 = this.getView().byId("idoVizFrame3");

            var oVizFrame3Model = new sap.ui.model.json.JSONModel({
                'businessData': [{
                    "Sales_Month": "April",
                    "Marital Status": "Married",
                    "Customer Gender": "Female",
                    "Sales_Quarter": "Q1",
                    "Cost": 190,
                    "Unit Price": 128.3,
                    "Gross Profit": 321,
                    "Sales Revenue": 120
                }, {
                    "Sales_Month": "May",
                    "Marital Status": "Married",
                    "Customer Gender": "Female",
                    "Sales_Quarter": "Q2",
                    "Cost": 189.9,
                    "Unit Price": 151.17,
                    "Gross Profit": 181.59,
                    "Sales Revenue": 471.49
                }, {
                    "Sales_Month": "June",
                    "Marital Status": "Married",
                    "Customer Gender": "Female",
                    "Sales_Quarter": "Q3",
                    "Cost": 135,
                    "Unit Price": 321,
                    "Gross Profit": 124,
                    "Sales Revenue": 349
                }, {
                    "Sales_Month": "July",
                    "Marital Status": "Married",
                    "Customer Gender": "Female",
                    "Sales_Quarter": "Q4",
                    "Cost": 169.4,
                    "Unit Price": 185.2,
                    "Gross Profit": 153.8,
                    "Sales Revenue": 145.9
                }, {
                    "Sales_Month": "Augst",
                    "Marital Status": "Married",
                    "Customer Gender": "Male",
                    "Sales_Quarter": "Q1",
                    "Cost": 270.2,
                    "Unit Price": 175,
                    "Gross Profit": 154.3,
                    "Sales Revenue": 164.9
                }]
            });

            var oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: 'Sales_Quarter',
                    value: "{Sales_Quarter}"
                }, {
                    name: 'Customer Gender',
                    value: "{Customer Gender}"
                }, {
                    name: 'Sales_Month',
                    value: "{Sales_Month}"
                }, {
                    name: 'Marital Status',
                    value: "{Marital Status}"
                }],

                measures: [{
                    name: 'Cost',
                    value: '{Cost}'
                }, {
                    name: 'Unit Price',
                    value: '{Unit Price}'
                }, {
                    name: 'Gross Profit',
                    value: '{Gross Profit}'
                }, {
                    name: 'Sales Revenue',
                    value: '{Sales Revenue}'
                }],

                data: {
                    path: "/businessData"
                }
            });
            oVizFrame3.setDataset(oDataset);
            oVizFrame3.setModel(oVizFrame3Model);

            //set feeds
            var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    "uid": "primaryValues",
                    "type": "Measure",
                    "values": ["Cost"]
                }),
                feedSecondaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    "uid": "secondaryValues",
                    "type": "Measure",
                    "values": ["Unit Price"]
                }),
                feedBubbleWidth = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    "uid": "bubbleWidth",
                    "type": "Measure",
                    "values": ["Gross Profit"]
                }),
                feedBubbleHeight = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    "uid": "bubbleHeight",
                    "type": "Measure",
                    "values": ["Sales Revenue"]
                }),
                feedRegionColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    "uid": "regionColor",
                    "type": "Dimension",
                    "values": ["Sales_Month", "Sales_Quarter", "Customer Gender"]
                }),
                feedRegionShape = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    "uid": "regionShape",
                    "type": "Dimension",
                    "values": ["Marital Status"]
                });

            oVizFrame3.addFeed(feedPrimaryValues);
            oVizFrame3.addFeed(feedSecondaryValues);
            oVizFrame3.addFeed(feedBubbleWidth);
            oVizFrame3.addFeed(feedBubbleHeight);
            oVizFrame3.addFeed(feedRegionColor);
            oVizFrame3.addFeed(feedRegionShape);
            oVizFrame3.setVizType('bubble');

            //--------stacked bar chart vizframe---------
            var oVizFrame5 = this.getView().byId("idoVizFrame5");
            var oModel_sb = new sap.ui.model.json.JSONModel([{
                "Country": "China",
                "Profit": 100,
                "Forcast": 200,
                "Target": 20

            }, {
                "Country": "Japan",
                "Profit": 159,
                "Forcast": 140,
                "Target": 150
            }, {
                "Country": "India",
                "Profit": 129,
                "Forcast": 120,
                "Target": 100
            }, {
                "Country": "France",
                "Profit": 58,
                "Forcast": 60,
                "Target": 80
            }, {
                "Country": "Austrilia",
                "Profit": 149,
                "Forcast": 120,
                "Target": 150
            }, {
                "Country": "Sweden",
                "Profit": 49,
                "Forcast": 60,
                "Target": 55
            }]);
            var oDataset_sb = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: 'Country',
                    value: "{Country}"
                }],
                measures: [{
                    name: 'Profit',
                    value: '{Profit}'
                }, {
                    name: 'Target',
                    value: '{Target}'
                }],
                data: {
                    path: "/"
                }
            });


            var feedPrimaryValues_sb = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "primaryValues",
                    'type': "Measure",
                    'values': ["Profit"]
                }),
                feedAxisLabels_sb = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "axisLabels",
                    'type': "Dimension",
                    'values': ["Country"]
                }),
                feedTargetValues_sb = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "targetValues",
                    'type': "Measure",
                    'values': ["Target"]
                });

            oVizFrame5.setDataset(oDataset_sb);
            oVizFrame5.setModel(oModel_sb);
            oVizFrame5.addFeed(feedPrimaryValues_sb);
            oVizFrame5.addFeed(feedAxisLabels_sb);
            oVizFrame5.addFeed(feedTargetValues_sb);
            oVizFrame5.setVizType('stacked_bar');

            //-------column chart vizframe-------
            var oVizFrame4 = this.getView().byId("idoVizFrame4");
            var oDataset4 = new sap.viz.ui5.data.FlattenedDataset({
                'dimensions': [{
                    'name': 'Country',
                    'value': "{Country}"
                }],

                'measures': [{
                    'name': 'Profit',
                    'value': '{profit}'
                }],
                'data': {
                    'path': "/businessData"
                }
            });
            var amModel4 = new sap.ui.model.json.JSONModel({
                'businessData': [{
                    'Country': "Canada",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "China",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "France",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Germany",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "India",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "United States",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "Italy",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Spain",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Portugal",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Ireland",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Scotland",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "Wales",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "England",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Belgium",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Andorra",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Netherlands",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Poland",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "Danemark",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "Sweden",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Norway",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Finland",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Russia",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Bularia",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "Romania",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "Alabania",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Greece",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Turkey",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "South Africa",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Australia",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "New Zeland",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "Japan",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Indonesia",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Argentina",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Mexico",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Brazil",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "Chile",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "Peru",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Colombia",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Venezuela",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Uruguay",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Honduras",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "Ghana",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "Israel",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Lybia",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Algeria",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Marroco",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Guinea",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "Iran",
                    'revenue': 905.08,
                    'profit': 609.16
                }, {
                    'Country': "Irak",
                    'revenue': 410.87,
                    'profit': 141.25
                }, {
                    'Country': "Egypt",
                    'revenue': 338.29,
                    'profit': 133.82
                }, {
                    'Country': "Kenya",
                    'revenue': 487.66,
                    'profit': 348.76
                }, {
                    'Country': "Island",
                    'revenue': 470.23,
                    'profit': 217.29
                }, {
                    'Country': "Cuba",
                    'revenue': 170.93,
                    'profit': 117.00
                }, {
                    'Country': "Pakistan",
                    'revenue': 905.08,
                    'profit': 609.16
                }]
            });
            var feedPrimaryValues4 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "primaryValues",
                    'type': "Measure",
                    'values': ["Profit"]
                }),
                feedAxisLabels4 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "axisLabels",
                    'type': "Dimension",
                    'values': [new sap.viz.ui5.controls.common.feeds.AnalysisObject({
                        'uid': "Country",
                        'type': "Dimension",
                        'name': "Country"
                    })]
                });
            oVizFrame4.setDataset(oDataset4);
            oVizFrame4.setModel(amModel4);
            oVizFrame4.addFeed(feedPrimaryValues4);
            oVizFrame4.addFeed(feedAxisLabels4);
            oVizFrame4.setVizType('column');

            //-----------table example -------------------
            var oTable = this.getView().byId("idoTable");
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Sales Month"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Marital Status"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Customer Gender"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Sales Quarter"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Cost"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Unit Price"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Gross Profit"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "Sales Revenue"
                })
            }));

            var oTableTemplate = new sap.m.ColumnListItem({
                type: sap.m.ListType.Active,
                cells: [
                    new sap.m.Label({
                        text: "{Sales_Month}"
                    }),
                    new sap.m.Label({
                        text: "{Marital Status}"
                    }),
                    new sap.m.Label({
                        text: "{Customer Gender}"
                    }),
                    new sap.m.Label({
                        text: "{Sales_Quarter}"
                    }),
                    new sap.m.Label({
                        text: "{Cost}"
                    }),
                    new sap.m.Label({
                        text: "{Unit Price}"
                    }),
                    new sap.m.Label({
                        text: "{Gross Profit}"
                    }),
                    new sap.m.Label({
                        text: "{Sales Revenue}"
                    })
                ]
            });


            oTable.bindItems("/businessData", oTableTemplate, null, null);
            oTable.setModel(oVizFrame3Model);


        }

        /*	attachPersonalizationPress : function(oE) {
        		sap.m.MessageToast.show("Personlainzation event was fired.");
        	},
        	attachContentChange : function(evt){
        		var itemId = evt.getParameter("selectedItemId");
        		sap.m.MessageToast.show("ContentChange event was fired. Selected Item was changed to:" + itemId);
        	}*/
    });
});
