Class('App.linb_UI_Stacks', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Stacks)
                .setHost(host,"Stacks1")
                .setItems([{"id":"view1", "caption":"view1", "closeBtn":true, "popBtn":true, "optBtn":true}, {"id":"view2", "caption":"view2", "closeBtn":true, "optBtn":true}, {"id":"view3", "caption":"view3", "closeBtn":true, "optBtn":true}])
                .setLeft(0)
                .setTop(0)
                .setValue("view2")
                .afterPageClose("_stacks1_afterpageclose")
                .onShowOptions("_stacks1_onshowoptions")
                .onItemSelected("_stacks1_onitemselected")
            );
            
            host.Stacks1.append((new linb.UI.Button)
                .setHost(host,"Button1")
                .setLeft(240)
                .setTop(20)
                .setCaption("Button1")
            , 'view1');
            
            host.Stacks1.append((new linb.UI.Tabs)
                .setHost(host,"tabs6")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setLeft(0)
                .setTop(0)
            , 'view2');
            
            host.tabs6.append((new linb.UI.Stacks)
                .setHost(host,"stacks3")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setLeft(0)
                .setTop(0)
            , 'a');
            
            host.stacks3.append((new linb.UI.Tabs)
                .setHost(host,"tabs7")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a", "sub":[{"id":"aa", "caption":"suba"}, {"id":"ab", "caption":"subb"}]}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .setLeft(0)
                .setTop(0)
            , 'a');
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _stacks1_afterpageclose:function (profile, item) {
            linb.message('you just closed '+item.id);
        }, 
        _stacks1_onitemselected:function (profile, item, src) {
            linb.message('You just selected '+item.id)
        }, 
        _stacks1_onshowoptions:function (profile, item, e, src) {
            linb.message('onShowOptions : '+item.id)
        }
    }
});