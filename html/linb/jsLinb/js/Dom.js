
Class('linb.DomProfile', 'linb.absProfile', {
    Constructor:function(domId){
        if(arguments.callee.upper)arguments.callee.upper.call(this);
        linb.$cache.profileMap[this.domId=domId]=this;
    },
    Instance:{
        __gc:function(){
            delete linb.$cache.profileMap[this.domId];
        },
        _getEV:function(funs, id, name){
            var t=linb.$cache.profileMap[id];
            if(t&&(t=t.events)&&(t=t[name]))
                for(var i=0,l=t.length;i<l;i++)
                    if(typeof t[t[i]]=='function')
                        funs[funs.length]=t[t[i]];
        }
    },
    Static:{
        get:function(id){
            return linb.$cache.profileMap[id];
        },
        $abstract:true
    }
});

/*linb.Dom
*/
Class('linb.Dom','linb.absBox',{
    Instance:{
        get:function(index){
            var purge=linb.$cache.domPurgeData,t=this._nodes,s;
            if(_.isNumb(index))
                return (s=t[index]) && (s=purge[s]) && s.element;
            else{
                var a=[],l=t.length;
                for(var i=0;i<l;i++)
                    a[a.length] = (s=purge[t[i]]) && s.element;
                return a;
            }
        },
        each:function(fun){
            var ns=this,purge=linb.$cache.domPurgeData,n;
            for(var i=0,j=ns._nodes,l=j.length;i<l;i++)
                if((n=purge[j[i]]) && (n=n.element))
                    if(false===fun.call(ns,n,i))
                        break;
            n=null;
            return ns;
        },

        serialize:function(){
            var a=[];
            this.each(function(o){
                a[a.length]=o.id;
            });
            return "linb(['"+a.join("','")+"'])";
        },
        linbid:function(){
            return linb.getId(this.get(0));
        },
        //Need to consider the cache in linb.$cache.profileMap
        id:function(value, ignoreCache){
            var t,i,cache=linb.$cache.profileMap;
            if(typeof value == 'string')
                return this.each(function(o){
                    if((i=o.id)!==value){
                        if(!ignoreCache&&(t=cache[i])){
                            cache[value] = t;
                            delete cache[i];
                        }
                        o.id=value;
                    }
                });
            else
                return this.get(0).id;
        },

        /*dom collection
        fun: fun to run
        args: arguments for fun
        */
        $sum:function(fun, args){
            var arr=[],r,i;
            this.each(function(o){
                r=fun.apply(o, args||[]);
                if(r){
                    if(_.isArr(r))
                        for(i=0;o=r[i];i++)
                            arr[arr.length]=o;
                    else
                        arr[arr.length]=r;
                }
            });
            return linb(arr);
        },
        /*get all dir children
        */
        children:function(){
            return this.$sum(function(){
                return _.toArr(this.childNodes)
            });
        },
        /* clone
         deep for clone all children
        */
        clone:function(deep){
            return this.$sum(function(){
                var n = this.cloneNode(deep?true:false),
                    children=n.getElementsByTagName('*'),
                    ie=linb.browser.ie,
                    i=0,o;
                if(ie) n.removeAttribute('$linbid');
                else delete n.$linbid;
                for(;o=children[i];i++){
                    if(ie) o.removeAttribute('$linbid');
                    else delete o.$linbid;
                }
                return n;
            },arguments);
        },
        /* iterator
        // type: left : x-axis,  top :y-axis, xy: x-axis and y-axis
        // dir : true => left to right; top to buttom, false => right to left ; bottom to top
        // inn: does start consider children
         fun : number or function => number is iterator index; function is "return true ->stop"
        */
        $iterator:function(type, dir, inn, fun, top){
            return this.$sum(function(type, dir, inn, fun, top){
                var self=arguments.callee;
                if(typeof fun != 'function'){
                    var count=fun||0;
                    fun = function(n,index){return index==count;}
                }
                var index=0,m,n=this,flag=0,t;
                while(n){
                    if(n.nodeType==1)
                        if(fun(n, index++)===true)break;

                    //x-axis true: right ;false: left
                    if(type=='x')
                        n= dir?n.nextSibling:n.previousSibling;
                    //y-axis true: down ;false: up
                    else if(type=='y')
                        n= dir ? self.call(dir===1?n.lastChild:n.firstChild, 'x',(dir!==1), true, 0, top) : n.parentNode;
                    else{
                        inn=_.isBool(inn)?inn:true;
                        m=null;
                        n= dir ?
                                 (t = inn && n.firstChild ) ? t
                                              : (t = n.nextSibling ) ? t
                                                              :(m=n.parentNode)
                               : (t = inn && n.lastChild) ? t
                                              : (t = n.previousSibling ) ? t
                                                              :(m=n.parentNode);
                        if(m){
                            while(!( m = dir ? n.nextSibling: n.previousSibling)){
                                n=n.parentNode;
                                //to the top node
                                if(!n)
                                    if(flag)
                                        return null;
                                    else{
                                        flag=true;
                                        m = dir ? document.body.firstChild : document.body.lastChild;
                                        break;
                                    }
                            }
                            n=m;
                        }
                        inn=true;
                    }
                }
                return n;
            },arguments);
        },
        /*
        query('div');
        query('div','id');
        query('div','id','a');
        query('div','id',/^a/);
        query('div',function(){return true});
        */
        query:function(tagName, property, expr){
            tagName = tagName||'*';
            var f='getElementsByTagName',
                me=arguments.callee, f1=me.f1||(me.f1=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(expr.test(this[attr]))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(expr.test(o[attr]))
                        arr[arr.length]=o;
                return arr;
            }),f2=me.f2||(me.f2=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr]==expr)
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr]==expr)
                        arr[arr.length]=o;
                return arr;
            }),f3=me.f3||(me.f3=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr])
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr])
                        arr[arr.length]=o;
                return arr;
            }),f4=me.f4||(me.f4=function(tag){
                return _.toArr(this[f](tag));
            }),f5=me.f5||(me.f5=function(tag, attr){
                var all = this[f](tag), arr=[];
                if(attr(this))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(attr(o))
                        arr[arr.length]=o;
                return arr;
            });
            return this.$sum(property?typeof property=='function'?f5:expr?expr.constructor == RegExp?f1:f2:f3:f4, [tagName, property, expr]);
        },

        /*
        dom add implementation
        for addPrev prepend addNext append
        */
        $add:function(fun,target,reversed){
            if(_.isHash(target) || _.isStr(target))
                target=linb.create(target);
            if(reversed){
                reversed=linb(target);
                target=this;
            }else{
                target=linb(target);
                reversed=this;
            }
            if(target._nodes.length){
                var one=reversed.get(0),
                    ns=target.get(),
                    dom=linb.Dom,
                    cache=linb.$cache.profileMap,
                    fragment,uiObj,p,i,o,j,v,uiObj,arr=[];
                target.each(function(o){
                    uiObj=(p=o.id)&&(p=cache[p])&&p.LayoutTrigger&&dom.getStyle(one,'display')!='none'&&p.LayoutTrigger;
                    if(uiObj)arr.push([uiObj,p]);
                });
                if(ns.length==1)
                    fragment=ns[0];
                else{
                    fragment=document.createDocumentFragment();
                    for(i=0;o=ns[i];i++)
                        fragment.appendChild(o);
                }
                fun.call(one,fragment);
                for(i=0;o=arr[i];i++){
                    for(j=0;v=o[0][j];j++)
                        v.call(o[1]);
                    if(o[1].onLayout)
                        o[1].boxing().onLayout(o[1]);
                }
                arr.length=0;

                one=o=fragment=null;
            }

            return this;
        },
        prepend:function(target,reversed){
            return this.$add(function(node){
                if(this.previousSibling!=node){
                    if(this.firstChild) this.insertBefore(node, this.firstChild);
                    else this.appendChild(node);
                }
            },target,reversed);
        },
        append:function(target,reversed){
            return this.$add(function(node){
                if(this.lastChild!=node){
                    this.appendChild(node);
                }
            },target,reversed);
        },
        addPrev:function(target,reversed){
            return this.$add(function(node){
                if(this.firstChild!=node)
                    this.parentNode.insertBefore(node,this);
            },target,reversed);
        },
        addNext:function(target,reversed){
            return this.$add(function(node){
                if(this.nextSibling!=node){
                    if(this.nextSibling) this.parentNode.insertBefore(node,this.nextSibling);
                    else this.parentNode.appendChild(node);
                }
            },target,reversed);
        },

        //flag: false => no remove this from momery(IE)
        replace:function(target, triggerGC){
            if(_.isHash(target) || _.isStr(target))
                target=linb.create(target);
            target=linb(target);
            var v,i,c=this.get(0),ns=target.get(),l=ns.length;
            if(l>0 && (v=ns[l-1])){
                c.parentNode.replaceChild(v,c);
                for(i=0;i<l-1;i++)
                    v.parentNode.insertBefore(ns[i],v);
                //for memory __gc
                if(triggerGC)
                    this.remove();
            }
            c=v=null;
            return target;
        },
        swap:function(target){
            var self=this,t = linb.Dom.getEmptyDiv().html('*',false);

            if(_.isHash(target) || _.isStr(target))
                target=linb.create(target);
            target=linb(target);

            self.replace(t,false);
            target.replace(self,false);
            t.replace(target,false);

            t.get(0).innerHTML='';
            document.body.insertBefore(t.get(0), document.body.firstChild);
            return self;
        },
        //flag : false => remove from dom tree, not free memory
        remove:function(triggerGC){
            var c=linb.$getGhostDiv();
            if(triggerGC===false)
                this.each(function(o,i){
                    if(o.parentNode)o.parentNode.removeChild(o);
                });
            else{
                this.each(function(o){
                    c.appendChild(o);
                });
                linb.$purgeChildren(c);
                c.innerHTML='';
                c=null;
            }
            return this;
        },
        //set innerHTML empty
        //flag = false: no gc
        empty:function(triggerGC){
            return this.each(function(o){
                linb([o]).html('',triggerGC);
            });
        },

        //flag = false: no gc
        html:function(content,triggerGC,loadScripts){
            var s='',t,o=this.get(0);triggerGC=triggerGC!==false;
            if(content!==undefined){
                if(o){
                    if(o.nodeType==3)
                        o.nodeValue=content;
                    else{
                         if(!o.firstChild && content==="")return this;
                         // innerHTML='' in IE, will clear it's childNodes innerHTML
                         // only asy purgeChildren need this line
                         // if(!triggerGC && linb.browser.ie)while(t=o.firstChild)o.removeChild(t);
                         //clear first
                         if(triggerGC)
                            linb.$purgeChildren(o);
                            
                         if(loadScripts){
                                var reg1=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
                                reg2=/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
                                reg3 = /\ssrc=([\'\"])(.*?)\1/i,
                                matched, attr,src;
                            while((matched = reg1.exec(content))){
                                attr = matched[1];
                                src = attr ? attr.match(reg3) : false;
                                if(src && src[2]){
                                   linb.include(null,src[2]);
                                }else if(matched[2] && matched[2].length > 0){
                                    _.exec(matched[2]);
                                }
                            }
                            content=content.replace(reg2, '');
                         }
                        
                         o.innerHTML=content;
                        //if(triggerGC)
                        //    linb.UI.$addEventsHanlder(o);

                    }
                    o=null;
                }
                return this;
            }else{
                if(o){
                    s = (o.nodeType==3)?o.nodeValue:o.innerHTML;
                    o=null;
                }
                return s;
            }
        },
        loadHtml:function(options, onStart, onEnd){
            var ns=this;
            if(typeof options=='string')options={url:options};
            _.tryF(onStart);
            linb.Ajax(options.url, options.query, function(rsp){
                var n=linb.create("div");
                n.html(rsp,false,true);
                ns.append(n.children());
                _.tryF(onEnd);
            }, function(err){
                ns.append("<div>"+err+"</div>");
                _.tryF(onEnd);
            }, null, options.options).start();
        },
        loadIframe:function(options){
            if(typeof options=='string')options={url:options};
            var id="aiframe_"+_(),
                e=linb.browser.ie && parseInt(linb.browser.ver)<9,
                ifr=document.createElement(e?"<iframe name='"+id+"'>":"iframe");
            ifr.id=ifr.name=id;
            ifr.src=options.url;
            ifr.frameBorder='0';
            ifr.marginWidth='0';
            ifr.marginHeight='0';
            ifr.vspace='0';
            ifr.hspace='0';
            ifr.allowTransparency='true';
            ifr.width='100%';
            ifr.height='100%';
            this.append(ifr);
            linb.Dom.submit(options.url, options.query, options.method, ifr.name, options.enctype);
        },
        outerHTML:function(content, triggerGC){
            var self=this, t,s='', o=self.get(0),id=o.id;
            if(content!==undefined){
                var n=self.replace(_.str.toDom(content),false);
                self._nodes[0]=n._nodes[0];

                //avoid inner nodes memory leak
                linb([o]).remove(triggerGC);
                return self;
            }else{
                if(linb.browser.gek){
                    var m = linb.$getGhostDiv();
                    m.appendChild(self.get(0).cloneNode(true));
                    s=m.innerHTML;
                    m.innerHTML="";
                    m=null;
                }else{
                    s= o.outerHTML;
                }
                o=null;
                return s;
            }
        },
        text:function(content){
            if(content!==undefined){
                var self=this, arr=[];
                self.each(function(o){
                    var t=o.firstChild;
                     if(t&&t.nodeType!=1)
                        t.nodeValue = content;
                     else
                        arr[arr.length]=o;
                });
                if(arr.length){
                    linb(arr).empty().each(function(o){
                        o.appendChild(document.createTextNode(content));
                    })
                }
                return self;
            }else{
               return (function(o){
                  var i,a=o.childNodes,l=a.length,content='',me=arguments.callee;
                  for(i=0;i<l;i++)
                    if(a[i].nodeType!= 8)
                      content += (a[i].nodeType!=1) ? a[i].nodeValue : me(a[i]);
                  return content;
                })(this.get(0));
            }
        },
        /*
        .attr(name)=>get attr
        .attr(name,value)=>set attr
        .attr(name,null)=>remove attr
        */
        attr:function(name, value){
            //set one time only
            var self=this,
                me = arguments.callee,
                map1 = me.map1 || (me.map1 = {
                    'class':'className',
                    readonly: "readOnly",
                    tabindex: "tabIndex",
                    'for':'htmlFor',
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    rowspan: "rowSpan",
                    value:'value'
                }),
                map2 = me.map2||(me.map2={
                    href:1,src:1,style:1
                });

            if(typeof name=='object'){
                for(var i in name)
                    me.call(self,i,name[i]);
                return self;
            }

            var iestyle = linb.browser.ie && name=='style',
                normal=!map2[name=map1[name]||name];
            if(value!==undefined){
                return self.each(function(o){
                    //remove attr
                    if(value===null){
                        if(iestyle)o.style.cssText='';
                        else if(normal){
                            try{
                                o[name]=null;
                                if(o.nodeType==1)o.removeAttribute(name)
                            }catch(e){}
                        }
                    //set attr
                    }else{
                        if(iestyle)o.style.cssText=''+value;
                        else if(normal){
                             o[name]=value;
                             if(o.nodeType==1 && name!="value" && typeof value=='string')o.setAttribute(name, value);
                        }else
                            o.setAttribute(name, value);
                    }
                 });
            //get attr
            }else{
                var r,o=self.get(0);
                if(iestyle) return o.style.cssText;
                if(name=="selected"&&linb.browser.kde) o.parentNode.selectedIndex;
                r=((name in o) && normal)?o[name]:o.getAttribute(name, linb.browser.ie && !normal ? 2 : undefined );
                o=null;
                return r;
            }
        },
        /*
        name format: 'xxxYxx', not 'xxx-yyy'
        left/top/width/height like, must specify 'px'
        Does't fire onResize onMove event
        */
        css:function(name, value){
            return (typeof name=='object' || value!==undefined)
                ?
                this.each(function(o){
                    linb.Dom.setStyle(o,name,value)
                })
                :
                linb.Dom.getStyle(this.get(0), name)
        },
        /*
        *IE/opera \r\n will take 2 chars
        *in IE: '/r/n'.lenght is 2, but range.moveEnd/moveStart will take '/r/n' as 1.
        */
        caret:function(begin,end){
            var input =this.get(0), tn=input.tagName.toLowerCase(), type=typeof begin,ie=linb.browser.ie, pos;
            if(!/^(input|textarea)$/i.test(tn))return;
            if(tn=="input" && input.type.toLowerCase()!='text'&& input.type.toLowerCase()!='password')return;
            input.focus();
            //set caret
            if(type=='number'){

                if(ie){
                    var r = input.createTextRange();
                    r.collapse(true);
                    r.moveEnd('character', end);
                    r.moveStart('character', begin);
                    r.select();
                }else
                    input.setSelectionRange(begin, end);
                return this;
            //replace text
            }else if(type=='string'){
                    var r=this.caret(),l=0,m=0,ret,
                        v=input.value,
                        reg1=/\r/g;
                    //for IE, minus \r
                    if(ie){
                        l=v.substr(0,r[0]).match(reg1);
                        l=(l && l.length) || 0;
                        m=begin.match(reg1);
                        m=(m && m.length) || 0;
                    }
                    //opera will add \r to \n, automatically
                    if(linb.browser.opr){
                        l=begin.match(/\n/g);
                        l=(l && l.length) || 0;
                        m=begin.match(/\r\n/g);
                        m=(m && m.length) || 0;
                        m=l-m;l=0;
                    }
                    input.value=v.substr(0,r[0])+begin+v.substr(r[1],v.length);
                    ret= r[0] - l + m + begin.length;
                    this.caret(ret,ret);
                    return ret;
            //get caret
            }else{
                if(ie){
                    var r=document.selection.createRange(),
                        txt=r.text,
                        l=txt.length,
                        e,m;
                    if(tn.toLowerCase()=='input'){
                        r.moveStart('character', -input.value.length);
                        e=r.text.length;
                        return [e-l,e];
                    }else{
                    	var rb=r.duplicate();
                    	rb.moveToElementText(input);
                    	rb.setEndPoint('EndToEnd',r);
                    	e=rb.text.length;
                    	return [e-l, e];
                    }
                //firefox opera safari
                }else
                    return [input.selectionStart, input.selectionEnd];
            }
        },
        //left,top format: "23px"
        show:function(left,top){
            var style,t,auto='auto',v=linb.Dom.HIDE_VALUE,vv;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;
                vv=linb.getNodeData(o);
                if( t = (top || (style.top==v && (vv._top || auto))))style.top = t;
                if( t = (left || (style.left==v && (vv._left || auto))))style.left = t;
                if(t=vv._position)if(style.position!=t)style.position=t;
                vv._linbhide=0;

                if(style.visibility!='visible')style.visibility='visible';
                //ie6 bug
              /*  if(linb.browser.ie6){
                    t=style.wordWrap=='normal';
                    _.asyRun(function(){
                        style.wordWrap=t?'break-word':'normal'
                    })
                }*/
            });
        },
        hide:function(){
            var style,t,vv;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;t=linb([o]);
                vv=linb.getNodeData(o);
                if(vv._linbhide!==1){
                    vv._position = style.position;
                    vv._top = style.top;
                    vv._left = style.left;
                    vv._linbhide=1;
                }
                if(style.position!='absolute')style.position = 'absolute';
                style.top = style.left = linb.Dom.HIDE_VALUE;
            });
        },
        cssRegion:function(region,triggerEvent) {
            var self=this;
            if(typeof region=='object'){
                var i,t,m,  node=self.get(0), dom=linb.Dom, f=dom._setPxStyle,m={};
                for(var j=0,c=dom._boxArr;i=c[j++];)
                    m[i] = ((i in region) && region[i]!==null)?f(node,i,region[i]):false;
                if(triggerEvent){
                    var f=dom.$hasEventHandler;
                    if(f(node,'onsize') && (m.width||m.height))self.onSize(true, {width:m.width,height:m.height});
                    if(f(node,'onmove') && (m.left||m.top))self.onMove(true, {left:m.left,top:m.top});
                }
                return self;
            }else{
                var offset=region,parent=triggerEvent,
                    pos = offset?self.offset(null,parent):self.cssPos(),
                    size = self.cssSize();
                return {
                    left:pos.left,
                    top:pos.top,
                    width:size.width,
                    height:size.height
                };
            }
        },
        //for quick size
        cssSize:function(size,triggerEvent) {
            var self=this, node=self.get(0),r,dom=linb.Dom,f=dom._setPxStyle,b1,b2;
           if(size){
                var t;
                b1 = size.width!==null?f(node,'width',size.width):false;
                b2 = size.height!==null?f(node,'height',size.height):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onsize'))self.onSize(true, {width:b1,height:b2});
                r=self;
            }else
                r={ width :self._W(node,1)||0,  height :self._H(node,1)};
            return r;
        },
        //for quick move
        cssPos:function(pos, triggerEvent){
            var node=this.get(0),dom=linb.Dom,f=dom._setPxStyle,b1,b2,r;
            if(pos){
                var t;
                b1 = pos.left!=null?f(node,'left',pos.left):false;
                b2 = pos.top!==null?f(node,'top',pos.top):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onmove'))this.onMove(true, {left:b1,top:b2});
                r=this;
            }else{
                f=dom.getStyle;
                r={left :parseInt(f(node, 'left'))||0,  top :parseInt(f(node, 'top'))||0};
            }
            node=null;
            return r;
        },
