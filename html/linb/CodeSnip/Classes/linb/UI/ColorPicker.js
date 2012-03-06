Class('App.linb_UI_ColorPicker', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.ComboInput)
                .setHost(host,"comboinput3")
                .setLeft(30)
                .setTop(40)
                .setWidth(170)
                .setType("color")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
                .afterUIValueSet("_comboinput3_aftervalueupdated")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div10")
                .setLeft(270)
                .setTop(90)
                .setWidth(160)
                .setHeight(140)
            );
            
            append((new linb.UI.ColorPicker)
                .setHost(host,"color3")
                .setLeft(440)
                .setTop(30)
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _comboinput3_aftervalueupdated:function (profile, oldValue, newValue) {
            this.div10.getRoot().css('background', newValue);
        }
    }
});