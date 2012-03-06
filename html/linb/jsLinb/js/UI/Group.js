Class("linb.UI.Group", "linb.UI.Div",{
    Instance:{
        activate:function(){
            var profile = this.get(0);
            profile.getSubNode('HANDLE').focus();
            return this;
        },
        resetPanelView:function(destroyChildren){
            if(!_.isSet(destroyChildren))destroyChildren=true;
            var ins;
            return this.each(function(profile){
                if(profile.renderId){
                    delete profile.$ini;
                    ins=profile.boxing();
                    ins.removeChildren(true,destroyChildren)
                    if(profile.properties.toggle)
                        ins.setToggle(false);
                }
            });
        }
    },
    Static:{
        Behaviors:{
            NavKeys:{CAPTION:1},
            HoverEffected:{TOGGLE:'TOGGLE'},
            ClickEffected:{TOGGLE:'TOGGLE'},
            DroppableKeys:['PANEL'],
            PanelKeys:['PANEL'],
            DraggableKeys:['HANDLE'],
            onSize:linb.UI.$onSize,
            HANDLE:{
                onClick:function(profile, e, src){
                    if(profile.properties.toggleBtn){
                        profile.box._toggle(profile, !profile.properties.toggle);
                        return false;
                    }
                },
                onKeydown : function(profile, e, src){
                    if(linb.Event.getKey(e).key=='enter')
                        linb(src).onClick();
                }
            }
        },
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            FIELDSET:{
                tagName : 'fieldset',
                className: ' {toggleCls}',
                LEGEND:{
                    tagName : 'legend',
                    HANDLE:{
                        tabindex: '{tabindex}',
                        TOGGLE:{
                            className: 'linb-uicmd-toggle2 {toggleCls2}',
                            style:"{toggleDispplay}"
                        },
                        ICON:{
                            $order:1,
                            className:'linb-ui-icon {imageClass}',
                            style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                        },
                        CAPTION : {
                            text:   '{caption}',
                            $order:2
                        }
                    }
                },
                PANEL:{
                    $order:1,
                    tagName:'div',
                    style:'{panelDisplay};{_overflow};',
                    text:'{html}'+linb.UI.$childTag
                }
            }
        },
        Appearances:{
            KEY:{
                zoom:linb.browser.ie6?"1":null
            },
            FIELDSET:{
                border:'1px solid #7ba3cb',
                position:'relative',
                overflow:'hidden',
                zoom:linb.browser.ie6?"1":null
            },
            'FIELDSET-checked':{
                $order:2,
                'padding-left':'2px',
                'border-left':'0',
                'border-right':'0',
                'border-bottom':'0'
            },
            LEGEND:{
                'margin-left':'3px'
            },
            HANDLE:{
                cursor:'default',
                padding:'0 3px 0 6px',
                display:linb.$inlineBlock
            },
            PANEL:{
                position:'relative',
                overflow:'auto',
                 background:linb.browser.ie?'url('+linb.ini.img_bg+') no-repeat left top':null
            },
            'FIELDSET-checked PANEL':{
                $order:4,
                display:'none'
            },
            CAPTION:{
                'vertical-align':linb.browser.ie6?'baseline':'middle',
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                'font-size':'12px',
                'line-height':'18px'
            }
        },

        DataModel:{
            selectable:true,
            caption:{
                ini:undefined,
                // ui update function when setCaption
                action: function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('CAPTION').html(linb.adjustRes(v,true));
                }
            },
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },
            toggleBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('TOGGLE').css('display',v?'':'none');
                }
            },
            toggle:{
                ini:true,
                action:function(v){
                    this.box._toggle(this, v);
                }
            },
            image:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('display',value?'':'none')
                        .css('backgroundImage','url('+(value||'')+')');
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('backgroundPosition', value);
                }
            }
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties, b=self.box;
            if(t.toggle)
                b._toggle(self,t.toggle);
        },        
        EventHandlers:{
            onIniPanelView:function(profile){},
            beforeFold:function(profile){},
            beforeExpend:function(profile){},
            afterFold:function(profile){},
            afterExpend:function(profile){}
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                nodisplay='display:none';

            data.toggleDispplay=data.toggleBtn?'':nodisplay;

            data.panelDisplay = data.toggleBtn&&!data.toggle?nodisplay:'';
            data.toggleCls = data.toggleBtn&&!data.toggle?profile.getClass('FIELDSET','-checked'):'';
            data.toggleCls2 = data.toggleBtn&&data.toggle?'linb-uicmd-toggle2-checked':'';
            
            profile._toggle = !!data.toggle;
            
            return data;
        },
        _onresize:function(profile,width,height){
            if(height && height!='auto'){
                profile.getSubNode('FIELDSET').height(height);
                profile.getSubNode('PANEL').height(height-(profile.getSubNode('LEGEND').height()||18));
            }
            if(width && width!='auto')
                profile.getSubNode('PANEL').width(width-2);
        },
        _toggle:function(profile, value){
            var p=profile.properties, ins=profile.boxing();

            //event
            if(value &&!profile.$ini){
                if(ins.onIniPanelView){
                    if(ins.onIniPanelView(profile)!==false){
                        profile.$ini=true;
                    }
                    if(p.iframeAutoLoad||p.ajaxAutoLoad)
                        linb.UI.Div._applyAutoLoad(profile);
                }
            }
            if(profile._toggle !== !!value){
                //set toggle mark
                profile._toggle = p.toggle = !!value;
    
                if(value){
                    if(ins.beforeExpend && false===ins.beforeExpend(profile))return;
                }else{
                    if(ins.beforeFold && false===ins.beforeFold(profile))return;
                }
    
                //show/hide/panel
                profile.getSubNode('PANEL').css('display',value?'':'none');
                //chang toggle button
                if(p.toggleBtn)
                    profile.getSubNode('TOGGLE').tagClass('-checked', !!value);
    
                profile.getSubNode('FIELDSET').tagClass('-checked',!value);
                
                if(value){
                    if(ins.afterExpend)
                        ins.afterExpend(profile);
                }else{
                    if(ins.afterFold)
                        ins.afterFold(profile);
                }
            }
        }
    }
});