_.set(linb.Locale,["cn","app"], {
    en:'英文',
    cn:'中文',
    apititle:"jsLINB 4.0 - API 文档",

    search:'API查询',
    lQ1:'按API查询',
    lQ2:'按功能描述查询',


    staticMethods:"静态方法",
    staticProperties:"静态属性",
    gFun:'全局函数',
    constructor:"构造函数",
    noCons:'静态类',
    supCls:'父类',
    subCls:'子类',
    inhFrom:"继承自 ",
    insProperties:"实例属性",
    insMethods:"实例方法",
    events:'事件',
    retV:'返回值',
    param:'参数',
    codesnip:'示例',
    memo:'说明',
    seealso:'请参考',
    oCode:'函数源代码',
    oCodeDesc:'/*\n * 为了帮助您更好地理解这个函数,下面是 jsLinb 的函数源代码：\n*/'
});
(function(){
    var $eo={
        $rtn:"[self]",
        $paras:[
            "fun [可选参数]: Function, 函数的参数 是 [linb.DomProfile 对象, DOM 事件对象, 目前元素的linbid字符串].",
            "label [可选参数]: String, 事件的标签.",
            "flag  [可选参数]: Boolean, 仅删除事件的时候有效,表示是否删除所有相关的事件."
        ]
    };
    /*
    $desc string
    $paras array
    $rtn string
    $snippet array
    $links array
    $memo string
    */
    _.set(linb.Locale,["cn","doc"], {
        Namespace:{
            $desc:"申明一个名字空间.",
            $rtn:"Object",
            $paras:[
                "key [必需参数]: String, 名字空间字符串."
            ],
            $snippet:["Namespace('Test.NS'); alert(typeof Test.NS)"],
            $memo:"名字空间的命名规则：[A-Z][0-9a-zA-Z]+"
        },
        Class:{
            $desc:"类的操作方法集合.<br />当做函数用是申明一个类.",
            $rtn:"Object",
            $paras:[
                "key [必需参数]: String, 名字空间+类名字.",
                "pkey [必需参数]: String/Array, 名字空间+类名字.所要继承的类.数组表示该类为多继承,有多个父类.",
                "obj [可选参数]: Object,  类对象. 默认为 {}."
            ],
            $snippet:["// 申明命名空间 'Test.NS' 然后申明一个类 'Test.NS.Cls'; \n  Class('Test.NS.Cls'); Class('Test.NS.Cls.Subcls1', 'Test.NS.Cls', {}); Class('Test.NS.Cls.Subcls2', null, {});  alert(typeof Test.NS); alert(typeof Test.NS.Cls); alert(typeof Test.NS.Cls.Subcls1);alert(typeof Test.NS.Cls.Subcls2);"],
            $memo:"类的命名规则：[A-Z][0-9a-zA-Z]+",
            destroy:{
                $desc:"销毁一个类"
            }
        },
        "_":{
            $desc:"工具方法的集合.<br />当做函数用是得到本地的时间戳.",
            $rtn:"Number",
            $snippet:["alert(_()); linb.message(_())"],

            arr:{
                $desc:"数组的功能函数集合.",
                each:{
                    $desc:"将函数应用于数组中的每一个元素.",
                    $rtn:'Array',
                    $paras: [
                        "arr [必需参数]: Array, 目标数组.",
                        "fun [必需参数]: Function, 参数: [array element, array index]. 要应用的函数.",
                        "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数). 默认为 [window]",
                        "desc [可选参数]: Boolean, 按从头到尾还是从尾到头应用函数. 默认是从头到尾."
                    ],
                    $snippet:[
                        "_.arr.each(['a','b'], function(o,i){alert(i+':'+o);} )",
                        "_.arr.each(['a','b'], function(o,i){alert(i+':'+o);alert(this===window);},window,true)"
                    ]
                },
                indexOf:{
                    $desc:"查找给定值在数组中的位置, 返回-1表示没有找到.",
                    $rtn:'Number. 值在数组的index',
                    $paras: [
                        "arr [必需参数]: Array, 目标数组.",
                        "value [必需参数]: Object, 要查找的值."
                    ],
                    $snippet:[
                        "var a=[1,2,3,4];alert(_.arr.indexOf(a, 3))"
                    ]
                },
                insertAny:{
                    $desc:"添加一个或多个元素到数组的指定位置.",
                    $rtn:'Number',
                    $paras: [
                        "arr [必需参数]: Array, 目标数组.",
                        "target [必需参数]: Object, 要添加的一个或多个元素.",
                        "index [可选参数]: Number, 指定要插入的位置. 默认为 -1 表示插入到结尾.",
                        "flag [可选参数]: Boolean, 强制[target]作为一个元素插入,即使它是一个数组.  默认为 false."
                    ],
                    $snippet:[
                        "var a=[1,2,3]; _.arr.insertAny(a,5,1);alert(a)",
                        "var a=[1,2,3]; _.arr.insertAny(a,[5,5],1);alert(_.serialize(a))",
                        "var a=[1,2,3]; _.arr.insertAny(a,[5,5],1,true);alert(_.serialize(a))"
                    ]
                },
                removeFrom:{
                    $desc:"移除数组的一部分.",
                    $rtn:'Array',
                    $paras: [
                        "arr [必需参数]: Array, 目标数组.",
                        "index [必需参数]: Number, 数组开始的index. ",
                        "length [可选参数]: Number, 移除元素的个数. 默认为 1."
                    ],
                    $snippet:[
                        "var a=[1,2,3,4,5]; _.arr.removeFrom(a, 2,2 ); alert(a);"
                    ]
                },
                removeDuplicate:{
                    $desc:"移除数组的重复元素.",
                    $rtn:'Array',
                    $paras: [
                        "arr [必需参数] : Array, 目标数组.",
                        "subKey [可选参数]: String, 判断数组中值是否重复的子键（针对数组中的值为对象的情况）."
                    ],
                    $snippet:[
                        "var a=[1,2,3,4,5,3,4,5]; _.arr.removeDuplicate(a); alert(a);",
                        "var a=[{id:1,value:'1'},{id:1,value:'2'},{id:1,value:'3'}]; _.arr.removeDuplicate(a, 'id'); alert(_.serialize(a));"
                    ]
                },
                removeValue:{
                    $desc:"移除数组中值为”给定值“的元素.",
                    $rtn:'Array',
                    $paras: [
                        "arr [必需参数] [必需参数]: Array, 目标数组.",
                        "value: Object, 要移除元素的值."
                    ],
                    $snippet:[
                        "var a=[1,2,3,4,5]; _.arr.removeValue(a, 4); alert(a);"
                    ]
                },
                subIndexOf:{
                    $desc:"查找给定的键和值在数组中的位置（对于数组是Object的情况）, 返回-1表示没有找到.",
                    $rtn:'Number',
                    $paras: [
                        "arr [必需参数]: Array, 目标数组.",
                        "key [必需参数]: String, 键名字.",
                        "value [必需参数]: Object, 值."
                    ],
                    $snippet:[
                        "var a=[1,2,{k:'v'},4]; var i=_.arr.subIndexOf(a,'k','v'); alert(i);"
                    ]
                }
            },
            asyHTML:{
                $desc:"异步生成html的函数.",
                $rtn:"Interger",
                $paras:[
                    "content [必需参数]: String, 要生成html的字符串.",
                    "callback [必需参数]: Function, 回调函数.",
                    "defer [可选参数]: Number, 每组执行前的时间延迟. 默认为 0",
                    "size [可选参数]: Number, 每组生成的DOM节点数. 默认为 10"
                ]
            },
            asyRun:{
                $desc:"异步执行一个函数.",
                $rtn:"Interger",
                $paras:[
                    "fun [必需参数]: Function, 要执行的函数.",
                    "defer [可选参数]: Number, 在多少毫秒后执行. 默认为 0",
                    "args [可选参数]: Array, 函数的参数. 默认为 [](空数组)",
                    "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数) . 默认为 [window]"
                ],
                $snippet:[
                    "_.asyRun(function(a,b){alert(this===window);alert(a+b)}, 300, ['a','b'], window)"
                ]
            },
            breakO:{
                $desc:"断开引用[以释放内存].",
                $paras:[
                    "target [必需参数]: Object, 要断开的对象.",
                    "depth [可选参数]: Number, 深度值. 默认为 1."
                ],
                $snippet:[
                    "var a={b:1}, o={a:a}; _.breakO(o); alert(a && a.b);",
                    "var a={b:1}, o={a:a}; _.breakO(o,2); alert(a && a.b);"
                ]
            },
            toFixedNumber:{
                $desc:"按给定的精度来格式化数字,返回的是格式化后的数字.",
                $paras:[
                    "number [必需参数]: Number, 数字.",
                    "digits [可选参数]: Number, 小数点后精度. 默认为 2."
                ],
                $snippet:[
                    "var a=0.3+0.3+0.3; alert(a); alert(_.toFixedNumber(a, 10));",
                    "var a=0.1*0.2; alert(a); alert(_.toFixedNumber(a, 10));"
                ]
            },
            clone:{
                $desc:"拷贝对象, 深度拷贝.",
                $rtn:"Object",
                $paras:[
                    "hash [必需参数]: Object, 要拷贝的对象.",
                    "filter [可选参数]: Function, 参数: [值, 键]. 判断是否拷贝该项. 也可以是 [true],表示会忽略以'_'开头的项",
                    "deep [可选参数]: Number, 拷贝的深度,默认为 100."
                ],
                $snippet:[
                    "var a=1, b='s'; alert(_.clone(a)); alert(_.clone(b));",
                    "var o={a:1,b:{b:{c:2}}}; alert(_.serialize(_.clone(o))); alert(_.serialize(_.clone(o,function(o,i){return i!='c'}))); ",
                    "var o={a:1,_b:2,$c:3}; alert(_.serialize(_.clone(o,true)));",
                    "var o=['1','2','3']; alert(_.serialize(_.clone(o))); alert(_.serialize(_.clone(o,function(o){return o!='2'}))); "
                ]
            },
            copy:{
                $desc:"浅拷贝, 只拷贝对象的第一层.",
                $rtn:"Object",
                $paras:[
                    "hash [必需参数]: Object, 要拷贝的对象.",
                    "filter [可选参数]: Function, 参数: [值, 键]. 判断是否拷贝该项. 也可以是 [true],表示会忽略以'_'开头的项"
                ],
                $memo:"请参见 <a href='#_.clone'>_.clone</a>"
            },
            each:{
                $desc:"对hash的每一个函数元素,应用一个函数.",
                $rtn:"Object",
                $paras:[
                    "hash [必需参数]: Object, 键值对.",
                    "fun [必需参数]: Function, 函数: [值, 键]. 要应用的函数.",
                    "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数)."
                ],
                $snippet:[
                    "var h={a:1,b:2}; _.each(h,function(o,i){alert(i+':'+o)})"
                ]
            },
            'exec':{
                $desc:"执行一段脚本.",
                $rtn:"Object",
                $paras:[
                    "script [必需参数]: String, 脚本字符串."
                ],
                $snippet:[
                    "_.exec('alert(\"a\")')"
                ]
            },
            isDefined:{
                $desc:"判断目标对象是否存在.相当于[target===undefined].",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: Object, 要判断的目标对象."
                ],
                $snippet:[
                    "alert(_.isDefined(window.aaaa))"
                ]
            },
            filter:{
                $desc:"过滤数组/键值对的某些元素.",
                $rtn:"Object",
                $paras:[
                    "obj [必需参数]: Object, 数组/键值对.",
                    "filter [可选参数]: Function, 参数: [值, 键]. 判断是否保留该项. 也可以是 [true],表示值过滤以'_'开头的项",
                    "force [可选参数]: Boolean, 强行将[obj]做为一个{}执行. 默认为 false."
                ],
                $snippet:[
                    "var o={a:1,b:2}; _.filter(o,function(o,i){return i!='b'}); alert(_.serialize(o))",
                    "var o={a:1,_b:2}; _.filter(o,true); alert(_.serialize(o))",
                    "var o=[1,2,3]; _.filter(o,function(o,i){return o!=2}); alert(_.serialize(o))"
                ]
            },
            fun:{
                $desc:"函数的功能函数集合.<br />也可以作为函数用来获取一个空函数.",
                args:{
                    $desc:"获取指定函数的参数.",
                    $rtn:"Array",
                    $paras:[
                        "fun [必需参数]: Function, 目标函数."
                    ],
                    $snippet:[
                        "alert(_.fun.args(function(a,b,c){var body=1;}))"
                    ]
                },
                body:{
                    $desc:"获取函数的函数体.",
                    $rtn:"String",
                    $paras:[
                        "fun [必需参数]: Function, 目标函数."
                    ],
                    $snippet:[
                        "alert(_.fun.body(function(a,b,c){var body=1;}))"
                    ]
                },
                clone:{
                    $desc:"拷贝一个函数.",
                    $rtn:"Function",
                    $paras:[
                        "fun [必需参数]: Function, 目标函数."
                    ],
                    $snippet:[
                        "var fun=function(a,b,c){var body=1;}, fun_cloned =  _.fun.clone(fun); alert(_.fun.args(fun_cloned));alert(_.fun.body(fun_cloned));alert(fun_cloned.toString()); alert(fun==fun_cloned); "
                    ]
                }
            },
            get:{
                $desc:"获取多层hash的给定路径的值.",
                $rtn:"Object",
                $paras:[
                    "hash [必需参数]: Object, 多层hash.",
                    "path [必需参数]: Array, 路径数组, 例如['a','b','c'] 表示{a:{b:{c:[variable]}}}中的variable."
                ],
                $snippet:[
                    "alert(_.get({a:{b:{c:1}}},'a'))",
                    "alert(_.get({a:{b:{c:1}}},['a','b']))",
                    "alert(_.get({a:{b:{c:1}}},['a','b','c']))",
                    "alert(_.get({a:{b:{c:1}}},['a','b','c','d']))"
                ]
            },
            "id":{
                $desc:"获取一个a-z组成的唯一id编号.",
                $rtn:"String",
                $snippet:[
                    "alert('system id: ' + _.id());",
                    "var test=new _.id(); var out=[]; for(var i=0;i<100;i++){out.push(test.next())}; alert(out);"
                ]
            },
            isArr :{
                $desc:"判断目标是否是一个数组.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isArr('s')+':'+_.isArr(new RegExp())+':'+_.isArr(function(){})+':'+_.isArr(1)+':'+_.isArr(NaN)+':'+_.isArr({})+':'+_.isArr(new Date)+':'+_.isArr(null)+':'+_.isArr(undefined)+':'+_.isArr(true)+':'+_.isArr([]));"
                ]
            },
            isBool :{
                $desc:"判断目标是否是一个Bool.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isBool('s')+':'+_.isBool(new RegExp())+':'+_.isBool(function(){})+':'+_.isBool(1)+':'+_.isBool(NaN)+':'+_.isBool({})+':'+_.isBool(new Date)+':'+_.isBool(null)+':'+_.isBool(undefined)+':'+_.isBool(true)+':'+_.isBool([]));"
                ]
            },
            isDate :{
                $desc:"判断目标是否是一个日期(Date).",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isDate('s')+':'+_.isDate(new RegExp())+':'+_.isDate(function(){})+':'+_.isDate(1)+':'+_.isDate(NaN)+':'+_.isDate({})+':'+_.isDate(new Date)+':'+_.isDate(null)+':'+_.isDate(undefined)+':'+_.isDate(true)+':'+_.isDate([]));"
                ]
            },
            isEmpty :{
                $desc:"判断目标是否是为空.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isEmpty('s')+':'+_.isEmpty(new RegExp())+':'+_.isEmpty(function(){})+':'+_.isEmpty(1)+':'+_.isEmpty(NaN)+':'+_.isEmpty({})+':'+_.isEmpty(new Date)+':'+_.isEmpty(null)+':'+_.isEmpty(undefined)+':'+_.isEmpty(true)+':'+_.isEmpty([]));"
                ],
                $memo:"It's only for hash Object"
            },
            isFun :{
                $desc:"判断目标是否是一个函数.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isFun('s')+':'+_.isFun(new RegExp())+':'+_.isFun(function(){})+':'+_.isFun(1)+':'+_.isFun(NaN)+':'+_.isFun({})+':'+_.isFun(new Date)+':'+_.isFun(null)+':'+_.isFun(undefined)+':'+_.isFun(true)+':'+_.isFun([]));"
                ]
            },
            isArguments:{
                $desc:"判断目标是否是一个参数对象.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "(function(){alert(_.isArguments(arguments));alert(_.isArguments({}));alert(_.isArguments([]));}())"
                ]
            },
            isHash:{
                $desc:"判断目标是否是一个hash.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isHash('s')+':'+_.isHash(new RegExp())+':'+_.isHash(function(){})+':'+_.isHash()+':'+_.isHash(1)+':'+_.isHash(NaN)+':'+_.isHash({})+':'+_.isHash(new Date)+':'+_.isHash(null)+':'+_.isHash(undefined)+':'+_.isHash(true)+':'+_.isHash([]));"
                ]
            },
            isNull:{
                $desc:"判断目标是否是null.",
                $rtn:"Boolean",
                $paras:[
                    "targe [必需参数]t: any"
                ],
                $snippet:[
                    "alert(_.isNull('s')+':'+_.isNull(new RegExp())+':'+_.isNull(function(){})+':'+_.isNull(1)+':'+_.isNull(NaN)+':'+_.isNull({})+':'+_.isNull(new Date)+':'+_.isNull(null)+':'+_.isNull(undefined)+':'+_.isNull(true)+':'+_.isNull([]));"
                ]
            },
            isFinite:{
                $desc:"判断目标是否是一个有效的数字.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isFinite('s')+':'+_.isFinite(new RegExp())+':'+_.isFinite(function(){})+':'+_.isFinite(1)+':'+_.isFinite(NaN)+':'+_.isFinite({})+':'+_.isFinite(new Date)+':'+_.isFinite(null)+':'+_.isFinite(undefined)+':'+_.isFinite(true)+':'+_.isFinite([]));"
                ]
            },
            isNumb:{
                $desc:"判断目标是否是一个Number(数字).",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isNumb('s')+':'+_.isNumb(new RegExp())+':'+_.isNumb(function(){})+':'+_.isNumb(1)+':'+_.isNumb(NaN)+':'+_.isNumb({})+':'+_.isNumb(new Date)+':'+_.isNumb(null)+':'+_.isNumb(undefined)+':'+_.isNumb(true)+':'+_.isNumb([]));"
                ]
            },
            isObj :{
                $desc:"判断目标是否是一个对象.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isObj('s')+':'+_.isObj(new RegExp())+':'+_.isObj(function(){})+':'+_.isObj(1)+':'+_.isObj(NaN)+':'+_.isObj({})+':'+_.isObj(new Date)+':'+_.isObj(null)+':'+_.isObj(undefined)+':'+_.isObj(true)+':'+_.isObj([]));"
                ]
            },
            isReg :{
                $desc:"判断目标是否是一个正则表达式.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isReg('s')+':'+_.isReg(new RegExp())+':'+_.isReg(function(){})+':'+_.isReg(1)+':'+_.isReg(NaN)+':'+_.isReg({})+':'+_.isReg(new Date)+':'+_.isReg(null)+':'+_.isReg(undefined)+':'+_.isReg(true)+':'+_.isReg([]));"
                ]
            },
            isSet:{
                $desc:"判断目标是否已经定义.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isSet('s')+':'+_.isSet(new RegExp())+':'+_.isSet(function(){})+':'+_.isSet(1)+':'+_.isSet(NaN)+':'+_.isSet({})+':'+_.isSet(new Date)+':'+_.isSet(null)+':'+_.isSet(undefined)+':'+_.isSet(true)+':'+_.isSet([]));"
                ]
            },
            isStr :{
                $desc:"判断目标是否是一个字符串.",
                $rtn:"Boolean",
                $paras:[
                    "target [必需参数]: any"
                ],
                $snippet:[
                    "alert(_.isStr('s')+':'+_.isStr(new RegExp())+':'+_.isStr(function(){})+':'+_.isStr(1)+':'+_.isStr(NaN)+':'+_.isStr({})+':'+_.isStr(new Date)+':'+_.isStr(null)+':'+_.isStr(undefined)+':'+_.isStr(true)+':'+_.isStr([]));"
                ]
            },
            merge:{
                $desc:"将两个键值对合并.",
                $rtn:"Object",
                $paras:[
                    "target [必需参数]: Object, 目标hash.",
                    "source [必需参数]: Object, 源hash.",
                    "type [可选参数]: String/Function,参数: [值, 键]. 可以是'all', 'with', 'without'[默认], 或函数."
                ],
                $snippet:[
                    "var a={a:1},b={b:1}; alert(_.serialize(_.merge(a,b)))",
                    "var a={a:1},b={a:2,b:1}; alert(_.serialize(_.merge(a,b,'with')))",
                    "var a={a:1},b={a:2,b:1}; alert(_.serialize(_.merge(a,b,'all')))",
                    "var a={a:1},b={a:2,b:1}; alert(_.serialize(_.merge(a,b,function(o,i){return o!=1})))"
                ]
            },
            resetRun:{
                $desc:"设置可覆盖式的异步执行函数.如key值相同,后设置的函数会覆盖先前的函数.结果是只有最后设置的函数才会被执行.",
                $paras:[
                    "key [必需参数]: String, 唯一标志符.",
                    "fun [必需参数]: Function, 要执行的函数.",
                    "defer [可选参数]: Number, 多少毫秒后自动执行. 默认为 0",
                    "args [可选参数]: Array, 函数的实际参数.",
                    "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数)."
                ],
                $snippet:[
                    "_.resetRun('id',function(){alert(1)},200);_.resetRun('id',function(){alert(2)},200);_.resetRun('id',function(){alert(3)},200);"
                ],
                $memo:"可以用_.resetRun.exists(id)来判断是否存在名字为id的异步执行函数."
            },
            observableRun:{
                $desc:"将函数包装成一个可在界面上看到反馈(例如,可以看到鼠标的形状变化)的线程并且执行这个线程. ",
                $paras:[
                    "tasks [必需参数]: Funtion/Array, 一个任务函数,或是一组任务函数.",
                    "onEnd [可选参数]: Function, 在线程完后执行的回调函数.",
                    "threadid [可选参数]: Stirng, 线程id. 如果这个id所代表的线程已经存在,那么这个/这组任务函数会被插入到这个线程内执行."
                ],
                $snippet:[
                    "_.observableRun(_.fun());",
                    "//鼠标改变1秒钟后还原: \n"+
                    "_.observableRun(function(threadid){linb.Thread(threadid).suspend(); _.asyRun(function(){linb.Thread(threadid).resume()},1000)});"
                ]
            },
            stringify:{
                $desc: "将对象序列化为一个JSON字符串(不强制转换成UTF8编码).",
                $rtn: "String",
                $paras:[
                    "obj [必需参数]: Object, 目标对象. ",
                    "filter [可选参数]: Function, 参数: [值, 键]. 判断是否序列化该项. 也可以是 [true],表示会忽略以'_'开头的项",
                    "dateformat  [可选参数]: String, 'utc' or 'gmt'. 强行将[Date]类型转化为ISO UTC字符串, ISO GMT 字符串, 或默认格式( new Date(yyyy,mm,dd,hh,nn,ss,ms) )."
                ],
                $snippet:[
                    "alert(_.stringify('a'));"+
                    "alert(_.stringify({a:1}));"+
                    "alert(_.stringify([1,2,{a:1}]));"+
                    "alert(_.stringify([1,2,{_a:1}],true));"+
                    "alert(_.stringify({d:new Date}));"+
                    "alert(_.stringify({d:new Date},'utc'))",
                    "alert(_.stringify({d:new Date},'gmt'))",
                    "alert(_.stringify(linb('btnLang')))",
                    "alert(_.stringify(linb.Dom.byId('btnLang')))",
                    "alert(_.stringify(linb.UIProfile.getFromDom('btnLang')))",
                    "alert(_.stringify(linb.UIProfile.getFromDom('btnLang').boxing()))"
                ]
            },
            serialize:{
                $desc: "将对象序列化为一个JSON字符串(强制转换成UTF8编码).",
                $rtn: "String",
                $paras:[
                    "obj [必需参数]: Object, 目标对象. ",
                    "filter [可选参数]: Function, 参数: [值, 键]. 判断是否序列化该项. 也可以是 [true],表示会忽略以'_'开头的项",
                    "dateformat  [可选参数]: String, 'utc' or 'gmt'. 强行将[Date]类型转化为ISO UTC字符串, ISO GMT 字符串, 或默认格式( new Date(yyyy,mm,dd,hh,nn,ss,ms) )."
                ],
                $snippet:[
                    "alert(_.serialize('a'));"+
                    "alert(_.serialize({a:1}));"+
                    "alert(_.serialize([1,2,{a:1}]));"+
                    "alert(_.serialize([1,2,{_a:1}],true));"+
                    "alert(_.serialize({d:new Date}));"+
                    "alert(_.serialize({d:new Date},null,'utc'))",
                    "alert(_.serialize({d:new Date},null,'gmt'))",
                    "alert(_.serialize(linb('btnLang')))",
                    "alert(_.serialize(linb.Dom.byId('btnLang')))",
                    "alert(_.serialize(linb.UIProfile.getFromDom('btnLang')))",
                    "alert(_.serialize(linb.UIProfile.getFromDom('btnLang').boxing()))"
                ]
            },
            set:{
                $desc:"设置或取消设置多层hash中的某个项.",
                $rtn:"Object",
                $paras:[
                    "hash [必需参数]: Object, 多重键值对.",
                    "path [必需参数]: Array, 目标路径, ['a','b','c'] => {a:{b:{c:[variable]}}}.",
                    "value [可选参数]: any, 项的新值. 如果是undefined则被清空."
                ],
                $snippet:[
                    "var o={}; _.set(o,['a','b','c'], 1); alert(_.serialize(o)); _.set(o,['a','b','c']); alert(_.serialize(o));"
                ]
            },
            toUTF8:{
                $desc:"把一个字符串专程 UTF8 格式.",
                $rtn:"String",
                $paras:[
                    "str [必须参数] : String."
                ],
                $snippet:[
                    "alert(_.toUTF8('汉字'));",
                    "alert(_.fromUTF8(_.toUTF8('汉字')));"
                ]
            },
            fromUTF8:{
                $desc:"把一个字符串从 UTF8 格式转回来.",
                $rtn:"String",
                $paras:[
                    "str [必须参数] : String."
                ],
                $snippet:[
                    "alert(_.toUTF8('汉字'));",
                    "alert(_.fromUTF8(_.toUTF8('汉字')));"
                ]
            },
            urlEncode:{
                $desc:"将键值对转化为URL请求字符串.",
                $rtn:"String",
                $paras:[
                    "hash [必需参数] : 键值对."
                ],
                $snippet:[
                    "alert(_.urlEncode({a:1,b:2}));"+
                    "alert(_.urlEncode({a:1,b:{b1:1,b2:2}}));"+
                    "alert(_.serialize(_.urlDecode(_.urlEncode({a:1,b:{b1:1,b2:2}}))))"
                ]
            },
            urlDecode:{
                $desc:"将URL请求字符串转化为键值对,或获取某一个键的值.",
                $rtn:"Object",
                $paras:[
                    "str [必需参数] : String, URL请求字符串.",
                    "key [可选参数] : String, 键名字"
                ],
                $snippet:[
                    "var qs='a=1&b=2&c=3'; alert(_.serialize(_.urlDecode(qs)));alert(_.urlDecode(qs,'a'));"
                ]
            },
            str:{
                $desc:"字符串的功能函数集合.",
                endWith :{
                    $desc:"测试字符串是否以另一个串结尾.",
                    $rtn:'Boolean',
                    $paras:[
                        "str [必需参数]: String, 目标字符串.",
                        "eStr [必需参数]: String, 要测试的结尾串."
                    ],
                    $snippet:[
                        "alert(_.str.endWith('abc','c'))"
                    ]
                },
                initial:{
                    $desc:"将指定的字符串首字母改为大写.",
                    $rtn:'String',
                    $paras:[
                        "str [必需参数]: String, 目标字符串."
                    ],
                    $snippet:[
                        "alert(_.str.initial('abc'))"
                    ]
                },
                ltrim :{
                    $desc:"拷贝一个字符串,并将左边的空白字符去掉.",
                    $rtn:'String',
                    $paras:[
                        "str [必需参数]: String, 目标字符串."
                    ],
                    $snippet:[
                        "alert(_.str.ltrim(' abc ').length)"
                    ]
                },
                repeat:{
                    $desc:"将目标字符串复制多少次, 并返回结果.",
                    $rtn:'String',
                    $paras:[
                        "str [必需参数]: String, 目标字符串.",
                        "times [必需参数]: 重复次数"
                    ],
                    $snippet:[
                        "alert(_.str.repeat('abc',3))"
                    ]
                },
                rtrim :{
                    $desc:"拷贝一个字符串,并将右边的空白字符去掉.",
                    $rtn:'String',
                    $paras:[
                        "str [必需参数]: String, 目标字符串."
                    ],
                    $snippet:[
                        "alert(_.str.rtrim(' abc ').length)"
                    ]
                },
                startWith :{
                        $desc:"测试字符串是否以另一个串开头.",
                        $rtn:'Boolean',
                        $paras:[
                            "str [必需参数]: String, 目标字符串.",
                            "sStr [必需参数]: String, 测试的开头字符串."
                        ],
                        $snippet:[
                            "alert(_.str.startWith('abc','a'))"
                        ]
                },
                toDom:{
                    $desc:"将html串的直接转化为DOM对象.",
                    $rtn:'linb.Dom',
                    $paras:[
                        "str [必需参数]: String, 目标字符串."
                    ],
                    $snippet:[
                        "var node = _.str.toDom('<div>a</div>'); alert(node.outerHTML())"
                    ]
                },
                trim :{
                    $desc:"拷贝一个字符串,并将左右两边的空白字符去掉.",
                    $rtn:'String',
                    $paras:[
                        "str [必需参数]: String, 目标字符串."
                    ],
                    $snippet:[
                        "alert(_.str.trim(' abc ').length)"
                    ]
                }
            },
            toArr:{
                $desc:"将字符串或键值对分割成数组.",
                $rtn:"Array",
                $paras:[
                    "value [必需参数]: Object, 要分割的字符串或对象.",
                    "force [可选参数]: Boolean/String, 如果是一个字符串（通常是一个字符）表示将一个字符串转换成Array;如果是 Boolean 表示将一个键值对转换成Array."
                ],
                $snippet:[
                    "var s='a,b,c', a=_.toArr(s); alert(_.serialize(a));",
                    "var s='a:b:c', a=_.toArr(s,':'); alert(_.serialize(a));",
                    "var f=function(a,b,c){ var a=_.toArr(arguments);alert(_.serialize(a));}; f(1,2,3); ",
                    "var hash={a:1,b:2}, a=_.toArr(hash,true); alert(_.serialize(a));",
                    "var hash={a:1,b:2}, a=_.toArr(hash,false); alert(_.serialize(a));"
                ]
            },
            tryF:{
                $desc:"试着执行一个函数.",
                $rtn:"Object",
                $paras:[
                    "fun [必需参数]: Function. 要执行的函数.",
                    "args [可选参数]: Array, 函数的参数.",
                    "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数).",
                    "df [可选参数]: Object. 默认的返回值(如果[fun]不是一个真正的函数)"
                ],
                $snippet:[
                    "alert(_.tryF()); alert(_.tryF('s')); alert(_.tryF(4,null,null,true)); ",
                    "var f=function(){return 'a';}; alert(_.tryF(f));",
                    "var f=function(v){alert(v);return this.a;}, o={a:true}; alert(_.tryF(f,['parameter'],o));"
                ]
            },
            unserialize:{
                $desc:"将JSON字符串反序列化为一个Javascript对象.",
                $rtn:"Object",
                $paras:[
                    "str [必需参数]: String, JSON字符串.",
                    "dateformat [可选参数]: String, 时间格式."
                ],
                $snippet:[
                    "var o={a:[1,{k:1}],s:'s',d:new Date},str; alert(str=_.serialize(o)); var o2=_.unserialize(str); alert(o2.d)",
                    "var o={a:[1,,{k:1}],s:'s',d:new Date},str; alert(str=_.serialize(o)); var o2=_.unserialize(str, true); alert(o2.d)",
                    "alert(typeof _.unserialize(_.serialize(linb('btnLang'))))",
                    "alert(typeof _.unserialize(_.serialize(linb.Dom.byId('btnLang'))))",
                    "alert(typeof _.unserialize(_.serialize(linb.UIProfile.getFromDom('btnLang'))))",
                    "alert(typeof _.unserialize(_.serialize(linb.UIProfile.getFromDom('btnLang').boxing())))"
                ]
            }
         }
    });

     var $me=linb.Locale.cn.doc;

    _.set(linb.Locale,["cn","doc","linb"], {
        $desc:"linb的根部命名空间.<br />当做函数用是将一系列的DOM元素包装成linb.Dom对象的快捷函数.",
        $rtn:"linb.Dom",
        $paras:[
            "nodes [可选参数]: Element/Element[]/String/String[]/Function, 代表一个或一组DOM元素的字符串、变量或函数,可以是一个[DOM元素], 一个[DOM元素]数组, 一个[DOM元素id], 一个[DOM元素id]数组, 一个[linbid], 或一个[linbid]数组,等等. 默认为 [].",
            "flag [可选参数]: Boolean, 指示是否忽略数值检测和清理函数(以获取更好的性能). 默认为 false. 只有在输入一个[linbid]数组的情况下这个参数才能为[true]"
        ],
        $snippet:[
            "//输入一个DOM节点的 id 字符串\n var n=linb('btnLang'); alert(n.get(0).id);",
            "//输入一个DOM节点 \n var n=linb(document.getElementById('btnLang')); alert(n.get(0).id);",
            "//输入一个DOM节点的 id 数组\n var n=linb(['btnLang']); alert(n.get(0).id);",
            "//输入一个DOM节点数组\n var n=linb([document.getElementById('btnLang')]); alert(n.get(0).id);",
            "//输入一个linb.Dom 变量 \n var n=linb(linb('btnLang')); alert(n.get(0).id);",
            "//输入一个linb.UI 变量\n var n=linb(linb.UI.Div.getAll()); alert(n.get(0).id);",
            "//输入一个能返回DOM节点数组的函数\n var n=linb(function(){return [document.getElementById('btnLang')]}); alert(n.get(0).id);",
            "//输入一个 linbid 字符串\n var linbid=linb.getId('btnLang'), n=linb(linbid); alert(linbid);alert(n.get(0).id);",
            "//输入一个 linbid 字符串数组\n var linbid=linb.getId('btnLang'), n=linb([linbid],false); alert(linbid);alert(n.get(0).id);"
        ],
        SERIALIZEMAXLAYER:{
             $desc:"序列化限制的的最深层数"
        },
        SERIALIZEMAXSIZE:{
            $desc:"序列化限制的最大对象数"
        },
        use:{
            $desc:"用一个linbid(每个linbid都会对应一个dom元素)来实现对一个dom元素的快速引用.本操作不会有新的linb.Dom对象产生.",
            $rtn:"linb.Dom",
            $paras:[
                "linbid [必需参数]: String. 每个linbid都会对应一个dom元素."
            ],
            $snippet:[
                    "var id='linb.temp.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=linb.create('<button>click me</button>')); o.onClick(function(p,e,linbid){ linb.use(linbid).text('updated')  });"+
                    "}"
            ],
            $memo:"由于本操作用的是一个缓存的linb.Dom对象,所以每次应直接对linb.use的返回值进行操作,而不要返回值作为变量值来保存."
        },
        getId:{
            $desc:"从一个dom元素或dom id得到它对应的linbid.",
            $rtn:'String',
            $snippet:[
                "alert(linb.getId('btnLang'))"
            ]
        },
        getNode:{
            $desc:"从一个linbid得到它对应的dom元素.",
            $rtn:'Object'
        },
        setNodeData:{
            $desc:"为一个dom元素设置数据",
            $rtn:"Object",
            $paras:[
                "node [必需参数]: Element/String, 要设置数据的Dom元素或linbid.",
                "path [必需参数]: Array, 项路径, ['a','b','c'] => {a:{b:{c:[variable]}}}.",
                "value [可选参数]: any, 项的新值. "
            ],
            $snippet:[
                    "var id='linb.temp.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=linb.create('<button>click me</button>')); linb.setNodeData(o.get(0), 'key1','value1'); linb.setNodeData(o.get(0),['key21','key22'],'value2'); o.onClick(function(p,e,linbid){ alert(linb.getNodeData(linbid, 'key1')); alert(linb.getNodeData(linbid, ['key21','key22']));});"+
                    "}"
            ]
        },
        getNodeData:{
            $desc:"得到一个dom元素上的特定数据（这个数据是由setNodeData设置的）",
            $rtn:"Object",
            $paras:[
                "node [必需参数]: Element/String, 已经设置数据的Dom元素或linbid.",
                "path [必需参数]: Array, 项路径"
            ],
            $snippet:[
                    "var id='linb.temp.3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=linb.create('<button>click me</button>')); linb.setNodeData(o.get(0), 'key1','value1'); linb.setNodeData(o.get(0),['key21','key22'],'value2'); o.onClick(function(p,e,linbid){ alert(linb.getNodeData(linbid, 'key1')); alert(linb.getNodeData(linbid, ['key21','key22']));});"+
                    "}"
            ]
        },
        isDomReady:{
            $desc:"判断DOM是否加载成功.",
            $rtn:"Boolean",
            $snippet:[
                "alert(linb.isDomReady)"
            ]
        },
        Locale: {
            $desc:"linb.Locale是一个键值对, 用以存储本地化的信息.",
            $rtn:"Object",
            $snippet:[
                "_.each(linb.Locale.en,function(o,i){alert(i+':'+o)})"
            ],
            $memo:"程序员请使用linb.getRes([resource key])来获取本地化的值"
        },
        browser:{
            $desc:"linb.browser是一个键值对, 用以当前浏览器的信息.",
            $rtn:"Object",
            $snippet:[
                "alert(_.serialize(linb.browser))"
            ]
        },
        ini:{
            $desc:"linb.ini 是一个键值对, 用以存储jsLinb库,应用程序路径等相关路径的信息, . 如果程序员使用了自定义的路径[linb_ini](jsLinb库加载前申明.),这些自定义的路径也将被合并到[linb.ini]里面.",
            $rtn:"Object",
            $snippet:[
                "alert(_.serialize(linb.ini))"
            ]
        },
        win:{
            $desc:"linb([window])的快捷访问.",
            $rtn:"linb.Dom"
        },
        doc:{
            $desc:"linb([document])的快捷访问.",
            $rtn:"linb.Dom"
        },

        create:{
            $desc:"生成一个DOM element 或 linb.UI 对象.",
            $rtn:"linb.Dom/linb.UI",
            $snippet:[
                "//输入一个DOM节点的名字来生成DOM元素\n var a=linb.create('div'); alert(a.get(0).nodeName)",
                "//输入一个html字符串来生成DOM元素\n var a=linb.create('<div>node</div>'); alert(a.get(0).nodeName)",
                "//输入UI类的名字来生成一个控件\n var a=linb.create('linb.UI.Button'); alert(a.get(0).key)",
                "//输入UI类的名字和其他参数来生成一个控件\n //parameters: // key,properties, events, host \n var a=linb.create('linb.UI.Button',{caption:'btn'}); alert(a.get(0).key)",
                "//输入一个UI类的profile变量来生成一个控件\n var profile = (new linb.UI.Button()).get(0); var a=linb.create(profile); alert(a.get(0).key)"
            ]
        },
        getObject:{
            $desc:"每一个控件对象都有一个全局唯一的id, 调用该函数可以获取该id对应的对象",
            $rtn:'linb.UIProfile',
            $paras:[
                "id [必需参数]: String, 控件的全局 id."
            ],
            $snippet:[
                "var id=linb.UI.getAll().get(0).getId(); alert(linb.getObject(id).key);"
            ]
        },
        getPath:{
            $desc:"获取类（或其他文件）存放的绝对URL路径.",
            $rtn:'String',
            $paras:[
                "key [必需参数]: String, 类名.",
                "tag [可选参数]: String, 文件后缀.",
                "folder [可选参数]: String, 文件夹名."
            ],
            $snippet:[
                "alert(linb.getPath('a.b.c')); alert(linb.getPath('a.b.c','.js')); alert(linb.getPath('a.b.c','.gif','img')); ",
                "alert(linb.getPath('linb.b.c')); alert(linb.getPath('linb.b.c','.js')); alert(linb.getPath('linb.b.c','.gif','img')); "
            ]
        },
        adjustRes:{
            $desc:"调整字符串内部的资源字符串（以 $开头并包括'.'的词）.",
            $rtn:'String',
            $paras:[
                "str [必需参数]: String, 包含资源id的字符串.",
                "wrap [可选参数]: Boolean, 如果含有资源id的话,是否用wrapRes来替换. 默认为 false,表示用getRes来替换"
            ],
            $snippet:[
                "alert(linb.adjustRes('$color.LIST.E1FFFF $color.LIST.E1FFFF $abd.kkk  $abc')); "
            ]
        },
        getRes:{
            $desc:"获取资源id对应的资源串.",
            $rtn:'String',
            $paras:[
                "id [必需参数]: String, 资源id."
            ],
            $snippet:[
                "alert(linb.getRes('doc.Namespace.$desc')); alert(linb.Locale[linb.getLang()].doc.Namespace.$desc); ",
                "alert(linb.getRes('color.LIST.E1FFFF')); alert(linb.Locale[linb.getLang()].color.LIST.E1FFFF); ",
                "//如果不存在,返回最后一个关键字 \n alert(linb.getRes('doesnt.exist'))"

            ],
            $memo:"所有的资源字符串都位于 [linb.Locale] <br \> [<a href='#linb.setLang'>linb.setLang</a>], [<a href='#linb.getRes'>linb.getRes</a>/<a href='#linb.wrapRes'>linb.wrapRes</a>] 通常一起使用."
        },
        include:{
            $desc:"将某个类的.js 包含到当前文档中.",
            $paras:[
                "id [必需参数]: String, 特征字符串（包括名字空间的类名字）. 如果该类已经存在,则直接返回不会在做包含文件的工作. 如果强制包含文件,该参数可以设置为 '' .",
                "path [必需参数]: String, .js 文件路径",
                "onSuccess [可选参数]: Function, 包含文件成功时触发的回调函数. ",
                "onFail [可选参数]: Function, 包含文件失败时触发的回调函数.",
                "sync [可选参数]: Boolean, 是否同步. 如果是同步,要确保path在同域名下."
            ],
            $snippet:[
                "//改类已经存在,会直接调用onSuccess. \n"+
                "linb.include('linb.Thread', '../js/clsname.js',function(){alert('success');},function(){alert('fail')});",
                "//包含一个存在的 .js 文件\n"+
                "App.Test1=undefined; linb.include('App.Test1', 'App/js/Test1.js',function(){alert('success');},function(){alert('fail')});",
                "//包含一个不存在的.js文件 \n " +
                "linb.include('App.doesntexist', 'App/js/doesntexist.js', function(){alert('success');},function(){alert('fail')});"
            ]
        },
        require:{
            $desc:"确保某个类加载到内存.",
            $paras:[
                "cls [必需参数]: String, 符合jsLinb规范的类名",
                "sync [可选参数]: Boolean, 是否同步. 如果是同步,要确保cls的对应代码文件在同域名下.",
                "onSuccess [可选参数]: Function, 包含文件成功时触发的回调函数. ",
                "onFail [可选参数]: Function, 包含文件失败时触发的回调函数."
            ],
            $snippet:[
                "// 同步获取一个存在的 .js 文件\n"+
                "App.Test1=undefined; linb.require('App.Test1',true); alert(App.Test1.KEY);",
                "// 一个不存在的.js文件 \n " +
                "linb.require('App.doesntexist',true,null,function(rsp){alert(rsp)});"
            ]
        },
        request:{
            $desc:"向特定的服务地址发送数据请求. linb.request会按照情况选用linb.Ajax, linb.SAjax 或 linb.IAjax： "+
                  "<br /><b>默认=>linb.Ajax; 目标地址跨域=>linb.SAjax; 如果用'post'方法=>linb.IAjax;</b>",
            $paras:[
                "uri [必需参数]: String, 目标地址.",
                "query [可选参数]:  Object/String, 请求的输入数据. ",
                "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数.",
                "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数.",
                "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                "options [可选参数]: Object, 一组配置数据."
            ],
            $memo:"请参考 <a href='#linb.Ajax'>linb.Ajax</a>, <a href='#linb.SAjax'>linb.SAjax</a>, <a href='#linb.IAjax'>linb.IAjax</a>!"
        },
        log:{
            $desc:"记录信息到Debugger窗口,如果当前是firefox并有firebug开启,会同时记录信息到firebug中.",
            $snippet:[
                "linb.log(1,'a',[],{});"
            ],
            $memo:"同时可以输入多个参数;必需使用linb.Debugger.js 来开启Debugger功能."
        },
        main:{
            $desc:"指定主函数,该函数在DOM加载完成后执行. 程序员可以指定多个主函数. 这些函数将以出现的顺序执行.",
            $paras:[
                'fun [必需参数]: Function, Dom ready后要执行的主函数.'
            ],
            $snippet:[
                "//linb.main(function(){alert('first')}); \n//linb.main(function(){alert('second')}); \n ////The above code will bind two functions to DOM ready event."
            ]
        },
        message:{
            $desc:"显示一个文本消息.",
            $paras:[
                "body [必需参数]: String, 消息内容.",
                "head [可选参数]: String, 消息标题.",
                "width [可选参数]: Number, 消息框宽度. 默认为 200px.",
                "time [可选参数]: Number, 多少毫秒后消息框自动消失. 默认为 5000ms."
            ],
            $snippet:[
                "linb.message('A message')",
                "//宽设定为100px； 在1秒后消失. \n" +
                "linb.message('Body', 'Head', 100, 1000)"
            ],
            $memo:"要使用该函数,需要包含文件linb.Debugger.js."
        },
        alert:{
            $desc:"弹出一个警告框.",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 警告框标题.",
                "content [可选参数] : String, 警告语句.",
                "btnCap  [可选参数] : String, 按钮文字.",
                "onClose [可选参数] : Function, alert窗口关闭的回调函数.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的alert窗口,默认为[false]."
            ],
            $snippet:[
                "linb.alert('title','content',function(){alert('ok')})",
                "linb.alert('title','content content content content content content content content content content content content ',function(){alert('ok')})"
            ]
        },
        confirm:{
            $desc:"弹出一个确认框.",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 确认框的标题.",
                "content [可选参数] : String, 确认的提示语句.",
                "onYes [可选参数] : Function, the Yes 回调函数.",
                "onNo [可选参数] : Function, the No 回调函数.",
                "btnCapYes [可选参数] : String, Yes按钮的文字.",
                "btnCapNo [可选参数] : String, No按钮的文字.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的confirm窗口,默认为[false]."
            ],
            $snippet:[
                "linb.confirm('title','content',function(){alert('yes')},function(){alert('no')})",
                "linb.confirm('title','content content content content content content content content content content content content ',function(){alert('yes')},function(){alert('no')})"
            ]
        },
        pop:{
            $desc:"弹出一个简易对话框.（非模态）",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 简易对话框标题文字.",
                "content [可选参数] : String, 窗体内容输入文字",
                "btnCap [可选参数] : String, OK按钮文字.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id"
            ],
            $snippet:[
                "linb.pop('title','content')",
                "linb.pop('title','content content content content content content content content content content content content ','I knew it!')"
            ]
        },
        prompt:{
            $desc:"弹出一个输入框.",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 输入框标题文字.",
                "caption [可选参数] : String, 提示文字.",
                "content [可选参数] : String, 默认输入文字.",
                "onYes [可选参数] : Function, 用户单击Yes 回调函数.",
                "onNo [可选参数] : Function, 用户单击 No 回调函数.",
                "btnCapYes [可选参数] : String, Yes按钮的文字.",
                "btnCapNo [可选参数] : String, No按钮的文字.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的prompt窗口,默认为[false]."
            ],
            $snippet:[
                "linb.prompt('title','caption', 'content content ',function(str){alert(str)})"
            ]
        },
        subscribe:{
            $desc:"订阅系统消息.",
            $rtn:"Integer",
            $paras:[
                "topic [必需参数]: String, 订阅的主题.", 
                "subscriber [必需参数]: String, 订阅者的唯一标识id.", 
                "receiver [必需参数]: Function, 订阅者的消息接收器. 同步的回调函数如返回false，会阻止消息发布到以后订阅者.", 
                "asy [可选参数]: Boolean, 是否异步订阅, 默认为[false]."
            ],
            $snippet:[
                "linb.subscribe('topic1','id1', function(msg){alert('subscriber 1th got a message: '+msg)},true);"+
                "linb.subscribe('topic1','id2', function(msg){alert('subscriber 2th got a message: '+msg);return false});"+
                "linb.subscribe('topic1','id3', function(msg){alert('subscriber 3th got a message: '+msg)});"+
                "linb.publish('topic1',['The topic1 was published!']);"+
                "linb.unsubscribe('topic1');"+
                "linb.publish('topic1');"+
                "linb.unsubscribe();"
            ]
        },
        unsubscribe:{
            $desc:"退订系统消息.",
            $rtn:"undefined",
            $paras:[
                "topic [可选参数]: String, 订阅的主题. 如不指定该参数会退订所有系统中的订阅.", 
                "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会退订所有topic下的订阅."
            ]
        },
        publish:{
            $desc:"发布系统消息.",
            $rtn:"undefined",
            $paras:[
                "topic [可选参数]: String, 发布消息的主题. 如不指定该参数会对所有发布消息.", 
                "args [可选参数]: Array, 发布消息的参数.", 
                "scope [可选参数]: Object, 发布消息所调用函数的scope."
            ]
        },
        getSubscribers:{
            $desc:"得到系统的消息订阅情况.",
            $rtn:"Object",
            $paras:[
                "topic [可选参数]: String, 订阅的主题. 如不指定该参数会返回所有系统中的订阅.", 
                "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会返回所有topic下的订阅."
            ]
        },

        getDateFormat:{
            $desc:"得到当前应用程序的日期序列化方式.",
            $rtn:"String",
            $snippet:[
                "linb.setDateFormat('default'); alert(linb.getDateFormat()); alert(_.serialize(new Date));",
                "linb.setDateFormat('gmt'); alert(linb.getDateFormat()); alert(_.serialize(new Date));",
                "linb.setDateFormat('utc'); alert(linb.getDateFormat()); alert(_.serialize(new Date));"
            ]
        },
        setDateFormat:{
            $desc:"设置当前应用程序的日期序列化方式. 'gmt', 'utc' 或 'default'.",
            $snippet:[
                "linb.setDateFormat('default'); alert(linb.getDateFormat()); alert(_.serialize(new Date));",
                "linb.setDateFormat('gmt'); alert(linb.getDateFormat()); alert(_.serialize(new Date));",
                "linb.setDateFormat('utc'); alert(linb.getDateFormat()); alert(_.serialize(new Date));"
            ]
        },
        getAppLangKey:{
            $desc:"得到当前应用程序的语言包关键字.",
            $rtn:"String",
            $snippet:["linb.setAppLangKey('app'); alert(linb.getAppLangKey());"]
        },
        setAppLangKey:{
            $desc:"设置当前应用程序的语言包关键字. 如果此关键字被设置,当用 linb.setLang 设置界面语言的时候,系统会试图从 Locale/[linb.getLang()].js 文件加载当前应用程序的语言包.",
            $snippet:["linb.setAppLangKey('app'); alert(linb.getAppLangKey());"]
        },
        getLang:{
            $desc:"得到界面的语言关键字.",
            $rtn:"String",
            $snippet:["alert(linb.getLang());"]
        },
        setLang:{
            $desc:"重新设置整个页面的语言. 系统会重新查找(in [linb.ini.path]/Locale/)和(in [linb.ini.appPath]/Locale/)并装载语言包.",
            $paras:[
                "key [必需参数]: String, 语言的关键字.",
                "callback [可选参数]: Function, 回调函数."
            ],
            $memo:"所有的资源字符串都位于 [linb.Locale]. <br \> [<a href='#linb.setLang'>linb.setLang</a>], [<a href='#linb.getRes'>linb.getRes</a>/<a href='#linb.wrapRes'>linb.wrapRes</a>] 通常一起使用."
        },
        //request ( uri, query, onSuccess, onFail, threadid, args ),
        wrapRes:{
            $desc:"获取资源标志符对应的资源字符串, 并将其包装成特定的形式.",
            $rtn:'String',
            $paras:[
                "id [必需参数]: String, 资源 id."
            ],
            $snippet:[
                "alert(linb.wrapRes('doc.Namespace.$desc')); alert(linb.Locale[linb.getLang()].doc.Namespace.$desc); ",
                "alert(linb.wrapRes('color.LIST.E1FFFF')); alert(linb.Locale[linb.getLang()].color.LIST.E1FFFF); ",
                "//如果不存在,返回最后一个关键字\n alert(linb.wrapRes('doesnt.exist'))"

            ],
            $memo:"所有的资源字符串都位于 [linb.Locale]. <br \> [<a href='#linb.setLang'>linb.setLang</a>], [<a href='#linb.getRes'>linb.getRes</a>/<a href='#linb.wrapRes'>linb.wrapRes</a>] 通常一起使用."
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Thread"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Thread类.用函数调用的方式（不要使用 new linb.Thread ）来创造linb.Thread<br />函数调用：直接获取或生成一个异步线程对象. <br /> linb.Thread 的运行模式: <strong>[onStart function]--delay 1-->[task function 1][回调函数 1]--delay 2-->[task function 2][回调函数 2]--delay 3-->[task function ...n][回调函数 ...n][onEnd function]</strong>",
        $rtn:"linb.Thread",
        $paras:[
            "id [必需参数]: String, 线程的识别号. 如果已经存在这个识别号,该函数将返回对应的线程对象; 如果不存在,或函数没有指定, 系统将产生一个新的linb.Thread对象, 并给它分配一个唯一的id. 如果程序员不想指定它,可以用null.",
            "tasks [必需参数]: Array, 线程要执行的函数/或函数包. 包格式:<br> { <br>"+
                    "task [必需参数],      //Function, 函数的参数: args or [threadid]. 任务函数.<br>"+
                    "args [可选参数],      //Array, 任务函数的参数.<br>"+
                    "scope [可选参数],    //Object, 任务函数的this指针.<br>"+
                    "delay [可选参数],     //Number,任务的延迟时间(毫秒).如不指定,将用默认的延迟时间.<br>"+
                    "callback [可选参数]   //Function, 函数的参数: [threadid]. 任务函数执行成功后的回调函数. 回调函数如果返回false, 线程将提前终止. <br>"+
                "}",
            "delay [可选参数]: Number, 每个任务的默认延迟时间(毫秒). 默认为 0.",
            "callback [可选参数]: Function, 函数的参数: [threadid]. 默认的回调函数.",
            "onStart [可选参数]: Function, 函数的参数: [threadid]. 该函数在所有任务函数开始前被调用.",
            "onEnd [可选参数]: Function, 函数的参数: [threadid]. 该函数在线程结束后被调用.",
            "cycle [可选参数]: 指示线程是否循环执行. 默认为 [false]."
        ],
        $snippet:[
            "linb.Thread(null, [function(){linb.message(1)},function(){linb.message(2)}]).start()",
            "linb.Thread(null, [function(){linb.message(1)},function(){linb.message(2)}],2000).start()",
            "linb.Thread('_id', [function(){linb.message(1);linb.Thread('_id').abort();},function(){linb.message(2)}]).start();",
            "linb.Thread(null, [function(){linb.message(1)},{task:function(){},callback:function(){return false}},function(){linb.message(2)}]).start()",
            "var a=[];linb.Thread(null, [function(threadid){a.push(threadid+' task1')},function(threadid){a.push(threadid+' task2')}],null,function(threadid){a.push(threadid+' callback')},function(threadid){a.push(threadid+' start')},function(threadid){a.push(threadid+' end'); alert(a);}).start()",
            "var a=[];linb.Thread(null, [function(threadid){a.push(threadid+' task1')},{task:function(threadid){a.push(threadid+' task2')},callback:function(threadid){a.push(threadid+' not the default callback')}}],null,function(threadid){a.push(threadid+' callback')},function(threadid){a.push(threadid+' start')},function(threadid){a.push(threadid+' end'); alert(a);}).start()",
            "var a=[],i=3; linb.Thread(null, [function(){a.push(1)},function(){a.push(2)}],0,function(){i--;if(!i)return false;},null,function(){alert(a);},true).start()"
        ],
        group:{
            $desc:"将一系列的linb.Thread对象(或线程id)编组, 打包到一个可执行的线程. 程序员可并行的执行他们.",
            $rtn:"linb.Thread",
            $paras:[
                "id [必需参数]: String, thread id. 线程id. 不需要指定时可传入[null]..",
                "group [必需参数]: Array, 一系列的linb.Thread对象(或线程id).",
                "callback [可选参数]: Function, 参数: [threadid]. 回调函数.",
                "onStart [可选参数]: Function, 参数: [threadid].  线程开始时调用.",
                "onEnd [可选参数]:  Function, 参数: [threadid].  线程结束时调用."
            ],
            $snippet:[
                "var a=[]; var t1=linb.Thread('t1',[function(){a.push(1)},function(){a.push(2)}]), t2=linb.Thread('t2',[function(){a.push('a')},function(){a.push('b')}]);"+
                "linb.Thread.group(null,[t1,'t2'],function(){a.push('|')},function(){a.push('<')},function(){a.push('>');alert(a);}).start();"
            ],
            $memo:"You have to use start function to start [thread group]!"
        },
        abort:{
            $desc:"按照识别号终止一个线程.",
            $paras:[
                "id [必需参数]: String, 线程id."
            ],
            $snippet:[
                "linb.Thread('_id', [function(){linb.message(1);linb.Thread.abort('_id')},function(){linb.message(2)}]).start();"
            ]
        },
        observableRun:{
            $desc:"将一组任务函数和一个onEnd函数包装到一个从界面上可观测的线程(线程开始时会调用'dom.busy' 显示沙漏图标,线程结束的时候调用'dom.free'还原为默认图标),并执行这个线程. <br /> 如果线程号[threadid]不存在, 就产生一个新的线程. <br /> 如果线程号[threadid]存在, 则会分别插入任务和onEnd函数到现有的线程中.",
            $paras:[
                "tasks [必需参数]: Array, 一系列的任务函数(functions).",
                "onEnd [可选参数]: Function, 'onEnd' 回调函数.",
                "threadid [可选参数]: Stirng, 线程id. 不需要指定时可传入[null]."
            ],
            $snippet:[
                "linb.Thread.observableRun(function(){linb.message('fun')},function(){alert('end')});",
                "linb.Thread.observableRun(2000,function(){alert('end')});",
                "linb.Thread.observableRun([function(){linb.message('fun')},2000],function(){alert('end')});",
                "var a=[];linb.Thread.observableRun([{task:function(){a.push(3);},delay:2000}],function(){a.push(4);alert(a);},'__id'); linb.Thread.observableRun([function(){a.push(1)}],function(){a.push(2)},'__id');"
            ]
        },
        repeat:{
            $desc:"重复执行一个任务函数,直到这个函数返回 [false].",
            $rtn:"linb.Thread",
            $paras:[
                "task [必需参数]: Function, 要重复执行的任务.",
                "interval [可选参数]: Number, 重复执行的间隔毫秒数.",
                "onStart [可选参数]: Function, 参数: [threadid].  重复执行之前调用.",
                "onEnd [可选参数]:  Function, 参数: [threadid].  重复执行之后调用."
            ],
            $snippet:[
                "var l=1; linb.Thread.repeat(function(){alert('repeat time:' + (l++)); if(l>3)return false;}, 500)"
            ]
        },
        isAlive:{
            $desc:"按照识别号判断某个线程是否还活着.",
            $rtn:"Boolean",
            $paras:[
                "id [必需参数]: String, 线程id."
            ],
            $snippet:[
                "alert(linb.Thread.isAlive('_id'))",
                "var a=[];linb.Thread('_id', [function(){a.push(1);a.push(linb.Thread.isAlive('_id'));},function(){a.push(2)}],0,null,null,function(){alert(a)}).start();"
            ]
        },
        group:{
            $desc:"将一系列的linb.Thread对象(或线程id)编组, 打包到一个可执行的线程. 程序员可并行的执行他们.",
            $rtn:"linb.Thread",
            $paras:[
                "id [必需参数]: String, thread id. 线程id. 不需要指定时可传入[null]..",
                "group [必需参数]: Array, 一系列的linb.Thread对象(或线程id).",
                "callback [可选参数]: Function, 参数: [threadid]. 回调函数.",
                "onStart [可选参数]: Function, 参数: [threadid].  线程开始时调用.",
                "onEnd [可选参数]:  Function, 参数: [threadid].  线程结束时调用."
            ],
            $snippet:[
                "var a=[]; var t1=linb.Thread('t1',[function(){a.push(1)},function(){a.push(2)}]), t2=linb.Thread('t2',[function(){a.push('a')},function(){a.push('b')}]);"+
                "linb.Thread.group(null,[t1,'t2'],function(){a.push('|')},function(){a.push('<')},function(){a.push('>');alert(a);}).start();"
            ],
            $memo:"You have to use start function to start [thread group]!"
        },
        suspend:{
            $desc:"挂起识别号为给定值的线程.",
            $paras:[
                "id [必需参数]: String, 线程id."
            ],
            $snippet:[
                "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread.suspend('_bb');_.asyRun(function(){linb.Thread.resume('_bb')},3000)},function(){linb.message(2)}]).start();"
            ]
        },
        getStatus:{
            $desc:"得到线程的状态"
        },
        resume:{
            $desc:"继续执行识别号为给定值的线程",
            $paras:[
                "id [必需参数]: String, 线程id."
            ],
            $snippet:[
                "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread.suspend('_bb');_.asyRun(function(){linb.Thread.resume('_bb')},3000)},function(){linb.message(2)}]).start();"
            ]
        },
        start:{
            $desc:"开始执行识别号为给定值的线程",
            $paras:[
                "id [必需参数]: String, 线程id."
            ],
            $snippet:[
                "linb.Thread('_t1', [function(){linb.message(1)},function(){linb.message(2)}]); linb.Thread.start('_t1')"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            links:{
                $desc:"将另一个线程链接到本线程, 并在本线程的回调函数[onEnd]结束后开始执行另一个线程. ",
                $rtn:"[self]",
                $paras:[
                    "thread [必需参数] : linb.Thread Object, 要链接的线程对象."
                ],
                $snippet:[
                    "var out=[];var t1=linb.Thread(null,[function(){out.push(2)},function(){out.push(3)}],null,null,function(){out.push(1)},function(){out.push(4)});" +
                    "var t2=linb.Thread(null,[function(){out.push(6)},function(){out.push(7)}],null,null,function(){out.push(5)},function(){out.push(8);alert(out);});" +
                    "t1.links(t2); t1.start();"
                ]
            },
            isAlive:{
                $desc:"判断线程是否还活着.",
                $rtn:"Boolean"
            },
            abort:{
                $desc:"终止该线程.",
                $snippet:[
                    "linb.Thread('_id', [function(){linb.message(1);linb.Thread('_id').abort()},function(){linb.message(2)}]).start();"
                ]
            },
            suspend:{
                $desc:"挂起该线程",
                $rtn:"[self]",
                $snippet:[
                    "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread('_bb').suspend();_.asyRun(function(){linb.Thread('_bb').resume()},3000)},function(){linb.message(2)}]).start();"
                ]
            },
            resume:{
                $desc:"继续执行一个被挂起的线程.",
                $rtn:"[self]",
                $paras:[
                    "time [可选参数]: undefined/Number/Boolean.<br> "+
                        "Number: 等待多少毫秒后继续. <br> "+
                        "true: 等待默认毫秒后继续. <br> "+
                        "false: 马上继续. <br> "+
                        "undefined: 等待剩余时间后继续. <br> "
                ],
                $snippet:[
                    "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread('_bb').suspend();_.asyRun(function(){linb.Thread('_bb').resume()},3000)},function(){linb.message(2)}]).start();"
                ]
            },
            start:{
                $desc:"开始执行该线程",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数]: String, 线程id."
                ],
                $snippet:[
                    "linb.Thread('_t1', [function(){linb.message(1)},function(){linb.message(2)}]); linb.Thread.start('_t1')"
                ]
            },
            getCache:{
                $desc:"获取线程的缓存数据.",
                $rtn:"Object",
                $paras:[
                    "key [必需参数]: String, 缓存标志符."
                ],
                $snippet:[
                    "linb.Thread(null, [function(){this.setCache('k','v')},function(){linb.message(this.getCache('k'))}]).start();"
                ]
            },
            setCache:{
                $desc:"设置线程的缓存数据.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数]: String, 缓存标志符.",
                    "value [必需参数]: String, 缓存的数据."
                ],
                $snippet:[
                    "linb.Thread(null, [function(){this.setCache('k','v')},function(){linb.message(this.getCache('k'))}]).start();"
                ]
            },
            insert:{
                $desc:"添加一些任务函数到当前线程中.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数]: Array, 添加的任务函数.",
                    "index [可选参数]: Nubmer, 插入函数的位置. 默认为 当前位置(插入到下一个要被执行的任务函数前)."
                ],
                $snippet:[
                    "var out=[];linb.Thread(null,[function(){out.push(1)},function(){this.insert([function(){out.push(1.5)}])},function(){out.push(2)}],null,null,null,function(){alert(out)}).start();"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","absIO"], {
        /*buildQS:{
            $desc:"To build query string.",
            $rtn:"String",
            $paras:[
                "hash [必需参数]: Object, target Object to build query string.",
                "force [可选参数]: Boolean, true: to return 'a serialized String'. false: to return a 'A URL query string'."
            ],
            $snippet:[
                "alert(linb.absIO.buildQS({a:1,b:{aa:1,bb:2}},true)); alert(linb.absIO.buildQS({a:1,b:{aa:1,bb:2}}));"
            ]
        },*/
        groupCall:{
            $desc:"将一系列的linb.absIO对象编组, 并包装到一个线程中. 程序员可并行的执行他们",
            $rtn:"linb.Thread",
            $paras:[
                "hash [必需参数]: Object, 一系列的linb.absIO对象",
                "callback [可选参数]: Function,  当每个linb.absIO对象都终止后,该函数将被调用.",
                "onStart [可选参数]: Function, 当对应的线程开始时调用thread.",
                "onEnd [可选参数]: Function, 当对应的线程结束时调用.",
                "threadid [可选参数]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]"
            ],
            $snippet:[
                "var out=[];var a=linb.Ajax('uri1',0,0,0,0,{retry:0,timeout:500}), b=linb.SAjax('uri2',0,0,0,0,{retry:0,timeout:500}), c=linb.IAjax('uri3',0,0,0,0,{retry:0,timeout:500}); linb.absIO.groupCall({a:a,b:b,c:c},function(id){out.push(id+' end')},function(){out.push('start')},function(){out.push('end');alert(out)}).start();"
            ]
        },
        isCrossDomain:{
            $desc:"判断给定的URI是否跨域.",
            $rtn:"Boolean",
            $paras:[
                "uri [必需参数]: String, URI路径字符串."
            ],
            $snippet:[
                "alert(linb.absIO.isCrossDomain(location.href));alert(linb.absIO.isCrossDomain('http://www.google.com'));"
            ]
        },
        customQS: {
            $desc:"之定义一个请求字符串. 子类可覆盖该函数,以增加多的参数等.",
            $rtn:"Object",
            $paras:[
                "obj [必需参数]: Object or String, 原始的请求字符串."
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行linb.absIO对象",
                $rtn:"[self]",
                $snippet:[
                    "//linb.Ajax('uri').start();"
                ]
            },
            isAlive:{
                $desc:"判断 IO 是否还活着.",
                $rtn:"Boolean"
            },
            abort:{
                $desc:'取消执行linb.absIO对象.',
                $snippet:[
                    "//var a=linb.Ajax('uri').start(); \n //a.abort();"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","MessageService"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.MessageService 类",
        prototype:{
            subscribe:{
                $desc:"订阅消息.",
                $rtn:"Integer",
                $paras:[
                    "topic [必需参数]: String, 订阅的主题.", 
                    "subscriber [必需参数]: String, 订阅者的唯一标识id.", 
                    "receiver [必需参数]: Function, 订阅者的消息接收器. 同步的回调函数如返回false，会阻止消息发布到以后订阅者.", 
                    "asy [可选参数]: Boolean, 是否异步订阅, 默认为[false]."
                ],
                $snippet:[
                    "var jsm=new linb.MessageService();"+
                    "jsm.subscribe('topic1','id1', function(msg){alert('subscriber 1th got a message: '+msg)},true);"+
                    "jsm.subscribe('topic1','id2', function(msg){alert('subscriber 2th got a message: '+msg);return false});"+
                    "jsm.subscribe('topic1','id3', function(msg){alert('subscriber 3th got a message: '+msg)});"+
                    "jsm.publish('topic1',['The topic1 was published!']);"+
                    "jsm.unsubscribe('topic1');"+
                    "jsm.publish('topic1');"+
                    "jsm.unsubscribe();"
                ]
            },
            unsubscribe:{
                $desc:"退订消息.",
                $rtn:"undefined",
                $paras:[
                    "topic [可选参数]: String, 订阅的主题. 如不指定该参数会退订所有的订阅.", 
                    "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会退订所有topic下的订阅."
                ]
            },
            publish:{
                $desc:"发布消息.",
                $rtn:"undefined",
                $paras:[
                    "topic [可选参数]: String, 发布消息的主题. 如不指定该参数会对所有发布消息.", 
                    "args [可选参数]: Array, 发布消息的参数.", 
                    "scope [可选参数]: Object, 发布消息所调用函数的scope."
                ]
            },
            getSubscribers:{
                $desc:"得到消息订阅情况.",
                $rtn:"Object",
                $paras:[
                    "topic [可选参数]: String, 订阅的主题. 如不指定该参数会返回所有的订阅.", 
                    "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会返回所有topic下的订阅."
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","XML"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.XML 类(静态类)",
        json2xml:{
            $desc:"实现 XML 向 JSON 的转换.输入json Object,输出转换后的 xml 文本.",
            $rtn:"String",
            $paras:[
                "jsonObj [必需参数] : Object, JOSON 变量"
            ],
            $snippet:["alert(linb.XML.json2xml({root:{a:1,b:'b','@attr':'r','#text':'text','#cdata':'data'}}))"]
        },
        xml2json:{
            $desc:"实现 JSON 向 XML 的转换.输入 xml Object,输出转换后的 json Object.",
            $rtn:"Object",
            $paras:[
                "xmlObj [必需参数] : Object, XML 变量",
                "kf [可选参数]: Function, 对键值对key字符串的filter函数.",
                "vf [可选参数]: Function, 对键值对value字符串的filter函数."
            ],
            $snippet:["alert(_.serialize(linb.XML.xml2json(linb.XML.parseXML('<a attr=\"1\"><b>v</b></a>'))))"]
        },
        parseXML:{
            $desc:"从文本解析到一个XML变量",
            $rtn:"Object",
            $paras:[
                "xmlText [必需参数] : String, XML 文本"
            ],
            $snippet:["alert(_.serialize(linb.XML.xml2json(linb.XML.parseXML('<a attr=\"1\"><b>v</b></a>'))))"]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","XMLRPC"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.XMLRPC 类(静态类)",
        wrapRequest:{
            $desc:"为一次XML RPC调用包装XML字符串.",
            $rtn:"String",
            $paras:[
                "methodName [必需参数] : String, 要调用的 XML RPC 方法名",
                "params [必需参数] : Object, XML RPC 的调用参数"
            ]
        },
        parseResponse:{
            $desc:"把从XML RPC返回的文档对象解析到JSON变量",
            $rtn:"Object",
            $paras:[
                "xmlObj [必需参数] : Object, XML 文档对象"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","SOAP"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.SOAP 类(静态类)",
        RESULT_NODE_NAME:{
            $desc:"SOAP返回的根节点名字（可自定义）.",
            $snippet:["alert(linb.SOAP.RESULT_NODE_NAME)"]
        },
        wrapRequest:{
            $desc:"为一次SOAP调用包装XML字符串.",
            $rtn:"String",
            $paras:[
                "methodName [必需参数] : String, 要调用的 SOAP 方法名",
                "params [必需参数] : Object, SOAP 的调用参数",
                "wsdl  [必需参数] : Object, SOAP 的wsdl文档"
            ]
        },
        parseResponse:{
            $desc:"把从XML RPC返回的文档对象解析到JSON变量",
            $rtn:"Object",
            $paras:[
                "xmlObj [必需参数] : Object, XML 文档对象",
                "methodName [必需参数] : String, 调用的 SOAP 方法名",
                "wsdl  [必需参数] : Object, SOAP 的wsdl文档"
            ]
        },
        getWsdl:{
            $desc:"得到SOAP调用的WSDL文档（同步方式）",
            $rtn:"Object",
            $paras:[
                "queryURL [必需参数] : String, SOAP服务地址",
                "onFail [必需参数] : Function, 失败时调用的回调函数"
            ]
        },
        getNameSpace:{
            $desc:"得到wsdl文档的命名空间",
            $rtn:"String",
            $paras:[
                "wsdl  [必需参数] : Object, SOAP 的wsdl文档"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Ajax"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Ajax类.用函数调用的方式（不要使用 new linb.Ajax ）来创造linb.Ajax对象.<br />函数调用：生成一个linb.Ajax对象. <strong>linb.Ajax对象可以处理当前域的GET/POST请求; linb.Ajax 也是唯一一个能够处理同步请求的Ajax类.</strong>",
        $rtn:"linb.Ajax",
        $paras:[
            "uri [必需参数]: String/Object, String -- 请求服务的 URL 地址; Object(这时候uri参数等同于 options ) -- 一组用来配置request的键值对. 如果这个参数是Object, 后续的其他参数会被忽略.",
            "query [可选参数]:  Object/String, 要请求的数据.",
            "onSuccess [可选参数]: Function, 函数参数:[response Object, response type, threadid].如请求成功返回,调用这个回调函数.",
            "onFail [可选参数]: Function, 函数参数:[response Object, response type, threadid]. 如请求失败,调用这个回调函数.",
            "threadid [可选参数]: String, 绑定到这个请求的线程id号. 线程操作的顺序：[挂起这个thread -> 执行request -> 继续这个thread]",
            "options [可选参数]: Object, 用来配置这个request的一组键值对. 这些键值对可以包括：" +
                "<br>{"+
                "<br><em>//variables</em>"+
                "<br>&nbsp;&nbsp;uri: String, 请求服务的 URL 地址."+
                "<br>&nbsp;&nbsp;query: String/Object, 请求的数据."+
                "<br>&nbsp;&nbsp;threadid: String, 绑定到这个请求的线程id号."+
                "<br>&nbsp;&nbsp;asy: Boolean, 请求是否为同步请求. 默认为 [false]."+
                "<br>&nbsp;&nbsp;<strong>method: 'GET' 或 'POST', 请求的方法. 默认为 'GET'.</strong>"+
                "<br>&nbsp;&nbsp;retry: Number, 请求所允许的重试次数."+
                "<br>&nbsp;&nbsp;timeout: Number, 请求的超时毫秒数."+
                "<br>&nbsp;&nbsp;reqType: String, 'form','json', 或 'xml'. 请求返回的数据类型,默认是'form'."+
                "<br>&nbsp;&nbsp;rspType: String, 'json', 'text' 或 'xml'. 请求返回的数据类型.,默认是'json'."+
                "<br><em>//functions</em>"+
                "<br>&nbsp;&nbsp;cusomQS: Function, 函数参数: [obj, type]. 用来自定义query string对象的函数."+
                "<br><em>//normal events</em>"+
                "<br>&nbsp;&nbsp;onSuccess: Function, 函数参数:[response Object, 如请求成功返回,调用这个回调函数."+
                "<br>&nbsp;&nbsp;onFail: Function, 函数参数:[response Object, response type, threadid].  如请求失败,调用这个回调函数."+
                "<br><em>//trace events</em>"+
                "<br>&nbsp;&nbsp;onRetry: Function, 函数参数:[the current retry time], 请求失败重试时调用的函数."+
                "<br>&nbsp;&nbsp;onTimeout: Function, 请求超时的时候调用的函数."+
                "<br>&nbsp;&nbsp;onStart: Function, 请求开始时调用的函数."+
                "<br>&nbsp;&nbsp;onEnd: Function, 请求结束时调用的函数."+
                "<br><em>//before events</em>"+
                "<br>&nbsp;&nbsp;beforeStart: Function. 在请求数据发送前调用,如果这个函数返回 [false] ,请求会终止."+
                "<br>&nbsp;&nbsp;beforeFail: Function, 函数参数:[error Object, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onFail 函数将被忽略."+
                "<br>&nbsp;&nbsp;beforeSuccess: Function, 函数参数:[response, response type, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onSuccess 函数将被忽略."+
                "<br>}"
        ],
        $snippet:[
            "var out=[]; linb.Ajax('no.js','', function(){out.push('ok')}, function(){out.push('fail');alert(out);}, null, { onStart:function(){out.push('onStart')}, onEnd:function(){out.push('onEnd') }, onTimeout:function(){out.push('onTimeout')}, onRetry:function(){out.push('onRetry')} }).start();",
            "/*\n//The most common usage: \n"+
             "linb.Thread.observableRun(null,[function(threadid){\n"+
             "       linb.Ajax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   }]);*/"
        ],
        $memo:"通常建议程序员使用 [linb.request] 来处理一般的请求, 该函数可以自动的判断是否跨域,method的类型,然后选择ajax/sajax/iajax之一.",
        callback:{
            $desc:"String, 默认的回调函数名称. <strong>服务器需要在返回结构中匹配它.</strong>.",
            $snippet:["alert(linb.Ajax.callback)"]
        },
        method:{
            $desc:"String, 默认的method名称('GET' or 'POST').",
            $snippet:["alert(linb.Ajax.method)"]
        },
        optimized:{
            $desc:"Boolean, 默认的是否优化选项. <strong>会设置一些优化的header.</strong>",
            $snippet:["alert(linb.Ajax.optimized)"]
        },
        retry:{
            $desc:"Number, 默认的重试次数.",
            $snippet:["alert(linb.Ajax.retry)"]
        },
        reqType:{
            $desc:"String, 默认的请求发送类型.",
            $snippet:["alert(linb.Ajax.reqType)"]
        },
        rspType:{
            $desc:"String, 默认的返回类型.",
            $snippet:["alert(linb.Ajax.rspType)"]
        },
        timeout:{
            $desc:"Number, 默认的超时时间.",
            $snippet:["alert(linb.Ajax.timeout)"]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行本次请求.",
                $rtn:"[self]",
                $snippet:[
                    "//linb.Ajax('uri').start();"
                ]
            },
            abort:{
                $desc:'终止本次请求.',
                $snippet:[
                    "//var a=linb.Ajax('uri').start(); \n //a.abort();"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","SAjax"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.SAjax类.用函数调用的方式（不要使用 new linb.SAjax ）来创造linb.SAjax对象.<br />函数调用：生成一个 linb.SAjax 对象. <strong>linb.SAjax 用来处理跨域的 GET 数据请求.</strong>.",
        $rtn:"linb.SAjax",
        $paras:[
            "uri [必需参数]: String/Object, String -- 请求服务的 URL 地址; Object(这时候uri参数等同于 options ) -- 一组用来配置request的键值对. 如果这个参数是Object, 后续的其他参数会被忽略.",
            "query [可选参数]:  Object/String, 要请求的数据.",
            "onSuccess [可选参数]: Function, 函数参数:[response Object, response type, threadid].如请求成功返回,调用这个回调函数.",
            "onFail [可选参数]: Function, 函数参数:[response Object, response type, threadid]. 如请求失败,调用这个回调函数.",
            "threadid [可选参数]: String, 绑定到这个请求的线程id号. 线程操作的顺序：[挂起这个thread -> 执行request -> 继续这个thread]",
            "options [可选参数]: Object, 用来配置这个request的一组键值对. 这些键值对可以包括：" +
                "<br>{"+
                "<br><em>//variables</em>"+
                "<br>&nbsp;&nbsp;uri: String, 请求服务的 URL 地址."+
                "<br>&nbsp;&nbsp;query: String/Object, 请求的数据."+
                "<br>&nbsp;&nbsp;threadid: String, 绑定到这个请求的线程id号."+
                "<br>&nbsp;&nbsp;retry: Number, 请求所允许的重试次数."+
                "<br>&nbsp;&nbsp;timeout: Number, 请求的超时毫秒数."+
                "<br>&nbsp;&nbsp;reqType: String, 'form'或'json'. 请求返回的数据类型,默认是'form'."+
                "<br>&nbsp;&nbsp;rspType: String, 'text' 或 'script'. 请求返回的数据类型,默认是'text'."+
                "<br><em>//functions</em>"+
                "<br>&nbsp;&nbsp;cusomQS: Function, 函数参数: [obj, type]. 用来自定义query string对象的函数."+
                "<br><em>//normal events</em>"+
                "<br>&nbsp;&nbsp;onSuccess: Function, 函数参数:[response Object, 如请求成功返回,调用这个回调函数."+
                "<br>&nbsp;&nbsp;onFail: Function, 函数参数:[response Object, response type, threadid].  如请求失败,调用这个回调函数."+
                "<br><em>//trace events</em>"+
                "<br>&nbsp;&nbsp;onRetry: Function, 函数参数:[the current retry time], 请求失败重试时调用的函数."+
                "<br>&nbsp;&nbsp;onTimeout: Function, 请求超时的时候调用的函数."+
                "<br>&nbsp;&nbsp;onStart: Function, 请求开始时调用的函数."+
                "<br>&nbsp;&nbsp;onEnd: Function, 请求结束时调用的函数."+
                "<br><em>//before events</em>"+
                "<br>&nbsp;&nbsp;beforeStart: Function. 在请求数据发送前调用,如果这个函数返回 [false] ,请求会终止."+
                "<br>&nbsp;&nbsp;beforeFail: Function, 函数参数:[error Object, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onFail 函数将被忽略."+
                "<br>&nbsp;&nbsp;beforeSuccess: Function, 函数参数:[response, response type, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onSuccess 函数将被忽略."+
                "<br>}"
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
             "linb.Thread.observableRun(null,[function(threadid){\n"+
             "       linb.SAjax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   }]);*/"
        ],
        $memo:"<br />1.使用[linb.include]来包含一个.js文件.<br />2.使用[linb.request]处理一般的请求, 它可以根据url来来自动判断使用ajax或是sajax.",
        callback:{
            $desc:"String, 默认的回调函数名关键字. <strong>服务器需要在返回的内容中用相同的关键字.</strong>",
            $snippet:["alert(linb.SAjax.callback)"]
        },
        method:{
            $desc:"String, 默认的method('GET' 或 'POST').",
            $snippet:["alert(linb.SAjax.method)"]
        },
        optimized:{
            $desc:"Boolean, 默认的是否优化选项. <strong>会设置一些优化的header.</strong>",
            $snippet:["alert(linb.Ajax.optimized)"]
        },
        retry:{
            $desc:"Number, 默认的重试次数.",
            $snippet:["alert(linb.SAjax.retry)"]
        },
        reqType:{
            $desc:"String, 默认的请求发送类型.",
            $snippet:["alert(linb.SAjax.reqType)"]
        },
        rspType:{
            $desc:"String, 默认的返回内容类型.",
            $snippet:["alert(linb.SAjax.rspType)"]
        },
        timeout:{
            $desc:"Number, 默认的超时时间.",
            $snippet:["alert(linb.SAjax.timeout)"]
        },
        customQS: {
            $desc:"自定义的请求字符串. 子类可覆盖该函数,以添加自定义的参数等等.",
            $rtn:"Object",
            $paras:[
                "obj [必需参数]: Object, original Object."
            ]
        },

        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行一个linb.SAjax对象",
                $rtn:"[self]",
                $snippet:[
                    "//linb.SAjax('uri').start();"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","IAjax"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.IAjax类.用函数调用的方式（不要使用 new linb.IAjax ）来创造linb.IAjax对象.<br />函数调用：生成一个linb.IAjax对象. <strong>linb.IAjax 可以处理跨域的GET/POST请求, 而且可以向服务器提交文件(上传内容).</strong>",
        $rtn:"linb.IAjax",
        $paras:[
            "uri [必需参数]: String/Object, String -- 请求服务的 URL 地址; Object(这时候uri参数等同于 options ) -- 一组用来配置request的键值对. 如果这个参数是Object, 后续的其他参数会被忽略.",
            "query [可选参数]:  Object/String, 要请求的数据.",
            "onSuccess [可选参数]: Function, 函数参数:[response Object, response type, threadid].如请求成功返回,调用这个回调函数.",
            "onFail [可选参数]: Function, 函数参数:[response Object, response type, threadid]. 如请求失败,调用这个回调函数.",
            "threadid [可选参数]: String, 绑定到这个请求的线程id号. 线程操作的顺序：[挂起这个thread -> 执行request -> 继续这个thread]",
            "options [可选参数]: Object, 用来配置这个request的一组键值对. 这些键值对可以包括：" +
                "<br>{"+
                "<br><em>//variables</em>"+
                "<br>&nbsp;&nbsp;uri: String, 请求服务的 URL 地址."+
                "<br>&nbsp;&nbsp;query: String/Object, 请求的数据."+
                "<br>&nbsp;&nbsp;threadid: String, 绑定到这个请求的线程id号."+
                "<br>&nbsp;&nbsp;<strong>method: 'GET' 或 'POST', 请求的方法. 默认为 'GET'.</strong>"+
                "<br>&nbsp;&nbsp;retry: Number, 请求所允许的重试次数."+
                "<br>&nbsp;&nbsp;timeout: Number, 请求的超时毫秒数."+
                "<br>&nbsp;&nbsp;rspType: String, 'text' 或 'xml'. 请求返回的数据类型,默认是'text'."+
                "<br><em>//functions</em>"+
                "<br>&nbsp;&nbsp;cusomQS: Function, 函数参数: [obj, type]. 用来自定义query string对象的函数."+
                "<br><em>//normal events</em>"+
                "<br>&nbsp;&nbsp;onSuccess: Function, 函数参数:[response Object, 如请求成功返回,调用这个回调函数."+
                "<br>&nbsp;&nbsp;onFail: Function, 函数参数:[response Object, response type, threadid].  如请求失败,调用这个回调函数."+
                "<br><em>//trace events</em>"+
                "<br>&nbsp;&nbsp;onRetry: Function, 函数参数:[the current retry time], 请求失败重试时调用的函数."+
                "<br>&nbsp;&nbsp;onTimeout: Function, 请求超时的时候调用的函数."+
                "<br>&nbsp;&nbsp;onStart: Function, 请求开始时调用的函数."+
                "<br>&nbsp;&nbsp;onEnd: Function, 请求结束时调用的函数."+
                "<br><em>//before events</em>"+
                "<br>&nbsp;&nbsp;beforeStart: Function. 在请求数据发送前调用,如果这个函数返回 [false] ,请求会终止."+
                "<br>&nbsp;&nbsp;beforeFail: Function, 函数参数:[error Object, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onFail 函数将被忽略."+
                "<br>&nbsp;&nbsp;beforeSuccess: Function, 函数参数:[response, response type, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onSuccess 函数将被忽略."+
                "<br>}"
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
             "linb.Thread.observableRun(null,[function(threadid){\n"+
             "       linb.IAjax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   }]);*/",
            "/*\n//The most common usage: \n"+
             "linb.Thread.observableRun(null,[function(threadid){\n"+
             "       linb.SAjax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   },{method:'GET'}]);*/"
        ],
        $memo:"程序员只能使用linb.IAjax向跨域的服务器post数据, 或上传upload文件等等.",

        callback:{
            $desc:"String, 默认的回调函数名关键字. <strong>服务器需要在返回的内容中用相同的关键字.</strong>",
            $snippet:["alert(linb.IAjax.callback)"]
        },
        method:{
            $desc:"String, 默认的method('GET' 或 'POST')..",
            $snippet:["alert(linb.IAjax.method)"]
        },
        optimized:{
            $desc:"Boolean, 默认的是否优化选项. <strong>会设置一些优化的header.</strong>",
            $snippet:["alert(linb.Ajax.optimized)"]
        },
        retry:{
            $desc:"Number, 默认的重试次数.",
            $snippet:["alert(linb.IAjax.retry)"]
        },
        reqType:{
            $desc:"String, 默认的请求发送类型.",
            $snippet:["alert(linb.IAjax.reqType)"]
        },
        rspType:{
            $desc:"String, 默认的返回内容类型.",
            $snippet:["alert(linb.IAjax.rspType)"]
        },
        timeout:{
            $desc:"Number, 默认的超时时间.",
            $snippet:["alert(linb.IAjax.timeout)"]
        },
        customQS: {
            $desc:"自定义的请求字符串. 子类可覆盖该函数,以添加自定义的参数等等.",
            $rtn:"Object",
            $paras:[
                "obj: Object, 原始的请求参数对象."
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行一个linb.IAjax请求",
                $rtn:"[self]",
                $snippet:[
                    "//linb.IAjax('uri').start();"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","SC"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.SC类（静态类）.<br />以作为函数来进行直接调用：用字符串路径名去直接掉用一个类或对象.如果特定路径名的类或对象存在,直接返回；如果不存在, linb.SC会从内存或远程代码文件中加载这个类或对象.",
        $rtn:"Object/undefined, 类或对象[同步模式下]/ undefined[异步模式下]",
        $paras:[
            "path [必需参数]: String, 路径名(例如：'linb.UI.Button').",
            "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 linb.Ajax/iajax 对象.",
            "isAsy [可选参数]: Boolean, 直接调用是否为异步. 如果目标类或对象已经在内存中存在,本参数无效.默认为 [false].",
            "options [可选参数]: Object, 一组键值对,用来配置内部的 linb.Ajax(在异步模式的情况) 或 linb.SAjax(在同步模式的情况)."
        ],
        $snippet:[
            "alert(linb.SC('linb.SC'));linb.SC('linb.absIO',function(){alert(this===linb.absIO)});",
            "linb.SC('linb.UI.LoadFromRemoteFile',function(path,code,threaid){alert('You can know the calling result in firefox only!'); if(!path)alert('Fail to load '+ this.uri)},true);"
        ],
        get:{
            $desc:"按照给定的字符串路径得到一个对象.",
            $rtn:"Object",
            $paras:[
                "path [必需参数]: String, 字符串路径(例如, 'linb.SC.get', '_.isArr', 'linb.ini.path').",
                "obj [可选参数]: Object, 目标对象. 默认为 [window]."
            ],
            $snippet:[
                "alert(linb.SC.get('linb.ini.path')); alert(_.get(window,'linb.ini.path'.split('.'))); "
            ],
            $memo:"等同于 [_.get]."
        },
        groupCall:{
            $desc:"将一组字符串路径编组,并并行地调用它们.一般用来从多个远程代码文件中同步地加载多个类或对象.(通过把相关的过程包装在一个外壳线程中执行)",
            $paras:[
                "pathArr [必需参数]: Array, 一组字符串路径.",
                "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 linb.Ajax/iajax 对象.",
                "onEnd [可选参数]: Function, 函数的参数:[threadid]. 所有的直接调用都完成后执行.",
                "threadid [可选参数]: String, 制定外壳线程的id号."
            ],
            $snippet:[
                "/*\n//最常用的用法是: \n"+
                "linb.SC.groupCall(['linb.UI.Button','linb.UI.Input','linb.UI.List'],function(path){alert(path+' loaded.')},function(){alert('ends.')});"+
                "\n*/"
            ],
            $memo:'相当于loadSnips和execSnips的综合'
        },
        runInBG:{
            $desc:"在后台同步地从多个远程代码文件中加载多个类或对象.(通过把相关的过程包装在一个外壳线程中执行).",
            $paras:[
                "pathArr [必需参数]: Array, 一组字符串路径.",
                "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 linb.Ajax/iajax 对象.",
                "onStart [可选参数]: Function, 函数的参数:[threadid]. 外壳线程的onStart回调函数.",
                "onEnd [可选参数]: Function, 函数的参数:[threadid]. 外壳线程的onEnd回调函数."
            ],
            $snippet:[
                "/*\n//The most common usage: \n"+
                "linb.SC.background(['linb.UI.Button','linb.UI.Input','linb.UI.List'],null,null,function(){alert('ends.')});"+
                "\n*/"
            ]
        },
        loadSnips:{
            $desc:"通过将一组字符串路径编组,并行、异步地加载一组代码片段(把相关的过程包装在一个外壳线程中执行.返回的结果会缓存起来.",
            $paras:[
                "pathArr [必需参数]: Array, 一组字符串路径.",
                "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 linb.Ajax/iajax 对象.",
                "onEnd [可选参数]: Function, 函数的参数:[threadid]. 所有的直接调用都完成后执行.",
                "threadid [可选参数]: String, 制定外壳线程的id号."
            ],
            $snippet:[
                "/*\n//最常用的用法是: \n"+
                "var flag=false; linb.SC.loadSnips(['linb.UI.Button','linb.UI.Input','linb.UI.List'],null,null,function(){flag=true;}); \n //.... \n if(flag)linb.SC.execSnips();"+
                "\n*/"
            ]
        },
        execSnips:{
            $desc:"把通过loadSnips缓存起来的代码片段都执行了.",
            $paras:[
                "cache [可选参数]: Object[键值对], 目标代码对象. 默认是 [linb.$cache.text]."
            ],
            $snippet:[
                "/*\n//最常用的用法: \n"+
                "var flag=false; linb.SC.loadSnips(['linb.UI.Button','linb.UI.Input','linb.UI.List'],null,null,function(){flag=true;}); \n //.... \n if(flag)linb.SC.execSnips();"+
                "\n*/"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Event"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Event 类（静态类）",
        getWheelDelta:{
            $desc:"获取鼠标滚轮的移动值.",
            $rtn:"Integer",
            $paras:[
                "event [必需参数] : DOM事件对象."
            ]
        },
        getBtn :{
            $desc:"获取鼠标的哪个键被按下了.",
            $rtn:"String",
            $paras:[
                "event [必需参数] : DOM事件对象."
            ],
            $snippet:[
                "var id='linb.temp.e1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).onClick(function(p,e){linb('btnLang').onClick(null); alert(linb.Event.getBtn(e));});"+
                "}"
            ]
        },
        getEventPara:{
            $desc:"获取事件参数对象.",
            $rtn:"Object",
            $paras:[
                "event [必需参数] : DOM事件对象."
            ],
            $snippet:[
                "var id='linb.temp.e2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).onClick(function(p,e){linb('btnLang').onClick(null); alert(_.serialize(linb.Event.getEventPara(e)));});"+
                "}"
            ]
        },
        getId:{
            $desc:"获取DOM 元素的id字符串(包括window 和 document 对象).",
            $rtn:"String",
            $paras:[
                "node [必需参数] : DOM element, window or document Object."
            ],
            $snippet:[
                "alert(linb.Event.getId(document.getElementById('btnLang')));alert(linb.Event.getId(document));alert(linb.Event.getId(window));"
            ]
        },
        getKey:{
            $desc:"从事件对象中获取和键盘相关的值.",
            $rtn:"Object, {key:按键字符, type:事件种类, ctrlKey: ctrl键状态, shiftKey: shift 键状态, altKey:alt 键状态}",
            $paras:[
                "event [必需参数] : DOM 事件对象."
            ],
            $snippet:[
                "//'Run' the code, and press any keyboars please!\n"+
                "linb('body').onKeypress(function(p,e){linb('body').onKeypress(null); var kb=linb.Event.getKey(e);linb.log(kb.key,kb.type,kb.ctrlKey,kb.shiftKey,kb.altKey,kb)});"
            ]
        },
        getPos:{
            $desc:"从事件对象中获取鼠标的位置.",
            $rtn:"Object, 键值对. {left:xx,top:xx}",
            $paras:[
                "event [必需参数] : DOM事件对象."
            ],
            $snippet:[
                "var id='linb.temp.e4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).onClick(function(p,e){linb('btnLang').onClick(null); alert(_.serialize(linb.Event.getPos(e)));});"+
                "}"
            ]
        },
        getSrc:{
            $desc:"从事件对象中中获取发生事件的DOM元素.",
            $rtn:"Element",
            $paras:[
                "event [必需参数] : DOM 事件对象."
            ],
            $snippet:[
                "var id='linb.temp.e5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).onClick(function(p,e){linb('btnLang').onClick(null); alert(linb.Event.getSrc(e).id);});"+
                "}"
            ]
        },
        keyboardHook :{
            $desc:" 添加/移除一个全局的键盘事件钩子到keyDown事件.",
            $rtn:'[self]',
            $paras:[
                "key [必需参数] : String, 被监视的键.",
                "ctrl [可选参数] : Boolean, 指示是否监视'CTRL'键. 默认为 [false].",
                "shift [可选参数] : Boolean, 指示是否监视'SHIFT'键. 默认为 [false].",
                "alt [可选参数] : Boolean, 指示是否监视'ALT'键. 默认为 [false].",
                "fun [可选参数] : Function, 用户按下热键后要执行的函数. 如果不指定该参数, 或传入非function变量, 这个键[key](keyboard name)上的钩子将被移除.",
                "args [可选参数]: Array, 函数的参数. 默认为 []",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数). 默认为 [window]"
            ],
            $snippet:[
                "//'Run' the code, and click keyboard 'a' please! \n"+
                "linb.Event.keyboardHook('a',0,0,0,function(){linb.message('you pressed a!');linb.Event.keyboardHook('a');})",
                "//'Run' the code, and You can't input 'a' in this input! \n"+
                "if(!linb.Dom.byId('linb.temp.1')){this.prepend(linb.create('<div><input /><button id=\"linb.temp.1\" onclick=\"linb.Event.keyboardHook(\\\'a\\\');linb(this).parent().remove()\">remove this example</button></div>'));}" +
                "linb.Event.keyboardHook('a',0,0,0,function(){return false;});"
            ]
        },
        keyboardHookUp :{
            $desc:" 添加/移除一个全局的键盘事件钩子到keyUp事件.",
            $rtn:'[self]',
            $paras:[
                "key [必需参数] : String, 被监视的键.",
                "ctrl [可选参数] : Boolean, 指示是否监视'CTRL'键. 默认为 [false].",
                "shift [可选参数] : Boolean, 指示是否监视'SHIFT'键. 默认为 [false].",
                "alt [可选参数] : Boolean, 指示是否监视'ALT'键. 默认为 [false].",
                "fun [可选参数] : Function, 用户按下热键后要执行的函数. 如果不指定该参数, 或传入非function变量, 这个键[key](keyboard name)上的钩子将被移除.",
                "args [可选参数]: Array, 函数的参数. 默认为 []",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数). 默认为 [window]"
            ]
        },
        popTabOutTrigger:{
             $desc:"将最后一个 'TAB失去焦点trigger' 从堆栈中弹出.并激活前一个trigger（如果堆栈中还存在trigger的话）.请参考<a href='#linb.Event.pushTabOutTrigger'>linb.Event.pushTabOutTrigger</a>函数.",
             $paras:[
                "flag [可选参数] : Boolean, 强制清空内部堆栈.默认为 [false]."
             ],
             $rtn:'[self]'
        },
        pushTabOutTrigger:{
            $desc:"将一个 'TAB失去焦点trigger' 压入堆栈,然后激活它（先前的trigger将会无效）. 这个 [trigger] 函数会在用户用 TAB 键让鼠标焦点落在指定 DOM 元素的边界外时执行.",
            $rtn:'[self]',
            $paras:[
                "boundary [必需参数] : Element/String, 作为边界的 DOM 元素或linbid.",
                "trigger [必需参数] : Function, 函数参数：[边界DOM元素的linbid]. 这个 [trigger] 函数会在用户用 TAB 键让鼠标焦点落在指定 DOM 的边界 [boundary] 外时执行."
            ],
            $snippet:[
                "if(!linb.Dom.byId('linb.temp.out')){this.prepend(linb.create('<div><div id=\"linb.temp.out\" style=\"border:solid 1px;padding:10px;\">linb.temp.out<input id=\"linb.temp.out.first\"><input /><input /><input /><div id=\"linb.temp.in\"  style=\"border:solid 1px;padding:10px;\">linb.temp.in<input id=\"linb.temp.in.first\" /><input /><input /><input /><input /></div></div><div><button onclick=\"_.arr.each(linb.Event._tabHookStack,function(o){alert(o[0])})\">Click here to show inner stack content!</button><br /><br /><button onclick=\"linb.Event.popTabOutTrigger();\">popTabOutTrigger</button><br /><br /></div><div><button onclick=\"linb.Event.popTabOutTrigger(1);linb(this).parent(2).remove();\">remove this example</button></div></div>'));\n"+
                "linb.Event.pushTabOutTrigger(document.getElementById('linb.temp.out'),function(){document.getElementById('linb.temp.out.first').focus()});"+"linb.Event.pushTabOutTrigger(document.getElementById('linb.temp.in'),function(){document.getElementById('linb.temp.in.first').focus()});}"
            ]
        },
        stopBubble:{
            $desc:"停止默认的动作,并阻止事件冒泡.",
            $paras:[
                "event [必需参数] : DOM event Object."
            ],
            $snippet:[
                "if(!linb.Dom.byId('linb.temp.3')){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\" onclick=\"alert(\\\'onclick event on the div\\\')\"><p>You can click here to fire onclick event on the div </p><a id=\"linb.temp.3\" href=\"http://www.linb.net\" onclick=\"linb.message(\\\'Event bubble is stopped. You cant fire onclick event on the outter div !\\\');linb.Event.stopBubble(event);\" >Event bubble to outter div is stopped here. Click me to try it!</a><button onclick=\"linb(this).parent().remove()\">remove this example</button></div>'))}"
            ]
        },
        stopDefault:{
            $desc:"停止默认的动作.",
            $paras:[
                "event [必需参数] : DOM event Object."
            ],
            $snippet:[
                "if(!linb.Dom.byId('linb.temp.4')){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\" ><a id=\"linb.temp.4\" href=\"http://www.linb.net\" onclick=\"linb.message(\\\'Default action is stopped here. You cant go to \\\'+this.href);linb.Event.stopDefault(event);\" >My default action is stopped. Click me to try it!</a><button onclick=\"linb(this).parent().remove()\">remove this example</button></div>'))}"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","absBox"],{
        pack:{
            $desc: "打包装箱一组元素,并生成一个 [linb.absBox] 对象. ",
            $rtn: "linb.absBox",
            $paras:[
                "arr [必需参数] : Array, 一组值. ",
                "ensureValue [可选参数] : Boolean, 是否强制检测每个箱内元素值的有效性. 默认为 true. "
            ],
            $snippet:[
                "var nodes = linb.Dom.pack(['btnLang',document.getElementById('btnLang')]); alert(nodes.get(0).id)"
            ]
        },
        plugIn:{
            $desc:"向当前类加一个 plug-in 函数.",
            $rtn:"[self]",
            $paras:[
                "name [必需参数] : String, plug-in 函数名字.",
                "fun [必需参数] : Function, plug-in 插件函数体."
            ],
            $snippet:[
                "var n=linb('btnLang'); alert(n.getBackgroundImg); linb.Dom.plugIn('getBackgroundImg',function(){return this.css('backgroundImage')}); alert(n.getBackgroundImg());"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            each:{
                $desc:"将函数应用于数组中的每一个箱内元素.",
                $rtn:'[self]',
                $paras:[
                    "fun [必需参数]: Function, [this]指针是 linb.absBox Object, 函数参数: [element, array index]. 应用到每一个箱内元素的函数."
                ],
                $snippet:[
                    "linb(['linb.UI.Layout:a:','btnLang']).each(function(o,i){alert(i+' -> #'+o.id)})"
                ]
            },
            get:{
                $desc:"根据给定位置得到箱内元素,或者得到箱内所有元素.",
                $rtn:"Object/Array",
                $paras:[
                    "index [可选参数] : Number."
                ],
                $snippet:[
                    "var n=linb(['linb.UI.Layout:a:','btnLang']); alert(n.get(1).id); alert(n.get()[0].id+' , '+n.get()[1].id);"
                ]
            },
            isEmpty:{
                $desc:"是否目前的箱为空.",
                $rtn:"Boolean.",
                $snippet:[
                    "var n=linb(['linb.UI.Layout:a:','btnLang']); alert(n.isEmpty()); alert(linb().isEmpty())"
                ]
            },
            merge:{
                $desc:"合并一个箱的所有元素到当前箱.",
                $rtn:"[self].",
                $paras:[
                    "obj [必需参数] : linb.absBox 对象"
                ],
                $snippet:[
                    "alert(linb('linb.UI.Layout:a:').merge(linb('btnLang')).get().length)"
                ]
            },
            reBoxing:{
                $desc:"将当前箱内的所有元素重新打包到另一个箱.",
                $trn:"linb.absBox",
                $paras:[
                    "key [可选参数] : new linb.absBox 子类的名字.",
                    "ensureValue [可选参数] : Boolean, 是否强制检测每个箱内元素值的有效性. 默认为 true. "
                ],
                $snippet:[
                    "alert(linb('linb.UI.Layout:a:').KEY);alert(linb('linb.UI.Layout:a:').reBoxing('linb.UI.Layout').KEY);"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Dom"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Dom 类",
        constructor:{
            $desc:"一般情况下, 不要使用[new linb.Dom()]创造一个新实例, 而是使用[linb(nodes, flag)]一个新linb.Dom实例对象."
        },
        Events:{
            $desc:  "<strong>Description</strong>: 添加、删除或者触发特定事件.每个事件可以有三组事件函数：[before开头], [on开头] 和 [after开头].每组是一个函数数组."+
                    "<ul>"+
                        "<li><strong>linb(/**/).onClick([function], 'label')</strong> => 为 [onclick] 事件函数组添加一个标签为'label'的事件函数.</li>"+
                        "<li><strong>linb(/**/).onClick([function]) </strong> => 先清空 [onclick] 事件函数组,再重新加入一个[function]函数.</li>"+

                        "<li><strong>linb(/**/).onClick(null, 'label') </strong> => 从 [onclick] 事件函数组中删除标签为'label'的事件函数.</li>"+
                        "<li><strong>linb(/**/).onClick(null) </strong> => 清空 [onclick] 事件函数组.</li>"+
                        "<li><strong>linb(/**/).onClick(null,null,true) </strong> => 清空 [beforeclick]、[onclick]和[afterclick] 事件函数组.</li>"+

                        "<li><strong>linb(/**/).onClick() </strong> => 触发事件,会按照顺序执行所有[onclick]事件函数组里面的事件函数.<strong>如果其间任何一个事件函数返回[false],余下的事件函数将不被执行.</strong></li>"+
                        "<li><strong>linb(/**/).onClick(true) </strong> => 触发事件,会按照顺序执行所有[beforeclick]、[onclick]和[afterclick]事件函数组里面的事件函数.<strong>如果其间任何一个事件函数返回[false],余下的事件函数将不被执行.</strong></li>"+
                    "</ul>"+

                    "<p><strong>Returns</strong>: 添加事件:[self]; 删除事件: return [self]; 触发事件: void.</p>"+
                    "<p><strong>Parameters</strong>: </p>"+
                    "<ul>"+
                        "<li><strong>fun [可选参数] </strong>: 函数的[this]指针是Dom元素, arguments 是 [linb.DomProfile Object, DOM event Object, the current element].</li>"+
                        "<li><strong>label [可选参数]</strong> : String, 事件的标签.</li>"+
                        "<li><strong>flag [可选参数]</strong> : Boolean,仅删除事件的时候有效,表示是否删除所有相关的事件.</li>"+
                    "</ul>"+
                    "<p style='padding:5px;'><a href='#linb.Dom.prototype.afterClick' onclick='var n =linb(this).parent(5).query(\"a\",\"name\",\"linb.Dom.prototype.afterClick\").next().first(); if(n.next().css(\"display\")==\"none\")n.onClick()'><strong>Go to [onClick] for getting the code snippets!</strong></a></p>"
        },
        HIDE_VALUE:{
            $desc:"String, 隐藏DOM元素的常量(系统隐藏DOM的方法一般是[element.style.left=linb.Dom.HIDE_VALUE]或[element.style.top=linb.Dom.HIDE_VALUE]). ",
            $snippet:[
                "alert(linb.Dom.HIDE_VALUE)"
            ]
        },
        TOP_ZINDEX:{
            $desc:"Number, 系统最大z-index量. ",
            $snippet:[
                "alert(linb.Dom.TOP_ZINDEX)"
            ]
        },
        busy:{
            $desc:"显示系统忙. 在DOM的正上方增加一层DIV,使用用户不能点击,并将鼠标指针变为漏斗形状. ",
            $paras:[
                "label [可选参数] : String, 指示忙的文字,如“正在处理中”. 使用[linb.Dom.free(the latest label)]释放忙状态."
            ],
            $snippet:[
                "linb.Thread(null,[_.fun()],1000,null,function(){linb.Dom.busy()},function(){linb.Dom.free()}).start()",
                "linb.Thread(null,[function(){linb.Dom.busy('b');linb.message('Changes [label] to \\\'b\\\' ')}, function(){linb.Dom.free();linb.message('Still busy')},function(){linb.Dom.free('a');linb.message('Still busy')},_.fun()],1000,null,function(){linb.Dom.busy('a')},function(){linb.Dom.free('b');linb.message('free now')}).start()"
            ]
        },
        free:{
            $desc:"释放忙状态.",
            $paras:[
                "label [可选参数] : String, the busy label."
            ],
            $memo:"见<a href='#linb.Dom.busy'>linb.Dom.busy</a>"
        },
        byId:{
            $desc:"等同于[document.getElementById]. ",
            $rtn:"Element",
            $paras:[
                "id [必需参数] : String, DOM id"
            ],
            $snippet:[
                "alert( linb.Dom.byId('btnLang') === document.getElementById ('btnLang') )"
            ]
        },
        animate:{
            $desc:"包装特殊效果的动画到一个linb.Thread对象中(shell线程).",
            $rtn:"linb.Thread",
            $paras:[
                "css [必需参数] : Object[CSS 键值对]. 不变的CSS样式",
                "args [必需参数] : Object[Key/value([from value, to value]) pairs] . 渐变的CSS样式",
                "onStart [可选参数]: Function, 参数: [threadid]. 线程第一个任务开始前的回调函数.",
                "onEnd [可选参数]: Function, 参数: [threadid]. 整个shell线程结束后的回调函数.",
                "time [可选参数]: Number(ms), 动画的持续时间. 默认为200.",
                "step [可选参数]: Number, 动画步长, 越短越消耗资源. 默认为5.",
                "type [可选参数]: String, 动画的特效形式. 'linear','expoIn','expoOut','expoInOut','sineIn','sineOut','sineInOut','backIn','backOut','backInOut' 或 'bounceOut'.  默认为'linear'.",
                "threadid [可选参数]: String, shell线程的全局识别id."
            ],
            $snippet:[
                "linb.Dom.animate({backgroundColor:'#ff0000'},{left:[0,200],top:[0,300],width:[30,300],height:[30,300],opacity:[1,0]}, null, null, 500, 50, 'sineOut').start()"
            ]
        },
        getEmptyDiv:{
            $desc:"生成一个DOM id以'linb.matrix::'开始的DOM对象. ",
            $rtn:"linb.Dom",
            $paras:[
                "sequence [可选参数] : Number, DOM序列好. 默认为1."
            ],
            $snippet:[
                "var m1=linb.Dom.getEmptyDiv(); alert(m1.id())",
                "var m1=linb.Dom.getEmptyDiv(), m2=linb.Dom.getEmptyDiv(2); alert(m1.id());alert(m2.id()) "
            ],
            $memo:"当你不再需要一个matrix div, 请清空它,以便 [linb.Dom.getEmptyDiv]可再次利用. "
        },
        getScrollBarSize:{
            $desc:"获取当前浏览器滚动条的宽度.",
            $rtn:"Number"
        },
        getStyle:{
            $desc:"获取DOM元素的CSS样式中某一个项的值.",
            $rtn:"String",
            $paras:[
                "node [必需参数] : Element, DOM元素.",
                "name [必需参数] : String, CSS样式项名称,如height,width等等."
            ],
            $snippet:[
                "var n=linb.Dom.byId('btnLang'); alert(linb.Dom.getStyle(n,'width')); alert(linb.Dom.getStyle(n,'overflow'))"
            ]
        },
        setStyle:{
            $desc:"设置DOM元素的CSS样式中某一个项的值.",
            $paras:[
                "node [必需参数] : Element, DOM元素.",
                "name [必需参数] : String, CSS样式项名称,如height,width等等.",
                "value [必需参数] : String, CSS样式项值,如25px."
            ],
            $snippet:[
                "var n=linb.Dom.byId('btnLang'); linb.Dom.setStyle(n,'top', '100px'); _.asyRun(function(){linb.Dom.setStyle(n,'top', '0px')}, 2000)"
            ]
        },
        setCover:{
            $desc:"显示或隐藏一个覆盖整个页面的DIV.",
            $paras:[
                "visible [必需参数] : Boolean or String, true=>表示显示DIV; false=>h表示隐藏DIV; 'string'=>表示显示DIV和文字.",
                "label [可选参数] : String, 忙标签. "
            ],
            $snippet:[
                "linb.Dom.setCover(true); _.asyRun(function(){linb.Dom.setCover(false)},2000);",
                "linb.Dom.setCover('a'); _.asyRun(function(){linb.Dom.setCover('b')},1000); _.asyRun(function(){linb.Dom.setCover('c')},2000); _.asyRun(function(){linb.Dom.setCover(false)},3000);",
                "linb.Dom.setCover('<div style=\\\'font-weight:bold;padding:5px;border:solid 1px;background:#CCC;\\\'> Loading... </div>'); _.asyRun(function(){linb.Dom.setCover(false)},2000);",
                "linb.Dom.setCover(true,'key'); _.asyRun(function(){linb.message('The cover is still visible');linb.Dom.setCover(false)},1000); _.asyRun(function(){linb.message('The cover is hidded.');linb.Dom.setCover(false,'key')},5000);"
            ]
        },
        submit:{
            $desc:"提交一个HTML form(表单). ",
            $paras:[
                "action [必需参数] : String(URL), 提交到哪个URL.",
                "data [必需参数] : Object[键值对], 提交数据的键值对.",
                "method [可选参数] : String, . HTTP method . 可以是[get|post], 默认为'get'.",
                "target [可选参数] : String, 返回显示的窗口位置. [_blank|_parent|_self|_top], 默认为'_blank'.",
                "enctype [可选参数] : String, 表单enctype属性(设置MIME以用来编码表单内容), 默认值为 'application/x-www-form-urlencoded'. 当表单内容包含文件时为 'multipart/form-data'."
            ],
            $snippet:[
                "linb.Dom.submit('http://www.google.com/search',{q:'ajax ria'},'get')",
                "linb.Dom.submit('http://www.google.com/search',{q:{a:1,b:2}},'get')"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            each:{
                $desc:"将函数应用于数组中的每一个箱内元素.",
                $rtn:'[self]',
                $paras:[
                    "fun [必需参数]: Function, [this]指针是 linb.absBox Object, 函数参数: [element, array index]. 应用到每一个箱内元素的函数."
                ],
                $snippet:[
                    "linb(['linb.UI.Layout:a:','btnLang']).each(function(o,i){alert(i+' -> #'+o.id)})"
                ]
            },
            get:{
                $desc:"根据给定位置得到箱内元素,或者得到箱内所有元素.",
                $rtn:"Object/Array",
                $paras:[
                    "index [可选参数] : Number."
                ],
                $snippet:[
                    "var n=linb(['linb.UI.Layout:a:','btnLang']); alert(n.get(1).id); alert(n.get()[0].id+' , '+n.get()[1].id);"
                ]
            },
            addBorder:{
                $desc:"为第一个元素添加边框. ",
                $rtn:"linb.UI.Border",
                $paras:[
                    "properties [可选参数] : 键值对, 边框的属性. 一般的用法是: {borderActive: [Boolean]}."
                ],
                $snippet:[
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addBorder()},1000);_.asyRun(function(){div.removeBorder()},2000);_.asyRun(function(){div.remove()},3000);",
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);div.addBorder({borderActive:true});_.asyRun(function(){div.remove()},5000);"
                ],
                $memo:"依赖: linb.UI.Border."
            },
            removeBorder:{
                $desc:"移除第一个元素的边框. ",
                $rtn:"[self]",
                $snippet:[
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addBorder()},1000);_.asyRun(function(){div.removeBorder()},2000);_.asyRun(function(){div.remove()},3000);"
                ],
                $memo:"依赖: linb.UI.Border."
            },
            addResizer:{
                $desc:"为第一个元素添加大小调节器. ",
                $rtn:"linb.UI.Resizer",
                $paras:[
                    "properties [可选参数] : 键值对, 边框的属性.",
                    "onUpdate [可选参数] : Function, 大小修改后的回调函数.",
                    "onChange [可选参数] : Function, 大小试图改变的回调函数.",
                ],
                $snippet:[
                    "//You can resize the following div: \n" +
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'>Use mouse to resize me!</div>');linb('body').append(div);div.topZindex(true).addResizer();_.asyRun(function(){div.remove()},10000);",
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'>Use mouse to resize me!</div>');linb('body').append(div);div.topZindex(true).addResizer({forceVisible:true,forceMovable:true,singleDir:true,vertical:false,minWidth:50,maxWidth:200,handlerSize:10});_.asyRun(function(){div.remove()},10000);"
                ],
                $memo:"依赖: linb.UI.Resizer."
            },
            removeResizer:{
                $desc:"移除第一个元素的大小调节器. ",
                $rtn:"[self]",
                $snippet:[
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addResizer({forceVisible:true})},1000);_.asyRun(function(){div.removeResizer()},2000);_.asyRun(function(){div.remove()},3000);"
                ],
                $memo:"Dependency: linb.UI.Resizer."
            },
            addShadow:{
                $desc:"为第一个元素添加阴影. ",
                $rtn:"linb.UI.Shadow",
                $paras:[
                    "properties [可选参数] : 键值对, 边框的属性."
                ],
                $snippet:[
                    "//You can resize the following div: \n" +
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'></div>');linb('body').append(div);div.topZindex(true).addShadow();_.asyRun(function(){div.remove()},10000);",
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 10px #00ff00;width:100px;height:100px;left:100px;top:100px;\\\'></div>');linb('body').append(div);div.topZindex(true).addShadow({shadowOffset:10});_.asyRun(function(){div.remove()},10000);"
                ],
                $memo:"Dependency: linb.UI.Shadow."
            },
            removeShadow:{
                $desc:"移除第一个元素的阴影. ",
                $rtn:"[self]",
                $snippet:[
                    "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addShadow()},1000);_.asyRun(function(){div.removeShadow()},2000);_.asyRun(function(){div.remove()},3000);"
                ],
                $memo:"Dependency: linb.UI.Shadow."
            },
            addClass:{
                $desc:"为每一个元素添加CSS类",
                $rtn:"[self]",
                $paras:[
                    "name [必需参数] : String, CSS类名."
                ],
                $snippet:[
                    "var n=linb('btnLang');alert(n.attr('className'));n.addClass('cls');alert(n.attr('className'));n.removeClass('cls');alert(n.attr('className'));"
                ]
            },
            removeClass:{
                $desc:"为每一个元素移除CSS类.",
                $rtn:"[self]",
                $paras:[
                    "name [必需参数] : String, CSS类名."
                ],
                $snippet:[
                    "var n=linb('btnLang');alert(n.attr('className'));n.addClass('cls');alert(n.attr('className'));n.removeClass('cls');alert(n.attr('className'));"
                ]
            },
            hasClass:{
                $desc:"判断第一个元素的CSS样式中是否含有指定的类名.",
                $rtn:"Boolean",
                $paras:[
                    "name [必需参数] : String, CSS类名."
                ],
                $snippet:[
                    "var n=linb('btnLang');alert(n.attr('className'));alert(n.hasClass('linb-div'));alert(n.hasClass('cls'));"
                ]
            },
            replaceClass:{
                $desc:"将每一个元素中的某个CSS类名替换为另一个类名.",
                $rtn:"[self]",
                $paras:[
                    "regexp [必需参数] : 查找的正则表达式.",
                    "replace [必需参数] : String."
                ],
                $snippet:[
                    "var n=linb('btnLang');alert(n.attr('className'));n.replaceClass(/ui/,'cls');alert(n.attr('className'));n.replaceClass(/cls/,'ui');"
                ]
            },
            tagClass:{
                $desc:"对于箱中的每个元素的className,拷贝这些className并在每个className后添加一个给定的标签.或者将有特定标签的className移除.",
                $rtn:"[self]",
                $paras:[
                    "tag [必需参数] : String, 标签字符串.",
                    "isAdd [可选参数] : Boolean, 添加标签或移除标签. 默认为 [true]."
                ],
                $snippet:[
                    "var n=linb('btnLang');n.tagClass('-checked').tagClass('-mouseover');alert(n.attr('className')); n.tagClass('-checked',false).tagClass('-mouseover',false);alert(n.attr('className'));"
                ]
            },
            append:{
                $desc:"将一个linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象) 附着在自己内部的第一个元素后面.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象).",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'append to' 默认 [false]."
                ],
                $snippet:[
                "var id='linb.temp.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).append(linb.create('input'));"+
                "linb(id).append(new linb.UI.Button({position:'relative'}));"+
                "linb(id).append(linb.create('<button>btn</button>'));"+
                "}"
                ]
            },
            prepend:{
                $desc:"将一个linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象) 附着在自己内部的第一个元素前面.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象).",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'prepend to' 默认 [false]."
                ],
                $snippet:[
                "var id='linb.temp.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).prepend(linb.create('input'));"+
                "linb(id).prepend(new linb.UI.Button({position:'relative'}));"+
                "linb(id).prepend(linb.create('<button>btn</button>'));"+
                "}"
                ]
            },
            addPrev:{
                $desc:"将一个linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象) 附着在自己的前面",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象).",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'addPrev to' 默认 [false]."
                ],
                $snippet:[
                "var id='linb.temp.3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var node = linb(id).last();"+
                "node.addPrev(linb.create('input'));"+
                "node.addPrev(new linb.UI.Button({position:'relative'}));"+
                "node.addPrev(linb.create('<button>btn</button>'));"+
                "}"
                ]
            },
            addNext:{
                $desc:"将一个linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象) 附着在自己的后面.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.Dom对象(包含有一系列的DOM elements 或linb.UIProile 对象).",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'addNext to' 默认 [false]."
                ],
                $snippet:[
                "var id='linb.temp.4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var node = linb(id).last();"+
                "node.addNext(linb.create('input'));"+
                "node.addNext(new linb.UI.Button({position:'relative'}));"+
                "node.addNext(linb.create('<button>btn</button>'));"+
                "}"
                ]
            },
            offset:{
                $desc:"获取(第一个元素)或设置(所有元素)相对边界的偏移量.",
                $rtn:"Object/[self]",
                $paras:[
                    "pos [可选参数] : {left:value,top:value}, 目标的绝对位置.",
                    "boundary [可选参数] : 相对的边界(DOM 元素或document.body). 默认为document.body."
                ],
                $snippet:[
                    "alert(_.serialize(linb(this).offset()));alert(_.serialize(linb(this).offset()));",
                    "var n=linb(this),pos=n.offset(); pos.top+=20; n.css('position','relative').offset(pos); _.asyRun(function(){n.css({top:'',position:''})},1000)"
                ]
            },
            cssPos:{
                $desc:"获取(第一个元素)或设置(所有元素) CSS偏移量.",
                $rtn:"Object/[self]",
                $paras:[
                    "pos [可选参数] : {left:value,top:value}, 目标的绝对位置.",
                    "flag [可选参数] : Boolean, 指示是否触发元素的onMove事件. 默认为false."
                ],
                $snippet:[
                    "var n=linb(this),pos=n.cssPos(); pos.top+=20;pos.left+=20; n.css('position','relative').cssPos(pos); n.onMove(function(){linb.message('Fired onmove event')});pos.top+=20;pos.left+=20; n.cssPos(pos,true); _.asyRun(function(){n.css({top:'',position:''}).onMove(null)},1000)"
                ]
            },
            animate:{
                $desc:"包装特殊效果的动画到一个linb.Thread对象中(shell线程).",
                $rtn:"linb.Thread",
                $paras:[
                    "args [必需参数] : Object[Key/value([from value, to value]) pairs] . 渐变的CSS样式",
                    "onStart [可选参数]: Function, 参数: [threadid]. 线程第一个任务开始前的回调函数.",
                    "onEnd [可选参数]: Function, 参数: [threadid]. 整个shell线程结束后的回调函数.",
                    "time [可选参数]: Number(ms), 动画的持续时间. 默认为200.",
                    "step [可选参数]: Number, 动画步长, 越短越消耗资源. 默认为5.",
                    "type [可选参数]: String, 动画的特效形式. 'linear','expoIn','expoOut','expoInOut','sineIn','sineOut','sineInOut','backIn','backOut','backInOut' 或 'bounceOut'. 默认为'linear'.",
                    "threadid [可选参数]: String, shell线程的全局识别id."
                ],
                $snippet:[
                    "var node=linb.create('div').css({opacity:0,zIndex:linb.Dom.TOP_ZINDEX, backgroundColor:'#0000ff', position:'absolute',left:'100px', top:'100px',width:'100px',height:'100px'});"+
                    "linb('body').append(node);"+
                    "var fx1 = node.animate({opacity:[0,1]},null,null,1000,10,'sineIn');"+
                    "var fx2 = node.animate({left:[100,300],top:[100,300]},null,null,500,20,'sineOut');"+
                    "var fx3 = node.animate({left:[300,100],top:[300,100]});"+
                    "var fx4 = node.animate({opacity:[1,0]},null,function(){node.remove()});"+
                    "fx1.links(fx2.links(fx3.links(fx4))).start();"
                ]
            },
            attr:{
                $desc:"获取第一个元素的某个属性值, 或设置所有元素的一个属性值(键值对), 或移除所有元素的某个属性值.",
                $rtn:"String/[self]",
                $paras:[
                    "name [必需参数] : 属性名,或表示属性值的键值对.",
                    "value [可选参数] : 属性值, [null]表示移除,不传入任何参数表示获取."
                ],
                $snippet:[
                    "var n=linb('btnLang'); alert(n.attr('style')); alert(n.attr('tagName')); alert(n.attr('className'));",
                    "var n=linb('btnLang'); n.attr('abc','abc'); alert(n.attr('abc')); n.attr('abc',null);  n.attr('tagName',null); alert(n.attr('abc'));",
                    "var n=linb('btnLang'); n.attr('onclick',function(){alert('hi')}); _.asyRun(function(){n.attr('onclick',null)},5000); ",
                    "var n=linb('btnLang'); n.attr({a:'a',b:'b'}); alert(n.attr('a')); n.attr({a:null,b:null}); alert(n.attr('a'));"
                ]
            },
            caret:{
                $desc:"获取或设置第一个元素的光标(必须是Input或Textarea).",
                $rtn:"Array/[self]",
                $paras:[
                    "begin [可选参数] : Number, 光标开始位置.",
                    "end [可选参数] : Number, 光标结束位置."
                ],
                $snippet:[
                    "var id='linb.temp.caret'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<input id='+id+'1 value=0123456789/><'+'textarea id='+id+'2></'+'textarea><br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id+'2').attr('value','1111\\n2222\\n3333\\n4444');_.asyRun(function(){linb(id+'1').caret(2,6);alert(linb(id+'1').caret());linb(id+'2').caret(2,16);alert(linb(id+'2').caret());},1000)"+
                    "}"
                ]
            },
            children:{
                $desc:"获取一个linb.Dom,该对象包含所有元素的直接子元素.",
                $rtn:"linb.Dom",
                $snippet:[
                    "var id='linb.temp.children'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<input/><input/><div style=\"padding:5px;\"><input/><input/></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).children().css('border','solid 4px')"+
                    "}"
                ]
            },
            width:{
                $desc:"获取(第一个元素) 或设置(所有元素)css的宽度值.",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.width(20).height(20); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            serialize:{
                $desc:"将一个DOM概要对象(profile)序列化为一个JSON字符串或一个JSON对象.",
                $rtn:"String",
                $snippet:[
                    "alert(linb('btnLang').serialize());"
                ]
            },
            scrollWidth:{
                $desc:"获取(第一个元素) 滚动条宽度.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.w2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.width(20).height(20); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            innerWidth:{
                $desc:"获取(第一个元素)或设置(所有元素)内部宽度(包含内补丁padding).",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.innerWidth(40).innerHeight(40); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            offsetWidth:{
                $desc:"获取(第一个元素)或设置(所有元素)的偏移宽度(包括padding and border).",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.offsetWidth(60).offsetHeight(60); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            outerWidth:{
                $desc:"获取(第一个元素)或设置(所有元素)外部宽度(includes the padding, border and margin).",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.outerWidth(80).outerHeight(80); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },

            height:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS高度值.",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.width(20).height(20); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            scrollHeight:{
                $desc:"Gets(第一个元素)scroll高度.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.w7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.width(20).height(20); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            innerHeight:{
                $desc:"获取(第一个元素)或设置(所有元素)内部宽度(包括内补丁padding).",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.innerWidth(40).innerHeight(40); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            offsetHeight:{
                $desc:"获取(第一个元素)或设置(所有元素) 偏移高度(包括内补丁padding 和 border).",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.offsetWidth(60).offsetHeight(60); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            outerHeight:{
                $desc:"获取(第一个元素)或设置(所有元素)外部高度(包括内补丁padding, border 和外补丁 margin).",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.w11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.outerWidth(80).outerHeight(80); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            clone:{
                $desc:"拷贝一系列DOM元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "deep [可选参数] : Boolean, 指示是否递归克隆子DOM元素. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.w11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div id='+id+' style=\"background:#ccc;border:solid 1px;padding:10px;\"><div style=\"background:#fff;border:solid 1px;padding:10px;\">inner<input /></div>outer</div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.parent().append(n.clone()).append(n.clone(true))"+
                    "}"
                ]
            },
            css:{
                $desc:"获取第一个元素的某个CSS属性值, 或设置所有元素的某个属性值.",
                $rtn:"String/[self]",
                $paras:[
                    "name [必需参数] : CSS属性名或键值对.",
                    "value [可选参数] : CSS属性值."
                ],
                $snippet:[
                    "var n=linb('btnLang'); alert(n.css('background')); alert(n.css('overflow')); alert(n.css('top'));",
                    "var n=linb('btnLang'); n.css('right','30px'); _.asyRun(function(){n.css('right','0')},1000)",
                    "var n=linb('btnLang'); n.css({top:'30px',right:'30px'}); _.asyRun(function(){n.css({top:0,right:0})},1000)"
                ]
            },
            cssPos:{
                $desc:"获取或设置第一个元素的left 和 top值.",
                $rtn:"Object/[self]",
                $paras:[
                    "pos [可选参数] : {left:Number or String,top:Number or String}.",
                    "triggerEvent [可选参数] : Boolean, 指示是否触发事件."

                ],
                $snippet:[
                    "var n=linb('btnLang'); n.cssPos({left:100,top:100}); alert(_.serialize(n.cssPos())); n.cssPos({left:'auto',top:'auto'})"
                ]
            },
            cssSize:{
                $desc:"获取或设置第一个元素的width 和 height值.",
                $rtn:"Object/[self]",
                $paras:[
                    "value [可选参数] : {width:Number or String,height:Number or String}.",
                    "triggerEvent [可选参数] : Boolean, 指示是否触发事件."
                ],
                $snippet:[
                    "var n=linb('btnLang'), bak=n.cssSize(); n.cssSize({width:50,height:50}); alert(_.serialize(n.cssSize())); n.cssSize(bak)"
                ]
            },
            cssRegion:{
                $desc:"获取或设置第一个元素的region值.",
                $rtn:"Object/[self]",
                $paras:[
                    "value [可选参数] : {left:Number or String,top:Number or String,right:Number or String,bottom:Number or String,width:Number or String,height:Number or String}.",
                    "triggerEvent [可选参数] : Boolean, 指示是否触发事件."
                ],
                $snippet:[
                    "var n=linb('btnLang'),bak=n.cssRegion(); n.cssRegion({left:100,top:100,width:50,height:50}); alert(_.serialize(n.cssRegion())); bak.left=bak.top='auto'; n.cssRegion(bak);"
                ]
            },
            query:{
                $desc:"查找所有元素,寻找满足特定参数的元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "tagName [可选参数] : DOM元素的tagName.",
                    "property [可选参数] : DOM 元素的属性名或函数.",
                    "expr [可选参数] : DOM元素的属性值或值的正则表达式."
                ],
                $snippet:[
                    "var id='linb.temp.query'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<div id=id1 style=\"border:solid 1px;padding:5px;\"><div style=\"border:solid 1px;padding:5px;\"> <input /><input /></div></div>  <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); alert(n.outerHTML());alert(n.query().get().length); alert(n.query('div').get().length); alert(n.query('div','id').get().length); alert(n.query('div','id',id).get().length); alert(n.query('*','id',/^id/).get().length); alert(n.query('*',function(o){return o.tagName=='INPUT'}).get().length);"+
                    "}"
                ]
            },
            startDrag:{
                $desc:"开始拖动第一个元素.",
                $rtn:"[self]",
                $paras:[
                    "e [必需参数] : DOM 事件对象.",
                    "profile [可选参数] : Object, 拖动参数,参见<strong>linb.DragDrop.startDrag</strong>中profile的具体内容.",
                    "dragKey [可选参数] : String, 拖动数据的标识符.",
                    "dragData [可选参数] : Object, 拖动数据."
                ],
                $snippet:[
                    "var id='linb.temp.dd0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).onMousedown(function(p,e,s){linb(s).startDrag(e)})"+
                    "}"
                ],
                $memo:"Dependency: linb.DragDrop."
            },
            draggable:{
                $desc:"启用或禁止元素是否可拖动.",
                $rtn:"[self]",
                $paras:[
                    "flag [必需参数] : Boolean, [true]: 表示可拖动; [false]: 表示不可拖动. 默认为[true]",
                    "profile [可选参数] : Object, 拖动参数,参见<strong>linb.DragDrop.startDrag</strong>中profile的具体内容.",
                    "key [可选参数] : String, 拖动数据的标识符.",
                    "data [可选参数] : Object, 拖动数据."
                ],
                $snippet:[
                    "var id='linb.temp.dd_a'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:80px;\">' + '<div id='+id+'a style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:10px;top:30px;\">1</div>' + '<div id='+id+'b style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:50px;top:30px;\">2</div>'+ '<div id='+id+'c style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:100px;top:30px;\">3</div>'+ '<div id='+id+'d style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:150px;top:30px;\">4</div>'+ '<div id='+id+'e style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:200px;top:30px;\">5</div>'+ '<div id='+id+'f style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:250px;top:30px;\">6</div>'+ '<div id='+id+'g style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:300px;top:30px;\">7</div>'+ '<div id='+id+'h style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:350px;top:30px;\">8</div>'+ '<div id='+id+'i style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:400px;top:30px;\">9</div>'+ ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));" +
                    "var a=[0,200,400,600,800,1000,1200,1400];"+
                    "linb(id+'a').draggable(true,{dragType:'move'});" +
                    "linb(id+'b').draggable(true,{dragType:'copy',targetReposition:false});"+
                    "linb(id+'c').draggable(true,{dragType:'icon',shadowFrom:id+'c'});"+
                    "linb(id+'d').draggable(true,{dragType:'shape',targetReposition:false});"+
                    "linb(id+'e').draggable(true,{dragDefer:20,targetReposition:false});"+
                    "linb(id+'f').draggable(true,{xMagneticLines:a,yMagneticLines:a,magneticDistance:50,targetReposition:false});"+
                    "linb(id+'g').draggable(true,{widthIncrement:50,heightIncrement:50,targetReposition:false});"+
                    "linb(id+'h').draggable(true,{verticalOnly:true,targetReposition:false});"+
                    "linb(id+'i').draggable(true,{maxLeftOffset:50,maxTopOffset:50,maxRightOffset:50,maxBottomOffset:50,targetReposition:false});"+
                    "}"
                ],
                $memo:"Dependency: linb.DragDrop."
            },
            droppable:{
                $desc:"启用或禁止元素是否可丢放.",
                $rtn:"[self]",
                $paras:[
                    "flag [必需参数] : Boolean, [true]: 表示可丢放; [false]: 表示不可丢放. 默认为[true]",
                    "key [必需参数] : String, 丢放数据标志符. 默认为'default'."
                ],
                $snippet:[
                    "var id='linb.temp.dd2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=linb(id); n.first().draggable(true,{dragType:'icon'},'key1','data1').next().droppable(true,'key1').onDrop(function(){alert(linb.DragDrop.getProfile().dragData);})"+
                    "}"
                ],
                $memo:"Dependency: linb.DragDrop."
            },
            empty:{
                $desc:"清空包含的所有DOM元素.",
                $rtn:"[self]",
                $paras:[
                    "triggerGC [可选参数] : Boolean, 指示是否触发GC(垃圾回收)."
                ],
                $snippet:[
                    "var id='linb.temp.empty'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div id='+id+' style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">content in div<br /><button onclick=\"linb(\\\''+id+'\\\').empty()\">Empty me</button></div>'+ '<button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "}"
                ]
            },
            remove:{
                $desc:"移除包含的所有DOM元素.",
                $rtn:"[self]",
                $paras:[
                    "triggerGC [可选参数] : Boolean, 指示是否触发GC(垃圾回收)."
                ],
                $snippet:[
                    "var id='linb.temp.empty'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">content in div'+ '<button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "}"
                ]
            },
            replace:{
                $desc:"用一系列的DOM元素替换第一个元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "target [必需参数] : linb.Dom, 该对象包含一系列的DOM元素,用于替换当前第一个元素.",
                    "triggerGC [可选参数] : Boolean, 指示是否触发GC(垃圾回收)."
                ],
                $snippet:[
                    "var id='linb.temp.replace'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div id='+id+' style=\"border:solid 1px;padding:5px;\"></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){ linb(id).replace(linb.create('a<input value=b />c<input value=d />e')) },1000)"+
                    "}"
                ]
            },
            swap:{
                $desc:"交换第一个元素和参数指定的元素.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.Dom 对象. 该对象包含有要交换的DOM元素"
                ],
                $snippet:[
                    "var id='linb.temp.replace'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'1  style=\"border:solid 1px;padding:5px;\">1</div><div id='+id+'2 style=\"border:solid 1px;padding:5px;\">2</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){ linb(id+'1').swap( linb(id+'2') ) },1000);_.asyRun(function(){ linb(id+'1').swap( linb(id+'2') ) },2000);"+
                    "}"
                ]
            },
            setInlineBlock:{
                $desc:"将所有的元素CSS的display属性设置为'inline'. ",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.sib'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'  style=\"border:solid 1px;padding:5px;\">1</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){ linb(id).setInlineBlock()  },1000);_.asyRun(function(){ linb(id).css('display','') },2000);"+
                    "}"
                ]
            },
            setSelectable:{
                $desc:"启用或禁止包含的元素可用鼠标选择.",
                $rtn:"[self]",
                $paras:[
                    "value [可选参数] : Boolean, 默认为禁止[false]."
                ],
                $snippet:[
                    "var id='linb.temp.ssable'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'1  style=\"border:solid 1px;padding:5px;\">selectable</div><div id='+id+'2 style=\"border:solid 1px;padding:5px;\">not selectable</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id+'1').setSelectable(true);linb(id+'2').setSelectable(false);"+
                    "}"
                ]
            },
            first:{
                $desc:"获取包含所有的DOM元素的第一个子元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引."
                ],
                $snippet:[
                    "var id='linb.temp.first'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1<div style=\"border:solid 1px;padding:5px;\">2<div style=\"border:solid 1px;padding:5px;\">3<div style=\"border:solid 1px;padding:5px;\">4</div></div></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).first().css('background','#eee');linb(id).first(2).css('background','#ccc');linb(id).first(3).css('background','#888');linb(id).first(4).css('background','#444');"+
                    "}"
                ]
            },
            parent:{
                $desc:"获取包含所有的DOM元素的父元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引."
                ],
                $snippet:[
                    "var id='linb.temp.parent'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1<div style=\"border:solid 1px;padding:5px;\">2<div style=\"border:solid 1px;padding:5px;\">3<div style=\"border:solid 1px;padding:5px;\" id='+id+' >4</div></div></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).parent(4).css('background','#eee');linb(id).parent(3).css('background','#ccc');linb(id).parent(2).css('background','#888');linb(id).parent().css('background','#444');"+
                    "}"
                ]
            },
            last:{
                $desc:"获取包含所有的DOM元素的最后一个子元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引."
                ],
                $snippet:[
                    "var id='linb.temp.last'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><button onclick=\"linb(this).parent().remove()\">remove this example</button><div style=\"border:solid 1px;padding:5px;\">1<input /><div style=\"border:solid 1px;padding:5px;\">2<input /><div style=\"border:solid 1px;padding:5px;\">3<input /><div style=\"border:solid 1px;padding:5px;\">4</div></div></div></div></div>'));"+
                    "linb(id).last().css('background','#eee');linb(id).last(2).css('background','#ccc');linb(id).last(3).css('background','#888');linb(id).last(4).css('background','#444');"+
                    "}"
                ]
            },
            prev:{
                $desc:"获取包含所有的DOM元素的前一个兄弟元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引."
                ],
                $snippet:[
                    "var id='linb.temp.prev'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1</div><div style=\"border:solid 1px;padding:5px;\">2</div><div style=\"border:solid 1px;padding:5px;\">3</div><div style=\"border:solid 1px;padding:5px;\">4</div><button onclick=\"linb(this).parent().remove()\">remove this example</button></div>'));"+
                    "linb(id).last().prev().css('background','#eee');linb(id).last().prev(2).css('background','#ccc');linb(id).last().prev(3).css('background','#888');linb(id).last().prev(4).css('background','#444');"+
                    "}"
                ]
            },
            next:{
                $desc:"获取包含所有的DOM元素的后一个兄弟元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引."
                ],
                $snippet:[
                    "var id='linb.temp.next'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><button onclick=\"linb(this).parent().remove()\">remove this example</button><div style=\"border:solid 1px;padding:5px;\">1</div><div style=\"border:solid 1px;padding:5px;\">2</div><div style=\"border:solid 1px;padding:5px;\">3</div><div style=\"border:solid 1px;padding:5px;\">4</div></div>'));"+
                    "linb(id).first().next().css('background','#eee');linb(id).first().next(2).css('background','#ccc');linb(id).first().next(3).css('background','#888');linb(id).first().next(4).css('background','#444');"+
                    "}"
                ]
            },
            focus:{
                $desc:"让第一个元素获取焦点, 如果不能获取焦点则忽略.",
                $rtn:"[self]",
                $paras:[
                    "force [可选参数] : Boolean, 强迫设置焦点."
                ],
                $snippet:[
                    "var id='linb.temp.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).last().focus()"+
                    "}"
                ]
            },
            leftBy:{
                $desc:"增加或减少元素的left值.",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值.",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件."
                ],
                $snippet:[
                    "var id='linb.temp.leftBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){linb(id).leftBy(10)},500);_.asyRun(function(){linb(id).leftBy(10)},1000); _.asyRun(function(){linb(id).leftBy(10)},1500);_.asyRun(function(){linb(id).leftBy(10)},2000);"+
                    "}"
                ]
            },
            topBy:{
                $desc:"增加或减少元素的top值.",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值.",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件."
                ],
                $snippet:[
                    "var id='linb.temp.topBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){linb(id).topBy(10)},500);_.asyRun(function(){linb(id).topBy(10)},1000); _.asyRun(function(){linb(id).topBy(10)},1500);_.asyRun(function(){linb(id).topBy(10)},2000);"+
                    "}"
                ]
            },
            widthBy:{
                $desc:"增加或减少元素的width值.",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值.",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件."
                ],
                $snippet:[
                    "var id='linb.temp.widthBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){linb(id).widthBy(10)},500);_.asyRun(function(){linb(id).widthBy(10)},1000); _.asyRun(function(){linb(id).widthBy(10)},1500);_.asyRun(function(){linb(id).widthBy(10)},2000);"+
                    "}"
                ]
            },
            heightBy:{
                $desc:"增加或减少元素的height值.",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值.",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件."
                ],
                $snippet:[
                    "var id='linb.temp.heightBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){linb(id).heightBy(10)},500);_.asyRun(function(){linb(id).heightBy(10)},1000); _.asyRun(function(){linb(id).heightBy(10)},1500);_.asyRun(function(){linb(id).heightBy(10)},2000);"+
                    "}"
                ]
            },
            hide:{
                $desc:"隐藏所有的元素.",
                $rtn:"[self]",
                $snippet:[
                    "linb('btnLang').hide(); _.asyRun(function(){linb('btnLang').show()},1000);"
                ]
            },
            show:{
                $desc:"显示所有的元素.",
                $rtn:"[self]",
                $paras:[
                    "left [可选参数] : Number, left值.",
                    "top [可选参数] : Number, top值."
                ],
                $snippet:[
                    "linb('btnLang').hide(); _.asyRun(function(){linb('btnLang').show()},1000);"
                ]
            },
            text:{
                $desc:"获取第一个元素的文本内容,或设置所有元素的文本内容.",
                $rtn:"String/[self]",
                $paras:[
                    "content [可选参数] : String, 文本内容."
                ],
                $snippet:[
                    "var id='linb.temp.text'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).text('<input />'); alert(linb(id).text());"+
                    "}"
                ]
            },
            html:{
                $desc:"获取或设置第一个元素的innerHTML.",
                $rtn:"String/[self]",
                $paras:[
                    "content [可选参数] : String, innerHTML的值.",
                    "triggerGC [可选参数] : Boolean, 是否触发GC(垃圾回收). 默认是true",
                    "loadScripts [可选参数] : Boolean, 是否执行内部的script. 默认是 false."

                ],
                $snippet:[
                    "var id='linb.temp.html1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).html('<input />'); alert(linb(id).html());"+
                    "}"
                ]
            },
            loadHtml:{
                $desc:"加载一个同域的html文件到当前节点内.",
                $rtn:"[self]",
                $paras:[
                    "options [必需参数] : String或Object, 包括url的加载参数.",
                    "onStart [可选参数] : Function, 开始加载的回调函数.",
                    "onEnd [可选参数] : Function, 结束加载的回调函数."
                ]
            },
            loadIframe:{
                $desc:"通过iframe加载一个的html文件到当前节点内.",
                $rtn:"[self]",
                $paras:[
                    "options [必需参数] : String或Object, 包括url的加载参数."
                ]
            },
            outerHTML:{
                $desc:"获取或设置第一个元素的outerHTML.",
                $rtn:"String/[self]",
                $paras:[
                    "content [可选参数] : String, outerHTML的值.",
                    "triggerGC [可选参数] : Boolean,  指示是否触发GC(垃圾回收)."
                ],
                $snippet:[
                    "var id='linb.temp.html1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).outerHTML('<div style=\"padding:5px;border:dashed 2px;\" id='+id+' ><input /></div>'); alert(linb(id).outerHTML());"+
                    "}"
                ]
            },
            "id":{
                $desc:"获取(第一个元素)或设置(所有元素)的DOM id.",
                $rtn:"String/[self]",
                $paras:[
                    "value [可选参数] : String, DOM id value.",
                    "ignoreCache [可选参数] : Boolean, indicates if ignore to reset cache. 默认为[false]"
                ],
                $snippet:[
                    "var n=linb('btnLang'); n.id('logo2'); alert(n.id()); n.id('btnLang');"
                ]
            },
            fixPng:{
                $desc: "修复IE6的png文件显示问题.",
                $rtn:"[self]",
                $memo:"只用于IE6."
            },
            ieRemedy:{
                $desc: "在IE中,触发DOM 元素的内部重画函数."+
                    "在某些IE的旧版本中, DOM的尺寸改变(例如. 改变 overflow='visible'的元素css高度)不会触发布局的变化 .",
                $rtn:"[self]",
                $memo:"只用于IE."
            },
            scrollLeft:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS样式中的scrollLeft值.",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.scrollLeft'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><div style=\"overflow:auto; width:50px;height:50px;\" id='+id+' />aaaaaaaaaaaaa bbbbbbbbbbb cccccccccc dddddddd</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).scrollLeft(linb(id).scrollWidth()); alert(linb(id).scrollLeft())"+
                    "}"
                ]
            },
            scrollTop:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS样式中的scrollTop值.",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.scrollTop'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><div style=\"overflow:auto; width:50px;height:50px;\" id='+id+' />aaaaaaaaaaaaa bbbbbbbbbbb cccccccccc dddddddd</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).scrollTop(linb(id).scrollHeight()); alert(linb(id).scrollTop())"+
                    "}"
                ]
            },

            left:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS样式中的left值.",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.left'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){linb(id).left(10)},1000);_.asyRun(function(){linb(id).left(20)},2000); _.asyRun(function(){linb(id).left(30)},3000);"+
                    "}"
                ]
            },
            top:{
                $desc:"获取(第一个元素) 或设置(所有元素)CSS样式中的top值.",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number."
                ],
                $snippet:[
                    "var id='linb.temp.top'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){linb(id).top(10)},1000);_.asyRun(function(){linb(id).top(20)},2000); _.asyRun(function(){linb(id).top(30)},3000);"+
                    "}"
                ]
            },
            nextFocus:{
                $desc:"获取下一个将要获取焦点的元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "downwards [可选参数] : Boolean, 指示向下([true])还是向上([false])移动焦点. 默认为[true].",
                    "includeChild [可选参数] : Boolean, 指示是否包括子元素. 默认为[true].",
                    "setFocus [可选参数] : Boolean, 指示是否要让下一个元素真正获取焦点. 默认为[true]."
                ],
                $snippet:[
                    "var id='linb.temp.nextFocus'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input value=upwards /><input id='+id+' /><button>downwards</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){linb(id).nextFocus()},1000);_.asyRun(function(){linb(id).nextFocus(false)},2000);"+
                    "}"
                ]
            },
            offsetLeft:{
                $desc:"获取第一个元素的左边偏移量.",
                $rtn:"Number",
                $snippet:[
                    "alert(this.offsetLeft())"
                ]
            },
            offsetTop:{
                $desc:"获取第一个元素的上边偏移量.",
                $rtn:"Number",
                $snippet:[
                "alert(this.offsetTop())"
                ]
            },
            popToTop:{
                $desc:"将第一个元素显示成父元素的顶层.",
                $rtn:"[self]",
                $paras:[
                    "pos [Reqired] : Object/linb.Dom/Element.",
                    "type [可选参数] : Number, from 1 to 4, pop positoin type. 默认为1.",
                    "parent [可选参数] : linb.Dom, the parent element to hold the pop element. 默认为[document.body]."
                ],
                $snippet:[
                    "var id='linb.temp.p2p'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><button id='+id+' style=\"height:100px;width:100px;\">downwards</button>' + '<br /><br /><br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#ccc;width:50px;height:50px;\">type 1</div>')).popToTop(linb(id),1,linb(id).parent());},500);"+
                    "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#aaa;width:50px;height:50px;\">type 2</div>')).popToTop(linb(id),2,linb(id).parent());},1000);"+
                    "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#888;width:50px;height:50px;\">type 3</div>')).popToTop(linb(id),3,linb(id).parent());},1500);"+
                    "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#666;width:50px;height:50px;\">type 4</div>')).popToTop(linb(id),4,linb(id).parent());},2000);"+
                    "}"
                ]
            },
            setBlurTrigger:{
                $desc:"设置或取消设置一个触发函数, 该函数将在用户单击第一个元素之外的区域时被调用.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 触发函数的标志符.",
                    "trigger [必需参数] : Function or [null] :  触发函数.",
                    "group [可选参数] : linb.Dom, 触发函数的组对象."
                ],
                $snippet:[
                "var id='linb.temp.sbt'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"> <div id='+id+' style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).setBlurTrigger('ttt',function(){alert('out of my region');})"+
                "}",
                "var id='linb.temp.sbt'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"> <div id='+id+'1 style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div><div id='+id+'2 style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id+'1').setBlurTrigger('ttt',function(){alert('out of my region')},linb([id+'1',id+'2']))"+
                "}"
                ]
            },
            topZindex:{
                $desc:"获取最小的zIndex值,该值可以让第一个元素显示在其父元素的最顶层; 或直接第一个元素成为其父元素的最顶层.",
                $rtn:"Get: Number, Set:[self]",
                $paras:[
                    "flag [可选参数] : Boolean, 指示是否设置第一个元素为最顶层. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tzi'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:130px;\">' + '<div id='+id+'1 style=\"z-index:1;background:#ccc;position:absolute;border:solid 1px;padding:50px;left:10px;top:30px;\">1</div>' + '<div id='+id+'2 style=\"z-index:2;background:#aaa;position:absolute;border:solid 1px;padding:50px;left:50px;top:30px;\">2</div>'+ '<div id='+id+'3 style=\"z-index:3;background:#888;position:absolute;border:solid 1px;padding:50px;left:100px;top:30px;\">3</div>'+ '<div id='+id+'4 style=\"z-index:4;background:#444;position:absolute;border:solid 1px;padding:50px;left:150px;top:30px;\">4</div>'+ ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));" +
                    "var n=linb(id+'1');alert(n.css('zIndex')+':'+n.topZindex()); n.topZindex(true); alert(n.css('zIndex')+':'+n.topZindex());"+
                    "}"
                ]
            },

            afterBlur:$eo,
            afterChange:$eo,
            afterClick:{
                $rtn:"[self]",
                $paras:[
                    "fun [可选参数]: Function, 函数参数是 [linb.DomProfile Object, DOM event Object, the current element's linbid].",
                    "label [可选参数]: String, 事件标签.",
                    "flag  [可选参数]: Boolean, 移除事件标志."
                ],
                $snippet:[
                "var id='linb.temp.event'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"></p><button style=\"height:50px;\" id='+id+'>BUTTON element for testing.</button></p>' + '<br /><br /><button onclick=\"linb(\\\''+id+'\\\').onClick();\">fire event:[onclick] group functions</button> - <button onclick=\"linb(\\\''+id+'\\\').onClick(true);\">fire event: all functions</button> - <button onclick=\"linb(\\\''+id+'\\\').onClick(null,\\\'1#\\\');\">remove [onclick] 1#</button> - <button onclick=\"linb(\\\''+id+'\\\').beforeClick(null);\">remove all [beforeclick] functions</button> - <button onclick=\"linb(\\\''+id+'\\\').onClick(null,null,true);\">remove all functions</button><br /><br /><br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).beforeClick(function(){alert('beforeclick 1#')},'1#').beforeClick(function(){alert('beforeclick 2#')},'2#').onClick(function(){alert('onclick 1#')},'1#').onClick(function(){alert('onclick 2#')},'2#').afterClick(function(){alert('afterclick 1#, this function return [false], the remaining functions will be ignored!'); return false;},'1#').afterClick(function(){alert('afterclick 2#')},'2#');"+
                "}"
                ]
            },
            afterContextmenu:$eo,
            afterDblclick:$eo,
            afterDrag:$eo,
            afterDragbegin:$eo,
            afterDragenter:$eo,
            afterDragleave:$eo,
            afterDragover:$eo,
            afterDragstop:$eo,
            afterDrop:$eo,
            afterError:$eo,
            afterFocus:$eo,
            afterKeydown:$eo,
            afterKeypress:$eo,
            afterKeyup:$eo,
            afterLoad:$eo,
            afterMove:$eo,
            afterMousedown:$eo,
            afterMousemove:$eo,
            afterMouseout:$eo,
            afterMouseover:$eo,
            afterMouseup:$eo,
            afterMousewheel:$eo,
            afterScroll:$eo,
            afterSelect:$eo,
            afterSize:$eo,
            afterSubmit:$eo,
            afterUnload:$eo,
            beforeBlur:$eo,
            beforeChange:$eo,
            beforeClick:$eo,
            beforeContextmenu:$eo,
            beforeDblclick:$eo,
            beforeDrag:$eo,
            beforeDragbegin:$eo,
            beforeDragenter:$eo,
            beforeDragleave:$eo,
            beforeDragover:$eo,
            beforeDragstop:$eo,
            beforeDrop:$eo,
            beforeError:$eo,
            beforeFocus:$eo,
            beforeKeydown:$eo,
            beforeKeypress:$eo,
            beforeKeyup:$eo,
            beforeLoad:$eo,
            beforeMove:$eo,
            beforeMousedown:$eo,
            beforeMousemove:$eo,
            beforeMouseout:$eo,
            beforeMouseover:$eo,
            beforeMouseup:$eo,
            beforeMousewheel:$eo,
            beforeScroll:$eo,
            beforeSelect:$eo,
            beforeSize:$eo,
            beforeSubmit:$eo,
            beforeUnload:$eo,
            onBlur:$eo,
            onChange:$eo,
            onClick:$eo,
            onContextmenu:$eo,
            onDblclick:$eo,
            onDrag:$eo,
            onDragbegin:$eo,
            onDragenter:$eo,
            onDragleave:$eo,
            onDragover:$eo,
            onDragstop:$eo,
            onDrop:$eo,
            onError:$eo,
            onFocus:$eo,
            onKeydown:$eo,
            onKeypress:$eo,
            onKeyup:$eo,
            onLoad:$eo,
            onMove:$eo,
            onMousedown:$eo,
            onMousemove:$eo,
            onMouseout:$eo,
            onMouseover:$eo,
            onMouseup:$eo,
            onMousewheel:$eo,
            onScroll:$eo,
            onSelect:$eo,
            onSize:$eo,
            onSubmit:$eo,
            onUnload:$eo
        }
    });

    _.set(linb.Locale,["cn","doc","linb","DragDrop"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.DragDrop 类(静态类)",
        abort:{
            $desc:"取消当前的D&D(Drag & Drop)操作.",
            $snippet:[
                "var id='linb.temp.ddo1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.first().draggable(true,{dragType:'icon'},'key1','data1').next().droppable(true,'key1').onDragenter(function(){linb.DragDrop.abort();linb.message('the current dd is aborted!')})"+
                "}"
            ]
        },
        getProfile:{
            $desc:"获取所有的(Profile)拖动信息.",
            $rtn:"linb.DragDrop",
            $rtn:"key/value Object.",
            $snippet:[
                "var id='linb.temp.ddo2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.first().draggable(true,{dragType:'icon'},'key1','data1').next().droppable(true,'key1').onDrop(function(){alert(linb.Coder.formatText(_.serialize(linb.DragDrop.getProfile())))})"+
                "}"
            ]
        },
        setDragIcon:{
            $desc:"设置拖动时鼠标显示的图标.",
            $rtn:"linb.DragDrop",
            $paras:[
                "key [可选参数] : String, 拖动时的图标编号. 默认为 'move'"
            ],
            $snippet:[
                "var id='linb.temp.ddo3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var numb; linb(id).onMousedown(function(p,e,s){numb=0;linb(s).startDrag(e,{dragType:'icon'})}).onDrag(function(){numb++; if(numb<=200){if(numb==50)linb.DragDrop.setDragIcon('move');else if(numb==100)linb.DragDrop.setDragIcon('link');else if(numb==150)linb.DragDrop.setDragIcon('copy');else if(numb==200)linb.DragDrop.setDragIcon('none');}});"+
                "}"
            ],
            $memo:"请在[dragType]仅为'move'时使用该函数."
        },
        setDropElement:{
            $desc:"设置丢放的DOM元素.",
            $rtn:"linb.DragDrop",
            $snippet:[
                "src [必需参数] : DOM元素, 放下的DOM元素."
            ],
            $snippet:[
                "var id='linb.temp.ddo41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.first().draggable(true,{dragType:'icon'},'key1','data1');"+
                "n=n.first().next();"+
                "n.onDrop(function(p,e,linbid){linb.use(linbid).css('background','#fff');alert(linb.Coder.formatText(_.serialize(linb.DragDrop.getProfile())))});"+
                "\n//Must use 'before' here \n n.beforeMouseover(function(p,e,linbid){linb.DragDrop.setDropElement(linbid);linb.use(linbid).css('background','#ccc');}).beforeMouseout(function(p,e,linbid){linb.DragDrop.setDropElement(null);linb.use(linbid).css('background','#fff');});"+
                "}"
            ]
        },
        setDropFace:{
            $desc:"设置丢放对象丢放时的外形.",
            $rtn:"linb.DragDrop",
            $paras:[
                "target [必需参数] : DOM 元素或 linb.Dom 对象.",
                "dragIcon [可选参数] : String, 拖动时的图标编号. 默认为 'move'."
            ],
            $snippet:[
                "var id='linb.temp.ddo42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">setDropFace</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id).first().onMouseover(function(p,e,linbid){linb.DragDrop.setDropFace(linbid,'copy')}).onMouseout(function(){linb.DragDrop.setDropFace()})"+
                "}"
            ]
        },
        startDrag:{
            $desc:"<p>开始拖动.",
            $paras:[
                "e [必需参数] : DOM 事件对象.",
                "targetNode [必需参数] : 能包装成 linb.Dom 对象的输入.",
                "profile [可选参数] : 键值对, 拖拽的概要对象.包括:" +
                "<div>{<ul>" +
                "<li><strong>dragType</strong>: 'move','copy','deep_copy','shape','icon', 'blank' 或 'none', 设置拖拽类型,默认为 'shape';</li>"+
                "<li><strong>shadowFrom</strong>: Element/linb.Dom, 设置拖拽的时候要显示哪个dom的影子.当 dragType 为 'icon' 的时候有效.</li>"+
                "<li><strong>targetReposition</strong>: Boolean, 设置是否最后要重置拖拽目标的位置, 默认为 [true];</li>"+

                "<li><strong>dragIcon</strong>: String, 设置拖拽的时候显示图标的图片路径, 默认为 [linb.ini.path+'ondrag.gif'].</li>"+
                "<li><strong>magneticDistance</strong>: Number, 设置磁性距离, 默认为 0;</li>"+
                "<li><strong>xMagneticLines</strong>: Array of Number, 设置水平方向的磁性线数组, 默认为 [];</li>"+
                "<li><strong>yMagneticLines</strong>: Array of Number, 设置垂直方向的磁性线数组, 默认为 [];</li>"+
                "<li><strong>widthIncrement</strong>: Number, 设置水平方向的最小增量值, 默认为 0;</li>"+
                "<li><strong>heightIncrement</strong>: Number, 设置垂直方向的最小增量值, 默认为 0;</li>"+
                "<li><strong>dragDefer</strong>: Number, 设置拖拽的延迟值.表示在[document.onmousemove]几次后拖拽才真正开始, 默认为 0;</li>"+

                "<li><strong>horizontalOnly</strong>:Boolean, 设置是否要只在水平方向拖拽, 默认为 [false];</li>"+
                "<li><strong>verticalOnly</strong>: Boolean, 设置是否要只在垂直方向拖拽, 默认为 [false];</li>"+
                "<li><strong>maxBottomOffset</strong>:Number, 设置下方向的最大拖拽距离, 默认为 [null];</li>"+
                "<li><strong>maxLeftOffset</strong>:Number, 设置左方向的最大拖拽距离, 默认为 [null];</li>"+
                "<li><strong>maxRightOffset</strong>:Number, 设置右方向的最大拖拽距离, 默认为 [null];</li>"+
                "<li><strong>maxTopOffset</strong>: Number, 设置上方向的最大拖拽距离, 默认为 [null];</li>"+

                "<li><strong>targetNode</strong>: Element/linb.Dom, 设置拖拽的目标;</li>"+
                "<li><strong>targetCSS</strong>: Number, 设置拖拽目标的CSS键值对, 默认为 [null];</li>"+
                "<li><strong>dragKey</strong>: String, 设置拖拽的数据键, 默认为 [null];</li>"+
                "<li><strong>dragData</strong>: Object, 设置拖拽的具体数据, 默认为 [null];</li>"+
                "<li><strong>targetLeft</strong>: Number, 设置拖拽目标的横向坐标, 默认为 [null];</li>"+
                "<li><strong>targetTop</strong>: Number, 设置拖拽目标的纵向坐标, 默认为 [null];</li>"+
                "<li><strong>targetWidth</strong>: Number, 设置拖拽目标的宽, 默认为 [null];</li>"+
                "<li><strong>targetHeight</strong>: Number, 设置拖拽目标的高, 默认为 [null];</li>"+
                "<li><strong>targetOffsetParent</strong>: linb.Dom, 设置拖拽目标的定位父元素(offsetParent), 默认为 [null];</li>"+

                "<li><strong>dragCursor</strong>:  'none', 'move', 'link', 或 'add', 得到鼠标当前的形状; <strong>只读</strong></li>"+
                "<li><strong>x</strong>: Number, 得到鼠标当前的 X 值; <strong>只读</strong></li>"+
                "<li><strong>y</strong>: Number, 得到鼠标当前的 Y 值; <strong>只读</strong></li>"+
                "<li><strong>ox</strong>: Number, 得到鼠标最初的 X 值; <strong>只读</strong></li>"+
                "<li><strong>oy</strong>: Number, 得到鼠标最初的 Y 值; <strong>只读</strong></li>"+
                "<li><strong>curPos</strong>: Object, {left:Number,top:Number}, 得到拖拽对象目前的css位置值 <strong>只读</strong></li>"+
                "<li><strong>offset</strong>: {x:Number,y:Number}, 得到拖拽对象目前css位置相对于最初位置的偏离值 <strong>只读</strong></li>"+
                "<li><strong>isWorking</strong>: Boolean, 得到拖拽是否在工作状态? <strong>只读</strong></li>"+
                "<li><strong>restrictedLeft</strong>: Number, 得到拖拽在左侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>restrictedRight</strong>: Number, 得到拖拽在右侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>restrictedTop</strong>: Number, 得到拖拽在上侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>restrictedBottom</strong>: Number, 得到拖拽在下侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>proxyNode</strong>: linb.Dom, 得到当前拖拽代理的DOM元素; <strong>只读</strong></li>"+
                "<li><strong>dropElement</strong>: String, 得到可以放下(drop)当前拖拽的DOM元素的linbid. <strong>只读</strong></li>"+
                "</ul>}</div>",
                "dragKey [可选参数] : String, 得到拖拽的数据键.",
                "dragData [可选参数] : Object, 得到拖拽的具体数据."
            ],
            $snippet:[
                "var id='linb.temp.ddo9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).onMousedown(function(p,e,s){linb.DragDrop.startDrag(e,s,{dragType:'copy'})})"+
                "}"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","CSS"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.CSS 类(静态类)",
        resetCSS:{
            $desc:"给当前文档添加reset CSS."
        },
        addStyleSheet:{
            $desc:"添加一个&lt;style>元素到&lt;head>区域中.",
            $rtn:"Element",
            $paras:[
                "txt [必需参数] : String, CSS声明字符串.",
                "id [可选参数] : String, 元素id. 如果在&lt;head>已经存在该id, 该函数将被忽略.",
                "backOf [可选参数] : Boolean, 指示是否添加CSS到 &lt;head> 的最后. 默认为 false."
            ],
            $snippet:[
                "var id='linb.temp.add'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(linb.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"linb.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        remove:{
            $desc:"从 &lt;head> 中移除 &lt;style> 或&lt;link> .",
            $paras:[
                "property [必需参数] : String, style元素的属性名.",
                "value [必需参数] : String, style元素的属性值."
            ],
            $snippet:[
                "var id='linb.temp.rm'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(linb.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"linb.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        get:{
            $desc:"获取&lt;head>中 &lt;style> 或 &lt;link>元素 .",
            $rtn:"Element",
            $paras:[
                "property [必需参数] : String, style元素的属性名.",
                "value [必需参数] : String, style元素的属性值."
            ],
            $snippet:[
                "var id='linb.temp.get'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(linb.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"linb.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        setStyleRules:{
            $desc:"设置样式的规则.",
            $rtn:"linb.CSS",
            $paras:[
                "selector [必需参数] : String, CSS样式选择子(不包含逗号',').",
                "value [可选参数] : 键值对. 如果不指定,[selector]指定的选择子将被移除",
                "force [可选参数] : 设置该参数为真可强制增加选择子和CSS样式值到样式表, 即使该样式表已经存在该选择子."
            ],
            $snippet:[
                "var id='linb.temp.ar'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.setStyleRules(\\\'.testadded\\\',{background:\\\'#888\\\'})\">add rules</button> - '+'<button onclick=\"linb.CSS.setStyleRules(\\\'.testadded\\\',{background:\\\'#ccc\\\'})\">update rules</button> - '+'<button onclick=\"linb.CSS.setStyleRules(\\\'.testadded\\\')\">remove rules</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        replaceLink:{
            $desc:" 将样式表(&lt;style> 或 &lt;link>中的样式元素)中的为旧值的某个属性,替换为新值.",
            $paras:[
                "href [必需参数] : String, 样式表的文件路径.",
                "property [必需参数] : String, 指定的属性名.",
                "oValue [必需参数] : String, 旧属性值.",
                "nValue [必需参数] : String, 新属性值."
            ],
            $snippet:[
                "//linb.CSS.replaceLink('http://xxx.com/a.css', 'id', 'oldid', 'newid');"
            ]
        },
        includeLink:{
            $desc:"包含一个特定的[href](作为&lt;link>元素)到DOM的&lt;head>里面.",
            $rtn:"Element",
            $paras:[
                "href [必需参数] : String, CSS文件的url路径.",
                "id [可选参数] : String, 元素的id.",
                "front [可选参数] : Boolean, 指示是否添加&lt;link>元素到&lt;head>的前面. 默认为 false.",
                "attr [可选参数] : key/value Object, 元素&lt;link> 的属性."
            ],
            $snippet:[
                "//linb.CSS.includeLink('http://xxx.com/a.css', 'id', flase, {title:'title'});"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","History"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.History 类(静态类)",
        setCallback:{
            $desc:"设置回调函数. 该函数会在片段标志符(Fragement Identifier)改变时被调用.",
            $rtn:"linb.History",
            $paras:[
                "callback [必需参数] : Function, 回调函数."
            ],
            $snippet:[
                "//linb.History.setCallback(function(str){alert('Fragement Identifier is: '+str)})"
            ]
        },
        getFI:{
            $desc:"获取当前的片段标志符(Fragement Identifier).",
            $rtn:"String",
            $snippet:[
                "//linb.History.setCallback(function(str){alert('Fragement Identifier is: '+str)})\n"+
                "//alert(linb.History.getFI());\n"+
                "//linb.History.setCallback(null)"
            ]
        },
        setFI:{
            $desc:"设置当前的片段标志符(Fragement Identifier).",
            $paras:[
                "fi [必需参数] : String, 片段标志符",
                "triggerCallback [可选参数] : Boolean, 指示是否调用回调函数. 默认为 [true]."
            ],
            $snippet:[
                "//linb.History.setCallback(function(str){alert('Fragement Identifier is: '+str)});\n"+
                "//linb.History.setFI('#test');\n"+
                "//linb.History.setCallback(null)"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Cookies"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Cookies 类(静态类)",
        get:{
            $desc:"获取指定名字的cookie值.",
            $rtn:"String",
            $paras:[
                "name [必需参数] : String, cookie名字."
            ],
            $snippet:[
                "var o=linb.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
            ]
        },
        set:{
            $desc:"保存一个cookie名,cookie值 和其他参数等.",
            $rtn:"linb.Cookies",
            $paras:[
                "name [必需参数] : String, Cookie名.",
                "value [必需参数] : String, cookie值.",
                "days [可选参数] : Number, 过期天数. 默认为 0.",
                "path [可选参数] : String, cookie有效的目录. 默认为当前 URL.",
                "domain [可选参数] : String, 网站域名. 默认为当前URL的域名.",
                "isSecure [可选参数] : Boolean, 指示cookie是否只能被安全的主机获取. 默认为 [false]."
            ],
            $snippet:[
                "var o=linb.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
            ]
        },
        remove:{
            $desc:"移除指定名字的cookie.",
            $rtn:"linb.Cookies",
            $paras:[
                "name [必需参数] : String, cookie名字."
            ],
            $snippet:[
                "var o=linb.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
            ]
        },
        clear:{
            $desc:"移除当前域名下的所有cookie."
        }
    });
    _.set(linb.Locale,["cn","doc","linb","Debugger"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Debugger 类(静态)",
        'log':{
            $desc:"在Debugger窗口中打印日志信息.",
            $snippet:[
                "//可以输入多个参数:\n"+
                "linb.Debugger.log(9,'a',[1,2],{a:1,b:2})"
            ]
        },
        trace:{
            $desc:"在Debugger窗口中打印对象的成员属性值和函数的调用关系信息.",
            $paras:[
                "obj [可选参数] : Object."
            ],
            $snippet:[
                "linb.Debugger.trace({a:1,b:2})"
            ]
        },
        err:{
            $desc:"在Debugger窗口中打印javascript错误信息. 一般用法为 : 'window.onerror=linb.Debugger.err;'",
            $snippet:[
                "var old=window.onerror; \n window.onerror=linb.Debugger.err; \n throw new Error('a error!'); window.onerror=old;"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Date"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Date 类(静态类)",
        add:{
            $desc:"在基准时间戳加上一个时间段.",
            $rtn:"Object, the result Date Object.",
            $paras:[
                "date [必需参数] : Date Object, 基准时间戳.",
                "datepart [必需参数] : String, 时间段单位. 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
                "count [必需参数] : Number, 时间段的值."
            ],
            $snippet:[
                "var date=linb.Date,d=date.parse('1/1/2000'),arr=[];"+
                "arr.push(_.serialize(date.add(d, 'ms', 600)));"+
                "arr.push(_.serialize(date.add(d, 's', 1)));"+
                "arr.push(_.serialize(date.add(d, 'n', 1)));"+
                "arr.push(_.serialize(date.add(d, 'h', 1)));"+
                "arr.push(_.serialize(date.add(d, 'd', 1)));"+
                "arr.push(_.serialize(date.add(d, 'ww', 1)));"+
                "arr.push(_.serialize(date.add(d, 'm', 1)));"+
                "arr.push(_.serialize(date.add(d, 'q', 1)));"+
                "arr.push(_.serialize(date.add(d, 'y', 1)));"+
                "arr.push(_.serialize(date.add(d, 'de', 1)));"+
                "arr.push(_.serialize(date.add(d, 'c', 1)));"+
                "alert(arr.join('\\n'))"
            ]
        },
        diff:{
            $desc:"获取两个时间戳之间的时间段.",
            $rtn:"Number",
            $paras:[
                "startdate [必需参数] : Date, 开始时间.",
                "enddate [必需参数] : Date, 结束时间.",
                "datepart [必需参数] : String, 时间段单位.  'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0."
            ],
            $snippet:[
                "var date=linb.Date,sd=date.parse('1/1/2000'),ed=new Date,arr=[];"+
                "arr.push(_.serialize(date.diff(sd, ed, 'ms')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 's')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'n')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'h')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'd')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'ww')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'm')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'q')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'y')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'de')));"+
                "arr.push(_.serialize(date.diff(sd, ed, 'c')));"+
                "alert(arr.join('\\n'))"
            ]
        },
        get:{
            $desc:"获取时间戳在某个单位上的整数值.",
            $rtn:"Number",
            $paras:[
                "date [必需参数] : Date Object, 时间戳.",
                "datepart [必需参数] : String, 时间单位. 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0."
            ],
            $snippet:[
                "var date=linb.Date,d=new Date();"+
                "alert('The millisecond of \"'+d+'\" is: '+date.get(d, 'ms'));"+
                "alert('The second of \"'+d+'\" is: '+date.get(d, 's'));"+
                "alert('The minute of \"'+d+'\" is: '+date.get(d, 'n'));"+
                "alert('The hour of \"'+d+'\" is: '+date.get(d, 'h'));"+
                "alert('The day of \"'+d+'\" is: '+date.get(d, 'd'));"+
                "alert('The week of \"'+d+'\" is: '+date.get(d, 'ww'));"+
                "alert('The week (first day of week is 1)  of \"'+d+'\" is: '+date.get(d, 'ww',1));"+
                "alert('The month of \"'+d+'\" is: '+date.get(d, 'm'));"+
                "alert('The quarter of \"'+d+'\" is: '+date.get(d, 'q'));"+
                "alert('The year of \"'+d+'\" is: '+date.get(d, 'y'));"+
                "alert('The decade of \"'+d+'\" is: '+date.get(d, 'de'));"+
                "alert('The century of \"'+d+'\" is: '+date.get(d, 'c'));"
            ]
        },
        getTimSpanStart:{
            $desc:"Gets the 'from' time of the given time span(e.g. 3 hours, 2 day, 1 week...).",
            $rtn:"Object, Date Object",
            $paras:[
                "date [必需参数] : Date Object, a date to caculate the time span.",
                "datepart [必需参数] : String, the time span's datepart: 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
                "count [可选参数] : Number, how many [datepart]s in the time span. 默认为 1.",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0."
            ],
            $snippet:[
                "var date=linb.Date,d=new Date,arr=[];"+
                "arr.push(_.serialize(d));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'ms')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 's')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'n')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'h')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'd')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'ww')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'm')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'q')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'y')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'de')));"+
                "arr.push(_.serialize(date.getTimSpanStart(d, 'c')));"+
                "alert(arr.join('\\n'))"
            ]
        },
        getTimSpanEnd:{
            $desc:"Gets the 'to' time of the given time span(e.g. 3 hours, 2 day, 1 week...).",
            $rtn:"Object, Date Object",
            $paras:[
                "date [必需参数] : Date Object, a date to caculate the time span.",
                "datepart [必需参数] : String, time span's datepart: 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
                "count [可选参数] : Number, how many [datepart]s in the time span. 默认为 1.",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0."
            ],
            $snippet:[
                "var date=linb.Date,d=new Date,arr=[];"+
                "arr.push(_.serialize(d));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'ms')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 's')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'n')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'h')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'd')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'ww')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'm')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'q')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'y')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'de')));"+
                "arr.push(_.serialize(date.getTimSpanEnd(d, 'c')));"+
                "alert(arr.join('\\n'))"
            ]
        },
        format:{
            $desc:"按照给定的格式格式化日期.",
            $rtn:"String",
            $paras:[
                "date [必需参数] : Date Object, 时间戳.",
                "format [必需参数] : String, 时间格式. 可用的时间元素有： (utciso|iso|yyyy|mm|ww|dd|hh|nn|ss|ms|de|c|y|q|m|w|d|h|n|s). ",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0."
            ],
            $snippet:[
                "var arr=[],date=linb.Date,d=new Date;"+
                "arr.push(date.format(d,'utciso'));"+
                "arr.push(date.format(d,'iso'));"+
                "arr.push(date.format(d,'ms'));"+
                "arr.push(date.format(d,'s'));"+
                "arr.push(date.format(d,'ss'));"+
                "arr.push(date.format(d,'n'));"+
                "arr.push(date.format(d,'nn'));"+
                "arr.push(date.format(d,'h'));"+
                "arr.push(date.format(d,'hh'));"+
                "arr.push(date.format(d,'d'));"+
                "arr.push(date.format(d,'dd'));"+
                "arr.push(date.format(d,'w' ));"+
                "arr.push(date.format(d,'ww'));"+
                "arr.push(date.format(d,'m'));"+
                "arr.push(date.format(d,'mm'));"+
                "arr.push(date.format(d,'q' ));"+
                "arr.push(date.format(d,'qa' ));"+
                "arr.push(date.format(d,'y'));"+
                "arr.push(date.format(d,'yyyy'));"+
                "arr.push(date.format(d,'de'));"+
                "arr.push(date.format(d,'c'));"+
                "arr.push(date.format(d,'yyyy-mm-dd hh:nn:ss ms'));"+
                "alert(arr.join('\\n'))"
            ]
        },
        getText:{
            $desc:"将时间戳转化为一个可以显示的字符串.",
            $rtn:"String",
            $paras:[
                "date [必需参数] : Date Object, 时间戳.",
                "datepart [必需参数] : String, 显示的时间格式.",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0."
            ],
            $snippet:[
                "var arr=[],date=linb.Date,d=new Date;"+
                "arr.push(date.getText(d,'utciso'));"+
                "arr.push(date.getText(d,'iso'));"+
                "arr.push(date.getText(d,'ms'));"+
                "arr.push(date.getText(d,'s'));"+
                "arr.push(date.getText(d,'n'));"+
                "arr.push(date.getText(d,'h'));"+
                "arr.push(date.getText(d,'d'));"+
                "arr.push(date.getText(d,'w' ));"+
                "arr.push(date.getText(d,'ww'));"+
                "arr.push(date.getText(d,'m'));"+
                "arr.push(date.getText(d,'q' ));"+
                "arr.push(date.getText(d,'y'));"+
                "arr.push(date.getText(d,'de'));"+
                "arr.push(date.getText(d,'c'));"+
                "arr.push(date.getText(d,'hn'));"+
                "arr.push(date.getText(d,'dhn'));"+
                "arr.push(date.getText(d,'mdhn'));"+
                "arr.push(date.getText(d,'hns'));"+
                "arr.push(date.getText(d,'hnsms'));"+
                "arr.push(date.getText(d,'yq'));"+
                "arr.push(date.getText(d,'ym'));"+
                "arr.push(date.getText(d,'md'));"+
                "arr.push(date.getText(d,'ymd'));"+
                "arr.push(date.getText(d,'ymdh'));"+
                "arr.push(date.getText(d,'ymdhn'));"+
                "arr.push(date.getText(d,'ymdhns'));"+
                "arr.push(date.getText(d,'all'));"+
                "alert(arr.join('\\n'))"
            ]
        },
        getWeek:{
            $desc:"获取时间戳是一年的第几周.",
            $rtn:"Number",
            $paras:[
                "date [必需参数] : Date Object, 时间戳.",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0."
            ],
            $snippet:[
                "alert(linb.Date.getWeek(new Date))"
            ]
        },
        parse:{
            $desc:"解析一个字符串,并转化为相应的[Date]对象.",
            $rtn:"Object, Date Object",
            $paras:[
                "str [必需参数] : String, 表示时间的字符串.",
                "foramt [可选参数] : String, 可选的日期时间格式(例如,yyyy-mm-dd 或 dd/mm/yyyy hh:nn:ss ms)."
            ],
            $snippet:[
                "alert(linb.Date.parse('1/1/1998'))",
                "alert(linb.Date.parse('Fri Sep 05 2008 11:46:11 GMT+0800'))",
                "alert(linb.Date.parse('2008-09-05T03:46:34.343Z'))",
                "alert(linb.Date.parse('2008-09-05T03:46:34.343+80:00'))"
            ]
        },
        offsetTimeZone:{
            $desc:"计算时间戳在在指定的time zone上的时间.",
            $rtn:"Object, Date Object",
            $paras:[
                "date [必需参数] : Date Object, 时间戳.",
                "timeZone [必需参数] : integer Number, time zone的编号.",
                "back [可选参数] : Boolean, 指示是否使用相反的偏移量. 默认为 [false]."
            ],
            $snippet:[
                "var localDate = new Date, timezone9Date=linb.Date.offsetTimeZone(localDate, 9);"+
                "alert(localDate.toString() == linb.Date.offsetTimeZone(timezone9Date, 9, true))"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","absObj"], {
        getAll:{
            $desc:"获取该类的所有对象实例.",
            $rtn:"linb.absObj, 当前类对象",
            $snippet:[
                "alert(linb.UI.getAll().get().length)"
            ]
        },
        pickAlias:{
            $desc:"为类选择一个可用的对象的别名.",
            $rtn:'String',
            $snippet:[
                "alert(linb.UI.Button.pickAlias())"
            ]
        },
        setDataModel:{
            $desc:"设置类的一系列数据模型.",
            $rtn:"linb.absObject",
            $paras:[
                "hash [必需参数] : 键值对"
            ],
            $snippet:[
                "var o=(new linb.UI.Button).render(); \n//no 'test' data[getTest function, setTest functon] yet\n alert(o.getTest); \n//Add 'test' data model to the Class\n linb.UI.Button.setDataModel({test:'default value'}); \n//Creates a new instance\n o=(new linb.UI.Button).render(); \n//call getTest here\n alert(o.getTest()); \n//Removes that 'test' data model from the Class\n linb.UI.Button.setDataModel({test:null})"
            ]
        },
        setEventHandlers:{
            $desc:"设置类的一系列事件.",
            $rtn:"linb.absObject",
            $paras:[
                "hash [必需参数] : 键值对"
            ],
            $snippet:[
                "var o=new linb.UI.Button; \n//No 'onA' event handler yet\n alert(o.onA); \n//Sets 'onA' event handler to Class \n linb.UI.Button.setEventHandlers({onA:function(){}}); \n//Adds an 'onA' event function to the instance\n o.onA(function(){alert('a')}); \n//Fires the 'onA' event function\n o.onA(); \n//Removes the 'onA' event handler from Class\n linb.UI.Button.setEventHandlers({onA:null});"
            ]
        },
        unserialize:{
            $desc:"将JSON字符串或数组反序列化为linb.absObj对象.",
            $rtn:"linb.UI",
            $paras:[
                "target [必需参数] : String/Array.",
                "keepSerialId [可选参数] : Boolean, 指示是否保留序列号. 默认为 [false]."
            ],
            $snippet:[
                "var s=linb.UIProfile.getFromDom('btnLang').boxing().serialize(false); alert(_.serialize(s)); alert(linb.UI.unserialize(s))"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            host:{
                $desc:"@Deprecated.(请用 setHost/getHost)"
            },
            alias:{
                $desc:"@Deprecated.(请用 setAlias/getAlias)"
            },
            getHost:{
                $desc:"获取宿主对象.",
                $rtn:'Object',
                $snippet:[
                    "var o=linb.UIProfile.getFromDom('btnLang'); alert(o.host===SPA);",
                    "var host={},o=new linb.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY);"
                ]
            },
            setHost:{
                $desc:"设置借宿对象和别名.",
                $rtn:'[self]',
                $paras:[
                    "host [可选参数 : Object, 宿主.",
                    "alias [可选参数 : String, 别名字符串."
                ],
                $snippet:[
                    "var o=linb.UIProfile.getFromDom('btnLang'); alert(o.host===SPA);",
                    "var host={},o=new linb.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY);"
                ]
            },
            getProperties:{
                $desc:"取得当前对象所有的属性或某个指定的属性.",
                $rtn:"Object",
                $paras:[
                    "key [可选参数] : String或Boolean, 属性名称.如果为true,将返回包括隐藏属性的所有属性."
                ]
            },
            setProperties:{
                $desc:"设置一系列的属性或某个指定的属性到所有对象.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object/String, 属性键/值对或属性关键字.",
                    "value [可选参数] : Object, 属性值."
                ]
            },
            getEvents:{
                $desc:"获取当前对象的所有事件或某个指定的事件.",
                $rtn:"Object"
            },
            setEvents:{
                $desc:"设置一系列的事件或某个指定的事件到所有对象.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object, 事件键/值对或事件关键字.",
                    "value [可选参数] : Object, 事件函数."
                ]
            },
            getAlias:{
                $desc:"获取别名.",
                $rtn:'String',
                $snippet:[
                    "var o=linb.UIProfile.getFromDom('btnLang'); alert(o.alias); alert(o.host[o.alias].get(0)===o)",
                    "var host={},o=new linb.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY); o.setAlias('bBtn'); alert(host.aBtn);  alert(host.bBtn.KEY); "
                ]
            },
            setAlias:{
                $desc:"设置别名.",
                $rtn:'[self]',
                $paras:[
                    "str [可选参数] : String, 别名字符串."
                ],
                $snippet:[
                    "var o=linb.UIProfile.getFromDom('btnLang'); alert(o.alias); alert(o.host[o.alias].get(0)===o)",
                    "var host={},o=new linb.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY); o.setAlias('bBtn'); alert(host.aBtn);  alert(host.bBtn.KEY); "
                ]
            },
            serialize:{
                $desc:"将当前对象序列化为JSON字符串.",
                $rtn:"String",
                $paras:[
                    "rtnString [可选参数] : Boolean, to indicate whether or not it returns String or Object. 默认为 true.",
                    "keepHost [可选参数] : Boolean, to keep host Object link or not. 默认为 false."
                ],
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').boxing().serialize());" +
                    "alert(linb.UIProfile.getFromDom('btnLang').boxing().serialize(false))"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","absProfile"], {
        prototype:{
            getId:{
                $desc:"获取唯一的标志符.",
                $rtn:"String",
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').getId())"
                ]
            },
            link:{
                $desc:"将 [target] 参数链接到一个对象或数组,并指定链接的识别字符串[id]. 可以调用'unLink'去除链接.",
                $rtn:"[self]",
                $paras:[
                    "obj [必需参数] : Object or Array.",
                    "id [必需参数] : String, link id.",
                    "target [可选参数] : Object, 默认为 [self]."
                ],
                $snippet:[
                    "var profile=new linb.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
                ],
                $memo:"一般情况下,程序员无需直接调用该函数."

            },
            unLink:{
                $desc:"移除指定的识别字符串[id]的到对象或数组的链接.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 在link函数中指定的链接的识别字符串[id]."
                ],
                $snippet:[
                    "var profile=new linb.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
                ],
                $memo:"一般情况下,程序员无需直接调用该函数."
            },
            unLinkAll:{
                $desc:"移除所有链接",
                $rtn:"[self]",
                $snippet:[
                    "var profile=new linb.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
                ],
                $memo:"一般情况下,程序员无需直接调用该函数."
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Profile"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Profile 类",
        constructor:{
            $desc:"生成一个概要对象",
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            serialize:{
                $desc:"将一个控件概要对象(profile)序列化为一个JSON字符串或一个JSON对象.",
                $rtn:"String",
                $paras:[
                    "rtnString [可选参数] : Boolean, 指示返回一个JSON字符串还是一个JSON对象. 默认为字符串.",
                    "keepHost [可选参数] : Boolean, 指示是否保持和宿主的联系. 默认为 false."
                ],
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').serialize());" +
                    "alert(linb.UIProfile.getFromDom('btnLang').serialize(false))"
                ]
            },
            getProperties:{
                $desc:"取得所有的属性或某个指定的属性.",
                $rtn:"Object",
                $paras:[
                    "key [可选参数] : String, 属性名称."
                ]
            },
            setProperties:{
                $desc:"设置一系列的属性或某个指定的属性.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object/String, 属性键/值对或属性关键字.",
                    "value [可选参数] : Object, 属性值."
                ]
            },
            getEvents:{
                $desc:"获取该对象的所有事件或某个指定的事件.",
                $rtn:"Object"
            },
            setEvents:{
                $desc:"设置一系列的事件或某个指定的事件.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object, 事件键/值对或事件关键字.",
                    "value [可选参数] : Object, 事件函数."
                ]
            },
            boxing:{
                $desc:"将当前的控件概要对象(profile)打包为一个linb.absBox对象,并返回打包后的对象.",
                $rtn:'linb.absBox',
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').boxing().KEY)"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UIProfile"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UIProfile 类",
        constructor:{
            $desc:"生成一个控件概要对象(profile)",
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        getFromDom:{
            $desc:"从一个指定的DOM元素的id上获取一个控件概要对象(profile).",
            $rtn:"linb.UIProfile",
            $paras:[
                "id [必需参数] : String, DOM元素或id."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDom('btnLang').serialize());",
                "alert(linb.UIProfile.getFromDom('linb.UI.TreeBar-CMD:a:l').serialize());"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            renderId:{
                $desc:"String, 指示一个控件概要对象(profile)是否被渲染(生成了对应的Dom节点)."
            },
            getContainer:{
                $desc:"获得容器(linb.Dom)对象,如果没有容器返回根节点.",
                $rtn:"linb.Dom",
                $paras:[
                    "subId [可选参数] : 容器的sub id"
                ]
            },
            getRoot:{
                $desc:"获取控件概要对象(profile)的根节点.",
                $rtn:"linb.Dom",
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').getRoot());"
                ]
            },
            getRootNode:{
                $desc:"获取控件概要对象(profile)的根节点Element.",
                $rtn:"Element",
                $snippet:[
                "alert(linb.UIProfile.getFromDom('btnLang').getRootNode());"
                ]
            },
            serialize:{
                $desc:"将一个控件概要对象(profile)序列化为一个JSON字符串或一个JSON对象.",
                $rtn:"String",
                $paras:[
                    "rtnString [可选参数] : Boolean, 指示返回一个JSON字符串还是一个JSON对象. 默认为字符串.",
                    "keepHost [可选参数] : Boolean, 指示是否保持和宿主的联系. 默认为 false."
                ],
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').serialize());" +
                    "alert(linb.UIProfile.getFromDom('btnLang').serialize(false))"
                ]
            },
            toHtml:{
                $desc:"将当前的控件概要对象(profile)构造为一个html字符串, 并返回.",
                $rtn:"String",
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').toHtml())"
                ]
            },
            getClass:{
                $desc:"获取控件概要对象(profile)特定节点的CSS类名.",
                $rtn:"String",
                $paras:[
                    "key [必需参数] : String, 控件节点的键值.",
                    "tag [可选参数] : String, 附加字符串."
                ],
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').getClass('CAPTION','-mouseover'))"
                ]
            },
            getDomId:{
                $desc:"获取控件概要对象(profile)根节点的DOM id.",
                $rtn:"String",
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').getDomId())"
                ]
            },
            setDomId:{
                $desc:"设置控件概要对象(profile)根节点的dom id.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, id 字符串"
                ],
                $snippet:[
                    "var profile=linb.UIProfile.getFromDom('btnLang'); alert(profile.getDomId()); profile.setDomId('logo1'); alert(profile.getDomId());profile.setDomId('btnLang'); alert(profile.getDomId());"
                ]
            },
            queryItems:{
                 $desc:"从一个多重数组中查询对应的项对象.",
                 $rtn:"Array",
                 $paras:[
                    "items [必需参数] : 多重数组.",
                    "fun [必需参数] : Function, 查询过滤函数.",
                    "deep [可选参数] : Boolean, 指示是否查询子项. 默认为 [false].",
                    "single [可选参数] : Boolean, 指示是否返回一个值. 默认为 [false].",
                    "flag [可选参数] : Boolean, 指示是否返回包括链接信息的复杂值. 默认为 [false]."
                ],
                $snippet:[
                    "var profile=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:'), items=[{id:'a'},{id:'.b',sub:[{id:'aa'},{id:'.bb'}]}], filter=function(o,i){return o.id.indexOf('.')!=-1},results= profile.queryItems(items,filter);alert(results.length);results= profile.queryItems(items,filter,true);alert(results.length);results= profile.queryItems(items,filter,true,true);alert(results.length);results= profile.queryItems(items,filter,false,true);alert(results.length);",
                    "var profile=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:'), items=profile.properties.items, filter=function(o,i){return o.id.indexOf('.')!=-1},results= profile.queryItems(items,filter);alert(results.length);results= profile.queryItems(items,filter,true);alert(results.length);results= profile.queryItems(items,filter,true,true);alert(results.length);results= profile.queryItems(items,filter,false,true);alert(results.length);"

                ]
            },
            getItemByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取项对象.",
                $rtn:"Object, 键值对.",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:');alert(_.serialize( pro.getItemByDom('linb.UI.TreeBar-ITEM:a:a') ))"
                ],
                $memo:"该函数只对[linb.absList]及其派生类有效. 一般情况下, 我们在事件回调函数使用该函数."
            },
            getItemIdByDom:{
                $desc:"从指定的DOM节点(或DOM的id)中获取一个项的id.",
                $rtn:"String",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:');alert(_.serialize( pro.getItemIdByDom('linb.UI.TreeBar-ITEM:a:a') ))"
                ],
                $memo:"该函数只对[linb.absList]及其派生类有效. 一般情况下, 我们在事件回调函数使用该函数."
            },
            getItemByItemId:{
                $desc:"根据一个subId来获取对应的项对象.",
                $rtn:"Object, 键值对.",
                $paras:[
                    "itemId [必需参数] :String, item id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:');alert(_.serialize( pro.getItemByItemId('Namespace') ))"
                ],
                $memo:"该函数只对[linb.absList]及其派生类有效. "
            },
            getSubIdByItemId:{
                $desc:"根据一个项id来获取对应的subId.",
                $rtn:"String",
                $paras:[
                    "itemId [必需参数] :String, 项id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:');alert(pro.getSubIdByItemId('Namespace') )"
                ],
                $memo:"该函数只对[linb.absList]及其派生类有效"
            },
            getSubNode:{
                $desc:"按照给定的[key]和subId来获取控件中特定的DOM节点.",
                $rtn:"linb.Dom",
                $paras:[
                    "key [必需参数] : String, 键字符串.",
                    "subId [可选参数] : String/Boolean. 如果是 [true] 代表得到给定键的所有DOM节点；如果是字符串代表只得到 subId 为给定的值的DOM节点."
                ],
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').getSubNode('KEY').id());"+
                    "alert(linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').getSubNode('ITEM','a').id());"+
                    "alert(linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').getSubNode('ITEM',true).get().length);"
                ],
                $memo:"参数[subId]只对[linb.absList]及其派生类有效"
            },
            getSubNodes:{
                $desc:"按照给定的一组[key]和subId来获取控件中特定一组DOM节点.",
                $rtn:"linb.Dom",
                $paras:[
                    "arr [必需参数] : String/Array, 一组key.",
                    "subId [可选参数] : String/Array/Boolean. 如果是 [true] 代表得到给定键的所有节点；如果是字符串或字符串数组代表只得到 subId 为给定的值的DOM节点. 默认为[true]"
                ],
                $snippet:[
                    "var profile=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:'); alert(profile.getSubNodes(['KEY','BORDER']).get().length);"+
                    "alert(profile.getSubNodes(['ITEM','BAR'],'a').get().length);"+
                    "alert(profile.getSubNodes(['ITEM','BAR'],true).get().length);"
                ],
                $memo:"参数[subId]只对[linb.absList]及其派生类有效"
            },
            getSubNodeByItemId:{
                $desc:"按照给定的[key]和[itemId]来获取控件中特定DOM节点.",
                $rtn:"linb.Dom",
                $paras:[
                    "key [必需参数] : String, key 字符串.",
                    "itemId [可选参数] : String, item id 字符串."
                ],
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').getSubNodeByItemId('ITEM','Class').id())"
                ],
                $memo:"从 [linb.absList] 派生出来的类才有这个函数."
            },
            getKey:{
                $desc:"从一个给定的DOM id中得到节点的键值.",
                $rtn:"String",
                $paras:[
                    "id [必需参数] :String, DOM id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:');alert(pro.getKey('linb.UI.TreeBar:a:') )"
                ]
            },
            getSubId:{
                $desc:"从一个给定的DOM id中得到subId值.",
                $rtn:"String",
                $paras:[
                    "id [必需参数] :String, item id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:');alert(pro.getSubId('linb.UI.TreeBar:a:ab') )"
                ]
            },
            clearCache:{
                $desc:"清除这个控件概要对象(profile)中的缓存数据.",
                $rtn:"[self]",
                $memo:"一般情况下,程序员无需直接调用该函数."
            },
            pickSubId:{
                $desc:"根据给定的节点键值得到一个sub id.",
                $rtn:"String",
                $paras:[
                    "key [必需参数] : String, key 字符串."
                ],
                $snippet:[
                    "var profile=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:'), id1=profile.pickSubId('items'), id2=profile.pickSubId('items');profile.reclaimSubId(id1,'items');var id3=profile.pickSubId('items');alert(id1+':'+id2+':'+id3);"
                ],
                $memo:"一般情况下,程序员不需要手动调用该函数."
            },
            reclaimSubId:{
                $desc:"回收一个节点键值的sub id.",
                $paras:[
                    "id [必需参数] : String, id 字符串.",
                    "key [必需参数] : String, key 字符串."
                ],
                $snippet:[
                    "var profile=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:'), id1=profile.pickSubId('items'), id2=profile.pickSubId('items');profile.reclaimSubId(id1,'items');var id3=profile.pickSubId('items');alert(id1+':'+id2+':'+id3);"
                ],
                $memo:"一般情况下,程序员不需要手动调用该函数."
            },
            linkParent:{
                $desc:"链接一个控件概要对象(profile)到父控件概要对象(profile).",
                $rtn:"[self]",
                $paras:[
                    "parentProfile [必需参数] : UIProfile, 父UIProfile.",
                    "linkId [可选参数] : String, 链接id."
                ],
                $memo:"一般情况下,程序员不需要手动调用该函数."
            },
            unlinkParent:{
                $desc:"从父控件概要对象(profile)上断开链接.",
                $rtn:"[self]",
                $memo:"一般情况下,程序员不需要手动调用该函数."
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Template"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Template 类",
        getFromDom:{
            $desc:"从一个DOM元素中获取一个模板(template)对象.",
            $rtn:"linb.Template",
            $paras:[
                "id [必需参数] : String, DOM元素或id."
            ],
            $snippet:[
                "var id='linb.temp.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('abc'); linb(id).append(t); alert(linb.Template.getFromDom('abc').serialize());"+
                "}"
            ]
        },
        constructor:{
            $desc:"HTML模板.",
            $paras:[
                "template [可选参数] : String, HTML模板.",
                "properties [可选参数] : 键值对, 模板的填充参数.",
                "events [可选参数] : 键值对, 一系列的事件.",
                "domId [可选参数] : String, 模板根节点的DOM id."
            ],
            $snippet:[
                "var id='linb.temp.t1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n//新建一个模板,并直接加到DOM中.\n"+
            "var t=new linb.Template({'':'<div [event]>{pre} {items} {next}</div>',items:'<p [event]>{id} : {caption}</p>'},{pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]},{onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}, 't_t');"+
                "linb(id).append(t);"+
                "}"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            renderId:{
                $desc:"String, 指示模板是否被渲染(生成了DOM)."
            },
            show:{
                $desc:"显示模板对象.",
                $rtn:"[self]",
                $paras:[
                    "parent [可选参数]: String/Element/linb.Dom 父DOM节点."
                ]
            },
            refresh:{
                $desc:"刷新模板.",
                $rtn:"[self]",
                $snippet:[
                "var id='linb.temp.0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_2'); linb(id).append(t); "+
                    "_.asyRun(function(){t.setProperties({id:'2',caption:'cap2'});t.refresh()},1000);"+
                "}"
                ]
            },
            getRoot:{
                $desc:"获取模板生成实例的DOM的根节点(只对已生成的模板有效).",
                $rtn:"Element",
                $snippet:[
                "var id='linb.temp.01'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_2'); linb(id).append(t); alert(t.getRoot());"+
                "}"
                ]
            },
            getRootNode:{
                $desc:"获取模板生成实例的的根节点DOM Element(只对已生成的模板有效).",
                $rtn:"Element",
                $snippet:[
                "var id='linb.temp.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_2'); linb(id).append(t); alert(t.getRootNode());"+
                "}"
                ]
            },
            getItem:{
                $desc:"从一个DOM元素上获取项的数据.",
                $rtn:"Object",
                $paras:[
                    "src [必需参数] : Dom 元素"
                ],
                $snippet:[
                "var id='linb.temp.0.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var t=new linb.Template({'':'<div>{items}</div>','items':'<span [event]>{con}</span>'},{items:[{id:'a',con:'a'},{id:'b',con:'b'}]},{items:{onClick:function(p,e,src){alert(_.serialize(p.getItem(src)))}}}); t.setDomId('t_3'); linb(id).append(t);"+
                "}"
                ]
            },
            toHtml:{
                $desc:"将参数填入模板,返回并构造后的HTML串.",
                $rtn:"String",
                $paras:[
                    "properties [可选参数] : 构造参数."
                ],
                $snippet:[
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); alert(t.toHtml())"
                ]
            },
            serialize:{
                $desc:"将当前的模板序列化为字符串.",
                $rtn:"String",
                $snippet:[
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); alert(t.serialize())"
                ]
            },
            destroy:{
                $desc:"销毁当前模板."
            },
            getDomId:{
                $desc:"从当前模板中获取DOM id.",
                $rtn:"String",
                $snippet:[
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_1'); alert(t.getDomId())"
                ]
            },
            render:{
                $desc:"将模板渲染成一个DOM元素.",
                $rtn:"[self]",
                $snippet:[
                "var id='linb.temp.3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_3'); linb(id).append(t.render());"+
                "}"
                ]
            },
            renderOnto:{
                $desc:"将模板渲染成一个DOM元素, 并提换一个现有的DOM元素.",
                $paras:[
                    "node [必需参数] : DOM element, 要被替换的DOM元素."
                ],
                $snippet:[
                "var id='linb.temp.4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><div id=\"renderOnto\"></div><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_4'); t.renderOnto('renderOnto');"+
                "}"
                ]
            },
            setDomId:{
                $desc:"设置当前模板的DOM id.",
                $rtn:'[self]',
                $paras:[
                    "id [必需参数] : String, DOM id."
                ],
                $snippet:[
                "var id='linb.temp.5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_5'); linb(id).append(t);"+
                "}"
                ]
            },
            setEvents:{
                $desc:"设置当前模板的事件.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : 模板空位名.",
                    "value [可选参数] : Function, 事件函数."
                ],
                $snippet:[
                "var id='linb.temp.tt1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n// \n"+
        "var t=new linb.Template(); t.setTemplate({'':'<div [event]>{pre} {items} {next}</div>',items:'<p [event]>{id} : {caption}</p>'}).setProperties({pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]}).setEvents('onClick',function(p){alert(p.domId)}).setEvents('items',{onClick:function(p,e,s){alert(p.domId);}}); linb(id).append(t);"+
                "}"
                ]
            },
            setProperties:{
                $desc:"设置当前模板的参数.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : 模板空位名.",
                    "value [可选参数] : Object. 模板空位的值"
                ],
                $snippet:[
                "var id='linb.temp.tt2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n// \n"+
        "var t=new linb.Template(); t.setTemplate({'':'<div [event]>{pre} {items} {next}</div>',items:'<p [event]>{id} : {caption}</p>'}).setProperties({pre:'{{{',next:'}}}'}).setProperties('items',[{id:1,caption:'a1'},{id:2,caption:'a2'}]).setEvents({onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}); linb(id).append(t);"+
                "}"
                ]
            },
            setTemplate:{
                $desc:"设置模板的HTML串.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : 模板键.",
                    "value [可选参数] : String, 模板键值."
                ],
                $snippet:[
                "var id='linb.temp.tt3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n// \n"+
        "var t=new linb.Template(); t.setTemplate('<div [event]>{pre} {items} {next}</div>').setTemplate('items','<p [event]>{id} : {caption}</p>').setProperties({pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]}).setEvents({onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}); linb(id).append(t);"+
                "}"
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","Com"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Com 类",
        constructor:{
            $desc:"linb.Com的构造函数",
            $paras:[
                "properties [可选参数] : Object, key/value(any) pairs. the Com properties Object. 默认为 {}.",
                "events [可选参数] : Object, key/value(Function) pairs. the Com event Object. 默认为 {}.",
                "host [可选参数] : Object, the Com's host Object. 默认为 itself."
            ],
            $snippet:[
                "var order=[], com = new linb.Com({"+
                "    $1:1"+
                "  },"+
                "  {"+
                "    beforeCreated:function(){order.push('beforeCreated'); linb.log('beforeCreated');},"+
                "    onCreated:function(){order.push('onCreated'); linb.log('onCreated');},"+
                "    onLoadBaseClass:function(c,t,key){order.push('onLoadBaseClass: '+key); linb.log('onLoadBaseClass: '+key); },"+
                "    onIniResource:function(){order.push('onIniResource'); linb.log('onIniResource');},"+
                "    beforeIniComponents:function(){order.push('beforeIniComponents'); linb.log('beforeIniComponents');},"+
                "    afterIniComponents:function(){order.push('afterIniComponents'); linb.log('afterIniComponents');},"+
                "    onLoadReqiredClass:function(c,t,key){order.push('onLoadReqiredClass: '+key); linb.log('onLoadReqiredClass: '+key);},"+
                "    onReady:function(){order.push('onReady'); linb.log('onReady');},"+
                "    onRender:function(com){order.push('onRender'); linb.log('onRender'); com.dialog1.setHtml(order.join('<br />'));}"+
                "  });"+
                "com.base=['linb.UI','linb.Date'];"+
                "com.required=['linb.UI.Dialog','linb.UI.Button'];"+
                "com.iniComponents=function(){order.push('iniComponents'); return (new linb.UI.Dialog()).setHost(this, 'dialog2').setWidth(150).setHeight(150).get() };"+
                "com.iniResource=function(){order.push('iniResource'); };"+
                "com.iniExComs=function(){order.push('iniExComs'); };"+

                "var abox=com.getComponents();"+
                "abox.merge((new linb.UI.Dialog()).setHost(com, 'dialog1'));"+
                "com.setComponents(abox);"+

                "com.show(function(com){"+
                "   order.push('onEnd'); "+
                "});",

                "Class('App1','linb.Com',{" +
                "    Instance:{" +
                "        base : ['linb.UI', 'linb.Date']," +
                "        required : ['linb.UI.Dialog', 'linb.UI.Button']," +
                "        events:{" +
                "            beforeCreated : function(com){" +
                "                com._info=[];" +
                "                com._info.push('beforeCreated');" +
                "                linb.log('beforeCreated');" +
                "            }," +
                "            onCreated : function(com){" +
                "                com._info.push('onCreated');" +
                "                linb.log('onCreated');" +
                "            }," +
                "            onLoadBaseClass : function(com, t, key){" +
                "                com._info.push('onLoadBaseClass: ' + key);" +
                "                linb.log('onLoadBaseClass: ' + key);" +
                "            }," +
                "            onIniResource : function(com){" +
                "                com._info.push('onIniResource');" +
                "                linb.log('onIniResource');" +
                "            }," +
                "            beforeIniComponents : function(com){" +
                "                com._info.push('beforeIniComponents');" +
                "                linb.log('beforeIniComponents');" +
                "            }," +
                "            afterIniComponents : function(com){" +
                "                com._info.push('afterIniComponents');" +
                "                linb.log('afterIniComponents');" +
                "            }," +
                "            onLoadReqiredClass : function(com, t, key){" +
                "                com._info.push('onLoadReqiredClass: ' + key);" +
                "                linb.log('onLoadReqiredClass: ' + key);" +
                "            }," +
                "            onReady : function(com){" +
                "                com._info.push('onReady');" +
                "                linb.log('onReady');" +
                "            }," +
                "            onRender : function(com){" +
                "                com._info.push('onRender');" +
                "                linb.log('onRender');" +
                "                com.dialog1.setHtml(com._info.join('<br />'));" +
                "            }" +
                "        }," +
                "        customAppend:function(parent){" +
                "            this.dialog1.show(parent);" +
                "        }," +
                "        iniComponents : function(){" +
                "            this._info.push('iniComponents');\n" +
                "            // [[code created by jsLinb UI Builder\n" +
                "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                "            append((new linb.UI.Dialog)" +
                "                .setHost(host,'dialog1')" +
                "                .setWidth(450)" +
                "                .setHeight(450)" +
                "            );" +
                "            return children;\n" +
                "            // ]]code created by jsLinb UI Builder\n" +
                "        }," +
                "        iniResource : function(){" +
                "            this._info.push('iniResource');" +
                "        }," +
                "        iniExComs : function(){" +
                "            this._info.push('iniExComs');" +
                "        }" +
                "    }" +
                "});" +
                "var com = new App1;" +
                "com.show();",

                "Class('App2','linb.Com',{" +
                "    Instance:{" +
                "        base : ['linb.UI']," +
                "        required : ['linb.UI.Dialog']," +
                "        events:{" +
                "            beforeCreated : '_trace'," +
                "            onCreated : '_trace'," +
                "            onLoadBaseClass : '_trace'," +
                "            onIniResource : '_trace'," +
                "            beforeIniComponents : '_trace'," +
                "            afterIniComponents : '_trace'," +
                "            onLoadReqiredClass : '_trace'," +
                "            onReady : '_trace'," +
                "            onRender : '_trace'," +
                "        }," +
                "        customAppend:function(parent){" +
                "            this.dialog1.show(parent);" +
                "        }," +
                "        iniComponents : function(){" +
                "            this._info.push('iniComponents');\n" +
                "            // [[code created by jsLinb UI Builder\n" +
                "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                "            append((new linb.UI.Dialog)" +
                "                .setHost(host,'dialog1')" +
                "                .setWidth(350)" +
                "                .setHeight(450)" +
                "            );" +
                "            return children;\n" +
                "            // ]]code created by jsLinb UI Builder\n" +
                "        }," +
                "        iniResource : function(){" +
                "            this._info.push('iniResource');" +
                "        }," +
                "        iniExComs : function(){" +
                "            this._info.push('iniExComs');" +
                "        }, " +
                "        _trace : function(com, threadid){" +
                "            com._info.push(com.$lastEvent);" +
                "        }" +
                "    }" +
                "});" +
                "var com = new App2;" +
                "com._info=[];"+
                "com.show(function(com){com.dialog1.setHtml(com._info.join('<br />'));});"
            ]
        },
        'load':{
            $desc:"从远程文件加载一个 linb.Com 的代码,然后新建它的 linb.Com 的实例,最后返回这个实例.",
            $paras:[
                "cls [必需参数] : String, the full class path name(e.g. 'linb.App').",
                "onEnd [可选参数]: Function, arguments : [the current linb.Com Object]. This function will be called after the process is end.",
                "lang [可选参数] : String, language name.(e.g. 'en').",
                "showUI [可选参数] : Boolean, indicates whether or not it shows the Com UI. 默认为 true;"
            ],
            $snippet:[
                "////Uses the beblow line to load a specified application, and append its UI to 'document.body' if its UI exits. \n"+
                "//linb.Com.load('RootClassName',function(){alert('ok')},'en')\n",
                "linb.Com.load('App.Test1',function(){alert('ok')});",
                "linb.Com.load('App.Test1',function(com){com.show(function(){alert('ok')},SPA.mainLayout,'main')},null,false)"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            autoDestroy:{
                $desc:"本Com是否随着第一个内UI控件的销毁而销毁.",
                $rtn:"Boolean"
            },
            fireEvent:{
                $desc:"触发自定义的事件",
                $rtn:"Object",
                $paras:[
                    "event: [必需参数] : String, 自定义事件的名字. ",
                    "args [可选参数]: Array, 事件的参数.",
                    "host [可选参数]: Object, 事件函数的作用域对象."
                ],
                $snippet:[
                 "Class('Temp.Demo', 'linb.Com',{Instance:{trigger:function(){this.fireEvent('onCall',['a','b','c'])}}});"+
                 "linb.ComFactory.getCom('Temp.Demo',function(){this.setEvents('onCall',function(){alert(_.toArr(arguments))});this.trigger();});"
                ]
            },
            render:{
                $desc:'渲染内部的 UI 组件.',
                $rtn:"[self]",
                $demo:"You have to call this function after the com was created. And linb.Com.show will trigger this function automatically."
            },
            getAlias:{
                $desc:"得到别名.",
                $rtn:'String'
            },
            setAlias:{
                $desc:"设置别名.",
                $rtn:'[self]',
                $paras:[
                    "str [可选参数] : String, the alias value."
                ]
            },
            AddComponents:{
                $desc:"向当前 Com 中添加控件.",
                $rtn:"[self]",
                $paras:[
                    "obj [Reqired] : linb.absObj Object."
                ]
            },
            setComponents:{
                $desc:"设置目前COM的内部组件.",
                $rtn:"[self]",
                $paras:[
                    "obj [Reqired] : linb.absObj Object."
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setComponents((new linb.UI.Button()).setHost(window,'btn') ); alert(com.getComponents().get(0).alias); });},false);"
                ]
            },
            getComponents:{
                $desc:"得到所有的内部组件.",
                $rtn:"linb.absObj",
                $snippet:[
                    "Class('App1','linb.Com',{" +
                    "   Instance:{"+
                    "        iniComponents : function(){" +
                    "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                    "            append((new linb.DataBinder)" +
                    "                .setHost(host,'db1')" +
                    "                .setName('db1')" +
                    "            );" +
                    "            append((new linb.UI.Dialog)" +
                    "                .setHost(host,'dialog1')" +
                    "                .setWidth(350)" +
                    "                .setHeight(450)" +
                    "            );" +
                    "            return children;\n" +
                    "        }" +
                    "   }" +
                    "});"+
                    "var com=new App1;"+
                    "com.create(function(com){alert(com.getComponents().get(0).alias);});"
                ]
            },
            getDataBinders:{
                $desc:"获取指定linb.Com对象包含的所有DataBinder组件.",
                $rtn:"Array"
            },
            getUIComponents:{
                $desc:"获取指定linb.Com对象包含的所有UI组件.",
                $rtn:"linb.UI",
                $snippet:[
                    "Class('App1','linb.Com',{" +
                    "   Instance:{"+
                    "        iniComponents : function(){" +
                    "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                    "            append((new linb.DataBinder)" +
                    "                .setHost(host,'db1')" +
                    "                .setName('db1')" +
                    "            );" +
                    "            append((new linb.UI.Dialog)" +
                    "                .setHost(host,'dialog1')" +
                    "                .setWidth(350)" +
                    "                .setHeight(450)" +
                    "            );" +
                    "            return children;\n" +
                    "        }" +
                    "   }" +
                    "});"+
                    "var com=new App1;"+
                    "com.create(function(com){alert(com.getUIComponents().get(0).alias);});"
                ]
            },
            getAllComponents:{
                $desc:"得到所有的内部组件.",
                $rtn:"linb.absObj"
            },
            getEvents:{
                $desc:"获取Com对象上的所有事件处理函数.",
                $rtn:"Object, String or Function",
                $paras:[
                    "key [可选参数] : String"
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(_.serialize(com.getEvents()))});},false);",
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(_.serialize(com.getEvents('onReady')))});},false);"
                ]
            },
            setEvents:{
                $desc:"将一系列的事件处理函数(或一个带有key的事件处理函数)附加到Com对象.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Objecyt/String, 一系列的事件处理函数或key值.",
                    "value [可选参数] : Function, event function."
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setEvents('onA',function(){}); alert(com.getEvents('onA'))});},false);"
                ]
            },
            create:{
                $desc:"使用异步方式生成Com对象.",
                $paras:[
                    "onEnd [Optiona] : Function. 回调函数,在Com对象成功生成后执行.",
                    "threadid [可选参数] : String, 内部线程id.  如本参数为 false, 表示生成Com的过程不会异步调用函数（不用linb.Thread）."
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert('created!')});},false);"
                ]
            },
            customAppend:{
                $desc:"把UI控件加到DOM.如果函数内没有做任何appen的工作,并返回false,show函数会把所有的UI控件都将加入到DOM.",
                $paras:[
                    "parent [必需参数] : linb.UI, linb.UI 或 linb.Dom对象.",
                    "subId [可选参数] : String, the sub id that Determines the set of UIProfiles will be added to.",
                    "left [可选参数] : Number, 显示的左边坐标.",
                    "top [可选参数] : Number, 显示的上边坐标."
                ]
            },
            iniExComs:{
                $desc:"加载其他Com可以用本函数.",
                $paras:[
                    "com [必需参数] : linb.Com, 当前Com对象.",
                    "threadid [可选参数] : String, 线程Id."
                ]
            },
            iniResource:{
                $desc:"加载外部的资源（通过Ajax取得数据）可以用本函数.",
                $paras:[
                    "com [必需参数] : linb.Com, 当前Com对象.",
                    "threadid [可选参数] : String, 线程Id."
                ]
            },
            show:{
                $desc:"显示Com对象.",
                $paras:[
                    "onEnd [Optiona] : Function. 回调函数,在Com对象成功显示后执行.",
                    "parent [可选参数] : String/Element/linb.Dom, 父DOM节点或linb.UI对象.",
                    "subId [可选参数] : String, 该参数在parent为linb.UI对象时有效.该子id. The sub id that Determines the [target] will be added to which sub DOM node. 该参数也可以设置成[false], that means the [target] will be appended to DOM only, no link created between the [target] UIProfiles and the parent UIProfile.",
                    "threadid [可选参数] : String, 内部线程id. 如本参数为 false, 表示显示Com的过程不会异步调用函数（不用linb.Thread）."
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.show(function(){});},false);"
                ]
            },
            destroy:{
                $desc:"销毁对象.",
                $memo:"通常情况下, 程序员不必直接调用该函数."
            },
            iniComponents:{
                $desc:"生成内部的组件并返回内部组件数组(linb.absObj Object).",
                $rtn:"Array, linb.absObj对象数组.",
                $snippet:[
                    "Class('App1','linb.Com',{" +
                    "   Instance:{"+
                    "        iniComponents : function(){" +
                    "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                    "            append((new linb.DataBinder)" +
                    "                .setHost(host,'db1')" +
                    "                .setName('db1')" +
                    "            );" +
                    "            append((new linb.UI.Dialog)" +
                    "                .setHost(host,'dialog1')" +
                    "                .setWidth(350)" +
                    "                .setHeight(450)" +
                    "            );" +
                    "            return children;\n" +
                    "        }" +
                    "   }" +
                    "});"+
                    "var com=new App1;"+
                    "com.create(function(com){alert(com.getUIComponents().get(0).alias);});"
                ]
            },
            getProperties:{
                $desc:"取得Com对象所有的属性或某个指定的属性.",
                $rtn:"Object",
                $paras:[
                    "key [可选参数] : String, 属性名称."
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(_.serialize(com.getProperties()))});},false);",
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(com.getProperties('p1'))});},false);"
                ]
            },
            setProperties:{
                $desc:"设置Com对象的一系列的属性或某个指定的属性.",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object/String, 属性或key数组.",
                    "value [可选参数] : Object, a property value."
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setProperties('p3','p3 value'); alert(com.getProperties('p3'))});},false);"
                ]
            },
            setHost:{
                $desc:"设置host对象.",
                $rtn:"[self]",
                $paras:[
                    "host [Requied] : Object, host对象.",
                    "alias [可选参数] : String, 别名."
                ],
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setHost(window,'com_alias'); alert(com.getHost()===window); alert(window.com_alias)});},false);"
                ]
            },
            getHost:{
                $desc:"获取host对象.",
                $rtn:"Object",
                $snippet:[
                    "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setHost(window,'com_alias'); alert(com.getHost()===window); alert(window.com_alias)});},false);"
                ]
            },

            beforeCreated:{
                $desc:'在COM生成之前触发.如果返回false,当前COM对象将不会生成.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.'
                ],
                $memo:'See constructor.'
            },
            onCreated:{
                $desc:'在COM生成的时候触发.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.'
                ],
                $memo:'See constructor.'
            },
            onLoadBaseClass:{
                $desc:'当COM加载基类的时候触发本事件.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.',
                    'key: String, 基类的类名.'
                ],
                $memo:'See constructor.'
            },
            onIniResource:{
                $desc:'当COM加载资源的时候触发本事件.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.'
                ],
                $memo:'See constructor.'
            },
            beforeIniComponents:{
                $desc:'当COM初始化组件前触发本事件.如果返回false,iniComponents函数将不被执行.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.'
                ],
                $memo:'See constructor.'
            },
            afterIniComponents:{
                $desc:'当 COM 运行iniComponents函数之后触发.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.'
                ],
                $memo:'See constructor.'
            },
            onLoadRequiredClass:{
                $desc:'当 COM 加载所需要的类时触发.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.',
                    'key: String, 加载的类名.'
                ],
                $memo:'See constructor.'
            },
            onReady:{
                $desc:'当 COM 构建完成后触发.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.'
                ],
                $memo:'See constructor.'
            },
            onRender:{
                $desc:'当 COM 的UI部分被加到DOM时触发.',
                $paras:[
                    'com : linb.Com 对象.',
                    'threadid : String, 线程 id.'
                ],
                $memo:'See constructor.'
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","ComFactory"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.ComFactory 类(静态类)",
        setProfile:{
            $desc:"设置应用模块工厂(ComFatory)的profile.",
            $rtn:'linb.ComFactory',
            $paras:[
                "key [必需参数] : String或键值对.",
                "value [可选参数] : String 或 键值对."
            ],
            $snippet:[
                "linb.ComFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});"+
                "linb.ComFactory.setProfile('test1','App.Test1');"+
                "linb.ComFactory.setProfile({test1:{cls:'App.Test1'},test2:{cls:'App.Test2'}});"+
                "linb.ComFactory.setProfile('test1',{cls:'App.Test1',props:{dlgCaption:'dialog caption'}});"+
                "alert(_.serialize(linb.ComFactory.getProfile()));"+
                "alert(linb.ComFactory.getProfile('test1'));"
            ]
        },
        getProfile:{
            $desc:"获取应用模块工厂(ComFatory)的profile.",
            $rtn:'String/Object',
            $paras:[
                "key [可选参数] : String."
            ],
            $snippet:[
                "linb.ComFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});"+
                "alert(linb.ComFactory.getProfile());"+
                "alert(linb.ComFactory.getProfile('test1'));"
            ]
        },
        broadcast:{
            $desc:"广播一个消息(function)到所有的应用模块(linb.Com)中.",
            $paras:[
                "fun [必需参数] : Function, 要广播的函数."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1', (new this));},false);"+
                "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
                "linb.ComFactory.broadcast(function(i){alert(i + ' / ' + this.KEY)});"
            ]
        },
        destroyAll:{
            $desc:"销毁应用模块工厂(ComFatory)加载的所有模块.",
            $snippet:[
                "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1',(new this));},false);"+
                "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
                "linb.ComFactory.destroyAll();"+
                "alert(linb.ComFactory.getComFromCache('test'));"
            ]
        },
        getComFromCache:{
            $desc:"获取一个缓存中已经存在的应用模块对象(Com Object).",
            $rtn:"linb.Com",
            $paras:[
                "id [必需参数] : String, 应用模块对象id."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1',(new this));},false);"+
                "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
                "alert(linb.ComFactory.getComFromCache('test1').KEY);"
            ]
        },
        getCom :{
            $desc:"获取一个缓存中已经存在的应用模块对象(Com Object), 如果不存在,则加载应用模块对应的js文件,再生成应用模块对象(Com Object).",
            $rtn:"linb.Com",
            $paras:[
                "id [必需参数] : String, 应用模块对象id.",
                "onEnd [可选参数] : Function, the 回调函数, 生成应用模块对象(Com Object)成功后被调用.",
                "threadid [可选参数] : String, 内部线程id",
                "singleton [可选参数] : Boolean, 默认为 true. 当 singleton 为 false 的时候相当于 newCom.",
                "properties [可选参数] : Object, 键值对,com的属性.",
                "events [可选参数] : Object, 键值对,com的事件."
            ],
            $snippet:[
                "linb.ComFactory.getCom('App.Test1',function(){alert('The Com loaded successfully.')});",

                "linb.ComFactory.destroyAll();"+
                "linb.ComFactory.setProfile({test1:{cls:'App.Test1',properties:{key1:1},events:{ev1:function(){alert(2)}}},test2:'App.Test2'});"+
                "linb.ComFactory.getCom('test1',function(){alert('The Com loaded successfully.');alert(this.properties.key1); this.events.ev1();});"
            ]
        },
        setCom:{
            $desc:"设置一个应用模块对象(Com Object),并和一个Com id关联.",
            $rtn:"linb.ComFactory",
            $paras:[
                "id [必需参数] : String, Com id关联.",
                "obj [必需参数] : Object, 应用模块对象(Com Object)."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1',(new this));},false);"+
                "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
                "alert(linb.ComFactory.getComFromCache('test1').KEY);"
            ]
        },
        newCom :{
            $desc:"生成一个新的应用模块类, 或加载一个应用模块类, 生成并返回它.",
            $paras:[
                "cls [必需参数] : String, 应用模块类的路径名字.",
                "onEnd [可选参数] : Function, the 回调函数,加载应用模块类成功后被调用.",
                "threadid [可选参数] : String, the inner threadid",
                "properties [可选参数] : Object, 键值对,com的属性.",
                "events [可选参数] : Object, 键值对,com的事件."
            ],
            $snippet:[
                "linb.ComFactory.destroyAll();"+
                "linb.ComFactory.newCom('App.Test1',function(){alert('The com loaded successfully.')});"
            ]
        },
        prepareComs:{
            $desc:"在后台加载并生成一些列的应用模块, 这些模块需要在profile中事先被定义.",
            $rtn:"linb.ComFactory",
            $snippet:[
                "//linb.ComFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});\n"+
                "//linb.ComFactory.prepareWidgets(['test1','test2']);"
            ]
        },
        storeCom:{
            $desc:"存储一个应用模块. (切断和父DOM节点的关联, 并存放到一个隐藏的div.)",
            $paras:[
                "id [Require] : 应用模块id."
            ],
            $snippet:[
                "linb.ComFactory.destroyAll();"+
                "linb.ComFactory.setProfile('test1',{cls:'App.Test1',props:{dlgCaption:'dialog caption'}});"+
                "linb.ComFactory.getCom('test1',function(){ this.showDlg(); _.asyRun(function(){linb.ComFactory.storeCom('test1')},1000); });"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","DomProfile"], {
        KEY:{$desc:"本类名"}
    });

    _.set(linb.Locale,["cn","doc","linb","DataBinder"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.DataBinder 类",
        WDSLCache:{
            $desc:"SOAP的WDSL缓存."
        },
        constructor:{
            $desc:"生成一个databinder对象."
        },
        destroyAll:{
            $desc:"销毁所有linb.DataBinder对象.",
            $snippet:[
                "//linb.DataBinder.destroyAll()"
            ]
        },
        getFromName:{
            $desc:"获取名字为指定值的linb.DataBinder对象.",
            $rtn:'linb.DataBinder Object.',
            $paras:[
                "name [必需参数] : String, DataBinder名字."
            ],
            $snippet:[
                "var db=new linb.DataBinder();db.setName('abc');"+
                "alert(db=linb.DataBinder.getFromName('abc'));"+
                "db.destroy();"+
                "alert(linb.DataBinder.getFromName('abc'));"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setHost:{
                $desc:"设置借宿对象和别名.",
                $rtn:'[self]',
                $paras:[
                    "host [可选参数 : Object, 宿主.",
                    "alias [可选参数 : String, 别名字符串."
                ]
            },
            updateValue:{
                $desc:"将绑定控件的内部值更新为界面值,并去掉脏标识.",
                $rtn:"[self]"
            },
            checkValid:{
                $desc:"检查所有绑定值是否有效. 例如: 用户输入了字符到数字框里面,而数字框又绑定了databinder, 这个函数就会返回[false].",
                $rtn:"linb.absValue"
            },
            destroy:{
                $desc:"销毁该对象.",
                $memo:"一般情况下,程序员无需直接调用该函数."
            },
            setName:{
                $desc:"设置数据绑定器的名称.",
                $rtn:'[self]',
                $paras:[
                    "value [必需参数] : String, 名字字符串"
                ],
                $memo:"参看'getValue'代码片段. "
            },
            getUI:{
                $desc:"获取绑定在本对象上的UI.",
                $rtn:'linb.UI.',
                $memo:"To see the 'getValue' snippets. ",
                $snippet:[
                    "var id='linb.temp.ui'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).append(new linb.UI.Input({position:'relative',dataBinder:'abc'}));"+
                    "alert(linb.DataBinder.getFromName('abc').getUI().serialize());"+
                    "}"
                ]
            },
            getName:{
                $desc:"返回数据绑定器名字.",
                $rtn:'String',
                $memo:"参看'getValue'代码片段. "
            },
            getData:{
                $desc:"获取内部数据.",
                $rtn:"Object, 键值对.",
                $paras:[
                    "key [可选参数] : String, 如指定key表示只获取特定键的内部数据"
                ]
            },
            setData:{
                $desc:"设置内部数据.",
                $rtn:"[self].",
                $paras:[
                    "key [必需参数] : Object/String, 键/值对或键关键字.",
                    "value [可选参数] : Object, 值关键字,只有在key为String的时候有效."
                ]
            },
            getDataSourceType:{
                $desc:"获取数据源的类型.",
                $rtn:"String"
            },
            setDataSourceType:{
                $desc:"设置数据源的类型.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String, 数据源的类型. 'none','memory','remoting' 之一,默认为none. 只有设置为'remoting', queryURL,queryUserName, queryPassword, queryMethod,queryAsync,queryModel,queryArgs,queryOptions,proxyType,requestType,responseType等属性才会有效.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryURL:{
                $desc:"获取远程数据源的URL请求地址.",
                $rtn:"String"
            },
            setQueryURL:{
                $desc:"设置远程数据源的URL请求地址.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryUserName:{
                $desc:"获取远程数据源的URL请求用户名.",
                $rtn:"String"
            },
            setQueryUserName:{
                $desc:"设置远程数据源的URL请求用户名.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryPassword:{
                $desc:"获取远程数据源的URL请求密码.",
                $rtn:"String"
            },
            setQueryPassword:{
                $desc:"设置远程数据源的URL请求密码.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryMethod:{
                $desc:"获取远程数据源的URL请求方式.",
                $rtn:"String"
            },
            setQueryMethod:{
                $desc:"设置远程数据源的URL请求方式.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String. 'auto','GET'或'POST', 默认为auto.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryAsync:{
                $desc:"获取远程数据源的数据请求是否为异步方式.",
                $rtn:"Boolean"
            },
            setQueryAsync:{
                $desc:"设置远程数据源的数据请求是否为异步方式.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryModel:{
                $desc:"获取远程数据源的模板(MVC的M)名称.",
                $rtn:"Boolean"
            },
            setQueryModel:{
                $desc:"设置远程数据源的模板(MVC的M)名称. 这个模板字符串会加到数据源请求地址的后面.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryArgs:{
                $desc:"获取远程数据源的数据请求参数.",
                $rtn:"Object"
            },
            setQueryArgs:{
                $desc:"设置远程数据源的数据请求参数.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getQueryOptions:{
                $desc:"获取远程数据源数据请求时的自定义选项[同 Ajax/SAjax/IAjax 的 options].",
                $rtn:"Object"
            },
            setQueryOptions:{
                $desc:"设置远程数据源数据请求时的自定义选项[同 Ajax/SAjax/IAjax 的 options].",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getProxyType:{
                $desc:"获取远程数据源的数据请求代理种类.",
                $rtn:"String"
            },
            setProxyType:{
                $desc:"设置远程数据源的数据请求代理种类.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String. auto/Ajax/SAjax/IAjax之一,默认为auto.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getRequestType:{
                $desc:"获取向远程数据源发送数据请求的数类型.",
                $rtn:"String"
            },
            setRequestType:{
                $desc:"设置向远程数据源发送数据请求的数类型.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String. HTTP,JSON,XML,SOAP 之一",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getResponseType:{
                $desc:"获取从远程数据源得到的数据类型.",
                $rtn:"String"
            },
            setResponseType:{
                $desc:"设置从远程数据源得到的数据类型.",
                $rtn:"[self].",
                $paras:[
                    "value [必需参数] : String. JSON,XML,SOAP 之一",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getDirtied:{
                $desc:"获取内部数据是否已经更改.",
                $rtn:"Boolean"
            },
            updateDataToUI:{
                $desc:"从内部数据data设置数据到所绑定的UI.",
                $rtn:"[self]",
                $paras:[
                    "adjustData [可选参数] : Function, 对内部数据做调整的函数(在设置到UI之前)."
                ]
            },
            updateDataFromUI:{
                $desc:"从绑定的UI上获取值,并设置到内部数据data.",
                $rtn:"[self]",
                $paras:[
                    "updateUIValue [可选参数] : Boolean, 立即重新设置界面数据和清理脏数据标识, 默认为true",
                    "withCaption [可选参数] : Boolean, 是否连控件的caption一起获取(如果控件有caption属性的话), 默认为false",
                    "returnArr [可选参数] : Boolean, 是否得到数组格式(只针对可多选择absList控件), 默认为false",
                    "adjustData [可选参数] : Function, 对从UI获取到的数据做调整的函数(在设置到内部data之前)"
                ]
            },
            invoke:{
                $desc:"远程数据调用.",
                $rtn:"[linb.absIO]",
                $paras:[
                    "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数.",
                    "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数.",
                    "onStart [可选参数] : Function, ajax开始时的载的回调函数.",
                    "onEnd [可选参数] : Function, ajax结束时的回调函数.",
                    "mode [可选参数] : String, 调用方式,normal(ajax调用)/busy(ajax调用并显示busy界面)/return(不调用,返回ajax对象)之一,默认为normal.",
                    "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                    "options [可选参数]: Object, 一组配置数据."
                ] 
            },
            'read':{
                $desc:"读取数据的远程数据调用.",
                $rtn:"[linb.absIO]",
                $paras:[
                    "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数.",
                    "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数.",
                    "onStart [可选参数] : Function, ajax开始时的载的回调函数.",
                    "onEnd [可选参数] : Function, ajax结束时的回调函数.",
                    "mode [可选参数] : String, 调用方式,normal(ajax调用)/busy(ajax调用并显示busy界面)/return(不调用,返回ajax对象)之一,默认为norma.",
                    "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                    "options [可选参数]: Object, 一组配置数据.",
                    "adjustData [可选参数] : Function, 对读取到的数据做调整的函数(在设置到内部data之前)"
                ] 
            },
            'write':{
                $desc:"写入数据的远程数据调用.",
                $rtn:"[linb.absIO]",
                $paras:[
                    "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数.",
                    "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数.",
                    "onStart [可选参数] : Function, ajax开始时的载的回调函数.",
                    "onEnd [可选参数] : Function, ajax结束时的回调函数.",
                    "mode [可选参数] : String, 调用方式,normal(ajax调用)/busy(ajax调用并显示busy界面)/return(不调用,返回ajax对象)之一,默认为norma.",
                    "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                    "options [可选参数]: Object, 一组配置数据."
                ] 
            },

            beforeUpdateDataToUI:{
                $desc:"在updateDataToUI函数设置数据到UI前被调用,用来调整数据对象. 本事件可以返回调整后的数据对象.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile.",
                    "dataToUI : Object, 即将设置到UI的数据对象."
                ]
            },
            afterUpdateDataFromUI:{
                $desc:"在updateDataFromUI函数从得到UI数据后被调用,用来调整数据对象. 本事件可以返回调整后的数据对象.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile.",
                    "dataFromUI : Object, 从UI得到的数据对象."
                ]
            },
            beforeInvoke:{
                $desc:"在invoke之前调用.  返回false可以阻止远程调用.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile."
                ]
            },
            afterInvoke:{
                $desc:"在invoke之后调用.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile.",
                    "rspData : Object, 从远程调用返回的数据"
                ]
            },
            beforeRead:{
                $desc:"在read之前调用.  返回false可以阻止远程调用.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile."
                ]
            },
            afterRead:{
                $desc:"在read之后调用.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile.",
                    "rspData : Object, 从远程调用返回的数据"
                ]
            },
            beforeWrite:{
                $desc:"在write之前调用.  返回false可以阻止远程调用.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile."
                ]
            },
            afterWrite:{
                $desc:"在write之后调用.",
                $rtn:"Object",
                $paras:[
                    "profile : linb.Profile.",
                    "rspData : Object, 从远程调用返回的数据"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Tips"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Tips 类(静态类)",
        AUTOHIDETIME:{
            $desc:"Number, 指示多少毫秒后tip自动隐藏. 该参数在MOABLE设置为[false]时才有效.",
            $snippet:["alert(linb.Tips.AUTOHIDETIME)"]
        },
        DELAYTIME:{
            $desc:"Number, 指示在function 'linb.Tips.show'调用后多少毫秒后显示tip.",
            $snippet:["alert(linb.Tips.DELAYTIME)"]
        },
        MAXWIDTH:{
            $desc:"Number, tooltips的最大宽度.",
            $snippet:["alert(linb.Tips.MAXWIDTH)"]
        },
        MOVABLE:{
            $desc:"Boolean, 指示tip是否跟随鼠标移动.",
            $snippet:["alert(linb.Tips.MOVABLE)"]
        },
        TIPSKEY:{
            $desc:"String, tooltips的键. 默认为'tips'.",
            $snippet:["alert(linb.Tips.TIPSKEY)"]
        },
        getTips:{
            $desc:"获取tips显示的字符串.",
            $rtn:"String",
            $snippet:[
                "linb.Tips.show({left:100,top:100}, 'a string');"+
                "alert(linb.Tips.getTips());"+
                "linb.Tips.hide();"+
                "alert(linb.Tips.getTips());"
            ]
        },
        setTips:{
            $desc:"设置tips显示的字符串.",
            $paras:[
                "s [必需参数] : String"
            ]
        },
        hide:{
            $desc:"隐藏提示信息.",
            $snippet:[
                "linb.Tips.show({left:100,top:100}, 'a string'); _.asyRun(function(){linb.Tips.hide()},1000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {tips:'an Object with a \\\'tips\\\' key'})},2000); _.asyRun(function(){linb.Tips.hide()},3000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {any:'an Object with a customizable key'},'any')},4000);_.asyRun(function(){linb.Tips.hide()},5000);"
            ]
        },
        show:{
            $desc:"显示提示信息.",
            $paras:[
                "pos [必需参数] : Object, {left:Number,top:Number}, 提示信息的位置.",
                "item [必需参数] : String/Object, 提示信息的内容.",
                "key [可选参数] : String, 得到提示信息的键值. 默认为 'tips'."
            ],
            $snippet:[
                "linb.Tips.show({left:100,top:100}, 'a string'); _.asyRun(function(){linb.Tips.hide()},1000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {tips:'an Object with a \\\'tips\\\' key'})},2000); _.asyRun(function(){linb.Tips.hide()},3000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {any:'an Object with a customizable key'},'any')},4000);_.asyRun(function(){linb.Tips.hide()},5000);"
            ]
        }
    });

    _.set(linb.Locale,["cn","doc","linb","Coder"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.Coder 类(静态类)",
        isSafeJSON:{
            $desc:"检测一个字符串是否是一个安全的 JSON 文本.",
            $rtn:"Boolean",
            $paras:[
                "s [必需参数] : String."
            ]
        },
        formatText:{
            $desc:"将js/css/php/html代码片段格式化为更加可读的格式.",
            $rtn:"String",
            $paras:[
                "code [必需参数] : String, 代码片段.",
                "type [可选参数] : String, 代码片段类型. 默认是 'js'"
            ],
            $snippet:[
                "alert(linb.Coder.formatText('var a=function(){var a=1;var b=2;var c={a:1,b:2};};'))",
                "alert(linb.Coder.formatText('.cls{left:0;top:0}','css'))",
                "alert(linb.Coder.formatText('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'))",
                "alert(linb.Coder.formatText(' foreach ($d as $k => $v){print $k.$v;}','php'))"
            ]
        },
        formatHTML:{
            $desc:"将js/css/php/html代码片段转化为更可读的HTML.",
            $rtn:"String",
            $paras:[
                "code [必需参数] : String, code snippet.",
                "type [可选参数] : String, code type. Defalut is 'js'",
                "paras [可选参数] : String[], Commands, e.g. ['plain','run']",
                "fold [可选参数] : String, fold the code.",
                "id [可选参数] : String, the output HTML DOM id.",
                "height [可选参数] : Number, the output HTML height."
            ],
            $snippet:[
                "var str=linb.Coder.formatHTML('var a=function(){var a=1;var b=2;var c={a:1,b:2};};alert(1);','js',['plain','run'],'i-d'); linb.UI.Dialog.alert('linb.Coder', str)",
                "var str=linb.Coder.formatHTML('.cls{left:0;top:0}','css'); linb.UI.Dialog.alert('linb.Coder', str)",
                "var str=linb.Coder.formatHTML('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'); linb.UI.Dialog.alert('linb.Coder', str)",
                "var str=linb.Coder.formatHTML(' foreach ($d as $k => $v){print $k.$v;}','php',['plain']); linb.UI.Dialog.alert('linb.Coder', str)"
            ]
        },
        formatAll:{
            $desc:"将js/css/php/html代码片段转化为HTML. 相当于formatText + formatHTML.",
            $rtn:"String",
            $paras:[
                "code [必需参数] : String, 代码片段.",
                "type [可选参数] : String, 代码类型. 默认的 'js'",
                "paras [可选参数] : String[], 指令, 例如 ['plain','run']",
                "fold [可选参数] : String, fold the code.",
                "id [可选参数] : String, the output HTML DOM id.",
                "height [可选参数] : Number, 输出的HTML高度."
            ],
            $snippet:[
                "var str=linb.Coder.formatAll('var a=function(){var a=1;var b=2;var c={a:1,b:2};};alert(1);','js',['plain','run'],'i-d'); linb.UI.Dialog.alert('linb.Coder', str)",
                "var str=linb.Coder.formatAll('.cls{left:0;top:0}','css'); linb.UI.Dialog.alert('linb.Coder', str)",
                "var str=linb.Coder.formatAll('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'); linb.UI.Dialog.alert('linb.Coder', str)",
                "var str=linb.Coder.formatAll(' foreach ($d as $k => $v){print $k.$v;}','php',['plain']); linb.UI.Dialog.alert('linb.Coder', str)"
            ]
        },
        replace:{
            $desc:"高级字符串替换.",
            $rtn:"String",
            $paras:[
                "str [必需参数] : string, 目标串.",
                "reg [必需参数] : Array: [string, string] 或 [RegExp, string].",
                "replace [可选参数] : String, 替换串.",
                "ignore_case [可选参数] : Boolean, 指示是否忽略大小写.."
            ],
            $snippet:[
                'alert(linb.Coder.replace("aAa","a","*",true));'+
                'alert(linb.Coder.replace("aAa","a","*",false));'+
                'alert(linb.Coder.replace("aAa","a","*"));'+
                'alert(linb.Coder.replace("aAa",/a/,"*"));'+
                'alert(linb.Coder.replace("aAa",["a","*"]));'+
                'alert(linb.Coder.replace("aAa",[["a","*"]]));',
                'alert(linb.Coder.replace("aAa",[["a","*"],[/A/,"-"]]))',
                '//Use "$0" to protect "ab" in the string: \n alert(linb.Coder.replace("aba",[["ab","$0"],["a","*"]]))',
                'alert(linb.Coder.replace("aba ab a",[["ab","$0"],["a",function(s,i){return s[i].toUpperCase();}]]))'
            ]
        },
        applyById:{
            $desc:"将linb.Coder应用于给定id的所有元素.",
            $paras:[
                "id [必需参数] : String, DOM id.",
                "formatAll [可选参数] : Boolean, 指示使用'formatAll'还是'formatHTML', 默认为'formatHTML'."
            ],
            $memo:"该函数仅用于突出显示."
        }
    });


    _.set(linb.Locale,["cn","doc","linb","absList"], {
        prototype:{
            activate:{
                $desc:"激活当前控件(获取焦点状态).",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.abs10-l2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "_.asyRun(function(){o.activate()});"+
                    "}"
                ]
            },
            fireItemClickEvent:{
                $desc:"模拟鼠标点击,以选中list中的某一项.",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 项的id."
                ],
                $snippet:[
                    "var id='linb.temp.absl0-0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){o.fireItemClickEvent('b')},1000);"+
                    "}"
                ]
            },
            updateItem:{
                $desc:"更新一个项,并刷新对应的DOM界面.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号.",
                    "options [必需参数] : Object/String, 要更新的选项."
                ],
                $snippet:[
                    "var id='linb.temp.absl0-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.updateItem('b',{caption:'bbb', image:'img/img.gif', imagePos:'left -16px'})},1000);" +
                    "}"
                ]
            },

            getItems:{
                $desc:"获取所有项.",
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.absl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}))"+
                    "_.asyRun(function(){alert(_.serialize(o.getItems()))});"+
                    "}"
                ]
            },
            setItems:{
                $desc:"设置项, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 项数组.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.absl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}))"+
                    "_.asyRun(function(){o.setItems([{id:'aaa',caption:'bbb'}])});"+
                    "}"
                ]
            },
            insertItems:{
                $desc:"添加一些项.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 项数组.",
                    "base [可选参数] : String, 基准项id.",
                    "before [可选参数] : Boolean, 指示在基准项前还是项后插入. 默认为项后;"
                ],
                $snippet:[
                    "var id='linb.temp.absl3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "_.asyRun(function(){o.insertItems([{id:'a1',caption:'a1'}],'b',true)},1000);"+
                    "_.asyRun(function(){o.insertItems([{id:'c1',caption:'c1'}],'c',false)},2000);"+
                    "_.asyRun(function(){o.insertItems([{id:'a0',caption:'a0'}],null,true)},3000);"+
                    "_.asyRun(function(){o.insertItems([{id:'c2',caption:'c2'}],null,false)},4000);"+
                    "_.asyRun(function(){o.insertItems([{id:'h',caption:'h'},{id:'i',caption:'i'}])},5000);"+
                    "}"
                ]
            },
            removeItems:{
                $desc:"移除一系列项.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 要移除的项id数组."
                ],
                $snippet:[
                    "var id='linb.temp.absl4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "_.asyRun(function(){o.removeItems(['a','b'])},1000);"+
                    "}"
                ]
            },
            clearItems:{
                $desc:"移除所有的项.",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String, 包含所有项的临时键. 默认为 'ITEMS'."
                ],
                $snippet:[
                    "var id='linb.temp.absl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "_.asyRun(function(){o.clearItems()},1000);"+
                    "}"
                ]
            },
            getValueSeparator:{
                $desc:"获取字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效).默认为“;”",
                $rtn:"String"
            },
            setValueSeparator:{
                $desc:"设置字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效).",
                $rtn:"[self]"
            },
            getListKey:{
                $desc:"获取列表键.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.abs6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',listKey:'test'}));"+
                    "_.asyRun(function(){alert(o.getListKey())});"+
                    "}"
                ]
            },
            setListKey:{
                $desc:"设置列表键.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 列表键.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.abs7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',listKey:'test'}));"+
                    "_.asyRun(function(){o.setListKey('test2')},1000);"+
                    "}"
                ]
            },
            getItemByItemId:{
                $desc:"获取id为指定值的项对象.",
                $rtn:"Object",
                $paras:[
                    "itemId [必需参数] :String, 项id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').boxing();alert(_.serialize( pro.getItemByItemId('Namespace') ))"
                ]
            },
            getItemByDom:{
                $desc:"获取DOM节点或DOM id对应的项对象.",
                $rtn:"Object",
                $paras:[
                    "src [必需参数] : DOM节点或DOM id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').boxing();alert(_.serialize( pro.getItemByDom('linb.UI.TreeBar-ITEM:a:a') ))"
                ]
            },
            getSubIdByItemId:{
                $desc:"获取项的子项id.",
                $rtn:"String",
                $paras:[
                    "itemId [必需参数] :String, 项id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').boxing();alert(pro.getSubIdByItemId('Namespace') )"
                ]
            },
            getSubNodeByItemId:{
                $desc:"获取子项对应的DOM元素.",
                $rtn:"linb.Dom",
                $paras:[
                    "itemId [必需参数] :String, 项id."
                ],
                $snippet:[
                    "var pro=linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').boxing();alert(pro.getSubNodeByItemId('Namespace') )"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","absValue"], {
        prototype:{
            getShowDirtyMark:{
                $desc:"获得控件是否显示脏标识的属性",
                $rtn:"Boolean",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            setShowDirtyMark:{
                $desc:"设置控件是否显示脏标识的属性",
                $rtn:"[self]",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            getDirtyMark:{
                $desc:"获得控件是否有标识脏的功能",
                $rtn:"Boolean",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            setDirtyMark:{
                $desc:"设置控件是否有标识脏的功能",
                $rtn:"[self]",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            getDataBinder:{
                $desc:"获取绑定的数据绑定器名称",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.absv1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input);"+
                    "_.asyRun(function(){o.setDataBinder('db1'); alert(o.getDataBinder())},1000)"+
                    "}"
                ]
            },
            setDataBinder:{
                $desc:"设置数据绑定器名称.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.absv2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input);"+
                    "_.asyRun(function(){o.setDataBinder('db1'); alert(o.getDataBinder())},1000)"+
                    "}"
                ]
            },
            getDataField:{
                $desc:"获取数据字段名称",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.absv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input);"+
                    "_.asyRun(function(){o.setDataField('field1'); alert(o.getDataField())},1000)"+
                    "}"
                ]
            },
            setDataField:{
                $desc:"设置数据字段名称.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.absv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input);"+
                    "_.asyRun(function(){o.setDataField('field1'); alert(o.getDataField())},1000)"+
                    "}"
                ]
            },

            getUIValue:{
                $desc:"获取用户界面值",
                $rtn:"Object",
                $paras:[
                    "returnArr [可选参数] : Boolean. 是否返回Array(只对selMode为multi或multibycheckbox的情况有效)"
                ],
                $snippet:[
                    "var id='linb.temp.absv7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "_.asyRun(function(){alert(o.getUIValue())},1000)"+
                    "}"
                ]
            },
            setUIValue:{
                $desc:"设置用户界面值和控件值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强行赋值,即使赋值和现有值已经相同. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.absv81'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "_.asyRun(function(){o.setUIValue('ini2'); alert(o.getUIValue());},1000)"+
                    "}"
                ],
                $memo:"调用该函数时,以下两个事件将被触发beforeUIValueSet and afterUIValueSet."
            },

            updateValue:{
                $desc:"将界面值更新为内部值",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.absv82'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "_.asyRun(function(){o.setUIValue('ini2').updateValue(); alert(o.getValue());},1000)"+
                    "}"
                ]
            },
            getValue:{
                $desc:"获取内部值",
                $rtn:"Object",
                $paras:[
                    "returnArr [可选参数] : Boolean. 是否返回Array(只对selMode为multi或multibycheckbox的情况有效)"
                ],
                $snippet:[
                    "var id='linb.temp.absv9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "_.asyRun(function(){alert(o.getValue())},1000)"+
                    "}"
                ]
            },
            setValue:{
                $desc:"设置内部值,界面值,和控件值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, force to set the value even if the same value already exists. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.absv10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "_.asyRun(function(){o.setValue('ini2'); alert(o.getValue());},1000)"+
                    "}"
                ],
                $memo:"调用该函数时,以下两个事件将被触发: beforeValueSet and afterValueSet."
            },
            checkValid:{
                $desc:"检查界面值是否有效",
                $rtn:"Boolean",
                $paras:[
                    "value [可选参数] : Object, 检测目标值,如果没有输入,则检测的是控件的界面值."
                ],
                $snippet:[
                    "var id='linb.temp.absv11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini',valueFormat:'^-?\\\\d\\\\d*$'}));"+
                    "_.asyRun(function(){alert(o.checkValid());},1000)"+
                    "}"
                ]
            },
            isDirtied:{
                $desc:"判断界面值已经被修改.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.absv13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "_.asyRun(function(){o.setUIValue('ini2');alert(o.isDirtied());},1000)"+
                    "}"
                ]
            },
            resetValue:{
                $desc:"重新设置内部值, 界面值和控件值. 该函数不会触发任何事件.",
                $rtn:'[self]',
                $paras:[
                    "value [可选参数] : Object, 重设的新值. 默认为 ''."
                ],
                $snippet:[
                    "var id='linb.temp.absv14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "o.setUIValue('ini2');_.asyRun(function(){o.resetValue('ini2');},1000)"+
                    "}"
                ]
            },

            beforeUIValueSet:{
                $desc:"在setUIValue调用之前被调用. 返回false会阻止setUIValue被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "oldValue : String, 旧的界面值.",
                    "newValue : String, 新的界面值."
                ],
                $snippet:[
                    "var id='linb.temp.absv15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "_.asyRun(function(){o.setValue('ini3');},200);"+
                    "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },
            afterUIValueSet:{
                $desc:"在setUIValue调用之后被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "oldValue : String, 旧的界面值.",
                    "newValue : String, 新的界面值."
                ],
                $snippet:[
                    "var id='linb.temp.absv16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "_.asyRun(function(){o.setValue('ini3');},200);"+
                   "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },
            onChange:{
                $desc:"当有值的控件值改变时被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "oldValue : String, 旧的界面值.",
                    "newValue : String, 新的界面值."
                ]
            },
            beforeValueSet:{
                $desc:"在setValue调用之前被调用. 返回false会阻止setValue被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "oldValue :String, 旧的内部值.",
                    "newValue : String, 新的内部值."
                ],
                $snippet:[
                    "var id='linb.temp.absv17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "_.asyRun(function(){o.setValue('ini3');},200);"+
                   "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },
            afterValueSet:{
                $desc:"在setValue调用之后被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "oldValue : String, 旧的内部值.",
                    "newValue : String, 新的内部值."
                ],
                $snippet:[
                    "var id='linb.temp.absv18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "_.asyRun(function(){o.setValue('ini3');},200);"+
                   "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },


            beforeDirtyMark:{
                $desc:"在_setDirtyMark调用之前被调用. 返回false将阻止设置脏标志.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "dirty : Boolean, 脏标志."
                ],
                $snippet:[
                    "var id='linb.temp.absv19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.Input({value:'111',position:'relative'})).prepend(o2=new linb.UI.Input({value:'111',position:'relative'}));"+
                    "o1.beforeDirtyMark(function(p,dirty){p.getSubNode('INPUT').css('background',dirty?'#00ff00':'');return false;});"+
                    "_.asyRun(function(){o1.setUIValue('ini');o2.setUIValue('ini');},1000);"+
                    "_.asyRun(function(){o1.setUIValue('111');o2.setUIValue('111');},2000);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","absComposed"], {
        prototype:{
            getDragKey:{
                $desc:"获取拖动时的标志键",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.d1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setDragKey('a'); alert(btn.getDragKey())},1000)"+
                    "}"
                ]
            },
            setDragKey:{
                $desc:"设置拖动时的标志键",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.d2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setDragKey('a'); alert(btn.getDragKey())},1000)"+
                    "}"
                ]
            },
            getDropKeys:{
                $desc:"获取鼠标丢下时的标志键",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.d3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Block({position:'relative',border:true}));"+
                    "_.asyRun(function(){btn.setDropKeys('a:b'); alert(btn.getDropKeys())},1000)"+
                    "}"
                ]
            },
            setDropKeys:{
                $desc:"设置鼠标丢下时的标志键",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.d4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Block({position:'relative',border:true}));"+
                    "_.asyRun(function(){btn.setDropKeys('a:b'); alert(btn.getDropKeys())},1000)"+
                    "}"
                ]
            },
            addPanel:{
                $desc:"添加一个面板.",
                $paras:[
                    "para [必需参数] : 键值对.",
                    "children [必需参数] : Array, 面板的子控件.",
                    "item [可选参数] : Object"
                ],
                $snippet:[
                    "var id='linb.temp.d5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new linb.UI.Button);"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            removePanel:{
                $desc:"移除面板.",
                $snippet:[
                    "var id='linb.temp.d6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new linb.UI.Button);"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            getPanelPara:{
                $desc:"获取面板参数.",
                $rtn:"Object",
                $snippet:[
                    "var id='linb.temp.d8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new linb.UI.Button);"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            getPanelChildren:{
                $desc:"获取面板的子控件.",
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.d9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new linb.UI.Button);"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },

            onHotKeydown:{
                $desc:"当热键按下时被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "keyboard : Object, keyboard 对象.",
                    "e : Event, DOM 事件.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.c1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var w, arr;linb(id).prepend(w=new linb.UI.Widget({position:'relative'}));"+
                    "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(linb.create('<input />'));"+
                    "w.onHotKeydown(function( profile, key, e, src ){arr=[];arr.push(['onHotKeydown',key.key,key.ctrlKey,key.shiftKey,key.altKey])});"+
                    "w.onHotKeypress(function( profile, key, e, src ){arr.push(['onHotKeypress',,key.key,key.ctrlKey,key.shiftKey,key.altKey]); });"+
                    "w.onHotKeyup(function( profile, key, e, src ){arr.push(['onHotKeyup',,key.key,key.ctrlKey,key.shiftKey,key.altKey]);alert(arr);});"+
                    "}"
                ]
            },
            onHotKeyup:{
                $desc:"当热键弹起时被调用..",
                $paras:[
                    "profile : linb.UIProfile.",
                    "keyboard : Object, keyboard 对象.",
                    "e : Event, DOM 事件.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.c2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var w, arr;linb(id).prepend(w=new linb.UI.Widget({position:'relative'}));"+
                    "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(linb.create('<input />'));"+
                    "w.onHotKeydown(function( profile, key, src ){arr=[];arr.push(['onHotKeydown',,key.key,key.ctrlKey,key.shiftKey,key.altKey])});"+
                    "w.onHotKeypress(function( profile, key, src ){arr.push(['onHotKeypress',,key.key,key.ctrlKey,key.shiftKey,key.altKey]); });"+
                    "w.onHotKeyup(function( profile, key, src ){arr.push(['onHotKeyup',,key.key,key.ctrlKey,key.shiftKey,key.altKey]);alert(arr);});"+
                    "}"
                ]
            },
            onHotKeypress:{
                $desc:"当热键被按后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "keyboard : Object, keyboard 对象.",
                    "e : Event, DOM 事件.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.c3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var w, arr;linb(id).prepend(w=new linb.UI.Widget({position:'relative'}));"+
                    "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(linb.create('<input />'));"+
                    "w.onHotKeydown(function( profile, key, src ){arr=[];arr.push(['onHotKeydown',,key.key,key.ctrlKey,key.shiftKey,key.altKey])});"+
                    "w.onHotKeypress(function( profile, key, src ){arr.push(['onHotKeypress',,key.key,key.ctrlKey,key.shiftKey,key.altKey]); });"+
                    "w.onHotKeyup(function( profile, key, src ){arr.push(['onHotKeyup',,key.key,key.ctrlKey,key.shiftKey,key.altKey]);alert(arr);});"+
                    "}"
                ]
            },
            onDragEnter:{
                $desc:"当用户拖动某个对象到该对象上空时.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, 进入的子项对象.可能为空."
                ],
                $snippet:[
                    "var id='linb.temp.ab1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onDragLeave:{
                $desc:"当用户拖动某个对象离开该对象上空时.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, leave的子项对象.可能为空."
                ],
                $snippet:[
                    "var id='linb.temp.ab2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]

            },
            onDrop:{
                $desc:"当用户拖动某个对象在该对象上空放下时.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, drop到的子项对象.可能为空."
                ],
                $snippet:[
                    "var id='linb.temp.ab3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            beforeDrop:{
                $desc:"在用户拖动某个对象在该对象上空放下前调用,如返回 false,onDrop和afterDrop不会调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, drop到的子项对象.可能为空."
                ]
            },
            afterDrop:{
                $desc:"在用户拖动某个对象在该对象上空放下后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, drop到的子项对象.可能为空."
                ]
            },
            onDropMarkClear:{
                $desc:"当丢放标志被清除时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, 进入的子项对象.可能为空."
                ],
                $snippet:[
                    "var id='linb.temp.ab4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onDropMarkShow:{
                $desc:"当丢放标志被显示时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, 进入的子项对象.可能为空."
                ],
                $snippet:[
                    "var id='linb.temp.ab5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onDropTest:{
                $desc:"当判断该对象是否接受拖动时被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "dragKey : String, 被拖动物体的拖动标志串.",
                    "dragData : Object, 拖动物体代表的数据.",
                    "item : Object, 进入的子项对象.可能为空."
                ],
                $snippet:[
                    "var id='linb.temp.ab61'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onStartDrag:{
                $desc:"当用户开始拖动该对象时被触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.ab661'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var list1,list2;linb(id).prepend(list1=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']})).prepend(list2=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']}));"+
                    "list2.onStartDrag(function(p,e,n){return false;});"+
                    "list1.onStartDrag(function(p,e,n){linb.message('onStartDrag');});"+
                    "list1.onDragStop(function(p,e,n){linb.message('onDragStop');});"+
                    "}"
                ]
            },
            onGetDragData:{
                $desc:"当用户开始拖动该对象时(这时候会取得拖拽的数据)调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.ab661-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var list1,list2;linb(id).append(list1=new linb.UI.List({position:'relative',width:'200',height:50,border:true,dragKey:'test',items:['drag me and drop to the below list']})).append(list2=new linb.UI.List({position:'relative',width:'200',height:50,border:true,dropKeys:'test',items:['drop here']}));"+
                    "list1.onGetDragData(function(p,e,n){return {key:'value'};});"+
                    "list2.onDrop(function(p, e, node, key, data){linb.log(data.data);});"+
                    "}"
                ]
            },
            onDragstop:{
                $desc:"当用户结束拖动该对象时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.ab662'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var list1,list2;linb(id).prepend(list1=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']})).prepend(list2=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']}));"+
                    "list2.onStartDrag(function(p,e,n){return false;});"+
                    "list1.onStartDrag(function(p,e,n){linb.message('onStartDrag');});"+
                    "list1.onDragStop(function(p,e,n){linb.message('onDragStop');});"+
                    "}"
                ]
            },
            beforeClickEffect:{
                $desc:"当用户单击控件的某一部分,控件响应该事件,要改变外观（例如反白等）时被调用. 返回false时, 默认的效果（如反白）将不会被显示.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item : Object, 数据项对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "type : String, 'mousedown'或'mouseup'."
                ],
                $snippet:[
                    "var id='linb.temp.ab7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).append(btn=new linb.UI.Button({position:'relative'}));"+
                    "btn.beforeClickEffect(function(p,i,e,s,t){linb([s]).css('border',t=='mousedown'?'solid 1px;':'');return false;});"+
                    "}"
                ]
            },
            beforeHoverEffect:{
                $desc:"当鼠标悬停在控件的某一部分上,控件响应该事件,要改变外观（例如反白等）时被调用. 返回false时, 默认的效果（如反白）将不会被显示.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item : Object, 数据项对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "type : String, 'mousedown'或'mouseup'."
                ],
                $snippet:[
                    "var id='linb.temp.ab8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).append(btn=new linb.UI.Button({position:'relative'}));"+
                    "btn.beforeHoverEffect(function(p,i,e,s,t){linb([s]).css('border',t=='mouseover'?'solid 1px;':'');return false;});"+
                    "}"
                ]
            },
            beforeNextFocus:{
                $desc:"在下一个控件获取焦点时调用. 返回false可以阻止下一个控件获取焦点.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "shift: Boolean, 指示用户是否按下了Shift键.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.ab9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).append(new linb.UI.Button({position:'relative'})).append(new linb.UI.Button({position:'relative'})).append(btn=new linb.UI.Button({position:'relative'})).append(new linb.UI.Button({position:'relative'}));"+
                    "btn.beforeNextFocus(function(){return false;});"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI 类",
        getFromDom:{
            $desc:"从一个指定的DOM元素的id上获取一个UI Object.",
            $rtn:"linb.UI",
            $paras:[
                "id [必需参数] : String, DOM元素或id."
            ],
            $snippet:[
                "alert(linb.UI.getFromDom('linb.UI.TreeBar-CMD:a:1').getAlias());"
            ]
        },
        buildCSSText:{
            $desc:"由指定的键值对生成CSS样式.",
            $rtn:"String",
            $paras:[
                "hash [必需参数] : 键值对."
            ],
            $snippet:[
                "alert(linb.UI.Button.buildCSSText({KEY:{left:linb.browser.ie?0:null,overflow:linb.browser.gek?'auto':null,'font-size':'12px'},BORDER:{'_line-height':10,'-moz-display':'none'}}));"+
                "alert(linb.UI.Button.buildCSSText({KEY:{left:linb.browser.ie?0:null,overflow:linb.browser.gek?'auto':null,'font-size':'12px'},BORDER:{'_line-height':10,'-moz-display':'none'}},'mac'));"
            ]
        },
        getTheme:{
            $desc:"获取当前皮肤的关键字.",
            $rtn:"String",
            $snippet:[
                "alert(linb.UI.getTheme());"
            ]
        },
        setTheme:{
            $desc:"通过设置皮肤关键字来更改当前皮肤.",
            $rtn:"[self]",
            $paras:[
                "key [可选参数] : String, 皮肤键字符串.",
                "refresh [可选参数] : Boolean, 是否要刷新所有界面控件. 默认是 [true].",
                "onSuccess [可选参数]: Function, 成功时触发的回调函数. ",
                "onFail [可选参数]: Function, 失败时触发的回调函数."
            ],
            $snippet:[
                "//linb.UI.setTheme('xp')"
            ]
        },
        adjustData:{
            $desc:"调整输入的键值对,输出合适的数据格式以便UI控件生成.",
            $rtn:"Object",
            $paras:[
                "profile [必需参数] : 目标profile",
                "hashIn [必需参数] : 键值对, 输入参数.",
                "hashOut [可选参数] : 键值对, 输出参数."
            ],
            $snippet:[
                "alert(_.serialize(linb.UI.adjustData(null, {a:1,b:2,c:'$date.MS',d:'@linb.ini.path',renderer:function(){return 'cap';}})))"
            ]
        },
        addTemplateKeys:{
            $desc:"添加一系列模板键到当前的UI控件.",
            $rtn:'[self]',
            $paras:[
                "arr [必需参数] : Array, 模板键数组."
            ],
            $snippet:[
                "alert(_.serialize(linb.UI.Div.$Keys)); alert(_.serialize(linb.UI.Div.addTemplateKeys(['A','B']).$Keys))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        getAppearance:{
            $desc:"获取控件外表对象",
            $rtn:'Object',
            $snippet:[
                "alert(_.serialize(linb.UI.Div.getAppearance()))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        getTemplate:{
            $desc:"从一个缓存id中设置获取模板对象.",
            $rtn:'Object',
            $paras:[
                "cacheId [可选参数] : String."
            ],
            $snippet:[
                "alert(_.serialize(linb.UI.Div.getTemplate()))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        getBehavior:{
            $desc:"获取控件行为对象.",
            $rtn:'Object',
            $snippet:[
                "alert(_.serialize(linb.UI.Link.getBehavior()))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        setAppearance:{
            $desc:"设置控件外表对象.",
            $rtn:'[self]',
            $paras:[
                "hash [必需参数] : 键值对."
            ],
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        setTemplate:{
            $desc:"设置一个模板对象到指定的缓存id中.",
            $rtn:'[self]',
            $paras:[
                "hash [必需参数] : 键值对.",
                "cacheId [可选参数] : String."
            ],
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        setBehavior:{
            $desc:"设置行为对象.",
            $rtn:'[self]',
            $memo:"一般情况下,程序员无需直接调用该函数."
        },
        cacheData:{
            $desc:"缓存数据或移除缓存数据.并为该缓存数据指定一个唯一标志.",
            $rtn:'[self]',
            $paras:[
                "key [必需参数] : String, 缓存数据的唯一标志.",
                "data [可选参数] : Object. 如果设置为undefined, 则移除标志为key的缓存数据."
            ],
            $snippet:[
                "linb.UI.cacheData('a',1); alert(linb.UI.getCachedData('a')); linb.UI.cacheData('a')"
            ]
        },
        getCachedData:{
            $desc:"获取指定标志的缓存数据.",
            $rtn:"Object",
            $paras:[
                "key [必需参数] : String, cache key."
            ],
            $snippet:[
                "linb.UI.cacheData('a',1); alert(linb.UI.getCachedData('a')); linb.UI.cacheData('a')"
            ]
        },
        getDragData:{
            $desc:"获取拖动数据.",
            $rtn:"Object",
            $paras:[
                "profile [必需参数] : 目标概要对象",
                "event: DOM 事件对象.",
                "node [必需参数] : 相关的DOM元素."
            ],
            $memo:"一般情况下,程序员无需直接调用该函数. 该函数会被部分子类覆盖."
        },
        getDragKey:{
            $desc:"获取拖动时的键名字.",
            $rtn:"String",
            $paras:[
                "profile [必需参数] : 目标概要对象",
                "node [必需参数] : 相关的DOM元素."
            ],
            $memo:"一般情况下,程序员无需直接调用该函数. 该函数会被部分子类覆盖."
        },
        getDropKeys:{
            $desc:"设置拖动时的键名字.",
            $rtn:"Array",
            $paras:[
                "profile [必需参数] : linb.UIProfile, 目标概要对象",
                "node [必需参数] : String, 事件所属DOM元素的linbid."
            ],
            $memo:"一般情况下,程序员无需直接调用该函数. 该函数会被部分子类覆盖."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getClassName:{
              $desc:"得到css类.",
              $rtn:"String"
            },
            setClassName:{
                $desc:"设置css类.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getTheme:{
                $desc:"获取当前控件的皮肤关键字.",
                $rtn:"String"
            },
            setTheme:{
                $desc:"通过设置当前控件的皮肤关键字来更改控件的皮肤.",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String, 皮肤键字符串."
                ]
            },
            busy:{
                $desc:"将鼠标显示为沙漏(并将一个div覆盖在当前控件上). ",
                $rtn:"[self]",
                $paras:[
                    "message [可选参数] : String, 说明文字.",
                    "html [可选参数] : String, 说明html字符串.",
                    "key [可选参数] : String, 覆盖div的父key. 默认为 'BORDER'."
                ],
                $snippet:[
                    "var id='linb.temp.tl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "o.busy('Loading message');"+
                    "_.asyRun(function(){o.free()},1000);"+
                    "}"
                ]
            },
            free:{
                $desc:"将鼠标显示为正常(并将覆盖div移除).",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.tl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "o.busy('Loading message');"+
                    "_.asyRun(function(){o.free()},1000);"+
                    "}"
                ]
            },
            reLayout:{
                $desc:"重新布局本控件",
                $rtn:"[self]",
                $paras:[
                    "force [可选参数] : Boolean, 是否强制."
                ]
            },
            getParent:{
                $desc:"得到目前控件的所有父控件.",
                $rtn:"linb.UI"
            },
            getChildrenId:{
                $desc:"得到目前控件在父控件的容器子项.",
                $rtn:"String"
            },
            getChildren:{
                $desc:"得到目前控件的所有子控件.",
                $rtn:"linb.UI",
                $paras:[
                    "subId [可选参数] : String, sub id."
                ],
                $snippet:[
                    "var id='linb.temp.ui-1e'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var tabs;linb(id).prepend(tabs=linb.create({key:'linb.UI.Tabs',properties:{dock:'none',width:200,height:100,position:'relative',items:['a','b','c'],value:'a'},children:[[{key:'linb.UI.Button'},'a'],[{key:'linb.UI.Button'},'b'],[{key:'linb.UI.Button'},'c']]}));"+
                    "_.asyRun(function(){alert(tabs.getChildren().get().length);alert(tabs.getChildren('a').get().length);},1000);"+
                    "}"
                ]
            },
            toHtml:{
                $desc:"得到控件的html字符串.",
                $rtn:"String",
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').boxing().toHtml())"
                ]
            },
            getRenderer:{
                $desc:"获取渲染函数.",
                $rtn:"Function",
                $snippet:[
                    "var id='linb.temp.ui-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var link=new linb.UI.Link({position:'relative'});"+
                    "link.setRenderer(function(item){return '['+item.caption+']'});"+
                    "linb(id).prepend(link);"+
                    "_.asyRun(function(){alert(link.getRenderer());},1000);"+
                    "}"
                ]
            },
            setRenderer:{
                $desc:"设置渲染函数.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Function",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var link=new linb.UI.Link({position:'relative'});"+
                    "link.setRenderer(function(item){return '<span style=\"width:15px;height:15px;background:url(img/img.gif)\"></span> ['+item.caption+']'});"+
                    "linb(id).prepend(link);"+
                    "_.asyRun(function(){alert(link.getRenderer());},1000);"+
                    "}"
                ]
            },
            getContainer:{
                $desc:"获得控件的容器(linb.Dom)对象,如果没有容器返回根节点.",
                $rtn:"linb.Dom",
                $paras:[
                    "subId [可选参数] : 容器的sub id"
                ]
            },
            getRoot:{
                $desc:"获取控件的根节点(linb.Dom)对象.",
                $rtn:"linb.Dom",
                $snippet:[
                "alert(linb.UIProfile.getFromDom('btnLang').boxing().getRoot());"
                ]
            },
            getRootNode:{
                $desc:"获取控件的根节点DOM元素.",
                $rtn:"Element",
                $snippet:[
                "alert(linb.UIProfile.getFromDom('btnLang').boxing().getRootNode());"
                ]
            },
            append:{
                $desc:"添加一系列的控件添加到到当前控件对象上.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.UIProfile[],  子控件的 linb.UI 对象(里面可以包括多个控件概要对象).",
                    "subId [可选参数] : String, subid会指示子控件加到那个DOM节点上.这个参数可以为 [false] ,表示控件不会做为子控件添加到当前控件对象上,只进行在DOM界面上添加UI的工作."
                ],
                $snippet:[
                    "var id='linb.temp.ui2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({border:true}));"+
                    "block.append(btn1=new linb.UI.Button({position:'relative'})).append(btn2=new linb.UI.Button({position:'relative'}), false);"+
                    "alert(btn1.get(0).parent===block.get(0));alert(btn2.get(0).parent);"+
                    "}"
                ]
            },
            removeChildren:{
                $desc:"移除内部所有的子控件.",
                $rtn:"[self]",
                $paras:[
                    "subId [可选参数] : String, 决定哪个subid下面的子控件会被移除.",
                    "bDestroy [可选参数] : Boolean, 是否移除的子控件会被销毁."
                ],
                $snippet:[
                    "var id='linb.temp.ui2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({border:true}));"+
                    "block.append(btn1=new linb.UI.Button({position:'relative'})).append(btn2=new linb.UI.Button({position:'relative'}), false);"+
                    "_.asyRun(function(){block.removeChildren(null,true)},1000)"+
                    "}"
                ]
            },
            clone:{
                $desc:"克隆这个控件对象（里面可以包括多个控件概要对象）.",
                $rtn:"linb.UI",
                $snippet:[
                    "var id='linb.temp.ui3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',border:true}));"+
                    "block.append(btn1=new linb.UI.Button({position:'relative'})).append(btn2=new linb.UI.Button({position:'relative'}), false);"+
                    "\n // Notice: here, only btn1 will be cloned :\n"+
                    "linb(id).append(block.clone())"+
                    "}"
                ]
            },
            destroy:{
                $desc:"销毁当前的对象.",
                $snippet:[
                    "var id='linb.temp.ui4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;linb(id).prepend(block=new linb.UI.Block({position:'relative',border:true}));"+
                    "_.asyRun(function(){block.destroy()},1000);"+
                    "}"
                ]
            },
            isDestroyed:{
                $desc:"判断当前对象是否已被销毁."
            },
            draggable:{
                $desc:"允许或禁止用户拖动当前对象.",
                $rtn:"[self]",
                $paras:[
                    "dragKey [可选参数] : String, 拖动时的标志键.",
                    "dragData [可选参数] : Object, 拖动时的数据.",
                    "key [可选参数] : String, 模板键,指示哪一个DOM节点回作为可拖拽的目标节点. 默认为 'KEY'.",
                    "option [可选参数] : Object, 拖动参数,参见<strong>linb.DragDrop.startDrag</strong>中profile的具体内容."
                ],
                $snippet:[
                    "var id='linb.temp.ui5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn;linb(id).prepend(block=new linb.UI.Block({position:'relative',border:true,dropKeys:['test']})).prepend(btn=new linb.UI.Button({position:'relative'}));"+
                    "block.onDrop(function(profile, e, node, key, data){var btn=linb.UIProfile.getFromDom(data).boxing();profile.boxing().append(btn); btn.draggable(false)});"+
                    "btn.draggable('test',btn.getDomId());"+
                    "}"
                ]
            },
            getLeft:{
                $desc:"获取控件的左边坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setLeft(20); alert(btn.getLeft())},1000)"+
                    "}"
                ]
            },
            setLeft:{
                $desc:"设置控件的左边坐标.（相对于父控件的距离,单位px）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setLeft(20); alert(btn.getLeft())},1000)"+
                    "}"
                ]
            },
            getRight:{
                $desc:"获取控件的右边坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setRight(20); alert(btn.getRight())},1000)"+
                    "}"
                ]
            },
            setRight:{
                $desc:"设置控件的右边坐标.（相对于父控件的距离,单位px）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setRight(20); alert(btn.getRight())},1000)"+
                    "}"
                ]
            },
            getTop:{
                $desc:"获取控件的上边沿坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTop(20); alert(btn.getTop())},1000)"+
                    "}"
                ]
            },
            setTop:{
                $desc:"设置控件的上边沿坐标.（相对于父控件的距离,单位px）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTop(20); alert(btn.getTop())},1000)"+
                    "}"
                ]
            },
            getBottom:{
                $desc:"获取控件的下边沿坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTop('auto').setBottom(20); alert(btn.getBottom())},1000)"+
                    "}"
                ]
            },
            setBottom:{
                $desc:"设置控件的下边沿坐标.（相对于父控件的距离,单位px）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTop('auto').setBottom(20); alert(btn.getBottom())},1000)"+
                    "}"
                ]
            },
            getWidth:{
                $desc:"获取控件的宽度.（单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setWidth(100); alert(btn.getWidth())},1000)"+
                    "}"
                ]
            },
            setWidth:{
                $desc:"设置控件的宽度.（单位px）.",
                $rtn:"[self]",
                 $paras:[
                    "value [必需参数] : nonnegative Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
               $snippet:[
                    "var id='linb.temp.ui19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setWidth(100); alert(btn.getWidth())},1000)"+
                    "}"
                ]
            },
            getHeight:{
                $desc:"获取控件的高度.（单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setHeight(100); alert(btn.getHeight())},1000)"+
                    "}"
                ]
            },
            setHeight:{
                $desc:"设置控件的高度.（单位px）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 非负 Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setHeight(100); alert(btn.getHeight())},1000)"+
                    "}"
                ]
            },
            getDisplay:{
                $desc:"获取控件的显示(display)属性",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ui22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setDisplay('none'); alert(btn.getDisplay())},1000)"+
                    "}"
                ]
            },
            setDisplay:{
                $desc:"设置控件的显示(display)属性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 显示(display)属性的CSS值.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setDisplay('none'); alert(btn.getDisplay())},1000)"+
                    "}"
                ]
            },
            getVisibility:{
                $desc:"获取控件的可见性",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ui24'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setVisibility('hidden'); alert(btn.getVisibility())},1000)"+
                    "}"
                ]
            },
            setVisibility:{
                $desc:"设置控件的可见性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : corresponding CSS value.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setVisibility('hidden'); alert(btn.getVisibility())},1000)"+
                    "}"
                ]
            },
            getZIndex:{
                $desc:"获取控件的z-index,该属性决定了控件之间的覆盖关系",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui26'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button).prepend(new linb.UI.Button({zIndex:10}));"+
                    "_.asyRun(function(){btn.setZIndex(20); alert(btn.getZIndex())},1000)"+
                    "}"
                ]
            },
            setZIndex:{
                $desc:"设置控件的z-index,该属性决定了控件之间的覆盖关系, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : corresponding CSS value.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui27'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button).prepend(new linb.UI.Button({zIndex:10}));"+
                    "_.asyRun(function(){btn.setZIndex(20); alert(btn.getZIndex())},1000)"+
                    "}"
                ]
            },
            getSelectable:{
                $desc:"获取控件的selectable属性,该属性决定了控件的html内容是否可以选定",
                $rtn:"Boolean"
            },
            setSelectable:{
                $desc:"设置控件的selectable属性,该属性决定了控件的html内容是否可以选定",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getPosition:{
                $desc:"获取控件的位置属性,和CSS中的position对应",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ui25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setPosition('static'); alert(btn.getPosition())},1000)"+
                    "}"
                ]
            },
            setPosition:{
                $desc:"设置控件的位置属性,和CSS中的position对应, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : corresponding CSS value.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui28'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setPosition('static'); alert(btn.getPosition())},1000)"+
                    "}"
                ]
            },
            getTabindex:{
                $desc:"获取tab键值",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui29'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTabindex('10'); alert(btn.getTabindex())},1000)"+
                    "}"
                ]
            },
            setTabindex:{
                $desc:"设置tab键值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui30'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTabindex('10'); alert(btn.getTabindex())},1000)"+
                    "}"
                ]
            },
            getTag:{
                $desc:"获取控件的tag值",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ui40'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTag('tag'); alert(btn.getTag())},1000)"+
                    "}"
                ]
            },
            setTag:{
                $desc:"设置控件的tag值.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTag('tag'); alert(btn.getTag())},1000)"+
                    "}"
                ]
            },
            getTagVar:{
                $desc:"获取控件的tag变量",
                $rtn:"Object",
                $snippet:[
                    "var id='linb.temp.ui42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTagVar([1,2]); alert(btn.getTagVar())},1000)"+
                    "}"
                ]
            },
            setTagVar:{
                $desc:"设置控件的tag变量.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui43'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTagVar([1,2]); alert(btn.getTagVar())},1000)"+
                    "}"
                ]
            },
            getTips:{
                $desc:"获取控件的tip文字(当鼠标停留时会显示该文字).",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ui44'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTips('a b c d'); alert(btn.getTips())},1000)"+
                    "}"
                ]
            },
            setTips:{
                $desc:"设置控件的tip文字(当鼠标停留时会显示该文字).",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui45'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setTips('a b c d'); alert(btn.getTips())},1000)"+
                    "}"
                ]
            },
            getDisableTips:{
                $desc:"判断控件是否已经去掉tips效果.",
                $rtn:"Boolean"
            },
            setDisableTips:{
                $desc:"设置控件是否去掉tips效果.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getDisableClickEffect:{
                $desc:"判断控件是否已经去掉鼠标点击效果.",
                $rtn:"Boolean"
            },
            setDisableClickEffect:{
                $desc:"设置控件是否去掉鼠标点击效果.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getDisableHoverEffect:{
                $desc:"判断控件是否已经去掉鼠标Hover效果.",
                $rtn:"Boolean"
            },
            setDisableHoverEffect:{
                $desc:"设置控件是否去掉鼠标Hover效果.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getDisabled:{
                $desc:"判断控件是否变灰(不可用).",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.ui46'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setDisabled(true); alert(btn.getDisabled())},1000)"+
                    "}"
                ]
            },
            setDisabled:{
                $desc:"设置控件是否变灰(不可用), 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui47'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setDisabled(true); alert(btn.getDisabled())},1000)"+
                    "}"
                ]
            },
            getDock:{
                $desc:"获取控件的停靠属性（相对于父控件的停靠位置）",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ui50'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "alert(btn.getDock())"+
                    "}"
                ]
            },
            setDock:{
                $desc:"设置控件的停靠属性（相对于父控件的停靠位置）, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui51'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getDockFloat:{
                $desc:"判断否是停靠漂浮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.ui52'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "alert(btn.getDockFloat())"+
                    "}"
                ]
            },
            setDockFloat:{
                $desc:"设置否是停靠漂浮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui53'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10}));"+
                    "div1.setDockFloat(true).setCustomStyle({KEY:'background:#00ff00'});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}",
                    "var id='linb.temp.ui54'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10}));"+
                    "div1.setDockFloat(false).setCustomStyle({KEY:'background:#00ff00'});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getDockMargin:{
                $desc:"获取停靠的外补丁",
                $rtn:"Object",
                $snippet:[
                    "var id='linb.temp.ui60'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "alert(_.serialize(btn.getDockMargin()))"+
                    "}"
                ]
            },
            setDockMargin:{
                $desc:"设置停靠的外补丁, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : {left:Number,right:Number,top:Number,bottom:Number}.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui61'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                    "btn.setDockMargin({left:20,top:20,right:10,bottom:10});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}",
                    "var id='linb.temp.ui61-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10}));"+
                    "div1.setDockMargin({left:20,top:20,right:10,bottom:10}).setCustomStyle({KEY:'background:#00ff00'});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getDockOrder:{
                $desc:"获取停靠的优先顺序",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui70'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "alert(btn.getDockOrder())"+
                    "}"
                ]
            },
            setDockOrder:{
                $desc:"设置停靠的优先顺序, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui72'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10}));"+
                    "div1.setDockOrder(1).setDock('top').setCustomStyle({KEY:'background:#00ff00'});"+
                    "btn2.setDockOrder(2).setDock('top');"+
                    "_.asyRun(function(){div1.setDockOrder(3)},1000)"+
                    "}"
                ]
            },
            getDockIgnore:{
                $desc:"判断是否停靠忽略（在系统进行停靠计算时会忽略本控件）",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.ui75'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill'}));"+
                    "alert(btn.getDockIgnore())"+
                    "}"
                ]
            },
            setDockIgnore:{
                $desc:"设置是否停靠忽略, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui76'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill'}));"+
                    "_.asyRun(function(){linb(id).width(200);},1000);"+
                    "_.asyRun(function(){btn.setDockIgnore(true);linb(id).width(300);},2000);"+
                    "_.asyRun(function(){btn.setDockIgnore(false);linb(id).width(400);},3000);"+
                    "}"
                ]
            },
            getDockMinH:{
                $desc:"获取停靠的最小高度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui77'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill'}));"+
                    "alert(btn.getDockMinH())"+
                    "}"
                ]
            },
            getDockMinW:{
                $desc:"获取停靠的最小宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ui79'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill'}));"+
                    "alert(btn.getDockMinW())"+
                    "}"
                ]
            },
            setDockMinH:{
                $desc:"设置停靠的最小高度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui81'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"overflow:visible;border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'height'}));"+
                    "_.asyRun(function(){btn.setDockMinH(100);linb(id).height(80);},1000);"+
                    "_.asyRun(function(){btn.setDockMinH(50);linb(id).height(50);},2000);"+
                    "}"
                ]
            },
            setDockMinW:{
                $desc:"设置停靠的最小宽度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ui82'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'width'}));"+
                    "_.asyRun(function(){btn.setDockMinW(300);linb(id).width(200);},1000);"+
                    "_.asyRun(function(){btn.setDockMinW(50);linb(id).width(100);},2000);"+
                    "}"
                ]
            },
            getDomId:{
                $desc:"获取dom元素的id.",
                $rtn:"String",
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').boxing().getDomId())"
                ]
            },
            getSubNode:{
                $desc:"获取带有指定[key]和[subId]的dom元素内部的子节点.",
                $rtn:"linb.dom",
                $paras:[
                    "key [必需参数] : String, key string.",
                    "subId [可选参数] : String or [true]. [true] for getting all the sub nodes with the specified [key]."
                ],
                $snippet:[
                    "alert(linb.UIProfile.getFromDom('btnLang').boxing().getSubNode('KEY').id());"+
                    "alert(linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').boxing().getSubNode('ITEM','a').id());"+
                    "alert(linb.UIProfile.getFromDom('linb.UI.TreeBar:a:').boxing().getSubNode('ITEM',true).get().length);"
                ],
                $memo:"The [subId] parameter is for those [linb.absList] profiles only."
            },
            setDomId:{
                $desc:"设置DOM元素id.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, id 字符串"
                ],
                $snippet:[
                    "var logo=linb.UIProfile.getFromDom('btnLang').boxing(); alert(logo.getDomId()); logo.setDomId('logo1'); alert(logo.getDomId());logo.setDomId('btnLang'); alert(logo.getDomId());"
                ]
            },
            hide:{
                $desc:"隐藏该控件对象.",
                $rtn:"[self]",
                $snippet:[
                    "var logo=linb.UIProfile.getFromDom('btnLang').boxing(); logo.hide(); _.asyRun(function(){logo.show()},1000);"
                ]
            },
            show:{
                $desc:"显示该控件对象.",
                $rtn:"[self]",
                $paras:[
                    "parent [必需参数] : linb.UIProfile/linb.UI/Element/linb.Dom.",
                    "subId [可选参数] : String, the sub id that Determines the set of UIProfiles will be added to.",
                    "left [可选参数] : Number, 显示的左边坐标.",
                    "top [可选参数] : Number, 显示的上边坐标."
                ],
                $snippet:[
                    "var logo=linb.UIProfile.getFromDom('btnLang').boxing(); logo.hide(); _.asyRun(function(){logo.show()},1000);"
                ]
            },
            refresh:{
                $desc:"刷新组件.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.ui91'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'width'}));"+
                    "btn.get(0).properties.caption='new caption';"+
                    "_.asyRun(function(){btn.refresh()},1000);"+
                    "}"
                ]
            },
            render:{
                $desc:"将控件渲染成DOM.",
                $rtn:"[self]",
                $paras:[
                    "triggerLayOut [可选参数] : Boolean, 指示是否触发布局. 默认为 [false]."
                ],
                $snippet:[
                    "var btn=new linb.UI.Button; alert(btn.get(0).renderId); btn.render(); alert(btn.get(0).renderId); btn.destroy()"
                ]
            },
            renderOnto:{
                $desc:"将控件渲染, 并替换已经存在的一个DOM元素.",
                $rtn:"[self]",
                $paras:[
                    "domId [必需参数] : String, DOM元素id.",
                    "host [可选参数] : Object, 宿主对象. 默认为 [window]."
                ],
                $snippet:[
                    "var id='linb.temp.a1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).append(linb.create('<button id=\"id_abc\">a b c d e f t</button>'));"+
                    "(new linb.UI.Button()).renderOnto('id_abc');"+
                    "alert(id_abc);"+
                    "}"
                ]
            },
            setCustomStyle:{
                $desc:"设置自定义的CSS对象.",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对.",
                    "value [可选参数] : String, CSS字符串."
                ],
                $snippet:[
                    "var id='linb.temp.a2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setCustomStyle('BORDER','background:#666')},1000);"+
                    "_.asyRun(function(){btn.setCustomStyle({BORDER:null,KEY:'border:solid 2px',CAPTION:'font-size:14px'})},2000);"+
                    "_.asyRun(function(){btn.setCustomStyle('KEY',null)},3000);"+
                    "_.asyRun(function(){btn.setCustomStyle(null)},4000);"+
                    "}"
                ]
            },
            setCustomClass:{
                $desc:"设置自定义的CSS class.",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对.",
                    "value [可选参数] : String, CSS class 字符串."
                ],
                $snippet:[
                    "var id='linb.temp.a4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb.CSS.setStyleRules('.a-1',{background:'#666'}).setStyleRules('.a-2',{border:'solid 2px'}).setStyleRules('.a-3',{'font-size':'14px'});"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setCustomClass('BORDER','a-1')},1000);"+
                    "_.asyRun(function(){btn.setCustomClass({BORDER:null,KEY:'a-2',CAPTION:'a-3'})},2000);"+
                    "_.asyRun(function(){btn.setCustomClass('KEY',null)},3000);"+
                    "_.asyRun(function(){btn.setCustomClass(null);},4000);"+
                    "_.asyRun(function(){linb.CSS.setStyleRules('.a-1').setStyleRules('.a-2').setStyleRules('.a-3');},5000);"+
                    "}"
                ]
            },
            adjustDock:{
                $desc:"调整停靠.",
                $rtn:"[self]"
            },
            setCustomBehavior:{
                $desc:"设置自定义行为函数.",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对.",
                    "value [可选参数] : Object, 键值对."
                ],
                $snippet:[
                    "var id='linb.temp.a3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "btn.onClick(function(){alert(1); btn.setCustomBehavior('KEY',{onClick:function(){alert(2); btn.setCustomBehavior({KEY:{onClick:function(){alert(3); btn.setCustomBehavior(null)}}})}})});"+
                    "}"
                ]
            },
            setCustomFunction:{
                $desc:"设置自定义函数. 这些函数可以被序列化.",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对.",
                    "value [可选参数] : Function, 自定义函数."
                ],
                $snippet:[
                    "var id='linb.temp.a5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "btn.setCustomFunction('showTips', function(profile, node, pos){linb.Tips.show(pos, 'hi tips');return true;});"+
                    "btn.setCustomFunction('a', function(){var a;});"+
                    "alert(btn.serialize(btn))"+
                    "}"
                ]
            },
            beforeDestroy:{
                $desc:"在控件被销毁前触发,如果返回false,控件销毁的动作将被取消.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.b1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "btn.beforeDestroy(function(profile){alert('cancelled');return false});"+
                    "_.asyRun(function(){btn.destroy()},1000)"+
                    "}"
                ]
            },
            afterDestroy:{
                $desc:"在控件被销毁后触发.",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            },
            onDestroy:{
                $desc:"当控件被销毁时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.b1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "btn.onDestroy(function(profile){alert('onDestroy');});"+
                    "_.asyRun(function(){btn.destroy()},1000)"+
                    "}"
                ]
            },
            onContextmenu:{
                $desc:"当根dom元素的 contextmenu 激活时会激活本事件. 如果返回 false, 系统默认的 contextmenu 会被屏蔽(opera下无效).",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "item: Object, 鼠标点击节点所对应的item对象."
                ],
                $snippet:[
                    "var id='linb.temp.b2-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Input;linb(id).prepend(btn);"+
                    "btn.onContextmenu(function(profile){return false});" +
                    "}"
                ]
            },
            onRender:{
                $desc:"当控件被渲染时(生成DOM节点)调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.b2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button;"+
                    "btn.onRender(function(profile){alert('onRender')});"+
                    "_.asyRun(function(){linb(id).prepend(btn)},1000)"+
                    "}"
                ]
            },
            onLayout:{
                $desc:"当控件被重新布局的时候调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.b3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div id='+id+'1 style=\"height:20px;border:solid 1px;\"></div><div id='+id+'2 style=\"height:20px;border:solid 1px;\"></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button;"+
                    "btn.onLayout(function(profile){alert('onLayout')});"+
                    "linb(id).prepend(btn);"+
                    "_.asyRun(function(){linb(id+'1').prepend(btn)},1000);"+
                    "_.asyRun(function(){linb(id+'2').prepend(btn)},2000);"+
                    "}"
                ]
            },
            onResize:{
                $desc:"控件被改变大小的时候调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "width : Number, 目标宽",
                    "height : Number, 目标高"
                ],
                $snippet:[
                    "var id='linb.temp.b3-a'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button;"+
                    "btn.onResize(function(profile,width,height){linb.message('onResize:'+width+':'+height)});"+
                    "linb(id).prepend(btn);"+
                    "_.asyRun(function(){btn.setWidth(50).setHeight(50)},1000);"+
                    "}"
                ]
            },
            onMove:{
                $desc:"控件被改变位置的时候调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "left : Number, 目标左边值",
                    "top : Number, 目标上边值",
                    "right : Number, 目标右边值",
                    "bottom : Number, 目标下边值"
                ],
                $snippet:[
                    "var id='linb.temp.b3-b'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button;"+
                    "btn.onMove(function(profile,left,top){linb.message('onMove:'+left+':'+top)});"+
                    "linb(id).prepend(btn);"+
                    "_.asyRun(function(){btn.setLeft(50).setTop(50)},1000);"+
                    "}"
                ]
            },
            onDock:{
                $desc:"控件被dock机制改变大小或位置的时候调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "region : Object"
                ],
                $snippet:[
                    "var id='linb.temp.b3-c'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button({dock:'fill'}); var pane= new linb.UI.Pane({position:'relative'});"+
                    "btn.onDock(function(profile,region){linb.message('onDock:'+_.serialize(region))});"+
                    "linb(id).prepend(pane.append(btn));"+
                    "_.asyRun(function(){pane.setWidth(50).setHeight(50)},1000);"+
                    "}"
                ]
            },
            beforePropertyChanged:{
                $desc:"当控件的某个属性被改变前出发,返回false可以阻止这个属性被改变.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "name : String, 属性名",
                    "value : Object, 新属性值",
                    "ovalue : Objecgt, 原来的属性值"
                ],
                $snippet:[
                    "var id='linb.temp.b3-d'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button;"+
                    "btn.beforePropertyChanged(function(profile,name,value){if(profile.renderId)return false;});"+
                    "linb(id).prepend(btn);"+
                    "_.asyRun(function(){btn.setCaption('updated')},1000);"+
                    "}"
                ]
            },
            afterPropertyChanged:{
                $desc:"当控件的某个属性被改变前出发,返回false可以阻止这个属性被改变.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "name : String, 属性名",
                    "value : Object, 新属性值",
                    "ovalue : Objecgt, 原来的属性值"
                ],
                $snippet:[
                    "var id='linb.temp.b3-e'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button;"+
                    "btn.afterPropertyChanged(function(profile,name,v,ov){linb.message(name+':'+ov+'->'+v)});"+
                    "linb(id).prepend(btn);"+
                    "_.asyRun(function(){btn.setCaption('updated')},1000);"+
                    "}"
                ]
            },
            beforeAppend:{
                $desc:"当向控件添加子控件前触发,返回false可以阻止该动作.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "child : linb.UI, 添加的子控件."
                ],
                $snippet:[
                    "var id='linb.temp.b3-f'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button(); var pane= new linb.UI.Pane({position:'relative'});"+
                    "pane.beforeAppend(function(){return false;});"+
                    "linb(id).prepend(pane);"+
                    "_.asyRun(function(){pane.append(btn)},1000);"+
                    "}"
                ]
            },
            afterAppend:{
                $desc:"当向控件添加子控件后触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "child : linb.UI, 添加的子控件."
                ],
                $snippet:[
                    "var id='linb.temp.b3-g'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button(); var pane=new linb.UI.Pane({position:'relative'});"+
                    "pane.afterAppend(function(p,c){linb.message(c.getAlias() + ' was added')});"+
                    "linb(id).prepend(pane);"+
                    "_.asyRun(function(){pane.append(btn)},1000);"+
                    "}"
                ]
            },
            beforeRemove:{
                $desc:"当从控件中移除子控件前触发,返回false可以阻止该动作.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "child : linb.UIProfile, 移除的子控件.",
                    "subId : String, 子控件在父控件的容器标识",
                    "bdestroy : Boolean, 是否在移除后被销毁"
                ],
                $snippet:[
                    "var id='linb.temp.b3-h'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button(); var pane=new linb.UI.Pane({position:'relative'});"+
                    "pane.beforeRemove(function(){return false;});"+
                    "linb(id).prepend(pane.append(btn));"+
                    "_.asyRun(function(){pane.removeChildren(btn,true)},1000);"+
                    "}"
                ]
            },
            afterRemove:{
                $desc:"当从控件中移除子控件后触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "child : linb.UIProfile, 移除的子控件.",
                    "subId : String, 子控件在父控件的容器标识",
                    "bdestroy : Boolean, 是否在移除后被销毁"
                ],
                $snippet:[
                    "var id='linb.temp.b3-j'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new linb.UI.Button(); var pane=new linb.UI.Pane({position:'relative'});"+
                    "pane.afterRemove(function(p,c){linb.message(c.alias+' was removed!');});"+
                    "linb(id).prepend(pane.append(btn));"+
                    "_.asyRun(function(){pane.removeChildren(btn,true)},1000);"+
                    "}"
                ]
            },
            onShowTips:{
                $desc:"当控件显示tips时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "pos : Object, {left:Number, top:Number}"
                ],
                $snippet:[
                    "var id='linb.temp.b5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "btn.onShowTips(function(profile, node, pos){linb.Tips.show(pos, 'hi tips');return true;});"+
                    "}"
                ]
            }
        }
    });
    _.set(linb.Locale,["cn","doc","linb","UI","Widget"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Widget 类",
        constructor:{
            $desc:"生成一个linb.UI.Widget对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getBorder:{
                $desc:"判断控件是否显示边缘线.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.w1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Widget()).setBorder(true));"+
                    "_.asyRun(function(){alert(o.getBorder())});"+
                    "}"
                ]
            },
            setBorder:{
                $desc:"设置控件是否显示边缘线, 并刷新界面",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.w2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Widget()).setBorder(true));"+
                    "_.asyRun(function(){alert(o.getBorder())});"+
                    "}"
                ]
            },
            getShadow:{
                $desc:"判断控件是否显示阴影.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.w3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Widget()).setShadow(true));"+
                    "_.asyRun(function(){alert(o.getShadow())});"+
                    "}"
                ]
            },
            setShadow:{
                $desc:"设置控件是否显示阴影, 并刷新界面",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.w4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Widget()).setShadow(true));"+
                    "_.asyRun(function(){alert(o.getShadow())});"+
                    "}"
                ]
            },
            getResizer:{
                $desc:"判断控件终端用户是否可以调整大小.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.w5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Widget()).setCustomStyle('KEY','background:#ccc').setResizer(true));"+
                    "_.asyRun(function(){alert(o.getResizer())});"+
                    "}"
                ]
            },
            setResizer:{
                $desc:"设置控件终端用户是否可以调整大小, 并刷新界面",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.w6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Widget()).setCustomStyle('KEY','background:#ccc').setResizer(true));"+
                    "_.asyRun(function(){alert(o.getResizer())});"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Div"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Div 类",
        constructor:{
            $desc:"生成一个linb.UI.Div对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getIframeAutoLoad:{
                $desc:"获取用iframe自动加载html（可以是异域）的地址属性",
                $rtn:"String"
            },
            setIframeAutoLoad:{
                $desc:"设置用iframe自动加载html（可以是异域）的地址.需要提前设置.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getAjaxAutoLoad:{
                $desc:"获取用Ajax自动加载html文件（同域下）的路径属性",
                $rtn:"String"
            },
            setAjaxAutoLoad:{
                $desc:"设置用Ajax自动加载html文件（同域下）的路径属性.需要提前设置.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 也可以是一个object,object的内容对应linb.Ajax.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getHtml:{
                $desc:"获取当前层对象(linb.UI.Div)的内部html代码.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.div1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Div({height:'auto',html:'<span>a</span>'}));"+
                    "_.asyRun(function(){alert(o.getHtml())});"+
                    "}"
                ]
            },
            setHtml:{
                $desc:"设置当前层对象(linb.UI.Div)的内部html代码.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, Html代码",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.div2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Div).setHeight('auto').setHtml('<span>a</span>'));"+
                    "_.asyRun(function(){o.setHtml('<span>b</span>')},1000);"+
                    "}"
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性.",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Pane"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Pane 类",
        constructor:{
            $desc:"生成一个linb.UI.Pane对象."
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Tag"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Tag 类",
        constructor:{
            $desc:"生成一个linb.UI.Tag对象. linb.UI.Tag is a proxy UI class for 'Inversion of Control' in jsLinb.",
            $memo:"linb.UI.Tag is for embedding a target UI Object(from linb.Com Object) into an existing UI dynamically.",
            $links:[
                ["linb.ComFactory.getCom","#linb.ComFactory"]
            ]
        },
        replace:{
            $desc:"To replace the tagProfile with the profile.",
            $paras:[
                "tagProfile [必需参数] : the profile of linb.UI.Tag Object.",
                "profile [必需参数] : the profile of the target UI Object",
                "com [可选参数] : linb.Com Object, if the tagProfile is in a com objcet directly(no parent UIProfile), you have to specify this."
            ],
            $demo:"Generally, you don't need to use this function manually."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getTagKey:{
                $desc:"得到 tagKey 字符串.",
                $rtn:"String",
                $memo:"linb.ComFactory 会按照这个tabKey查找对应的 linb.Com."
            },
            setTagKey:{
                $desc:"设置 tagKey 字符串.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, the tag key.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $memo:"linb.ComFactory 会按照这个tabKey查找对应的 linb.Com."
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Link"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Link 类",
        constructor:{
            $desc:"生成一个linb.UI.Link对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaption:{
                $desc:"获取超链接的文本内容.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.link1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Link()).setCaption('cap'));"+
                    "_.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            setCaption:{
                $desc:"设置超链接的文本内容.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 文本内容.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.link2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Link()).setCaption('cap'));"+
                    "_.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            getTarget:{
                $desc:"获取超链接打开的目标窗口.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.link3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Link()).setTarget('_top'));"+
                    "_.asyRun(function(){alert(o.getTarget())});"+
                    "}"
                ]
            },
            setTarget:{
                $desc:"设置超链接打开的目标窗口.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 值.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.link4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Link()).setTarget('_top'));"+
                    "_.asyRun(function(){alert(o.getTarget())});"+
                    "}"
                ]
            },
            getHref:{
                $desc:"获取超链接的href属性.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.link5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Link()).setHref('#'));"+
                    "_.asyRun(function(){alert(o.getHref())});"+
                    "}"
                ]
            },
            setHref :{
                $desc:"设置超链接的href属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, the href.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.link6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Link()).setHref('#'));"+
                    "_.asyRun(function(){alert(o.getHref())});"+
                    "}"
                ]
            },


            onClick:{
                $desc:"当用户单击超链接时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素."            ],
                $snippet:[
                    "var id='linb.temp.link7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.Link()).setCaption('cap').onClick(function(profile){alert(profile.properties.caption)}));"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Border"], {$desc:"linb.UI.Border 类",KEY:{$desc:"类关键字"}});

    _.set(linb.Locale,["cn","doc","linb","UI","Shadow"], {$desc:"linb.UI.Shadow 类",KEY:{$desc:"类关键字"}});

    _.set(linb.Locale,["cn","doc","linb","UI","Resizer"], {$desc:"linb.UI.Resizer 类",KEY:{$desc:"类关键字"}});

    _.set(linb.Locale,["cn","doc","linb","UI","Block"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Block 类",
        constructor:{
            $desc:"生成一个linb.UI.Block 对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getIframeAutoLoad:{
                $desc:"获取用iframe自动加载html（可以是异域）的地址属性",
                $rtn:"String"
            },
            setIframeAutoLoad:{
                $desc:"设置用iframe自动加载html（可以是异域）的地址.需要提前设置.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getAjaxAutoLoad:{
                $desc:"获取用Ajax自动加载html文件（同域下）的路径属性",
                $rtn:"String"
            },
            setAjaxAutoLoad:{
                $desc:"设置用Ajax自动加载html文件（同域下）的路径属性.需要提前设置.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 也可以是一个object,object的内容对应linb.Ajax.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getHtml:{
                $desc:"获取块控件的内部html.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.blk1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Block({border:true,html:'<span>a</span>'}));"+
                    "_.asyRun(function(){alert(o.getHtml())});"+
                    "}"
                ]
            },
            setHtml:{
                $desc:"设置块控件的内部html.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, the html string.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.blk2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Block).setBorder(true).setHtml('<span>a</span>'));"+
                    "_.asyRun(function(){o.setHtml('<span>b</span>')},1000);"+
                    "}"
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性.",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getBackground:{
                $desc:"获取块控件的背景.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.blk3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Block).setBackground('red'));"+
                    "_.asyRun(function(){alert(o.getBackground())},1000);"+
                    "}"
                ]
            },
            setBackground:{
                $desc:"设置获取块控件的背景.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景的CSS字符串.",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.blk4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Block).setBackground('red'));"+
                    "_.asyRun(function(){alert(o.getBackground())},1000);"+
                    "}"
                ]
            },
            getBorderType:{
                $desc:"获取块控件的边框种类.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.blk5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Block).setBorderType('inset'));"+
                    "_.asyRun(function(){alert(o.getBorderType())},1000);"+
                    "}"
                ]
            },
            setBorderType:{
                $desc:"设置块控件的边框种类.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset','groove' 或 'ridge'.",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.blk6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Block).setBorderType('groove'));"+
                    "_.asyRun(function(){alert(o.getBorderType())},1000);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Label"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Label 类",
        constructor:{
            $desc:"生成一个linb.UI.Label对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaption :{
                $desc:"获取标签的标题文字",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置标签的标题文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getFontSize :{
                $desc:"获取标签字体大小",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                    "_.asyRun(function(){btn.setFontSize ('14px'); alert(btn.getFontSize ())},1000)"+
                    "}"
                ]
            },
            setFontSize :{
                $desc:"设置标签字体大小, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 字体大小.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                    "_.asyRun(function(){btn.setFontSize ('14px'); alert(btn.getFontSize ())},1000)"+
                    "}"
                ]
            },
            getFontWeight :{
                $desc:"获取标签字体粗细",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                    "_.asyRun(function(){btn.setFontWeight('bold'); alert(btn.getFontWeight())},1000)"+
                    "}"
                ]
            },
            setFontWeight :{
                $desc:"设置标签字体粗细, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : corresponding CSS value.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                    "_.asyRun(function(){btn.setFontWeight('bold'); alert(btn.getFontWeight())},1000)"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取标签水平对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置标签水平对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            getVAlign :{
                $desc:"获取标签水平垂直方式",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                    "}"
                ]
            },
            setVAlign :{
                $desc:"设置标签水平垂直方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'top', 'middle' or 'bottom'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                    "}"
                ]
            },
            getShadowText :{
                $desc:"获取阴影文字",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setShadowText(true); alert(btn.getShadowText())},1000)"+
                    "}"
                ]
            },
            setShadowText :{
                $desc:"设置阴影文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setShadowText(true); alert(btn.getShadowText())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取图标url路径",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置图标url路径, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String, 图标url路径.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取图标的css position属性",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lbl15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置图标的css position属性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 图标的显示位置.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lbl16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            }
        }
    });
    _.set(linb.Locale,["cn","doc","linb","UI","ProgressBar"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.ProgressBar 类",
        constructor:{
            $desc:"Creates a linb.UI.ProgressBar Object."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaptionTpl :{
                $desc:"得到标题模板字符串.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pb1-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                    "_.asyRun(function(){o.setCaptionTpl('ongoing {value}%')},1000);"+
                    "_.asyRun(function(){alert(o.getCaptionTpl())},2000);"+
                    "}"
                ]
            },
            setCaptionTpl :{
                $desc:"设置标题模板字符串.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.pb1-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                    "_.asyRun(function(){o.setCaptionTpl('ongoing {value}%')},1000);"+
                    "_.asyRun(function(){alert(o.getCaptionTpl())},2000);"+
                    "}"
                ]
            },
            getFillBG:{
                $desc:"获取进度条背景填充颜色",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pb2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                    "_.asyRun(function(){o.setFillBG('#00ff00')},1000);"+
                    "_.asyRun(function(){alert(o.getFillBG())},1000);"+
                    "}"
                ]
            },
            setFillBG:{
                $desc:"设置进度条背景填充颜色, 并刷新界面.",
                $rtn:"[self]",
                 $paras:[
                    "value [必需参数] : nonnegative Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
               $snippet:[
                    "var id='linb.temp.pb3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                    "_.asyRun(function(){o.setFillBG('#00ff00')},1000);"+
                    "_.asyRun(function(){alert(o.getFillBG())},1000);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","SLabel"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.SLabel 类",
        constructor:{
            $desc:"生成一个linb.UI.SLabel."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaption :{
                $desc:"获取文字.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.SLabel1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SLabel);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.SLabel2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SLabel);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取水平对齐方式.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.SLabel7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SLabel({border:true,width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.SLabel8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SLabel({border:true,width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","SButton"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.SButton 类",
        constructor:{
            $desc:"生成一个linb.UI.SButton对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活按钮(获取焦点状态).",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.sbtn0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SButton);"+
                    "_.asyRun(function(){btn.activate()},1000);"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取按钮标题文字.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.sbtn1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SButton);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置按钮标题文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.sbtn2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SButton);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取水平对齐方式.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.sbtn7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SButton({border:true,width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.sbtn8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SButton({border:true,width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            onClick:{
                $desc:"当终端用户单击按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.sbtn17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.SButton()).onClick(function(profile){alert(profile.properties.caption)}));"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","RichEditor"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.RichEditor 类",
        constructor:{
            $desc:"生成一个 linb.UI.RichEditor 对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCmdList :{
                $desc:"得到控件中命令按钮的出现和排列方式.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.rich'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:300px;width:400px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var rich;linb(id).prepend(rich=new linb.UI.RichEditor);"+
                    "_.asyRun(function(){rich.setCmdList('font1;font2;font3;font4'); alert(rich.getCmdList ())},1000)"+
                    "}"
                ]
            },
            setCmdList :{
                $desc:"设置控件中命令按钮的出现和排列方式.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.rich'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:300px;width:400px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var rich;linb(id).prepend(rich=new linb.UI.RichEditor);"+
                    "_.asyRun(function(){rich.setCmdList('font1;font2;font3;font4'); alert(rich.getCmdList ())},1000)"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","SCheckBox"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.SCheckBox 类",
        constructor:{
            $desc:"生成一个linb.UI.Button对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活(获取焦点状态).",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.SCbtn0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SCheckBox);"+
                    "_.asyRun(function(){btn.activate()},1000);"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取按题文字.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.scbtn1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SCheckBox);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置按题文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.scbtn2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.SCheckBox);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },

            onChecked:{
                $desc:"Fired when SCheckBox is checked.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "value : String, 按下或弹起."
                ],
                $snippet:[
                    "var id='linb.temp.Scbtn18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.SCheckBox()).onChecked(function(profile,e,value){alert(value)}));"+
                    "}"
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","Button"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Button 类",
        constructor:{
            $desc:"生成一个linb.UI.Button对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            resetValue:{
                $desc:"重新内部值, 显示值和控件值. 该函数不激活任何事件",
                $rtn:'[self]',
                $paras:[
                    "value [可选参数] : Boolean, 重新设置的新值,默认为 false."
                ]
            },
            setUIValue:{
                $desc:"设置用户界面值和控件值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强行赋值,即使赋值和现有值已经相同. 默认为 [false]."
                ],
                $memo:"调用该函数时,以下两个事件将被触发beforeUIValueSet and afterUIValueSet."
            },
            activate:{
                $desc:"激活按钮(获取焦点状态).",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.btn0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.activate()},1000);"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取按钮标题文字.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.btn1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置按钮标题文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.btn2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getType:{
                $desc:"得到按钮的类型.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.btn5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setType('drop'); alert(btn.getType ())},1000)"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置按钮的类型.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'normal', 'drop' 或 'status'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.btn6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                    "_.asyRun(function(){btn.setType('drop'); alert(btn.getType ())},1000)"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取水平对齐方式.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.btn7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.btn8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            getVAlign :{
                $desc:"获取垂直对齐方式.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.btn9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                    "}"
                ]
            },
            setVAlign :{
                $desc:"设置垂直对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'top', 'middle' or 'bottom'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.btn20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                    "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取图标的url.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.btn13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置图标的url, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String,  image path.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.btn14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取图标的css position属性.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.btn15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置图标的css position属性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, corresponding CSS value.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.btn16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },

            onClick:{
                $desc:"当终端用户单击按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "value : Boolean, 值."
                ],
                $snippet:[
                    "var id='linb.temp.btn17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.Button()).onClick(function(profile){alert(profile.properties.caption)}));"+
                    "}"
                ]
            },
            onClickDrop:{
                $desc:"当终端用户单击按钮时调用（当按钮的 type 为'drop'时才有效）.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.btn17-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.Button({type:'drop'})).onClick(function(profile){alert('clicked button')}).onClickDrop(function(profile){alert('clicked drop button')}));"+
                    "}"
                ]
            },
            onChecked:{
                $desc:"在按钮按下时触发（当按钮的 type 为'status'时才有效）.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "value : Boolean, 按下或弹起."
                ],
                $snippet:[
                    "var id='linb.temp.btn18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.Button({type:'status'})).onChecked(function(profile,e,value){alert(value)}));"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","CheckBox"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.CheckBox 类",
        constructor:{
            $desc:"生成一个linb.UI.CheckBox对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            onChecked:{
                $desc:"Fired when CheckBox is checked.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "value : Boolean, 按下或弹起."
                ],
                $snippet:[
                    "var id='linb.temp.cbtn18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.CheckBox().onChecked(function(profile,e,value){alert(value)}));"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Input"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Input 类",
        constructor:{
            $desc:"生成一个linb.UI.Input对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活编辑框(获取焦点状态).",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.input0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input);"+
                    "_.asyRun(function(){o.activate()},1000)"+
                    "}"
                ]
            },
            getDynCheck:{
                $desc:"判断当用户输入时,编辑框是否实时校验输入的有效性. 设置为false时,编辑框只在用户离开编辑框时检查有效性",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.input3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'})).prepend(o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'}));"+
                    "o.setDynCheck(true);alert(o.getDynCheck());"+
                    "}"
                ]
            },
            setDynCheck:{
                $desc:"设置当用户输入时,编辑框是否实时校验输入的有效性, 并刷新界面. 设置为false时,编辑框只在用户离开编辑框时检查有效性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'})).prepend(o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'}));"+
                    "o.setDynCheck(true);alert(o.getDynCheck());"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取标签水平对齐方式",
                $rtn:"String"
            },
            setHAlign :{
                $desc:"设置标签水平对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getMultiLines:{
                $desc:"判断是否允许输入多行文本",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.input5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                    "o.setMultiLines(true).setHeight(50);alert(o.getMultiLines());"+
                    "}"
                ]
            },
            setMultiLines:{
                $desc:"设置是否允许输入多行文本, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                    "o.setMultiLines(true).setHeight(50);alert(o.getMultiLines());"+
                    "}"
                ]
            },
            getMask:{
                $desc:"获取有效的格式模式,用来避免错误的输入.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.input7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input());"+
                    "alert(o.setMask('(1111)11111111-111').getMask());"+
                    "}"
                ]
            },
            setMask:{
                $desc:"设置有效的格式模式,用来避免错误的输入, 并刷新界面. <ul>下面的字符可以用于格式模式:"+
                    "<li>'~' : [+-]</li>"+
            		"<li>'1' : [0-9]</li>"+
            		"<li>'a' : [A-Za-z]</li>"+
            		"<li>'u' : [A-Z]</li>"+
            		"<li>'l' : [a-z]</li>"+
            		"<li>'*' : [A-Za-z0-9]</li>"+
            		"<li>other : itself </li>"+
            		"</ul>",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 格式模式",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input());"+
                    "alert(o.setMask('(1111)11111111-111').getMask());"+
                    "}"
                ]
            },
            getReadonly:{
                $desc:"判断编辑框是否为只读",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.input9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "alert(o.setReadonly(true).getReadonly())"+
                    "}"
                ]
            },
            setReadonly:{
                $desc:"设置编辑框是否为只读, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                    "alert(o.setReadonly(true).getReadonly())"+
                    "}"
                ]
            },
            getTipsBinder:{
                $desc:"获取有效性提示的绑定器(提示的文本出现在什么控件上)",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.input11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            setTipsBinder:{
                $desc:"设置有效性提示的绑定器. (提示的文本出现在什么控件上)",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            getTipsErr:{
                $desc:"获取输入无效时的提示文本",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.input13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            setTipsErr:{
                $desc:"设置输入无效时的提示文本.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            getTipsOK:{
                $desc:"获取输入有效是的提示文本",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.input15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            setTipsOK:{
                $desc:"设置输入有效是的提示文本.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            getValueFormat:{
                $desc:"获取有效输入的模式（正则表达式）.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.input17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o; linb(id).prepend((o=new linb.UI.Input({position:'relative',dynCheck:true})));"+
                    "alert(o.setValueFormat('^\\\\d*$').getValueFormat());"+
                    "}"
                ]
            },
            setValueFormat:{
                $desc:"设置有效输入的模式（正则表达式）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o; linb(id).prepend((o=new linb.UI.Input({position:'relative',dynCheck:true})));"+
                    "alert(o.setValueFormat('^\\\\d*$').getValueFormat());"+
                    "}"
                ]
            },
            getType:{
                $desc:"获取输入框的类型. 可以是'input'(普通输入框)或 'password'(密码输入框). 默认为 'input'.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.input19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                    "o.setType('password');alert(o.getType());"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置输入框的类型, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'input' or 'password'. 默认为 'input'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.input20-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                    "o.setType('password');alert(o.getType());"+
                    "}"
                ]
            },
            getMaxlength:{
                $desc:"获取输入框的工最大长度. 只有multiline为false的时候有效(for html input type='text' or type='password').",
                $rtn:"Number"
            },
            setMaxlength:{
                $desc:"设置输入框的工最大长度. 只有multiline为false的时候有效(for html input type='text' or type='password').",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 最大长度.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getLabelSize:{
                $desc:"获取标签的大小",
                $rtn:"Number"
            },
            setLabelSize:{
                $desc:"设置标签的大小, 并刷新界面.当标签的大小为0时,不显示标签.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getLabelPos:{
                $desc:"获取标签的位置",
                $rtn:"String"
            },
            setLabelPos:{
                $desc:"设置标签的位置, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : left, right, top, bottom 之一.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getLabelGap:{
                $desc:"获取标签与输入框的距离",
                $rtn:"Number"
            },
            setLabelGap:{
                $desc:"设置标签的大小, 并刷新界面.当标签的大小为0时,不显示标签.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getLabelCaption:{
                $desc:"获取标签的文字",
                $rtn:"String"
            },
            setLabelCaption:{
                $desc:"设置标签的文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getLabelHAlign:{
                $desc:"获取标签的水平对齐方式.",
                $rtn:"String"
            },
            setLabelHAlign:{
                $desc:"设置按标签的水平对齐方式 , 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            onLabelClick:{
                $desc:"在单击标签的时候触发该事件.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onLabelDblClick:{
                $desc:"在双击标签的时候触发该事件.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onLabelActive:{
                $desc:"当鼠标在标签上按下时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onBlur:{
                $desc:"当输入框失去焦点时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.input20-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({position:'relative'}));"+
                    "o.onBlur(function(){alert('onBlur')});"+
                    "}"
                ]
            },
            onFocus:{
                $desc:"当输入框得到焦点时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.input20-3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({position:'relative'}));"+
                    "o.onFocus(function(){alert('onFocus')});"+
                    "}"
                ]
            },
            onCancel:{
                $desc:"按ESC键触发本事件,表示本次编辑无效.",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            },
            beforeFormatCheck:{
                $desc:"在输入框做有效性检查时调用. 返回false可以阻止有效性的检查.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "value: String, 需要做有效性检查的值."
                ],
                $snippet:[
                    "var id='linb.temp.input21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Input({position:'relative',dynCheck:true}));"+
                    "o.beforeFormatCheck(function(p,v){if(v!=='a')return false;});"+
                    "}"
                ]
            },
            beforeFormatMark:{
                $desc:"在设置有效的格式模式前调用. 如果返回false, 将阻止格式模式设置.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "formatErr: Boolean, 是否格式有错误."
                ],
                $snippet:[
                    "var id='linb.temp.input21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$', dynCheck:true})).prepend(o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$', dynCheck:true}));"+
                    "o.beforeFormatMark(function(p,v){p.getSubNode('INPUT').css('background',v?'#00ff00':''); return false;});"+
                    "}"
                ]
            }
        }
    });
    _.set(linb.Locale,["cn","doc","linb","UI","TextEditor"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.TextEditor 类",
        constructor:{
            $desc:"生成一个linb.UI.TextEditor对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活文本编辑器.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.TextEditor0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                    "_.asyRun(function(){o.activate()},1000)"+
                    "}"
                ]
            },
            getReadonly:{
                $desc:"判断编辑器是只读还是可编辑的.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.TextEditor9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                    "alert(o.setReadonly(true).getReadonly())"+
                    "}"
                ]
            },
            setReadonly:{
                $desc:"设置编辑器是只读还是可编辑的, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.TextEditor10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                    "alert(o.setReadonly(true).getReadonly())"+
                    "}"
                ]
            },


            onChange:{
                $desc:"当终端用户改变文字时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "oV : String, 旧值.",
                    "nV : String, 新值."
                ],
                $snippet:[
                    "var id='linb.temp.input23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                    "o.onChange(function(p,o,n){linb.message(o.length+'=>'+n.length)});"+
                    "}"
                ]
            }
        }
    });
    _.set(linb.Locale,["cn","doc","linb","UI","Group"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Group 类",
        constructor:{
            $desc:"生成一个linb.UI.Group对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            resetPanelView:{
                $desc:"删除Group的所有子控件,然后折叠.",
                $rtn:"[self]",
                $paras:[
                    "destroyChildren [可选参数] : Boolean, 是否destroy子控件."
                ]
            },
            activate:{
                $desc:"激活编组框对象.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.grp0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                    "_.asyRun(function(){btn.activate()},1000)"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取编组框的标题文字",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.grp1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置编组框的标题文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grp2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取编组框图标的url",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.grp3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置编组框图标的url, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String, image url.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grp4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取编组框图标的css position属性",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.grp5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置编组框图标的css position属性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 图标的位置(CSS值).",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grp6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            getToggle:{
                $desc:"判断编组框是打开还是收缩的.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.fs3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                    "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            setToggle :{
                $desc:"设置编组框是打开还是收缩的, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.fs4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                    "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            getToggleBtn:{
                $desc:"判断编组框是否带有收缩/打开按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.fs3-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                    "_.asyRun(function(){btn.setToggleBtn(false); alert(btn.getToggleBtn())},1000)"+
                    "}"
                ]
            },
            setToggleBtn :{
                $desc:"设置编组框是否带有收缩/打开按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.fs4-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                    "_.asyRun(function(){btn.setToggleBtn(false); alert(btn.getToggleBtn())},1000)"+
                    "}"
                ]
            },


            beforeExpend:{
                $desc:"在编组框打开前调用.如返回 false, 编组框不会打开.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.fs5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Group;"+
                    "o.beforeExpend(function(){alert('beforeExpend')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            beforeFold:{
                $desc:"当编组框收缩前调用.如返回 false, 编组框不会收缩.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.fs6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Group;"+
                    "o.beforeExpend(function(){alert('beforeExpend')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            afterExpend:{
                $desc:"在编组框打开后调用."
            },
            afterFold:{
                $desc:"在编组框收缩后调用."
            },
            onIniPanelView:{
                $desc:"当Panel初始化时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.fs7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Group;"+
                    "o.beforeExpend(function(){alert('beforeExpend')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","ComboInput"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.ComboInput 类",
        constructor:{
            $desc:"生成一个linb.UI.ComboInput对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaption:{
                $desc:"获取显示的文本内容.",
                $rtn:"String"
            },
            setCaption:{
                $desc:"设置显示的文本内容.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 文本内容.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $memo:"在只读状态下,用作临时显示用"
            },
            getShowValue:{
                $desc:"获取控件的显示值.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ci001'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({type:'listbox',items:[{id:'id1',caption:'show1'},{id:'id2',caption:'show2'}]}));"+
                    "o.setValue('id2'); _.asyRun(function(){ alert(o.getValue() + '->' + o.getShowValue()) },1000)"+
                    "}"
                ]
            },
            resetValue:{
                $desc:"重新内部值, 显示值和控件值. 该函数不激活任何事件",
                $rtn:'[self]',
                $paras:[
                    "value [可选参数] : String, 重新设置的新值,默认为 ''."
                ],
                $snippet:[
                    "var id='linb.temp.ci1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({value:'ini'}));"+
                    "o.setUIValue('ini2');_.asyRun(function(){o.resetValue('ini2');},1000)"+
                    "}"
                ]
            },
            clearPopCache:{
                $desc:"清除弹出的下拉控件的缓存.",
                $rtn:"[self]"
            },
            expand:{
                $desc:"打开弹出窗口."
            },
            collapse:{
                $desc:"关闭弹出窗口."
            },
            getUploadObj:{
                $desc:"获取上传文件名,仅对上传框有效.",
                $rtn:"linb.Dom",
                $snippet:[
                    "var id='linb.temp.ci2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({type:'upload'}));"+
                    "o.afterUIValueSet(function(){alert(o.getUploadObj().value)});"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置下拉框类型, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'none'代表是普通的输入框,'combobox'代表下拉框,'listbox'代表列表框,'upload'代表上传框,'getter'代表获取框,'helpinput'代表帮助框,'cmdbox'代表命令框,'popbox'代表弹出框,'time'代表时间选择框,'date'代表日期选择框,'datetime'代表日期时间选择框,'color'代表颜色选择框,'currency'代表货币,'number'代表数字,'spin'代表是spin输入框. 默认为 'combobox'.",                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var label,o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative'})).prepend(label=new linb.UI.Label({position:'relative',width:100}));"+
                    "var arr=['none','combobox','listbox','upload','getter','helpinput','cmdbox','popbox','time','date','color'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();o.setType(type);label.setCaption(type)}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getItems:{
                $desc:"获取下拉框的所有项目.",
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.ci5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "_.asyRun(function(){alert(_.serialize(o.getItems()))});"+
                    "}"
                ]
            },
            setItems:{
                $desc:"设置下拉框的项目, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 项目数组.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "_.asyRun(function(){o.setItems([{id:'aaa',caption:'bbb'}])});"+
                    "}"
                ]
            },
            getDropListHeight:{
                $desc:"获取弹出窗口高（只对listbox,combobox,helpinput有效）.",
                $rtn:"Number"
            },
            setDropListHeight:{
                $desc:"设置弹出窗口高（只对listbox,combobox,helpinput有效）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number, 高",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getDropListWidth:{
                $desc:"获取默认的弹出窗口宽（只对listbox,combobox,helpinput有效）.",
                $rtn:"Number"
            },
            setDropListWidth:{
                $desc:"设置弹出窗口宽（只对listbox,combobox,helpinput有效）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number, 宽",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getListKey:{
                $desc:"获取列表键.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ci7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',listKey:'test'}));"+
                    "_.asyRun(function(){alert(o.getListKey())});"+
                    "}"
                ]
            },
            setListKey:{
                $desc:"设置列表键.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 列表键",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',listKey:'test'}));"+
                    "_.asyRun(function(){o.setListKey('test2')},1000);"+
                    "}"
                ]
            },
            getCachePopWnd:{
                $desc:"获取是否缓存弹出窗口的设置",
                $rtn:"Boolean"
            },
            setCachePopWnd:{
                $desc:"设置是否缓存弹出窗口",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getDateEditorTpl:{
                $desc:"得到 date/datetime 编辑模式下的模板.",
                $rtn:"String"
            },
            setDateEditorTpl:{
                $desc:"设置 date/datetime 编辑模式下的模板.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getPopCtrlProp:{
                $desc:"得到固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的属性.",
                $rtn:"Object"
            },
            setPopCtrlProp:{
                $desc:"设置固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $memo:"需要在控件产生前调用"
            },
            getPopWnd:{
                $desc:"得到弹出窗口.",
                $rtn:"[linb.UI]"
            },
            getPopCtrlEvents:{
                $desc:"得到固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的事件.",
                $rtn:"Object"
            },
            setPopCtrlEvents:{
                $desc:"设置固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的事件.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $memo:"需要在控件产生前调用"
            },
            getCurrencyTpl:{
                $desc:"得到货币的显示模板",
                $rtn:"String"
            },
            setCurrencyTpl:{
                $desc:"设置货币的显示模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getCommandBtn:{
                $desc:"得到命令按钮显示关键字.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ci8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative'})).prepend(o2=new linb.UI.ComboInput({position:'relative',type:'none'}));"+
                    "_.asyRun(function(){o1.setCommandBtn('save');o2.setCommandBtn('add'); alert(o1.getCommandBtn())},1000)"+
                    "}"
                ]
            },
            setCommandBtn:{
                $desc:"设置命令按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative'})).prepend(o2=new linb.UI.ComboInput({position:'relative',type:'none'}));"+
                    "_.asyRun(function(){o1.setCommandBtn('remove');o2.setCommandBtn('delete'); alert(o1.getCommandBtn())},1000)"+
                    "}"
                ]
            },
            getPrecision:{
                $desc:"获取precision值.只对 'spin' 类型有效.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ci11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setPrecision(2);alert(o1.getPrecision())},1000)"+
                    "}"
                ]
            },
            setPrecision:{
                $desc:"设置precision值.只对 'spin' 类型有效.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setPrecision(2);alert(o1.getPrecision())},1000)"+
                    "}"
                ]
            },
            getIncrement:{
                $desc:"获取增量值.只对 'spin' 类型有效.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ci13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setIncrement(0.02);alert(o1.getIncrement())},1000)"+
                    "}"
                ]
            },
            setIncrement:{
                $desc:"设置增量值.只对 'spin' 类型有效.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setIncrement(0.02);alert(o1.getIncrement())},1000)"+
                    "}"
                ]
            },
            getMin:{
                $desc:"获取最小值.只对 'spin' 类型有效.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.ci15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setMin(-2);alert(o1.getMin())},1000)"+
                    "}"
                ]
            },
            setMin:{
                $desc:"设置最小值.只对 'spin' 类型有效.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setMin(-2);alert(o1.getMin())},1000)"+
                    "}"
                ]
            },
            getMax:{
                $desc:"获取最大值.只对 'spin' 类型有效.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.ci17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setMax(2);alert(o1.getMax())},1000)"+
                    "}"
                ]
            },
            setMax:{
                $desc:"设置最大值.只对 'spin' 类型有效.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "_.asyRun(function(){o1.setMax(2);alert(o1.getMax())},1000)"+
                    "}"
                ]
            },
            getBtnImage :{
                $desc:"获取按钮图标的url",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ci18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'cmdbox'}));"+
                    "_.asyRun(function(){o1.setBtnImage('img/img.gif'); alert(o1.getBtnImage())},1000)"+
                    "}"
                ]
            },
            setBtnImage :{
                $desc:"设置按钮图标的url, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 对应的 CSS 值.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'cmdbox'}));"+
                    "_.asyRun(function(){o1.setBtnImage('img/img.gif'); alert(o1.getBtnImage())},1000)"+
                    "}"
                ]
            },
            getBtnImagePos :{
                $desc:"获取按钮图标的css position属性",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.ci20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'cmdbox'}));"+
                    "_.asyRun(function(){o1.setImage('img/img.gif').setBtnImagePos('left -16px'); alert(o1.getBtnImagePos())},1000)"+
                    "}"
                ]
            },
            setBtnImagePos :{
                $desc:"设置按钮图标的css position属性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 对应的 CSS 值.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ci21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'cmdbox'}));"+
                    "_.asyRun(function(){o1.setImage('img/img.gif').setBtnImagePos('left -16px'); alert(o1.getBtnImagePos())},1000)"+
                    "}"
                ]
            },
            onFileDlgOpen:{
                $desc:"当上载文件选择对话框打开时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "node : String, input DOM 元素的 linbid."
                ],
                $snippet:[
                    "var id='linb.temp.ci99'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ComboInput({type:'upload'}));"+
                    "o.onFileDlgOpen(function(){alert('File upload dialog is open.')});"+
                    "}"
                ]
            },
            beforeComboPop:{
                $desc:"当命令按钮按下时（弹出窗口弹出前）调用.如返false,系统默认的弹出窗口不会出现.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "pos : Object, 鼠标位置.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.ci10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'cmdbox'}));"+
                    "o1.beforeComboPop(function(p){p.boxing().setUIValue( 'beforeComboPop' )});"+
                    "}"
                ]
            },
            beforePopShow:{
                $desc:"在弹出窗口显示前调用.如返false,弹出窗口不会显示.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "popCtl : linb.UI, 弹出窗口对象."
                ]
            },
            afterPopShow:{
                $desc:"在弹出窗口显示后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "popCtl : linb.UI, 弹出窗口对象."
                ]
            },
            onClick:{
                $desc:"当鼠标单击控件pop按钮时调用(只对 'popbox' 或 'getter'类型的有效).",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "value: String, 控件的显示值."
                ]
            },
            onCommand:{
                $desc:"当command按钮按下时调用. 只对带有保存按钮的多选框有效",
                $paras:[
                    "profile : linb.UIProfile.",
                    "node : String, save按钮 DOM 元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.ci11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',commandBtn:'save'}));"+
                    "o1.onCommand(function(p){alert( p.boxing().getUIValue() )});"+
                    "}"
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","Stacks"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Stacks 类",
        constructor:{
            $desc:"生成一个linb.UI.Stacks对象."
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","ButtonViews"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.ButtonViews 类",
        constructor:{
            $desc:"生成一个linb.UI.ButtonViews对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setBarLocation:{
                $desc:"设置按钮条的位置, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'top','bottom','left' or 'right'. 默认为 'top'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.bv1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "var arr=['top','bottom','left','right'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();o.setBarLocation(type);alert(o.getBarLocation())}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getBarLocation:{
                $desc:"获取按钮条的位置.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.bv2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "var arr=['top','bottom','left','right'];"+
                    "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();o.setBarLocation(type);alert(o.getBarLocation())}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            setBarHAlign:{
                $desc:"设置按钮条的水平对齐方式 , 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.bv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.setBarHAlign('right'); alert(o.getBarHAlign());},1000);"+
                    "}"
                ]
            },
            getBarHAlign:{
                $desc:"获取按钮条的水平对齐方式.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.bv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.setBarHAlign('right'); alert(o.getBarHAlign());},1000);"+
                    "}"
                ]
            },
            setBarVAlign:{
                $desc:"设置按钮条的垂直对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'top' or 'bottom'. 默认为 'top'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.bv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.setBarVAlign('bottom'); alert(o.getBarVAlign());},1000);"+
                    "}"
                ]
            },
            getBarVAlign:{
                $desc:"获取按钮条的垂直对齐方式.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.bv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.setBarVAlign('bottom'); alert(o.getBarVAlign());},1000);"+
                    "}"
                ]
            },
            setBarSize:{
                $desc:"设置按钮条的大小, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.bv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.setBarSize(30); alert(o.getBarSize());},1000);"+
                    "}"
                ]
            },
            getBarSize:{
                $desc:"按钮条的大小.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.bv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.setBarSize(30); alert(o.getBarSize());},1000);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","RadioBox"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.RadioBox 类",
        constructor:{
            $desc:"生成linb.UI.RadioBox对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCheckBox:{
                $desc:"得到是否是显示成checkbox样式.",
                $rtn:"Boolean"
            },
            setCheckBox:{
                $desc:"设置是否显示成checkbox样式,并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","ColorPicker"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.ColorPicker 类",
        constructor:{
            $desc:"生成一个linb.UI.ColorPicker对象."
        },
        getTextColor:{
            $desc:"获取在指定颜色背景上显示最醒目的前景颜色.",
            $rtn:'String',
            $paras:[
                "value [必需参数] : String, 颜色值,例如 '#FFFFFF' ."
            ],
            $snippet:[
                "alert(linb.UI.ColorPicker.getTextColor('#00ff00'));alert(linb.UI.ColorPicker.getTextColor('#333333'));"
            ]
        },
        hex2rgb:{
            $desc:"将16进制颜色编码(如 #FF00FF)转化为RGB颜色编码(如[-16, 15, 240]).",
            $rtn:'Array',
            $paras:[
                "hex [必需参数] : String."
            ],
            $snippet:[
                "alert(linb.UI.ColorPicker.hex2rgb('#00ff00'))"
            ]
        },
        hsv2rgb:{
            $desc:"将一个HSV颜色编码(如[233, 1, 0.94])转化为RGB颜色编码(如[-16, 15, 240]).",
            $rtn:'Array',
            $paras:[
                "h [必需参数] : Number. 0-360",
                "s [必需参数] : Number. 0-1",
                "v [必需参数] : Number. 0-1"
            ],
            $snippet:[
                "alert(linb.UI.ColorPicker.hsv2rgb(233, 1, 0.94))"
            ]
        },
        rgb2hsv:{
            $desc:"将一个RGB颜色编码(如[-16, 15, 240])转化为HSV颜色编码(如[233, 1, 0.94]).",
            $rtn:'Array',
            $paras:[
                "r [必需参数] : Number. 0-255",
                "g [必需参数] : Number. 0-255",
                "b [必需参数] : Number. 0-255"
            ],
            $snippet:[
                "alert(linb.UI.ColorPicker.rgb2hsv(0, 28, 241))"
            ]
        },
        rgb2hex:{
            $desc:"将RGB颜色编码(如[-16, 15, 240])转化为16进制颜色编码(如 #FF00FF).",
            $rtn:'Array',
            $paras:[
                "r [必需参数] : Number. 0-255",
                "g [必需参数] : Number. 0-255",
                "b [必需参数] : Number. 0-255"
            ],
            $snippet:[
                "alert(linb.UI.ColorPicker.rgb2hex(0, 28, 241))"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                 $desc:"激活该控件,使它获得焦点.",
                $rtn:"[self]"
            },
            getColorName:{
                $desc:"获取颜色名字(如果有的话,如深红,咖啡色).",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.clr1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                    "o.afterUIValueSet(function(){alert(o.getColorName())});"+
                    "}"
                ]
            },
            getAdvance:{
                $desc:"判断是否显示颜色框又半部分以便终端用户选择更多颜色.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.clr2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                    "_.asyRun(function(){o.setAdvance(true);alert(o.getAdvance())},1000);"+
                    "}"
                ]
            },
            setAdvance:{
                $desc:"设置是否显示颜色框又半部分以便终端用户选择更多颜色, 并刷新界面.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.clr2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                    "_.asyRun(function(){o.setAdvance(true);alert(o.getAdvance())},1000);"+
                    "}"
                ]
            },
            getCloseBtn:{
                $desc:"判断是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.clr3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            setCloseBtn:{
                $desc:"设置是否带有关闭按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.clr4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            getBarDisplay:{
                $desc:"判断是否带有显示条.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.clr5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setBarDisplay(false);alert(o.getBarDisplay())},1000);"+
                    "}"
                ]
            },
            setBarDisplay:{
                $desc:"设置是否带有显示条, 并刷新界面.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.clr6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setBarDisplay(false);alert(o.getBarDisplay())},1000);"+
                    "}"
                ]
            },

            beforeClose:{
                $desc:"在颜色框关闭前调用. 返回false可以阻止颜色框关闭.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.clr9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                    "o.beforeClose(function(){return false;});"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","DatePicker"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.DatePicker 类",
        constructor:{
            $desc:"生成一个linb.UI.DatePicker对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                 $desc:"激活该控件,使它获得焦点.",
                $rtn:"[self]"
            },
            getTimeInput:{
                $desc:"得到日期选择框是否带有时间输入功能.",
                $rtn:"Boolean"
            },
            setTimeInput:{
                $desc:"设置日期选择框是否带有时间输入功能, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getFirstDayOfWeek:{
                $desc:"得到日期选择框的周开始日.0-6表示周日到周六",
                $rtn:"Number"
            },
            setFirstDayOfWeek:{
                $desc:"设置日期选择框的周开始日, 并刷新界面.0-6表示周日到周六",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number. 0-6表示周日到周六",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getOffDays:{
                $desc:"得到日期选择框的休假信息.由0到6组成的字符串.0-6表示周日到周六",
                $rtn:"String"
            },
            setOffDays:{
                $desc:"设置日期选择框的休假信息.由0到6组成的字符串.0-6表示周日到周六",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 由0到6组成的字符串.0-6表示周日到周六",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getHideWeekLabels:{
                $desc:"得到日期选择框是否带有周信息.",
                $rtn:"Boolean"
            },
            setHideWeekLabels:{
                $desc:"设置日期选择框是否带有带有周信息, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getDateInputFormat:{
                $desc:"得到日期选择框的日期输入格式.",
                $rtn:"String"
            },
            setDateInputFormat:{
                $desc:"设置日期选择框的日期输入格式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 只能是 yyyy-mm-dd/mm-dd-yyyy/dd-mm-yyyy 之一",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getCloseBtn:{
                $desc:"判断日期选择框是否带有关闭按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.dp1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            setCloseBtn:{
                $desc:"设置日期选择框是否带有关闭按钮, 并刷新界面.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.dp2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            getDateFrom:{
                $desc:"获取日期选择器的开始日期.",
                $rtn:"Object, Date Object",
                $snippet:[
                    "var id='linb.temp.dp2-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                    "_.asyRun(function(){alert(o.getDateFrom())},1000);"+
                    "}"
                ]
            },

            beforeClose:{
                $desc:"当用户单击关闭或取消按钮时调用. 返回false可阻止日期选择器被关闭.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.dp3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                    "o.beforeClose(function(){alert('关闭窗口动作被阻止！');return false;});"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","TimePicker"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.TimePicker 类",
        constructor:{
            $desc:"生成一个linb.UI.TimePicker对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                 $desc:"激活该控件,使它获得焦点.",
                $rtn:"[self]"
            },
            getCloseBtn:{
                $desc:"判断时间选择器是否带有关闭按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tp1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.TimePicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            setCloseBtn:{
                $desc:"设置时间选择器是否带有关闭按钮., 并刷新界面.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tp2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.TimePicker({position:'relative'}));"+
                    "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            beforeClose:{
                $desc:"在终端用户关闭选择器前调用. 返回false将阻止选择器关闭.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.tp3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.TimePicker({position:'relative'}));"+
                    "o.beforeClose(function(){return false;});"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Slider"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Slider 类",
        constructor:{
            $desc:"生成一个linb.UI.Slider对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getType:{
                $desc:"获取Slider的显示类型. 可以是'vertical'(垂直) 或 'horizontal'(水平) ",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.sl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setType('horizontal'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置Slider的显示类型, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 可以是'vertical'(垂直) 或 'horizontal'(水平).",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.sl3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider({width:50,height:150})));"+
                    "_.asyRun(function(){o.setType('vertical'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            getSteps:{
                $desc:"获取Slider的步长.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.sl4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setSteps(10).setUIValue('2:5'); alert(o.getSteps()); },1000);"+
                    "}"
                ]
            },
            setSteps:{
                $desc:"设置Slider的步长.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number, 步长整数值",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.sl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setSteps(10).setUIValue('2:5'); alert(o.getSteps()); },1000);"+
                    "}"
                ]
            },
            getShowIncreaseHandle:{
                $desc:"获取是否显示增加按钮属性.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.sl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setShowIncreaseHandle(false); alert(o.getShowIncreaseHandle()); },1000);"+
                    "}"
                ]
            },
            setShowIncreaseHandle:{
                $desc:"设置是否显示增加按钮属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.sl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setShowIncreaseHandle(false); alert(o.getShowIncreaseHandle()); },1000);"+
                    "}"
                ]
            },
            getShowDecreaseHandle:{
                $desc:"获取是否显示减小按钮属性.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.sl8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setShowDecreaseHandle(false); alert(o.getShowDecreaseHandle()); },1000);"+
                    "}"
                ]
            },
            setShowDecreaseHandle:{
                $desc:"设置是否显示减小按钮属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.sl9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setShowDecreaseHandle(false); alert(o.getShowDecreaseHandle()); },1000);"+
                    "}"
                ]
            },
            getIsRange:{
                $desc:"获取是否为Range类型（显示两个拖拽点）的Slider.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.sl10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setIsRange(false); alert(o.getIsRange()); },1000);"+
                    "}"
                ]
            },
            setIsRange:{
                $desc:"设置是否为Range类型（显示两个拖拽点）的Slider.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.sl11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Slider()));"+
                    "_.asyRun(function(){o.setIsRange(false); alert(o.getIsRange()); },1000);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Range"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Range 类",
        constructor:{
            $desc:"生成一个linb.UI.Range对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaptionTpl :{
                $desc:"获取标题栏文本模板.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.rg1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setCaptionTpl('from [{fromvalue}]{unit} to [{tovalue}]{unit}'); alert(o.getCaptionTpl())},1000)"+
                    "}"
                ]
            },
            setCaptionTpl :{
                $desc:"设置标题栏文本模板, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.rg2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setCaptionTpl('from [{fromvalue}]{unit} to [{tovalue}]{unit}'); alert(o.getCaptionTpl())},1000)"+
                    "}"
                ]
            },
            getMax:{
                $desc:"获取最大值",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.rg3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setMax(200); alert(o.getMax())},1000)"+
                    "}"
                ]
            },
            setMax:{
                $desc:"设置最大值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.rg4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setMax(200); alert(o.getMax())},1000)"+
                    "}"
                ]
            },
            getMin:{
                $desc:"获取最小值.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.rg5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setMin(50); alert(o.getMin())},1000)"+
                    "}"
                ]
            },
            setMin:{
                $desc:"设置最小值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.rg6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setMin(50); alert(o.getMin())},1000)"+
                    "}"
                ]
            },
            getSingleValue:{
                $desc:"判断否是使用单值.false为双值(一个范围对)",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.rg7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setSingleValue(true); alert(o.getSingleValue())},1000)"+
                    "}"
                ]
            },
            setSingleValue:{
                $desc:"设置否是使用单值., 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.rg8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setSingleValue(true); alert(o.getSingleValue())},1000)"+
                    "}"
                ]
            },
            getSteps:{
                $desc:"获取步长.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.rg9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setSteps(10); alert(o.getSteps())},1000)"+
                    "}"
                ]
            },
            setSteps:{
                $desc:"设置步长, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : nonnegative Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.rg10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setSteps(10); alert(o.getSteps())},1000)"+
                    "}"
                ]
            },
            getUnit:{
                $desc:"获取单位",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.rg11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setUnit('%'); alert(o.getUnit())},1000)"+
                    "}"
                ]
            },
            setUnit:{
                $desc:"设置单位, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.rg12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Range);"+
                    "_.asyRun(function(){o.setUnit('%'); alert(o.getUnit())},1000)"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","List"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.List 类",
        constructor:{
            $desc:"生成一个linb.UI.List对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getShowValue:{
                $desc:"获取控件的显示值.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.list00'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.setValue('b'); _.asyRun(function(){ alert(o.getValue() + '->' + o.getShowValue()) },1000)"+
                    "}"
                ]
            },
            activate:{
                $desc:"激活该控件,使它获得焦点.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.list0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.activate()},1000)"+
                    "}"
                ]
            },
            adjustSize:{
                $desc:"按照菜单的内容自动调整宽度.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.list3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){o.adjustSize()},1000)"+
                    "}"
                ]
            },
            getMaxHeight:{
                $desc:"获取最大高度.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.list4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "alert(o.setMaxHeight(40).getMaxHeight());_.asyRun(function(){o.adjustSize()},1000)"+
                    "}"
                ]
            },
            setMaxHeight:{
                $desc:"设置最大高度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.list5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "alert(o.setMaxHeight(40).getMaxHeight());_.asyRun(function(){o.adjustSize()},1000)"+
                    "}"
                ]
            },
            getSelMode:{
                $desc:"获取选择模式. 'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选, 'multibycheckbox'表示可多选,并且只能点击checkbox来选中.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.list6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setSelMode('multi').getSelMode());},1000)"+
                    "}"
                ]
            },
            setSelMode:{
                $desc:"设置选择模式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none' 为不选, 'multi'为多选, 'multibycheckbox'表示可多选并且只能点击checkbox来选中 or 'single'为单选.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.list7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setSelMode('multi').getSelMode());},1000)"+
                    "}"
                ]
            },
            getNoCtrlKey:{
                $desc:"获取是否在多选择模式下需要用Ctrl来辅助多选.",
                $rtn:"Boolean"
            },
            setNoCtrlKey:{
                $desc:"设置是否在多选择模式下需要用Ctrl来辅助多选.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getBorderType:{
                $desc:"获取块控件的边框种类.",
                $rtn:"String"
            },
            setBorderType:{
                $desc:"设置块控件的边框种类.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset','groove' 或 'ridge'.",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            onItemSelected:{
                $desc:"当列表项被选择时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "type: Number, 0:没有影响;1:item被选中;-1:item被清除选中"
                ],
                $snippet:[
                    "var id='linb.temp.list8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({selMode:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.onItemSelected(function(p,item,s){alert(item.id);});"+
                    "}"
                ]
            },
            onClick:{
                $desc:"在单击条目的时候触发该事件.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onDblclick:{
                $desc:"在双击条目的时候触发该事件.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.list9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.List({selMode:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.onDblclick(function(p,item,s){alert(item.id);});"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","StatusButtons"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.StatusButtons 类",
        constructor:{
            $desc:"生成一个linb.UI.StatusButtons对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getItemMargin:{
                $desc:"获取超链接队列的外补丁",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.llist1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.StatusButtons({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            setItemMargin:{
                $desc:"设置超链接队列的外补丁, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.llist2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.StatusButtons({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemLinker:{
                $desc:"获取状态按钮的linker类型.",
                $rtn:"String"
            },
            setItemLinker:{
                $desc:"设置状态按钮的linker类型.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 'none','left','right'",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getItemAlign:{
                $desc:"获取状态按钮的对齐方式.",
                $rtn:"String"
            },
            setItemAlign:{
                $desc:"设置状态按钮的对齐方式.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 'left', 'center' or 'right'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getItemWidth:{
                $desc:"获取画状态按钮的宽度.",
                $rtn:"Number"
            },
            setItemWidth:{
                $desc:"设置状态按钮的宽度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            onItemClick:{
                $desc:"当某个超链接队列项被单击时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.llist8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.StatusButtons({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.onItemClick(function(p,item,s){alert(item.id);});"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Gallery"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Gallery 类",
        constructor:{
            $desc:"生成一个linb.UI.Gallery (画廊)对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getStatus:{
                $desc:"获取某个画廊项的状态.",
                $paras:[
                    "subId [必需参数] : String, 画廊项id."
                ],
                $rtn:"String, 'ini'表示初始化, 'error'表示装载错误, 'loaded'表示装载成功.",
                $snippet:[
                    "var id='linb.temp.ga001'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.getStatus('c'));});"+
                    "_.asyRun(function(){alert(o.getStatus('c'));},3000);"+
                    "}"
                ]
            },
            getImgHeight:{
                $desc:"获取画廊项的高度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemHeight(40).setImgHeight(30).getImgHeight());},1000)"+
                    "}"
                ]
            },
            setImgHeight:{
                $desc:"设置画廊项的高度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemHeight(40).setImgHeight(30).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getImgWidth:{
                $desc:"获取画廊项的图片宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemWidth(40).setImgWidth(40).getImgWidth());},1000)"+
                    "}"
                ]
            },
            setImgWidth:{
                $desc:"设置画廊项的图片宽度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.da4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemWidth(40).setImgWidth(40).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemWidth:{
                $desc:"获取画廊项的宽度.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemWidth(40).getItemWidth());},1000)"+
                    "}"
                ]
            },
            setItemWidth:{
                $desc:"设置画廊项的宽度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemWidth(40).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemHeight:{
                $desc:"获取画廊项的宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemHeight(40).getItemHeight());},1000)"+
                    "}"
                ]
            },
            setItemHeight:{
                $desc:"设置画廊项的宽度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemHeight(40).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemMargin:{
                $desc:"获取画廊项的外补丁.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            setItemMargin:{
                $desc:"设置画廊项的外补丁, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemPadding:{
                $desc:"获取画廊项的内补丁",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                    "}"
                ]
            },
            setItemPadding:{
                $desc:"设置画廊项的内补丁, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","IconList"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.IconList 类",
        constructor:{
            $desc:"生成linb.UI.IconList 对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getStatus:{
                $desc:"获取指定图标项状态.",
                $paras:[
                    "subId [必需参数] : String, 图标项id."
                ],
                $rtn:"String, 'ini', 'error' or 'loaded'.",
                $snippet:[
                    "var id='linb.temp.ga001'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.getStatus('c'));});"+
                    "_.asyRun(function(){alert(o.getStatus('c'));},3000);"+
                    "}"
                ]
            },
            getItemWidth:{
                $desc:"获取图标项宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemWidth(40).getItemWidth());},1000)"+
                    "}"
                ]
            },
            setItemWidth:{
                $desc:"设置图标项宽度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemWidth(40).getItemWidth());},1000)"+
                    "}"
                ]
            },
            getItemHeight:{
                $desc:"获取图标项高度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemHeight(40).getItemHeight());},1000)"+
                    "}"
                ]
            },
            setItemHeight:{
                $desc:"设置图标项高度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemHeight(40).getItemHeight());},1000)"+
                    "}"
                ]
            },
            getItemMargin:{
                $desc:"获取图标项外补丁",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            setItemMargin:{
                $desc:"设置图标项外补丁, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemPadding:{
                $desc:"获取图标项内补丁",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.ga11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                    "}"
                ]
            },
            setItemPadding:{
                $desc:"设置图标项内补丁, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.ga12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                    "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Panel"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Panel 类",
        constructor:{
            $desc:"生辰一个linb.UI.Panel对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            resetPanelView:{
                $desc:"删除Group的所有子控件,然后折叠.",
                $rtn:"[self]",
                $paras:[
                    "destroyChildren [可选参数] : Boolean, 是否destroy子控件."
                ]
            },
            activate:{
                $desc:"激活这个Panel.",
                $rtn:"[self]",
                $paras:[
                    "flag [可选参数] : Boolean, false表示去掉激活."
                ],
                $snippet:[
                    "var id='linb.temp.panel01'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.activate();},500); _.asyRun(function(){btn.activate(false);},1000);"+
                    "}"
                ]
            },
            getCloseBtn :{
                $desc:"判断面板是否带有关闭按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.panel35'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setCloseBtn(true); alert(btn.getCloseBtn ())},1000)"+
                    "}"
                ]
            },
            setCloseBtn :{
                $desc:"设置面板是否带有关闭按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel36'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setCloseBtn(true); alert(btn.getCloseBtn ())},1000)"+
                    "}"
                ]
            },
            getPopBtn :{
                $desc:"获取面板是否带有弹出按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.panel37'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setPopBtn(true); alert(btn.getPopBtn ())},1000)"+
                    "}"
                ]
            },
            setPopBtn :{
                $desc:"设置面板是否带有弹出按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel38'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setPopBtn(true); alert(btn.getPopBtn ())},1000)"+
                    "}"
                ]
            },
            getOptBtn :{
                $desc:"获取面板是否带有选项按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.panel39'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setOptBtn(true); alert(btn.getOptBtn ())},1000)"+
                    "}"
                ]
            },
            setOptBtn :{
                $desc:"设置面板是否带有选项按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel40'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setOptBtn(true); alert(btn.getOptBtn ())},1000)"+
                    "}"
                ]
            },
            getInfoBtn :{
                $desc:"获取面板是否带有帮助按钮",
                $rtn:"Boolean"
            },
            setInfoBtn :{
                $desc:"设置面板是否带有帮助按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getRefreshBtn :{
                $desc:"获取面板是否带有刷新按钮",
                $rtn:"Boolean"
            },
            setRefreshBtn :{
                $desc:"设置面板是否带有刷新按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getToggleBtn :{
                $desc:"获取面板是否带有打开/收缩按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.panel41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setToggleBtn(true); alert(btn.getToggleBtn ())},1000)"+
                    "}"
                ]
            },
            setToggleBtn :{
                $desc:"设置面板是否带有打开/收缩按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setToggleBtn(true); alert(btn.getToggleBtn ())},1000)"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取标题文字.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.panel1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置标题文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                    "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取图标的url",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.panel3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置图标的url, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String, 图标的url.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取图标的css position属性",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.panel5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置图标的css position属性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, corresponding CSS value.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                    "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            getToggle:{
                $desc:"判断面板处于打开还是收缩状态",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.panel7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel({html:'content'}));"+
                    "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            setToggle :{
                $desc:"设置面板处于打开或收缩状态, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.panel8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;linb(id).prepend(btn=new linb.UI.Panel({html:'content'}));"+
                    "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            getBorderType:{
                $desc:"获取块控件PANEL的边框种类.",
                $rtn:"String"
            },
            setBorderType:{
                $desc:"设置块控件PANEL的边框种类.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset','groove' 或 'ridge'.",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            beforeExpend:{
                $desc:"在面板打开前调用.如返回 false, 面板不会打开.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.panel9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Panel({toggleBtn:true,html:'content'});"+
                    "o.beforeExpend(function(){alert('beforeExpend')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            beforeFold:{
                $desc:"当面板收缩时调用.如返回 false, 面板不会打开.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.panel10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Panel({toggleBtn:true,html:'content'});"+
                    "o.beforeExpend(function(){alert('beforeExpend')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            afterExpend:{
                $desc:"在面板打开后调用."
            },
            afterFold:{
                $desc:"在面板收缩后调用."
            },
            onIniPanelView:{
                $desc:"当面板初始化时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.panel11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Panel({toggleBtn:true,html:'content'});"+
                    "o.beforeExpend(function(){alert('beforeExpend')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            onClickBar:{
                $desc:"当终端用户单击标题栏时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.panel12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Panel({position:'relative',closeBtn:true,html:'content'}));"+
                    "o.onClickBar(function(){alert('onClickBar')});"+
                    "}"
                ]
            },
            beforePop:{
                $desc:"在面板被弹出前调用. 返回false可阻止面板被弹出.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "options : Object. 可以包括以下键值: parent, host, properties, events, host, theme, CS, CC, CB, CF"
                ]
            },
            beforeClose:{
                $desc:"在面板被关闭前调用. 返回false可阻止面板被关闭.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.panel13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Panel({position:'relative',closeBtn:true,html:'content'}));"+
                    "o.beforeClose(function(){return false;});"+
                    "}"
                ]
            },
            onShowInfo:{
                $desc:"在用户单击帮助按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            },
            onRefresh:{
                $desc:"在用户单击刷新按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            },
            onShowOptions :{
                $desc:"当用户单击选项按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.panel14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Panel({position:'relative',optBtn:true,html:'content'}));"+
                    "o.onShowOptions(function(){alert('onShowOptions');});"+
                    "}"
                ]
            }

        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","PageBar"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.PageBar 类",
        constructor:{
            $desc:"Creates a linb.UI.PageBar Object."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setPage:{
                $desc:"设置目前页.",
                $rtn:"[self]",
                $paras:[
                    "value: Number. 页代码."
                ],
                $snippet:[
                    "var id='linb.temp.pb0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})));"+
                    "_.asyRun(function(){o.setPage(100);},1000);"+
                    "}"
                ]
            },
            getCaption:{
                $desc:"得到 caption 字符串.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pb1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setCaption('Page =>'));"+
                    "_.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            setCaption:{
                $desc:"设置caption字符串.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, caption字符串.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.pb2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setCaption('Page =>'));"+
                    "_.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            getNextMark:{
                $desc:"得到下一页的显示字符串.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pb3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setNextMark('next'));"+
                    "_.asyRun(function(){alert(o.getNextMark())});"+
                    "}"
                ]
            },
            setNextMark:{
                $desc:"设置下一页的显示字符串.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 下一页的显示字符串.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.pb4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setNextMark('next'));"+
                    "_.asyRun(function(){alert(o.getNextMark())});"+
                    "}"
                ]
            },
            getPrevMark:{
                $desc:"得到前一页的显示字符串.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pb5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setPrevMark('prev'));"+
                    "_.asyRun(function(){alert(o.getPrevMark('{'))});"+
                    "}"
                ]
            },
            setPrevMark:{
                $desc:"设置前一页显示字符串.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 前一页显示字符串.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.pb6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setPrevMark('prev'));"+
                    "_.asyRun(function(){alert(o.getPrevMark())});"+
                    "}"
                ]
            },
            getTextTpl:{
                $desc:"得到文字显示模板字符串.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pb7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setTextTpl('[*]'));"+
                    "_.asyRun(function(){alert(o.getTextTpl())});"+
                    "}"
                ]
            },
            setTextTpl:{
                $desc:"设置文字显示模板字符串.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 文字显示模板字符串.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.pb8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setTextTpl('[*]'));"+
                    "_.asyRun(function(){alert(o.getTextTpl())});"+
                    "}"
                ]
            },
            getUriTpl:{
                $desc:"获取URL模板字符串.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pb9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setUriTpl('#aaa=*'));"+
                    "_.asyRun(function(){alert(o.getUriTpl())});"+
                    "}"
                ]
            },
            setUriTpl:{
                $desc:"设置URL模板字符串.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, URL模板字符串.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.pb10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setUriTpl('#aaa=*'));"+
                    "_.asyRun(function(){alert(o.getUriTpl())});"+
                    "}"
                ]
            },


            onClick:{
                $desc:"当鼠标单击一个按钮时触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "page : Number, 目标页码."
                ],
                $snippet:[
                    "var id='linb.temp.pb11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "linb(id).prepend((new linb.UI.PageBar({value:'1:3:300'})).onClick(function(profile,page){profile.boxing().setPage(page);}))"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Layout"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Layout 类",
        constructor:{
            $desc:"生成一个linb.UI.Layout对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            append:{
                $desc:"将一系列的linb.UIProfile添加到布局的内部.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.UIProfile/linb.UIProfile[], 一个linb.UIProfile概要对象(或一组linb.UIProfile概要对象).",
                    "subId [可选参数] : String, 布局的子项id. 该参数可以设置为[false], 表示[target]只是添加到DOM上, 并不产生和父布局项的链接关系."
                ],
                $snippet:[
                    "var id='linb.temp.lo0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "_.asyRun(function(){o.append(new linb.UI.Button,'after');},1000);"+
                    "}"
                ]
            },
            getPanel:{
                $desc:"获取布局子项的面板.",
                $rtn:"linb.Dom",
                $paras:[
                    "subId [可选参数] : String, 布局子项的id. 默认为'main'(主面板)."
                ],
                $snippet:[
                    "var id='linb.temp.lo1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "_.asyRun(function(){o.getPanel('after').append(linb.create('<button>afgter</button>'));},1000);"+
                    "}"
                ]
            },
            getType:{
                $desc:"获取布局类型. 可以是'vertical'(垂直) 或 'horizontal'(水平) ",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.lo2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "_.asyRun(function(){o.append(new linb.UI.Button).setType('horizontal'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置布局类型, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 可以是'vertical'(垂直) 或 'horizontal'(水平).",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.lo3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "_.asyRun(function(){o.append(new linb.UI.Button).setType('horizontal'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            insertItems:{
                $desc:"添加一些布局项.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 项数组.",
                    "base [可选参数] : String, 基准项id.",
                    "before [可选参数] : Boolean, 指示在基准项前还是项后插入. 默认为项后;"
                ],
                $snippet:[
                    "var id='linb.temp.lo3-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "_.asyRun(function(){o.insertItems([{id:'a1',size:30}],'main',true)},1000);"+
                    "_.asyRun(function(){o.insertItems([{id:'c1',size:30,cmd:false}],'main',false)},2000);"+
                    "_.asyRun(function(){o.insertItems([{id:'a0',size:30, folded:true}],'after',true)},3000);"+
                    "_.asyRun(function(){o.insertItems([{id:'c2',size:30}],'after',false)},4000);"+
                    "}"
                ]
            },
            updateItem:{
                $desc:"更新一个布局项,并刷新对应的DOM界面.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号.",
                    "options [必需参数] : Object/String, 要更新的选项."
                ],
                $snippet:[
                    "var id='linb.temp.lo3-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "_.asyRun(function(){o.updateItem('after',{size:30})},1000);"+
                    "_.asyRun(function(){o.updateItem('after',{folded:true})},2000);"+
                    "_.asyRun(function(){o.updateItem('after',{folded:false,cmd:false})},3000);"+
                    "_.asyRun(function(){o.updateItem('after',{hidden:true})},4000);"+
                    "_.asyRun(function(){o.updateItem('after',{folded:false,size:50,cmd:true,hidden:false})},5000);"+
                    "}"
                ]
            },
            setItems:{
                $desc:"设置布局项, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 布局项."
                ],
                $snippet:[
                    "var id='linb.temp.lo4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'before',size:50},{id:'after',size:50}]})));"+
                    "o.append(new linb.UI.Button).append(new linb.UI.Link, 'before').append(new linb.UI.Input, 'after');"+
                    "_.asyRun(function(){o.setType('horizontal').setItems([{id:'before', pos:'before', 'size':50, min:50, max:200}, {id:'main', min:10}, {id:'after', pos:'after', size:50}, {id:'c', pos:'after', cmd:true, size:50}])},1000);"+
                    "}"
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性.",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            fireCmdClickEvent:{
                $desc:"触发折叠/打开面板的click事件.",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 面板的subId字符串."
                ],
                $snippet:[
                    "var id='linb.temp.lo6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',cmd:true, size:50}]})));"+
                    "_.asyRun(function(){o.fireCmdClickEvent('after'); },1000);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","ColLayout"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.ColLayout 类",
        prototype:{
            getMinWidth:{
                $desc:"获取最小宽度限制.",
                $rtn:"Number"
            },
            append:{
                $desc:"添加一系列的控件添加到到当前控件对象上.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.UIProfile[],  子控件的 linb.UI 对象(里面可以包括多个控件概要对象).",
                    "subId [可选参数] : String, subid会指示子控件加到那个DOM节点上.这个参数可以为 [false] ,表示控件不会做为子控件添加到当前控件对象上,只进行在DOM界面上添加UI的工作."
                ]
            },
            addPanel:{
                $desc:"新加入一个Panel对象到ColLayout.",
                $rtn:"[self]",
                $paras:[
                    "args [必需参数] : Object. 用来生成 Panel 的对象参数.",
                    "col [可选参数] : String. 加入到哪一列. 默认是第一列.",
                    "basePrf [可选参数] : String. 以哪一个Panel为基准. 默认是加到列的最后.",
                    "before  [可选参数] : Boolean. 是否加到基准Panel的前面. 默认是true."
                ]
            },
            movePanel:{
                $desc:"移动一个内部的 Panel 对象到新的位置.",
                $rtn:"[self]",
                $paras:[
                    "pff [必需参数] : linb.UIProfile. 移动哪一个.",
                    "col [可选参数] : String. 移动到哪一列. 默认是第一列.",
                    "basePrf [可选参数] : String. 以哪一个Panel为基准. 默认是移动到最后.",
                    "before  [可选参数] : Boolean. 是否移动到基准Panel的前面. 默认是true."
                ]
            },
            setMinWidth:{
                $desc:"设置最小宽度限制.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            onColResize:{
                $desc:"行改变大小时触发.",
                $rtn:"[self]",
                $paras:[
                    "profile : linb.UIProfile.",
                    "sizes: Array. 每行的大小.",
                ]
            },
            onRelayout:{
                $desc:"内部子容器重新排列时触发.",
                $rtn:"[self]",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Tabs"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Tabs 类",
        constructor:{
            $desc:"生成一个linb.UI.Tabs对象."
        },
        getDropKeys:{
            $desc:"从指定的profile中获取拖动键值.",
            $rtn:"String",
            $paras:[
                "profile [必需参数] : 目标的profile",
                "node [必需参数] : 相应DOM元素的linbid."
            ],
            $memo:"一般情况下,程序员不需要调用该函数. 该函数可能被子类覆盖."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            append:{
                $desc:"将一系列linb.UIProfile概要对象添加到标签中.",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : linb.UIProfile/linb.UIProfile[], 一个linb.UI对象(或一系列linb.UIProfile概要对象).",
                    "subId [可选参数] : String, 标签项id. 如果该参数为false, [target]只被添加到DOM中, 而不在[target]和父元素中建立链接."
                ],
                $snippet:[
                    "var id='linb.temp.tabs0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}],value:'a'})));"+
                    "_.asyRun(function(){o.append(new linb.UI.Button,'a');},1000);"+
                    "}"
                ]
            },
            fireItemClickEvent:{
                $desc:"触发给定标签的click事件.",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 标签项的subId字符串."
                ],
                $snippet:[
                    "var id='linb.temp.tabs004'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){o.fireItemClickEvent('a')},1000);"+
                    "}"
                ]
            },
            setItems:{
                $desc:"设置一系列的标签项, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 标签项数组."
                ],
                $snippet:[
                    "var id='linb.temp.tabs2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto'})));"+
                    "_.asyRun(function(){o.setItems([{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}])},1000);"+
                    "}"
                ]
            },
            removeItems:{
                $desc:"从标签中移除一系列标签项.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 标签项id数组."
                ],
                $snippet:[
                    "var id='linb.temp.tabs4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){o.removeItems(['a','b'])},1000);"+
                    "}"
                ]
            },
            clearItems:{
                $desc:"清除所有标签项.",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String, 模板键值,该值对应的节点包括所有的标签项节点. 默认为'ITEMS'."
                ],
                $snippet:[
                    "var id='linb.temp.tabs5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){o.clearItems()},1000);"+
                    "}"
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性.",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getHAlign :{
                $desc:"获取水平对齐方式. 可以为'left', 'center' or 'right'.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.tabs7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('center')},1000);"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.tabs8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('right')},1000);"+
                    "}"
                ]
            },
            getLazyAppend :{
                $desc:"判断面板是否是延迟加载的",
                $rtn:"Boolean"
            },
            setLazyAppend :{
                $desc:"设置面板是否是延迟加载的.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getNoPanel :{
                $desc:"判断标签是否带有面板",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tabs9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getNoPanel());_.asyRun(function(){o.setNoPanel(false)},1000);"+
                    "}"
                ]
            },
            setNoPanel :{
                $desc:"设置当前页面控件是否有面板, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.tabs10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getNoPanel());_.asyRun(function(){o.setNoPanel(true)},1000);"+
                    "}"
                ]
            },
            getDropKeysPanel :{
                $desc:"得到面板的drop键值.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.tabs11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){o.setDropKeysPanel('kk');alert(o.getDropKeysPanel());},1000);"+
                    "}"
                ]
            },
            setDropKeysPanel :{
                $desc:"设置面板的drop键值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.tabs12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){o.setDropKeysPanel('kk');alert(o.getDropKeysPanel());},1000);"+
                    "}"
                ]
            },
            getCurPanel:{
                $desc:"获取当前激活的标签项的面板.",
                $rtn:"linb.Dom",
                $snippet:[
                    "var id='linb.temp.tabs13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}],value:'a'})));"+
                    "_.asyRun(function(){alert(o.getCurPanel().id())},1000);"+
                    "}"
                ]
            },
            getPanel:{
                $desc:"获取id为指定id的标签项的面板.",
                $rtn:"linb.Dom",
                $paras:[
                    "subId [可选参数] : String, 标签项的id."
                ],
                $snippet:[
                    "var id='linb.temp.tabs14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){alert(o.getPanel('b').id())},1000);"+
                    "}"
                ]
            },
            markItemCaption:{
                $desc:"在标签项的标题上做一个标记,或去除标题上的标记.",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 标签项id.",
                    "mark [必需参数] : Boolean, 指示做标记还是去除标记. ",
                    "force [可选参数]: Boolean, 强行设置该属性. 默认为 false."
                ],
                $snippet:[
                    "var id='linb.temp.tabs15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "_.asyRun(function(){o.markItemCaption('b',true)},1000);"+
                    "}"
                ]
            },
            getSelMode :{
                $desc:"获取选择模式. 'single'表示可单选, 'multi'表示可多选. 只针对noPanel的控件有效.",
                $rtn:"String"
            },
            setSelMode :{
                $desc:"设置选择模式. 只针对noPanel的控件有效.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'single'表示可单选, 'multi'表示可多选. 默认为'single'",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            addPanel:{
                $desc:"添加一个面板到标签中.",
                $rtn:"[self]",
                $paras:[
                    "para [必需参数] : Object, 键值对.",
                    "children [必需参数] : Array, 子控件.",
                    "item [可选参数] : Object"
                ],
                $snippet:[
                    "var id='linb.temp.tabs16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new linb.UI.Button);"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            removePanel:{
                $desc:"移除一个标签项.",
                $rtn:"[self]",
                $paras:[
                    "domId [可选参数] : String, 要移除的标签项id."
                ],
                $snippet:[
                    "var id='linb.temp.tabs17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var tabs;"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.removePanel(tabs.getSubNode('ITEM','b').id())},1000);"+
                    "}"
                ]
            },
            getPanelPara:{
                $desc:"获取面板参数.",
                $rtn:"Object",
                $snippet:[
                    "var id='linb.temp.tabs18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new linb.UI.Button);"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            getPanelChildren:{
                $desc:"获取面板的子元素.",
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.tabs19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new linb.UI.Button);"+
                    "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            beforePagePop:{
                $desc:"当用户点击POP按钮前调用. 返回false可以阻止页面POP.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 当前标签项.",
                    "options : Object. 可以包括以下键值: parent, host, properties, events, host, theme, CS, CC, CB, CF"
                ]
            },
            beforePageClose:{
                $desc:"当用户关闭某个标签项之前调用. 返回false可以阻止标签项被关闭.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 当前标签项.",
                    "src : String, 事件所在DOM的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tabs21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.beforePageClose(function(p,item){if(item.id=='a')return false;})"+
                    "}"
                ]
            },
            afterPageClose:{
                $desc:"当用户关闭某个标签项之后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 当前标签项."
                ],
                $snippet:[
                    "var id='linb.temp.tabs22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.afterPageClose(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onItemSelected:{
                $desc:"当某个标签项被选择时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 被选择的标签项对象.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tabs23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.onItemSelected(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onCaptionActive:{
                $desc:"当用户单击当前标签项的标签头时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 当前标签项.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tabs24'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.onCaptionActive(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onShowOptions :{
                $desc:"当用户单击option按钮时触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 当前标签项.",
                    "e: Event, 事件对象.",
                    "src: 事件发生的DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tabs25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',optBtn:true,closeBtn:true},{id:'b',caption:'b b',optBtn:true,closeBtn:true},{id:'c',caption:'c c',optBtn:true}],value:'a'})));"+
                    "o.onShowOptions(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onIniPanelView:{
                $desc:"当每个页的容器面板初始化时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 当前标签项."
                ],
                $snippet:[
                    "var id='linb.temp.tabs25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Tabs({height:'auto',items:['a','c','b'],value:'a'});"+
                    "o.onIniPanelView(function(p,item){linb.message(item.id);});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","FoldingTabs"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.FoldingTabs 类",
        constructor:{
            $desc:"生成一个linb.UI.FoldingTabs对象."
        }
    });
    
    _.set(linb.Locale,["cn","doc","linb","UI","TagEditor"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.TagEditor 类",
        constructor:{
            $desc:"生成一个linb.UI.TagEditor对象."
        },
        prototype:{
            activate:{
                $desc:"激活当前控件(获取焦点状态).",
                $rtn:"[self]"
            },
            getTagInput:{
                $desc:"获取某个标签对应的input控件.",
                $rtn:"linb.UI.Input",
                $paras:[
                    "index [必需参数] : Integer, 索引号."
                ]
            },
            getBorderType:{
                $desc:"获取块控件的边框种类.",
                $rtn:"String"
            },
            setBorderType:{
                $desc:"设置块控件的边框种类.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset',或 'flat'.",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getPadding:{
                $desc:"获取标签控件的内边框距离.",
                $rtn:"String"
            },
            setPadding:{
                $desc:"设置标签控件的内边框距离.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getRequired:{
                $desc:"获取是否至少输入一个标签.",
                $rtn:"Boolean"
            },
            setRequired:{
                $desc:"设置是否至少输入一个标签.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getTagCount:{
                $desc:"获取可以输入的标签数量.",
                $rtn:"Integer"
            },
            setTagCount:{
                $desc:"设置可以输入的标签数量.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Integer",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getTagMaxlength:{
                $desc:"获取标签input控件里可以输入的最大字符数量.",
                $rtn:"Integer"
            },
            setTagMaxlength:{
                $desc:"设置标签input控件里可以输入的最大字符数量.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Integer",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getTagInputWidth:{
                $desc:"获取标签input控件的宽度.",
                $rtn:"Integer"
            },
            setTagInputWidth:{
                $desc:"设置标签input控件的宽度.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Integer",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getTagInputHeight:{
                $desc:"获取标签input控件的高度.",
                $rtn:"Integer"
            },
            setTagInputHeight:{
                $desc:"设置标签input控件的高度.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Integer",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getTagSpacing:{
                $desc:"获取标签input控件间的距离.",
                $rtn:"Integer"
            },
            setTagSpacing:{
                $desc:"设置标签input控件间的距离.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Integer",
                    "force [可选参数] : 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getValueFormat:{
                $desc:"获取标签input控件的有效输入的模式（正则表达式）.",
                $rtn:"String"
            },
            setValueFormat:{
                $desc:"设置标签input控件有效输入的模式（正则表达式）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getValueSeparator:{
                $desc:"获取多个标签字符串值的分隔符.默认为“,”",
                $rtn:"String"
            },
            setValueSeparator:{
                $desc:"设置多个标签字符串值的分隔符.",
                $rtn:"[self]"
            }
        }
    });
    
    _.set(linb.Locale,["cn","doc","linb","UI","Calendar"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Calendar 类",
        constructor:{
            $desc:"生成一个linb.UI.Calendar对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setDayInfo:{
                $desc:"设置月历中特定天的显示文字.",
                $rtn:"[self]",
                $paras:[
                 "key [必需参数] : String, 节点模板关键字.",
                 "index [必需参数] : Number, 0-41, 设置到第几天.",
                 "value [必需参数] : String, 要设置的html文字."
                ]
            },
            clearContents:{
                $desc:"清空月历中特定天的内容部分.",
                $rtn:"[self]",
                $paras:[
                 "index [必需参数] : Number, 0-41, 第几天."
                ]
            },
            addContents:{
                $desc:"加入DOM到月历特定天的内容节点.",
                $rtn:"[self]",
                $paras:[
                 "index [必需参数] : Number, 0-41, 第几天.",
                 "node [必需参数] : linb.absBox, 要加入的Dom/UI控件."
                ]
            },
            setWidth:{
                $desc:"设置控件的宽度.（单位px）.",
                $rtn:"[self]",
                 $paras:[
                    "value [必需参数] : Number, 非负整数.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            setHeight:{
                $desc:"设置控件的高度.（单位px）.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 非负 Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            onDblclick:{
                $desc:"在双击Calendar的时候触发该事件.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "index: Nubmer, calendar天的序号.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","ToolBar"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.ToolBar 类",
        constructor:{
            $desc:"生成一个linb.UI.ToolBar对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            updateItem:{
                $desc:"更新一个tool项,并刷新对应的DOM界面.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号.",
                    "options [必需参数] : Object/String, 要更新的选项."
                ],
                $snippet:[
                    "var id='linb.temp.tool01'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new linb.UI.ComboInput({type:'color'})}]}]})));"+
                    "alert(o.getHAlign());_.asyRun(function(){o.updateItem('ga1',{caption:'updated'})},1000);"+
                    "}"
                ]
            },

            getHAlign :{
                $desc:"获取水平对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.tool1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new linb.UI.ComboInput({type:'color'})}]}]})));"+
                    "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('right')},1000);"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'left'代表左对齐, 'center'代表居中对齐, 'right'代表右对齐.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tool2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',Object:new linb.UI.ComboInput({type:'color'})}]})));"+
                    "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('right')},1000);"+
                    "}"
                ]
            },
            getHandler:{
                $desc:"判断工具栏是否带有手柄（用于鼠标拖动）",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tool3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new linb.UI.ComboInput({type:'time'})}]}]})));"+
                    "alert(o.getHandler());_.asyRun(function(){o.setHandler(false)},1000);"+
                    "}"
                ]
            },
            setHandler :{
                $desc:"设置工具栏是否带有手柄, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tool4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new linb.UI.ComboInput({type:'time'})}]}]})));"+
                    "alert(o.getHandler());_.asyRun(function(){o.setHandler(false)},1000);"+
                    "}"
                ]
            },
            showGroup:{
                $desc:"显示或隐藏某个分组.",
                $rtn:"[self]",
                $paras:[
                    "grpId [必需参数] : String, 分组的id",
                    "value [必需参数] : Boolean, true表示显示,false表示隐藏.默认为true"
                ],
                $snippet:[
                    "var id='linb.temp.tool5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new linb.UI.ComboInput({type:'time'})}]}]})));"+
                    "_.asyRun(function(){o.showGroup('ga',false)},1000);"+
                    "}"
                ]
            },
            showItem:{
                $desc:"显示或隐藏指定工具栏按钮项.",
                $rtn:"[self]",
                $paras:[
                    "itemId [必需参数] : String, 工具栏按钮id",
                    "value: [可选参数] : Boolean, true表示显示,false表示隐藏.默认为true."
                ],
                $snippet:[
                    "var id='linb.temp.tool7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]}]})));"+
                    "_.asyRun(function(){o.showItem('ga2',false)},1000);"+
                    "}"
                ]

            },
            onClick:{
                $desc:"在工具栏按钮项被单击时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item : Object, 工具栏按钮项对象.",
                    "group : Object, 工具栏按钮项所在组对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tool8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]}]})));"+
                    "o.onClick(function(p,i,j){alert(j.id+'->'+i.id)})"+
                    "}"
                ]
            }

        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","PopMenu"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.PopMenu 类",
        constructor:{
            $desc:"生成一个linb.UI.PopMenu对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            adjustSize:{
                $desc:"按照列表的内容自动调整列表的宽度和高度.",
                $rtn:"[self]"
            },
            pop:{
                $desc:"弹出菜单.",
                $rtn:"[self]",
                $paras:[
                    "obj [必需参数] : 菜单弹出点.可以是一个坐标参数{left:Nubmer,top:Number}或是DOM元素.",
                    "type [可选参数] : Number, 从1到4, 代表菜单相对弹出点的方位,东北,东南,西北,西南. 默认为1.",
                    "parent [可选参数} : 菜单的父元素.DOM元素或linb.Dom对象. "
                ],
                $snippet:[
                    "var id='linb.temp.pm0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            hide:{
                $desc:"隐藏菜单.",
                $rtn:"[self]",
                $paras:[
                    "triggerEvent [可选参数] : Boolean, 是否触发onHide事件."
                ],
                $snippet:[
                    "var id='linb.temp.pm1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); _.asyRun(function(){o.hide()},3000);})"+
                    "}"
                ]
            },
            getAutoHide:{
                $desc:"判断菜单显示一段时间后是否自动隐藏.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.pm2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true}]}));"+
                    "o.setAutoHide(true);"+
                    "alert(o.getAutoHide());"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            setAutoHide:{
                $desc:"设置菜单显示一段时间后是否自动隐藏 , 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pm3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',tips:'item c'},{id:'d',Object:new linb.UI.CheckBox}]}));"+
                    "o.setAutoHide(true);"+
                    "alert(o.getAutoHide());"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            getHideAfterClick:{
                $desc:"判断菜单在被单击后是否自动隐藏.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.pm4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true}]}));"+
                    "o.setHideAfterClick(false);"+
                    "alert(o.getHideAfterClick());"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            setHideAfterClick:{
                $desc:"设置菜单在被单击后是否自动隐藏, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pm5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',tips:'item c'},{id:'d',Object:new linb.UI.CheckBox}]}));"+
                    "o.setHideAfterClick(false);"+
                    "alert(o.getHideAfterClick());"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },

            beforeHide:{
                $desc:"在菜单隐藏前被调用. 返回false可以阻止菜单隐藏.",
                $paras:[
                    "profile : linb.UIProfile"
                ],
                $snippet:[
                    "var id='linb.temp.pm31'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "o.beforeHide(function(){alert('before hide')});"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            },
            onHide:{
                $desc:"在菜单隐藏时调用.",
                $paras:[
                    "profile : linb.UIProfile"
                ],
                $snippet:[
                    "var id='linb.temp.pm11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "o.onHide(function(){alert('hidden')});"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            },
            onMenuSelected:{
                $desc:"在用户单击某个菜单项时调用",
                $paras:[
                    "profile : linb.UIProfile",
                    "item : Object, 菜单项对象",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.pm12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "o.onMenuSelected(function(p,item){if(item.type=='checkbox')alert(item.value); else alert(item.id); });"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            },
            onShowSubMenu:{
                $desc:"在子菜单显示时调用.",
                $paras:[
                    "profile : linb.UIProfile",
                    "item : Object, 父菜单项对象",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.pm13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.PopMenu({autoHide:true, items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:true},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "var cp=(new linb.UI.ColorPicker).render(true);"+
                    "cp.beforeClose(function(){cp.hide();return false;})"+
                    ".afterUIValueSet(function(p,old,n){o.onMenuSelected(o.get(0),{id:'b',value:n}); o.hide();});"+
                    "o.onShowSubMenu(function(p,item,src){"+
                    "if(item.id=='b'){cp.reBoxing().popToTop(src,2,linb(id));return cp;}"+
                    "})"+
                    ".onMenuSelected(function(p,i){alert(i.id+':'+i.value)});"+
                    "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","MenuBar"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.MenuBar 类",
        constructor:{
            $desc:"生成一个linb.UI.MenuBar对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            clearPopCache:{
                $desc:"清除所有的缓存菜单项."
            },
            hide:{
                $desc:"隐藏菜单"
            },
            getParentID:{
                $desc:"获取父对象的DOM元素id.",
                $rtn:"String"
            },
            setParentID:{
                $desc:"通过设置DOM元素的id来设置父对象.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number. 父对象id",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getAutoShowTime:{
                $desc:"获取鼠标在悬浮多少秒后菜单项自动显示.",
                $rtn:"Number. 多少秒",
                $snippet:[
                    "var id='linb.temp.menu2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "linb(id).prepend(o);"+
                    "alert(o.getAutoShowTime());"+
                    "_.asyRun(function(){o.setAutoShowTime(0)});"+
                    "}"
                ]
            },
            setAutoShowTime:{
                $desc:"设置鼠标在悬浮多少秒后菜单项自动显示, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.menu3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "linb(id).prepend(o);"+
                    "alert(o.getAutoShowTime());"+
                    "_.asyRun(function(){o.setAutoShowTime(1000)});"+
                    "}"
                ]
            },
            getHandler:{
                $desc:"判断菜单条前是否有一个手柄,以供鼠标拖动",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.menu4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "linb(id).prepend(o);"+
                    "alert(o.getHandler());"+
                    "_.asyRun(function(){o.setHandler(false)});"+
                    "}"
                ]
            },
            updateItem:{
                $desc:"更新一个项,并刷新对应的DOM界面.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号.",
                    "options [必需参数] : Object/String, 要更新的选项."
                ],
                $snippet:[
                    "var id='linb.temp.menu4-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.updateItem('a',{caption:'item udpated'})});"+
                    "}"
                ]
            },
            setHandler:{
                $desc:"设置菜单条前是否有一个手柄,以供鼠标拖动, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.menu5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "linb(id).prepend(o);"+
                    "alert(o.getHandler());"+
                    "_.asyRun(function(){o.setHandler(false)});"+
                    "}"
                ]
            },
            onGetPopMenu:{
                $desc:"在下拉菜单pop调用.",
                $paras:[
                    "profile : 菜单条的linb.UIProfile",
                    "item : Object, ",
                    "callback: String, callback函数."
                ]
            },
            onMenuBtnClick:{
                $desc:"在菜单项被点击时调用.只有sub为空的item才会有这个事件.",
                $paras:[
                    "profile : 菜单条的linb.UIProfile",
                    "item : Object, ",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            beforePopMenu:{
                $desc:"在菜单项被点击前调用,如果返回false,默认的下拉菜单将不会显示.",
                $paras:[
                    "profile : 菜单条的linb.UIProfile",
                    "item : Object, ",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onMenuSelected:{
                $desc:"在菜单项被选择时调用.",
                $paras:[
                    "profile : 菜单条的linb.UIProfile",
                    "popProfile: linb.UIProfile, 当前弹出菜单的profile.",
                    "item : Object, ",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.pm12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "o.onMenuSelected(function(pm,p,item){if(item.type=='checkbox')linb.message(item.value); else linb.message(item.id); });"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            onShowSubMenu:{
                $desc:"当显示子菜单时调用.",
                $paras:[
                    "profile : 菜单条的linb.UIProfile.",
                    "popProfile: linb.UIProfile, 当前弹出菜单的profile.",
                    "item : Object.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.menu13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new linb.UI.MenuBar({parentID:id,autoShowTime:0,items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:true},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "var cp=(new linb.UI.ColorPicker).render(true);"+
                    "cp.beforeClose(function(){cp.hide();return false;})"+
                    ".afterUIValueSet(function(p,old,n){o.onMenuSelected(o.get(0),null,{id:'b',value:n}); o.hide();});"+
                    "o.onShowSubMenu(function(pm, p,item,src){"+
                    "if(item.id=='b'){cp.reBoxing().popToTop(src,2,linb(id));return cp;}"+
                    "})"+
                    ".onMenuSelected(function(pm,p,i){linb.message(i.id+':'+i.value)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","Dialog"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Dialog 类",
        constructor:{
            $desc:"生成一个linb.UI.Dialog对象."
        },
        alert:{
            $desc:"弹出一个警告框.",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 警告框标题.",
                "content [可选参数] : String, 警告语句.",
                "btnCap  [可选参数] : String, 按钮文字.",
                "onClose [可选参数] : Function, alert窗口关闭的回调函数.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的alert窗口,默认为[false]."
            ],
            $snippet:[
                "linb.UI.Dialog.alert('title','content',function(){alert('ok')})",
                "linb.UI.Dialog.alert('title','content content content content content content content content content content content content ',function(){alert('ok')})"
            ]
        },
        confirm:{
            $desc:"弹出一个确认框.",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 确认框的标题.",
                "content [可选参数] : String, 确认的提示语句.",
                "onYes [可选参数] : Function, the Yes 回调函数.",
                "onNo [可选参数] : Function, the No 回调函数.",
                "btnCapYes [可选参数] : String, Yes按钮的文字.",
                "btnCapNo [可选参数] : String, No按钮的文字.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的confirm窗口,默认为[false]."
            ],
            $snippet:[
                "linb.UI.Dialog.confirm('title','content',function(){alert('yes')},function(){alert('no')})",
                "linb.UI.Dialog.confirm('title','content content content content content content content content content content content content ',function(){alert('yes')},function(){alert('no')})"
            ]
        },
        pop:{
            $desc:"弹出一个简易对话框.（非模态）",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 简易对话框标题文字.",
                "content [可选参数] : String, 窗体内容输入文字",
                "btnCap [可选参数] : String, OK按钮文字.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id"
            ],
            $snippet:[
                "linb.UI.Dialog.pop('title','content')",
                "linb.UI.Dialog.pop('title','content content content content content content content content content content content content ','I knew it!')"
            ]
        },
        prompt:{
            $desc:"弹出一个输入框.",
            $rtn:"linb.Dialog",
            $paras:[
                "title [可选参数] : String, 输入框标题文字.",
                "caption [可选参数] : String, 提示文字.",
                "content [可选参数] : String, 默认输入文字.",
                "onYes [可选参数] : Function, 用户单击Yes 回调函数.",
                "onNo [可选参数] : Function, 用户单击 No 回调函数.",
                "left [可选参数] : Number, 对话框左边坐标.",
                "top [可选参数] : Number, 对话框上边坐标.",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id",
                "parent [可选参数] : linb.Dom, 或linb.UI对象.",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的prompt窗口,默认为[false]."
            ],
            $snippet:[
                "linb.UI.Dialog.prompt('title','caption', 'content content ',function(str){alert(str)})"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活对话框窗口.",
                $rtn:"[self]",
                $paras:[
                    "flag [可选参数] : Boolean, false表示去掉激活"
                ],
                $snippet:[
                    "var dlg1=(new linb.UI.Dialog({html:'dlg1'})).show(), dlg2=(new linb.UI.Dialog({html:'dlg2',left:100,top:100})).show(); _.asyRun(function(){dlg1.activate()},500); _.asyRun(function(){dlg2.activate()},1000);_.asyRun(function(){dlg2.activate(false)},1500);"
                ]
            },
            close:{
                $desc:"关闭对话框.",
                $rtn:"[self]",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.close();},1000);"
                ]
            },
            showModal:{
                $desc:"显示模式对话框.",
                $rtn:"[self]",
                $paras:[
                    "parent [可选参数] : linb.Dom, 父对象. 默认为linb('body').",
                    "left [可选参数] Number, 对话框左边坐标.",
                    "top [可选参数] Number, 对话框上边坐标."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).showModal();",
                    "var dlg=(new linb.UI.Dialog).showModal(null,100,100);"
                ]
            },
            show:{
                $desc:"显示对话框.",
                $rtn:"[self]",
                $paras:[
                    "parent [可选参数] : linb.Dom, 父对象. 默认为linb('body').",
                    "modal [可选参数] : Boolean, 模式对话框,或者是非模式对话框.默认为非模式（false）.",
                    "left [可选参数] Number, 对话框左边坐标.",
                    "top [可选参数] Number, 对话框上边坐标."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100);",
                    "var dlg=(new linb.UI.Dialog).show(null,true, 100,100);",
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); (new linb.UI.Dialog).show(dlg.reBoxing(),true, 100,100);"
                ]
            },
            hide:{
                $desc:"隐藏对话框.",
                $rtn:"[self]",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.hide();},1000); _.asyRun(function(){dlg.show();},2000);"
                ]
            },
            getCaption:{
                $desc:"获取对话框标题文字",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCaption());_.asyRun(function(){dlg.setCaption('c cc c');},1000);"
                ]
            },
            setCaption:{
                $desc:"设置对话框标题文字, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCaption());_.asyRun(function(){dlg.setCaption('c cc c');},1000);"
                ]
            },
            getCloseBtn:{
                $desc:"判断对话框右上角是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCloseBtn());_.asyRun(function(){dlg.setCloseBtn(false);},1000); _.asyRun(function(){dlg.close();},2000);"
                ]
            },
            setCloseBtn:{
                $desc:"设置对话框右上角是否带有关闭按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCloseBtn());_.asyRun(function(){dlg.setCloseBtn(false);},1000);_.asyRun(function(){dlg.close();},2000);"
                ]
            },

            getMinBtn:{
                $desc:"判断对话框右上角是否带有最小化按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMinBtn());_.asyRun(function(){dlg.setMinBtn(false);},1000);"
                ]
            },
            setMinBtn:{
                $desc:"设置对话框右上角是否带有最小化按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMinBtn());_.asyRun(function(){dlg.setMinBtn(false);},1000);"
                ]
            },
            getMaxBtn:{
                $desc:"判断对话框右上角是否带有最大化按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMaxBtn());_.asyRun(function(){dlg.setMaxBtn(false);},1000);"
                ]
            },
            setMaxBtn:{
                $desc:"设置对话框右上角是否带有最大化按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMaxBtn());_.asyRun(function(){dlg.setMaxBtn(false);},1000);"
                ]
            },
            getPinBtn:{
                $desc:"判断对话框右上角是否带有钉针按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getPinBtn());_.asyRun(function(){dlg.setPinBtn(false);},1000);"
                ]
            },
            setPinBtn:{
                $desc:"设置对话框右上角是否带有钉针按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getPinBtn());_.asyRun(function(){dlg.setPinBtn(false);},1000);"
                ]
            },
            getLandBtn:{
                $desc:"判断对话框右上角是否带有降落按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getLandBtn());_.asyRun(function(){dlg.setLandBtn(true);},1000);"
                ]
            },
            setLandBtn:{
                $desc:"设置对话框右上角是否带有降落按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getLandBtn());_.asyRun(function(){dlg.setLandBtn(true);},1000);"
                ]
            },
            getOptBtn:{
                $desc:"判断对话框右上角是否带有选项按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getOptBtn());_.asyRun(function(){dlg.setOptBtn(true);},1000);"
                ]
            },
            setOptBtn:{
                $desc:"设置对话框右上角是否带有选项按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getOptBtn());_.asyRun(function(){dlg.setOptBtn(true);},1000);"
                ]
            },
            getInfoBtn :{
                $desc:"获取对话框是否带有帮助按钮",
                $rtn:"Boolean"
            },
            setInfoBtn :{
                $desc:"设置对话框是否带有帮助按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getRefreshBtn :{
                $desc:"获取对话框是否带有刷新按钮",
                $rtn:"Boolean"
            },
            setRefreshBtn :{
                $desc:"设置对话框是否带有刷新按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getMovable:{
                $desc:"判断对话框是否可以拖动.",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMovable());_.asyRun(function(){dlg.setMovable(false);},1000);"
                ]
            },
            setMovable:{
                $desc:"设置对话框是否可以拖动, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMovable());_.asyRun(function(){dlg.setMovable(false);},1000);"
                ]
            },
            getImage :{
                $desc:"获取对话框左上角的图标url.",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImage());_.asyRun(function(){dlg.setImage('img/img.gif');},1000);"
                ]
            },
            setImage :{
                $desc:"设置对话框左上角的图标url, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String,  image path.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImage());_.asyRun(function(){dlg.setImage('img/img.gif');},1000);"
                ]
            },
            getImagePos :{
                $desc:"获取对话框左上角图标的css position属性",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImagePos());_.asyRun(function(){dlg.setImage('img/img.gif').setImagePos('left -16px');},1000);"
                ]
            },
            setImagePos :{
                $desc:"设置对话框左上角图标的css position属性, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, corresponding CSS value.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImagePos());_.asyRun(function(){dlg.setImage('img/img.gif').setImagePos('left -16px');},1000);"
                ]
            },
            getHtml:{
                $desc:"获取对话框的内部内容HTML",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setHtml('<p>content</p>');alert(dlg.getHtml());},1000);"
                ]
            },
            setHtml:{
                $desc:"设置对话框的内部内容HTML, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setHtml('<p>content</p>');alert(dlg.getHtml());},1000);"
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性.",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            },
            getStatus:{
                $desc:"获取对话框的大小状态. 可以是'normal'(通常), 'min'(最小话) or 'max'(最大化).",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setStatus('min');alert(dlg.getStatus());},1000);"
                ]
            },
            setStatus:{
                $desc:"设置对话框的大小状态, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 可以是'normal'(通常), 'min'(最小话) or 'max'(最大化).",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setStatus('max');alert(dlg.getStatus());},1000);"
                ]
            },
            getMinHeight:{
                $desc:"获取对话框的最小高度限制.",
                $rtn:"Number",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            setMinHeight:{
                $desc:"设置对话框的最小高度限制, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            getMinWidth:{
                $desc:"获取对话框的最小宽度限制",
                $rtn:"Number",
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            setMinWidth:{
                $desc:"设置对话框的最小宽度限制, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            getFromRegion:{
                $desc:"获取对话框的弹出源.",
                $rtn:"Object",
                $snippet:[
                    "var dl=(new linb.UI.Dialog);"+
                    "dl.setFromRegion({left:0,top:0,width:10,height:10});"+
                    "alert(_.serialize(dl.getFromRegion()));"+
                    "dl.show(null,false, 200,200);"
                ]
            },
            setFromRegion:{
                $desc:"设置对话框的弹出源, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.{left:Number,top:Number,width:Number,height:Number}",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var dl=(new linb.UI.Dialog);"+
                    "dl.setFromRegion({left:0,top:0,width:10,height:10});"+
                    "alert(_.serialize(dl.getFromRegion()));"+
                    "dl.show(null,false, 200,200);"
                ]
            },
            onShow:{
                $desc:"当对话框显示的时候调用.",
                $paras:[
                    "profile : linb.UIProfile"
                ],
                $snippet:[
                    "var dlg,btn; dlg=new linb.UI.Dialog; dlg.append(btn=new linb.UI.Button);"+
                    "dlg.onShow(function(){btn.activate();});"+
                    "dlg.show(null,false, 100,100);"
                ]
            },
            beforeClose:{
                $desc:"当对话框关闭时调用. 返回false可以阻止对话框关闭.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var dlg=new linb.UI.Dialog; "+
                    "dlg.beforeClose(function(){return false;});"+
                    "dlg.show(null,false, 100,100);"+
                    "_.asyRun(function(){dlg.close();},3000);"
                ]
            },
            onShowInfo:{
                $desc:"在用户单击帮助按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            },
            onRefresh:{
                $desc:"在用户单击刷新按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            },
            onShowOptions :{
                $desc:"在用户单击选项按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var dlg=new linb.UI.Dialog({optBtn:true}); "+
                    "dlg.onShowOptions(function(){alert('onShowOptions');});"+
                    "dlg.show(null,false, 100,100);"
                ]
            },
            onLand:{
                $desc:"在用户单击LAND按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            }

        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Span"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Span 类",
        constructor:{
            $desc:"生成一个linb.UI.Span对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getHtml:{
                $desc:"获取对象的内部html代码.",
                $rtn:"String"
            },
            setHtml:{
                $desc:"设置对象的内部html代码.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性.",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值 默认为 [false]."
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Image"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Image 类",
        constructor:{
            $desc:"生成一个linb.UI.Image对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getMaxHeight:{
                $desc:"获取图片的最大高度",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.img1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxHeight(500).getMaxHeight());"+
                    "}"
                ]
            },
            setMaxHeight:{
                $desc:"设置图片的最大高度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number. 图片高度（像素）",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.img2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxHeight(500).getMaxHeight());"+
                    "}"
                ]
            },
            getMaxWidth:{
                $desc:"获取图像的最大宽度（像素）",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.img3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxWidth(500).getMaxWidth());"+
                    "}"
                ]
            },
            setMaxWidth:{
                $desc:"设置图像的最大宽度（像素）, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.img4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxWidth(500).getMaxWidth());"+
                    "}"
                ]
            },
            getAlt:{
                $desc:"获取图像的 Alt 值",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.img5-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "_.asyRun(function(){alert(o.setAlt('picture').getAlt())},1000);" +
                    "}"
                ]
            },
            setAlt:{
                $desc:"设置图像的 Alt 值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.img6-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "_.asyRun(function(){alert(o.setAlt('picture').getAlt())},1000);" +
                    "}"
                ]
            },
            getSrc:{
                $desc:"获取图像的src值",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.img5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "_.asyRun(function(){alert(o.setSrc('img/linb.box.gif').getSrc())},1000);"+
                    "_.asyRun(function(){o.setMaxHeight(200)},1500);"+
                    "}"
                ]
            },
            setSrc:{
                $desc:"设置图像的src值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.img6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "_.asyRun(function(){alert(o.setSrc('img/linb.box.gif').getSrc())},1000);"+
                    "_.asyRun(function(){o.setMaxHeight(200)},1500);"+
                    "}"
                ]
            },
            getCursor:{
                $desc:"获取图像的鼠标状态",
                $rtn:"String"
            },
            setCursor:{
                $desc:"设置图像的鼠标状态.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getRate:{
                $desc:"获取图像的比率(实际大小 / 显示大小)",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.img7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/linb.box.gif',maxHeight:200}));"+
                    "_.asyRun(function(){alert(o.getRate())},1000);"+
                    "}"
                ]
            },

            onError:{
                $desc:"当图像文件无法获取（文件地址不存在等情况）调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.img15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',maxHeight:200}));"+
                    "o.onError(function(){alert('the image does not exist')});"+
                    "o.setSrc('img/lo-go.gif')"+
                    "}"
                ]
            },
            beforeLoad:{
                $desc:"在图像装载前调用.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.img16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',maxHeight:200}));"+
                    "o.beforeLoad(function(){alert('beforeLoad')}).afterLoad(function(p,src,w,h){linb.message('width:'+w+' height:'+h,src)});"+
                    "o.setSrc('img/logo.gif');"+
                    "}"
                ]
            },
            afterLoad:{
                $desc:"当图像装载后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "path : String, 图片的文件路径.",
                    "width : Number, 图片宽",
                    "height : Number, 图片高"
                ],
                $snippet:[
                    "var id='linb.temp.img17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative', maxHeight:200}));"+
                    "o.beforeLoad(function(){alert('beforeLoad')}).afterLoad(function(p,src,w,h){linb.message('width:'+w+' height:'+h,src)});"+
                    "o.setSrc('img/logo.gif');"+
                    "}"
                ]
            },
            onClick:{
                $desc:"在click图片的时候触发该事件.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onDblclick:{
                $desc:"在双击图片的时候触发该事件.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","FoldingList"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.FoldingList 类",
        constructor:{
            $desc:"生成一个linb.UI.FoldingList对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCmds:{
                $desc:"获取指令数组",
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.fl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                    "}"
                ]
            },
            setCmds:{
                $desc:"设置指令数组, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.fl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                    "}"
                ],
                $memo:"You have to use this function before the UIProfile is rendered."
            },
            getActiveLast :{
                $desc:"判断是否激活最后一个文件夹项",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.fl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "o.setActiveLast(true); alert(o.getActiveLast());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setActiveLast :{
                $desc:"设置是否激活最后一个文件夹项, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.fl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "o.setActiveLast(true); alert(o.getActiveLast());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            toggle:{
                $desc:"打开或关闭一个文件夹项.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] :String, 文件夹项目id."
                ],
                $snippet:[
                    "var id='linb.temp.fl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.toggle('a')},1000)"+
                    "}"
                ]
            },
            fillContent:{
                $desc:"填充指定文件夹项的内容.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] :String, 文件夹项id.",
                    "obj [必需参数]: linb.Dom对象或linb.UI对象. 如果设置为null将清空该项目的内容."
                ],
                $snippet:[
                    "var id='linb.temp.fl8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',caption:'a1',tips:'a1 tips',text:'text1'},{id:'b',caption:'a2',text:'text2',tips:'a2 tips'}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.toggle('a')},1000);"+
                    "_.asyRun(function(){o.fillContent('a', new linb.UI.Button({position:'relative'}))},1200);"+
                    "}"
                ]
            },

            onShowOptions :{
                $desc:"当用户单击选项按钮时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.fl9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto', position:'relative',items:[{id:'a',optBtn:true,title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "linb(id).prepend(o);"+
                    "o.onShowOptions(function(){alert('onShowOptions');});"+
                    "}"
                ]
            },

            onClickButton:{
                $desc:"当用户单击内部按钮的时候调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "cmdKey: String, 命令的键值.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.fl10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb(id).prepend(o);"+
                    "o.onClickButton(function(p,item,cmdKey){alert(item.id +':'+cmdKey)});"+
                    "}"
                ]
            },

            onGetContent:{
                $desc:"当某个文件夹项需要填充内容时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "callback : Function, 填充完成后的回调函数."
                ],
                $snippet:[
                    "var id='linb.temp.fl11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'Button',title:'a1',tips:'a1 tips'},{id:'CheckBox',title:'a2',tips:'a2 tips'}]});"+
                    "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb(id).prepend(o);"+
                    "o.onGetContent(function(p,item){return new linb.UI[item.id]({position:'relative'})});"+
                    "}"
                ]
            }
        }
    });


    _.set(linb.Locale,["cn","doc","linb","UI","Poll"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Poll 类",
        constructor:{
            $desc:"生成一个投票对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCmds:{
                $desc:"得到命令项",
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.pool1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',selMode:'multi', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%',editable:true}]});"+
                    "o.setCmds([{id:'new', caption:'new'}, {id:'edit', caption:'edit'}]);"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                    "}"
                ]
            },
            setCmds:{
                $desc:"设置命令项,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%',editable:true},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.setCmds([{id:'new', caption:'new'}, {id:'edit', caption:'edit'}]);"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                    "}"
                ],
                $memo:"You have to use this function before the UIProfile is rendered."
            },

            fillContent:{
                $desc:"填充内容到指定项.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] :String, 项目 id.",
                    "obj [必需参数]: linb.Dom/linb.UI, 如果是 null, 会清空项的内容."
                ],
                $snippet:[
                    "var id='linb.temp.poll3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.fillContent('a', new linb.UI.Button({position:'relative'}))},1000);"+
                    "}"
                ]
            },
            getBindEditor:{
                $desc:"得到绑定的编辑器",
                $rtn:"linb.UIProfile",
                $snippet:[
                    "var id='linb.temp.poll4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({editable:true, width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){alert(o.getBindEditor())},2000);"+
                    "}"
                ]
            },
            getRemoveText:{
                $desc:"得到移除命令的文本值",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pool5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,selMode:'multi',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getRemoveText());o.setRemoveText('remove me');"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRemoveText:{
                $desc:"设置移除命令的文本值.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getRemoveText());o.setRemoveText('remove me');"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getEditorType:{
                $desc:"得到编辑器的种类.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pool7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getEditorType());"+
                    "o.setEditorType('color');"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setEditorType:{
                $desc:"设置编辑器的种类.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'none','combobox','listbox','upload','getter','helpinput','cmdbox','currency','number','popbox','time','date' or 'color'. 默认为 'none'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,selMode:'multi',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getEditorType());"+
                    "o.setEditorType('color');"+
                    "linb(id).prepend(o);"+
                    "}"
                ],
                $memo:"You have to use this function before the UIProfile is rendered."
            },
            getEditable:{
                $desc:"获得当前控件是否可以编辑.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.pool9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getEditable());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setEditable(true)},1000)"+
                    "}"
                ]
            },
            setEditable:{
                $desc:"设置当前控件是否可以编辑.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getEditable());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setEditable(true)},1000)"+
                    "}"
                ]
            },
            getNewOption:{
                $desc:"获得是否支持新项的加入",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pool11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',selMode:'multi', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getNewOption());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setNewOption('Add an option')},1000)"+
                    "}"
                ]
            },
            setNewOption:{
                $desc:"设置是否支持新项的加入.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getNewOption());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setNewOption('Add an option')},1000)"+
                    "}"
                ]
            },
            getToggle:{
                $desc:"获得Toggle状态",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.pool13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getToggle());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setToggle(true)},1000)"+
                    "}"
                ]
            },
            setToggle:{
                $desc:"设置Toggle状态.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',selMode:'multi',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getToggle());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setToggle(true)},1000)"+
                    "}"
                ]
            },
            getTitle:{
                $desc:"获得标题内容",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.pool15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getTitle());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setTitle('haha')},1000)"+
                    "}"
                ]
            },
            setTitle:{
                $desc:"设置标题内容.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',selMode:'multi',toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getTitle());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setTitle('haha')},1000)"+
                    "}"
                ]
            },
            getNoTitle:{
                $desc:"获得当前控件“是否允许没有标题”的状态",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.pool19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getNoTitle());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setNoTitle(true)},1000)"+
                    "}"
                ]
            },
            setNoTitle:{
                $desc:"设置当前控件“是否允许没有标题”的状态.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.pool20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "alert(o.getNoTitle());"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setNoTitle(true)},1000)"+
                    "}"
                ]
            },

            onGetContent:{
                $desc:"在需要内容填充的时候调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "callback : Function, 回调函数."
                ],
                $snippet:[
                    "var id='linb.temp.pool30'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',toggle:true,items:[{id:'Button',caption:'option 1',percent:0.5,message:'50%'},{id:'CheckBox',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb(id).prepend(o);"+
                    "o.onGetContent(function(p,item){return new linb.UI[item.id]({position:'relative'})});"+
                    "}"
                ]
            },
            onClickButton:{
                $desc:"在点击命令按钮的时候调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "key: String, 命令按钮的键值.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.pool31'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',toggle:true,items:[{id:'Button',caption:'option 1',percent:0.5,message:'50%'},{id:'CheckBox',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "linb(id).prepend(o);"+
                    "o.onClickButton(function(p,cmdKey){alert(cmdKey)});"+
                    "}"
                ]
            },

            beforeOptionAdded:{
                $desc:"在添加选项之前触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "value: String."
                ],
                $snippet:[
                    "var id='linb.temp.pool41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                    "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                    "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                    "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            beforeOptionChanged:{
                $desc:"在更新选项前触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "value: String."
                ],
                $snippet:[
                    "var id='linb.temp.pool42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                    "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                    "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                    "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+

                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            beforeOptionRemoved:{
                $desc:"在移除选项前触发.",
                $paras:[
                    "profile : linb.UIProfile."
                ],
                $snippet:[
                    "var id='linb.temp.pool43'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                    "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                    "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                    "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+

                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            beforeTitleChanged:{
                $desc:"在更新标题前触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "value: String."
                ],
                $snippet:[
                    "var id='linb.temp.pool44'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                    "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                    "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                    "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+

                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            onCustomEdit:{
                $desc:"在显示内部编辑器时触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "node: Element, 相应的DOM元素.",
                    "flag: Number, 1:编辑; 2:添加; other:编辑标题.",
                    "value: String.",
                    "item: Object, 项对象."
                ],
                $snippet:[
                    "var id='linb.temp.pool45'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true, title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                    "o.onCustomEdit(function(profile, node, flag, value, item, callback){"+
                    "if(flag==1||flag==2){var p=new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b'}]});p.pop(node);p.onMenuSelected(function(p,i){callback(i.caption)}); return p;};"+
                    "});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","TreeBar"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.TreeBar 类",
        constructor:{
            $desc:"生成一个linb.UI.TreeBar对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            fireItemClickEvent:{
                $desc:"模拟鼠标点击,以选中TreeBar中的某一项.",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 项的id."
                ],
                $snippet:[
                    "var id='linb.temp.tb01'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "linb(id).prepend(o);"+
                    "o.fireItemClickEvent('a');"+
                    "}"
                ]
            },

            getAnimCollapse :{
                $desc:"判断在父节点打开时,是否显示动画.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tb1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setAnimCollapse :{
                $desc:"设置在父节点打开时,是否显示动画.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tb2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getGroup :{
                $desc:"判断树是否分组",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tb3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setGroup(true); alert(o.getGroup());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setGroup :{
                $desc:"设置树是否分组, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tb4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setGroup(true); alert(o.getGroup());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getDynDestory:{
                $desc:"判断是否在节点折叠时动态销毁DOM,以便收回内存.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tb5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setDynDestory(true); alert(o.getDynDestory());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setDynDestory :{
                $desc:"设置是否在节点折叠时动态销毁DOM（以便收回内存）, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tb6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setDynDestory(true); alert(o.getDynDestory());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getIniFold :{
                $desc:"判断表格在初始化是打开或收缩子行（用于带有子行的树形表格）",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tb7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setIniFold(true); alert(o.getIniFold());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setIniFold :{
                $desc:"设置表格在初始化是打开或收缩子行（用于带有子行的树形表格）, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tb8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setIniFold(false); alert(o.getIniFold());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getSelMode :{
                $desc:"获取选择模式. 'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选, 'multibycheckbox'表示可多选,并且只能点击checkbox来选中.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.tb9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setSelMode('none'); alert(o.getSelMode());"+
                    "o.onItemSelected(function(profile,item){linb.message(item.id)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setSelMode :{
                $desc:"设置选择模式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选. 默认为'single'",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tb10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setSelMode('multi'); alert(o.getSelMode());"+
                    "o.afterUIValueSet(function(profile,o,n){linb.message(n)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getNoCtrlKey:{
                $desc:"获取是否在多选择模式下需要用Ctrl来辅助多选.",
                $rtn:"Boolean"
            },
            setNoCtrlKey:{
                $desc:"设置是否在多选择模式下需要用Ctrl来辅助多选.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getSingleOpen:{
                $desc:"判断是否每一次只能有一个父节点能够被打开. 设置为true时,当一个父节点被打开,其他的打开的父节点将自动合拢",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tb11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setSingleOpen(true); alert(o.getSingleOpen());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setSingleOpen :{
                $desc:"设置是否每一次只能有一个父节点能够被打开, 并刷新界面. 设置为true时,当一个父节点被打开,其他的打开的父节点将自动合拢.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tb12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setSingleOpen(true); alert(o.getSingleOpen());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            insertItems:{
                $desc:"插入一系列节点项.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 节点项目数组.",
                    "pid [可选参数] : String, 父节点id.",
                    "base [可选参数] : String, 基准节点id.",
                    "before [可选参数] : Boolean, true表示在基准节点前插入,false在基准节点后插入. 默认为false;"
                ],
                $snippet:[
                    "var id='linb.temp.tb13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',iniFold:false,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'bz',caption:'bz'}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.insertItems([{id: 'ba',caption:'caption'},{id:'bb',caption:'caption'}],'b',null,true)},1000);"+
                    "_.asyRun(function(){o.insertItems([{id: 'ca',caption:'caption'},{id:'cb',caption:'caption'}],'c',null,false)},2000);"+
                    "_.asyRun(function(){o.insertItems([{id:'aaa',caption:'a0'}],null,'b',false)},3000);"+
                    "_.asyRun(function(){o.insertItems([{id:'bbb',caption:'b0'}],null,'b',true)},4000);"+
                    "}"
                ]
            },
            openToNode:{
                $desc:"打开到某个节点.调用该函数后,他的父节点,祖父节点直到根节点都会被展开",
                $rtn:"String",
                $paras:[
                    "id [必需参数] : String, 要展开的节点id."
                ],
                $snippet:[
                    "var id='linb.temp.tb14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b',sub:[{id:'bb',caption:'bb',sub:[{id: 'bba',caption:'bba'},{id:'bbb',caption:'bbb',sub:[{id:'bbba',caption:'bbba'}]}]}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.openToNode('bbba')},1000);"+
                    "}"
                ]
            },
            toggleNode:{
                $desc:"打开或折叠某个父节点.",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 父节点id.",
                    "expend [可选参数] : Boolean, true表示打开,false表示折叠.",
                    "recursive [可选参数] : Boolean, 是否递归应用于父节点的所有子节点."
                ],
                $snippet:[
                    "var id='linb.temp.tb17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b',sub:[{id:'bb',caption:'bb',sub:[{id: 'bba',caption:'bba'},{id:'bbb',caption:'bbb',sub:[{id:'bbba',caption:'bbba'}]}]}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.toggleNode('b',true,true)},1000);"+
                    "_.asyRun(function(){o.toggleNode('bb',false,true)},2000);"+
                    "_.asyRun(function(){o.toggleNode('bb',true,false)},3000);"+
                    "}"
                ]
            },


            onGetContent:{
                $desc:"在父节点展开时,需要子节点数据时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "callback : Function, 回调函数."
                ],
                $snippet:[
                    "var id='linb.temp.tb18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.onGetContent(function(profile,item,callback,threadid){var id=item.id, data=[{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption '+id}]; if(id=='b')return data; else callback(data);});"+
                    "o.onItemSelected(function(profile,item,src){linb.message(item.id)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            onItemSelected:{
                $desc:"在某个节点被单击时调用时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象.",
                    "e: Event, 事件对象.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "type: Number, 0:没有影响;1:item被选中;-1:item被清除选中"
                ],
                $snippet:[
                    "var id='linb.temp.tb20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.onItemSelected(function(profile,item,src){linb.message(item.id)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            beforeExpend:{
                $desc:"在某个节点展开前调用. 如返回 false,节点将不会展开.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象."
                ]
            },
            beforeFold:{
                $desc:"在某个节点折叠前调用. 如返回 false,节点将不会展开.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "item: Object, 项对象."
                ]
            },
            afterExpend:{
                $desc:"在某个节点展开后调用."
            },
            afterFold:{
                $desc:"在某个节点折叠后调用."
            }
        }
    });
    _.set(linb.Locale,["cn","doc","linb","UI","TreeView"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.TreeView 类"
    });

    _.set(linb.Locale,["cn","doc","linb","UI","TreeGrid"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.TreeGrid 类",
        constructor:{
            $desc:"生成linb.UI.TreeGrid对象."
        },
        getCellPro:{
            $desc:"获取指定单元格的属性值,属性名称由参数指定.",
            $rtn:"String",
            $paras:[
                "profile [必需参数] : TreeGrid的linb.UIProfile.",
                "cell [必需参数] : 单元格对象.",
                "key [必需参数] : String, 属性名称."
            ],
            $snippet:[
                "var id='linb.temp.grid0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('cell').afterCellActive(function(profile, cell){linb.message(profile.box.getCellPro(profile,cell,'type'))});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getActiveMode :{
                $desc:"获取表格的选取模式.",
                $rtn:"String, 'cell', 'row' 或 'none'.",
                $snippet:[
                    "var id='linb.temp.grid1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('cell'); alert(o.getActiveMode());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setActiveMode :{
                $desc:"设置表格的选取模式, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 可以是'cell', 'row' 或 'none'. 默认为'row'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,altRowsBg:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('row'); alert(o.getActiveMode());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            offEditor:{
                $desc:"解除单元格的编辑模式."
            },
            autoRowHeight:{
                $desc:"自动适应行高.",
                $paras:[
                    "rowId [可选参数] : String, 行id. 没有行id表示自动适应所有的行高."
                ]
            },
            autoColWidth:{
                $desc:"自动适应列宽.",
                $paras:[
                    "colId [可选参数] : String, 列id. 没有列id表示自动适应所有的列宽."
                ]
            },
            editCell:{
                $desc:"将单元格绑定到指定的编辑器上.",
                $paras:[
                    "cell [必需参数] : String, cell's id值 或 cell 对象."
                ]
            },
            focusCell:{
                $desc:"单元格获得焦点.",
                $paras:[
                    "cell [必需参数] : String, cell's id值 或 cell 对象."
                ]
            },
            focusCellbyRowCol:{
                $desc:"单元格获得焦点.",
                $paras:[
                    "rowId [必需参数] : String, 单元格行id.",
                    "colId [必需参数] : String, 单元格列id."
                ]
            },
            editCellbyRowCol:{
                $desc:"将单元格绑定到指定的编辑器上.",
                $paras:[
                    "rowId [必需参数] : String, 单元格行id.",
                    "colId [必需参数] : String, 单元格列id."
                ],
                $snippet:[
                    "var id='linb.temp.grid3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.editCellbyRowCol('row2','col2')},1000);"+
                    "}"
                ]
            },
            getValueSeparator:{
                $desc:"获取字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效).默认为“;”",
                $rtn:"String"
            },
            setValueSeparator:{
                $desc:"设置字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效).",
                $rtn:"[self]"
            },
            getCurrencyTpl:{
                $desc:"得到货币的显示模板",
                $rtn:"String"
            },
            setCurrencyTpl:{
                $desc:"设置货币的显示模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getAltRowsBg :{
                $desc:"判断是否使用不同的背景色区分相邻的两行",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAltRowsBg(true); alert(o.getAltRowsBg());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setAltRowsBg :{
                $desc:"设置是否使用不同的背景色区分相邻的两行.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAltRowsBg(true); alert(o.getAltRowsBg());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getDirectInput:{
                $desc:"判断在编辑状态下的 Editor 是否用直接输入的方式（不需要用回车键来确认）输入.",
                $rtn:"Boolean"
            },
            setDirectInput:{
                $desc:"设置在编辑状态下的 Editor 是否用直接输入的方式（不需要用回车键来确认）输入.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getAnimCollapse :{
                $desc:"得到 Animate 属性",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setAnimCollapse :{
                $desc:"设置 Animate 属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getCell:{
                $desc:"由单元格id获取单元格对象.",
                $rtn:"Ojbect",
                $paras:[
                    "cellId : [必需参数] : String.",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ]
            },
            isDirtied:{
                $desc:"判断界面值已经被修改.",
                $rtn:"Boolean"
            },
            getCells:{
                $desc:"返回所有单元格的值.",
                $rtn:"Objcet. {cellId:{rowId:, colId:, value:, oValue:}}",
                $paras:[
                    "rowId : [可选参数] : String, 只返回本行的.",
                    "colId : [可选参数] : String, 只返回本列的.",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ]
            },
            getDirtied:{
                $desc:"返回所有被更改过的值.",
                $rtn:"Objcet. {cellId:{rowId:, colId:, value:, oValue:}}",
                $paras:[
                    "rowId : [可选参数] : String, 只返回本行的.",
                    "colId : [可选参数] : String, 只返回本列的."
                ]
            },
            getCellbyRowCol:{
                $desc:"获取单元格对象. 行id和列id由参数指定.",
                $rtn:"Ojbect",
                $paras:[
                    "rowId : [必需参数] : String, 行 id.",
                    "colId : [必需参数] : String, 列 id.",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ],
                $snippet:[
                    "var id='linb.temp.grid7.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "alert(o.getCellbyRowCol('row2','col2').value);"+
                    "}"
                ]
            },
            getColHidable:{
                $desc:"判断终端用户是否可手工隐藏列.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid8.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColHidable(true); alert(o.getColHidable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setColHidable :{
                $desc:"设置终端用户是否可手工隐藏列, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid9.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColHidable(true); alert(o.getColHidable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getColMovable :{
                $desc:"判断终端用户是否可手工移动列的相对位置.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(false); alert(o.getColMovable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setColMovable :{
                $desc:"设置终端用户是否可手工移动列的相对位置, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true); alert(o.getColMovable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getColResizer :{
                $desc:"判断终端用户是否可手工拖动列的宽度.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColResizer(false); alert(o.getColResizer());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setColResizer :{
                $desc:"设置端用户是否可手工拖动列的宽度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColResizer(true); alert(o.getColResizer());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getColSortable :{
                $desc:"判断终端用户是否可手工对列进行排序.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColSortable(false); alert(o.getColSortable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setColSortable :{
                $desc:"设置终端用户是否可手工对列进行排序, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColSortable(true); alert(o.getColSortable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getEditable :{
                $desc:"判断表格为只读或可写.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setEditable(false); alert(o.getEditable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setEditable :{
                $desc:"表格为只读或可写, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setEditable(true); alert(o.getEditable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getHeaderHeight :{
                $desc:"获取表头高度.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.grid16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setHeaderHeight(40); alert(o.getHeaderHeight());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setHeaderHeight :{
                $desc:"设置表头高度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setHeaderHeight(40); alert(o.getHeaderHeight());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getRowHandlerWidth :{
                $desc:"得到行手柄宽.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.grid16-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandlerWidth(40); alert(o.getRowHandlerWidth());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRowHandlerWidth :{
                $desc:"设置行手柄宽,并反映到界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid17-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandlerWidth(40); alert(o.getRowHandlerWidth());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getGridHandlerCaption :{
                $desc:"得到 grid 左上角的标题.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.grid16-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setGridHandlerCaption('tg'); alert(o.getGridHandlerCaption());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setGridHandlerCaption :{
                $desc:"设置 grid 左上角的标题.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid17-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setGridHandlerCaption('tg'); alert(o.getGridHandlerCaption());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getRowHeight :{
                $desc:"获取行高度.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.grid18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHeight(40); alert(o.getRowHeight());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRowHeight :{
                $desc:"设置行高度, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHeight(40); alert(o.getRowHeight());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getIniFold :{
                $desc:"判断表格在初始化是打开或收缩子行（用于带有子行的树形表格）",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setIniFold(false); alert(o.getIniFold());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setIniFold :{
                $desc:"设置表格在初始化是打开或收缩子行（用于带有子行的树形表格）, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setIniFold(true); alert(o.getIniFold());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getRowResizer :{
                $desc:"判断终端用户是否可以拖动改变行高.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowResizer(false); alert(o.getRowResizer());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRowResizer :{
                $desc:"设置终端用户是否可以拖动改变行高, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowResizer(true); alert(o.getRowResizer());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getRowHandler :{
                $desc:"判断行前是否带有用以拖动的行头.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid124'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandler(false); alert(o.getRowHandler());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRowHandler :{
                $desc:"设置行前是否带有用以拖动的行头, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid125'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandler(true); alert(o.getRowHandler());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getSelMode :{
                $desc:"获取表格的选择模式. 'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选, 'multibycheckbox'表示可多选,并且只能点击checkbox来选中.",
                $rtn:"String",
                $snippet:[
                    "var id='linb.temp.grid126'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setSelMode('none'); alert(o.getSelMode());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setSelMode :{
                $desc:"设置表格的选择模式 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none', 'single' or 'multi'. 默认为 'single'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid127'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setSelMode('multi'); alert(o.getSelMode());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getNoCtrlKey:{
                $desc:"获取是否在多选择模式下需要用Ctrl来辅助多选.",
                $rtn:"Boolean"
            },
            setNoCtrlKey:{
                $desc:"设置是否在多选择模式下需要用Ctrl来辅助多选.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            insertRows:{
                 $desc:"添加一组行.",
                 $rtn:"[self]",
                 $paras:[
                    "arr [必需参数] : Array, 行项目数组.",
                    "pid [可选参数] : String, 父行id.",
                    "base [可选参数] : String, 基准行id.",
                    "before [可选参数] : Boolean, 插入行在基准行之前或之后. 默认为 false;"
                 ],
                $snippet:[
                    "var id='linb.temp.grid128'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,iniFold:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.insertRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}],'row4',null,true)},1000);"+
                    "_.asyRun(function(){o.insertRows([{id : 'row_2',cells:['cell_2',1,true,'label1']}],'row4',null,false)},2000);"+
                    "_.asyRun(function(){o.insertRows([{id : 'row_3',cells:['cell_3',1,true,'label1']}],null,'row2',false)},3000);"+
                    "_.asyRun(function(){o.insertRows([{id : 'row_4',cells:['cell_4',1,true,'label1']}],null,'row2',true)},4000);"+
                    "}"
                ]
            },
            toggleRow:{
                $desc:"打开或折叠指定的行. 该函数只对带有子行的行有效.",
                $paras:[
                    "id [必需参数] : String, 节点id.",
                    "expend [可选参数] : Boolean, true为打开,false为折叠. 如果不制定本参数,展开的会折叠,折叠的会展开."
                ],
                $snippet:[
                    "var id='linb.temp.grid129'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.toggleRow('row4',true)},1000);"+
                    "}"
                ]
            },
            updateRow:{
                $desc:"更新指定行.",
                $rtn:"[self]",
                $paras:[
                    "rowId [必需参数] : String, 行id.",
                    "options [必需参数] : key/value Object, 需要更新的键值对."
                ],
                $snippet:[
                    "var id='linb.temp.grid130-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.updateRow('row1',{caption:'new row1',height:100,sub:[]})},1000);"+
                    "}"
                ]
            },
            updateCell:{
                $desc:"更新指定单元格.",
                $rtn:"[self]",
                $paras:[
                    "cellId [必需参数] : String, 单元格id.",
                    "options [必需参数] : key/value Object, 需要更新的键值对.",
                    "dirtyMark [可选参数] : Boolean, 是否启用脏标识.默认值是 [true]."
                ],
                $snippet:[
                    "var id='linb.temp.grid130'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.updateCell('c_a',{value:'a a a a'})},1000);"+
                    "}"
                ]
            },
            updateCellByRowCol:{
                $desc:"更新行id和列id的单元格.",
                $rtn:"[self]",
                $paras:[
                    "rowId [必需参数] : String, 单元格在的行id.",
                    "colId [必需参数] : String, 单元格在的列id.",
                    "hash [必需参数] : key/value Object, 需要更新的键值对.",
                    "dirtyMark [可选参数] : Boolean, 是否启用脏标识.默认值是 [true]."
                ],
                $snippet:[
                    "var id='linb.temp.grid131'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.updateCellByRowCol('row1','col1',{value:'b b b b'})},1000);"+
                    "}"
                ]
            },
            getActiveRow:{
                $desc:"得到当前的活动行.",
                $rtn:"Object",
                $snippet:[
                    "var id='linb.temp.grid1311'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setActiveRow('row1')},1000);"+
                    "_.asyRun(function(){alert(o.getActiveRow().id)},1500);"+
                    "}"
                ]
            },
            setActiveRow:{
                $desc:"设置当前的活动行.",
                $rtn:"[self]",
                $paras:[
                    "rowId [必须参数] : String, 行id."
                ],
                $snippet:[
                    "var id='linb.temp.grid1312'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setActiveRow('row1')},1000);"+
                    "_.asyRun(function(){alert(o.getActiveRow().id)},1500);"+
                    "}"
                ]
            },
            getActiveCell:{
                $desc:"得到当前的活动单元格.",
                $rtn:"Object",
                $snippet:[
                    "var id='linb.temp.grid1313'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative',activeMode:'cell'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setActiveCell('row1','col1')},1000);"+
                    "_.asyRun(function(){alert(o.getActiveCell().value)},1500);"+
                    "}"
                ]
            },
            setActiveCell:{
                $desc:"设置当前的活动单元格.",
                $rtn:"[self]",
                $paras:[
                    "rowId [必须参数] : String, 行id.",
                    "colId [必须参数] : String, 列id."
                ],
                $snippet:[
                    "var id='linb.temp.grid1314'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative',activeMode:'cell'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setActiveCell('row1','col1')},1000);"+
                    "_.asyRun(function(){alert(o.getActiveCell().value)},1500);"+
                    "}"
                ]
            },
            getRowDraggable :{
                $desc:"判断终端用户是否可以拖动行以改变行排序或父子关系",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid32'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowDraggable(false); alert(o.getRowDraggable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRowDraggable :{
                $desc:"设置终端用户是否可以拖动行以改变行排序或父子关系, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid33'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowDraggable(true); alert(o.getRowDraggable());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getRows :{
                $desc:"获取表格的所有行",
                $paras:[
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ],
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.grid32'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "_.asyRun(function(){o.setRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}]); alert(o.getRows().length); alert(_.serialize(o.getRows('data'))); alert(_.serialize(o.getRows('min')))});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRows :{
                $desc:"设置表格的所有行, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid33'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "_.asyRun(function(){o.setRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}]); alert(o.getRows().length)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getHeader :{
                $desc:"获取表头对象",
                $paras:[
                    "type [可选参数] : String, 'data': 得到列数据; 'min': 得到列的最简化数据; 其他值,得到内存中列的原数据."
                ],
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.grid34'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "_.asyRun(function(){alert(o.getHeader().length)});"+
                    "_.asyRun(function(){alert(_.serialize(o.getHeader('data')))});"+
                    "_.asyRun(function(){alert(_.serialize(o.getHeader('min')))});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setHeader :{
                $desc:"设置表头对象, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid35'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "_.asyRun(function(){alert(o.getHeader().length)});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getHeaderByColId:{
                $desc:"获取某个列的表头值.",
                $rtn:"Ojbect",
                $paras:[
                    "colId : [必需参数] : String, 列 id."
                ],
                $snippet:[
                    "var id='linb.temp.grid35-0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "_.asyRun(function(){alert(o.getHeaderByColId('col1').id)},1000);"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            updateHeader:{
                $desc:"更新某个列的表头值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列的id.",
                    "options [必需参数] : key/value Object, 需要更新的键值对."
                ],
                $snippet:[
                    "var id='linb.temp.grid35-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "_.asyRun(function(){o.updateHeader('col1',{caption:'updated',width:100})},1000);"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getRowByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取行对象.",
                $rtn:"Object, 行对象.",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)."
                ]
            },
            getHeaderByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取列头对象.",
                $rtn:"Object, 列头对象.",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)."
                ]
            },
            getCellByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取单元格对象.",
                $rtn:"Object, 单元格对象.",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)."
                ]
            },
            getRowbyRowId  :{
                $desc:"更新行id为指定值的行.",
                $rtn:"Object",
                $paras:[
                    "rowId [必需参数] : String.",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ],
                $snippet:[
                    "var id='linb.temp.grid36'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){alert(o.getRowbyRowId('row2'))});"+
                    "}"
                ]
            },
            getRowbyCell:{
                $desc:"根据一个单元格得到行对象.",
                $rtn:"Object",
                $paras:[
                    "cell [必需参数] : Object.",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ]
            },
            getHeaderByCell:{
                $desc:"根据一个单元格得到列对象.",
                $rtn:"Object",
                $paras:[
                    "cell [必需参数] : Object.",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ]
            },
            getHeaderbyCell:{
                $desc:"根据一个单元格得到列头对象.",
                $rtn:"Object",
                $paras:[
                    "cell [必需参数] : Object.",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据."
                ]
            },
            getSubNodeInGrid:{
                $desc:"获取grid的子节点.",
                $rtn:"linb.Dom",
                $paras:[
                    "key [必需参数] : String, 项标志符.",
                    "rowId [可选参数] : String 行id.",
                    "colId [可选参数] : String 列id."
                ],
                $snippet:[
                    "var id='linb.temp.grid36-0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){alert(o.getSubNodeInGrid('ROW').get().length)});"+
                    "_.asyRun(function(){alert(o.getSubNodeInGrid('ROW','row1').get().length)});"+
                    "_.asyRun(function(){alert(o.getSubNodeInGrid('CELL').get().length)});"+
                    "_.asyRun(function(){alert(o.getSubNodeInGrid('CELL','row1','col1').get().length)});"+
                    "}"
                ]
            },
            getRowNumbered :{
                $desc:"判断是否在行前显示行号",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid37'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowNumbered(true); alert(o.getRowNumbered());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setRowNumbered :{
                $desc:"设置是否在行前显示行号, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid38'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowNumbered(true); alert(o.getRowNumbered());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getShowHeader :{
                $desc:"判断是否显示表头",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.grid39'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setShowHeader(false); alert(o.getShowHeader());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            setShowHeader :{
                $desc:"设置是否显示表头, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ],
                $snippet:[
                    "var id='linb.temp.grid40'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setShowHeader(false); alert(o.getShowHeader());"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            getRowOptions:{
                $desc:"得到行的自定义属性.",
                $rtn:"Object"
            },
            setRowOptions :{
                $desc:"设置行的自定义属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getColOptions:{
                $desc:"得到列的自定义属性.",
                $rtn:"Object"
            },
            setColOptions:{
                $desc:"设置列的自定义属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getTreeMode:{
                $desc:"得到Grid是否在树状模式.",
                $rtn:"Boolean"
            },
            setTreeMode:{
                $desc:"设置Grid是否为树状模式.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getHotRowMode:{
                $desc:"得到Grid的[热行]模式.",
                $rtn:"String. 'none'[没有热行模式], 'auto'[热行自动显示或隐藏] 或 'show'[热行始终显示]."
            },
            setHotRowMode:{
                $desc:"设置Grid的[热行]模式.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 'none'[没有热行模式], 'auto'[热行自动显示或隐藏] 或 'show'[热行始终显示] 之一.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            getHotRowNumber:{
                $desc:"得到Grid[热行]的自定义行号.",
                $rtn:"String."
            },
            setHotRowNumber:{
                $desc:"设置Grid[热行]的自定义行号.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]."
                ]
            },
            resetGridValue:{
                $desc:"重新设置所有单元格的值, 并清除脏标志.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.grid41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.updateCellByRowCol('row1','col1',{value:'a'}).updateCellByRowCol('row1','col2',{value:5}).updateCellByRowCol('row2','col2',{value:8});"+
                    "_.asyRun(function(){o.resetGridValue()},1000);"+
                    "}"
                ]
            },
            resetColValue:{
                $desc:"重新设置某列的所有单元格的值, 并清除脏标志.",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列id值."
                ]
            },

            resetRowValue:{
                $desc:"重新设置某行的所有单元格的值, 并清除脏标志.",
                $rtn:"[self]",
                $paras:[
                    "rowId [必需参数] : String, 行id值."
                ],
                $snippet:[
                    "var id='linb.temp.grid41-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.updateCellByRowCol('row1','col1',{value:'a'}).updateCellByRowCol('row1','col2',{value:5}).updateCellByRowCol('row2','col2',{value:8});"+
                    "_.asyRun(function(){o.resetRowValue('row1')},1000);"+
                    "}"
                ]
            },
            showColumn :{
                $desc:"显示或隐藏指定的列.",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列id.",
                    "flag [可选参数] : Boolean, True为显示,false为隐藏. 默认为 true."
                ],
                $snippet:[
                    "var id='linb.temp.grid42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.showColumn('col1',false)},1000);"+
                    "_.asyRun(function(){o.showColumn('col1')},2000);"+
                    "}"
                ]
            },
            sortColumn:{
                $desc:"列排序.",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列id.",
                    "desc [可选参数] : Boolean, True为递降排序,false为递增排序. 不指定或null为当前排序的逆序.",
                    "sortby [可选参数] : Function, 排序函数. function(x,y){return 0|1|-1}" 
                ]
            },
            removeAllRows:{
                $desc:"去除所有行.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.grid43'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.removeAllRows()},1000);"+
                    "}"
                ]
            },
            removeRows:{
                $desc:"去除指定行.",
                $rtn:"[self]",
                $paras:[
                    "ids [必需参数] : String 或 Array, 行id, 或多个行id的数组."
                ],
                $snippet:[
                    "var id='linb.temp.grid44'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.removeRows(['row1','row2'])},1000);" +
                    "}"
                ]
            },
            addHotRow:{
                $desc:"加[热行](如果没有的话).",
                $rtn:"[self]"
            },
            removeHotRow:{
                $desc:"去除[热行].",
                $rtn:"[self]"
            },
            beforeCellActive:{
                $desc:"在单元格激活前被调用. 返回false将阻止单元格被激活.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : 单元格对象."
                ],
                $snippet:[
                    "var id='linb.temp.grid50'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('cell');"+
                    "linb(id).prepend(o);"+
                    "o.beforeCellActive(function(p,c){return false;});" +
                    "}"
                ]
            },
            beforeRowActive:{
                $desc:"在行激活前被调用. 返回false将阻止行被激活.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row : Object, 行对象."
                ],
                $snippet:[
                    "var id='linb.temp.grid51'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('row');"+
                    "linb(id).prepend(o);"+
                    "o.beforeRowActive(function(p,c){return false;});" +
                    "}"
                ]
            },
            afterCellActive:{
                $desc:"在单元格激活后被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : Object, 单元格对象."
                ],
                $snippet:[
                    "var id='linb.temp.grid52'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('cell');"+
                    "linb(id).prepend(o);"+
                    "o.afterCellActive(function(p,c){linb.message(c.value);});" +
                    "}"
                ]
            },
            afterCellFocused:{
                $desc:"在单元格或得焦点后被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : Object, 单元格对象.",
                    "row : Object, 单元格的行对象"
                ]
            },
            beforeIniEditor:{
                $desc:"在单元格编辑之前调用. 如果返回false,默认的功能会被禁止.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : Object, 单元格对象.",
                    "cellNode : linb.Dom, 单元格的Dom对象"
                ]
            },
            beforeInitHotRow:{
                $desc:"在Hot Row初始化之前调用.[当hotRowMode不为'none'] 如果返回false,默认的功能会被禁止.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : Object, 单元格对象.",
                    "row : Object, 单元格的行对象"
                ]
            },
            onInitHotRow:{
                $desc:"当[热行]需要数据初始化时调用, 需要返回初始化的行数据.",
                $paras:[
                    "profile : linb.UIProfile."
                ]
            },
            beforeHotRowAdded:{
                $desc:"在[热行]被加到Grid前调用. 如果返回[true], [热行]被加入; 如果返回[false],[热行]被删除; 如果返回cell，[热行]保留，并且cell获得焦点; 如果返回[null],没有影响.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row : Object. 行对象",
                    "leaveGrid : Booean. 是否触发事件的光标在Grid之外."
                ]
            },
            afterHotRowAdded:{
                $desc:"在[热行]被加到Grid后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row : Object. 行对象"
                ]
            },
            onRowDirtied:{
                $desc:"当行被改变后调用，[异步调用].",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row : Object. 行对象"
                ]
            },
            afterRowActive:{
                $desc:"在行被激活后被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row : Object, 行对象."
                ],
                $snippet:[
                    "var id='linb.temp.grid53'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('row');"+
                    "linb(id).prepend(o);"+
                    "o.afterRowActive(function(p,c){linb.message(c.id);});" +
                    "}"
                ]
            },
            beforeColMoved:{
                $desc:"在终端用户改变列位置前被调用. 返回false将阻止列位置被改变.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "colId : String, 被移动的列id.",
                    "toId : String, 基准列id,移动的列将放在该列之前."
                ],
                $snippet:[
                    "var id='linb.temp.grid54'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "linb(id).prepend(o);"+
                    "o.beforeColMoved(function(p,colId){if(colId=='col1')return false;});" +
                    "o.afterColMoved(function(p,colId,toId){linb.message(colId +' is moved to the the front of '+ toId)});" +
                    "}"
                ]
            },
            afterColMoved:{
                $desc:"在终端用户改变列位置后被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "colId : String, 被移动的列id.",
                    "toId : String, 基准列id,移动的列将放在该列之前."
                ],
                $snippet:[
                    "var id='linb.temp.grid55'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "linb(id).prepend(o);"+
                    "o.beforeColMoved(function(p,colId){if(colId=='col1')return false;});" +
                    "o.afterColMoved(function(p,colId,toId){linb.message(colId +' is moved to the the front of '+ toId)});" +
                    "}"
                ]
            },
            beforeColSorted:{
                $desc:"在对列排序前调用.返回false将阻止列排序.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "col : Object, 被排序的列."
                ]
            },
            afterColSorted:{
                $desc:"在对列排序后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "col : Object, 被排序的列."
                ]
            },
            beforeColShowHide:{
                $desc:"在显示或隐藏列前调用.返回false将阻止列显示或隐藏.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "colId : String, 被影响的列.",
                    "flag: Boolean, true->显示; false->隐藏"
                ]
            },
            afterColShowHide:{
                $desc:"在显示或隐藏列后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "colId : String, 被影响的列.",
                    "flag: Boolean, true->显示; false->隐藏"
                ]
            },
            beforeColResized:{
                $desc:"在从界面改变列宽度前调用，返回false表示阻止改变列宽.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "colId : String, 所影响的列id.",
                    "width: Number, 列宽"
                ]
            },
            afterColResized:{
                $desc:"在从界面改变列宽度后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "col : Object, 所影响的列id.",
                    "width: Number, 列宽"
                ]
            },
            beforeRowResized:{
                $desc:"在从界面改变行的高度前调用，返回false表示阻止改变行高.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "rowId : String, 所影响的行id.",
                    "height: Number, 高"
                ]
            },
            afterRowResized:{
                $desc:"在从界面改变行的高度后调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "rowId : String, 所影响的行id.",
                    "height: Number, 高"
                ]
            },
            beforeColDrag:{
                $desc:"在终端用户拖动列之前被调用. 返回false将阻止列拖动.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "colId : String, 列id."
                ],
                $snippet:[
                    "var id='linb.temp.grid56'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "linb(id).prepend(o);"+
                    "o.beforeColDrag(function(p,colId){if(colId=='col1')return false;});" +
                    "}",
                    "var id='linb.temp.grid57'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s; hash.header[0].colMovable=false; o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "linb(id).prepend(o);"+
                    "}"
               ],
                $memo:"Equals to set 'colMovable' to false in the specified column in header array."
            },

            onGetContent:{
                $desc:"在父行被展开,需要子行数据是被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row : Object, 父行对象.",
                    "callback : Function, 回调函数."
                ],
                $snippet:[
                    "var id='linb.temp.grid57'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;hash.rows[3].sub=hash.rows[4].sub=true;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.onGetContent(function(p,row){return row.id=='row4'?[['a',1,true,{type:'checkbox',value:true}]]:[['b',3,false,'#555555']];});" +
                    "}"
               ]
            },
            onRowSelected:{
                $desc:"在行被选择时被调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row: Object, 行对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid.",
                    "type: Number, 0:没有影响;1:行被选中;-1:行被清除选中"
                ],
                $snippet:[
                    "var id='linb.temp.grid58'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.onRowSelected(function(p,row){linb.message(row.id)});" +
                    "}"
               ]
            },
            onDblclickRow:{
                $desc:"在行被双击时调用.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "row: Object, 行对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.grid59'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.onDblclickRow(function(p,row){linb.message(row.id)});" +
                    "}"
               ]
            },
            beforeComboPop :{
                $desc:"当单元格按钮被单击时调用,只对单元格为'button/getter/popbox/cmdbox'时有效.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell: Object, cell 对象.",
                    "proEditor: linb.UIProfile, 编辑器的控件概要对象.",
                    "pos: Object, 鼠标位置.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.grid60'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;hash.header[0].type='button';hash.header[1].type='cmdbox';hash.header[2].type='popbox';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setEditable(true);"+
                    "linb(id).prepend(o);"+
                    "o.beforeComboPop(function(p,cell){linb.message(cell.value)});" +
                    "}"
               ]
            },
            onClickGridHandler:{
                $desc:"当点击列头和行头的共同区域时触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onClickCell:{
                $desc:"当点击一个cell(当cell不在编辑状态时)的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell: Object,  cell 对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.grid60-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;hash.header[0].type='button';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.onClickCell(function(p,cell){linb.message(cell.value)});" +
                    "}"
               ]
            },
            onDblclickCell:{
                $desc:"当双击一个cell(当cell不在编辑状态时)的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell: Object,  cell 对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.grid60-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;hash.header[0].type='button';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.onDblclickCell(function(p,cell){linb.message(cell.value)});" +
                    "}"
               ]
            },
           beforeIniEditorr: {
                $desc:"在单元格由展示状态变为编辑状态时调用(将编辑器附着在单元格上). 返回false或自定义编辑器会阻止默认的编辑器出现.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : Object, 单元格对象.",
                    "cellNode: linb.Dom, 单元格节点",
                    "pNode: linb.Dom, 编辑器的容器节点"
                ],
                $snippet:[
                    "var id='linb.temp.grid61-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:true,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.beforeIniEditor(function(p,cell){if(cell._col.id!='col2')return false;});" +
                    "}"
               ]
            },
            beforeCellUpdated: {
                $desc:"在单元格的值被终端用户更新前调用. 返回false将阻止单元格值被更新.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : Object,  cell 对象.",
                    "hash : Object, 将要更新的键值对."
                ],
                $snippet:[
                    "var id='linb.temp.grid61'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.beforeCellUpdated(function(){linb.message('Cant update cell!');return false;});" +
                    "_.asyRun(function(){o.updateCellByRowCol('row1','col1','abc')},1000);"+
                    "}"
               ]
            },
            afterCellUpdated: {
                $desc:"在单元格的值被终端用户更新后调用",
                $paras:[
                    "profile : linb.UIProfile.",
                    "cell : Object, 单元格对象.",
                    "hash : Object, 更新的键值对."
                ],
                $snippet:[
                    "var id='linb.temp.grid62'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                    "linb.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "linb(id).prepend(o);"+
                    "o.afterCellUpdated(function(p,cell,hash){linb.message('cell updated!');});" +
                    "_.asyRun(function(){o.updateCellByRowCol('row1','col1','abc')},1000);"+
                    "_.asyRun(function(){o.updateCellByRowCol('row1','col2',{type:'checkbox',value:false})},2000);"+
                    "}"
               ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","TimeLine"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.TimeLine 类",
        constructor:{
            $desc:"生成一个linb.UI.TimeLine对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            scrollToLeft:{
                $desc:"滚动时间线到最左边",
                $rtn:"Boolean",
                $paras:[
                    "callback [可选参数] : Function, 滚动完毕后要调用的回调函数."
                ]
            },
            scrollToRight:{
                $desc:"滚动时间线到最左边",
                $rtn:"Boolean",
                $paras:[
                    "callback [可选参数] : Function, 滚动完毕后要调用的回调函数."
                ]
            },
            getTaskMinSize:{
                $desc:"得到任务的最小显示大小",
                $rtn:"Nubmer"
            },
            setTaskMinSize:{
                $desc:"设置任务的最小显示大小",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $memo:"设置此项不会自动刷新界面,应该在界面显示以前调用."
            },
            getTimeRange:{
                $desc:"获取日程表当前显示的时间范围.",
                $rtn:"Array",
                $snippet:[
                    "var id='linb.temp.tl2-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){linb.message(o.getTimeRange())},1000);"+
                    "}"
                ]
            },
            addTasks:{
                $desc:"添加一组任务到日程表中.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 任务项目数组."
                ],
                $snippet:[
                    "var id='linb.temp.tl3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.addTasks([{id:'task1',caption:'task 1',from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }])},1000);"+
                    "}"
                ]
            },
            removeTasks:{
                $desc:"移除一组任务.",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 任务项目id数组."
                ],
                $snippet:[
                    "var id='linb.temp.tl3-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "o.addTasks([{id:'task1',caption:'task 1',from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }]);"+
                    "_.asyRun(function(){o.removeTasks(['task1'])},1000);"+
                    "}"
                ]
            },
            getCloseBtn:{
                $desc:"判断日程表是否带有[关闭]按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tl4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setCloseBtn(true);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            setCloseBtn:{
                $desc:"设置是否显示关闭按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setCloseBtn(true);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            getZoomable:{
                $desc:"判断是否可以缩放日程表视图",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tl4-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setZoomable(false);alert(o.getZoomable())},1000);"+
                    "}"
                ]
            },
            setZoomable:{
                $desc:"设置是否可以缩放日程表视图",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.tl4-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setZoomable(true);alert(o.getZoomable())},1000);"+
                    "}"
                ]
            },
            getIncrement:{
                $desc:"获取任务的增量,单位为像素(pixes).",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.tl4-3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setIncrement(30);alert(o.getIncrement())},1000);"+
                    "}"
                ]
            },
            setIncrement:{
                $desc:"设置任务的增量,单位为像素(pixes).",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.tl4-4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setIncrement(30);alert(o.getIncrement())},1000);"+
                    "}"
                ]
            },
            getTaskHeight:{
                $desc:"获取任务的显示高度.",
                $rtn:"Number",
                $snippet:[
                    "var id='linb.temp.tl4-5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setTaskHeight(36);alert(o.getTaskHeight())},1000);"+
                    "}"
                ]
            },
            setTaskHeight:{
                $desc:"设置任务的显示高度, 并刷新界面.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.tl4-6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setTaskHeight(36);alert(o.getTaskHeight())},1000);"+
                    "}"
                ]
            },
            getOptBtn:{
                $desc:"判断日程表是否带有选项按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setOptBtn(true);alert(o.getOptBtn())},1000);"+
                    "}"
                ]
            },
            setOptBtn:{
                $desc:"设置日程表是否带有选项按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setOptBtn(true);alert(o.getOptBtn())},1000);"+
                    "}"
                ]
            },
            getDateBtn:{
                $desc:"判断日程表是否带有日期选在按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setDateBtn(false);alert(o.getDateBtn())},1000);"+
                    "}"
                ]
            },
            setDateBtn:{
                $desc:"设置日程表是否带有日期选在按钮, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setDateBtn(false);alert(o.getDateBtn())},1000);"+
                    "}"
                ]
            },
            getDftTaskName:{
                $desc:"得到默认的任务名称",
                $rtn:"Boolean",
                $snippet:[
                    "var id='linb.temp.tl8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setDftTaskName('TASK');alert(o.getDftTaskName())},1000);"+
                    "_.asyRun(function(){o.addTasks([{from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }])},1500);"+
                    "}"
                ]
            },
            setDftTaskName:{
                $desc:"设置默认的任务名称, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setDftTaskName('TASK');alert(o.getDftTaskName())},1000);"+
                    "_.asyRun(function(){o.addTasks([{from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }])},1500);"+
                    "}"
                ]
            },
            getDateStart:{
                $desc:"获取开始时间",
                $rtn:'Ojbect, Date Object',
                $snippet:[
                    "var id='linb.temp.tl20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "alert(o.getDateStart());"+
                    "_.asyRun(function(){o.setDateStart(linb.Date.add(new Date,'d',1))},1000);"+
                    "}"
                ]
            },
            setDateStart:{
                $desc:"设置开始时间",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Date Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "alert(o.getDateStart());"+
                    "_.asyRun(function(){o.setDateStart(linb.Date.add(new Date,'d',1))},1000);"+
                    "}"
                ]
            },
            getMultiTasks:{
                $desc:"得到是否为多任务显示.",
                $rtn:'Boolean',
                $snippet:[
                    "var id='linb.temp.tl22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "alert(o.getMultiTasks());"+
                    "}"
                ]
            },
            setMultiTasks:{
                $desc:"设置是否为多任务显示.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Date Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "alert(o.getMultiTasks());"+
                    "_.asyRun(function(){o.setMultiTasks(true)},1000);"+
                    "}"
                ]
            },
            getMinDate:{
                $desc:"得到最小的时间.",
                $rtn:'Object, Date Ojbect',
                $snippet:[
                    "var id='linb.temp.tl24'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setMinDate(linb.Date.add(new Date,'d',-2));alert(o.getMinDate());},1000);"+
                    "}"
                ]
            },
            setMinDate:{
                $desc:"设置最小的时间.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Date Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "alert(o.getMinDate());"+
                    "_.asyRun(function(){o.setMinDate(linb.Date.add(new Date,'d',-2));alert(o.getMinDate());},1000);"+
                    "}"
                ]
            },
            getMaxDate:{
                $desc:"得到最大的时间.",
                $rtn:'Object, Date Ojbect',
                $snippet:[
                    "var id='linb.temp.tl26'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setMaxDate(linb.Date.add(new Date,'d',3));alert(o.getMaxDate());},1000);"+
                    "}"
                ]
            },
            setMaxDate:{
                $desc:"设置最大的时间.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Date Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl27'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setMaxDate(linb.Date.add(new Date,'d',3));alert(o.getMaxDate());},1000);"+
                    "}"
                ]
            },
            getReadonly:{
                $desc:"得到只读标识",
                $rtn:'Boolean',
                $snippet:[
                    "var id='linb.temp.tl28'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setReadonly(true);alert(o.getReadonly());},1000);"+
                    "}"
                ]
            },
            setReadonly:{
                $desc:"设置只读标识",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl29'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setReadonly(true);alert(o.getReadonly());},1000);"+
                    "}"
                ]
            },
            getShowTips:{
                $desc:"得到是否显示Tips栏",
                $rtn:'Boolean',
                $snippet:[
                    "var id='linb.temp.tl30'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setShowTips(false);alert(o.getShowTips());},1000);"+
                    "}"
                ]
            },
            setShowTips:{
                $desc:"设置是否显示Tips栏",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl31'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setShowTips(false);alert(o.getShowTips());},1000);"+
                    "}"
                ]
            },
            getShowBar:{
                $desc:"得到时候显示Bar",
                $rtn:'Boolean',
                $snippet:[
                    "var id='linb.temp.tl32'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setShowBar(false);alert(o.getShowBar());},1000);"+
                    "}"
                ]
            },
            setShowBar:{
                $desc:"设置是否显示Bar",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl33'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setShowBar(false);alert(o.getShowBar());},1000);"+
                    "}"
                ]
            },
            getShowBigLabel:{
                $desc:"得到是否显示大时间标签.",
                $rtn:'Boolean',
                $snippet:[
                    "var id='linb.temp.tl34'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setShowBigLabel(false);alert(o.getShowBigLabel());},1000);"+
                    "}"
                ]
            },
            setShowBigLabel:{
                $desc:"设置是否显示大时间标签.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl35'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setShowBigLabel(false);alert(o.getShowBigLabel());},1000);"+
                    "}"
                ]
            },
            getTimeSpanKey:{
                $desc:"得到时间段的键值.",
                $rtn:'String',
                $snippet:[
                    "var id='linb.temp.tl36'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setTimeSpanKey('1 w');alert(o.getTimeSpanKey());},1000);"+
                    "}"
                ]
            },
            setTimeSpanKey:{
                $desc:"设置时间段的键值.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, '10 ms','100 ms','1 s','10 s', '1 n','5 n', '10 n', '30 n', '1 h','2 h', '6 h', '1 d', '1 w', '15 d', '1 m', '1 q', '1 y', '1 de' or '1 c'.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl37'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setTimeSpanKey('1 w');alert(o.getTimeSpanKey());},1000);"+
                    "}"
                ]
            },
            getUnitPixs:{
                $desc:"得到最小单元的像素值.",
                $rtn:'Number',
                $snippet:[
                    "var id='linb.temp.tl38'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setUnitPixs(20);alert(o.getUnitPixs());},1000);"+
                    "}"
                ]
            },
            setUnitPixs:{
                $desc:"设置最小单元的像素值.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ],
                $snippet:[
                    "var id='linb.temp.tl39'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "_.asyRun(function(){o.setUnitPixs(36);alert(o.getUnitPixs());},1000);"+
                    "}"
                ]
            },
            visibleTask:{
                $desc:"让任务在Timeline中可见.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.tl41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative'});"+
                    "linb(id).prepend(o);"+
                    "o.setValue(linb.Date.add(new Date,'h',-3).getTime()+':'+linb.Date.add(new Date,'h',3).getTime());"+
                    "_.asyRun(function(){o.visibleTask();},1000);"+
                    "}"
                ],
                $memo:" 'visibleTask' is valid only when the 'multiTasks' is false."
            },
            iniContent:{
                $desc:"初始化TimeLine,加载任务.",
                $rtn:"[self]",
                $snippet:[
                    "var id='linb.temp.tl53-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative',multiTasks:true});"+
                    "linb(id).prepend(o);"+
                    "o.onGetContent(function(p,from,to,minMs,type){linb.message(from.getTime()+':'+to.getTime()+':'+minMs+':'+type);});"+
                    "_.asyRun(function(){o.iniContent()},1000);"+
                    "}"
                ]
            },

            beforeDragTask:{
                $desc:"在用户拖动任务前触发. 返回false可以阻止用户拖动.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "task : Object, 任务对象.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tl50-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative',closeBtn:true});"+
                    "linb(id).prepend(o);"+
                    "o.beforeDragTask(function(){return false;});"+
                    "}"
                ]
            },
            beforeClose:{
                $desc:"在关闭本控件之前触发,如果返回false,关闭动作会被取消.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tl50'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative',closeBtn:true});"+
                    "linb(id).prepend(o);"+
                    "o.beforeClose(function(){return false;});"+
                    "}"
                ]
            },
            onShowOptions :{
                $desc:"当鼠标单击选项按钮的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tl51'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative',optBtn:true});"+
                    "linb(id).prepend(o);"+
                    "o.onShowOptions(function(){alert('onShowOptions');});"+
                    "}"
                ]
            },
            onClickTask:{
                $desc:"当鼠标单击任务的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "task : Object, the task Object.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ],
                $snippet:[
                    "var id='linb.temp.tl52'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative',multiTasks:true});"+
                    "o.addTasks([{id:'task1',caption:'task 1',from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }]);"+
                    "linb(id).prepend(o);"+
                    "o.onClickTask(function(p,task){alert('onClick:'+task.id);});"+
                    "}"
                ]
            },
            onDblclickTask:{
                $desc:"当鼠标双击任务的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "task : Object, the task Object.",
                    "e : Event, DOM事件元素.",
                    "src: String, 事件所属DOM元素的linbid."
                ]
            },
            onGetContent:{
                $desc:"当TimeLine需要加入内容的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "from : Date, 开始时间.",
                    "to : Date, 结束时间",
                    "minMs : Number, 显示任务的最小毫秒数（忽略低于这个数的任务）.",
                    "type : String, 任务加入的位置：'left', 'right' or 'inner'.",
                    "callback : Function, 回调函数."
                ],
                $snippet:[
                    "var id='linb.temp.tl53'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new linb.UI.TimeLine({position:'relative',multiTasks:true});"+
                    "o.onGetContent(function(p,from,to,minMs,type){linb.message(from.getTime()+':'+to.getTime()+':'+minMs+':'+type);});"+
                    "linb(id).prepend(o);"+
                    "}"
                ]
            },
            beforeNewTask:{
                $desc:"在新加入任务之前触发. 如果返回false,任务不会被加入.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "task: Object, 任务对象."
                ]
            },
            beforeTaskUpdated:{
                $desc:"在任务更新之前触发. 如果返回false,任务不会被更新.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "task: Object, 任务对象.",
                    "from : Date, 任务开始时间.",
                    "to: Date, 任务结束时间."
                ]
            },
            onStartDateChanged:{
                $desc:"在开始时间改变的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "odate: Date, 改变之前的date.",
                    "date : Date, 改变之后的date."
                ]
            }
        }
    });

    _.set(linb.Locale,["cn","doc","linb","UI","Flash"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.Flash 类",
        constructor:{
            $desc:"生成一个linb.UI.Flash对象."
        },
        getFlashVersion:{
            $desc:"得到当前浏览器的Flash插件版本.",
            $rtn:"String"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getParameters:{
                $desc:"得到 Flash 的参数.",
                $rtn:'Object'
            },
            setParameters:{
                $desc:"设置  Flash 的参数.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFlashvars:{
                $desc:"得到 Flash 的变量.",
                $rtn:'Object'
            },
            setFlashvars:{
                $desc:"设置  Flash 的变量.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFlash:{
                $desc:"获取Flash对象",
                $rtn:"Object"
            },
            getSrc:{
                $desc:"获取Flash的src值",
                $rtn:"String"
            },
            setSrc:{
                $desc:"设置Flash的src值, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getCover:{
                $desc:"得到 Flash 上面是否覆盖了一个div.",
                $rtn:"Boolean"
            },
            setCover:{
                $desc:"设置 Flash 上面是否覆盖了一个div.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            refreshFlash:{
                $desc:"刷新Flash."
            }
        }
    });    
    
    _.set(linb.Locale,["cn","doc","linb","UI","FusionChartFree"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.FusionChartFree 类",
        constructor:{
            $desc:"生成一个linb.UI.FusionChartFree对象."
        },
        replaceSpecialChars:{
            $desc:"FusionChart需要的特殊字符替换函数.",
            $rtn:"String"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getFC_attrs:{
                $desc:"得到 FusionChart 的图表属性.",
                $rtn:'Object'
            },
            setFC_attrs:{
                $desc:"设置  FusionChart 的图表属性.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFC_eventHandler:{
                $desc:"得到FusionChart是否支持事件.",
                $rtn:'Boolean'
            },
            setFC_eventHandler:{
                $desc:"设置FusionChart是否支持事件, 并刷新界面.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFC_chartType:{
                $desc:"得到 FusionChart 的图表类型.",
                $rtn:'String'
            },
            setFC_chartType:{
                $desc:"设置 FusionChart 的图表类型,并刷新图表.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFC_data:{
                $desc:"得到 FusionChart 的json数据.",
                $rtn:'Object'
            },
            setFC_data:{
                $desc:"设置 FusionChart 的json数据, 并刷新图表.",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFC_demoDataPath:{
                $desc:"得到 FusionChart 的示例数据文件路径.",
                $rtn:'String'
            },
            setFC_demoDataPath:{
                $desc:"设置  FusionChart 的示例数据文件路径",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFC_labels:{
                $desc:"得到 FusionChart 的显示值定义.",
                $rtn:'Object'
            },
            setFC_labels:{
                $desc:"设置 FusionChart 的显示值定义",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            getFC_swfPath:{
                $desc:"得到 FusionChart 的swf文件路径.",
                $rtn:'String'
            },
            setFC_swfPath:{
                $desc:"设置 FusionChart 的swf文件路径",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String.",
                    "force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为[false]."
                ]
            },
            refreshChart:{
                $desc:"刷新 FusionChart."
            },
            setDataXML:{
                $desc:"设置xml到 FusionChart.",
                $paras:[
                    "xml: String, xml 字符串."
                ]
            },
            onFC_Click:{
                $desc:"在点击 FusionChart 链接的时候触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "args: Object, 事件的具体参数."
                ]
            },
            onFC_PrepareXML:{
                $desc:"在设置xml数据到 FusionChart 之前触发,可以用来自定义xml格式.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "json: Object, json数据.",
                    "callback : Function , 回调函数 [fun](xml)."
                ]
            },
            onFC_SetXML:{
                $desc:"在设置xml数据到 FusionChart 之后前触发.",
                $paras:[
                    "profile : linb.UIProfile.",
                    "xml: String, xml 字符串."
                ]
            }
        }
    });
    
    _.set(linb.Locale,["cn","doc","linb","UI","FusionChart3"], {
        KEY:{$desc:"本类名"},
        $desc:"linb.UI.FusionChart3 类",
        constructor:{
            $desc:"生成一个linb.UI.FusionChart3对象."
        },
        prototype:{
            KEY:{$desc:"本类名"},
            hasRendered:{
                $desc:"是否 FusionChart 已经渲染完毕.",
                $rtn:"Boolean"
            },
            getXML:{
                $desc:"得到 FusionChart 的 xml 数据.",
                $rtn:"String"
            },
            getDataAsCSV :{
                $desc:"得到 FusionChart 的 CSV 数据.",
                $rtn:"String"
            },
            getChartAttribute:{
                $desc:"得到 FusionChart 的属性.",
                $rtn:"Object",
                $paras:[
                    " attrName: String, 属性名字符串."
                ]
            },
            callFCFunction:{
                $desc:"调用 FusionChart 的内部函数.",
                $rtn:"Object",
                $paras:[
                    "funName: String, 函数名字.",
                    "funArgs: Array, 函数参数."
                ]
            },
            print:{
                $desc:"打印 FusionChart."
            },
            setDataURL:{
                $desc:"设置数据源的 URL 到 FusionChart.",
                $paras:[
                    " strDataURL: String, 字符串."
                ]
            },
            setDataXML:{
                $desc:"设置xml到 FusionChart.",
                $paras:[
                    "xml: String, xml 字符串."
                ]
            },
            onFC_DataLoadError:{
                $desc:"FusionChart 的 DataLoadError 事件."
            },
            onFC_DataLoaded:{
                $desc:"FusionChart 的 DataLoaded 事件."
            },
            onFC_DataXMLInvalid:{
                $desc:"FusionChart 的 DataXMLInvalid 事件."
            },
            onFC_Loaded:{
                $desc:"FusionChart 的 Loaded 事件."
            },
            onFC_NoDataToDisplay:{
                $desc:"FusionChart 的 NoDataToDisplay 事件."
            },
            onFC_Rendered:{
                $desc:"FusionChart 的 Rendered 事件."
            }
        }
    });
})();

