enyo.kind({
	name : "PreFuel.Results",
	kind : enyo.VFlexBox,
	published: {
		url : "",
		sorte : "",
		ort : "",
	},
	events: {
		onCancel: ""
	},
	components : [ {
		name : "getFeed",
		kind : "WebService",
		onSuccess : "gotFeed",
		onFailure : "gotFeedFailure"
	}, {
		name: "appManager",
		kind: "PalmService",
		service: "palm://com.palm.applicationManager",
		onSuccess: "success",
		onFailure: "failure"
	},
/*	 {
		kind : "Group",
		caption : "Ergebnisse",
		flex : 1,
		components : [
	{
		   kind : enyo.VFlexBox,
//		   style :"padding: 10px",
		   flex : 1,
		   components : [*/
		   {
		kind : "Scroller",
		flex : 1,		
		components : [ {
			name : "list",
			kind : "VirtualRepeater",
			onSetupRow : "getListItem",
			components : [ {
				kind : "Item",
				layoutKind : "VFlexLayout",
				components : [ {
					name : "title",
					kind : "Divider"
				}, {
					name : "description",
					kind : "HtmlContent",
					onLinkClick : "openMap",
				}, {
					name : "adresse",
					kind : "Control",
					showing : false,
				} ]
			} ]
		/*} ]
			} ]*/
	} ]
	},
	{
		kind : enyo.VFlexBox,
		style :"padding: 0px 10px 5px 10px",
		components : [ {
			kind : "Button",
			caption : "Zur Suche",
			onclick : "doCancel",
		}  ]
	},
	],
	gotFeed: function(inSender, inResponse) {
		this.results = inResponse.tankstellen;
	//	this.$.group.setCaption(this.sorte + " in " + this.ort);
		this.$.button.setCaption("Zur Suche");
		this.$.list.render();
	},
	gotFeedFailure: function(inSender, inResponse) {
		enyo.log("got failure from getFeed");
	},
	goSearch: function(inSender) {
		this.results = [];
		this.$.list.render();
		this.$.button.setCaption("Abbrechen");
//		this.url = this.url.replace("@a","ä");
//		this.url = this.url.replace("@o","ö");
//		this.url = this.url.replace("@u","ü");
		this.$.getFeed.setUrl(this.url);
		this.$.getFeed.call();
	},
	create: function() {
		this.inherited(arguments);
		this.results = [];
	},
	openMap: function() {
		this.$.appManager.call(
				{
					target: "maploc: " + this.$.adresse.getContent()

				},
				{
					method: "open"
				}
		);
	},
//	  launchBrowser: function() {
//		      this.$.appManager.call(
//		         {
//		            id: "com.palm.app.browser",
//		            params: {
//		               target: "http://maps.google.com/maps?q=" + this.$.adresse.getContent()
//		            }
//		         },
//		         {
//		            method: "launch"
//		         }
//		      );
//		 },
	getListItem: function(inSender, inIndex) {
		var r = this.results[inIndex];
		if (r) {
			this.$.title.setCaption(r.preis + " @ " + r.datum);
			this.$.description.setContent("<span style=\"font-size:medium;\">" + r.name + "<br><a style=\"color:black;\" href=\"\">" + r.strasse + " " + r.ort + "</a></span>");
			this.$.adresse.setContent(r.strasse + " " + r.ort);
			return true;
		}
	},
	   success: function(inSender, inResponse) {
	      console.log("success:" + enyo.json.stringify(inResponse));
	   },
	   failure: function(inSender, inResponse) {
	      console.log("failure:" + enyo.json.stringify(inResponse));
	   }
});