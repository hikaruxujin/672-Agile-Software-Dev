Class("linb.UI.Slider", ["linb.UI","linb.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                var p=profile.properties,
                    steps=p.steps,
                    fun=function(k){return profile.getSubNode(k)},
                    a=fun('IND1'),
                    b=fun('IND2'),
                    arr = profile.box._v2a(profile,value),
                    ori=p.type=='vertical'?'top':'left';
                a[ori](arr[0]+'%');
                if(p.isRange)
                    b[ori](arr[1]+'%');
            });
        },
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['BOX']);
        }
    },
    Static:{
        Templates:{
            style:'{_style}',
            className:'{_className}',
            BOX:{
                tagName:'div',
                className:'{_cls}',
                BG:{
                    tagName:'div'
                },
                RULER:{
                    $order:1,
                    tagName:'div',
                    RULERLEFT:{},
                    RULERRIGHT:{}
                },
                IND:{
                    $order:2,
                    IND1:{
                        style:'{_showD}',
                        tabindex:'{tabindex}'
                    },
                    IND2:{
                        style:'{_showD2}',
                        tabindex:'{tabindex}'
                    }
                },
                DECREASE:{
                    style:'{_showDes}',
                    tabindex:'{tabindex}'
                },
                INCREASE:{
                    style:'{_showIns}',
                    tabindex:'{tabindex}'
                }
            }
        },
        Appearances:{
            'IND, BT, RULER, RULERLEFT, RULERRIGHT, IND1, IND2, DECREASE, INCREASE':{
                'font-size':0,
                'line-height':0,
                position:'absolute'
            },
            BOX:{
                position:'relative',
                left:0,
                top:0,
                width:'100%',
                height:'100%'
            },
            'BOX-h DECREASE, BOX-h INCREASE':{
                top:'50%',
                width:'17px',
                height:'17px',
                'margin-top':'-8px'
            },            
            'BOX-v DECREASE, BOX-v INCREASE, BOX-h DECREASE, BOX-h INCREASE, BOX-h IND1,BOX-h IND2, BOX-v IND1,BOX-v IND2':{
                background: linb.UI.$bg('icons.gif', 'no-repeat',true)
            },
            'BOX-h DECREASE':{
                $order:1,
                left:0,
                'background-position': '-80px -70px'
            },
            'BOX-h INCREASE':{
                $order:1,
                right:0,
                'background-position': '-100px -70px'
            },
            'BOX-h DECREASE-mouseover':{
                $order:2,
                'background-position':'-80px -90px'
            },
            'BOX-h DECREASE-mousedown':{
                $order:3,
                'background-position':'-80px -110px'
            },
            'BOX-h INCREASE-mouseover':{
                $order:2,
                'background-position':'-100px -90px'
            },
            'BOX-h INCREASE-mousedown':{
                $order:3,
                'background-position':'-100px -110px'
            },
            'BOX-h BG':{
                top:'50%'                
            },
            'BOX-h IND, BOX-h RULER':{
                'z-index':1,
                top:'50%',
                height:'6px',
                'margin-top':'-3px'
            },
            'BOX-h RULER, BOX-h RULERLEFT, BOX-h RULERRIGHT':{
                background: linb.UI.$bg('bar_vertical.gif', 'repeat-x',true)
            },
            'BOX-h RULER':{
                $order:2,
                'background-position':'left -482px'
            },
            'BOX-h RULERLEFT, BOX-h RULERRIGHT':{
                'z-index':1,
                height:'6px',
                width:'5px'
            },
            'BOX-h RULERLEFT':{
                $order:2,
                'background-position':'left -474px',
                left:'-4px',
                top:0
            },
            'BOX-h RULERRIGHT':{
                $order:2,
                'background-position':'left -490px',
                right:'-4px',
                top:0
            },
            'BOX-h IND1,BOX-h IND2':{
                $order:1,
                'z-index':2,
                'background-position': '-21px -282px',
                height:'18px',
                width:'8px',
                left:0,
                top:0,
                cursor:'e-resize',
                'margin-top':'-6px'
            },
            'BOX-h IND1-mouseover,BOX-h IND2-mouseover':{
                $order:2,
                'background-position':'-31px -282px'
            },
            'BOX-h IND1-mousedown,BOX-h IND2-mousedown':{
                $order:3,
                'background-position':'-41px -282px'
            },

            'BOX-v DECREASE, BOX-v INCREASE':{
                $order:10,
                left:'50%',
                width:'17px',
                height:'17px',
                'margin-left':'-8px'
            },            
            'BOX-v DECREASE':{
                $order:10,
                top:0,
                'background-position': '-120px -70px'
            },
            'BOX-v INCREASE':{
                $order:10,
                bottom:0,
                'background-position': '-140px -70px'
            },
            'BOX-v DECREASE-mouseover':{
                $order:11,
                'background-position':'-120px -90px'
            },
            'BOX-v DECREASE-mousedown':{
                $order:12,
                'background-position':'-120px -110px'
            },
            'BOX-v INCREASE-mouseover':{
                $order:11,
                'background-position':'-140px -90px'
            },
            'BOX-v INCREASE-mousedown':{
                $order:12,
                'background-position':'-140px -110px'
            },
            'BOX-v BG':{
                $order:10,
                left:'50%'                
            },
            'BOX-v IND, BOX-v RULER':{
                $order:10,
                'z-index':1,
                left:'50%',
                width:'6px',
                'margin-left':'-3px'
            },
            'BOX-v RULER, BOX-v RULERLEFT, BOX-v RULERRIGHT':{
                background: linb.UI.$bg('bar_horizontal.gif', 'repeat-y',true)
            },
            'BOX-v RULER':{
                $order:10,
                'background-position':'-482px top'
            },
            'BOX-v RULERLEFT, BOX-v RULERRIGHT':{
                $order:10,
                'z-index':1,
                width:'6px',
                height:'5px'
            },
            'BOX-v RULERLEFT':{
                $order:12,
                'background-position':'-490px top',
                top:'-4px',
                left:0
            },
            'BOX-v RULERRIGHT':{
                $order:12,
                'background-position':'-474px top',
                bottom:'-4px',
                left:0
            },
            'BOX-v IND1,BOX-v IND2':{
                $order:10,
                'z-index':2,
                'background-position': 'left -272px',
                width:'18px',
                height:'8px',
                left:0,
                top:0,
                cursor:'n-resize',
                'margin-left':'-6px'
            },
            'BOX-v IND1-mouseover,BOX-v IND2-mouseover':{
                $order:11,
                'background-position':'left -282px'
            },
            'BOX-v IND1-mousedown,BOX-v IND2-mousedown':{
                $order:12,
                'background-position':'left -292px'
            }
        },
        Behaviors:{
            HoverEffected:{IND1:'IND1',IND2:'IND2',DECREASE:'DECREASE',INCREASE:'INCREASE'},
            ClickEffected:{IND1:'IND1',IND2:'IND2',DECREASE:'DECREASE',INCREASE:'INCREASE'},
            onSize:linb.UI.$onSize,
            IND:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var p1=linb.use(src).offset(),
                        p2=linb.Event.getPos(e),
                        arr=profile.box._v2a(profile,profile.properties.$UIvalue),
                        i1,i2,
                        type=p.type=='vertical',
                        k1=type?'top':'left',
                        k2=type?'offsetTop':'offsetLeft',
                        k3=type?'offsetHeight':'offsetWidth',
                        cur=p2[k1]-p1[k1],
                        v=(cur/linb.use(src).get(0)[k3])*100;
                    if(!p.isRange)
                        arr[0]=v;
                    else{
                        i1=profile.getSubNode('IND1')[k2](),
                        i2=profile.getSubNode('IND2')[k2]();
                        if(Math.abs(i1-cur)<Math.abs(i2-cur))
                            arr[0]=v;
                        else arr[1]=v;
                    }
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr));
                }
            },
            IND1:{
                onKeydown:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        key=linb.Event.getKey(e).key;
                    if(key==(type?'up':'left'))
                        profile.box._auto(profile, false);
                    if(key==(type?'down':'right'))
                        profile.box._auto(profile, true);
                },
                onKeyout:function(profile){
                    linb.Thread.abort(profile.$linbid+':auto');
                },
                onKeyup:function(profile){
                    linb.Thread.abort(profile.$linbid+':auto');
                },
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        k2=type?'offsetTop':'offsetLeft',
                        k3=type?'offsetHeight':'offsetWidth',
                        box=profile.box;
                    linb.use(src).startDrag(e,{
                        widthIncrement:p.steps?profile._size/p.steps:null,
                        dragType:'none',
                        targetReposition:true,
                        horizontalOnly:type?true:null,
                        verticalOnly:type?null:true,
                        maxLeftOffset: linb.use(src).get(0)[k2],
                        maxRightOffset: linb.use(src).parent().get(0)[k3]-linb.use(src).get(0)[k2],
                        dragCursor:'default'
                    });

                    linb.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND2').css('zIndex',5);
                },
                beforeDragbegin:function(profile, e, src){
                    var type=profile.properties.type=='vertical';
                    linb(src)[type?'top':'left'](profile.__x=linb.use(src).get(0)[type?'offsetTop':'offsetLeft']);
                },
                onDrag:function(profile, e, src){
                    var offset=linb.DragDrop.getProfile().offset,
                        type=profile.properties.type=='vertical',
                        arr=profile.box._v2a(profile,profile.properties.$UIvalue);
                    arr[0]=((profile.__x+offset[type?'y':'x'])/linb.use(src).parent().get(0)[type?'offsetHeight':'offsetWidth'])*100;
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr));
                },
                onDragstop:function(profile, e, src){
                    linb(src).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onClick:function(){return false}
            },
            IND2:{
                onKeydown:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        key=linb.Event.getKey(e).key;
                    if(key==(type?'up':'left'))
                        profile.box._auto(profile, false);
                    if(key==(type?'down':'right'))
                        profile.box._auto(profile, true);
                },
                onKeyout:function(profile){
                    linb.Thread.abort(profile.$linbid+':auto');
                },
                onKeyup:function(profile){
                    linb.Thread.abort(profile.$linbid+':auto');
                },
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var type=p.type=='vertical',
                        k2=type?'offsetTop':'offsetLeft',
                        k3=type?'offsetHeight':'offsetWidth',
                        box=profile.box;
                    linb.use(src).startDrag(e,{
                        widthIncrement:p.steps?profile._size/p.steps:null,
                        dragType:'none',
                        targetReposition:true,
                        horizontalOnly:type?true:null,
                        verticalOnly:type?null:true,
                        maxLeftOffset: linb.use(src).get(0)[k2],
                        maxRightOffset: linb.use(src).parent().get(0)[k3]-linb.use(src).get(0)[k2],
                        dragCursor:'default'
                    });

                    linb.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND1').css('zIndex',5);
                },
                beforeDragbegin:function(profile, e, src){
                    var type=profile.properties.type=='vertical';
                    linb(src)[type?'top':'left'](profile.__x=linb.use(src).get(0)[type?'offsetTop':'offsetLeft']);
                },
                onDrag:function(profile, e, src){
                    var offset=linb.DragDrop.getProfile().offset,
                        type=profile.properties.type=='vertical',
                        arr=profile.box._v2a(profile,profile.properties.$UIvalue);
                    arr[1]=((profile.__x+offset[type?'y':'x'])/linb.use(src).parent().get(0)[type?'offsetHeight':'offsetWidth'])*100;
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr));
                },
                onDragstop:function(profile, e, src){
                    linb(src).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onClick:function(){return false}
            },
            RULERRIGHT:{
                onClick:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || p.readonly)return;
                    var b=profile.boxing(),
                        c=profile.box,
                        arr=c._v2a(profile,p.$UIvalue);
                    if(!p.isRange)
                        arr[0]=100;
                    else
                        arr[1]=100;
                    b.setUIValue(profile.box._adjustValue(profile,arr));
                }
            },
            DECREASE:{
                onMousedown:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._auto(profile, false);
                },
                onMouseout:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    linb.Thread.abort(profile.$linbid+':auto');
                },
                onMouseup:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    linb.Thread.abort(profile.$linbid+':auto');
                }
            },
            INCREASE:{
                onMousedown:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._auto(profile, true);
                },
                onMouseout:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    linb.Thread.abort(profile.$linbid+':auto');
                },
                onMouseup:function(profile){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    linb.Thread.abort(profile.$linbid+':auto');
                }
            }
        },
        DataModel:{
            position:'absolute',
            width:{
                ini:200
            },
            height:{
                ini:50
            },
            steps:0,
            value:'0:0',
            type:{
                listbox:['vertical', 'horizontal'],
                ini:'horizontal',
                action:function(v){
                    this.boxing().refresh();
                }
            },
            isRange:{
                ini:true,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            showIncreaseHandle:{
                ini:true,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            showDecreaseHandle:{
                ini:true,
                action:function(v){
                    this.boxing().refresh();
                }
            }
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile),
                N='display:none';
            d._showDes=d.showDecreaseHandle?'':N,
            d._showIns=d.showIncreaseHandle?'':N,
            d._showD2=d.isRange?'':N;
            d._cls=profile.getClass('BOX',d.type=='vertical'?'-v':'-h');
            return d;
        },
        _adjustValue:function(profile,value){
            var p = profile.properties,
                b=[];
            b[0]=parseFloat(value[0])||0;
            b[1]=parseFloat(value[1])||0;
            if(p.steps){
                value=100/p.steps;
                b[0]=Math.ceil(b[0]/value);
                if(p.isRange)
                    b[1]=Math.ceil(b[1]/value);
            }
            return p.isRange?b.join(':'):(b[0]+'');
        },
        _ensureValue:function(profile, value){
            var p = profile.properties,
                a = String(value).split(':'),
                min=0,
                max=p.steps?p.steps:100,
                b=[],
                f1=function(a){return parseFloat(a)||0},
                f2=function(a){return Math.min(max, Math.max(min,a))};
            b[0]= f1(a[0]);
            if(p.isRange){
                b[1]= f1(a[1]);
                if(b[0]>b[1]){
                    a=b[1];
                    b[1]=b[0];
                    b[0]=a;
                }
            }
            b[0]= f2(b[0]);
            if(p.isRange)
                b[1]= f2(b[1]);
            return p.isRange?b.join(':'):(b[0]+'');
        },
        _v2a:function(profile,v){
            var steps=profile.properties.steps,t;
            v = typeof v == 'string'? v.split(':') : v;
            v[0]=parseFloat(v[0])||0;v[1]=parseFloat(v[1])||0;
            if(steps)v[0]=v[0]*100/steps;
            if(steps)v[1]=v[1]*100/steps;
            if(v[0]>v[1]){
                t=v[0];
                v[1]=v[0];
                v[0]=t;
            }
            return v;
        },
        _auto:function(profile, flag){
            var id=profile.$linbid+':auto';
            if(linb.Thread.isAlive(id))return;
            var p=profile.properties,t,
                //%
                off=(p.steps?100/p.steps:1)*(flag?1:-1),
                task={delay:300},
                arr=profile.box._v2a(profile,p.$UIvalue),
                fun=function(){
                    arr[0] += off;
                    if(p.isRange)
                        arr[1] += off;
                    profile.boxing().setUIValue(profile.box._adjustValue(profile,arr));
                    task.delay *=0.8;
                };
            task.task=fun;
            linb.Thread(id,[task],500,null,fun,null,true).start();
        },
        _onresize:function(profile, width, height){
            var p=profile.properties,
            type=p.type,
            f=function(k){return profile.getSubNode(k)},

            ruler=f('RULER'),
            ind=f('IND'),

            ru1=f('RULERLEFT');
            if(type=='vertical'){
                var w=ru1.height(),
                w1=p.showDecreaseHandle?f('DECREASE').height():0,
                w2=p.showIncreaseHandle?f('INCREASE').height():0,
                w3=f('IND1').height();
    
                if(height){
                    ruler.top(w1+w).height(height-w1-w2-2*w);
                    ind.top(w1).height(profile._size=height-w1-w2-w3);
                }
            }else{
                var w=ru1.width(),
                w1=p.showDecreaseHandle?f('DECREASE').width():0,
                w2=p.showIncreaseHandle?f('INCREASE').width():0,
                w3=f('IND1').width();
    
                if(width){
                    ruler.left(w1+w).width(width-w1-w2-2*w);
                    ind.left(w1).width(profile._size=width-w1-w2-w3);
                }
            }
        }
    }
});