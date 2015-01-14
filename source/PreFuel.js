enyo.kind({
  name: "PreFuel",
  kind: enyo.VFlexBox,
components: [
  {kind: "ApplicationEvents", onBack: "backGesture"}, 
  {name: "pane", kind: "Pane", flex: 1,
      components: [
          {
        	  name: "search",
        	  className: "enyo-bg",
        	  kind: "PreFuel.Search",
        	  onSearch: "goSearch",
          },
          {
              name: "preferences",
              className: "enyo-bg",
              kind: "PreFuel.Preferences",
              onReceive: "preferencesReceived",
              onSave: "preferencesSaved",
              onCancel: "goBack"
          },
          {
              name: "results",
              className: "enyo-bg",
              kind: "PreFuel.Results",
              onCancel: "goBack"
          },
          {
              name: "help",
              className: "enyo-bg",
              kind: "PreFuel.Help",
              onCancel: "goBack"
          }
      ]
  },
  {kind: "AppMenu",
      components: [
          {caption: "Bearbeiten", kind: "EditMenu"},
          {caption: "Einstellungen", onclick: "showPreferences"},
          {caption: "Hilfe", onclick: "showHelp"},
          ]
  }
],

openAppMenuHandler: function() {
      this.$.appMenu.open();
  },
  closeAppMenuHandler: function() {
      this.$.appMenu.close();
  },
  showHelp: function() {
      this.$.pane.selectViewByName("help");
  },
  showPreferences: function() {
      this.$.pane.selectViewByName("preferences");
  },
  preferencesReceived: function(inSender, lastOrt, defOrt1,defOrt2,defOrt3,defOrt4,defOrt5, defSorte) {
      this.$.search.setPrefs(lastOrt,defOrt1,defOrt2,defOrt3,defOrt4,defOrt5, defSorte);
  },
  preferencesSaved: function(inSender, defOrt1,defOrt2,defOrt3,defOrt4,defOrt5, defSorte) {
      this.$.search.setPrefs(null,defOrt1,defOrt2,defOrt3,defOrt4,defOrt5, defSorte);
	  this.$.pane.selectViewByName("search");
  },
  goBack: function(inSender, inEvent) {
	  this.$.pane.selectViewByName("search");
  },
  goSearch: function(inSender, url, sorte, ort, lastOrt) {
	  console.log(url);
	  if (lastOrt) {
	      this.$.preferences.saveLast(lastOrt);
	  }
	  this.$.pane.selectViewByName("results");
      this.$.results.setOrt(ort);
      this.$.results.setSorte(sorte);
	  this.$.results.setUrl(url);
	  this.$.results.goSearch();
  },
  create: function() {
      this.inherited(arguments);
      this.$.pane.selectViewByName("search");
  },
  backGesture: function(inSender, inEvent) {
      inEvent.stopPropagation();
      inEvent.preventDefault();
      this.$.pane.selectViewByName("search");
     return -1;
  }
});