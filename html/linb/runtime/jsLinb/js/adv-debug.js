Class("linb.UI.FusionChartFree", "linb.UI.Flash",{
    Instance:{
        refreshChart:function(){
            this.refreshFlash();
        },
        setDataXML:function(xml){
            var prf=this.get(0),chart = prf.box._getSWF(prf);
            if(chart){
            	chart.SetVariable("_root.dataURL","");
            	chart.SetVariable("_root.isNewData","1");
            	chart.SetVariable("_root.newData",xml);
            	chart.TGotoLabel("/", "JavaScriptHandler"); 
            }
        }
    },
    Static:{
        _FC_LINKTAG:'JavaScript:',
        _FC_SWFFILEPRETAG:"FCF_",
        DataModel:{
            selectable:true,
            FC_eventHandler:{
                ini:true,
                action:function(){
                    this.boxing().refreshChart();
                }
            },
            FC_chartType:{
                combobox:"Column2D,Column3D,Pie2D,Pie3D,Line,Bar2D,Area2D,Doughnut2D,MSColumn2D,MSColumn3D,MSLine,MSArea2D,MSBar2D,StackedColumn2D,StackedColumn3D,StackedArea2D,StackedBar2D,Candlestick,Funnel,Gantt".split(','),
                ini:"Column2D",
                action:function(v){
                    var ns=this,prop=ns.properties;
                    // from outside
                    if(prop.FC_demoDataPath){
                        linb.Ajax(prop.FC_demoDataPath + v +".xml", {rnd:_()},function(rsp){
                            prop.FC_data=linb.XML.xml2json(rsp,null,function(s){
                                return ns.box.replaceSpecialChars(x);
                            });
                        },null,null,{asy:false,rspType:'xml'}).start();
                    }
                    prop.src=prop.FC_swfPath + this.box._FC_SWFFILEPRETAG + prop.FC_chartType + ".swf",
 
                    this.boxing().refreshChart();
                }
            },
            FC_swfPath:"FusionChartsFree/Charts/",
            FC_demoDataPath:"FusionChartsFree/Data/",
            FC_attrs:{
                ini:{
                    bgcolor: "transparent",
                    quality: "high",
                    allowScriptAccess: "always",
                    debugMode: "false",
                    registerWithJS:"1",
                    scaleMode:'noScale'
                },
                action:function(){
                    this.boxing().refreshChart();
                }
            },
            FC_labels:{
                ini:{
                    PBarLoadingText:"Loading Chart. Please Wait",
                    XMLLoadingText:"Retrieving Data. Please Wait",
                    ParsingDataText:"Reading Data. Please Wait",
                    ChartNoDataText:"No data to display",

                    RenderingChartText:"Rendering Chart. Please Wait",
                    LoadDataErrorText:"Error in loading data",
                    InvalidXMLText:"Invalid XML data"
                },
                action:function(){
                    this.boxing().refreshChart();
                }
            },
            FC_data:{
                ini:{},
                action:function(v){
                    var ns=this;
                    ns.box._buildChartXML(ns, function(xml){
                        ns.boxing().setDataXML(ns.box._encodeDataXML(linb.XML.json2xml(xml)));
                    });
                }
            }
        },
        RenderTrigger:function(){
            this.boxing().setFC_chartType(this.properties.FC_chartType,true).refreshChart();
        },
        EventHandlers:{
            onFC_Click:function(profile, args){},
            onFC_PrepareXML:function(profile, json, callback){},
            onFC_SetXML:function(profile, xml){}
        },
        replaceSpecialChars:function(str){
            return (""+str).replace(/\%/g, '%25')
            .replace(/\&/g, '%26')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\'/g, '&apos;');
        },
        _encodeDataXML:function(strDataXML){
            var regExpReservedCharacters=["\\$","\\+"];
			var arrDQAtt=strDataXML.match(/=\s*\".*?\"/g);
			if (arrDQAtt){
				for(var i=0;i<arrDQAtt.length;i++){
					var repStr=arrDQAtt[i].replace(/^=\s*\"|\"$/g,"");
					repStr=repStr.replace(/\'/g,"%26apos;");
					var strTo=strDataXML.indexOf(arrDQAtt[i]);
					var repStrr="='"+repStr+"'";
					var strStart=strDataXML.substring(0,strTo);
					var strEnd=strDataXML.substring(strTo+arrDQAtt[i].length);
					var strDataXML=strStart+repStrr+strEnd;
				}
			}
			
			strDataXML=strDataXML.replace(/\"/g,"%26quot;");
			strDataXML=strDataXML.replace(/%(?![\da-f]{2}|[\da-f]{4})/ig,"%25");
			strDataXML=strDataXML.replace(/\&/g,"%26");

			return strDataXML;
        },
        _buildChartXML:function(profile, callback){
            var ns=this, prop=profile.properties, ver = ns.getFlashVersion();
            if(ver.split(',')[0]<8){
                linb.alert(linb.getRes("inline.noFlash"));
                return "";
            }

            var data = _.clone(prop.FC_data);
            if(prop.FC_eventHandler){
                var serialId=profile.serialId,
                    linktag=ns._FC_LINKTAG,
                    idata;
                if(profile.onFC_PrepareXML && false === profile.boxing().onFC_PrepareXML(profile, data, callback)){}
                else{
                    // chart or graph
                    if(idata=(data.chart||data.graph)){
                        if(idata.set){
                            _.arr.each(idata.set,function(o){
                                if(o)
                                    o['@link']=encodeURIComponent(linktag+ns.KEY+'._e("'+serialId+'","'+(o['@label']||o['@name']||"")+'","'+(o['@value']||'')+'")');
                            });
                        }
                        _.arr.each(["lineSet","dataset","dataSet"],function(dskey){
                            if(idata[dskey]){
                                var arr=[];
                                if(idata.categories && idata.categories.category){
                                    _.arr.each(idata.categories.category,function(o){
                                        arr.push(o['@label']||o['@name']||"");
                                    });
                                }
                                
                                var ds=idata[dskey];
                                if(!_.isArr(ds))
                                    ds=[ds];
                                _.arr.each(ds,function(v, i){
                                    if(v){
                                        _.arr.each(["lineSet","dataset","dataSet"],function(dskey2){
                                            _.arr.each(v[dskey2],function(k){
                                                if(k && k.set){
                                                    var sn=k['@seriesName']||k['@seriesname']||'';
                                                    _.arr.each(k.set,function(o,j){
                                                        if(o)
                                                            o['@link']=encodeURIComponent(linktag+ns.KEY+'._e("'+serialId+'","'+(arr[j]||"")+'","'+sn+'","'+(o['@value']||o['@label']||o['@name']||'')+'")');
                                                    });
                                                }
                                            });
                                        });
                                        if(v.set){
                                            var sn=v['@seriesName']||v['@seriesname']||'';
                                            _.arr.each(v.set,function(o,j){
                                                if(o)
                                                    o['@link']=encodeURIComponent(linktag+ns.KEY+'._e("'+serialId+'","'+(arr[j]||"")+'","'+sn+'","'+(o['@value']||o['@label']||o['@name']||'')+'")');
                                            });
                                        }
                                    }
                                });
                            }
                        });
                        callback(data);
                    }else
                        callback("");
                }
            }else{
                callback(data);
            }
        },
        _drawSWF:function(profile){
            var ns=this;
            ns._buildChartXML(profile, function(data){
                var prop=profile.properties,
                    serialId=profile.serialId,
                    src=prop.src,
                    parameters={},
                    options={},
                    xml="";

                if(prop.flashvars && !_.isEmpty(prop.flashvars))_.merge(parameters, prop.flashvars, 'all');
                if(prop.parameters && !_.isEmpty(prop.parameters))_.merge(parameters, prop.parameters, 'all');
                if(prop.FC_attrs && !_.isEmpty(prop.FC_attrs))_.merge(options, prop.FC_attrs, 'all');
                if(prop.flashvars && !_.isEmpty(prop.flashvars))_.merge(options, prop.flashvars, 'all');

                options.DOMId = profile.box._idtag + profile.serialId;
                options.chartWidth=prop.width;
                options.chartHeight=prop.height;
                options.dataXML=ns._encodeDataXML(linb.XML.json2xml(data));

                if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
                    xml += '<embed type="application/x-shockwave-flash" src="'+ src +'?'+_.urlEncode(parameters)+'" ';
                    xml += 'width="'+prop.width+'" height="'+prop.height+'" ';
                    xml += 'id="'+ options.DOMId +'" name="'+ options.DOMId +'" ';
                    xml += 'wmode="opaque" ';
                    xml += 'flashvars="'+ _.urlEncode(options) +'" ';
                    xml +=  '/>';
                }else{
                    xml += '<object id="'+ options.DOMId +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
                    xml += 'width="'+prop.width+'" height="'+prop.height+'">';
                    xml += '<param name="movie" value="'+ src +'?'+_.urlEncode(parameters)+'" />';
                    xml += '<param name="wmode" value="opaque" />';
                    xml += '<param name="flashvars" value="'+ _.urlEncode(options) +'" />';
                    xml += '</object>';
                }
                profile.getSubNode('BOX').html(xml, false);
                if(profile.onFC_SetXML)profile.boxing().onFC_SetXML(profile,xml);
            });
        },
        _idtag:"linb_UI_FCF_", 
        __events:{},
        _e:function(){
            var instance=this.getFromDom(this.KEY+":"+arguments[0]+":"),
                prf=instance && instance.get(0);
            if(prf && !prf.properties.disable && prf.onFC_Click){
                var args=_.toArr(arguments);
                args=args.slice(1);
                instance.onFC_Click(prf, args);
            }
        }
    }
});Class("linb.UI.FusionChart3", "linb.UI.FusionChartFree",{
    Instance:{
        setDataXML:function(xml){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.setDataXML(xml);
        },
        print:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.print();
        },
        setDataURL:function(strDataURL){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.setDataURL(strDataURL);
        },
        getDataAsCSV:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.getDataAsCSV();
        },
        hasRendered:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.hasRendered();
        },
        getChartAttribute:function(attrName){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.getChartAttribute(attrName);
        },
        getXML:function(){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart.getXML();
        },
        callFCFunction:function(funName, funArgs){
            var chart=this.constructor._getSWF(this.get(0));
            if(chart)
                return chart[funName].apply(chart, funArgs);
        }
    },
    Initialize:function(){
        var ns=this,fireEvent=function(domId, eName){
            if(domId && ns._getSWF(domId)){
                var instance=ns.getFromDom(ns.KEY+":"+domId.replace(ns._idtag,'')+":"),
                    prf=instance && instance.get(0);
                if(prf && prf[eName])
                    instance[eName](prf);
                }
            },
            old;
        old=window.FC_Loaded;
        window.FC_Loaded=function(domId){
            fireEvent(domId,"onFC_Loaded");
            if(old)old(domId);
        };
        old=window.FC_Rendered;
        window.FC_Rendered=function(domId){
            fireEvent(domId,"onFC_Rendered");
            if(old)old(domId);
        };
        old=window.FC_DataLoaded;
        window.FC_DataLoaded=function(domId){
            fireEvent(domId,"onFC_DataLoaded");
            if(old)old(domId);
        };
        old=window.FC_DataLoadError;
        window.FC_DataLoadError=function(domId){
            fireEvent(domId,"onFC_DataLoadError");
            if(old)old(domId);
        };
        old=window.FC_NoDataToDisplay;
        window.FC_NoDataToDisplay=function(domId){
            fireEvent(domId,"onFC_NoDataToDisplay");
            if(old)old(domId);
        };
        old=window.FC_DataXMLInvalid;
        window.FC_DataXMLInvalid=function(domId){
            fireEvent(domId,"onFC_DataXMLInvalid");
            if(old)old(domId);
        };
    },
    Static:{
        _idtag:"linb_UI_FC3_", 
        _FC_SWFFILEPRETAG:"",
        DataModel:{
            selectable:true,
            FC_chartType:{
                combobox:"Column2D,Column3D,Pie2D,Pie3D,Line,Bar2D,Area2D,Doughnut2D,Doughnut3D,MSColumn2D,MSColumn3D,MSLine,MSArea,MSBar2D,MSBar3D,StackedColumn2D,StackedColumn3D,StackedArea2D,StackedBar2D,StackedBar3D,MSStackedColumn2D,MSCombi2D,MSCombi3D,MSColumnLine3D,MSCombiDY2D,MSColumn3DLineDY,StackedColumn3DLineDY,MSStackedColumn2DLineDY,Scatter,Bubble,ScrollColumn2D,ScrollLine2D,ScrollArea2D,ScrollStackedColumn2D,ScrollCombi2D,ScrollCombiDY2D".split(',')
            },
            FC_swfPath:"FusionCharts3/Charts/",
            FC_demoDataPath:"FusionCharts3/Data/"
        },
        EventHandlers:{
            onFC_Loaded:function(profile){},
            onFC_Rendered:function(profile){},
            onFC_DataLoaded:function(profile){},
            onFC_DataLoadError:function(profile){},
            onFC_NoDataToDisplay:function(profile){},
            onFC_DataXMLInvalid:function(profile){}
        }
    }
});    /*support
    tab: to 4 space
    enter: add head space
    {enter: add head+4 space
    }:add head-4 space
    */
