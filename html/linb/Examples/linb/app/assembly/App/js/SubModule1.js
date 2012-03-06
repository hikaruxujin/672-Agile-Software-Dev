Class('App.SubModule1', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Pane)
                .setHost(host,"panelMain")
                .setLeft(60)
                .setTop(50)
                .setWidth(160)
                .setHeight(70)
            );
            
            host.panelMain.append((new linb.UI.Div)
                .setHost(host,"div37")
                .setLeft(10)
                .setTop(10)
                .setHeight(20)
                .setHtml("UI in SubModule1")
            );
            
            host.panelMain.append((new linb.UI.Button)
                .setHost(host,"button22")
                .setLeft(10)
                .setTop(40)
                .setWidth(140)
                .setCaption("button in SubModule1")
                .onClick("_button22_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _button22_onclick:function (profile, e, value) {
            alert("I'm in SubModule1");
        }, 
        _beforecreated:function (com, threadid) {
            linb.log('thread id: '+threadid, 'SubModule1.js is loaded');
            linb.Thread(threadid).insert(1000);
        }, 
        events:{"onCreated":"_beforecreated", "onReady":"_onready"}, 
        iniExComs:function(com, threadid){
            //use newCom
            linb.ComFactory.newCom('App.Module3' ,function(){
                this.show(null,null,null,threadid);
            },threadid);
        },
        _onready:function (com, threadid) {
            linb.log('thread id: '+threadid, 'SubModule1.js is ready');
            linb.Thread(threadid).insert(1000);
        }
    }
});