/*
+--------------------------+
|margin                    |
| #----------------------+ |
| |border                | |
| | +------------------+ | |
| | |padding           | | |
| | | +--------------+ | | |
| | | |   content    | | | |

# is the offset position in jsLinb
*/
        offset:function (pos,boundary){
            var r,t,
            browser = linb.browser,
            ns=this,
            node = ns.get(0),
            keepNode=node,
            parent =node.parentNode,
            op=node.offsetParent,
            doc=node.ownerDocument,
            dd=doc.documentElement,
            db=doc.body,
            _d=/^inline|table.*$/i,
            getStyle=linb.Dom.getStyle,
            fixed = getStyle(node, "position") == "fixed",

            me=arguments.callee,
            add= me.add || (me.add=function(pos, l, t){
                pos.left += parseInt(l,10)||0;
                pos.top += parseInt(t,10)||0;
            }),
            border=me.border || ( me.border = function(node, pos){
                add(pos, getStyle(node,'borderLeftWidth'), getStyle(node,'borderTopWidth'));
            }),
            TTAG=me.TTAG||(me.TTAG={TABLE:1,TD:1,TH:1}),
            HTAG = me.HTAG ||(me.HTAG={BODY:1,HTML:1}),
            posDiff=me.posDiff ||(me.posDiff=function(o,target){
                var cssPos = o.cssPos(),absPos = o.offset(null,target);
                return {left :absPos.left-cssPos.left, top :absPos.top-cssPos.top};
            });

            boundary=boundary?linb(boundary).get(0):doc;

            if(pos){
                //all null, return dir
                if(pos.left===null&&pos.top===null)return ns;
                var d = posDiff(ns,boundary);
                ns.cssPos({left :pos.left===null?null:(pos.left - d.left),  top :pos.top===null?null:(pos.top - d.top)});
                r=ns;
            }else{
                //for IE, firefox3(except document.body)
                if(!(linb.browser.gek && node===document.body) && node.getBoundingClientRect){
                    t = node.getBoundingClientRect();
                    pos = {left :t.left, top :t.top};
                    if(boundary.nodeType==1 && boundary!==document.body)
                        add(pos, -(t=boundary.getBoundingClientRect()).left+boundary.scrollLeft, -t.top+boundary.scrollTop);
                    else
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft)-dd.clientLeft, Math.max(dd.scrollTop,  db.scrollTop)-dd.clientTop);
                }else{
                    pos = {left :0, top :0};
                    add(pos, node.offsetLeft, node.offsetTop );
                    //get offset, stop by boundary or boundary.offsetParent
                    while(op && op!=boundary && op!=boundary.offsetParent){
                        add(pos, op.offsetLeft, op.offsetTop);
                        if(browser.kde || (browser.gek && !TTAG[op.tagName]))
                            border(op, pos);
                        if ( !fixed && getStyle(op,"position")== "fixed")
                            fixed = true;
                        if(op.tagName!='BODY')
                            keepNode=op.tagName=='BODY'?keepNode:op;
                        op = op.offsetParent;
                    }

                    //get scroll offset, stop by boundary
                    while (parent && parent.tagName && parent!=boundary && !HTAG[parent.tagName]){
                        if(!_d.test(getStyle(parent, "display")) )
                            add(pos, -parent.scrollLeft, -parent.scrollTop );
                        if(browser.gek && getStyle(parent,"overflow")!= "visible" )
                            border(parent,pos);
                        parent = parent.parentNode;
                    }
                    if((browser.gek && getStyle(keepNode,"position")!="absolute"))
                        add(pos, -db.offsetLeft, -db.offsetTop);
                    if(fixed)
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft), Math.max(dd.scrollTop,  db.scrollTop));
                }
                r=pos;
            }
            return r;
        },

