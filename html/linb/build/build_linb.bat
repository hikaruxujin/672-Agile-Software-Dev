set relPath=..\
set compressTool=%relPath%tools/yuicompressor.jar
set outPath=runtime\
set miniPath=\linb.js
set allPath=\linb-all.js
set rawPath=\linb-raw.js
set debugPath=\linb-debug.js
set advAllPath=\adv-all.js
set advRawPath=\adv-raw.js
set advDebugPath=\adv-debug.js


mkdir %outPath%
mkdir %outPath%jsLinb
mkdir %outPath%jsLinb\js
mkdir %outPath%jsLinb\js\Com
mkdir %outPath%jsLinb\Locale
mkdir %outPath%jsLinb\appearance


rem ==================
rem for jsLinb source code
rem ==================
rem xcopy %relPath%jsLinb\js\*.* %outPath%jsLinb\js\ /E /Y

xcopy %relPath%jsLinb\js\Com\*.* %outPath%jsLinb\js\Com\ /E /Y
xcopy %relPath%jsLinb\appearance\*.* %outPath%jsLinb\appearance\ /E /Y
xcopy %relPath%jsLinb\Locale\*.* %outPath%jsLinb\Locale\ /E /Y
copy  %relPath%jsLinb\ondrag.gif %outPath%jsLinb\ondrag.gif
copy  %relPath%jsLinb\bg.gif %outPath%jsLinb\bg.gif
copy  %relPath%jsLinb\busy.gif %outPath%jsLinb\busy.gif

rem ==================
rem for mini jsLinb code
rem ==================
copy %relPath%jsLinb\js\linb.js /b + %relPath%jsLinb\js\DataBinder.js /b + %relPath%jsLinb\js\Event.js /b + %relPath%jsLinb\js\CSS.js /b + %relPath%jsLinb\js\Dom.js /b  + %relPath%jsLinb\js\Template.js /b + %relPath%jsLinb\js\DragDrop.js /b+ %relPath%jsLinb\js\Cookies.js /b + %relPath%jsLinb\js\History.js /b + %relPath%jsLinb\js\Tips.js /b linb.js

java -jar %compressTool% -o  %outPath%jsLinb\js%miniPath% linb.js
 
del /q linb.js


rem ==================
rem for all jsLinb code
rem ==================
copy %relPath%jsLinb\js\linb.js /b + %relPath%jsLinb\js\DataBinder.js /b +  %relPath%jsLinb\Locale\en.js /b + %relPath%jsLinb\js\Event.js /b  + %relPath%jsLinb\js\Date.js /b + %relPath%jsLinb\js\CSS.js /b + %relPath%jsLinb\js\Dom.js /b + %relPath%jsLinb\js\Template.js /b  + %relPath%jsLinb\js\Com.js /b + %relPath%jsLinb\js\Cookies.js /b + %relPath%jsLinb\js\MessageService.js /b+ %relPath%jsLinb\js\XML.js /b + %relPath%jsLinb\js\XMLRPC.js /b + %relPath%jsLinb\js\SOAP.js /b + %relPath%jsLinb\js\DragDrop.js /b + %relPath%jsLinb\js\Tips.js /b + %relPath%jsLinb\js\History.js /b + %relPath%jsLinb\js\ComFactory.js /b  + %relPath%jsLinb\js\Debugger.js /b + %relPath%jsLinb\js\UI.js /b + %relPath%jsLinb\js\UI\Image.js /b +%relPath%jsLinb\js\UI\Flash.js /b + %relPath%jsLinb\js\UI\Border.js /b + %relPath%jsLinb\js\UI\Shadow.js /b + %relPath%jsLinb\js\UI\Resizer.js /b  + %relPath%jsLinb\js\UI\Block.js /b + %relPath%jsLinb\js\UI\Label.js /b + %relPath%jsLinb\js\UI\ProgressBar.js /b + %relPath%jsLinb\js\UI\Button.js /b + %relPath%jsLinb\js\UI\CheckBox.js /b+ %relPath%jsLinb\js\UI\Slider.js /b + %relPath%jsLinb\js\UI\Input.js /b + %relPath%jsLinb\js\UI\RichEditor.js /b + %relPath%jsLinb\js\UI\ComboInput.js /b + %relPath%jsLinb\js\UI\Group.js /b  + %relPath%jsLinb\js\UI\ColorPicker.js /b + %relPath%jsLinb\js\UI\DatePicker.js /b + %relPath%jsLinb\js\UI\TimePicker.js /b + %relPath%jsLinb\js\UI\List.js /b + %relPath%jsLinb\js\UI\Gallery.js /b + %relPath%jsLinb\js\UI\IconList.js /b + %relPath%jsLinb\js\UI\Panel.js /b + %relPath%jsLinb\js\UI\PageBar.js /b + %relPath%jsLinb\js\UI\Tabs.js /b + %relPath%jsLinb\js\UI\Stacks.js /b + %relPath%jsLinb\js\UI\ButtonViews.js /b + %relPath%jsLinb\js\UI\RadioBox.js /b + %relPath%jsLinb\js\UI\StatusButtons.js /b + %relPath%jsLinb\js\UI\TreeBar.js /b + %relPath%jsLinb\js\UI\TreeView.js /b + %relPath%jsLinb\js\UI\PopMenu.js /b + %relPath%jsLinb\js\UI\MenuBar.js /b + %relPath%jsLinb\js\UI\ToolBar.js /b + %relPath%jsLinb\js\UI\Layout.js /b+ %relPath%jsLinb\js\UI\ColLayout.js /b + %relPath%jsLinb\js\UI\TreeGrid.js /b + %relPath%jsLinb\js\UI\Slider.js /b + %relPath%jsLinb\js\UI\Dialog.js /b linb.js

java -jar %compressTool% -o  %outPath%jsLinb\js%allPath% linb.js
java -jar %compressTool% -o  %outPath%jsLinb\js%rawPath%   --nomunge  linb.js
copy linb.js  %outPath%jsLinb\js%debugPath%

rem ==================
rem for adv code
rem ==================
copy %relPath%jsLinb\js\UI\FusionChartFree.js /b + %relPath%jsLinb\js\UI\FusionChart3.js /b + %relPath%jsLinb\js\UI\TextEditor.js /b + %relPath%jsLinb\js\UI\TimeLine.js /b +  %relPath%jsLinb\js\UI\TagEditor.js /b + %relPath%jsLinb\js\UI\FoldingTabs.js /b + %relPath%jsLinb\js\UI\Poll.js /b + %relPath%jsLinb\js\UI\FoldingList.js /b + %relPath%jsLinb\js\UI\Range.js /b  + %relPath%jsLinb\js\UI\Calendar.js /b adv.js

java -jar %compressTool% -o  %outPath%jsLinb\js%advAllPath% adv.js
java -jar %compressTool% -o  %outPath%jsLinb\js%advRawPath%   --nomunge  adv.js
copy adv.js  %outPath%jsLinb\js%advDebugPath%


rem ==================
rem for Coder.js
rem ==================
java -jar %compressTool% -o  %outPath%jsLinb\js\Coder.js %relPath%jsLinb\js\Coder.js
copy %relPath%jsLinb\js\Coder.js  %outPath%jsLinb\js\Coder-debug.js



rem =======================
rem copy to other dir
rem =======================

set oPath=..\

rem rd %oPath%%outPath% /S /Q
rem mkdir %oPath%%outPath%

xcopy %outPath%*.* %oPath%%outPath% /E /Y

rd %outPath% /S /Q

del /q linb.js
del /q adv.js

pause