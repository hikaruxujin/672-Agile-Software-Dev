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
                .setCaption("Group, Preview and Summery")
            );

            host.panel4.append((new linb.UI.TreeGrid)
                .setHost(host,"treegrid")
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
                {caption:'cap1',cells:['11','12','13','14'],summary:'summary',preview:'<h5>preview 1</h5><p>the preview message1 will displayed here</p>'},
                {caption:'cap2',cells:['21','22','23','24'],summary:'summary',preview:'<h5>preview 2</h5><p>the preview message2 will displayed here</p>'},
                {id:'grp1',
                    group:true,
                    caption:'group layer 1',
                    summary:'summary',
                    preview:'preview',
                    renderer : function(row){return "<span style='width:16px;height:16px;background:url(img/img.gif) left -32px;vertical-align:middle;'></span>"+row.caption},
                    sub:[
                        {caption:'cap3',cells:['11-11','12-11','13-11','14-11']},
                        {id:'grp2',group:true,caption:'group layer2',
                            sub:[
                                {caption:'cap31',cells:['21-11','22-11','23-11','24-11']},
                                {caption:'cap32',cells:['21-21','22-21','23-21','24-21']}
                            ]
                        },
                        ['11-21','12-21','13-21','14-21']
                    ]
                },
                {caption:'caption1', cells:['31','32','33','34'],sub:[{caption:'caption11',cells:['a','b','c','d']},{caption:'caption12',cells:['aa','bb','cc','dd']}]},
                {caption:'caption2', cells:['41','42','43','44']}
            ]);
        }
    }
});