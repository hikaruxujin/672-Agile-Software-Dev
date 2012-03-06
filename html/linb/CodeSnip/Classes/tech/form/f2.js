Class('App.tech_form_f2', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new linb.UI.Input)
                .setHost(host,"input2")
                .setLeft(210)
                .setTop(70)
                .setWidth(260)
                .setTips("Input please")
                .setTipsErr(": (")
                .setTipsOK(": )")
                .setTipsBinder("divB1")
                .setMask("(111) aaa-11%$1")
            );

            append((new linb.UI.Div)
                .setHost(host,"div13")
                .setLeft(60)
                .setTop(70)
                .setWidth(130)
                .setHeight(20)
                .setHtml("(111) aaa-11%$1")
            );

            append((new linb.UI.Div)
                .setHost(host,"divB1")
                .setLeft(490)
                .setTop(70)
                .setWidth(230)
                .setHeight(20)
            );

            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});