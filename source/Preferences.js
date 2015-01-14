enyo.kind({
  name: "PreFuel.Preferences",
  kind: enyo.VFlexBox,
  events: {
	  onReceive: "",
      onSave: "",
      onCancel: ""
  },
  components: [
      {
          name: "getPreferencesCall",
          kind: "PalmService",
          service: "palm://com.palm.systemservice/",
          method: "getPreferences",
          onSuccess: "getPreferencesSuccess",
          onFailure: "getPreferencesFailure"
      },
      {
          name: "setPreferencesCall",
          kind: "PalmService",
          service: "palm://com.palm.systemservice/",
          method: "setPreferences",
          onSuccess: "setPreferencesSuccess",
          onFailure: "setPreferencesFailure"
      },
//      {kind: "PageHeader", content: "Einstellungen"},
      {kind: "Scroller",
    	  flex : 1,
    	  components : [
    	    {
			kind : "RowGroup",
			caption : "Favoriten",
			components : [ {
//				kind : "InputBox",
//				components : [ {
					name : "defaultOrt1",
					kind : "Input",
					value : "",
					selectAllOnFocus: true,
					flex : 1,
				},{
					name : "defaultOrt2",
					kind : "Input",
					value : "",
					selectAllOnFocus: true,
					flex : 1,
				},{
					name : "defaultOrt3",
					kind : "Input",
					value : "",
					selectAllOnFocus: true,
					flex : 1,
				},{
					name : "defaultOrt4",
					kind : "Input",
					value : "",
					selectAllOnFocus: true,
					flex : 1,
				},{
					name : "defaultOrt5",
					kind : "Input",
					value : "",
					selectAllOnFocus: true,
					flex : 1,
				}, {
					name : "defaultSorte",
					kind : "Picker",
					flex: 1,
					scrim : true,
					value : "diesel",
					items : [ {
						caption : "Diesel",
						value : "diesel"
					}, {
						caption : "Super E10",
						value : "supere10"
					}, {
						caption : "Super E5",
						value : "super"
					}, {
						caption : "Super Plus",
						value : "superplus"
					} ]
//				} ]
			},
			/*{
				kind : enyo.VFlexBox,
				style :"padding:5px 10px 5px 10px",
				components : [ {
					name: "saveButton", kind: "Button",
					content: "Speichern", onclick: "saveClick"
				}, {
					name: "cancelButton", kind: "Button",
					content: "Zur Suche", onclick: "cancelClick"
				}  ]
			}*/ ]
		},
		{
			name: "saveButton", kind: "Button",
			content: "Speichern", onclick: "saveClick"
		},
          ]
      },
  ],
  create: function() {
      this.inherited(arguments);
//      this.savedOrt = "";
      this.savedSorte = "";
      this.$.getPreferencesCall.call(
      {
          "keys": ["defaultSorte","lastOrt","defaultOrt1","defaultOrt2","defaultOrt3","defaultOrt4","defaultOrt5"]
      });
      // keep this updated with the value that's currently saved to the service
  },
  getPreferencesSuccess: function(inSender, inResponse) {
//      this.savedOrt = inResponse.defaultOrt;
//      this.$.defaultOrt.setValue(this.savedOrt);
	  this.$.defaultOrt1.setValue(inResponse.defaultOrt1);
	  this.$.defaultOrt2.setValue(inResponse.defaultOrt2);
	  this.$.defaultOrt3.setValue(inResponse.defaultOrt3);
	  this.$.defaultOrt4.setValue(inResponse.defaultOrt4);
	  this.$.defaultOrt5.setValue(inResponse.defaultOrt5);
	  this.savedSorte = inResponse.defaultSorte;
      this.$.defaultSorte.setValue(this.savedSorte);
//      console.log("got success from getPreferences: " + this.savedOrt + "," + this.savedSorte);
      this.doReceive(inResponse.lastOrt,inResponse.defaultOrt1,inResponse.defaultOrt2,inResponse.defaultOrt3,inResponse.defaultOrt4,inResponse.defaultOrt5, this.savedSorte);
  },
  getPreferencesFailure: function(inSender, inResponse) {
      enyo.log("got failure from getPreferences");
  },
  setPreferencesSuccess: function(inSender, inResponse) {
      console.log("got success from setPreferences");
  },
  setPreferencesFailure: function(inSender, inResponse) {
      console.log("got failure from setPreferences");
  },
//  showingChanged: function() {
//      // reset contents of text input box to last saved value
//      this.$.defaultOrt.setValue(this.defaultOrt);
//      this.$.defaultSorte.setValue(this.defaultSorte);
//  },
  saveClick: function(inSender, inEvent) {
      var newDefaultOrt1Value = this.$.defaultOrt1.getValue();
      var newDefaultOrt2Value = this.$.defaultOrt2.getValue();
      var newDefaultOrt3Value = this.$.defaultOrt3.getValue();
      var newDefaultOrt4Value = this.$.defaultOrt4.getValue();
      var newDefaultOrt5Value = this.$.defaultOrt5.getValue();
      var newDefaultSorteValue = this.$.defaultSorte.getValue();
      this.$.setPreferencesCall.call(
      {
          "defaultOrt1": newDefaultOrt1Value,
          "defaultOrt2": newDefaultOrt2Value,
          "defaultOrt3": newDefaultOrt3Value,
          "defaultOrt4": newDefaultOrt4Value,
          "defaultOrt5": newDefaultOrt5Value,
          "defaultSorte": newDefaultSorteValue
      });
//      this.savedOrt = newDefaultOrtValue;
//      this.savedSorte = newDefaultSorteValue;
      this.doSave(newDefaultOrt1Value, newDefaultOrt2Value, newDefaultOrt3Value, newDefaultOrt4Value, newDefaultOrt5Value, newDefaultSorteValue);
  },
  saveLast : function(lastOrt) {
	  this.$.setPreferencesCall.call(
			  {
				  "lastOrt": lastOrt,
			  });  
	  console.log(lastOrt + "als letzter Ort gespeichert.");
  },

  cancelClick: function() {
      this.doCancel();
  }
});