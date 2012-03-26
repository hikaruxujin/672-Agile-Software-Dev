/* css
*  dependency: base _ ; Class ; linb ;
*/
Class("linb.CSS", null,{
    Static:{
        _r:linb.browser.ie?'rules':'cssRules',
        _baseid:'linb:css:base',
        _firstid:'linb:css:first',
        _lastid:'linb:css:last',
        _reg1:/\.(\w+)\[CLASS~="\1"\]/g,
        _reg2:/\[ID"([^"]+)"\]/g,
        _reg3:/\*([.#])/g,
        _reg4:/\s+/g,
        _reg5:/\*\|/g,
        _reg6:/(\s*,\s*)/g,
        _rep:function(str){
            var ns=this;
            return str.replace(ns._reg1,'.$1')
                     .replace(ns._reg2,'#$1')
                     .replace(ns._reg3,'$1')
                     .replace(ns._reg4,' ')
                     .replace(ns._reg5,'')
                     .replace(ns._reg6,',').toLowerCase();
        },
        _createCss:function(id, last){
            var ns=this,
                head=this._getHead(),
                fid=ns._firstid,
                lid=ns._lastid,
                fc,
                c;
            fc=document.createElement('style');
            fc.type="text/css";
            fc.id=id;
            if(!last){
                c= document.getElementById(fid) || head.firstChild;
                while((c=c.nextSibling) && !/^(script|link|style)$/i.test(''+c.tagName));
                if(c)
                    head.insertBefore(fc, c);
                else{
                    if(c= document.getElementById(lid))
                        head.insertBefore(fc, c);
                    else
                        head.appendChild(fc);
                }
            }else
                head.appendChild(fc);
            return fc;
        },
        _getCss:function(id, last){
            return document.getElementById(id) || this._createCss(id, last);
        },
        _getBase:function(){
            return this._getCss(this._baseid);
        },
        _getFirst:function(){
            return this._getCss(this._firstid);
        },
        _getLast:function(){
            return this._getCss(this._lastid, true);
        },
        _getHead:function(){
            return this._head || (this._head=document.getElementsByTagName("head")[0]||document.documentElement);
        },
        _check:function(){
            if(!linb.browser.ie)return;
            var count=0;
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" )
                    count++
            return count>20;
        },
        get:function(property, value){
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" && property in l && l[property]==value)
                    return l;
        },
        //if backOf==true, add to head last node
        //else add to the before position of the base styleSheet
        addStyleSheet:function(txt, id, backOf ){
            var e, ns=this, head = ns._getHead(),add=function(txt,id,backOf){
                var e = document.createElement('style');
                e.type="text/css";
                if(id)e.id=id;
                //for ie
                if(linb.browser.ie)
                    e.styleSheet.cssText = txt||'';
                else
                    try{e.appendChild(document.createTextNode(txt||''))}catch(p){e.styleSheet.cssText = txt||''}
                head.insertBefore(e, backOf  ?ns._getLast():ns._getBase());
                e.disabled=true;
                e.disabled=false;
                return e;
            },merge=function(txt,backOf){
                var e=backOf ?ns._getLast():ns._getBase();
                e.styleSheet.cssText +=txt;
                return e;
            };
            if(id && (id=id.replace(/[^\w\-\_\.\:]/g,'_')) && (e=ns.get('id',id)))
                return e;

            if(ns._check()){
                return merge(txt, backOf);
            }else
                return add(txt,id,backOf);
        },
        //if front==true, add to the before position of the base styleSheet
        //else add to the last postion
        includeLink:function(href, id, front, attr){
            var e, ns=this, head = ns._getHead();
            if(href && (e=ns.get('href',href))){}else{
                e = document.createElement('link');
                e.type = 'text/css';
                e.rel = 'stylesheet';
                e.href = href;
                if(id)
                    e.id=id;
                e.media = 'all';
                _.each(attr,function(o,i){
                    e.setAttribute(i,o);
                });
            }
            head.insertBefore(e, front?ns._getBase():ns._getLast());
            e.disabled=true;
            e.disabled=false;
            return e;
        },
        remove:function(property,value){
            var head = this._getHead();
            if(value=this.get(property,value)){
                value.disabled=true;
                head.removeChild(value);
            }
        },
        replaceLink:function(href, property, oValue, nValue){
            var ns=this,
                head=ns._getHead(),
                attr={},e,v;
            attr[property]=nValue;
            e=ns.includeLink(href,null,false,attr);
            if(v=ns.get(property,oValue))
                head.replaceChild(e,v);
            e.disabled=true;
            e.disabled=false;
        },
        _build:function(selector, value, flag){
            var t='';
            _.each(value,function(o,i){
                t += i.replace(/([A-Z])/g,"-$1").toLowerCase() + ":" + o +";";
            });
            return flag?t:selector+"{" + t + "}";
        },
        //selector: single css exp without ','; not allow '.a, .b{}'
        //  for *** IE *** allow single css exp only
        setStyleRules:function(selector, value, force){
            var ns=this,
                add=true,
                ds=document.styleSheets,
                target, target2, selectorText, bak, h, e, t, _t;
            selector = _.str.trim(selector.replace(/\s+/g,' '));
            if(!(value&&force)){
                bak=selector.toLowerCase();
                _.arr.each(_.toArr(ds),function(o){
                    try{o[ns._r]}catch(e){return}
                    _.arr.each(_.toArr(o[ns._r]),function(v,i){
                        if(!v.selectorText)return;
                        if(v.disabled)return;
                        selectorText = ns._rep(v.selectorText);
                        /*Notice: in IE, no ',' in any selectorTExt*/
                        _t=selectorText.split(',');
                        //null=>remove
                        if(!value){
                            add=false;
                            if(_.arr.indexOf(_t,bak)!=-1 && _t.length>1){
                                _t=_.arr.removeFrom(_t,_.arr.indexOf(_t,bak)).join(',');
                                t=v.cssText.slice(v.cssText.indexOf("{")+1,v.cssText.lastIndexOf("}"));
                                if(o.insertRule)
                                    o.insertRule(_t+"{" + t + "}", o[ns._r].length);
                                else if(o.addRule )
                                    o.addRule(_t, t);
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }else if(selectorText == bak){
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }
                        //modify the last one
                        }else{
                            //for single css exp, (all single css exp in IE)
                            if(selectorText==bak){target=v;return false}
                            //for multi css exps, not in IE
                            if(_.arr.indexOf(_t,bak)!=-1){target2=v;return false}
                        }
                    },null,true);
                    if(target){
                        add=false;
                        try{
                            _.each(value,function(o,i){
                                i=i.replace(/(-[a-z])/gi, function(m,a){return a.charAt(1).toUpperCase()});
                                target.style[i]= typeof o=='function'?o(target.style[i]):o;
                            })
                        }catch(e){}
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    //not in IE
                    }else if(target2){
                        add=false;
                        o.insertRule(ns._build(selector,value), o[ns._r].length);
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    }
                },null,true);
            }
            //need to add
            if(force || add)
                ns._addRules(selector,value);
            return ns;
        },
        $getCSSValue:function(selector, cssKey){
            var ns=this,
                k=ns._r,
                ds=document.styleSheets,
                l=ds.length,m, o,v,i,j,
                selectorText;
            selector=_.str.trim(selector.replace(/\s+/g,' '));
            for(i=l-1; i>=0; i--){
                m=(o=ds[i][k]).length;
                for(j=m-1; j>=0; j--){
                    if((v=o[j]).selectorText && !v.disabled){
                        selectorText = ns._rep(v.selectorText);
                        if(_.arr.indexOf(selectorText.split(','),selector)!=-1)
                            return v.style[cssKey];
                    }
                }
            }
        },
        _addRules:function(selector,value){
            var ns=this,
                target=ns._getLast(),
                changed=target.sheet || target.styleSheet;
            if(changed.insertRule)
                changed.insertRule(ns._build(selector,value), changed[ns._r].length);
            else if(changed.addRule )
                changed.addRule(selector, ns._build(selector,value,true));
            target.disabled=true;
            target.disabled=false;
            return ns;
        },
        resetCSS:function(){
            var b=linb.browser,
            css="html{color:#000;background:#FFF;}"+
                "body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;}"+
                "table{border-collapse:collapse;border-spacing:0;}"+
                "fieldset,img{border:0;}"+
                "address,caption,cite,code,dfn,em,strong,th,ar{font-style:normal;font-weight:normal;}"+
                "li{list-style:none;}"+
                "caption,th{text-align:left;}"+
                "h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}"+
                "q:before,q:after{content:'';}"+
                "abbr,acronym{border:0;font-variant:normal;}"+
                "sup{vertical-align:text-top;}"+
                "sub{vertical-align:text-bottom;}"+
                "input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit;}"+
                "input,textarea,select{*font-size:100%;}"+
                "legend{color:#000;}"+
                "span{outline-offset:-1px;"+
                 (b.gek
                    ? parseFloat(b.ver)<3 
                        ? ((parseInt(b.ver)<3?"-moz-outline-offset:-1px !important;":"") + "display:-moz-inline-block;display:-moz-inline-box;display:inline-block;")
                        :"display:inline-block;"
                    : b.ie6
                        ?"display:inline-box;display:inline;"
                    :"display:inline-block;")+
                (b.ie?"zoom:1;":"")+
                "}";
            this.addStyleSheet(css,"linb.CSSreset");
        }
    },
    Initialize:function(){
        var b=linb.browser,
// cross browser reset 
            css=".linb-node{margin:0;padding:0;line-height:1.22em;}"+
            ".linb-wrapper{color:#000;font-family:arial,helvetica,clean,sans-serif;font-style:normal;font-weight:normal;font-size:12px;vertical-align:middle;}"+
            ".linb-node-table{border-collapse:collapse;border-spacing:0;empty-cells:show;font-size:inherit;"+(b.ie?"font:100%;":"")+"}"+
            ".linb-node-fieldset,.linb-node-img{border:0;}"+
            ".linb-node-ol,.linb-node-ul,.linb-node-li{list-style:none;}"+
            ".linb-node-caption,.linb-node-th{text-align:left;}"+
            ".linb-node-th{font-weight:normal;}"+
            ".linb-node-q:before,.linb-node-q:after{content:'';}"+
            ".linb-node-abbr,.linb-node-acronym{border:0;font-variant:normal;}"+
            ".linb-node-sup{vertical-align:text-top;}"+
            ".linb-node-sub{vertical-align:text-bottom;}"+
            ".linb-node-input,.linb-node-textarea,.linb-node-select{cursor:text;font-family:inherit;font-size:inherit;font-weight:inherit;"+(b.ie?"font-size:100%;":"")+"}"+
            ".linb-node-del,.linb-node-ins{text-decoration:none;}"+
            ".linb-node-pre,.linb-node-code,.linb-node-kbd,.linb-node-samp,.linb-node-tt{font-family:monospace;"+(b.ie?"font-size:108%;":"")+"line-height:100%;}"+
            ".linb-node-select,.linb-node-input,.linb-node-button,.linb-node-textarea{font:99% arial,helvetica,clean,sans-serif;border-width:1px;}"+
// base setting
            ".linb-node-a{cursor:pointer;color:#0000ee;text-decoration:none;}"+
            ".linb-node-a:hover{color:red}"+
            (b.gek? (".linb-node-a:focus{outline-offset:-1px;"+ (parseInt(b.ver)<3?"-moz-outline-offset:-1px !important":"") +"}" ):"")+
            ".linb-node-span, .linb-node-div{border:0;font-size:12px;}"+
            ".linb-node-span, .linb-wrapper span{outline-offset:-1px;"+
            (b.gek
                ? parseFloat(b.ver)<3 
                    ? ((parseInt(b.ver)<3?"-moz-outline-offset:-1px !important;":"") + "display:-moz-inline-block;display:-moz-inline-box;display:inline-block;")
                    :"display:inline-block;"
                : b.ie6
                    ?"display:inline-box;display:inline;"
                :"display:inline-block;")+
            (b.ie?"zoom:1;":"")+
            "}"+
            ".linb-node-h1,.linb-node-h2,.linb-node-h3,.linb-node-h4,.linb-node-h5,.linb-node-h6{font-size:100%;font-weight:normal;}"+
            ".linb-node-h1{font-size:138.5%;}"+
            ".linb-node-h2{font-size:123.1%;}"+
            ".linb-node-h3{font-size:108%;}"+
            ".linb-node-h1,.linb-node-h2,.linb-node-h3{margin:1em 0;}"+
            ".linb-node-h1,.linb-node-h2,.linb-node-h3,.linb-node-h4,.linb-node-h5,.linb-node-h6,.linb-node-strong{font-weight:bold;}"+
            ".linb-node-em{font-style:italic;}"+
            ".linb-node-legend{color:#000;}"+
            (b.ie6?("#"+linb.$localeDomId+"{vertical-align:baseline;}"):"");

        this.addStyleSheet(css, 'linb.CSS');
    }   
});