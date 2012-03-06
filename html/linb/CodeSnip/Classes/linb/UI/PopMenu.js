Class('App.linb_UI_PopMenu', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.PopMenu)
                .setHost(host,"popmenu1")
                .setItems([
                    {"id":"itema", "caption":"itema", "tips":"item a"}, 
                    {"type":"split"}, 
                    {"id":"itemb", "type":"checkbox", value:true,"caption":"itemb", "tips":"item b"}, 
                    {"id":"itemc", "caption":"itemc", "type":"checkbox", "tips":"item c"}, 
                    {"id":"itemd", "caption":"itemd", "tips":"item d"},
                    {"id":"iteme", "type":"radiobox", value:true,"caption":"iteme", "tips":"item e"}, 
                    {"id":"itemf", "caption":"itemf", "type":"radiobox", "tips":"item f"}
                ])
                .setShadow(false)
                .onMenuSelected("_popmenu1_onmenuselected")
            );
            
            append((new linb.UI.PopMenu)
                .setHost(host,"popmenu2")
                .setItems([{"id":"itema", "caption":"itema", "tips":"item a"}, {"id":"itemb", "caption":"itemb", "tips":"item b", "sub":[{"id":"itema1", "caption":"itema", "tips":"item a"}, {"id":"itemb1", "caption":"itemb", "tips":"item b", "sub":[{"id":"itemc11", "caption":"itemc", "tips":"item c"}, {"id":"itemd11", "caption":"itemd", "tips":"item d"}]}, {"id":"itemc1", "caption":"itemc", "tips":"item c"}, {"id":"itemd1", "caption":"itemd", "tips":"item d", "sub":[{"id":"itemc11", "caption":"itemc", "tips":"item c"}, {"id":"itemd11", "caption":"itemd", "tips":"item d"}]}]}, {"id":"itemc", "caption":"itemc", "tips":"item c"}, {"id":"itemd", "caption":"itemd", "tips":"item d"}, {"id":"iteme", "caption":"iteme"}, {"id":"itemf", "caption":"itemf"}, {"id":"itemg", "caption":"itemg"}, {"id":"itemh", "caption":"itemh"}, {"id":"itemi", "caption":"itemi"}, {"id":"itemj", "caption":"itemj"}, {"id":"itemk", "caption":"itemk"}, {"id":"iteml", "caption":"iteml"}, {"id":"itemm", "caption":"itemm"}, {"id":"itemn", "caption":"itemn"}, {"id":"itemo", "caption":"itemo"}, {"id":"itemp", "caption":"itemp"}])
                .onMenuSelected("_popmenu2_onmenuselected")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button2")
                .setLeft(212)
                .setTop(30)
                .setCaption("button1")
                .onClick("_button2_onclick")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button1")
                .setLeft(60)
                .setTop(30)
                .setCaption("button1")
                .onClick("_button1_onclick")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button3")
                .setLeft(440)
                .setTop(30)
                .setCaption("button3")
                .onClick("_button3_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _button1_onclick:function (profile, e, value) {
            this.popmenu1.pop(profile.getRoot());
            this.popmenu1.$target = profile;
        }, 
        _popmenu1_onmenuselected:function (profile,  item, src) {
            this.popmenu1.$target.boxing().setCaption(item.id);
            linb.message(item.id+' clicked');
        }, 
        _button2_onclick:function (profile, e, value) {
            this.popmenu1.pop(profile.getRoot(),2);
            this.popmenu1.$target = profile;
        }, 
        _button3_onclick:function (profile, e, value) {
            this.popmenu2.pop(profile.getRoot(),3);
            this.popmenu2.$target = profile;
        }, 
        _popmenu2_onmenuselected:function (profile,  item, src) {
            this.popmenu2.$target.boxing().setCaption(item.id);
            linb.message(item.id+' clicked');
        }
    }
});