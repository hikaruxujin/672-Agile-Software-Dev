Class("linb.UI.ToolBar",["linb.UI","linb.absList"],{
    Instance:{
        updateItem:function(subId,options){
            if(options.type){
                return arguments.callee.upper.call(this,subId,options);
            }else{
                var self=this,
                    profile=self.get(0),
                    box=profile.box,
                    items=profile.properties.items,
                    rst=profile.queryItems(items,function(o){return typeof o=='object'?o.id===subId:o==subId},true,true,true),
                    nid,item,n1,n2,n3,n4,t;
                if(_.isStr(options))options={caption:options};

                if(rst.length){
                        rst=rst[0];
                        if(item=rst[0]){
                            
                        // [[modify id
                        if(_.isSet(options.id))options.id+="";
                        if(options.id && subId!==options.id){
                            nid=options.id;
                            var m2=profile.ItemIdMapSubSerialId, v;
                            if(!m2[nid]){
                                if(v=m2[subId]){
                                    m2[nid]=v;
                                    delete m2[subId];
                                    profile.SubSerialIdMapItem[v].id=nid;
                                }else{
                                    item.id=nid;
                                }
                            }
                        }
                        delete options.id;
                        // modify id only
                        if(_.isEmpty(options))
                            return self;
                        //]]
                    
                        //in dom already?
                        n1=profile.getSubNodeByItemId('ICON',nid||subId);
                        n2=profile.getSubNodeByItemId('CAPTION',nid||subId);
                        n3=profile.getSubNodeByItemId('ITEM',nid||subId);
                        n4=profile.getSubNodeByItemId('LABEL',nid||subId);

                        if('value' in options && options.value!=item.value)
                            profile.getSubNodeByItemId('BTN',nid||subId).tagClass('-checked', !!options.value);
                            
                        if('caption' in options&& options.caption!=item.caption){
                            n2.html(options.caption);
                            if(options.caption && !item.caption)
                                n2.css('display','');
                            if(!options.caption && item.caption)
                                n2.css('display','none');
                        }
                        if('label' in options&& options.label!=item.label){
                            n4.html(options.label);
                            if(options.label && !item.label)
                                n4.css('display','');
                            if(!options.label && item.label)
                                n4.css('display','none');
                        }
                        if('disabled' in options && options.disabled!=item.disabled){
                            if(options.disabled)
                                n2.addClass('linb-ui-itemdisabled');
                            else
                                n2.removeClass('linb-ui-itemdisabled');
                        }
                        if('image' in options&& options.image!=item.image)
                            n1.css('background-image',options.image);
                        if('imagePos' in options&& options.imagePos!=item.imagePos)
                            n1.css('background-position',options.imagePos);
                        if('imageClass' in options&& options.imageClass!=item.imageClass){
                            if(item.imageClass)
                                n1.removeClass(item.imageClass);
                            if(options.imageClass)
                                n1.addClass(options.imageClass);
                        }
                        if('hidden' in options){
                            var  b = !!options.hidden;
                            if(b){
                                if(item.hidden!==true){
                                    n3.css('display','none');
                                }
                            }else{
                                if(item.hidden===true){
                                    n3.css('display','');
                                }
                            }
                        }

                        //merge options
                        _.merge(item, options, 'all');
                    }
                }
                return self;
            }
        },
        showItem:function(itemId, value){
            return this.each(function(profile){
                var item=profile.getItemByItemId(itemId);
                if(item){
                    item.hidden=value===false;
                    profile.getSubNodeByItemId('ITEM', itemId).css('display',value===false?'none':'');
                }
            });
        },
        showGroup:function(grpId, value){
            return this.each(function(profile){
                _.arr.each(profile.properties.items,function(o){
                    if(o.id==grpId){
                        o.hidden=value===false;
                        return false;
                    }
                });
                var n=profile.getSubNodeByItemId('GROUP', grpId);
                n.css('display',value===false?'none':'');    
                if(profile.renderId && profile.getRootNode().offsetWidth)
                    linb.UI.$dock(profile,true,true);
            });
        }
    },
    Static:{
        _focusNodeKey:'BTN',
        _ITEMKEY:'GROUP',
        Templates:{
            tagName:'div',
            className:'{_className}',
            style:'{_style}',
            ITEMS:{
                className:'linb-uibg-bar linb-uiborder-outset',
                tagName:'div',
                style:'{mode}',
                text:'{items}'
            },
            $submap:{
                items:{
                    GROUP:{
                        className:'{groupClass}',
                        style:'{grpDisplay} {groupStyle}',
                        HANDLER:{
                            style:'{mode2}'
                        },
                        LIST:{
                            $order:1,
                            tagName:'text',
                            text:'{sub}'
                        }
                    }
                },
                'items.sub':{
                    ITEM:{
                        style:'{itemDisplay}',
                    //for firefox2 image in -moz-inline-box cant change height bug
                        IBWRAP:{
                            tagName:'div',
                            SPLIT:{
                                style:'{splitDisplay}'
                            },
                            LABEL:{
                                className:" {disabled}",
                                style:'{labelDisplay}',
                                text:'{label}'
                            },
                            BTN:{
                                className:'linb-ui-btn {itemcls} {itemClass}',
                                style:'{itemStyle} {boxDisplay}',
                                BTNI:{
                                    className:'linb-ui-btni',
                                    BTNC:{
                                        className:'linb-ui-btnc',
                                        BOX:{
                                            tabindex: '{_tabindex}',
                                            BOXWRAP:{
                                                tagName:'div',
                                                RULER:{},
                                                ICON:{
                                                    $order:1,
                                                    className:'linb-ui-icon {imageClass}',
                                                    style:'{backgroundImage} {backgroundPosition} {backgroundRepeat}  {imageDisplay}'
                                                },
                                                CAPTION:{
                                                    $order:2,
                                                    text : '{caption}',
                                                    className:" {disabled}",
                                                    style:'{captionDisplay}'
                                                },
                                                DROP:{
                                                    $order:3,
                                                    style:'{dropDisplay}'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                'font-size':0,
                'line-height':0,
                position:'absolute',
                overflow:'hidden',
                left:0,
                top:0
            },
            'ITEM-object':{
                'vertical-align':'middle',
                'margin-left':'4px'
            },
            RULER:{
                padding:'0px',
                margin:'0px',
                width:'0px'
            },
            ICON:{
                margin:0,
                'vertical-align':'middle'
            },
            ITEMS:{
                display:'block',
                'padding-bottom':'1px',
                'font-size':0,
                'line-height':0
            },
            HANDLER:{
                height:'22px',
                width:'7px',
                background: linb.UI.$bg('handler.gif', ' left top', true),
                cursor:'move',
                'vertical-align':'middle'
            },
            GROUP:{
                'font-size':0,
                'line-height':0,
                // crack for: The IE 'non-disappearing content' bug
                position:'static',
                padding:'2px 4px 0px 2px',
                'vertical-align':'middle'
            },
            ITEM:{
                'vertical-align':'middle',
                padding:'1px'
            },
            'BTNC a':{
                padding:0
            },
            'SPLIT':{
                $order:1,
                width:'6px',
                height:'19px',
                'vertical-align':'middle',
                background: linb.UI.$bg('split_vertical.gif', 'repeat-y left top', true)
            },
            BTN:{
                'padding-right':'3px'
            },
            BTNI:{
                'padding-left':'3px'
            },
            DROP:{
                width:'14px',
                height:'16px',
                'vertical-align':'middle',
                background: linb.UI.$bg('drop.gif', 'no-repeat left center', 'Button')
            },
            'BTN-mouseover DROP':{
                $order:2,
                'background-position':'-16px center'
            },
            'BTN-mousedown DROP, BTN-checked DROP':{
                $order:2,
                'background-position':'-32px center'
            },
            BOX:{
                height:'22px'
            },
            'LABEL, CAPTION':{
                'vertical-align':'middle',
                'margin-left':'2px',
                'margin-right':'2px',
                 cursor:'default',
                 'font-size':'12px'
            },
            LABEL:{
                'padding-top':'3px'
            }
        },
        Behaviors:{
            HoverEffected:{BTN:['BTN']},
            ClickEffected:{BTN:['BTN']},
            BTN:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled)return;
                    var id2=linb.use(src).parent(3).id(),
                        item2 = profile.getItemByDom(id2);
                    if(item2.disabled)return;

                    var item = profile.getItemByDom(src);
                    if(item.disabled)return;

                    linb.use(src).focus();
                    if(item.statusButton)
                        linb.use(src).tagClass('-checked',item.value=!item.value);

                    profile.boxing().onClick(profile, item, item2, e, src);
                    return false;
                }
            }
        },
        DataModel:{
            listKey:null,
            height:{
                ini:'auto',
                readonly:true
            },
            width:'auto',

            left:0,
            top:0,

            handler:{
                ini:true,
                action:function(v){
                    this.getSubNode('HANDLER',true).css('display',v?'':'none');
                }
            },
            position:'absolute',
            hAlign:{
                ini:'left',
                listbox:['left','center','right'],
                action:function(v){
                    this.getSubNode('ITEMS', true).css('textAlign', v);
                }
            },
            dock:{
                ini:'top',
                listbox:['top','bottom']
            }
        },
        EventHandlers:{
            onClick:function(profile, item, group, e, src){}
        },
        _adjustItems:function(arr){
            if(!arr)arr=[_()+''];
            if(_.isStr(arr))arr=[arr];

            var a=_.copy(arr),m;
            _.arr.each(a,function(o,i){
                if(_.isArr(o)){
                    o={
                        id:_.id(),
                        sub:o
                    };
                }
                if(_.isHash(o)){
                    //copy group
                    a[i]=_.copy(o);
                    a[i].sub=[];
                    //copy sub(tool item)
                    if(o.sub)
                        _.arr.each(o.sub,function(v){
                            a[i].sub.push(_.isHash(v)?_.copy(v):{id:v+""});
                        });
                }
            });
            return a;
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            var p = profile.properties;

            d.mode = p.hAlign=='right'?'text-align:right;':'';

            return d;
        },
        _prepareItem:function(profile, oitem, sitem, pid, index,len, mapCache, serialId){
            var dn='display:none',
                tabindex = profile.properties.tabindex,
                fun=function(profile, dataItem, item, pid, index,len, mapCache,serialId){
                    var id=dataItem[linb.UI.$tag_subId]=typeof serialId=='string'?serialId:('a_'+profile.pickSubId('aitem')), t;
                    if(typeof item=='string')
                        item={caption:item};

                    if(false!==mapCache){
                        profile.ItemIdMapSubSerialId[item.id] = id;
                        profile.SubSerialIdMapItem[id] = item;
                    }

                    if(t=item.object){
                        t=dataItem.object=t['linb.absBox']?t.get(0):t;
                        //relative it.
                        if(t['linb.UIProfile']){
                            t.properties.position='relative';
                            var addcls=profile.getClass('ITEM','-object'),
                                cck = t.CC.KEY || (cck=t.CC.KEY='');
                            if(cck.indexOf(addcls)===-1)
                                t.CC.KEY = cck + " " + addcls;
                        }
                        item.$linbid=t.$linbid;
                        t.$item=item;
                        t.$holder=profile;
                        if(!t.host||t.host===t)t.boxing().setHost(profile.host,t.alias);
                        if(!profile.$attached)profile.$attached=[];
                        profile.$attached.push(t);
                    }else{
                        if(item.type=='split'){
                            item.split=true;
                        }else{
                            if(!item.caption)
                                item.caption="";
                        }

                        linb.UI.adjustData(profile,item, dataItem);

                        if(item.statusButton && !!item.value)
                            dataItem.itemcls=" linb-ui-btn-checked "+profile.getClass('BTN','-checked', !!item.value);

                        dataItem._tabindex=tabindex;
                        dataItem.splitDisplay=dataItem.split?'':dn;
                        dataItem.labelDisplay=dataItem.label?'':dn;
                        dataItem.captionDisplay=dataItem.caption?'':dn;
                        dataItem.dropDisplay=item.dropButton?'':dn;
                        dataItem.boxDisplay= (!dataItem.split && (dataItem.caption || dataItem.image || dataItem.imageClass))?'':dn;
                    }
                    dataItem.itemDisplay=item.hidden?dn:'';
                    item._pid=pid;
                };

            if(pid){
                fun(profile,oitem,sitem,pid,index,len,mapCache,serialId);
            }else{
                var arr=[],
                dataItem,
                a=sitem.sub||[];

                pid=sitem.id;
                oitem.mode2 = ('handler'in sitem)?(sitem.handler?'':dn):(profile.properties.handler?'':dn);
                oitem.grpDisplay=sitem.hidden?dn:'';
                oitem.sub = arr;

                _.arr.each(a,function(item){
                    dataItem={id: item.id};
                    fun(profile,dataItem,item,pid,index,len,mapCache,serialId);
                    arr.push(dataItem);
                });
            }
        }
    }
});
