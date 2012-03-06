 Class('App.linb_UI_DatePicker', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Div)
                .setHost(host,"div")
                .setLeft(100)
                .setTop(60)
                .setWidth(290)
                .setHeight(30)
            );
            
            append((new linb.UI.DatePicker)
                .setHost(host,"date1")
                .setLeft(100)
                .setTop(100)
                .setCloseBtn(false)
                .afterUIValueSet("_date1_aftervalueupdated")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _date1_aftervalueupdated:function (profile, oldValue, newValue) {
            this.div.setHtml(newValue)
        }
    }
});