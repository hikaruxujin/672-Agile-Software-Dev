set libPath=..\..\
set compressTool=%libPath%tools/yuicompressor.jar
set appPath=..\
set releasePath=..\release\
set version=4.0\
set appname=VisualJS\
set apiName=visualjs.js

mkdir %releasePath%
mkdir %releasePath%%version%
mkdir %releasePath%%version%%appname%
mkdir %releasePath%%version%%appname%js
mkdir %releasePath%%version%jsLinb
mkdir %releasePath%%version%jsLinb\js
mkdir %releasePath%%version%jsLinb\Locale
mkdir %releasePath%%version%jsLinb\appearance

xcopy %libPath%jsLinb\appearance\*.* %releasePath%%version%jsLinb\appearance\ /E /Y
xcopy %libPath%jsLinb\Locale\*.* %releasePath%%version%jsLinb\Locale\ /E /Y
copy  %libPath%jsLinb\ondrag.gif %releasePath%%version%jsLinb\ondrag.gif
copy  %libPath%jsLinb\bg.gif %releasePath%%version%jsLinb\bg.gif
copy  %libPath%jsLinb\busy.gif %releasePath%%version%jsLinb\busy.gif

rem xcopy %appPath%css\*.* %releasePath%%version%%appname%css\ /E /Y
xcopy %appPath%Locale\*.* %releasePath%%version%Locale\ /E /Y
xcopy %appPath%img\*.* %releasePath%%version%img\ /E /Y
xcopy %appPath%css\*.* %releasePath%%version%css\ /E /Y

copy %appPath%%apiName% %releasePath%%version%%apiName%

copy %libPath%jsLinb\js\linb.js /b + %libPath%jsLinb\js\DataBinder.js /b + %libPath%jsLinb\js\Event.js /b + %libPath%jsLinb\js\Date.js /b + %libPath%jsLinb\js\CSS.js /b + %libPath%jsLinb\js\Dom.js /b  + %libPath%jsLinb\js\Template.js /b + %libPath%jsLinb\js\Com.js /b + %libPath%jsLinb\js\Cookies.js /b + %libPath%jsLinb\js\MessageService.js /b+ %libPath%jsLinb\js\XML.js /b + %libPath%jsLinb\js\XMLRPC.js /b + %libPath%jsLinb\js\SOAP.js /b + %libPath%jsLinb\js\DragDrop.js /b + %libPath%jsLinb\js\History.js /b + %libPath%jsLinb\js\ComFactory.js /b +  %libPath%jsLinb\Locale\en.js /b + %libPath%jsLinb\js\Debugger.js /b + %appPath%js\conf.js /b linb.js

copy %libPath%jsLinb\js\UI.js /b + %libPath%jsLinb\js\Coder.js /b + %libPath%jsLinb\js\Tips.js /b + %libPath%jsLinb\js\UI\Border.js /b + %libPath%jsLinb\js\UI\Shadow.js /b + %libPath%jsLinb\js\UI\Resizer.js /b + %libPath%jsLinb\js\UI\Image.js /b + %libPath%jsLinb\js\UI\Flash.js /b + %libPath%jsLinb\js\UI\Block.js /b + %libPath%jsLinb\js\UI\Label.js /b + %libPath%jsLinb\js\UI\ProgressBar.js /b + %libPath%jsLinb\js\UI\Button.js /b + %libPath%jsLinb\js\UI\CheckBox.js /b + %libPath%jsLinb\js\UI\Input.js /b + %libPath%jsLinb\js\UI\ComboInput.js /b + %libPath%jsLinb\js\UI\RichEditor.js /b + %libPath%jsLinb\js\UI\Group.js /b + %libPath%jsLinb\js\UI\ColorPicker.js /b + %libPath%jsLinb\js\UI\DatePicker.js /b + %libPath%jsLinb\js\UI\TimePicker.js /b + %libPath%jsLinb\js\UI\TimeLine.js /b + %libPath%jsLinb\js\UI\List.js /b + %libPath%jsLinb\js\UI\Gallery.js /b + %libPath%jsLinb\js\UI\IconList.js /b +  %relPath%jsLinb\js\UI\TagEditor.js /b + %libPath%jsLinb\js\UI\Poll.js /b + %libPath%jsLinb\js\UI\Panel.js /b + %libPath%jsLinb\js\UI\PageBar.js /b + %libPath%jsLinb\js\UI\Tabs.js /b + %libPath%jsLinb\js\UI\Stacks.js /b + %libPath%jsLinb\js\UI\ButtonViews.js /b  + %libPath%jsLinb\js\UI\FoldingTabs.js /b + %libPath%jsLinb\js\UI\RadioBox.js /b + %libPath%jsLinb\js\UI\StatusButtons.js /b + %libPath%jsLinb\js\UI\FoldingList.js /b + %libPath%jsLinb\js\UI\TreeBar.js /b  + %libPath%jsLinb\js\UI\TreeView.js /b + %libPath%jsLinb\js\UI\PopMenu.js /b + %libPath%jsLinb\js\UI\MenuBar.js /b + %libPath%jsLinb\js\UI\ToolBar.js /b + %libPath%jsLinb\js\UI\Range.js /b + %libPath%jsLinb\js\UI\Layout.js /b  + %libPath%jsLinb\js\UI\ColLayout.js /b + %libPath%jsLinb\js\UI\TreeGrid.js /b + %libPath%jsLinb\js\UI\Slider.js /b + %libPath%jsLinb\js\UI\Dialog.js /b + %libPath%jsLinb\js\UI\FusionChartFree.js /b + %libPath%jsLinb\js\UI\FusionChart3.js /b + %libPath%jsLinb\js\UI\TextEditor.js /b + %libPath%jsLinb\js\UI\Calendar.js /b  + %appPath%Locale\en.js /b + %appPath%\js\exLinb\AdvResizer.js /b + %appPath%codemirror\js\codemirror.js /b +  %appPath%js\index.js /b  + %appPath%js\CodeEditor.js /b + %appPath%js\PageEditor.js /b + %appPath%js\ClassTool.js /b + %appPath%js\JSEditor.js /b + %appPath%js\EditorTool.js /b + %appPath%js\ObjectEditor.js /b + %appPath%js\ProjectPro.js /b + %appPath%js\ProjectSelector.js /b + %appPath%js\Designer.js /b + %appPath%js\AddFile.js /b + %appPath%js\DelFile.js /b + %appPath%js\About.js /b + %appPath%js\UIDesigner.js /b + %appPath%js\OpenFile.js /b  + %appPath%js\FAndR.js /b  + %appPath%js\JumpTo.js /b  + %appPath%js\ServiceTester.js /b + %appPath%js\CustomDecoration.js /b index.js


