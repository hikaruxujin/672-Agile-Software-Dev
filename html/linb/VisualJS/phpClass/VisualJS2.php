<?php
class VisualJS2 extends Unit
{
    const TPL_PATH="template";
    const PACKAGE_PATH="package";
    const BUILD_FILENAME="builder.php";

    public function stimulate(&$hash){
        LINB::checkArgs($hash, array(
            'string' => array(
                'action' => NULL,
            )
        ));
        $r = NULL;

        //only input relative path, and not ./ or ../ allowed
        switch($hash->action){
        case 'getWizardTypeList':
            $path=self::TPL_PATH.DIRECTORY_SEPARATOR.self::PACKAGE_PATH;
            $path = str_replace("/", "\\", $path);
            $r=$this->getFiles($path);
            break;
        case 'getWizardList':
            LINB::checkArgs($hash, array(
                'string' => array(
                    'path' => NULL,
                )
            ));
            $path=self::TPL_PATH.DIRECTORY_SEPARATOR.self::PACKAGE_PATH.DIRECTORY_SEPARATOR.$hash->path;
            $r=$this->getFiles($path);
            break;
        case 'buildWizard':
            LINB::checkArgs($hash, array(
                'string' => array(
                    'path' => ''
                ),
                'object' => array(
                    'paras' => NULL
                )
            ));
 
            $path=NULL;
            if($hash->path)
                $path=self::TPL_PATH.DIRECTORY_SEPARATOR.self::PACKAGE_PATH.DIRECTORY_SEPARATOR.$hash->path.DIRECTORY_SEPARATOR.self::BUILD_FILENAME;
            else
                $path=self::TPL_PATH.DIRECTORY_SEPARATOR.self::BUILD_FILENAME;

            $paras=$hash->paras;
            try{
               if(file_exists($path)){
                   include_once($path);
                   if(class_exists('WizardBuilder')){
                       $ins = new WizardBuilder();
                       $path = $ins->buildApp($paras);
                       $r=$this->getFiles($path,-1,0);
                   }else
                        throw new LINB_E("Class 'WizardBuilder' could not be found."); 
               } else {
                   throw new LINB_E("File $path could not be found."); 
               }
           }catch (LINB_E $e){
               throw new LINB_E($e->getMessage(), $e->getCode());
           }
            break;
        }

        return $r;
    }
    
    private function getFiles($path, $type=0, $deep=0){
        $io = LINB::SC('IO');
        
        $path = str_replace("/", "\\", $path);
        //$r = $io->dirList($path);
        $r = $io->search("[a-zA-Z0-9].*", $path, $type, $deep);
        $root=str_replace("\\", "/", realpath('.')).'/';
        //ensure to return relative url format: '/'
        foreach($r as &$v){
            $v['location'] = str_replace("\\", "/", $v['location']);
            $v['location'] = str_replace($root, "", $v['location']);
        }
        
        unset($io);
        return $r;
    }
}

?>
