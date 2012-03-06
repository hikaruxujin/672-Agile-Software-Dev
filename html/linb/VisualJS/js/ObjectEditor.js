Class('VisualJS.ObjectEditor', 'linb.Com',{
    Instance:{
        $PageEditor:null,
        activate:function(){
            this.$PageEditor.activate();
        },
        setValue:function(text){
            this.$PageEditor.setValue(text);
        },
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        },
        _btncancel_onclick:function(){
            this.setValue("");
            this.dialog.close();
        },
        _btnok_onclick:function(){
            var self=this,
                prop=self.properties,
                txt = self.$PageEditor.getValue();
            if(txt===false)return false;
            //check dirty
            if(prop.text != txt){
                //check first
                var result = VisualJS.CodeEditor.evalInSandbox(txt, true);
                if(result.ko){
                    linb.message(linb.getRes('VisualJS.JSEditor.codeerr', result.ko));
                    if(_.isNumb(result.line=parseInt(result.line)))
                        self.$PageEditor.selectLines(result.line,result.line+1);
                    return false;
                }
                //parse comments and code, check code in the process
                prop.result = VisualJS.ClassTool.parseSingleBlock(txt);

                if(false === prop.result){
                    linb.message(linb.getRes('VisualJS.classtool.err1'));
                    return false;
                }

                prop.object = _.unserialize(txt) || null;

                _.tryF(prop.onOK,[self],self.host);
            }
            self.setValue(prop.text = "");
            self.dialog.close();
        },
        customAppend:function(parent){
            var page=this,
                prop = page.properties,
                dlg=page.dialog;
            dlg.setCaption(prop.caption).setImage(prop.image).setImagePos(prop.imagePos);

            if(prop.fromRegion)
                dlg.setFromRegion(prop.fromRegion);

            if(!page.$PageEditor){
                var pe = new VisualJS.PageEditor;
                pe.setHost(page, "$PageEditor");
                page.panelMain.append(pe);
            }

            page.setValue(prop.text);

            dlg.showModal(parent);
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(70)
                .setTop(40)
                .setWidth(500)
                .setCaption("dialog")
                .setMinBtn(false)
                .setMaxBtn(false)
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append(
                (new linb.UI.Block)
                .setHost(host,"panelMain")
                .setDock("fill")
                .setBorderType("inset")
            );
            
            host.dialog.append(
                (new linb.UI.Pane)
                .setHost(host,"panelB")
                .setDock("bottom")
                .setHeight(35)
            );
            
            host.panelB.append(
                (new linb.UI.Pane)
                .setHost(host,"panelR")
                .setDock("right")
                .setWidth(284)
            );
            
            host.panelR.append(
                (new linb.UI.Button)
                .setHost(host,"btnCancel")
                .setLeft(64)
                .setTop(8)
                .setWidth(100)
                .setCaption("Cancel")
                .setImage("@CONF.img_app")
                .setImagePos("-16px -16px")
                .onClick("_btncancel_onclick")
            );
            
            host.panelR.append(
                (new linb.UI.Button)
                .setHost(host,"btnOK")
                .setLeft(176)
                .setTop(8)
                .setWidth(100)
                .setCaption("OK")
                .setImage("@CONF.img_app")
                .setImagePos("-64px -16px")
                .onClick("_btnok_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});