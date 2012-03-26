Class('VisualJS.ProjectPro', 'linb.Com',{
    Instance:{
        _template:'blank',

        events:{onReady:'_onReady'},
        customAppend:function(){
            var self=this,
                prop = self.properties;

            self.inputName.setValue(prop.projectName, true);
            self.inputClassName.setValue(prop.className, true);
            self._refreshLabel(prop.projectName);

            if(prop.fromRegion){
                self.dialog.setFromRegion(prop.fromRegion);
            }

            self.inputName.setDisabled(prop.readonly);
            self.inputClassName.setDisabled(prop.readonly);
            
            self._template='blank';
            self.listType.setValue('blank',true);
            self.listTemplate.clearItems();

            self.dialog.show(self.parent, true);
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .setHost(host,"dialog")
                .setLeft(100)
                .setTop(100)
                .setWidth(520)
                .setHeight(450)
                .setResizer(false)
                .setCaption("$VisualJS.dialog.newone")
                .setImage("@CONF.img_app")
                .setImagePos("-32px top")
                .setMinBtn(false)
                .setMaxBtn(false)
                .onHotKeydown("_dialog_onhotkey")
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append((new linb.UI.Input)
                .setHost(host,"inputName")
                .setLeft(100)
                .setTop(277)
                .setWidth(150)
                .setTipsErr("$VisualJS.projectPro.onlyword")
                .setValueFormat("^\\w{3,15}$")
                .afterUIValueSet("_inputname_aftervalueupdated")
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"label1")
                .setLeft(10)
                .setTop(279)
                .setWidth(88)
                .setCaption("$VisualJS.projectPro.name")
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"label3")
                .setLeft(10)
                .setTop(310)
                .setWidth(88)
                .setCaption("$VisualJS.projectPro.classfile")
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"label5")
                .setLeft(260)
                .setTop(279)
                .setWidth(80)
                .setCaption("$VisualJS.projectPro.class")
            );
            
            host.dialog.append((new linb.UI.Button)
                .setHost(host,"btnCancel")
                .setLeft(262)
                .setTop(380)
                .setWidth(90)
                .setTabindex("0")
                .setCaption("$VisualJS.cancel")
                .setImage("@CONF.img_app")
                .setImagePos("-16px -16px")
                .onClick("_btncancel_onclick")
            );
            
            host.dialog.append((new linb.UI.Input)
                .setHost(host,"inputClassName")
                .setLeft(342)
                .setTop(277)
                .setWidth(148)
                .setTipsErr("$VisualJS.projectPro.onlyword")
                .setValueFormat("^\\w{3,15}$")
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"label7")
                .setLeft(100)
                .setTop(346)
                .setWidth(388)
                .setCaption("label7")
                .setHAlign("left")
                .setCustomClass({"KEY":"uiborder-inset"})
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"label2")
                .setLeft(10)
                .setTop(346)
                .setWidth(88)
                .setCaption("$VisualJS.projectPro.pagefile")
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"label8")
                .setLeft(100)
                .setTop(310)
                .setWidth(388)
                .setCaption("label8")
                .setHAlign("left")
                .setCustomClass({"KEY":"uiborder-inset"})
            );
            
            host.dialog.append((new linb.UI.Button)
                .setHost(host,"btnOK")
                .setLeft(374)
                .setTop(380)
                .setWidth(90)
                .setCaption("$VisualJS.ok")
                .setImage("@CONF.img_app")
                .setImagePos("-64px -16px")
                .onClick("_btnok_onclick")
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"slabel12")
                .setLeft(20)
                .setTop(10)
                .setWidth(104)
                .setCaption("$VisualJS.projectPro.type")
                .setHAlign("left")
            );
            
            host.dialog.append((new linb.UI.SLabel)
                .setHost(host,"slabel13")
                .setLeft(180)
                .setTop(10)
                .setWidth(104)
                .setCaption("$VisualJS.projectPro.template")
                .setHAlign("left")
            );
            
            host.dialog.append((new linb.UI.List)
                .setHost(host,"listType")
                .setDirtyMark(false)
                .setLeft(20)
                .setTop(30)
                .setWidth(150)
                .setHeight(240)
                .setItems([{id:'blank',caption:'Blank Application'}])
                .onItemSelected('_listtype_onitemsel')
            );
            
            host.dialog.append((new linb.UI.Gallery)
                .setHost(host,"listTemplate")
                .setLeft(180)
                .setTop(30)
                .setDirtyMark(false)
                .setWidth(310)
                .setHeight(240)
                .setItemWidth(80)
                .setItemHeight(80)
                .setImgWidth(64)
                .setImgHeight(64)
                .onItemSelected('_listtempl_onitemsel')
                .onDblclick('_listtempl_ondblclick')
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        }, 
        _btncancel_onclick:function(){
            this.dialog.close();
        }, 
        _btnok_onclick:function(){
            var self=this;
            if(self.inputName.checkValid()===false ||
                self.inputClassName.checkValid()===false){
                    linb.message(linb.getRes('VisualJS.projectPro.invalid'));
                    return;
            }
            self.projectName = self.inputName.updateValue().getValue();
            self.className = self.inputClassName.updateValue().getValue();

            if(self._template==='blank')
                self._buildApp();
            else{
                linb.UI.Dialog.alert("You selected the template '"+self._template+"'! This function is in construction");
            }
            self.dialog.setFromRegion(null).close();
         },
         _buildApp:function(){
            var self=this;
            linb.request(CONF.phpPath,({
                key:CONF.requestKey2,
                para:{
                    action:'buildWizard',
                    hashCode:_.id(),
                    path:self._template=='blank'?'':self._template,
                    paras:{
                        pathName:self.projectName,
                        className:self.className
                    }
                }
            }),function(txt){
                var obj = txt;
                if(obj.error)
                    linb.message(obj.error.message);
                else
                    _.tryF(self.properties.onOK, ['projects/'+self.projectName, obj.data], self.host);
                self.dialog.setFromRegion(null).close();
            },function(txt){
                linb.message(txt);
            });
        }, 
        _inputname_aftervalueupdated:function(profile, oldValue,newValue){
            this._refreshLabel(newValue);
        }, 
        _refreshLabel:function(prjname, filename){
            var self=this;
            filename = filename || 'index';
            self.label7.setCaption(linb.ini.appPath+'projects/'+prjname +'/'+filename+'.html');
            self.label8.setCaption(linb.ini.appPath+'projects/'+prjname +'/VisualJS/js/'+filename+'.js');
        }, 
        _dialog_onhotkey:function(profile, key){
            if(key.key=='esc')
                profile.boxing().close();
        },
        _onReady:function(){
            var self=this;
            linb.request(CONF.phpPath, ({
                    key:CONF.requestKey2,
                    para:{
                        action:'getWizardTypeList',
                        hashCode:_.id()
                    }
                }),
                function(txt){
                    var obj = txt;
                    if(!obj || obj.error)
                        linb.message(_.get(obj,['error','message'])||'on response!');
                    else{
                        obj=obj.data;
                        var arr=[];
                        if(obj && obj.length){
                            _.arr.each(obj,function(i){
                                arr.push({id:i.name,caption:i.name})
                            });
                        }

                        self.listType.insertItems(arr);
                    }
                },
                function(msg){
                    linb.message(msg);
                });
        },
        _listtype_onitemsel:function(profile,item,src){
            var ns=this, id=item.id;
            ns._template='blank';

            if(id=='blank'){
                if(ns._curAjax && ns._curAjax.isAlive())
                    ns._curAjax.abort();
                ns.listTemplate.free();
                ns.listTemplate.clearItems();
            }else{
                ns.listTemplate.busy();
                ns._curAjax=linb.request(CONF.phpPath, ({
                        key:CONF.requestKey2,
                        para:{
                            action:'getWizardList',
                            path:id,
                            hashCode:_()
                        }
                    }),
                    function(txt){
                        var obj = txt;
                        if(!obj || obj.error)
                            linb.message(_.get(obj,['error','message'])||'on response!');
                        else{
                            obj=obj.data;
                            var arr=[];
                            if(obj && obj.length){
                                _.arr.each(obj,function(i){
                                    arr.push({id:i.name,caption:i.name,image:i.location+'/icon.jpg',tips:'Double click for description!',tag:i.location+'/description.html'})
                                });
                            }
                            ns.listTemplate.setItems(arr).setValue('',true);
                        }
                        ns.listTemplate.free();
                    },
                    function(msg){
                        linb.message(msg);
                        ns.listTemplate.free();
                    });
            }
        },
        _listtempl_onitemsel:function(profile,item){
            var ns=this, id=item.id;
            ns._template=id;
        },
        _listtempl_ondblclick:function(profile,item){
            linb.Dom.submit(item.tag);
        }
    }
});