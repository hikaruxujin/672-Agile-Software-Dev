
Class('App', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Div)
                .setHost(host,"div19")
                .setLeft(140)
                .setTop(210)
                .setWidth(80)
                .setHeight(20)
                .setHtml("Change skin")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"panel9")
                .setDomId("panelId")
                .setLeft(100)
                .setTop(60)
                .setWidth(190)
            );
            
            host.panel9.append((new linb.UI.Button)
                .setHost(host,"button5")
                .setDomId("buttonId")
                .setLeft(40)
                .setTop(40)
                .setCaption("button5")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button11")
                .setLeft(100)
                .setTop(260)
                .setCaption("clear style")
                .onClick("_button11_onclick")
            );
            
            append((new linb.UI.ComboInput)
                .setHost(host,"comboinput2")
                .setLeft(240)
                .setTop(210)
                .setType('listbox')
                .setItems([{"id":"default", "caption":"default skin"}, {"id":"a", "caption":"skin a"}, {"id":"b", "caption":"skin b"}])
                .setValue("default")
                .afterUIValueSet("_comboinput2_aftervalueupdated")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button4")
                .setLeft(240)
                .setTop(260)
                .setCaption("set rules manually")
                .onClick("_button4_onclick")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div10")
                .setDomId("unchanged")
                .setLeft(300)
                .setTop(110)
                .setWidth(60)
                .setHeight(50)
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _onready:function () {
            SPA=this;
            SPA.ChangeSkin('default');
        }, 
        ChangeSkin:function(skin){
            if(SPA.skinKey && !skin)
                linb.CSS.remove('title', SPA.skinKey);
            else
                linb.CSS.replaceLink(linb.getPath('App','css.css','css/'+skin+'/'), 'title', SPA.skinKey, SPA.skinKey = skin);
        }, 
        events:{"onReady":"_onready"}, 
        _comboinput2_aftervalueupdated:function (profile, oldValue, newValue) {
            SPA.ChangeSkin(newValue);
        }, 
        _button4_onclick:function () {
             linb.CSS.setStyleRules('.linb-div',{border:"solid 1px red"});
             linb.CSS.setStyleRules('#panelId',{border:"solid 3px red"});
        }, 
        _button11_onclick:function () {
            linb.CSS.setStyleRules('#panelId').setStyleRules('#buttonId .linb-button-caption');
        }
    }
});