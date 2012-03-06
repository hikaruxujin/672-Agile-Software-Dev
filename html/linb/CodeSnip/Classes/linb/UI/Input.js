Class('App.linb_UI_Input', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Label)
                .setHost(host,"label13")
                .setLeft(58)
                .setTop(340)
                .setWidth(296)
                .setCaption("Input 'allow' only, using 'beforeFormatCheck' event")
            );
            
            append((new linb.UI.Label)
                .setHost(host,"label10")
                .setLeft(346)
                .setTop(274)
                .setWidth(104)
                .setCaption("integer")
            );
            
            append((new linb.UI.Label)
                .setHost(host,"label7")
                .setLeft(26)
                .setTop(242)
                .setWidth(104)
                .setCaption("email")
            );
            
            append((new linb.UI.Label)
                .setHost(host,"label12")
                .setLeft(346)
                .setTop(306)
                .setWidth(104)
                .setCaption("MM/DD/YYYY")
            );
            
            append((new linb.UI.Label)
                .setHost(host,"label9")
                .setLeft(26)
                .setTop(274)
                .setWidth(104)
                .setCaption("alpha")
            );
            
            append((new linb.UI.Label)
                .setHost(host,"label8")
                .setLeft(346)
                .setTop(242)
                .setWidth(104)
                .setCaption("letter")
            );
            
            append((new linb.UI.Label)
                .setHost(host,"label6")
                .setLeft(10)
                .setTop(178)
                .setWidth(168)
                .setCaption("border/resizer/shadow")
            );
            
            append((new linb.UI.Label)
                .setHost(host,"label11")
                .setLeft(26)
                .setTop(306)
                .setWidth(104)
                .setCaption("number")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div10")
                .setLeft(366)
                .setTop(423)
                .setWidth(260)
                .setHeight(30)
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div9")
                .setLeft(366)
                .setTop(383)
                .setWidth(260)
                .setHeight(30)
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div11")
                .setLeft(74)
                .setTop(380)
                .setWidth(80)
                .setHeight(26)
                .setHtml("Input valid")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div12")
                .setLeft(14)
                .setTop(420)
                .setWidth(140)
                .setHeight(26)
                .setHtml("Input valid (real time)")
            );
            
            append((new linb.UI.Group)
                .setHost(host,"group1")
                .setLeft(74)
                .setTop(460)
                .setWidth(500)
                .setHeight(100)
                .setCaption("mask input")
            );
            
            host.group1.append((new linb.UI.Div)
                .setHost(host,"div14")
                .setLeft(233)
                .setTop(19)
                .setWidth(90)
                .setHeight(20)
                .setHtml("(111) 111-1111")
            );
            
            host.group1.append((new linb.UI.Div)
                .setHost(host,"div13")
                .setLeft(20)
                .setTop(19)
                .setWidth(80)
                .setHeight(20)
                .setHtml("11/11/1111")
            );
            
            host.group1.append((new linb.UI.Div)
                .setHost(host,"div16")
                .setLeft(250)
                .setTop(50)
                .setWidth(80)
                .setHeight(20)
                .setHtml("(111) a-a *$*")
            );
            
            host.group1.append((new linb.UI.Div)
                .setHost(host,"div15")
                .setLeft(20)
                .setTop(50)
                .setWidth(80)
                .setHeight(20)
                .setHtml("~1.11")
            );
            
            host.group1.append((new linb.UI.Input)
                .setHost(host,"iMask")
                .setLeft(100)
                .setTop(19)
                .setTabindex("17")
                .setMask("11/11/1111")
            );
            
            host.group1.append((new linb.UI.Input)
                .setHost(host,"input18")
                .setLeft(330)
                .setTop(19)
                .setTabindex("18")
                .setMask("(111) 111-1111")
            );
            
            host.group1.append((new linb.UI.Input)
                .setHost(host,"input19")
                .setLeft(100)
                .setTop(50)
                .setTabindex("19")
                .setMask("~1.11")
            );
            
            host.group1.append((new linb.UI.Input)
                .setHost(host,"input20")
                .setLeft(330)
                .setTop(50)
                .setTabindex("20")
                .setMask("(111) a-a *$*")
            );
            
            append((new linb.UI.Group)
                .setHost(host,"group2")
                .setLeft(20)
                .setTop(20)
                .setWidth(590)
                .setHeight(150)
                .setCaption("no border")
                .setToggleBtn(false)
            );
            
            host.group2.append((new linb.UI.Label)
                .setHost(host,"label2")
                .setLeft(330)
                .setTop(0)
                .setWidth(104)
                .setCaption("password")
            );
            
            host.group2.append((new linb.UI.Label)
                .setHost(host,"label4")
                .setLeft(10)
                .setTop(96)
                .setWidth(104)
                .setCaption("readonly")
            );
            
            host.group2.append((new linb.UI.Label)
                .setHost(host,"label1")
                .setLeft(10)
                .setTop(0)
                .setWidth(104)
                .setCaption("normal")
            );
            
            host.group2.append((new linb.UI.Label)
                .setHost(host,"label3")
                .setLeft(10)
                .setTop(32)
                .setWidth(104)
                .setCaption("textarea")
            );
            
            host.group2.append((new linb.UI.Label)
                .setHost(host,"label5")
                .setLeft(330)
                .setTop(96)
                .setWidth(104)
                .setCaption("disabled")
            );
            
            host.group2.append((new linb.UI.Input)
                .setHost(host,"input4")
                .setLeft(122)
                .setTop(0)
                .setBorder(false)
                .setValue("normal")
            );
            
            host.group2.append((new linb.UI.Input)
                .setHost(host,"input2")
                .setLeft(442)
                .setTop(0)
                .setTabindex("2")
                .setBorder(false)
                .setType("password")
                .setValue("password")
            );
            
            host.group2.append((new linb.UI.Input)
                .setHost(host,"input3")
                .setLeft(122)
                .setTop(32)
                .setWidth(440)
                .setHeight(48)
                .setTabindex("3")
                .setBorder(false)
                .setMultiLines(true)
                .setValue("textarea")
            );
            
            host.group2.append((new linb.UI.Input)
                .setHost(host,"input6")
                .setLeft(122)
                .setTop(96)
                .setTabindex("4")
                .setBorder(false)
                .setReadonly(true)
                .setValue("readonly")
            );
            
            host.group2.append((new linb.UI.Input)
                .setHost(host,"input1")
                .setDisabled(true)
                .setLeft(442)
                .setTop(90)
                .setTabindex("5")
                .setBorder(false)
                .setValue("disabled")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input7")
                .setTips("border/resizer/shadow")
                .setLeft(186)
                .setTop(180)
                .setWidth(240)
                .setHeight(38)
                .setTabindex("6")
                .setShadow(true)
                .setResizer(true)
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input8")
                .setLeft(138)
                .setTop(242)
                .setTabindex("7")
                .setValueFormat("^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w\\.-]{2,4}$")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input10")
                .setLeft(138)
                .setTop(274)
                .setTabindex("8")
                .setValueFormat("^\\w*$")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input12")
                .setLeft(138)
                .setTop(306)
                .setTabindex("9")
                .setValueFormat("^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input9")
                .setLeft(458)
                .setTop(242)
                .setTabindex("10")
                .setValueFormat("^[a-zA-Z]*$")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input11")
                .setLeft(458)
                .setTop(274)
                .setTabindex("12")
                .setValueFormat("^-?\\d\\d*$")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input13")
                .setLeft(458)
                .setTop(306)
                .setTabindex("13")
                .setValueFormat("^([0-1][0-9])/([0-3][0-9])/([0-9]{4})$")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input5")
                .setLeft(364)
                .setTop(340)
                .setWidth(210)
                .setTabindex("14")
                .beforeFormatCheck("_input5_beforeFormatCheck")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input29")
                .setTips("input number")
                .setLeft(154)
                .setTop(380)
                .setWidth(210)
                .setTabindex("15")
                .setTipsErr("tipsErr : number only")
                .setTipsOK("Yeah")
                .setValueFormat("^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)")
                .setTipsBinder("div9")
            );
            
            append((new linb.UI.Input)
                .setHost(host,"input15")
                .setTips("input number")
                .setLeft(154)
                .setTop(420)
                .setWidth(210)
                .setTabindex("16")
                .setTipsErr("tipsErr : number only")
                .setTipsOK("Yeah")
                .setDynCheck(true)
                .setValueFormat("^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)")
                .setTipsBinder("div10")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _input5_beforeFormatCheck:function (profile, value) {
            return value=='allow';
        }
    }
});