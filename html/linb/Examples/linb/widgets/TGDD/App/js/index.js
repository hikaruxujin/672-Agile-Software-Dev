
Class('App', 'linb.Com',{
    Instance:{
        events:{onReady:'_onready'}, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
append((new linb.UI.TreeGrid)
                .setHost(host,"tg1")
                .setRowNumbered(true)
                .setEditable(true)
                .setAnimCollapse(true)
                .setHeader([])
                .setRows([])
                .setColMovable(true)
                .setColHidable(true)
                .setDropKeys("abc")
                .setDragKey("abc")
                .beforeComboPop("_tg1_beforeComboPop")
                .onClickCell("_tg1_onClickcell")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _tg1_onClickcell:function(profile, cell){
            linb.message(cell._row.id+'/'+cell._col.id+' clicked!');
        },
        _tg1_beforeComboPop:function(profile, cell, proEditor){
            switch(profile.box.getCellPro(profile, cell, 'type')){
                case 'getter':
                    proEditor.boxing().setUIValue(_());
                return false;
                case 'cmdbox':
                case 'popbox':
                    linb.message(cell._row.id+'/'+cell._col.id+' button clicked!');
                return false;
            }
        },
        iniResource:function (com, threadid) {
            linb.Ajax('App/js/grid1.js',"",function(rsp){
                com._data=rsp;
            },function(){},threadid).start();
        }, 
        _onready:function (com, threadid) {
            linb.UI.cacheData('demo',[{id:'a',caption:'cap a',image:'img/img.gif'},{id:'b',caption:'cap b',image:'img/img.gif',imagePos:'left -16px'},{id:'c',caption:'cap c',image:'img/img.gif',imagePos:'left -32px'}]);

            SPA=this;
            var hash=com._data;
            SPA.tg1.setHeader(hash.header)
               .setRows(hash.rows);
        }
    }
});