 {
     header: [
        {
            "id" : "col1",
            "caption" : "From",
            "type" : "input",
            "width" : 150
        },
        {
            "id" : "col4",
            "caption" : "Subject",
            "type" : "input",
            "width" : 450
        },
        {
            "id" : "col2",
            "caption" : "Size(kb)",
            "type" : "number",
            "format":"^-?\\d\\d*$",
            "width" : 80
        },
        {
            "id" : "col3",
            "caption" : "Importance",
            "type" : "checkbox",
            "width" : 50
        }
    ],
    rows: [
        {
            "id" : "row1",
            "cells" : ["Mitchell@sigmawidgets.com","Join us to have a nice party!",50,false],
            "mailbody" : ""
        },
        {
            "id" : "row2",
            "cells" : ["Betty@sigmawidgets.com","Merry Christmas and Happy New Year",20,true]
        },
        {
            "id" : "row5",
            "cells" : ["Anny@sigmawidgets.com","the following emails are all from Any",0,false],
            "sub" : [
                {
                    "id" : "row6",
                    "cells" : ["Anny@sigmawidgets.com","Merry Christmas",30,false]
                },
                {
                    "id" : "row7",
                    "cells" : ["Anny@sigmawidgets.com","Promotions - Coupon inside",12,true]
                },
                {
                    "id" : "row8",
                    "cells" : ["Anny@sigmawidgets.com","Have a nice day",15,false]
                }
            ]
        }
    ]
}