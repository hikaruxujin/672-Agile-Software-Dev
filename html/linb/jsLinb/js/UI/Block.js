Class("linb.UI.Block", "linb.UI.Widget",{
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        _.merge(t.FRAME.BORDER,{
            className:'linb-uiw-border {clsBorderType1}',
            PANEL:{
                tagName:'div',
                className:'{clsBorderType2} linb-uibg-bar',
                style:'{background};{_overflow};',
                text:'{html}'+linb.UI.$childTag
            }
        },'all');
        //set back
        self.setTemplate(t);

        //get default Appearance
        t = self.getAppearance();
        //modify
        _.merge(t,{
            PANEL:{
                position:'relative',
                overflow:'hidden'
            }
        });
        //set back
        self.setAppearance(t);
    },
    Static:{
        Behaviors:{
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL']
        },
        DataModel:{
            //delete those properties
            disabled:null,
            tips:null,
            iframeAutoLoad:"",
            ajaxAutoLoad:"",
            selectable:true,
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },
            overflow:{
                ini:undefined,
                action:function(v){
                    this.getSubNode('PANEL').css('overflow',v||'');
                }
            },
            borderType:{
                ini:'outset',
                listbox:['none','flat','inset','outset','groove','ridge'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        n1=ns.getSubNode('BORDER'), n2=ns.getSubNode('PANEL'),
                        reg=/^uiborder-/,
                        flat='linb-uiborder-flat',
                        ins='linb-uiborder-inset',
                        outs='linb-uiborder-outset',
                        root=ns.getRoot();
                    n1.removeClass(reg);
                    n2.removeClass(reg);
                    switch(v){
                        case 'flat':
                        n1.addClass(flat);
                        break;
                        case 'inset':
                        n1.addClass(ins);
                        break;
                        case 'outset':
                        n1.addClass(outs);
                        break;
                        case 'groove':
                        n1.addClass(ins);
                        n2.addClass(outs);
                        break;
                        case 'ridge':
                        n1.addClass(outs);
                        n2.addClass(ins);
                        break;
                    }

                    //force to resize
                    ns.box._setB(ns);
                    linb.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
                }
            },
            background:{
                ini:'',
                action:function(v){
                    this.getSubNode('PANEL').css('background',v);
                }
            },
            width:100,
            height:100
        },
        RenderTrigger:function(){
            // only div
            var ns=this;
            if(ns.box.KEY=="linb.UI.Block")
                if(ns.properties.iframeAutoLoad||ns.properties.ajaxAutoLoad)
                    linb.UI.Div._applyAutoLoad(this);
        },
        _setB:function(profile){
            var p=profile.properties,type=p.borderType;
            p.$hborder=p.$vborder=p.$iborder=0;
            if(type=='flat'||type=='inset'||type=='outset'){p.$hborder=p.$vborder=1;p.$iborder=0;}
            else if(type=='groove'||type=='ridge'){p.$hborder=p.$vborder=p.$iborder=1;}
        },
        LayoutTrigger:function(){
            var v=this.properties.borderType;
            if(v!='none')this.boxing().setBorderType(v,true);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data.background= data.background?'background:'+data.background:'';
            if(_.isStr(data.overflow))
                data._overflow = data.overflow.indexOf(':')!=-1?(data.overflow):("overflow:"+data.overflow);
            return data;
        },        
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments),
                p=profile.properties,
                b=(p.$iborder||0)*2;
            if(size.width)size.width-=b;
            if(size.height&&'auto'!==size.height)
                size.height-=b;
            profile.getSubNode('PANEL').cssSize(size,true);
        }
    }
});