Class("linb.UI.TextEditor", ["linb.UI.Widget","linb.absValue"] ,{
    Instance:{
        activate:function(){
            var profile = this.get(0);
            profile.getSubNode('INPUT').focus();
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.isDefined(value))value='';
            return this.each(function(profile){
                var node=profile.getSubNode('INPUT').get(0);
                if(node.value.replace(/(\r\n|\r)/g, "\n")!=value.replace(/(\r\n|\r)/g, "\n")){
                    var st=node.scrollTop;
                    node.value=value;
                    node.scrollTop=st;
                }
            });
        },
        _getCtrlValue:function(value){
            var profile = this.get(0);
            return profile.getSubNode('INPUT').attr('value').replace(/(\r\n|\r)/g, "\n").replace(/( +)(\n)/g, "$2").replace(/\t/g, "    ");
        }
    },
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            BOX:{
                tagName:'div',
                INPUT:{
                    tagName:'textarea',
                    tabindex:'{tabindex}',
                    style:'{_css}'
                }
            },
            BAK1:{},
            BAK2:{tagName:'div'}
        },'all');
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            BOX:{
                width:'100%',
                height:'100%',
                left:0,
                top:0,
                //for firefox bug: cursor not show
                position:'absolute',
                overflow:linb.browser.gek?'auto':'',
                'z-index':'10'
            },
            INPUT:{
                'font-family': 'Courier New, Courier, monospace',
                'font-size':'12px',
                'line-height':'14px',
                position:'absolute',
                'background-color':'#fff',
                left:0,
                top:0,
                border:0,
                margin:0,
                padding:0,
                overflow:'auto',
                'overflow-y':'auto',
                'overflow-x':'hidden'
            },
            'BAK1, BAK2':{
                'font-family': 'Courier New, Courier, monospace',
                'font-size':'12px',
                position:'absolute',
                visibility:'hidden',
                left:'-10000px',
                top:'-10000px'
            }
        },
        Behaviors:{
            INPUT:{
                onFocus:function(profile,e,src){
                    profile.box._onchange(profile,linb.use(src).get(0));
                },
                onChange:function(profile, e, src){
                    profile.boxing().setUIValue(linb.use(src).get(0).value);
                    profile.box._onchange(profile,linb.use(src).get(0));
                },
                afterKeydown:function(profile, e, src){
                    var pro=profile.properties,str,t;
                    if(pro.disabled || pro.readonly)return;
                    if(profile.$change)delete profile.$change;
                    var key = linb.Event.getKey(e),
                    node=linb.use(src).get(0),
                    k=key.key;
                    switch(k){
                        case 'tab':
                            var r=linb.use(src).caret(),
                                sel=node.value.slice(r[0],r[1]);
                            if(/(\n|\r)/.test(sel)){
                                //previous
                                str=node.value.slice(0,r[0]);
                                if(sel.charAt(0)!='\n' && sel.charAt(0)!='\r'){
                                    //change sel
                                    sel=str.slice(r[0]=str.lastIndexOf('\n'))+sel;
                                }
                                //
                                if(linb.browser.ie){
                                    t= (t=str.match(/\r/g))?t.length:0;
                                    r[0]-=t;
                                    t= (t=(node.value.slice(0,r[1])).match(/\r/g))?t.length:0;
                                    r[1]-=t;
                                }

                                //re caret
                                linb.use(src).caret(r[0],r[1]);

                                if(key.shiftKey){
                                    sel=sel.replace(/(\n|\n\r)    /g,'$1');
                                }else{
                                    sel=sel.replace(/(\n|\n\r)/g,'$1    ');
                                }
                                //insert
                                profile.box.insertAtCaret(profile,sel);

                                r[1]=r[0]+sel.length;
                                if(linb.browser.ie){
                                    t= (t=sel.match(/\r/g))?t.length:0;
                                    r[1]-=t;
                                }
                                //caret
                                linb.use(src).caret(r[0],r[1]);
                            }else{
                                if(key.shiftKey){
                                    linb.use(src).caret(r[0]-4,r[0]-4);
                                    r[0]-=4;
                                    r[1]-=4;
                                }else{
                                    profile.box.insertAtCaret(profile,'    ');
                                    r[0]+=4;
                                    r[1]+=4;
                                }
                            }
                            profile.$pos=r;
                            return false;
                        case 'enter':
                            var paras = profile.box.getParas(profile);
                            str = paras[1];
                            var len = str.length - _.str.ltrim(str).length;

                            if(str.charAt(str.length-1)=="{")
                                len +=4;
                            if(len){
                                profile.box.insertAtCaret(profile, '\n'+_.str.repeat(' ',len));
                                profile.$enter=true;
                                return false;
                            }
                            break;
                        default:
                            if(profile.tips){
                                profile.tips.destroy();
                                profile.tips=null;
                            }
                    }
                    node=null;
                },
                afterKeypress:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    var key = linb.Event.getKey(e), k=key.key;
                    var me=arguments.callee, map=me.map || (me.map={space:1,enter:1,backspace:1,tab:1,"delete":1});
                    if(k.length==1 || map[k])
                        profile.$change=true;

                    switch(k){
                        case 'tab':
                            if(linb.browser.opr)
                                _.asyRun(function(){
                                    linb.use(src).caret(profile.$pos[0], profile.$pos[1]);
                                });
                            return false;
                        case 'enter':
                            if(profile.$enter){
                                delete profile.$enter;
                                return false;
                            }
                        case '}':
                            if(key.shiftKey){
                                var paras = profile.box.getParas(profile);
                                var
                                loc = paras[0],
                                str = paras[1],
                                pos=paras[2],
                                input=paras[3];
                                if(/ {4}$/.test(str)){
                                    var st=linb(src).scrollTop();
                                    input.value =
                                    input.value.substr(0,loc).replace(/ {4}$/,'}') +
                                    input.value.substr(loc, input.value.length);

                                    //fire event manully
                                    linb(input).onChange();

                                    profile.box.setCaretTo(input, loc - 4 + 1, st);

                                    return false;
                                }
                            }
                            break;
                    }
                },
                afterKeyup:function(profile, e, src){
                    var key = linb.Event.getKey(e),k=key.key;
                    var me=arguments.callee, map=me.map || (me.map={space:1,enter:1,backspace:1,tab:1,"delete":1});
                    if(k.length==1 || map[k])
                        profile.$change=true;

                    if(profile.$change){
                        delete profile.$change;
                        profile.box._onchange(profile,linb.use(src).get(0));
                    }
                }
            }
        },
        DataModel:{
            selectable:true,
            left:0,
            top:0,
            width:200,
            height:200,
            position:'absolute',
            disabled:{
                ini:false,
                action: function(v){
                    b.boxing().setReadonly(v);
                }
            },
            readonly:{
                ini:false,
                action: function(v){
                    this.getSubNode('INPUT').attr('readonly',v).css('background',v?'#EBEADB':'');
                }
            }
        },
        EventHandlers:{
            onChange:function(profile, oV, nV){}
        },
        RenderTrigger:function(){
            var ns=this;
            if(ns.properties.readonly)
                ns.boxing().setReadonly(true,true);

            var ie=linb.browser.ie,
                src=ns.getSubNode('INPUT').get(0),
                f=function(o){
                    //only for value in IE
                    if(ie && o.propertyName!='value')return true;

                    var src=ie?o.srcElement:this;
                    ns.box._onchange(ns,src);
                };
            if(ie){
                src.attachEvent("onpropertychange",f);
                src.attachEvent("ondrop",f);
                ns.$ondestory=function(){
                    src.detachEvent("onpropertychange",f);
                    src.detachEvent("ondrop",f);
                }
            }else{
                src.addEventListener("input",f,false);
                src.addEventListener("dragdrop",f,false);
                ns.$ondestory=function(){
                    var ns=this,
                        src=ns.getSubNode('INPUT').get(0);
                    if(src){
                        src.removeEventListener("input",f,false);
                        src.addEventListener("dragdrop",f,false);
                        src=null;
                    }
                }
                ns.getSubNode('BOX').$firfox2();
            }
        },
        _onchange:function(profile,src){
            if(profile.onChange){
                var v=src.id;
                _.resetRun(profile.$linbid+'_drop', function(){
                    v=linb.Dom.byId(v).value||'';
                    profile.$prevV=profile.$prevV||'';
                    if(v!=profile.$prevV){
                        profile.boxing().onChange(profile, profile.$prevV, v);
                        profile.$prevV=v;
                    }
                });
            }
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            if(linb.browser.kde)
                d._css='resize:none;';
            return d;
        },
        //
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments);
            profile.getSubNode('BOX').cssSize(size);
            profile.getSubNode('INPUT').cssSize(size);
        },
        //for
        insertAtCaret:function(profile, text) {
            var input = profile.getSubNode('INPUT'),
                scrollTop = input.scrollTop() || null,
                ret;
            //fire onChange manully
            input.onChange();
            //replace text
            ret=input.caret(text);
            //set cursor
    	    this.setCaretTo(input.get(0), ret||0, scrollTop);
    	},
        //set cursor to textarea
        setCaretTo:function(input, pos, scrollTop){
            input.focus()
            var s,c,h,o=linb([input]);

            //opera not support scrollTop in textarea
            if(_.isNumb(scrollTop))
                o.scrollTop(scrollTop);

            if(scrollTop===true){
                if(o.get(0).tagName.toLowerCase() == 'textarea' && o.scrollHeight() !== o.offsetHeight()){
                    s = o.attr('value').substr(0,pos);
                    c = o.clone().id('').css({visibility:'hidden',position:'absolute',left:5000+'px'}).attr('value',s);
                    linb('body').append(c);
                    h = Math.max((c.scrollHeight() > c.offsetHeight()) ? c.scrollHeight() - 30 : 0,0);
                    o.scrollTop(h);
                    c.remove();
                }
            }
            o.caret(pos,pos);
        },
        /*
        return array
        [0] char number before caret
        [1] line number of caret
        [2] absPos of caret
        [3] text before caret
        */
        getParas:function(profile){
            var o = profile.getSubNode('INPUT'), 
                me=arguments.callee, 
                reg = me.reg ||(me.reg=/\r\n/g),
                v = o.get(0).value,
                loc = o.caret();

            if(loc[0]<0)loc[0]=0;

            //for ie/opera
            var l=0, m = v.substr(0,loc[0]).match(reg);
            if(m)l=m.length;
            v = v.replace(reg,'\n');
            var txt = v.substr(0,loc[0]-l);

            var
            li = txt.lastIndexOf('\n') ,
            line = txt.substr(li+1, loc[0]-li),
            w=o.innerWidth(),
            bak1 = profile.getSubNode('BAK1'),
            bak2 = profile.getSubNode('BAK2')
            ;
            if(txt.charAt(txt.length-1)=='\n')txt+='*';

            bak2.width(w);
            var
            x = bak1.html(line.replace(/ /g,'&nbsp;'),false).width(),
            y = bak2.html(txt.replace(/\n/g,'<br />'),false).height() - o.scrollTop();

            if(x>w){
                bak2.html(line,false);
                var lbak = line;
                var bl = bak2.height();
                while(lbak){
                    //delete last words
                    lbak=lbak.replace(/ [^ ]*$/,'');
                    bak2.html(lbak,false);
                    if(bak2.height()!=bl)break;
                }
                lbak = line.substr(lbak.length, line.length-lbak.length);
                x = bak1.html(lbak,true).width();
            }

            bak1.html('',false);
            bak2.html('',false);

            var pos = profile.getRoot().offset();
            pos.left+=x;
            pos.top+=y;
            return [loc[0],line,pos,o.get(0),txt];
        }
    }
});
Class('linb.UI.TimeLine', ['linb.UI','linb.absList',"linb.absValue"], {
    Dependency:['linb.Date'],
    Instance:{
        _setCtrlValue:function(value){
            if(!value)return;
            if(value.indexOf(':')==-1)return;
            var profile=this.get(0),
                p=profile.properties,
                box=this.constructor,
                a=value.split(':'),
                from=new Date(parseInt(a[0])),
                to=new Date(parseInt(a[1])),
                pxStart=box._getX(profile,from),
                pxEnd=box._getX(profile,to),
                task;

            if(p.items.length===0)
                this.insertItems([{id:'$', caption:p.dftTaskName, from:parseInt(a[0]), to:parseInt(a[1])}],null,true);
            else
                box._resetItem(profile,{left:pxStart,width:pxEnd-pxStart},profile.getSubNodeByItemId('ITEM',p.items[0].id)._get(0));
        },
        visibleTask:function(){
            var profile=this.get(0),
                p=profile.properties,
                date=linb.Date,
                items=p.items,sv,target;

            if(!p.multiTasks){
                sv=items.length?items[0].from:p.$UIvalue?p.$UIvalue.split(':')[0]:0;
                if(sv){
                    target=new Date(+sv);
                    if(profile.renderId){
                        if(target<p.dateStart || target>date.add(p.dateStart,'ms',p.width*p._rate)){
                            p.dateStart=target;
                            var k=p.$UIvalue;
                            this.refresh().setUIValue(k,true);
                        }
                    }else{
                        p.dateStart=target;
                    }
                }
            }
            return this;
        },
        _afterInsertItems:function(profile){
            if(!profile.renderId)return;
           profile.box._reArrage(profile);
        },
        _afterRemoveItems:function(profile){
            profile.box._reArrage(profile);
        },
        _cache:function(){
            var profile=this.get(0),
                cls=this.constructor,
                picker=cls._picker;
            if(picker && picker.renderId)
                profile.getSubNode('POOL').append(picker.getRoot().css('display','none'));
        },
        getTimeRange:function(){
            var profile=this.get(0), p=profile.properties;
            return [p._smallLabelStart, p._smallLabelEnd];
        },
        iniContent:function(){
            return this.each(function(profile){
                var p=profile.properties;
                profile.boxing()._getContent(p._smallLabelStart,p._smallLabelEnd,p._rate,'ini');
                profile._iniOK=true
            });
        },

        addTasks:function(arr){
            return this.insertItems(arr,null,true);
        },
        removeTasks:function(ids){
            this.removeItems(ids);
            return this;
        },
        _getContent:function(from,to,rate,type){
//console.log('getContent',from,to,rate,type);
            return this.each(function(profile){
                if(profile.onGetContent){
                    var ins=profile.boxing(),
                        callback=function(arr){
                            if(type=='ini')
                                ins.clearItems();
                            ins.addTasks(arr);
                        };
                    if(profile.onGetContent){
                        var r = ins.onGetContent(profile, from, to, rate, type, callback);
                        if(r)callback(r);
                    }
                }
            });
        },
        scrollToLeft:function(callback){
            var profile=this.get(0);
            if(profile.pauseA||profile.pause)return;

            var t=profile.properties,
                date=linb.Date,
                rate=t._rate,
                o=profile.box._getMoveNodes(profile),
                x1=t._band_left,
                x2=0;
            ;
            if(t.minDate && t._smallLabelStart<t.minDate)
                x2-=date.diff(t._smallLabelStart,t.minDate,'ms')/rate;

            profile.pause=true;
            o.animate({left:[x1,x2]}, null, function(){
                if(typeof callback=='function')
                    callback();
                profile.pause=false;
            },200,Math.max(5,(x2-x1)/100),'sineInOut').start();
        },
        scrollToRight:function(callback){
            var profile=this.get(0);                    
            if(profile.pauseA||profile.pause)return;
            var t=profile.properties,
                date=linb.Date,
                rate=t._rate,
                o=profile.box._getMoveNodes(profile),
                x1=t._band_left,
                x2=t.width-t._band_width;
            ;
            if(t.maxDate && t._smallLabelEnd>t.maxDate)
               x2+=date.diff(t.maxDate,t._smallLabelEnd,'ms')/rate;

            if(x1>x2){
                profile.pause=true;
                o.animate({left:[x1,x2]}, null, function(){
                    if(typeof callback=='function')
                        callback();
                    profile.pause=false;
                },200,Math.max(5,(x1-x2)/100),'sineInOut').start();
            }
        }
    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
                tagName:'div',
                style:'height:{_bHeight}px;width:{_bWidth}px;',
                POOL:{
                    tagName:'div',
                    style:'position:absolute;left:0;top:0;width:0;height:0;display:none;'
                },
                TBAR:{
                    tagName:'div',
                    className:'linb-uibar-top',
                    style:'{_bardisplay};',
                    TBART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        tagName:'table',
                        className:'linb-uibar-t',
                        TBARTR:{
                            tagName:'tr',
                            TBARTDL:{
                                tagName:'td',
                                className:'linb-uibar-tdl'
                            },
                            TBARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'linb-uibar-tdm'
                            },
                            TBARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'linb-uibar-tdr'
                            }
                        }
                    },
                    BARCMDL:{
                        tagName:'div',
                        className:'linb-uibar-cmdl',
                        DATE:{$order:0,style:'{dateDisplay}'},
                        PRE:{$order:2},
                        'ZOOMIN':{$order:3,style:'{zoomDisplay}'},
                        'ZOOMOUT':{$order:4,style:'{zoomDisplay}'},
                        NEXT:{$order:5}
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'linb-uibar-cmdr',
                        OPT:{
                            className:'linb-uicmd-opt',
                            style:'{optDisplay}',
                            $order:0
                        },
                        CLOSE:{
                            $order:4,
                            className:'linb-uicmd-close ',
                            style:'{closeDisplay}'
                        }
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'linb-uicon-main',
                    MAINI:{
                        tagName:'div',
                        className:'linb-uicon-maini',
                        MAINC:{
                            tagName:'div',
                            MAINP:{
                                tagName:'div',
                                VIEW:{
                                    tagName:'div',
                                    style:'left:{_band_left}px;width:{_band_width}px;',
                                    BAND:{
                                        $order:2,
                                        tagName:'div',
                                        tabindex: '{tabindex}',
                                        BIGLABEL:{
                                            tagName:'div',
                                            style:'{_showBigLabel}',
                                            text:"{_bigMarks}"
                                        },
                                        SMALLLABEL:{
                                            $order:1,
                                            tagName:'div',
                                            text:"{_smallMarks}"
                                        }
                                    },
                                    CON:{
                                        $order:3,
                                        tagName:'div',
                                        style:'height:{_viewHeight}px;',
                                        BG:{
                                            tagName:'div',
                                            style:'height:{_viewHeight}px;'
                                        },
                                        LINES:{
                                            $order:1,
                                            tagName:'div'
                                        },
                                        ITEMS:{
                                            $order:2,
                                            tagName:'div',
                                            style:'height:{_viewHeight}px;',
                                            text:'{items}'
                                        }
                                    },
                                    ACTIVE:{
                                        $order:4,
                                        tagName:'div'
                                    }
                                },
                                SCROLL:{
                                    $order:2,
                                    tagName:'div',
                                    SCROLLI:{
                                        tagName:'div'
                                    }
                                }
                            }
                        }
                    }
                },
                TAIL:{
                    $order:4,
                    tagName:'div',
                    className:'linb-uicon-main',
                    TIPS:{
                        className:'linb-uicon-maini',
                        style:'z-index:2;{_tipsdisplay};',
                        tagName:'div'
                    }
                },
                BBAR:{
                    $order:5,
                    tagName:'div',
                    style:'{_bardisplay};',
                    className:'linb-uibar-bottom-s',
                    BBART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        tagName:'table',
                        className:'linb-uibar-t',
                        BBARTR:{
                            tagName:'tr',
                            BBARTDL:{
                                tagName:'td',
                                className:'linb-uibar-tdl'
                            },
                            BBARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'linb-uibar-tdm'
                            },
                            BBARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'linb-uibar-tdr'
                            }
                        }
                    }
                }
            },
            $submap : {
                _bigMarks:{
                    LABELT:{
                        id:null,
                        className:null,
                        tagName:'div',
                        style:'width:{width}px;left:{left}px;',
                        text:'{text}'
                    }
                },
                _smallMarks:{
                    LABELB:{
                        id:null,
                        className:null,
                        tagName:'div',
                        style:'width:{width}px;left:{left}px;',
                        text:'{text}'
                    }
                },
                bgitems:{
                    BGITEM:{
                        tagName:'div',
                        style:'left:{_left}px;width:{_width}px;'
                    }
                },
                items:{
                    ITEM:{
                        tagName:'div',
                        className:'{itemClass} {disabled} {readonly} {_excls}',
                        style:'left:{_left}px;width:{_width}px;{_top};{_zindex}{itemStyle}',
                        HEAD:{
                            tagName:'div',
                            TSKBAR:{
                                tagName:'div',
                                style:'width:{_perw}%;'
                            },
                            HANDLER:{
                                $order:2,
                                tagName:'div',
                                LEFT:{
                                    tagName:'div'
                                },
                                RIGHT:{
                                    tagName:'div'
                                }
                            }
                        },
                        BODY:{
                            $order:1,
                            tagName:'div',
                            style:'{_background}',
                            CON:{
                                $order:3,
                                tagName:'div',
                                text:'{caption}'
                            }
                        }
                    }
                }
            }
        },
        Behaviors:{
            DroppableKeys:['VIEW'],
            HoverEffected:{PRE:'PRE',NEXT:'NEXT',ZOOMIN:'ZOOMIN',ZOOMOUT:'ZOOMOUT',DATE:'DATE',OPT:'OPT',CLOSE:'CLOSE'},
            ClickEffected:{PRE:'PRE',NEXT:'NEXT',ZOOMIN:'ZOOMIN',ZOOMOUT:'ZOOMOUT',DATE:'DATE',OPT:'OPT',CLOSE:'CLOSE'},
            onSize:linb.UI.$onSize,
            CLOSE:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return;
                    var instance = profile.boxing();

                    if(false===instance.beforeClose(profile, src)) return;

                    instance.destroy();

                    //for design mode in firefox
                    return false;
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return;
                    profile.boxing().onShowOptions(profile, e, src);
                }
            },
            BAND:{
                onKeydown:function(profile, e, src){
                    if(profile.pauseA||profile.pause)return;
                    profile.pause=true;

                    // speed
                    var t=profile.properties,
                        date=linb.Date,
                        rate=t._rate,
                        maxOffset = 30,
                        o=profile.box._getMoveNodes(profile),
                        x=o.left(),
                        xx=t._band_left,
                        off=t._scroll_offset
                        ;

                    off = t._scroll_offset = off>maxOffset ? off :off*1.05;

                    switch(linb.Event.getKey(e).key){
                        case 'left':
                        case 'up':
                            if(t.minDate && date.add(t.dateStart,'ms',(xx-x-off)*rate)<t.minDate)
                                off=date.diff(t.minDate, t.dateStart,'ms')/rate + (xx-x);
                            if(off<0)off=0;
                            o.left(x + off);
                            break;
                        case 'right':
                        case 'down':
                            if(t.maxDate && date.add(t.dateStart,'ms',(xx-x+off+t.width)*rate)>t.maxDate)
                                off=date.diff(t.dateStart,t.maxDate,'ms')/rate - (xx-x+t.width);
                            if(off<0)off=0;
                            o.left(x - off);
                            break;
                    }

                    if((x + maxOffset > 0) || (x + o.width() - t.width - maxOffset < 0))
                        profile.box._rePosition(profile);
                    profile.pause=false;
                    return false;
                },
                onKeyup:function(profile, e){
                    var p=profile.properties;
                    p._scroll_offset = p._scrollRate;
                    profile.box._rePosition(profile);
                },
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    if(profile.pauseA||profile.pause)return;
                    var t=profile.properties,
                        r=-t._band_left,
                        date=linb.Date,
                        rate=t._rate,
                        ep=linb.Event.getPos(e),
                        l=t._band_width-r-t.width;
                    ;
                    if(t.minDate && t._smallLabelStart<t.minDate)
                        r-=date.diff(t._smallLabelStart,t.minDate,'ms')/rate;
                    if(t.maxDate && t._smallLabelEnd>t.maxDate)
                        l-=date.diff(t.maxDate,t._smallLabelEnd,'ms')/rate;
                    if(r<0)r=0;
                    if(l<0)l=0;

                    linb.use(src).startDrag(e, {
                        targetReposition:false,
                        dragType:'blank',
                        dragDefer:2,
                        horizontalOnly:true,
                        targetLeft:ep.left,
                        targetTop:ep.top,
                        maxLeftOffset:l,
                        maxRightOffset:r
                     });
                     linb.use(src).focus();
                },
                onDragstop:function(profile, e, src){
                    profile.box._rePosition(profile);
                },
                onDrag:function(profile, e, src){
                    var ns=profile.box._getMoveNodes(profile),
                        dd=linb.DragDrop.getProfile();
                    ns.left(profile.properties._band_left +  dd.offset.x);
                },
                onContextmenu:function(profile, e, src){
                    return profile.boxing().onContextmenu(profile, e, src)!==false;
                }
            },
            SCROLL:{
                onScroll:function(profile, e, src){
                    profile.getSubNodes(['ITEMS','LINES']).top(-linb.use(src).scrollTop() );
                }
            },
            VIEW:{
                onMouseover:function(profile,e,src){
                    if(linb.DragDrop.getProfile().isWorking)return;
                    profile.$itemspos = linb.use(src).offset();
                },
                onMousemove:function(profile,e){
                    var ddd=linb.DragDrop.getProfile();
                    if(ddd.isWorking){
                        //ondrag add here, for performance of 'dont-use-droppable situation'.
                        if(profile.$$ondrag)
                            profile.box._moveActive(profile, profile.$active, ddd.x-profile.$dd_ox, profile.properties._unitPixs, 'move');
                    }else{
                        var t=profile.properties,
                            date=linb.Date,
                            s=t._smallLabelStart,
                            r=t._rate,
                            u=t._timeFormat,
                            p2=profile.$itemspos;
                        if(p2 && t.showTips){
                            var p1=linb.Event.getPos(e);
                            profile.box._setTips(profile, date.getText(date.add(s, 'ms', (p1.left-p2.left)*r),u));
                        }
                    }
                },
                onMouseout:function(profile,e,src){
                    if(linb.DragDrop.getProfile().isWorking)return;
                    if(profile.properties.showTips)
                        profile.box._setTips(profile, '');
                }
            },
            ITEMS:{
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    var pro=profile.properties;
                    if(pro.disabled || pro.readonly)return;
                    if(profile.pauseA||profile.pause)return;
                    if(linb.Event.getSrc(e)!=linb.use(src).get(0))return;

                    var o = profile.getSubNode('ACTIVE');
                    o.css({width:0,visibility:'hidden'}).offset({left :linb.Event.getPos(e).left,  top :null});

                    profile.__actives=1;
                    o.startDrag(e, {
                        dragDefer:1,
                        dragType:'none'
                     });
                },
                onMouseup:function(profile){
                    if(profile.__actives)
                        delete profile.__actives;
                }
            },
            ACTIVE:{
                onDragbegin:function(profile, e, src){
                    profile.$dd_ox = linb.DragDrop.getProfile().x;
                    profile.$dd_oleft = parseInt(linb.use(src).get(0).style.left)||0;
                    linb.use(src).css('cursor','e-resize')
                    .parent().css('cursor','e-resize');
                },
                onDrag:function(profile, e, src){
                    var x=profile.$dd_oleft,
                        ddx=linb.DragDrop.getProfile().x,
                        w,offset;
                    if((offset =ddx-profile.$dd_ox)>=0){
                        w = offset;
                    }else{
                        x = x+offset; w = -offset;
                    }
                    profile.box._moveActive(profile, linb.use(src).get(0), x, w, 'all');
                },
                onDragstop:function(profile, e, src){
                    var r = profile.box._deActive(profile);
                    linb.use(src).css('cursor','').parent().css('cursor','');

                    var box=profile.box,
                        from=box._getTime(profile, r.left),
                        to=box._getTime(profile, r.left+r.width),
                        p=profile.properties,
                        task,t,
                        b=profile.boxing();

                    if(profile.properties.multiTasks){
                        task={id:_.id(),caption:p.dftTaskName,from:from,to:to};
                        if(profile.beforeNewTask && false===b.beforeNewTask(profile, task)){}else
                            b.addTasks([task]);
                    }else
                        b.setUIValue(from+":"+to);

                    profile.$dd_ox =profile.$dd_oleft=null;
                }
            },
            PRE:{
                onClick:function(profile, e){
                    profile.boxing().scrollToLeft(function(){
                        profile.box._rePosition(profile);
                    });
                 }
            },
            NEXT:{
                onClick:function(profile, e){
                    profile.boxing().scrollToRight(function(){
                        profile.box._rePosition(profile);
                    });
                }
            },
            ZOOMIN:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;
                    var p=profile.properties,
                        box=profile.box,
                        z=box.$zoom,
                        index = _.arr.indexOf(z,p._unitParas),
                        o;
                    if(index > 0){
                        //profile.pause=true;
                        p.timeSpanKey =  z[index- 1][0];
                        box._refresh(profile,true);
                    }
                }
            },
            ZOOMOUT:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;
                    var p=profile.properties,
                        box=profile.box,
                        z=box.$zoom,
                        index = _.arr.indexOf(z,p._unitParas),
                        o;
                    if(index < z.length -1){
                        //profile.pause=true;
                        p.timeSpanKey = z[index + 1][0];
                        box._refresh(profile,true);
                    }
                }
            },
            DATE:{
                onClick:function(profile, e, src){
                    if(profile.pauseA||profile.pause)return;
                    var cls=profile.box,
                        box=profile.boxing(),
                        from=profile.properties.dateStart,
                        o,node;

                    if(cls._picker && cls._picker.renderId){
                       o=cls._picker.boxing();
                    }else{
                        o=linb.create('DatePicker');
                        cls._picker=o.get(0);
                        o.beforeClose(function(){
                            this.boxing()._cache();
                            return false;
                        })
                        .beforeUIValueSet(function(p, ov, v){
                            var profile=this,
                                box=profile.boxing(),
                                p=profile.properties;
                            p.dateStart=v;
                            box._cache();
                        });
                    }
                    o.setValue(from,true).setHost(profile);
                    node=o.reBoxing();
                    node.popToTop(src);

                    //for on blur disappear
                    node.setBlurTrigger(profile.key+" - "+profile.$linbid, function(){
                        box._cache();
                    });

                    //for esc
                    linb.Event.keyboardHook('esc',0,0,0,function(){
                        box._cache();
                        //unhook
                        linb.Event.keyboardHook('esc');
                    });
                }
            },
            ITEM:{
                onClick:function(profile, e, src){
                    if(profile.onClickTask)
                        profile.boxing().onClickTask(profile, profile.getItemByDom(src), e, src);
                },
                onDblclick:function(profile, e, src){
                    if(profile.onDblclickTask)
                        profile.boxing().onDblclickTask(profile, profile.getItemByDom(src), e, src);
                },
                onDragbegin:function(profile, e, src){
                    var t=profile.getItemByDom(src),
                        type=profile.$dd_type,
                        cursor=type?'e-resize':'move',
                        ac=profile.$active;
                    profile.$dd_ox = linb.DragDrop.getProfile().x;
                    profile.$dd_oleft = parseInt(linb.use(src).get(0).style.left);
                    profile.$dd_owidth = Math.min(t._realwidth, parseInt(linb.use(src).get(0).style.width));
                    linb([ac]).css('display','block').cssPos({left :profile.$dd_oleft,  top :null}).width(profile.$dd_owidth-2);
                    linb([ac,ac.parentNode]).css('cursor',cursor);
                },
                onDrag:function(profile, e, src){
                    var x,w,
                        offset =linb.DragDrop.getProfile().x-profile.$dd_ox,
                        ddl=profile.$dd_oleft,
                        ddw=profile.$dd_owidth,
                        type=profile.$dd_type,
                        mtype=type;
                    if(type=="left"){
                        if(offset < ddw){
                            x = ddl + offset;
                            w = ddl + ddw - x;
                        }else{
                            mtype='right';
                            x = ddl + ddw;
                            w = offset - ddw;
                        }
                    }else if(type == "right"){
                        if(-offset < ddw){
                            x = ddl;
                            w = ddw + offset;
                        }else{
                            mtype='left';
                            x = ddl + offset + ddw;
                            w = -offset - ddw;
                        }
                    }else{
                        mtype='move';
                        x = ddl + offset;
                        w = ddw;
                    }
                    profile.box._moveActive(profile, profile.$active, x, w, mtype);
                },
                onDragstop:function(profile, e, src){
                    var box=profile.box,
                        r = profile.box._deActive(profile),
                        ac=profile.$active;

                        var from=box._getTime(profile, r.left),
                            to=box._getTime(profile,r.left+r.width);
                    if(profile.properties.multiTasks){
                        if(profile.beforeTaskUpdated && false===profile.boxing().beforeTaskUpdated(profile, profile.getItemByDom(src), from, to)){}else
                            box._resetItem(profile,r,src);
                    }else
                        profile.boxing().setUIValue(from+":"+to);

                    profile.$dd_type = null;

                    linb([ac,ac.parentNode]).css('cursor','');
                },
                onContextmenu:function(profile, e, src){
                    return profile.boxing().onContextmenu(profile, e, src)!==false;
                }
            },
            HEAD:{
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled  || item.disabled)return;
                    if(ps.readonly  || item.readonly)return;
                    if(profile.beforeDragTask && false===profile.boxing().beforeDragTask(profile, item, e, src))
                        return;
                    if(ps.readonly||item.readonly)return;
                    linb.use(src).parent().startDrag(e, {
                        dragDefer:1,
                        dragType:'none'
                    });
                },
                onClick:function(){
                    return false;
                }
            },
            LEFT:{
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled || ps.readonly || item.readonly || item.disabled)return;
                    profile.$dd_type='left';
                    linb.use(src).parent(3).startDrag(e, {
                        dragDefer:1,
                        dragType:'none'
                    });
                }
            },
            RIGHT:{
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!="left")return;
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled || ps.readonly || item.readonly || item.disabled)return;
                    profile.$dd_type='right';
                    linb.use(src).parent(3).startDrag(e, {
                        dragDefer:1,
                        dragType:'none'
                    });
                }
            }
        },
        DataModel:{
            readonly:false,
            // control width and height
            width : 400,
            height : 200,
            //invisible band count (left,right)
            //if it's zero, leftSpanCount will be equal to the visible span count(based on widget width)
            leftSpanCount:{
                ini:0,
                inner:1
            },
            rightSpanCount:{
                ini:0,
                inner:1
            },
            increment:0,
            zoomable:{
                ini:true,
                action:function(v){
                    if(this.properties.timeSpanKey)
                        this.getSubNodes(['ZOOMIN','ZOOMOUT']).css('display',v?'':'none');
                }
            },
            dftTaskName:'task',
            taskHeight:{
                ini:25,
                action:function(v){
                    this.getSubNode('ITEM',true).height(v);
                }
            },

            //time span key
            timeSpanKey : {
                ini:'1 d',
                combobox:['10 ms', '100 ms','1 s','10 s', '1 n','5 n', '10 n', '30 n', '1 h', '2 h', '6 h', '1 d', '1 w', '15 d', '1 m',  '1 q',  '1 y',  '1 de',  '1 c'],
                action:function(){
                    this.box._refresh(this,true);
                }
            },
            // how much px to represent a unit
            // defalut value is from timeSpanKey
            unitPixs : 0,

/*
*inner properties
*defalut value is from timeSpanKey
*/
            //time span count
            smallLabelCount:{
                inner:1
            },
            //time span unit
            smallLabelUnit:{
                inner:1,
                listbox:_.toArr(linb.Date.$TIMEUNIT,true)
            },
            //small label format
            smallLabelFormat:{
                inner:1,
                listbox:_.toArr(linb.Date.$TEXTFORMAT,true)
            },
            bigLabelCount:{
                inner:1
            },
            //time span unit
            bigLabelUnit:{
                inner:1,
                listbox:_.toArr(linb.Date.$TIMEUNIT,true)
            },

            //big label format
            bigLabelFormat:{
                inner:1,
                listbox:_.toArr(linb.Date.$TEXTFORMAT,true)
            },
            //time format
            timeFormat:{
                inner:1,
                listbox:_.toArr(linb.Date.$TEXTFORMAT,true)
            },
/*inner properties*/
            //bar
            showBar:{
                ini:true,
                action:function(v){
                    this.getSubNode('TBAR').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    linb.UI.$tryResize(this,w,h,true);
                    p.width=w,p.height=h;
                }
            },
            //tips
            showTips:{
                ini:true,
                action:function(v){
                    this.getSubNode('TIPS').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    linb.UI.$tryResize(this,w,h,true);
                    p.width=w,p.height=h;
                }
            },
            //big label
            showBigLabel: {
                ini:true,
                action:function(v){
                    this.getSubNode('BIGLABEL').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    linb.UI.$tryResize(this,w,h,true);
                    p.width=w,p.height=h;
                }
            },

            _scrollRate:5,

            multiTasks: {
                ini:false,
                action:function(){
                    this.box._refresh(this,true);
                }
            },
            taskMinSize:60,
            minDate:{
                ini:null
            },
            maxDate:{
                ini:null
            },
            dateBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('DATE').css('display',v?'':'none');
                }
            },
            closeBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            },
            optBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('OPT').css('display',v?'':'none');
                }
            },
            dateStart : {
                ini:new Date,
                action:function(){
                    this.box._refresh(this,true);
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){},
            onShowOptions:function(profile, e, src){},
            onGetContent:function(profile, from, to, minMs, type, callback){},
            onStartDateChanged:function(profile, odate, date){},
            beforeTaskUpdated:function(profile, task, from, to){},
            beforeNewTask:function(profile, task){},
            beforeDragTask:function(profile, task, e, src){},
            onClickTask:function(profile, task, e, src){},
            onDblclickTask:function(profile, task, e, src){}
        },
        Appearances:{
            MAINI:{
                'padding-top':'4px'
            },
            MAINC:{
                border:'solid 1px #648CB4',
                background:'#fff'
            },
            'BARCMDL span':{
                $order:0,
                width:'15px',
                height:'15px',
                margin:'2px',
                'vertical-align': 'middle',
                cursor:'default'
            },
            BAND:{
                'outline-offset':'-1px',
                '-moz-outline-offset':(linb.browser.gek && parseInt(linb.browser.ver)<3)?'-1px !important':null,
                'font-size':'0',
                'line-height':'0'                
            },
            'MAINP, VIEW, BAND, CON, BIGLABEL, SMALLLABEL':{
                position:'relative'
            },
            'MAINP, VIEW':{
                width:linb.browser.ie6?'100%':null,
                overflow:'hidden'
            },
            SCROLL:{
                'z-index':500,
                position:'absolute',
                'font-size':'0',
                'line-height':'0',
                right:0,
                width:'18px',
                overflow:'auto',
                'overflow-x': 'hidden'
            },
            SCROLLI:{
                height:'1000px',
                width:'1px'
            },
            BG:{
                'z-index':2,
                position:'absolute',
                left:0,
                top:0,
                width:'100%'
            },
            LINES:{
                'z-index':3,
                position:'absolute',
                left:0,
                top:0,
                width:'100%'
            },
            ITEMS:{
                'z-index':4,
                position:'absolute',
                left:0,
                top:0,
                width:'100%',
                overflow:'hidden'
            },
            'LINES div':{
                position:'relative',
                'border-bottom':'solid 1px #7BA3CB'
            },
            'BIGLABEL, SMALLLABEL':{
                height:'16px',
                'background-color':'#C8E2FC',
                cursor:'move',
                'border-bottom':'solid 1px #7BA3CB'
            },
            'BIGLABEL div, SMALLLABEL div':{
                height:'16px',
                'border-left':'solid 1px #7BA3CB',
                'text-align':'center',
                position:'absolute',
                cursor:'move',
                top:0,
                overflow:'visible'
            },
            'BIGLABEL div':{
                $order:2,
                'text-align':'left',
                'padding-left':'4px'
            },
            TIPS:{
                position:'relative',
                height:'14px',
                'font-size':'12px',
                'line-height':'14px',
                'text-align':'center'
            },
            ACTIVE:{
                'z-index':300,
                'border-left': '1px dashed',
                'border-right': '1px dashed',
                position:'absolute',
                top:0,
                left:'-1000px',
                width:0,
                background:0,
                visibility:'hidden',
                height:'100%'
            },
            'ZOOMIN, ZOOMOUT, DATE, PRE, NEXT':{
                background: linb.UI.$bg('icons.gif', 'no-repeat', true)
            },
            ZOOMIN:{
                $order:1,
                'background-position':'-360px -70px'
            },
            'ZOOMIN-mouseover':{
                $order:2,
                'background-position': '-360px -90px'
            },
            'ZOOMIN-mousedown':{
                $order:3,
                'background-position': '-360px -110px'
            },
            ZOOMOUT:{
                $order:1,
                'background-position':'-380px -70px'
            },
            'ZOOMOUT-mouseover':{
                $order:2,
                'background-position': '-380px -90px'
            },
            'ZOOMOUT-mousedown':{
                $order:3,
                'background-position': '-380px -110px'
            },
            DATE:{
                $order:1,
                'background-position':'-340px -70px'
            },
            'DATE-mouseover':{
                $order:2,
                'background-position':' -340px -90px'
            },
            'DATE-mousedown':{
                $order:3,
                'background-position':' -340px -110px'
            },
            PRE:{
                $order:1,
                'background-position':'-260px -70px',
                top:'0'
            },
            'PRE-mouseover':{
                $order:2,
                'background-position': '-260px -90px'
            },
            'PRE-mousedown':{
                $order:3,
                'background-position': '-260px -110px'
            },
            NEXT:{
                $order:1,
                position:'absolute',
                'background-position':'-280px -70px',
                top:'0'
            },
            'NEXT-mouseover':{
                $order:2,
                'background-position': '-280px -90px'
            },
            'NEXT-mousedown':{
                $order:3,
                'background-position': '-280px -110px'
            },
            BGITEM:{
                position:'absolute',
                top:0,
                height:'100%'
            },
            ITEM:{
                position:'absolute',
                overflow:'hidden'
            },
            'HEAD, BODY':{
                position:'relative',
                overflow:'hidden',
                'z-index':'1',
                border:'solid 1px #648CB4'
            },
            BODY:{
                $order:2,
                cursor:'pointer',
                'background-color': '#F9F7D1',
                'border-top':'none'
            },
            'HEAD, HANDLER, TSKBAR, LEFT, RIGHT':{
                'font-size':'1px',
                'line-height':'1px'
            },
            HEAD:{
                cursor:'move',
                'background-color': '#FFF'
            },
            HANDLER:{
                position:'relative',
                height:'7px',
                background:linb.UI.$bg('handler.gif', 'repeat #E8EEF7', true),
                'border-top':'solid 1px #648CB4'
            },
            TSKBAR:{
                position:'relative',
                height:'1px',
                'background-color': '#648CB4',
                width:'100%'
            },
            'LEFT, RIGHT':{
                position:'absolute',
                top:0,
                height:'100%',
                width:'6px',
                'z-index':10
            },
            'LEFT':{
                cursor:'e-resize',
                left:'-1px'
            },
            'RIGHT':{
                cursor:'w-resize',
                right:'-1px'
            },
            CON:{
                position:'relative',
                overflow:'hidden'
            },
            'ITEM-readonly HANDLER, ITEM-disabled HANDLER, ITEM-readonly LEFT, ITEM-disabled LEFT, ITEM-readonly RIGHT, ITEM-disabled RIGHT':{
                $order:2,
                display:'none'
            },
            'ITEM-readonly HEAD, ITEM-disabled HEAD':{
                cursor:'default'
            },
            'ITEM-readonly CON, ITEM-disabled CON':{
                $order:2,
                'background-color':'#E8EEF7'
            }
        },
        RenderTrigger:function(){
            var self=this, p=self.properties,cls=self.box;
            self.$active = self.getSubNode('ACTIVE').get(0);
            cls._ajustHeight(self);
        },
        _onDropMarkShow:function(){linb.DragDrop.setDragIcon('add');return false},
        _onDropMarkClear:function(){linb.DragDrop.setDragIcon('none');return false},
        _onDragEnter:function(profile,e,src){
            var t=profile.properties,
                ep=linb.Event.getPos(e),
                _left = t._unitPixs/2
            ;
            linb(profile.$active).css('visibility','visible');
            profile.$dd_ox =linb.use(src).offset().left+_left;

            profile.$$ondrag=true;
        },
        _onDragLeave:function(profile){
            profile.$$ondrag=profile.$dd_ox=null;

            profile.box._deActive(profile);
        },
        _onDrop:function(profile){
            profile.$$ondrag=profile.$dd_ox=null;

            var r = profile.box._deActive(profile),
                task={id:_.id(),caption:profile.properties.dftTaskName},
                box=profile.box,
                b=profile.boxing();

            task.from = box._getTime(profile, r.left);
            task.to = box._getTime(profile, r.left+r.width);
            task._dropData=linb.DragDrop.getProfile().dragData;

            if(profile.beforeNewTask && false===b.beforeNewTask(profile, task)){}else
                b.addTasks([task]);
        },
        _prepareData:function(profile){
            var p=profile.properties,
                d={},
                date=linb.Date,
                us=date.$TIMEUNIT,
                nodisplay='display:none',
                zoom=profile.box.$zoom,
                m=0,u,
                i,t,label,temp,_date,width,rate,
                _unitParas,
                _dateStart,
                _barCount,_leftBarCount,_rightBarCount,_barCountall,

                smallMarks,smallLabelStart,smallLabelEnd,smallLabelUnit,smallLabelCount,smallLabelFormat
                ;


            d.dateDisplay = p.dateBtn?'':nodisplay;
            d.closeDisplay = p.closeBtn?'':nodisplay;
            d.optDisplay = p.optBtn?'':nodisplay;
            d._showBigLabel=p.showBigLabel?'':nodisplay;

            // for quick move
            p._scroll_offset = p._scrollRate;

            p._lines=[{}];

            //border
            d._bWidth = p.width;
            d._bHeight = p.height;
            //view
            p._viewHeight = d._bHeight;
            d._tipsdisplay=p.showTips?'':nodisplay;
            d._bardisplay = p.showBar?'':nodisplay;

            //get unitparas from timespan key
            if(p.timeSpanKey){
                _.arr.each(zoom,function(o){
                    if(o[0]===p.timeSpanKey){
                        _unitParas=p._unitParas=o;
                        return false;
                    }
                });
                //give a default key
                if(!_unitParas)
                    _unitParas=p._unitParas=zoom[p.timeSpanKey='1 d'];
            }
            //if no timeSpanKey( _unitParas) input,
            d.zoomDisplay = (p.zoomable && _unitParas)?'':nodisplay

            if(_unitParas){
                p._unitPixs = p.unitPixs||_unitParas[1];
                p._smallLabelCount = p.smallLabelCount||_unitParas[2];
                p._smallLabelUnit = p.smallLabelUnit||_unitParas[3];
                p._smallLabelFormat = p.smallLabelFormat||_unitParas[4];
                p._bigLabelCount = p.bigLabelCount||_unitParas[5];
                p._bigLabelUnit = p.bigLabelUnit||_unitParas[6];
                p._bigLabelFormat = p.bigLabelFormat||_unitParas[7];
                p._timeFormat = p.timeFormat||_unitParas[8];
            }
            u=p._unitPixs;
            smallLabelCount = p._smallLabelCount;
            smallLabelUnit = p._smallLabelUnit;
            smallLabelFormat = p._smallLabelFormat;

            // get bar count in view
            _barCount = (Math.ceil(p.width / u)||0);
            _leftBarCount = p.leftSpanCount?p.leftSpanCount:_barCount;
            _rightBarCount = p.rightSpanCount?p.rightSpanCount:_barCount;
            _barCountall =  _barCount + _leftBarCount + _rightBarCount;

            // ms per px
            rate = p._rate = us[smallLabelUnit]*smallLabelCount/u;

            //adjust dateStart
            if(p.maxDate&& date.add(p.dateStart,'ms',p.width*rate) > p.maxDate)
                p.dateStart=date.add(p.maxDate,'ms',-p.width*rate);
            if(p.minDate&& p.dateStart<p.minDate)
                p.dateStart=p.minDate;

            // get the round start from the approximate start
            _dateStart = date.getTimSpanStart(p.dateStart, smallLabelUnit, smallLabelCount);
            // rel start in band
            smallLabelStart=p._smallLabelStart = date.add(_dateStart, smallLabelUnit, -_leftBarCount*smallLabelCount);
            // rel to in band
            smallLabelEnd = p._smallLabelEnd = date.add(smallLabelStart, smallLabelUnit, _barCountall*smallLabelCount);

            // get band with
            p._band_width = Math.ceil(date.diff(smallLabelStart,smallLabelEnd, 'ms')/rate);

            // set band left
            p._band_left_fix = p._band_left = - Math.ceil(date.diff(smallLabelStart, p.dateStart, 'ms')/rate);

            // build bars
            smallMarks = p._smallMarks = [];

            temp=0;
            label=date.get(smallLabelStart, smallLabelFormat);
            for(i=0; i< _barCountall; i++){
                _date = date.add(smallLabelStart, smallLabelUnit, smallLabelCount*(i+1));
                width = Math.ceil(date.diff(smallLabelStart, _date, 'ms')/rate);
                smallMarks.push({
                    left : temp,
                    width : width - temp,
                    text : label
                });
                temp=width;
                label=date.getText(_date, smallLabelFormat);
            }


            if(p.showBigLabel){
                var _barCount2,off,
                    bigMarks,bigLabelStart,bigLabelEnd,

                    bigLabelCount = p._bigLabelCount,
                    bigLabelUnit = p._bigLabelUnit,
                    bigLabelFormat = p._bigLabelFormat
                    ;

                bigMarks = p._bigMarks = [];
                bigLabelStart=p._bigLabelStart =date.getTimSpanStart(smallLabelStart, bigLabelUnit, bigLabelCount);
                bigLabelEnd=p._bigLabelEnd = date.getTimSpanEnd(smallLabelEnd, bigLabelUnit, bigLabelCount);
                _barCount2 = date.diff(bigLabelStart, bigLabelEnd, bigLabelUnit)/bigLabelCount;
                off=date.diff(smallLabelStart, bigLabelStart, 'ms')/rate;
                label=date.getText(bigLabelStart, bigLabelFormat);
                temp=0;
                for(i=0; i< _barCount2; i++){
                    _date = date.add(bigLabelStart, bigLabelUnit, bigLabelCount*(i+1));
                    width = date.diff(bigLabelStart, _date, 'ms')/rate;
                    bigMarks.push({
                        left : Math.ceil(temp + off),
                        width : Math.ceil(width - temp),
                        text : label
                    });
                    temp=width;
                    label=date.getText(_date, bigLabelFormat);
                }
            }
            return arguments.callee.upper.call(this, profile, d);
        },
        _prepareItem:function(profile, item, oitem, pid){
            var self=this,
                t=profile.properties,
                index;
            if(!item.id)item.id=_.id();
            if(!item.caption)item.caption=t.dftTaskName;
            // caculate left and width
            item._realleft=item._left=self._getX(profile, item.from);
            item._realwidth=item._width=Math.max(self._getX(profile, item.to) - item._left, 0);
            if(item._width<=t.taskMinSize){
                item._width=t.taskMinSize;
            }
            // if too long, cut left
            if(item._left<0){
                item._left=0;
            }
            // if too long, cut right
            if(item._left+item._width>t._band_width){
                item._width=t._band_width-item._left;
            }
            item._perw=+(item._realwidth/item._width*100).toFixed(2);
            if(item._perw>=100)item._perw=100;

            // caculate top and set task to lines cache
            index = self._getLinePos(profile, item);

            item._top = 'top:' + (t.taskHeight+1) * (index-1) + 'px';
            item._zindex = 'z-index:'+index;

            item._background = item.background?'background:'+item.background+';':'';
            
            item._excls=item.disabled?profile.getClass('ITEM','-disabled'):item.readonly?profile.getClass('ITEM','-readonly'):'';

            t._lines = t._lines || [{}];

            //set double link
            t._lines[index][item.id]=item;
            item._line = index;

            oitem._realleft=item._realleft;
            oitem._left=item._left;
            oitem._width=item._width;
            oitem._realwidth=item._realwidth;
            oitem._perw=item._perw;
            oitem._line=item._line;
        },
        $zoom:[
            /*
            *[
            *  id,
            *  small span unit count,
            *  small span unit,
            *  small span to big span function,
            *  small span lable format,
            *  big span lable format,
            *  value format
            *]
            */
            ['10 ms', 54, 10, 'ms', 'ms', 100, 'ms','hnsms','hnsms'],
            ['100 ms',54,  100, 'ms', 'ms', 1, 's','hns','hnsms'],
            ['1 s',30,  1, 's','s', 10, 's','hns','hnsms'],
            ['10 s', 30, 10, 's', 's',60, 's','hns','hnsms'],
            ['1 n',30,  1, 'n','n', 10, 'n','dhn','hns'],
            ['5 n', 30, 5, 'n','n', 30, 'n','mdhn','hns'],
            ['10 n', 30, 10, 'n','n', 60, 'n','mdhn','hns'],
            ['30 n', 30, 30, 'n','n', 4, 'h','ymdh','mdhn'],
            ['1 h', 30, 1, 'h','h',  6, 'h','ymdh','mdhn'],
            ['2 h', 30, 2, 'h','h', 12, 'h','ymdh','mdhn'],
            ['6 h', 30, 6, 'h','h', 24, 'h','ymd','mdhn'],
            ['1 d', 24, 1, 'd','w', 1, 'ww','ymd','ymdh'],
            ['1 w', 30, 1, 'ww','ww', 4, 'ww','ymd','ymd'],
            ['15 d', 30, 15, 'd','d', 2, 'm','ymd','ymd'],

//Not every unit width is the same value:
            ['1 m',  30,1, 'm','m', 1, 'q','yq','ymd'],
            ['1 q',  30,1, 'q','q', 1, 'y','y','ymd'],
            ['1 y',  48,1, 'y','y', 10, 'y','y','ym'],
            ['1 de',  48, 1, 'de','de', 100, 'y','y','ym'],
            ['1 c',  48, 1, 'c', 'c', 1000, 'y','y','y']

        ],
        _getTips:function(profile){
            var t,s='$dd_tooltip';
            if(t = profile[s] || (profile[s] = profile.getSubNode('TIPS').get(0).childNodes[0]))
                return t.nodeValue;
            else
                return profile.getSubNode('TIPS').get(0).innerHTML;
        },
        _rr:/\<[^>]*\>/g,
        _setTips:function(profile, text, force){
            if(!force && profile.pauseA)return;
            var t,s='$dd_tooltip';
            text=text.replace(this._rr,'');
            if(t = profile[s] || (profile[s] = profile.getSubNode('TIPS').get(0).childNodes[0])){
                if(t.nodeValue!=text)t.nodeValue=text;
            }else
                profile.getSubNode('TIPS').get(0).innerHTML=text;
        },
        _getX:function(profile, time){
            var t=profile.properties,d=new Date;
            d.setTime(time);
            return (Math.ceil(linb.Date.diff(t._smallLabelStart, d, 'ms')||0) / t._rate);
        },
        _getTime:function(profile, x, flag){
            var t=profile.properties;
            t = linb.Date.add(t._smallLabelStart, 'ms', x*t._rate);
            return flag?t:t.getTime();
        },
        _moveActive:function(profile, src, x, w, mtype){
            var p=Math.ceil,
                t=profile.properties,
                d=linb.Date,
                s=t._smallLabelStart,
                r=t._rate,
                u=t._timeFormat,
                ms='ms',
                y=src.style,
                z='px',
                m,n,increment,
                xx=x
                ww=w;
            if(!y.visibility || y.visibility=='hidden')
                y.visibility='visible';

            if(increment=t.increment){
                if(mtype=='move'){
                    x=Math.floor(xx/increment)*increment;
                }else{
                    if(mtype=='left'||mtype=='all'){
                        x=Math.floor(xx/increment)*increment;
                        w=ww-(x-xx);
                    }
                    if(mtype=='right'||mtype=='all'){
                        m=Math.floor((w+increment-1)/increment);
                        w=m*increment;
                    }                    
                }
            }

            m = (p(x)||0);
            n = ((p(w)||0)-2);

            if(n>0){
                y.left= m+z;
                y.width= n+z;
                if(t.showTips)
                    profile.box._setTips(profile, d.getText(d.add(s, ms, x*r),u)
                        + " - "
                        + d.getText(d.add(s, ms, (x+w)*r),u)
                    )
            }
            y=src=null;
        },
        _deActive:function(profile){
            var t=profile.$active.style, x=parseInt(t.left)||0, w=(parseInt(t.width)||0)+2;
            t.visibility='hidden';
            t.left=linb.Dom.HIDE_VALUE;
            t.width=0;
            t=null;
            if(profile.properties.showTips)
                profile.box._setTips(profile, '');
            return {left :x, width :w};
        },
        _minusLeft:function(profile,marks,node,offsetCount){
            var t=profile.properties;
            while((offsetCount--)>0){
                node.first().remove();
                temp=marks.shift();
            }
        },
        _minusRight:function(profile,marks,node,offsetCount){
            var t=profile.properties;
            while((offsetCount--)>0){
                node.last().remove();
                temp=marks.pop();
            }
        },
        _addLeft:function(profile, tag, node, offsetCount,  offset){
            // get additional bars
            var t=profile.properties,
                date=linb.Date,
                key=tag+'Marks',
                marks=t[key],
                labelStart=t[tag+'LabelStart'],
                labelUnit=t[tag+'LabelUnit'],
                labelCount=t[tag+'LabelCount'],
                labelFormat=t[tag+'LabelFormat'],
                rate=t._rate,
                addLb=[],
                temp,label,_date,i;

            temp=0;
            label=date.getText(labelStart, labelFormat);
            for(i=0; i< offsetCount; i++){
                _date = date.add(labelStart, labelUnit, labelCount*(i+1));
                width = date.diff(labelStart, _date, 'ms')/rate;
                addLb.push({
                    left : Math.ceil(temp + (offset||0)-0.0000000000003),
                    width : Math.ceil(width - temp),
                    text : label
                });
                temp=width;
                label=date.getText(_date, labelFormat);
            }
            addLb.reverse();
            // add to band UI
            node.prepend(profile._buildItems(key, addLb,false));
            // add to memory list
            _.arr.insertAny(marks,addLb.reverse(),0);
        },
        _addRight:function(profile, labelEnd, tag, node, offsetCount,  offset){
            var t=profile.properties,
                date=linb.Date,
                key=tag+'Marks',
                marks=t[key],
                labelStart=t[tag+'LabelStart'],
                labelUnit=t[tag+'LabelUnit'],
                labelCount=t[tag+'LabelCount'],
                labelFormat=t[tag+'LabelFormat'],
                rate=t._rate,
                addLb=[],_d1,
                _date,i;
            _d1=labelEnd;
            for(i=0; i<offsetCount; i++){
                _date = date.add(labelEnd, labelUnit, labelCount*(i+1));
                addLb.push({
                    left : Math.ceil(date.diff(labelStart,_d1,'ms')/rate+ (offset||0)-0.0000000000003),
                    width : Math.ceil(date.diff(_d1, _date, 'ms')/rate),
                    text : date.getText(_d1, labelFormat)
                });
                _d1=_date;
            }
            // build
            // add to band UI
            node.append(profile._buildItems(key, addLb,false));
            // add to memory list
            _.arr.insertAny(marks,addLb,-1);
        },
        _getMoveNodes:function(profile){
            return profile.$moveban = profile.$moveban || profile.getSubNode('VIEW');
        },
        //if left is numb, force to move
        _rePosition:function(profile, left){
            profile.pause=true;
            var self=this,
                date = linb.Date,
                t=profile.properties,
                rate=t._rate,
                label,m,n,
                labelsBottom = profile.getSubNode('SMALLLABEL'),
                band = self._getMoveNodes(profile),
                x = left || band.left(),
                //ralated to the fix position
                offset = x - t._band_left_fix;

            // if offset out a bar width
            if(Math.abs(offset)/t._unitPixs >=1 || left){
                var offsetCount = parseInt(offset/t._unitPixs),
                    bak_s = t._smallLabelStart,
                    bak_e = t._smallLabelEnd,
                    _c=-offsetCount*t._smallLabelCount,
                    offsetPxs,
                    _smallLabelStart,
                    _smallLabelEnd;

                _smallLabelStart=t._smallLabelStart = date.add(t._smallLabelStart, t._smallLabelUnit, _c);
                _smallLabelEnd=t._smallLabelEnd = date.add(t._smallLabelEnd, t._smallLabelUnit, _c);
                offsetPxs = Math.ceil(date.diff(_smallLabelStart, bak_s, 'ms')/rate);

                band.left(x - offsetPxs);

                // reset band paras
                t._band_width = Math.ceil(date.diff(_smallLabelStart, _smallLabelEnd, 'ms')/rate);

                //reset tasks position var
                _.arr.each(t.items,function(o){
                    o._left += offsetPxs;
                    o._realleft += offsetPxs;
                    profile.box._trimTask(profile,o);
                });
                labelsBottom.children().each(function(o){
                    o.style.left = (parseFloat(o.style.left)||0) + offsetPxs + "px";
                });
                _.arr.each(t._smallMarks,function(o){
                    o.left += offsetPxs;
                });

                // delete out, andd add to blank
                if(offsetCount>0){
                    self._minusRight(profile,t._smallMarks, labelsBottom,offsetCount);
                    self._addLeft(profile, '_small', labelsBottom, offsetCount);
                }else{
                    self._minusLeft(profile,t._smallMarks, labelsBottom, -offsetCount);
                    self._addRight(profile, bak_e, '_small', labelsBottom, -offsetCount);
                }

                if(t.multiTasks){
                    var arr=[];
                    // remove tasks
                    _.arr.each(t.items,function(o){
                        if(o._left >= t._band_width ||  (o._left+o._width) <= 0){
                            //delete from lines
                            delete t._lines[o._line][o.id];
                            arr.push(o.id);
                        }
                    });
                    profile.boxing().removeItems(arr);

                    profile.boxing()._getContent(offsetCount>0 ? _smallLabelStart : bak_e,
                        offsetCount>0 ? bak_s : _smallLabelEnd,
                        t._rate,
                        offsetCount>0 ? 'left' : 'right');

                    //adjust the items
                    self._reArrage(profile);
                }

                if(t.showBigLabel){
                    var labelsTop = profile.getSubNode('BIGLABEL'),
                        bigLabelUnit=t._bigLabelUnit,
                        bigLabelCount=t._bigLabelCount,
                        off,
                        offsetCount2,offsetCount3,
                        bigLabelStart,bigLabelEnd;
                    bak_e=t._bigLabelEnd;

                    labelsTop.children().each(function(o){
                        o.style.left = (parseFloat(o.style.left)||0) + offsetPxs + "px";
                    });
                    _.arr.each(t._bigMarks,function(o){
                        o.left += offsetPxs;
                    });
                    bigLabelStart=date.getTimSpanStart(_smallLabelStart, bigLabelUnit, bigLabelCount);

                    offsetCount2 = Math.ceil(date.diff(_smallLabelStart, t._bigLabelStart, bigLabelUnit)/bigLabelCount);
                    offsetCount3 = Math.ceil(date.diff(t._bigLabelEnd, _smallLabelEnd, bigLabelUnit)/bigLabelCount);

                    //reset offset of big and small
                    if(offsetCount2){
                        off = date.diff(_smallLabelStart, bigLabelStart, 'ms')/rate;
                        t._bigLabelStart=bigLabelStart;
                        if(offsetCount2>0)
                            self._addLeft(profile, '_big',labelsTop, offsetCount2, off);
                        else
                            self._minusLeft(profile,t._bigMarks, labelsTop, -offsetCount2);
                    }
                    //reset offset of big and small
                    if(offsetCount3){
                        off = date.diff(_smallLabelStart, bigLabelStart, 'ms')/rate;
                        t._bigLabelEnd=date.add(t._bigLabelEnd, bigLabelUnit, offsetCount3*bigLabelCount);
                        if(offsetCount3<0)
                            self._minusRight(profile,t._bigMarks, labelsTop, -offsetCount3);
                        else
                            self._addRight(profile, bak_e, '_big',labelsTop, offsetCount3, off);
                    }
                }
            }
            // reset date start point
            t._band_left = band.left();
            var od=t.dateStart;
            t.dateStart = self._getTime(profile, -t._band_left, 1);

            if(profile.onStartDateChanged){
                profile.boxing().onStartDateChanged(profile,od,t.dateStart);
            }

            profile.pause = false;
        },
        _trimTask:function(profile, o){
            //****
            // if too long, cut left
            var x=o._realleft,
                w=o._realwidth,
                pro=profile.properties,
                bw=pro._band_width;

            if(w<=pro.taskMinSize){
                w=pro.taskMinSize;
            }
            if(x < 0){
                if(x+w<0)
                    w=0;
                else
                    w = w + x;
                x = 0;
            }
            if(x>bw)x=bw;
            this._setItemNode(profile, o,'left',x+'px');

            // ֱ������            
            o._left=x;

            // if too long, cut right
            if(x + w > bw)
                w = bw - x;
            // ֻ�иı������
            if(w>=0){
                if(o._width!=w){
                    o._width=w;
                    this._setItemNode(profile, o,'width',w+'px');
                }
            }

        },
        _setItemNode:function(profile, item, key, value){
            var t=profile.getSubNodeByItemId('ITEM',item.id).get(0);
            t.style[key]=value;
        },
        _getLinePos:function(profile,o){
            var t=profile.properties,
                b=false,
                index=0;
            _.arr.each(t._lines,function(v,i){
                if(i===0)return;
                b=true;
                _.each(v,function(v){
                    if(o.id!==v.id)
                        if(((o._left + o._width)>=v._left) && ((v._left + v._width)>=o._left))
                            return b=false;
                });
                if(b){index=i;return false;}
            });
            if(!b)
                index = t._lines.push({})-1;
            return index;
        },
        // _reArrage tasks for top position
        _reArrage:function(profile){
            var self=this, o, h,
                t=profile.properties;
            t._lines.length = 1;
            t.items.sort(function(x,y){
                return x.from>y.from?1:x.from==y.from?0:-1;
            });
            //re caculate from current line
            _.arr.each(t.items,function(v){
                if(v._line===0)return;

                //get pos from current line
                index = self._getLinePos(profile, v);
                t._lines[index][v.id]=v;
                // if has space, reset position
                if(v._line !== index){
                    // reset double link
                    v._line = index;
                    // set top
                    if(t.multiTasks){
                        self._setItemNode(profile, v, 'top', (t.taskHeight+1) * (index-1) +'px');
                        self._setItemNode(profile, v, 'zIndex', index);
                    }
                };
            });

            h = t._linesHeight = t._lines.length * (t.taskHeight+1);

            self._ajustHeight(profile);
        },
        _resetItem:function(profile,o,src){
            var p=profile.properties,
                t=profile.getItemByDom(src),
                bandW=p._band_width,
                f=function(k,i){return profile.getSubNodeByItemId(k,i)},
                timeline=profile.box,
                max=Math.max,
                temp;

            if(o.left){
                t._realleft=t._left=o.left;
                t.from = timeline._getTime(profile,o.left);

                linb.use(src).get(0).style.left=t._left+'px';
            }
            if(o.width){
                t.to = timeline._getTime(profile,o.left+o.width);

                t._realwidth=t._width=o.width;

                if(t._width<=p.taskMinSize){
                    t._width=p.taskMinSize;
                }else{
                    // if too long ,cut right
                    if(o.left + o.width > bandW)
                        t._width = bandW - o.left;
                }                
                linb.use(src).get(0).style.width=t._width+'px';

                temp=+(t._realwidth/t._width*100).toFixed(2);
                if(temp>=100)temp=100;                
                if(temp!=t._perw){
                    t._perw=temp;
                    linb.use(src).first(2).get(0).style.width=temp+'%';
                }
            }
            // _reArrage top position
            timeline._reArrage(profile);
        },
        _ajustHeight:function(profile){
            var p=profile.properties,
                f=function(p){return profile.getSubNode(p)},
                view = f('CON'),
                items = f('ITEMS'),
                lines = f('LINES'),
                h,b,
                ih=p._linesHeight||0,
                vh=view.height();

            h=Math.max(ih,vh);

            b=ih>vh;
            f('SCROLLI').height(h);
            f('SCROLL').css('display',b?'block':'none');
            items.height(h);
            lines.height(h);
            items.top(b?-f('SCROLL').scrollTop():0);
            lines.top(b?-f('SCROLL').scrollTop():0);
            
            var len=parseInt(h/p.taskHeight)+1, 
                size=f('LINES').get(0).childNodes.length;
            if(size<len){
                f('LINES').append(linb.create(_.str.repeat('<div style="height:'+p.taskHeight+'px;"></div>',len-size)));
            }
        },
        _showTips:function(profile, node, pos){
            if(profile.properties.disableTips)return;
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
            if(!linb.Tips)return;

             var t=profile.properties,
                id=node.id,
                format=t._timeFormat,
                sid=profile.getSubId(id),
                map=profile.SubSerialIdMapItem,
                item=map&&map[sid],
                date=linb.Date;

            if(t.disabled)return;
            if(item && item.disabled)return;
            if(item){
                item.tips = '<p style="font-weight:bold">'+item.caption +'</p>'+ date.getText(new Date(item.from),format)+" - "+date.getText(new Date(item.to),format);
                linb.Tips.show(pos, item);
                return true;
            }else
                return false;
        },
        _beforeSerialized:function(profile){
            var w=profile.properties.width,
                o=arguments.callee.upper.call(this, profile);
            o.properties.width=w;
            return o;
        },
        _onresize:function(profile,width,height){
            var pro=profile.properties,
                f=function(k){return profile.getSubNode(k)},
                _bbarH=f('BBAR').height(),
                _tipsH=f('TAIL').height(),
                off2=f('CON').offset(null, profile.getRoot()),
                off3=2,h2,
                t;

            //for border, view and items
            if(height && profile._$h != height){
                f('BORDER').height(profile._$h = t = height);
                f('CON').height(t=t - (pro.showTips?_tipsH:0) -off2.top - (pro.showBar?_bbarH:0) -off3);
                h2=f('BAND').height();

                f('SCROLL').top(h2).height(t+h2);
                profile.getSubNodes(['BG','ITEMS','SCROLL']).height(t);
                this._ajustHeight(profile);
                
                if(linb.browser.ie6)
                    f('ACTIVE').height(f('VIEW').height()+2);
            }
            if(width && profile._$w != width){
                // special: modified widget width here
                f('BORDER').width(profile._$w =  pro.width = width);
                var ins=profile.boxing(),
                    items = ins.getItems('data'),
                    bak_s = pro._smallLabelStart,
                    bak_e = pro._smallLabelEnd,
                    offset, uivalue;
                this._refresh(profile);
                offset = bak_s - pro._smallLabelStart;

                if(!pro.multiTasks)
                    uivalue=pro.$UIvalue;

                // reset all items
                ins.setItems(items);
                
                if(!pro.multiTasks){
                    ins.setUIValue(uivalue, true);
                }else{
                    var arr=[];
                    // filter tasks
                    _.arr.each(pro.items,function(o){
                        if(o._left >= pro._band_width ||  (o._left+o._width) <= 0){
                            //delete from lines
                            delete pro._lines[o._line][o.id];
                            arr.push(o.id);
                        }
                    });
                    ins.removeItems(arr);
                }

                if(offset>0){
                    // first time, call iniContent
                    if(!profile._iniOK){
                        ins.iniContent();
                    }else{
                        ins._getContent(pro._smallLabelStart, bak_s, pro._rate, 'left');
                        ins._getContent(bak_e, pro._smallLabelEnd, pro._rate, 'right');
                    }
                }
                //adjust the items
                this._reArrage(profile);
            }
        },
        _refresh:function(profile,force){
            var pro=profile.properties, ins=profile.boxing(), nodes, uivalue;

            if(!pro.multiTasks)
                uivalue=pro.$UIvalue;

            //clear items first
            ins.clearItems();

            //ins.refresh()
            this._prepareData(profile);

            //refresh labels
            nodes=profile._buildItems('_smallMarks', pro._smallMarks,false);
            profile.getSubNode('SMALLLABEL').empty().append(nodes);
            if(pro.showBigLabel){
                nodes=profile._buildItems('_bigMarks', pro._bigMarks,false);
                profile.getSubNode('BIGLABEL').empty().append(nodes);
            }

            //view/band set left
            profile.getSubNode('VIEW').left(pro._band_left).width(pro._band_width);

            //if singleTask, setUIValue
            if(!pro.multiTasks){
                ins.setUIValue(uivalue, true);
            //if multiTasks, call iniContent to get tasks
            }else{
                if(force)
                    ins.iniContent();
            }
            return this;
        }
    }
});Class("linb.UI.TagEditor", ['linb.UI',"linb.absValue"], {
    Dependency:['linb.UI.Input'],
    Instance:{
        activate:function(){
            // activate the first input
            var i=this.getTagInput(0);
            if(i && i.get(0))
                i.activate();
            return this;
        },
        getTagInput:function(index){
            var prf=this.get(0),r=null;
            if(prf.__inputs){
                if(_.isNumb(index)){
                    if(r=prf.__inputs[index])
                        r=r.boxing();
                }else{
                    r=linb.UI.Input.pack(prf.__inputs,false);
                }
            }
            return r;
        },
        _setDirtyMark:function(){
            arguments.callee.upper.apply(this, arguments);

            return this.each(function(profile){
                //format statux
                if(profile.beforeFormatMark && false===box.beforeFormatMark(profile, profile._inValid==2)){}
                else{
                    profile.getSubNode('ERROR').css('display',profile._inValid==2?'block':'none');
                }
            });
        }
    },
    Static:{
        $valuemode:'multi',
        Templates:{
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            BORDER:{
               tagName:'div',
               className:'{_bordertype}',
                ITEMS:{
                   $order:10,
                   tagName:'div',
                   style:'{_padding}',
                   text:"{items}"
                }
            },
            ERROR:{
                $order:2
            }
        },
        Appearances:{
            KEY:{
                'font-size':'12px'
            },
            ITEMS:{
                position:'relative',
                overflow:'hidden'
            },
            BORDER:{
                position:'relative',
                overflow:'hidden'
            },
            ERROR:{
                width:'16px',
                height:'16px',
                position:'absolute',
                right:'2px',
                top:'2px',
                display:'none',
                'font-size':0,
                background: linb.UI.$bg('icons.gif', 'no-repeat left -244px', true),
                'z-index':'50'
            }
        },
        Behaviors:{
            onSize:linb.UI.$onSize
        },
        DataModel:{
            selectable:true,
            borderType:{
                ini:'flat',
                listbox:['none','flat','inset','outset'],
                action:function(v){
                    var ns=this,
                        p=ns.properties,
                        node=ns.getSubNode('BORDER'),
                        reg=/^uiborder-/,
                        pretag='linb-uiborder-',
                        root=ns.getRoot();
                    node.removeClass(reg);
                    node.addClass(pretag+v);

                    //force to resize
                    linb.UI.$tryResize(ns,root.get(0).style.width,root.get(0).style.height,true);
                }
            },
            valueSeparator:{
                ini:',',
                action:function(){
                    //this.properties._valueSeparator=new RegExp("["+this.properties.valueSeparator+"\\s]+");
                }
            },
            padding:{
                ini:"4px",
                action:function(v){
                    this.getSubNode("ITEMS").css("padding",v);
                }
            },
            valueFormat:{
                ini:'',
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setValueFormat(v);
                }
            },
            required:{
                ini:false
            },
            tagCount:{
                ini:3,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            tagMaxlength:{
                ini:6,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setMaxlength(v);
                }
            },
            tagInputWidth:{
                ini:80,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setWidth(v);
                }
            },
            tagInputHeight:{
                ini:22,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setHeight(v);
                }
            },
            tagSpacing:{
                ini:6,
                action:function(v){
                    var i=this.boxing().getTagInput();
                    if(i)i.setCustomStyle("KEY","margin-right:"+(parseInt(v)||0)+"px;margin-bottom:"+(parseInt(v)||0)+"px;");
                }
            },
            width:300,
            height:32
        },
        RenderTrigger:function(){            
            this.$onValueSet=this.$onUIValueSet=function(v){
                v=v.split(this.properties.valueSeparator);
                _.arr.each(this.__inputs,function(o,i){
                    o.boxing().setValue(v[i]||"",true);
                });
            };

            var i=this.boxing().getTagInput();
            if(i)i.render(true);
        },
        _checkValid:function(profile, value){
            if(profile.properties.required && 
                (!value || !value.replace(new RegExp("\\s*\\"+profile.properties.valueSeparator+"\\s*","img"),""))
            ){
                profile._inValid=2;
                return false;
            }else
                profile._inValid=3;
            return true;
        },
        _ensureValue:function(profile, value){
            var prop=profile.properties, nv=[];
            if(!value)
                value="";
            // ensure array
            if(_.isStr(value))
                value=value.split(prop.valueSeparator);
            // ensure count
            for(var i=0,vv;i<prop.tagCount;i++){
                vv=value[i];
                // ensure string
                if(!vv)
                    vv="";
                // ensure string maxlength
                if(vv.length>prop.tagMaxlength)
                    vv=vv.slice(0,prop.tagMaxlength);
                vv=_.str.trim(vv);
                if(vv)
                    nv.push(vv);
            }
            return nv.join(prop.valueSeparator);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data._bordertype='linb-uiborder-'+data.borderType;
            
            
            
            var prop=profile.properties,
                inputs=[],properties,events,CS,iprf;
            if(prop.padding)
                data._padding = "padding:"+prop.padding;
            
            //prop._valueSeparator = new RegExp("["+prop.valueSeparator+"\\s]+");
            
            var vs = this._ensureValue(profile,prop.value).split(prop.valueSeparator);
            
            if(prop.tagSpacing)
                CS={
                    KEY:"margin-right:"+prop.tagSpacing+"px;margin-bottom:"+prop.tagSpacing+"px;"
                };

            properties = {
               position:'relative',
               width:prop.tagInputWidth,
               height:prop.tagInputHeight,
               maxlength:prop.tagMaxlength,
               valueFormat:prop.valueFormat,
               dirtyMark:false 
            };
            
            for(var i=0;i<prop.tagCount;i++){
                properties.value=vs[i]||"";
                
                iprf=(new linb.UI.Input(properties,events,null,profile.theme,CS)).get(0);
                
                iprf.$onUIValueSet=function(v){
                    var pf=this,index,arr=[];
                    _.arr.each(profile.__inputs,function(o,i){
                         arr.push(_.str.trim(o.boxing().getUIValue()||""));
                         if(o===pf)index=i;
                    });
                    _.filter(arr,function(o,i){
                        return o.replace(/\s+/g,'')!=='';
                    });
                    var sp=profile.properties.valueSeparator,uiv=arr.join(sp);
                    var oi=profile._inValid;
                    profile.boxing().setUIValue(uiv);
                    
                    // input/textarea is special, ctrl value will be set before the $UIvalue
                    prop.$UIvalue=uiv;
                    if(oi!==profile._inValid) if(profile.renderId)profile.boxing()._setDirtyMark();
                    
                    // ensure no valueSeparator
                    return uiv.split(sp)[index]||"";
                };

                inputs.push(iprf);
            }

            // to html, but not render
            data.items=linb.UI.Input.pack(inputs,false).toHtml();
            
            // keep refrence
            profile.__inputs=inputs;
            
            return data;
        },
        _onresize:function(profile,width,height){
            var size=profile.properties.borderType!='none'?2:0;
            if(height)
                profile.getSubNode('BORDER').height(height=='auto'?height:(height-size));
            if(width)
                profile.getSubNode('BORDER').width(width=='auto'?width:(width-size));
        }
    }
});

