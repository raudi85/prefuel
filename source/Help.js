enyo.kind({
  name: "PreFuel.Help",
  kind: enyo.VFlexBox,
  events: {
      onReceive: "",
      onSave: "",
      onCancel: ""
  },
  components: [
//      {kind: "PageHeader", content: "Hilfe"},
      {kind: "Scroller",
    	  flex : 1,
    	  components : [
    	   {
    		   kind : "Group",
    		   caption : "Hilfe",
    		   components : [ {
    			   kind : enyo.VFlexBox,
    			   style :"padding: 10px",
    			   components : [
    			   {
    				   content : "<div align=\"left\" style=\"font-size:medium\"><u>Hinweis zur Ortsbestimmung</u>:<br>" +
    				   				"Die Angabe des Ortsnames schr&auml;nkt die Suche auf diesen Ort ein.<br>" +
    				   				"Bei Angabe der PLZ (mind. 2, besser 3 Stellen) wird eine Bereichsuche durchgef&uuml;hrt.<br>" +
    				   				"<u>Hinweis zu Umlauten</u>:<br>" +
    				   				"Derzeit kann noch nicht nach St&auml;dtenamen mit Umlauten gesucht werden.<br>" +
    				   				"<u>Hinweis zur Aktualit&auml;t</u>:<br>" +
    				   				"Es werden nur Preise angezeigt, die innerhalb der letzten 24 Stunden erfasst wurden.</div>" +
    				   				"<hr>"
    			   },
    			   {
    				   content : "<span style=\"color:blue;font-size:large\">Hilfeforum @ webOSNation.com</span>",
    				   onclick :"launchBrowser",
    			   },
    			   ]
    		   } ]
    	   },
    	   {
    		   kind : "Group",
    		   caption : "Autor",
    		   components : [ {
    			   kind : enyo.VFlexBox,
    			   style :"padding: 10px",
    			   components : [ {
    				   content : "<div align=\"left\" style=\"font-size:medium\">PreFuel - der Benzinpreisvergleich<br>von raudi85<br>Version 2.0.1<br>2011/2012</div>"
    			   } ]
    		   } ]
    	   },
    	   {
				name: "cancelButton", kind: "Button",
				content: "Zur Suche", onclick: "cancelClick",
    	   }
    	   
    	   ]
      },
      {
    	     name: "launchBrowserCall",
    	     kind: "PalmService",
    	     service: "palm://com.palm.applicationManager/",
    	     method: "launch",
    	     onSuccess: "launchFinished",
    	     onFailure: "launchFail",
    	     onResponse: "gotResponse",
    	     subscribe: true
    	},
  ],
  create: function() {
      this.inherited(arguments);
  },
  cancelClick: function() {
      this.doCancel();
  },
  launchFinished: function(inSender, inResponse) {
	    enyo.log("Launch browser success, results=" + enyo.json.stringify(inResponse));
  },
  launchFail: function(inSender, inResponse) {
	  enyo.log("Launch browser failure, results=" + enyo.json.stringify(inResponse));
  },
  launchBrowser: function(inSender, inResponse)
  {
	  this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": "http://forums.webosnation.com/webos-homebrew-apps/310145-prefuel.html"}});
  }  
});