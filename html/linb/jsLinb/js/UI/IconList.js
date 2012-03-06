Class("linb.UI.IconList", "linb.UI.List",{
    Instance:{
        getStatus:function(id){
            var item=this.get(0).getItemByItemId(id);
            return (item && item._status)||'ini';
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.$submap={
            items:{
                ITEM:{
                    tabindex:'{_tabindex}',
                    className:'{itemClass} {disabled}  {readonly}',
                    style:'padding:{itemPadding}px;margin:{itemMargin}px;{itemStyle}',
                    //for firefox2 image in -moz-inline-box cant change height bug
                    IBWRAP:{
                        tagName:'div',
                        IMAGE:{
                            tagName:'img',
                            src:'{image}',
                            width:'{itemWidth}',
                            height:'{itemHeight}',
                            style:'{imgStyle}'
                        }
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                overflow:'auto',
                'overflow-x': 'hidden'
            },
            ITEMS:{
                overflow:'auto',
                'overflow-x': 'hidden',
                position:'relative',
                'line-height':'14px',
                zoom:linb.browser.ie6?1:null
            },
            ITEM:{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                position:'relative',
                cursor:'pointer',
                border:'solid 1px #C2E4FC',
                'vertical-align':'top'
            },
            IBWRAP:{
                'font-size':0,
                'line-height':0
            },
             'ITEM-mouseover':{
                $order:1,
                padding:0,
                border:'solid 1px #a0c8f0',
                'background-color':'#e1f0ff'
            },
            'ITEM-mousedown':{
                $order:2,
                padding:0,
                border:'solid 1px #dcdcdc',
                'background-color':'#bbcef1'
             },
            'ITEM-checked':{
                $order:2,
                padding:0,
                border:'solid 1px #bbcef1',
                'background-color':'#bbcef1'
            },
            'ITEM-mouseover, ITEM-mousedown, ITEM-checked':{
            }
        },
        Behaviors:{
            IMAGE:{
                onLoad:function(profile,e,src){
                    var item=profile.getItemByDom(src);
                    item._status='loaded';
                },
                onError:function(profile,e,src){
                    var item=profile.getItemByDom(src);
                    item._status='error';
                }
            }
        },
        DataModel:({
            itemMargin:{
                ini:6,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('margin',(''+parseFloat(v))==(''+v)?v+'px':v);
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemPadding:{
                ini:2,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('padding',(''+parseFloat(v))==(''+v)?v+'px':v);
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemWidth:{
                ini:16,
                action:function(v){
                    this.getSubNode('IMAGE',true).width(v);
                }
            },
            itemHeight:{
                ini:16,
                action:function(v){
                    this.getSubNode('IMAGE',true).height(v);
                }
            },
            width:200,
            height:200
        }),
        _prepareItem:function(profile, item){
            var p = profile.properties;
            _.arr.each(_.toArr('itemWidth,itemHeight,itemPadding,itemMargin'),function(i){
                item[i] = item[i] || p[i];
            });
            item._tabindex = p.tabindex;
            //Avoid Empty Image src
            if(!item.image)item.image=linb.ini.img_bg;
        }
    }
});
