Class('App.tech_UI_createUI', 'linb.Com',{
    Instance:{
        events:{onReady:'_onready'}, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.ComboInput)
                .setHost(host,"ciMethods")
                .setLeft(140)
                .setTop(110)
                .setWidth(470)
                .setHeight(160)
                .setType("helpinput")
                .setMultiLines(true)
                .setItems([{"id":"item a", "caption":"item a"}, {"id":"item b", "caption":"item b"}, {"id":"item c", "caption":"item c"}, {"id":"item d", "caption":"item d"}])
            );
            
            append((new linb.UI.Div)
                .setHost(host,"divLabel")
                .setLeft(140)
                .setTop(10)
                .setWidth(470)
                .setHeight(40)
                .setHtml('How to create linb.UI components?')
            );

            append((new linb.UI.Pane)
                .setHost(host,"pane")
                .setLeft(140)
                .setTop(40)
                .setWidth(470)
                .setHeight(40)
                .setCustomStyle({"KEY":"border:solid 1px #ccc"})
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button5")
                .setLeft(330)
                .setTop(360)
                .setCaption("Create Widget")
                .onClick("_clk")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _onready:function(){
            SPA=this;
            var code1='SPA.pane.append(\n\n    new linb.UI.Button(\n        {caption:"btn1",left:10,top:10},\n        {onClick:function(){alert("btn1")}}\n    ) \n\n);';
            this.ciMethods.setItems([
                {
                    id:code1,
                    caption:'1. new linb.UI.Button(properties,events,host,children,CS,CC,CB,CF)'
                },
                {
                    id:'SPA.pane.append(\n\n    new linb.UI.Button()\n    .setCaption("btn2")\n        .setLeft(10)\n        .setTop(10)\n        .onClick(function(){alert("btn2")}\n    ) \n\n);',
                    caption:'2. new linb.UI.Button().setXXX...'
                },
                {
                    id:'SPA.pane.append(\n\n    linb.create("Button",\n        {caption:"btn3",left:10,top:10},\n        {onClick:function(){alert("btn3")}}\n    ) \n\n);',
                    caption:'3. linb.create()'
                }
            ])
            .setValue(code1);
        }, 
        _clk:function(){
            var str=this.ciMethods.getUIValue();
            SPA.pane.removeChildren().setHtml('');
            try{
                eval(str);
            }catch(e){
                alert('Cant execute your code, check it first!');
                return;
            }
        }
    }
});