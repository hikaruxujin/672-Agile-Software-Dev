
Class('App.linb_UI_TimeLine', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Button)
                .setHost(host,"button3")
                .setLeft(100)
                .setTop(30)
                .setCaption("drag me to calendar")
                .onRender("_button3_aftercreated")
            );
            
            append((new linb.UI.Block)
                .setHost(host,"block2")
                .setLeft(10)
                .setTop(80)
                .setWidth(420)
                .setHeight(304)
                .setBorder(true)
                .setResizer(true)
                .setCustomStyle({"PANEL":"background:#fff;"})
            );
            
            host.block2.append((new linb.UI.TimeLine)
                .setHost(host,"timeline1")
                .setLeft(10)
                .setTop(10)
                .setWidth(796)
                .setIncrement(30)
                .setTimeSpanKey("2 h")
                .setUnitPixs(30)
                .setMultiTasks(true)
                .setDropKeys("iEvent")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button5")
                .setLeft(140)
                .setTop(420)
                .setCaption("linb.setLang('cn')")
                .onClick("_button5_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _button3_aftercreated:function (profile) {
            profile.boxing().draggable('iEvent','data');
        }, 
        _button5_onclick:function (profile, e, value) {
            linb.setLang('cn');
        }
    }
});