Class('App.linb_UI_CheckBox', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Group)
                .setHost(host,"group2")
                .setLeft(50)
                .setTop(110)
                .setWidth(330)
                .setHeight(310)
                .setCaption("linb.UI.CheckBox")
                .setToggleBtn(false)
            );
            
            host.group2.append((new linb.UI.CheckBox)
                .setHost(host,"checkbox5")
                .setLeft(30)
                .setTop(50)
                .setWidth(250)
                .setHeight(30)
                .setCaption("a advanced checkbox with image")
                .setImage("img/demo.gif")
            );
            
            host.group2.append((new linb.UI.CheckBox)
                .setHost(host,"checkbox4")
                .setLeft(30)
                .setTop(90)
                .setWidth(250)
                .setHeight(30)
                .setShadow(true)
                .setResizer(true)
                .setCaption("a advanced checkbox with shadow")
            );
            
            host.group2.append((new linb.UI.CheckBox)
                .setHost(host,"checkbox6")
                .setLeft(30)
                .setTop(210)
                .setWidth(250)
                .setHeight(30)
                .setCaption("Check me to check all")
                .afterUIValueSet("_checkbox_aftervalueupdated")
            );
            
            host.group2.append((new linb.UI.CheckBox)
                .setHost(host,"checkbox1")
                .setLeft(30)
                .setTop(180)
                .setWidth(250)
                .setCaption("Cant check me")
                .beforeUIValueSet("_checkbox1_beforeuivalueset")
            );
            
            host.group2.append((new linb.UI.CheckBox)
                .setHost(host,"checkbox3")
                .setLeft(30)
                .setTop(140)
                .setWidth(250)
                .setHeight(27)
                .setBorder(true)
                .setResizer(true)
                .setCaption("Right Alignment")
                .setHAlign("right")
            );
            
            host.group2.append((new linb.UI.CheckBox)
                .setHost(host,"checkbox2")
                .setLeft(30)
                .setTop(10)
                .setWidth(250)
                .setHeight(27)
                .setBorder(true)
                .setCaption("a advanced checkbox with border")
            );
            
            append((new linb.UI.Group)
                .setHost(host,"group1")
                .setLeft(50)
                .setTop(20)
                .setWidth(330)
                .setHeight(70)
                .setCaption("linb.UI.SCheckBox (recommended)")
                .setToggleBtn(false)
            );
            
            host.group1.append((new linb.UI.SCheckBox)
                .setHost(host,"scheckbox1")
                .setLeft(30)
                .setTop(20)
                .setCaption("a simple checkbox ")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _checkbox_aftervalueupdated:function (profile, oldValue, newValue) {
            linb.UI.CheckBox.getAll().setUIValue(newValue);
        }, 
        _checkbox1_beforeuivalueset:function (profile, oldValue, newValue) {
            return false;
        }
    }
});