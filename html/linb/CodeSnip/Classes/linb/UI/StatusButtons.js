 Class('App.linb_UI_StatusButtons', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.StatusButtons)
                .setHost(host,"linklist1")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setLeft(40)
                .setTop(40)
                .setWidth(250)
                .setHeight(50)
            );
            
            append(
                (new linb.UI.StatusButtons)
                .setHost(host,"linklist2")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setLeft(40)
                .setTop(90)
                .setWidth(250)
                .setHeight(50)
                .setItemMargin("4px")
                .setSelMode('multi')
                .setItemLinker("none")
                .onItemSelected("_linklist2_sel")
            );
            
            append(
                (new linb.UI.StatusButtons)
                .setHost(host,"ctl_statusbuttons5")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "itemLinker":"right"}, {"id":"b", "caption":"itemb", "tips":"item b", "itemLinker":"none","itemMargin":"0 2px 0 0 "}, {"id":"c", "caption":"itemc", "tips":"item c", "itemLinker":"none","itemMargin":"0 0 0 2px"}, {"id":"d", "caption":"itemd", "tips":"item d"}])
                .setLeft(40)
                .setTop(140)
                .setWidth(250)
                .setHeight(50)
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _linklist2_sel:function (profile, item) {
            linb.message(item.id);
        }
    }
});