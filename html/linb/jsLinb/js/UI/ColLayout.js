Class("linb.UI.ColLayout",["linb.UI","linb.absList"],{
    Dependency:['linb.UI.Panel'],
    Instance:{
        addPanel:function(args, col, basePrf, before){
            var profile=this.get(0),
                items=profile.properties.items,
                prop=profile.properties;
            if(!col)
                col=items[0].id;
                
            if(_.arr.subIndexOf(items, 'id',col)==-1)
                return this;
            
            if(!args.properties)args.properties={};
            var ns=this, profile=ns.get(0);
            _.merge(args.properties,{   
                dock:'none',
                position:'relative',
                left:0,
                top:0,
                width:'auto',
                height:'auto',
                
                toggle:true,
                toggleBtn:true,
                
                dragKey: prop.disabled?null:profile.box.KEY+":"+profile.$linbid,                
                closeBtn:!prop.disabled 
            });
            var panel=new linb.UI.Panel(args.properties, args.events, args.host, args.theme, args.CS, args.CC, args.CB, args.CF);

            return this.movePanel(panel.get(0), col, basePrf, before);
        },
        movePanel:function(prf, col, basePrf, before){
            var profile=this.get(0);
            if(prf["linb.UI"])prf=prf.get(0);
            if(basePrf && basePrf["linb.UI"])basePrf=basePrf.get(0);

            if(prf && prf!=basePrf){

                var flag,items=profile.children;

                // add to collayout, or move to the right container first
                if(prf.parent!=profile || prf.childrenId != col){
                    this.append(prf, col);
                    flag=1;
                }
                
                var node,
                    tnode=prf.getRootNode();

                // reposition
                if(!basePrf){
                    node=this.getSubNodeByItemId('PANEL', col);
                    if(node.last().isEmpty() || node.last().id()!=tnode.id){
                        node.append(tnode);
                        flag=1;
                    }
                }else if(before){
                    node=basePrf.getRoot();
                    if(node.prev().isEmpty() || node.prev().id()!=tnode.id){
                        node.addPrev(tnode);
                        flag=1;
                        
                        var i1=_.arr.subIndexOf(items,'0',basePrf),
                            i2=_.arr.subIndexOf(items,'0',prf);
                        if(i1!=-1){
                            var item=items[i2];
                            _.arr.removeFrom(items, i2);
                            _.arr.insertAny(items, item, i1, true);
                        }
                    }
                }else{
                    node=basePrf.getRoot();
                    if(node.next().isEmpty() || node.next().id()!=tnode.id){
                        node.addNext(tnode);
                        flag=1;

                        var i1=_.arr.subIndexOf(items,'0',basePrf),
                            i2=_.arr.subIndexOf(items,'0',prf);
                        if(i1!=-1 && i1 > items.length){
                            var item=items[i2];
                            _.arr.removeFrom(items, i2);
                            _.arr.insertAny(items, item, i1+1, true);
                        }
                    }
                }

                if(flag && profile.onRelayout)this.onRelayout(profile);
            }
            return this;
        },
        append:function(target,subId){
            var p=this.get(0).properties;
            if(subId=subId||(p.items && p.items[0] && p.items[0].id))
                arguments.callee.upper.call(this, target, subId);
            return this;
        }
    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
            className:'{_className}',
            ITEMS:{
               $order:10,
               tagName:'div',
               text:"{items}"
            },
            COVER:{
                tagName:'div'
            },
            $submap:{
                items:{
                    ITEM:{
                        tagName:'div',
                        style:'width:{width}',
                        MOVE:{
                            // must be first one
                            $order:1,
                            tagName:'div',
                            style:'{_display}'
                        },
                        PANEL:{
                            $order:2,
                            tagName:'div',
                            text:linb.UI.$childTag
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                position:'absolute',
                'overflow-x':'hidden',
                'overflow-y':'auto',
                border:'none',
                zoom:linb.browser.ie6?1:null
            },            
            ITEMS:{
                position:'relative',
                overflow:'hidden',
                border:'none',
                zoom:linb.browser.ie6?1:null
            },
            COVER:{
                position:'absolute',
                left:0,
                top:0,
                width:'100%',
                height:'100%',
                display:'none',
                'z-index':10,
                background: linb.browser.ie?'url('+linb.ini.img_bg+')':null
            },
            MOVE:{
                $order:0,
                position:'relative',
                'float':'right',
                width:'4px',
                height:'200px',
                cursor:'e-resize',
                'background-color':'#f4f4f4',
                'border-width':linb.browser.opr?'0':null,
                'font-size':linb.browser.ie?0:'',
                'line-height':linb.browser.ie?0:''
            },
            'MOVE-mouseover':{
                $order:1,
                'background-color': '#f0f0f0'
            },
            ITEM:{
                position:'static',
                'float':'left',
                overflow:'hidden',
                'border-width':'0',
                'font-size':linb.browser.ie?0:'',
                'line-height':linb.browser.ie?0:''
            },
            PANEL:{
                position:'static',
                overflow:'hidden',
                zoom:linb.browser.ie6?1:null,
                /*for opera, opera defalut set border to 3 ;( */
                'border-width':linb.browser.opr?'0':null,
                'font-size':linb.browser.ie?0:'',
                'line-height':linb.browser.ie?0:''
            }
        },
        Behaviors:{
            HoverEffected:{MOVE:'MOVE'},
            DroppableKeys:['KEY'],
            MOVE:{
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    var pro=profile.properties;
                    if(pro.disabled)return;
                    
                    var    min=pro.minWidth,
                        cursor=linb.use(src).css('cursor'),
                        pre=profile._pre=linb.use(src).parent(),
                        preW=profile._preW=pre.offsetWidth(),
                        next=profile._next=pre.next(),
                        nextW=profile._nextW=next.offsetWidth(),
                        offset1 = preW-min,
                        offset2 = nextW-min;

                        if(offset1<0)offset1=0;
                        if(offset2<0)offset2=0;

                    profile._bg=null;
                    profile._limited=0;
                    linb.use(src).startDrag(e,{
                        dragType:'copy',
                        targetReposition:false,
                        targetCSS:{background:"none"},
                        horizontalOnly:true,
                        widthIncrement:10,
                        maxLeftOffset:offset1,
                        maxRightOffset:offset2,
                        dragCursor:cursor
                    });
                    
                },
                onDrag:function(profile, e, src){
                    var p=linb.DragDrop.getProfile();
                    if(p.x<=p.restrictedLeft || p.x>=p.restrictedRight){
                        if(!profile._limited){
                            profile._bg=linb.use(src).css('backgroundColor');
                            linb.use(src).css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            linb.use(src).css('backgroundColor',profile._bg);
                            profile._limited=0;
                        }
                    }
                    profile._pre.width(profile._preW + p.offset.x);
                    profile._next.width(profile._nextW - p.offset.x);
                },
                onDragstop:function(profile, e, src){
                    var arr=profile.getSubNode('ITEM',true).get(),
                        n=linb.use(src),
                        l=profile.getSubNode('ITEMS').width(),
                        a=[],t,
                        k=0;

                    _.arr.each(arr,function(o,i){
                        if(i!=arr.length-1)
                            a[i]=linb([o]).offsetWidth();
                    });
                    _.arr.each(arr,function(o,i){
                        if(i!=arr.length-1){
                            t=((a[i]/l)*100).toFixed(4);
                            k += +t;
                            a[i]=o.style.width = t + '%';
                        }
                    });
                    a[arr.length-1]=arr[arr.length-1].style.width = (99-k).toFixed(4) + '%';
                    
                    if(profile._limited){
                        n.css('backgroundColor',profile._bg);
                        profile._limited=0;
                    }
                    if(profile.onColResize)profile.boxing().onColResize(profile, a);
                }
            },
            onMousemove:function(profile,e){
                if(profile.$$ondrag){
                    var prop=profile.properties;
                    if(prop.disabled)return;
                    
                    if(linb.DragDrop.getProfile().isWorking){
                        var box=profile.box,
                            height=profile.$$height,
                            dragid = profile.$$dragitemid,
                            rst=box._checkpos(profile,linb.Event.getPos(e));
                        if(rst){
                            var col=rst[0],
                                row=rst[1],
                                rowup=rst[2];
                            if(col){
                                if(row)
                                    profile.$$droppable=box._checkDroppable(profile, rowup?2:3, linb(row), height, dragid);
                                else
                                    profile.$$droppable=box._checkDroppable(profile, 1, linb(col), height, dragid);
                            }else{
                                box._setNoDroppable(profile);
                                delete profile.$$droppable;
                            }
                        }
                    }
                }
            }
        },
        DataModel:{
            position:'absolute',
            dock:'fill',
            listKey:null,
            width:200,
            height:200,
            minWidth:150,
            disabled:{
                ini:false,
                action: function(v){
                    // no ui 
                }
            },
            items:[
                {id:'1',width:'30.4%'},
                {id:'2',width:'30.4%'},
                {id:'3',width:'38.2%',_display:'display:none'}
            ]
        },
        EventHandlers:{
            onColResize:function(profile, sizes){},
            onRelayout:function(profile){}
        },
        _preparePosSizeEtc:function(profile){
            var root=profile.getRoot(),
                items=profile.getSubNode('ITEM',true),
                w=0,h=0,ns,i,t,

                rootPos=root.offset(),
                rootSize=root.cssSize(),
                colsWidthData=[],
                rowsHeightData=[];

            // gets contrl's pos / size, and inner widgets' cols/rows data for dragDrop
            items.each(function(o){
                w=w+linb(o).offsetWidth();
                colsWidthData.push([w, o.lastChild.id]);
                //get panel's children
                ns=o.lastChild.childNodes;
                h=0;
                rowsHeightData.push([]);
                for(i=0;t=ns[i];i++){
                    //ignore node without id/not uiprovile/
                    if(!t.id || !linb.UIProfile.getFromDom(t) || !t.style || t.style.display=='none' || t.style.visibility=='hidden')continue;
                    h=h+t.offsetHeight;
                    rowsHeightData[rowsHeightData.length-1].push([h,t.id]);
                }
            });
            profile._cachePosSizeData = [rootPos, rootSize, colsWidthData, rowsHeightData];
            
            profile._ddup=profile._ddid=profile._ddincol=profile._ddi==null;
        },
        _checkpos:function(profile, pos, force){
            var _data=profile._cachePosSizeData,
                rootPos=_data[0],
                rootSize=_data[1],
                colsWidthData=_data[2],
                rowsHeightData=_data[3],
                
                changed;

            var col,
                left = pos.left-rootPos.left,
                top = pos.top-rootPos.top,
                i=0, temp,
                t, to=0,
                arr;

            while(t=colsWidthData[i++]){
                if(left<t[0]){
                    if(profile._ddincol===t[1])
                        break;
                    changed=true;
                    profile._ddi=i-1;
                    profile._ddincol=t[1];
                    //if col changed, clear row vars
                    profile._ddid=profile._ddup=null;
                    break;
                }
            }
            if(profile._ddi!==null){
                col=profile._ddincol;
                arr=rowsHeightData[profile._ddi];
                i=0;
                while(t=arr[i++]){
                    if(top<t[0]){
                        //if raw changed, clear pos
                        if(profile._ddid!==t[1])
                            profile._ddup=null;
                        j=(top < (to+(t[0]-to)/2));
                        if(profile._ddid===t[1] && profile._ddup===j)
                            break;
                        profile._ddid=t[1];
                        profile._ddup=j;
                        changed=true;
                        break;
                    }
                    to=t[0];
                }
                if(changed || force)
                    return [col,profile._ddid,profile._ddup];
            }else{
                if(changed || force)
                    return [null];
                else
                    return;
            }
        },
        _checkDroppable:function(profile, type, node, height, dragid){
            var self=this,
                candrop=false,
                proxy= profile._proxy || (profile._proxy=linb.create('<div style="border:1px dashed #FF0000;">'));

            proxy.height(height||20);
            if(node.isEmpty())return;
            if(type===1){
                if(node.last().isEmpty() || node.last().id()!=dragid){
                    node.append(proxy);
                    candrop=true;
                }
            }else if(type===2){
                if(node.id()!=dragid){
                    if(node.prev().isEmpty() || node.prev().id()!=dragid){
                        node.addPrev(proxy);
                        candrop=true;
                    }
                }
            }else{
                if(node.id()!=dragid){
                    if(node.next().isEmpty() || node.next().id()!=dragid){
                        node.addNext(proxy);
                        candrop=true;
                    }
                }
            }
            if(candrop){
                linb.DragDrop.setDragIcon('add');
                return true;
            }else{
                self._setNoDroppable(profile);
                return false;
            }
        },
        _setNoDroppable:function(profile){
            if(profile._proxy){
                profile._proxy.remove();
                delete profile._proxy;
            }
            profile._ddup=profile._ddid=profile._ddincol=profile._ddi==null;
            linb.DragDrop.setDropFace();
        },
        
        _onDropMarkShow:function(){ 
            return false;
        },
        _onDropMarkClear:function(profile){
            profile.box._setNoDroppable(profile);
        },
        _onDragEnter:function(profile,e,src){
            var ddId=linb.DragDrop.getProfile().$id;
            if(profile.$$ddfalg != ddId){
                profile.$$ddfalg = ddId;
                profile.box._preparePosSizeEtc(profile);
            }
            
            var targetPrf = linb.DragDrop.getProfile().dragData.profile;

            // inner panel
            if(targetPrf &&  targetPrf.parent==profile){
                profile.$$dragitemid=linb.DragDrop.getProfile().dragData.profile.domId;
                profile.$$height=linb.DragDrop.getProfile().dragData.profile.getRoot().offsetHeight();
            }
            profile.getSubNode('COVER').css({display:'block'});
            profile.$$ondrag=true;

            delete profile.$$dropalbe;
        },
        _onDragLeave:function(profile){
            profile.getSubNode('COVER').css({display:'none'});
            delete profile.$$dragitemid;
            delete profile.$$height;
            delete profile.$$ondrag;
        },
        _onDrop:function(profile, e){
            if(profile.$$droppable){
                var rst=profile.box._checkpos(profile, linb.Event.getPos(e), true),
                    ddd=linb.DragDrop.getProfile().dragData,
                    targetPrf=ddd.profile,
                    exists = targetPrf.parent==profile;

                if(rst && rst[0]){
                    var col=profile.getItemIdByDom(rst[0]),
                        base=linb.UIProfile.getFromDom(rst[1]),
                        before=rst[2];
                    if(col){
                        if(exists){
                            // move only
                            profile.boxing().movePanel(targetPrf,col,base,before);
                        }else{
                            // add
                            profile.boxing().addPanel(ddd.data.properties,ddd.data.events,col,base,before);
                        }
                    }
                }
            }
            profile.getSubNode('COVER').css({display:'none'});
            profile.box._setNoDroppable(profile);
            delete profile._cachePosSizeData;
            delete profile.$$height;
            delete profile.$$ondrag;
        },

        _prepareData:function(profile){
            profile.properties.dropKeys = profile.box.KEY+":"+profile.$linbid;
            return arguments.callee.upper.call(this, profile);
        },
        _onresize:function(profile,width,height){
        }
    }
});
