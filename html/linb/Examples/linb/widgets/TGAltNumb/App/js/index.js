Class('App', 'linb.Com',{
    Instance:{
        events:{"onReady":"_onready"}, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Panel)
                .setHost(host,"panel4")
                .setDock("none")
                .setLeft(120)
                .setTop(70)
                .setWidth(540)
                .setHeight(370)
                .setZIndex(1)
                .setCaption("row number and alt row background color")
            );
            
            host.panel4.append((new linb.UI.TreeGrid)
                .setHost(host,"treegrid")
                .setAltRowsBg(true)
                .setRowNumbered(true)
                .setRowResizer(false)
                .setColHidable(true)
                .setColMovable(true)
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _onready:function (com, threadid) {
            this.treegrid
            .setHeader(['col1','col2','col3','col4'])
            .setRows([
                {cells:['11','12','13','14'], sub:[
                    ['11-1','12-1','13-1','14-1'],
                    {cells:['11-2','12-2','13-2','14-2'],
                        sub:[
                            ['11-11','12-11','13-11','14-11'],
                            ['11-21','12-21','13-21','14-21'],
                            ['11-31','12-31','13-31','14-31']
                        ]
                    }
                 ]},
                 {cells:['21','22','23','24'],sub:[
                    ['21-1','22-1','23-1','24-1'],
                    {cells:['21-2','22-2','23-2','24-2'],
                        sub:[
                            ['21-11','22-11','23-11','24-11'],
                            ['21-21','22-21','23-21','24-21']
                        ]
                    }
                ]},
                ['31','32','33','34'],
                ['41','42','43','44']
             ]);
        }
    }
});