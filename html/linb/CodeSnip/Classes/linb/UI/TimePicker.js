 Class('App.linb_UI_TimePicker', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host = this,
                children = [],
                append = function(child){
                    children.push(child.get(0))
                };
            
            append((new linb.UI.TimePicker)
                .setHost(host,"time1")
                .setLeft(100)
                .setTop(100)
                .setCloseBtn(false)
                .afterUIValueSet("_time1_aftervalueupdated")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div")
                .setLeft(100)
                .setTop(60)
                .setHeight(30)
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _time1_aftervalueupdated:function (profile, oldValue, newValue) {
            this.div.setHtml(newValue)
        }
    }
});