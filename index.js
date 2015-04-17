// This is Plurk Buoy Add-on
var data = require("sdk/self").data;
 
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
	include: [
		"http://www.plurk.com/m",
		"http://www.plurk.com/m/",
		"http://www.plurk.com/m?*",
		"http://www.plurk.com/m/?*",
		"http://www.plurk.com/m/u*"
	],
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("mod.js"), data.url("enhance.js")],
  contentStyleFile: data.url("style.css")
});

pageMod.PageMod({
	include: [
		"http://www.plurk.com/m/p/*"
	],
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("content.js"), data.url("enhance.js")],
  contentStyleFile: data.url("content.css")
});
