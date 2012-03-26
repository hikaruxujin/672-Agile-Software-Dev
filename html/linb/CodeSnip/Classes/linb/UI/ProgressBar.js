
Class('App.linb_UI_ProgressBar', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.ProgressBar)
                .setHost(host,"progressbar1")
                .setLeft(50)
                .setTop(100)
                .setCaptionTpl("{value}% finished")
            );
            
            append((new linb.UI.ProgressBar)
                .setHost(host,"progressbar2")
                .setLeft(50)
                .setTop(20)
                .setHeight(24)
                .setValue(60)
            );
            
            append((new linb.UI.ProgressBar)
                .setHost(host,"progressbar3")
                .setLeft(50)
                .setTop(160)
                .setHeight(20)
                .setBorder(true)
                .setShadow(true)
                .setResizer(true)
                .setFillBG("blue")
                .setValue(30)
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button21")
                .setLeft(370)
                .setTop(100)
                .setCaption("start")
                .onClick("_button21_onclick")
            );
            
            append((new linb.UI.ProgressBar)
                .setHost(host,"progressbar4")
                .setLeft(50)
                .setTop(70)
                .setCaptionTpl("")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button7")
                .setLeft(370)
                .setTop(70)
                .setCaption("start")
                .onClick("_button7_onclick")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button14")
                .setLeft(370)
                .setTop(160)
                .setCaption("start")
                .onClick("_button14_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _button21_onclick:function (profile, e, src, value) {
            this._process('progressbar1',300,10)
        }, 
        _process:function(alias, inteval, step){
            var ns=this;
            linb.Thread(null,[_.fun()],inteval,function(threadid){
                var pb=ns[alias],
                    value=pb.getValue();
                value+=step;
                if(value>=100)
                    value=100;
                pb.setValue(value, true);
                if(value==100)
                    linb.Thread.abort(threadid);
            },function(){
                ns[alias].setValue(0,true);
            },function(){
                ns[alias].setValue(0,true);
            },true).start();
        }, 
        _button7_onclick:function (profile, e, src, value) {
            this._process('progressbar4',100,5)
        }, 
        _button14_onclick:function (profile, e, src, value) {
            this._process('progressbar3',200,10)
        }
    }
});