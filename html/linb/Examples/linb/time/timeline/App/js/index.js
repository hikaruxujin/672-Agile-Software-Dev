
Class('App', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Button)
                .setHost(host,"button3")
                .setLeft(310)
                .setTop(30)
                .setWidth(140)
                .setCaption("drag me to calendar")
                .setImage("img/task.gif")
                .onRender("_button3_aftercreated")
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"pane55")
                .setDock("center")
                .setLeft(40)
                .setTop(60)
                .setWidth(798)
                .setHeight(480)
            );
            
            host.pane55.append((new linb.UI.Tabs)
                .setHost(host,"tabs12")
                .setItems([{"id":"timeline", "caption":"TimeLine"}, {"id":"calendar", "caption":"Calendar"}])
                .setLeft(0)
                .setTop(0)
                .setValue("timeline")
            );
            
            host.tabs12.append((new linb.UI.Calendar)
                .setHost(host,"calendar1")
                .setLeft(10)
                .setTop(40)
                .setDropKeys("iEvent")
                .onDrop("_calendar1_ondrop")
            , 'calendar');
            
            host.tabs12.append((new linb.UI.TimeLine)
                .setHost(host,"timeline1")
                .setDock("fill")
                .setLeft(70)
                .setTop(120)
                .setUnitPixs(30)
                .setIncrement(30)
                .setTimeSpanKey("2 h")
                .setMultiTasks(true)
                .setDropKeys("iEvent")
                .setWidth(796)
                .beforeNewTask("_timeline1_beforeNewTask")
            , 'timeline');
            
            append((new linb.UI.Button)
                .setHost(host,"button13")
                .setLeft(470)
                .setTop(30)
                .setWidth(140)
                .setCaption("drag me to calendar")
                .setImage("img/task2.gif")
                .onRender("_button4_aftercreated")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _button3_aftercreated:function (profile) {
            profile.boxing().draggable('iEvent','task');
        }, 
        _button4_aftercreated:function (profile) {
            profile.boxing().draggable('iEvent','task2');
        }, 
        _calendar1_ondrop:function (profile, e, node, key, data, item) {
            var subId=profile.getSubId(node),
                d=profile.boxing().getDateFrom()
                d2=linb.Date.add(d,'d',parseInt(subId));
            if(data && data.profile)
                profile.getSubNode('DC',subId).append(data.profile.boxing());
            else{
                var img=new linb.UI.Image({
                    position:'relative',
                    src:'img/'+data+'.gif',
                    dragKey:'iEvent',
                    tips:'tips'
                }).setCustomClass('KEY','linb-task');
                profile.getSubNode('DC',subId).append(img);
            }
        }, 
        _onready:function () {
            linb.CSS.addStyleSheet(".linb-task{padding:1px;vertical-align:middle;}.linb-task-mouseover{padding:0;border:solid 1px #ccc;",'linb-task');
        }, 
        events:{"onReady":"_onready"}, 
        _timeline1_beforeNewTask:function (profile, task) {
            var o=task;
            if(linb.Date.diff(new Date(o.from), new Date(o.to),  'h')<3)
                o.to=linb.Date.add(new Date(o.from),'h',6).getTime();
            o.renderer=function(){return (o._dropData?"<img class='linb-task' src='img/"+o._dropData+".gif'>":"")+o.caption;}
        }
    }
});