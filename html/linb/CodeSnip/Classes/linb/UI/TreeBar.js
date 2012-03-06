Class('App.linb_UI_TreeBar', 'linb.Com',{
    Instance:{
        _treebar1_onitemselected:function (profile, item, src) {
            var value=profile.boxing().getUIValue();
            //for selMode='none'
            if(!value)value=item.id;
            linb.message(value + ' selected');
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Block)
                .setHost(host,"block1")
                .setLeft(410)
                .setTop(20)
                .setWidth(250)
                .setHeight(140)
                .setBorder(true)
                .setResizer(true)
            );
            
            host.block1.append((new linb.UI.TreeBar)
                .setHost(host,"treebar2")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setGroup(true)
                .onItemSelected("_treebar1_onitemselected")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"panel2")
                .setLeft(70)
                .setTop(180)
                .setWidth(250)
                .setHeight(140)
            );
            
            host.panel2.append((new linb.UI.TreeBar)
                .setHost(host,"treebar3")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}, {"id":"d", "caption":"itemd", "tips":"item d", "group":true, "iniFold":true, "sub":[{"id":"da", "caption":"suba"}, {"id":"db", "caption":"subb"}, {"id":"dc", "caption":"subc"}]}])
                .setTabindex("5")
                .setIniFold(false)
                .onItemSelected("_treebar1_onitemselected")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"panel3")
                .setLeft(70)
                .setTop(370)
                .setWidth(250)
            );
            
            host.panel3.append((new linb.UI.TreeBar)
                .setHost(host,"treebar5")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .onItemSelected("_treebar1_onitemselected")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"panel1")
                .setLeft(70)
                .setTop(20)
                .setWidth(250)
                .setHeight(140)
            );
            
            host.panel1.append((new linb.UI.TreeBar)
                .setHost(host,"treebar1")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setSelMode("none")
                .onItemSelected("_treebar1_onitemselected")
            );
            
            append((new linb.UI.Block)
                .setHost(host,"block2")
                .setLeft(410)
                .setTop(180)
                .setWidth(250)
                .setHeight(140)
                .setBorder(true)
                .setResizer(true)
            );
            
            host.block2.append((new linb.UI.TreeBar)
                .setHost(host,"treebar4")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setSelMode("multi")
                .onItemSelected("_treebar1_onitemselected")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});