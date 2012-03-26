set appPath=..\
set releasePath=..\..\FormBuilder\


mkdir %releasePath%
mkdir %releasePath%\js


xcopy %appPath%codemirror\*.* %releasePath%codemirror\ /E /Y
xcopy %appPath%img\*.* %releasePath%img\ /E /Y
xcopy %appPath%css\*.* %releasePath%css\ /E /Y

xcopy %appPath%js\exLinb\*.* %releasePath%js\exLinb\ /E /Y
xcopy %appPath%js\FormDesigner\*.* %releasePath%js\FormDesigner\ /E /Y

copy %appPath%js\CodeEditor.js  %releasePath%js\CodeEditor.js
copy %appPath%js\ClassTool.js  %releasePath%js\ClassTool.js
copy %appPath%js\JSEditor.js  %releasePath%js\JSEditor.js
copy %appPath%js\PageEditor.js  %releasePath%js\PageEditor.js
copy %appPath%js\ObjectEditor.js  %releasePath%js\ObjectEditor.js
copy %appPath%js\Designer.js  %releasePath%js\Designer.js
copy %appPath%js\CustomDecoration.js  %releasePath%js\CustomDecoration.js

pause
