Class("VisualJS.EditorTool",null,{
    Static:{
        getDoc:function(key){
            if(!key)return '';
            if(key.indexOf('(')!=-1)
                key=key.replace(/[()]/g,'');
            var o = linb.getRes("doc."+key);
            try{
                if(typeof o == 'string'){
                    var obj = _.get(window,key.split('.'));
                    if(obj && obj.$original$)
                        o = linb.getRes("doc." +obj.$original$+((obj.$type$=='instance'||obj.$type$=='event')?'.prototype':'')+"."+obj.$name$);
                    if(typeof o == 'string')
                        return null;
                }
                return this._buildDoc(o);
            }catch(e){
                return null;
            }
        }, 
        _buildDoc:function(o){
            var arr=[];
            if(o){
                if(o.$desc)
                    arr.push('<div class="doc-inndiv">' + o.$desc + '</div>');
                if(o.$rtn)
                    arr.push('<div class="doc-inndiv">' + '<strong>'+linb.getRes('app.retV')+': </strong>' + o.$rtn + '</div>');
                if(o.$paras){
                    arr.push('<div class="doc-inndiv">' + '<div><strong>'+linb.getRes('app.param')+': </strong></div><ul>');
                    _.arr.each(o.$paras,function(v){
                        v=v.replace(/^([^:\[]*)([^:]*):(.*)$/,"<strong>$1</strong> $2 : $3");
                        arr.push('<li> ' + v + ' </li>');
                    })
                    arr.push("</ul></div>");
                }

                if(o.$snippet){
                    arr.push('<div class="doc-inndiv">' + '<div><strong>'+linb.getRes('app.codesnip')+': </strong></div>');
                    _.arr.each(o.$snippet,function(v){
                        arr.push('<textarea id="doc:code" class="js plain fold" style="display:none;">' + v + '</textarea><p>&nbsp;</p>');
                    })
                    arr.push("</div>");
                }
                if(o.$memo)
                    arr.push('<div class="doc-inndiv">' + '<strong>'+linb.getRes('app.memo')+': </strong>' + o.$memo + '</div>');

                if(o.$links){
                    arr.push('<div class="doc-inndiv">' + '<div><strong>'+linb.getRes('app.seealso')+': </strong></div><ul>');
                    _.arr.each(o.$links,function(v){
                        arr.push('<li><a target="'+(v[2]||'')+'" href="' +v[1]+ '">' + v[0] + '</a></li>');
                    })
                    arr.push("</ul></div>");
                }
            }
            return arr.join('');
        }, 

        indentAll:function(editor){
            var text=editor.callEditor('selection');
            if(text)
                editor.callEditor('reindentSelection');
            else
                editor.callEditor('reindent');
        },
        showFindWnd:function(editor, pos){
            linb.ComFactory.getCom("VisualJS.FAndR",function(){
                this.setEvents({
                    findNext:function(str){
                        var cursor;
                        cursor=editor.callEditor('getSearchCursor',[str,true]);
                        if(cursor.findNext())cursor.select();
                        else{
                            cursor=editor.callEditor('getSearchCursor',[str,false]);
                            if(cursor.findNext())
                                cursor.select();
                            else
                                linb.message(linb.getRes('VisualJS.pageEditor.findnone'));
                        }
                    },
                    'replace':function(str,txt){
                        var text=editor.callEditor('selection');
                        if(text && text==str)
                            editor.callEditor('replaceSelection',[txt]);
                    },
                    replaceAndFind:function(str,txt){
                        var text=editor.callEditor('selection');
                        if(text && text==str)
                            editor.callEditor('replaceSelection',[txt]);
                        var cursor;
                        cursor=editor.callEditor('getSearchCursor',[str,true]);
                        if(cursor.findNext())cursor.select();
                        else{
                            cursor=editor.callEditor('getSearchCursor',[str,false]);
                            if(cursor.findNext())
                                cursor.select();
                            else
                                linb.message(linb.getRes('VisualJS.pageEditor.findnone'));
                        }
                    },
                    replaceAll:function(str,txt){
                        var cursor,count=0;
                        cursor=editor.callEditor('getSearchCursor',[str,false]);
                        if(cursor.findNext()){
                            cursor.select();
                            editor.callEditor('replaceSelection',[txt]);
                            count++;
                            while(1){
                                cursor=editor.callEditor('getSearchCursor',[str,true]);
                                if(cursor.findNext()){
                                    cursor.select();
                                    editor.callEditor('replaceSelection',[txt]);
                                    count++;
                                }else{
                                    break;
                                }
                            }
                        }
                        linb.message(linb.getRes('VisualJS.pageEditor.replaceCount', count));
                    }
                });
                this.show(null, null, null, null, pos.left, pos.top);
            });
        },
        showJumpToWnd:function(editor, pos){
            linb.ComFactory.getCom("VisualJS.JumpTo",function(){
                this.setEvents({
                    "onOK":function(line){
                        try{
                            var handler=editor.callEditor('nthLine',[line]);
                            editor.callEditor('jumpToLine',[handler]);
                        }catch(e){}
                    }
                });
                this.show(null, null, null, null, pos.left, pos.top);
            });
        }
    }
});