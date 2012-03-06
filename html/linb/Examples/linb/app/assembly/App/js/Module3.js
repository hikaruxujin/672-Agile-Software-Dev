Class('App.Module3', 'linb.Com',{
    Instance:{
        customAppend:function(){
            this.dialog.show();
        }, 
        iniResource:function(com, threadid){
            var ns=this;
            linb.absIO.groupCall({data:linb.Ajax('App/js/data.js','',function(txt){
                ns.$cap=txt;
            })},null,function(threadid){
                linb.log('thread id: '+threadid, 'to get Datasource in Module3.js');
                linb.Thread(threadid).insert(1000);
            },function(threadid){
                linb.log('thread id: '+threadid, 'Datasource is ready in Module3.js');
                linb.Thread(threadid).insert(1000);
            },threadid);
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(480)
                .setTop(160)
                .setHeight(200)
                .setCaption("dialog in Module3")
            );
            
            host.dialog.append((new linb.UI.Pane)
                .setHost(host,"panelMain")
                .setLeft(20)
                .setTop(30)
                .setWidth(220)
                .setHeight(80)
            );
            
            host.panelMain.append((new linb.UI.Div)
                .setHost(host,"div37")
                .setLeft(30)
                .setTop(10)
                .setHeight(20)
                .setHtml("UI in Module3")
            );
            
            host.panelMain.append((new linb.UI.Button)
                .setHost(host,"button22")
                .setLeft(20)
                .setTop(40)
                .setWidth(180)
                .setCaption("button in Module3")
                .onClick("_button22_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _button22_onclick:function (profile, e, value) {
            alert("I'm in Module3");
        }, 
        _beforecreated:function (com, threadid) {
            linb.log('thread id: '+threadid, 'Module3.js is loaded');
            linb.Thread(threadid).insert(1000);
        }, 
        events:{"onCreated":"_beforecreated", "onReady":"_onready"}, 
        _onready:function (com, threadid) {
            com.dialog.setCaption(com.$cap);
            
            linb.log('thread id: '+threadid, 'Module3.js is ready');
            linb.Thread(threadid).insert(1000);
        }
    }
});