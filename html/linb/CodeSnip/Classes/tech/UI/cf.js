Class('App.tech_UI_cf', 'linb.Com',{
    Instance:{
        _button21_onclick:function (profile, e, value) {
            if(profile.CF.click){
                _.tryF(profile.CF.click);
            }else
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
                .setCustomFunction({"click":function () {
                linb.message("click fired in Custom Functions");
            }})
            );

            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});