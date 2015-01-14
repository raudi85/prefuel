enyo.kind({
	name : "PreFuel.Search",
	kind : enyo.VFlexBox,
	events: {
		onSearch: ""
	},
	components : [  {
		name: "appManager",
		kind: "PalmService",
		service: "palm://com.palm.applicationManager",
		onSuccess: "success",
		onFailure: "failure"
	},
	{
		name: "gps",
		kind: "PalmService",
		service: "palm://com.palm.location"
	},
	{
		kind: "Scroller",
		flex : 1,
		components : [  {
			kind : "Group",
			caption : "Suche",
			components : [ {
				kind : "InputBox",
				components : [ {
					name : "ort",
					hint : "PLZ / Ort",
					kind : "Input",
					selectAllOnFocus: true,
					flex : 1,
				}, {
					name : "sorte",
					kind : "Picker",
					value: "diesel",
					flex: 1,
					scrim : true,
					style : "font-size:medium",
					items : [ {
						caption: "Diesel", value: "diesel"
					},{
						caption: "Super E10", value: "supere10"
					},{
						caption: "Super E5", value: "super"
					},{
						caption: "Super Plus", value: "superplus"
					} ]
				}]
			}, {
				kind : enyo.VFlexBox,
				style :"padding: 0px 10px 5px 10px",
				components : [ {
					name : "suche",
					kind : "Button",
					caption : "Suche",
					onclick : "btnClick"
				} ],
			},	{
				kind : enyo.VFlexBox,
				style :"padding: 0px 10px 5px 10px",
				components : [ {
					name : "gpssuche",
					kind : "Button",
					caption : "GPS Suche",
					onclick : "locate"
				} ],
//			},	{
//					name: "reverseLocationContainer",
//					style: "word-wrap: break-word;"
//						},{
//						kind: "Image",
//						src: "http://www.tankampel.de/ampel.png",
//						style : "height: 50px",
			} ],
		},	{
			kind : "RowGroup",
			caption : "Favoriten",
			components : [ {
				name : "ort1", onclick: "favClick",
			}, {
				name : "ort2", onclick: "favClick",
			}, {
				name : "ort3", onclick: "favClick",
			}, {
				name : "ort4", onclick: "favClick",
			}, {
				name : "ort5", onclick: "favClick",			
			}],
		} ],
	} ],
	locate: function(inSender) {
		this.$.gpssuche.setCaption("Versuche Lokalisierung");
		this.$.gps.call(
				{
					responseTime: 2,
					subscribe: false
				},
				{
					method: "getCurrentPosition",
					onSuccess: "onLocateSuccess",
					onFailure: "onLocateFailure"
				}
		);
	},
	onLocateSuccess: function(inSender, inResponse) {
		console.log("success: " + enyo.json.stringify(inResponse));

		latitude = inResponse.latitude;
		longitude = inResponse.longitude;

		this.$.gps.call(
				{
					latitude: latitude,
					longitude: longitude
				},
				{
					method: "getReverseLocation",
					onSuccess: "onReverseSuccess",
					onFailure: "onReverseFailure"
				}
		);

	},
	onLocateFailure: function(inSender, inResponse) {
		console.log("failure: " + enyo.json.stringify(inResponse));
	},
	onReverseSuccess: function(inSender, inResponse) {
		var locationAddress = inResponse.address;
		var plz = locationAddress.substr(locationAddress.indexOf(";")+1, 5);
		this.$.gpssuche.setCaption("GPS Suche");
		this.$.ort.setValue(plz);
		this.btnClick();
	},
	onReverseFailure: function(inSender, inResponse) {
		console.log("failure: " + enyo.json.stringify(inResponse));
		this.$.locationContainer.setContent("Reverse Location Error: " + enyo.json.stringify(inResponse));
	},

	startSearch : function (ort, lastOrt) {
		var version = "2.0.2";
		var url = "http://gcgogo.yz.to/prefuel/tanken.php?ort="
			+ ort + "&sorte=" + this.$.sorte.getValue().toLowerCase() + "&version=" + version;
		this.doSearch(url, this.$.sorte.getValue(), ort, lastOrt);	
	},
	
	btnClick : function() {
		this.startSearch(this.$.ort.getValue(),this.$.ort.getValue());
	},
	
	favClick : function (inSender) {
		this.startSearch(inSender.getContent(),null);
	},
	create: function() {
		this.inherited(arguments);
	},
	setPrefs: function(last, ort1,ort2,ort3,ort4,ort5, sorte) {
		if (last) {
			this.$.ort.setValue(last);	
		}
		if (ort1) {
	    	  this.$.ort1.show();
	    	  this.$.ort1.setContent(ort1);
	      }
	      else {
	    	  this.$.ort1.hide();
	      }
	      if (ort2) {
	    	  this.$.ort2.show();
	    	  this.$.ort2.setContent(ort2);
	      }
	      else {
	    	  this.$.ort2.hide();
	      }
	      if (ort3) {
	    	  this.$.ort3.show();
	    	  this.$.ort3.setContent(ort3);
	      }
	      else {
	    	  this.$.ort3.hide();
	      }
	      if (ort4) {
	    	  this.$.ort4.show();
	          this.$.ort4.setContent(ort4);
	      }
	      else {
	    	  this.$.ort4.hide();
	      }
	      if (ort5) {
	    	  this.$.ort5.show();
	          this.$.ort5.setContent(ort5);
	      }
	      else {
	    	  this.$.ort5.hide();
	      }
	      if (sorte) {
	          this.$.sorte.setValue(sorte);
	      }
	},

});