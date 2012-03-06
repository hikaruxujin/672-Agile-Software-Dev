/*
    initialize
beforeCreated
onCreated
onLoadBaseClass
onLoadReqiredClass
onIniResource
    iniResource (asy)
beforeIniComponents
    iniComponents (asy)
afterIniComponents
    iniExComs (asy)
onReady
onRender
onDestroy
*/

Class('linb.Com',null,{
    Constructor:function(properties, events, host){
        var self=this;
        self._nodes=[];
        self.host=host||self;

        self.$linbid=self.constructor._ctrlId.next();

        self.properties = properties || (self.properties?_.clone(self.properties):{});
        //copy those from class setting
        self.events = _.copy(self.events) || {};
        if(events)
            _.merge(self.events, events, 'all');
        self._ctrlpool={};
        
        self._innerCall('initialize');
    },
    Instance:{
        autoDestroy:true,
        dataBindLoadType:"sync", // "async", "none"
        _toDomElems:function(){
            var ns=this;
            if(!ns.created)
                // create synchronously
                ns.create(null,false)
            ns.render();
            return ns.getUIComponents()._toDomElems();
        },
        setAlias:function(str){
            var self=this,old=self.alias;
            if(old && self.host && self.host!==self)
                try{delete self.host[old]}catch(e){self.host[old]=undefined}
            if(self.host && self.host!==self)
                self.host[str]=self;
            return self;
        },
        getAlias:function(){
            return this.alias;
        },
        setHost:function(host, alias){
            var self=this;
            self.host=host;
            if(alias)
                self.setAlias(alias);
            return self;
        },
        getHost:function(){
            return this.host;
        },
        setProperties:function(key,value){
            var self=this;
            if(!key)
                self.properties={};
            else if(typeof key=='string')
                self.properties[key]=value;
            else
                _.merge(self.properties, key, 'all');
            return self;
        },
        getProperties:function(key){
            return key?this.properties[key]:this.properties;
        },
        setEvents:function(key,value){
            var self=this;
            if(!key)
                self.events={};
            else if(typeof key=='string')
                self.events[key]=value;
            else
                _.merge(self.events, key, 'all');
            return self;
        },
        getEvents:function(key){
            return key?this.events[key]:this.events;
        },
        // for outter events
        fireEvent:function(name, args, host){
            var t, self=this;
            if(self.events && (t=self.events[name])){
                if(typeof t=='string')t=self[t];
                if(typeof t=='function')
                    return t.apply(host || self.host||self, args||[]);
            }
        },
        // for inner events
        _fireEvent:function(name, args){
            var t, self=this;
            if(self.events && (t=self.events[name])){
                if(typeof t=='string')t=self[t];
                self.$lastEvent=name;
                if(typeof t=='function'){
                    args=args||[];
                    args.splice(0,0,self,self.threadid);
                    return t.apply(self.host||self, args);
                }
            }
        },
        _innerCall:function(name){
            var self=this;
            return _.tryF(self[name],[self, self.threadid],self);
        },
        customAppend:function(parent,subId,left,top,threadid){
            return false;
        },
        show:function(onEnd,parent,subId,threadid,left,top){
            var self=this,f=function(){
                // no UI control in com
                if(self.getUIComponents().isEmpty()){
                    _.tryF(onEnd,[self, threadid],self.host);
                }else{
                    // if parent is an ui object without rendered, dont render the com
                    if(!(parent && parent['linb.UI'] && !parent.get(0).renderId))
                        self.render();

                    if(false===_.tryF(self.customAppend,[parent,subId,left,top,threadid], self))
                        (parent||linb('body')).append(self.getUIComponents(),subId);
                    _.tryF(onEnd,[self, threadid],self.host);
                }
            };
            self.threadid=threadid;

            if(self.created)
                f();
            else
                self.create(f,threadid);
            return self;
        },
        render:function(triggerLayout){
            var self=this;
            if(self.renderId!='ok'){
                self.getUIComponents().render(triggerLayout);
                self._fireEvent('onRender');
                self.renderId='ok';
            }
            return self;
        },
        create:function(onEnd, threadid){
            //get paras
            var self=this;

            if(self.created){
                _.tryF(onEnd,[self, threadid],self.host);
                return;
            }

            var  t,funs=[]
                ;
            self.threadid=threadid;

            if(false===self._fireEvent('beforeCreated'))return;
            //if no threadid or threadid doesnt exist, reset threadid to self
            funs.push(function(threadid){
                if(threadid)
                    self.threadid=threadid;
                self._fireEvent('onCreated');
            });

            //databinder
            if(self.dataBindLoadType!="none"){
                var bds=self.getDataBinders();
                if(bds && bds.length){
                    var dbf=function(threadid){
                        var hash={};
                        _.arr.each(bds,function(bd, i){
                            var ajax=bd.boxing().read(null,null,null,null,"return");
                            if(ajax)hash[i]=ajax;
                        });
                        if(!_.isEmpty(hash))
                            linb.absIO.groupCall(hash, null, null, null, threadid);
                        bds.length=0;
                        hash=bds=null;
                    };
                    if(self.dataBindLoadType=="sync")
                        funs.push(dbf);
                    else
                        dbf();
                }
            }

            //base classes
            if((t=self.base) && t.length)
                funs.push(function(threadid){
                    linb.SC.groupCall(self.base,function(key){
                        self._fireEvent('onLoadBaseClass', [key]);
                    },null,threadid);
                });
            //load required class
            if((t=self.required) && t.length)
                funs.push(function(threadid){
                    linb.SC.groupCall(self.required,function(key){
                        self._fireEvent('onLoadReqiredClass', [key]);
                    },null,threadid);
                });
            //inner components
            if(self.iniComponents)
                funs.push(function(){
                    self._createInnerComs();
                });
            //load resource here
            if(self.iniResource)
                funs.push(function(){
                    self._fireEvent('onIniResource');
                    self._innerCall('iniResource');
                });
            //Outter components
            if(self.iniExComs)
                funs.push(function(){
                    self._innerCall('iniExComs');
                });
            //core
            funs.push(function(threadid){
                //lazy load
                if(self.background)
                    linb.SC.runInBG(self.background);
                self._fireEvent('onReady');
            });
            funs.push(function(threadid){
                self.created=true;
                _.tryF(onEnd,[self, threadid],self.host);
            });
            if(threadid===false){
                _.arr.each(funs,function(fun){
                    fun.call();
                });
            }else{
                //use asyUI to insert tasks
                linb.Thread.observableRun(funs,null,threadid);
            }

            return self;
        },
        _createInnerComs:function(){
            var self=this;
            if(self._innerComsCreated)
                return;
            if(false===self._fireEvent('beforeIniComponents'))return;
            Array.prototype.push.apply(self._nodes, self._innerCall('iniComponents')||[]);
            // attach destroy to the first UI control
            if(self.autoDestroy)
                _.arr.each(self._nodes,function(o){
                    if(o.box && o.box["linb.UI"] && !o.box.$noDomRoot){
                        o.$afterdestory=function(){
                            if(!self.destroyed)
                                self.destroy();
                            self=null;
                        };
                        return false;
                    }
                });
            self._fireEvent('afterIniComponents');
            self._innerComsCreated=true;
        },
        iniComponents:function(){},
        getAllComponents:function(){
            if(!this._innerComsCreated)
                this._createInnerComs();

            var arr=[];
            _.each(this._ctrlpool,function(o){
                arr.push(o);
            });
            return linb.absObj.pack(arr,false);
        },
        getDataBinders:function(){
            if(!this._innerComsCreated)
                this._createInnerComs();
            var nodes = _.copy(this._nodes),t,k='linb.DataBinder';
            _.filter(nodes,function(o){
                return !!(o.box[k]);
            });
            return nodes;
        },
        getUIComponents:function(){
            if(!this._innerComsCreated)
                this._createInnerComs();
            var nodes = _.copy(this._nodes),t,k='linb.UI';
            _.filter(nodes,function(o){
                return !!(o.box[k]);
            });
            return linb.UI.pack(nodes, false);
        },
        getComponents:function(){
            if(!this._innerComsCreated)
                this._createInnerComs();
            return linb.absObj.pack(_.copy(this._nodes),false);
        },
        setComponents:function(obj){
            var self=this,t;
            _.arr.each(self._nodes,function(o){
                if((t=self[o.alias]) &&t.get(0)==o)
                    delete self[o.alias];
            });
            _.arr.each(self._nodes=obj.get(),function(o){
                // set host
                o.boxing().setHost(self, o.alias);
            });
            return self;
        },
        AddComponents:function(obj){
            var self=this,ns=self._nodes;
            _.arr.each(obj.get(),function(o){
                o.boxing().setHost(self, o.alias);
                self._nodes.push(o);
            });
            return self;
        },
        destroy:function(threadid){
            var self=this,ns=self._nodes;
            self.threadid=threadid;
            self._fireEvent('onDestroy');
            //set once
            self.destroyed=true;
            if(ns && ns.length)
                _.arr.each(ns, function(o){
                    if(o && o.box)
                        o.boxing().destroy();
                },null,true);
            if(ns && ns.length)
                self._nodes.length=0;
            self._ctrlpool=null;
            _.breakO(self);
            //set again
            self.destroyed=true;
        }
    },
    Static:{
        _ctrlId : new _.id(),
        load:function(cls, onEnd, lang, showUI){
            var fun=function(){
                //get app class
                linb.SC(cls,function(path){
                    //if successes
                    if(path){
                        var a=this,f=function(){
                            var o=new a();
                            if(showUI!==false)o.show(onEnd);
                            else _.tryF(onEnd,[o],o);
                        };
                        //get locale info
                        if(lang) linb.setLang(lang, f);
                        else f();
                    }else
                        throw new Error(cls+' doesnt exists!');
                },true);
            };
            if(linb.isDomReady)
                fun();
            else
                linb.main(fun);
        },
        $EventHandlers:{
            beforeCreated:function(com, threadid){},
            onLoadBaseClass:function(com, threadid, key){},
            onIniResource:function(com, threadid){},
            beforeIniComponents:function(com, threadid){},
            afterIniComponents:function(com, threadid){},
            onLoadRequiredClass:function(com, threadid, key){},
            onReady:function(com, threadid){},
            onRender:function(com, threadid){},
            onDestroy:function(com){}
        }
    }
});