Class('App.tech_UI_cb', 'linb.Com',{
    Instance:{
        _button21_onclick:function (profile, e, value) {
            linb.message('click fired in normal onclick event')
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new linb.UI.Button)
                .setHost(host,"button21")
                .setLeft(110)
                .setTop(100)
                .setCaption("button21")
                .onClick("_button21_onclick")
            );

            append((new linb.UI.Button)
                .setHost(host,"button24")
                .setLeft(270)
                .setTop(100)
                .setCaption("button21")
                .onClick("_button21_onclick")
                .setCustomBehavior({"onClick":function () {
                linb.message("click fired in Custom Behaviors");
            }})
            );

            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});