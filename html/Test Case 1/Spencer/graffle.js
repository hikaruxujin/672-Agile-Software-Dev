Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (
                ((i != 3 && j != 6) || p[i].x < p[j].x) && 
                ((i != 2 && j != 7) || p[i].x > p[j].x) && 
                ((i != 0 && j != 5) || p[i].y > p[j].y) && 
                ((i != 1 && j != 4) || p[i].y < p[j].y))) 
            {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

var el,onstart, onmove, onend, r;
window.onload = function () {
    onstart = function () {
        if (this.type == 'rect' || this.type == 'text') {
            this.ox = this.attr('x');
            this.oy = this.attr('y');
        } else {
            this.ox = this.attr('cx');
            this.oy = this.attr('cy');
        }
        if (this.type!='text') this.animate({"fill-opacity": .2}, 500);
    };
    onmove = function (dx, dy) {
        var c = $('#canvas'),
            w2 = this.type=='rect' || this.type == 'text' ? this.attr('width')/2 : this.attr('rx'),
            h2 = this.type=='rect' || this.type == 'text' ? this.attr('height')/2 : this.attr('ry'),
            x = Math.min(Math.max(this.ox+dx,w2),c.width()-w2),
            y = Math.min(Math.max(this.oy+dy,h2),c.height()-h2),
            att = this.type == "rect" || this.type == 'text'
                ? {  x: x-w2,  y: y-h2 } 
                : { cx: x, cy: y };
        this.attr(att);
		var att2 = { x: x, y: y};
		this.data("text").attr(att2);
        for (var i = connections.length; i--;) {
            r.connection(connections[i]);
        }
        r.safari();
        $('#json').html(print($.parseJSON(r.toJSON()),5));
        $('#svg').html($('#canvas').html().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    };
    onend = function () {
        if (this.type!='text') this.animate({"fill-opacity": 0}, 500);
    };
    r = Raphael("canvas", $('#canvas').css('width'), $('#canvas').css('height'));
    var connections = [],
        shapes = [  r.rect(290, 80, 60, 40, 10),
                    r.ellipse(190, 100, 30, 20),
                    r.rect(290, 180, 60, 40, 2),
                    r.ellipse(450, 100, 20, 20)],
        colors = [ '#c0c' , '#f00' , '#0f0' , '#00f' ];
    for (var i = 0, ii = shapes.length; i < ii; i++) {
        var color =  colors[i]; //Raphael.getColor();
        shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
        shapes[i].drag(onmove, onstart, onend);
    }
    connections.push(r.connection(shapes[0], shapes[1], "#f00"));
    connections.push(r.connection(shapes[0], shapes[2], "#0f0"));
    connections.push(r.connection(shapes[0], shapes[3], "#00f"));
    
    // Set Testing
    /*
    var set = r.set();
    set.push(r.rect(10, 10, 60, 40, 2).attr({fill:'#fff'}));
    set.push(r.text(40, 28, "Hello").attr({'font-size':12}));
    set.drag(onmove, onstart, onend);
    set.attr('cursor','move');
    */
    
    $(window).resize(function(){r.setSize($('#canvas').css('width'),$('#canvas').css('height'))});
};

var print = function(o,r,t){
    if (t==undefined) t=0;
    var s=''; var z='&nbsp;&nbsp;&nbsp;'
    for (var p in o) {
        var i;
        switch (typeof o[p]) {
            case 'object': 
                for (i=0;i<t;i++) s+=z;
                s+=p+': '; //+o[p];
                if (r>0) { 
                    s+=' {<br>'+print(o[p],r-1,t+1);
                    for (i=0;i<t;i++) s+=z;
                    s+='}'; 
                } else s+='<i>object</i>'; 
                s+='<br>';
                break;
            case 'function':
                for (i=0;i<t;i++) s+=z;
                s+=p+': <i>function</i><br>';
                break;
            default:
                if ($.inArray(p,['innerHTML','outerHTML'])==-1) {
                    for (i=0;i<t;i++) s+=z;
                    s+=p+': '+o[p]+'<br>';
                }
        }
    }
    return s;
}