Class("linb.UI.FoldingTabs", "linb.UI.Tabs",{
    Instance:{
        _setCtrlValue:function(value){
            this.each(function(profile){
                var id=profile.domId,
                    box = profile.boxing(),
                    uiv = box.getUIValue(),
                    prop = profile.properties,

                    fold=function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item=profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);
                            
                            var itemnode=profile.getSubNode('BODY',subId);
                            if(itemnode.css('display')!='none'){
                                item._scrollTop=itemnode.get(0).scrollTop||0;
                                if(item._scrollTop)
                                    itemnode.get(0).scrollTop=0;
                                itemnode.css('display','none');
                            }
                        }
                    },
                    expand = function(itemId, arr){
                        var subId = profile.getSubIdByItemId(itemId),
                            item=profile.getItemByItemId(itemId);
                        if(subId){
                            arr.push(subId);
                            
                            var itemnode=profile.getSubNode('BODY',subId);
                            if(itemnode.css('display')=='none'){
                                 // show pane
                                //box.getPanel(itemId).css('position','relative').show('auto','auto');
                                itemnode.css('display','block');
                                if(item._scrollTop)
                                    itemnode.get(0).scrollTop=item._scrollTop;
    
                                profile.box._forLazzyAppend(profile, item, itemId);
                                profile.box._forIniPanelView(profile, item, itemId);
                            }
                        }
                    };
                var arr1=[], arr2=[];
                if(prop.selMode=="multi"){
                    uiv = uiv?uiv.split(prop.valueSeparator):[];
                    value = value?value.split(prop.valueSeparator):[];

                    _.arr.each(uiv,function(key){
                        if(_.arr.indexOf(value,key)==-1)
                            fold(key, arr1);
                    });
                    _.arr.each(value,function(key){
                        if(_.arr.indexOf(uiv,key)==-1)
                            expand(key, arr2);
                    });
                }else{
                    fold(uiv, arr1);
                    expand(value, arr2);
                }
                if(arr1.length){
                    profile.getSubNodes(['ITEM','TOGGLE'],arr1).tagClass('-checked',false);
                    profile.getSubNodes('ITEM',arr1).next().tagClass('-prechecked',false);
                }
                if(arr2.length){
                    profile.getSubNodes(['ITEM','TOGGLE'],arr2).tagClass('-checked');
                    profile.getSubNodes('ITEM',arr2).next().tagClass('-prechecked');
                }

                var t=profile.getRootNode().style;
                linb.UI.$tryResize(profile, t.width, t.height, true);
            });
        },
        _afterInsertItems:null
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style};',
            BOX:{
                $order:0,
                tagName : 'div',
                className:'linb-uibg-base',
                ITEMS:{
                    tagName : 'div',
                    text:"{items}"
                }
            },
            $submap:{
                items:{
                    ITEM:{
                        tagName : 'div',
                        className:'{_checked} {_precheked} {itemClass} {disabled} {readonly}',
                        style:'{itemDisplay} {itemStyle}',
                        HANDLE:{
                            tagName : 'div',
                            HL:{tagName : 'div'},
                            HR:{tagName : 'div'},
                            TITLE:{
                                tabindex: '{_tabindex}',
                                TLEFT:{
                                    $order:0,
                                    tagName:'div',
                                    TOGGLE:{
                                        $order:0,
                                        className:'linb-uicmd-toggle {_tlgchecked}'
                                    },
                                    ICON:{
                                        $order:2,
                                        className:'linb-ui-icon {imageClass}',
                                        style:'{backgroundImage} {backgroundPosition} {backgroundRepeat} {imageDisplay}'
                                    },
                                    CAPTION:{
                                        $order:3,
                                        text:'{caption}'
                                    }
                                },
                                TRIGHT:{
                                    $order:1,
                                    tagName:'div',
                                    style:'{_capDisplay}',
                                    MESSAGE:{
                                        $order:0,
                                        text:'{message}'
                                    },
                                    CMDS:{
                                        $order:2,
                                        OPT:{
                                            $order:1,
                                            className:'linb-uicmd-opt',
                                            style:'{_opt}'
                                        },
                                        POP:{
                                            className:'linb-uicmd-pop',
                                            style:'{popDisplay}',
                                            $order:1
                                        },
                                        CLOSE:{
                                            className:'linb-uicmd-close ',
                                            style:'{closeDisplay}',
                                            $order:2
                                        }
                                    }
                                }/*,
                                TCLEAR:{
                                    $order:2,
                                    tagName:'div'
                                }*/
                            }
                        },
                        BODY:{
                            $order:1,
                            tagName : 'div',
                            BODYI:{
                                tagName : 'div',
                                PANEL:{
                                    tagName : 'div',
                                    style:'{_itemHeight}',
                                    className:'linb-uibg-base',
                                    text:linb.UI.$childTag
                                }
                            }
                        },
                        TAIL:{
                            $order:4,
                            tagName : 'div',
                            TL:{tagName : 'div'},
                            TR:{tagName : 'div'}
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
            },
            BOX:{
                    
            },
            ITEMS:{
                border:0,
                position:'relative',
                zoom:linb.browser.ie?1:null,
                'padding-top':'8px'//,
                //for ie6 1px bug,  HR/TR(position:absolute;right:0;)
                //'margin-right':linb.browser.ie6?'expression(this.parentNode.offsetWidth?(this.parentNode.offsetWidth-(parseInt(this.parentNode.style.paddingLeft)||0)-(parseInt(this.parentNode.style.paddingRight)||0) )%2+"px":"auto")':null
            },
            ITEM:{
                border:0,
                //for ie6 bug
                zoom:linb.browser.ie?1:null,
                'margin-top':'-9px',
                padding:0,
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                position:'relative',
                overflow:'hidden'
            },
            'HANDLE, BODY, BODYI, PANEL, TAIL':{
                position:'relative'
            },

            CMDS:{
                padding:'2px 0 0 4px',
                'vertical-align':'middle',
                position:'relative'
            },
            BODY:{
                display:'none',
                'border-right': 'solid 1px #CCC',
                zoom:linb.browser.ie?1:null,
                position:'relative',
                overflow:'auto',
                background: linb.UI.$bg('border_left.gif', 'repeat-y left top', 'FoldingList')
            },
            BODYI:{
                padding:'0 8px',
                background: linb.UI.$bg('border_left.gif', 'repeat-y left top', 'FoldingList')
            },
            PANEL:{
                overflow:'auto',
                padding:'2px'
            },
            'ITEM-mouseover':{
            },
            'ITEM-mousedown, ITEM-checked':{
            },
            'ITEM-checked':{
                $order:2,
                'margin-bottom':'12px'
             },
            'ITEM-checked BODY':{
                $order:2,
                display:'block'
            },
            'HL, HR, TL, TR':{
                position:'absolute',
                'font-size':0,
                'line-height':0,
                width:'8px',
                background: linb.UI.$bg('corner.gif', 'no-repeat', 'FoldingList')
            },
            'HL, HR':{
                height:'30px'
            },
            'ITEM-prechecked HL':{
                $order:1,
                'background-position': 'left top'
            },
            'ITEM-prechecked HR':{
                $order:1,
                'background-position': 'right top'
            },
            'TL, TR':{
                height:'20px'
            },
            HL:{
                $order:1,
                top:0,
                left:0,
                'background-position': 'left -37px'
            },
            HR:{
                $order:1,
                top:0,
                right:0,
                'background-position': 'right -37px'
            },
            TL:{
                $order:1,
                bottom:0,
                left:0,
                'background-position': 'left bottom'
            },
            TR:{
                $order:1,
                bottom:0,
                right:0,
                'background-position': 'right bottom'
            },
            HANDLE:{
                position:'relative',
                zoom:linb.browser.ie?1:null,
                background: linb.UI.$bg('border_top.gif', '#fff repeat-x left top', 'FoldingList'),
                overflow:'hidden'
            },
            TITLE:{
                $order:1,
                height:'26px',
                display:'block',
                position:'relative',
                'white-space':'nowrap',
                overflow:'hidden'
            },
            'BODY, BODYI, PANEL':{
                'font-size':0,
                'line-height':0
            },
            TAIL:{
                'font-size':0,
                'line-height':0,
                height:'5px',
                background: linb.UI.$bg('border_bottom.gif', 'repeat-x left bottom #EEE', 'FoldingList')
            },
            'CAPTION, MESSAGE':{
                padding:'3px',
                'vertical-align':'middle'
            },
            CAPTION:{
                color:'#666',
                cursor:'pointer',
                'white-space':'nowrap',
            	font: '12px arial,sans-serif',
            	color: '#00681C'
            },
            'ITEM-checked CAPTION':{
                $order:2,
                'font-weight':'bold'
            },
            TLEFT:{
                //position:linb.browser.ie6?'relative':null,
                //'float':'left',
                position:'absolute',
                left:'4px',
                top:'2px',

                'white-space':'nowrap',
                overflow:'hidden'
            },
            TRIGHT:{
                //position:linb.browser.ie6?'relative':null,
                //'float':'right',

                position:'absolute',
                right:'4px',
                top:'2px',
                'white-space':'nowrap',
                overflow:'hidden'
            }
        },
        Behaviors:{
            DraggableKeys:['HANDLE'],
            HoverEffected:{OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            ClickEffected:{OPT:'OPT',CLOSE:'CLOSE',POP:'POP'},
            ITEM:{onClick:null,onMousedown:null},
            ITEMS:{onMousedown:null,onDrag:null,onDragstop:null},
            HANDLE:{
                onClick:function(profile, e, src){
                    if(linb.Event.getBtn(e)!='left')return false;

                    var prop = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId =profile.getSubId(src),
                        box = profile.boxing(),
                        rt,rt2;

                    if(prop.disabled|| item.disabled)return false;
                    if(prop.readonly|| item.readonly)return false;

                    profile.getSubNode('TITLE').focus();

                    switch(prop.selMode){
                    case 'multi':
                        var value = box.getUIValue(),
                            arr = value?value.split(prop.valueSeparator):[],
                            checktype=1;

                        if(arr.length){
                            //for select
                            rt2=false;
                            if(_.arr.indexOf(arr,item.id)!=-1){
                                _.arr.removeValue(arr,item.id);
                                checktype=-1
                            }else
                                arr.push(item.id);

                            arr.sort();
                            value = arr.join(prop.valueSeparator);

                            //update string value only for setCtrlValue
                            if(box.getUIValue() == value)
                                rt=false;
                            else{
                                box.setUIValue(value);
                                if(box.get(0) && box.getUIValue() == value)
                                    rt=box.onItemSelected(profile, item, e, src, checktype)||rt2;
                            }
                            break;
                        }
                    case 'single':

                        if(box.getUIValue() == item.id)
                            rt=false;
                        else{
                            box.setUIValue(item.id);
                            if(box.get(0) && box.getUIValue() == item.id)
                                rt=box.onItemSelected(profile, item, e, src, 1);
                        }
                        break;
                    }
                    return rt;
                },
                onKeydown:function(profile, e, src){
                    var keys=linb.Event.getKey(e), key = keys.key, shift=keys.shiftKey;
                    if(key==' '||key=='enter'){
                        profile.getSubNode('HANDLE',profile.getSubId(src)).onClick();
                        return false;
                    }
                }
            }
        },
        DataModel:{
            $border:0,
            noPanel:null,
            HAlign:null,
            selMode:{
                ini:'single',
                listbox:['single', 'multi']
            }
        },
        _prepareItems:function(profile, arr, pid){
            if(arr.length)
                arr[0]._precheked = profile.getClass('ITEM','-prechecked');
            return arguments.callee.upper.apply(this, arguments);
        },
        _prepareItem:function(profile, item){            
            var dpn = 'display:none';
            item.closeDisplay = item.closeBtn?'':dpn;
            item.popDisplay = item.popBtn?'':dpn;
            item._opt = item.optBtn?'':dpn;
            item.itemDisplay = item.hidden?dpn:'';

            if(item.height && item.height!='auto'){
                item._itemHeight="height:"+item.height+"px;";
            }

            var prop = profile.properties,o;
            item._tabindex = prop.tabindex;
            if(!item.caption)
                item._capDisplay=dpn;
            else
                item.caption = item.caption.replace(/</g,"&lt;");

            if(item._show){
                item._checked = profile.getClass('ITEM','-checked');
                item._tlgchecked = profile.getClass('TOGGLE','-checked');
            }
        },
        _onresize:function(profile,width,height,force,key){
            if(force){profile._w=profile._h=null;}
            if(width && profile._w!=width){
                profile._w=width;
                profile.getSubNode("PANEL",true).each(function(panel){
                    if(panel.offsetWidth)
                        linb(panel).width('auto').width(linb(panel).width());
                });
            }
        },
        _adjustScroll:null
    }
});
Class("linb.UI.Poll", "linb.UI.List",{
    Instance:{
        fillContent:function(id, obj){
            var profile=this.get(0),t,item;
            if(profile.renderId){
                if(item=profile.getItemByItemId(id)){
                    t=profile.getSubNodeByItemId('BODY',id).html('');
                    if(obj){
                        item._obj = obj;
                        item._fill=true;
                        if(typeof obj=='string')t.html(obj);
                        else t.append(obj.render(true));
                    }else
                        item._obj=item._fill=null;
                }
            }
            return this;
        },
        _setOptCap:function(item, value){
            return this.each(function(pro){
                var items = pro.properties.items,
                i = pro.queryItems(pro.properties.items, function(o){
                    return o.id==item.id;
                },false,true);
                if(i && (i=i[0])){
                    i.caption=value;
                    if(pro.renderId)
                        pro.getSubNodeByItemId('CAPTION',i.id).html(value);
                }
            });
        },
        getBindEditor:function(){
            return this.get(0)._bind;
        },
        _insertOpt:function(opt){
            if(!opt.id)opt.id='$'+_();
            this.insertItems([opt]);
            return this;
        },
        _removeOpt:function(id){
            this.removeItems([id],'OUTER');
            return this;
        },
        _setDirtyMark:function(){return this}
    },
    Initialize:function(){
        var self=this;
        self.addTemplateKeys(['EDIT']);
        //modify default template fro shell
        var t = self.getTemplate();
        t.TITLE={
            $order:2,
            tagName : 'DIV',
            style:'{titleDisplay}',
            text : '{title}',
            className:"linb-uibg-bar linb-uiborder-outset {disabled} {_cls}"
        };
        t.TAIL={
            $order:20,
            tagName : 'DIV',
            className:"linb-uibg-bar linb-uiborder-outset {disabled}",
            text:"{cmds}"
        };
        t.$submap={
            items:{
                OUTER:{
                    tagName:'div',
                    className:'linb-uibg-bar linb-uiborder-outset',
                    TOGGLE:{
                        className:'linb-uicmd-toggle',
                        style:'{_togdisplay}'
                    },
                    ITEM:{
                        tabindex: '{_tabindex}',
                        className:'{itemClass} {disabled}',
                        style:'{itemStyle}',
                        OPTION:{
                            $order:0,
                            tagName : 'DIV',
                            MARK2:{$order:1,className:'{_optclass}'}
                        },
                        CAPTION:{
                            $order:1,
                            tagName : 'DIV',
                            text : '{caption}',
                            className:"{disabled} {_itemcls}"
                        },
                        CHART:{
                            $order:2,
                            tagName : 'DIV',
                            style:'{_display}',
                            CAST:{
                                $order:0,
                                text:'{message}'
                            },
                            PROGRESS:{
                                $order:1,
                                style:'background-position: -{_per}px -200px;',
                                PROGRESSI:{}
                            },
                            DEL:{
                                $order:2,
                                className:'linb-ui-btn',
                                style:'{_del}',
                                DELI:{
                                    className:'linb-ui-btni',
                                    DELC:{
                                        className:'linb-ui-btnc',
                                        DELA:{
                                            tagName:'button',
                                            text:'{removeText}'
                                        }
                                    }
                                }
                            }
                        },
                        CLEAR:{
                            $order:3,
                            tagName : 'DIV'
                        }
                    },
                    BODY:{
                        $order:1,
                        tagName : 'DIV',
                        text:'{_body}'
                    }
                }
            },
            cmds:{
                CMD:{
                    className:'linb-ui-btn',
                    CMDI:{
                        className:'linb-ui-btni',
                        CMDC:{
                            className:'linb-ui-btnc',
                            CMDA:{
                                tabindex: '{_tabindex}',
                                text:'{caption}'
                            }
                        }
                    }
                }
            }
        };
        t.ITEMS.className='';
        self.setTemplate(t);

        //for modify
        var inlineEdit=function(profile,node,flag,value,item){
            var o,useC,prop=profile.properties,
                callback=function(v){
                    var b=profile.boxing();
                    switch(flag){
                        //edit option
                        case '1':
                            if(b.beforeOptionChanged(profile, item, v)!==false)
                                b._setOptCap(item,v);
                        break;
                        //new option
                        case '2':
                            if(b.beforeOptionAdded(profile, v)!==false ){
                                var id="["+v.replace(/[^\w_]*/g,'')+"]";
                                b._insertOpt({caption:v,id:id});
                                if(!profile.properties.editable){
                                    profile.boxing().fireItemClickEvent(id);
                                }
                            }
                        break;
                        //edit title
                        default:
                            if(b.beforeTitleChanged(profile, v)!==false)
                                b.setTitle(v);
                    }
                };

            if(profile.onCustomEdit)
                if(o=profile._bind=profile.boxing().onCustomEdit(profile, node, flag, value, item, callback))
                    useC=true;
            if(!useC){
                o=profile._bind;
                if(!o){
                    var pp={type:prop.editorType,commandBtn:'save',left:-10000,top:-10000};
                    profile._bind=o=linb.create('ComboInput', pp);
                    o.onHotKeydown(function(p,key){
                        if(key.key=='enter'){
                            p.boxing().onCommand(p);
                            return false;
                        }else if(key.key=='esc'){
                            o.hide();
                            return false;
                        }
                    })
                    profile.getRoot().append(o);
                }

                var r=node.cssRegion(true,profile.getRoot());
                if(r.height>o.getHeight())
                    o.setHeight(r.height);
                else
                    r.top-=3;
                if(r.top<0)r.top=0;

                o.setValue(value||'',true)
                .setWidth(r.width + (parseInt(node.css('paddingLeft'))||0)+ (parseInt(node.css('paddingRight'))||0))
                .onCommand(function(p){
                    var pro=p.properties,v=pro.$UIvalue, ov=pro.value;
                    if(v!=ov)
                        callback(v);
                    _.asyRun(function(){
                        o.hide();
                    });
                })
                .reBoxing()
                .setBlurTrigger(o.KEY+":"+o.$linbid, function(){
                    o.hide();
                })
                .show(r.left+'px',r.top+'px');

                _.asyRun(function(){
                    o.activate()
                });
            }
        };

        t = self.getBehavior();
        var old=t.ITEM.onClick;
        t.ITEM.onClick = function(profile, e, src){
            var p = profile.properties,
                item = profile.getItemByDom(src),
                editable=item.id=='$custom' || item.editable;
            if(p.disabled)return;

            if(p.editable)
                inlineEdit(profile, profile.getSubNodeByItemId('CAPTION',item.id), editable?'2':'1', editable?'':item.caption, item);
            else{
                if(editable)
                    inlineEdit(profile, profile.getSubNodeByItemId('CAPTION',item.id), '2');
                else
                    old.apply(this, arguments);
            }
        };
        t.TITLE={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    item = profile.getItemByDom(src);
                if(p.disabled)return;

                if(p.editable)
                    inlineEdit(profile, profile.getSubNode('TITLE'), '3', p.title);
            }
        };
        t.DEL={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    b = profile.boxing(),
                    item = profile.getItemByDom(src);
                if(p.disabled)return;
                if(b.beforeOptionRemoved(profile, item)!==false )
                    b._removeOpt(item.id);
                return false;
            }
        }
        t.CMD={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    key = profile.getSubId(src);
                if(p.disabled)return;
                profile.boxing().onClickButton(profile, key, src);
            }
        };
        t.TOGGLE={
            onClick:function(profile, e, src){
                var properties = profile.properties,
                    items=properties.items,
                    item = profile.getItemByDom(src),
                    itemId = profile.getSubId(src),
                    node = linb.use(src),
                    body = profile.getSubNode('BODY',itemId),t
                    ;
                if(item._show){
                    node.tagClass('-checked',false);
                    body.css('display','none');
                }else{
                    node.tagClass('-checked');
                    body.css('display','block');
                    //fill value
                    if(!item._fill){
                        item._fill=true;
                        var callback=function(o){
                            profile.boxing().fillContent(item.id, item._body=o);
                        };
                        if(profile.onGetContent){
                            var r = profile.boxing().onGetContent(profile, item, callback);
                            if(r) callback(r);
                        }else
                            callback(profile.box._buildBody(profile, item));
                    }
                }

                item._show=!item._show;

                //prevent href default action
                //return false;
            }
        };

        self.setBehavior(t);
    },
    Static:{
        _DIRTYKEY:'MARK2',
        _ITEMKEY:'OUTER',
        Appearances:{
            KEY:{
                'font-size':'12px',
                zoom:linb.browser.ie?1:null
            },
            'TITLE, ITEMS, TAIL':{
                position:'relative',
                overflow:'auto',
                'line-height':'14px'
            },
            TAIL:{
                zoom:linb.browser.ie?1:null,
                'padding':'5px 0 5px 40px'
            },
            CMD:{
                margin:'3px',
                'white-space':'nowrap',
                'vertical-align':'middle'
            },
            TITLE:{
                'font-weight':'bold',
                padding:'4px'
            },
            ITEMS:{
                'overflow-x': 'hidden',
                zoom:linb.browser.ie?1:null
            },
            OUTER:{
                position:'relative',
                zoom:linb.browser.ie?1:null,
                'padding-left':'15px'
            },
            TOGGLE:{
                position:'absolute',
                left:0,
                top:'4px'
            },
            BODY:{
                display:'none',
                'padding-left':'27px'
            },
            ITEM:{
                display:'block',
                position:'relative',
                zoom:linb.browser.ie?1:null,
                padding:'4px 2px 4px 2px'
            },
            OPTION:{
                position:'absolute',
                left:'2px',
                top:'4px'
            },
            CAPTION:{
                'float':'left',
                zoom:linb.browser.ie?1:null,
                'margin-left':'24px',
                //{*1*}for: ie6 double margin bug
                display:linb.browser.ie6?'inline':null
            },
            'EDIT, EDITS':{
                $order:2,
                'float':'none',
                'background-color':'#EBEADB',
                cursor:'pointer',
                //{*1*}for: ie6 double margin bug
                display:linb.browser.ie6?'block':null
            },

            CHART:{
                'float':'right'
            },
            CLEAR:{
                clear:'both',
                'text-align':'right'
            },
            'PROGRESS, PROGRESSI':{
                background: linb.UI.$bg('icons.gif', 'no-repeat', true),
                width:'200px',
                height:'14px',
                border:0,
                'vertical-align':'middle',
                'line-height':0,
                'font-size':0
            },
            PROGRESS:{
                $order:1,
                'margin-left':'2px',
                'background-position':'-180px -200px'
            },
            PROGRESSI:{
                $order:1,
                'background-position':'-200px -216px'
            },
            DEL:{
                margin:'0 0 0 4px'
            }
        },
        DataModel:{
            $checkbox:1,
            selectable:true,
            noCtrlKey:null,
            title:{
                action:function(v){
                    this.getSubNode('TITLE').html(v);
                }
            },
            selMode:{
                ini:'single',
                listbox:['single','multi'],
                action:function(){
                    this.boxing().refresh();
                }
            },
            cmds:{
                ini:[]
            },
            noTitle:{
              ini:false,
              action:function(v){
                 this.getSubNode('TITLE').css('display',v?'none':'');
              }
            },
            toggle:{
                ini:false,
                action:function(v){
                    this.getSubNode('TOGGLE',true).css('display',v?'':'none');
                }
            },
            removeText:{
                ini:'remove',
                action:function(v){
                    this.getSubNode('DEL',true).text(v);
                }
            },
            editable:{
                ini:false,
                action:function(v){
                    var self=this,t,cls;
                    self.getSubNode('DEL',true).css('display',v?'':'none');
                    t=self.getSubNode('CAPTION',true).merge(self.getSubNode('TITLE'));
                    cls=self.getClass('EDIT');
                    if(v)
                        t.addClass(cls);
                    else
                        t.removeClass(cls);
                }
            },
            newOption:{
                ini:'',
                action:function(v){
                    var self=this,
                        id='$custom',
                        sid='_special',
                        t,
                        cs=self._cs;
                    if(!v){
                        if(cs)
                            cs.remove();
                    }else{
                        if(!cs){
                            t={
                                id:id,
                                caption:v
                            };
                            t[linb.UI.$tag_subId]=sid;
                            cs=self._buildItems('items',self.box._prepareItems(self,[t]));
                            self.getSubNode('ITEMS').addNext(self._cs=cs);
                        }else
                            self.getSubNodeByItemId('CAPTION',sid).html(v);
                    }
                }
            },
            editorType:'none'
        },
        Behaviors:{
            HoverEffected:{DEL:'DEL',CMD:'CMD',ITEM:'MARK2'},
            ClickEffected:{DEL:'DEL',CMD:'CMD',ITEM:'MARK2'}
        },
        EventHandlers:{
            beforeTitleChanged:function(profile, value){},
            beforeOptionAdded:function(profile, value){},
            beforeOptionRemoved:function(profile, item){},
            beforeOptionChanged:function(profile, item, value){},
            onCustomEdit:function(profile, node, flag, value, item, callback){},
            onClickButton:function(profile, key, src){},
            onGetContent:function(profile,item,callback){}
        },
        RenderTrigger:function(){
            var self=this,t=self.properties.newOption;
            if(t)
                self.boxing().setNewOption(t,true);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                p=profile.properties
            if(p.editable)
                data._cls = profile.getClass('EDIT');
            data.titleDisplay=p.noTitle?'display:none':'';

            var cmds = p.cmds, o;
            if(cmds && cmds.length){
                var sid=linb.UI.$tag_subId,a;
                a=data.cmds=[];
                for(var i=0,t=cmds,l=t.length;i<l;i++){
                    if(typeof t[i]=='string')t[i]={id:t[i]};
                    if(!t[i].caption)t[i].caption=t[i].id;
                    t[i].id=t[i].id.replace(/[^\w]/g,'_');

                    o=linb.UI.adjustData(profile,t[i]);
                    a.push(o);
                    o._tabindex=p.tabindex;
                    o[sid]=o.id;
                }
            }
            return data;
        },
        _prepareItem:function(profile, item){
            var p = profile.properties, f=profile.CF;
            item._tabindex = p.tabindex;

            if(typeof f.formatCaption == 'function')
                item.caption = f.formatCaption(item.caption);

            item._body= item._body || 'Loading...'
            if(item.id!='$custom'){
                item._togdisplay=((p.toggle && item.toggle!==false) || item.toggle)?'':'display:none;';
                item._optclass=p.selMode=='multi'?'linb-uicmd-check':'linb-uicmd-radio';
                item._display='';
                item.percent = parseFloat(item.percent)||0;
                if(item.percent<0)item.percent=0;
                if(item.percent>1)item.percent=1;
                item._per = 200*(1-item.percent);
            }else{
                item._optclass='linb-uicmd-add';
                item._togdisplay=item._display='display:none;';
                item._per = 0;
                item._itemcls=profile.getClass('EDITS');
            }
            item.removeText=p.removeText;
            item._del='display:none;';
            if((('editable' in item) && item.editable)||p.editable){
                item._itemcls=profile.getClass('EDIT');
                item._del = '';
            }

        },
        _buildBody:function(profile,item){
            return item.text?'<pre>'+item.text.replace(/</g,"&lt;")+'</pre>':'';
        },
        _onresize:function(){}
    }
});
Class("linb.UI.FoldingList", ["linb.UI.List"],{
    Instance:{
        fillContent:function(id, obj){
            var profile=this.get(0),t,item;
            if(profile.renderId){
                if(item=profile.getItemByItemId(id)){                    
                    t=profile.getSubNodeByItemId('BODYI',id).html('');
                    if(obj){
                        item._obj = obj;
                        item._fill=true;
                        if(typeof obj=='string')t.html(obj);
                        else t.append(obj.render(true));
                    }else
                        item._obj=item._fill=null;
                }
            }
            return this;
        },
        toggle:function(id){
            var profile=this.get(0);
            if(profile.renderId){
                var properties = profile.properties,
                    items=properties.items,
                    item = profile.getItemByItemId(id),
                    subId = profile.getSubIdByItemId(id),
                    node = profile.getSubNode('ITEM',subId),
                    toggle = profile.getSubNode('TOGGLE',subId),
                    nodenext = node.next(),t
                    ;
                if(item._show){
                    if(properties.activeLast && items.length)
                        if(items[items.length-1].id==item.id)
                            return false;
    
                    node.tagClass('-checked',false);
                    toggle.tagClass('-checked',false);
                    if(nodenext)
                        nodenext.tagClass('-prechecked',false);
                }else{
                    node.tagClass('-checked');
                    toggle.tagClass('-checked');
                    if(nodenext)
                        nodenext.tagClass('-prechecked');
                    //fill value
                    if(!item._fill){
                        var callback=function(o){
                            profile.boxing().fillContent(item.id, item._body=o);
                        };
                        if(profile.onGetContent){
                            var r = profile.boxing().onGetContent(profile, item, callback);
                            if(r) callback(r);
                        }else
                            callback(profile.box._buildBody(profile, item));
                    }
                }
                item._show=!item._show
             }
            return this;
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.$submap={
            items:{
                ITEM:{
                    tagName : 'div',
                    className:'{_checked} {_precheked} {itemClass} {disabled} {readonly}',
                    style:'{itemStyle}',
                    HEAD:{
                        tagName : 'div',
                        HL:{tagName : 'div'},
                        HR:{tagName : 'div'},
                        TITLE:{
                            tabindex: '{_tabindex}',
                            TLEFT:{
                                $order:0,
                                tagName:'div',
                                TOGGLE:{
                                    $order:0,
                                    className:'linb-uicmd-toggle {_tlgchecked}'
                                },
                                CAP1:{
                                    $order:1,
                                    text:'{title}'
                                }
                            },
                            TRIGHT:{
                                $order:1,
                                tagName:'div',
                                style:'{_capDisplay}',
                                CAP2:{
                                    $order:0,
                                    text:'{caption}'
                                },
                                OPT:{
                                    $order:1,
                                    className:'linb-uicmd-opt',
                                    style:'{_opt}'
                                }
                            }/*,
                            TCLEAR:{
                                $order:2,
                                tagName:'div'
                            }*/
                        }
                    },
                    BODY:{
                        $order:1,
                        tagName : 'div',
                        className:'linb-uibg-base',
                        BODYI:{
                            $order:0,
                            tagName : 'div',
                            text:'{_body}'
                        },
                        CMDS:{
                            $order:1,
                            tagName : 'div',
                            text:"{cmds}"
                        }
                    },
                    TAIL:{
                        $order:4,
                        tagName : 'div',
                        TL:{tagName : 'div'},
                        TR:{tagName : 'div'}
                    }
                }
            },
            'items.cmds':{
                $order:2,
                CMD:{
                    className:'linb-ui-btn',
                    CMDI:{
                        className:'linb-ui-btni',
                        CMDC:{
                            className:'linb-ui-btnc',
                            CMDA:{
                                tabindex: '{_tabindex}',
                                text:'{caption}'
                            }
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
                padding:'2px'
            },
            ITEMS:{
                border:0,
                position:'relative',
                zoom:linb.browser.ie?1:null,
                'padding-top':'8px'//,
                //for ie6 1px bug,  HR/TR(position:absolute;right:0;)
                //'margin-right':linb.browser.ie6?'expression(this.parentNode.offsetWidth?(this.parentNode.offsetWidth-(parseInt(this.parentNode.style.paddingLeft)||0)-(parseInt(this.parentNode.style.paddingRight)||0) )%2+"px":"auto")':null
            },
            ITEM:{
                border:0,
                //for ie6 bug
                zoom:linb.browser.ie?1:null,
                'margin-top':'-9px',
                padding:0,
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                position:'relative',
                overflow:'hidden'
            },
            'HEAD, BODY, BODYI, TAIL':{
                position:'relative'
            },

            CMDS:{
                'font-size':0,
                'line-height':0,
                padding:'2px 0 0 4px',
                'text-align':'right',
                position:'relative',
                background: linb.UI.$bg('border_left.gif', 'repeat-y left top #EEE'),
                zoom:linb.browser.ie?1:null
            },
            CMD:{
                margin:'2px 4px 2px 4px'
            },
            BODY:{
                display:'none',
                'border-right': 'solid 1px #CCC',
                zoom:linb.browser.ie?1:null,
                position:'relative',
                overflow:'auto',
                background: linb.UI.$bg('border_left.gif', 'repeat-y left top')
            },
            BODYI:{
                padding:'2px 8px 0 8px',
                background: linb.UI.$bg('border_left.gif', 'repeat-y left top'),
                position:'relative'
            },
            'BODY, BODYI':{
                'font-size':0,
                'line-height':0
            },
            'ITEM-checked':{
                $order:2,
                'margin-bottom':'12px'
             },
            'ITEM-checked BODY':{
                $order:2,
                display:'block'
            },
            'HL, HR, TL, TR':{
                position:'absolute',
                'font-size':0,
                'line-height':0,
                width:'8px',
                background: linb.UI.$bg('corner.gif', 'no-repeat')
            },
            'HL, HR':{
                height:'30px'
            },
            'ITEM-prechecked HL':{
                $order:1,
                'background-position': 'left top'
            },
            'ITEM-prechecked HR':{
                $order:1,
                'background-position': 'right top'
            },
            'TL, TR':{
                height:'20px'
            },
            HL:{
                $order:1,
                top:0,
                left:0,
                'background-position': 'left -37px'
            },
            HR:{
                $order:1,
                top:0,
                right:0,
                'background-position': 'right -37px'
            },
            TL:{
                $order:1,
                bottom:0,
                left:0,
                'background-position': 'left bottom'
            },
            TR:{
                $order:1,
                bottom:0,
                right:0,
                'background-position': 'right bottom'
            },
            HEAD:{
                position:'relative',
                zoom:linb.browser.ie?1:null,
                background: linb.UI.$bg('border_top.gif', '#fff repeat-x left top'),
                overflow:'hidden'
            },
            TITLE:{
                $order:1,
                height:'26px',
                display:'block',
                position:'relative',
                'white-space':'nowrap',
                overflow:'hidden'
            },
            TAIL:{
                'font-size':0,
                'line-height':0,
                position:'relative',
                height:'5px',
                background: linb.UI.$bg('border_bottom.gif', 'repeat-x left bottom #EEE')
            },
            'CAP1, CAP2':{
                padding:'3px',
                'vertical-align':'middle'
            },
            CAP1:{
                color:'#666',
                cursor:'pointer',
                'white-space':'nowrap',
            	font: 'bold 12px arial,sans-serif',
            	color: '#00681C'
            },
            'ITEM-checked CAP1':{
                $order:2,
                'font-weight':'normal'
            },
            TLEFT:{
                //position:linb.browser.ie6?'relative':null,
                //'float':'left',
                position:'absolute',
                left:'4px',
                top:'2px',

                'white-space':'nowrap',
                overflow:'hidden'
            },
            TRIGHT:{
                //position:linb.browser.ie6?'relative':null,
                //'float':'right',

                position:'absolute',
                right:'4px',
                top:'2px',

                'white-space':'nowrap',
                overflow:'hidden'
            }
        },
        Behaviors:{
            HoverEffected:{ITEM:null,HEAD:'HEAD',OPT:'OPT',CMD:'CMD'},
            ClickEffected:{ITEM:null,HEAD:'HEAD',CMD:'CMD'},
            ITEM:{onClick:null,onKeydown:null},
            HEAD:{
                onClick:function(profile, e, src){
                    profile.boxing().toggle(profile.getItemIdByDom(src));
                    return false;
                }
            },
            CMD:{
                onClick:function(profile,e,src){
                    if(profile.onClickButton)
                        profile.boxing().onClickButton(profile,profile.getItemByDom(linb.use(src).parent().get(0)), linb.use(src).id().split('_')[1],src);
                    return false;
                }
            },
            OPT:{
                onMousedown:function(){
                    return false;
                },
                onClick:function(profile, e, src){
                    profile.boxing().onShowOptions(profile, profile.getItemByDom(src), e, src);
                    return false;
                }
            }
        },
        DataModel:({
            value:null,
            borderType:null,
            cmds:{
                ini:[]
            },
            activeLast:false
        }),
        EventHandlers:{
            onGetContent:function(profile,item,onEnd){},
            onClickButton:function(profile,item,cmdkey,src){},
            onShowOptions:function(profile,item,e,src){}
        },
         RenderTrigger:function(){
            var self=this, pro=self.properties, items=pro.items, item;
            if(pro.activeLast && items.length>0){
                item=items[items.length-1];
                self.boxing().fillContent(item.id, item._body);
            }
        },
        _prepareItems:function(profile, arr, pid){
            if(arr.length){
                arr[0]._precheked = profile.getClass('ITEM','-prechecked');
                if(profile.properties.activeLast){
                    //for properties.data
                    var item = arr[arr.length-1];
                    item._show = true;
                    item._fill = true;
                    item._body = profile.onGetContent?profile.boxing().onGetContent(profile,item) : profile.box._buildBody(profile, item);
                }
            }
            return arguments.callee.upper.apply(this, arguments);
        },
        _prepareItem:function(profile, item){
            var p = profile.properties,o,
                dpn = 'display:none';
            item._tabindex = p.tabindex;
            if(!item.caption)
                item._capDisplay=dpn;
            else
                item.caption = item.caption.replace(/</g,"&lt;");
            item._opt = item.optBtn?'':dpn;
            item._body= item._body || 'Loading...'

            if(item._show){
                item._checked = profile.getClass('ITEM','-checked');
                item._tlgchecked = profile.getClass('TOGGLE','-checked');
            }
            var cmds = item.cmds || p.cmds;
            if(cmds && cmds.length){
                var sid=linb.UI.$tag_subId,a;
                a=item.cmds=[];
                for(var i=0,t=cmds,l=t.length;i<l;i++){
                    if(typeof t[i]=='string')t[i]={id:t[i]};
                    if(!t[i].caption)t[i].caption=t[i].id;
                    t[i].id=t[i].id.replace(/[^\w]/g,'_');

                    o=linb.UI.adjustData(profile,t[i]);
                    a.push(o);
                    o[sid]=item[sid] + '_' + o.id;
                }
            }
        },
        _buildBody:function(profile,item){
            return item.text?'<pre>'+item.text.replace(/</g,"&lt;")+'</pre>':'';
        },
        _onresize:function(){}
    }
});
/*
300: ruler width
30: ruler height
15: ruler shadow height

15: indicator width => 8: indicator offset
14: indicator height
*/
Class("linb.UI.Range", ["linb.UI","linb.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                var p=profile.properties,
                    tpl=p.captionTpl,
                    fun=function(k){return profile.getSubNode(k)},
                    fun1=function(a,i){a.cssPos({left:profile[i], top: box._x2y(profile[i])}) },
                    fun2=function(o,v){o.get(0).style.width = v +'px'},
                    title = fun('CAPTION'),
                    a=fun('IND1'),
                    b=fun('IND2'),
                    r1 = fun('RULER1'),
                    r3 = fun('RULER3'),
                    box = profile.box,
                    arr = box._v2a(value);

                profile._rate= 300/(p.max-p.min);
                //use Math.round
                profile._v1= Math.round((arr[0]-p.min) /  (p.max-p.min) *300) ;
                profile._v2= Math.round((1-(p.max - arr[1]) /  (p.max-p.min)) *300);

                //text value
                title.html(box._buildTpl(p.singleValue,tpl, arr,p.unit),false);
                //indicator position
                fun1(a, '_v1');
                fun1(b,'_v2');
                //background div width
                fun2(r1, profile._v1+8);
                fun2(r3, profile._v2+8);
            });
        },
        _setDirtyMark:function(){
            return arguments.callee.upper.apply(this,['BOX']);
        }
    },
    Static:{
        Templates:{
            style:'{_style}',
            className:'{_className}',
            BOX:{
                tagName:'div',
                RULER:{
                    tagName:'div',
                    IND1:{
                        tabindex:'{tabindex}',
                        style:'{_single}'
                    },
                    IND2:{
                        tabindex:'{tabindex}'
                    },
                    RULER1:{
                        $order:2,
                        style:'{_single}'
                    },
                    RULER3:{}
                },
                TAIL:{
                    tagName:'div',
                    CAPTION:{
                        tagName:'div'
                    },
                    MIN:{
                        text:'{min}'
                    },
                    MAX:{
                        text:'{max}'
                    }
                }
            }
        },
        Appearances:{
            'KEY, RULER, IND1, IND1':{
                'font-size':0,
                'line-height':0,
                position:'relative'
            },
            BOX:{
                position:'absolute',
                left:0,
                top:0,
                width:'316px'
            },
            'CAPTION, IND1, TAIL, MIN':{
                'font-size':'12px',
                'line-height':'14px'
            },
            RULER:{
                $order:1,
                position:'relative',
                height:'30px',
                overflow:'visible',
                'margin-bottom':'3px',
                background: linb.UI.$bg('bg.png'),
                _background:'none',
                _filter: linb.UI.$ieBg('bg.png')
            },
            'RULER1, RULER3':{
                position:'absolute',
                left:0,
                top:0,
                height:'30px',
                width:'300px'
            },
            RULER1:{
                background: linb.UI.$bg('bg.png'),
                _background:'none',
                _filter: linb.UI.$ieBg('bg.png')
            },
            RULER3:{
                background: linb.UI.$bg('front.png'),
                _background:'none',
                _filter: linb.UI.$ieBg('front.png')
            },
            'IND1,IND2':{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                'z-index':'2',
                width:'15px',
                height:'14px',
                position:'absolute'
            },
            IND1:{
                background: linb.UI.$bg('icons.gif', 'no-repeat left -225px', true),
                left:'0px',
                top:'11px'
            },
            IND2:{
                background: linb.UI.$bg('icons.gif', 'no-repeat -15px -225px', true),
                left:'300px',
                top:'1px'
            },
            TAIL:{
                $order:2,
                width:'300px',
                position:'relative'
            },
            CAPTION:{
                position:'relative',
                'text-align':'center'
            },
            MIN:{
                position:'absolute',
                left:0,
                top:0
            },
            MAX:{
                position:'absolute',
                right:0,
                top:0
            }
        },
        Behaviors:{
            IND1:{
                onKeydown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._keydown.apply(profile.box,[profile, e, src,0]);
                },
                onMousedown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    if(linb.Event.getBtn(e)!="left")return;
                    var p=profile.properties,
                        box=profile.box,
                        arr = box._v2a(p.$UIvalue);

                    linb.use(src).startDrag(e,{
                        widthIncrement:p.steps?p.width/p.steps:null,
                        dragType:'move',
                        targetReposition:true,
                        horizontalOnly:true,
                        maxLeftOffset: Math.floor(profile._v1),
                        maxRightOffset: Math.floor(profile._v2-profile._v1),
                        dragCursor:'default'
                    });
                    linb.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND2').css('zIndex',5);
                },
                onDrag:function(profile, e, src){
                    var d=linb.DragDrop.getProfile();
                    profile.box._ondrag.apply(profile.box,[profile,d.curPos.left,src,0]);
                },
                onDragstop:function(profile, e, src){
                    var p=profile.properties,
                        box=profile.boxing(),
                        rate = profile._rate,
                        d=linb.DragDrop.getProfile(),
                        f,
                        arr = p.$UIvalue.split(':');
                    profile._v1=d.curPos.left;
                    arr[0]= Math.floor((profile._v1)/rate + p.min);
                    box.setUIValue(arr.join(':'));

                    if(profile._v1==profile._v2){
                        linb.use(src).css('zIndex',10);
                        profile.getSubNode('IND2').css('zIndex',5);
                    }
                }
            },
            IND2:{
                onKeydown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    profile.box._keydown.apply(profile.box,[profile, e, src,1]);
                },
                onMousedown:function(profile, e, src){
                    if(profile.properties.disabled || profile.properties.readonly)return;
                    if(linb.Event.getBtn(e)!="left")return;
                    var p=profile.properties,
                        box=profile.box,
                        arr = box._v2a(p.$UIvalue);

                    linb.use(src).startDrag(e,{
                        widthIncrement:p.steps?p.width/p.steps:null,
                        dragType:'move',
                        targetReposition:true,
                        horizontalOnly:true,
                        maxLeftOffset: Math.floor(profile._v2-profile._v1),
                        maxRightOffset: Math.floor(300 - profile._v2),
                        dragCursor:'default'
                    });
                    linb.use(src).css('zIndex',10).focus();
                    profile.getSubNode('IND1').css('zIndex',5);
                },
                onDrag:function(profile, e, src){
                    var d=linb.DragDrop.getProfile();
                    profile.box._ondrag.apply(profile.box,[profile,d.curPos.left,src,1]);
                },
                onDragstop:function(profile, e, src){
                    var p=profile.properties,
                        box=profile.boxing(),
                        rate = profile._rate,
                        d=linb.DragDrop.getProfile(),
                        f,
                        arr = p.$UIvalue.split(':');
                    profile._v2=d.curPos.left;
                    arr[1]= Math.floor((profile._v2)/rate + p.min);
                    box.setUIValue(arr.join(':'));
                }
            }
        },
        DataModel:{
            position:'absolute',
            width:{
                ini:300,
                readonly:true
            },
            height:{
                ini:46,
                readonly:true
            },
            min:{
                ini:0,
                action:function(){
                    var self=this,t,pro=self.properties,b=self.boxing();
                    b.refresh();
                    if(pro.$UIvalue!=(t=this.box._ensureValue(self,pro.$UIvalue)))
                        b.setValue(t);
                }
            },
            max:{
                ini:100,
                action:function(){
                    var self=this,t,pro=self.properties,b=self.boxing();
                    b.refresh();
                    if(pro.$UIvalue!=(t=this.box._ensureValue(self,pro.$UIvalue)))
                        b.setValue(t);
                }
            },
            unit:{
                ini:'',
                action:function(){
                    this.boxing()._setCtrlValue(this.properties.$UIvalue);
                }
            },
            steps:0,
            captionTpl:{
                ini:'{fromvalue}{unit} - {tovalue}{unit}',
                action:function(){
                    this.boxing()._setCtrlValue(this.properties.$UIvalue);
                }
            },
            value:'0:100',
            singleValue:{
                ini:false,
                action:function(v){
                    this.boxing().refresh();
                }
            }
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            var p=profile.properties,
                arr=profile.box._v2a(p.value);
            d._single = p.singleValue?'display:none':'';

            p.min=parseFloat(p.min);
            p.max=parseFloat(p.max);

            d.min = d.min + p.unit;
            d.max = d.max + p.unit;
            return d;
        },
        _ensureValue:function(profile, value){
            if(!value)value="";
            var p = profile.properties,
                a = value.split(':'),
                min=p.min,
                max=p.max,
                b=[],
                f1=function(a){return parseFloat(a)},
                f2=function(a){return Math.min(max, Math.max(min,a))};
            
            b[0]= f1(a[0]);
            b[1]= f1(a[1]);
            b[0] = Math.min(b[0],b[1]);
            if(!min)min=b[0];
            if(!max)max=b[1];
            b[0]= f2(b[0]);
            b[1]= f2(b[1]);            
            return b.join(':');
        },
        _v2a:function(value){
            return typeof value == 'string'? value.split(':') : value;
        },
        _buildTpl:function(single,tpl,arr,unit){
            return single?
              arr[1] + unit
            : tpl.replace(/\{fromvalue\}/g,arr[0]).replace(/\{tovalue\}/g,arr[1]).replace(/\{unit\}/g,unit);
        },
        _x2y:function(x){
            return Math.floor(15 + 1 - (x) * (15/300));
        },
        _keydown:function(profile, e, src,type){
            var key=linb.Event.getKey(e);
            if(key.key=='left' || key.key=='right'){
                var s=linb.use(src).get(0).style, left=parseInt(s.left), pro=profile.properties, steps=pro.steps, span=300/steps, v,f=function(key){
                    return parseInt(profile.getSubNode(key).get(0).style.left);
                };
                left += key.key=='left'?-1:1;
                if(steps){
                    left = left-left%span;
                    if(key.key=='right')
                        left += span;
                }
                if(!pro.singleValue)
                    if(type===0){
                        v=f('IND2');
                        if(left>v)left=v;
                    }else{
                        v=f('IND1');
                        if(left<v)left=v;
                    }
                if(left<0)left=0;
                if(left>300)left=300;
                
                s.left=left+'px';

                profile.box._ondrag.apply(profile.box,[profile,left,src,type]);

                var  rate = profile._rate,
                    arr = pro.$UIvalue.split(':');
                if(type===0){
                    profile._v1=left;
                    arr[0]= Math.floor((profile._v1)/rate + pro.min);
                }else{
                    profile._v2=left;
                    arr[1]= Math.floor((profile._v2)/rate + pro.min);
                }
                profile.boxing().setUIValue(arr.join(':'));                
            }
        },
        _ondrag:function(profile, left, src, tag){
            var p=profile.properties,
                d=linb.DragDrop.getProfile(),
                box=profile.box,
                fun=function(k){return profile.getSubNode(k)},
                fun2=function(o,v){o.get(0).style.width = v +'px'},
                cap = fun('CAPTION'),
                r1 = fun('RULER1'),
                r3 = fun('RULER3'),
                t,f,
                arr=this._v2a(p.$UIvalue);

             //adjust top
            linb.use(src).get(0).style.top = this._x2y(left) + 'px';

            t = Math.floor((left)/profile._rate + p.min);

            if(tag){
                arr[1] = t;
                fun2(r3, left + 8);
            }else{
                arr[0] = t;
                fun2(r1, left + 8);
            }
             cap.html(box._buildTpl(p.singleValue, p.captionTpl, arr,p.unit),false);
        },
        _onresize:function(){}
    }
});Class('linb.UI.Calendar', 'linb.UI.DatePicker', {
    Instance:{
        setDayInfo:function(key,index,value){
            var node=this.getSubNode(key, ""+index);
            if(node.get(0)){
                node.get(0).innerHTML=value;
            }
            return this;
        },
        addContents : function(index,node){
            this.getSubNode('DC',""+index).append(node);
            return this;
        },
        clearContents : function(index){
            this.getSubNode('DC',""+index).empty();
            return this;
        }
    },
    Initialize:function(){
        var self=this,
            id=linb.UI.$ID,
            tag=linb.UI.$tag_special,
            cls=linb.UI.$CLS,
            key=self.KEY;

        self.addTemplateKeys(['H', 'W','COL','DH','DAYBOX','DC','TBODY', 'THEADER', 'TD','DF1','DF2','DF3','DF4']);
        var colgroup = '<colgroup id="'+key+'-COL:'+id+':"  class="'+tag+'COL_CS'+tag+'"  style="'+tag+'COL_CS'+tag+'"><col width="2%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/></colgroup>',
            thead1='<thead ID="'+key+'-THEADER:'+id+':" class="'+tag+'THEADER_CS'+tag+'"  style="'+tag+'THEADER_CS'+tag+'" ><tr height="1%"><th id="'+key+'-H:'+id+':7" class="linb-node linb-node-th '+cls+'-h '+tag+'H_CC'+tag+'"  style="'+tag+'H_CS'+tag+'"></th>',
            thead2='</tr></thead>',
            th='<th id="'+key+'-H:'+id+':@" class="linb-node linb-node-th '+cls+'-h '+tag+'H_CC'+tag+'"  style="'+tag+'H_CS'+tag+'">@</th>',
            tbody1 = '<tbody id="'+key+'-TBODY:'+id +':"  class="'+tag+'TBODY_CS'+tag+'"  style="'+tag+'TBODY_CS'+tag+'">',
            tbody2 = '</tbody>',
            tr1='<tr>',
            tr2='</tr>',
            td1='<th id="'+key+'-W:'+id+':@"  class="linb-node linb-node-th '+cls+'-w '+tag+'W_CC'+tag+'" style="'+tag+'W_CS'+tag+'">@</th>',
            td2='<td id="'+key+'-TD:'+id+':@" class="linb-node linb-node-td '+cls+'-td '+tag+'TD_CC'+tag+'"  style="'+tag+'TD_CS'+tag+'" '+linb.$IEUNSELECTABLE()+'  >'+
                '<div id="'+key+'-DAYBOX:'+id+':@" class="linb-node linb-node-div '+cls+'-daybox '+tag+'DAY_CC'+tag+'"  style="'+tag+'DAY_CS'+tag+'" '+linb.$IEUNSELECTABLE()+' >'+
                    '<div id="'+key+'-DH:'+id+':@" class="linb-node linb-node-div '+cls+'-dh '+tag+'DH_CC'+tag+'"  style="'+tag+'DH_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF1:'+id+':@" class="linb-node linb-node-div '+cls+'-df1 '+tag+'DF1_CC'+tag+'" style="'+tag+'DF1_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF2:'+id+':@" class="linb-node linb-node-div '+cls+'-df2 '+tag+'DF2_CC'+tag+'" style="'+tag+'DF2_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF3:'+id+':@" class="linb-node linb-node-div '+cls+'-df3 '+tag+'DF3_CC'+tag+'" style="'+tag+'DF3_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DF4:'+id+':@" class="linb-node linb-node-div '+cls+'-df4 '+tag+'DF4_CC'+tag+'"  style="'+tag+'DF4_CS'+tag+'"></div>'+
                    '<div id="'+key+'-DC:'+id+':@" class="linb-node linb-node-div '+cls+'-dc '+tag+'DC_CC'+tag+'"  style="'+tag+'DC_CS'+tag+'"></div>'+
                '</div>'+
                '</td>',
            body,i,j,k,l,a=[],b=[];
        for(i=0;i<7;i++)
            b[b.length]= th.replace(/@/g,i);

        k=l=0;
        for(i=0;i<48;i++){
            j=i%8;
            a[a.length]= (j==0?tr1:'') + (j==0?td1:td2).replace(/@/g,j==0?l:k) + (j==7?tr2:'');
            if(j!==0)k++;
            else l++;
        }

        body=colgroup+thead1+b.join('')+thead2+tbody1+a.join('')+tbody2;

        self.setTemplate({
            tagName : 'div',
            style:'{_style}',
            className:'{_className}',
            onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                BODY:{
                    $order:1,
                    tagName:'table',
                    cellpadding:"0",
                    cellspacing:"0",
                    width:'100%',
                    text:body
                }
            }
        });
        delete self.$Keys.YEAR;
        delete self.$Keys.MONTH;
    },
    Static:{
        Behaviors:{        
            DroppableKeys:['DAYBOX'],
            HoverEffected:{},
            ClickEffected:{},
            onSize:linb.UI.$onSize,
            TD:{onClick:null,
                onDblclick:function(profile, e, src){
                    var p=profile.properties,
                        index=profile.getSubId(src);
                    if(p.disabled)return false;
                    profile.boxing().onDblclick(profile, index, e, src);
                }
            }
        },
        DataModel:{
            handleHeight : null,
            tipsHeight :null,
            closeBtn:null,
            timeInput:null,
            dataBinder:null,
            dateField:null,

            dock:'fill',
            width:200,
            height:200
        },
        EventHandlers:{
            onDblclick:function(profile, item, e, src){},
            beforeClose:null
        },
        _getLabelNodes:function(profile){
            return profile.$day1 || (profile.$day1=profile.getSubNode('DF1',true));
        },
        _getDayNodes:function(profile){
            return profile.$day2 || (profile.$day2=profile.getSubNode('DAYBOX',true));
        },
        Appearances:{
            'DAYBOX, DC':{
                position:'relative'
            },
            'DF1, DF2, DF3, DF4':{
                position:'absolute',
                'white-space':'nowrap'
            },
            DF1:{
                left:'2px',
                top:'2px'
            },
            DF2:{
                right:'2px',
                top:'2px'
            },
            DF3:{
                left:'2px',
                bottom:'2px'
            },
            DF4:{
                right:'2px',
                bottom:'2px'
            },
            DAYBOX:{
                overflow:'hidden'
            },
            DC:{
                'text-align':'left'
            },
            TD:{
                "background-color":"#F9F7D1"
            },
            'TD-checked':{
                $order:1//,
                //"background-color":"#FFFB1E"
            },
            'TD-free':{
                $order:1,
                "background-color":"#FFF"
            }
        },
        _onresize:function(profile,width,height){
            var p=profile.properties,
                f=function(k){return profile.getSubNode(k)},
                t;
            //for border, view and items
            if(height){
                f('BORDER').height(t=height);
                f('BODY').height(t);
                t=(t-16)/6-1;
                profile.box._getDayNodes(profile).height(t);
            }
        }
    }
});