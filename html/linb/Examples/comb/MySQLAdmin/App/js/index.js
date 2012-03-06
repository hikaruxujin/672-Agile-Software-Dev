
Class('App', 'linb.Com',{
    Instance:{
        _pageCount:20,

        events:{"onReady":"_onready"},
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.Layout)
                .setHost(host,"layout4")
                .setItems([{"id":"before", "pos":"before", "min":10, "size":200, "locked":false, "folded":false, "cmd":true, "hidden":false}, {"id":"main", "min":10}])
                .setType("horizontal")
            );
            
            host.layout4.append(
                (new linb.UI.Tabs)
                .setHost(host,"tabs")
                .setItems([{"id":"Start", "caption":"Start"}])
                .setValue("Start")
                .setCustomStyle({"PANEL":"overflow:hidden"})
            , 'main');
            
            host.tabs.append(
                (new linb.UI.Div)
                .setHost(host,"div44")
                .setLeft(10)
                .setTop(10)
                .setWidth(500)
                .setHeight(40)
                .setHtml("Select any entity in tree to view details")
            , 'Start');
            
            host.layout4.append(
                (new linb.UI.Panel)
                .setHost(host,"panel15")
                .setZIndex(1)
                .setCaption("Hierarchy")
            , 'before');
            
            host.panel15.append(
                (new linb.UI.TreeBar)
                .setHost(host,"treebar4")
                .setItems([{"id":"DftServer", "caption":"DftServer", "group":true, "tag":"link", "sub":true}])
                .setSelMode("none")
                .onGetContent("_treebar4_ongetcontent")
                .onItemSelected("_treebar4_onitemselected")
            );
            
            append(
                (new linb.UI.ToolBar)
                .setHost(host,"toolbar7")
                .setItems([{"id":"item a", "sub":[{"id":"add", "caption":"Add connection"}, {"id":"delete", "caption":"Delete connection"}, {"id":"query", "caption":"SQL query"}], "caption":"item a"}])
                .onClick("_toolbar7_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _onready:function (com, threadid) {
            SPA=this;
        },
        //to show message
        popMsg:function(msg){
            linb.UI.Dialog.pop(msg);
        },
        //to interact with server
        request:function(hash, callback, onStart, onEnd, file){
            _.tryF(onStart);
            linb.Thread.observableRun(function(threadid){
                var data={key:'DBProcess',para:hash}, options;
                if(file){
                    data.file=file;
                    options={method:'post'};
                }
                linb.request('request.php', data, function(rsp){
                    var obj=rsp;

                    if(obj){
                        if(!obj.error)
                            _.tryF(callback,[obj]);
                        else
                            SPA.popMsg(_.serialize(obj.error));
                    }else
                        SPA.popMsg(_.serialize(rsp));
                    _.tryF(onEnd);
                },function(rsp){
                    SPA.popMsg(_.serialize(rsp));
                    _.tryF(onEnd);
                }, threadid,options)
            });
        },
        _treebar4_ongetcontent:function (profile, item, callback) {
            if(item.tag=='link'){
                SPA.request({action:'listdbs'},function(rsp){
                    var arr=[];
                    _.arr.each(rsp.data,function(o){
                        arr.push({id:o[0],caption:o[0],group:true,sub:true,tag:'db'});
                    });
                    callback(arr);
                });
            }else if(item.tag=='db'){
                SPA.request({action:'listtables', dbname:item.id},function(rsp){
                    var arr=[];
                    _.arr.each(rsp.data,function(o){
                        arr.push({id:o[0],caption:o[0],group:true,tag:'table',_dbname:item.id});
                    });
                    callback(arr);
                });
            }
        },
        _treebar4_onitemselected:function (profile, item, src) {
            var tabs=SPA.tabs,id=item.id;
            if(!tabs.getItemByItemId(id)){
                tabs.insertItems([{id:id,caption:id,closeBtn:true}], null, false);
                linb.ComFactory.newCom('App.Table' ,function(){
                    var page=this;
                    page.onClose=function(){
                        tabs.removeItems([id]);
                    };
                    if(!page.tagVars || page.tagVars._dbname != item._dbname || page.tagVars._tablename!= item.id)
                        page.clear();

                    var tagVars = this.tagVars={
                        _dbname:item._dbname,
                        _tablename:item.id,
                        _page:1,
                        _count:SPA._pageCount
                    };
                    page.show(function(){
                        page.getList();
                    },tabs,id);
                });
            }
            tabs.fireItemClickEvent(item.id);
        },
        _toolbar7_onclick:function (profile, item, group, e, src) {
            linb.message('No implementation yet!')
        }
    }
});