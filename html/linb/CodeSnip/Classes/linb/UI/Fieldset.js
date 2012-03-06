Class('App.linb_UI_Fieldset', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host = this,
                children = [],
                append = function(child){
                    children.push(child.get(0))
                };
            
            append((new linb.UI.Pane)
                .setHost(host,"panel3")
                .setLeft(40)
                .setTop(60)
                .setWidth(260)
                .setHeight(130)
            );
            
            host.panel3.append((new linb.UI.Group)
                .setHost(host,"fieldset1")
                .setWidth("auto")
                .setHeight("auto")
                .setZIndex(1)
                .setPosition("relative")
                .setCaption("fieldset1")
            );
            
            host.fieldset1.append((new linb.UI.Pane)
                .setHost(host,"panel12")
                .setLeft(10)
                .setWidth(230)
                .setHeight(90)
                .setPosition("relative")
            );
            
            host.panel12.append((new linb.UI.Button)
                .setHost(host,"button14")
                .setLeft(30)
                .setTop(30)
                .setCaption("button14")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"panel9")
                .setLeft(340)
                .setTop(60)
                .setWidth(260)
                .setHeight(130)
            );
            
            host.panel9.append((new linb.UI.Group)
                .setHost(host,"fieldset3")
                .setWidth("auto")
                .setHeight("auto")
                .setZIndex(1)
                .setPosition("relative")
                .setCaption("fieldset1")
                .setExpend(false)
            );
            
            host.fieldset3.append((new linb.UI.Pane)
                .setHost(host,"panel10")
                .setLeft(10)
                .setWidth(230)
                .setHeight(90)
                .setPosition("relative")
            );
            
            host.panel10.append((new linb.UI.Button)
                .setHost(host,"button11")
                .setLeft(30)
                .setTop(30)
                .setCaption("button14")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});