/*
profile input:
===========================
    [dragType]: String , "move","copy","deep_copy","shape","icon","blank" and "none", default is "shape"
        "blank": moves a empty proxy when mouse moves
        "move": moves target object directly when mouse moves
        "copy": moves a copy of target object when mouse moves
        "deep_copy": moves a deep copy of target object when mouse moves
        "shape": moves a shape of target object when mouse moves
        "icon": moves a icon that represents target object when mouse moves
        "none": moves mouse only
-------------------------
    [dragDefer] :  Number, when [linb.DragDrop.startDrag] is called, the real drag action will be triggered after [document.onmousemove] runs [dragDefer] times, default is 0;
-------------------------
    [magneticDistance]: Number,
    [xMagneticLines]: Array of Number,
    [yMagneticLines]: Array of Number,
        Magnetic setting:
        yMagneticLines 1                      2                     3
              |                      |                     |       xMagneticLines
          ----+----------------------+---------------------+-------1
              |                      |                     |
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------2
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------3
              |                      |                     |

        magneticDistance
         +-------------
         |*************
         |*************
         |**
         |**
         |**
-------------------------
    [widthIncrement]: Number,
    [heightIncrement]: Number,
        Increment setting:
                   widthIncrement
               <-------------------->
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
heightIncrement|                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
              |                      |                     |
-------------------------
    [horizontalOnly]: Number,
    [verticalOnly]: Number,
    horizontalOnly
    ------------------------------------------
                ****************
                ****************
                ****************
                ****************
                ****************
                ****************
    ------------------------------------------
    verticalOnly
               |                |
               |                |
               |****************|
               |****************|
               |****************|
               |****************|
               |****************|
               |****************|
               |                |
               |                |
-------------------------
    [maxBottomOffset]: Number,
    [maxLeftOffset]: Number,
    [maxRightOffset]: Number,
    [maxTopOffset]: Number,
        you can set the limited offset region
        +----------------------------------------------+
        |              |                               |
        |              |maxTopOffset                   |
        |<------------>****************<-------------->|
        |maxLeftOffset**************** maxRightOffset  |
        |              ****************                |
        |              ****************                |
        |              ****************                |
        |              ****************                |
        |              |maxBottomOffset                |
        |              |                               |
        +----------------------------------------------+
-------------------------
    [targetReposition]: <bool>,

    //ini pos and size
    [targetLeft]: Number
    [targetTop]: Number
    [targetWidth]: Number
    [targetHeight]: Number
    [targetCSS]: <object>
        You can set position and size when drag start:
                      targetLeft
                      |
                      |
        targetTop  ---**************** |
                      **************** |
                      **************** |
                      **************** |targetHeight
                      **************** |
                      **************** |
                     |<--targetWidth ->+
-------------------------
    //properties
    [dragCursor]: <string>
-------------------------
    //for drag data
    [dragKey]
    [dragData]

profile output: readonly
===========================
linb.DragDrop.getProfile():
    x  :current X value of mouse;
    y  :current Y value of mouse;
    ox: mouse original X when drag start;
    oy: mouse original Y when drag start;
    curPos:{left:xx,top:xx}: current css pos of the dragging node;
    offset : {x:,y}: offset from now to origin
    restrictedLeft : Number
    restrictedRight : Number
    restrictedTop : Number
    restrictedBottom : Number
    isWorking: Bool.
    proxyNode: linb.Dom object,
    dropElement: String, DOM element id.
*/
Class('linb.DragDrop',null,{
    Static:{
        _eh:"_dd",
        _id:"linb.dd:proxy:",
        _idi:"linb.dd:td:",
        _type:{blank:1,move:1,shape:1,deep_copy:1,copy:1,icon:1,none:1},
        _Icons:{none:'0 0', move:'0 -16px', link:'0 -32px',add:'0 -48px'},
        _profile:{},

        //get left for cssPos
        _left:function(value){
            with(this._profile){
                if(magneticDistance>0 && xMagneticLines.length){
                    var l=xMagneticLines.length;
                    while(l--)
                        if(Math.abs(value - xMagneticLines[l])<=magneticDistance)
                            return xMagneticLines[l];
                }
                if(widthIncrement>1)
                   return Math.floor(value/widthIncrement)*widthIncrement;
                return value;
            }
        },
        //get top for cssPos
        _top:function(value){
            with(this._profile){
                if(magneticDistance>0 && yMagneticLines.length){
                    var l=yMagneticLines.length;
                    while(l--)
                        if(Math.abs(value - yMagneticLines[l])<=magneticDistance)
                            return yMagneticLines[l];
                }
                if(heightIncrement>1)
                    return Math.floor(value/heightIncrement)*heightIncrement;
                return value;
            }
        },

        _ini:function(o){
            var d=this,p=d._profile,_t=linb.win;

            d._box = { width :_t.width()+_t.scrollLeft(),  height :_t.height()+_t.scrollTop()};

            p.ox = p.x;
            p.oy = p.y;

            if(d._proxy = o){
                d._proxystyle=o.get(0).style;

                //ini cssPos here
                d._profile.curPos = d._cssPos= d._proxy.cssPos();

                d._cssPos_x = p.x - d._cssPos.left;
                d._cssPos_y = p.y - d._cssPos.top;

                p.restrictedLeft = p.x - (p.maxLeftOffset||0);
                p.restrictedRight =  p.x + (p.maxRightOffset||0);
                p.restrictedTop = p.y - (p.maxTopOffset||0);
                p.restrictedBottom = p.y + (p.maxBottomOffset||0);

                //here
                d._proxyLeft = d._pre.left = d._cssPos.left;
                d._proxyTop = d._pre.top = d._cssPos.top;

                if("move" !== p.dragType){
                    d._proxy.css('zIndex',linb.Dom.TOP_ZINDEX*10);
                    linb.setNodeData(d._proxy.get(0),'zIndexIgnore', 1);
                }
            }

        },
        _reset:function(){
            var d=this,NULL=null,FALSE=false;
            //reset
            _.tryF(d.$reset);
            d.setDropFace();
            d._resetProxy();

            d.$proxySize=50;
            //event
            d.$mousemove=d.$mouseup=d.$onselectstart=d.$ondragstart='*';

            //reset private vars
            d._cursor='';
            d._pre={};
            d._proxyLeft=d._proxyTop=d._cssPos_x=d._cssPos_y=0;
            d._stop=FALSE;
            if(d._onDrag && d._onDrag.tasks){
                d._onDrag.tasks.length=0;
                delete d._onDrag.tasks;
            }
            if(d._onDragover && d._onDragover.tasks){
                d._onDragover.tasks.length=0;
                delete d._onDragover.tasks;
            }
            d._cssPos=d._box=d._dropElement=d._source=d._proxy=d._proxystyle=d._onDrag=d._onDragover=NULL;

            //reset profile
            d._profile={
                // the unqiue id for dd
                $id:_()+"",

                dragType:'shape',
                dragCursor:'move',
                targetReposition:true,

                dragIcon:linb.ini.path+'ondrag.gif',
                magneticDistance:0,
                xMagneticLines:[],
                yMagneticLines:[],
                widthIncrement:0,
                heightIncrement:0,
                dragDefer:0,

                horizontalOnly:FALSE,
                verticalOnly:FALSE,
                maxBottomOffset:NULL,
                maxLeftOffset:NULL,
                maxRightOffset:NULL,
                maxTopOffset:NULL,

                targetNode:NULL,
                targetCSS:NULL,
                dragKey:NULL,
                dragData:NULL,
                targetLeft:NULL,
                targetTop:NULL,
                targetWidth:NULL,
                targetHeight:NULL,
                targetOffsetParent:NULL,
                targetCallback:NULL,
                tagVar:NULL,

                shadowFrom:NULL,

                //Cant input the following items:
                proxyNode:NULL,
                x:0,
                y:0,
                ox:0,
                oy:0,
                curPos:{},
                offset:{},
                isWorking:FALSE,
                restrictedLeft:NULL,
                restrictedRight:NULL,
                restrictedTop:NULL,
                restrictedBottom:NULL,
                dropElement:NULL
            };
            return d;
        },
        abort:function(){
            this._stop=true;
        },
        _end:function(){
            var d=this,doc=document;

            if(d._proxy) d._unpack();

            //must here
            //if bak, restore
            if(d.$onselectstart!='*')doc.body.onselectstart=d.$onselectstart;
            if(d.$ondragstart!='*')doc.ondragstart=d.$ondragstart;
            //if bak, restore
            if(d.$mousemove!='*')doc.onmousemove=d.$mousemove;
            if(d.$mouseup!='*')doc.onmouseup=d.$mouseup;

            return  d;
        },
        startDrag:function(e, targetNode, profile, dragKey, dragData){
            var d=this,t;
            if(d._profile.isWorking)return false;
            //clear
            d._end()._reset();
            d._profile.isWorking=true;

            profile=_.isHash(profile)?profile:{};
            e = e || window.event;
            // not left button
            if(linb.Event.getBtn(e) !== 'left')
               return true;

            d._source = profile.targetNode = linb(targetNode);
            d._cursor = d._source.css('cursor');

            if((t=profile.targetNode.get(0)) && !t.id){
                t.id=linb.Dom._pickDomId();
                t=null;
            }

            //must set here
            d._defer = profile.dragDefer = _.isNumb(profile.dragDefer) ? profile.dragDefer : 0;
            if(true===profile.dragCursor)profile.dragCursor=d._cursor;
            if(typeof profile.dragIcon == 'string') profile.dragType="icon";

            var doc=document, _pos = linb.Event.getPos(e);
            profile.x = _pos.left;
            profile.y = _pos.top;

            profile.dragKey= dragKey || profile.dragKey || null;
            profile.dragData= dragData  || profile.dragData|| null;

            var fromN=linb.Event.getSrc(e);

            d._start=function(e){
//ie6: mousemove - mousedown =>78 ms
//delay is related to window size, weird
            //                  try{
                var p=d._profile;
                //set profile
                _.merge(p, profile, "with");

                //call event, you can call abort(set _stoop)
                d._source.beforeDragbegin();

                if(d._stop){d._end()._reset();return false}

                //set linb.Event._preDroppable at the begining of drag, for a dd from a child in a droppable node
                if(linb.Event && (t=d._source.get(0))){
                    linb.Event._preDroppable= t.id;
                    t=null;
                }

                //set default icon
                if(p.dragType=='icon')p.targetReposition=false;

                //ini
                d._ini(p.dragType=='none'?null:d._pack(_pos, p.targetNode));
                // on scrollbar
                if(profile.x >= d._box.width  || profile.y >= d._box.height ){d._end()._reset();return true}

                d._source.onDragbegin();

                //set back first
                if(p.dragDefer<1){
                    d.$mousemove = doc.onmousemove;
                    d.$mouseup = doc.onmouseup;
                }
                //avoid setcapture
                if(linb.browser.ie)
                    setTimeout(function(){fromN.releaseCapture()});

                //back up
                doc.onmousemove = d.$onDrag;
                doc.onmouseup = d.$onDrop;
                //for events
                d._source.afterDragbegin();
                //for delay, call ondrag now
                if(p.dragDefer>0)d.$onDrag.call(d, e);
            //                  }catch(e){d._end()._reset();}
            };
            if(linb.browser.ie){
                d.$ondragstart=doc.ondragstart;
                d.$onselectstart=doc.body.onselectstart;
                doc.ondragstart = doc.body.onselectstart = null;
                if(doc.selection && doc.selection.empty)doc.selection.empty();
            }

            //avoid select
            linb.Event.stopBubble(e);

            //fire document onmousedown event
            if(profile.targetNode.get(0)!==doc)
                linb(doc).onMousedown(true, linb.Event.getEventPara(e, _pos));

            if(profile.dragDefer<1){
                _.tryF(d._start,[e],d);
                return false;
            }else{
                //for mouseup before drag
                d.$mouseup = doc.onmouseup;
                doc.onmouseup = function(e){
                    linb.DragDrop._end()._reset();
                    return _.tryF(document.onmouseup,[e],null,true);
                };
                //for mousemove before drag
                d.$mousemove = doc.onmousemove;
                var pbak={};
                doc.onmousemove = function(e){
                    var p=linb.Event.getPos(e);
                    if(p.left===pbak.left&&p.top===pbak.top)return;
                    pbak=p;
                    if(--d._defer<=0)linb.DragDrop._start(e);
                    return false;
                };
            }
//ie6: mousemove - mousedown =>78 ms
        },
        $onDrag:function(e){
            var d=linb.DragDrop,p=d._profile;

           //try{
                e = e || window.event;
                //set _stop or (in IE, show alert)
                if(!p.isWorking || d._stop){
                //if(!p.isWorking || d._stop || (linb.browser.ie && (!e.button) )){
                    d.$onDrop(e);
                    return true;
                }

                var _pos=linb.Event.getPos(e);
                p.x=_pos.left;
                p.y=_pos.top;

                if(!p.isWorking)return false;

                if(d._proxy){
                    if(!p.verticalOnly){
                        d._proxyLeft=Math.floor(d._left(
                            ((p.maxLeftOffset!==null && p.x<=p.restrictedLeft)?p.restrictedLeft:
                             (p.maxRightOffset!==null && p.x>=p.restrictedRight)?p.restrictedRight : p.x)
                            - d._cssPos_x)
                        );
                        if(d._proxyLeft-d._pre.left)
                            d._proxystyle.left=d._proxyLeft+'px';
                        d._pre.left=d._proxyLeft;
                        p.curPos.left = d._proxyLeft + d.$proxySize;
                    }
                    if(!p.horizontalOnly){
                        d._proxyTop=Math.floor(d._top(
                            ((p.maxTopOffset!==null && p.y<=p.restrictedTop) ? p.restrictedTop :
                             (p.maxBottomOffset!==null && p.y>=p.restrictedBottom) ? p.restrictedBottom : p.y)
                            - d._cssPos_y)
                        );
                        if(d._proxyTop-d._pre.top)
                            d._proxystyle.top=d._proxyTop+'px';
                        d._pre.top=d._proxyTop;
                        p.curPos.top = d._proxyTop + d.$proxySize;
                    }
                }else{
                    p.curPos.left = p.x;
                    p.curPos.top = p.y;
                    //style='none', no dd.current dd._pre provided
                    //fireEvent
                    //d._source.onDrag(true); //shortcut for mousemove
                }
                if(d._onDrag!=1){
                    if(d._onDrag)d._onDrag(e,d._source._get(0));
                    else{
                        //ensure to run once only
                        d._onDrag=1;
                        //if any ondrag event exists, this function will set _onDrag
                        d._source.onDrag(true,linb.Event.getEventPara(e, _pos));
                    }
                }
            //}catch(e){linb.DragDrop._end()._reset();}finally{
               return false;
            //}
        },
        $onDrop:function(e){
            var d=linb.DragDrop,p=d._profile,evt=linb.Event;
//                try{
                e = e || window.event;

                // opera 9 down with
                // if(!isWorking){evt.stopBubble(e);return false;}
                d._end();
                if(p.isWorking){

                    //here, release drop face first
                    //users maybe use html() function in onDrop function
                    d.setDropFace();

                    var r = d._source.onDragstop(true,evt.getEventPara(e));
                    if(d._dropElement)
                        linb.use(d._dropElement).onDrop(true,evt.getEventPara(e));
                }
//                }catch(a){}finally{
                d._reset();
                evt.stopBubble(e);
                _.tryF(document.onmouseup,[e]);
                return !!r;
//                }
        },
        setDropElement:function(id){
            this._profile.dropElement=this._dropElement=id;
            return this;
        },
        getProfile:function(){
            var d=this,p=d._profile;
            p.offset=d._proxy
            ?
            { x : d._proxyLeft-p.ox+d._cssPos_x,  y : d._proxyTop-p.oy+d._cssPos_y}
            :
            { x : p.x-p.ox,  y : p.y-p.oy}
            ;
            return p;
        },
        setDropFace:function(target, dragIcon){
            var d=this,
                s1='<div style="position:absolute;z-index:'+linb.Dom.TOP_ZINDEX+';font-size:0;line-height:0;border-',
                s2=":dashed 1px #ff6600;",
                region=d._Region,rh=d._rh,
                bg='backgroundColor';
            if(region && region.parent())
                region.remove(false);
            if(d._R){
                d._R.css(bg, d._RB);
                delete d._R;
                delete d._RB;
            }

            if(target){
                //never create, or be destroyed region
                if(!region || !region.get(0)){
                    region=d._Region=linb.create(s1+'top'+s2+'left:0;top:0;width:100%;height:0;"></div>'+s1+'right'+s2+'right:0;top:0;height:100%;width:0;"></div>'+s1+'bottom'+s2+'bottom:0;left:0;width:100%;height:0;"></div>'+s1+'left:solid 2px #ff6600;width:0;left:0;top:0;height:100%;"></div>');
                    rh=d._rh=linb([region.get(1),region.get(3)]);
                }target=linb(target);
                if(linb.browser.ie6)rh.height('100%');
                if(target.css('display')=='block'){
                    linb.setNodeData(region.get(0),'zIndexIgnore', 1);
                    target.append(region);
                    if(linb.browser.ie6 && !rh.get(0).offsetHeight)
                        rh.height(target.get(0).offsetHeight);
                }else{
                    d._RB = target.get(0).style[bg];
                    d._R=target;
                    target.css(bg, '#FA8072');
                }
                d.setDragIcon(dragIcon||'move');
            }else
                d.setDragIcon('none');
            return d;
        },
        setDragIcon:function(key){
            //avoid other droppable targetNode's setDropFace disturbing.
            _.resetRun('setDropFace', null);
            var d=this,p=d._profile,i=p.proxyNode,ic=d._Icons;
            if(i && p.dragType=='icon')
                i.first(4).css(typeof key=='object'?key:{backgroundPosition: (ic[key]||key)});
            return d;
        },
        _setProxy:function(child, pos){
            var t,temp,d=this,p=d._profile,dom=linb.Dom;
            if(!dom.byId(d._id))
                linb('body').prepend(
                    //&nbsp; for IE6
                    linb.create('<div id="' + d._id + '" style="left:0;top:0;border:0;font-size:0;line-height:0;padding:'+d.$proxySize+'px;position:absolute;background:url('+linb.ini.img_bg+') repeat;"><div style="font-size:0;line-height:0;" id="' +d._idi+ '">'+(linb.browser.ie6?'&nbsp;':'')+'</div></div>')
                );
            t=linb(d._id);
            if(p.dragKey){
                d.$proxySize=0;
                t.css('padding',0);
            }else{
                pos.left -=  d.$proxySize;
                pos.top -= d.$proxySize;
                if(!p.targetOffsetParent)
                    dom.setCover(true);
            }
            if(temp=p.targetOffsetParent)
                linb(temp).append(t);

            if(child){
                linb(d._idi).empty(false).append(child);
                p.proxyNode = child;
            }else
                p.proxyNode = linb(d._idi);
            t.css({display:'',zIndex:dom.TOP_ZINDEX*10,cursor:p.dragCursor}).offset(pos, temp);
            linb.setNodeData(t.get(0),'zIndexIgnore', 1);

            return t;
        },
        _resetProxy:function(){
            var d=this, p=d._profile,
                dom=linb.Dom,
                id1=d._id,
                id2=d._idi;
            if(dom.byId(id1)){
                var t,k,o=linb(id2),t=linb(id1);
                //&nbsp; for IE6
                if(linb.browser.ie6)
                    o.html('&nbsp;',false);
                else o.empty(false);
                o.attr('style','font-size:0;line-height:0;');

                linb('body').prepend(
                    t
                    .css({
                        zIndex:0,
                        cursor:'',
                        display:'none',
                        padding:d.$proxySize+'px'
                    })
                );
                p.proxyNode=d._proxystyle=null;
                dom.setCover(false);
            }
        },
        _pack:function(mousePos,targetNode){
            var target, pos={}, size={}, d=this, p=d._profile, t;
            // get abs pos (border corner)
            if(p.targetLeft===null || null===p.targetTop)
                t=targetNode.offset(null, p.targetOffsetParent);
            pos.left = null!==p.targetLeft?p.targetLeft: t.left;
            pos.top = null!==p.targetTop?p.targetTop: t.top;

            switch(p.dragType){
                case 'deep_copy':
                case 'copy':
                   var t;
                    size.width =  _.isNumb(p.targetWidth)? p.targetWidth:(targetNode.cssSize().width||0);
                    size.height = _.isNumb(p.targetHeight)?p.targetHeight:(targetNode.cssSize().height||0);
                    var n=targetNode.clone(p.dragType=='deep_copy')
                        .css({position:'relative',margin:'0',left:'0',top:'0',right:'',bottom:'',cursor:p.dragCursor,'cssFloat':'none'})
                        .cssSize(size)
                        .id('',true)
                        .css('opacity',0.8);

                    if(p.targetCallback)
                        p.targetCallback(n);

                    n.query('*').id('',true);
                    if(p.targetCSS)
                        n.css(p.targetCSS);
                    target = d._setProxy(n,pos);
                    break;
                case 'shape':
                    // get size
                    size.width = null!==p.targetWidth?p.targetWidth:targetNode.offsetWidth();
                    size.height = null!==p.targetHeight?p.targetHeight:targetNode.offsetHeight();
                    size.width-=2;size.height-=2;
                    target = d._setProxy(
                        linb.create('div').css({border:'dashed 1px',fontSize:'0',lineHeight:'0'}).cssSize(size)
                        ,pos);
                    break;
                case 'blank':
                    target = d._setProxy(null,pos);
                    break;
                case 'icon':
                    pos.left=_.isNumb(p.targetLeft)?p.targetLeft:(mousePos.left - linb.win.scrollLeft() + 16);
                    pos.top=_.isNumb(p.targetTop)?p.targetTop:(mousePos.top - linb.win.scrollTop() + 16);
                    t='<table border="0" class="linb-node linb-node-table"><tr><td valign="top"><span class="linb-node linb-node-span" style="background:url('+p.dragIcon+') no-repeat left top;width:'+(_.isNumb(p.targetWidth)?p.targetWidth:16)+'px;height:'+(_.isNumb(p.targetHeight)?p.targetHeight:16)+'px;" ></span></td><td id="linb:dd:shadow" '+(p.shadowFrom?'style="border:solid 1px #e5e5e5;background:#fff;font-size:12px;line-height:14px;"':'')+'>'+(p.shadowFrom?

                    linb(p.shadowFrom).clone(true)
                    .css({left:'auto',top:'auto', position:'relative'})
                    .outerHTML().replace(/\s*id\=[^\s\>]*/g,''):'')

                    +'</td></tr></table>';
                    target = d._setProxy(linb.create(t).css('opacity',0.8), pos);
                    break;
                case 'move':
                    d.$proxySize=0;
                    target=targetNode;
                    if(target.css('position') != 'absolute')
                        target.css('position','absolute').offset(pos);
                    target.css('cursor',p.dragCursor);
            }

            return target;
        },
        _unpack:function(){
            var d=this, p=d._profile, t,f;
            if(p.targetReposition && ("move" != p.dragType)){
                if((t=linb(d._source)))
                    if(!t.isEmpty()){
                        if(t.css('position')!= 'absolute')
                            t.css('position','absolute').cssPos(t.offset(null,t.get(0).offsetParent ));

                        //for ie bug
                        if(linb.browser.ie)
                            t.cssRegion({right:'',bottom:''});
                        t.offset(p.curPos, p.targetOffsetParent||document.body);
                    }
            }
            if("move" == p.dragType)
                d._source.css('cursor',d._cursor);
        },
        _unRegister:function(node, key){
            var eh=this._eh;
            linb([node])
                .$removeEvent('beforeMouseover', eh)
                .$removeEvent('beforeMouseout', eh)
                .$removeEvent('beforeMousemove', eh);

            linb.setNodeData(node.$linbid, ['_dropKeys',key]);
        },
        _register:function(node, key){
            var eh=this._eh;
            linb(node)
                .beforeMouseover(function(p,e,i){
                    var t=linb.DragDrop, p=t._profile;
                    if(p.dragKey && linb.getNodeData(i,['_dropKeys', p.dragKey])){
                        t.setDropElement(i);
                        t._onDragover=null;
                        linb.use(i).onDragenter(true);
                        if(t._dropElement)
                            _.resetRun('setDropFace', t.setDropFace, 0, [i], t);
                    }
                }, eh)
                .beforeMouseout(function(p,e,i){
                    var t=linb.DragDrop,p=t._profile;
                     if(p.dragKey && linb.getNodeData(i,['_dropKeys', p.dragKey])){
                        linb.use(i).onDragleave(true);
                        t.setDropElement(t._onDragover=null);
                        _.resetRun('setDropFace', t.setDropFace, 0, [null], t);
                    }
                }, eh)
                .beforeMousemove(function(a,e,i){
                    var t=linb.DragDrop, h=t._onDragover, p=t._profile;
                    //no dragover event
                    if(h==1)return;
                    if(t._dropElement==i && p.dragKey && linb.getNodeData(i,['_dropKeys', p.dragKey])){
                        if(h)h(e,i);
                        else{
                            //ensure to run once only
                            t._onDragover=1;
                            //if any dragover event exists, this function will set _onDragover
                            linb.use(i).onDragover(true,linb.Event.getEventPara(e));
                        }
                    }
                }, eh);
            linb.setNodeData(node.$linbid, ['_dropKeys', key], true);
        }
    },
    After:function(){
        this._reset();
        //add dom dd functions
        _.each({
            startDrag:function(e, profile, dragKey, dragData){
                linb.DragDrop.startDrag(e, this.get(0), profile, dragKey||'', dragData||null);
                return this;
            },
            draggable:function(flag, profile, dragKey, dragData){
                var self=this, dd=linb.DragDrop;
                if(flag===undefined)
                    flag=true;
                else if(typeof flag=='object'){
                    profile=flag;
                    flag=true;
                }
                if(!!flag)
                    self.$addEvent('onMousedown',function(p,e,src){
                        if(linb.getId(linb.Event.getSrc(e))!=src)return true;
                        linb.use(src).startDrag(e, profile, dragKey, dragData)
                    }, dd._eh, -1);
                else
                    self.$removeEvent('onMousedown', dd._eh);

                return self;
            },
            droppable:function(flag, key){
                if(flag===undefined)flag=true;
                key = key || 'default';
                var d=linb.DragDrop;
                return this.each(function(o){
                    if(!!flag)
                        d._register(o, key);
                    else
                        d._unRegister(o, key);
                });
            }
        },function(o,i){
            linb.Dom.plugIn(i,o);
        });
    }
});