//class and src
        hasClass:function(name){
            var arr = this.get(0).className.split(/\s+/);
            return _.arr.indexOf(arr,name)!=-1;
        },
        addClass:function(name){
            var arr, t, me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = (t=o.className).split(reg);
                if(_.arr.indexOf(arr,name)==-1)
                    o.className = t + " " +name;
            });
        },
        removeClass:function(name){
            var arr, i,l,a, t, bs=typeof name=='string', me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = o.className.split(reg);
                l=arr.length;
                a=[];
                for(i=0;t=arr[i];i++)
                    if(bs?(t!=name):(!name.test(String(t))))
                        a[a.length]=t;
                if(l!=a.length)o.className=a.join(' ');
            });
        },
        replaceClass:function(regexp,replace){
            var n,r;
            return this.each(function(o){
                r = (n=o.className).replace(regexp, replace);
                if(n!=r)o.className=r;
            });
        },
        tagClass:function(tag, isAdd){
            var self=this,
                me=arguments.callee,
                r1=me["_r1_"+tag]||(me["_r1_"+tag]=new RegExp("([-\\w]+" + tag + "[-\\w]*)")),
                r2=me["_r2"]||(me["_r2"]=/([-\w]+)/g);
            self.removeClass(r1);
            return (false===isAdd)? self : self.replaceClass(r2, '$1 $1' + tag);
        },
