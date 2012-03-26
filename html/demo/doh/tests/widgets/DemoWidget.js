dojo.provide("demo.doh.tests.widgets.DemoWidget");

if(dojo.isBrowser){
	//Define the HTML file/module URL to import as a 'remote' test.
	doh.registerUrl("demo.doh.tests.widgets.DemoWidget", 
					dojo.moduleUrl("demo", "doh/tests/widgets/DemoWidget.html"));
}

