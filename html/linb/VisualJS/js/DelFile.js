 Class('VisualJS.DelFile', 'linb.Com',{
    Instance:{
        customAppend:function(parent){
            var self=this,
                prop = self.properties,
                pp = prop.parent,
                dlg=self.dialog;
            if(prop.fromRegion)
                dlg.setFromRegion(prop.fromRegion);

            if(!dlg.get(0).renderId)
                dlg.render();

            self.treebar.resetValue();

            //asy
            dlg.show(parent, true);

            linb.request(CONF.phpPath,  {
                key:CONF.requestKey,
                para:{
                    action:'open',
                    hashCode:_.id(),
                    path:pp.curProject
                }
            } ,function(txt){
                var obj = txt;
                if(!obj || obj.error)
                    linb.message(_.get(obj,['error','message'])||'on response!');
                else{
                    var root=pp.buildFileItems(pp.curProject, obj.data);
                    self.treebar.setItems([root]).toggleNode(root.id, true);
                }
            });
        },
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(247)
                .setTop(120)
                .setWidth(433)
                .setHeight(220)
                .setResizer(false)
                .setCaption("$VisualJS.tool2.del")
                .setImage("@CONF.img_app")
                .setImagePos("-80px -16px")
                .setMinBtn(false)
                .setMaxBtn(false)
                .onHotKeydown("_dialog_onhotkey")
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append(
                (new linb.UI.Button)
                .setHost(host,"btnCancel")
                .setLeft(80)
                .setTop(150)
                .setWidth(90)
                .setCaption("$VisualJS.cancel")
                .setImage("@CONF.img_app")
                .setImagePos("-16px -16px")
                .onClick("_btncancel_onclick")
            );
            
            host.dialog.append(
                (new linb.UI.Button)
                .setHost(host,"btnOK")
                .setLeft(250)
                .setTop(150)
                .setWidth(90)
                .setCaption("$VisualJS.ok")
                .setImage("@CONF.img_app")
                .setImagePos("-64px -16px")
                .onClick("_btnok_onclick")
            );
            
            host.dialog.append(
                (new linb.UI.Group)
                .setHost(host,"panelbar2")
                .setDock("top")
                .setHeight(140)
                .setCaption("$VisualJS.delfile.sel")
                .setToggleBtn(false)
                .setCustomStyle({"PANEL":"overflow:auto"})
            );
            
            host.panelbar2.append(
                (new linb.UI.TreeBar)
                .setHost(host,"treebar")
                .setDock("none")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
                .setSelMode("multi")
                .beforeUIValueSet("_treebar_beforevalueupdated")
                .onGetContent("_treebar_ongetcontent")
                .onItemSelected("_treebar_onitemselected")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _btncancel_onclick:function (profile, e, value) {
            this.dialog.close();
        },
        _btnok_onclick:function (profile, e, value) {
            var s = this.treebar.getUIValue(), self=this;;
            if(!s){
                linb.message(linb.getRes('VisualJS.delfile.notarget'));
            }else{
                linb.UI.Dialog.confirm(linb.getRes('VisualJS.delfile.confirmdel'), linb.getRes('VisualJS.delfile.confirmdel2', s.split(';').length), function(){
                    _.tryF(self.properties.onOK, [s], self.host);
                    self.dialog.close();
                });
            }
        },
        _treebar_beforevalueupdated:function (profile, oldValue, newValue) {
            if(!newValue)return;
            var arr = newValue.split(';');
            arr.sort();
            _.filter(arr,function(o,j){
                for(var i=0,l=this.length;i<l;i++){
                    if(i==j)break;
                    if(_.str.startWith(this[j],this[i])){
                        linb.message("Upper node has been selected!");
                        return false;
                    }
                }
            });
            return arr.join(';');
        },
        _dialog_onhotkey:function(profile, key){
            if(key.key=='esc')
                profile.boxing().close();
        },
        _treebar_ongetcontent : function (profile, item, callback) {
            var ns=this;
            linb.request(CONF.phpPath,({
                key:CONF.requestKey,
                para:{
                    action:'open',
                    hashCode:_.id(),
                    path:item.id
                }
            }),function(txt){
                var obj = txt;
                if(obj && !obj.error){
                    var root = ns.properties.parent.buildFileItems(item.id, obj.data);
                    callback(root.sub);
                }else linb.message(obj.error.message);
            });
        }
    }
});