//events:
        /*
        $addEvent('onClick',fun,'idforthisclick';)
        $addEvent([['onClick',fun,'idforthisclick'],[...]...])

        do:
            add onclick to dom
            append fun to linb.$cache.profileMap.id.events.onClick array
            append 'onclick' to linb.$cache.profileMap.id.add array
        */

        $addEventHandler:function(name){
            var event=linb.Event,
                type,
                handler=event.$eventhandler;
            return this.each(function(o){
                if(o.nodeType==3)return;
                //set to purge map
                linb.setNodeData(o, ['eHandlers', 'on'+event._eventMap[name]], handler);

                //set to dom node
                if(type=event._eventHandler[name]){
                    o[type]=handler;
                    linb.setNodeData(o, ['eHandlers', type], handler);
                }
            });
        },
        /*
        'mousedown' -> 'dragbegin'
        'mouseover' -> 'dragenter'
        'mouseout' -> 'dragleave'
        'mouseup' -> 'drop'
        */
        $removeEventHandler:function(name){
            var event=linb.Event,
                type;
            return this.each(function(o){
                //remove from dom node
                if(type=event._eventHandler[name])
                    o[type]=null;

                //remove from purge map
                if(o=linb.getNodeData(o,'eHandlers'))
                    delete o['on'+event._eventMap[name]];
            });
        },
        $addEvent:function(name, fun, label, index){
            var self=this,
                event=linb.Event,
                arv=_.arr.removeValue,
                ari=_.arr.insertAny,
                id,c,t,m;

            if(!index && index!==0)index=-1;

            if(typeof label=='string')
                label="$"+label;
            else label=undefined;

            self.$addEventHandler(name).each(function(o){
                if(o.nodeType==3)return;

                if(!(id=event.getId(o)))
                    id=o.id=linb.Dom._pickDomId();

                if(!(c=linb.$cache.profileMap[id]))
                    c=new linb.DomProfile(id);

                t = c.events || (c.events = {});
                m = t[name] || (t[name]=[]);

                //if no label input, clear all, and add a single
                if(label===undefined){
                    m.length=0;
                    m=t[name]=[];
                    index=-1;
                    label='_';
                }
                m[label]=fun;
                arv(m,label);
                if(index==-1)m[m.length]=label;
                else
                    ari(m,label, index);

                if(linb.Event && (c=linb.Event._getProfile(id)) && c.clearCache)
                    c.clearCache();
            });

            return self;
        },
        /*
        $removeEvent('onClick','idforthisclick')
        $removeEvent('onClick')
            will remove all onClick in linb.$cache.profileMap.id.events.
        $removeEvent('onClick',null,true)
            will remove all onClick/beforeClick/afterClick in linb.$cache.profileMap.id.events.
        */
        $removeEvent:function(name, label, bAll){
            var self=this,c,t,k,id,i,type,
                event=linb.Event,
                dom=linb.$cache.profileMap,
                type=event._eventMap[name];

            self.each(function(o){
                if(!(id=event.getId(o)))return;
                if(!(c=dom[id]))return;
                if(!(t=c.events))return;
                if(bAll)
                    _.arr.each(event._getEventName(type),function(o){
                        delete t[o];
                    });
                else{
                    if(typeof label == 'string'){
                        label='$'+label;
                        if(k=t[name]){
                            if(_.arr.indexOf(k,label)!=-1)
                                _.arr.removeValue(k,label);
                            delete k[label];
                        }
                    }else
                        delete t[name];
                }

                if(linb.Event && (c=linb.Event._getProfile(id)) && c.clearCache)
                    c.clearCache();
            });

            return self;
        },
        $getEvent:function(name, label){
            var id;
            if(!(id=linb.Event.getId(this.get(0))))return;

            if(label)
                return _.get(linb.$cache.profileMap,[id,'events',name,'$' + label]);
            else{
                var r=[],arr = _.get(linb.$cache.profileMap,[id,'events',name]);
                _.arr.each(arr,function(o,i){
                    r[r.length]={o:arr[o]};
                });
                return r;
            }
        },
        $clearEvent:function(){
            return this.each(function(o){
                if(!(o=linb.Event.getId(o)))return;
                if(!(o=linb.$cache.profileMap[o]))return;
                _.breakO(o.events,2);
                delete o.events;

                _.arr.each(linb.Event._events,function(s){
                   o["on"+s]=null;
                });
            });
        },
        $fireEvent:function(name, args){
            var type=linb.Event._eventMap[name],
            t,s='on'+type,
            handler,
            hash,
            me=arguments.callee,
            f=linb.Event.$eventhandler,
            f1=me.f1||(me.f1=function(){this.returnValue=false}),
            f2=me.f2||(me.f2=function(){this.cancelBubble=true});
            return this.each(function(o){
                if(!(handler=linb.getNodeData(o,['eHandlers', s])))return;
                if('blur'==type || 'focus'==type){
                    try{o[type]()}catch(e){}
                }else{
	                  hash=_.copy(args);
	                  _.merge(hash,{
	                    type: type,
	                    target: o,
	                    button : 1,
	                    $e:true,
	                    $name:name,
	                    preventDefault:f1,
	                    stopPropagation:f2
	                  },'all');                	
                    handler.call(o,hash);
                }
            });
        },

