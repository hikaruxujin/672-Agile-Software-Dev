
Class('App.linb_UI_FoldingList', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.FoldingList)
                .setHost(host,"FoldingList1")
                .setItems([{"id":"a", "caption":"itema", "title":"item a", "text":"text1"}, {"id":"b", "caption":"itemb", "title":"item b", "text":"text2"}, {"id":"c", "caption":"itemc", "title":"item c", "text":"text3"}])
                .setLeft(50)
                .setTop(40)
                .setWidth(280)
                .setHeight(110)
                .setCmds([])
            );
            
            append((new linb.UI.FoldingList)
                .setHost(host,"foldinglist2")
                .setItems([{"id":"a", "caption":"itema", "title":"item a", "text":"text1",optBtn:true}, {"id":"b", "caption":"itemb", "title":"item b", "text":"text2"}, {"id":"c", "caption":"itemc", "title":"item c", "text":"text3"}])
                .setLeft(390)
                .setTop(40)
                .setWidth(280)
                .setHeight(110)
                .setCmds([{"id":"reply", "caption":"reply"}, {"id":"remove", "caption":"remove"}])
                .setActiveLast(true)
                .onClickButton("_foldinglist2_oncommand")
                .onShowOptions("_foldinglist2_onshowoptions")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _foldinglist2_onshowoptions:function (profile, item, e, src) {
            linb.message('options');
        }, 
        _foldinglist2_oncommand:function (profile, item, cmdkey, src) {
            linb.message(cmdkey+":"+item.id+" clicked!")
        }
    }
});