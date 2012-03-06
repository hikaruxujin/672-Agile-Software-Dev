Class('VisualJS.PageEditor', 'linb.Com',{
    Instance:{
        Initialize:function(){
            var ns=this;
            ns._ovalue="";
            ns._dirty=false;
        },
        // notice: use it before rendered
        setType:function(type){
            this.codeeditor.setCodeType(type);
        },
        activate:function(){
            this.codeeditor.activate();
        },
        getValue:function(){
            var ns=this;
            return ns._dirty ? (ns._ovalue = ns.codeeditor.getUIValue()) : ns._ovalue;
        },
        setValue:function(value){
            // adjust
            value=(value||'').replace(/\t/g, '    ').replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n");
            
            var ns=this;
            if(ns._ovalue!=value){
                ns._ovalue=value;
                ns._dirty=false;

                ns._codeeditor_onrender(null,false);
                
                if(ns.codeeditor)
                    ns.codeeditor.setValue(ns._ovalue);
            }
            return ns;
        },
        selectLines:function(line1, line2){
            this.codeeditor.selectLines(line1,line2);
        },
        iniComponents:function(com, threadid){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.ToolBar)
                .setHost(host,"toolbar4")
                .setItems([
                    {"id":"fun","sub":[
                            {"id":"searchreplace","caption":"$VisualJS.pageEditor.searchreplace","image":'@CONF.img_app',"imagePos":"-240px -48px","type":"button","tips":"$VisualJS.pageEditor.replacetips"},
                            {"id":"jumpto","caption":"$VisualJS.pageEditor.jumpto","image":'@CONF.img_app',"imagePos":"-160px -48px","type":"button","tips":"$VisualJS.pageEditor.jumptotips"},
                            {"id":"indentall","caption":"$VisualJS.pageEditor.indentall","image":'@CONF.img_app',"imagePos":"-224px -48px","type":"button","tips":"$VisualJS.pageEditor.indentalltips"},
                            {"id":"progress", "object":(new linb.UI.Image({src:'img/progress.gif'})).setHost(host,"imgProgress")}
                        ]
                    }
                ])
                .onClick("_toolbar_onclick")
            );

            append((new VisualJS.CodeEditor)
                .setHost(host,"codeeditor")
                .setDock("fill")
                .setValue(host._ovalue||"")
                .onValueChanged("_codeeditor_onChange")
                .onGetHelpInfo("_codeeditor_ongett")
                .onRendered("_codeeditor_onrender")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _codeeditor_onrender:function(profile, finished){
            var ns=this;
            if(!ns.codeeditor)return;

            var id=ns.KEY+":"+ns.$linbid+":progress";
            if(finished){
                _.resetRun(id);

                ns.toolbar4.setDisabled(false);
                ns.codeeditor.setReadonly(false);

                ns.imgProgress.setDisplay('none');
            }else{
                _.resetRun(id, function(){
                    ns.toolbar4.setDisabled(true);
                    ns.codeeditor.setReadonly(true);
                    ns.imgProgress.setDisplay('');
                });
            }
        },
        _codeeditor_ongett:function(profile,key){
            _.asyRun(function(){
                linb.Coder.applyById("doc:code",true);
            });
            return VisualJS.EditorTool.getDoc(key);
        },
        _codeeditor_onChange:function(profile){
           this._dirty=true;
           this.fireEvent("onValueChanged",[this, true]);
        },
        _toolbar_onclick: function(profile, item, grp, e, src){
            var ns=this,
                eidtor=this.codeeditor,
                pos=linb.use(src).offset();
            switch(item.id){
                case 'indentall':
                    VisualJS.EditorTool.indentAll(eidtor);
                break;
                case 'searchreplace':
                    VisualJS.EditorTool.showFindWnd(eidtor, pos);
                break;
                case 'jumpto':
                    VisualJS.EditorTool.showJumpToWnd(eidtor, pos);
                break;
                break;
            }
        }
    }
});