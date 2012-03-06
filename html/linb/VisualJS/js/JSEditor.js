/*
An editor for js jsLinb class or normal js file
*/
Class('VisualJS.JSEditor', 'linb.Com',{
    Instance:{
        events:{onDestroy:"_ondestroy"},
        _ondestroy:function(){
            var ns=this,name="editor.iframe."+ns.$linbid;
            if(ns.$tasksthread){
                ns.$tasksthread.abort();
                ns.$tasksthread=null;
                ns.___buildNSCode=null;
                ns.$transTaskList=null;
                ns.$transTaskListCached=null;
            }
            if(document.getElementById(name)){
                document.body.removeChild(document.getElementById(name));
                try{delete frames[name]}catch(e){}
            }
        },
        initialize:function(){
            var ns=this;

            ns.$scopeMap={};
            ns.$keysMap={};
            ns.$BracesMap={};

            ns.$transTaskList=[];
            ns.$transTaskListCached={};

            ns._ovalue="";
            ns._dirty=false;

            ns._uicode=false;

            ns._evalcache={};

            ns.properties.$pageviewType='linb.UI.ButtonViews';

        },
        _buildNameSpace:function(force){
//console.log("_buildNameSpace",force);
            var ns = this,
                map=ns.$BracesMap,
                dirtied=force||false,
                scopeMap = ns.$scopeMap,
                keysMap = ns.$keysMap,
                editor = ns.codeeditor,
                KeyMap={
                    Dependency:'array',
                    Initialize:'function',
                    Before:'function',
                    Afte:'function',
                    Instance:'object',
                    Static:'object'
                },id,rst,
                instanceFunMap={};

            if(!dirtied){
                // first, second layers'  scope id changed/added new
                _.each(map,function(o,scope){
                    // first layer
                    if(/^[\d]+_[\d]+$/.test(o[0])){
                        if(!scopeMap[scope]){
                            dirtied=1;
                            return false;
                        }
                    }
                    // second layer
                    else if(/^[\d]+_[\d]+_[\d]+$/.test(o[0])){
                        if(!scopeMap[scope]){
                            dirtied=1;
                            return false;
                        }
                    }
                });

                // braces were removed
                var removed={};
                 _.each(scopeMap,function(o,scope){
                    if(!map[scope]){
                        dirtied=1;
                        removed[scope]=1;
                    }
                });
                _.each(removed,function(o,scope){
                    delete scopeMap[scope];
                });

                // if not dirtied, return
                if(!dirtied)
                    return;
            }

            // check first
            // run , check all in scopeMap, or  _uid modified => re build
            var value=ns.getValue();

            var code=""
// 1. try to get struct. for valid linb class
                    +"Class=function(a,b,c){"
                        +"if(c.Instance){"
                            +"c.Instance._ctrlpool={};"
                            +"if(c.Instance.initialize){try{c.Instance.initialize()}catch(e){}}"
                            +"if(c.Instance.iniComponents){try{c.Instance.iniComponents()}catch(e){}}"
                        +"}"
                        +"return c;"
                    +"};"
                    +value;
            if(code===ns.___buildNSCode)
                return;
            ns.___buildNSCode=code;

            // check first
            var result = VisualJS.CodeEditor.evalInSandbox(code);
            ns.showEvalResult(result);

            var obj;
            if(result.ok){
                obj = result.ok;
            }else{
                obj={
                    Instance:{},
                    Static:{}
                };
// 2. try to get struct. for those {} matched code with other SyntaxError
                var code, struct = VisualJS.ClassTool.getClassStruct(value);
                // fail
                if(!struct){
                    // to show err
                    ns.check();
                    return ;
                }

                _.arr.each(['Constructor', 'Dependency', 'Initialize', 'Before', 'After'],function(i){
                    if(code=struct.sub[i].code){
                        code=code.replace(/^\s*/,'').charAt(0);
                        obj.Static[i]=code=='f'?_.fun():code=='{'?{}:code=='['?[]:"";
                    }
                });
                _.each(struct.sub.Static.sub,function(o,i){
                    if(code=o.code){
                        code=code.replace(/^\s*/,'').charAt(0);
                        obj.Static[i]=code=='f'?_.fun():code=='{'?{}:code=='['?[]:"";
                    }
                });
                _.each(struct.sub.Instance.sub,function(o,i){
                    if(code=o.code){
                        code=code.replace(/^\s*/,'').charAt(0);
                        obj.Instance[i]=code=='f'?_.fun():code=='{'?{}:code=='['?[]:"";
                    }
                });
            }

            ns._rebuildTree();

            // find instanceFunMap
            if(obj.Instance){
                var doc,key;

                _.arr.each(['customAppend','iniExComs','iniResource'],function(spkey){
                    if(obj.Instance&&obj.Instance[spkey]){
                        doc=linb.getRes("doc.linb.Com.prototype."+spkey);
                        if(doc){
                            var paras=doc.$paras, arr=[], str;
                            if(paras&&paras.length){
                                for(var i=0;i<paras.length;i++){
                                    str=paras[i].replace(/.*\:\s*(([\w]+\.)*[\w]+).*/, '$1');
                                    arr.push({type:str+".prototype"});
                                }
                                instanceFunMap[spkey]=arr;
                            }
                        }
                    }
                });
                // for all events
                _.each(obj.Instance._ctrlpool,function(o,i){
                    key=o.key+".prototype";
                    _.each(o.getEvents(),function(evt,name){
                        // get event def from doc
                        doc=linb.getRes("doc."+key+"."+name);
                        if(typeof doc == 'string'){
                            var obj = _.get(window,(key+"."+name).split('.'));
                            if(obj && obj.$original$)
                                doc= linb.getRes("doc." +obj.$original$ + '.prototype.'+name);
                        }
                        if(doc){
                            var paras=doc.$paras, arr, str;
                            if(paras&&paras.length){
                                arr=[{code:"(new "+o.key+").get(0)"}];
                                for(var i=1;i<paras.length;i++){
                                    str=paras[i].replace(/.*\:\s*(([\w]+\.)*[\w]+).*/, '$1');
                                    arr.push({type:str+".prototype"});
                                }
                                instanceFunMap[evt]=arr;
                            }
                        }
                    });
                });

                // for com's events
                 key="linb.Com.prototype";
                _.each(obj.Instance.events,function(evt,name){
                    // get event def from doc
                    doc=linb.getRes("doc."+key+"."+name);
                    if(doc){
                        var paras=doc.$paras, arr, str;
                        if(paras&&paras.length){
                            arr=[{code:"this"}];
                            for(var i=1;i<paras.length;i++){
                                str=paras[i].replace(/.*\:\s*(([\w]+\.)*[\w]+).*/, '$1');
                                arr.push({type:str+".prototype"});
                            }
                            instanceFunMap[evt]=arr;
                        }
                    }
                });
            }


            var blockMap={};
            // [[ find keys
            _.each(map,function(o,scope){
                id=o[0];
                if(/^[\d]+_[\d]+$/.test(id)){
                    rst=editor.findFunctionInfo('b:'+o[0]);
                    if(KeyMap[rst[0]]){
                        blockMap[rst[0]]=[o[0],scope,rst[1]];
                        // add to scopeMap
                        keysMap[rst[0]]=scope;
                        scopeMap[scope]=rst[0];
                    }
                }
            });
            // ]]

            var globalStatic;
            var globalKey=editor.resetGlobalKey({
                Instance : obj.Instance,
                Static : globalStatic = obj.Static||{}
            });

            if(blockMap.Dependency){
                globalStatic.Dependency=blockMap.Dependency
            }
            // [[ for before, afer, initialize
            if(blockMap.Before && blockMap.Before[2]){
                globalStatic.Before=blockMap.Before

                var obj=blockMap.Before,
                    scope=obj[1],
                    id=obj[0],
                    args=obj[2];
                editor.setScopeVar(scope,"this",{code: globalKey + ".Static"});
                if(args[0])
                    editor.setScopeVar(scope,args[0],{type: "String.prototype"});
                if(args[1])
                    editor.setScopeVar(scope,args[1],{type: "String.prototype"});
                if(args[2])
                    editor.setScopeVar(scope,args[2],{type: "Object.prototype"});
            }
            if(blockMap.After){
                globalStatic.After=blockMap.After

                var obj=blockMap.After,
                    scope=obj[1],
                    id=obj[0],
                    args=obj[2];
                editor.setScopeVar(scope,"this",{code: globalKey + ".Static"});
            }
            if(blockMap.Initialize){
                globalStatic.After=blockMap.Initialize

                var obj=blockMap.Initialize,
                    scope=obj[1],
                    id=obj[0],
                    args=obj[2];
                editor.setScopeVar(scope,"this",{code: globalKey + ".Static"});
            }
            // ]]

            // [[ for Static
            if(blockMap.Static){
                var obj=blockMap.Static,
                    supid=obj[0],
                    reg=new RegExp("^"+supid+"_[\\d]+$");

                _.each(map,function(o,scope){
                    id=o[0];
                    if(reg.test(id)){

                        rst=editor.findFunctionInfo('b:'+o[0]);

                        editor.setScopeVar(scope,"this",{code: globalKey + ".Static"});

                        // add to scopeMap
                        keysMap["Static."+rst[0]]=scope;
                        scopeMap[scope]=rst[0];
                    }
                });
            }
            // ]]

            // for Instance
            if(blockMap.Instance){
                var obj=blockMap.Instance,
                    supid=obj[0],
                    reg=new RegExp("^"+supid+"_[\\d]+$"),
                    funargs;

                _.each(map,function(o,scope){
                    id=o[0];
                    if(reg.test(id)){
                        rst=editor.findFunctionInfo('b:'+o[0]);
                        if(rst[0]=='initialize'||rst[0]=='iniComponents')
                            editor.setScopeVar(scope,"this",{type: "linb.Com.prototype"});
                        else
                            editor.setScopeVar(scope,"this",{
                                // new linb.Com() on the front
                                code: "_.merge(new linb.Com(), " + globalKey + ".Instance,'all')"
                            });


                        // set function's argumenst
                        if(funargs = instanceFunMap[rst[0]]){
                            _.arr.each(rst[1],function(k,j){
                                editor.setScopeVar(scope, k, funargs[j]);
                            });
                        }
                        // add to scopeMap
                        keysMap["Instance."+rst[0]]=scope;
                        scopeMap[scope]=rst[0];
                    }
                });
            }

            ns._buildNameSpaceOnce=true;
        },
        showEvalResult:function(result){
            var ns=this;
            var bgcolor,
                bgcolor1='#FFF8DC',
                bgcolor2='#FF0000';
            if(result){                
                if(result.ko){
                    ns.errlink
                        .setCaption(linb.getRes('VisualJS.JSEditor.codeerr', result.ko))
                        .setTag(result.line);
                    ns.errIcon.getRoot().css('background','url(img/App.gif) -16px -16px');
    
                    if(!ns.errThread){
                        ns.errmsg.setBackground(bgcolor=bgcolor2);
                        ns.errThread = linb.Thread.repeat(function(){
                            ns.errmsg.setBackground(bgcolor=bgcolor==bgcolor1?bgcolor2:bgcolor1);
                        },1000);
                    }
                }else{
                    ns.errlink
                        .setCaption(linb.getRes('VisualJS.checkOK'))
                        .setTag(null);
                    ns.errIcon.getRoot().css('background','url(img/App.gif) -64px -16px');
    
                    _.asyRun(function(){
                        if(ns.errlink && !ns.errlink.getTag()){
                            ns.errlink.setCaption('');
                        }
                    }, 2000);
    
                    if(ns.errThread){
                        ns.errmsg.setBackground(bgcolor1);
                        ns.errThread.abort();
                        delete ns.errThread;
                    }
               }
            }
            // if err, check it again.                
            if(!result || result.ko){
                _.asyRun(ns.check, 3000, [], ns);
                return;
            }
            // build namespace when the code is no-err
            if(result && result.ok && !ns._buildNameSpaceOnce){
                _.asyRun(ns._buildNameSpace, 1000, [], ns);
            }

        },
        _rebuildTree:function(text){
            var ns=this,
                result = ns._getEval(text);

            ns.showEvalResult(result);
            if(!result.ok)
                return ;

            var obj=result.ok,
                items=[],
                _static=obj.Static,
                instance=obj.Instance,
                icon='img/App.gif',
                iconPos;

            if(obj.Constructor){
                items.push({id:'Constructor',
                    caption:'Constructor', tips:'Constructor',image:'img/App.gif', imagePos:'-32px -32px'});
            }
            if(obj.Dependency){
                items.push({id:'Dependency',
                    caption:'Dependency', tips:'Dependency',image:'img/App.gif', imagePos:'0 -32px'});
            }
            if(obj.Initialize){
                items.push({id:'Initialize',
                    caption:'Initialize', tips:'Initialize',image:'img/App.gif', imagePos:'-32px -32px'});
            }
            if(obj.Before){
                items.push({id:'Before',
                    caption:'Before', tips:'Before',image:'img/App.gif', imagePos:'-32px -32px'});
            }
            if(obj.After){
                items.push({id:'After',
                    caption:'After',tips:'After', image:'img/App.gif', imagePos:'-32px -32px'});
            }

            if(instance){
                var sub=[];
                items.push({id:'Instance',
                    caption:'Instance',tips:'Instance', image:'img/App.gif', imagePos:'-16px -32px', sub:sub});
                _.each(instance,function(o,i){
                    iconPos = (typeof instance[i] == 'function')? '-32px -32px':_.isHash(instance[i])?'-16px -32px':'0 -32px';
                    sub.push({id:'Instance.'+i,
                        tips:i, caption:i, image:icon, imagePos:iconPos});
                });
            }
            if(_static){
                var sub=[];
                items.push({id:'Static',
                    caption:'Static', tips:'Static', image:'img/App.gif', imagePos:'-16px -32px', sub:sub});
                _.each(_static,function(o,i){
                    iconPos = (typeof _static[i] == 'function')? '-32px -32px':_.isHash(_static[i])?'-16px -32px':'0 -32px';
                    sub.push({id:'Static.'+i,
                        tips:i,caption:i, image:icon, imagePos:iconPos});
                });
            }

            this.treebarClass.setItems(items);
            ns._treebuilt=true;
        },
        _getEval:function(text){
            var ns=this,
                code=(text || ns.getValue()),
                result;

            if(ns._evalcache[code]){
                result = ns._evalcache[code];
            }else{
                result = VisualJS.CodeEditor.evalInSandbox("Class=function(a,b,c){return c;};" + code, false, "editor.iframe."+ns.$linbid);
                if(result.ok){
                    _.breakO(ns._evalcache);
                    ns._evalcache[code] = result;
                    ns._designer.setLinkObj(result.ok);
                }
            }
            return result;
        },
        check:function(text){
            var ns=this,
                result;
            try{
                result = ns._getEval(text);
                ns.showEvalResult(result);
            }catch(e){}

            return result;
        },
        activate:function(){
            var ns=this,
                view=ns.buttonview.getUIValue();
            if(view=='code')
                ns.codeeditor.activate();
        },
        getValue:function(){
            var ns=this;

            if(ns._designer.isDirty()){
                // use syn
                ns._designer.resetCodeFromDesigner(true);
                ns._ovalue = ns.codeeditor.getUIValue()
                ns._dirty=false;
            }

            return ns._dirty ? (ns._ovalue = ns.codeeditor.getUIValue()) : ns._ovalue;
        },
        setValue:function(value){
            // adjust
            value=(value||'').replace(/\t/g, '    ').replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n");

            var ns=this;
            if(ns._ovalue!=value){
                ns._ovalue=value;
                ns._dirty=false;

                ns.codeeditor.setValue(value);

                ns._rebuildTree(value);

                ns._uicode = null;

                if(ns.buttonview.getUIValue()=='design'){
                    ns._beforeValueUpdated(null,null,'design');
                }
            }

            return ns;
        },
        customAppend:function(parent,subId,left,top){
            var ns = this;
            parent.append(ns.paneMain, subId);

            ns.buttonview.getSubNode('ITEMS').append(
                (new linb.UI.Image({
                    src:'img/progress.gif',
                    position:'relative',
                    left:4,
                    top:6
                })).setHost(ns,"imgProgress")
            );
        },
        iniExComs:function(){
            var ns = this;
            var pageview = (new (linb.SC.get(ns.properties.$pageviewType)))
                    .setHost(ns,"buttonview")
                    .setNoPanel(true)
                    .setDock('top')
                    .setHeight('auto')
                    .setItems([
                    {"id":"code","caption":"$VisualJS.JSEditor.sv","image":'@CONF.img_app',"imagePos":"-80px -48px","tips":"$VisualJS.JSEditor.svtips"},
                    {"id":"design","caption":"$VisualJS.JSEditor.dv","image":'@CONF.img_app',"imagePos":"-192px -48px","tips":"$VisualJS.JSEditor.dvtips"}])
                    .beforeUIValueSet("_beforeValueUpdated")

            if(ns.properties.$pageviewType=='linb.UI.ButtonViews'){
                pageview.setBarSize(28);
                pageview.setCustomStyle({"ITEMS":"position:relative","LIST":"position:relative"});
            }

            ns.paneMain.append(pageview);

            // apend designer
            var designer = new VisualJS.Designer();
            designer.setHost(ns, '_designer');
            designer.setEvents('onValueChanged',function(ipage, profile){
                ns.fireEvent('onValueChanged', [ns, true]);
            });
            designer.resetTaskList=function(){
                ns._disable();
                ns.$transTaskList=[];
                ns.$transTaskListCached={};
            };
            designer.addTask=function(task){
                ns.$transTaskList.push(task);
            };
            designer.startTaskList=function(){
                ns.checkRenderStatus(ns);
            };
            designer.resetCode=function(pkey, key, code, syn){
                 var fun=function(){
                     if(ns.$transTaskListCached[pkey+":"+key]===code)
                        return;
                     if(ns.tryToLocale([pkey,key], true)){
                        ns._renderStatus=false;
                        ns.replaceCode(code, true);
                        ns.$transTaskListCached[pkey+":"+key]=code;

                        if(pkey=='Instance' && key=='iniComponents'){
                            ns._uicode=""+(new Function([],code.slice(code.indexOf('{')+1, code.lastIndexOf('}'))));
                            ns._uicode=ns._uicode.slice(ns._uicode.indexOf('{')+1, ns._uicode.lastIndexOf('}'));
    
                            _.asyRun(function(){
                                ns._buildNameSpace(true);
                            });
                        }
                    }else{
                        ns.addCodeToInstance(key, code);
                        ns.$transTaskListCached[pkey+":"+key]=code;
                    }
                    
                };

                if(syn){
                    fun();
                }else
                    ns.$transTaskList.push(fun);
            };
            designer.addCode=function(pkey, key, code, syn){
                var fun=function(){
                    if(ns.$transTaskListCached[pkey+":"+key]===code)
                        return;

                    ns.addCodeToInstance(key, code);
                    ns.$transTaskListCached[pkey+":"+key]=code;

                };

                if(syn){
                    fun();
                }else
                    ns.$transTaskList.push(fun);
            };
            designer.focusEditor=function(pkey, key){
                ns.showPage('code');
                ns._enable();
                ns.tryToLocale([pkey,key]);
            };
            designer.searchInEditor=function(code){
                ns.showPage('code');
//console.log("searchInEditor", code);
                ns._enable();
                var cursor = ns.codeeditor.searchCode(code);
            };
            designer.refreshFromCode=function(){
                var obj=ns.check(ns._ovalue = ns.codeeditor.getUIValue());
                if(obj.ok){
                    this.refreshView(obj.ok);
                    linb.message(linb.getRes('VisualJS.designer.refreshOK'));
                }
            };
            designer.buildNameSpace=function(force){
                var fun=function(){
                    ns._buildNameSpace(force);
                };
                ns.$transTaskList.push(fun);
            };
            ns.paneDesign.append(designer);
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append(
                (new linb.UI.Pane)
                .setHost(host,"paneMain")
                .setDock("fill")
            );

            host.paneMain.append(
                (new linb.UI.Pane)
                .setHost(host,"paneCode")
                .setVisibility('hidden')
                .setDock("fill")
                .setDockIgnore(true)
                .setLeft(-1000)
            );
            host.paneMain.append(
                (new linb.UI.Pane)
                .setVisibility('hidden')
                .setHost(host,"paneDesign")
                .setDock("fill")
            );

            host.paneCode.append((new linb.UI.Layout)
                .setHost(host,"layoutFill")
                .setItems([
                    {"id":"before", "pos":"before", "locked":false, "size":150, "min":50, "max":200, "cmd":false, "folded":false, "hidden":false}, {"id":"main", "min":10}
                ])
                .setType("horizontal")
            );

            host.layoutFill.append((new linb.UI.TreeBar)
                .setHost(host,"treebarClass")
                .setIniFold(false)
                .setSelMode("none")
                .onItemSelected("_treebarclass_onitemselected")
            , 'before');

            host.paneCode.append((new linb.UI.ToolBar)
                .setHost(host,"toolbar4")
                .setItems([
                    {"id":"g1","sub":[
                            {"id":"outline","caption":"$VisualJS.pageEditor.outline","image":'@CONF.img_app',"imagePos":"-16px -48px","statusButton":true,value:true,"tips":"$VisualJS.pageEditor.outlinetips"},
                            {"id":"check","caption":"$VisualJS.pageEditor.check","image":'@CONF.img_app',"imagePos":"0 -48px","type":"button","tips":"$VisualJS.pageEditor.checktips"}
                        ]
                    },
                    {"id":"fun","sub":[
                            {"id":"searchreplace","caption":"$VisualJS.pageEditor.searchreplace","image":'@CONF.img_app',"imagePos":"-240px -48px","type":"button","tips":"$VisualJS.pageEditor.replacetips"},
                            {"id":"jumpto","caption":"$VisualJS.pageEditor.jumpto","image":'@CONF.img_app',"imagePos":"-160px -48px","type":"button","tips":"$VisualJS.pageEditor.jumptotips"},
                            {"id":"indentall","caption":"$VisualJS.pageEditor.indentall","image":'@CONF.img_app',"imagePos":"-224px -48px","type":"button","tips":"$VisualJS.pageEditor.indentalltips"}
                        ]
                    }
                ])
                .onClick("_toolbar_onclick")
            );

            host.layoutFill.append((new linb.UI.Block)
            .setHost(host,"errmsg")
            .setDock("top")
            .setBorderType("outset")
            .setHeight(20)
            .setBackground('#FFF8DC')
            ,'main');

            host.errmsg.append((new linb.UI.Div)
            .setHost(host,"errIcon")
            .setLeft(4)
            .setTop(2)
            .setWidth(16)
            .setHeight(16)
            .setCustomClass({KEY:'linb-ui-icon'})
            );

            host.errmsg.append((new linb.UI.Link)
            .setHost(host,"errlink")
            .setLeft(22)
            .setTop(2)
            .onClick('_errlink_click')
            );

            host.layoutFill.append((new VisualJS.CodeEditor)
            .setHost(host,"codeeditor")
            .setDock("fill")
            .onValueChanged("_codeeditor_onChange")
            .onBlockChanged("_codeeditor_onblockchange")
            .onLinesChange("_codeeditor_onlineschange")
            .onRendered("_codeeditor_onrender")
            .onGetHelpInfo("_codeeditor_ongett")
            ,'main');

            return children;
            // ]]code created by jsLinb UI Builder
        },
        onDestroy:function(){
             this._designer.destroy();
        },
        setDftPage:function(key){
            var ns=this;
            ns.$dftpage=key;
        },
        showPage:function(key){
            var ns=this;
            if(ns._once)return;
            ns.buttonview.setUIValue(key,true);
        },
        _codeeditor_ongett:function(profile,key){
            _.asyRun(function(){
                linb.Coder.applyById("doc:code",true);
            });
            return VisualJS.EditorTool.getDoc(key);
        },
        _beforeValueUpdated:function(profile, ov, nv){
            var ns=this;
            ns._once=true;
            if(nv=='code'){
                if(ns._designer.isDirty()){
                    ns._designer.resetCodeFromDesigner();
                    ns._dirty=true;
                }
                ns.paneDesign.setDisplay('none').setZIndex(1);
                ns.paneCode.setDockIgnore(false).setVisibility('visible').setZIndex(100).reLayout();
            }else if(nv=='design'){

                // must clear it first
                ns.codeeditor.clearHistory();

                if(!VisualJS.ClassTool.getClassName(ns.codeeditor.getUIValue()||"")){
                    linb.message(linb.getRes('VisualJS.classtool.noClass'));
                    return false;
                }

                // force to check code before the other page showed
                var obj=ns.check();
                if(obj.ok){
                    var needRef=false;
                    if(!ns._uicode)
                        needRef=true;
                    else{
                        var f=_.get(obj.ok,['Instance','iniComponents']);
                        if(!f){
                            needRef=true;
                        }else{
                            var code=f.toString();
                            code=code.slice(code.indexOf('{')+1, code.lastIndexOf('}'));
                            if(code!=ns._uicode){
                                // reset _uicode
                                ns._uicode=code;

                                ns._buildNameSpace(true);
                                needRef=true;
                            }
                        }
                    }

                    if(needRef)
                        ns._designer.refreshView(obj.ok);
                    ns.paneCode
                        .setDockIgnore(true)
                        .setLeft(-10000)
                        .setVisibility('hidden')
                        .setZIndex(1);
                    ns.paneDesign
                        .setDisplay('')
                        .setVisibility('visible')
                        .setZIndex(100)
                        .reLayout(true);
                     
                     ns._designer.reLayout(true);
                }else{
                    linb.message(linb.getRes('VisualJS.JSEditor.codeerr', obj.ko));
                    ns.errlink.getRoot().onClick();
                    return false;
                }
            }
            ns._once=false;
        },
        _errlink_click:function(p){
            var ns=this,
                line=p.properties.tag;
            if(_.isNumb(line=parseInt(line))){
                ns.codeeditor.selectLines(line,line+1);
            }
        },
        _disable:function(){
            var ns=this;
            var id=ns.KEY+":"+ns.$linbid+":progress";
            _.resetRun(id, function(){
                if(!ns.__disabledUI){
                    ns.codeeditor.setReadonly(true);
    
                    ns.toolbar4.setDisabled(true);
                    ns.treebarClass.setDisabled(true);
    
                    if(ns.imgProgress)ns.imgProgress.setDisplay('');
                    
                    ns.__disabledUI=true;
                }
            });
        },
        _enable:function(){
            var ns=this;
            var id=ns.KEY+":"+ns.$linbid+":progress";
            _.resetRun(id);

            delete ns.__disabledUI;

            ns.codeeditor.setReadonly(false);
            ns.toolbar4.setDisabled(false);
            ns.treebarClass.setDisabled(false);

            if(ns.imgProgress)ns.imgProgress.setDisplay('none');
        },
        checkRenderStatus:function(ns){
            if(ns._renderStatus &&  ns.$transTaskList &&  ns.$transTaskList.length){
                var fun=ns.$transTaskList.shift();
                _.tryF(fun);
            }
            return true;
        },
        _codeeditor_onrender:function(profile, finished){
            var ns=this;
            if(finished){
                ns._enable();
//console.log('onRenderred.');
                if(!ns.$initializd){
                    // start a repeat thread
                    ns.$tasksthread=linb.Thread.repeat(function(){
                        ns.checkRenderStatus(ns);
                    },50);
                    ns.$tasksthread.start();
                    
                    ns.$initializd=true;
                    ns.showPage(ns.$dftpage);
                }

            }else{
//console.log('onRenderring...');
                ns._disable();
            }
            ns._renderStatus=!!finished;
        },
        _codeeditor_onChange:function(profile){       
            var ns=this;
            if(ns.codeeditor.__forcrackignorechange){
                delete ns.codeeditor.__forcrackignorechange;
                return;
            }
            ns._dirty=true;

            ns.fireEvent('onValueChanged', [ns, true]);
        },
        _codeeditor_onblockchange:function(profile, BracesMap){
            var ns=this,
                id=ns.KEY+":"+ns.$linbid+":onBlockChanged";
            if(!_.resetRun.exists(id))
                _.resetRun(id, function(){
                    ns.$BracesMap=BracesMap;
                    ns._buildNameSpace();
//console.log('onBlockAdded',BracesMap);
                },100);
        },
        _codeeditor_onlineschange:function(profile, BracesMap){
            var ns=this;
            _.resetRun(ns.KEY+":"+ns.$linbid+":onLinesChange", function(){
//console.log('onLinesChange',BracesMap);
            },100);
        },
        // select the second layer keys
        _treebarclass_onitemselected:function(profile, item, node){
            var ns = this,
                arr=item.id.split('.');
            if(!ns.tryToLocale(arr)){
                var cursor;
                if(arr[1]){
                    cursor = ns.codeeditor.searchCode(arr[1]+ ":");
                    if(!cursor)
                        ns.codeeditor.searchCode(arr[1]+ " :");
                }
            }
        },
        replaceCode:function(code, reset){
            var ns=this;
//console.log('replaceCode', code, reset);
            ns._renderStatus=false;
            ns.codeeditor.replaceCode(code, reset);
        },
        ensureInstanceExpand:function(){
            var ns=this;
            var pid="b:1",
                index=0,
                id;
            while(++index){
                id=pid+"_"+index;
                key=ns.codeeditor.findFunctionInfo(id);
                if(!key[0])
                    break;
                if(key[0]=="Instance"){
                    ns.codeeditor.expandBraces(id);
                    return;
                }
            }
        },
        addCodeToInstance:function(key, code){
            this.ensureInstanceExpand();
//console.log("addCodeToInstance", key, code);
            var ns=this;
            var pid="b:1",
                index=0,
                id,keys,
                instanceId;
            while(++index){
                id=pid+"_"+index;
                keys=ns.codeeditor.findFunctionInfo(id);
                if(!keys[0])
                    break;
                if(keys[0]=="Instance"){
                    instanceId=id;
                    break;
                }
            }
            if(instanceId){
                instanceId='e'+instanceId.slice(1);
                ns._renderStatus=false;
                ns.codeeditor.addCodeInto(instanceId, ",\n"+key+" : "+code);
                _.asyRun(function(){
                    ns.codeeditor.activate();
                });
            }
        },
        tryToLocale:function(arr, crack){
            this.ensureInstanceExpand();
//console.log("tryToLocale", arr, crack);
            var ns=this;
            var index=0,id,key;
            var pid="b:1", pid2;
            if(arr.length==1){
                while(++index){
                    id=pid+"_"+index;
                    key=ns.codeeditor.findFunctionInfo(id);
                    if(!key[0]){
                        break;
                    }
                    if(key[0]==arr[0]){
                        ns.codeeditor.locateTo(id, crack);
//console.log("tryToLocale returns true");
                        return true;
                        break;
                    }
                }
            }else if(arr.length==2){
                while(++index){
                    id=pid+"_"+index;
                    key=ns.codeeditor.findFunctionInfo(id);
                    if(!key[0]){
                        break;
                    }
                    if(key[0]==arr[0]){
                        pid2=id;
                        break;
                    }
                }
                index=0;
                if(pid2){
                    while(++index){
                        id=pid2+"_"+index;
                        key=ns.codeeditor.findFunctionInfo(id);
                        if(!key[0]){
                            break;
                        }
                        if(key[0]==arr[1]){
                            ns.codeeditor.locateTo(id, crack);
//console.log("tryToLocale returns true");
                            return true;
                            break;
                        }
                    }
                }
            }
//console.log("tryToLocale returns false");
        },
        _toolbar_onclick: function(profile, item, grp, e, src){
            var ns=this,
                editor=this.codeeditor,
                pos=linb.use(src).offset();
            switch(item.id){
                case 'indentall':
                    VisualJS.EditorTool.indentAll(editor);
                break;
                case 'searchreplace':
                    VisualJS.EditorTool.showFindWnd(editor, pos);
                break;
                case 'jumpto':
                    VisualJS.EditorTool.showJumpToWnd(editor, pos);
                break;
                case 'check':
                    ns.check();
                break;
                case 'outline':
                    ns.layoutFill.updateItem("before",{hidden:!item.value});
                break;
            }
        }
    }
});