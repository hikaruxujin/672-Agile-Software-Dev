Class('App.linb_UI_ToolBar', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host = this,
                children = [],
                append = function(child){
                    children.push(child.get(0))
                };
            
            append((new linb.UI.Block)
                .setHost(host,"block1")
                .setLeft(30)
                .setTop(40)
                .setWidth(520)
                .setHeight(320)
                .setResizer(true)
                .setBorder(true)
            );
            
            host.block1.append((new linb.UI.ToolBar)
                .setHost(host,"toolbar2")
                .setItems([{"id":"align","sub":[{"id":"left","caption":"21"},{"id":"center","caption":"22"},{"id":"right","caption":"23"},{"id":"s1","type":"split"},{"id":"top","caption":"24"},{"id":"middle","caption":"25"},{"id":"bottom","caption":"26"},{"id":"s2","type":"split"},{"id":"w","caption":"27"},{"id":"wh","caption":"28"},{"id":"h","caption":"29"}]},{"id":"code","sub":[{"id":"format","caption":"11","type":"button"},{"id":"json","caption":"12","type":"button"}]}])
                .setDockOrder("1")
                .setHandler(false)
                .setHAlign("right")
                .onClick("_toolbar2_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _toolbar2_onclick:function (profile, item, group, src) {
            linb.message(group.id +':'+ item.id+' clicked');
        }
    }
});