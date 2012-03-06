dojo.provide("demo.doh.tests.module");
//This file loads in all the test definitions.  

try{
	//Load in the demoFunctions module test.
	dojo.require("demo.doh.tests.functions.demoFunctions");
	//Load in the widget tests.
	dojo.require("demo.doh.tests.widgets.DemoWidget");
}catch(e){
	doh.debug(e);
}

