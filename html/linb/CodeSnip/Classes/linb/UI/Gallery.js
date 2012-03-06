Class('App.linb_UI_Gallery', 'linb.Com',{
    Instance:{
        //base Class for linb.Com
        base:["linb.UI"],
        //requried class for the App
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host = this,
                children = [],
                append = function(child){
                    children.push(child.get(0))
                };
            
            append((new linb.UI.Gallery)
                .setHost(host,"gallery2")
                .setLeft(434)
                .setTop(95)
                .setWidth(270)
                .setHeight(270)
                .setItems([{"id":"a","caption":"itema","image":"img/demo.gif","tips":"item a"},{"id":"b","caption":"itemb","image":"img/demo.gif","tips":"item b"},{"id":"c","caption":"itemc","image":"img/demo.gif","tips":"item c"}])
                .setItemWidth("120")
                .setItemHeight("80")
                .onItemSelected("_gallery2_onitemselected")
            );
            
            append((new linb.UI.Gallery)
                .setHost(host,"gallery4")
                .setLeft(70)
                .setTop(120)
                .setWidth(284)
                .setHeight(167)
                .setItems([{"id":"a","caption":"itema","image":"img/demo.gif","comment":"item a comment"},{"id":"b","caption":"itemb","image":"img/demo.gif","comment":"item b comment"},{"id":"c","caption":"itemc","image":"img/demo.gif","comment":"item c comment"},{"id":"d","caption":"itemd","image":"img/demo.gif","comment":"item d comment"},{"id":"e","caption":"iteme","image":"img/demo.gif","comment":"item e comment"},{"id":"f","caption":"itemf","image":"img/demo.gif","comment":"item f comment"}])
                .setItemWidth("64")
                .setItemHeight("64")
                .onItemSelected("_gallery2_onitemselected")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        _gallery2_onitemselected:function (profile, item, src) {
            return false
        }
    }
});