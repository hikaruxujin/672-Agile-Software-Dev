Class('App.tech_UI_event', 'linb.Com',{
    Instance:{
        arr:[],
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new linb.UI.Input)
                .setHost(host,"input1")
                .setLeft(100)
                .setTop(40)
                .setWidth(278)
                .beforeValueSet("_traceEvent")
                .afterValueSet("_traceEvent")
                .beforeUIValueSet("_traceEvent")
                .afterUIValueSet("_traceEvent")
                .beforeHoverEffect("_traceEvent")
                .onRender("_traceEvent")
                .onLayout("_traceEvent")
                .onDestroy("_traceEvent")
                .onHotKeydown("_traceEvent")
                .onHotKeypress("_traceEvent")
                .onHotKeyup("_traceEvent")
                .onShowTips("_traceEvent")
                .onFocus("_traceEvent")
                .onBlur("_traceEvent")
                .beforeDirtyMark("_traceEvent")
                .beforeFormatCheck("_traceEvent")
                .beforeFormatMark("_traceEvent")
            );

            append((new linb.UI.Panel)
                .setHost(host,"panelbar2")
                .setDock("none")
                .setLeft(100)
                .setTop(70)
                .setWidth(278)
                .setHeight(298)
                .setZIndex(1)
                .setCaption("Event Tracer")
                .setCustomStyle({"KEY":"border:solid 1px #ccc"})
            );

            append((new linb.UI.Button)
                .setHost(host,"button3")
                .setLeft(100)
                .setTop(390)
                .setCaption("Clear")
                .setWidth(278)
                .onClick("_button3_onclick")
            );

            return children;
            // ]]code created by jsLinb UI Builder
        },
        _traceEvent:function(p) {
            var holder = this.panelbar2 && this.panelbar2.getSubNode('PANEL');
            if(holder && !holder.isEmpty()){
                if(this.arr.length){
                    _.arr.each(this.arr,function(o){
                        holder.prepend( linb.create('<p>'+o[0]+' -> ' + o[1] + '</p>'));
                    });
                    this.arr.length=0;
                }
                holder.prepend( linb.create('<p>' + (arguments[0].alias||"com") + " -> " + p.$lastEvent+ '</p>'));
            }else
                this.arr.push([p.alias||'com', p.$lastEvent]);
        },
        _button3_onclick:function (profile, e, value) {
             this.panelbar2.getSubNode('PANEL').empty();
        }, 
        events:{
            "beforeCreated":"_traceEvent",
            "onCreated":"_traceEvent", 
            "onLoadBaseClass":"_traceEvent", 
            "onLoadReqiredClass":"_traceEvent", 
            "onIniResource":"_traceEvent", 
            "beforeIniComponents":"_traceEvent", 
            "afterIniComponents":"_traceEvent", 
            "onLoadReqiredClass":"_traceEvent", 
            "onReady":"_traceEvent",
            "onRender":"_traceEvent"}
    }
});