//functions
        $canFocus:function(){
            var me=arguments.callee, getStyle=linb.Dom.getStyle, map = me.map || (me.map={a:1,input:1,select:1,textarea:1,button:1,object:1}),t,node;
            return !!(
                (node = this.get(0)) &&
                node.focus &&
                //IE bug: It can't be focused with 'default tabIndex 0'; but if you set it to 0, it can be focused.
                //So, for cross browser, don't set tabIndex to 0
                (((t=map[node.tagName.toLowerCase()]) && !(parseInt(node.tabIndex)<=-1)) || (!t && parseInt(node.tabIndex)>=(linb.browser.ie?1:0))) &&
                getStyle(node,'display')!='none' &&
                getStyle(node,'visibility')!='hidden' &&
                node.offsetWidth>0 &&
                node.offsetHeight>0
            );
        },
        focus:function(force){
            var ns=this;
            if(force || ns.$canFocus())
                try{ns.get(0).focus()}catch(e){}
            return ns;
        },
        setSelectable:function(value){
            var me=arguments.callee,cls;
            this.removeClass("linb-ui-selectable").removeClass("linb-ui-unselectable");
            this.addClass(value?"linb-ui-selectable":"linb-ui-unselectable");
            return this.each(function(o){
                if(linb.browser.ie)
                    o._onlinbsel=value?"true":"false";
            })
        },
        setInlineBlock:function(){
            var ns=this;
            if(linb.browser.gek){
                if(parseFloat(linb.browser.ver)<3)
                    ns.css('display','-moz-inline-block').css('display','-moz-inline-box').css('display','inline-block');
                else
                    ns.css('display','inline-block');
            }else if(linb.browser.ie6)
                ns.css('display','inline-block').css({display:'inline',zoom:'1'});
            else
                ns.css('display','inline-block');
            return ns;
        },
        topZindex:function(flag){
            //set the minimum to 1000
            var i=1000, j=0, k, node = this.get(0), p = node.offsetParent, t, o;
            if(linb.browser.ie && (p.tagName+"").toUpperCase()=="HTML"){
                p=linb("body").get(0);
            }
            if(node.nodeType !=1 || !p)return 1;

            t=p.childNodes;
            for(k=0;o=t[k];k++){
                if(o==node || o.nodeType !=1 || !o.$linbid || o.style.display=='none' || o.style.visibility=='hidden' ||  linb.getNodeData(o,'zIndexIgnore') )continue;
                j = parseInt(o.style && o.style.zIndex) || 0 ;
                i=i>j?i:j;
            }
            i++;
            if(i>=linb.Dom.TOP_ZINDEX)
                linb.Dom.TOP_ZINDEX =i+1000;

            if(flag)
                 node.style.zIndex = i;
            else{
                j = parseInt(node.style.zIndex) || 0;
                return i>j?i:j;
            }
            return this;
        },
        /*
        dir:true for next, false for prev
        inn:true for include the inner node
        set:true for give focus
        */
        nextFocus:function(downwards, includeChild, setFocus){
            downwards=_.isBool(downwards)?downwards:true;
            var self=this.get(0),node = this.$iterator('',downwards,includeChild,function(node){return node!==self && linb([node]).$canFocus()});
            if(!node.isEmpty() && setFocus!==false)node.focus();
            self=null;
            return node;
        },

        /*
        args:{
            with:[0,100],
            height:[0,100],
            left:[0,100]
            top:[0,100]
            opacity:[0,1],
            backgroundColor:['#ffffff','#000000']
            scrollTop:[0,100]
            scrollLeft:[0,100]
            fontSize:[12,18]
        }
        */
        animate: function(args, onStart, onEnd, time, step, type, threadid, unit){
            var me=arguments.callee,
            hash = me.lib ||  (me.lib = {
                linear:function(x,s){return x/s},
                expoIn:function(x,s){return (x/s==0)?0:Math.pow(2,10*(x/s-1))},
                expoOut:function(x,s){return (x/s==1)?1:-Math.pow(2,-10*x/s)+1},
                expoInOut:function(x,s){
                    if(x==0)return 0;
			        else if(x==s)return 1;
			        else if((x/=s/2) < 1) return 1/2 * Math.pow(2, 10 * (x - 1));
			        return 1/2 * (-Math.pow(2, -10 * --x) + 2);
			    },
                sineIn:function(x,s){return -1*Math.cos(x/s*(Math.PI/2))+1},
                sineOut:function(x,s){return Math.sin(x/s*(Math.PI/2))},
                sineInOut:function(x,s){return -1/2*(Math.cos(Math.PI*x/s)-1)},
                backIn:function(x,s){
        			var n=1.70158;
        			return (x/=s)*x*((n+1)*x - n);
        		},
        		backOut:function(x,s){
        			var n=1.70158;
        			return ((x=x/s-1)*x*((n+1)*x + n) + 1);
        		},
        		backInOut:function(x,s){
        			var n=1.70158;
        			if ((x/=s/2) < 1) return 1/2*(x*x*(((n*=(1.525))+1)*x - n));
        			return 1/2*((x-=2)*x*(((n*=(1.525))+1)*x + n) + 2);
        		},
        		bounceOut:function(x,s){
        			if((x/=s) < (1/2.75))return 7.5625*x*x;
        			else if(x < (2/2.75))return 7.5625*(x-=(1.5/2.75))*x + .75;
        			else if(x < (2.5/2.75))return 7.5625*(x-=(2.25/2.75))*x + .9375;
        			else return 7.5625*(x-=(2.625/2.75))*x + .984375;
			    }
            }),
            color = me.color || (me.color = function(type, args, step, j){
                var f,fun,value = 0 + (100-0)*hash[type](j,step), from = args[0], to = args[1];

                if(typeof from !='string' || typeof to != 'string')return '#fff';
                if(value<0)
                    return from;
                else if(value>100)
                    return to;

                f=function(str){
                    return (str.charAt(0)!='#')?('#'+str):str;
                };
                from=f(from);to=f(to);

                f=function(str, i, j){
                    return parseInt(str.slice(i,j),16)||0;
                };
                fun=function(o){
                    return {red:f(o,1,3),green:f(o,3,5),blue:f(o,5,7)}
                };
                from = fun(from);to = fun(to);

                f=function(from, to, value,c){
                    var r= from[c]+Math.round((value/100)*(to[c]-from[c]));
                    return (r < 16 ? '0' : '') + r.toString(16)
                };
                return '#' + f(from,to, value, 'red') + f(from,to, value, 'green') + f(from,to, value, 'blue');
            });

            time = time||100;
            step = step||5;
            type = hash[type]!==undefined?type:'expoIn';

            var self=this, count=0,
                funs=[function(threadid){
                    //try{
                       // if(++count > step)throw new Error;
                        if(++count > step){
                            linb.Thread(threadid).abort();
                            return false;
                        }
                        _.each(args,function(o,i){
                            if(typeof o == 'function') o(hash[type](count,step));
                            else{
                                var value = String( _.str.endWith(i.toLowerCase(),'color') ? color(type, o, step, count) : (o[0] + (o[1]-o[0])*hash[type](count,step)));
                                (self[i]) ? (self[i](value+(unit||''))) :(self.css(i, value+(unit||'')));
                            }
                        });
                    //}catch(e){
                    //    linb.Thread(threadid).abort();
                    //    color=hash=null;
                   // }
                }];
            return linb.Thread(threadid||_.id(), funs, Math.max(time/step-9,0), null, onStart, onEnd ,true);
        },
        /*
        pos: {left:,top:} or dom element
        parent:parent node
        type:1,2,3,4
        */
        popToTop : function(pos, type, parent){
            var region, target=this,  t;

            parent=linb(parent);
            if(parent.isEmpty())parent=linb('body');

            //prepare
            target.css({position:'absolute',left:linb.Dom.HIDE_VALUE, top:linb.Dom.HIDE_VALUE,display:'block', zIndex:linb.Dom.TOP_ZINDEX});

            if(pos['linb.Dom'] || pos.nodeType==1 || typeof pos=='string'){
                type = (type || 1).toString();
                var node=linb(pos),
                    //base region
                    abspos = node.offset(null, parent);
                region = {
                    left:abspos.left,
                    top:abspos.top,
                    width:node.offsetWidth(),
                    height:node.offsetHeight()
                };
             }else{
                type = type?'3':'0';
                t=type=='0'?0:8;
                region = pos.region || {
                    left:pos.left-t,
                    top:pos.top-t,
                    width:t*2,
                    height:t*2
                };
            }
            pos={left :0, top :0};

            //window edge
            var t=(parent.get(0)===document.body || parent.get(0)===document || parent.get(0)===window)?linb.win:parent, 
                box = {};

            //ensure show target on the top of the other elements with the same zindex
            //parent.get(0).appendChild(target.get(0));
            target.cssPos(pos).css({visibility:'hidden',display:'block'});
            parent.append(target);
            
            box.left=t.scrollLeft();
            box.top=t.scrollTop();
            box.width =t.width()+box.left;
            box.height =t.height()+box.top;
/*
type:1
    +------------------+    +------------------+
    |        3         |    |        4         |
    +--------------+---+    +---+--------------+
    |              |            |              |
    |              |            |              |
    +--------------+---+    +---+--------------+
    |        1         |    |        2         |
    +------------------+    +------------------+
type:2
                         +---+              +---+
                         |   |              |   |
+---+--------------+---+ |   +--------------+   |
|   |              |   | | 3 |              | 4 |
| 2 |              | 1 | |   |              |   |
|   +--------------+   | +---+--------------+---+
|   |              |   |
+---+              +---+
type:3
                         +---+              +---+
                         | 3 |              | 4 |
    +--------------+     +---+--------------+---+
    |              |         |              |
    |              |         |              |
+---+--------------+---+     +--------------+
| 2 |              | 1 |
+---+              +---+
type:4
                     +------------------+
                     | 3                |
+--------------+---+ |   +--------------+ +----+--------------+ +--------------+----+
|              |   | |   |              | |    |              | |              |    |
|              |   | |   |              | |    |              | |              |    |
+--------------+   | +---+--------------+ |    +--------------+ +--------------+    |
|                1 |                      |  2                | |               4   |
+------------------+                      +-------------------- +-------------------+
*/

            //target size
            var w = target.offsetWidth(), h = target.offsetHeight(),
                hi,wi;
            switch(type){
                case '1':
                    hi=false;wi=true;
                break;
                case '2':
                    hi=true;wi=false;
                break;
                case '3':
                    hi=false;wi=false;
                break;
                case '4':
                    hi=wi=true;
                break;
            }

            if(hi){
                if(region.top + h < box.height)
                    pos.top=region.top;
                else
                    pos.top=region.top+region.height-h;
            }else{
                if(region.top + region.height + h < box.height)
                    pos.top=region.top + region.height;
                else
                    pos.top=region.top - h;
            }
            if(wi){
                if(region.left + w < box.width)
                    pos.left=region.left;
                else
                    pos.left=region.left+region.width-w;
            }else{
                if(region.left + region.width + w < box.width)
                    pos.left=region.left + region.width;
                else
                    pos.left=region.left - w;
            }

            //over right
            if(pos.left + w>  box.width)pos.left = box.width - w;
            //over left
            if(pos.left < box.left)pos.left = box.left;
            //over bottom
            if(pos.top + h>  box.height)pos.top = box.height - h;
            //over top
            if(pos.top < box.top)pos.top = box.top;
            //show
            target.cssPos(pos).css({visibility:'visible'});

            return this;
        },
        //for remove obj when blur
        setBlurTrigger : function(id, trigger, group, checkChild){
            var ns=this,
                doc=document,
                sid='$blur_triggers$',
                fun=linb.Dom._blurTrigger||(linb.Dom._blurTrigger=function(p,e){
                    var me=arguments.callee,
                        p=linb.Event.getPos(e),
                        arr=me.arr,
                        srcN=linb.Event.getSrc(e),
                        a=_.copy(arr),
                        b, pos, w, h, v;
                    //filter first
                    _.arr.each(a,function(i){
                        b=true;
                        if(!(v=arr[i].target))b=false;
                        else
                            v.each(function(o){
                                if(!linb.Dom.byId(o.id))
                                    return b=false;
                            });
                        if(!b){
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        };
                    });
                    a=_.copy(arr);
                    _.arr.each(a,function(i){
                        v=arr[i];
                        b=true;
                        var isChild=function(){
                            var nds=v.target.get();
                            while (srcN && srcN.tagName && srcN.tagName!="BODY" && srcN.tagName!="HTML"){
                                if(_.arr.indexOf(nds,srcN)!=-1)
                                    return true;
                                srcN = srcN.parentNode;
                            }
                        };
                        
                        if(!checkChild || isChild()){
                            v.target.each(function(o){
                                if(o.parentNode && (w=o.offsetWidth) && (h=o.offsetHeight)){
                                    pos=linb([o]).offset();
                                    if(p.left>=pos.left && p.top>=pos.top && p.left<=(pos.left+w) && p.top<=(pos.top+h))
                                        return b=false;
                                }
                            });
                        }

                        if(b){
                            _.tryF(v.trigger,[p,e],v.target);
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        }else
                            //if the top layer popwnd cant be triggerred, prevent the other layer popwnd trigger
                            return false;
                    },null,true);
                    a.length=0;
                }),
                arr=fun.arr||(fun.arr=[]),
                target;
            if(group){
                //keep the original refrence
                if(group['linb.Dom'])
                    target=group;
                else if(_.isArr(group)){
                    target=linb();
                    target._nodes=group;
                }
            }else
                target=ns;

            if(!doc.onmousedown)doc.onmousedown=linb.Event.$eventhandler;
            target.each(function(o){if(!o.id)o.id=linb.Dom._pickDomId()});
            //remove this trigger
            if(!trigger){
                _.arr.removeValue(arr,id);
                delete arr[id];
            //double link
            }else
                if(arr[id]){
                    _.arr.removeValue(arr,id);
                    delete arr[id];
                }
                arr[id]={
                    trigger:trigger,
                    target:target
                };
                arr.push(id);
            return this;
        },
        //for firefox disappeared cursor bug in input/textarea
        $firfox2:function(){
            if(!linb.browser.gek2)return this;
            var ns=this;
            ns.css('overflow','hidden');
            _.asyRun(function(){ns.css('overflow','auto')});
            return ns;
        },
        //IE not trigger dimension change, when change height only in overflow=visible.
        ieRemedy:function(){
            if(linb.browser.ie){
                var a1=this.get(),a2=[],l=a1.length;
                _.asyRun(function(){
                    for(var i=0;i<l;i++){
                        if((a2[i]=a1[i].style.WordWrap)=='break-word')
                            a1[i].style.WordWrap='normal';
                        else
                            a1[i].style.WordWrap='break-word';
                    }
                });
                _.asyRun(function(){
                    for(var i=0;i<l;i++)
                        a1[i].style.WordWrap=a2[i];
                    a1.length=a2.length=0;
                });
            }
            return this;
        },
        //for ie6
        fixPng:function(type){
            if(linb.browser.ie6){
                type=type||"crop";
                return this.each(function(n){
                    if(n.tagName=='IMG' && /\.png$/i.test(n.src)){
                        n.style.height = n.height;
                        n.style.width = n.width;
                        n.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + n.src + ", sizingMethod="+type+")";
                        n.src = linb.ini.img_bg;
                    }
                    var bgimg = n.currentStyle.backgroundImage || n.style.backgroundImage,
                        bgmatch = bgimg.match(/^url[("']+(.*\.png[^\)"']*)[\)"']+[^\)]*$/i);
                    if(bgmatch){
                        n.style.backgroundImage = 'url(' + linb.ini.img_bg + ')';
                        n.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + bgmatch[1] + ", sizingMethod="+type+")";
                    }
                });
            }
        }
        /*,
        gekRemedy:function(){
            if(linb.browser.gek)
                return this.each(function(o,i){
                    if(i=o.style){
                        var b=i.zIndex||0;
                        i.zIndex=++b;
                        i.zIndex=b;
                    }
                });
        }*/
    },
    Static:{
        HIDE_VALUE : '-10000px',
        TOP_ZINDEX:10000,

        _boxArr:_.toArr('width,height,left,top,right,bottom'),
        _cursor:{},

        _pickDomId:function(){
            var id;
            do{id='linb_'+_.id()}while(document.getElementById(id))
            return id;
        },
        _map:{
            'html':1,
            'head':1,
            'body':1
        },
        _getTag:function(n){ return n ? n.$linbid ? n.$linbid : n.nodeType==1 ? linb.$registerNode(n).$linbid : 0 : 0},
        _ensureValues:function(obj){
            var t,i,map=this._map,a=[],
            //can't be obj, or opera will crash
            arr =  obj===window
                    ? ['!window']
                    : obj===document
                    ? ['!document']
                    : obj.constructor == Array
                    ? obj
                    : obj['linb.Dom']
                    ? obj._nodes
                    : obj._toDomElems
                    ? obj._toDomElems()
                    : typeof obj == 'function'
                    ? obj()
                    :[obj];
            for(i=0;i<arr.length;i++)
                if( t = !(t=arr[i])
                            ? 0
                            : t===window
                            ? '!window'
                            : t===document
                            ? '!document'
                            : (typeof t=='string' || (t['linb.DomProfile'] && (t=t.domId)))
                                ? t.charAt(0)=='!'
                                    ?  t
                                    : this._getTag( map[t] ? document.getElementsByTagName(t)[0] : document.getElementById(t))
                            : ((t=arr[i])['linb.UIProfile']||t['linb.Template'])
                            ? t.renderId ? t.renderId : (t.boxing().render() && t.renderId)
                            : this._getTag(t)
                  )
                    a[a.length]=t;
            return a.length<=1?a:this._unique(a);
        },
        _scrollBarSize:0,
        getScrollBarSize: function(force){
            var ns=this;
            if(force||!ns._scrollBarSize){
                var div;
                linb('body').append(div=linb.create('<div style="width:50px;height:50px;visibility:hidden;position:absolute;margin:0;padding:0;left:-10000px;overflow:scroll;"></div>'));
                ns._scrollBarSize=50-div.get(0).clientWidth+2;
                div.remove();
            }
            return ns._scrollBarSize;
        },
        getStyle:function(node, name){
            if(!node || node.nodeType!=1)return '';

            var value,b;
            if(name=='opacity' && linb.browser.ie)
                b = name = 'filter';

            value= node.style[name];
            if(!value){
                var me = arguments.callee,t,
                map = me.map || (me.map = {'float':1,'cssFloat':1,'styleFloat':1}),
                c1 = me._c1 || (me._c1={}),
                c2 = me._c2 || (me._c2={}),
                name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()})),
                name2 = c2[name] || (c2[name] = name.replace(/([A-Z])/g, "-$1" ).toLowerCase())
                ;
                if(map[name])
                    name = linb.browser.ie?"styleFloat":"cssFloat";
                //document.defaultView first, for opera 9.0
                value = ((t=document.defaultView) && t.getComputedStyle)?(t=t.getComputedStyle(node,null))?t.getPropertyValue(name2):'':(node.currentStyle&&(node.currentStyle[name]||node.currentStyle[name2]));
