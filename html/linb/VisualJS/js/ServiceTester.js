Class('VisualJS.ServiceTester', 'linb.Com',{
    Instance:{
        initialize : function(){
            this.autoDestroy = true;
            this.properties = {};
        },
        iniComponents : function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.Dialog)
                .setHost(host,"dlg")
                .setLeft(60)
                .setTop(60)
                .setWidth(600)
                .setHeight(407)
                .setCaption("$VisualJS.spabuilder.st_title")
                .setMinBtn(false)
                .setMaxBtn(false)
                .beforeClose("_dlg_beforeclose")
            );
            
            host.dlg.append(
                (new linb.UI.SLabel)
                .setHost(host,"ctl_slabel1")
                .setLeft(10)
                .setTop(10)
                .setWidth(74)
                .setCaption("$VisualJS.spabuilder.st_uri")
            );
            
            
            host.dlg.append(
                (new linb.UI.Group)
                .setHost(host,"ctl_group1")
                .setLeft(10)
                .setTop(40)
                .setWidth(570)
                .setHeight(120)
                .setCaption("$VisualJS.spabuilder.st_queryobj")
                .setToggleBtn(false)
            );
            
            host.ctl_group1.append(
                (new linb.UI.TextEditor)
                .setHost(host,"ctl_query")
                .setDirtyMark(false)
                .setLeft(5)
                .setWidth(560)
                .setHeight(100)
                .setValue("{a:1,b:2}")
            );
            
            host.dlg.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbutton5")
                .setLeft(460)
                .setTop(342)
                .setWidth(110)
                .setCaption("$VisualJS.close")
                .onClick("_ctl_sbutton5_onclick")
            );
            
            host.dlg.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbutton6")
                .setLeft(280)
                .setTop(342)
                .setWidth(170)
                .setCaption("$VisualJS.spabuilder.st_createcode")
                .onClick("_ctl_sbutton6_onclick")
            );
            
            host.dlg.append(
                (new linb.UI.Button)
                .setHost(host,"ctl_sbutton15")
                .setLeft(340)
                .setTop(174)
                .setWidth(230)
                .setHeight(36)
                .setCaption("<strong>$VisualJS.spabuilder.st_send</strong>")
                .onClick("_ctl_sbutton15_onclick")
            );
            
            host.dlg.append(
                (new linb.UI.Group)
                .setHost(host,"ctl_group3")
                .setLeft(10)
                .setTop(212)
                .setWidth(570)
                .setHeight(120)
                .setCaption("$VisualJS.spabuilder.st_result")
                .setToggleBtn(false)
            );
            
            host.ctl_group3.append(
                (new linb.UI.Input)
                .setHost(host,"ctl_result")
                .setDirtyMark(false)
                .setLeft(4)
                .setTop(0)
                .setWidth(560)
                .setHeight(100)
                .setMultiLines(true)
            );
            
            host.dlg.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbutton26")
                .setLeft(500)
                .setTop(35)
                .setWidth(70)
                .setCaption("$VisualJS.spabuilder.st_format")
                .onClick("_ctl_sbutton26_onclick")
            );
            
            host.dlg.append(
                (new linb.UI.RadioBox)
                .setHost(host,"ctl_method")
                .setDirtyMark(false)
                .setItems([{"id":"auto", "caption":"Auto"}, {"id":"get", "caption":"Get"}, {"id":"post", "caption":"Post"}])
                .setLeft(90)
                .setTop(175)
                .setWidth(220)
                .setHeight(26)
                .setValue("auto")
            );
            
            host.dlg.append(
                (new linb.UI.SLabel)
                .setHost(host,"ctl_slabel13")
                .setLeft(0)
                .setTop(180)
                .setWidth(84)
                .setCaption("$VisualJS.spabuilder.st_method")
            );
            
            host.dlg.append(
                (new linb.UI.ComboInput)
                .setHost(host,"ctl_uri")
                .setDirtyMark(false)
                .setLeft(90)
                .setTop(6)
                .setWidth(484)
                .setValueFormat("^(http|https)\\:")
                .setType("popbox")
                .setValue("http://www.linb.net/backend/PHP/demo.php")
                .onClick("_ctl_uri_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        customAppend : function(parent, subId, left, top){
            var ns=this;
            ns.dlg.setDisplay('block');
            ns.dlg.showModal();

            return false;
        },
        events : {},
        init:function(force){
            var ns=this;
            if(force){
                ns.ctl_uri.setValue("http://www.linb.net/backend/PHP/demo.php", true);
                ns.ctl_query.setValue("{a:1,b:2}", true);
            }
            ns.ctl_method.setValue("auto",true);
            ns.ctl_result.setValue("", true);
        },
        _ctl_sbutton5_onclick : function (profile, e, src, value) {
            var ns = this, uictrl = profile.boxing();
            ns.dlg.close();
        },
        _ctl_sbutton15_onclick : function (profile, e, src, value) {
            var ns = this,
                ctrl = profile.boxing(),
                options = {},
                uri = ns.ctl_uri.getUIValue(),
                str_query =ns.ctl_query.getUIValue();
            if(uri && str_query){
                var query = _.unserialize(str_query);
                if(query){
                    var method = ns.ctl_method.getUIValue();
                    if(method!='auto'){
                        options.method = method;
                    }
                    ctrl.getRoot().onMouseout(true);
                    ctrl.setDisabled(true).setCaption("<strong>$VisualJS.spabuilder.st_sending</strong>");
                    linb.request(uri, query, function(rsp){
                        var rspobj = rsp;
                        if(rspobj){
                            ns.showResult(rspobj);
                        }else{
                            ns.showErr(rsp);
                        }
                        ctrl.setDisabled(false).setCaption("<strong>$VisualJS.spabuilder.st_send</strong>");
                    }, function(rsp){
                        ns.showErr(rsp);
                        ctrl.setDisabled(false).setCaption("<strong>$VisualJS.spabuilder.st_send</strong>");
                    }, null, options);
                    
                    return ;
                }
            }

            linb.message(linb.getRes("VisualJS.spabuilder.st_nodata"));
        },
        showErr:function(msg){
            linb.alert(msg);
        },
        showResult:function(obj){
            var ns=this;
            ns.ctl_result.setValue(linb.Coder.formatText(_.stringify(obj)), true);
        },
        _ctl_sbutton26_onclick : function (profile, e, src, value) {
            var ns = this;
            this.ctl_query.setValue(linb.Coder.formatText(ns.ctl_query.getUIValue()),true);
        },
        _ctl_sbutton6_onclick : function (profile, e, src, value) {
            var ns = this, uictrl = profile.boxing(),
                uri = ns.ctl_uri.getUIValue(),
                str_query =ns.ctl_query.getUIValue(),
                method = ns.ctl_method.getUIValue();
            var code = 'linb.request("$1", ' + '\n' +
                       '$2, '+ '\n' +
                       'function(rsp){' + '\n' +
                       '    var rspobj = rsp;' + '\n' +
                       '    if(rspobj){' + '\n' +
                       '        // handle result' + '\n' +    
                       '    }else{' + '\n' +             
                       '        // handle exception' + '\n' +
                       '    }' + '\n' +
                       '    }, function(rsp){' + '\n' +
                       '        // handle exception' + '\n' +
                       '    }, null, $3);';
            code = code.replace('$1',uri ).replace('$2',str_query).replace('$3', method=="auto"?"null":("{method:'"+method+"'}"));
            ns.ctl_result.setValue(code, true);
        },
        _dlg_beforeclose : function (profile) {
            this.dlg.hide();
            this.dlg.setDisplay('none');
            return false;
        },
        _ctl_uri_onclick : function (profile, node) {
            var ns = this, uictrl = profile.boxing();
            linb.Dom.submit(uictrl.getUIValue());
        }
    }
}); 