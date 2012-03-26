Class('App.ACom', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Stacks)
                .setHost(host,"stacks1")
                .setItems([{"id":"item a", "caption":"item a"}, {"id":"item b", "caption":"item b"}, {"id":"item c", "caption":"item c"}, {"id":"item d", "caption":"item d"}])
                .setDock("none")
                .setLeft(0)
                .setTop(0)
                .setWidth(240)
                .setHeight(200)
                .setPosition("relative")
                .setValue("item a")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});