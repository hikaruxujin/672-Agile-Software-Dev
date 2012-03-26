Class('VisualJS.ProjectSelector', 'linb.Com',{
    Instance:{
        customAppend:function(){
            var self=this,
                dlg=self.dialog,
                prop = self.properties;
            self.listName.setItems([]).setUIValue('',true);
            if(prop.fromRegion)
                dlg.setFromRegion(prop.fromRegion);
            dlg.show(self.parent, true);

            _.observableRun(function(threadid){
                linb.request(CONF.phpPath, ({
                        key:CONF.requestKey,
                        para:{
                            action:'open',
                            hashCode:_.id(),
                            path:'projects',
                            deep:'0'
                        }
                    }),
                    function(txt){
                        var obj = txt;
                        if(!obj || obj.error)
                            linb.message(_.get(obj,['error','message'])||'on response!');
                        else{
                            obj=obj.data;
                            self.properties.projectList=[];
                            if(obj && obj.length){
                                _.arr.each(obj,function(i){
                                    if(i.type===0){
                                        self.properties.projectList.push({id:i.location,caption:i.name})
                                    }
                                });
                            }
                            self.listName.setItems(prop.projectList);
                        }
                    },
                    function(msg){
                        linb.message(msg);
                    }
                ,threadid);
            });
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(140)
                .setTop(100)
                .setWidth(340)
                .setHeight(190)
                .setResizer(false)
                .setCaption("$VisualJS.dialog.select")
                .setImage("@CONF.img_app")
                .setImagePos("-48px top")
                .setMinBtn(false)
                .setMaxBtn(false)
                .onHotKeydown("_dialog_onhotkey")
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append((new linb.UI.List)
                .setHost(host,"listName")
                .setDock("top")
                .setHeight(112)
                .setDirtyMark(false)
                .onDblclick("_listname_ondblclick")
            );
            
            host.dialog.append((new linb.UI.Button)
                .setHost(host,"btnCancel")
                .setLeft(121)
                .setTop(120)
                .setWidth(90)
                .setZIndex("1")
                .setCaption("$VisualJS.cancel")
                .setImage("@CONF.img_app")
                .setImagePos("-16px -16px")
                .onClick("_btncancel_onclick")
            );
            
            host.dialog.append((new linb.UI.Button)
                .setHost(host,"btnOK")
                .setLeft(221)
                .setTop(120)
                .setWidth(90)
                .setZIndex("1")
                .setCaption("$VisualJS.ok")
                .setImage("@CONF.img_app")
                .setImagePos("-64px -16px")
                .onClick("_btnok_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _btncancel_onclick:function(){
            this.dialog.close();
        }, 
        _btnok_onclick:function(){
            var self=this,
                pm = self.projectName = self.listName.getUIValue();

            if(!self.projectName){
                linb.message(linb.getRes('VisualJS.ps.noselected'));
                return;
            }

            linb.request(CONF.phpPath,({
                key:CONF.requestKey,
                para:{
                    action:'open',
                    hashCode:_.id(),
                    path:this.projectName
                }
            }),function(txt){
                var obj = txt;
                if(!obj || obj.error)
                    linb.message(_.get(obj,['error','message'])||'on response!');
                else
                    _.tryF(self.properties.onOK, [pm, obj.data], self.host);
                self.dialog.close();
            });
        }, 
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        }, 
        _dialog_onhotkey:function(profile, key){
            if(key.key=='esc')
                profile.boxing().close();
        }, 
        _listname_ondblclick:function (profile, item, src) {
            this.btnOK.onClick();
        }
    }
});