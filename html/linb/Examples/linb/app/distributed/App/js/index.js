
Class('App', 'linb.Com',{
    Instance:{
        events:{"onReady":"_onready"}, 
        _onready:function () {
            SPA=this;
            //set com factory profile
            linb.ComFactory.setProfile(CONF.ComFactoryProfile);
        }, 
        _button9_onclick:function (profile, e, value) {
            var host=this;
            linb.ComFactory.getCom('module1',function(){
                var ns=this;
                host.div16.append(ns.getUIComponents(),false);
            });
        }, 
        _button10_onclick:function (profile, e, value) {
            var host=this;
            linb.ComFactory.getCom('module2',function(){
                var ns=this;
                host.div17.append(ns.panelMain,false);
            });
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Div)
                .setHost(host,"div21")
                .setLeft(100)
                .setTop(20)
                .setWidth(370)
                .setHeight(30)
                .setHtml("Loading code from outside dynamically!")
                .setCustomStyle({"KEY":"font-weight:bold;font-size:14px;"})
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button10")
                .setLeft(470)
                .setTop(340)
                .setCaption("Load Module2")
                .onClick("_button10_onclick")
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div16")
                .setLeft(100)
                .setTop(100)
                .setWidth(268)
                .setHeight(210)
                .setCustomStyle({"KEY":"border:dashed 1px;"})
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div17")
                .setLeft(390)
                .setTop(100)
                .setWidth(268)
                .setHeight(210)
                .setCustomStyle({"KEY":"border:dashed 1px;"})
            );
            
            append((new linb.UI.Div)
                .setHost(host,"div20")
                .setLeft(100)
                .setTop(50)
                .setWidth(380)
                .setHeight(40)
                .setHtml("Get Module code from out file on the fly, and append module UI to the current page")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button9")
                .setLeft(160)
                .setTop(340)
                .setCaption("Load module1")
                .onClick("_button9_onclick")
            );
            
            append((new linb.UI.Button)
                .setHost(host,"button36")
                .setLeft(250)
                .setTop(410)
                .setWidth(160)
                .setCaption("Load Module3 manually")
                .onClick("_button36_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _button36_onclick:function (profile, e, value) {
            var host=this;
            linb.ComFactory.newCom('App.Module3' ,function(){
                this.show(linb([document.body]));
            });
        }
    }
});