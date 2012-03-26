// The default code is a com class (inherited from linb.Com)
Class('{className}', 'linb.Com',{
    // Ensure that all the value of "key/value pair" does not refer to external variables
    Instance:{
        // To initialize instance(e.g. properties)
        initialize : function(){
            // To determine whether or not the com will be destroyed, when the first UI control be destroyed
            this.autoDestroy = true;
            // To initialize properties
            this.properties = {};
        },
        // To initialize internal components (mostly UI controls)
        // *** If you're not a skilled, dont modify this function manually ***
        iniComponents : function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append(
                (new linb.UI.SButton)
                .setHost(host,"ctl_sbutton1")
                .setLeft(130)
                .setTop(70)
                .setCaption("click me")
                .onClick("_ctl_sbutton1_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        },
        // Give a chance to load other com
        iniExComs : function(com, threadid){
        },
        // Give a chance to determine which UI controls will be appended to parent container
        customAppend : function(parent, subId, left, top){
            // "return false" will cause all the internal UI controls will be added to the parent panel
            return false;
        },
        // This instance's events
        events : {},
        _ctl_sbutton1_onclick : function (profile, e, src, value) {
            var uictrl = profile.boxing();
            linb.alert("hi","I'm " + uictrl.getAlias());
        }
    }
});