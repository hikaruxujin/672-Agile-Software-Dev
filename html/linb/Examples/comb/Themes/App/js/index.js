Class('App', 'linb.Com',{
    Instance:{
        //Com events
        events:{}, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Tabs)
                .setHost(host,"tabs2")
                .setItems([{"id":"1", "caption":"page 1", "image":"img/demo.gif", "popBtn":true, "closeBtn":true}, {"id":"2", "caption":"page 2", "image":"img/demo.gif", "popBtn":true, "closeBtn":true}, {"id":"3", "caption":"page 3", "closeBtn":true}, {"id":"5", "caption":"page 4", "closeBtn":true}])
                .setValue("1")
            );
            
            host.tabs2.append((new linb.UI.SLabel)
                .setHost(host,"slable1")
                .setLeft(30)
                .setTop(330)
                .setCaption("simple label")
            , '1');
            
            host.tabs2.append((new linb.UI.Label)
                .setHost(host,"label10")
                .setLeft(80)
                .setTop(20)
                .setWidth(70)
                .setCaption("label")
                .setImage("img/demo.gif")
            , '1');
            
            host.tabs2.append((new linb.UI.Label)
                .setHost(host,"label5")
                .setLeft(130)
                .setTop(330)
                .setShadow(true)
                .setCaption("adv label")
                .setShadowText(true)
                .setFontSize("14px")
            , '1');
            
            host.tabs2.append((new linb.UI.Panel)
                .setHost(host,"panel2")
                .setDock("none")
                .setLeft(20)
                .setTop(230)
                .setWidth(180)
                .setHeight(180)
                .setZIndex(1)
                .setCaption("panel sample")
                .setOptBtn(true)
                .setToggleBtn(true)
                .setCloseBtn(true)
                .setPopBtn(true)
            , '2');
            
            host.panel2.append((new linb.UI.Link)
                .setHost(host,"link3")
                .setLeft(10)
                .setTop(30)
                .setWidth(120)
                .setHeight(19)
                .setCaption("link in the panel")
            );
            
            host.tabs2.append((new linb.UI.Block)
                .setHost(host,"block1")
                .setLeft(200)
                .setTop(20)
                .setWidth(200)
                .setHeight(150)
                .setBorderType("ridge")
            , '2');
            
            host.block1.append((new linb.UI.Layout)
                .setHost(host,"layout4")
                .setItems([{"id":"a", "min":10, "pos":"before", "size":40, "locked":false, "folded":false, "cmd":true, "caption":"a"}, {"id":"main", "min":10, "caption":"main", "size":40}, {"id":"b", "pos":"after", "min":10, "size":37, "locked":false, "folded":false, "cmd":true, "caption":"b"}])
            );
            
            host.layout4.append((new linb.UI.Link)
                .setHost(host,"link5")
                .setLeft(50)
                .setTop(10)
                .setCaption("link5")
            , 'b');
            
            host.layout4.append((new linb.UI.Label)
                .setHost(host,"label3")
                .setLeft(20)
                .setTop(10)
                .setCaption("label3")
            , 'a');
            
            host.layout4.append((new linb.UI.Layout)
                .setHost(host,"layout5")
                .setItems([{"id":"before", "pos":"before", "min":10, "size":50, "locked":false, "folded":false, "cmd":true, "caption":"before"}, {"id":"main", "min":10, "caption":"main"}, {"id":"after", "pos":"after", "min":10, "size":50, "locked":false, "folded":false, "cmd":true, "caption":"after"}])
                .setType("horizontal")
            , 'main');
            
            host.tabs2.append((new linb.UI.RadioBox)
                .setHost(host,"radiobox1")
                .setItems([{"id":"1", "image":"img/demo.gif", "caption":"radio 1"}, {"id":"2", "image":"img/demo.gif", "caption":"radio 2"}, {"id":"3", "caption":"radio 3"}, {"id":"4", "caption":"radio 4"}, {"id":"5", "caption":"radio 5"}])
                .setLeft(10)
                .setTop(70)
                .setWidth(100)
            , '3');
            
            host.tabs2.append((new linb.UI.Pane)
                .setHost(host,"pane18")
                .setLeft(20)
                .setTop(20)
                .setWidth(160)
                .setHeight(30)
                .setHtml("Panel")
            , '2');
            
            host.pane18.append((new linb.UI.Link)
                .setHost(host,"link4")
                .setLeft(40)
                .setTop(10)
                .setCaption("link4")
            );
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput12")
                .setLeft(20)
                .setTop(80)
                .setWidth(80)
                .setType("upload")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput18")
                .setLeft(110)
                .setTop(80)
                .setWidth(80)
                .setType("getter")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput17")
                .setLeft(110)
                .setTop(50)
                .setWidth(80)
                .setType("listbox")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput13")
                .setLeft(20)
                .setTop(110)
                .setWidth(80)
                .setType("helpinput")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput14")
                .setLeft(20)
                .setTop(140)
                .setWidth(80)
                .setType("popbox")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput20")
                .setLeft(110)
                .setTop(140)
                .setWidth(80)
                .setType("time")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("00:00")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput11")
                .setLeft(20)
                .setTop(50)
                .setWidth(80)
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput21")
                .setLeft(110)
                .setTop(170)
                .setWidth(80)
                .setType("color")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("#AFFFFF")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput16")
                .setLeft(20)
                .setTop(200)
                .setWidth(80)
                .setType("spin")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("0")
            , '2');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput22")
                .setLeft(110)
                .setTop(200)
                .setWidth(80)
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setCommandBtn('save')
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.Block)
                .setHost(host,"block8")
                .setLeft(220)
                .setTop(200)
                .setWidth(540)
                .setHeight(210)
                .setBorderType("ridge")
            , '2');
            
            host.block8.append((new linb.UI.ButtonViews)
                .setHost(host,"buttonviews2")
                .setItems([{"id":"a", "caption":"buttonview a", "image":"img/demo.gif", "closeBtn":true, "popBtn":true}, {"id":"b", "caption":"buttonview b", "image":"img/demo.gif", "closeBtn":true, "popBtn":true}, {"id":"c", "caption":"buttonview c"}])
                .setBarSize(28)
                .setValue("a")
            );
            
            host.buttonviews2.append((new linb.UI.Group)
                .setHost(host,"group1")
                .setLeft(10)
                .setTop(10)
                .setWidth(200)
                .setHeight(100)
                .setCaption("group")
            , 'a');
            
            host.group1.append((new linb.UI.Link)
                .setHost(host,"link2")
                .setLeft(40)
                .setTop(30)
                .setCaption("link2")
            );
            
            host.group1.append((new linb.UI.Button)
                .setHost(host,"button11")
                .setLeft(90)
                .setTop(30)
                .setWidth(90)
                .setCaption("button11")
            );
            
            host.tabs2.append((new linb.UI.PageBar)
                .setHost(host,"pagebar1")
                .setLeft(130)
                .setTop(80)
                .setValue("1:100:200")
            , '3');
            
            host.tabs2.append((new linb.UI.Gallery)
                .setHost(host,"gallery1")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}])
                .setLeft(240)
                .setTop(120)
                .setWidth(170)
                .setHeight(110)
            , '3');
            
            host.tabs2.append((new linb.UI.MenuBar)
                .setHost(host,"menubar2")
                .setItems([{"id":"file", "sub":["a", "b", "c"], "caption":"file"}, {"id":"tools", "sub":[{"id":"aa", "caption":"aa"}, {"id":"bb", "caption":"bb"}], "caption":"tools"}])
            , '3');
            
            host.tabs2.append((new linb.UI.ToolBar)
                .setHost(host,"toolbar20")
                .setItems([{"id":"file", "sub":[{"id":"a", "caption":"a", "image":"img/demo.gif"}, {"id":"b", "caption":"b", "image":"img/demo.gif"}], "caption":"file"}, {"id":"tools", "sub":[{"id":"aa", "caption":"aa"}, {"id":"b b", "caption":"b b"}], "caption":"tools"}])
            , '3');
            
            host.tabs2.append((new linb.UI.IconList)
                .setHost(host,"iconlist2")
                .setItems([{"id":"a", "caption":"a", "image":"img/demo.gif"}, {"id":"b", "caption":"b", "image":"img/demo.gif"}, {"id":"c", "caption":"c", "image":"img/demo.gif"}])
                .setLeft(130)
                .setTop(120)
                .setWidth(130)
                .setHeight(100)
            , '3');
            
            host.tabs2.append((new linb.UI.Dialog)
                .setHost(host,"dialog3")
                .setLeft(470)
                .setTop(310)
                .setWidth(280)
                .setHeight(190)
                .setCaption("dialog3")
                .setOptBtn(true)
                .setLandBtn(true)
            , '3');
            
            host.dialog3.append((new linb.UI.Input)
                .setHost(host,"input2")
                .setLeft(40)
                .setTop(10)
            );
            
            host.dialog3.append((new linb.UI.Button)
                .setHost(host,"button18")
                .setLeft(40)
                .setTop(40)
                .setCaption("button18")
            );
            
            host.dialog3.append((new linb.UI.List)
                .setHost(host,"list7")
                .setItems([{"id":"item a", "caption":"item a"}, {"id":"item b", "caption":"item b"}, {"id":"item c", "caption":"item c"}, {"id":"item d", "caption":"item d"}])
                .setLeft(41)
                .setTop(70)
                .setHeight(70)
            );
            
            host.tabs2.append((new linb.UI.Block)
                .setHost(host,"block9")
                .setLeft(20)
                .setTop(240)
                .setWidth(420)
                .setHeight(150)
            , '3');
            
            host.block9.append((new linb.UI.TreeGrid)
                .setHost(host,"treegrid2")
                .setSelMode("single")
                .setRowNumbered(true)
                .setColHidable(true)
                .setColMovable(true)
                .setHeader([{"id":"col1", "width":80, "type":"label", "caption":"col1"}, {"id":"col2", "width":80, "type":"label", "caption":"col2"}, {"id":"col3", "width":80, "type":"label", "caption":"col3"}, {"id":"col4", "width":80, "type":"label", "caption":"col4"}])
                .setRows([{"cells":[{"value":"row1 col1"}, {"value":"row1 col2"}, {"value":"row1 col3"}, {"value":"row1 col4"}], "id":"a"}, {"cells":[{"value":"row2 col1"}, {"value":"row2 col2"}, {"value":"row2 col3"}, {"value":"row2 col4"}], "id":"b"}, {"cells":[{"value":"row3 col1"}, {"value":"row3 col2"}, {"value":"row3 col3"}, {"value":"row3 col4"}], "sub":[["sub1", "sub2", "sub3", "sub4"]], "id":"c"}])
            );
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton11")
                .setLeft(20)
                .setTop(410)
                .setCaption("alert window")
                .onClick("_sbutton11_onclick")
            , '3');
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton12")
                .setLeft(130)
                .setTop(410)
                .setCaption("confirm window")
                .onClick("_sbutton12_onclick")
            , '3');
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton13")
                .setLeft(250)
                .setTop(410)
                .setCaption("prompt window")
                .onClick("_sbutton13_onclick")
            , '3');
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton14")
                .setLeft(360)
                .setTop(410)
                .setCaption("pop window")
                .onClick("_sbutton14_onclick")
            , '3');
            
            host.tabs2.append((new linb.UI.Stacks)
                .setHost(host,"stacks1")
                .setItems([{"id":"a", "caption":"stack a", "popBtn":true, "closeBtn":true, "image":"img/demo.gif"}, {"id":"b", "caption":"stack b", "popBtn":true, "closeBtn":true, "image":"img/demo.gif"}, {"id":"c", "caption":"stack c"}])
                .setDock("none")
                .setLeft(440)
                .setTop(20)
                .setWidth(320)
                .setHeight(150)
                .setValue("a")
            , '2');
            
            host.stacks1.append((new linb.UI.Block)
                .setHost(host,"block3")
                .setLeft(20)
                .setTop(10)
                .setWidth(40)
                .setHeight(40)
            , 'a');
            
            host.stacks1.append((new linb.UI.Block)
                .setHost(host,"block4")
                .setLeft(80)
                .setTop(10)
                .setWidth(40)
                .setHeight(40)
                .setBorderType("ridge")
            , 'a');
            
            host.stacks1.append((new linb.UI.Block)
                .setHost(host,"block5")
                .setLeft(140)
                .setTop(10)
                .setWidth(40)
                .setHeight(40)
                .setBorderType("groove")
            , 'a');
            
            host.stacks1.append((new linb.UI.Block)
                .setHost(host,"block6")
                .setLeft(200)
                .setTop(10)
                .setWidth(40)
                .setHeight(40)
                .setBorderType("inset")
            , 'a');
            
            host.stacks1.append((new linb.UI.Block)
                .setHost(host,"block7")
                .setLeft(260)
                .setTop(10)
                .setWidth(40)
                .setHeight(40)
                .setBorder(true)
                .setBorderType("none")
            , 'a');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput15")
                .setLeft(20)
                .setTop(170)
                .setWidth(80)
                .setType("date")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("-28800000")
            , '2');
            
            host.tabs2.append((new linb.UI.Block)
                .setHost(host,"block10")
                .setLeft(470)
                .setTop(70)
                .setWidth(280)
                .setHeight(230)
                .setBorderType("groove")
            , '3');
            
            host.block10.append((new linb.UI.TreeBar)
                .setHost(host,"treebar3")
                .setItems([{"id":"a", "caption":"tree item a", "image":"img/demo.gif"}, {"id":"b", "caption":"tree item b", "image":"img/demo.gif"}, {"id":"c", "caption":"tree item c", "image":"img/demo.gif"}, {"id":"d", "caption":"tree d", "sub":["sub d a", "sub d b", "sub d c"]}, {"id":"e", "group":true, "caption":"tree group e", "sub":[{"id":"sub e 1", "caption":"sub e 1"}, {"id":"sub e 2", "caption":"sub e 2"}]}, {"id":"f", "group":true, "caption":"tree group f", "sub":["sub f 1", "sub f 2"]}])
                .setPosition("relative")
            );
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput5")
                .setLeft(290)
                .setTop(70)
                .setValue("ComboInput")
            , '1');
            
            host.tabs2.append((new linb.UI.TextEditor)
                .setHost(host,"texteditor4")
                .setLeft(20)
                .setTop(50)
                .setWidth(110)
                .setHeight(80)
                .setValue("textEditor")
            , '1');
            
            host.tabs2.append((new linb.UI.Button)
                .setHost(host,"button7")
                .setLeft(280)
                .setTop(370)
                .setWidth(270)
                .setHeight(62)
                .setShadow(true)
                .setCaption("<p>adv button</p>")
                .setImage("img/demo.gif")
            , '1');
            
            host.tabs2.append((new linb.UI.Input)
                .setHost(host,"input3")
                .setLeft(290)
                .setTop(40)
                .setValue("input")
            , '1');
            
            host.tabs2.append((new linb.UI.ColorPicker)
                .setHost(host,"color1")
                .setLeft(500)
                .setTop(90)
            , '1');
            
            host.tabs2.append((new linb.UI.List)
                .setHost(host,"list2")
                .setItems([{"id":"1", "image":"img/demo.gif", "caption":"1"}, {"id":"2", "image":"img/demo.gif", "caption":"2"}, {"id":"3", "caption":"List"}])
                .setLeft(150)
                .setTop(50)
                .setHeight(70)
            , '1');
            
            host.tabs2.append((new linb.UI.Button)
                .setHost(host,"button15")
                .setLeft(420)
                .setTop(450)
                .setWidth(130)
                .setCaption("status button")
                .setType("status")
            , '1');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput6")
                .setLeft(290)
                .setTop(100)
                .setHeight(70)
                .setType("color")
                .setValue("#00FF00")
            , '1');
            
            host.tabs2.append((new linb.UI.Link)
                .setHost(host,"link1")
                .setLeft(190)
                .setTop(20)
                .setCaption("link")
            , '1');
            
            host.tabs2.append((new linb.UI.TimePicker)
                .setHost(host,"time1")
                .setLeft(30)
                .setTop(140)
            , '1');
            
            host.tabs2.append((new linb.UI.DatePicker)
                .setHost(host,"date1")
                .setLeft(280)
                .setTop(175)
            , '1');
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton1")
                .setLeft(30)
                .setTop(360)
                .setCaption("simple button (auto width)")
            , '1');
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton2")
                .setLeft(30)
                .setTop(390)
                .setWidth(206)
                .setCaption("simple button - left")
                .setHAlign("left")
            , '1');
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton3")
                .setLeft(30)
                .setTop(420)
                .setWidth(206)
                .setCaption("simple button - center")
            , '1');
            
            host.tabs2.append((new linb.UI.SButton)
                .setHost(host,"sbutton4")
                .setLeft(30)
                .setTop(450)
                .setWidth(206)
                .setCaption("simple button - right")
                .setHAlign("right")
            , '1');
            
            host.tabs2.append((new linb.UI.SCheckBox)
                .setHost(host,"scheckbox1")
                .setLeft(575)
                .setTop(390)
                .setCaption("simple checkbox")
            , '1');
            
            host.tabs2.append((new linb.UI.Button)
                .setHost(host,"button14")
                .setLeft(280)
                .setTop(450)
                .setCaption("drop button")
                .setType("drop")
            , '1');
            
            host.tabs2.append((new linb.UI.Slider)
                .setHost(host,"slider2")
                .setLeft(730)
                .setTop(10)
                .setWidth(50)
                .setHeight(480)
                .setSteps(100)
                .setType("vertical")
                .setValue("30:60")
            , '1');
            
            host.tabs2.append((new linb.UI.Slider)
                .setHost(host,"slider1")
                .setLeft(440)
                .setTop(30)
                .setWidth(280)
                .setIsRange(false)
                .setValue("20")
            , '1');
            
            host.tabs2.append((new linb.UI.ProgressBar)
                .setHost(host,"progressbar1")
                .setLeft(290)
                .setTop(10)
                .setWidth(440)
                .setValue(80)
            , '1');
            
            host.tabs2.append((new linb.UI.Div)
                .setHost(host,"div11")
                .setLeft(20)
                .setTop(10)
                .setWidth(40)
                .setHeight(40)
                .setHtml("div")
            , '1');
            
            host.tabs2.append((new linb.UI.CheckBox)
                .setHost(host,"checkbox1")
                .setLeft(570)
                .setTop(440)
                .setWidth(150)
                .setHeight(30)
                .setShadow(true)
                .setCaption("adv checkbox")
                .setImage("img/demo.gif")
            , '1');
            
            host.tabs2.append((new linb.UI.Calendar)
                .setHost(host,"calendar1")
                .setDock("none")
                .setLeft(30)
                .setTop(10)
                .setWidth(370)
                .setHeight(220)
            , '5');
            
            host.tabs2.append((new linb.UI.TimeLine)
                .setHost(host,"timeline1")
                .setLeft(30)
                .setTop(240)
                .setWidth(370)
                .setHeight(150)
                .setCloseBtn(true)
                .setOptBtn(true)
            , '5');
            
            host.tabs2.append((new linb.UI.Range)
                .setHost(host,"range1")
                .setLeft(440)
                .setTop(10)
            , '5');
            
            host.tabs2.append((new linb.UI.Poll)
                .setHost(host,"poll1")
                .setItems([{"id":"1", "caption":"option 1", "percent":0.2}, {"id":"2", "caption":"option 2", "toggle":true, "percent":0.5, "text":"detail 1"}, {"id":"3", "caption":"option 3", "toggle":true, "percent":0.8, "text":"detail 2"}, {"id":"4", "caption":"option 4", "percent":0.4}, {"id":"5", "caption":"option 5", "percent":0.9}])
                .setLeft(440)
                .setTop(100)
                .setWidth(310)
                .setHeight(170)
                .setCmds([])
            , '5');
            
            host.tabs2.append((new linb.UI.StatusButtons)
                .setHost(host,"linklist1")
                .setItems([{"id":"a", "caption":"link list a"}, {"id":"b", "caption":"link list v"}, {"id":"c", "caption":"link list c"}])
                .setLeft(440)
                .setTop(70)
                .setWidth(310)
                .setHeight(30)
            , '5');
            
            host.tabs2.append((new linb.UI.FoldingList)
                .setHost(host,"foldinglist1")
                .setItems([{"id":"a", "caption":"caption a", "title":"title a", "text":"detail 1"}, {"id":"b", "caption":"caption b", "title":"title b"}, {"id":"c", "caption":"caption c", "title":"title c", "text":"detail 2"}])
                .setLeft(40)
                .setTop(400)
                .setWidth(356)
                .setHeight(116)
                .setCmds(["cmd 1","cmd 2"])
            , '5');
            
            host.tabs2.append((new linb.UI.ComboInput)
                .setHost(host,"comboinput19")
                .setLeft(110)
                .setTop(110)
                .setWidth(80)
                .setType("cmdbox")
                .setItems([{"id":"a", "caption":"item a", "image":"img/demo.gif"}, {"id":"b", "caption":"item b", "image":"img/demo.gif"}, {"id":"c", "caption":"item c", "image":"img/demo.gif"}, {"id":"d", "caption":"item d", "image":"img/demo.gif"}])
                .setValue("a")
            , '2');
            
            host.tabs2.append((new linb.UI.Poll)
                .setHost(host,"poll2")
                .setItems([{"id":"1", "caption":"option 1", "percent":0.2}, {"id":"2", "caption":"option 2", "toggle":true, "percent":0.5, "text":"detail 1"}, {"id":"3", "caption":"option 3", "toggle":true, "percent":0.8, "text":"detail 2"}, {"id":"4", "caption":"option 4", "percent":0.4}, {"id":"5", "caption":"option 5", "percent":0.9}])
                .setLeft(440)
                .setTop(300)
                .setWidth(310)
                .setHeight(210)
                .setSelMode("multi")
                .setCmds(["cmd 1","cmd 2"])
            , '5');
            
            append((new linb.UI.Pane)
                .setHost(host,"pane4")
                .setDock("top")
                .setHeight(50)
            );
            
            host.pane4.append((new linb.UI.SButton)
                .setHost(host,"btnDefault")
                .setLeft(320)
                .setTop(17)
                .setWidth(100)
                .setCaption("default")
                .onClick("btndefault_clk")
            );
            
            host.pane4.append((new linb.UI.Label)
                .setHost(host,"label6")
                .setLeft(23)
                .setTop(17)
                .setWidth(280)
                .setHeight(30)
                .setCaption("Click here to change the theme =>")
                .setShadowText(true)
                .setFontSize("14px")
                .setFontWeight("bold")
            );
            
            host.pane4.append((new linb.UI.SButton)
                .setHost(host,"btnAqua")
                .setLeft(460)
                .setTop(17)
                .setWidth(100)
                .setCaption("aqua")
                .onClick("_btnaqua_clk")
            );
            
            host.pane4.append((new linb.UI.SButton)
                .setHost(host,"btnVista")
                .setLeft(600)
                .setTop(17)
                .setWidth(100)
                .setCaption("vista")
                .onClick("_btnvista_clk")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        btndefault_clk:function(){
            linb.UI.setTheme('default');
        }, 
        _btnaqua_clk:function(){
            linb.UI.setTheme('aqua');
        }, 
        _btnvista_clk:function(){
            linb.UI.setTheme('vista');
        }, 
        _sbutton11_onclick:function (profile, e, src, value) {
            linb.UI.Dialog.alert('alert window', 'alert');
        }, 
        _sbutton12_onclick:function (profile, e, src, value) {
            linb.UI.Dialog.confirm('confirm?', 'confirm');
        }, 
        _sbutton13_onclick:function (profile, e, src, value) {
            linb.UI.Dialog.prompt('specify','prompt');
        }, 
        _sbutton14_onclick:function (profile, e, src, value) {
            linb.UI.Dialog.pop('pop message', 'pop');
        }
    }
});