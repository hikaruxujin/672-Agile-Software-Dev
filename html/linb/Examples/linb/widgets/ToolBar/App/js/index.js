
Class('App', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.PopMenu)
                .setHost(host,"pop")
                .setItems(['item 1', 'item 2', 'item 3'])
            );
            
            append((new linb.UI.Pane)
                .setHost(host,"pane3")
                .setLeft(40)
                .setTop(50)
                .setWidth(700)
                .setHeight(160)
            );
            
            host.pane3.append((new linb.UI.ToolBar)
                .setHost(host,"toolbar5")
            .setItems([{"id":"grp1", "sub":[{"id":"a", "label":"normal button:", "caption":"button"},{"id":"b", "label":"image button:", "caption":"button",image:'img/demo.gif'},  {"id":"c", label:"image only:",image:'img/demo.gif' },{id:'btn',object: new linb.UI.CheckBox({caption:'checkbox'})}]},{"id":"grp2", "sub":[{"id":"d", label:'status button:',"caption":"status", "statusButton":true}, {"id":"e", label:'drop button:',"caption":"drop", "dropButton":true},{"split":true}, {id:'clr',object: new linb.UI.ComboInput({type:'color'})},{"split":true}, {id:'date',object: new linb.UI.ComboInput({type:'date'})},{"split":true}, {id:'date',object: new linb.UI.ComboInput({type:'time'})}]},{id:'grp3',sub:[{id:'radio',object: new linb.UI.ProgressBar({value:75})},{id:'btn',object: new linb.UI.Button({caption:'status button',type:'status'})},{id:'btn2',object: new linb.UI.Button({caption:'drop button',type:'drop'})}]},{id:'grp4',sub:[{id:'radio',object:new linb.UI.RadioBox({width:'auto',height:'auto',items:['radio1','radio2','radio3','radio4']},{onRender:function(prf){
                prf.getRoot().setInlineBlock()
                }})}]}])
                .onClick("_toolbar5_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _toolbar5_onclick:function (profile, item, group, e, src) {
            switch(item.id){
                case 'd':
                    linb.message(item.caption + " was clicked!" + " value was changed to " + item.value);
                break;
                case 'e':
                    this.pop.pop(src);
                break;
                default:
                    linb.message(item.caption + " was clicked!");
            }
        }
    }
});