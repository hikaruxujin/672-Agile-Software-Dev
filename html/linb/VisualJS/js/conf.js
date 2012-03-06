new function(){
    var _imgdemo='img/demo.gif';
    var _imgno='img/error.gif';
    var _img_app=linb.getPath('img/','App.gif');
    var _img_widgets=linb.getPath('img/','widgets.gif');
    var _items=[{id:'a',caption:'item a',image:_imgdemo}, {id:'b',caption:'item b',image:_imgdemo}, {id:'c',caption:'item c',image:_imgdemo}, {id:'d',caption:'item d',image:_imgdemo,disabled:true}];
    var _items2=[{id:'a',caption:'status 1'}, {id:'b',caption:'status 2'}, {id:'c',caption:'status 3'}, {id:'d',caption:'status 4'}];
    var _items3=[{id:'a',caption:'page1',image:_imgdemo}, {id:'b',caption:'page2',image:_imgdemo}, {id:'c',caption:'page3',image:_imgdemo}, {id:'d',caption:'page4',image:_imgdemo,closeBtn:true,optBtn:true,popBtn:true}];
    
    window.CONF={
        dftLang:'en',
        localeItems:[{"id":"en", "caption":"$VisualJS.en"}, {"id":"cn", "caption":"$VisualJS.cn"}, {"id":"tw", "caption":"$VisualJS.tw"}, {"id":"ja", "caption":"$VisualJS.ja"}],

        img_app:_img_app,
        img_widgets:_img_widgets,

        phpPath:linb.ini.appPath + 'request.php',
        testphpPath:linb.ini.appPath + 'debug.php',

        path_opendir:"../CodeSnip/Classes/",
        path_apidir:"../API/",
        
        fileExts:/\.(jpg|png|gif|css|txt|swf)$/,
        fileNames:/[\w-]+\.[\w]+$/,
        
        prjPath:'projects/',
        requestKey:'VisualJS',
        requestKey2:'VisualJS2',

        path_link:"http://www.linb.net",
        //path_video:'http://linb.googlecode.com/files/video.html',
        path_simple:'UIBuilder.html',
        path_forum:'http://www.sigmawidgets.com/forum/',
        path_download:'http://code.google.com/p/linb/downloads/list',
        path_gpllicence:'http://www.gnu.org/licenses/lgpl-3.0-standalone.html',
        path_licence:'http://www.sigmawidgets.com/license.html',
        path_purchase:'http://www.sigmawidgets.com/buy_now2.html',
        path_video:"../video/simple.html",


        mapWidgets:{},
        widgets: [
            {id:'linb.Data',key:'linb.Data',caption:'Data', group:true, image:'img/App.gif', imagePos:'-48px -48px', sub:[
                {id:'linb.DataBinder',key:'linb.DataBinder', caption:'DataBinder', image:'img/widgets.gif', imagePos:'-640px top', draggable:true}
            ]},
            {id:'linb.UI.absForm1',key:'linb.UI.absForm1',caption:'Simple Elements',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                {id:'linb.UI.Tag',key:'linb.UI.Tag', caption:'Tag Element', image:_img_widgets, imagePos:'left top', draggable:true},
                {id:'linb.UI.Span',key:'linb.UI.Span', caption:'Span Element', image:_img_widgets, imagePos:'-544px -16px', draggable:true},
                {id:'linb.UI.Div',key:'linb.UI.Div', caption:'Div Element', image:_img_widgets, imagePos:'-544px top', draggable:true}
            ]},
            {id:'linb.UI.absForm',key:'linb.UI.absForm',caption:'Form Elements',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                {id:'linb.UI.Link',key:'linb.UI.Link', caption:'Link', image:_img_widgets, imagePos:'-32px top', draggable:true},
                {id:'linb.UI.SLabel',key:'linb.UI.SLabel', caption:'Label', image:_img_widgets, imagePos:'-16px top', draggable:true,
                    sub:[
                        {id:'linb.UI.Label',key:'linb.UI.Label', caption:'Advanced Label', image:_img_widgets, imagePos:'-16px top', draggable:true}
                    ]
                },
                {id:'linb.UI.SButton',key:'linb.UI.SButton', caption:'Button', image:_img_widgets, imagePos:'-48px top', draggable:true,
                    sub:[
                        {id:'linb.UI.Button',key:'linb.UI.Button', caption:'Advanced Button', image:_img_widgets, imagePos:'-48px top', draggable:true,
                            sub:[
                                {id:'linb.UI.Button0',key:'linb.UI.Button', caption:'Image Button', draggable:true,
                                    iniProp:{image:_imgdemo}
                                },
                                {id:'linb.UI.Button1',key:'linb.UI.Button', caption:'Status Button', draggable:true,
                                    iniProp:{type:'status'}
                                },
                                {id:'linb.UI.Button2',key:'linb.UI.Button', caption:'Dropable Button', draggable:true,
                                    iniProp:{type:'drop'}
                                }
                            ]
                        }                    
                    ]
                },
                {id:'linb.UI.SCheckBox',key:'linb.UI.SCheckBox', caption:'CheckBox', image:_img_widgets, imagePos:'-96px top', draggable:true,
                    sub:[
                        {id:'linb.UI.CheckBox',key:'linb.UI.CheckBox', caption:'Advanced CheckBox', image:_img_widgets, imagePos:'-96px top', draggable:true}
                        ]
                },
                {id:'linb.UI.Input',key:'linb.UI.Input', caption:'Input', image:_img_widgets, imagePos:'-112px top', draggable:true,sub:[
                    {
                        id:'linb.UI.Input1',key:'linb.UI.Input', caption:'Password Input', draggable:true,
                        iniProp:{type:'password',value:'pwd'}
                    },
                    {
                        id:'linb.UI.Input2',key:'linb.UI.Input', caption:'Text Area', draggable:true,
                        iniProp:{multiLine:true,height:120}
                    },
                    {
                        id:'linb.UI.Input3',key:'linb.UI.Input', caption:'Mask Input', draggable:true,
                        iniProp:{mask:"u-11-ll-aa(**)"}
                    },
                    {
                        id:'linb.UI.Input4',key:'linb.UI.Input', caption:'Left Label', draggable:true,
                        iniProp:{width:240,labelSize:120}
                    },
                    {
                        id:'linb.UI.Input5',key:'linb.UI.Input', caption:'Top Label', draggable:true,
                        iniProp:{labelSize:20, labelPos:'top', labelHAlign:'left', height:44}
                    }
                ]},
                {id:'linb.UI.ComboInput',key:'linb.UI.ComboInput', caption:'ComboInput', image:_img_widgets, imagePos:'-144px top', draggable:true,
                    iniProp:{items:_.copy(_items)}, sub:[
                    {
                        id:'linb.UI.ComboInput1',key:'linb.UI.ComboInput', caption:'Left Label', draggable:true,
                        iniProp:{width:240,labelSize:120,items:_.copy(_items)}
                    },
                    {
                        id:'linb.UI.ComboInput2',key:'linb.UI.ComboInput', caption:'Top Label', draggable:true,
                        iniProp:{labelSize:20, labelPos:'top', items:_.copy(_items),labelHAlign:'left', height:44}
                    },
                    {
                        id:'linb.UI.ComboInput3',key:'linb.UI.ComboInput', caption:'Normal Input', draggable:true,
                        iniProp:{type:'none', items:_.copy(_items)}
                    },
                    {
                        id:'linb.UI.ComboInput4',key:'linb.UI.ComboInput', caption:'Combo Input', draggable:true,
                        iniProp:{type:'combobox', items:_.copy(_items)}
                    },
                    {
                        id:'linb.UI.ComboInput5',key:'linb.UI.ComboInput', caption:'Drop List Input', draggable:true,
                        iniProp:{type:'listbox',items:_.copy(_items)}
                    },
                    {
                        id:'linb.UI.ComboInput6',key:'linb.UI.ComboInput', caption:'Help Input', draggable:true,
                        iniProp:{type:'helpinput',items:[{id:'item 1 text',caption:'item 1'},{id:'item 2 text',caption:'item 2'}]}
                    },
                    {
                        id:'linb.UI.ComboInput7',key:'linb.UI.ComboInput', caption:'Currency Input', draggable:true,
                        iniProp:{type:'currency'}
                    },
                    {
                        id:'linb.UI.ComboInput8',key:'linb.UI.ComboInput', caption:'Number Input', draggable:true,
                        iniProp:{type:'number'}
                    },
                    {
                        id:'linb.UI.ComboInput9',key:'linb.UI.ComboInput', caption:'Spinner', draggable:true,
                        iniProp:{type:'spin'}
                    },
                    {
                        id:'linb.UI.ComboInput10',key:'linb.UI.ComboInput', caption:'Uploader', draggable:true,
                        iniProp:{type:'upload'}
                    },
                    {
                        id:'linb.UI.ComboInput11',key:'linb.UI.ComboInput', caption:'Getter', draggable:true,
                        iniProp:{type:'getter'}
                    },
                    {
                        id:'linb.UI.ComboInput12',key:'linb.UI.ComboInput', caption:'Command Box', draggable:true,
                        iniProp:{type:'cmdbox'}
                    },
                    {
                        id:'linb.UI.ComboInput13',key:'linb.UI.ComboInput', caption:'Pop Box', draggable:true,
                        iniProp:{type:'popbox'}
                    },
                    {
                        id:'linb.UI.ComboInput14',key:'linb.UI.ComboInput', caption:'Date Picker', draggable:true,
                        iniProp:{type:'date'}
                    },
                    {
                        id:'linb.UI.ComboInput15',key:'linb.UI.ComboInput', caption:'Time Picker', draggable:true,
                        iniProp:{type:'time'}
                    },
                    {
                        id:'linb.UI.ComboInput16',key:'linb.UI.ComboInput', caption:'Date Time Picker', draggable:true,
                        iniProp:{type:'datetime'}
                    },
                    {
                        id:'linb.UI.ComboInput17',key:'linb.UI.ComboInput', caption:'ColorPicker', draggable:true,
                        iniProp:{type:'color'}
                    },
                    {
                        id:'linb.UI.ComboInput18',key:'linb.UI.ComboInput', caption:'With Save Button', draggable:true,
                        iniProp:{commandBtn:'save'}
                    }
                ]},
                {id:'linb.UI.List',key:'linb.UI.List', caption:'List', image:_img_widgets, imagePos:'-192px top', draggable:true, 
                    iniProp:{
                        items:_.copy(_items), value:'a'
                    },
                    sub:[
                    {
                        id:'linb.UI.List1',key:'linb.UI.List', caption:'Multi Mode', draggable:true,
                        iniProp:{selMode:'multibycheckbox', items:_.copy(_items), value:'a'}
                    }
                ]},
                {id:'linb.UI.RichEditor',key:'linb.UI.RichEditor', caption:'RichEditor', image:_img_widgets, imagePos:'-128px top', draggable:true},
                {id:'linb.UI.ProgressBar',key:'linb.UI.ProgressBar', caption:'ProgressBar', image:_img_widgets, imagePos:'-608px top', draggable:true},
                {id:'linb.UI.Slider',key:'linb.UI.Slider', caption:'Slider', image:_img_widgets, imagePos:'-63px -16px', draggable:true, 
                    iniProp:{isRange:false},sub:[
                        {id:'linb.UI.Slider1',key:'linb.UI.Slider', caption:'Range Slider', draggable:true, 
                            iniProp:{value:'0:50'}
                        },
                        {id:'linb.UI.Slider2',key:'linb.UI.Slider', caption:'Vertical Slider', draggable:true, 
                            iniProp:{isRange:false, type:'vertical', width:50, height: 200}
                        }
                ]},
                {id:'linb.UI.TimePicker',key:'linb.UI.TimePicker', caption:'TimePicker', image:_img_widgets, imagePos:'-240px top', draggable:true},
                {id:'linb.UI.DatePicker',key:'linb.UI.DatePicker', caption:'DatePicker', image:_img_widgets, imagePos:'-256px top', draggable:true,sub:[
                        {id:'linb.UI.DatePicker1',key:'linb.UI.DatePicker', caption:'DateTime Picker', draggable:true,
                            iniProp:{
                                timeInput:true
                            }
                        }
                    ]
                },
                {id:'linb.UI.ColorPicker',key:'linb.UI.ColorPicker', caption:'ColorPicker', image:_img_widgets, imagePos:'-272px top', draggable:true},
                {id:'linb.UI.RadioBox',key:'linb.UI.RadioBox', caption:'RadioBox', image:_img_widgets, imagePos:'-208px top', draggable:true,
                    iniProp:{
                        items:_.copy(_items), value:'a'
                    },sub:[
                        {id:'linb.UI.RadioBox1',key:'linb.UI.RadioBox', caption:'CheckBox Style', draggable:true,
                            iniProp:{
                                items:_.copy(_items), value:'a',
                                checkBox:true,
                                selMode:"multibycheckbox"
                            }
                        }
                    ]
                },
                {id:'linb.UI.StatusButtons',key:'linb.UI.StatusButtons', caption:'StatusButtons', image:_img_widgets, imagePos:'-16px -16px', draggable:true,
                    iniProp:{items:_.copy(_items2), itemLinker:"none", borderType:'none', itemMargin:'2px 4px', itemWidth: 50, width: 280, height: 30, value:'a'}, sub:[
                        {id:'linb.UI.StatusButtons1',key:'linb.UI.StatusButtons', caption:'With Linker', draggable:true,
                        iniProp:{width: 280, height: 30, items:_.copy(_items2), value:'a'}}
                    ]
                },
                {id:'linb.UI.Group',key:'linb.UI.Group', caption:'Group', image:_img_widgets, imagePos:'-224px top', draggable:true,
                    iniProp:{toggleBtn:false}, sub:[
                        {id:'linb.UI.Group1',key:'linb.UI.Group', caption:'Foldable Group', draggable:true}
                ]}
            ]},
            {id:'linb.UI.',key:'linb.UI.absContainer',caption:'Containers',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                {id:'linb.UI.Pane',key:'linb.UI.Pane', caption:'Pane', image:_img_widgets, imagePos:'-288px top', draggable:true,
                    sub:[
                        {id:'linb.UI.Pane1',key:'linb.UI.Pane', caption:'Relative Pane',draggable:true,
                            customRegion:1,
                            iniProp:{dock:'width',position:'relative', left:'auto', top:'auto',width:'auto',height:100}
                        }
                    ]
                },
                {id:'linb.UI.Block',key:'linb.UI.Block', caption:'Block', image:_img_widgets, imagePos:'-304px top', draggable:true,
                    sub:[
                        {id:'linb.UI.Block1',key:'linb.UI.Block', caption:'Relative Block',draggable:true,
                           customRegion:1,
                           iniProp:{dock:'width',position:'relative', left:'auto', top:'auto',width:'auto',height:100}
                        }
                    ]
                },
                {id:'linb.UI.Panel',key:'linb.UI.Panel', caption:'Panel', image:_img_widgets, imagePos:'-672px top', draggable:true,sub:[
                    {
                        id:'linb.UI.Panel1',key:'linb.UI.Panel', caption:'Relative Panel',  draggable:true,
                        customRegion:1,
                        iniProp:{dock:'width',position:'relative', left:'auto', top:'auto',width:'auto',height:200,toggleBtn:true,closeBtn:true,refreshBtn:true}
                    },
                    {
                        id:'linb.UI.Panel2',key:'linb.UI.Panel', caption:'Foldable Panel',  draggable:true,
                        iniProp:{dock:'none',width:200,height:200,toggleBtn:true,closeBtn:true,refreshBtn:true}
                    }                
                ]},
                {id:'linb.UI.Layout',key:'linb.UI.Layout', caption:'Layout', image:_img_widgets, imagePos:'-336px top', draggable:true,
                    iniProp:{
                        items:[{id:'before',pos:'before'},{id:'main'},{id:'after',pos:'after'}]
                    }, sub:[
                    {
                        id:'linb.UI.Layout1',key:'linb.UI.Layout', caption:'Horizontal One',  draggable:true,
                        iniProp:{
                            type:'horizontal',
                            items:[{id:'before',pos:'before'},{id:'main'},{id:'after',pos:'after',cmd:false}]
                        }
                    }   
                ]},

                {id:'linb.UI.Tabs',key:'linb.UI.Tabs', caption:'Tabs', image:_img_widgets, imagePos:'-352px top', draggable:true,
                    iniProp:{
                        items:_.copy(_items3), value:'a'
                    }
                },
                {id:'linb.UI.Stacks',key:'linb.UI.Stacks', caption:'Stacks', image:_img_widgets, imagePos:'-368px top', draggable:true,
                    iniProp:{
                        items:_.copy(_items3), value:'a'
                    }
                },
                {id:'linb.UI.ButtonViews',key:'linb.UI.ButtonViews', caption:'ButtonViews', image:_img_widgets, imagePos:'-384px top', draggable:true,
                    iniProp:{
                        items:_.copy(_items3), barSize:28, value:'a'
                    },sub:[
                        {id:'linb.UI.ButtonViews2',key:'linb.UI.ButtonViews', caption:'Left Bar', draggable:true,
                        iniProp:{
                            barLocation:'left',items:_.copy(_items3), barSize:140, value:'a'
                        }},
                        {id:'linb.UI.ButtonViews3',key:'linb.UI.ButtonViews', caption:'Right Bar', draggable:true,
                        iniProp:{
                            barLocation:'right',items:_.copy(_items3), barSize:140, value:'a'
                        }},
                        {id:'linb.UI.ButtonViews4',key:'linb.UI.ButtonViews', caption:'Bottom Bar', draggable:true,
                        iniProp:{
                            barLocation:'bottom',items:_.copy(_items3), barSize:28, value:'a'
                        }}
                    ]
                },
                {id:'linb.UI.Dialog',key:'linb.UI.Dialog', caption:'Dialog', image:_img_widgets, imagePos:'-320px top', draggable:true}
            ]},
            {id:'linb.UI.absNavigator',key:'linb.UI.absNavigator',caption:'Navigators',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.PageBar',key:'linb.UI.PageBar', caption:'PageBar', image:_img_widgets, imagePos:'-48px -16px', draggable:true, sub:[
                        {id:'linb.UI.PageBar2',key:'linb.UI.PageBar', caption:'Custom', draggable:true,
                            iniProp:{value:"1:5:10", textTpl:'[*]', caption:''}
                        }
                    ]
                },

                {id:'linb.UI.PopMenu',key:'linb.UI.PopMenu', caption:'PopMenu', image:_img_widgets, imagePos:'-400px top', draggable:true,
                    iniProp:{
                        items:_items
                    }
                },
                {id:'linb.UI.MenuBar',key:'linb.UI.MenuBar', caption:'MenuBar', image:_img_widgets, imagePos:'-416px top', draggable:true,
                    iniProp:{
                        items:[
                          {"id":"menu1", "sub":[{"id":"normal", "caption":"normal"},
                            {"id":"disabled", "caption":"disabled", "disabled":true}, 
                            {"id":"image", "caption":"image", image:_imgdemo}, 
                            {"type":"split"}, 
                            {"id":"checkbox 1", "caption":"checkbox 1", "type":"checkbox"}, 
                            {"id":"checkbox 2", "caption":"checkbox 2", "type":"checkbox"}], "caption":"menu1"},
                          {"id":"menu2", "sub":[{"id":"sub menu 1", "caption":"sub menu 1", add:'[Ctrl+F]', 
                            "sub":[{id:"sub 1",type:"radiobox"}, 
                                 {id:"sub 2",type:"radiobox"},
                                 {id:"sub 3"}
                            ]}, 
                            {"id":"sub menu 2", "caption":"sub menu 2", add:'[Ctrl+T]', 
                             "sub":["sub 3", "sub 4"]}]}
                        ]
                    }
                },
                {id:'linb.UI.ToolBar',key:'linb.UI.ToolBar', caption:'ToolBar', image:_img_widgets, imagePos:'-432px top', draggable:true,
                    iniProp:{
                        items:[
                            {id:'grp1',sub:[{id:'a1',caption:'button'}, {id:'a2',type:'split'}, {id:'a3',caption:'drop button', dropButton:true}, {id:'a4',caption:'status button', statusButton:true}]}, 
                            {id:'grp2',sub:[{id:'b1',image:_imgdemo},{id:'b2',caption:'image button',label:"label:",image:_imgdemo}]}
                        ]
                    }
                },
                {id:'linb.UI.IconList',key:'linb.UI.IconList', caption:'IconList', image:_img_widgets, imagePos:'-384px top', draggable:true,
                    iniProp:{
                        items:_.copy(_items), value:'a'
                    }
                },
                {id:'linb.UI.Gallery',key:'linb.UI.Gallery', caption:'Gallery', image:_img_widgets, imagePos:'-448px top', draggable:true,
                    iniProp:{
                        items:_.copy(_items), value:'a'
                    }
                },
                {id:'linb.UI.TreeBar',key:'linb.UI.TreeBar', caption:'TreeBar', image:_img_widgets, imagePos:'-464px top', draggable:true,
                    iniProp:{
                        items:[{id:'node1',sub:['node11', {id:'node12',image:_imgdemo}, 'node13', 'node14']}, {id:'node2',sub:['node21', 'node22', 'node23', 'node24']}]
                    }, sub:[
                        {
                            id:'linb.UI.TreeBar1',key:'linb.UI.TreeBar', caption:'Multi Mode', draggable:true,
                            iniProp:{
                                group:true,
                                selMode:"multibycheckbox",
                                items:[{id:'node1',sub:['node11', {id:'node12',image:_imgdemo}, 'node13', 'node14']}, {id:'node2',sub:['node21', 'node22', 'node23', 'node24']}]
                            }
                        }
                    ]
                },
                {id:'linb.UI.TreeView',key:'linb.UI.TreeView', caption:'TreeView', image:_img_widgets, imagePos:'-464px -16px', draggable:true,
                    iniProp:{
                        items:[{id:'node1',sub:['node11', {id:'node12',image:_imgdemo}, 'node13', 'node14']}, {id:'node2',sub:['node21', 'node22', 'node23', 'node24']}]
                    }
                },
                {id:'linb.UI.TreeGrid',key:'linb.UI.TreeGrid', caption:'TreeGrid', image:_img_widgets, imagePos:'-480px top', draggable:true,
                    iniProp:{
                        rowHandler:true,
                        rowNumbered:true,
                        header: ['col1','col2', 'col3', 'col4'],
                        rows: [['row1 col1','row1 col2','row1 col3','row1 col4'],['row2 col1','row2 col2','row2 col3','row2 col4'],{cells:['row3 col1','row3 col2','row3 col3','row3 col4'],sub:[['sub1','sub2','sub3','sub4']]}]
                    }, sub:[
                        {id:'linb.UI.TreeGrid1',key:'linb.UI.TreeGrid', caption:'Editable', draggable:true,
                        iniProp:{
                            rowHandler:false,
                            rowNumbered:false,
                            editable:true,
                            header: [
                            {id:'label',type:'label'},
                            {id:'input',type:'input'},
                            {id:'combobox',type:'combobox'},
                            {id:'listbox',type:'listbox'},
                            {id:'getter',type:'getter'},
                            {id:'cmdbox',type:'cmdbox'},
                            {id:'popbox',type:'popbox'},
                            {id:'date',type:'date'},
                            {id:'time',type:'time'},
                            {id:'datetime',type:'datetime'},
                            {id:'color',type:'color'},
                            {id:'spin',type:'spin'},
                            {id:'currency',type:'currency'},
                            {id:'number',type:'number'}
                            ],
                            rows: [
                                ['label1','input1','','','','','',new Date,'00:00',new Date,'#ffffff',0.12,23.44,43.23],
                                ['label2','input2','','','','','',new Date,'02:00',new Date,'#f0f0f0',0.13,123.00,56.32],
                                ['label3','input3','','','','','',new Date,'03:00',new Date,'#0f0f0f',0.14,233.55,43.53]
                            ]
                        }
                    }
                ]}
            ]},
            {id:'linb.UI.absMisc',key:'linb.UI.absMisc',caption:'Medias',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.Image',key:'linb.UI.Image', caption:'Image Element', image:_img_widgets, imagePos:'-624px top', draggable:true,
                    iniProp:{
                        src:_imgno
                    }
                },

