Class('App.linb_UI_Range', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host = this,
                children = [],
                append = function(child){
                    children.push(child.get(0))
                };
            
            append((new linb.UI.Range)
                .setHost(host,"range2")
                .setLeft(40)
                .setTop(144)
                .setUnit("%")
                .setSingleValue(true)
                .setValue("0:70")
            );
            
            append((new linb.UI.Range)
                .setHost(host,"range1")
                .setLeft(40)
                .setTop(40)
                .setMin(1000)
                .setMax(3000)
                .setValue("1000:2000")
                .setUnit("$")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});