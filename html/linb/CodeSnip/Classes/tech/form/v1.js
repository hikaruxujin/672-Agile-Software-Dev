Class('App.tech_form_v1', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new linb.UI.Input)
                .setHost(host,"input2")
                .setLeft(210)
                .setTop(70)
                .setWidth(260)
                .setValueFormat("^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)")
                .setTips("Input number please")
                .setTipsErr(": (")
                .setTipsOK(": )")
            );

            append((new linb.UI.Div)
                .setHost(host,"div12")
                .setLeft(170)
                .setTop(30)
                .setWidth(300)
                .setHeight(20)
                .setHtml("Format Validator (example : only number)")
            );

            append((new linb.UI.Div)
                .setHost(host,"div13")
                .setLeft(60)
                .setTop(70)
                .setWidth(130)
                .setHeight(20)
                .setHtml("Using ValueFormat")
            );

            append((new linb.UI.Input)
                .setHost(host,"input9")
                .setLeft(210)
                .setTop(110)
                .setWidth(260)
                .setTips("Input number please")
                .setTipsErr(": (")
                .setTipsOK(": )")
                .beforeFormatCheck("_input9_beforeFormatCheck")
            );

            append((new linb.UI.Div)
                .setHost(host,"div18")
                .setLeft(60)
                .setTop(110)
                .setWidth(130)
                .setHeight(20)
                .setHtml("Using beforeFormatCheck")
            );

            return children;
            // ]]code created by jsLinb UI Builder
        },
        _input9_beforeFormatCheck:function (profile, value) {
            return /^-?(\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/.test(value||"");
        }
    }
});