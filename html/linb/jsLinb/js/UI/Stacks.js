Class("linb.UI.Stacks", "linb.UI.Tabs",{
    Initialize:function(){
        var t=this.getTemplate();
        t.BOX={tagName:'div',LIST:t.LIST, PNAELS:t.PNAELS};
        delete t.LIST;
        delete t.PNAELS;
        delete t.LEFT;
        delete t.TOP;
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            BOX:{
                border:'solid 1px #648CB4',
                position:'absolute',
                left:0,
                top:0
            },
            LIST:{
                position:'static'
            },
            ITEMS:{
                position:'static'
            },
            ITEM:{
                $order:0,
                display:'block',
                position:'absolute',
                cursor:'pointer',
                background: linb.UI.$bg('bar_vertical.gif', 'repeat-x left -380px', true),
                width:'100%',
                left:0
            },
            // to cover Tab's setting, must use ITEMC/ITEMI separately
            ITEMC:{
                display:'block'
            },
            ITEMI:{
                display:'block'
            },
            'ITEM-mouseover':{
                $order:1,
                'background-position' : 'right -410px'
            },
            'ITEM-mousedown, ITEM-checked':{
                $order:2,
                'background-position' : 'right -440px'
            },
            HANDLE:{
                cursor:'pointer',
                display:'block',
                'font-size':'12px',
                height:'100%',
                height:'18px',
                'padding':'5px 0 5px 8px',
                'white-space':'nowrap'
            },
            PANEL:{
                position:'absolute',
//                visibility:'hidden',
//                top:'-10000px',
//                left:'-10000px',
                display:'none',
                overflow:'auto'
            },
            CMDS:{
                position:'absolute',
                top:'6px',
                right:'8px',
                'text-align':'right',
                'vertical-align': 'middle'
            }
        },
        DataModel:{
            $border:1,
            noPanel:null,
            selMode:null
        },
        _onresize:function(profile,width,height,force,key){
            var t=profile.properties,
                item = profile.getItemByItemId(key),
                bw=t.$border*2;
            if(!item)
                key=t.$UIvalue;

            var temp,t1,t2,obj,top,
                wc=null,hc=null,
                bx=profile.getSubNode('BOX'),
                o = profile.boxing().getPanel(key);
            if(!o || o.isEmpty())return;

            // change value
            if(height){
                height-=bw;
                t2=t1=0;
                _.arr.each(t.items,function(o){
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({bottom:'auto',top:t1});

                    // offsetHeight maybe not set here
                    t1 += obj.height();
                    if(o.id == key)return false;
                });
                _.arr.each(t.items,function(o){
                    if(o.id == key)return false;
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({top:'auto',bottom:t2});
                    t2+= obj.height();
                },null,true);

                temp = height - t1 - t2;
                if(temp>0){
                    top=t1;
                    hc=temp;
                }

                bx.height(height);
            }
            if(width){
                width-=bw;
                wc=width;
                bx.width(width);
            }

            o.cssRegion({width:wc?wc:null,height:hc?hc:null,top:top,left:0},true);
            if(wc)profile.getSubNode('LIST').width(wc);
        },
        _adjustScroll:null
    }
});
