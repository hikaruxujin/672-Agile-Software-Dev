Class('App.linb_UI_Block', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block3")
                .setLeft(320)
                .setTop(60)
                .setBorder(true)
                .setShadow(true)
                .setHtml("shadow")
                .setBorderType("none")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block2")
                .setLeft(170)
                .setTop(60)
                .setBorder(true)
                .setHtml("border")
                .setBorderType("none")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block1")
                .setLeft(50)
                .setTop(60)
            );
            
            host.block1.append(
                (new linb.UI.Button)
                .setHost(host,"button21")
                .setLeft(10)
                .setTop(30)
                .setWidth(80)
                .setCaption("button21")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block4")
                .setLeft(470)
                .setTop(60)
                .setResizer(true)
                .setHtml("resizer")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block6")
                .setLeft(60)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:inset")
                .setBorderType("inset")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block7")
                .setLeft(180)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:outset")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block8")
                .setLeft(300)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:groove")
                .setBorderType("groove")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"block9")
                .setLeft(420)
                .setTop(230)
                .setWidth(110)
                .setHtml("borderType:ridge")
                .setBorderType("ridge")
            );
            
            append(
                (new linb.UI.Block)
                .setHost(host,"ctl_block18")
                .setLeft(650)
                .setTop(220)
                .setIframeAutoLoad("http://www.linb.net")
                .setBorderType("inset")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }
    }
});