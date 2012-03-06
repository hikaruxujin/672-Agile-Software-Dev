Class('VisualJS.FAndR', 'linb.Com',{
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
                .setLeft(140)
                .setTop(40)
                .setWidth(310)
                .setHeight(210)
                .setResizer(false)
                .setCaption("$VisualJS.pageEditor.searchreplace")
                .setMinBtn(false)
                .setMaxBtn(false)
                .beforeClose("_ctl_dialog_beforeclose")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SLabel)
                .setHost(host,"ctl_slabel1")
                .setLeft(20)
                .setTop(14)
                .setWidth(114)
                .setCaption("$VisualJS.pageEditor.search")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SLabel)
                .setHost(host,"ctl_slabel2")
                .setLeft(20)
                .setTop(44)
                .setWidth(114)
                .setCaption("$VisualJS.pageEditor.replacewith")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.Input)
                .setHost(host,"ctl_i1")
                .setDirtyMark(false)
                .setLeft(160)
                .setTop(10)
            );
            
            host.ctl_dialog.append(
                (new linb.UI.Input)
                .setHost(host,"ctl_i2")
                .setDirtyMark(false)
                .setLeft(160)
                .setTop(40)
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbtnSearch")
                .setLeft(50)
                .setTop(80)
                .setWidth(90)
                .setCaption("$VisualJS.pageEditor.search")
                .onClick("_ctl_sbtnsearch_onclick")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbtnReplace")
                .setLeft(50)
                .setTop(110)
                .setWidth(90)
                .setCaption("$VisualJS.pageEditor.replace")
                .onClick("_ctl_sbtnreplace_onclick")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbtnSR")
                .setLeft(160)
                .setTop(80)
                .setWidth(90)
                .setCaption("$VisualJS.pageEditor.replacesearch")
                .onClick("_ctl_sbtnsr_onclick")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbtnRA")
                .setLeft(160)
                .setTop(110)
                .setWidth(90)
                .setCaption("$VisualJS.pageEditor.replaceall")
                .onClick("_ctl_sbtnra_onclick")
            );
            
            host.ctl_dialog.append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbtnClose")
                .setLeft(110)
                .setTop(143)
                .setWidth(80)
                .setCaption("$VisualJS.close")
                .onClick("_ctl_sbtnclose_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        customAppend : function(parent, subId, left, top){
            var ns=this;
            ns.ctl_i1.setUIValue("");
            ns.ctl_i2.setUIValue("");
            ns.ctl_dialog.showModal(parent, left, top);
        },
        _ctl_dialog_beforeclose : function (profile) {
            this.ctl_dialog.hide();
            return false;
        },
        _ctl_sbtnclose_onclick : function (profile, e, src, value) {
           this.ctl_dialog.hide();
        },
        _ctl_sbtnsearch_onclick : function (profile, e, src, value) {
            var ns=this, find=ns.ctl_i1.getUIValue();
            if(find)
                this.fireEvent("findNext",[find]);
        },
        _ctl_sbtnreplace_onclick : function (profile, e, src, value) {
            var ns=this, find=ns.ctl_i1.getUIValue();
            if(find)
            this.fireEvent("replace",[find, ns.ctl_i2.getUIValue()||""]);
        },
        _ctl_sbtnsr_onclick : function (profile, e, src, value) {
            var ns=this, find=ns.ctl_i1.getUIValue();
            if(find)
            this.fireEvent("replaceAndFind",[find, ns.ctl_i2.getUIValue()||""]);
        },
        _ctl_sbtnra_onclick : function (profile, e, src, value) {
            var ns=this, find=ns.ctl_i1.getUIValue();
            if(find)
            this.fireEvent("replaceAll",[find, ns.ctl_i2.getUIValue()||""]);
        }
    }
});