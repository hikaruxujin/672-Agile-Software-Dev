Class('VisualJS.Designer', 'linb.Com',{
    Constructor:function(){
        arguments.callee.upper.apply(this,arguments);
        this.$host={};
    },
    Instance:{
        $viewSize:{
            '800':{
                width:800,
                height:600
            },
            '1024':{
                width:1024,
                height:768
            },
            '1280':{
                width:1280,
                height:1024
            }
        },
        dropOffset:10,

        events:{
            onSelected:function(page, profile, ids){
                var v=null, id = ids && ids[ids.length-1];
                if(id){
                    var o = linb.getObject(id);
                    if(o)
                        v = o;
                }
                page.listObject.setUIValue(v?v.alias:'com', true);

                _.resetRun('$profilegrid$', page._refreshProfileGrid,0,[ids],page);
                
                page.resizer.setConfigBtn(ids && ids.length==1);
                page.resizer.setTag(ids[0]);
            },
            onReady:function(page){
                page.setViewSize(page.$viewSize['800']);

                page.$curViewSize='800';

                var tbpath = linb.ini.appPath+'img/designer/toolbar.gif',
                    tbk='$VisualJS.designer.tool.',
                    showRefresh = CONF.designer_editMode != "simple";

                page.$canvasMenuItems=[{
                    id:'code',
                    level:1,
                    canvasOnly:true,
                    sub:[
                    {
                        id : "viewsize",
                        type:'button',
                        dropButton:true,
                        caption:'800 &#215 600',
                        tips:tbk+'viewsize'
                    },
                    {
                        id : "refresh",
                        image :showRefresh?CONF.img_app:null,
                        imagePos:showRefresh?"-112px -16px":null,
                        type : showRefresh?"button":"split",
                        tips : showRefresh?(tbk+'refresh'):null
                    },{
                        id : "format",
                        image : CONF.img_app,
                        imagePos:"-32px -48px",
                        type : "button",
                        tips : tbk+'tocode'
                    },{
                        id : "json",
                        image : CONF.img_app,
                        imagePos:"-128px -64px",
                        type : "button",
                        tips : tbk+'tojson'
                    }]},
                    {id:'align',
                    level:2,
                    caption:tbk+'aligngroup',
                    sub:[
                        {id:'left',caption:'',image:tbpath,imagePos:'0 top', tips:tbk+'left'},
                        {id:'center',caption:'',image:tbpath,imagePos:'-16px top',tips:tbk+'center'},
                        {id:'right',caption:'',image:tbpath,imagePos:'-32px top',tips:tbk+'right'},
                        {id:'s1',type:'split'},
                        {id:'top',caption:'',image:tbpath,imagePos:'-48px top',tips:tbk+'top'},
                        {id:'middle',caption:'',image:tbpath,imagePos:'-64px top',tips:tbk+'middle'},
                        {id:'bottom',caption:'',image:tbpath,imagePos:'-80px top',tips:tbk+'bottom'},
                        {id:'s2',type:'split'},
                        {id:'w',caption:'',image:tbpath,imagePos:'-96px top',tips:tbk+'width'},
                        {id:'wh',caption:'',image:tbpath,imagePos:'-112px top',tips:tbk+'wh'},
                        {id:'h',caption:'',image:tbpath,imagePos:'-128px top',tips:tbk+'height'}
                    ]},
                    {id:'pos',
                    level:2,
                    caption:tbk+'posgroup',
                    sub:[
                        {id:'zindex1',caption:'',image:tbpath,imagePos:'-144px top',tips:tbk+'toplayer'},
                        {id:'zindex2',caption:'',image:tbpath,imagePos:'-160px top',tips:tbk+'bottomlayer'},
                        {id:'s1',type:'split'},
                        {id:'repos',caption:'',image:tbpath,imagePos:'-176px top',tips:tbk+'gridxy'},
                        {id:'resize',caption:'',image:tbpath,imagePos:'-192px top',tips:tbk+'gridwh'}
                    ]},
                    {id:'del',
                    level:1,
                    sub:[
                        {id:'clone',caption:'',image:tbpath,imagePos:'-240px top',tips:tbk+'clone'},
                        {id:'delete',caption:'',image:tbpath,imagePos:'-256px top', tips:tbk+'delete'}
                    ]}
                    ];
                page.$canvasMenuItems1=[
                    {"id":"800", viewsize:true, "caption":"800 &#215 600"}, 
                    {"id":"1024", viewsize:true, "caption":"1024 &#215 768"}, 
                    {"id":"1280", viewsize:true,"caption":"1280 &#215 1024"}
                ];
                
                page.popViewSize.setItems(page.$canvasMenuItems1);

                page.toolbar.setItems(page.$canvasMenuItems);
            },
            onRender:function(page){
                var _refresh=page._refresh=function(obj, key, region){
                    var profile=obj.get(0),
                        fn='set'+_.str.initial(key),
                        t;
                    if(_.isFun(obj[fn])){
                        if(profile.renderId){
                            if(region && region[key])
                                obj.getRoot()[key+'By'](region[key],true);
                            var t = parseInt(profile.getRoot().css(key))||0;
                        }else
                            t=profile.properties[key];
                        obj[fn](t);
                    }

                    var v=obj['get'+_.str.initial(key)]();

                    if(linb.UI.$ps[key]){
                        t=parseInt(profile.getRoot().css(key))||0;
                        if(t!=v){
                            // if in selected, refresh
                            if((t=profile.parent) && t.reSelectObject &&_.arr.indexOf(page.tempSelected, profile.$linbid)!=-1){
                                _.resetRun(":"+page.tempSelected.join(':'), function(){
                                    if(!profile.box)return;
                                    if(page.tempSelected.length>1)
                                        t.reSelectObject.call(t,profile, profile.getRoot().parent());
                                    else
                                        t.selectObject.call(t,profile, profile.getRoot().parent());
                                });
                            }
                        }
                    }
                    return v;
                };

                //div for hold resizer and proxy
                page.holder = linb.create('<div style="display:none;"></div>');
                //not append
                page.panelDiv.reBoxing().append(page.holder);
                //resizer
                page._createResizer();

                page.treebarCom
                .setItems(_.clone(CONF.widgets))
                .setCustomBehavior({
                    BAR:{
                        beforeMousedown : function(profile, e, src){
                            if(linb.Event.getBtn(e)!="left")return;
                            if(profile.properties.disabled)return;
                            // not resizable or drag
                            if(!profile.properties.dragKey)return;

                            // avoid nodraggable keys
                            if(profile.behavior.NoDraggableKeys){
                                var sk = profile.getKey(linb.Event.getSrc(e).id || "").split('-')[1];
                                if(sk && _.arr.indexOf(profile.behavior.NoDraggableKeys, sk)!=-1)return;
                            }
                            var id=linb.use(src).id(),
                                itemId = profile.getSubId(id),
                                properties = profile.properties,
                                item = profile.getItemByDom(id),
                                pos=linb.Event.getPos(e);

                            if(item.draggable){
                                profile.getSubNode('ITEMICON', itemId).startDrag(e,{
                                    dragType:'icon',
                                    shadowFrom:src,
                                    dragCursor:'pointer',
                                    targetLeft:pos.left+12,
                                    targetTop:pos.top+12,
                                    dragKey:item.dragKey || profile.properties.dragKey,
                                    dragData:{
                                        type:item.key,
                                        iniProp:item.iniProp,
                                        customRegion:item.customRegion,
                                        image: item.image,
                                        imagePos:item.imagePos
                                    }
                                });
                                linb.use(src).tagClass('-mouseover',false);

                                page._clearSelect();
                                page._setSelected([], true);
                            }
                        }
                    }
                })
                .toggleNode('linb.UI.absForm',true)

                //focus
                page.focusBtn = linb.create('<a href="javascript;" style="position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;">o</a>');
                page.focusBtn.onKeydown(function(pro, e){
                    if(!page.resizer)return;

                    var key = linb.Event.getKey(e),
                    k=key.key,
                    ctrl=key.ctrlKey,
                    shift=key.shiftKey,
                    step=1,
                    o=page.resizer.reBoxing(),
                    profile = page.resizer.get(0),
                    cssPos=o.cssPos(),
                    cssSize=o.cssSize(),
                    gridh = profile.properties.dragArgs.heightIncrement,
                    gridw = profile.properties.dragArgs.widthIncrement
                    ;

                    var t,b=false,size=null,pos=null;

                    switch(k){
                        case 'up':
                            b=true;
                            if(ctrl)
                                step=-1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.top+cssSize.height) % gridh)?-t:-gridh;
                                else
                                    step =(t = cssPos.top % gridh)?-t:-gridh;
                            }
                            if(shift){
                                o.heightBy(step);
                                profile.regions.heightBy(step);
                                size={ width :0, height :step};
                            }else{
                                o.topBy(step);
                                pos={left :0, top :step};
                            }
                            break;
                        case 'down':
                            b=true;
                            if(ctrl)
                                step=1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.top+cssSize.height) % gridh)?gridh-t:gridh;
                                else
                                    step =(t = cssPos.top % gridh)?gridh-t:gridh;
                            }
                            if(shift){
                                o.heightBy(step);
                                profile.regions.heightBy(step);
                                size={ width :0, height :step};
                            }else{
                                o.topBy(step);
                                pos={left :0, top :step};
                            }
                            break;
                        case 'left':
                            b=true;
                            if(ctrl)
                                step=-1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.left+cssSize.width) % gridw)?-t:-gridw;
                                else
                                    step =(t = cssPos.left % gridw)?-t:-gridw;
                            }
                            if(shift){
                                profile.regions.widthBy(step);
                                o.widthBy(step);
                                size={ width :step, height :null};
                            }else{
                                o.leftBy(step);
                                pos={left :step, top :0};
                            }
                            break;
                        case 'right':
                            b=true;
                            if(ctrl)
                                step=1;
                            else{
                                if(shift)
                                    step = (t=(cssPos.left+cssSize.width) % gridw)?gridw-t:gridw;
                                else
                                    step =(t = cssPos.left % gridw)?gridw-t:gridw;
                            }
                            if(shift){
                                o.widthBy(step);
                                profile.regions.widthBy(step);
                                size={ width :step, height :null};
                            }else{
                                o.leftBy(step);
                                pos={left :step, top :0};
                            }
                            break;
                        case 'delete':
                            page._deleteSelected();
                            page._focus();
                            break;
                        case 'esc':
                            page._clearSelect();
                            //reset
                            page._setSelected([], true);
                            break;
                    }
                    if(b){
                        profile.boxing().onUpdate(profile, profile._target, size, pos);
                        return false;
                    }
                }).
                onFocus(function(pro, e){
                    clearTimeout(page.timer);
                    page.resizer.active(false);
                }).
                onBlur(function(pro ,e){
                    page.timer = _.asyRun(function(){
                        if(page.resizer)page.resizer.inActive();
                    },200);
                });
                page.layoutBase.reBoxing().prepend(page.focusBtn);

                page._giveHandler(page.canvas.get(0),true);
                page._enablePanelDesign(page.canvas.get(0));

            },
            onDestroy:function(page){
                if(page.frame && page.frame.destroy)
                    page.frame.destroy();
            }
        },
        isDirty:function(){
            return !!this._dirty;
        },
        $tryToRefreshSel:function(profile){
            var page=this,t;

            if((t=profile.parent) && t.reSelectObject &&_.arr.indexOf(page.tempSelected, profile.$linbid)!=-1){
                _.resetRun(":"+page.tempSelected.join(':'), function(){
                    if(!profile.box)return;
                    if(page.tempSelected.length>1)
                        t.reSelectObject.call(t,profile, profile.getRoot().parent());
                    else
                        t.selectObject.call(t,profile, profile.getRoot().parent());
                });
                page.profileGrid.offEditor();
            }
        },
        resetCodeFromDesigner:function(sync){
            var page=this;
            if(page._dirty){
                
                var nodes = page.getWidgets(true);
                // reset iniComponents code
                var code = ('{\n' + page.getJSCode(nodes) ).replace(/\n/g, '\n'+_.str.repeat(' ',12))
                    + '\n'+_.str.repeat(' ',8)+ '}';
                page.resetCode("Instance", "iniComponents", code, !!sync);

                page._dirty=false;
            }
        },
        _inplaceedit:function(prf, nodeKey, multi, conf, node, left, top, w, h){
            var page=this,
                ismulti=!!conf[0],
                getF=conf[1],
                setF=conf[2],
                itemKey=conf[3],
                item;
            
            var unFun=function(setV){
                if(!inplaceEditor || !inplaceEditor.getSubNode('INPUT'))
                    return; 
                inplaceEditor.getSubNode('INPUT').onBlur();

                inplaceEditor.setVisibility('hidden').setLeft(-1000).setValue('',true);
                linb.Event.keyboardHook('esc');
            };
            
            if(!page.$inplaceEditor || page.$inplaceEditor.isDestroyed()){
                page.$inplaceEditor = new linb.UI.ComboInput({
                    type:'none',
                    dirtyMark:false,
                    visibility:'hidden'
                },{
                    onHotKeydown:function(p,kb){
                        if(kb.key=='tab' || kb.key=='enter'){
                            unFun();
                            return false;
                        }
                    }
                });
                page.canvas.append(page.$inplaceEditor);
                page.$inplaceEditor.render(true);
            }
            var inplaceEditor = page.$inplaceEditor;
            // to set the caption/label
            inplaceEditor.afterUIValueSet(function(p, ov, nv){
                if(ismulti){
                    if(typeof setF=='function')
                        setF(prf, item, itemKey, nv);
                    else{
                        var options={};
                        options[itemKey||"caption"]=nv;
                        prf.boxing()[setF](item.id,options);
                    }
                }else{
                    prf.boxing()[setF](nv);
                }
                page._dirty=true;
                
                // if single selected, refresh grid data
                if(page.tempSelected.length==1 && prf.parent && prf.parent.selectObject)
                    prf.parent.selectObject.call(prf.parent,prf, prf.getRoot().parent());
                
            });
            
            var oldV;
            if(ismulti){
                if(typeof getF=='function')
                    item=getF(prf, node.get(0));
                else
                    item=prf.boxing()[getF](node.get(0).$linbid);
                if(item){
                    oldV=item[itemKey||"caption"]||"";
                }else
                    return;
            }else{
                oldV=prf.boxing()[getF]();
            }
            
            // init
            inplaceEditor.setValue(oldV,true);
            // ensure on the top
            inplaceEditor.setZIndex(linb.Dom.TOP_ZINDEX + 10);
            inplaceEditor.setLeft(left-1).setTop(top-1).setWidth(w<10?10:(w+2)).setHeight(h<20?20:(h+2));

            // to hide
            node.setBlurTrigger('design:inplace:editor', unFun);
            linb.Event.keyboardHook('esc',0,0,0,function(){
                inplaceEditor.setValue(oldV,true);
                unFun();
            });
            
            // show            
            inplaceEditor.setVisibility('visible').activate();
        },
        _showPopMenu:function(e, flag){
            var page=this,
                toolbaritems=page.toolbar.getItems(),
                popMenu,
                items=[];
            _.arr.each(toolbaritems,function(item,i){
                if(item.hidden)return;

                if(flag && !item.canvasOnly)
                    return;

                if(item.level==1 && i!==0 && items.length>0){
                    items.push({type:'split'});
                }

                if(item.level==1){                    
                    _.arr.each(item.sub,function(subitem){
                        if(subitem.hidden)
                            return;
                        if(subitem.id=='viewsize'){
                            items.push({
                                id:item.id,
                                caption:subitem.tips,
                                sub:page.$canvasMenuItems1
                            });
                        }else if(subitem.type=='split'){
                            items.push({type:'split'});
                        }else{
                            items.push({
                                id:subitem.id,
                                image:subitem.image,
                                imagePos:subitem.imagePos,
                                caption:subitem.tips
                            });
                        }
                    });
                }else{
                    var sub=[];
                    _.arr.each(item.sub,function(subitem){
                        if(subitem.hidden)
                            return;
                        /*if(subitem.id=='viewsize'){
                            sub.push({
                                id:item.id,
                                caption:'xxxxxxxxxx',
                                image:subitem.image,
                                imagePos:subitem.imagePos,
                                sub:page.$canvasMenuItems1
                            });
                        }else*/ if(subitem.type=='split'){
                            sub.push({type:'split'});
                        }else{
                            sub.push({
                                id:subitem.id,
                                image:subitem.image,
                                imagePos:subitem.imagePos,
                                caption:subitem.tips
                            });
                        }
                    });
                    items.push({
                        id:item.id,
                        caption:item.caption,
                        sub:sub
                    });
                }
            });
            popMenu = new linb.UI.PopMenu({
                items:items
            },{onHide:function(p){
                p.boxing().destroy();

                },onMenuSelected:function(p,item){
                    if(item.viewsize)
                        page.popViewSize.fireItemClickEvent(item.id);
                    else
                        page.toolbar.fireItemClickEvent(item.id);

                    p.boxing().hide();
                }
            });

            popMenu.pop(linb.Event.getPos(e));
        },
        _oncanvasmenu:function(profile, e, src){
            if(linb.Event.getSrc(e)==this.canvas.getRootNode()){
                this._showPopMenu(e, true);
                return false;
            }
        },
        _createResizer:function(){
            var page=this;
            //proxy region
            page.proxy = linb.create('<div style="position:absolute;border:dashed 1px blue;overflow:visible;left:-100px;top:-100px;z-index:1000"></div>');
            page.proxy.get(0).zIndexIgnore=true;
            page.holder.append(page.proxy);


            //resizer
            page.resizer = linb.create('AdvResizer',{
                forceMovable:false,
                dragArgs:{
                    widthIncrement:this.dropOffset,
                    heightIncrement:this.dropOffset
                },
                zIndex:linb.Dom.TOP_ZINDEX
            },{
                onConfig:function(profile, e, src){
                     var prf = linb.getObject(profile.properties.tag);
                     if(prf){
                        linb.ComFactory.getCom('VisualJS.CustomDecoration',function(){
                          this.setProperties({
                              targetProfile:prf
                          });
                          this.show();
                      });
                    }
                },
                onContextmenu:function(profile, e, src){
                    this._showPopMenu(e);
                    return false;
                }
            });
            page.resizer.setHost(page)
            .onItemsSelected(function(profile, ids){
                this.pProfile.setSelectFromResizer.call(this.pProfile,ids);
            })
            .onActive(function(profile){
                clearTimeout(this.timer);
                this._focus();
            })
            .onUpdate(function(profile, target, size, cssPos){
                page._change();

                var self=this;
                if(target){
                    var b=false;
                    target.each(function(target){
                        target = linb([target]);
                        var profile = linb.UIProfile.getFromDom(target.get(0).id), widget=profile.boxing(),p = profile.properties, m = profile.box.$DataModel;
                        if(size){
                            var w=null,h=null;
                            if(size.width){
                                if(p && !m.width){
                                    b=true;
                                }else{
                                    switch(p.dock){
                                        case 'top':
                                        case 'bottom':
                                        case 'fill':
                                        case 'cover':
                                        case 'width':
                                            b=true;
                                            break;
                                        case 'left':
                                        case 'right':
                                        case 'height':
                                            b=true;
                                        default:
                                            w = page._refresh(widget,'width',size);
                                        }
                                }
                            }
                            if(size.height){
                                if(p && !m.height){
                                    b=true;
                                }else{
                                    switch(p.dock){
                                        case 'left':
                                        case 'right':
                                        case 'fill':
                                        case 'cover':
                                        case 'height':
                                            b=true;
                                            break;
                                        case 'top':
                                        case 'bottom':
                                        case 'width':
                                            b=true;
                                        default:
                                            h = page._refresh(widget,'height',size);
                                    }
                                }
                            }

                            self._sizeUpdated(target, { width :w, height :h});
                            linb.UI.$tryResize(profile,w,h,null,true);
                        }
                        if(cssPos){
                            var x=null,y=null;
                            if(cssPos.left){
                                if(p && !m.left){
                                    b=true;
                                }else{
                                    switch(p.dock){
                                    case 'top':
                                    case 'bottom':
                                    case 'left':
                                    case 'right':
                                    case 'fill':
                                    case 'cover':
                                    case 'width':
                                        b=true;
                                        break;
                                    case 'height':
                                        b=true;
                                    default:
                                        x = page._refresh(widget,'left',cssPos);
                                    }
                                }
                            }
                            if(cssPos.top){
                                if(p && !m.top){
                                    b=true;
                                }else{
                                    switch(p.dock){
                                    case 'left':
                                    case 'right':
                                    case 'top':
                                    case 'bottom':
                                    case 'fill':
                                    case 'cover':
                                    case 'height':
                                        b=true;
                                        break;
                                    case 'width':
                                        b=true;
                                     default:
                                        y = page._refresh(widget,'top',cssPos);
                                    }
                                }
                            }

                            self._posUpdated(target, {left :x, top :y});
                        }
                    });
                    if(b)profile.boxing().rePosSize();
                }
                return false;
            })
            .onFocusChange(function(profile, index){
                if(this.tempSelected){
                    this.SelectedFocus=index;
                    _.resetRun('$profilegrid$', this._refreshProfileGrid,0,[this.tempSelected],this);
                    
                    this.resizer.setConfigBtn(this.tempSelected.length==1);
                    this.resizer.setTag(this.tempSelected[0]);
                }
            })
            .onDblclick(function(profile, e, src){
                if(CONF.designer_editMode != "simple"){
                    var arr = this.tempSelected;
                    if(arr.length){
                        var o = linb.getObject(arr[0]);
                        page.resetTaskList();
                        // if dirty
                        if(page._dirty)
                            page.resetCodeFromDesigner();

                        page.addTask(function(){
                            page.searchInEditor(".setHost(host,\""+o.alias+"\")");
                        });
                        
                        page.startTaskList();
                    }
                }else if(typeof CONF.designer_ctrldblclick=='function'){
                    var arr = this.tempSelected,
                        prf;
                    if(arr.length)
                        prf = linb.getObject(arr[0]);

                    CONF.designer_ctrldblclick(page, prf, e, src);
                }
            })
            //select children even if parent is selected
            .onRegionClick(function(profile, e){
                var ep=linb.Event.getPos(e),arr,t,m,ret;
                var tryinplaceedit=function(prf,nodeKey,multi,conf, node, root,epoff,ppos,rgw, rgh, subId){

                    if(node && !node.isEmpty()){
                        var pos=node.offset(null,root),
                        w=node.offsetWidth(),
                        h=node.offsetHeight();
                        
                        if(epoff.left>pos.left && epoff.top>pos.top && epoff.left<pos.left+w && epoff.top<pos.top+h &&
                           epoff.left<rgw&& epoff.top<rgh){

                            _.asyRun(function(){
                                if(!node.get(0) || !node.get(0).offsetWidth)
                                    return;
                                page._inplaceedit(prf, nodeKey, multi,conf, node, ppos.left+pos.left,ppos.top+pos.top,w,h);
                            },200);

                            return true;
                        }
                    }
                    return false;
                };
                var fun1=function(ep,prf){
                    var conf=CONF.inplaceedit && CONF.inplaceedit[prf.key],
                        root,nodes,node;
                    if(!_.isHash(conf))
                        return false;
                    for(var nodeKey in conf){
                        var item=conf[nodeKey],
                            ismulti=!!item[0];
                            
                        var root=prf.getRoot(),
                            //mouse abs pos offset
                            epoff={},
                            //parent abs pos
                            ppos=root.offset(),
                            inpos=root.offset(null,page.canvas.getRoot()),
                            //parent size
                            rgw=root.offsetWidth(),
                            rgh=root.offsetHeight();
                        epoff.left=ep.left-ppos.left;
                        epoff.top=ep.top-ppos.top;

                        // multi 
                        if(ismulti){
                            var nodes=prf.getSubNode(nodeKey,true).get(),
                                node;
                            for(var i=0,l=nodes.length;i<l;i++){
                                node=nodes[i];
                                if(node.id){
                                    var subId=prf.getSubId(node.id);
                                    if(tryinplaceedit(prf, nodeKey, 1, item, linb([node.$linbid]), root, epoff,inpos, rgw, rgh, subId))
                                        return true;
                                }
                            }
                        }
                        // single
                        else{
                            if(tryinplaceedit(prf, nodeKey,  0, item,prf.getSubNode(nodeKey), root, epoff,inpos, rgw, rgh, subId))
                                return true;
                        }
                    }
                    return false;
                },
                fun2=function(arr, ep, parent){
                    var me=arguments.callee,
                        m,rt,pos,w,h,
                        //mouse abs pos offset
                        epoff={},
                        //parent abs pos
                        ppos=parent.offset(),
                        //parent size
                        rgw=parent.offsetWidth(),
                        rgh=parent.offsetHeight()
                        ;
                    epoff.left=ep.left-ppos.left;
                    epoff.top=ep.top-ppos.top;

                    _.arr.each(arr,function(o){
                        if(!(m=o[0].getRoot()).isEmpty()){
                            if((o[0].children).length)
                                if(rt=me(o[0].children, ep, m))
                                    return false;
                            pos=m.offset(null,parent);
                            w=m.offsetWidth();
                            h=m.offsetHeight();
                            if(epoff.left>pos.left && epoff.top>pos.top && epoff.left<pos.left+w && epoff.top<pos.top+h &&
                               epoff.left<rgw&& epoff.top<rgh){
                                rt=o[0].$linbid;
                                return false;
                            }
                        }
                    });
                    return rt;
                };
                if(!(arr=this.tempSelected) || !arr.length)return;
                _.arr.each(arr,function(o){
                    t=linb.getObject(o);
                    // to check whether to in-place edit label/caption or not
                    ret=fun1(ep, t);
                    if(ret)return false;
                    
                    // to check whether select a child or not
                    ret=fun2(t.children, ep, t.getRoot());
                    if(ret)return false;
                });
                if(ret){
                    // to select a child
                    if(ret!==true){
                        this.selectWidget([ret]);
                        return false;
                    }
                }
            });
            page.holder.append(page.resizer);
        },
        //dettach resizer and proxy from panel
        _detatchResizer:function(){
            var self=this;
            self.holder.append(self.resizer);
            self.holder.append(self.proxy);
            //clear those cache
            self.pProfile = self.pNode = null;
        },
        //append resizer and proxy to panel
        _attachResizer:function(profile, node){
            var self=this;
            self.proxy.css('display','none');

            if(!self.resizer || !self.resizer.getRootNode() || !self.resizer.get(0).renderId){
                // sometimes, resizer and proxy will be removed, we have to create them again
                self._createResizer();
            }

            self.resizer.resetTarget(null,false);
            linb(node)
            .append(self.resizer)
            .append(self.proxy)
            ;
            //set markable var
            self.pProfile = profile;
            self.pNode = node;
            _.merge(self.resizer.get(0).properties.dragArgs,{
                widthIncrement:self.dropOffset,
                heightIncrement:self.dropOffset
            },'all');
        },
        //give focus
        _focus:function(){
            //avoid focus trigger scroll
//            this.focusBtn.top(this.panelDiv.reBoxing().scrollTop())
//            .left(this.panelDiv.reBoxing().scrollLeft());
            this.focusBtn.focus();
        },
        _setSelected:function(ids, flag){
            var self=this,
                tb=self.toolbar,
                t;
            ids=_.isArr(ids)?ids:[];
            self.tempSelected = ids;
            self.SelectedFocus = ids.length-1;

            tb.showGroup('align', ids.length>1?true:false);
            if(ids.length>0 && (t=linb.getObject(ids[0])))
                tb.showGroup('pos', (t.box['linb.UI'] && !t.box.$noDomRoot));
            else
                tb.showGroup('pos', false);

            tb.showGroup('del', ids.length>0?true:false);

            // fire event
            if(flag) self.events.onSelected.apply(self.parent, [self, self.pProfile, ids]);

            self._focus();

            return self;
        },
        _sizeUpdated:function(pro, size){
            var t,self=this;
            if(!(t=self.profileGrid.get(0).$widget))return;
            if(linb.UIProfile.getFromDom(pro.get(0).id) == t.get(t._nodes.length-1)){
                if(size.width!==null)
                    self.profileGrid.updateCellByRowCol('properties:width','value',{value:size.width});
                if(size.height!==null)
                    self.profileGrid.updateCellByRowCol('properties:height','value',{value:size.height});
            }
        },
        _posUpdated:function(pro, cssPos){
            var t,self=this;
            if(!(t=self.profileGrid.get(0).$widget))return;
            if(linb.UIProfile.getFromDom(pro.get(0).id) == t.get(t._nodes.length-1)){
                if(cssPos.left!==null)
                    self.profileGrid.updateCellByRowCol('properties:left','value',{value:cssPos.left});
                if(cssPos.top!==null)
                    self.profileGrid.updateCellByRowCol('properties:top','value',{value:cssPos.top});
            }
        },
        parseFun:function(txt){
            var str = txt;
            var reg = new RegExp("^(\\s*\\/\\*[^*@]*\\*+([^\\/][^*]*\\*+)*\\/\\s*)|^(\\s*\\/\\/[^\\n]*\\s*)");
            while(reg.test(str)){
                str = str.replace(reg,'');
            }
            str = str.replace(/\s*/,'');
            if(!str)return {comments:null, code:null};

            if (false === this.check(str.replace(/\s*$/,'')) ) return false;

            return {comments: '\n'+txt.replace(str,''), code:str.replace(/\s*$/,'')};
        },
        _designable : function(profile){
            var me=arguments.callee,
                self=this;
            //change
            self._giveHandler(profile);

            profile.$inDesign=true;

            var t=profile.behavior.PanelKeys;
            if(t && t.length)
                self._enablePanelDesign(profile);
            if(profile.children && profile.children.length){
                _.arr.each(profile.children,function(o){
                    me.call(self, o[0]);
                });
            }
            //for UI refresh itself
            profile.$refreshTrigger=function(profile){
                me.call(self,profile);

                //off editor
                self.profileGrid.offEditor();
            };
        },

        _WidgetsSelected : function(ids){
            var self=this;
            self._setSelected(ids,true);
            self.iconlist.setUIValue(null);
        },
        _clearSelect : function(profile){
            var self=this;
            if(self.resizer && self.resizer.get(0) && self.resizer.get(0).renderId){
                self.resizer.resetTarget(null,false);
                self._detatchResizer();
            }
            self.iconlist.setUIValue(null);
        },
        getByCacheId:function(idArr){
            var arr=[],t,n=linb.UI._cache;
            idArr = idArr instanceof Array?idArr:[idArr];
            _.arr.each(idArr,function(id){
                if(t=n['$'+id])arr[arr.length]=t;
            });
            return linb.UI.pack(arr,false);
        },
        _deleteSelected : function(){
            var page = this;
            if(!page.tempSelected || !page.tempSelected.length)return;
            linb.UI.Dialog.confirm(linb.getRes('VisualJS.designer.confirmdel'),linb.getRes('VisualJS.designer.confirmdel2', page.tempSelected.length),function(){
                var sel = page.getByCacheId(page.tempSelected);
                if(!sel.isEmpty()){
                    var ids=[];
                    //destroy, and will dettach from parent
                    var ws = page.getByCacheId(page.tempSelected);
                    ws.each(function(o){
                        if(!(o.box['linb.UI'] && !o.box.$noDomRoot))
                            page.iconlist.removeItems(o.$linbid);
                        //refresh other docks
                        else if(o.properties && o.properties.dock && o.properties.dock != 'none')
                            o.boxing().setDockIgnore(true)
                    });

                    ws.destroy();
                }else{
                    var o = linb.getObject(page.tempSelected[0]);
                    page.iconlist.removeItems(page.tempSelected);
                    o.boxing().destroy();
                }
                //clear resizer
                page._clearSelect(page.pProfile);

                //fire event
                //page.onDeleted(page.pProfile, page.tempSelected);

                page._setSelected(null,true);
            });

        },
        _giveHandler:function(profile, isCanvas){
            var prevent = function(){return},
                page=this,
                fun = function(){
                    //don't set to canvas
                    if(!isCanvas){
                        profile.getRoot()
                        .beforeClick(prevent)
                        .afterClick(prevent)
                        .onClick(function(pro, e, src){
                            var esrc=linb.Event.getSrc(e),
                                id,profile;

                            //for lang span, or inner renderer
                            while((!esrc.id || esrc.id==linb.$localeDomId) && esrc.parentNode!==document&& esrc.parentNode!==window)
                                esrc=esrc.parentNode;

                            id=esrc.id;
                            esrc=null;
                            if(!id)return;

                            if(linb.UIProfile.getFromDom(id) !== (profile=linb.UIProfile.getFromDom(linb.use(src).id())))return;

                            if(!profile)return;

                            var t,key=linb.Event.$keyboard;

                            //if change panel, clear the panel selected
                            if(page.pProfile && (page.pProfile !=profile.parent))
                                page.pProfile.selected = [];

                            if(t=profile.parent){
                                if(key && key.shiftKey)
                                    t.reSelectObject.call(t,profile, profile.getRoot().parent());
                                else
                                    t.selectObject.call(t,profile, profile.getRoot().parent());
                            }
                            return false;
                        });

                        profile.$onDock=function(profile){
                            page.$tryToRefreshSel(profile);
                        };
                        profile.$afterRefresh=function(profile){
                            page.$tryToRefreshSel(profile);
                        };
                    }

                    var t=profile.behavior.PanelKeys;
                    if(t && t.length){
                        profile.getSubNode(t[0], true).addClass('panel')
                        .$addEventHandler('drop')
                        .$addEventHandler('mousedown')
                        .$addEventHandler('click')
                        .$addEventHandler('drag')
                        .$addEventHandler('dragstop')
                        .$addEventHandler('mouseup');
                    }
                };
            //add a class panel
            if(profile.renderId){
                fun();
            }else{
                profile.$onrender=fun;
            };

        },
        _enablePanelDesign:function(profile){
            var t,key = profile.box.KEY,pool=profile.behavior.PanelKeys, page=this,h, k,
            self=this,
            cb={
                //overwrite
                beforeMouseover:function(profile, e, src){
                    var dd = linb.DragDrop, pp=dd.getProfile(), key = pp.dragKey, data = pp.dragData;

                    //not include the dragkey
                    if(!key
                    || !data
                    || !(new RegExp('\\b'+key+'\\b')).test(profile.box.getDropKeys(profile, src)+":___iDesign")

                    || data.parentId == profile.$linbid
                    || (data.data && _.arr.indexOf(data.data,profile.$linbid)!=-1)

                    || (profile.onDropTest && (false===profile.boxing().onDropTest(profile, key, data)))
                    )return;

                    //for trigger onDrop
                    dd.setDropElement(src);
                    //show region
                    _.resetRun('setDropFace', dd.setDropFace, 0, [src], dd);

                    if(profile.onDragEnter)profile.boxing().onDragEnter(profile, e, this, key, data, profile.getItemByDom(linb.use(src).id()));
                },
                beforeDrop:function(profile, e, src){
                    self._change();

                    var target,
                        dd=linb.DragDrop.getProfile(),
                        dropx=dd.x,
                        dropy=dd.y,
                        dragKey = dd.dragKey,
                        dragData = dd.dragData,
                        type=dragData.type,
                        iniProp=dragData.iniProp,
                        customRegion=dragData.customRegion,
                        image = dragData.image,
                        imagePos = dragData.imagePos,
                        data=dragData.data,
                        pos=dragData.pos,

                        ids,
                        offset = self.dropOffset,

                        fun=function(){
                            var page=arguments.callee.page,t=linb.SC(type);
                            if(!(t['linb.UI'] && !t.$noDomRoot)){
                                //give design mark
                                var o = linb.create(type).get(0);
                                o.$inDesign=true;

                                page.iconlist.insertItems([{id:o.$linbid, image:linb.ini.img_bg, tips:o.key, imgStyle:'background:url('+image+') '+ imagePos}],null,false);
                                page.iconlist.setUIValue(o.$linbid);
                            }else{
                                //before drop check
                                //if(false===_.tryF(c.beforeAddWidget, [data], profile))return;

                                //check position
                                //give design mark
                                target = new (linb.SC(linb.absBox.$type[type]));
                                target.get(0).$inDesign=true;

                                if(_.isHash(iniProp)){
                                    target.setProperties(iniProp);
                                }

                                if(!customRegion && target['linb.UI']){
                                    var parentNode=profile.keys.PANEL?profile.getSubNode(profile.keys.PANEL, profile.getSubId(src)):profile.getRoot();
                                    if(!parentNode.isEmpty()){
                                        var p=target.get(0).properties,
                                            h=parentNode.get(0).style.height;
                                        // absolute for fixed height parent, or relative
                                        if(h && h!='auto'){
                                            // get Pos
                                            var basePos = linb.use(src).offset(),
                                            cssPos = {
                                                left : parseInt((dropx - basePos.left)/offset)*offset,
                                                top : parseInt((dropy - basePos.top)/offset)*offset
                                            };
                                            target.setLeft(_.arr.indexOf(['top','bottom','width','fill','cover'],p.dock)!=-1?0:cssPos.left);
                                            target.setTop(_.arr.indexOf(['left','right','height','fill','cover'],p.dock)!=-1?0:cssPos.top);
                                            target.setPosition('absolute');
                                        }else{
                                            target.setLeft('auto');
                                            target.setTop('auto');
                                            target.setPosition('relative');
                                        }
                                    }
                                }
                                target.setZIndex(1);
                                target.render();

                                var pro = target.get(0);

                                page._designable(pro);

                                pro._host=page;

                                ids=[target['linb.absBox'] ? pro.$linbid : target.$linbid];

                                // add widgets to panel
                                //if(target['linb.UI'])linb.UI.canvas.prototype.append.call(profile.boxing(), target);
                                if(target['linb.UI'])profile.boxing().append(target, profile.getItemIdByDom(linb.use(src).id()));
                                //_.tryF(page.afterAddWidget, [target, profile.$linbid], page);

                                profile.setSelectFromPanel.call(profile, src, ids);

                            }
                        };
                        fun.page=page;
                    if(type){
                        if(linb.SC.get(type)){
                            fun();
                        }else{
                            _.observableRun(function(){
                                linb.Dom.setCover(linb.getRes('VisualJS.designer.loading') + type);
                                linb.SC(type, fun, true);
                            });
                        }
                    }else{
                        var basePos = linb.use(src).offset(),
                        cssPos = {
                            left : parseInt((dropx - basePos.left)/offset)*offset,
                            top : parseInt((dropy - basePos.top)/offset)*offset
                        };
                        var t;
                        ids=data;
                        target = self.getByCacheId(ids);

                        var minx,miny;
                        target.each(function(o,i){
                            if(i===0){
                                minx = o.properties.left;
                                miny = o.properties.top;
                            }else{
                                minx = Math.min(o.properties.left,minx);
                                miny = Math.min(o.properties.top,miny);
                            }
                        });
                        target.each(function(o){
                            if(o.properties.dock!='none')linb.UI.$dock(o,true);
                            else{
                                o.boxing()
                                .setLeft(o.properties.left - minx + cssPos.left)
                                .setTop(o.properties.top - miny + cssPos.top);
                            }
                        });

                        // add widgets to panel
                        profile.boxing().append(target, profile.getItemIdByDom(src));
                        //_.tryF(page.afterMoveWidget, [target, profile.$linbid], page);

                         profile.setSelectFromPanel.call(profile, src, ids);
                    }
                },
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    if(linb.Event.getSrc(e).$linbid !== src)return;
                    var o =linb(src),
                    pos = linb.Event.getPos(e),
                    absPos=o.offset(),
                    w = o.innerWidth(),
                    h = o.innerHeight();
                    //in the scroll bar
                    if(pos.left-absPos.left>w)return;
                    if(pos.top-absPos.top>h)return;

                    // keep pos
                    profile._offsetPos = absPos;
                    profile._scrollTop = o.scrollTop();
                    profile._scrollLeft = o.scrollLeft();

                    page._attachResizer(profile, src);
                    profile._selregion = {};

                    var pos = linb.Event.getPos(e);
                    linb(src).startDrag(e,{
                        targetReposition:false,
                        dragType:'blank',
                        dragCursor:'crosshair',
                        targetLeft:pos.left,
                        targetTop:pos.top,
                        dragDefer:1
                    });
                    profile.$dragging=false;
                },
                onClick:function(profile, e, src){
                    if(linb.Event.getSrc(e) !== linb.use(src).get(0))return;
                    self._clearSelect(profile);
                    profile.setSelectFromPanel.call(profile, src, []);
                },
                beforeDrag:function(profile, e, src){
                    var t, dd =linb.DragDrop.getProfile(), pos = dd.offset,
                    proxy=page.proxy;

                    var region = profile._selregion;
                    if((t=pos.x)<0)pos.x=-t;
                    if((t=pos.y)<0)pos.y=-t;

                    region.left=Math.min(dd.ox,dd.x) - profile._offsetPos.left + profile._scrollLeft;
                    region.top=Math.min(dd.oy,dd.y) - profile._offsetPos.top + profile._scrollTop;
                    region.width=pos.x;
                    region.height=pos.y;

                    proxy.cssRegion(region);

                    if(!profile.$dragging){
                        proxy.css('display','block');
                        profile.$dragging = true;
                    }
                },
                beforeDragstop:function(profile, e, src){
                    //if(!profile._selregion)return;
                    var region = profile._selregion,
                    proxy=page.proxy,

                    selected=[],t,m,o,x1,y1,x2,y2,xx1,yy1,xx2,yy2,
                    self=linb.use(src).get(0);
                    ;

                    xx1 = region.left;
                    yy1 = region.top;
                    xx2 = xx1 + region.width;
                    yy2 = yy1 + region.height;
                    if(m=profile.children){
                        _.arr.each(m,function(v,i){
                            v=v[0];
                            if(v.renderId && v.getRootNode() && v.getRootNode().parentNode===self && v.getRootNode().style.display!='none' && v.getRootNode().style.visibility!='hidden'){
                                o=v.getRoot();
                                x1= o.offsetLeft();
                                y1= o.offsetTop();
                                x2 = x1 + o.width();
                                y2 = y1 + o.height();
                                //in the region
                                if(xx2>x1 && x2>xx1 && yy2>y1 && y2>yy1)selected.push(v.$linbid);
                            }
                        });
                        //reset/cache proxy
                        profile.setSelectFromPanel.call(profile, src, selected);
                    }
                    //for firefox cursor bug
                    _.asyRun(function(){
                        proxy.css('display','none');
                    });
                },
                onMouseup:function(profile, e, src){
                    _.asyRun(function(){
                        page.proxy.css('display','none');
                    });
                }
            };

            if(t=pool){
                var i=_.arr.indexOf(t,'PANEL');
                if(i==-1)
                    i=_.arr.indexOf(t,'KEY');

                if(i!=-1){
                    i=t[i];
                    if(profile.keys.KEY == profile.keys[i])
                        h=cb;
                    else{
                        h={};
                        h[i]=cb;
                    }
                    //profile.boxing().setCustomBehavior(h);
                    profile._CB=h;
                    // disable behavior
                    // delete profile.behavior;
                    profile.clearCache();
                }
            }

            _.merge(profile,{
                selectObject:function(obj,node){
                    var profile = this,
                    id=obj.$linbid;
                    return this.setSelectFromPanel(node, [id]);
                },
                reSelectObject:function(obj, node){
                    var profile = this;
                    id=obj.$linbid;
                    if(profile.selected && _.arr.indexOf(profile.selected,id)!=-1){
                        _.arr.removeValue(profile.selected,id);
                    }else{
                        (profile.selected ||(profile.selected=[])).push(id);
                    }
                    return this.setSelectFromPanel(node, profile.selected);
                },
                setSelectFromResizer:function(ids){
                    var profile = this;
                    profile.selected = ids;
                    return this.resetSelectRel();
                },
                setSelectFromPanel:function(node, ids){
                    var profile = this;
                    //append resizer
                    if(self.pProfile !== profile ||
                        self.pNode !== node){
                        self._clearSelect(profile);
                        self._attachResizer(profile, node);
                    }

                    profile.selected = ids;
                    self.resizer.resetTarget(self.getByCacheId(profile.selected).reBoxing(), false);
                    return this.resetSelectRel();
                },
                resetSelectRel:function(){
                    var profile = this;
                    if(profile.selected && profile.selected.length){
                        var t=self.resizer.get(0).properties;
                        t.dragArgs={
                            dragKey:'___iDesign',
                            widthIncrement:self.dropOffset,
                            heightIncrement:self.dropOffset,
                            dragData:{
                                parentId:profile.$linbid,
                                data:profile.selected
                            }
                        };
                    }else{
                        self._clearSelect(profile);
                    }
                    _.tryF(self._WidgetsSelected,[profile.selected],self);

                    self._focus();
                }
            },'all');


        },
        _refreshProfileGrid:function(ids){
            var page=this,
                data=page._cls;
            page.profileGrid.removeAllRows();

            // for the com
            if(!ids || !ids.length){
                var pro = this.canvas.get(0),
                    arr=[],
                    eh=linb.Com.$EventHandlers,
                    em=_.get(data,['Instance','events']);

                _.each(eh,function(o,i){
                    var $fun = function(profile, cell){
                        var o = cell.$tagVar;
                        if(!o)return;

                        var funname;
                        if(!cell.value){
                            funname='_'+o.widgetName.toLowerCase().replace(/\./g,'_')+'_'+o.key.toLowerCase();
                            profile.boxing().updateCell(cell.id,{value: funname},false,true);
                        }else{
                            funname=cell.value;
                        }

                        page.resetTaskList();

                        if(!page._cls.Instance[funname]){
                            // reset
                            page.resetCode("Instance","events",_.stringify(page._cls.Instance.events));

                            page.addCode("Instance", funname,  o.ini.toString().replace(/\s*\}$/,'\n\n}') );

                            page.buildNameSpace(true);
                        }

                        page.addTask(function(){
                            page.focusEditor("Instance", funname);
                        });
                        
                        page.startTaskList();
                        
                        page._dirty=false;
                    },
                    $tagVar = {
                         widgetName: 'com',
                         path:"Instance",
                         key:i,
                         ini:o
                    };
                    arr.push({id:'event:'+i, tipk:'event', tipv:i, value:i, caption:i, cells:[
                        {value:(em&&em[i])||'', type:'popbox', $tagVar:$tagVar, event:$fun}]
                    });
                });
                var rows=[
                    {id:'properties:width', caption:'width',tips:'Canvas width', cells:[{value: pro.properties.width}] },
                    {id:'properties:height',caption:'height', tips:'Canvas height', cells:[{value: pro.properties.height}] }
                ];
                if(CONF.designer_editMode != "simple"){
                    rows.push({id:'UIE', group:true, caption:'events', sub:arr});
                }
                var list=[];

                page.profileGrid.insertRows(rows);
                page.profileGrid.get(0).$widget=page.canvas;
            }else{
                var t,len,
                  uis = page.getByCacheId(ids),
                  pro,
                  rows=[],
                  $fun = function(profile, cell){
                      var o = cell.$tagVar;
                      if(!o)return;
                      var node = profile.getSubNode('CELL', cell._serialId),
                          obj =o.profile[o.name];
                      linb.ComFactory.getCom('objEditor',function(){
                          this.host = page;
                          this.setProperties({
                              caption:o.widgetName+" => "+o.name,
                              image:CONF.img_app,
                              imagePos:obj.constructor==Array?'-128px -32px':'-16px -32px',
                              text:linb.Coder.formatText(
                                  _.stringify(
                                      _.clone(obj, function(o,i){return (i+'').charAt(0)!='_'})
                                  )
                              ),
                              fromRegion:node.cssRegion(true),
                              tagVar:o,
                              onOK:function(page){
                                  this._change();
                                  var tagVar = page.properties.tagVar;
                                  tagVar.profile.boxing()[tagVar.funName](page.properties.object);
                                  node.focus();
                              }
                          });
                          this.show();
                      });
                  };

                  if(len = uis._nodes.length){
                      pro = uis.get(this.SelectedFocus);
                  }else{
                      pro= linb.getObject(ids[0]);
                      uis = pro.boxing();
                  }

                  rows.push({id:'key', tipk:'class', caption:'<strong>class</strong>',
                    tips:CONF.designer_editMode != "simple"?linb.getRes('VisualJS.designer.openapi'):"",
                    cells:[{disabled:true, value:'<strong>'+pro.key+'</strong>',type:'label',

                        tips:CONF.designer_editMode != "simple"?linb.getRes('VisualJS.designer.openapi'):""}] });
                  rows.push({id:'alias',tipk:'fun', tipv:'alias',caption:'<strong>alias</strong>',cells:[{value:pro.alias,type:uis._nodes.length===1?'input':'label'}] });

                  if(CONF.designer_editMode != "simple"){
                      if(pro.domId){
                          rows.push({id:'theme',tipk:'fun', tipv:'theme',caption:'<strong>theme</strong>',cells:[{value:pro.theme, type:'input'}] });
                          rows.push({id:'domId',tipk:'fun', tipv:'setDomId',value:'setDomId',caption:'<strong>domId</strong>',cells:[{value:pro.domId,type:uis._nodes.length===1?'input':'label'}] });
                      }
                  }

                  //if single selected
                  if(uis._nodes.length==1){
                      //get the important properties:
                      var arr=page.__buildSubRows(uis,'special',true);
                      _.arr.each(arr,function(o){
                          o.cells[0].caption= o.cells[0].value ;

                          rows.push(o);
                      });
                  }
                  rows.push({id:'properties',  group:true, caption:'properties', sub:true});

                  //if single selected
                  if(uis._nodes.length==1){
                        if(CONF.designer_editMode != "simple"){
                            rows.push({id:'UIE', group:true, caption:'events', sub:true});
                        }

                      if(pro.domId){
                          rows.push({id:'CS', tipk:'fun', tipv:'setCustomStyle', value:'setCustomStyle',caption:'Custom Style', cells:[{value:'[<strong> key/value pairs</strong>]', event:$fun, $tagVar:{
                              widgetName:pro.alias,
                              name:'CS',
                              funName:'setCustomStyle',
                              profile:pro
                          }, type:'popbox', editorReadonly:true}] });
                          rows.push({id:'CC',tipk:'fun', tipv:'setCustomClass',value:'setCustomClass',caption:'Custom Class', cells:[{value:'[<strong> key/value pairs</strong>]', event:$fun, $tagVar:{
                              widgetName:pro.alias,
                              name:'CC',
                              funName:'setCustomClass',
                              profile:pro
                          }, type:'popbox', editorReadonly:true}] });
                          if(CONF.designer_editMode != "simple"){
                              rows.push({id:'CB',tipk:'fun', tipv:'setCustomBehavior',value:'setCustomBehavior',caption:'Custom Behaviors', cells:[{value:'[<strong> key/value pairs</strong>]', event:$fun, $tagVar:{
                                  widgetName:pro.alias,
                                  name:'CB',
                                  funName:'setCustomBehavior',
                                  profile:pro
                              }, type:'popbox', editorReadonly:true}] });
                              rows.push({id:'CF',tipk:'fun', tipv:'setCustomFunction',value:'setCustomFunction',caption:'Custom Functions',cells:[{value:'[<strong> key/value pairs</strong>]', event:$fun, $tagVar:{
                                  widgetName:pro.alias,
                                  name:'CF',
                                  funName:'setCustomFunction',
                                  profile:pro
                              }, type:'popbox', editorReadonly:true}] });
                          }
                      }
                  }

                  this.profileGrid.insertRows(rows);

                  //set target
                  this.profileGrid.get(0).$widget=uis;
            }
        },
        _change:function(){
            this._dirty=true;
            _.tryF(this.events.onValueChanged, [this, null], this.host);
        },

        //avoid to conflict with design code
        $toolbar_onclick:function(profile, item, group, e, src){
            var page = this, id=item.id;
            switch(group.id){
                case 'code':
                    switch(id){
                        case 'viewsize':
                            page.popViewSize.pop(src);
                            break;
                        case 'format':
                        case 'json':
                            _.observableRun(function(){
                              var dialog = page.$codeDlg || (page.$codeDlg=new linb.UI.Dialog({left:100,top:100,width:600,height:400,minBtn:false,caption:'$VisualJS.pageEditor.formatted'},{beforeClose:function(p){p.boxing().hide();return false}})),
                                  t,
                                  nodes,
                                  code;
                              if(page.tempSelected && page.tempSelected.length){
                                  nodes=[];
                                  _.arr.each(page.tempSelected,function(i){
                                      nodes.push(linb.getObject(i));
                                  });
                              }else
                                  nodes = page.getWidgets(true);

                                switch(id){
                                    case 'format':
                                        code=linb.Coder.formatHTML(page.getJSCode(nodes),'js',['plain']);
                                        break;
                                    case 'json':
                                        code=linb.Coder.formatAll(page.getJSONCode(nodes),'js',['plain']);
                                        break;
                                }
                              dialog.setHtml(code);
                              dialog.show(linb('body'), true);
                          });
                        break;
                        case 'refresh':
                            if(!page._dirty){
                                page.refreshFromCode();
                            }else{
                                linb.UI.Dialog.confirm(linb.getRes('VisualJS.designer.confirmrefresh1'),linb.getRes('VisualJS.designer.confirmrefresh2'),function(){
                                    page.refreshFromCode();
                                });
                            }
                        break;
                    }
                    break;
                case 'align':
                    this._change();
                    var sel = page.getByCacheId(this.tempSelected);
                    var p = sel.get(this.SelectedFocus),
                        o=p.getRoot(),
                        size=o.cssSize(),
                        pos=o.cssPos();
                    sel.each(function(o){
                        if(o.locked)return;
                        var node = o.getRoot();
                        switch(id){
                            case "left":node.left(pos.left);page._refresh(o.boxing(),'left');break;
                            case "center":node.left(pos.left + size.width/2 - node.width()/2);page._refresh(o.boxing(),'left');break;
                            case "right":node.left(pos.left + size.width - node.width());page._refresh(o.boxing(),'left');break;
                            case "top":node.top(pos.top);page._refresh(o.boxing(),'top');break;
                            case "middle":node.top(pos.top + size.height/2 - node.height()/2);page._refresh(o.boxing(),'top');break;
                            case "bottom":node.top(pos.top + size.height - node.height());page._refresh(o.boxing(),'top');break;

                            case 'w':node.width(size.width);page._refresh(o.boxing(),'width');break;
                            case 'wh':node.width(size.width).height(size.height);page._refresh(o.boxing(),'width');page._refresh(o.boxing(),'height');break;
                            case 'h':node.height(size.height);page._refresh(o.boxing(),'height');break;
                        }
                    });
                    this.resizer.rePosSize();
                    this._focus();
                    break;
                case 'pos':
                    this._change();
                    var sel = page.getByCacheId(this.tempSelected),
                        zIndex=0;
                    sel.each(function(o){
                        var ins = o.boxing();
                        var node=ins.reBoxing();

                        switch(id){
                            case "zindex1":
                                if(o.locked)return;
                                if(!zIndex)
                                    zIndex = node.topZindex();
                                node.css('zIndex',zIndex+1);
                                page._refresh(ins,'zIndex');
                                break;
                            case "zindex2":
                                if(o.locked)return;
                                node.css('zIndex',0);
                                page._refresh(ins,'zIndex');
                                break;
                            case "repos":
                            case "resize":
                                if(o.locked)return;
                                var l=node.left(),
                                    t=node.top(),
                                    offset = page.dropOffset;

                                node.left(parseInt(l/offset)*offset)
                                .top(parseInt(t/offset)*offset);
                                if(id=='resize'){
                                    var w=node.width(),
                                        h=node.height();
                                    node.width((parseInt((w+offset-1)/offset))*offset)
                                    .height((parseInt((h+offset-1)/offset))*offset)
                                }
                                page.resizer.rePosSize();
                                page._refresh(ins,'left');
                                page._refresh(ins,'top');
                                page._refresh(ins,'width');
                                page._refresh(ins,'height');
                                break;
                        }
                    });
                    this._focus();
                    break;
                case 'del':
                    this._change();
                    if('delete'==id){
                        this._deleteSelected();
                    }else if('clone'==id){
                        var ids=[];
                        var t,ids=[],pid;
                        //get source
                        var src = page.getByCacheId(this.tempSelected);
                        //clone and added to its' parent
                        var tar = src.clone();
                        tar.each(function(o){
                            o.$inDesign=true;
                            o=o.properties;
                            if(parseInt(o.left)||o.left===0)o.left+=10;
                            if(parseInt(o.top)||o.top===0)o.top+=10;
                        });

                        src.get(0).parent.boxing().append(tar, src.get(0).childrenId);

                        pid=src.get(0).parent.$linbid;
                        //get ids
                        tar.each(function(o){
                            ids.push(o.$linbid);
                        });
                        //fire event
                        //_.tryF(this.afterAddWidget, [tar, pid], this);

                        tar.each(function(o){
                            page._designable(o);
                        });

                        //set to resizer
                        this.resizer.resetTarget(linb(tar));

                        linb.message(linb.getRes('VisualJS.designer.colneOK', ids.length));
                        //set selected
                        //this._setSelected(null,true)._setSelected(ids, true);
                    }
                break;
            }

        },

        _map1:{left:1,top:1,width:1,height:1,right:1,bottom:1},
        _map2:{left:1,top:1,width:1,height:1,right:1,position:1,bottom:1,dock:1,dockOrder:1,dockMargin:1,dockFloat:1,dockIgnore:1,dockMinH:1,dockMinW:1},
        $profilegrid_beforecellvalueset: function(profile, cell, hash){
            //get properties
            var attr,t,type,funName,property,value,target=profile.$widget;
            if(target.get(0) != this.canvas.get(0)){
                this._change();
            }
             var page = this,
             data=page._cls;
             try{
                value=hash.value;
                if((attr = cell._row.id.split(':')).length>1){
                    type=attr[0];
                    property=attr[1];
                }else{
                    property=cell._row.id;
                }
                //run
                switch(type){
                    case 'properties':
                        funName = 'set' + _.str.initial(property);
                        //for canvas
                        if(target.get(0) == this.canvas.get(0)){
                            var temp={};
                            temp[property]=value;
                            page.setViewSize(temp);
                        }else{
                            var b;
                            if(page._map1[property]){
                                value=String((value=='auto')?value:(parseFloat(value)===0?0:(parseFloat(value)||'auto')));

                                //if the value changed in the process
                                if(value!==hash.value){
                                    profile.boxing().updateCell(cell,{value:value});
                                    b=1;
                                }
                            }

                            target.each(function(o){
                                if(value!==o.properties[property]){
                                    if(_.isFun(o.boxing()[funName]))
                                        o.boxing()[funName](value);
                                }
                            });
                            if(page._map2[property])
                                this.resizer.rePosSize();
                            if(b)return false;
                        }
                        break;
                    case 'event':
                        if(target.get(0) == this.canvas.get(0)){
                            if(hash.value){
                                var em = _.get(data,['Instance','events']);
                                if(!em)
                                    _.set(data,['Instance','events'],em={});
                                em[property] = hash.value;
                            }
                        }else
                            target.each(function(o){
                                if(hash.value){
                                    o[property]=hash.value;
                                }else
                                    delete o[property];
                            });
                        break;
                    default:
                        if(property=='domId'){
                            if(value==target.domId)
                                return false;

                            //you can modify domId to original one
                            if(target.get(0).$domId!=value && !/^[\w_-]*$/.test(value)){
                                linb.message(linb.getRes('VisualJS.designer.domIdValid',value));
                                return false;
                            }
                            //if set to original name, not check dom again
                            if(target.get(0).$domId!=value && linb.Dom.byId(value)){
                                linb.message(linb.getRes('VisualJS.designer.domIdExists',value));
                                return false;
                            }
                            var b;
                            //if empty, return to original name
                            if(_.str.trim(String(value))=='')
                                value=target.get(0).$domId;

                            //if the value changed in the process
                            if(value!==hash.value){
                                profile.boxing().updateCell(cell,{value:value});
                                b=1;
                            }
                            target.setDomId(value);
                            if(b)return false;
                        }else if(property=='theme'){
                            if(value)
                                value=(""+value).replace(/[^a-zA-Z0-9-]/g,"");
                            var b;
                            //if the value changed in the process
                            if(value!==hash.value){
                                profile.boxing().updateCell(cell,{value:value});
                                b=1;
                            }
                            if(!value)value=null;

                            target.each(function(o){
                               if(value!=o.theme){
                                  if(value) o.theme=value;
                                  else delete o.theme;
                               }
                            });
                            if(b)return false;
                        }else{
                            if(property=='alias'){
                                if(value==target.alias)
                                    return false;

                                var hash = this.getNames();
                                if(!value)
                                    return false;
                                if(hash[value]){
                                    linb.message(linb.getRes('VisualJS.designer.nameExists',value));
                                    return false;
                                }
                                this.listObject.setUIValue(value,true);
                                target.setAlias(value);
                            }else{
                                target[property](value);
                            }
                        }
                }
             }catch(e){
                throw(e);
                return false;
             }
        },
        $tg_click:function(profile, row,  e, src){
            if(row.group)return;
            var page=this,
                i=row.tipv,
                name=(row.tipk=='property'?'get' + _.str.initial(i):i)||"",
                widget,key,fun;
            if(!(widget=profile.$widget))return;
            if(widget==page.canvas)
                key='linb.Com';
            else if(!(key=widget.get(0)&&widget.get(0).key))return;
            if(row.tipk=='class')
                window.open(CONF.path_apidir+'#'+key);
            else
                window.open(CONF.path_apidir+'#'+key + (key=='linb.Com'?(name?'.':''):'.prototype'+(name?'.':'')) + name);
        },
        $tg_tips:function(profile,node,pos){
            var page=this,
                ks=profile.keys,
                cell, sid,id,pid,
                o, widget,key,
                row,
                str='';
            if(profile.properties.disabled)return;
            if(!(widget=profile.$widget))return;

            if(widget==page.canvas)
                key='linb.Com';
            else if(!(key=widget.get(0)&&widget.get(0).key))return;

            id=node.id;
            pid=node.parentNode&&node.parentNode.id;
            if(!id || !pid)return;

            sid=profile.getSubId(id);

            if(id.indexOf(ks.FCELL)==0 || pid.indexOf(ks.FCELL)==0){
                cell=row = profile.rowMap[sid];
                if(!cell)return true;
            }else if(id.indexOf(ks.CELL)==0 || pid.indexOf(ks.CELL)==0){
                cell = profile.cellMap[sid];
                if(!cell)return true;
                row=cell._row;
            }

            if(row){
                if(row.tipk){
                    if(row.tipk=='class'){
                        str+= '<div>'+key+' [Class]</div>';
                    }else if(row.tipk=='fun'){
                        str+= '<div>'+key+' [function] : <b>'+row.tipv + '</b></div> ';
                    }else if(row.tipk=='property'){
                        str+= '<div>'+key+' [property] : <b>'+row.tipv+ '</b></div> ';
                    }else if(row.tipk=='event'){
                        str+= '<div>'+key+' [event] : <b>'+row.tipv+ '</b> </div>';
                    }
                    if(CONF.designer_editMode != "simple"){
                        if(row.tipk=='class' || cell.value==row.tipv)
                            str +='<div><em style="background-color:#EBEADB;">'+linb.getRes('VisualJS.designer.openapi')+'</em></div>';
                        }

                    linb.Tips.show(pos, str);
                }else if(cell.tips)
                    linb.Tips.show(pos, cell.tips);
            }else
                linb.Tips.hide();
            return true;
        },
        $profilegrid_onrequestdata: function(profile, item, callback){
            return this.__buildSubRows(profile.$widget, item.id);
        },
        __buildSubRows:function(uis, id, specailFlag){
            var cv,arr=[],t,page=this,
                deeppage=this,
                data=page._cls,
                type,
                caption,cellEx,
                len=uis._nodes.length;

            //get the last one first
            var target = uis.get(len-1), dm=target.box.$DataModel, format, listKey, list, $tag,$fun,$tagVar, value,editorReadonly,editorDisabled;
            var specailItems = len===1?(CONF.widgets_xprops[target.key]||[]):[];
            //for properties
            if(id=='properties' || id=='special'){
                _.each(target.box.$DataStruct,function(o,i){

                    if(CONF.widgets_hideProps && CONF.widgets_hideProps[i])
                        return;

                    caption=cellEx=null;

                    $tagVar=null;
                    if(i.charAt(0)=='_'||i.charAt(0)=='$') return;
                    if(dm[i].hidden) return;

                    var inSpecial=_.arr.indexOf(specailItems,i)!=-1;
                    if(specailFlag===true?!inSpecial:inSpecial)return;

                    list=null;
                    editorReadonly=false;
                    editorDisabled=false;
                    listKey=null;
                     $tag='';
                     cv='';
                    //filter
                    if(dm[i].inner && !dm[i].trigger){return}
                    else if(i=='renderer'){
                        type='popbox';
                        editorReadonly=true;
                        //keep object
                        $tag = null;

                        $fun = function(profile, cell){
                            var o = cell.$tagVar;
                            if(!o)return;
                            var node = profile.getSubNode('CELL', cell._serialId);

                            linb.ComFactory.getCom('objEditor',function(){
                                this.host = page;
                                this.setProperties({
                                    image:CONF.img_app,
                                    imagePos:'-32px -32px',
                                    caption:o.widgetName+" => renderer ",
                                    text: typeof o.ini=='function'?String(o.ini):'function(){\n}',
                                    fromRegion:node.cssRegion(true),
                                    tagVar:o,
                                    onOK:function(page){
                                        this._change();
                                        var tagVar = page.properties.tagVar,
                                            code=page.properties.result.code;
                                        tagVar.profile.properties.renderer = code!==null?new Function(_.fun.args(code), _.fun.body(code)):null;
                                        node.focus();
                                    }
                                });
                                this.show();
                            });
                        };

                        $tagVar = {
                             widgetName:target.alias,
                             profile: target,
                             ini:target.properties[i]
                        };
                        cv='[<strong> Function </strong>]';
                    }else if(dm[i].readonly){
                        type='label';
                        editorDisabled=true;
                    }else if(dm[i].custom){
                        type='popbox';
                        editorReadonly=true;
                        cv=caption='[<strong> custom </strong>]';

                        if(_.isFun(dm[i].customIniCell)){
                            type='label';
                            cv='';
                            // customIniCell(profile/*control's profile object*/, propKey/*property key*/)
                            cellEx = dm[i].customIniCell(target,i);
                        }

                        //keep object
                        $tag = null;

                        //for object edit
                        $fun = function(profile, cell){
                            var tagVar=cell.$tagVar;
                                if(!tagVar)return;
                                var node=profile.getSubNode('CELL', cell._serialId),
                                callback=function(newValue, cellOptions){
                                    var b=tagVar.profile.boxing(),
                                        fn='set'+_.str.initial(tagVar.key);
                                    if(!_.isFun(b[fn]))return;
                                    page._change();
                                    b[fn](newValue);
                                    if(cellOptions)
                                        profile.boxing().updateCell(cell,cellOptions);
                                    node.focus();
                                 };
                            //custom(
                            //  profile, /*control's profile object*/
                            //  propKey, /*property key*/
                            //  propValue, /*property value*/
                            //  callback, /*callback(newValue,cellOptions)*/
                            //  canvas, /*the canvas object*/
                            //  gridprofile, /* grid*/
                            //  gridcell, /*grid cell*/
                            //  gridcellnode /*grid cell node*/
                            //)
                            dm[i].custom(tagVar.profile, tagVar.key, tagVar.profile.properties[tagVar.key], callback, page, profile/*grid*/, cell, node/*cell*/);
                        };
                        $tagVar = {
                             profile: target,
                             alias:target.alias,
                             key:i
                        };
                    }else if(dm[i].listbox){
                        type='listbox';
                        list=[];
                        listKey = target.key+":"+"properties"+":"+i;
                        if(_.isFun(dm[i].listbox)){
                            var d = dm[i].listbox;
                            list = function(){
                                var a = d.call(target),list=[];
                                _.arr.each(a,function(o){
                                    list.push({id:o, caption:o, value:o})
                                });
                                return list;
                            };
                        }else if(_.isObj(dm[i].listbox[0]))
                            list = _.copy(dm[i].listbox);
                        else
                            _.arr.each(dm[i].listbox,function(o,i){
                                list.push({id:o, caption:o})
                            });
                        linb.UI.cacheData(listKey, list);
                    }else if(dm[i].combobox){
                        type='combobox';
                        list=[];
                        if(_.isFun(dm[i].combobox)){
                            var d = dm[i].combobox;
                            list = function(){
                                var a = d.call(target),list=[];
                                _.arr.each(a,function(o){
                                    list.push({id:o, caption:o})
                                });
                                return list;
                            };
                        }else{
                            if(_.isObj(dm[i].combobox[0]))
                                list= _.copy(dm[i].combobox);
                            else
                                _.arr.each(dm[i].combobox,function(o,i){
                                    list.push({id:o, caption:o})
                                });
                        }
                        listKey = target.key+":"+"properties"+":"+i;
                        linb.UI.cacheData(listKey, list);
                    }else if(dm[i].helpinput){
                        listKey = target.key+":"+"properties"+":"+i;
                        type='helpinput';
                        list= _.copy(dm[i].helpinput);
                        linb.UI.cacheData(listKey, list);
                    }else if(dm[i].trigger){
                        type='button';
                        editorReadonly=true;
                        cv=caption='<strong> Invoke </strong>';
                        value=i;
                        $fun = function(profile, cell, pro){
                            var o = cell.$tagVar;
                            if(!o)return;

                            _.tryF(o.trigger,null,o.profile.boxing());
                        };
                        $tagVar = {
                            profile: target,
                            name:i,
                            trigger:dm[i].trigger
                        };
                    }else if(_.isBool(o)){
                        type='checkbox';
                        $tag = i;
                    }else if(page._map1[i]){
                        type='input';
                    }else if(_.isNumb(o)){
                        type='number';
                    }else if(_.isDate(o)){
                        type='date';
                    }else if(_.isObj(o)){
                        type='popbox';
                        editorReadonly=true;
                        //keep object
                        $tag = null;

                        //for object edit
                        $fun = function(profile, cell){
                            var o = cell.$tagVar;
                            if(!o)return;
                            var node = profile.getSubNode('CELL', cell._serialId);
                            var obj =o.profile.boxing()['get'+_.str.initial(o.name)]();
                            linb.ComFactory.getCom('objEditor',function(){
                                this.host = page;
                                this.setProperties({
                                        caption:o.widgetName+" => "+o.name,
                                        image:CONF.img_app,
                                        imagePos:obj.constructor==Array?'-128px -32px':'-16px -32px',
                                        text:linb.Coder.formatText(
                                            _.stringify(
                                                _.clone(obj, function(o,i){return (i+'').charAt(0)!='_'})
                                            )
                                        ),
                                        fromRegion:node.cssRegion(true),
                                        tagVar:o,
                                        onOK:function(page){
                                            var t,
                                                tagVar=page.properties.tagVar,
                                                b=tagVar.profile.boxing(),
                                                fn='set'+_.str.initial(o.name);
                                            if(!_.isFun(b[fn]))return;

                                            this._change();
                                            b[fn](page.properties.object);

                                            if('dockMargin'==o.name)
                                                deeppage.resizer.rePosSize();

                                            node.focus();

                                            //for new panel
                                            //not consider that multi keys in a widget can have different drop function
                                            if(o.name=='items'){
                                                if(null===page.properties.object)
                                                    b.setItems([]);

                                                if(t=tagVar.profile.behavior.PanelKeys){
                                                    deeppage._giveHandler(tagVar.profile);
                                                }
                                            }

                                        }
                                });
                                this.show();
                            });
                        };
                        $tagVar = {
                             widgetName:target.alias,
                             profile: target,
                             name:i
                        };
                        cv=caption='[<strong> key/value pairs</strong>]';
                    }else{
                        type='input';
                    }
                    cv = cv || target.properties[i];
                    if(_.isStr(cv)){
                        //cv=_.stringify(cv);
                        //for serialized string
                        //cv = cv.replace(/^\"/,'').replace(/\"$/,'');
                    }

                    var cell={value:cv, type:type , disabled:editorDisabled, editorReadonly:editorReadonly, $tag:$tag, event:$fun , $tagVar:$tagVar,  editorListKey:listKey};
                    if(caption)
                        cell.caption=caption;
                    if(cellEx)
                        _.merge(cell,cellEx,'all');

                    arr.push({id:'properties:'+i, tipk:'property', tipv:i, value:i, caption:i,cells:[
                        cell
                    ]});
                });
            }
            if(id!='special')
                arr.sort(function(x,y){
                    x=x.value||"";y=y.value||"";
                    return x>y?1:x==y?0:-1;
                });
            //for events
            if(id=='UIE' || id=='special'){
                var $fun = function(profile, cell){
                    var o = cell.$tagVar;
                    if(!o)return;
                    var funname;
                    if(!cell.value){
                        funname='_'+o.widgetName.toLowerCase().replace(/\./g,'_')+'_'+o.key.toLowerCase();
                        profile.boxing().updateCell(cell.id,{
                            value : funname
                        },false,true);
                    }else{
                        funname=cell.value;
                    }

                    page.resetTaskList();

                    if(page._dirty){
                        var nodes = page.getWidgets(true);
                        // reset iniComponents code
                        var code = ('{\n' + page.getJSCode(nodes) ).replace(/\n/g, '\n'+_.str.repeat(' ',12))
                            + '\n'+_.str.repeat(' ',8)+ '}';
                        page.resetCode(o.path, "iniComponents", code);
                    }

                    if(!page._cls.Instance[funname]){
                         var code = o.ini.toString().replace(/\s*\}$/,'') +
                             '\n'+_.str.repeat(' ',4) + "var ns = this, uictrl = profile.boxing();"+
                             '\n}';
                        page.addCode(o.path, funname, code);

                        page.buildNameSpace(true);
                    }

                    page.addTask(function(){
                        page.focusEditor(o.path, funname);
                    });
                    
                    page.startTaskList();
                    
                    page._dirty=false;
                };

                _.each(target.box.$EventHandlers,function(o,i){
                    if(specailItems){
                        var inSpecial=_.arr.indexOf(specailItems,i)!=-1;
                        if(specailFlag===true?!inSpecial:inSpecial)return;
                    }
                    $tagVar = {
                         widgetName: target.alias,
                         path:"Instance",
                         key:i,
                         ini:o
                    };
                    arr.push({id:'event:'+i, tipk:'event',tipv:i, value:i, caption:i, cells:[
                        {value:typeof target[i]=='string'?target[i]:'', type: 'popbox', $tagVar:$tagVar, event:$fun}
                    ]});
                    arr.sort(function(x,y){
                        x=x.value||"";y=y.value||"";
                        return x>y?1:x==y?0:-1;
                    });
                });
            }

            //check others to disable editable
            _.filter(arr,function(o,i){
                var ns=uis._nodes,key=o.value,value=o.cells[0].value,prop;
                for(var i=0;i<ns.length-1;i++){
                    prop=ns[i].properties;
                    if(!(key in prop))
                        return false;
                    if(prop[key]!==value)
                        return false;
                }
            });

            return arr;
        },
        $iconlist_aftervalueupdated:function(profile, ov, nv){
            if(nv){
                this.resizer.resetTarget(null,false);
                this._setSelected([nv],true);
            }
        },
        $listobject_onlistshow:function(profile, pos){
            var page=this;
//            _.observableRun(function(){
                if(!page.objlistBlock){
                    page.objlistBlock=new linb.UI.Block({
                        width:200,
                        height:400,
                        borderType:'ridge',
                        background:'#fff',
                        shadow:true
                    });
                    if(!page.frame || !page.frame.get(0)){
                        page.frame=linb.create('<div style="z-index:2000;background-color:red;position:absolute;font-size:0;line-height:0;display:none;">').css('opacity',0.3);
                        linb('body').append(page.frame);
                    }
                    
                    page.treebarObj = new linb.UI.TreeBar({
                        group:false,
                        selMode:'none',
                        caption:null
                    },{
                        onItemSelected:function(profile, item, src){
                            page.selectWidget(item.id);
                            profile.parent.getRoot().css('display','none');

                            page.frame.css('display','none');
                            profile.boxing().clearItems();

                            _.asyRun(function(){page._focus()});
                            return false;
                        },
                        beforeHoverEffect:function(profile, item, e, src, type){
                            if(!item)return;
                            if(item.id==this.canvas.get(0).$linbid)return;
                            if(type=='mouseover')
                                //for performance in IE
                                _.resetRun('',function(){
                                    var v=linb.getObject(item.id);
                                    if(v && (v=v.getRoot()))
                                        page.frame.cssRegion(v.cssRegion(true)).css('display','block');
                                },100);
                            else
                                _.resetRun('',function(){
                                    page.frame.css('display','none');
                                },100);
                        }
                    },page);
                    page.objlistBlock.append(page.treebarObj).render(true);
                }
                //get items
                var items=[];
                var fun = function(profile, items, map){
                    if((page.$inplaceEditor&&page.$inplaceEditor.get(0))==profile)
                        return;

                    var self=arguments.callee,t,
                        item = {id:profile.$linbid, caption:profile.alias, image: (t=map[profile.box.KEY])?t.image:'', imagePos:(t=map[profile.box.KEY])?t.imagePos:''};
                    items.push(item);
                    if(profile.children && profile.children.length){
                        var sub=[];
                        item.sub = sub;
                        _.arr.each(profile.children,function(o){
                            self.call(null, o[0], sub, map);
                        });
                    }
                };
                fun(page.canvas.get(0), items, CONF.mapWidgets);
                page.treebarObj.setItems(items).toggleNode(page.canvas.get(0).$linbid,true,true);

                var node = page.objlistBlock.reBoxing();
                node.popToTop(profile.getRoot());
                var unFun=function(){
                    node.css('display','none');
                    page.treebarObj.clearItems();
                    page.frame.css('display','none');
                    //unhook
                    linb.Event.keyboardHook('esc');
                };
                //for on blur disappear
                node.setBlurTrigger('design:pop:objecttree', unFun);
                //for esc
                linb.Event.keyboardHook('esc',0,0,0,unFun);

//            });
        },
        $unique:function(arr){
            var i,l,a=_.copy(arr);arr.length=0;
            for(i=0, l=a.length; i<l; i++)
                if(_.arr.indexOf(arr,a[i])==-1)
                    arr[arr.length]=a[i];
           return arr;
        },
