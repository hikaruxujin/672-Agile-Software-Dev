//A wrap for codemirror(http://marijn.haverbeke.nl/codemirror/)
Class("VisualJS.CodeEditor", ["linb.UI.Widget","linb.absValue"] ,{
    Instance:{
        resetGlobalKey:function(obj){
            var prf=this.get(0),box=prf.box,key=box.$temppool,subkey=prf.$linbid;
            if(!window[key])window[key]={};
            window[key][subkey]=obj;
            return key+'.'+subkey;
        },
        activate:function(){
            var profile = this.get(0);
            if(profile.$editor)
                profile.$editor.focus();
            return this;
        },
        clearHistory:function(){
            var obj=this.get(0).$editor;
            return obj.editor.history.clear();
        },
        callEditor:function(name,args){
            var obj=this.get(0).$editor;
            return obj[name].apply(obj,args||[]);
        },
        isReady:function(){
            var profile = this.get(0);
            return !!profile.$initialized;
        },
        searchCode:function(code){
            var profile = this.get(0),
                cm=profile.$editor;
            if(cm){
                var cursor = cm.getSearchCursor(code);
                if(cursor.findNext()){
                    cm.focus();
                    cursor.select();
                }
            }            
        },
        replaceCode:function(code, crack){
            var ns=this,
                profile = this.get(0),
                cm=profile.$editor;
            if(cm){
                // alway used after selectioin
                if(linb.browser.ie)
                    delete cm.editor.selectionSnapshot;

                cm.replaceSelection(code);
                // crack for codemirror deleted <br> bug
                if(crack){
                    var pos=cm.cursorPosition();
                    var br=cm.nextLine(pos.line);
                    // remove the extra <br>
                    if(br)
                        br.parentNode.removeChild(br);
                    
ns.__forcrackignorechange=true;

                    cm.editor.history.reset();
                }
                cm.focus();
            }
        },
        expandBraces:function(id){
            var profile = this.get(0),
                cm=profile.$codemirror,
                scroller=cm.lineNumbers.firstChild,
                cld=scroller.children || scroller.childNodes;
                    
            _.each(this.get(0)._$foldingMap,function(a){
                if(id.indexOf("b:"+a[0])==0 && a[3]){
                    cld[a[2]].onclick();
                }
            });
        },
        // locate to {}
        // crack is [true], for replaceSelection action
        locateTo:function(id, crack){
            var ns=this,
                profile = this.get(0),
                cm=profile.$editor;
            if(cm){
                cm.focus();
                var win=cm.win,
                elem=win.document.getElementById(id),
                elem2=win.document.getElementById('e'+id.slice(1));
                if(elem && elem2){
                    cm.focus();
                    
                    // crack for codemirror deleted <br> bug
                    if(crack){
                        // add an extra <br>
                        cm.insertIntoLine(elem2,0," \n");
                        cm.editor.highlightDirty(true);
ns.__forcrackignorechange=true;

                        elem2=elem2.nextSibling;
                    }
                    
                    cm.selectLines(elem.previousSibling, 0, elem2, 0);

                }
                var doc=win.document;
                if(doc.body.scrollLeft)doc.body.scrollLeft=0;
                if(doc.documentElement.scrollLeft)doc.documentElement.scrollLeft=0;
            }
        },
        // add code to a hash
        addCodeInto:function(id, code){
            var profile = this.get(0),
                cm=profile.$editor;
            if(cm){
                cm.focus();
                var win=cm.win,
                isBr=function(elem){return elem.tagName=="BR" || elem.tagName=="br"},
                elem=win.document.getElementById(id);
                while((elem=elem.previousSibling) && (isBr(elem)||elem.className=="whitespace"||elem.className=="js-comment") );
                if(elem){
                    var te=elem, length,space="";
                    while(!isBr(te) && (te=te.previousSibling));
                    te=te.nextSibling;
                    if(te.className=="whitespace"){
                        length=te.currentText.length;
                        space=_.str.repeat(' ',length);
                    }else if(!te.className){
                        if(te.currentText){
                            length=te.currentText.length - _.str.ltrim(te.currentText).length;
                            space=_.str.repeat(' ',length);
                        }
                    }

                    cm.insertIntoLine(elem,0,code.replace(/\n/g, "\n"+space));
                    cm.selectLines(elem)
                    var cursor=cm.getSearchCursor("{",true);
                    if(cursor)cursor.select();
                    
                    var doc=win.document;
                    if(doc.body.scrollLeft)doc.body.scrollLeft=0;
                    if(doc.documentElement.scrollLeft)doc.documentElement.scrollLeft=0;

                }
            }
        },
        selectLines:function(line1, line2){
            var profile = this.get(0),
                cm=profile.$editor;
            if(cm){
                cm.focus();
               var max=cm.lineNumber(cm.lastLine());
               if(line1<0)line1=0;
               if(line2<0)line2=0;
               if(line1>max)line1=max;
               if(line2>max)line2=max;
                var h1=cm.nthLine(line1),
                    h2=cm.nthLine(line2);
               cm.selectLines(h1, 0, h2, 0);
            }
        },
        findFunctionInfo:function(id){
            var profile = this.get(0),
                cm=profile.$editor,
                key,
                args=[];
            if(cm){
                var doc=cm.win.document,
                    isBr=function(elem){return elem.tagName=="BR" || elem.tagName=="br"},
                    ignorePrevSpace=function(elem){
                        while((elem=elem.previousSibling) && (isBr(elem)||elem.className=="whitespace"||elem.className=="js-comment") );
                        return elem;
                    },
                    elem=doc.getElementById(id),
                    cls,txt;
                if(elem){
                    elem=ignorePrevSpace(elem);
                    cls=elem.className;
                    txt=elem.currentText;
                    if(cls=='js-punctuation' && txt && txt.charAt(0)==")"){
                        while(elem=elem.previousSibling){
                            cls=elem.className;
                            txt=elem.currentText;
                            if(cls=='js-punctuation' && txt && txt.charAt(0)=="("){
                                elem=ignorePrevSpace(elem);
                                cls=elem.className;
                                txt=elem.currentText;
                                if(cls=='js-keyword' && txt=='function'){
                                    elem=ignorePrevSpace(elem);
                                    cls=elem.className;
                                    txt=elem.currentText;
                                    if(cls=='js-punctuation' && txt && txt.charAt(0)==':'){
                                        elem=ignorePrevSpace(elem);
                                        key=elem.currentText;
                                    }
                                }
                                break;
                            }
                            if(cls=='js-variabledef')
                                args.push(txt);
                        };
                    }
                    else if(cls=='js-punctuation' && txt && txt.charAt(0)==':'){
                        elem=ignorePrevSpace(elem);
                        key=elem.currentText;

                    }
                }
            }
            args.reverse();
            return [key, args];
        },
        setScopeVar:function(scope, varName, hash){
            var profile = this.get(0);
            _.set(profile._$customTypeCache
                , [scope, varName=="this"?profile.box._this:varName]
                , hash);
        },
        _setCtrlValue:function(value){
            if(!_.isSet(value))value='';
            return this.each(function(profile){
                if(profile.$editor)
                    profile.$editor.setCode(value);
            });
        },
        _getCtrlValue:function(){
            var profile = this.get(0);
            if(profile.$editor)
                return profile.$editor.getCode();
            else
                return profile.properties.$UIvalue;
        }
    },
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            BOX:{
                tagName:'div'
            }
        },'all');
        this.setTemplate(t);
    },
    Static:{
        $tempsandbox:"_$temp_for_linb_sandbox",
        $temppool:"_$temp_for_linb_pool",
        Appearances:{
            BOX:{
                width:'100%',
                height:'100%',
                left:0,
                top:0,
                position:'absolute',
                background:'#fff'
            }
        },
        Behaviors:{},
        DataModel:{
            left:0,
            top:0,
            width:200,
            height:200,
            position:'absolute',
            codeType:{
                ini:'js',
                listbox:['js','css','php','html','other']
            },
            readonly:{
                ini:false,
                action:function(value){
                    var doc = this.$codemirror.win.document;
                    if(!doc)return;
                    if (linb.browser.ie && doc.body.contentEditable != undefined)
                        doc.body.contentEditable = value?"false":"true";
                    else
                      doc.designMode = value?"off":"on";
                }
            }
        },
        EventHandlers:{
            onValueChanged:function(profile){},
            onRendered:function(profile){},
            onBlockChanged:function(profile, BracesMap){},
            onLinesChange:function(profile, BracesMap){},
            onGetHelpInfo:function(profile, key){}
        },
        RenderTrigger:function(){
            var key=this.box.$temppool,
                subkey=this.$linbid;

            this.box._reLoadEditor(this);
            this.destroyTrigger=function(){
                var win=this.$codemirror.win,prf=this;

                // remove those here
                if(prf){
                    if(linb.browser.opr && prf.$repeatT)
                        prf.$repeatT.abort();

                    //if(linb.browser.ie){
                    //    win.document.detachEvent("unload",prf._gekfix);
                    //}else{
                    //    win.removeEventListener("unload",prf._gekfix,false);
                    //}
                }
                win._prop=undefined;

                delete this.$codemirror;
                delete this.$editor;
                win=null;
                
                // destroy related UI
                if(this.$popList)this.$popList.destroy();
                if(this.$popHelp)this.$popHelp.destroy();
                if(this.$popCustom)this.$popCustom.destroy();
                
                if(window[key])delete window[key][subkey];
            };
        },
        evalInSandbox:function(code, isjson, name){
            if(name && document.getElementById(name)){
                document.body.removeChild(document.getElementById(name));
                try{delete frames[name]}catch(e){}
            }

            var ns=this,
                iframe = document.createElement("iframe"), result, wnd, line, errmsg, type;
            if(name){
                iframe.name=name;
                iframe.id=name;
            }
            iframe.src="javascript:false;";
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            wnd=frames[frames.length - 1];
            wnd.document.open();
            wnd.document.write('<meta http-equiv="content-type" content="text/html; charset=utf-8" />');
            wnd.document.write(""
                +"<script>"
                +"_=window._=parent._;"
                +"Class=window.Class=parent.Class;"
                +"linb=window.linb=parent.linb;"
                +"dompack=window.dompack=function(){var o=new linb.Dom(false),d=document.createElement('div');d.id='abc';document.body.appendChild(d);o._nodes=[d];return o};"
                +"window['"+ns.$temppool+"']=parent['"+ns.$temppool+"'];"
                // "var b=arguments.callee;" for fix firefox 3.5 bug
                +"parent['"+ns.$tempsandbox+"']=/*@cc_on !@*/0?this:{eval:function(s){return (function(){var b=arguments.callee;return window.eval.call(window,s)})()}};"
                +"try{top=parent=null;}catch(e){}"
                +"<\/script><span></span>"
            );
            wnd.document.close();
            var bak=linb.Dom.pack;
            try{
 //console.log(code);
                // avoid dom affected
                linb.Dom.pack=wnd.dompack;
                result = window[ns.$tempsandbox].eval(isjson?("("+code+")"):code);

                type = (result===wnd || result===wnd.content)? 'window' :
                       result===wnd.history ? 'history' :
                       result===wnd.screen ? 'screen' :
                       result===wnd.location ? 'location' :
                       result===wnd.navigator ? 'navigator' :
                       result===wnd.document ? 'document' :
                       null;

            }catch(e){
                line=e.line||e.lineNumber;
                errmsg=((e.name?e.name+' : ':'') + (e.description||e.message||'') + (line?'\n line : '+line:''));
                if(!_.isSet(line) && /.*at line ([\d]+).*/.test(errmsg))
                    line=errmsg.replace(/.*at line ([\d]+).*/,'$1');
            }finally{
                linb.Dom.pack=bak;
                wnd.Class=wnd._=wnd.linb=wnd[ns.$temppool]=null;
                window[ns.$tempsandbox]=undefined;

                if(!name)
                    document.body.removeChild(iframe);

                iframe=wnd=null;
            }
            return {
                ok:result,
                type:type,
                ko:errmsg,
                line:line
            };
        },
        _buildItem:function(id, type, key, o, caption, value, order, itemStyle){
            return {
                id:id,
                caption:caption||id,
                value:value||id,
                tag: (order||(type=='property'?'b':type=='function'?'c':type=='class'?'d':type=='event'?'e':'a')) + ":" + id.toLowerCase(),
                path: (key?(key+"."):"")+id,
                itemStyle:itemStyle,
                image:type?'img/App.gif':null,
                imagePos:!type?null:
                    (type=='property'?
                        (_.isSet(o)&&_.isHash(o))?'-16px -32px':
                        (_.isSet(o)&&_.isArr(o))?'-128px -32px':
                    '0 -32px':
                    type=='event'?'-48px -32px':
                    type=='function'?'-32px -32px':
                    type=='class'?'-16px -48px':
                    "-64px -32px")
             };
        },
        _intellcache:{},
        _enumKeys:function(target, key, normalObj, ownOnly){
            // non-object or array return empty array
            if(!_.isObj(target) || _.isArr(target))return [];

            // default is normal object
            normalObj=normalObj!==false;
            var ns=this,
                islinbobj= target.$linb$,
                o,isfun,
                list=[];

            for(var i in target){
                if('prototype'==i || 'constructor' == i)
                    continue;
                if(islinbobj){
                    if('upper'==i || 'After'==i || 'Before'==i || 'Instance'==i || 'Static'==i || 'Constructor'==i)
                        continue
                }
                try{
                    if(i.charAt(0)!="_" &&  i.charAt(0)!="$" && /^[\w_]+$/.test(i)){
                        o=target[i];
                        if(normalObj && (o && o.$abstract)){
                            continue;
                        }
    
                        isfun = typeof o == 'function' && (!(o && o.$linb$) || o.$asFunction);
                        
                        if(ownOnly && (!target.hasOwnProperty(i) ||  !target.propertyIsEnumerable(i))){
                            continue;
                        }

                        list.push(ns._buildItem(i,
                            (typeof o=='function')? (o && o.$linb$ && !o.$asFunction) ?'class': (o && o.$event$) ? "event" : 'function':'property',
                            key,
                            o,
                            i + (isfun?"(":"") + ((isfun&&normalObj)?_.fun.args(o):'') +(isfun?")":""),
                            i + (isfun?"(":"") + ((isfun&&normalObj)?_.fun.args(o):'') +(isfun?")":"")
                            ));
                    }
                }catch(e){}
            
            }

            return list;
        },
        _getIntellisenseList:function(key, cachedata){
            if(!key)return null;
            cachedata = cachedata!==false;

            var ns=this,
                cache = ns._intellcache,
                buildItem = ns._buildItem;

            if(cachedata && cache[key])return cache[key];

            var list=[];
            if(key==ns.$temppool){
                return [];
            }
            
            switch(key){
                case ' variables ':{
                    list=[
                    // global
                        buildItem("_",0,0,0,0,0,2,"font-weight:bold;color:#ff0000;"),
                        buildItem("_()",0,0,0,"_()","_()",2,"font-weight:bold;color:#ff0000;"),
                        buildItem("linb",0,0,0,0,0,2,"font-weight:bold;color:#ff0000;"),
                        buildItem("linb()",0,0,0,"linb()","linb()",2,"font-weight:bold;color:#ff0000;"),

                        buildItem("top",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("parent",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("window",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("document",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("navigator",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("history",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("location",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("screen",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("Math",0,0,0,0,0,3,"font-weight:bold;"),
                        buildItem("Number",0,0,0,0,0,3,"font-weight:bold;"),

                    // js
                        buildItem("if  ",0,0,0,"if...","if(){\n}",5),
                        buildItem("ifelse",0,0,0,"if...else...","if(){\n}else{\n}",5),
                        buildItem("while",0,0,0,"while...","while(){\n};",5),
                        buildItem("do  ",0,0,0,"do...while","do{\n}while();",5),
                        buildItem("try  ",0,0,0,"try...catch...finally","try{\n}catch(e){\n}finally{\n}",5),
                        buildItem("for  ",0,0,0,"for...","for(;;;){\n}",5),
                        buildItem("forin  ",0,0,0,"for...in","for( in ){\n}",5),
                        buildItem("function",0,0,0,"function...","function(){\n}",5),
                        buildItem("switch",0,0,0,"switch...","switch(){\n  case : \n  break;\n  case : \n  break;default: \n}",5),
                        buildItem("with",0,0,0,"with...","with(){\n}",5),

                        buildItem("return",0,0,0,"return","return ",4),
                        buildItem("break",0,0,0,"break","break;",4),
                        buildItem("continue",0,0,0,"continue","continue;",4),
                        buildItem("throw",0,0,0,"throw","throw ",4),
                        buildItem("new ",0,0,0,"new","new ",4),
                        buildItem("delete",0,0,0,"delete","delete ",4),
                        buildItem("arguments",0,0,0,"arguments","arguments",4),
                        buildItem("var",0,0,0,"var","var ",4),
                        buildItem("case",0,0,0,"case","case :",4),
                        buildItem("default",0,0,0,"default","default :",4),

                        buildItem("typeof",0,0,0,"typeof","typeof ",4),
                        buildItem("instanceof",0,0,0,"instanceof","instanceof ",4),

                        buildItem("void",0,0,0,"void","void",4),
                        buildItem("true",0,0,0,"true","true",4),
                        buildItem("false",0,0,0,"false","false",4),
                        buildItem("null",0,0,0,"null","null",4),
                        buildItem("NaN",0,0,0,"NaN","NaN",4),
                        buildItem("undefined",0,0,0,"undefined","undefined",4),
                        buildItem("Infinity",0,0,0,"Infinity","Infinity",4),


                        buildItem("decodeURI()","function"),
                        buildItem("decodeURIComponent()","function"),
                        buildItem("encodeURI()","function"),
                        buildItem("encodeURIComponent()","function"),
                        buildItem("escape()","function"),
                        buildItem("eval()","function"),
                        buildItem("isFinite()","function"),
                        buildItem("parseFloat()","function"),
                        buildItem("parseInt()","function"),
                        buildItem("unescape()","function"),
                        buildItem("Number()","function"),
                        buildItem("String()","function")
                      ];
                        break;
                }
                case 'new':{
                     list=[
                     
                        buildItem("String","class",0,0,0,"String();",1),
                        buildItem("Object","class",0,0,0,"Object();",1),
                        buildItem("Array","class",0,0,0,"Array();",1),
                        buildItem("RegExp","class",0,0,0,"RegExp();",1),
                        buildItem("Boolean","class",0,0,0,"Boolean();",1),
                        buildItem("Number","class",0,0,0,"Number();",1),
                        buildItem("Date","class",0,0,0,"Date();",1),

                        buildItem("linb.Dom","class",0,0,0,"linb.Dom();",2),
                        buildItem("linb.UIProfile","class",0,0,0,"linb.UIProfile();",2),
                        buildItem("linb.Com","class",0,0,0,"linb.Com();",2),
                        buildItem("linb.Template","class",0,0,0,"linb.Template();",2),
                        buildItem("linb.UI","class",0,0,0,"linb.UI();",2),
                        buildItem("linb.DataBinder","class",0,0,0,"linb.DataBinder();",2)
                    ];
                    for(var i in linb.UI){
                        if(i!='upper' && linb.UI[i].$linb$){
                            list.push(buildItem("linb.UI."+i,"class",0,0,0," "+"linb.UI."+i+"();",2));
                        }
                    }
                    break;
                }
                case 'history':
                case 'screen':
                    break;
                case 'arguments':{
                    list=[
                        buildItem("callee","property",key),
                        buildItem("length","property",key)
                    ];
                    break;
                }
                case 'arguments.callee':{
                    list=[
                        buildItem("caller","property",key),
                        buildItem("length","property",key),
                        buildItem("call()","function",key),
                        buildItem("apply()","function",key)
                    ];
                    break;
                }
                case 'top':
                case 'parent':
                case 'window':{
                    var iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                    var target=frames[frames.length - 1];
                    list=ns._enumKeys(target,key,false);
                    document.body.removeChild(iframe);
                    break;
                }
                case 'document':{
                    var iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                    var target=frames[frames.length - 1];
                    list=ns._enumKeys(target.document,key,false);
                    document.body.removeChild(iframe);
                    break;
                }
                case 'Element.prototype':{
                    var iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                    var target=frames[frames.length - 1];
                    target.document.write("<span>a</span>");
                    list=ns._enumKeys(target.document.body.firstChild,key,false);
                    document.body.removeChild(iframe);
                    break;
                }
                case 'Math':{
                    list=[
                        buildItem("E","property",key),
                        buildItem("LN2","property",key),
                        buildItem("LN10","property",key),
                        buildItem("LOG2E","property",key),
                        buildItem("LOG10E","property",key),
                        buildItem("PI","property",key),
                        buildItem("SQRT1_2","property",key),
                        buildItem("SQRT2","property",key),

                        buildItem("abs(x)","function",key),
                        buildItem("acos(x)","function",key),
                        buildItem("asin(x)","function",key),
                        buildItem("atan(x)","function",key),
                        buildItem("atan2(y,x)","function",key),
                        buildItem("ceil(x)","function",key),
                        buildItem("cos(x)","function",key),
                        buildItem("exp(x)","function",key),
                        buildItem("floor(x)","function",key),
                        buildItem("log(x)","function",key),
                        buildItem("max(x,y,z,...,n)","function",key),
                        buildItem("min(x,y,z,...,n)","function",key),
                        buildItem("pow(x,y)","function",key),
                        buildItem("random()","function",key),
                        buildItem("round(x)","function",key),
                        buildItem("sin(x)","function",key),
                        buildItem("sqrt(x)","function",key),
                        buildItem("tan(x)","function",key)
                    ];
                    break;
                }
                case 'Number':{
                     list=[
                        buildItem("MAX_VALUE","property",key),
                        buildItem("MIN_VALUE","property",key),
                        buildItem("NEGATIVE_INFINITY","property",key),
                        buildItem("POSITIVE_INFINITY","property",key)
                    ];
                    break;
                }
                case "Array.prototype":{
                    list=[
                        buildItem("length","property",key),
                        buildItem("concat()","function",key),
                        buildItem("join()","function",key),
                        buildItem("pop()","function",key),
                        buildItem("push()","function",key),
                        buildItem("reverse()","function",key),
                        buildItem("shift()","function",key),
                        buildItem("sort()","function",key),
                        buildItem("concat()","function",key),
                        buildItem("splice()","function",key),
                        buildItem("toString()","function",key),
                        buildItem("unshift()","function",key)
                    ];
                    break;
                }
                case "Date.prototype":{
                    list=[
                        buildItem("getDate()","function",key),
                        buildItem("getDay()","function",key),
                        buildItem("getFullYear()","function",key),
                        buildItem("getHours()","function",key),
                        buildItem("getMilliseconds()","function",key),
                        buildItem("getMinutes()","function",key),
                        buildItem("getMonth()","function",key),
                        buildItem("getTime()","function",key),
                        buildItem("getSeconds()","function",key),
                        buildItem("getTimezoneOffset()","function",key),
                        buildItem("getUTCDate()","function",key),
                        buildItem("getUTCDay()","function",key),
                        buildItem("getUTCFullYear()","function",key),
                        buildItem("getUTCHours()","function",key),
                        buildItem("getUTCMilliseconds()","function",key),
                        buildItem("getUTCMinutes()","function",key),
                        buildItem("getUTCMonth()","function",key),
                        buildItem("getUTCSeconds()","function",key),
                        buildItem("getYear()","function",key),
                        buildItem("parse()","function",key),
                        buildItem("setDate()","function",key),
                        buildItem("setFullYear()","function",key),
                        buildItem("setHours()","function",key),
                        buildItem("setMilliseconds()","function",key),
                        buildItem("setMinutes()","function",key),
                        buildItem("setMonth()","function",key),
                        buildItem("setSeconds()","function",key),
                        buildItem("setTime()","function",key),
                        buildItem("setUTCDate()","function",key),
                        buildItem("setUTCFullYear()","function",key),
                        buildItem("setUTCHours()","function",key),
                        buildItem("setUTCMilliseconds()","function",key),
                        buildItem("setUTCMinutes()","function",key),
                        buildItem("setUTCSeconds()","function",key),
                        buildItem("setUTCMonth()","function",key),
                        buildItem("setYear()","function",key),
                        buildItem("toDateString()","function",key),
                        buildItem("toGMTString()","function",key),
                        buildItem("toLocaleDateString()","function",key),
                        buildItem("toLocaleTimeString()","function",key),
                        buildItem("toLocaleString()","function",key),
                        buildItem("toString()","function",key),
                        buildItem("toUTCString()","function",key),
                        buildItem("toTimeString()","function",key),
                        buildItem("UTC()","function",key)
                    ];
                    break;
                }
                case "Number.prototype":{
                    list=[
                        buildItem("toExponential()","function",key),
                        buildItem("toFixed()","function",key),
                        buildItem("toPrecision()","function",key),
                        buildItem("toString()","function",key)
                    ];
                    break;
                }
                case "Boolean.prototype":{
                    list=[
                        buildItem("toString()","function",key)
                    ];
                    break;
                }
                case "Function.prototype":{
                    list=[
                        buildItem("toString()","function",key),
                        buildItem("call()","function",key),
                        buildItem("apply()","function",key)
                    ];
                    break;
                }
                case "RegExp.prototype":{
                    list=[
                        buildItem("global","property",key),
                        buildItem("ignoreCase","property",key),
                        buildItem("multiline","property",key),
                        buildItem("lastIndex","property",key),
                        buildItem("source","property",key),
                        buildItem("compile()","function",key),
                        buildItem("exec()","function",key),
                        buildItem("test()","function",key)
                    ];
                    break;
                }
                case "String.prototype":{
                    list=[
                        buildItem("length","property",key),
                        buildItem("charAt()","function",key),
                        buildItem("charCodeAt()","function",key),
                        buildItem("concat()","function",key),
                        buildItem("fromCharCode()","function",key),
                        buildItem("indexOf()","function",key),
                        buildItem("lastIndexOf()","function",key),
                        buildItem("match()","function",key),
                        buildItem("replace()","function",key),
                        buildItem("search()","function",key),
                        buildItem("slice()","function",key),
                        buildItem("split()","function",key),
                        buildItem("substr()","function",key),
                        buildItem("substring()","function",key),
                        buildItem("toLowerCase()","function",key),
                        buildItem("toUpperCase()","function",key)
                    ];
                    break;
                }
                case "Object.prototype":{
                    list=[
                        buildItem("toString()","function",key,0,0,0,'z'),
                        buildItem("toLocaleString()","function",key,0,0,0,'z'),
                        buildItem("hasOwnProperty(key)","function",key,0,0,0,'z'),
                        buildItem("propertyIsEnumerable(key)","function",key,0,0,0,'z'),
                        buildItem("isPrototypeOf(obj)","function",key,0,0,0,'z')
                     ];
                    break;
                }
                default:{
                    if(/\.prototype$/.test(key)){
                        try{
                            var target= eval("new "+key.replace(/\.prototype$/,''));
                            list=ns._enumKeys(target,key);
                        }catch(e){}
                    }

                    if(!list.length){
                        var target=_.get(window,key.split("."));
                        list=ns._enumKeys(target,key);
                        cachedata=false;
                    }
                }
            }

            if(cachedata)
                cache[key]=list;

            return list;
        },
        _getFromFunctionExp:function(code){
            var type;
            if(/toString\([^)]*\)$/.test(code))
                type='String.prototype';
            // functions patterns
            else if(/^\s*\(?\s*new\s+([\w_.]+)\s*\(?\s*[^)]*\)?\s*\)?(\s*\.\s*(set|on|before|after)[\w]+\s*\([^)]*\)\s*)*$/.test(code)){
                code  = code.replace(/^\s*\(?\s*new\s+([\w_.]+)\s*\(?\s*[^)]*\)?\s*\)?(\s*\.\s*(set|on|before|after)[\w]+\s*\([^)]*\)\s*)*$/, "$1");
                type=code+'.prototype';
            }
            else if(/.*\.reBoxing\(([^)]*)\)(\s*\.\s*(set|on|before|after)[\w]+\s*\([^)]*\)\s*)*$/.test(code)){
                code = code.replace(/.*\.reBoxing\(([^)]*)\)(\s*\.\s*(set|on|before|after)[\w]+\s*\([^)]*\)\s*)*$/,"$1");
                if(code)
                    type=code.replace(/[\'\"]/g,"")+'.prototype';
                else
                    type='linb.Dom.prototype';
            }
            else if(code.indexOf("linb.alert(")==0 || code.indexOf("linb.prompt(")==0|| code.indexOf("linb.pop(")==0|| code.indexOf("linb.confirm(")==0)
                type='linb.UI.Dialog.prototype';
            else if(code.indexOf("linb(")==0 || code.indexOf("linb.use(")==0)
                type='linb.Dom.prototype';
            else if(code.indexOf("linb.Thread(")==0 || code.indexOf("linb.Ajax(")==0
                || code.indexOf("linb.SAjax(")==0 ||  code.indexOf("linb.IAjax(")==0 )
                type='linb.Thread.prototype';
            else if(/.*\.(getRoot|getSubNode|getSubNodes)\s*\(\s*[^\)]*\)\s*$/.test(code))
                type='linb.Dom.prototype';
            else if(/.*\.getElementById\s*\(\s*[^\)]*\)\s*$/.test(code))
                type='Element.prototype';
            return type;
        },
        _getFromObject:function(target){
            if(!_.isSet(target))
                return null;
            else if(target.$linb$){
                if(typeof target == 'function')
                    return target.KEY;
                else
                    return target.KEY+".prototype";
            }else if(_.isArr(target))
                return "Array.prototype";
            else if(_.isDate(target))
                return "Date.prototype";
            else if(_.isReg(target))
                return "RegExp.prototype";
            else if(_.isNumb(target))
                return "Number.prototype";
            else if(_.isStr(target))
                return "String.prototype";
            else if(_.isBool(target))
                return "Boolean.prototype";
            else if(_.isFun(target))
                return "Function.prototype";
            else if(_.isObj(target)){
                return "Object.prototype";
            }
            // dont use _.isHash here
        },
        _findVars:function(profile, tonode, braceId){
            var cm=profile.$editor,
                arr=[];
            if(cm && tonode){
                var doc=cm.win.document,
                    isBr=function(elem){return elem.tagName=="BR" || elem.tagName=="br"},
                    isB=function(elem){return elem.tagName=="B" || elem.tagName=="b"},
                    elem=doc.body.firstChild,
                    scope="",
                    cls,txt,temp=[],cursor;

                cursor=arr;

                cursor.push(["this",""]);

                while((elem=elem.nextSibling) && elem!=tonode){
                    if(isB(elem) && elem._uid && elem.id.charAt(0)=='b'){
                        // if sibling {, jump to it's }
                        if(!braceId || braceId.indexOf(elem.id)!==0){
                            elem=doc.getElementById('e'+elem.id.slice(1));
                        }else{
                            scope=elem._uid;
                            // reset scope
                            _.arr.each(temp,function(o){
                                o[1]=scope;
                            });
                            arr = arr.concat(temp);
                        }
                        temp=[];
                        cursor=arr;
                    }

                    cls=elem.className;
                    txt=elem.currentText;

                    if(cls=='js-keyword' && txt=="function"){
                        
                        // find "function abc(){}"
                        while((elem=elem.nextSibling) && elem!=tonode && (isBr(elem)||elem.className=="whitespace"||elem.className=="js-comment"));
                        cls=elem.className;
                        txt=elem.currentText;
                        if(cls=='js-variabledef'){
                            cursor.push([txt,scope]);
                        }

                        // temp find
                        cursor=temp;
                        cursor.push(["this",scope]);
                    }

                    if(cls=='js-variabledef')
                        cursor.push([txt,scope]);
                }
            }
            return arr;
        },
        _findAssignments:function(profile, tonode, braceId){
            var $foldingMap = profile._$foldingMap,
                _this=this._this,
                cm=profile.$editor,
                hash={},
                scopevars={},
                elem;

            var arr2=[];

            if(cm && tonode){

                // collection vars
                _.arr.each(this._findVars(profile, tonode, braceId),function(o){
                    hash[o[0]]=o[1];
                    if(!scopevars[o[1]])scopevars[o[1]]=[];
                    scopevars[o[1]].push(o[0]);
                });

                // set global vars 
                _.arr.each(scopevars[""],function(o){
                    o=o=="this"?_this:o;
                    arr2.push({
                        key:o,
                        defkey:"var "+o,
                        scope:"",
                        id:"",
                        code:o==_this?"window":"undefined"
                    });
                });

                var win=cm.win,
                    doc=win.document,
                    isSpan=function(elem){return elem.tagName=="SPAN" || elem.tagName=="span"},
                    isBr=function(elem){return elem.tagName=="BR" || elem.tagName=="br"},
                    isB=function(elem){return elem.tagName=="B" || elem.tagName=="b"},

                    scopeStack=[],
                    currentScope="",
                    
                    handleScope=function(elem){
                        if(isB(elem)){
                            if(elem.id.charAt(0)=='b'){
                                scopeStack.push(currentScope=elem._uid);
                                // def all vars in this scope first
                                _.arr.each(scopevars[elem._uid],function(o){
                                    // replace this
                                    o=o=="this"?_this:o;
                                    arr2.push({
                                        key:o,
                                        defkey:"var "+o,
                                        scope:elem._uid,
                                        id:elem.id,
                                        code:"undefined"
                                    });
                                });
                            }else
                                currentScope=scopeStack.pop();
                        }
                        // continue
                        return true;
                    },
                    ignorePrevSpace=function(elem){
                        while(elem && elem!=doc.body.firstChild 
                              && (elem=elem.previousSibling)
                              && (isBr(elem)||elem.className=="whitespace"||elem.className=="js-comment") )
                        ;
                        return elem;
                    },
                    ignoreNextSpace=function(elem){
                        while(elem && elem!=tonode 
                            && (isBr(elem)||elem.className=="whitespace"||elem.className=="js-comment") 
                            && (elem=elem.nextSibling))
                        ;
                        return elem;
                    },
                    ignoreNextSpace2=function(elem){
                        while(elem && elem!=tonode 
                            && (elem.className=="whitespace"||elem.className=="js-comment") 
                            && (elem=elem.nextSibling) )
                        ;
                        return elem;
                    },
                    crossBrackets=function(elem, con, b, e){
                        var cls=elem.className,
                            txt=elem.currentText;
                        if((cls=='js-punctuation') && txt==b){
                            var deep1=0;
                            do{
                                if(isFun(elem)){
                                    elem=crossFunDef(elem);
                                    if(!elem ||  elem==tonode)break;
                                    con += "function(){}";
                                }

                                cls=elem.className;
                                txt=elem.currentText;

                                if(cls=='js-punctuation' && txt && txt.charAt(0)==b)
                                    deep1++;
                                if(cls=='js-punctuation' && txt && txt.charAt(0)==e)
                                    deep1--;

                                if(cls!=='js-comment' && txt)
                                    con += txt;
                            }while(handleScope(elem) && (elem=elem.nextSibling) && elem!=tonode && deep1!==0 )

                            elem=ignoreNextSpace2(elem);
                        }
                        return [elem,con];
                    },
                    crossFunDef=function(elem){
                        var oelem=elem;
                        if(isFun(elem)){
                            var found;
                            //find {
                            while((elem=elem.nextSibling) && elem && elem!=tonode){
                                if(isB(elem) && elem._uid){
                                    found=true;
                                    break;
                                }
                            }
                            // accross }
                            if(found && (!braceId || braceId.indexOf(elem.id)!==0)){
                                elem=doc.getElementById('e'+elem.id.slice(1));
                            }else{
                                elem=oelem;
                            }
                        }
                        return elem.nextSibling;
                    },
                    isEqual=function(elem){return isSpan(elem) && elem.className=='js-operator' && elem.currentText.charAt(0)=='='},
                    isFun=function(elem){return isSpan(elem) && elem.className=='js-keyword' && elem.currentText=='function'},
                    isDot=function(elem){return isSpan(elem) && elem.className=="js-punctuation" && elem.currentText && elem.currentText.charAt(0)=="."},
                    elem=doc.body.firstChild,
                    elemkeep,
                    temp,
                    cls,
                    txt,
                    code;

                elem=ignoreNextSpace(elem);
                if(elem && elem!=tonode){
                    while(handleScope(elem) && (elem=elem.nextSibling) && elem && elem!=tonode){
                        // find =
                        if(isEqual(elem)){
                            // keep the position
                            elemkeep=elem;
                            
                            elem=ignorePrevSpace(elem);
                            if(!elem ||  elem==tonode)break;

                            cls=elem.className;
                            txt=elem.currentText;
    
                            if((isSpan(elem) && (cls=='js-localvariable' || cls=='js-variabledef')) && _.isSet(hash[elem.currentText])){
                                arr2.push(
                                  code={
                                    key:txt,
                                    scope:currentScope,
                                    id:$foldingMap[currentScope] && $foldingMap[currentScope][0],
                                    code:'undefined'
                                });
    
                                // restore position
                                elem=elemkeep.nextSibling;
                                if(!elem ||  elem==tonode)break;

                                elem=ignoreNextSpace(elem);
                                if(!elem ||  elem==tonode)break;

                                if(isFun(elem)){
                                    code.code="function(){}";
                                    code.type="Function.prototype";
                                    elem=crossFunDef(elemkeep);
                                    if(!elem ||  elem==tonode)break;
                                }
                                else{
                                    cls=elem.className;
                                    txt=elem.currentText;
    
                                    var con="";
                                    do{
                                        handleScope(elem);
                                        
                                        temp=crossBrackets(elem, con, "(", ")");
                                        elem=temp[0];
                                        con=temp[1];
                                        
                                        temp=crossBrackets(elem, con, "[", "]");
                                        elem=temp[0];
                                        con=temp[1];
                                        
                                        if(isB(elem) && elem._uid && (!braceId || braceId.indexOf(elem.id)!==0)){
                                            temp=crossBrackets(elem, con, "{", "}");
                                            elem=temp[0];
                                            con=temp[1];
                                        }
                                        // if end
                                        if(!elem ||  elem==tonode){
                                            code.code=con;
                                            break;
                                        }

                                        cls=elem.className;
                                        txt=elem.currentText;
                                        // read to , ; } <br>
                                        if(cls=='js-punctuation' && (txt=='}'||txt==','||txt==';')){
                                            code.code=con;
                                            break;
                                        }else if(isBr(elem)){
                                            elem=ignoreNextSpace(elem);
                                            // if end
                                            if(!elem ||  elem==tonode){
                                                code.code=con;
                                                break;
                                            }

                                            if(isDot(elem))
                                                con += elem.currentText;
                                            else{
                                                code.code=con;
                                                break;
                                            }
                                        }else if(cls!=='js-comment'){
                                            con += txt;
                                        }
                                    }while((elem=elem.nextSibling)&& elem && elem!=tonode)
                                }
                            }else{
                                // restore position
                                elem=elemkeep;
                            }
                        }
                        else if(isFun(elem)){
                            elemkeep=elem;

                            elem = elem.nextSibling;
                            if(!elem ||  elem==tonode)break;

                            elem = ignoreNextSpace(elem);
                            if(!elem ||  elem==tonode)break;

                            cls=elem.className;
                            txt=elem.currentText;
    
                            if(cls=='js-variabledef'){
                               arr2.push({
                                    key:txt,
                                    code:"function(){}",
                                    type:"Function.prototype"
                               });
                            }
                            elem=crossFunDef(elemkeep);
                            if(!elem ||  elem==tonode)break;
                        }
                    }
                }
                return [hash,arr2];
            }
        },
        _this:'____this____',
        _getIntellisense:function(profile, context){
            var ns=this,
                _this=ns._this,
                type,obj,
                firstkey, keytag, scope,
                key=context.key,
                scopeId=context.scopeId,
                fromnode=context.toNode,
                isGlobal=context.isGlobal;

            if(scopeId&& scopeId.charAt(0)=='e'){
                scopeId='b'+scopeId.slice(1);
                arr=scopeId.split('_');
                arr.pop();
                scopeId=arr.join('_');
            }
            
            // get type
            if(key.indexOf('new ')==0){
                type='new';
            }else if(key.charAt(key.length-1)=='.'){
                type="properties";
                key=key.slice(0,-1);
            }else{
                if(key.indexOf('.')!=-1){
                    type="properties";
                    key = key.slice(0,key.lastIndexOf('.'));
                }else{
                    // return avialable var
                    type="var";
                }
            }
            if(type=="properties"){
                if(key.indexOf('(')!=-1){
                    type="function";
                }
            }

            var target,code,
                list=[],
                // object type string
                otype, 
                // object path string
                opath, 
                // object code string
                ocode, 
                // extra array
                oextra=[];
            switch(type){
                case 'new':
                    otype=type;
                    break;
                case "function":
                    type=ns._getFromFunctionExp(key);
                    if(type){
                        otype=type;
                        break;
                    }
                case "properties":
                    if(isGlobal && (key=='history'||key=='screen'||key=='parent'||key=='top'||key=='window'||key=='document'||key=="Math"||key=="Number"||key=="arguments"||key=="arguments.callee"))
                        otype=key;
                    else{
                        // try global first
                        if(isGlobal){
                            opath=key;
                            
                            var cached = _.get(profile._$customTypeCache, ["", key]);
                            if(cached){
                                if(cached.ocode)
                                    ocode=cached.ocode;
                                else
                                    otype=cached.type;
                            }
                            if(otype || ocode)
                                break;
                        }

                        // get object type from code
                        var found=this._findAssignments(profile, fromnode, scopeId);
                        if(!found)
                            break;
                            
                        var defMap=found[0],
                            codearr=found[1],
                            arr=key.split('.'),
                            objectType,
                            objectCode,
                            needeval=-1,
                            cached;

                        firstkey = arr[0]=="this"?_this:arr[0];
                        arr=arr.slice(1);
                        keytag = arr.join('.');

//console.log(codearr);
                        // try to get object type dir
                        for(var i=codearr.length-1; i>=0; i--){
                            if(codearr[i].key==firstkey){
                                scope = codearr[i].scope;

                                // get object type from cache
                                cached = _.get(profile._$customTypeCache, [scope, firstkey]);
                                // from cache
                                if(cached){
                                    objectType = cached.type;
                                    objectCode = cached.code;
                                }
                                // from direct code analysis
                                else if(codearr[i].type){
                                    objectType = codearr[i].type;
                                }
                                // redir or function pattern
                                else{
                                    var code = codearr[i].code.replace(/[\s]*$/g, '').replace(/^[\s]*/g, '');
                                    // refer to another variable directly
                                    if(defMap[code] && /^[a-zA-Z_$][\w_$]*$/.test(code)){
                                        firstkey=code=="this"?_this:code;
                                        continue;
                                    }else{
                                        // from function patterns
                                        objectType = ns._getFromFunctionExp(code);

                                        // need to eval
                                        if(!objectType)
                                            needeval=i;
                                    }
                                }
                                break;
                            }
                        }

                        if(objectType || objectCode){
                            // If it's a single word, use objectType directly
                            if(!keytag){
                                if(objectCode)
                                    ocode="(function(){try{\nreturn "+objectCode+";\n}catch(e){}})();";
                                else
                                    otype=objectType;
                            }
                            else{
                                // dont set otype here, only ocode exists
                                 if(objectType && /\.prototype$/.test(objectType))
                                    objectType = objectType.replace(/(.+)(\.prototype)$/, "new $1()");

                                 ocode = objectCode 
                                    ? ( "(function(){try{\n"+"return ("+objectCode+")."+keytag+";\n}catch(e){}})();\n" )
                                    : ( "(function(){try{\n"+"return ("+objectType+")."+keytag+";\n}catch(e){}})();\n" );
                            }
                        }else{
                            var co,result;
                            // try to analysis or run code to get object type
                            if(needeval!=-1){
                               codearr = codearr.slice(0, needeval+1);
                               
                               // 1. try single line
                               var scode=codearr[codearr.length-1].code, itype;
                               ocode="var a;\n"
                                +"a=(function(){try{\n"+"var " + firstkey + "=" + scode +";\n" + "return ("+firstkey+")"+(keytag?("."+keytag):"")+";\n}catch(e){}\n})();\n";

                               // 2. try relatived lines
                                co=[];
                               _.arr.each(codearr,function(o,i){
                                    if(o.key==firstkey || (new RegExp("\\b" + o.key + "\\b")).test(scode)){
                                        cached = _.get(profile._$customTypeCache, [o.scope, o.key]);
                                        if(cached){
                                            if(cached.type){
                                                itype=cached.type;
                                                if(/\.prototype$/.test(itype))
                                                   itype = itype.replace(/(.+)(\.prototype)$/, "new $1()");
                                            }
                                            if(!cached.code && !itype)
                                                cached=null;
                                        }
                                        co.push((o.defkey||o.key) + "=" + (cached ? (cached.code || itype): o.code)
                                                + ";");
                                        scode += " " + o.code;
                                    }
                               },null,true);
                               co.reverse();
                               ocode += "if(a===null||a===undefined)\na=(function(){try{\n"+co.join('\n')+"\nreturn ("+firstkey+")"+(keytag?("."+keytag):"")+";\n}catch(e){}\n})();\n";

                               // 3. try all code
                                co=[];
                               _.arr.each(codearr,function(o,i){
                                    cached = _.get(profile._$customTypeCache, [o.scope, o.key]);
                                    if(cached){
                                        if(cached.type){
                                            itype=cached.type;
                                            if(/\.prototype$/.test(itype))
                                               itype = itype.replace(/(.+)(\.prototype)$/, "new $1()");
                                        }
                                        if(!cached.code && !itype)
                                            cached=null;
                                    }
                                    co.push(
                                        o.defkey
                                        ? (o.defkey +"=" + (cached ? (cached.code || itype): o.code +";"))
                                        : ("try{" + o.key + "=" + o.code +"}catch(e){}")
                                    );
                               });
                               ocode += "if(a===null||a===undefined)\na=(function(){try{\n"+co.join('\n')+"\nreturn ("+firstkey+")"+(keytag?("."+keytag):"")+";\n}catch(e){}})();\n";
                               ocode += "a;";
                            }
                            else{
                                // try to take it as a type
                                otype=firstkey + (keytag?("."+keytag):"");
                            }
                        }
                    }
                    break;
                case "var":
                    otype=" variables ";

                    // add context vars
                    var arr,hash={};
                    if(scopeId && scopeId.charAt(0)=='e'){
                        scopeId='b'+scopeId.slice(1);
                        arr=scopeId.split('_');
                        arr.pop();
                        scopeId=arr.join('_');
                    }
                    _.arr.each(this._findVars(profile, fromnode, scopeId), function(o){
                        hash[o[0]]=o[1];
                    });
                    _.each(hash,function(o,i){
                        oextra.push(ns._buildItem(i,0,0,0,0,0,1,"font-weight:bold;color:#666;"));
                    });
                    break;
            }
            // from extra array
            if(oextra && oextra.length){
                Array.prototype.push.apply(list, oextra);
            }
            // and, "from opath"
            if(opath){
                var target=_.get(window, opath.split("."));
                if(_.isSet(target)){
                    // set otype here from target
                    if(!otype)
                        otype=ns._getFromObject(target);
                    // get inner
                    Array.prototype.push.apply(list, ns._enumKeys(target, opath, true, true));
                }
            }
            // then "from code"
            if(ocode){
                result = ns.evalInSandbox(ocode.replace(/\bthis\b/g,_this));
                if(_.isSet(result.ok)){
                    // if result.type exists, igonre result.ok
                    if(result.type)
                        otype=result.type;
                    else{
                        otype = ns._getFromObject(result.ok);
                        Array.prototype.push.apply(list, ns._enumKeys(result.ok, otype, true, true));
                    }
                }
            }
            // the last one is "from type"
            if(otype){
                Array.prototype.push.apply(list, ns._getIntellisenseList(otype));
            }

            if(list.length){
                list = _.arr.removeDuplicate(list, 'id');

                list.sort(function(x,y){
                    return x.tag>y.tag?1:x.tag==y.tag?0:-1;
                });
            }

            return [otype, list, key, scope];
        },
        _reLoadEditor:function(profile){
            var ns=this,
                _this=ns._this;

            // if exists
            if(profile.$codemirror){
                linb(profile.$codemirror.wrapping).remove();
                delete profile.$codemirror;
                delete profile.$editor;
            }

            // uid serial
            var $uidSerial = 1,
                $bidSerial = 1;
//console.log("_reLoadEditor");
            // folding map "u1"=>["b:1_1_1", 12/*line number*/, 12/* hidden lines number*/]
            var $foldingMap = profile._$foldingMap = {},
                $bracesList = profile._$bracesList = [],
                $brList = profile._$brList = [],
                $customTypeCache  = profile._$customTypeCache =  {},
                $linesMap = profile._$linesMap = {};

            // is suggestion window showed
            var $suggestionShowed=false,
                $suggestionBaseNode=null,
                $sugMode,
                showSuggetionID="CodeEditor.showSuggetion.resetRun",
                adjustSuggetionID="CodeEditor.adjustSuggetion.resetRun",
                $currentText="",
                $inputDotChar,
                $prepareShowDotSug,
                $prepareShowTextSug,

                // suggestion window for
                $activeWord,
                $activeScope;

            var clsNormal="CodeMirror-line",
                clsFold="CodeMirror-line-fold",
                clsExp="CodeMirror-line-expand",
                clsHide="CodeMirror-line-hide";

            var isSpan=function(elem){return elem.tagName=="SPAN" || elem.tagName=="span"},
                isB=function(elem){return elem.tagName=="B" || elem.tagName=="b"},
                isBr=function(elem){return elem.tagName=="BR" || elem.tagName=="br"},
                isWhitespace=function(elem){return isSpan(elem) && elem.className=="whitespace"},
                isDot=function(elem){return isSpan(elem) && elem.className=="js-punctuation" && elem.currentText && elem.currentText.charAt(0)=="."};

            // route all brances nodes, find out and mark all braces
            var marksBracesInDoc=function(editor){
                var elem,cls,txt,ch,scopid='',id,
                    deep=0,
                    stack=[],
                    uidstack=[],
                    code=[],
                    doc=editor.doc,
                    all=doc.getElementsByTagName('b'),
                    dirtied=false,
                    changed,
                    rtn=false;

                //[[ filter removed ones
                var removed={};
                _.filter($foldingMap,function(o,i){
                    e = !!doc.getElementById('b:'+o[0]);
                    // collect removed one
                    if(!e){
                        if(!changed)changed=1;
                        removed[i]=1;
                    }
                    return e;
                });

                dirtied=!_.isEmpty(removed);
                if(dirtied){
                    // keep syn
                    _.filter($bracesList,function(o){
                        return !removed[o];
                    });
                    // keep syn
                    _.filter($customTypeCache,function(o,i){
                        return !removed[i];
                    });    
                }else{
                    // [[ check valid
                    for(var i=0;elem=all[i];i++){
                        txt=elem.currentText;
                        cls=elem.className;
                        if(!cls || !txt){
                            elem=null;
                            return false;
                        }
    
                        if((ch=txt.charAt(0))=="{"){
                            if(!elem._uid || !elem.id)
                                dirtied=true;
                            deep++;
                        }
                        else if(ch=="}"){
                            if(!elem._uid || !elem.id)
                                dirtied=true;
                            deep--;
                        }
    
                        if(deep<0){
                            elem=null;
                            return false;
                        }
                    }
                    if(deep!=0){
                        elem=null;
                        return false;
                    }
                    // ]]
                }
                //]]

                if(dirtied){
                    // reset
                    $bracesList=profile._$bracesList =[];
                    // give id to {}
                    for(var i=0;elem=all[i];i++){
                        txt=elem.currentText;
                        cls=elem.className;
                        if((ch=txt.charAt(0))=="{"){
                            deep++;
                            if(code.length<deep) code.push(0);
                            code[deep-1]++;
                            id=code.slice(0,deep).join('_');
                            stack.push(scopid=id);

                            // [[ for { only
                            if(!elem._uid) elem._uid='u'+($uidSerial++);

                            // it's a new one
                            if(!$foldingMap[elem._uid]){
                                // {'s dom id, <br>'s _uid, line number, hidden lines' size
                                $foldingMap[elem._uid]=[id,0,0,0];
                            }
                            // reset id
                            else{
                                $foldingMap[elem._uid][0]=id;
                            }
                            $bracesList.push(elem._uid);
                            uidstack.push(elem._uid);
                            // ]]

                            id='b:'+id;
                            if(elem.id!=id) elem.id=id;

                        }else if(ch=="}"){
                            code[deep]=0;
                            deep--;

                            if(deep<0)
                                break;
                            id=stack.pop();

                            scopid=stack.length?stack[stack.length-1]:"";

                            id='e:'+id;
                            if(elem.id!=id) elem.id=id;

                            // keep a _uid back
                            elem._uid=uidstack.pop();
                        }
                    }
                    elem=null;

                    if(profile.onBlockChanged)
                        profile.boxing().onBlockChanged(profile, $foldingMap);

                    rtn = true;
                }

                return rtn;
            };
            // reset folding mark on line number div
            var resetFoldingMark=function(codemirror){
                var win=codemirror.win,
                    scroller=codemirror.lineNumbers.firstChild,
                    doc=win.document;

                // show line numbers
                var refreshLineNumbers=function(dirtyfrom){
                    var cld=scroller.children || scroller.childNodes,
                        l=cld.length+1,
                        conf,elem,uid;
                    if(dirtyfrom<0)dirtyfrom=0;
                    for(var i=dirtyfrom;i<l-2;i++){
                        if($linesMap[i]){
                            conf=$linesMap[i];
                            elem=doc.getElementById('e:'+conf[0]);
                            while(elem && !isBr(elem) &&(elem=elem.previousSibling));
                            if(elem && elem._uid!==conf[1]){
                                if(elem.previousSibling)
                                    elem=elem.previousSibling;
                                while(elem && !isBr(elem) &&(elem=elem.previousSibling));
                                if((elem&&elem._uid)!==conf[1]){
                                    // add _uid to refer {
                                    if(cld[i]._uid!=conf[0])
                                        cld[i]._uid=conf[0];
                                    // add onclick event
                                    if(!cld[i].onclick)
                                        cld[i].onclick=onclickFun;
        
                                    if(conf[3]){
                                        // show fold face
                                        if(cld[i].className!=clsFold)
                                            cld[i].className=clsFold;
                                         // hide those nodes
                                         for(j=0;j<conf[3];j++){
                                            i++;
                                            cld[i].className=clsHide;
                                         }
                                    }else{
                                        // show expand face
                                        if(cld[i].className!=clsExp)
                                            cld[i].className=clsExp;
                                    }
                                    continue;
                                }
                            }
                        }
                        // show normal face
                        if(cld[i].className!=clsNormal)
                            cld[i].className=clsNormal;
                        // clear data
                        cld[i]._uid=cld[i].onclick=null;
                    }
                };

                // onclick event: fold /expand
                var onclickFun=function(){
                    var uid=this._uid;
                    if(!uid)return;
var t1=_();
                    // if click for expand or fold
                    if(this.className==clsFold || this.className==clsExp){
                        // to expand
                        var expandAction=this.className==clsFold,
                            elem1=doc.getElementById('b:'+uid),
                            elem2=doc.getElementById('e:'+uid),
                            subelem1,subelem2,
                            uidi=elem1._uid,
                            subuidi,
                            baseNode,
                            count=0,
                            nodes=[];
                        if(elem1 && elem2){
                            // go to last node
                            while(elem1 && !isBr(elem1)){
                                elem1 = elem1.nextSibling;
                                // in same line
                                if(elem1==elem2)return;
                            }
                            // go to first node - br
                            while(elem2 && !isBr(elem2))
                                elem2 = elem2.previousSibling;
                            // only one  <br> between elem1 and elem2
                            if(elem1==elem2)return;

                            // ini sub vars
                            subelem1=subelem2=null;
                            while((elem1=elem1.nextSibling)){
                                if(isBr(elem1))count++;

                                // [[ for those hidden sub braces
                                if(isB(elem1) && elem1._uid){
                                    if($foldingMap[elem1._uid] && $foldingMap[elem1._uid][3]){
                                        subelem1=doc.getElementById('b:'+$foldingMap[elem1._uid][0]);
                                        subelem2=doc.getElementById('e:'+$foldingMap[elem1._uid][0]);

                                        subuidi=subelem1._uid;

                                        if(subelem1 && subelem2){
                                            // go to last node
                                            while(subelem1 && !isBr(subelem1))
                                                subelem1 = subelem1.nextSibling;
                                            // go to first node - br
                                            while(subelem2 && !isBr(subelem2))
                                                subelem2 = subelem2.previousSibling;
                                        }
                                    }
                                }
                                // ]]

                                // do hide or show
                                nodes.push(elem1);

                                // if sub brace is fold ,ignore those node's styles setting
                                if(elem1==subelem1){
                                    elem1=subelem2;
                                    // Add sub braces's hidden lines
                                    count += $foldingMap[subuidi][3];
                                }

                                if(elem1==elem2){
                                    baseNode=elem1.nextSibling;
                                    break;
                                }
                            }
                            // change hide lines number
                            $foldingMap[uidi][3]=expandAction?0:count;

                            // [[ for modify style
                            doc.body.style.display='none';
                            for(var i=0,n; n=nodes[i]; i++)
                                n.style.display=expandAction?'':'none';
                            doc.body.style.display='';
                            // ]]

                            // call resetFoldingMark again
                            refreshLineNumbers(0);
                        }
                        elem1=elem2=subelem1=subelem2=null;
                    }
//console.log('onclickFun',_()-t1);
                };

                // [[ recaculate {'s line
                var br,temp,elem1,elem2,
                    brdirtied={},
                    dirtyfrom=null,
                    brs = doc.getElementsByTagName('br');

                // ensure each <br> has a_uid
                var allbrs={},prevAdded=false,brList=[];
                for(var i=0;br=brs[i];i++){
                    if(!br._uid){
                        br._uid='b'+($bidSerial++);
                        // add to dirty map
                        brdirtied[br._uid]=1;
                        // add prev one to dirty map
                        if(i>0 && !prevAdded){
                            prevAdded=true;
                            brdirtied[brs[i-1]._uid]=1;
                        }
                    }
                    allbrs[br._uid]=1;

                    // If  new <br> added or delected
                    // begin mark dirty(doesnt include the first line)
                    if(dirtyfrom===null && $brList[i]!=br._uid)
                        dirtyfrom=Math.max(i-1,0);
                     brList.push(br._uid);
                }
                $brList=profile._$brList = brList;


                // find out each { 's prvious <br> 's _uid
                _.arr.each($bracesList,function(uid,i){
                    temp=$foldingMap[uid];
                    // if cant find a <br> matched(no <br> and not first line)
                    // or <br> mataced is dirty
                    // or <br> was deleted
                    if((temp[2] && !temp[1]) || brdirtied[temp[1]] || !allbrs[temp[1]]){
                        elem1=doc.getElementById('b:'+temp[0]);
                        // until to find the prev <br>, or to the top of document
                        while(elem1 && !isBr(elem1))
                            elem1 = elem1.previousSibling;

                        // if { is in the first line, set it to null
                        if(!elem1){
                            temp[1]=null;
                            // mark dirty from the first line
                            dirtyfrom=0;
                        // if not the first line, set to <br> 's _uid
                        }else{
                            temp[1]=elem1._uid;
                            // if no dirty mark, new {} must be added
                            if(dirtyfrom===null){
                                dirtyfrom=_.arr.indexOf(brs, elem1);
                            }
                        }
                    }
                });


                // if no dirty mark , return 
                if(dirtyfrom!==null){
                    $linesMap=profile._$linesMap = {};

                    // prepare each } =>  <br> list
                    var listBrForBrace=[],
                    // keep size
                        size=$bracesList.length;
                    for(var i=0,uid; uid=$bracesList[i]; i++)
                        listBrForBrace.push($foldingMap[uid][1]);

                    // if the first line has {
                    if(listBrForBrace[0]===null){
                        // set first line's number
                        ($linesMap[0]=$foldingMap[$bracesList[0]])[2]=0;
                        // ignore this {
                        listBrForBrace=listBrForBrace.slice(1);
                    }
                    listBrForBrace.reverse();

                    // loop <br> from the first one, recaculate each {'s line number
                    var len;
                    for(var i=0;br=brs[i];i++){
                        while(listBrForBrace[listBrForBrace.length-1]==br._uid){
                            len=size-listBrForBrace.length;
                            ($linesMap[i+1]=$foldingMap[$bracesList[len]])[2]=i+1;
                            listBrForBrace.pop();
                        }
                    }
                    // ]]
//console.log($bracesList, $foldingMap, dirtyfrom, $linesMap);
                    // show each line's number
                    refreshLineNumbers(dirtyfrom);
                    
                    if(profile.onLinesChange)
                        profile.boxing().onLinesChange(profile, $foldingMap);
                }
            };
            // trigger suggestion window
            var getSuggestionInfo=function(elem){
                var reg=/\s/g,
                    cls,txt,
                    arr=[],
                    id,
                    isGlobal;

                var extxt="";
                var topelem=elem;
                // find key text
                if(!isDot(elem)){
                    if(!isBr(elem))
                        extxt=elem.currentText;
                    elem=elem.previousSibling;
                }
                if(elem && isDot(elem)){
                    do{
                        if(isDot(elem)){
                            // ignore space and <br>
                            while(elem=elem.previousSibling){
                                cls=elem.className;
                                txt=elem.currentText;
                                if(!(isBr(elem) || cls=="whitespace" || cls=="js-comment"))
                                    break;
                            }
                            if(elem){
                                cls=elem.className;
                                txt=elem.currentText;
                                // for (xxx)
                                var con1="";
                                if(cls=='js-punctuation' && txt && txt.charAt(0)==")"){
                                    var deep1=0;
                                    do{
                                        cls=elem.className;
                                        txt=elem.currentText;
                                        if(cls=='js-punctuation' && txt && txt.charAt(0)==")")
                                            deep1++;
                                        if(cls=='js-punctuation' && txt && txt.charAt(0)=="(")
                                            deep1--;
                                        if(txt)
                                            con1 = txt+con1;
                                    }while((elem=elem.previousSibling) && deep1!==0)

                                }
                                if(elem){
                                    topelem=elem;
                                    cls=elem.className;
                                    txt=elem.currentText;
                                    if(cls=="js-property" || cls=='js-localvariable' || cls=='js-variable'|| cls=='js-linbglobal'){
                                        arr.push(txt.replace(reg,'') + con1);
                                        // the first key is global?
                                        if(cls=='js-variable'|| cls=='js-linbglobal')
                                            isGlobal=true;
                                        elem=elem.previousSibling;
                                    }else{
                                        arr.push(con1);
                                    }
                                }
                            }
                        }else{
                            break;
                        }
                    }while(elem&& elem.previousSibling)
                }else if(elem && isSpan(elem)
                        && ((elem.className=='js-keyword' && elem.currentText=='new')
                        || (elem.className=='whitespace' && elem.previousSibling.className=='js-keyword' && elem.previousSibling.currentText=='new'))){
                    extxt = "new " + extxt;
                }


                // find in which function
                while(elem && (elem=elem.previousSibling)){
                    if(isB(elem) && elem.id){
                        id=elem.id;
                        break;
                    }
                }
                return {
                        key:(arr.length?(arr.reverse().join('.')+'.'):"")+extxt,
                        scopeId:id,
                        toNode:topelem,
                        isGlobal:isGlobal
                    };
            };

            var iniComponents=function(){
                // [[code created by jsLinb UI Builder
                var host=this, children=[], append=function(child){children.push(child.get(0))};
                
                append(
                    (new linb.UI.Pane)
                    .setHost(host,"$popList")
                    .setLeft(10)
                    .setTop(10)
                    .setWidth(300)
                    .setHeight(180)
                );
                
                host.$popList.append(
                    (new linb.UI.List)
                    .setHost(host,"$lstsug")
                    .setTheme("codemirror")
                    .setDirtyMark(false)
                    .setTop(18)
                    .setWidth(300)
                    .setHeight(162)
                    .setDisableHoverEffect(true)
                );
                
                host.$popList.append(
                    (new linb.UI.Block)
                    .setHost(host,"block1")
                    .setLeft(0)
                    .setTop(0)
                    .setWidth(300)
                    .setHeight(20)
                    .setBorderType("flat")
                );
                
                host.block1.append(
                    (new linb.UI.SLabel)
                    .setHost(host,"$objType")
                    .setLeft(6)
                    .setTop(2)
                    .setWidth(252)
                    .setCaption("")
                    .setHAlign("left")
                    .setCustomStyle({KEY:'font-weight:bold;'})
                );
                
                host.block1.append(
                    (new linb.UI.Link)
                    .setHost(host,"$linkSel")
                    .setLeft('auto')
                    .setRight(2)
                    .setTop(1)
                    .setCaption("$VisualJS.JSEditor.specifytype")
                );
                
                append(
                    (new linb.UI.Block)
                    .setHost(host,"$popHelp")
                    .setLeft(410)
                    .setTop(10)
                    .setWidth(300)
                    .setHeight(180)
                    .setBorderType("flat")
                    .setBackground("#FFF8DC")
                );
                
                host.$popHelp.append(
                    (new linb.UI.Div)
                    .setHost(host,"$divhelp")
                    .setTheme("codemirror")
                    .setLeft(-1)
                    .setTop(19)
                    .setWidth(292)
                    .setHeight(152)
                    .setCustomStyle({"KEY":"overflow:auto; padding:4px;"})
                );
                
                host.$popHelp.append(
                    (new linb.UI.Block)
                    .setHost(host,"block3")
                    .setLeft(-1)
                    .setTop(-1)
                    .setWidth(300)
                    .setHeight(20)
                    .setBorderType("flat")
                );
                
                host.block3.append(
                    (new linb.UI.Link)
                    .setHost(host,"$linkAPI")
                    .setLeft('auto')
                    .setRight(2)
                    .setTop(1)
                    .setCaption("$VisualJS.JSEditor.clickapi")
                );
                
                host.block3.append(
                    (new linb.UI.SLabel)
                    .setHost(host,"$lblTips")
                    .setLeft(6)
                    .setTop(2)
                    .setWidth(133)
                    .setCaption("")
                    .setHAlign("left")
                );
                
                return children;

                // ]]code created by jsLinb UI Builder
            };
            
            // show suggestion
            var showSuggestion=function(key, elem, force){
                $prepareShowTextSug=false;
                $prepareShowDotSug=false;

                var doc=elem.ownerDocument,
                    win=profile.$codemirror.win;

                var offset=profile.getRoot().offset();
                var left=elem.offsetLeft + (parseInt(profile.$codemirror.wrapping.style.marginLeft)||0) + 6 
                        - (win.pageXOffset || Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft))
                        + offset.left,
                    top=elem.offsetTop 
                        - (win.pageYOffset || Math.max(doc.documentElement.scrollTop, doc.body.scrollTop))
                        + offset.top;
                if(!profile.$popList){
                    iniComponents.call(profile);
                    linb('body').append(profile.$popList.setDisplay('none'));
                    linb('body').append(profile.$popHelp.setDisplay('none'));
                    
                    profile.$divhelp.getRoot().setSelectable(true);
                    
                    profile.$linkAPI.onClick(function(p){
                        window.open(CONF.path_apidir+'#'+p.properties.tag);
                    });
                    var out=true,
                        tryToClose=function(){
                            _.resetRun("codemirror:aaa",function(){
                                if(out && profile.$popCustom){
                                    profile.$popCustom.setDisplay('none');
                                }
                            });
                        };
                    profile.$linkSel.beforeHoverEffect(function(p,i,e,src,type){
                        var pop;
                        if(type=='mouseover'){
                            out=false;
                            var list = profile.box._getIntellisenseList("new");
                            if(!(pop=profile.$popCustom)){
                                pop = profile.$popCustom = new linb.UI.List;
                                pop.setItems(list)
                                   .setWidth(160)
                                   .setDirtyMark(false)
                                   .setDisplay('none')
                                   .setSelMode('none')
                                   .setTheme("codemirror")
                                   .onItemSelected(function(prf,item){
                                    
                                        // cache only on layer for inner variable
                                        // dont cache global varible*/
                                        if($activeScope && $activeWord.indexOf('.')==-1){
                                            // root is ""
                                            _.set($customTypeCache, [$activeScope||"", 
                                                // replace this
                                                $activeWord=="this"?_this:$activeWord
                                            ], {
                                                type:item.id + ".prototype"
                                            });
                                        }
                                        

                                        var items=profile.box._getIntellisenseList(item.id + ".prototype");
                                        if(items && items.length){
                                            profile.$lstsug.setItems(items);
                                            profile.$lstsug.fireItemClickEvent(items[0].id);
                                            profile.$editor.focus();
                                        }
                                        pop.setDisplay('none');
                                    });
                                linb('body').append(pop);
                            }
                            pop.getRoot().popToTop(linb(src))
                                .onMouseover(function(){
                                    out=false;
                                })
                                .onMouseout(function(){
                                    out=true;
                                    tryToClose();
                                });
                            pop.setDisplay('');
                        }else{
                            out=true;
                            tryToClose();
                        }
                    });
                    
                    profile.$lstsug.afterUIValueSet(function(profile,ov,v){
                        showTips2(profile.getItemByItemId(v));
                    })
                    .onDblclick(function(profile,item){
                        applySuggestion(item.value||item.caption);
                        hideSuggestion();
                    });
                }

                // get intellisense
                var rtn = profile.box._getIntellisense(profile, key),
                    keyword=rtn[0],
                    list=rtn[1]
                    ;

                if((list && list.length)|| force){
                    $suggestionBaseNode=elem;
                    $suggestionShowed=true;
                    if(list && list.length){
                        profile.$lstsug.setItems(list);
                    }
                    var fun=function(){
                        hideSuggestion();
                    },
                    group=linb([profile.$popList.getRootNode(), profile.$codemirror.wrapping]);
                    
                    profile.$popList.getRoot().popToTop({region:{
                        left:left,
                        top:top,
                        width:2,
                        height:16
                    }},1)
                    .setBlurTrigger(showSuggetionID,fun,group);
                    linb.Event.keyboardHook('esc',0,0,0,fun);

                    profile.$popList.setDisplay('');
                    
                    $activeWord=rtn[2]||null;
                    $activeScope=rtn[3]||null;
                    
                    if(list && list.length){
                        adjustSuggetion(elem);
                    }
                }

                profile.$objType.setCaption(keyword||"none");
            };
            // hide suggestion
            var hideSuggestion=function(){
                linb.Event.keyboardHook('esc',0,0,0);
                
                $prepareShowTextSug=false;
                $prepareShowDotSug=false;

                _.resetRun(showSuggetionID);

                $suggestionBaseNode=null;
                $suggestionShowed=false;
                $sugMode=null;

                if(profile.$popList){
                    profile.$objType.setCaption('');
                    profile.$lstsug.setItems([]).setUIValue(null);                    
                    profile.$popList.setDisplay('none');

                    profile.$lblTips.setCaption('');
                    profile.$divhelp.setHtml("");
                    profile.$popHelp.setDisplay('none');
                    
                    if(profile.$popCustom)
                        profile.$popCustom.setDisplay('none');
                    
                    $currentText=null;
                }
            };
            // adjust suggestion
            var adjustSuggetion=function(node, extxt){
                var prf=profile.$lstsug.get(0),
                    items=prf.properties.items;

                _.resetRun(adjustSuggetionID, function(){
                    var fid;
                    if(node && node.parentNode){
                        var txt=(node.firstChild ? node.firstChild.nodeValue: (node.nodeValue || node.innerHTML)).replace(/[^\w_$]/g,'');
                        if(extxt)txt+=extxt;
                        if(!_.isSet($currentText) || txt!==$currentText){
                            $currentText=txt;
                            _.arr.each(items,function(item){
                                if(_.str.startWith(item.id.toLowerCase(), $currentText.toLowerCase())){
                                    fid=item.id;
                                    return false;
                                }
                            });
                        }
                    }
                    if(!prf.properties.$UIvalue && !fid && prf.properties.items && prf.properties.items.length)
                        fid=prf.properties.items[0].id;
                    if(fid)
                        prf.boxing().setUIValue(fid);
                },100);
            };
            
            var showTips=function(key, str){
                if(!profile.$popHelp)return;
                if(profile.$popList.getDisplay()!='none'){
                    profile.$linkAPI.setTag(key);
                    profile.$lblTips.setCaption(key);

                    profile.$divhelp.setHtml(str);
                    profile.$popHelp.getRoot().popToTop(profile.$popList.getRoot(),2)
                    profile.$popHelp.setDisplay('');
                }
            };
            var hideTips=function(key, str){
                if(!profile.$popHelp)return;

                profile.$linkAPI.setTag(null);
                profile.$lblTips.setCaption("");
                profile.$divhelp.setHtml("");
                profile.$popHelp.setDisplay("none");
            };
            // show tips
            var showTips1=function(elem){
                if(!profile.$popHelp)return;
                var key=getSuggestionInfo(elem);
                var str = profile.onGetHelpInfo &&  profile.boxing().onGetHelpInfo(profile, key.key);
//                if(!str)
//                    str=key.key;
                if(str){
                    showTips(key.key,str);
                }else{
                    hideTips();
                }
            };
            var showTips2=function(item){
                if(!profile.$popHelp)return;
                if(!item)return;
                var str = profile.onGetHelpInfo &&  profile.boxing().onGetHelpInfo(profile, item.path);
//                if(!str)
//                   str=item.path;
                if(str){
                    showTips(item.path,str);
                }else{
                    hideTips();
                }
            };
            // show Intellisense  from dot
            var showSugFromDot=function(elem){
                $prepareShowDotSug=true;

                _.resetRun(showSuggetionID,function(){
                    $inputDotChar=false;
                    var key=getSuggestionInfo(elem);

                    if(!key){
                        hideSuggestion();
                    }

                    showSuggestion(key,elem, true);
                    $sugMode='dot';
                });
            };
            // show suggestion from text
            var showSugFromText=function(elem, propOnly){
                if(isBr(elem) 
                    || elem.className=='js-string' 
                    || elem.className=='js-regexp'
                    || elem.className=='js-keyword'
                    || elem.className=='js-comment')
                    return;

                $prepareShowTextSug=true;

                _.resetRun(showSuggetionID,function(){
                    var key=getSuggestionInfo(elem);
                    if(!key){
                        hideSuggestion();
                        return;
                    }
                    if(propOnly && key.key.indexOf('.')==-1){
                        hideSuggestion();
                        return;
                    }
                    //if(elem && elem.previousSibling && isDot(elem.previousSibling)){
                    //    $sugMode='dot';
                     //   showSuggestion(key,elem.previousSibling);
                    //}else{
                        $sugMode='txt';
                        showSuggestion(key,elem);
                    //}
                });
            };
            // apply suggestion to code
            var applySuggestion=function(value){
                var editor=profile.$codemirror;
                var node=editor.win.select.selectionTopNode(editor.editor.container,true);

                var te=node, length,space="";
                while(!isBr(te) && (te=te.previousSibling));
                te=te.nextSibling;
                if(te.className=="whitespace"){
                    length=te.currentText.length;
                    space=_.str.repeat(' ',length);
                }

                if(!isDot(node)){
                    editor.selectLines(node.previousSibling,0,node,0);
                    // alway used after selectioin
                    if(linb.browser.ie)
                        delete editor.editor.selectionSnapshot;
                }

                editor.replaceSelection(value.replace(/\n/g, "\n"+space));
            };

            profile.$initialized=false;
            var codeType=profile.properties.codeType;
            // load codemirror
            var options={
                height:'100%',
                indentUnit:4,
                tabMode:'shift',
                
                path: "codemirror/",

                stylesheet:  
codeType=='js'?["codemirror/css/jscolors.css"]
:codeType=='css'?["codemirror/css/csscolors.css"]
:codeType=='php'?["codemirror/css/xmlcolors.css", "codemirror/css/jscolors.css", "codemirror/css/csscolors.css", "codemirror/contrib/php/css/phpcolors.css"]
:codeType=='html'?["codemirror/css/xmlcolors.css", "codemirror/css/jscolors.css", "codemirror/css/csscolors.css"]
:["codemirror/css/dummy.css"],

                lineNumbers:true,
                lineNumberDelay:100,
                lineNumberTime:300,
                passDelay:100,
                passTime:300,

                textWrapping:false,

                readonly:false,

                initCallback:function(editor){

                    if(profile.properties.$UIvalue)
                        editor.setCode(profile.properties.$UIvalue);
                    
                    // set to profile
                    profile.$editor=editor;
                    if(codeType=='js'||codeType=='html'){
                        editor.grabKeys(function(e){
                            linb.Event.stopBubble(e);
                        },function(keyCode, e){
                            var k=linb.Event.getKey(e);

                            if($suggestionShowed){
                                if(k.type=='keydown'){
                                    var list = profile.$lstsug,
                                        items = list.get(0).properties.items,
                                        length=items.length,
                                        value = list.getUIValue(),
                                        index = _.arr.subIndexOf(items, 'id', value);
    
                                    switch(k.key){
                                        case 'esc':
                                            hideSuggestion();
                                            return true;
                                        case 'down':
                                            if(linb.browser.opr && $suggestionBaseNode){
                                                _.asyRun(function(){
                                                    editor.selectLines($suggestionBaseNode.previousSibling,1);
                                                });
                                            }
                                            index++;
                                            if(index>length-1)index=0;
                                            if(items[index])
                                                list.setUIValue(items[index].id);
                                            return true;
                                        case 'up':
                                            if(linb.browser.opr && $suggestionBaseNode){
                                                _.asyRun(function(){
                                                    editor.selectLines($suggestionBaseNode.previousSibling,1);
                                                });
                                            }
                                            index--;
                                            if(index<0)index=length-1;
                                            if(items[index])
                                                list.setUIValue(items[index].id);
                                            return true;
                                        case 'enter':
                                            if(items[index])
                                                applySuggestion(items[index].value||items[index].caption);
                                            hideSuggestion();
                                            return true;
                                    }
                                }
                            }
                            // prevent default action
                            if(k.ctrlKey && (k.key==']'||k.key=='['))
                                return k.type=='keypress';
    
                            // add 4 spaces
                            if(k.type=='keydown' && k.key=='tab'){
                                if(!editor.selection()){
                                    editor.win.select.insertTabAtCursor(editor.win);
                                    return true;
                                }
                            }
    
                            // for avoid code suggestion
                            if(!(k.key.length==1 && k.ctrlKey)){
                                editor.editor.$keyInput=k.key;
                            }
    
                            $inputDotChar=(k.type=='keypress' && k.key=='.');

                            if(k.key=='1' && k.altKey){
                                var node = editor.win.select.selectionTopNode(editor.editor.container,true),
                                    nextNode;
                                if(node){
                                    if(isDot(node))
                                        showSugFromDot(node);
                                    else{
                                        editor.selectLines(node.previousSibling,0,node,0);
                                        showSugFromText(node);
                                    }
                                }
                            }
    
                            // fix: if you click '.' when select ".asdasdf", activeTokens will not be fired
                            if(k.type=='keydown' && k.key=='.'){
                                var txt=editor.selection();
                                if(txt && txt.charAt(0)=='.')
                                    editor.replaceSelection('');
                            }
    
                            // help to catch '.'
                            return false;
                        });
                    }
                },
                onRendered:function(editor, finished){
                    if(finished && (codeType=='js'||codeType=='html')){
                        editor.$keyInput=null;

                        // trigger those function
                        marksBracesInDoc(editor);
                        // use resetFoldingMark only brances is dirtied
                        resetFoldingMark(profile.$codemirror);
                    }
                    // fire onValueChanged Event
                    if(profile.onRendered){
                        profile.boxing().onRendered(profile, finished);
                        
                        if(finished && !profile.$initialized)
                            profile.$initialized=true;
                    }
                },
                onChange:function(){
                    // fire onValueChanged Event
                    if(profile.$initialized && profile.onValueChanged)
                        profile.boxing().onValueChanged(profile);
                },
                onDblclick:function(start ,end){
                    if(codeType=='js'){
                        while( (isBr(start) || isWhitespace(start) || /[^\w_]/.test(start.currentText)) 
                            && (start!=end) 
                            && (start=start.nextSibling));

                        if(!isBr(start) && !isWhitespace(start) && start.currentText)
                            showSugFromText(start, true);
                    }
                },
                onBlur:function(){
                    // hideSuggestion();
                },
                cursorActivity:function(node){
                    if(codeType!='js'&&codeType!='html')return;
                    
                    var id;
//console.log(node);
                    // quick auto match {}
                    if(id = (isB(node) && node._uid && node.id)){
                        var hnode;
                        if(id.charAt(0)=='b')
                            hnode=node.ownerDocument.getElementById('e'+id.slice(1));
                        if(id.charAt(0)=='e')
                            hnode=node.ownerDocument.getElementById('b'+id.slice(1));
                        if(hnode){
                            node.style.fontWeight = 'bold';
                            node.style.color = '#8F8';
                            hnode.style.fontWeight = 'bold';
                            hnode.style.color = '#8F8';
                            _.asyRun(function(){
                                node.style.fontWeight = '';
                                node.style.color = '';
                                hnode.style.fontWeight = '';
                                hnode.style.color = '';
                            },300);
                        }
                    }


                    if($suggestionShowed){
                        var ki = profile.$editor.editor.$keyInput;
                        if(ki=='down'||ki=='up')return ;

                        var inSug=false;
                        
                        var extxt='';
                        if(node.nodeType==3){
                            extxt=node.nodeValue;
                            node=node.previousSibling;
                        }
                        
                        // delete the
                        if(node==$suggestionBaseNode){
                            // span is empty indicates that "." was deleted
                            if(isSpan(node) && node.innerHTML)
                                inSug=true;
                        }else if(node.previousSibling==$suggestionBaseNode && isDot($suggestionBaseNode)){
                            // span is empty indicates that property was deleted
                            if(isSpan(node.previousSibling) && node.previousSibling.innerHTML)
                                inSug=true;
                        }

                        if(inSug){
                            adjustSuggetion(node, extxt);
                        }else{
                            // hide suggestion
                            hideSuggestion();
                        }
                    }

                },
                activeTokens:function(spanNode, tokenObject, editor){
                    if(codeType!='js'&&codeType!='html')return;

                    if(!editor.$keyInput)
                        return;

                    if($suggestionShowed){
                        // for new "." (replace the old ".")
                        if($sugMode=='dot' && isDot(spanNode)&& spanNode!=$suggestionBaseNode){
                            $suggestionBaseNode=spanNode;
                            $sugMode=null;
                            return;
                        }

                        //
                        if(/[^\w_$]/.test(editor.$keyInput)){
                            hideSuggestion();
                            return;
                        }
                    }

                     // for dot suggestion, use last one always
                    if($inputDotChar){
                        if(tokenObject.type=='.')
                            showSugFromDot(spanNode);
                            return;
                        _.asyRun(function(){
                            $inputDotChar=false;
                        });
                    }


                    // for text suggestion
                    if(isSpan(spanNode) && spanNode.className=='js-variable'){
                        if(!_.str.endWith(tokenObject.value,editor.$keyInput))
                            return;
                        if(editor.$keyInput.length==1){
                            if(!$suggestionShowed){
                                // text suggestion always use the first one
                                editor.$keyInput=null;
                                showSugFromText(spanNode);
                                return;
                            }
                        }
                    }else if($prepareShowTextSug && !$suggestionShowed){
                        hideSuggestion();
                    }
                }
            };
            if(linb.debug){
                options.parserfile=codeType=='js'?["js/tokenizejavascript.js", "js/parsejavascript.js"]
                                    :codeType=='css'?["js/parsecss.js"]
                                    :codeType=='php'?["js/parsexml.js", "js/parsecss.js", "contrib/php/js/tokenizephp.js",
                                                        "js/tokenizejavascript.js", "js/parsejavascript.js", 
                                                        "contrib/php/js/parsephp.js", "contrib/php/js/parsephphtmlmixed.js"]
                                    :codeType=='html'?["js/parsexml.js", "js/parsecss.js", "js/tokenizejavascript.js", "js/parsejavascript.js", "js/parsehtmlmixed.js"]
                                    :["js/parsedummy.js"];
            }else{
                options.basefiles=[];
                options.parserfile=[(codeType=='js'?"js":codeType=='css'?"css":codeType=='php'?"php":codeType=='html'?"html":"dummy")+".js"];
            }

            var oeditor = new CodeMirror(profile.getSubNode('BOX').get(0), options);
             // set those here
             oeditor.win._prop=profile;
             profile.$codemirror=oeditor;
             profile.$doc=oeditor.win.document;

             // [[ only for firefox
             // in ff : appendChild will trigger iframe unload event
             var gekfix = profile._gekfix = function(e){
                var win=this,prop=win._prop;
                // to fix firefox appendChid's bug: refresh iframe's document
                if(win._prop){
                    if(linb.browser.opr && profile.$repeatT)
                        profile.$repeatT.abort();
                    // for firefox: free memory
                    if(linb.browser.ie){
                        win.document.detachEvent("unload",win._prop._gekfix);
                    }else{
                        win.removeEventListener("unload",win._prop._gekfix,false);
                    }
                    win._prop=undefined;
                    _.asyRun(function(){
                        if(prop.box && linb.Dom.byId(prop.domId))
                            prop.box._reLoadEditor(prop);
                        prop=null;
                    });
                }
             };
             if(linb.browser.ie){
                 oeditor.win.document.attachEvent("unload",gekfix);
             }else{
                // for opera
                if(linb.browser.opr)
                    profile.$repeatT=linb.Thread.repeat(function(){
                        if(profile.$codemirror){
                            //unload
                            if(!profile.$codemirror.win.document || !profile.$codemirror.win.document.defaultView){
                                profile.box._reLoadEditor(profile);
                            }
                        }
                    }, 200);
                else
                    oeditor.win.addEventListener("unload",gekfix,false);
             }
            // ]]
        },
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments);
            profile.getSubNode('BOX').cssSize(size);
        }
    }
});
