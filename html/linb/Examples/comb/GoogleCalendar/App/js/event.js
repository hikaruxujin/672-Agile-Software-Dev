
Class('App.event', 'linb.Com',{
    Instance:{
        refreshUIFromData:function(data, type, caption,timelineKey){
            var host=this;

            host.onTaskAdded=null;
            host._type=type || 'edit';
            host._entry=data._entry;
            host._taskId=data.id;

            host._timelineKey=timelineKey;

            host.inTitle.setValue(data.caption||"",true);
            host.inWhere.setValue(data.where||"",true);
            host.inCon.setValue(data.content||"",true);
            host.cbColor.setValue(data.bgColor||'#C6D6F7',true);

            var from=new Date(data.from),
                to=new Date(data.to);

            host._setSimpleTimeSpan(from, to);

            host.dlgEvent.setCaption(caption || data.caption || "Event");

            host.btnDel.setDisplay(host._type=='new'?'none':'');


            host._resetDateSpan=true;

            //for simple/advance time span setting
            host._curDateTool='simple';
            host.tabs3.setValue('simple',true);
            host.dlgEvent.setHeight(270);
            host.tabs3.setHeight(80);
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .setHost(host,"dlgEvent")
                .setLeft(140)
                .setTop(90)
                .setWidth(430)
                .setHeight(270)
                .setResizer(false)
                .setCaption("Event")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setPinBtn(false)
                .onHotKeydown("_dlgevent_onhotkeydown")
                .beforeClose("_dlgevent_beforeclose")
                .setCustomStyle({"PANEL":"overflow:hidden;"})
            );
            
            host.dlgEvent.append((new linb.UI.Div)
                .setHost(host,"div68")
                .setLeft(0)
                .setTop(153)
                .setWidth(50)
                .setHeight(20)
                .setHtml("Time")
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.dlgEvent.append((new linb.UI.Div)
                .setHost(host,"div12")
                .setLeft(0)
                .setTop(73)
                .setWidth(50)
                .setHeight(20)
                .setHtml("Where")
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.dlgEvent.append((new linb.UI.Input)
                .setHost(host,"inWhere")
                .setLeft(55)
                .setTop(70)
                .setWidth(345)
            );
            
            host.dlgEvent.append((new linb.UI.Input)
                .setHost(host,"inCon")
                .setLeft(55)
                .setTop(100)
                .setWidth(345)
                .setHeight(50)
                .setMultiLines(true)
            );
            
            host.dlgEvent.append((new linb.UI.Div)
                .setHost(host,"div13")
                .setLeft(0)
                .setTop(101)
                .setWidth(50)
                .setHeight(20)
                .setHtml("Content")
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.dlgEvent.append((new linb.UI.Div)
                .setHost(host,"div10")
                .setLeft(0)
                .setTop(43)
                .setWidth(50)
                .setHeight(20)
                .setHtml("Title")
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.dlgEvent.append((new linb.UI.Input)
                .setHost(host,"inTitle")
                .setLeft(55)
                .setTop(40)
                .setWidth(205)
            );
            
            host.dlgEvent.append((new linb.UI.Block)
                .setHost(host,"panel31")
                .setDock("width")
                .setTop(2)
                .setBorderType('groove')
                .setHeight(34)
            );
            
            host.panel31.append((new linb.UI.Button)
                .setHost(host,"btnOK")
                .setLeft(10)
                .setTop(2)
                .setWidth(87)
                .setCaption("OK")
                .onClick("_btnok_onclick")
            );
            
            host.panel31.append((new linb.UI.Button)
                .setHost(host,"btnCancel")
                .setLeft(100)
                .setTop(2)
                .setWidth(87)
                .setCaption("Cancel")
                .onClick("_btncancel_onclick")
            );
            
            host.panel31.append((new linb.UI.Button)
                .setHost(host,"btnDel")
                .setLeft(324)
                .setTop(2)
                .setWidth(87)
                .setCaption("Delete")
                .onClick("_btndel_onclick")
            );
            
            host.dlgEvent.append((new linb.UI.ComboInput)
                .setHost(host,"cbColor")
                .setLeft(306)
                .setTop(40)
                .setWidth(94)
                .setType("color")
                .setItems([{"id":"a", "caption":"itema", "tips":"item a"}, {"id":"b", "caption":"itemb", "tips":"item b"}, {"id":"c", "caption":"itemc", "tips":"item c"}])
            );
            
            host.dlgEvent.append((new linb.UI.Div)
                .setHost(host,"div15")
                .setLeft(260)
                .setTop(43)
                .setWidth(40)
                .setHeight(20)
                .setHtml("Color")
                .setCustomStyle({"KEY":"text-align:right"})
            );
            
            host.dlgEvent.append((new linb.UI.Tabs)
                .setHost(host,"tabs3")
                .setItems([{"id":"simple", "caption":"Simple"}, {"id":"advance", "caption":"Advance"}])
                .setDock("width")
                .setTop(153)
                .setHeight(80)
                .setHAlign("right")
                .setValue("simple")
                .beforeUIValueSet("_tabs3_beforevalueupdated")
            );
            
            host.tabs3.append((new linb.UI.ComboInput)
                .setHost(host,"cbToTime")
                .setLeft(350)
                .setTop(16)
                .setWidth(48)
                .setType("time")
            , 'simple');
            
            host.tabs3.append((new linb.UI.ComboInput)
                .setHost(host,"cbFromTime")
                .setLeft(160)
                .setTop(16)
                .setWidth(48)
                .setType("time")
            , 'simple');
            
            host.tabs3.append((new linb.UI.Div)
                .setHost(host,"div17")
                .setLeft(10)
                .setTop(19)
                .setWidth(40)
                .setHeight(20)
                .setHtml("From")
                .setCustomStyle({"KEY":"text-align:right"})
            , 'simple');
            
            host.tabs3.append((new linb.UI.ComboInput)
                .setHost(host,"cbFromDate")
                .setLeft(56)
                .setTop(16)
                .setWidth(104)
                .setType("date")
            , 'simple');
            
            host.tabs3.append((new linb.UI.ComboInput)
                .setHost(host,"cbToDate")
                .setLeft(246)
                .setTop(16)
                .setWidth(104)
                .setType("date")
            , 'simple');
            
            host.tabs3.append((new linb.UI.Div)
                .setHost(host,"div18")
                .setLeft(210)
                .setTop(19)
                .setWidth(30)
                .setHeight(16)
                .setHtml("To")
                .setCustomStyle({"KEY":"text-align:right"})
            , 'simple');
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _setSimpleTimeSpan:function(from, to, force){
            var host=this, date=linb.Date, key=force===false?'setUIValue':'setValue';
            var a1 = date.getTimSpanStart(from,'d').getTime(),
                a2 = date.get(from,'h')+':'+date.get(from,'n'),
                b1 = date.getTimSpanStart(to,'d').getTime(),
                b2 = date.get(to,'h')+':'+date.get(to,'n');
            host.cbFromDate[key](a1);
            host.cbFromTime[key](a2);
            host.cbToDate[key](b1);
            host.cbToTime[key](b2);
        }, 
        _getSimpleTimeSpan:function(){
                var host = this, arr = [];
                if(host._curDateTool=='simple'){
                    var d = host.cbFromDate.getUIValue(),
                        m = host.cbFromTime.getUIValue(),
                        a = m.split(':');
                    arr[0] = linb.Date.add(d, 'n', Number(a[0])*60 + Number(a[1]));

                    d = host.cbToDate.getUIValue();
                    m = host.cbToTime.getUIValue();
                    a = m.split(':');
                    arr[1] = linb.Date.add(d, 'n', Number(a[0])*60 + Number(a[1]));
                }else
                    arr=host._timespancom.getValue();

                return arr;
        }, 
        _dlgevent_beforeclose:function (profile) {
            profile.boxing().hide();
            return false;
        }, 
        _dlgevent_onhotkeydown:function (profile, key, e, src) {
            if(key.key=='esc')
                profile.boxing().close();
        }, 
        _btncancel_onclick:function (profile, e, value) {
            this.dlgEvent.close();
        }, 
        _btnok_onclick:function (profile, e, value) {
            var host=this;
            if(this._type=='new'){
                var data = {
                    caption : host.inTitle.getUIValue()||"",
                    where : host.inWhere.getUIValue()||"",
                    con : host.inCon.getUIValue()||"",
                    bgColor : host.cbColor.getUIValue()||""
                };

                var a= host._getSimpleTimeSpan();
                data.from = a[0];
                data.to = a[1];

                var cb = function(entry){

                    host._type='edit';

                    host.inTitle.updateValue();
                    host.inWhere.updateValue();
                    host.inCon.updateValue();
                    host.cbColor.updateValue();
                    host.cbFromDate.updateValue();
                    host.cbFromTime.updateValue();
                    host.cbToDate.updateValue();
                    host.cbToTime.updateValue();
                    host.dlgEvent.setCaption(data.title);

                    host.onTaskAdded(entry);

                    SPA.timeline1.free();

                    host.dlgEvent.close();
                };
                SPA.timeline1.busy('Creating...');
                _google_addTask(data, cb);
            }else{
                var data = {}, flag=false;
                if(host.inTitle.isDirtied()){
                    data.caption = host.inTitle.getUIValue()||"";
                    flag=true;
                }
                if(host.inWhere.isDirtied()){
                    data.where = host.inWhere.getUIValue()||"";
                    flag=true;
                }
                if(host.inCon.isDirtied()){
                    data.con = host.inCon.getUIValue()||"";
                    flag=true;
                }
                if(host.cbColor.isDirtied()){
                    data.bgColor = host.cbColor.getUIValue()||"";
                    flag=true;
                }


                if(host._curDateTool=='advance'){
                    var a=host._timespancom.getValue();
                    host._setSimpleTimeSpan(a[0],a[1],false);
                }
                if(host.cbFromDate.isDirtied() || host.cbFromTime.isDirtied()){
                    var a= host._getSimpleTimeSpan();
                    data.from = a[0];
                    flag=true;
                }
                if(host.cbToDate.isDirtied() || host.cbToTime.isDirtied()){
                    var a= host._getSimpleTimeSpan();
                    data.to = a[1];
                    flag=true;
                }

                if(flag){
                    var cb = function(entry){
                        if(data.caption)
                            host.inTitle.updateValue();
                        if(data.where)
                            host.inWhere.updateValue();
                        if(data.con)
                            host.inCon.updateValue();
                        if(data.bgColor)
                            host.cbColor.updateValue();
                        if(data.from){
                            host.cbFromDate.updateValue();
                            host.cbFromTime.updateValue();
                        }
                        if(data.to){
                            host.cbToDate.updateValue();
                            host.cbToTime.updateValue();
                        }

                        host.onTaskModified(host._entry = entry);

                        SPA.timeline1.free();

                        host.dlgEvent.close();
                    };
                    SPA.timeline1.busy('Modifing...');
                    _google_modifyTask(host._entry, data, cb);
                }else
                    host.dlgEvent.close();
            }
        }, 
        _btndel_onclick:function (profile, e, value) {
            var host=this;
            var cb = function(entry){
                SPA.timeline1.free();
            };
            SPA.timeline1.busy('Deleting...');
            _google_deleteTask(host._entry, cb);
            host.dlgEvent.close();
            host.onTaskDeleted(host._taskId);
        }, 
        _tabs3_beforevalueupdated:function (profile, oldValue, newValue) {
            var host=this;
            if(oldValue=="advance"){
                host.dlgEvent.setHeight(270);
                host.tabs3.setHeight(80);

                var a=host._timespancom.getValue();
                host._setSimpleTimeSpan(a[0],a[1],false);
            }else if(oldValue=="simple"){
                host.dlgEvent.setHeight(420);
                host.tabs3.setHeight(224);
                if(!host._timespancom){
                    var timespan = host._timespancom = new linb.Com.TimeSpan();

                    timespan.showCommandPanel=false;
                    //set 'tile label' property(string)
                    timespan.txtInfo='';
                    //set 'time from label' property(string)
                    timespan.txtFrom='From';
                    //set 'time to label' property(string)
                    timespan.txtTo='To';
                    //set 'timezone label' property(string)
                    timespan.txtTZ='timezone';

                    var tz = -((new Date).getTimezoneOffset()/60),
                        mark = tz<0?'-':'+',
                        i = Math.abs(tz);

                    //set default time zone
                    timespan.timezone = mark + (i<10?'0'+i:i) +"00";


                    var a = host._getSimpleTimeSpan();
                    timespan.iniFrom=a[0];
                    timespan.iniTo=a[1];

                    timespan.onIniTimeLine=function(timeline){
                        //this will show zoomin/zoomout buttons
                        timeline.setTimeSpanKey(host._timelineKey);
                    };

                    timespan.show(null, profile.getSubNodeByItemId('PANEL',newValue));
                }else{
                    host._timespancom.timeline.setTimeSpanKey(host._timelineKey);
                    var a = host._getSimpleTimeSpan();
                    host._timespancom.setValue(a[0],a[1], !!host._resetDateSpan);
                    host._resetDateSpan=false;
                }
            }
            host._curDateTool = newValue;
        }
    }
});