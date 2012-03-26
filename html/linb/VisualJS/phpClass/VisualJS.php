<?php
class VisualJS extends Unit
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
    
    const BASE_PATH = "../";
    

    public function stimulate(&$hash){
        LINB::checkArgs($hash, array(
            'string' => array(
                'action' => 'open',
                'path' => 'linbApp',
                'className' => 'App',
                'content' => '',
                'theme'=>'default',
                'lang'=>'en'
            )
        ));
        $io = LINB::SC('IO');
        //only input relative path, and not ./ or ../ allowed
        switch($hash->action){
        case 'fetchwebfile':
            $content=file_get_contents($hash->path);
            if ($content!==false) {
               return $content;
            }else{
               throw new LINB_E("Error: Can\'t get ".$hash->path);            
            }
            break;
        case 'downloadjs':
    		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    		header("Cache-Control: private",false);
            header("Content-Description: File Transfer");
    		header("Content-Type: application/force-download");
            header("Accept-Ranges: bytes");
            header("Content-Disposition: attachment; filename=\"jsLinb.Class.js\";");
    		header("Content-Transfer-Encoding: binary");
    		header("Content-Length: ".strlen($hash->content));
    		header("Pragma: public");
    		header("Expires: 0");
            echo $hash->content;
            
            return;
            break;
        case 'downloadhtml':
            $template = $io->getString(self::TEMPLATE_SINHTML);
            $template = LINB::parseTemplate($template, array("libpath"=>"http://www.linb.net/","clsName" => $hash->clsName, "content"=>$hash->content, "theme"=>$hash->theme, "lang"=>$hash->lang));

    		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    		header("Cache-Control: private",false);
            header("Content-Description: File Transfer");
    		header("Content-Type: application/force-download");
            header("Accept-Ranges: bytes");
            header("Content-Disposition: attachment; filename=\"linbApp.html\";");
    		header("Content-Transfer-Encoding: binary");
    		header("Content-Length: ".strlen($template));
    		header("Pragma: public");
    		header("Expires: 0");
            echo $template;
            
            return;
            break;
        case 'downloadzip2':
            $zip = new zip;
            $fileName='jsLinbApp.zip';
            $rootName='runtime';
            
            $path=self::BASE_PATH;

            $path2='index.html';
            $template = $io->getString(self::TEMPLATE_SINHTML);
            $template = LINB::parseTemplate($template, array("libpath"=>"","clsName" => $hash->clsName, "content"=>$hash->content, "theme"=>$hash->theme, "lang"=>$hash->lang));
            $zip->addFile($template, $path2);

            $path2=$rootName.DIRECTORY_SEPARATOR.'loading.gif';
            $f = file_get_contents($path.DIRECTORY_SEPARATOR.$path2);
            $zip->addFile($f, $path2);

            $path2=$rootName.DIRECTORY_SEPARATOR.'addBuilderLink.js';
            $f = file_get_contents($path.DIRECTORY_SEPARATOR.$path2);
            $zip->addFile($f, $path2);
            
            $io->_zip($path, $rootName.DIRECTORY_SEPARATOR.'jsLinb'.DIRECTORY_SEPARATOR.'Locale',$zip);
            $io->_zip($path, $rootName.DIRECTORY_SEPARATOR.'jsLinb'.DIRECTORY_SEPARATOR.'appearance',$zip);

            $path2=$rootName.DIRECTORY_SEPARATOR.'jsLinb'.DIRECTORY_SEPARATOR.'js'.DIRECTORY_SEPARATOR.'linb-all.js';
            $f = file_get_contents($path.DIRECTORY_SEPARATOR.$path2);
            $zip->addFile($f, $path2);

            $fd = fopen ($fileName, "wb");
            $out = fwrite ($fd, $zip -> getZippedfile());
            fclose ($fd);    
            $zip -> forceDownload($fileName);
            @unlink($fileName);
            return;
            break;
        case 'savetoserver':
            $io->setString($hash->path, $hash->content);
            return array('OK'=>true);
            //throw new LINB_E("You cant save file to this server!");
            break;
            
            
            
            
        
        case 'del':
            foreach( $hash->path as $v)
                $io->delete($v);

            return array('OK'=>true);
            break;
        case 'add':
            $file = $hash->path;
            if($hash->type == 'file')
                $file = $hash->path.'/'.$hash->filename;

            if($io->exists($io->absPath($file)))
                throw new LINB_E("'$file' exists!");

            if(!$io->exists($hash->path))
                $io->dirMake($hash->path, true);
                

            if($hash->type == 'file'){
                $template = " ";
                if(substr($file,-3,3)==self::FILE_JS){

                $className="==>specify_class_name_here";
                try{
                    // Get js class name
                    $farr=explode('/js/',$file);
                    if(isset($farr[0])){
                        $farr1=explode('/',$farr[0]);
                        if(isset($farr[1])){
                            $farr2=explode(".",$farr[1]);
                            if(isset($farr2[0])){
                                $className = $farr1[sizeof($farr1)-1] . '.' . implode('.',explode('/',$farr2[0]));
                            }
                        }
                    }
                }catch(Exception $e){}
                    
                    $template = $io->getString(self::TEMPLATE_JS);
                    $template = LINB::parseTemplate($template, array("className" => $className));
                }
                $io->setString($io->absPath($file), $template);
            }

            return array('OK'=>true);
            break;
        case 'save':
            $io->setString($hash->path, $hash->content);
            return array('OK'=>true);
            break;
        case 'getfile':
            return array('file'=> $io->getString($hash->path));
            break;
        case 'open':
            $prjpath=$hash->path;
            if($prjpath{0}=='.')
                throw new LINB_E("Error: Can\'t handle parent path!");
            $prjpath = str_replace("/", "\\", $prjpath);
            //$b = $io->dirList($prjpath);
            $b = $io->search("[a-zA-Z0-9].*", $prjpath, isset($hash->type)?$hash->type:-1, isset($hash->deep)?$hash->deep:0);
            $root=str_replace("\\", "/", realpath('.')).'/';
            //ensure to return relative url format: '/'
            foreach($b as &$v){
                $v['location'] = str_replace("\\", "/", $v['location']);
                $v['location'] = str_replace($root, "", $v['location']);
            }
            unset($io);
            return $b;
                
            break;
        case 'release':
            $arr = explode(DIRECTORY_SEPARATOR, $hash->path);
            $name = array_pop($arr);
            $io->zipDir4Download($hash->path ,$name.'.zip');
            return;

            break;
        case 'upload':
            LINB::checkArgs($hash, array(
                'string' => array(
                    'path' => null
                )
            ));

            $uploader = LINB::SC('Uploader');
            $uploader->set_type('image');
            $name = "";
            foreach($_FILES as $file){
                if(!empty($file['name'])){
                    $name=$file['name'];

                    $save_path=$hash->path.'/';
                    $uploader->save($file,$save_path);
                    break;
                }
            }
            unset($uploader);

            return array('OK'=>true, 'name'=>$name);
            break;
        }
    }
}

?>
