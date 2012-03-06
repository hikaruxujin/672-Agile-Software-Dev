//rowMap => row_SerialIdMapItem
//rowMap2 => row_ItemIdMapSerialId
//colMap => header_SerialIdMapItem
//colMap2 => header_ItemIdMapSerialId
//cellMap => cells_SerialIdMapItem
Class("linb.UI.TreeGrid",["linb.UI","linb.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;
                if(profile.properties.activeMode=='none')return;

                var box = profile.boxing(),
                    uiv = box.getUIValue(),
                    p = profile.properties,
                    k = p.activeMode=='row'?'CELLS':'CELL',
                    getN = function(k,i){return profile.getSubNode(k,i)},
                    getI = function(i){
                        var map1=profile.rowMap2;
                        if(p.activeMode=='row')
                            return map1[i];
                        else{
                            if(!i)return;
                            var r=(''+i).split('|');
                            return _.get(profile.rowMap,[map1[r[0]],'_cells',r[1]]);
                        }
                    };

                if(p.selMode=='single'){
                    var itemId = getI(uiv);
                    if(uiv && itemId)
                        getN(k,itemId).tagClass('-checked',false);

                    itemId = getI(value);
                    if(itemId)
                        getN(k,itemId).tagClass('-checked');

                    /*if(itemId){
                        var o = getN("ROW",itemId);
                        if(o){
                            var top = o.offsetTop(),
                            items = getN('SCROLL'),
                            sh=items.scrollHeight(),
                            st=items.scrollTop(),
                            hh=items.height()
                            ;
                            if(sh > hh)
                                if(top<st || top>st+hh)
                                    items.scrollTop(top);
                        }
                    }*/
                }else if(p.selMode=='multi'||p.selMode=='multibycheckbox'){
                    uiv = uiv?(''+uiv).split(p.valueSeparator):[];
                    value = value?(''+value).split(p.valueSeparator):[];
                    //check all
                    _.arr.each(uiv,function(o){
                        getN(k, getI(o)).tagClass('-checked',false)
                    });
                    _.arr.each(value,function(o){
                        getN(k, getI(o)).tagClass('-checked')
                    });
                    // clear the header's row handler checkbox
                    if(value.length===0){
                        getN("HFMARK").tagClass('-checked',false);
                        delete profile._$checkAll;
                    }
                }
            });
        },
        /*insert rows to dom
        arr is formatted properties
        pid,base are item id
        before: insert before?
        */
        _insertRowsToDom:function(profile, arr, pid, base, before){
            //if parent not open, return
            if(pid){
                var parent = profile.rowMap[pid];
                if(parent && !parent._inited)return;
            }
            if(!arr)
                arr=[];

            var obj,hw,
                hw=profile.getSubNode('HFCELL').width();
            //give width at here
            _.arr.each(arr,function(o){
                o._row0DfW = hw?('width:'+hw+'px'):'';
                _.arr.each(o.cells,function(v,i){
                    v.width=v._col.width;
                })
            });

            //build dom
            var nodes = profile._buildItems('rows', arr);
            //get base dom
            if(!base){
                //no base add to parent
                if(pid){
                    obj = profile.getSubNode('SUB', pid);
                }else{
                    obj = profile.getSubNode('BODY');
                }
                if(before)
                    obj.prepend(nodes);
                else
                    obj.append(nodes);
            }else{
                //
                obj = profile.getSubNode('ROW', base);
                if(before)
                    obj.addPrev(nodes);
                else{
                    obj.addNext(nodes);
                }
            }

            //add sub
            _.arr.each(arr,function(o){
                o.open=false;
            });

            //clear rows cache
            delete profile.$allrowscache;
        },
        _refreshHeader:function(header){
            var profile=this.get(0),
                pro=profile.properties;

            _.breakO(profile.colMap,2);

            if(!header)
                header=[];

            header=profile.box._adjustHeader(header);

            var arr = profile.box._prepareHeader(profile, header);

            pro.header = header;
            this.removeAllRows();
            profile.getSubNode('HCELL', true).remove();
            if(arr.length)
                profile.getSubNode('HCELLS').append(profile._buildItems('header', arr));

            profile.box._ajdustBody(profile);

            // clear collist cache
            if(profile.$col_pop){
                profile.$col_pop.destroy();
                delete profile.$col_pop;
            }
            //clear editor cache
            _.each(profile.$cache_editor,function(o){
                o.destroy();
            });
            profile.$cache_editor={};
        },
        _toggleRows:function(rows, expend){
            var self=this;
            if(rows && rows.length)
                _.arr.each(rows,function(o){
                    self.toggleRow(o.id, expend);
                });
        },
        autoRowHeight:function(rowId){
            return this.each(function(prf){
                if(prf.renderId ){
                    if(rowId && prf.rowMap2[rowId])
                        prf.getSubNode('FHANDLER',prf.rowMap2[rowId]).onDblclick(true);
                    else
                        _.each(prf.rowMap,function(o,i){
                            prf.getSubNode('FHANDLER',i).onDblclick(true);
                        });
                }
            });
        },
        autoColWidth:function(colId){
            return this.each(function(prf){
                if(prf.renderId){
                    if(colId && prf.colMap2[colId])
                        prf.getSubNode('HHANDLER',prf.colMap2[colId]).onDblclick(true);
                    else
                        _.each(prf.colMap,function(o,i){
                            prf.getSubNode('HHANDLER',i).onDblclick(true);
                        });
                }
            });
        },
        addHotRow:function(){
            var prf=this.get(0);
            if(prf.renderId)
                prf.box._addTempRow(prf);
            return this;
        },
        removeHotRow:function(){
            var profile=this.get(0);
            profile.box._sethotrowoutterblur(profile,true);
            delete profile.__hastmpRow;
            this.removeRows([profile.box._temprowid]);
            return this;
        },
        isDirtied:function(){
            var dirty=false;
            _.each(this.get(0).cellMap,function(v){
                if(v.oValue!==v.value){
                    dirty=true;
                    return false;
                }
            });
            return dirty;
        },
        _getObjByDom:function(src, type){
            var prf=this.get(0),
                subId=prf.getSubId(typeof src=='string'
                    ? src.charAt(0)=='!'
                        ? ((src=linb.use(src).get(0))&&src.id)
                        : src
                    : src.id );
            return prf[type=="row"?"rowMap":type=="col"?"colMap":"cellMap"][subId];
        },
        getRowByDom:function(src){
            return this._getObjByDom(src, "row");
        },
        getHeaderByDom:function(src){
            return this._getObjByDom(src, "col");
        },
        getCellByDom:function(src){
            return this._getObjByDom(src, "cell");
        },
        /*rows related*/
        //type: 'original', 'data', 'min'
        getRows:function(type){
            var v=this.get(0).properties.rows,a,b;
            if(type=='data'||type=='min'){
                a=_.clone(v,true);

                if(a&&a.length&&a[a.length-1]&&a[a.length-1].id==this.constructor._temprowid)
                    a.pop();

                if(type=='min'){
                    _.arr.each(a,function(o,i){
                        _.each(b=a[i]=a[i].cells,function(v,j){
                            b[j] = v.value;
                        });
                    });
                }
                return a;
            }else
                return v;
        },
        getRowbyRowId:function(rowId, type){
            var profile=this.get(0),v=profile.rowMap2[rowId];
            v=v?profile.rowMap[v]:null;
            if(v){
                if(type=='data')
                    return _.clone(v,true);
                else if(type=='min'){
                    var a=_.clone(v,true),b;
                    _.each(b=a=a.cells,function(v,j){
                        b[j] = v.value;
                    });
                    return a;
                }else
                    return v;
            }
        },
        getRowbyCell:function(cell, type){
            var v=cell._row;
            if(v){
                if(type=='data')
                    return _.clone(v,true);
                else if(type=='min'){
                    var a=_.clone(v,true),b;
                    _.each(b=a=a.cells,function(v,j){
                        b[j] = v.value;
                    });
                    return a;
                }else
                    return v;
            }          
        },

        toggleRow:function(id, expend){
            var profile = this.get(0),
            row = profile.rowMap[profile.rowMap2[id]];
            if(row && row.sub)
                profile.box._setSub(profile, row, typeof expend=="boolean"?expend:!row._checked);
            return this;

        },
        updateRow:function(rowId,options){
            var ns=this, profile=ns.get(0), orow=ns.getRowbyRowId(rowId), nid;
            if(orow){
                var rid=orow._serialId, t,tt;
                if(typeof options!='object') options={caption:options};
                else _.filter(options,true);
                
                // [[modify id
                if(_.isSet(options.id))options.id+="";
                if(options.id && options.id!==rowId){
                    nid=options.id;
                    var m2=profile.rowMap2, v;
                    if(!m2[nid]){
                        if(v=m2[rowId]){
                            m2[nid]=v;
                            delete m2[rowId];
                            profile.rowMap[v].id=nid;
                            // modify cells link
                            _.each(profile.colMap,function(o){
                                if(o=o._cells){
                                    o[nid]=o[rowId];
                                    delete o[rowId];
                                }
                            });
                        }
                    }
                }else{
                    options.id=rowId; 
                }
                // modify id only
                if(_.isEmpty(options))
                    return ns;
                //]]

                // need to refresh
                if(('group' in options && options.group!=orow.group) ||
                    'cells' in options ||
                    ('sub' in options && 
                    // only try to show/hide toggle icon
                    !((options.sub===true && !orow.sub) || (!options.sub && orow.sub===true)))
                ){
                    var id="__special",pid=orow._pid?profile.rowMap[orow._pid].id:null;
                    // change id in rowMap
                    orow.id=id;
                    // change link in rowMap2
                    profile.rowMap2[id]=profile.rowMap2[nid||rowId];
                    delete profile.rowMap2[nid||rowId];
                    // remove cells link
                    _.each(profile.colMap,function(o){
                        if(o=o._cells)
                            delete o[nid||rowId];
                    });
                    // make sure data
                    orow=_.clone(orow,true);
                    _.merge(orow, options, 'all');
                    if('sub' in options && !options.sub)delete orow.sub;
                    
                    ns.insertRows([orow],pid,id,true);
                    ns.removeRows([id]);
                    
                    if(profile.properties.activeMode=='row'){
                        var uiv=profile.properties.$UIvalue||"", arr=(''+uiv).split(profile.properties.valueSeparator);
                        if(arr.length && _.arr.indexOf(arr, rowId)!=-1){
                            if(nid)
                                _.arr.removeValue(arr, rowId);
                            ns.setUIValue(arr.join(profile.properties.valueSeparator), true);
                        }
                    }
                    
                }else{
                    if('sub' in options){
                        t=ns.getSubNode('ROWTOGGLE',rid);
                        if(options.sub)
                            t.removeClass('linb-uicmd-empty').addClass('linb-uicmd-toggle2')
                        else
                            t.removeClass('linb-uicmd-toggle2').addClass('linb-uicmd-empty')
                    }

                    if(t=options.height)
                        ns.getSubNode('CELLS',rid).height(t);
                        
                    if(t=options.rowStyle)
                        (tt=ns.getSubNode('CELLS',rid)).attr('style',tt.attr('style')+";"+t);
                        
                    if(t=options.rowClass)
                        ns.getSubNode('CELLS',rid).addClass(t);
                        
                    if(options.hasOwnProperty('disabled')){
                        var cls=profile.getClass('CELLS', '-disabled');
                        if(options.disabled)
                            ns.getSubNode('CELLS',rid).addClass(cls);
                        else
                            ns.getSubNode('CELLS',rid).removeClass(cls);
                    }
                    if(options.hasOwnProperty('readonly')){
                        var cls=profile.getClass('CELLS', '-readonly');
                        if(options.readonly)
                            ns.getSubNode('CELLS',rid).addClass(cls);
                        else
                            ns.getSubNode('CELLS',rid).removeClass(cls);
                    }
                    if(t=options.firstCellStyle)
                        (tt=ns.getSubNode('FCELL',rid)).fisrt().attr('style',tt.attr('style')+";"+t);
                    if(t=options.firstCellClass)
                        ns.getSubNode('FCELL',rid).fisrt().addClass(t);

                    if(options.hasOwnProperty('caption'))
                        ns.getSubNode('FCELLCAPTION',rid).get(0).innerHTML=options.caption;
                    if(options.hasOwnProperty('preview')){
                        if(options.preview)
                            ns.getSubNode('PREVIEW',rid).css('display','block').html(options.preview);
                        else
                            ns.getSubNode('PREVIEW',rid).css('display','none');
                    }
                    if(options.hasOwnProperty('summary')){
                        if(options.summary)
                            ns.getSubNode('SUMMARY',rid).css('display','block').html(options.summary);
                        else
                            ns.getSubNode('SUMMARY',rid).css('display','none');
                    }
                    if(options.hasOwnProperty('rowResizer')){
                        t=!!options.rowResizer;
                        ns.getSubNode('FHANDLER',rid).css('display',(options.rowResizer=t)?"block":'none');
                    }

                    _.merge(orow, options, 'all');
                }
            }else{
                var rst=ns.get(0).queryItems(ns.getRows(),function(o){return typeof o=='object'?o.id===rowId:o==rowId},true,true,true);
                if(rst.length)
                    _.merge(rst[0][0], options, 'all');
            }
            return ns;
        },
        //pid,base are id
        insertRows:function(arr, pid, base ,before){
            if(!arr || !_.isArr(arr) || arr.length<1)return this;

            var c=this.constructor, 
                profile=this.get(0), 
                pro=profile.properties, 
                row_m=profile.rowMap2, 
                b=profile.rowMap,
                tar, t, k;

            pid = row_m[pid];

            base = row_m[base];
            if(base){
                t=profile.rowMap[base];
                if(t)pid=t._pid;
            }
            arr=c._adjustRows(arr);
            if(!pid)
                tar = (pro.rows || (pro.rows=[]));
            else{
                k=b[pid];
                tar = _.isArr(k.sub)?k.sub:(k.sub=[]);
            }

            //1
            var rows;
            if(profile.renderId){
                // if insert to root, or the parent node is inited
                if(!pid || k._inited){
                    //prepareData(add links)
                    rows = c._prepareItems(profile, arr, pid);
                    this._insertRowsToDom(profile, rows, pid, base, before);
                }
            }
            //2
            //must be here
            if(!base)
                _.arr.insertAny(tar, arr, before?0:-1);
            else{
                var index = _.arr.subIndexOf(tar,'_serialId', base);
                _.arr.insertAny(tar,arr, before?index:(index+1));
            }
            //3
            if(profile.renderId){
                if(!pro.iniFold)
                    profile.boxing()._toggleRows(rows,true);
                profile.box._asy(profile);
            }

            // if hot row exists, ensure it's the last one
            if(profile.renderId&&profile.__hastmpRow){
                var rows=profile.properties.rows;
                if(rows[rows.length-1].id!=profile.box._temprowid)
                    profile.box.__ensurehotrow(profile);
            }
            return this;
        },
        //delete row according to id
        //linb.UI.TreeGrid.getAll().removeRows(['2','5'])
        removeRows:function(ids){
            var self=this,
                profile=self.get(0),
                p=profile.properties,
                cell=profile.cellMap,
                nodes=[],v;

            //get array
            ids = _.isArr(ids)?ids:[ids];
            _.arr.each(ids,function(id){
                //get item id
                if(!(id=profile.rowMap2[id]))return;

                //get row
                var row;
                if(row = profile.rowMap[id]){
                    var tdids = row._cells,
                        rowid = row.id,
                        temp;
                    //for sub delete
                    if(row.sub && _.isArr(row.sub)){
                        var arr=[];
                        _.arr.each(row.sub,function(o){
                            arr.push(o.id)
                        });
                        self.removeRows(arr);
                    }

                    ////delete and clear links
                    _.each(tdids,function(o,i){
                        //clear colMap/properties.header
                        delete cell[o]._col._cells[rowid];
                        _.breakO(cell[o]);
                        //clear cellMap
                        delete cell[o];
                        profile.reclaimSubId(o.slice(2), 'cell');
                    });

                    //clear properties.row array
                    if(temp= row._pid?(temp=profile.rowMap[row._pid])?temp.sub:null:profile.properties.rows)
                        if(_.isArr(temp))
                            _.filter(temp,function(o){
                                return o._serialId != id;
                            });

                    //clear profile.rowMap2
                    delete profile.rowMap2[rowid];

                    //clear rowMap
                    _.breakO(profile.rowMap[id]);
                    delete profile.rowMap[id];

                    nodes.push(profile.getSubNode('ROW', id).get(0));
                }
                    profile.reclaimSubId(id.slice(2), 'row');
            });
            // clear UI value
            if(v=p.$UIvalue){
                if((v=(''+v).split(p.valueSeparator)).length>1){
                    _.filter(v,function(o){
                        return _.arr.indexOf(ids,o)==-1;
                    });
                    p.$UIvalue=v.join(p.valueSeparator);
                }else{
                    if(_.arr.indexOf(ids,p.$UIvalue)!=-1)
                        p.$UIvalue=null;
                }
            }
            linb(nodes).remove();

            // remove activerow/cell
            if(profile.$activeCell && !linb.Dom.byId(profile.$activeCell))
                delete profile.$activeCell;
            if(profile.$activeRow && !linb.Dom.byId(profile.$activeRow))
                delete profile.$activeRow;

            //clear rows cache
            delete profile.$allrowscache;
            
            profile.box._asy(profile);
            
            if(profile.renderId&&profile.__hastmpRow){
                profile.box.__ensurehotrow(profile);
            }
            
            return self;
        },
        removeAllRows:function(){
            var profile=this.get(0);
            for(var i in profile.cellMap)
                profile.reclaimSubId(i.slice(2), 'cell');
            for(var i in profile.rowMap)
                profile.reclaimSubId(i.slice(2), 'row');

            //remove links
            _.each(profile.colMap,function(o){
                o._cells={};
            });
            _.breakO([profile.rowMap, profile.cellMap],3);

            profile.rowMap={};
            profile.cellMap={};
            profile.rowMap2={};

            // remove activerow/cell
            delete profile.$activeCell;
            delete profile.$activeRow;

            profile.properties.rows.length=0;
            if(profile.renderId){
                profile.getSubNode('BODY').empty();
                profile.getSubNode('SCROLL').scrollTop(0).scrollLeft(0);
                // ensure the column header scroll to zero
                // code must same to the SCROLL->onScroll event
                if(profile.$sl!=0)
                    profile.getSubNode('HEADER').get(0).scrollLeft=profile.$sl=0;
            }
            //clear rows cache
            delete profile.$allrowscache;
            profile.properties.$UIvalue=null;

            if(profile.renderId&&profile.__hastmpRow){
                profile.box.__ensurehotrow(profile);
            }
            
            return this;
        },
        resetRowValue:function(rowId){
            var profile=this.get(0),row=this.getRowbyRowId(rowId),arr=[],prop=profile.properties;
            _.arr.each(row.cells,function(o){
                if(o.oValue!==o.value){
                    o.oValue=o.value;
                    delete o.dirty;
                    if(prop.dirtyMark)
                        arr.push(profile.getSubNode('CELLA',o._serialId).get(0));
                }
            });
            if(prop.dirtyMark && prop.showDirtyMark)
                linb(arr).removeClass('linb-ui-dirty');
        },
        resetColValue:function(colId){
            var profile=this.get(0),col=this.getHeaderByColId(colId),arr=[],prop=profile.properties;
            _.arr.each(col.cells,function(o){
                if(o.oValue!==o.value){
                    o.oValue=o.value;
                    delete o.dirty;
                    if(prop.dirtyMark)
                        arr.push(profile.getSubNode('CELLA',o._serialId).get(0));
                }
            });
            if(prop.dirtyMark && prop.showDirtyMark)
                linb(arr).removeClass('linb-ui-dirty');
        },
        getActiveRow:function(){
            var ar,profile=this.get(0);
            if(profile.properties.activeMode!='row')return;
            if(!(ar=profile.$activeRow))return;
            ar=profile.rowMap[profile.getSubId(ar)];
            if(ar && ar.id && ar.id==profile.box._temprowid){
                ar=null;
            }
            return ar;
        },
        setActiveRow:function(rowId){
            var dr, row, profile=this.get(0);            
            if(profile.properties.activeMode!='row')return;
            // deative first
            profile.box._activeRow(profile, false);

            if(!(row=this.getRowbyRowId(rowId)))return;
            if(!(dr=profile.getSubNode('CELLS',row._serialId)).isEmpty())
                profile.box._activeRow(profile, dr.get(0).id);
            return this;
        },

        /*column and header related*/
        //type: 'original', 'data', 'min'
        getHeader:function(type){
            var v=this.get(0).properties.header;
            if(type=='data')
                return _.clone(v,true);
            else if(type=='min'){
                var a=_.clone(v,true),b;
                _.arr.each(a,function(o,i){
                    a[i]=o.id;
                });
                return a;
            }else
                return v;
        },
        getHeaderByColId:function(colId, type){
            var v=this.get(0).properties.header,
                i=_.arr.subIndexOf(v,"id",colId);
            return i==-1?null:
                type=='data'?_.clone(v[i],true):
                type=='min'?v[i].id:
                v[i];
        },
        getHeaderByCell:function(cell, type){
            var v=cell._col;
            return !v?null:
                type=='data'?_.clone(v,true):
                type=='min'?v.id:
                v;
        },

        updateHeader:function(colId,options){
            var ns=this, colh=ns.getHeaderByColId(colId);
            if(colh){
                var hid=colh._serialId, t, tt;

                if(typeof options!='object') options={caption:options+''};
                else _.filter(options,true);
                delete options.id;

                if(t=options.width){
                    var n=[];
                    n.push(ns.getSubNode('HCELL',hid).get(0));
                    _.each(colh._cells,function(o){
                        n.push(ns.getSubNode('CELL',o).get(0));
                    });
                    linb(n).width(t);
                    ns.constructor._ajdustBody(ns.get(0));
                }

                if(t=options.headerStyle)
                    (tt=ns.getSubNode('HCELL',hid)).attr('style',tt.attr('style')+";"+t);
                if(t=options.headerClass)
                    ns.getSubNode('HCELL',hid).addClass(t);

                if(options.hasOwnProperty('caption'))
                    ns.getSubNode('HCELLCAPTION',hid).get(0).innerHTML=options.caption;
                if('colResizer' in options){
                    t=!!options.colResizer;
                    ns.getSubNode('HHANDLER',hid).css('display',(options.colResizer=t)?"block":'none');
                }

                //  Forward-compatible with 'visibility'
                if(options.hasOwnProperty('visibility') && !options.hasOwnProperty('hidden'))
                    options.hidden=!options.visibility;

                if('hidden' in options){
                    var  b = !!options.hidden;
                    if(b){
                        if(colh.hidden!==true){
                            ns.showColumn(colId, false);
                        }
                    }else{
                        if(colh.hidden===true){
                            ns.showColumn(colId, true);
                        }
                    }
                }

                _.merge(colh, options, 'all');
            }
            return ns;
        },
        showColumn:function(colId, flag){
            var profile=this.get(0),
                map=profile.colMap2,
                    cols=profile.colMap,
                    col,
                    sid,
                    cells,
                    n=[];
                if(col=cols[sid=map[colId]]){
                if(profile.beforeColShowHide && false===profile.boxing().beforeColShowHide(profile,colId,flag))
                    return false;

                    n.push(profile.getSubNode('HCELL',sid).get(0));
                    _.each(col._cells,function(id){
                        n.push(profile.getSubNode('CELL',id).get(0));
                    });
                    linb(n).css('display',(col.hidden=(flag===false?true:false))?'none':'');
                
                if(profile.afterColShowHide)
                    profile.boxing().afterColShowHide(profile,colId,flag);
                }
                profile.box._ajdustBody(profile);
            return true;
        },
        sortColumn:function(colId, desc, sortby){
            var prf=this.get(0), sId=prf.colMap2[colId],col=prf.colMap[sId];
            if(sId && col){
                if(_.isBool(desc))
                    col._order=!desc;
                if(_.isFun(sortby))
                    col.sortby=sortby;
                prf.getSubNode("HCELLA",sId).onClick();
            }
            return this;
        },
        /*cell realted*/
        getCell:function(cellId, type){
            var self=this,profile=this.get(0),v;
            _.each(profile.cellMap,function(o){
                if(o.id && o.id===cellId){
                    cellId=o._serialId;
                    return false;
                }
            });
            v=profile.cellMap[cellId];
            return !v?null:
                    type=='data'? _.merge({rowId:v._row.id, colId:v._col.id},_.clone(v,true)):
                    type=='min'? v.value:
                    v;
        },
        getCellbyRowCol:function(rowId, colId, type){
            var profile=this.get(0),v;
            v=_.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
            v=v && profile.cellMap[v];
            return !v?null:
                    type=='data'? _.merge({rowId:v._row.id, colId:v._col.id},_.clone(v,true)):
                    type=='min'? v.value:
                    v;
        },
        getCells:function(rowId, colId, type){
            var map={};
            _.each(this.get(0).cellMap,function(v){
                if((rowId?(rowId==v._row.id):1) && (colId?(colId==v._col.id):1)){
                    map[v.id]= type=='data'?_.merge({rowId:v._row.id, colId:v._col.id},_.clone(v,true)):
                               type=='min' ? v.value:
                               v;
                }
            });
            //dont return inner value
            return map;
        },

        updateCellByRowCol:function(rowId, colId, options, dirtyMark, triggerEvent){
            var t,self=this,con=self.constructor;
            if(t=con._getCellId(self.get(0), rowId, colId))
                con._updCell(self.get(0), t, options, dirtyMark, triggerEvent);
            return self;
        },
        updateCell:function(cellId, options, dirtyMark, triggerEvent){
            var self=this,profile=this.get(0);
            _.each(profile.cellMap,function(o){
                if(o.id && o.id===cellId){
                    cellId=o._serialId;
                    return false;
                }
            });
            self.constructor._updCell(profile,cellId,options, dirtyMark, triggerEvent);
            return self;
        },
        editCellbyRowCol:function(rowId, colId){
            var profile=this.get(0),con=profile.box;
            con._editCell(profile, con._getCellId(profile, rowId, colId));
            return this;
        },
        editCell:function(cell){
            this.constructor._editCell(this.get(0), cell);
            return this;
        },
        offEditor:function(){
            var profile=this.get(0),editor;
            if(profile&&profile.$curEditor){
                editor=profile.$curEditor;
                _.tryF(editor.undo,[],editor);
            }
        },
        focusCellbyRowCol:function(rowId, colId){
            var profile=this.get(0),con=profile.box,
                cellId=con._getCellId(profile, rowId, colId);
            profile.getSubNode('CELLA', cellId).focus(true);
            return this;
        },
        focusCell:function(cell){
            var cellId=cell._serialId;
            this.get(0).getSubNode('CELLA', cellId).focus(true);
            return this;
        },
        getActiveCell:function(){
            var ar,profile=this.get(0);
            if(profile.properties.activeMode!='cell')return;
            if(!(ar=profile.$activeCell))return;
            return profile.cellMap[profile.getSubId(ar)];
        },
        setActiveCell:function(rowId, colId){
            var dr, cell, profile=this.get(0);
            if(profile.properties.activeMode!='cell')return;
            // deative first
            profile.box._activeCell(profile, false);

            if(typeof rowId=='object')
                cell=rowId;
            else
                cell=this.getCellbyRowCol(rowId, colId);
            
            if(!cell)
                return;
            
            if(!(dr=profile.getSubNode('CELL',cell._serialId)).isEmpty())
                profile.box._activeCell(profile, dr.get(0).id);
            return this;
        },

        /*others*/
        // reset all cells' value, and clear all dirty mark
        resetGridValue:function(){
            return this.each(function(profile){
                var prop=profile.properties;
                _.each(profile.cellMap,function(v){
                    v.oValue=v.value;
                    delete v.dirty;
                });
                if(prop.dirtyMark && prop.showDirtyMark)
                    profile.getSubNode('CELLA',true).removeClass('linb-ui-dirty');
            })
        },
        getDirtied:function(rowId, colId){
            var map={};
            _.each(this.get(0).cellMap,function(v){
                if(v.oValue!==v.value &&(rowId?(rowId==v._row.id):1) &&(colId?(colId==v._col.id):1)){
                    map[v.id]={rowId:v._row.id, colId:v._col.id, value:v.value, oValue:v.oValue};
                }
            });
            //dont return inner value
            return map;
        },
        getSubNodeInGrid:function(key, rowId, colId){
            var ns=this,
                t=  (rowId && colId) ? ns.getCellbyRowCol(rowId, colId) :
                    colId ? ns.getHeaderByColId(colId):
                    rowId ? ns.getRowbyRowId(rowId):null;
            return ns.getSubNode(key, (t&&t._serialId)||true);
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['ALT','PROGRESS']);
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
                tagName : 'div',
                BOX:{
                    tagName:'div',
                    HEADER:{
                        $order:0,
                        tagName:'div',
                        style:"{showHeader}",
                        //for scroll performance
                        HI:{
                            tagName:'div',
                            HCELLS:{
                                tagName:'div',
                                style:'{headerHeight};',
                                /*the first col (row handler) in table header*/
                                HFCELL:{
                                    $order:0,
                                    style:'{rowHandlerDisplay};{_row0DfW};',
                                    className:'{cellCls}',
                                    HCELLA:{
                                        style:'{firstCellStyle};',
                                        className:'{firstCellClass}',
                                        HHANDLER:{
                                            tagName:'div',
                                            style:'{colDDDisplay}'
                                        },
                                        FHANDLER:{
                                            tagName:'div',
                                            style:'{rowDDDisplay}'
                                        },
                                        HFMARK:{
                                            className:"linb-uicmd-check",
                                            style:'{_rowMarkDisplay}'
                                        },
                                        GRIDCAPTION:{
                                            $order:2,
                                            text:'{gridHandlerCaption}'
                                        },
                                        SORT:{
                                            style:'{sortDisplay}'
                                        }
                                    }
                                },
                                OTHERHCELLS:{
                                    $order:1,
                                    tagName:'text',
                                    text:'{header}'
                                }
                            }
                        }
                    },
                    SCROLL:{
                        $order:1,
                        tagName:'div',
                        className:'linb-uibg-base ',
                        BODY:{
                            tagName:'div',
                            text:'{rows}'
                        }
                    },
                    FOOTER:{
                        $order:2
                    },
                    COLLIST:{
                        tagName:'div'
                    },
                    ARROW:{}
                }
            },
            $submap : {
                /*the other header in table header*/
                header:{
                    HCELL:{
                        style:"width:{width}px;{colDisplay};",
                        className:'{cellCls}',
                        HCELLA:{
                            className:'{headerClass}',
                            style:"{headerStyle}",
                            HCELLCAPTION:{
                                text:"{caption}"
                            },
                            SORT:{
                                style:'{sortDisplay}'
                            },
                            HHANDLER : {
                                $order:2,
                                tagName:'div',
                                style:'{colDDDisplay}'
                            }
                        }
                    }
                },
                rows:{
                    ROW:{
                        tagName:'div',
                        PREVIEW:{
                            $order:1,
                            tagName:'div',
                            style:'{previewDisplay}',
                            text:'{preview}'
                        },
                        CELLS:{
                            $order:2,
                            tagName:'div',
                            className:'{rowCls} {rowClass}',
                            style:'height:{rowHeight}px;{rowStyle}',
                            FCELL:{
                                $order:0,
                                style:'{rowHandlerDisplay};{_row0DfW};',
                                className:'{cellCls}',
                                CELLA:{
                                    tabindex: '{_tabindex}',
                                    style:'{cellStyle}{firstCellStyle}',
                                    className:'{cellClass}{firstCellClass}',
                                    ROWLRULER:{
                                        style:'{_treeMode};width:{_rulerW}px'
                                    },
                                    ROWTOGGLE:{
                                        $order:2,
                                        style:'{_treeMode};',
                                        className:'{subClass}'
                                    },
                                    FHANDLER:{
                                        tagName:'div',
                                        style:'{rowDDDisplay}'
                                    },
                                    FCELLINN:{
                                        $order:3,
                                        ROWNUM:{},
                                        FCELLCAPTION:{
                                            $order:1,
                                            text:'{caption}'
                                        }
                                    },
                                    MARK:{
                                        $order:1,
                                        style:'{_rowMarkDisplay}'
                                    }
                                }
                            },
                            OTHERCELLS:{
                                tagName:'text',
                                $order: 1,
                                text:'{cells}'
                            }
                        },
                        SUB:{
                            $order:3,
                            tagName:'div'
                        },
                        SUMMARY:{
                            $order:4,
                            tagName:'div',
                            style:'{summaryDisplay}',
                            text:'{summary}'
                        }
                    }
                },
                'rows.cells':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'checkbox':'.checkbox','button':'.button','progress':'.progress'});
                    linb.UI.$doTemplate(profile,template,v,tag+(map[v.type]||'.input'),result)
                 },
                'rows.cells.input':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};',
                        className:'{cellCls}',
                        CELLA:{
                            className:'{cellClass}',
                            style:'{bgcolor};{color};{cellStyle}',
                            tabindex: '{_tabindex}',
                            text:"{caption}"
                        }
                    }
                },
                'rows.cells.button':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};',
                        className:'{cellCls}',
                        CELLA:{
                            tagName:'button',
                            className:'{cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            text:"{caption}"
                        }
                    }
                },
                'rows.cells.checkbox':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay}',
                        className:'{cellCls}',
                        CELLA:{
                            className:'{cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            CHECKBOX:{
                                className:'{checkboxCls}'
                            }
                        }
                    }
                },
                'rows.cells.progress':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay}',
                        className:'{cellCls}',
                        CELLA:{
                            className:'{cellClass}',
                            style:'{cellStyle}',
                            tabindex: '{_tabindex}',
                            PROGRESS:{
                                tagName:'div',
                                style:'width:{progress};',
                                text:'{caption}'
                            }
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                //in firefox, a can focused with display:block
                display:'block',
                position:'absolute',
                overflow:'hidden'
            },
            BOX:{
                display:'block',
                position:'relative',
                overflow:'hidden'
            },

            HEADER:{
                background:  linb.UI.$bg('head.gif', '#CAE3FF repeat-x left top'),
                position:'relative',
                overflow:'hidden'
            },
            HI:{
                position:'relative'
            },
            SCROLL:{
                overflow:'auto',
                position:'relative'
            },
            ARROW:{
                position:'absolute',
                'z-index':'20',
                left:0,
                top:0,
                display:'none',
                width:'14px',
                height:'18px',
                background:  linb.UI.$bg('icons.gif', 'no-repeat -72px -270px', true)
            },
            COLLIST:{
                position:'absolute',
                'z-index':'10',
                left:0,
                top:0,
                cursor:'pointer',
                visibility:'hidden',
                background:  linb.UI.$bg('collist.gif', '#FFF1A0 no-repeat center bottom'),
                border:'1px solid',
                'border-color':  '#fff #ACA899 #ACA899 #fff'
            },
            BODY:{
                overflow:'visible',
                position:'absolute',
                'background-color':'#fff',
                'padding-bottom':'1px',
                left:0,
                top:'0',
                'font-size':0,
                'line-height':0
            },
            'SORT, SORT-checked':{
                width:'16px',
                height:'16px'
            },
            SORT:{
                background: linb.UI.$bg('icons.gif', 'no-repeat -110px -220px', true),
                position:'absolute',
                right:'2px',
                bottom:'2px'
            },
            'HCELL-mouseover SORT':{
                $order:1,
                'background-position': '-110px -240px'
            },
            'HCELL-mousedown SORT':{
                $order:2,
                'background-position': '-110px -260px'
            },
            'SORT-checked':{
                $order:3,
                'background-position': '-130px -220px'
            },
            'HCELL-mouseover SORT-checked':{
                $order:4,
                'background-position': '-130px -240px'
            },
            'HCELL-mousedown SORT-checked':{
                $order:5,
                'background-position': '-130px -260px'
            },
            HHANDLER:{
                position:'absolute',
                //if set z-index, disappearing in opera
                //'z-index':'10',
                background: linb.browser.ie?'url('+linb.ini.img_bg+')':null,
                width:'4px',
                top:'0',
                right:'0',
                height:'100%',
                cursor:'e-resize',
                'font-size':0,
                'line-height':0
            },
            'HCELLS, CELLS':{
                //for ie height change trigger
                'overflow-y': linb.browser.ie ?'hidden':'',
                position:'relative',
                'white-space': 'nowrap',
                'font-size':'12px',
                'line-height':'18px'
            },
            HCELLS:{
                'padding-bottom':'2px'
            },
            CELLS:{
                'border-bottom': '1px solid #A2BBD9'
            },
            'CELLS-group':{
                $order:1,
                'border-right': '1px solid #A2BBD9'
            },
            'CELLS-group FCELL':{
                'border-right':0,
                'padding-right':'1px',
                overflow:'visible'
            },
            'CELLS-group FCELLCAPTION, CELLS-group CELLA, CELLS-group FCELLINN':{
                'font-weight':'bold',
                color:'#3764A0',
                overflow:'visible'
            },
            'PREVIEW,SUMMARY':{
                position:'relative',
                display:'none',
                'padding-left':'16px',
                'border-right': '1px solid #A2BBD9'
            },
            PREVIEW:{
                $order:4,
                'border-bottom': '1px solid #A2BBD9'
            },
            SUMMARY:{
                $order:4,
                'border-bottom': '1px solid #A2BBD9'
            },
           'CELLS-mouseover':{
                $order:4,
                'background-color':'#DFE8F6'
            },
            
            'CELLS-readonly CELLA':{
                 $order:5,
                 color:'#808080'
            },            
            'CELL-readonly CELLA':{
                 $order:6,
                 color:'#808080'
            },
            'CELLS-disabled':{
                 $order:7,
                 'background-color':'#EBEADB'
            },
            'CELLS-disabled CELLA':{
                 $order:7,
                 color:'#808080'
            },
            'CELL-disabled':{
                 $order:8,
                 'background-color':'#EBEADB'
            },
            'CELL-disabled CELLA':{
                 $order:8,
                 color:'#808080'
            },
            
            'CELLS-active, CELL-active':{
                 $order:5,
                 'background-color':'#A3BAE9'
            },
            "CELLS-hot":{
                $order:6,
                'background-color':'#FFE97F'
            },
            'CELLS-checked, CELL-checked, CELLS-checked CELLA, CELL-checked CELLA':{
                 $order:6,
                'background-color':'#7199E8',
                color:'#fff'
            },
            "FCELL CELLA":{
                'text-align': 'left'
            },
            "HFCELL HCELLA":{
                'text-align': 'center'
            },
            FHANDLER:{
                position:'absolute',
                'height':'4px',
                left:'0px',
                width:'100%',
                bottom:'0px',
                cursor:'n-resize',
                'z-index':10,
                'font-size':0,
                'line-height':0
            },
            'FCELLCAPTION, FCELLINN':{
                'vertical-align':'middle',
                overflow:'hidden'
            },
            'HFCELL, HCELL':{
               background:  linb.UI.$bg('head.gif', '#CAE3FF repeat-x left top'),
               height:'100%',
               'border-left':'1px solid #fff',
               'border-top':'1px solid #fff',
               'border-right':'1px solid #A2BBD9',
               'border-bottom':'1px solid #A2BBD9',
               padding:0,
               'vertical-align':'top',
                'font-size':'12px',
                'line-height':'14px'
            },
            'HFCELL-mouseover, HCELL-mouseover':{
                background:  linb.UI.$bg('head_mouseover.gif', '#FFF1A0 repeat-x left top')
            },
            ROW:{
                position:'relative',
                zoom:linb.browser.ie?1:null,
                width:linb.browser.ie?'100%':null,
                'font-size':0,
                'line-height':0
            },
            ROWNUM:{
                'padding-right':'6px',
                color:'#808080'
            },
            'FCELL, CELL':{
                //firefox:height:100% without overflow:hidden
                'padding-left':'1px',
                'border-right':'1px solid #A2BBD9',
                height:'100%',
                position:'relative',
                overflow:linb.browser.ie6?'hidden':'',
                'font-size':'12px',
                'line-height':'20px',
                'vertical-align':'top'
            },
            'ALT':{
                'background-color':'#EFF8FF'
            },
            //
            'CELL-label a':{
                color: '#000'
            },
            'CELL-input':{
            },
            'CELL-number, CELL-spin, CELL-currency':{
                'text-align':'right'
            },
            'CELL-checkbox':{
                'text-align':'center'
            },
            'CELL-button CELLA':{
                width:'100%'
            },
            'CELL-mouseover':{
                $order:5,
                'background-color':'#DFE8F6'
            },
            'FCELL CELLA, HCELLA':{
                position:'relative'
            },
            HCELLA:{
                'text-align': 'center'
            },
            'HCELLA, CELLA':{
                display:'block',
                overflow:'hidden',
                '-moz-box-flex':'1',
                'outline-offset':'-1px',
                '-moz-outline-offset':(linb.browser.gek && parseInt(linb.browser.ver)<3)?'-1px !important':null,
                height:'100%',
                color:'#000',
                //ie need this
                width:linb.browser.ie?'100%':'',
                'line-height':'19px'
            },
            'CELLA-inline':{
                $order:5,
                display:linb.$inlineBlock,
                width:'auto',
                '-moz-box-flex':0
            },
            PROGRESS:{
                height:'100%',
                'background-color':'#00ffff',
                'text-align':'center',
                overflow:'visible',
                opacity:0.7,
                '*filter':'alpha(opacity=70)'
            },
            'CHECKBOX, MARK':{
               cursor:'pointer',
               width:'16px',
               height:'16px',
               'vertical-align':'middle',
               background: linb.UI.$bg('icons.gif', 'no-repeat -20px -70px', true)
            },
            'CELL-mouseover CHECKBOX':{
                $order:1,
                'background-position': '-20px -90px'
            },
            'CELL-mousedown CHECKBOX':{
                $order:2,
                'background-position': '-20px -110px'
            },
            'CHECKBOX-checked, CELLS-checked MARK':{
                $order:3,
                'background-position': '0 -70px'
            },
            'CELL-mouseover CHECKBOX-checked':{
                $order:4,
                'background-position': '0 -90px'
            },
            'CELL-mousedown CHECKBOX-checked':{
                $order:5,
                'background-position': '0 -110px'
            },
            SUB:{
                //for ie bug: relative , height='auto' will disppear
                zoom:linb.browser.ie?1:null,
                height:0,
                position:'relative',
                overflow:'hidden',
                'font-size':'1px',
                //1px for ie8
                'line-height':'1px'
            }
        },
        _objectProp:{tagVar:1,rowOptions:1,colOptions:1},
        Behaviors:{
            HoverEffected:{ROWTOGGLE:'ROWTOGGLE', HCELL:'HCELL', HFCELL:'HFCELL'},
            ClickEffected:{ROWTOGGLE:'ROWTOGGLE', CELL:'CELL', HCELL:'HCELL'},
            DroppableKeys:['SCROLL','CELLS','ROWTOGGLE'],
            DraggableKeys:['FCELL'],

            onSize:linb.UI.$onSize,
            HFMARK:{
                onClick:function(profile,e,src){
                    if(profile.properties.selMode!='multi'&&profile.properties.selMode!='multibycheckbox')return;

                    var rows=[];
                    _.each(profile.rowMap,function(o){
                        rows.push(o.id);
                    });
                    if(profile._$checkAll){
                        delete profile._$checkAll;
                        profile.boxing().setUIValue("");
                        linb.use(src).tagClass('-checked',false)
                    }else{
                        profile._$checkAll=true;
                        linb.use(src).tagClass('-checked')
                        profile.boxing().setUIValue(rows.join(profile.properties.valueSeparator));
                    }
                    return false;
                }
            },
            //key navigator
            SCROLL:{
                onScroll:function(profile, e, src){
                    var l=linb.use(src).get(0).scrollLeft||0;
                    if(profile.$sl!=l)
                        profile.getSubNode('HEADER').get(0).scrollLeft=profile.$sl=l;
                }
            },
            //colomn resizer
            HHANDLER:{
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!='left')return;
                    var p=profile.properties,
                    o=linb(src),
                    minW =o.parent(2).width()-p._minColW,
                    scroll = profile.getSubNode('SCROLL'),
                    maxW = scroll.offset().left + scroll.width() - linb.Event.getPos(e).left - 4,
                    id = profile.getSubId(src),
                    col = profile.colMap[id];

                    if(p.disabled)return false;
                    if(col && col.disabled)return false;

                    o.startDrag(e, {
                        horizontalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        maxLeftOffset:minW,
                        maxRightOffset:maxW,
                        targetReposition:false
                    });
                    linb.use(src).parent(2).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onDragbegin:function(profile, e, src){
                    linb.DragDrop.getProfile().proxyNode
                    .css({
                        height:profile.getRoot().height()+'px',
                        width:'4px',
                        backgroundColor:'#ddd',
                        cursor:'e-resize'
                    });
                },
                onDrag:function(profile, e, src){
                    var d=linb.DragDrop,p=d.getProfile(),b=0;
                    if(p.x<=p.restrictedLeft || p.x>=p.restrictedRight)b=true;
                    if(b){
                        if(!profile._limited){
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor','#ddd');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var o=linb(src).parent(2),
                        w=o.width() + linb.DragDrop.getProfile().offset.x,
                        col=profile.colMap[profile.getSubId(src)];

                    if(profile.beforeColResized && false===profile.boxing().beforeColResized(profile,col?col.id:null,w)){
                        profile._limited=0;
                        return;
                    }

                    o.width(w);
                    if(col)col.width=w;

                    //collect cell id
                    var ids=[],ws=[];
                    if(profile.getKey(linb.use(src).parent(2).id())==profile.keys.HFCELL){
                        profile.box._setRowHanderW(profile,w);
                    }else{
                        var cells = profile.colMap[profile.getSubId(src)]._cells;
                        _.each(cells,function(o){
                            ids.push(profile.getSubNode(profile.keys.CELL,o).id())
                        });
                        linb(ids).width(w);
                    }

                    if(profile.afterColResized)
                        profile.boxing().afterColResized(profile,col?col.id:null,w);

                    profile.getSubNode('SCROLL').onScroll();
                    profile.box._ajdustBody(profile);
                    profile._limited=0;
                },
                onClick:function(){
                    return false
                },
                onDblclick:function(profile, e, src){
                    //for row0
                    if(profile.getKey(linb.use(src).parent(2).id())==profile.keys.HFCELL){
                        profile.box._setRowHanderW(profile,true);
                        return;
                    }
                    //for other rows
                    var p = profile.properties,
                        sid = profile.getSubId(src),
                        header = profile.colMap[sid],
                        cells=header._cells,
                        cls=profile.getClass('CELLA','-inline'),
                        n,ns=[],ws=[],w;
                    _.each(cells,function(o){
                        n=profile.getSubNode('CELLA',o);
                        if(n._nodes.length){
                            ns.push(n.get(0));
                            ws.push(n.addClass(cls).width());
                        }
                    });
                    ws.push(p._minColW);
                    w=parseInt(Math.max.apply(null,ws));
                    if(w>p._maxColW)w=p._maxColW;
                    

                    if(profile.beforeColResized && false===profile.boxing().beforeColResized(profile,header?header.id:null,w))
                        return;

                    linb(ns).parent().width(w);
                    linb.use(src).parent(2).width(header.width=w);
                    linb(ns).removeClass(cls);

                    if(profile.afterColResized)
                        profile.boxing().afterColResized(profile,header.id,w);

                    profile.box._ajdustBody(profile);
                    return false;
                }
            },
            //row resizer
            FHANDLER:{
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!='left')return;
                    var p=profile.properties,
                    row = profile.rowMap[profile.getSubId(src)],
                    o=linb(src),
                    minH =o.parent(3).height()-p._minRowH,
                    scroll = profile.getSubNode('SCROLL'),
                    maxH = scroll.offset().top + scroll.height() - linb.Event.getPos(e).top - 4;

                    if(p.disabled || (row&&row.disabled))return false;
                    o.startDrag(e, {
                        verticalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        maxTopOffset:minH,
                        maxBottomOffset:maxH ,
                        targetReposition:false
                    });
                    linb.use(src).parent(2).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onDragbegin:function(profile, e, src){
                    linb.DragDrop.getProfile().proxyNode
                    .css({
                        width:profile.getRoot().width()+'px',
                        height:'4px',
                        backgroundColor:'#ddd',
                        cursor:'n-resize'
                    });
                },
                onDrag:function(profile, e, src){
                    var d=linb.DragDrop,p=d.getProfile(),b=0;
                    if(p.y<=p.restrictedTop || p.y>=p.restrictedBottom)b=true;
                    if(b){
                        if(!profile._limited){
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor','#ddd');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var o=linb(src).parent(3),
                        h=o.height()+linb.DragDrop.getProfile().offset.y,
                        row = profile.rowMap[profile.getSubId(src)]

                    //for ie's weird bug
                    if(linb.browser.ie && h%2==1)h+=1;
                    
                    if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, row?row.id:null, h)){
                        profile._limited=0;
                        return;
                    }

                    o.height(h);
                    if(profile.getKey(linb.use(src).parent(2).id())==profile.keys.HFCELL){
                        profile.properties.headerHeight=h;
                        linb.UI.$tryResize(profile,null,profile.getRoot().height(),true);
                    }else
                        row.height=h;
                        
                    if(profile.afterRowResized)
                        profile.boxing().afterRowResized(profile, row?row.id:null, h);

                    profile._limited=0;
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        sid = profile.getSubId(src),
                        row,cells;
            
                    if(sid){
                        row=profile.rowMap[sid];
                        cells=profile.getSubNode('CELLS', sid);
                        var h=cells.height('auto').height();
                        
                        if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, row.id, h))
                            return;

                        cells.height(row.height=h);
                    }else{
                        cells=profile.getSubNode('HCELLS');
                        var h=cells.height('auto').height();
                        
                        if(profile.beforeRowResized && false===profile.boxing().beforeRowResized(profile, null, h))
                            return;

                        cells.height(profile.properties.headerHeight=h);
                        
                        linb.UI.$tryResize(profile,null,profile.getRoot().height(),true);
                    }

                    if(profile.afterRowResized)
                        profile.boxing().afterRowResized(profile, row?row.id:null, h);
                    
                    return false;
                },
                onClick:function(){return false}
            },
            //mark click for tree build
            ROWTOGGLE:{
                onClick:function(profile, e, src){
                    var
                    p = profile.properties,
                    row = profile.rowMap[profile.getSubId(src)]
                    ;
                    if(p.disabled || row.disabled)return false;
                    //for selection click
                    if(!row.sub)return;

                    profile.box._setSub(profile, row, !row._checked);

                    return false;
                }
            },
            //HCELLA handler dragdrop
            HCELLA:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                    id = profile.getSubId(src),
                    col = profile.colMap[id];

                    if(!col){
                        if(profile.onClickGridHandler)
                            profile.boxing().onClickGridHandler(profile,e,src);

                        if(p.disabled)return false;
                        if(!p.colSortable)return;
                    }else{
                        if(p.disabled || col.disabled)return false;
                        if(!(col.hasOwnProperty('colSortable')?col.colSortable:p.colSortable))return;
                    }
                    
                    if(profile.beforeColSorted && false===profile.boxing().beforeColSorted(profile, col))
                        return;
                        
                    var order = (col ? col._order : profile._order) || false,
                    type = (col ? col.type : null) || 'input',
                    sortby = col ? col.sortby : null,
                    index = col ? _.arr.indexOf(p.header,col) :-1,
                    me=arguments.callee,
                    fun = me.fun||(me.fun = function(profile, subNode, index, type, sortby,order,lastrownode){
                        var rows,parent,self=arguments.callee;
                        if(subNode){
                            rows = subNode.sub;
                            parent = profile.getSubNode('SUB', subNode._serialId).get(0);
                        }else{
                            subNode={_inited:true};
                            rows = profile.properties.rows;
                            parent = profile.getSubNode('BODY').get(0);
                        }
                        //sor sub first
                        var a1=[], a2=[], a3=[], t,ff;
                        _.arr.each(rows,function(row){
                            if(row.sub && row.sub.length>1)
                                self(profile, row, index, type, sortby, order, null);
                             //for short input
                             a1[a1.length]= index==-1 
                                ? row.caption 
                                : (t=row.cells)?(t=t[index])?t.value:'':row[index];
                             a2[a2.length]=a2.length;
                        });
                        if(typeof sortby!='function'){
                            switch(type){
                                case 'number':
                                case 'spin':
                                case 'currency':
                                    ff=function(n){return parseFloat(n)||0};
                                    break;
                                case 'datetime':
                                case 'date':
                                    ff=function(n){return _.isDate(n)?n.getTime():_.isFinite(n)?parseInt(n):0};
                                    break;
                                default:
                                    ff=function(n){return n||''};
                            }
                            sortby=function(x,y){
                               x=ff(a1[x]); y=ff(a1[y]);
                               return (x>y?1:x==y?0:-1)*(order?1:-1);
                            };
                        }
                        a2.sort(sortby);

                        //sort memory array
                        //sort dom node
                        var b = subNode._inited, bak=_.copy(rows), c;
                        if(b)
                            a1=parent.childNodes;
                        _.arr.each(a2,function(o,i){
                            rows[i]=bak[o];
                            if(b)a3[i]=a1[o];
                        });
                        if(b){
                            var fragment=document.createDocumentFragment();
                            for(var i=0;t=a3[i];i++)
                                fragment.appendChild(t);
                                
                            if(lastrownode)
                                parent.insertBefore(fragment, lastrownode);
                            else
                                parent.appendChild(fragment);
                        }
                    });

                    var lastrow,lastrownode;
                    if(profile.__hastmpRow){
                        lastrow=profile.properties.rows.pop();
                        lastrownode=profile.getSubNode('BODY').get(0).lastChild;
                    }

                    fun(profile, null, index, type, sortby,order, lastrownode);

                    if(profile.__hastmpRow)
                        profile.properties.rows.push(lastrow);

                    //show sort mark
                    profile.getSubNode('SORT', true).css('display','none');
                    var node = (col ? profile.getSubNode('SORT', col._serialId) : profile.getSubNode('SORT')).css('display','');
                    node.tagClass('-checked', col ? (!(col._order = !col._order)) : (!(profile._order = !profile._order)));

                    profile.box._asy(profile);

                    //clear rows cache
                    delete profile.$allrowscache;
                    
                    if(profile.afterColSorted)
                        profile.boxing().afterColSorted(profile, col);

                    return false;
                },
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!='left')return;
                    var p=profile.properties;
                    if(p.disabled)return;
                    var col=profile.colMap[profile.getSubId(src)];
                    if(!col)return;
                    if(p.disabled || col.disabled)return false;
                    if(!(col.hasOwnProperty('colMovable')?col.colMovable:p.colMovable))return;

                    //fire before event
                    if(false === profile.boxing().beforeColDrag(profile, col.id))return;

                    var pos=linb.Event.getPos(e),
                        o = linb(src),
                        itemId = profile.getSubId(src);

                    o.startDrag(e,{
                        dragType:'icon',
                        shadowFrom:o.parent(),
                        dragCursor:'pointer',
                        targetLeft:pos.left+12,
                        targetTop:pos.top+12,
                        targetReposition:false,
                        dragDefer: 2,
                        dragKey:profile.$linbid + ":col",
                        dragData:o.parent().id()
                    });
                },
                onDragbegin:function(profile, e, src){
                    linb(src).parent().onMouseout(true,{$force:true});
                    linb(src).onMouseup(true);
                },
                beforeMouseover:function(profile, e, src){
                    var p=profile.properties,
                        id = profile.getSubId(src),
                        col = profile.colMap[id];
                    if(!col)return;
                    if(p.disabled || col.disabled)return false;

                    var data=linb.DragDrop.getProfile().dragData;
                    if(!data||data.dragKey!=profile.$linbid + ":col")return;

                    var psrc=linb.use(src).parent().linbid();
                    if(false===profile.box._colDragCheck(profile,psrc))return;
                    linb.DragDrop.setDropElement(src).setDropFace(src,'move');
                    profile.getSubNode("ARROW")
                        .left(linb.use(psrc).get(0).offsetLeft-8)
                        .top(linb.use(psrc).get(0).offsetHeight)
                        .css("display","block");
                },
                beforeMouseout:function(profile, e, src){
                    var p=profile.properties,
                        id = profile.getSubId(src),
                        col = profile.colMap[id];
                    if(!col)return;
                    if(p.disabled || col.disabled)return false;

                    var data=linb.DragDrop.getProfile().dragData;
                    if(!data||data.dragKey!=profile.$linbid + ":col")return;

                    var psrc=linb.use(src).parent().linbid();
                    linb.DragDrop.setDropElement(null).setDropFace(null,'none');
                    if(false===profile.box._colDragCheck(profile, psrc))return;
                    profile.getSubNode("ARROW").css("display","none");
                },
                onDrop:function(profile, e, src){
                    var p=profile.properties,
                    id = profile.getSubId(src),
                    col = profile.colMap[id];
                    if(!col)return;
                    if(p.disabled || col.disabled)return false;

                    var psrc=linb.use(src).parent().linbid();
                    profile.getSubNode("ARROW").css("display","none");
                    if(false===profile.box._colDragCheck(profile, psrc))return;

                    //check dragData
                    var data=linb.DragDrop.getProfile().dragData,
                        fromId = data && profile.getSubId(data),
                        toId = profile.getSubId(psrc);

                    //get properties
                    var
                    map=profile.colMap,
                    fromTh=map[fromId],
                    toTh=map[toId]
                    ;

                    //fire before event
                    if(false === profile.boxing().beforeColMoved(profile,fromTh.id, toTh.id))return;

                    //remove dragover appearance
                    linb.DragDrop.setDropFace(psrc,'none');

                    //get index in HCELL array
                    var fromIndex = _.arr.subIndexOf(p.header,'_serialId',fromId),
                    toIndex = _.arr.subIndexOf(p.header,'_serialId',toId)
                    ;
                    //if same or same position, return
                    if(fromIndex===toIndex|| fromIndex===toIndex-1)return;


                    //reposition header dom node
                    profile.getSubNode('HCELL', toId).addPrev(linb(linb.DragDrop.getProfile().dragData));
                    //reposition cell dom nodes
                    _.each(toTh._cells, function(o,i){
                        profile.getSubNode('CELL',o).addPrev(profile.getSubNode('CELL',fromTh._cells[i]));
                    });

                    //update memory
                    //HCELL position
                    //keep refrence, and remove
                    var temp=p.header[fromIndex];
                    // 1. insert to right pos
                    _.arr.insertAny(p.header,temp,toIndex);
                    // 2. then, remove
                    _.arr.removeFrom(p.header,fromIndex+(fromIndex>toIndex?1:0));
                    //cell position rowMap
                    var allitems = profile.queryItems(p.rows, true, true);
                    _.arr.each(allitems,function(o){
                        //for those non-prepared data
                        o=o.cells?o.cells:o;
                        if(!o || o.constructor!=Array)return;
                        temp=o[fromIndex];
                        _.arr.removeFrom(o,fromIndex);
                        _.arr.insertAny(o,temp,toIndex);
                    });

                    //fire after event
                    profile.boxing().afterColMoved(profile, fromTh.id, toTh.id);

                    //clear rows cache
                    delete profile.$allrowscache;
                },
                onMouseover:function(profile,e,src){
                    var p=profile.properties,
                    id = profile.getSubId(src),
                    col = profile.colMap[id];

                    if(col){
                        if(p.disabled || col.disabled)return false;
                        if(!(col.hasOwnProperty('colHidable')?col.colHidable:p.colHidable))return;
                    }else{
                        if(p.disabled)return false;
                        if(!p.colHidable)return;
                    }

                    _.resetRun(profile.$linbid+':collist',null);
                    var region={},
                        pos=linb.use(src).parent().offset(null,profile.getSubNode('BOX')),
                        size=linb.use(src).parent().cssSize();
                    if(size.width<16)return;
                    region.height=size.height;
                    region.width=14;
                    region.left=pos.left;
                    region.top=pos.top;
                    profile.getSubNode('COLLIST').cssRegion(region).css('visibility','visible');
                },
                onMouseout:function(profile,e,src){
                    var p=profile.properties,
                    id = profile.getSubId(src),
                    col = profile.colMap[id];

                    if(col){
                        if(p.disabled || col.disabled)return false;
                        if(!(col.hasOwnProperty('colHidable')?col.colHidable:p.colHidable))return;
                    }else{
                        if(p.disabled)return false;
                        if(!p.colHidable)return;
                    }

                    _.resetRun(profile.$linbid+':collist',function(){
                        profile.getSubNode('COLLIST').css({visibility:'hidden',left:0,top:0});
                    });
                },
                onContextmenu:function(profile, e, src){
                    if(profile.onContextmenu){
                        var sid=profile.getSubId(src);
                        return profile.boxing().onContextmenu(profile, e, src, sid?profile.colMap[sid]:null)!==false;
                    }
                }
            },
            COLLIST:{
                onMouseover:function(profile,e,src){
                    _.resetRun(profile.$linbid+':collist',null);
                },
                onMouseout:function(profile,e,src){
                    _.resetRun(profile.$linbid+':collist',function(){
                        linb.use(src).css('visibility','hidden');
                    });
                },
                onClick:function(profile,e,src){
                    var p=profile.properties;
                    if(!profile.$col_pop){
                        var items=[],pop;
                        _.arr.each(profile.properties.header,function(o){
                            if(o.hasOwnProperty('colHidable')?o.colHidable:p.colHidable)
                                items.push({id:o.id,caption:o.caption,type:'checkbox',value:o.hidden!==true});
                        });
                        if(items.length){
                            pop=profile.$col_pop=new linb.UI.PopMenu({hideAfterClick:false,items:items}).render(true);
                            pop.onMenuSelected(function(p,i,s){
                                var b=1;
                                _.arr.each(p.properties.items, function(o){
                                    if(o.value!==false)
                                        return b=false;
                                });
                                if(!b){
                                    profile.boxing().showColumn(i.id, i.value);
                                }else{
                                    p.getSubNodeByItemId('CHECKBOX',i.id).tagClass('-checked');
                                    i.value=true;
                                }
                            })
                        }
                    }
                    if(profile.$col_pop)
                        profile.$col_pop.pop(src);
                }
            },
            CELLS:{
                afterMouseover:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='row')
                        linb.use(src).tagClass('-mouseover');
                },
                afterMouseout:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='row')
                        linb.use(src).tagClass('-mouseover',false);
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        row = profile.rowMap[profile.getSubId(src)];
                    if(p.disabled || row.disabled)return false;
                    if(profile.onDblclickRow)profile.boxing().onDblclickRow(profile, row, e, src);
                    return false;
                },
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        subid = profile.getSubId(src),
                        ks=profile.keys,
                        row = profile.rowMap[subid],
                        ck=profile.getKey(linb.Event.getSrc(e).id||"");
                    if(p.disabled || row.disabled)return false;
                    if(ck==ks.ROWTOGGLE || ck==ks.MARK) return false;
                    if(row.group) profile.getSubNode('ROWTOGGLE',row._serialId).onClick();
                }
            },
            CELL:{
                afterMouseover:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='cell')
                        linb.use(src).tagClass('-mouseover');
                },
                afterMouseout:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return;
                    if(p.disableHoverEffect)return;
                    if(p.activeMode=='cell')
                        linb.use(src).tagClass('-mouseover',false);
                }
            },
            CELLA:{
                onDblclick:function(profile, e, src){
                    var cell = profile.cellMap[profile.getSubId(src)];
                    if(!cell)return;
                    if(profile.properties.disabled)return;
                    var box=profile.box,
                        getPro=box.getCellPro,
                        type=getPro(profile, cell, 'type'),
                        disabled=getPro(profile, cell, 'disabled'),
                        editable=getPro(profile, cell, 'editable');

                    if(!disabled && (!editable || (type=='button'||type=='label'))){
                        profile.boxing().onDblclickCell(profile, cell, e, src);
                        // stop to trigger row's onDblclick event
                        if(type=='button')
                            return false;
                    }
                },
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        box=profile.box,
                        getPro=box.getCellPro,
                        cell = profile.cellMap[profile.getSubId(src)],
                        id;
                    if(cell){
                        if(profile.properties.disabled)return;
                        var type=getPro(profile, cell, 'type'),
                            disabled=getPro(profile, cell, 'disabled'),
                            readonly=getPro(profile, cell, 'readonly'),
                            event=getPro(profile, cell, 'event'),
                            mode = p.activeMode,
                            editable=getPro(profile, cell, 'editable');
    
                        if(!disabled && (!editable || (type=='button'||type=='label'))){
                            if(typeof event == 'function' && false===event.call(profile._host||profile, profile, cell, null,null,e,src)){}
                            else
                                profile.boxing().onClickCell(profile, cell, e, src);
                            if(type=='button')
                                return false;
                        }
                        // checkbox is special for editor
                        if(!disabled && !readonly && type=='checkbox')
                            if(editable){
                                box._updCell(profile, cell, !cell.value, p.dirtyMark, true);
                            
                            profile.box._trycheckrowdirty(profile,cell);
                            
                            var ishotrow=cell._row.id==profile.box._temprowid
                            if(ishotrow){
                                profile.__needchecktmprow=true;
                                profile.box._sethotrowoutterblur(profile);
                            }
                        }
                                                        
                        if(!p.editable){
                            if(mode=='cell'){
                                if(getPro(profile, cell, 'disabled'))
                                    return false;
                                id = linb(src).parent().id();
                                box._sel(profile, 'cell', src, id, e);
                            }else if(mode=='row'){
                                if(p.disabled || cell._row.disabled)
                                    return false;
                                id = linb(src).parent(3).id();
                                box._sel(profile, 'row', src, id, e);
                            }
                        }
                    // handler CELL
                    }else{
                        var row = profile.rowMap[profile.getSubId(src)];
                        if(p.disabled || row.disabled)
                            return false;
                        if(p.activeMode=='row'){
                            id = linb(src).parent(3).id();
                            box._sel(profile, 'row', src, id, e);
                        }                            
                    }
                    profile.box._focuscell(profile, e, src); 
                    
                    //in some browsers: if CELLA has a child 'span', you click 'span' will not tigger to focus CELLA
                    profile.$_focusbyclick=1;
                    linb.use(src).focus();
                    delete profile.$_focusbyclick;
                },
                onFocus:function(profile, e, src){
                    var ins=profile.boxing(),
                        prop=profile.properties;
                    // ensure call _focuscell once when click
                    if(profile.$_focusbyclick)
                        delete profile.$_focusbyclick;
                    else
                        profile.box._focuscell(profile, e, src); 

                    if(profile.afterCellFocused){
                        var cell=profile.cellMap[profile.getSubId(src)],row;
                        if(cell)
                            row=cell._row;
                        else
                            row=profile.rowMap[profile.getSubId(src)];
                        ins.afterCellFocused(profile, cell, row);
                        
                    }
                    // to check hot row
                    if(prop.hotRowMode!='none'){
                        var cell=profile.cellMap[profile.getSubId(src)],row;
                        if(cell)
                            row=cell._row;
                        else
                            row=profile.rowMap[profile.getSubId(src)];
                        if(profile.__hastmpRow && profile.__needchecktmprow && row.id!==profile.box._temprowid)
                            profile.box._checkNewLine(profile,'focuscell');
                    }
                },
                onKeydown:function(profile, e, src){
                    var p = profile.properties,
                        keys=linb.Event.getKey(e),
                        key = keys.key,
                        shift=keys.shiftKey,
                        ctrl=keys.ctrlKey,
                        cur = linb(src),
                        body = profile.getSubNode('BODY'),
                        first = body.nextFocus(true, true, false),
                        last = body.nextFocus(false, true, false);
                    switch(key){
                    case 'enter':
                        linb(src).onClick();
                    break;
                    //tab to next/pre
                    case 'tab':
                        if(shift){
                            if(src!=first.get(0)){
                                first.focus();
                                return false;
                            }
                        }else{
                            if(src!=last.get(0)){
                                last.focus();
                                return false;
                            }
                        }
                        break;
                    case 'left':
                        if(cur.get(0)==first.get(0))
                            last.focus();
                        else
                            cur.nextFocus(false);
                        return false;
                        break;
                    case 'right':
                        if(cur.get(0)==last.get(0))
                            first.focus();
                        else
                            cur.nextFocus();
                        return false;
                        break;
                    case 'up':
                        if(ctrl){
                            var cell=profile.cellMap[profile.getSubId(src)],row;
                            if(cell)
                                row=cell._row
                            else
                                row=profile.rowMap[profile.getSubId(src)];
                            if(row && !(p.disabled || row.disabled) && (row.group||row.sub)){
                                profile.getSubNode('ROWTOGGLE',row._serialId).onClick();
                                return false;
                            }
                        }
                        if(cur.get(0)==first.get(0)){
                            last.focus();
                            return;
                        }
                   case 'down':
                        if(ctrl){
                            var cell=profile.cellMap[profile.getSubId(src)],row;
                            if(cell)
                                row=cell._row
                            else
                                row=profile.rowMap[profile.getSubId(src)];
                            if(row && !(p.disabled || row.disabled) &&  (row.group||row.sub)){
                                profile.getSubNode('ROWTOGGLE',row._serialId).onClick();
                                return false;
                            }
                        }

                        //get no.
                        var count=1,
                            temp = cur.parent().get(0),
                            max=temp.parentNode.childNodes.length;
                        while(temp=temp.previousSibling)count++;

                        //get row
                        temp=cur.parent(2).get(0);

                        //get all rows(include header)
                        if(!profile.$allrowscache)
                            profile.box._cacheRows(profile);

                        //get index
                        var index = _.arr.indexOf(profile.$allrowscache,temp),
                            rowLen = profile.$allrowscache.length,
                            newLine=0;

                        //adjust index
                        if(key=='up'){
                            index--;
                            if(index==-1){
                                index = rowLen-1;
                                count--;
                                if(count==0)count=max;
                            }
                        }else{
                            index++;
                            if(index==rowLen){
                                newLine=1;
                                index=0;
                                count++;
                                if(count==max+1)count=1;
                            }
                        }
                        if(newLine && p.hotRowMode!='none'){
                            var cell=profile.cellMap[profile.getSubId(src)],
                                colId;
                            if(!cell){
                                var row=profile.rowMap[profile.getSubId(src)];
                                if(!row)return false;    
                            }else
                                colId=cell._col.id;

                            var addhotrow=true,
                                cacheAll=profile.$allrowscache;
                            // if it's just the active row
                            if(profile.__hastmpRow){
                                // if it's invalid, dont add new row
                                addhotrow=profile.box._checkNewLine(profile,'keydown');

                                if(!profile.$allrowscache)
                                    profile.box._cacheRows(profile);
                            }

                            if(addhotrow){
                                profile.box._addTempRow(profile,colId);
                                // dont focus to next cell
                                return false;
                            }
                        }
                        //get node
                        var node = linb(profile.$allrowscache[index]).first(),
                            node2=node;
                        // it's normal cell
                        if(count>1)
                            node2=node2.next(count-1);
                        // no normal cell(group)
                        if(node2.isEmpty())
                            node2=node;
                        // get CELLA
                        if(node2 && !node2.isEmpty())
                            node2=node2.first();
                        // focus
                        if(!node2.isEmpty())
                            node2.focus();
                        
                        return false;
                        break;
                    }
                },
                onContextmenu:function(profile, e, src){
                    if(profile.onContextmenu){
                        var sid=profile.getSubId(src);
                        // cell or row
                        return profile.boxing().onContextmenu(profile, e, src,sid?(profile.cellMap[sid]||profile.rowMap[sid]):null)!==false;
                    }
                }
            }
        },
        DataModel:{
            directInput:true,
            listKey:null,
            currencyTpl:"$ *",
            valueSeparator:";",
            selMode:{
                ini:'none',
                listbox:['single','none','multi','multibycheckbox'],
                action:function(value){
                    this.getSubNodes(['HFMARK','MARK'],true).css('display',(value=='multi'||value=='multibycheckbox')?'':'none');
                }
            },
            dock:'fill',

            altRowsBg: {
                ini:false,
                action:function(value){
                    var ns=this;
                    var altCls = ns.getClass('ALT'),
                        nodes = ns.getSubNode('CELLS',true),alt,j;
                    nodes.removeClass(altCls);
                    if(value){
                        alt=[];
                        j=0;
                        nodes.each(function(o,i){
                            if(o.clientHeight){
                                o=linb([o]);
                                if((j++)%2==1){
                                    if(!o.hasClass(altCls))o.addClass(altCls);
                                }else{
                                    if(o.hasClass(altCls))o.removeClass(altCls);
                                }
                            }
                        });
                        linb(alt).addClass(altCls);
                    }
                }
            },
            rowNumbered:{
                ini:false,
                action:function(value){
                    var ns=this,
                        f=ns.CF.getNumberedStr||function(a){return a},
                        nodes = ns.getSubNode('ROWNUM',true),
                        i=0,
                        map=ns.rowMap,
                        row,ol=0,l=0,a1=[],a2=[],tag='',temp,t;
                    if(value)
                        nodes.each(function(o){
// for perfomance: remove this
//                            if(o.parentNode.clientHeight){
                                row=map[ns.getSubId(o.id)];
                                l=row._layer;
                                if(l>ol){
                                    a1.push(i);
                                    a2.push(tag);
                                    tag=tag+i+'.';
                                    i=0;
                                }else if(l<ol){
                                    while(l<ol--){
                                        i=a1.pop();
                                        tag=a2.pop();
                                    }
                                }
                                i++;
                                ol=l;
                                //o.innerHTML=''+tag+i;
                                row._autoNumber=f(tag+i);
                                temp=row.rowNumber||row._autoNumber;
                                if(t=o.firstChild){
                                    if(t.nodeValue!=temp)
                                        t.nodeValue=temp;
                                }else
                                    o.appendChild(document.createTextNode(temp));
//                            }
                        });
                    else
                        nodes.text('');
                }
            },
            editable:false,

            $subMargin:16,

            iniFold:true,
            animCollapse:false,

            position:'absolute',
            width:300,
            height:200,

            _minColW:5,
            _maxColW:300,
            _minRowH:20,

            gridHandlerCaption:{
                ini:"",
                action:function(v){
                    v=(_.isSet(v)?v:"")+"";
                    this.getSubNode('GRIDCAPTION').html(linb.adjustRes(v,true));
                }
            },
            rowHandlerWidth: {
                ini:50,
                set:function(value){
                    var o=this;
                    if(o.renderId)
                        o.box._setRowHanderW(o,value);
                    else
                        o.properties.rowHandlerWidth=value;
                }
            },

            showHeader:{
                ini:true,
                action:function(value){
                    this.getSubNode('HEADER').css('display',value?'':'none');
                }
            },
            headerHeight:{
                ini:18,
                action:function(v){
                    this.getSubNode('HCELLS').height(v);
                    linb.UI.$tryResize(this, this.getRoot().width(), this.getRoot().height(),true);
                }
            },
            rowHeight:{
                ini:20,
                action:function(v){
                    this.getSubNode('CELLS', true).height(v);
                }
            },
            _colDfWidth: 80,

            rowHandler:{
                ini:true,
                action:function(value){
                    this.getSubNode('HFCELL').css('display',value?'':'none');
                    this.getSubNode('FCELL',true).css('display',value?'':'none');
                    this.box._ajdustBody(this);
                }
            },
            rowResizer:{
                ini:false,
                action:function(value){
                    this.getSubNode('FHANDLER',true).css('display',value?'':'none');
                }
            },

            colHidable:false,
            colResizer:{
                ini:true,
                action:function(value){
                    this.getSubNode('HHANDLER',true).css('display',value?'':'none');
                }
            },
            colSortable:{
                ini:true,
                action:function(value){
                    if(!value)
                        this.getSubNode('SORT',true).css('display','none');
                }
            },
            colMovable:false,

            header:{
                ini:{},
                set:function(value){
                    var o=this;
                    if(o.renderId){
                        o.boxing()._refreshHeader(value);
                    }else
                        o.properties.header = _.copy(value);
                }
            },
            rows:{
                //for default merge
                ini:{},
                set:function(value){
                    var o=this;
                    if(o.renderId)
                        o.boxing().removeAllRows().insertRows(value);
                    //use copy to avoid outer memory link
                    else
                        o.properties.rows = _.copy(value);
                }
            },
            activeMode:{
                ini:'row',
                listbox:['row','cell','none'],
                action:function(value){
                    var profile=this;
                    if(value!='cell' && profile.$activeCell){
                        linb(profile.$activeCell).tagClass('-active',false);
                        delete profile.$activeCell;
                    }
                    if(value!='row' && profile.$activeRow){
                        linb(profile.$activeRow).tagClass('-active',false);
                        delete profile.$activeRow;
                    }
                }
            },

            rowOptions:{
                ini:{}
            },
            colOptions:{
                ini:{}
            },
            treeMode:{
                ini:true,
                action:function(value){
                    this.getSubNodes(['ROWLRULER', 'ROWTOGGLE'],true).css('display',value?'':'none');
                }
            },
            hotRowMode:{
                ini:'none',
                listbox:['none','auto','show'],
                action:function(value){
                    if(this.renderId){
                        if(value=='none')
                            this.boxing().removeHotRow();
                        else
                            this.box.__ensurehotrow(this);
                    }
                }
            },
            hotRowNumber:'[*]',
            noCtrlKey:true
        },
        EventHandlers:{
            afterCellFocused:function(profile, cell, row){},

            beforeInitHotRow:function(profile){},
            onInitHotRow:function(profile){},
            beforeHotRowAdded:function(profile, row, leaveGrid){},
            afterHotRowAdded:function(profile, row){},
            
            onGetContent:function(profile, row, callback){},
            onRowSelected:function(profile, row, e, src, type){},

            beforeColDrag:function(profile, colId){},
            beforeColMoved:function(profile, colId, toId){},
            afterColMoved:function(profile, colId, toId){},
            beforeColSorted:function(profile, col){},
            afterColSorted:function(profile, col){},

            beforeColShowHide:function(profile,colId,flag){},
            afterColShowHide:function(profile,colId,flag){},
            beforeColResized:function(profile,colId,width){},
            afterColResized:function(profile,colId,width){},
            beforeRowResized:function(profile, rowId, height){},
            afterRowResized:function(profile, rowId, height){},

            beforeRowActive:function(profile, row){},
            afterRowActive:function(profile, row){},
            beforeCellActive:function(profile, cell){},
            afterCellActive:function(profile, cell){},

            beforeIniEditor:function(profile, cell, cellNode, pNode){},
            onBeginEdit:function(profile, cell, editor){},
            onEndEdit:function(profile, cell, editor){},
            
            beforeCellUpdated:function(profile, cell, options, isHotRow){},
            afterCellUpdated:function(profile, cell, options, isHotRow){},
            
            onRowDirtied:function(profile, row){},

            onDblclickRow:function(profile, row, e, src){},
            beforeComboPop:function(profile, cell, proEditor, pos, e, src){},
            onClickCell:function(profile, cell, e, src){},
            onDblclickCell:function(profile, cell, e, src){},
            onClickGridHandler:function(profile, e, src){}
        },
        RenderTrigger:function(){
            var ns=this, pro=ns.properties,ins=ns.boxing();
            ns.destroyTrigger=function(){
                var ns=this, pro=ns.properties;
                _.breakO([ns.colMap, ns.rowMap, ns.cellMap], 3);
                pro.header.length=0;
                pro.rows.length=0;
            };
            ns.$cache_editor={};
            if(!pro.iniFold)
                ins._toggleRows(pro.rows,true);
            ns.box._asy(ns);
            ns.box._ajdustBody(ns);
            
            ns.box.__ensurehotrow(ns);
        },
        __ensurehotrow:function(profile){
            var prop=profile.properties,box=profile.box;
            // add a temp row
            switch(prop.hotRowMode){
                case 'auto':
                    if(!prop.rows||prop.rows.length===0)
                        box._addTempRow(profile);
                break;
                case 'show':
                    box._addTempRow(profile);
                break;
            }
        },
        _temprowid:'_ r _temp_',
        _addTempRow:function(profile,coId){
            // clear first, ensure only one
            profile.box._sethotrowoutterblur(profile,true);
            delete profile.__hastmpRow;
            profile.boxing().removeRows([this._temprowid]);
            
            if(profile.beforeInitHotRow && false===profile.boxing().beforeInitHotRow(profile))
                return false;            
            
            profile.__needchecktmprow=true;
            
            var row=[],
                ins=profile.boxing();
            if(profile.onInitHotRow)
                row=ins.onInitHotRow(profile);

            if(_.isArr(row))
                row={cells:row};
            else if(!_.isHash(row))
                row={cells:[row]};

            // gives a special id
            row.id = this._temprowid;
            row.rowNumber=profile.properties.hotRowNumber;
            row.rowClass=profile.getClass('CELLS', '-hot');

            ins.insertRows([row]);
            
            // focus to next cell
            ins.focusCellbyRowCol(this._temprowid, coId||profile.properties.header[0].id);
    
            profile.__hastmpRow=true;
            
            profile.box._sethotrowoutterblur(profile);
        },

        _checkNewLine:function(profile,trigger){
            var prop=profile.properties;
            profile.box._sethotrowoutterblur(profile,true);
            
            // checked already
            if(!profile.__hastmpRow)
                return;

            delete profile.__needchecktmprow;

            var ins=profile.boxing(),
                rowId=this._temprowid,
                tempRow=ins.getRowbyRowId(rowId),
                result=prop.hotRowMode=='show'
                    ?trigger=='keydown'?true:null
                    :trigger?true:false;

            if(profile.beforeHotRowAdded){
                var result2=ins.beforeHotRowAdded(profile, tempRow, !trigger);
                if(_.isDefined(result2))
                    result=result2;
            }
            
            // do nothing
            if(result===null){
                if(prop.hotRowMode=='auto'){
                    profile.box._sethotrowoutterblur(profile);
                }
                return false;
            }
            // remove the hot row
            else if(result===false){
                if(prop.hotRowMode=='auto'){
                    delete profile.__hastmpRow;
                    ins.removeRows([rowId]);
                    if(prop.rows.length===0)
                        this._addTempRow(profile);
                }
                // dont add new hot row
                return false;
            }
            // add a new row
            else if(result===true){
                var newrow=_.clone(tempRow,true);
                // remove CELLS-hot;
                var hotcls=profile.getClass('CELLS', '-hot');
                if(hotcls==newrow.rowClass)delete newrow.rowClass;
                else newrow.rowClass=newrow.rowClass.replace(hotcls,'');
                
                delete profile.__hastmpRow;
                ins.removeRows([rowId]);

                if(newrow.id==rowId)
                    delete newrow.id;
                if(newrow.rowNumber==prop.hotRowNumber)
                    delete newrow.rowNumber;

                ins.insertRows([newrow]);
                
                if(profile.afterHotRowAdded)
                    ins.afterHotRowAdded(profile, prop.rows[prop.rows.length-1]);
                if(prop.hotRowMode=='show'){
                    this._addTempRow(profile);
                }
                return true;
            }
            // focus the invalid cell, and keep this hot row
            else{
                profile.__needchecktmprow=true;
                // if returns cell
                if(_.isHash(result))
                    ins.focusCell(result);
                // if return cell id
                else
                    ins.focusCell(ins.getCell(result));
                    
                profile.box._sethotrowoutterblur(profile);
                // dont add new hot row
                return false;
            }
        },
        _sethotrowoutterblur:function(profile, clear){
            profile.getSubNode('BODY').setBlurTrigger(profile.$domId+':BODY',clear?null:function(pos,e){
                var trigger = linb.Event.getSrc(e)==profile.getSubNode('SCROLL').get(0)?'focusin':null;
                profile.__tmpRowBlurTrigger=_.asyRun(function(){
                    if(profile.box)
                        profile.box._checkNewLine(profile,trigger);
                });
            });
            if(clear){
                if(profile.__tmpRowBlurTrigger){
                    clearTimeout(profile.__tmpRowBlurTrigger);
                    delete profile.__tmpRowBlurTrigger;
                }
            }
        },
        _cacheRows:function(profile){
            var all=profile.getSubNode('CELLS',true).get();
            //filter dispaly==none
            _.filter(all,function(o){
                return !!o.clientHeight;
            });
            profile.$allrowscache = all;
        },
        _asy:function(profile){
            var pro=profile.properties,b=profile.boxing(),id=profile.$linbid;
            if(pro.altRowsBg)_.resetRun(id+"1",function(){b.setAltRowsBg(true,true)});
            if(pro.rowNumbered)_.resetRun(id+"2",function(){b.setRowNumbered(true,true)});
        },
        _setRowHanderW:function(profile, flag){
            var pro=profile.properties,
                ww=pro.$subMargin,
                map=profile.rowMap,
                hcell=profile.getSubNode('HFCELL'),
                n,w;
            if(typeof flag=='number')
                w=flag;
            else if(flag===true){
                var ws=[],t;
                profile.getSubNode('FCELLINN',true).each(function(o){
                    if((t=o.parentNode).parentNode.offsetHeight>0 && linb.Dom.getStyle(t,'overflow')!='visible')
                        if(n=map[profile.getSubId(o.id)])
                            ws.push(linb([o]).width() + n._layer*ww);
                });
                ws.push(pro._minColW);
                w=parseInt(Math.max.apply(null,ws))+ww*2;
            }else
                w=hcell.width();

            //set width
            if(w){
                if(w<pro._minColW)w=pro._minColW;
                if(pro.rowHandlerWidth!=w){
                    hcell.width(pro.rowHandlerWidth=w);
                    profile.getSubNode('FCELL',true).width(w);
                    profile.getSubNode('ROWLRULER',true).each(function(o){
                        n=map[profile.getSubId(o.id)];
                        o.style.width=(4+n._layer*ww)+'px';
                    });
                    profile.box._ajdustBody(profile);
                }
            }
        },
        _onStartDrag:function(profile, e, src){
            var pos=linb.Event.getPos(e);
            profile.$_ond=src;
            linb.use(src).startDrag(e, {
                dragType:'icon',
                shadowFrom:linb.use(src).parent()._get(0),
                targetLeft:pos.left+12,
                targetTop:pos.top+12,
                dragCursor:'pointer',
                dragDefer:2,
                dragKey: profile.box.getDragKey(profile, src),
                dragData: profile.box.getDragData(profile, e, src)
            });
            return false;
        },
        _onDropTest:function(profile, e, src, key, data, item){
            var fid=data&&data.domId, tid=src, fp=data&&data.profile,t;
            if(tid){
                var k=profile.getKey(tid),
                    ks=profile.keys,
                    row=profile.rowMap[profile.getSubId(tid)];
                if(k==ks.ROWTOGGLE && !row.sub)
                    return false;
            }
            if(fp && fp.$linbid==profile.$linbid){
                if(fid && profile.getSubId(fid)==profile.getSubId(tid))
                    return false;
                t=profile.$_ond;

                src=linb(src).get(0);
                if(_.get(src,['parentNode','previousSibling'])==t)return false;
                do{
                    if(src==t){
                        src=t=null;
                        return false;
                    }
                }while(src && (src=src.parentNode) && src!==document && src!==window)
                src=t=null;
            }
        },
        _onDragstop:function(profile, e, src, key, data, item){
            delete profile.$_ond;
        },
        _onDrop:function(profile, e, src, key, data, item){
            linb.DragDrop.setDragIcon('none');
            if(!data.profile || !data.profile[profile.KEY])return;
            var k=profile.getKey(src),
                po=data.profile,
                ps=data.domId,
                oitem,
                ks=profile.keys,
                t=linb.absObj.$specialChars,
                b=profile.boxing(),

                orow= po.rowMap[po.getSubId(ps)],
                row= profile.rowMap[profile.getSubId(src)];

            //remove
            orow=_.clone(orow,function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeRows([orow.id]);

            //add
            if(k==ks.SCROLL)
                b.insertRows([orow], null, null, false);
            else if((k==ks.ROWTOGGLE) && row.sub)
                b.insertRows([orow], row.id, null, false);
            else if(k==ks.CELLS)
                b.insertRows([orow], row._pid, row.id, true);
            return false;
        },

        _beforeSerialized:function(profile){
            var o=arguments.callee.upper.call(this, profile),
                pp=profile.properties,
                map=linb.absObj.$specialChars,
                t;
            o.properties.header = _.clone(pp.header, function(o,i){return !map[(i+'').charAt(0)]});
            o.properties.rows = _.clone(pp.rows, function(o,i){return !map[(i+'').charAt(0)]});
            if(o.properties.header.length===0)delete o.properties.header;
            if(o.properties.rows.length===0)delete o.properties.rows;
            return o;
        },
        _clsCache:{},

        _colDragCheck:function(profile, src){
            var dd = linb.DragDrop.getProfile(), key=dd.dragKey, data=dd.dragData,
                col=profile.colMap[profile.getSubId(src)];
            if(!(col.hasOwnProperty('colMovable')?col.colMovable:profile.properties.colMovable))return;

            if(!key || !data || key!=(profile.$linbid+":col"))return false;
            if(data==linb.use(src).id() || data==linb.use(src).prev().id())return false;
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile),NONE='display:none';
            profile.rowMap2 = {};
            profile.rowMap = {};
            profile.cellMap = {};

            var pro=profile.properties;

            data.showHeader=pro.showHeader?'':NONE;
            data.colDDDisplay=pro.colResizer?'':NONE;
            data.rowDDDisplay=pro.rowResizer?'':NONE;
            data.rowHandlerDisplay=pro.rowHandler?'':NONE;
            data.sortDisplay=NONE;
            data.headerHeight=data.headerHeight?('height:'+data.headerHeight+'px;'):'';
            data._rowMarkDisplay=(pro.selMode=="multi"||pro.selMode=="multibycheckbox")?"":"display:none;";

            if(pro.header && pro.header.constructor != Array)
                pro.header = [];
            if(pro.rows && pro.rows.constructor != Array)
                pro.rows = [];

            pro.header=this._adjustHeader(pro.header);
            data.header=this._prepareHeader(profile, pro.header);
            data._row0DfW=data.rowHandlerWidth?('width:'+data.rowHandlerWidth+'px'):'';

            arguments.callee.upper.call(this, profile);

            pro.rows=this._adjustRows(pro.rows);
            data.rows = this._prepareItems(profile, pro.rows);
            return data;
        },
        _prepareHeader:function(profile, arr){
            var a = profile.colMap2 = {},
                b = profile.colMap = {},
                SubID=linb.UI.$tag_subId,
                pro=profile.properties,
                header=[], temp, t,
                NONE='display:none';
            _.arr.each(arr,function(o,i){
                temp='h_'+profile.pickSubId('header');
                if(typeof o=='string')
                    o=arr[i]={id:o};
                if(typeof o.id!='string')
                    o.id=o.caption||(_()+'');

                //#
                o._cells={};
                o[SubID]=temp;
                b[temp]=o;
                o.width = o.width||pro._colDfWidth;

                t={
                    sortDisplay : NONE,
                    rowHandlerDisplay : pro.rowHandler?'':NONE
                };
                t[SubID]=temp;
                t._tabindex=pro.tabindex;

                t.colDDDisplay = (('colResizer' in o)?o.colResizer:pro.colResizer)?'':'display:none';

                //  Forward-compatible with 'visibility'
                if(o.hasOwnProperty('visibility') && !o.hasOwnProperty('hidden'))
                    o.hidden=!o.visibility;

                t.colDisplay = o.hidden===true?'display:none':'';

                t.firstCellStyle=pro.colOptions.firstCellStyle||'';
                t.firstCellClass=pro.colOptions.firstCellClass||'';

                if(!o.type)o.type='input';
                if(!o.caption)o.caption=o.id;
                linb.UI.adjustData(profile, o, t);

                // id to dom item id
                a[o.id]=temp;
                // dom item id to properties item
                header.push(t);
            });
            return header;
        },
        _renderCell:function(profile,cell,node,options){
            var getPro=profile.box.getCellPro,
                dom=node['linb.Dom'],
                ncell=dom?cell:node,
                type=getPro(profile, cell, 'type'),
                t1='',
                t2='',
                caption,
                capOut=(!dom)&&node.caption,
                reg1=/</g,
                me=arguments.callee,
                dcls=me._dcls||(me._dcls=profile.getClass('CELL', '-disabled')),
                rcls=me._rcls||(me._rcls=profile.getClass('CELL', '-readonly')),
                //1. _$caption in cell (for special set)
                //2. caption in ncell(if [ncell] is not [cell], the [caption] maybe is the result of cell.renderer)
                //3. renderer in cell
                //4. default caption function
                //5. value in cell
                //6. ""
                ren=me._ren||(me._ren=function(profile,cell,ncell,fun){return (
                        // priority 1
                        typeof cell._$caption=='string'? cell._$caption: 
                        // priority 2
                        typeof ncell.caption =='string'? ncell.caption: 
                        // priority 3
                        typeof (cell.renderer||cell._renderer)=='function'? (cell.renderer||cell._renderer).call(profile,cell) : 
                        // priority 4
                        typeof fun=='function'?fun(cell.value, profile, cell):
                        // priority 5
                        (_.isSet(cell.value)?String(cell.value):
                        // priority 6
                        "")
                    // default value
                    ) || ""}),
                f0=me._f0=(me._f0=function(v,profile,cell){
                    return v ? linb.Date.getText(v, getPro(profile, cell, 'dateEditorTpl')||'ymdhn') : "";
                }),
                f1=me._f1=(me._f1=function(v,profile,cell){
                    return v ? linb.Date.getText(v, getPro(profile, cell, 'dateEditorTpl')||'ymd') : "";
                }),
                f2=me._f2=(me._f2=function(v){return v?(v+'').replace(reg1,'&lt;').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ /g,'&nbsp;').replace(/(\r\n|\n|\r)/g,"<br />"):""}),
                f3=me._f3=(me._f3=function(v){return (v||v===0) ? ((v.toFixed(4)*100)+'%') : ""}),
                f5=me._f5=(me._f5=function(v,profile,cell){
                    if(v||v===0){
                        v=parseFloat(v);
                        var precision=getPro(profile, cell, 'precision');
                        if(_.isNumb(precision))
                            v=v.toFixed(precision);
                        return v+"";
                    }else 
                        return "";
                }),
                f4=me._f4=(me._f4=function(v,profile,cell){
                    if(v||v===0){
                        v=parseFloat(v);
                        var precision=getPro(profile, cell, 'precision');
                        if(_.isNumb(precision))
                            v=v.toFixed(precision);
                        else v=v+"";

                        v= (''+v).split(".");
                        v[0]=(''+v[0]).split("").reverse().join("").replace(/(\d{3})(?=\d)/g, "$1,").split("").reverse().join("");
                        return v.join(".")
                    }else 
                        return "";
               }),
               f6=me._f6=(me._f6=function(v,profile,cell){
                    var t=getPro(profile,cell,'editorListItems');
                    if(!t)
                        if(t=getPro(profile,cell,'editorListKey'))
                           t=linb.UI.getCachedData(t); 
                    if(t && t.length)
                        for(var i=0,l=t.length;i<l;i++)
                            if(t[i].id===v)
                                return t[i].caption||v;
                    return v;
               })
            ;

            switch(type){
                case 'number':
                case 'spin':
                    var v=parseFloat(cell.value);
                    cell.value=(v||v===0)?v:null;
                    caption= capOut ||ren(profile,cell,ncell,f5);
                    if(dom)
                        node.html(caption,false);
                break;
                case 'currency':
                    var v=parseFloat((cell.value+"").replace(/[^\d.-]/g,''));
                    cell.value=(v||v===0)?v:null;
                    //  Note that cell value has true numeric value, while caption has currency format with commas.
                    caption= capOut ||ren(profile,cell,ncell,f4);
                    var tpl = getPro(profile, cell, 'currencyTpl');
                    if(tpl && caption!=="")
                        caption = tpl.replace("*", caption);
                    if(dom)
                        node.html(caption,false);
                break;
                case 'date':
                case 'datepicker':
                    cell.value= _.isDate(cell.value)?cell.value:_.isFinite(cell.value)?new Date(parseInt(cell.value)):null;
                    caption= capOut || ren(profile,cell,ncell,f1);
                    if(dom)
                        node.html(caption, false);
                break;
                case 'datetime':
                    cell.value= _.isDate(cell.value)?cell.value:_.isFinite(cell.value)?new Date(parseInt(cell.value)):null;
                    caption= capOut || ren(profile,cell,ncell,f0);
                    if(dom)
                        node.html(caption, false);
                break;
                case 'textarea':
                    cell.value=cell.value||"";
                    caption= capOut ||ren(profile,cell,ncell,f2);
                    if(dom)
                        node.html(caption,false);
                break;
                case 'color':
                case 'colorpicker':
                    cell.value=cell.value?("#"+linb.UI.ColorPicker._ensureValue(0,cell.value)):"";
                    caption= capOut ||ren(profile,cell,ncell);
                    if(cell.value){
                        t1=linb.UI.ColorPicker.getTextColor(cell.value);
                        if(dom){
                            node.html(caption,false);
                            node.css('color',t1).css('backgroundColor',cell.value);
                        }else{
                            node.color='color:'+t1+';';
                            node.bgcolor='background-color:'+cell.value+';';
                        }
                    }else{
                        if(dom){
                            node.html(caption,false);
                            node.css('color','#000').css('backgroundColor',"#fff");
                        }else{
                            node.color='color:#000;';
                            node.bgcolor='background-color:#fff;';
                        }
                    }
                break;
                case 'checkbox':
                    cell.value=!!cell.value;
                    caption=cell.value+'';
                    if(dom)
                        node.first().tagClass('-checked', cell.value);
                    else
                        node.checkboxCls = profile.getClass('CHECKBOX', cell.value?'-checked':'');
                break;
                case 'progress':
                    cell.value=parseFloat(cell.value)||0;
                    cell.value=Math.min(Math.max(cell.value,0),1);
                    caption= capOut ||ren(profile,cell,ncell,f3);
                    if(dom){
                        node.first().html(caption, false).width(caption);
                    }else
                        node.progress=caption;

                break;
                case 'listbox':
                    cell.value=cell.hasOwnProperty("value")?cell.value:"";
                    caption= capOut ||ren(profile,cell,ncell,f6);
                    if(dom)node.html((caption===null||caption===undefined)?cell.value:caption,false);
                break;
                default:
                    cell.value=cell.hasOwnProperty("value")?cell.value:"";
                    caption= capOut ||ren(profile,cell,ncell);
                    if(dom)node.html((caption===null||caption===undefined)?cell.value:caption,false);
            }

            cell._$tips=caption;

            var t2=cell.disabled || cell._row.disabled || cell._col.disabled,
                t3=cell.readonly || cell._row.readonly || cell._col.readonly;
            if(!dom){
/*
cellStyle
cellClass
cellRenderer

renderer
type
disabled
readonly
precision
dateEditorTpl
editable
value
caption
sortby [for column only]

customEditor -> an object for custom editor. or the below prop

editorListKey
editorListItems
editorFormat
editorMask
editorProperties
editorEvents
editorReadonly
editorDropListWidth
editorDropListHeight

*/
                node.cellCls=profile.getClass('CELL', '-'+type) + (t2?(' '+dcls):'') + (t3?(' '+rcls):'');
                node.type=type;
                node.value=cell.value;
                node.caption=caption;

                node.cellStyle=getPro(profile, cell, 'cellStyle');
                node.cellClass=getPro(profile, cell, 'cellClass');

            }else{
                if(t2) node.addClass(dcls);
                else node.removeClass(dcls);

                if(t2=options.cellStyle)
                    node.attr('style',node.attr('style')+";"+t2);
                if(t2=options.cellClass)
                    node.addClass(t2);
            }
        },
        _prepareItems:function(profile, arr, pid){
            var self=this,
                pro=profile.properties,
                mm = pro.$subMargin,
                a = profile.rowMap2,
                b = profile.rowMap,
                d = profile.cellMap,
                _layer=pid?b[pid]?(b[pid]._layer+1):0:0,
                SubID=linb.UI.$tag_subId,
                me=arguments.callee,
                ider = me._id||(me._id=new _.id()),
                rows=[],
                temp,cells,t,row,g,j,v,
                NONE='display:none';

            for(var i=0,l=arr.length;i<l;i++){
                // give id (avoid conflicts)
                if(!arr[i].id || a[arr[i].id]){
                    while(a[t=ider.next()]);
                    arr[i].id=t;
                }

                row = arr[i];

                // give _serialId
                temp='r_'+profile.pickSubId('row');
                row[SubID]=temp;
                b[temp]=row;

                //#
                row._pid = pid;
                row._cells={};
                row._layer=_layer;

                row._tabindex=pro.tabindex;
                row._rowMarkDisplay=(pro.selMode=="multi"||pro.selMode=="multibycheckbox")?"":NONE;

                row._treeMode=pro.treeMode?'':NONE;

                t={id: row.id};

                t.rowCls = ""
                if(row.disabled)
                    t.rowCls += profile.getClass('CELLS', '-disabled');
                if(row.readonly)
                    t.rowCls += profile.getClass('CELLS', '-readonly');
                if(row.group)
                    t.rowCls += profile.getClass('CELLS','-group');

                if(row.summary)
                    t.summaryDisplay='display:block;';
                if(row.preview)
                    t.previewDisplay='display:block;';

                t._row0DfW=pro.rowHandlerWidth?('width:'+pro.rowHandlerWidth+'px'):'';
                t._rulerW=4+_layer*mm;

                t.rowHeight=row.height||pro.rowHeight;
                t.rowHandlerDisplay=pro.rowHandler?'':NONE;
                t.rowDDDisplay=(('rowResizer' in row)?row.rowResizer:pro.rowResizer)?'':NONE;

                t.firstCellStyle=pro.rowOptions.firstCellStyle||'';
                t.firstCellClass=pro.rowOptions.firstCellClass||'';

                cells = t.cells = [];

                t[SubID]=temp;
                t.subClass = row.sub?'linb-uicmd-toggle2':'linb-uicmd-empty';

                // id to dom item id
                a[row.id]=temp;

                // for cells
                if(row.group)
                    row.cells=null;
                if(!row.hasOwnProperty('caption') && row.hasOwnProperty('value'))
                    row.caption=''+row.value;

                if(row.caption && !row.tips)
                    row._$tips=row.caption;
                
                if(v=row.cells)
                    _.arr.each(pro.header,function(headCell,j){
                        g=v[j]||(v[j]={});

                        var n={};
                        //cell/cell link to row
                        g._row = row;
                        //cell/cell link to header
                        g._col=headCell;
                        g[SubID]='c_'+profile.pickSubId('cell');
                        // give default id
                        g.id=g.id||g[SubID];

                        self._adjustCell(profile, g, n);

                        cells.push(n);

                        // cell only link its' dom item id to properties item
                        d[n[SubID]]=g;

                        // row link to cell/cell
                        row._cells[headCell.id]=n[SubID];
                        // header link to cell/cell
                        headCell._cells[row.id]=n[SubID];
                    });

                linb.UI.adjustData(profile, row, t);

                rows.push(t);
            }
            return rows;
        },
        _adjustCell:function(profile, cell, uicell){
            var self=this,
                pro=profile.properties,
                col=cell._col,
                renderer;
            if(renderer=self.getCellPro(profile, cell, 'cellRenderer'))
                cell._renderer=renderer;

            //first
            linb.UI.adjustData(profile, cell, uicell);

            if(!uicell.width)uicell.width=col.width;
            uicell._tabindex=pro.tabindex;
            uicell.cellDisplay=col.hidden===true?'display:none;':'';

            self._renderCell(profile, cell, uicell);

            //next
            cell.oValue=cell.value;
        },
        _setSub:function(profile, item, flag){
            var id=profile.domId,
                pro=profile.properties,
                serialId = profile.rowMap2[item.id],
                markNode = profile.getSubNode('ROWTOGGLE', serialId),
                subNs = profile.getSubNode('SUB', serialId)
                ;

            if(linb.Thread.isAlive(profile.key+profile.id)) return;
            //close
            if(item._checked){
                if(!flag){
                    var h = subNs.height();

                    if(pro.animCollapse)
                        subNs.animate({'height':[h,0]},null,function(){
                            subNs.css({display:'none'})
                        }, 100, 5, 'expoIn', profile.key+profile.id).start();
                    else
                        subNs.css({
                            display:'none',
                            height:0
                        });

                    markNode.tagClass('-checked', false);
                    item._checked = false;
                    profile.box._asy(profile);
                }
            }else{
                //open
                if(flag){
                    var openSub = function(profile, item, id, markNode, subNs, sub){
                        var b=profile.boxing(),
                            p = profile.properties;
                        //created
                        if(!item._inited){
                            delete item.sub;
                            //before insertRows
                            item._inited=true;
                            //subNs.css('display','none');

                            if(typeof sub=='string')
                                subNs.html(item.sub=sub,false);
                            else if(_.isArr(sub))
                                b.insertRows(sub, item.id);
                            else if(sub['linb.Template']||sub['linb.UI'])
                                subNs.append(item.sub=sub.render(true));

                            //set checked items
                            b._setCtrlValue(b.getUIValue(), true);
                        }

                        var h = subNs.height(true);
                        if(p.animCollapse)
                            subNs.animate({'height':[0,h]},function(){
                                subNs.css({display:''})
                            },function(){
                                subNs.css({height:'auto'})
                            }, 100, 5, 'expoOut', profile.key+profile.id).start();
                        else
                            subNs.css({display:'',height:'auto'});

                        markNode.tagClass('-checked');
                        item._checked = true;
                        profile.box._asy(profile);
                    };

                    var sub = item.sub, callback=function(sub){
                        openSub(profile, item, id, markNode, subNs, sub);
                    },t;
                    if((t=typeof sub)=='string'||t=='object')
                        callback(sub);
                    else if(profile.onGetContent){
                        var r=profile.boxing().onGetContent(profile, item, callback);
                        if(r){
                            //return true: continue UI changing
                            if(r===true)
                                item._inited=true;
                            callback(r);
                        }
                    }
                }
            }
            //clear rows cache
            delete profile.$allrowscache;
        },
        _getCellId:function(profile, rowId, colId){
            return _.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
        },
        _updCell:function(profile, cellId, options, dirtyMark, triggerEvent){
            var box=profile.box,
                prop=profile.properties,
                pdm=prop.dirtyMark,
                psdm=prop.showDirtyMark,
                sc=linb.absObj.$specialChars,
                cell,node,ishotrow;

            if(typeof cellId == 'string')
                cell = profile.cellMap[cellId];
            else{
                cell = cellId;
                cellId = cell._serialId;
            }
            if(!cell)return;
            ishotrow=cell._row.id==box._temprowid;

            if(!_.isHash(options))options={value:options};
            options=_.filter(options,function(o,i){return !sc[i.charAt(0)] || i=='_$caption' });

            if(triggerEvent){
                if(profile.beforeCellUpdated && false === profile.boxing().beforeCellUpdated(profile, cell, options,ishotrow))
                    return;
            }

            // * remove cell's caption first
            delete cell.caption;
            delete cell._$caption;
            delete cell._$tips;

            _.merge(cell,options,'all');

            node=profile.getSubNode('CELLA', cellId);

            if('type' in options){
                var uicell={};
                box._adjustCell(profile, cell, uicell);
                node.parent().replace(profile._buildItems('rows.cells', [uicell]));
            }else
                box._renderCell(profile, cell, node, options);

            //if update value
            if('value' in options){
                if(!pdm || dirtyMark===false)
                    cell.oValue=cell.value;
                else{
                    if(cell.value===cell.oValue){
                        if(psdm)
                            node.removeClass('linb-ui-dirty');
                        delete cell.dirty;
                    }else{
                        if(psdm)
                            node.addClass('linb-ui-dirty');
                        cell.dirty=true;
                    }
                }
            }

            if(triggerEvent){
                if(profile.afterCellUpdated)
                    profile.boxing().afterCellUpdated(profile,cell, options,ishotrow);            
            }    
        },
        _ensureValue:function(profile,value){
            if(profile.properties.selMode=='multi'||profile.properties.selMode=='multibycheckbox'){
                var arr = (value?(''+value):'').split(profile.properties.valueSeparator);
                // ignore hot row
                _.arr.removeValue(arr,this._temprowid);
                arr.sort();
                return arr.join(profile.properties.valueSeparator);
            }else{
                // ignore hot row
                return value==this._temprowid?null:value;
            }
        },
        _sel:function(profile, type, src, id, e){
            var properties=profile.properties;
            if(properties.activeMode!=type)return;

            var targetId = profile.getSubId(id),
                map = type=='cell'?profile.cellMap:profile.rowMap,
                box=profile.boxing(),
                targetItem=map[targetId],
                ks=linb.Event.getKey(e),
                sid=type=='cell'?(targetItem._row.id+'|'+targetItem._col.id):targetItem.id,
                mode=properties.selMode;
            switch(mode){
            case 'none':
                box.onRowSelected(profile, targetItem, e, src, 0);
                break;
            case 'multibycheckbox':
                if(profile.keys.MARK){
                    var ck=profile.getKey(linb.Event.getSrc(e).id||""),
                        clickMark=ck==profile.keys.MARK;
                    if(!clickMark){
                        box.onRowSelected(profile, targetItem, e, src, 0);
                        break;
                    }
                }
            case 'multi':
                var value = box.getUIValue(),
                    arr = value?(''+value).split(properties.valueSeparator):[],
                    checktype=1;
                if(arr.length&&(ks.ctrlKey||ks.shiftKey||properties.noCtrlKey)){
                    //todo: give cell multi selection function
                    if(ks.shiftKey && type=='row'){
                        if(profile.$firstV._pid!=targetItem._pid)return false;
                        var items=properties.rows;
                        if(targetItem._pid){
                            var pitem=map[targetItem._pid];
                            if(pitem)items=pitem.sub;
                        }
                        var i1=_.arr.subIndexOf(items,'id',profile.$firstV.id),
                            i2=_.arr.subIndexOf(items,'id',targetItem.id),
                            i;
                        arr.length=0;
                        for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                            arr.push(items[i].id);
                    }else{
                        if(_.arr.indexOf(arr,sid)!=-1){
                            _.arr.removeValue(arr,sid);
                            checktype=-1;
                        }else
                            arr.push(sid);
                    }

                    arr.sort();
                    value = arr.join(properties.valueSeparator);

                    //update string value only for setCtrlValue
                    if(box.getUIValue() != value){
                        box.setUIValue(value);
                        if(box.get(0) && box.getUIValue() == value)
                            box.onRowSelected(profile, targetItem, e, src, checktype);
                    }
                    break;
                }
            case 'single':
                if(box.getUIValue() != sid){
                    profile.$firstV=targetItem;
                    box.setUIValue(sid);
                    if(box.get(0) && box.getUIValue() == sid)
                        box.onRowSelected(profile, targetItem, e, src, 1);
                }
                break;
            }
        },
        _activeCell:function(profile, id){
            if(profile.properties.activeMode!='cell')return;
            if(profile.$activeCell == id)return;
            var targetCell=null;
            if(profile.$activeCell){
                linb(profile.$activeCell).tagClass('-active', false);
                delete profile.$activeCell;
            }
            if(id!==false){
                var targetId = profile.getSubId(id),
                    map = profile.cellMap;
                targetCell=map[targetId];
                if(profile.beforeCellActive && (false===profile.boxing().beforeCellActive(profile, targetCell)))return;                
                linb(profile.$activeCell = id).tagClass('-active');
            }
            if(profile.afterCellActive)profile.boxing().afterCellActive(profile, targetCell);
        },
        _activeRow:function(profile, id){
            if(profile.properties.activeMode!='row')return;
            if(profile.$activeRow == id)return;
            var targetRow=null;
            if(profile.$activeRow){
               linb(profile.$activeRow).tagClass('-active', false);
               delete profile.$activeRow;
            }
            if(id!==false){
                var targetId = profile.getSubId(id),
                    map = profile.rowMap;
                targetRow=map[targetId];
                //before event
                if(profile.beforeRowActive && (false===profile.boxing().beforeRowActive(profile, targetRow)))return;
                linb(profile.$activeRow = id).tagClass('-active');
            }
            //after event
            if(profile.afterRowActive)profile.boxing().afterRowActive(profile, targetRow);
        },
        getCellPro:function(profile, cell, key){
            var t=cell,p=profile.properties;
            return (t && t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]
                    :((t=cell._row)&&t.hasOwnProperty(key)&&_.isSet(t[key]))? t[key]
                    :((t=p.rowOptions)&&t.hasOwnProperty(key)&&_.isSet(t[key]))? t[key]
                    :((t=cell._col)&&t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]
                    :((t=p.colOptions)&&t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]
                    :((t=p)&&t.hasOwnProperty(key)&&_.isSet(t[key]))?t[key]:null;
        },
        _trycheckrowdirty:function(profile,cell){
            if(!cell || !cell._row)return;

            _.resetRun(profile.key+":"+profile.$linbid+":"+cell._row.id,function(){
                var lc=profile.$cellInEditor;
                if(cell._row && (!lc || (lc._row && lc._row!=cell._row))){
                    var dirty=false;
                    _.arr.each(cell._row.cells,function(v){
                        if(v.oValue!==v.value){
                            dirty=true;
                            return false;
                        }
                    });
                    if(dirty && cell._row.id !=profile.box._temprowid && profile.onRowDirtied)
                        profile.boxing().onRowDirtied(profile,cell._row);
                }
            },100);
        },
        _editCell:function(profile, cellId){
            var cell = typeof cellId=='string'?profile.cellMap[cellId]:cellId;
            if(!cell)return;
            if(profile.box.getCellPro(profile, cell,'disabled') || profile.box.getCellPro(profile, cell,'readonly'))return ;
            
            // real cellId
            cellId=cell._serialId;
            var cellNode = profile.getSubNode('CELL', cellId),
                colId = cell._col.id,
                ishotrow=cell._row.id==profile.box._temprowid;

            //clear the prev editor
            var editor = profile.$curEditor;
            if(editor)_.tryF(editor.undo,[],editor);
            editor=null;

            var grid = this,
                baseNode = profile.getSubNode('SCROLL'),
                box=profile.box,
                getPro=function(key){return box.getCellPro(profile, cell, key)};

            // 1. customEditor in cell/row or header
            editor = profile.box.getCellPro(profile, cell,'customEditor');
            if(editor && typeof editor.iniEditor=='function'){
                editor.iniEditor(profile, cell, cellNode);
                _.tryF(editor.activate,[],editor);
                if(profile.onBeginEdit)
                    profile.boxing().onBeginEdit(profile, cell, editor);
            }else{
                // 2. beforeIniEditor
                //      returns an editor(linb.UI object)
                //      or, sets $editorValue
                if(profile.beforeIniEditor){
                    editor=profile.boxing().beforeIniEditor(profile, cell, cellNode, baseNode);
                    // if return false, dont set $curEditor
                    if(editor===false)
                        return;
                }

                // if beforeIniEditor doesnt return an editor
                if(!editor || !editor['linb.UI']){
                    var type=getPro('type')||'input',
                        editorProperties = getPro('editorProperties'),
                        editorEvents = getPro('editorEvents'),
                        editorFormat = getPro('editorFormat'),
                        editorMask = getPro('editorMask'),
                        editorReadonly = getPro('editorReadonly'),
                        editorDropListWidth = getPro('editorDropListWidth'),
                        editorDropListHeight = getPro('editorDropListHeight'),
                        t,oldProp;
                    
                    // 3. for checkbox/lable,button type
                    if(type=='checkbox'){
                        cellNode.first().focus();
                        return;
                    }else if(type=='button'||type=='label')
                        return;
    
                    // 4. try to get editor from cache
                    if(profile.$cache_editor[type])
                        editor=profile.$cache_editor[type];
                    // 5. create a ComboInput Editor, and cache it
                    else{
                        var precision=getPro('precision'),
                            dateEditorTpl=getPro('dateEditorTpl');
                        editor=new linb.UI.ComboInput({dirtyMark:false,cachePopWnd:false,left:-1000,top:-1000,position:'absolute',visibility:'hidden',zIndex:100});
                        switch(type){
                            case 'number':
                            case 'spin':
                            case 'currency':
                                editor.setType(type);
                                if(_.isSet(precision))
                                    editor.setPrecision(precision);
                                break;
                            case 'progress':
                                editor.setType('spin').setMax(1).setMin(0).setPrecision(4).setIncrement(0.01);
                                break;
                            case 'input':
                                editor.setType('none');
                                break;
                            case 'textarea':
                                editor.setType('none').setMultiLines(true).setCommandBtn('save').onCommand(function(p){
                                    p.boxing().hide();
                                });
                                _.tryF(editor.setResizer,[true],editor);
                                break;
                            case 'date':
                            case 'datepicker':
                            case 'datetime':
                                if(dateEditorTpl)
                                    editor.setDateEditorTpl(dateEditorTpl);
                            case 'listbox':
                            case 'combobox':
                            case 'helpinput':
                            case 'time':
                            case 'timepicker':
                            case 'color':
                            case 'colorpicker':
                            case 'getter':
                            case 'popbox':
                            case 'cmdbox':
                                editor.setType(type).beforeComboPop(function(pro, pos, e, src){
                                    var cell=pro.$cell,event=profile.box.getCellPro(profile, cell, 'event');
                                    if(profile.box.getCellPro(profile, cell,'disabled'))
                                        return false;
                                    if(typeof event == 'function')
                                        return event.call(profile._host||profile, profile, cell, pro, pos,e,src);
                                    else
                                        return profile.boxing().beforeComboPop(profile, cell, pro, pos, e, src);
                                });
                                break;
                        }
                        baseNode.append(editor);
                        //cache the stantdard editor
                        profile.$cache_editor[type] = editor;
                    }

                    if(editor.setInputReadonly && editorReadonly)
                        editor.setInputReadonly(true);
                    if(editor.setDropListWidth && editorDropListWidth)
                        editor.setDropListWidth(editorDropListWidth);
                    if(editor.setDropListHeight && editorDropListHeight)
                        editor.setDropListHeight(editorDropListHeight);
                    if(editorFormat){
                        if(typeof editorFormat=='function' && editor.beforeFormatCheck)
                            editor.beforeFormatCheck(editorFormat);
                        else if(typeof editorFormat=='string' && editor.setValueFormat)
                            editor.setValueFormat(editorFormat);
                    }
                    if(editorMask && editor.setMask)
                        editor.setMask(editorMask);
                    if(editorProperties){
                        oldProp={}
                        var h=profile.getProperties();
                        _.each(editorProperties,function(o,i){
                            oldProp=h[i];
                        });
                        editor.setProperties(editorProperties);
                    }
                    if(editorEvents)
                        editor.setEvents(editorEvents);
    
                    // clear for valueFormat, setValue maybe cant set value because of valueFormat
                    editor.resetValue();
    
                    //set properities
                    switch(type){
                        case 'listbox':
                        case 'combobox':
                        case 'helpinput':
                            // set properties
                            if(t=getPro('editorListItems')){
                                editor.setListKey(null);
                                editor.setItems(t);
                            }else if(t=getPro('editorListKey')) {
                                editor.setItems(null);
                                editor.setListKey(t);
                            }
                            break;
                        case 'cmdbox':
                        case 'popbox':
                            // reset Caption
                            if(editor.setCaption)
                                editor.setCaption(cell.caption||"");
                    }

                    // must set value here, after setItems/setListKey
                    //$editorValue must be set in beforeIniEditor
                    editor.setValue(cell.$editorValue||cell.value,true);
                    delete cell.$editorValue;

                    //$tag for compatible
                    if(cell.$tag){
                        if(editor.setCaption)editor.setCaption(cell.$tag);
                        else if(editor.setValue)editor.setValue(cell.$tag);
                    }
                    //give a reference
                    editor.get(0).$cell = cell;
                    editor.get(0)._smartnav=true;
    
                    //undo function is a must
                    editor.undo=function(){
                        var editor=this;
                        // for ie's setBlurTrigger doesn't trigger onchange event
                        editor.getSubNode('INPUT').onBlur(true);
                        
                        // row dirty alert
                        profile.box._trycheckrowdirty(profile,profile.$cellInEditor);

                        profile.$curEditor=null;
                        profile.$cellInEditor=null;
                        
                        editor.getRoot().setBlurTrigger(profile.$linbid+":editor");
                        if(!profile.properties.directInput){
                            editor.afterUIValueSet(null).beforeNextFocus(null).onCancel(null);                    
                            editor.setValue('',true);
                        }
                        // clear those setting
                        if(editorFormat){
                            if(editor.beforeFormatCheck)editor.beforeFormatCheck(null);
                            if(editor.setValueFormat)editor.setValueFormat('');
                        }
                        if(editorMask)
                            if(editor.setMask)editor.setMask('');
                        if(editorReadonly)
                            if(editor.setInputReadonly)editor.setInputReadonly(false);
                        if(editorDropListWidth)
                            if(editor.setDropListWidth)editor.setDropListWidth(0);
                        if(editorDropListHeight)
                            if(editor.setDropListHeight)editor.setDropListHeight(0);
                        if(oldProp){
                            editor.setProperties(oldProp);
                            oldProp=null;
                        }
                        if(editorEvents){
                            var h={};
                            _.each(editorEvents,function(o,i){
                                h[i]=null;
                            });
                            editor.setEvents(h);
                        }
                        
                        delete editor.get(0).$cell;
                        delete editor.get(0)._smartnav;
                        //don't use disply:none, firfox has many bugs about Caret or renderer
                        editor.setVisibility('hidden');
                        
                        // execute once
                        editor.undo=null;
                        if(profile.onEndEdit)
                            profile.boxing().onEndEdit(profile, cell, editor);
                    };
        
                    //editor change value, update cell value
                    editor
                    .afterUIValueSet(function(pro,oV,nV){
                        var type=getPro('type'),_$caption;
                        switch(type){
                            case 'number':
                            case 'spin':
                            case 'progress':
                                nV=parseFloat(nV);
                                nV=(nV||nV===0)?nV:null;
                                break;
                            case 'currency':
                                nV=parseFloat((''+nV).replace(/[^\d.-]/g,''));
                                nV=(nV||nV===0)?nV:null;
                                break;
                            case 'cmdbox':
                            case 'popbox':
                            case 'combobox':
                            case 'listbox':
                            case 'helpinput':
                                _$caption=pro.boxing().getShowValue();
                                break;
                        }
                        var options={value:nV};
        
                        if(_.isDefined(_$caption))
                            options.caption=options._$caption=_$caption;
        
                        if(pro.properties.hasOwnProperty("tagVar"))
                            options.tagVar=pro.properties.tagVar;
        
                        grid._updCell(profile, cellId, options, profile.properties.dirtyMark, true);
                    })
                    .beforeNextFocus(function(pro, e){
                        if(editor){
                            _.tryF(editor.undo,[],editor);
                            var hash=linb.Event.getEventPara(e);
                            if(hash.keyCode=='enter')hash.keyCode='down';
        
                            profile.getSubNode('CELLA', cell._serialId).onKeydown(true,hash);
                        }
                        //prevent
                        return false;
                    })
                    .onCancel(function(){
                        if(editor)
                            _.tryF(editor.undo,[],editor);                
                    })
                    .getRoot().setBlurTrigger(profile.$linbid+":editor", function(){
                        if(editor)
                            _.tryF(editor.undo,[],editor);
                        return false;
                    });
    
                    var absPos=cellNode.offset(null, baseNode),
                        size = cellNode.cssSize();
                    //show editor
                    if(type=='textarea'){
                        editor.setWidth(Math.max(200,size.width+3)).setHeight(Math.max(100,size.height+2))
                        .reLayout(true,true)
                        .reBoxing()
                        .popToTop(cellNode, 4, baseNode);
                    }else{
                        editor.setWidth(size.width+3).setHeight(size.height+2).reLayout(true);
                        editor.reBoxing().show((absPos.left-1) + 'px',(absPos.top-1) + 'px');
                    }
                    editor.setVisibility("visible");
        
                    if(profile.onBeginEdit)
                        profile.boxing().onBeginEdit(profile, cell, editor);
                    //activate editor
                    _.asyRun(function(){
                        _.tryF(editor&&editor.activate,[],editor);
                    });
                }
            }

            //give a reference
            profile.$curEditor=editor;
            profile.$cellInEditor=cell;
            
            if(ishotrow){
                profile.__needchecktmprow=true;
                profile.box._sethotrowoutterblur(profile);
            }
        },
        _ajdustBody:function(profile){
            _.resetRun(profile.$linbid+'4',function(){
                var body=profile.getSubNode('BODY'),
                    header=profile.getSubNode('HCELLS'),
                    t,l,last,keys=profile.keys,ww;
                if(body.get(0).clientHeight){
                    if(header.get(0).clientHeight){
                        if(t=header.get(0).childNodes){
                            l=t.length;
                            while(l){
                                if(t[l-1].clientHeight){
                                    last=t[l-1];
                                    break;
                                }
                                --l;
                            }
                        }
                        ww=last?(last.offsetWidth+last.offsetLeft+100):0;
                        //set HI node
                        header.parent().width(ww);
                        body.width(ww);
                    }else{
                        if(t=body.get(0).childNodes){
                            l=t.length;
                            while(l){
                                if(t[l-1].clientHeight){
                                    last=t[l-1];
                                    break;
                                }
                                --l;
                            }
                            if(last){
                                var sid=profile.getSubId(last.id);
                                t=profile.getSubNode('CELLS',sid);
                                if(t=t.get(0).childNodes){
                                    l=t.length;
                                    while(l){
                                        if(t[l-1].clientHeight){
                                            last=t[l-1];
                                            break;
                                        }
                                        --l;
                                    }
                                }
                            }
                        }
                    }
                }

                if(last){
                    body.width(last.offsetWidth+last.offsetLeft);
                }else{
                    var prop = profile.properties,hd=prop.header,rows=prop.rows,
                    //defult
                    w = prop.rowHandler?(prop.rowHandlerWidth+2):0;
                    _.each(hd,function(o){
                        if(o.hidden!==true)
                            w += o.width + 2;
                    });
                    body.width(w);
                }
                t=last=null;
            });
        },
        _adjustHeader:function(arr){
            var a=_.copy(arr),m;
            _.arr.each(a,function(o,i){
                //id will be adjusted in _prepareHeader
                a[i]=_.copy(o);
            });
            return a;
        },
        _adjustRows:function(arr){
            var a,m;
            if(_.isArr(arr) && arr.length && typeof arr[0] !='object')a=[arr];
            else a=_.copy(arr);

            _.arr.each(a,function(o,i){
                //id will be adjusted in _prepareItems
                if(_.isArr(o))
                    a[i]={cells:o};
                else a[i]=_.copy(o);

                m=a[i].cells=_.copy(a[i].cells);
                _.arr.each(m,function(o,i){
                    //It's a hash
                    if(!!o && typeof o == 'object' && o.constructor == Object)
                        m[i]=_.copy(o);
                    // not a hash
                    else
                        m[i]={value:o};
                })
            });
            return a;
        },
         _focuscell:function(profile, e, src){
            if(profile.properties.disabled||profile.properties.readonly)return;
                        
            var p = profile.properties,
                box=profile.box,
                getPro=box.getCellPro,
                cell = profile.cellMap[profile.getSubId(src)],
                mode = p.activeMode, id;
            
            if(cell){
                var edit=false;
                if(getPro(profile, cell, 'editable')){
                    if(getPro(profile, cell, 'disabled')||getPro(profile, cell, 'readonly')){
                        edit=false;
                    }else{
                        edit=true;
                        box._editCell(profile, cell._serialId);
                        _.asyRun(function(){
                            linb.use(src).parent().onMouseout(true,{$force:true})
                                      .parent().onMouseout(true,{$force:true});
                        });
                    }
                }
                // if not in edit mode
                if(!edit){
                    if(cell && mode=='cell'){
                        id = linb.use(src).parent().id();
                        box._activeCell(profile, id);
                    }
                }else{
                    if(cell && mode=='cell'){
                        box._activeCell(profile, false);
                    }
                }
            }
            if(mode=='row'){
                id = linb.use(src).parent(2).id();
                box._activeRow(profile, id);
            }
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!linb.Tips)return;

            var ks=profile.keys,item,hcell=ks.HCELL+':',sid,id,pid;
            if(profile.properties.disabled)return;

            id=node.id;
            pid=node.parentNode.id;
            sid=profile.getSubId(id);

            if(id.indexOf(ks.FCELL)==0 || pid.indexOf(ks.FCELL)==0)
                item = profile.rowMap[sid];
            else if(id.indexOf(ks.HCELL)==0 || pid.indexOf(ks.HCELL)==0)
                item = profile.colMap[sid];
            else if(id.indexOf(ks.CELL)==0 || pid.indexOf(ks.CELL)==0)
                item = profile.cellMap[sid];

            if(item){
                linb.Tips.show(pos, ('tips' in item)?item.tips:(item._$tips||item.caption));
            }else
                linb.Tips.hide();
            return true;
        },
        _onresize:function(profile,width,height){
            profile.getSubNode('BORDER').cssSize({ width :width, height :height});
            var t1=profile.getSubNode('HEADER'),
                t2=profile.getSubNode('SCROLL'),
                rh=0;
            profile.getSubNode('BOX').cssSize({width: width, height:height});
            if(width)t1.width(width);
            if(height)rh=t1.offsetHeight();
            t2.cssSize({width:width, height: height?(height-rh):null});

            _.asyRun(function(){t2.onScroll()});
        }
   }
});
