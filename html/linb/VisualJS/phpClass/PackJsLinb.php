<?php
class PackJsLinb extends Unit
{
    const PATH = 'jsLinb/js/';
    const PACKED = 'jsLinbPacked/js/linb.js';

    protected $ARR = array(
    'linb','UI','UI/Label','UI/Button','UI/Checkbox','UI/Input','UI/ComboInput','UI/Group','UI/RadioBox','UI/List','UI/Gallery',
    'UI/PanelBar','UI/Block','UI/PopMenu','UI/MenuBar','UI/ToolBar','UI/Layout','UI/Tabs','UI/Stacks','UI/ButtonViews','UI/TreeBar',
    'UI/TreeGrid','UI/Dialog','UI/TextEditor','UI/Tips','UI/Shadow','UI/Resizer','UI/Edge','UI/IFrame','DataSource/Memory','DataSource/Ajax'
    );

    public function stimulate(&$hash){
        $io = LINB::SC('IO');
        $strArr = array();
        foreach($this->ARR as $v){
            array_push($strArr, $io->getString(self::PATH.$v.'.js'));
        }

        $str=implode(';',$strArr);
        $packer = new JavaScriptPacker($str, 'None', false, false);
        $packed = $packer->pack();
        $io->setString(self::PACKED, $packed);
        unset($io);
        unset($packer);
    }
}
?>



