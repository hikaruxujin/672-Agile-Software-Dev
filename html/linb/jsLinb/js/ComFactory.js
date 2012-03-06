Class('linb.ComFactory',null,{
    Static:{
        _pro:{},
        _cache:{},
        _domId:'linb:ComFactory:',
        getProfile:function(key){
            return key?this._pro[key]:this._pro;
        },
        setProfile:function(key, value){
            if(typeof key=='string')
                this._pro[key]=value;
            else
                this._pro=key;
            return this;
        },
        destroyAll:function(){
            _.each(this._cache,function(o){
                _.tryF(o.destroy,[],o);
            });
            this._cache={};
        },
        broadcast:function(fun){
            if(typeof fun=='function'){
                var i,c=this._cache;
                for(i in c)
                    fun.call(c[i],i);
            }
        },

        setCom:function(id, obj){
            this._cache[id]=obj;
            if(obj)obj.comRefId=id;
            return this;
        },
        getComFromCache:function(id){
            return this._cache[id]||null;
        },
        //singleton:false->don't get it from cache, and don't cache the result.
        getCom:function(id, onEnd, threadid, singleton, properties, events){
            singleton=singleton!==false;
            var c=this._cache,
                p=this._pro,
                config,
                clsPath;

            if(singleton && c[id]){
                _.tryF(onEnd, [threadid,c[id]], c[id]);
                return c[id];
            }else{
                // if no configure
                if(!(config=p[id])){
                    config={
                        cls:id,
                        singleton:singleton,
                        properties:properties,
                        events:events
                    };
                    clsPath=id;
                }else
                    clsPath=config.cls || config;

                var self=arguments.callee, 
                    me=this,
                    task=function(cls,config,threadid){
                        var o = new cls();

                        if(config.properties)
                            _.merge(o.properties,config.properties,'all');
                        if(config.events)
                            _.merge(o.events,config.events,'all');
                        if(config.singleton!==false)
                            linb.ComFactory.setCom(id, o);

                        var args = [function(com){
                            var arr = com.getUIComponents().get(),
                                fun=function(arr,subcfg,firstlayer){
                                    var self1 = arguments.callee;
                                    _.arr.each(arr,function(v,i){
                                        //if tag exists, replace tag with com from linb.ComFactory
                                        if(v.key=='linb.UI.Tag'){
                                            var tag=v, cid=tag.properties.tagKey;

                                            if(cid && subcfg && subcfg[cid])
                                                self.apply(me, [subcfg[cid], function(){
                                                    //set link to parent com(linb.Com)
                                                    com[cid]=this;
                                                    //set com parent
                                                    this.parent=com;

                                                    //replace tag with this
                                                    var ui = this.getUIComponents(), root;
                                                    // no UI in this com
                                                    if(!(root=ui.get(0)))return;

                                                    linb.UI.Tag.replace(tag,root,firstlayer?com:null);
                                                },threadid]);
                                        }
                                        if(v.children){
                                            var a=[];
                                            _.arr.each(v.children,function(o){
                                                a[a.length]=o[0];
                                            });
                                            self1(a, subcfg);
                                        }
                                    });
                                };
                            //handle tag sub from com
                            fun(arr,config.children,1);
                        }];
                        args.push(threadid||null);

                        //insert first
                        if(onEnd)
                            linb.Thread(threadid).insert({
                                task:onEnd,
                                args:[threadid,o],
                                scope:o
                            });
                        //latter
                        _.tryF(o[config.iniMethod ||'create'], args, o);
                    };
                linb.Thread.observableRun(function(threadid){
                    var f=function(a,b,threadid){
                        var cls;
                        if(cls=linb.SC.get(clsPath)){
                            linb.Thread(threadid).insert({
                                task:task,
                                args:[cls, config,threadid]
                            });
                        }
                    };
                    linb.SC(clsPath, function(path){
                        if(path)
                            f(0,0,threadid);
                        else
                            throw new Error(clsPath+' doesnt exists!');
                    }, true,threadid);
                },null,threadid);
            }
        },
        newCom:function(cls, onEnd, threadid, properties, events){
            return this.getCom(cls, onEnd, threadid, false, properties, events);
        },
        storeCom:function(id){
            var m,t,c=this._cache,domId=this._domId;
            if(t=c[id]){
                if(!(m=linb.Dom.byId(domId)))
                    //using display:none here for performance, when appendchild, it'll not trigger layout etc.
                    linb('body').prepend(linb.create('<div id="'+domId+'" style="display:none;"></div>'));
                m=linb(domId);
                t=t.getUIComponents();
                if(!t.isEmpty()){
                    //detach
                    t.get(0).unlinkParent();
                    //move to hide
                    m.append(t);
                }
            }
        },
        prepareComs:function(arr){
            var self=this,funs=[];
            _.arr.each(arr, function(i){
                funs.push(function(){
                    self.getCom(i);
                });
            });
            linb.Thread(null, funs, 500).start();
            return this;
        }
    }
});