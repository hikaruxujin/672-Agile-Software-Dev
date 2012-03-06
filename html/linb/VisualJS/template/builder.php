<?php
class WizardBuilder
{
    const INDEX = "index";
    const DEBUG = "debug";

    const FILE_HTML = ".html";
    const FILE_JS = ".js";
    
    const PROJECTS_PATH = "projects";
    const IMG_PATH = "img";
    const JS_PATH = "js";
    const LOCATE_PATH = "Locale";
    const EN_PATH = "en.js";

    const TEMPLATE_SINHTML = "template/single.html";
    const TEMPLATE_HTML = "template/index.html";
    const TEMPLATE_DEBUG = "template/debug.html";
    const TEMPLATE_JS = "template/index.js";

    public function buildApp($hash){
        LINB::checkArgs($hash, array(
            'string' => array(
                'pathName' => NULL,
                'className' => NULL
            )
        ));
        
        $io = LINB::SC('IO');

        $prjpath = self::PROJECTS_PATH.DIRECTORY_SEPARATOR.$hash->pathName;

        //replace exists project file
        $path = $prjpath;
        if($io->exists($path)){
            throw new LINB_E("$path exists already!");
        }
        //$io->delete($path);
        $io->dirMake($path, true);

        $template = $io->getString(self::TEMPLATE_HTML);
        //html page file
        file_put_contents($path.DIRECTORY_SEPARATOR.self::INDEX.self::FILE_HTML, LINB::parseTemplate($template, $hash));

        $template = $io->getString(self::TEMPLATE_DEBUG);
        //html page file
        file_put_contents($path.DIRECTORY_SEPARATOR.self::DEBUG.self::FILE_HTML, LINB::parseTemplate($template, $hash));

        //img path
        $io->dirMake($path.DIRECTORY_SEPARATOR.self::IMG_PATH, true);
        
        $rpath=$path;
        //base class path
        $path = $rpath.DIRECTORY_SEPARATOR.$hash->className;
        $io->dirMake($path, true);
        //js path
        $path = $path.DIRECTORY_SEPARATOR.self::JS_PATH;
        $io->dirMake($path, true);

        $template = $io->getString(self::TEMPLATE_JS);
        // js class file
        file_put_contents($path.DIRECTORY_SEPARATOR.self::INDEX.self::FILE_JS, LINB::parseTemplate($template, $hash));

        $path=$rpath.DIRECTORY_SEPARATOR.self::LOCATE_PATH;
        //lang path
        $io->dirMake($path, true);
        $io->setString($path.DIRECTORY_SEPARATOR.self::EN_PATH, '{}');
        
        unset($io);
        
        return $prjpath;
    }
};
?>