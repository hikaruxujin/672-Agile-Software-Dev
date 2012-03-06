 new function(){
    var _img_app=linb.getPath('img/','App.gif');
    var _img_widgets=linb.getPath('img/','widgets.gif');
    window.CONF={
        dftLang:'en',
    
        img_app:_img_app,
        img_widgets:_img_widgets,
    
        widgets: [
            {id:'linb.UI',caption:'UI Components',group:true, image:_img_app, imagePos:'-64px -48px', sub:[
                {id:'linb.UI.absForm',caption:'Form Elements',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                    //{id:'linb.UI.Tag', caption:'Tag Element', image:_img_widgets, imagePos:'left top'},
                    {id:'linb.UI.Div', caption:'Div Element', image:_img_widgets, imagePos:'-624px top'},
        
                    {id:'linb.UI.Label', caption:'Label', image:_img_widgets, imagePos:'-16px top'},
                    {id:'linb.UI.Link', caption:'Link', image:_img_widgets, imagePos:'-32px top'},
                    {id:'linb.UI.Button', caption:'Button', image:_img_widgets, imagePos:'-48px top'},
                    {id:'linb.UI.CheckBox', caption:'CheckBox', image:_img_widgets, imagePos:'-96px top'},
                    {id:'linb.UI.Input', caption:'Input', image:_img_widgets, imagePos:'-112px top'},
                    {id:'linb.UI.List', caption:'List', image:_img_widgets, imagePos:'-192px top'},
                    {id:'linb.UI.ComboInput', caption:'ComboInput', image:_img_widgets, imagePos:'-144px top'},
                    {id:'linb.UI.RichEditor', caption:'RichEditor', image:_img_widgets, imagePos:'-128px top'},
                    {id:'linb.UI.ProgressBar', caption:'ProgressBar', image:_img_widgets, imagePos:'-608px top'},
        
                    {id:'linb.UI.Slider', caption:'Slider', image:_img_widgets, imagePos:'-64px -16px'},
                    {id:'linb.UI.TimePicker', caption:'TimePicker', image:_img_widgets, imagePos:'-240px top'},
                    {id:'linb.UI.DatePicker', caption:'DatePicker', image:_img_widgets, imagePos:'-256px top'},
                    {id:'linb.UI.ColorPicker', caption:'ColorPicker', image:_img_widgets, imagePos:'-272px top'},
                    {id:'linb.UI.RadioBox', caption:'RadioBox', image:_img_widgets, imagePos:'-208px top'},
                    {id:'linb.UI.StatusButtons', caption:'StatusButtons', image:_img_widgets, imagePos:'-16px -16px'},
                    {id:'linb.UI.Group', caption:'Group', image:_img_widgets, imagePos:'-224px top'}
                ]},
                {id:'linb.UI.absContainer',caption:'Containers',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                    {id:'linb.UI.Pane', caption:'Pane', image:_img_widgets, imagePos:'-288px top'},
                    {id:'linb.UI.Panel', caption:'Panel', image:_img_widgets, imagePos:'-672px top'},
                    {id:'linb.UI.Block', caption:'Block', image:_img_widgets, imagePos:'-304px top'},
                    {id:'linb.UI.Layout', caption:'Layout', image:_img_widgets, imagePos:'-336px top'},
        
                    {id:'linb.UI.Tabs', caption:'Tabs', image:_img_widgets, imagePos:'-352px top'},
        
                    {id:'linb.UI.Stacks', caption:'Stacks', image:_img_widgets, imagePos:'-368px top'},
                    {id:'linb.UI.ButtonViews', caption:'ButtonViews', image:_img_widgets, imagePos:'-384px top'},
                    {id:'linb.UI.Dialog', caption:'Dialog', image:_img_widgets, imagePos:'-320px top'}
                ]},
                {id:'linb.UI.absNavigator',caption:'Navigators',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                    {id:'linb.UI.PageBar', caption:'PageBar', image:_img_widgets, imagePos:'-48px -16px'},
        
                    {id:'linb.UI.PopMenu', caption:'PopMenu', image:_img_widgets, imagePos:'-400px top'},
                    {id:'linb.UI.MenuBar', caption:'MenuBar', image:_img_widgets, imagePos:'-416px top'},
                    {id:'linb.UI.ToolBar', caption:'ToolBar', image:_img_widgets, imagePos:'-432px top'},
                    {id:'linb.UI.Gallery', caption:'Gallery', image:_img_widgets, imagePos:'-448px top'},
                    {id:'linb.UI.TreeBar', caption:'TreeBar', image:_img_widgets, imagePos:'-464px top'},
                    {id:'linb.UI.TreeView', caption:'TreeView', image:_img_widgets, imagePos:'-464px -16px'}
                ]},
                {id:'linb.UI.absAdv',caption:'Advanced',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                    {id:'linb.UI.TextEditor', caption:'TextEditor', image:_img_widgets, imagePos:'-128px top'},
                    {id:'linb.UI.Range', caption:'Range', image:_img_widgets, imagePos:'left -16px'},
                    {id:'linb.UI.Poll', caption:'Poll', image:_img_widgets, imagePos:'-208px -16px'},
                    {id:'linb.UI.FoldingList', caption:'FoldingList', image:_img_widgets, imagePos:'-32px -16px'},
                    {id:'linb.UI.Calendar', caption:'Calendar', image:_img_widgets, imagePos:'-496px top'},
                    {id:'linb.UI.TimeLine', caption:'TimeLine', image:_img_widgets, imagePos:'-528px top'}
                ]}
            ]},
            {id:'tech.UI', caption:'UI Related', group:true, image:_img_app, imagePos:'-64px -48px', sub:[
                {id:'tech.UI.createUI',caption:'to create widget',image:_img_app, imagePos:'-48px -64px'},
                {id:'tech.UI.showUI',caption:'to show widget',image:_img_app, imagePos:'-48px -64px'},
                {id:'tech.UI.event',caption:'Events',image:_img_app, imagePos:'0 -32px'},
                {id:'tech.UI.ca',caption:'Custom Appearances',image:_img_app, imagePos:'-48px -64px'},
                {id:'tech.UI.cb',caption:'Custom Behaviors',image:_img_app, imagePos:'-48px -64px'},
                {id:'tech.UI.cc',caption:'Custom Class',image:_img_app, imagePos:'-48px -64px'},
                {id:'tech.UI.cf',caption:'Custom Functions',image:_img_app, imagePos:'-48px -64px'}
            ]},
            {id:'tech.form', caption:'Form Related', group:true, image:_img_app, imagePos:'-64px -48px', sub:[
                {id:'tech.form.v', caption:'Validators', group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                    {id:'tech.form.v1',caption:'Base',image:_img_app, imagePos:'-48px -64px'},
                    {id:'tech.form.v2',caption:'Tips Binder',image:_img_app, imagePos:'-48px -64px'},
                    {id:'tech.form.v3',caption:'Dynamic',image:_img_app, imagePos:'-48px -64px'}
                 ]},
                {id:'tech.form.f', caption:'formatters', group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                    {id:'tech.form.f1',caption:'formater 1',image:_img_app, imagePos:'-48px -64px'},
                    {id:'tech.form.f2',caption:'formater 2',image:_img_app, imagePos:'-48px -64px'}
                 ]}
            ]},
            {id:'snip', caption:'Common Funcions', group:true, image:_img_app, imagePos:'-64px -48px', sub:[
                {id:'snip.animator',caption:'Animator',image:_img_app, imagePos:'-48px -64px'},
                {id:'snip.tooltips',caption:'ToolTips',image:_img_app, imagePos:'-48px -64px'},
                {id:'snip.serialize',caption:'(un)serialize',image:_img_app, imagePos:'-48px -64px'}
            ]}/*,    
            {id:'app', caption:'Application Related', group:true, image:_img_app, imagePos:'-64px -48px', sub:[
                {id:'app.2',caption:'Skinable',image:_img_app, imagePos:'-48px -64px'},
                {id:'app.3',caption:'Locale',image:_img_app, imagePos:'-48px -64px'},
                {id:'app.5',caption:'Data Exchange',image:_img_app, imagePos:'-48px -64px'}
            ]},
            {id:'demo.app', caption:'Demos', group:true, image:_img_app, imagePos:'-64px -48px', sub:[
                {id:'demo.app.1',caption:'1',image:_img_app, imagePos:'-48px -64px'},
                {id:'demo.app.2',caption:'2',image:_img_app, imagePos:'-48px -64px'}
            ]}*/
        ]
    };
};