//for outter call
        getWidgets:function(flag){
            if(!flag)
                this._clearSelect(this.canvas.get(0));

            var page=this,
                arr=[], c = page.canvas.get(0).children || page.canvas.get(0).childNodes;
            _.arr.each(c,function(o){
                if((page.$inplaceEditor&&page.$inplaceEditor.get(0))==o[0])
                    return;
                arr.push(o[0]);
            });

            var items = this.iconlist.getItems();
            if(items && items.length)
                _.arr.each(items,function(o,i){
                    arr.push(linb.getObject(o.id));
                });
            return this.$unique(arr);

        },
        getJSONCode:function(nodes){
            //sort by tabindex
            var f=function(x,y){
                x=parseInt((x[0]||x).properties.tabindex)||0;y=parseInt((y[0]||y).properties.tabindex)||0;
                return x>y?1:x==y?0:-1;
            },fun=function(arr){
                arr.sort(f);
                for(var i=0;i<arr.length;i++)
                    if((arr[i][0]||arr[i]).children && (arr[i][0]||arr[i]).children.length)
                        (arr[i][0]||arr[i]).children.sort(f);
            };
            fun(nodes);

            return 'return linb.create(' + _.stringify(nodes) + ').get();'
        },
        getJSCode:function(nodes){
            //sort by tabindex
            nodes.sort(function(x,y){
                x=parseInt(x.properties.tabindex)||0;y=parseInt(y.properties.tabindex)||0;
                return x>y?1:x==y?0:-1;
            });

            var t,arr=[];
            arr.push('// [[code created by jsLinb UI Builder\n');
            arr.push('var host=this, children=[], append=function(child){children.push(child.get(0))};');
            var fun = function(v, pName, argsStr, arr){
                var self=arguments.callee, ui=v.box['linb.UI'], o=v.serialize(false), name=o.alias, b,t,ins=v.boxing();

                delete o.id;

                if(o.properties && o.properties.dropKeys){
                    if(o.properties.dropKeys == v.box.$DataStruct.dropKeys)
                        delete o.properties.dropKeys;
                }

                if(o.theme){
                  o.theme=(""+o.theme).replace(/[^a-zA-Z0-9-]/g,'');
                }

                if(_.isEmpty(o.properties))delete o.properties;
                if(_.isEmpty(o.events))delete o.events;
                if(!o.theme)delete o.theme;
                if(_.isEmpty(o.CS))delete o.CS;
                if(_.isEmpty(o.CC))delete o.CC;
                if(_.isEmpty(o.CB))delete o.CB;
                if(_.isEmpty(o.CF))delete o.CF;

                arr.push('\n\n');

                if(pName)
                    arr.push(pName+'.append(');
                else
                    arr.push('append(');
                arr.push('\n    (new ' + o.key + ')');
                arr.push('\n    .setHost(host,"'+name+'")');
                if(o.theme){
                  arr.push('\n    .setTheme("'+o.theme+'")');
                }
                if(o.domId!=o.$domId)
                    arr.push('\n    .setDomId("'+o.domId+'")');
                if(o.properties){
                    _.each(o.properties,function(o,i){
                        if(i=='value')return;
                        t='set' + _.str.initial(i);
                        if(typeof ins[t] =='function')
                            arr.push('\n    .' + t + '(' + _.stringify(o) +')');
                    });
                    if(typeof ins.setValue=='function' && 'value' in o.properties)
                        arr.push('\n    .setValue(' + _.stringify(o.properties.value) +')');
                }

                if(o.events){
                    _.each(o.events,function(o,i){
                        arr.push('\n    .' + i + '('+ _.stringify(o) +')');
                    });
                }
                if(o.CS)
                    arr.push('\n    .setCustomStyle('+ _.stringify(o.CS) +')');
                if(o.CC)
                    arr.push('\n    .setCustomClass('+ _.stringify(o.CC) +')');
                if(o.CB)
                    arr.push('\n    .setCustomBehavior('+ _.stringify(o.CB) +')');
                if(o.CF)
                    arr.push('\n    .setCustomFunction('+ _.stringify(o.CF) +')');

                if(pName)
                    arr.push('\n'+(argsStr?(', '+argsStr):'')+');');
                else
                    arr.push('\n);');

                if(v.children && v.children.length){
                    _.arr.each(v.children,function(o){
                        var j = o[0],sa=[],s;
                        for(var i=1;i<o.length;i++){
                            switch(typeof o[i]){
                                case 'number':
                                    sa.push(o[i]);
                                    break;
                                case 'string':
                                    sa.push('"'+o[i]+'"');
                                    break;
                            }
                        }
                        if(sa.length)
                            s = sa.join(',');
                        else
                            s = null;
                        self.call(this, j, 'host.'+name, s,  arr);
                    },this);
                }
            };
            _.arr.each(nodes,function(v){
                fun(v, null, null, arr);
            });
            arr.push('\n\n');
            arr.push('return children;\n');
            arr.push('// ]]code created by jsLinb UI Builder');
            return _.fromUTF8(arr.join(''));
        },
        getNames:function(){
            var nodes = this.getWidgets(true);
            var page = this,t,hash={};
            var fun = function(target){
                var self=arguments.callee;
                hash[target.alias]=1;
                if(target.children && target.children.length){
                    _.arr.each(target.children,function(o){
                        self.call(null, o[0]);
                    });
                }
            };
            _.arr.each(nodes,function(o){
                fun(o);
            });
            return hash;
        },
        selectWidget:function(id){
            var profile = linb.getObject(id);
            var p = profile.parent;
            if(p.setSelectFromPanel){
                p.setSelectFromPanel.call(p, profile.getRoot().parent(), id);
                this._setSelected([id],true);
            }else{
                this._clearSelect();
                this._setSelected(null,true);
            }
        },
        activate:function(){
        },
        setLinkObj:function(obj){
            this._cls=obj;
        },
        refreshView:function(obj){
            var self=this;
            self._cls=obj;

            var ns=self.getWidgets();
            _.arr.each(ns,function(o){
                o.boxing().destroy();
            });
            self.iconlist.clearItems();
            self.canvas.reBoxing().empty();

            var fun=_.get(obj,['Instance','iniComponents']);

            if(fun){
                linb.Dom.setCover(linb.getRes('VisualJS.designer.createContent'));
                // reset scope
                fun = new Function([],typeof fun=="string"?fun:_.fun.body(fun));
                try{
                    self.$host={};
                    var nodes = fun.call(self.$host)||[],
                        n2 = [];
                    _.filter(nodes,function(target){
                        if(!(target.box['linb.UI'] && !target.box.$noDomRoot)){
                            n2.push(target);
                            return false;
                        }
                    });
                    self.canvas.append(linb.UI.pack(nodes, false));
                    _.arr.each(nodes,function(o){
                        self._designable(o);
                    });
                    _.arr.each(n2,function(target){
                        self.iconlist.insertItems([{id:target.$linbid, image:linb.ini.img_bg, tips:target.key, imgStyle:'background:url(' + CONF.mapWidgets[target.box.KEY].image + ') '+ CONF.mapWidgets[target.box.KEY].imagePos}],null,false);
                    });

                    var t=self.layoutBase.reBoxing();
                    if(t.css('display')=='none'){
                        t.css('display','block');
                        t.parent().css('background','');
                    }

                    _.asyRun(function(){
                        linb.UI.pack(nodes, false).adjustDock();
                    });
                }catch(e){
                    self.iconlist.clearItems();
                    self.canvas.reBoxing().empty();
                    //self.properties.text = '';
                    self.layoutBase.reBoxing().css('display','none').parent().css('background','url(img/error.gif)');
                    linb.message(linb.getRes('VisualJS.designer.comCodeErr'));
                    linb.pop(e.description||e.message);
                }
                linb.Dom.setCover(false);

               // self.profileGrid.reLayout();
            }

            self._dirty=false;
            self._clearSelect();
            self._setSelected([], true);
            return self;
        },
        _popvs_onmenusel:function(p,item){
            var page=this;
            page.setViewSize(page.$viewSize[item.id]);
        },
        setViewSize:function(size){
            var page=this,
                w=page.canvas.getWidth(),
                h=page.canvas.getHeight(),
                b;
            if(size.width && String(size.width)!=String(w)){
                page.canvas.setWidth(size.width);
                page.panelBG.setWidth(size.width);
                b=1;
            }
            if(size.height && String(size.height)!=String(h)){
                page.canvas.setHeight(size.height);
                page.panelBG.setHeight(size.height);
                b=1;
            }
            if(b){
                w=size.width||w;
                h=size.height||h;

                //update toolbar caption
                page.toolbar.updateItem('viewsize', {caption:w + " &#215 " + h});
                //update properties treegrid value
                var t=page.profileGrid;
                if(t&&(t=t.get(0).$widget)&&(t.get(0) == page.canvas.get(0))){
                    page.profileGrid.updateCellByRowCol('properties:width','value',{value:w});
                    page.profileGrid.updateCellByRowCol('properties:height','value',{value:h});
                }
            }
        },
        reLayout:function(force){
            this.toolbar.reLayout(force);
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append(
                (new linb.UI.PopMenu)
                .setHost(host,"popViewSize")
                .onMenuSelected("_popvs_onmenusel")
            );

            append(
                (new linb.UI.Layout)
                .setHost(host,"layoutBase")
                .setItems([{"id":"before", "pos":"before", "locked":false, "cmd":true, "size":170, "min":100, "max":300, "hide":false, "folded":false, "hidden":false}, {"id":"main", "min":10}, {"id":"after", "pos":"after", "locked":false, "cmd":false, "size":265, "min":100, "max":350, "hide":false, "folded":false, "hidden":false}])
                .setType("horizontal")
            );

            host.layoutBase.append(
                (new linb.UI.ToolBar)
                .setHost(host,"toolbar")
                .setItems([])
                .onClick("$toolbar_onclick")
            , 'main');

            host.layoutBase.append(
                (new linb.UI.Panel)
                .setHost(host,"panelRigth")
                .setCaption("$VisualJS.designer.configwnd")
                .setCustomStyle({"PANEL":"overflow:hidden"})
            , 'after');

            host.panelRigth.append(
                (new linb.UI.ComboInput)
                .setHost(host,"listObject")
                .setDirtyMark(false)
                .setDock("top")
                .setType("popbox")
                .setInputReadonly(true)
                .beforeComboPop("$listobject_onlistshow")
            );

            host.panelRigth.append(
                (new linb.UI.TreeGrid)
                .setHost(host,"profileGrid")
                .setDirtyMark(false)
                .setEditable(true)
                .setGridHandlerCaption("$VisualJS.designer.gridcol1")
                .setRowHandlerWidth(100)
                .setColSortable(false)
                .setHeader([{"id":"value", "caption":"$VisualJS.designer.gridcol2", "width":120, "type":"input"}])
                .onShowTips("$tg_tips")
                .onGetContent("$profilegrid_onrequestdata")
                .beforeCellUpdated("$profilegrid_beforecellvalueset")
                .onDblclickRow("$tg_click")
            );

            host.layoutBase.append(
                (new linb.UI.Panel)
                .setHost(host,"panelLeft")
                .setCaption("$VisualJS.designer.toolsbox")
                .setCustomStyle({"PANEL":"overflow:hidden"})
            , 'before');

            host.panelLeft.append(
                (new linb.UI.TreeBar)
                .setHost(host,"treebarCom")
                .setSelMode("none")
                .setDragKey("___iDesign")
            );

            host.layoutBase.append(
                (new linb.UI.Div)
                .setHost(host,"panelDiv")
                .setDock("fill")
                .setCustomStyle({"KEY":"overflow:auto;"})
                .setCustomClass({"KEY":"linbdesign"})
            , 'main');

            host.panelDiv.append(
                (new linb.UI.Div)
                .setHost(host,"panelBG")
                .setLeft(5)
                .setTop(5)
                .setWidth(100)
                .setHeight(100)
                .setCustomStyle({"KEY":"background-color:#FFFEF6;"})
            );

            host.panelBG.append(
                (new linb.UI.Div)
                .setHost(host,"panelBGl")
                .setWidth(100)
                .setHeight(100)
                .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;left:0;top:0;width:10px;height:100%;background:url(img/designer/left.gif) left top"})
            );

            host.panelBG.append(
                (new linb.UI.Div)
                .setHost(host,"panelBGb")
                .setWidth(100)
                .setHeight(100)
                .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;left:0;bottom:0;height:10px;width:100%;background:url(img/designer/top.gif) left bottom"})
            );

            host.panelBG.append(
                (new linb.UI.Div)
                .setHost(host,"panelBGt")
                .setWidth(100)
                .setHeight(100)
                .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;left:0;top:0;height:10px;width:100%;background:url(img/designer/top.gif) left top"})
            );

            host.panelBG.append(
                (new linb.UI.Div)
                .setHost(host,"panelBGr")
                .setWidth(100)
                .setHeight(100)
                .setCustomStyle({"KEY":"font-size:0;line-height:0;position:absolute;right:0;top:0;width:10px;height:100%;background:url(img/designer/left.gif) top right"})
            );

            host.panelDiv.append(
                (new linb.UI.Pane)
                .setHost(host,"canvas")
                .setLeft(5)
                .setTop(5)
                .setWidth(100)
                .setHeight(100)
                .setZIndex(10)
                .setCustomStyle({"KEY":"overflow:visible"})
                .onContextmenu('_oncanvasmenu')
            );

            return children;
            // ]]code created by jsLinb UI Builder
        },
        iniExComs:function(com, threadid){
            var host=this;
            host.layoutBase.append(
                (new linb.UI.IconList)
                .setHost(host,"iconlist")
                .setDirtyMark(false)
                .setDock("bottom")
                .setHeight(40)
                .setZIndex(10)
                .setDisplay('none')
                .afterUIValueSet("$iconlist_aftervalueupdated")
                .setCustomStyle({"KEY":"border-top:solid 1px #CDCDCD;"})
            , 'main');
            if(CONF.designer_editMode != "simple"){
                host.iconlist.setDisplay('');
            }
        }
    },
    Static:{
        destroy:function(){
            this.objlistBlock.destroy();
            arguments.callee.upper.apply(this,arguments);
        }
    },
    Initialize:function(){
        linb.CSS.addStyleSheet(linb.UI.buildCSSText({
            '.linbdesign .panel':{
                'background-image' : 'url(img/designer/bg.gif)',
                'background-position' : 'left top',
                'background-repeat': 'repeat'
            }
        }),'linb.UI.design');

        //ensure to show ondrag.gif immi
        var preLoad=new Image();
        preLoad.src=linb.ini.path +'ondrag.gif';
        preLoad=null;

       //avoid dynRender in designer
       var recover=function(obj){
           var me=arguments.callee;
           _.arr.each(obj.$children,function(o){
                var o=linb.SC.get(o);
                o._getChildren=linb.UI._getChildren;
                if(o.$children)
                    me(o);
            });
        };
        recover(linb.UI);

        window.onbeforeunload = function(e){
            if(linb.browser.ie)
                window.event.returnValue = ' ';
            else
                return ' ';
        };
        
        linb.doc.onContextmenu(function(){return false});

    }
});