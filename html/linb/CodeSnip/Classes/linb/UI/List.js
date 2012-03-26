Class('App.linb_UI_List', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.List)
                .setHost(host,"list2")
                .setItems([{"id":"item a", "caption":"item a", "tips":"item a"}, {"id":"item b1", "caption":"item b1", "tips":"item b1"}, {"id":"item b2", "caption":"item b2", "tips":"item b2"}, {"id":"item b3", "caption":"item b3", "tips":"item b3"}])
                .setDisabled(true)
                .setLeft(30)
                .setTop(240)
                .setHeight(100)
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new linb.UI.Div)
                .setHost(host,"div36")
                .setLeft(30)
                .setTop(50)
                .setWidth(120)
                .setHeight(20)
                .setHtml("select mode : single")
            );
            
            append(
                (new linb.UI.Div)
                .setHost(host,"div37")
                .setLeft(200)
                .setTop(50)
                .setWidth(120)
                .setHeight(20)
                .setHtml("select mode : multi")
            );
            
            append(
                (new linb.UI.Div)
                .setHost(host,"div38")
                .setLeft(30)
                .setTop(210)
                .setWidth(100)
                .setHeight(20)
                .setHtml("disabled")
            );
            
            append(
                (new linb.UI.List)
                .setHost(host,"list3")
                .setItems([{"id":"item a", "caption":"<b>long</b> long long item a", "tips":"item a"}, {"id":"item b", "caption":"<span style='color:red'>long</span> long long item b", "tips":"item b"}, {"id":"item c", "caption":"<span style='font-size:20px'>long</span> long long item c", "tips":"item c"}])
                .setLeft(200)
                .setTop(240)
                .setHeight(100)
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new linb.UI.List)
                .setHost(host,"list1")
                .setItems([{"id":"item a", "caption":"item a", "image":"img/demo.gif"}, {"id":"item b", "caption":"item b", "image":"img/demo.gif"}, {"id":"item c", "caption":"item c", "image":"img/demo.gif"}])
                .setLeft(200)
                .setTop(80)
                .setHeight(100)
                .setSelMode("multi")
                .setValue("")
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new linb.UI.List)
                .setHost(host,"list4")
                .setItems([{"id":"item a", "caption":"item a", "image":"img/demo.gif"}, {"id":"item b", "caption":"item b", "image":"img/demo.gif"}, {"id":"item c", "caption":"item c", "image":"img/demo.gif"}])
                .setLeft(30)
                .setTop(80)
                .setHeight(100)
                .setMaxHeight("200")
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new linb.UI.Div)
                .setHost(host,"div39")
                .setLeft(200)
                .setTop(210)
                .setWidth(100)
                .setHeight(20)
                .setHtml("custom item")
            );
            
            append(
                (new linb.UI.Div)
                .setHost(host,"div27")
                .setLeft(380)
                .setTop(210)
                .setWidth(100)
                .setHeight(20)
                .setHtml("Use listKey")
            );
            
            append(
                (new linb.UI.List)
                .setHost(host,"list7")
                .setListKey("testkey")
                .setLeft(380)
                .setTop(240)
                .setHeight(100)
                .setMaxHeight("200")
                .onItemSelected("_list5_onitemselected")
            );
            
            append(
                (new linb.UI.Div)
                .setHost(host,"div46")
                .setLeft(380)
                .setTop(50)
                .setWidth(170)
                .setHeight(20)
                .setHtml("select mode : none")
            );
            
            append(
                (new linb.UI.List)
                .setHost(host,"list23")
                .setItems([{"id":"item a", "caption":"item a", "image":"img/demo.gif"}, {"id":"item b", "caption":"item b", "image":"img/demo.gif"}, {"id":"item c", "caption":"item c", "image":"img/demo.gif"}])
                .setLeft(380)
                .setTop(80)
                .setHeight(100)
                .setSelMode("none")
                .onItemSelected("_list23_onitemselected")
            );
            
            append(
                (new linb.UI.List)
                .setHost(host,"ctl_list1")
                .setItems([{"imageClass":"linb-ui-busy", "caption":"linb-ui-busy", "id":"aq"}, {"imageClass":"linb-uicmd-none", "caption":"linb-uicmd-none", "id":"ar"}, {"imageClass":"linb-uicmd-empty", "caption":"linb-uicmd-empty", "id":"as"}, {"imageClass":"linb-uicmd-opt", "caption":"linb-uicmd-opt", "id":"at"}, {"imageClass":"linb-uicmd-pop", "caption":"linb-uicmd-pop", "id":"au"}, {"imageClass":"linb-uicmd-land", "caption":"linb-uicmd-land", "id":"av"}, {"imageClass":"linb-uicmd-refresh", "caption":"linb-uicmd-refresh", "id":"aw"}, {"imageClass":"linb-uicmd-toggle", "caption":"linb-uicmd-toggle", "id":"ax"}, {"imageClass":"linb-uicmd-toggle2", "caption":"linb-uicmd-toggle2", "id":"ay"}, {"imageClass":"linb-uicmd-min", "caption":"linb-uicmd-min", "id":"az"}, {"imageClass":"linb-uicmd-max", "caption":"linb-uicmd-max", "id":"ca"}, {"imageClass":"linb-uicmd-restore", "caption":"linb-uicmd-restore", "id":"cb"}, {"imageClass":"linb-uicmd-pin", "caption":"linb-uicmd-pin", "id":"cc"}, {"imageClass":"linb-uicmd-check", "caption":"linb-uicmd-check", "id":"cd"}, {"imageClass":"linb-uicmd-radio", "caption":"linb-uicmd-radio", "id":"ce"}, {"imageClass":"linb-uicmd-add", "caption":"linb-uicmd-add", "id":"cf"}, {"imageClass":"linb-uicmd-remove", "caption":"linb-uicmd-remove", "id":"cg"}])
                .setLeft(560)
                .setTop(80)
                .setWidth(160)
                .setHeight(260)
                .setValue("a")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _list5_onitemselected:function (profile, item, src) {
            linb.message('You selected "' + profile.boxing().getUIValue()  +'"');
            return false;
        },
        _list23_onitemselected:function (profile, item, src) {
            linb.message('You selected "' + item.id +'"');
            return false;
        },
        _onCreated:function () {
            linb.UI.cacheData('testkey',['in listkey 1', 'in listkey 2'])
        },
        events:{"onCreated":"_onCreated"}
    }
});