/*
                {id:'linb.UI.Media',key:'linb.UI.Media', caption:'Media', image:_img_widgets, imagePos:'-576px top', draggable:true},
                {id:'linb.UI.Shape',key:'linb.UI.Shape', caption:'Shape', image:_img_widgets, imagePos:'-544px top', draggable:true},
*/                
                {id:'linb.UI.Flash',key:'linb.UI.Flash', caption:'Flash', image:_img_widgets, imagePos:'-560px -16px', draggable:true},
                {id:'linb.UI.FusionChartFree',key:'linb.UI.FusionChartFree', caption:'FusionChartFree', image:_img_widgets, imagePos:'-560px top', draggable:true},
                {id:'linb.UI.FusionChart3',key:'linb.UI.FusionChart3', caption:'FusionChart3', image:_img_widgets, imagePos:'-560px top', draggable:true}

            ]},
            {id:'linb.UI.absAdv',key:'linb.UI.absAdv',caption:'Advanced',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.TextEditor',key:'linb.UI.TextEditor', caption:'TextEditor', image:_img_widgets, imagePos:'-128px top', draggable:true},
                {id:'linb.UI.Range',key:'linb.UI.Range', caption:'Range', image:_img_widgets, imagePos:'left -16px', draggable:true},
                {id:'linb.UI.TagEditor',key:'linb.UI.TagEditor', caption:'TagEditor', image:_img_widgets, imagePos:'-624px top', draggable:true},
                {id:'linb.UI.Poll',key:'linb.UI.Poll', caption:'Poll', image:_img_widgets, imagePos:'-208px -16px', draggable:true},
                {id:'linb.UI.FoldingList',key:'linb.UI.FoldingList', caption:'FoldingList', image:_img_widgets, imagePos:'-32px -16px', draggable:true,
                    iniProp:{
                        items:[
                            {id:'a',caption:'tab1',title:'title1',text:'text1'},
                            {id:'b',caption:'tab2',title:'title2',text:'text2'},
                            {id:'c',caption:'tab3',title:'title3',text:'text3'},
                            {id:'d',caption:'tab4',title:'title4',text:'text4'},
                            {id:'e',caption:'tab5',title:'title5',text:'text5'}
                        ],
                        cmds:["Refresh","Remove"]
                    }
                },
                {id:'linb.UI.FoldingTabs',key:'linb.UI.FoldingTabs', caption:'FoldingTabs', image:_img_widgets, imagePos:'-624px top', draggable:true,
                    iniProp:{
                        items:[
                        {id:'a',caption:'tab1',message:"normal"}, 
                        {id:'b',caption:'tab2',message:"with image",image:_imgdemo}, 
                        {id:'c',caption:'tab3',message:"height:100",height:100}, 
                        {id:'d',caption:'tab4',message:"with commands",closeBtn:true,optBtn:true,popBtn:true}
                        ],
                        value:'a'
                    }
                },
                {id:'linb.UI.Calendar',key:'linb.UI.Calendar', caption:'Calendar', image:_img_widgets, imagePos:'-496px top', draggable:true},
                {id:'linb.UI.TimeLine',key:'linb.UI.TimeLine', caption:'TimeLine', image:_img_widgets, imagePos:'-528px top', draggable:true,
                    iniProp:{},
                    sub:[
                        {id:'linb.UI.TimeLine1',key:'linb.UI.TimeLine', caption:'Without Bar', draggable:true,
                            iniProp:{showBar:false, showTips:false}
                        },
                        {id:'linb.UI.TimeLine2',key:'linb.UI.TimeLine', caption:'Per 2 Hour', draggable:true,
                            iniProp:{timeSpanKey:'2 h', multiTasks:true}
                        },
                        {id:'linb.UI.TimeLine3',key:'linb.UI.TimeLine', caption:'Per 6 Hour', draggable:true,
                            iniProp:{timeSpanKey:'6 h', multiTasks:true}
                        },
                        {id:'linb.UI.TimeLine4',key:'linb.UI.TimeLine', caption:'Per 1 Week', draggable:true,
                            iniProp:{timeSpanKey:'1 w', multiTasks:true}
                        },
                        {id:'linb.UI.TimeLine5',key:'linb.UI.TimeLine', caption:'Per 1 Month', draggable:true,
                            iniProp:{timeSpanKey:'1 m', multiTasks:true}
                        }
                    ]
                }
            ]}
        ],
        widgets_xprops:{
            'linb.DataBinder':["name","dataSourceType","queryURL","queryArgs","queryModel","requestType","responseType","proxyInvoker"],
            'linb.UI.Tag':['tagKey','tabindex'],
            'linb.UI.Span':['html','tabindex'],
            'linb.UI.Div':['html','tabindex'],
            'linb.UI.Pane':['html','tabindex'],
            'linb.UI.Block':['html','tabindex'],
            'linb.UI.SLabel':['caption','tabindex'],
            'linb.UI.Label':['caption','tabindex'],
            'linb.UI.Link':['caption','onClick','tabindex'],
            'linb.UI.SButton':['caption','onClick','tabindex'],
            'linb.UI.Button':['type','value','caption','onClick','tabindex'],
            'linb.UI.SCheckBox':['value','caption','onChecked','tabindex','dataBinder','dataField'],
            'linb.UI.CheckBox':['value','caption','onChecked','tabindex','dataBinder','dataField'],
            'linb.UI.Input':['value','labelSize','labelCaption','tabindex','dataBinder','dataField'],
            'linb.UI.TextEditor':['value','labelSize','labelCaption','tabindex','dataBinder','dataField'],
            'linb.UI.List':['items','value','onItemSelected','tabindex','dataBinder','dataField'],
            'linb.UI.ComboInput':['type','value','tabindex','dataBinder','dataField'],
            'linb.UI.ProgressBar':['value','tabindex','dataBinder','dataField'],
            'linb.UI.Slider':['value','tabindex','dataBinder','dataField'],
            'linb.UI.Range':['value','tabindex','dataBinder','dataField'],
            'linb.UI.RadioBox':['items','value','onItemSelected','tabindex','dataBinder','dataField'],
            'linb.UI.DatePiker':['value','tabindex','dataBinder','dataField'],
            'linb.UI.TimePiker':['value','tabindex','dataBinder','dataField'],
            'linb.UI.ColorPiker':['value','tabindex','dataBinder','dataField'],
            'linb.UI.Poll':['Items','onGetContent','tabindex'],
            'linb.UI.Group':['caption','tabindex'],
            'linb.UI.Panel':['caption','tabindex'],
            'linb.UI.Layout':['type','items','tabindex'],
            'linb.UI.Tabs':['items','value','onItemSelected','tabindex'],
            'linb.UI.Stacks':['items','value','onItemSelected','tabindex'],
            'linb.UI.ButtonViews':['items','value','onItemSelected','tabindex'],
            'linb.UI.FoldingTabs':['items','value','onItemSelected','tabindex'],
            'linb.UI.StatusButtons':['items','value','onItemClick','tabindex'],
            'linb.UI.FoldingList':['items','onGetContent','tabindex'],
            'linb.UI.IconList':['items','value','onItemSelected','tabindex'],
            'linb.UI.Dialog':['caption','tabindex'],
            'linb.UI.Gallery':['items','value','onItemSelected','tabindex'],
            'linb.UI.PageBar':['value','onClick','tabindex'],
            'linb.UI.PopMenu':['items','onMenuSelected'],
            'linb.UI.MenuBar':['items','onMenuSelected','tabindex'],
            'linb.UI.ToolBar':['items','onClick','tabindex'],
            'linb.UI.TreeBar':['items','value','onItemSelected','onGetContent','tabindex'],
            'linb.UI.TreeView':['items','value','onItemSelected','onGetContent','tabindex'],
            'linb.UI.TreeGrid':['header','rows','value','onClickCell','beforeComboPop','onRowSelected','onGetContent','tabindex'],
            'linb.UI.Image':['src','cursor','tabindex'],
            'linb.UI.Flash':['src','parameters','flashvars','tabindex'],
            'linb.UI.TimeLine':['onGetContent','tabindex'],
            'linb.UI.TagEditor':['tagCount','tagMaxlength','value','tabindex'],
            'linb.UI.FusionChartFree':['tabindex','onFCClick'],
            'linb.UI.FusionChart3':['tabindex','onFCClick']
        },
        ComFactoryProfile:{
            about:{
                cls:'VisualJS.About'
            },
            addFile:{
                cls:'VisualJS.AddFile'
            },
            delFile:{
                cls:'VisualJS.DelFile'
            },
            prjPro:{
                cls:'VisualJS.ProjectPro'
            },
            prjSel:{
                cls:'VisualJS.ProjectSelector'
            },
            
            objEditor:{
                cls:'VisualJS.ObjectEditor'
            } 
        },
        designer_data_fontfamily:[
            {caption:"<span style='font-family:arial,helvetica,sans-serif'>Arial</span>",id:"arial,helvetica,sans-serif"},
            {caption:"<span style='font-family:arial black,avant garde'>Arial Black</span>",id:"arial black,avant garde"},
            {caption:"<span style='font-family:comic sans ms,cursive'>Comic Sans MS</span>",id:"comic sans ms,cursive"},
            {caption:"<span style='font-family:courier new,courier,monospace'>Courier New</span>",id:"courier new,courier,monospace"},
            {caption:"<span style='font-family:georgia,serif'>Georgia</span>",id:"georgia,serif"},
            {caption:"<span style='font-family:impact,chicago'>impact</span>",id:"impact,chicago"},
            {caption:"<span style='font-family:lucida sans unicode,lucida grande,sans-serif'>Lucida Sans Unicode</span>",id:"lucida sans unicode,lucida grande,sans-serif"},
            {caption:"<span style='font-family:tahoma,geneva,sans-serif'>Tahoma</span>",id:"tahoma,geneva,sans-serif"},
            {caption:"<span style='font-family:times new roman,times,serif'>Times New Roman</span>",id:"times new roman,times,serif"},
            {caption:"<span style='font-family:trebuchet ms,helvetica,sans-serif'>Trebuchet MS</span>",id:"trebuchet ms,helvetica,sans-serif"},
            {caption:"<span style='font-family:verdana,geneva,sans-serif'>Verdana</span>",id:"verdana,geneva,sans-serif"},
            {caption:"<span style='font-family:wingdings'>WingDings</span>",id:"wingdings"}
        ],
        designer_data_fontsize:["8pt","10pt","12pt","14pt","18pt","24pt","34pt"],
        designer_data_fontweight:["normal","bolder","bold","lighter","200","100"],
        designer_data_fontstyle:["normal","italic","oblique"],
        designer_data_textdecoration:["none","underline","overline","line-through","blink"],
        designer_data_textalign:["left","right","center","justify"],
        designer_data_cursor:["default","text","pointer","move","crosshair","wait","help","e-resize","ne-resize","nw-resize","n-resize","se-resize","sw-resize","s-resize","w-resize"],
        designer_data_overflow:["auto","visible","hidden","scroll"],
        inplaceedit:{
            "linb.UI.Link":{
                KEY:[0,'getCaption','setCaption']
            },
            "linb.UI.SLabel":{
                KEY:[0,'getCaption','setCaption']
            },
            "linb.UI.Label":{
                KEY:[0,'getCaption','setCaption']
            },
            "linb.UI.SCheckBox":{
                CAPTION:[0,'getCaption','setCaption']
            },
            "linb.UI.CheckBox":{
                CAPTION:[0,'getCaption','setCaption']
            },
            "linb.UI.SButton":{
                KEY:[0,'getCaption','setCaption']
            },
            "linb.UI.Button":{
                CAPTION:[0,'getCaption','setCaption']
            },
            "linb.UI.Group":{
                CAPTION:[0,'getCaption','setCaption']
            },
            "linb.UI.Input":{
                LABEL:[0,'getLabelCaption','setLabelCaption']
            },
            "linb.UI.ComboInput":{
                LABEL:[0,'getLabelCaption','setLabelCaption']
            },
            "linb.UI.PageBar":{
                LABEL:[0,'getCaption','setCaption']
            },
            "linb.UI.Dialog":{
                CAPTION:[0,'getCaption','setCaption']
            },
            "linb.UI.Panel":{
                CAPTION:[0,'getCaption','setCaption']
            },
            
            "linb.UI.List":{
                ITEM:[1,'getItemByDom','updateItem']
            },
            "linb.UI.RadioBox":{
                CAPTION:[1,'getItemByDom','updateItem']
            },
            "linb.UI.StatusButtons":{
                CAPTION:[1,'getItemByDom','updateItem']
            },
            "linb.UI.Gallery":{
                CAPTION:[1,'getItemByDom','updateItem'],
                COMMENT:[1,'getItemByDom','updateItem','comment']
            },
            "linb.UI.Tabs":{
                CAPTION:[1,'getItemByDom','updateItem']
            },
            "linb.UI.Stacks":{
                CAPTION:[1,'getItemByDom','updateItem']
            },
            "linb.UI.ButtonViews":{
                CAPTION:[1,'getItemByDom','updateItem']
            },
            "linb.UI.MenuBar":{
                ITEM:[1,'getItemByDom','updateItem']
            },
            "linb.UI.TreeBar":{
                ITEMCAPTION:[1,'getItemByDom','updateItem']
            },
            "linb.UI.TreeView":{
                ITEMCAPTION:[1,'getItemByDom','updateItem']
            },
            "linb.UI.ToolBar":{
                LABEL:[1,function(prf,node){
                    return prf.SubSerialIdMapItem[prf.getSubId(node.id)];
                },'updateItem','label'],
                BTN:[1,function(prf,node){
                    return prf.SubSerialIdMapItem[prf.getSubId(node.id)];
                },'updateItem']
            },
            "linb.UI.TreeGrid":{
                CELLA:[1,function(prf,node){
                    var subId=prf.getSubId(node.id),o,item={};
                    if(subId.charAt(0)=='r'){
                        o=prf.rowMap[subId];
                        item.id=o.id;
                        item.caption=o.caption;
                        item.isRow=true;
                    }else{
                        o=prf.cellMap[subId];
                        item.id=o.id;
                        item.caption=o.value;
                    }
                    return item;
                },function(prf,item, itemKey, nv){
                    if(item.isRow)
                        prf.boxing().updateRow(item.id, {caption:nv});
                    else
                        prf.boxing().updateCell(item.id, {value:nv});
                }],
                HCELLA:[1,function(prf,node){
                    var subId=prf.getSubId(node.id);
                    return subId?prf.colMap[subId]:{
                        id:' X ',
                        caption:prf.boxing().getGridHandlerCaption()
                    };
                },function(prf,item, itemKey, nv){
                    if(item.id!=' X ')
                        prf.boxing().updateHeader(item.id, {caption:nv});
                    else
                        prf.boxing().setGridHandlerCaption(nv);
                }]
            },
            "linb.UI.FoldingTabs":{
                CAPTION:[1,'getItemByDom','updateItem'],
                MESSAGE:[1,'getItemByDom','updateItem','message']
            }
        }
    };
    var fun=function(items,hash){
        var self=arguments.callee;
        _.arr.each(items,function(o){
            hash[o.id]=o;
            if(o.sub && o.sub.length){
                self(o.sub, hash);
                o.tips='$VisualJS.designer.openwidgets';
            }else
                o.tips='$VisualJS.designer.dragwidget';
        });
    };
    CONF.mapWidgets = {};
    fun(CONF.widgets, CONF.mapWidgets);
    linb.setAppLangKey("VisualJS");
};