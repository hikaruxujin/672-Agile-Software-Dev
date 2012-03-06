Class('VisualJS.CustomDecoration', 'linb.Com',{
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
                .setHost(host,"dialog")
                .setLeft(210)
                .setTop(20)
                .setWidth(240)
                .setHeight(494)
                .setResizer(false)
                .setCaption("Custom Decoration")
                .setMinBtn(false)
                .setMaxBtn(false)
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append(
                (new linb.UI.Group)
                .setHost(host,"grpNodes")
                .setLeft(0)
                .setTop(4)
                .setWidth(230)
                .setHeight(168)
                .setCaption("grpNodes")
                .setToggleBtn(false)
            );
            
            host.grpNodes.append(
                (new linb.UI.TreeView)
                .setHost(host,"tv")
                .setDirtyMark(false)
                .onItemSelected("_tv_onitemselected")
                .setCustomStyle({"BOX":"background-color:transparent;"})
            );
            
            host.dialog.append(
                (new linb.UI.Block)
                .setHost(host,"ctl_block3")
                .setLeft(0)
                .setTop(194)
                .setWidth(230)
                .setHeight(254)
                .setBorderType("inset")
                .setBackground("#fff")
            );
            
            host.ctl_block3.append(
                (new linb.UI.TreeGrid)
                .setHost(host,"tg")
                .setDirtyMark(false)
                .setRowHandler(false)
                .setColSortable(false)
                .setHeader([{"id":"key", "width":90, "type":"label", "caption":"Prop"}, {"id":"value", "editable":true, "width":134, "type":"input", "caption":"Custom Value"}])
                .afterCellUpdated("_tg_aftercellupdated")
            );
            
            host.dialog.append(
                (new linb.UI.Input)
                .setHost(host,"ctl_input1")
                .setReadonly(true)
                .setLeft(0)
                .setTop(174)
                .setWidth(230)
                .setLabelCaption("ctl_input1")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        customAppend : function(parent, subId, left, top){
             var ns=this,
                prop=ns.properties;

            ns.setTargetProfile(prop.targetProfile);
                        
            linb("body").append(ns.dialog);
            ns.dialog.getRoot()
            .popToTop(prop.targetProfile.getRootNode(), 2)
            .setBlurTrigger("VisualJS.CustomDecoration",function(){
                ns.dialog.close();
            });
            
            ns.dialog.activate();

            return true;
        },
        setTargetProfile:function(profile){
            var ns=this,items=[],rootItem;
            var fun=function(hash, subMap, arr, tag){
                var item;
                for(var i in hash){
                    if(i.charAt(0)!='$'){
                        var tagName=(hash[i]&&hash[i].tagName||"span").toLowerCase();
                        if(!/[a-z]/.test(i)){    
                            item={
                                id:i,
                                caption:i+" ["+tagName.toUpperCase()+"]",
                                image:"img/App.gif",
                                imagePos:"-112px 0"
                            };
                            
                            if(subMap && hash[i].text && subMap[(tag?(tag+"."):'')+hash[i].text.replace(/^{(.*)}$/,'$1')]){
                                item.sub=[];
                                var tag=(tag?(tag+"."):'')+hash[i].text.replace(/^{(.*)}$/,'$1');
                                
                                //special for TreeGrid
                                if(tag=='rows.cells')
                                    tag='rows.cells.input';
                                
                                arguments.callee(subMap[tag], subMap, item.sub, tag);
                                if(tagName=="text" && item.sub.length)
                                    item=item.sub[0];
                            }
                            else if(tagName=="text"){
                                continue;
                            }
                            else if(typeof hash[i] == 'object' && tagName!="text"){
                                item.sub=[];
                                arguments.callee(hash[i], subMap, item.sub, tag);
                            }
                            if(tagName=="image")
                                item.disabled=true;

                            if(!item.sub || !item.sub.length)
                                delete item.sub;
                            arr[arr.length]=item;
                        }
                    }
                };
            };
            var i="_",
                hash=profile.box.$Templates,
                tagName=(hash[i].tagName||"span").toLowerCase();
                
            items.push(rootItem={
                id:"KEY",
                caption:"ROOT" + " ["+tagName.toUpperCase()+"]",
                image:"img/App.gif",
                imagePos:"-112px 0",
                sub:[]
            });
            if(tagName=='image')
                rootItem.disabled=true;
            
            var subMap = hash[i].$submap;
            if(subMap && hash[i].text && subMap[hash[i].text.replace(/^{(.*)}$/,'$1')]){
                var tag=hash[i].text.replace(/^{(.*)}$/,'$1');
                fun(subMap[tag], subMap, rootItem.sub, tag);
                if(tagName=="text" && rootItem.sub.length)
                    rootItem=rootItem.sub[0];
            }

            fun(hash[i], subMap, rootItem.sub, null);
            if(!rootItem.sub.length)
                delete rootItem.sub;

            ns.grpNodes.setCaption(profile.key.slice(profile.key.lastIndexOf('.')+1) +" : "+profile.alias);
            ns.tv.setTagVar(profile);
            ns.tv.setItems(items);

            ns.tg.updateCellByRowCol('classname','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('font-family','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('font-size','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('font-weight','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('font-style','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('color','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('background-color','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('text-decoration','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('text-align','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('cursor','value',{value:""},false,false);
            ns.tg.updateCellByRowCol('overflow','value',{value:""},false,false);

            ns.tg.setDisabled(true);
            ns.ctl_input1.setValue("");

            ns.tv.toggleNode('KEY', true, true);
            ns.tv.fireItemClickEvent('KEY');            
        },
        _tv_onitemselected : function (profile, item, e) {
            var ns = this,
                prf=profile.boxing().getTagVar(),
                box=prf.box,
                PanelKeys=box.$Behaviors && box.$Behaviors.PanelKeys;
            
            ns.tg.setDisabled(false);
            
            ns.tg.updateRow('overflow', {disabled:!(PanelKeys && _.arr.indexOf(PanelKeys, item.id)!=-1)});
            
            if(!ns.$coverMark){
                ns.$coverMark=linb.create('<div style="z-index:2000;border:solid 1px;background-color:#ff0000;position:absolute;font-size:0;line-height:0;display:none;">').css('opacity',0.3);
                linb('body').append(ns.$coverMark);
                ns.$coverMarkTask=linb.Thread.repeat(function(){
                    ns.$coverMarkTask.$_mark = !ns.$coverMarkTask.$_mark;
                    ns.$coverMark.css('backgroundColor',ns.$coverMarkTask.$_mark?'#0000ff':'#ff0000');
                    ns.$coverMark.css('border-color',ns.$coverMarkTask.$_mark?'#fff':'#000');
                }, 500);
            }
            if(item.id=='KEY'){
                ns.$coverMark.css('display','none');
                var node=prf.getRootNode();

                var nodeText = "<"+node.tagName+" id='"+node.id+"' class='"+node.className+"' style='"+linb(node).attr('style')+"'>";
                ns.ctl_input1.setValue(nodeText).setTips(nodeText.replace(/</,'&lt;'));
            }else{
                var nodes=prf.getSubNode(item.id,true);
                if(nodes.get(0)){
                    var set=false;
                    nodes.each(function(node){
                        if(node.offsetWidth){
                            var region=linb(node).offset();
                            region.width=node.offsetWidth;
                            region.height=node.offsetHeight;

                            if(region.width<=0)region.width=2;else region.width-=2;
                            if(region.height<=0)region.height=2;else region.height-=2;
                            if(region.width<=0)region.width=2;
                            if(region.height<=0)region.height=2;
                            
                            ns.$coverMark.cssRegion(region).css('display','block');

                            var nodeText = "<"+node.tagName+" id='"+node.id+"' class='"+node.className+"' style='"+linb(node).attr('style')+"'>";
                            ns.ctl_input1.setValue(nodeText).setTips(nodeText.replace(/</,'&lt;'));
                            
                            set=true;
                            return false;
                        }       
                    });
                    if(!set)
                        ns.$coverMark.css('display','none');
                }else{
                    ns.$coverMark.css('display','none');
                }
            }
            
            ns.tg.updateCellByRowCol('classname','value',{value:prf.CC[item.id]||null},false,false);
            
            var cs=prf.CS[item.id],
               csa=cs&&cs.split(/\s*;+\s*/),
               csaMap={};
            _.arr.each(csa,function(style){
                if(style){
                    var kv=style.split(/\s*:\s*/);
                    if(kv.length==2){
                        csaMap[kv[0]]=kv[1];
                    }
                }
            });
            ns.tg.updateCellByRowCol('font-family','value',{
                value:csaMap['font-family']||null
            },false,false);
            ns.tg.updateCellByRowCol('font-size','value',{
                value:csaMap['font-size']||null
            },false,false);
            ns.tg.updateCellByRowCol('font-weight','value',{
                value:csaMap['font-weight']
            },false,false);
            ns.tg.updateCellByRowCol('font-style','value',{
                value:csaMap['font-style']||null
            },false,false);
            ns.tg.updateCellByRowCol('color','value',{
                value:csaMap['color']||null
            },false,false);
            ns.tg.updateCellByRowCol('background-color','value',{
                value:csaMap['background-color']||null
            },false,false);
            ns.tg.updateCellByRowCol('text-decoration','value',{
                value:csaMap['text-decoration']||null
            },false,false);
            ns.tg.updateCellByRowCol('text-align','value',{
                value:csaMap['text-align']||null
            },false,false);
            ns.tg.updateCellByRowCol('cursor','value',{
                value:csaMap['cursor']||null
            },false,false);
            ns.tg.updateCellByRowCol('overflow','value',{
                value:csaMap['overflow']||null
            },false,false);
            
            profile.boxing().setTag(item.id);
        },
        events : {"onReady":"_com_onready", "onDestroy":"_com_ondestroy"},
        _com_onready : function (com, threadid) {
            var ns=this,rows=[];
            rows.push({id:'classname',cellStyle:"font-weight:bold;",cells:['class',""]});
            
            rows.push({id:'font-family',cells:['font-family',{
                type:"helpinput", editorListItems:CONF.designer_data_fontfamily
            }]});
            rows.push({id:'font-size',cells:['font-size',{
                type:"combobox", editorListItems:CONF.designer_data_fontsize
            }]});
            rows.push({id:'font-weight',cells:['font-weight',{
                type:"combobox", editorListItems:CONF.designer_data_fontweight
            }]});
            rows.push({id:'font-style',cells:['font-style',{
                type:"combobox", editorListItems:CONF.designer_data_fontstyle
            }]});
            
            rows.push({id:'color',cells:['color',{
                type:"color"
            }]});
            rows.push({id:'background-color',cells:['background-color',{
                type:"color"
            }]});
            
            rows.push({id:'text-decoration',cells:['text-decoration',{
                type:"combobox", editorListItems:CONF.designer_data_textdecoration
            }]});
            rows.push({id:'text-align',cells:['text-align',{
                type:"combobox", editorListItems:CONF.designer_data_textalign
            }]});
            rows.push({id:'cursor',cells:['cursor',{
                type:"combobox", editorListItems:CONF.designer_data_cursor
            }]});
            rows.push({id:'overflow',cells:['overflow',{
                type:"combobox", editorListItems:CONF.designer_data_overflow
            }]});
            
            ns.tg.setRows(rows);
        },
        _ctl_sbutton1_onclick : function (profile) {
            this.setTargetProfile(this.ctl_panel3.get(0));
        },
        _ctl_sbutton37_onclick : function (profile, e, src, value) {
            this.setTargetProfile(this.ctl_tabs2.get(0));
        },
        _com_ondestroy : function (com) {
            if(this.$coverMark)
                this.$coverMark.remove();
            if(this.$coverMarkTask)
                this.$coverMarkTask.abort();
        },
        _dialog_beforeclose : function (profile) {
            profile.boxing().hide();
            this.$coverMark.css('display','none');
            return false;
        },
        _tg_aftercellupdated : function (profile, cell, options) {
            if("value" in options){
                var ns=this,
                    grid=ns.tg,
                    prf=ns.tv.getTagVar(),
                    tplKey=ns.tv.getTag();
                if(prf && tplKey){
                    var className="",
                        arr=[],
                        cells=grid.getCells(null,'value');
                    
                    _.each(cells,function(cell){
                        if(cell._row.id=="classname")
                            className=cell.value;
                        else if(cell.value)
                            arr.push(cell._row.id+":"+cell.value);
                    });
                    // custom class
                    prf.boxing().setCustomClass(tplKey, className||null);
                    // custom style
                    prf.boxing().setCustomStyle(tplKey, arr.join(";")||null);
                }
            }
        }
    }
});