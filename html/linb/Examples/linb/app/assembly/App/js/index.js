
Class('App', 'linb.Com',{
    Instance:{
        events:{"onCreated":"_beforecreated", "onReady":"_onready"}, 
        _beforecreated:function (com, threadid) {
            SPA=this;
            linb.log('thread id: '+threadid,'index.js is loaded');
            
            linb.Thread(threadid).insert(1000);
        }, 
        iniExComs:function(com, threadid){
            //use getCom
            linb.ComFactory.getCom('module2',function(threadid){
                var ns=this;
                SPA.div2.append(ns.panelMain);
            },threadid);
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Tag)
                .setHost(host,"tag2")
                .setLeft(400)
                .setTop(20)
                .setWidth(268)
                .setHeight(188)
                .setTagKey("tag_module1")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div2")
                .setLeft(400)
                .setTop(230)
                .setWidth(268)
                .setHeight(188)
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _onready:function (com, threadid) {
            linb.log('thread id: '+threadid,'index.js is ready');
            linb.Thread(threadid).insert(1000);
        }
    }
});