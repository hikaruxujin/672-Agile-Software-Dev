Class('VisualJS.JumpTo', 'linb.Com',{
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
                .setHost(host,"ctl_dialog")
                .setLeft(70)
                .setTop(40)
                .setWidth(260)
                .setHeight(130)
                .setCaption("$VisualJS.jumpto")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setResizer(false)
                .beforeClose("_ctl_dialog_beforeclose")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SLabel)
                .setHost(host,"ctl_slabel1")
                .setLeft(10)
                .setTop(14)
                .setWidth(94)
                .setCaption("$VisualJS.jumpto")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.ComboInput)
                .setHost(host,"ctl_comboinput3")
                .setLeft(120)
                .setTop(10)
                .setType("spin")
                .setDirtyMark(false)
                .setWidth(80)
                .setPrecision(0)
                .setIncrement(1)
                .setMin(1)
                .setMax(100000)
                .setValue("1")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbutton5")
                .setLeft(30)
                .setTop(50)
                .setWidth(80)
                .setCaption("$VisualJS.cancel")
                .onClick("_ctl_sbutton5_onclick")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_btnok")
                .setLeft(140)
                .setTop(50)
                .setWidth(80)
                .setCaption("$VisualJS.ok")
                .onClick("_ctl_btnok_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        customAppend : function(parent, subId, left, top){
            this.ctl_dialog.showModal(parent, left, top);
        },
        events : {},
        _ctl_sbutton5_onclick : function (profile, e, src, value) {
            this.ctl_dialog.close();
        },
        _ctl_dialog_beforeclose : function (profile) {
            this.ctl_dialog.hide();
            return false;
        },
        _ctl_btnok_onclick : function (profile, e, src, value) {
            this.fireEvent("onOK",[this.ctl_comboinput3.getUIValue()]);
            this.ctl_dialog.close();
        }
    }
});