/*
                if(linb.browser.opr){
                    var map2 = me.map2 || (me.map2={left:1,top:1,right:1,bottom:1});
                    if(map2[name] && (linb.Dom.getStyle(node,'position')=='static'))
                        value = 'auto';
                }
*/
            }
            return b?value?(parseFloat(value.match(/alpha\(opacity=(.*)\)/)[1] )||0)/100:1:(value||'');
        },
        setStyle:function(node, name , value){
            if(node.nodeType != 1)return;
            if(typeof name == 'string'){
                var me=this.getStyle,
                c1 = me._c1 || (me._c1={}),
                r1 = me._r1 || (me._r1=/alpha\([^\)]*\)/ig);
                name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()}));
                if(name=='opacity'){
                    value=parseFloat(value)||0;
                    value= value >0.9999 ? '' : linb.browser.ie ? "alpha(opacity="+ 100*value +")" : value;
                    if(linb.browser.ie){
                        node.zoom=1;
                        name='filter';
                        value = node.style.filter.replace(r1, "") + value;
                    }
                }
                node.style[name]=value;
            }else
                for(var i in name)
                    arguments.callee.call(this,node, i, name[i]);
        },
        _setPxStyle:function(node, key, value){
            if(node.nodeType != 1)return false;
            var style=node.style;
            if(value || value===0){
                value = ((''+parseFloat(value))==(''+value)) ? (parseInt(value)||0) + "px" : value +'';
                if((key=='width'||key=='height') && value.charAt(0)=='-')value='0';
                if(style[key]!=value){
                    style[key]=value;
                    return true;
                }
            }return false;
        },
        _emptyDivId:"linb.empty::",
        getEmptyDiv:function(sequence){
            var i=1,id,rt,style,o,t,count=0,doc=document,body=doc.body,ini=function(o){
                o.id=id;
                linb([o]).attr('style','position:absolute;visibility:hidden;overflow:visible;left:'+linb.Dom.HIDE_VALUE+';top:'+linb.Dom.HIDE_VALUE+';');
            };
            sequence=sequence || 1;
            while(1){
                id = this._emptyDivId + i;
                //don't remove this {
                if(o=linb.Dom.byId(id)){
                    //Using firstChild, for performance
                    if(!o.firstChild && ++count == sequence)
                        return linb([o]);
                }else{
                    o=doc.createElement('div');
                    ini(o,id);
                    if(body.firstChild)
                        body.insertBefore(o, body.firstChild);
                    else
                        body.appendChild(o);
                    rt=linb([o]);
                    body=o=null;
                    return rt;
                }
                i++;
            }
            body=o=null;
        },
        setCover:function(visible,label){
            // get or create first
            var me=arguments.callee,
                id="linb.temp:cover:",
                id2="linb.temp:message:",
                content = typeof visible=='string'?visible:'',
                o1,o2;

            if((o1=linb(id)).isEmpty()){
                linb('body').prepend(o1=linb.create('<div id="'+ id +'" style="position:absolute;display:none;left:0;top:0;background-image:url('+linb.ini.img_bg+')"><div id="'+id2+'" style="position:absolute;font-size:12px"></div></div>'));
                linb.setNodeData(o1.get(0),'zIndexIgnore',1)
            }
            o2=linb(id2);

            //clear
            if(!visible){
                if(typeof me._label =='string' && me._label!==label)
                    return;
                if(me._showed){
                    o2.empty(false);
                    o1.css({zIndex:0,cursor:'',display:'none'});
                    me._showed=false;
                }
                delete me._label;
            }else{
                if(typeof label=='string')me._label=label;
                var t = linb.win;
                if(!me._showed){
                    o1.css({zIndex:linb.Dom.TOP_ZINDEX*2,display:'',width:t.scrollWidth()+'px',height:t.scrollHeight()+'px',cursor:'progress'});
                    me._showed=true;
                }
                //show content
                if(content){
                    o2.css({left :t.scrollLeft()+t.width()/2+'px', top: t.scrollTop()+t.height()/2+'px'});
                    o2.html(content +'',false);
                }
            }
        },

        byId:function(id){
            return  document.getElementById(id||"");
        },
        $hasEventHandler:function(node, name){
            return linb.getNodeData(node,['eHandlers', name]);
        },
        /*
        action: uri
        data:hash{key:value}
        method:'post'(default) or 'get'
        target: uri target: _blank etc.
        */
        submit:function(action, data, method, target, enctype){
            data=_.isHash(data)?data:{};
            data=_.clone(data, function(o){return o!==undefined});

            method=method||'get';
            action=action||'';
            target=target||'_blank';
            var _t=[];
            if(!_.isEmpty(data)){
                if(method.toLowerCase()=='get'){
                    window.open(action + "?" + _.urlEncode(data),target);
                }else{
                    _.each(data,function(o,i){
                        if(_.isDefined(o))
                            _t.push('<textarea name="'+i+'">'+(typeof o=='object'?_.serialize(o):o)+'</textarea>');
                    });
                    _t.push('<input type="hidden" name="rnd" value="'+_()+'">');
                    _t=_.str.toDom('<form target="'+target+'" action="'+action+'" method="'+method  + (enctype?'" enctype="' +enctype:'') +  '">'+_t.join('')+'</form>');
                    linb.Dom.getEmptyDiv().append(_t);
                    _t.get(0).submit();
                    _t.remove();
                    _t=null;
                }
            }else{
                window.open(action,target);
            }
        },
        busy:function(label){
            linb.Dom.setCover(true,label);
        },
        free:function(label){
           linb.Dom.setCover(false,label);
        },
        animate:function(css, args, onStart, onEnd, time, step, type, threadid, unit){
            var node = document.createElement('div');
            _.merge(css,{position:'absolute', left:this.HIDE_VALUE, zIndex:this.TOP_ZINDEX+10});
            linb.Dom.setStyle(node, css);
            document.body.appendChild(node);
            return linb([node]).animate(args, onStart, function(){
                _.tryF(onEnd);
                if(node.parentNode)
                    node.parentNode.removeChild(node);
                node=null;
            }, time, step, type, threadid, unit);
        },
        //plugin event function to linb.Dom
        $enableEvents:function(name){
            if(!_.isArr(name))name=[name];
            var self=this,f;
            _.arr.each(name,function(o){
                f=function(fun, label, flag){
                    if(typeof fun  == 'function')
                        return this.$addEvent(o, fun, label, flag);
                    else if(fun===null)
                        return this.$removeEvent(o, label, flag);
                    var args = arguments[1] || {};
                    args.$all = (arguments[0]===true);
                    return this.$fireEvent(o, args)
                };
                f.$event$=1;
                self.plugIn(o, f)
            });
        }
    },
    After:function(d){
        var self=this;
       //getter
        _.each({ parent:['y',false], prev:['x',false], next:['x',true], first:['y',true], last:['y',1]},function(o,i){
            self.plugIn(i, function(index){
                return this.$iterator(o[0], o[1], true, index || 1)
            });
        });

        //readonly profile
        _.arr.each(_.toArr('offsetLeft,offsetTop,scrollWidth,scrollHeight'),function(o){
            self.plugIn(o,function(){
                var t=this.get(0),w=window,d=document;
                if(t==w||t==d){
                    if("scrollWidth"==o||"scrollHeight"==o){
                        var a=d.documentElement,b=d.body;
                        return Math.max(a[o], b[o]);
                    }else
                        t = linb.browser.contentBox ? d.documentElement : d.body;
                }
                return t[o];
            })
        });

        var p='padding',m='margin',b='border',c='inner',o='offset',r='outer',w='width',h='height',W='Width',H='Height',T='Top',L='Left',t='top',l='left',R='Right',B='Bottom';
        //dimesion
        _.arr.each([['_'+p+'H',p+T,p+B],
            ['_'+p+'W',p+L,p+R],
            ['_'+b+'H',b+T+W,b+B+W],
            ['_'+b+'W',b+L+W,b+R+W],
            ['_'+m+'W',m+L,m+R],
            ['_'+m+'H',m+T,m+B]
        ],function(o){
            //use get Style dir
            var node,fun=linb.Dom.getStyle;
            self.plugIn(o[0],function(){
                node = this.get(0);
                return (parseInt(fun(node, o[1])) + parseInt(fun(node, o[2]))) || 0;
            })
        });
        /*
        get W/H for

        1:width
        2:innerWidth
        3:offsetWidth
        4:outerWidth

        content-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | | |<-css width ->| | | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|

        border-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | |<-   css width  ->| | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|
        */

        _.arr.each([['_W',w, '_'+p+'W', '_'+b+'W', '_'+m+'W', c+W, o+W],
        ['_H',h, '_'+p+'H', '_'+b+'H', '_'+m+'H', c+H, o+H]],function(o){
            self.plugIn(o[0],function(node,index,value){
                var n,r,t,style=node.style,me=arguments.callee,contentBox=linb.browser.contentBox,
                r1=me.r1 || (me.r1=/%$/),
                getStyle=linb.Dom.getStyle,
                f=linb.Dom._setPxStyle,type=typeof value,t1;
                if(type=='undefined' || type=='boolean'){
                    if(value===true){
                        n=(getStyle(node,'display')=='none');
                        if(n){
                            var temp = linb.Dom.getEmptyDiv().html('*',false);
                            linb([node]).swap(temp);
                            var b,p,d;
                            b = style.visibility,p = style.position,d = style.display; p=p||'';b=b||'';d=d||'';
                            style.visibility = 'hidden'; style.position ='absolute';style.display = 'block';
                        }
                    }
                    t=linb([node]);
                    switch(index){
                        case 1:
                            r=getStyle(node,o[1]);
                            if(isNaN(parseInt(r)) || r1.test(r))
                                r = me(node,2) - (contentBox?t[o[2]]():0);
                            r=parseInt(r)||0;
                            break;
                        case 2:
                            r=node[o[6]]-t[o[3]]();
                            break;
                        case 3:
                            //for in firefox, offsetHeight/Width's bad performance
                            //if(node._bp)
                            //    r=node['_'+o[6]];
                            //else{
                            //    t1=_();
                                r=node[o[6]];
                            //    if(_()-t1>60){
                            //        node['_'+o[6]]=r;
                            //        node._bp=1;
                            //    }
                            //}
                            if(!r)
                                //get from css setting before css applied
                                r=me(node,1)+(contentBox?t[o[2]]():0)+t[o[3]]();
                            break;
                        case 4:
                            r=me(node,3);
                            r+=t[o[4]]();
                            break;
                    }
                    if(n){
                        style.display = d; style.position = p;style.visibility = b;
                        t.swap(temp);
                        temp.empty(false);
                    }
                    return parseInt(r)||0;
                }else{
                    switch(index){
                        case 1:
                            if(f(node, o[1], value))
                                if(linb.Dom.$hasEventHandler(node,'onsize')){
                                    var args={};args[o[1]]=1;
                                    linb([node]).onSize(true, args);
                                }
                            break;
                        case 2:
                            me(node, 1, value - (contentBox?linb([node])[o[2]]():0));
                            break;
                        case 3:
                            //back value for offsetHeight/offsetWidth slowly
                            me(node, 1, value - (t=linb([node]))[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                        case 4:
                            me(node, 1, value - (t=linb([node]))[o[4]]() - t[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                    }
                    //if(node._bp)
                    //    node['_'+o[6]]=null;
                }
            })
        });
        _.arr.each([[c+W,'_W',2],[o+W,'_W',3],[r+W,'_W',4],
         [c+H,'_H',2],[o+H,'_H',3],[r+H,'_H',4]],function(o){
            self.plugIn(o[0],function(value){
                var type=typeof value;
                if(type=='undefined' || type=='boolean')
                    return this[o[1]](this.get(0), o[2]);
                else
                    return this.each(function(v){
                        this[o[1]](v, o[2],value);
                    });
            })
        });
        _.arr.each([[l+'By',l],[t+'By',t],[w+'By',w],[h+'By',h]],function(o){
            self.plugIn(o[0],function(offset,triggerEvent){
                if(offset===0)return this;
                var m,args,k=o[1],fun=linb.Dom.getStyle;
                return this.each(function(node){
                    m=fun(node,k);
                    m=(parseInt(m)||0)+offset;
                    if(k=='width'||k=='height')m=m>0?m:0;
                    node.style[k]=m+'px';
                    if(triggerEvent){
                        args={};args[k]=1;
                        var f=linb.Dom.$hasEventHandler;
                        if((k=='left' || k=='top')&& f(node,'onmove'))
                            linb([node]).onMove(true, args);
                        if((k=='width' || k=='height')&& f(node,'onsize')){
                            linb([node]).onSize(true, args);
                        }
                    }
                },this)
            });
        });
        _.arr.each(['scrollLeft','scrollTop'],function(o){
            self.plugIn(o,function(value){
                if(value !==undefined)
                    return this.each(function(v){
                        v[o]=value;
                    });
                else{
                    var v=this.get(0);
                    if(v===window || v===document){
                        var a=document.documentElement,b=document.body;
                        if("scrollTop"==o)return window.pageYOffset || Math.max(a[o], b[o]);
                        if("scrollLeft"==o)return window.pageXOffset || Math.max(a[o], b[o]);
                    }
                    return v[o];
                }
            })
        });
        _.arr.each('width,height,left,top'.split(','),function(o){
            self.plugIn(o,function(value){
                var self=this, node=self.get(0),b=linb.browser,type=typeof value,doc=document,t;
                if(!node || node.nodeType==3)return;
                if(type=='undefined'||type=='boolean'){
                    if((o=='width' && (t='Width'))||(o=='height' && (t='Height'))){
                        if(doc===node)return Math.max( doc.body['scroll'+t], doc.body['offset'+t], doc.documentElement['scroll'+t], doc.documentElement['offset'+t]);
                        if(window===node)return b.opr?Math.max(doc.body['client'+t],window['inner'+t]):b.kde?window['inner'+t]:(linb.browser.contentBox && doc.documentElement['client'+t]) ||doc.body['client'+t];
                    }
                    //give shortcut
                    if(o=='width')value=parseInt(node.style.width)||self._W(node,1,value);
                    else if(o=='height')value=parseInt(node.style.height)||self._H(node,1,value);
                    else
                        value = linb.Dom.getStyle(node, o);
                    return value=='auto'?value:(parseInt(value)||0);
                }else{
                    var f=linb.Dom._setPxStyle,t,a;
                    return self.each(function(v){
                        if(v.nodeType!=1)return;
                            if(v.style[o]!==value){
                                if(o=='width')self._W(v,1,value);
                                else if(o=='height')self._H(v,1,value);
                                else{
                                    if(f(v, o, value))
                                        if((o=='top' || o=='left') && linb.Dom.$hasEventHandler(node,'onmove')){
                                            a={};a[o]=1;
                                            linb([v]).onMove(true, a);
                                        }
                                }
                            }
                    });
                }
            });
        });

        //linb.Dom event
        _.arr.each(linb.Event._events,function(o){
            _.arr.each(linb.Event._getEventName(o),function(o){
                self.$enableEvents(o);
            })
        });
    },
    Initialize:function(){
        _.set(linb.$cache.domPurgeData,'!window',{$linbid:'!window',element:window});
        _.set(linb.$cache.domPurgeData,'!document',{$linbid:'!document',element:document});

        linb.win=linb(['!window'],false);
        linb.doc=linb(['!document'],false);

        linb.$inlineBlock=linb.browser.gek
            ? parseFloat(linb.browser.ver)<3 
                ? ['-moz-inline-block', '-moz-inline-box','inline-block']  
                : 'inline-block'
            : linb.browser.ie6
                ? ['inline-block', 'inline'] 
                : 'inline-block',
        //hot keys
        linb.doc.onKeydown(function(p,e,s){
            linb.Event.$keyboard=linb.Event.getKey(e);
            
            var event=linb.Event,set,
                ks=event.getKey(e);
            if(ks){
                if(ks[0].length==1)ks[0]=ks[0].toLowerCase();
                set = linb.$cache.hookKey[ks.join(":")];
                //if hot function return false, stop bubble
                if(set)
//                    try{
                        if(_.tryF(set[0],set[1],set[2])===false){
                            event.stopBubble(e);
                            return false;
                        }
//                    }catch(e){}
            }
            return true;
        },"document")
        .onKeyup(function(p,e){
            delete linb.Event.$keyboard;

            var event=linb.Event,set,
                ks=event.getKey(e);
            if(ks){
                if(ks[0].length==1)ks[0]=ks[0].toLowerCase();
                set = linb.$cache.hookKeyUp[ks.join(":")];
                //if hot function return false, stop bubble
                if(set)
//                    try{
                        if(_.tryF(set[0],set[1],set[2])===false){
                            event.stopBubble(e);
                            return false;
                        }
//                    }catch(e){}
            }
            return true;
        },"document");

        //hook link(<a ...>xxx</a>) click action
        //if(linb.browser.ie || linb.browser.kde)
            linb.doc.onClick(function(p,e,src){
                if(!linb.History)return;

                var s = location.href.split('#')[0],
                    t=linb.Event,
                    o = t.getSrc(e),b,i=0,
                    b
                ;
                do{
                    if(o.tagName == 'A'){
                        b=true;
                        break;
                    }
                    if(++i>8)break;
                }while(o=o.parentNode)
                if(b){
                    if(o.href.indexOf('javascript:')==0)return false;
                    if(!t.getKey(e).shiftKey && t.getBtn(e)=='left' && (o.href.indexOf(s+'#')==0||o.href.indexOf('#')==0)){
                        linb.History.setFI(o.href.replace(s,''));
                        return false;
                    }
                }
            },'hookA',0);

        if(linb.browser.ie && document.body)
            document.body.onselectstart=function(n){
                n=event.srcElement;
                while(n&&n.tagName&&n.tagName!="BODY"&&n.tagName!="HTML"){
                    if('_onlinbsel' in n)
                        return n._onlinbsel!='false';
                    n=n.parentNode;
                }
                return true;
            };
        //free memory
        linb.win.afterUnload(function(){
            window.onresize=null;

            if(window.removeEventListener)
                window.removeEventListener('DOMMouseScroll', linb.Event.$eventhandler3, false);
            document.onmousewheel=window.onmousewheel=null;

            if(linb.browser.ie && document.body)
                document.body.onselectstart=null;

            //unlink link 'App'
            linb.SC.__gc();
            linb.Thread.__gc();
            linb([window, document]).$clearEvent();
            linb('body').empty();
            _.breakO(linb.$cache,2);
            _.breakO([linb,Class,_],3);
            window.Class=window.Namespace=window.linb=window._=undefined;
        },"window",-1);

    }
});