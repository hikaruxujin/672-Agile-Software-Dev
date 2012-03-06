Class('App', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.Panel)
                .setHost(host,"ctl_panel3")
                .setDock("none")
                .setLeft(70)
                .setTop(50)
                .setWidth(650)
                .setHeight(350)
                .setZIndex(1)
                .setCaption("Grid Editor")
            );
            
            host.ctl_panel3.append(
                (new linb.UI.ButtonViews)
                .setHost(host,"ctl_buttonviews1")
                .setItems([{"id":"pop", "caption":"With a dialog"}, {"id":"inline", "caption":"Inline"}, {"id":"inline2", "caption":"Inline 2"}])
                .setBarSize(28)
                .setValue("inline")
                .onChange("_ctl_buttonviews1_onchange")
            );
            
            host.ctl_buttonviews1.append(
                (new linb.UI.TreeGrid)
                .setHost(host,"treegrid")
                .setCurrencyTpl("$ *")
                .setRowNumbered(true)
                .setEditable(true)
                .setHeader([{"id":"label", "type":"label", "width":80, "caption":"label"}, {"id":"input", "type":"input", "width":80, "caption":"input"}, {"id":"number", "type":"number", "width":80, "caption":"number"}, {"id":"currency", "type":"currency", "width":80, "caption":"currency"}])
                .setRows([{"cells":[{"value":"label1", "id":"c_a", "oValue":"label1"}, {"value":"input1", "id":"c_b", "oValue":"input1"}, {"value":100, "id":"c_c", "oValue":100}, {"value":100, "id":"c_d", "oValue":100}], "id":"a"}, {"cells":[{"value":"label2", "id":"c_e", "oValue":"label2"}, {"value":"input2", "id":"c_f", "oValue":"input2"}, {"value":200, "id":"c_g", "oValue":200}, {"value":200, "id":"c_h", "oValue":200}], "id":"b"}, {"cells":[{"value":"label3", "id":"c_i", "oValue":"label3"}, {"value":"input3", "id":"c_j", "oValue":"input3"}, {"value":300, "id":"c_k", "oValue":300}, {"value":300, "id":"c_l", "oValue":300}], "id":"c"}])
                .setRowHandlerWidth(16)
                .setTreeMode(false)
                .setHotRowMode('auto')
                .onInitHotRow("_onInitHotRow")
                .beforeHotRowAdded("_beforeHotRowAdded")
                .afterHotRowAdded("_afterHotRowAdded")
            , 'inline');
            
            
            host.ctl_buttonviews1.append(
                (new linb.UI.TreeGrid)
                .setHost(host,"treegrid2")
                .setCurrencyTpl("$ *")
                .setRowNumbered(true)
                .setEditable(true)
                .setHeader([{"id":"label", "type":"label", "width":80, "caption":"label"}, {"id":"input", "type":"input", "width":80, "caption":"input"}, {"id":"number", "type":"number", "width":80, "caption":"number"}, {"id":"currency", "type":"currency", "width":80, "caption":"currency"}])
                .setRows([{"cells":[{"value":"label1", "id":"c_a", "oValue":"label1"}, {"value":"input1", "id":"c_b", "oValue":"input1"}, {"value":100, "id":"c_c", "oValue":100}, {"value":100, "id":"c_d", "oValue":100}], "id":"a"}, {"cells":[{"value":"label2", "id":"c_e", "oValue":"label2"}, {"value":"input2", "id":"c_f", "oValue":"input2"}, {"value":200, "id":"c_g", "oValue":200}, {"value":200, "id":"c_h", "oValue":200}], "id":"b"}, {"cells":[{"value":"label3", "id":"c_i", "oValue":"label3"}, {"value":"input3", "id":"c_j", "oValue":"input3"}, {"value":300, "id":"c_k", "oValue":300}, {"value":300, "id":"c_l", "oValue":300}], "id":"c"}])
                .setRowHandlerWidth(16)
                .setTreeMode(false)
                .setHotRowMode('show')
                .onInitHotRow("_onInitHotRow")
                .beforeHotRowAdded("_beforeHotRowAdded2")
                .afterHotRowAdded("_afterHotRowAdded")
            , 'inline2');
                        
            
            host.ctl_buttonviews1.append(
                (new linb.UI.TreeGrid)
                .setHost(host,"tg")
                .setTabindex("4")
                .onDblclickRow("_tg_ondblclickrow")
            , 'pop');
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _changeRow:function(v1,v2,v3){
            var cells=this._activeRow.cells;
            if(cells[0]!=v1)
                this.tg.updateCell(cells[0],{value:v1});
            if(cells[1]!=v2)
                this.tg.updateCell(cells[1],{value:v2});
            if(cells[2]!=v3){
                this.tg.updateCell(cells[2],{value:v3});
            }
        }, 
        _tg_ondblclickrow:function (p,row, e, src) {
            this._activeRow = row;
            var self=this;
            linb.ComFactory.newCom('App.Dlg' ,function(){
                this.$parent=self;
                this
                    .setProperties({
                        fromRegion:linb.use(src).cssRegion(true),
                        col1:row.cells[0].value,
                        col2:row.cells[1].value,
                        col3:row.cells[2].value
                    })
                    .setEvents('onOK', self._changeRow);
                this.show(linb([document.body]));
            });
        }, 
        events:{
            onReady:'_onready'
        }, 
        _onready:function(){
            var self=this;
            linb.Ajax("data/data.js",'',function(s){
                var hash=s;
                self.tg.setHeader(hash.header).setRows(hash.rows);
            }).start();
        },
        _onInitHotRow:function(profile){
            return ['label','input',0,0];
        },
        // check new row
        _beforeHotRowAdded:function(profile, row, leaveGrid){
            var cells=row.cells;
            if(cells[3].value<=0){
                linb.message("Cancelled! The last row's 4th cell must be greater than 0");
                if(leaveGrid){
                    return false;
                }else{
                    return cells[3];
                }
            }
            return true;
        },
        _beforeHotRowAdded2:function(profile, row, leaveGrid){
            var cells=row.cells;
            if(cells[3].value<=0){
                linb.message("Cancelled! The last row's 4th cell must be greater than 0");
                return null;
            }
            return true;
        },
        _afterHotRowAdded:function(){
                linb.message("New row added!");
        },
        _ctl_buttonviews1_onchange : function (profile, oldValue, newValue) {
            if(newValue=='inline')
                linb.message("Using up/down keyboard to add rows");
            else
                linb.message("Double click a row to pop the dialog");
        }
    }
});