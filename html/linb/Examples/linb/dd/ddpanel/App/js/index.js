Class('App', 'linb.Com',{ 
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Div)
                .setHost(host,"Div9")
                .setLeft(24)
                .setTop(272)
                .setWidth(168)
                .setHeight(24)
                .setHtml("Stacks")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"panel2")
                .setLeft(312)
                .setTop(40)
                .setWidth(256)
                .setHeight(78)
                .setDropKeys("iAny")
                .onDrop("__ondrop")
                .setCustomStyle({"KEY":"border:solid 1px;"})
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div7")
                .setLeft(24)
                .setTop(16)
                .setWidth(168)
                .setHeight(24)
                .setHtml("Panel1")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div8")
                .setLeft(312)
                .setTop(16)
                .setWidth(168)
                .setHeight(24)
                .setHtml("Panel2")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"panel1")
                .setLeft(24)
                .setTop(40)
                .setWidth(256)
                .setHeight(78)
                .setDropKeys("iAny")
                .onDrop("__ondrop")
                .setCustomStyle({"KEY":"border:solid 1px;"})
            );
            
            host.panel1.append((new linb.UI.Button)
                .setHost(host,"label6")
                .setLeft(11)
                .setTop(11)
                .setWidth(121)
                .setCaption("drag me")
                .onRender("__onRender")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"Div10")
                .setLeft(312)
                .setTop(272)
                .setWidth(168)
                .setHeight(24)
                .setHtml("Tabs")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"Panel1")
                .setLeft(624)
                .setTop(40)
                .setWidth(152)
                .setHeight(464)
                .setDropKeys("iAny")
                .setCustomStyle({"KEY":"border:solid 1px;"})
            );
            
            host.Panel1.append((new linb.UI.Layout)
                .setHost(host,"Layout2")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":60, "min":50, "max":200, "cmd":true, "folded":false}, {"id":"main", "min":10}, {"id":"after", "pos":"after", "locked":false, "size":60, "min":50, "max":200, "cmd":true, "folded":false}])
                .setLeft(0)
                .setTop(0)
                .setDropKeys("iAny")
                .onDrop("__ondrop")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"Div6")
                .setLeft(616)
                .setTop(8)
                .setWidth(168)
                .setHeight(24)
                .setHtml("Layout")
            );
            
            append((new linb.UI.Group)
                .setHost(host,"Group1")
                .setLeft(24)
                .setTop(160)
                .setWidth(256)
                .setCaption("Group1")
                .setDropKeys("iAny")
                .onDrop("__ondrop")
            );
            
            append((new linb.UI.Tabs)
                .setHost(host,"Tabs1")
                .setItems([{"id":"view1", "caption":"view1"}, {"id":"view2", "caption":"view2"}, {"id":"view3", "caption":"view3"}, {"id":"view4", "caption":"view4"}])
                .setDock("none")
                .setLeft(312)
                .setTop(296)
                .setWidth(256)
                .setDropKeys("iAny")
                .setValue("view1")
                .onDrop("__ondrop")
            );
            
            append((new linb.UI.Stacks)
                .setHost(host,"Stacks1")
                .setItems([{"id":"view1", "caption":"view1"}, {"id":"view2", "caption":"view2"}, {"id":"view3", "caption":"view3"}, {"id":"view4", "caption":"view4"}])
                .setDock("none")
                .setLeft(24)
                .setTop(296)
                .setWidth(256)
                .setDropKeys("iAny")
                .setValue("view2")
                .onDrop("__ondrop")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"Div7")
                .setLeft(312)
                .setTop(144)
                .setWidth(168)
                .setHeight(24)
                .setHtml("Block")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"Div8")
                .setLeft(24)
                .setTop(136)
                .setWidth(168)
                .setHeight(24)
                .setHtml("Group")
            );
            
            append((new linb.UI.Block)
                .setHost(host,"Block1")
                .setLeft(312)
                .setTop(170)
                .setWidth(256)
                .setHeight(88)
                .setBorder(true)
                .setDropKeys("iAny")
                .onDrop("__ondrop")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        __ondrop:function (profile, e, node, key, data, item) {
            var dd = linb.DragDrop.getProfile(), data = dd.dragData;
            if(data){
                var label=linb.getObject(data);
                profile.boxing().append(label.boxing(), item?item.id:'');
            }
        }, 
        __onRender:function (profile) {
            profile.boxing().draggable('iAny',profile.$linbid,null,{shadowFrom:profile.getRoot()});
        }
    }
});