copy %appPath%codemirror\js\util.js /b + %appPath%codemirror\js\stringstream.js /b + %appPath%codemirror\js\select.js /b + %appPath%codemirror\js\undo.js /b + %appPath%codemirror\js\editor.js /b + %appPath%codemirror\js\tokenize.js /b + %appPath%codemirror\js\tokenizejavascript.js /b + %appPath%codemirror\js\parsejavascript.js /b  %appPath%codemirror\js.js
copy %appPath%codemirror\js\util.js /b + %appPath%codemirror\js\stringstream.js /b + %appPath%codemirror\js\select.js /b + %appPath%codemirror\js\undo.js /b + %appPath%codemirror\js\editor.js /b + %appPath%codemirror\js\tokenize.js /b + %appPath%codemirror\js\parsecss.js /b %appPath%codemirror\css.js
copy %appPath%codemirror\js\util.js /b + %appPath%codemirror\js\stringstream.js /b + %appPath%codemirror\js\select.js /b + %appPath%codemirror\js\undo.js /b + %appPath%codemirror\js\editor.js /b + %appPath%codemirror\js\tokenize.js /b + %appPath%codemirror\js\parsexml.js /b + %appPath%codemirror\js\parsecss.js /b + %appPath%codemirror\contrib\php\js\tokenizephp.js /b + %appPath%codemirror\js\tokenizejavascript.js /b + %appPath%codemirror\js\parsejavascript.js /b + %appPath%codemirror\contrib\php\js\parsephp.js /b + %appPath%codemirror\contrib\php\js\parsephphtmlmixed.js /b %appPath%codemirror\php.js
copy %appPath%codemirror\js\util.js /b + %appPath%codemirror\js\stringstream.js /b + %appPath%codemirror\js\select.js /b + %appPath%codemirror\js\undo.js /b + %appPath%codemirror\js\editor.js /b + %appPath%codemirror\js\tokenize.js /b + %appPath%codemirror\js\parsexml.js /b + %appPath%codemirror\js\parsecss.js /b + %appPath%codemirror\js\tokenizejavascript.js /b + %appPath%codemirror\js\parsejavascript.js /b + %appPath%codemirror\js\parsehtmlmixed.js /b %appPath%codemirror\html.js
copy %appPath%codemirror\js\util.js /b + %appPath%codemirror\js\stringstream.js /b + %appPath%codemirror\js\select.js /b + %appPath%codemirror\js\undo.js /b + %appPath%codemirror\js\editor.js /b + %appPath%codemirror\js\tokenize.js /b + %appPath%codemirror\js\parsedummy.js /b %appPath%codemirror\dummy.js

java -jar %compressTool% -o %releasePath%%version%jsLinb/js/linb.js      --nomunge   linb.js
java -jar %compressTool% -o %releasePath%%version%%appname%js/index.js   --nomunge   index.js

java -jar %compressTool% -o %appPath%codemirror/js.js   --charset utf-8   %appPath%codemirror\js.js
java -jar %compressTool% -o %appPath%codemirror/php.js   --charset utf-8   %appPath%codemirror\php.js
java -jar %compressTool% -o %appPath%codemirror/html.js   --charset utf-8   %appPath%codemirror\html.js
java -jar %compressTool% -o %appPath%codemirror/css.js   --charset utf-8   %appPath%codemirror\css.js
java -jar %compressTool% -o %appPath%codemirror/dummy.js   --charset utf-8   %appPath%codemirror\dummy.js

rem copy linb.js %libPath%%releasePath%%version%jsLinb\js\linb.js
rem copy index.js %libPath%%releasePath%%version%%appname%js\index.js

del /q linb.js
del /q index.js


pause
