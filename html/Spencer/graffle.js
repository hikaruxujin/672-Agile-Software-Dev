/***************************
 **        TESTING        **
 ***************************/
 
var svgo, hotkeys=true;
$(function() { 
    svgo = new svg('canvas'); 
    $(window).resize(function(){svgo.resize()});
    $(document).keypress(function(event){
        //$('#console').append(event.keyCode+' ');
        if (event.keyCode==104) {
            hotkeys=!hotkeys;
            $('#hotkeys').css('color',hotkeys?'#000':'#aaa')
        }
        if (hotkeys) {
            switch (event.keyCode) {
                case 49:  /* 1 */ $('#shapes').val('rect'); break;
                case 50:  /* 2 */ $('#shapes').val('rrect'); break;
                case 51:  /* 3 */ $('#shapes').val('circle'); break;
                case 52:  /* 4 */ $('#shapes').val('ellipse'); break;
                case 99:  /* C */ svgo.connectShapes(); break;
                case 100: /* D */ svgo.deselect(); break;
                case 106: /* J */ $('#console').html(svgo.toJSON()); break;
                case 110: /* N */ svgo.addShape($('#shapes').val()); break;
                case 114: /* R */ svgo.removeShape(); break;
                case 116: /* T */ svgo.setShapeText(); break;
                case 120: /* X */ next();
            }
        }
    });
});

function create(ft) {
    svgo.addShape($('#shapes').val());
}
function update() {
    svgo.setShapeText();
}
function remove() {
    svgo.removeShape();
}
function connect() {
    svgo.connectShapes();
}
function tojson() {
    $('#console').html(svgo.toJSON());
}
function next() {
    var nodes=svgo.graph.nodes, next=0;
    if (svgo.graph.selected) {
        $.each(nodes,function(i,e) {
            if (e.node.id==svgo.graph.selected.node.id) next=i+1;
        });
    }
    if (next>=nodes.length) next=0;
    svgo.select(nodes[next]);
}


/* Connection Function
 * Takes in two objects and creates a path between them.
 * Taken from Raphael Demo http://raphaeljs.com/graffle.html
 * 
 * obj1 Raphael element
 * obj2 Raphael element
 * line string path color
 * bg string path background color
 */

Raphael.fn.connection = function (obj1, obj2, line, bg) {

    // Updating Line
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    // Build Path
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [
            {x: bb1.x + bb1.width / 2,  y: bb1.y - 1},
            {x: bb1.x + bb1.width / 2,  y: bb1.y + bb1.height + 1},
            {x: bb1.x - 1,              y: bb1.y + bb1.height / 2},
            {x: bb1.x + bb1.width + 1,  y: bb1.y + bb1.height / 2},
            {x: bb2.x + bb2.width / 2,  y: bb2.y - 1},
            {x: bb2.x + bb2.width / 2,  y: bb2.y + bb2.height + 1},
            {x: bb2.x - 1,              y: bb2.y + bb2.height / 2},
            {x: bb2.x + bb2.width + 1,  y: bb2.y + bb2.height / 2}
        ],
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
        // Update Line
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        // Create New Line
        var color = typeof line == "string" ? line : "#000";
        var patho = this.path(path)
            .attr({stroke:color, fill:"none", 
                "stroke-width":$('#strokewidth').val(),
                "arrow-end":$('#type').val()+'-'+$('#size').val()+'-'+$('#size').val()})
            .data({source:obj1.node.id,target:obj2.node.id});
        return {
            bg: bg && bg.split && this.path(path)
                .attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: patho,
            from: obj1,
            to: obj2
        };
    }
};


// Element Event Handlers
var onmoused = function () {
        // Get Selected
        var selected = this.svg.graph.selected;
        if (selected===null) {
            
            // Set new selected
            selected = this.attr({stroke:'#faa', "stroke-width":2});
            // if (selected.text) selected.text.attr({fill:'#aaa'});
            selected.freeTransform.showHandles();
            this.svg.graph.selected = selected;
        
        } else if (this.node.id!==selected.node.id) {
            if (this.svg.connect) {
                
                // Connection
                var edges = this.svg.graph.edges, exists=false, that=this;
                $.each(edges, function(i,e) {
                    if ((e.line.data('source')==that.node.id && e.line.data('target')==selected.node.id) ||
                        (e.line.data('source')==selected.node.id && e.line.data('target')==that.node.id)) {
                        exists=true;
                    }
                });
                if (!exists) {
                    var edge = this.svg.paper.connection(selected,this,'#000');
                    this.svg.graph.edges.push(edge);
                }            
            } else {   
                
                // Return previous selected to normal
                selected.attr({stroke:'#aaa', "stroke-width":1});
                selected.freeTransform.hideHandles();
                
                // Set new selected
                selected = this.attr({stroke:'#faa', "stroke-width":2});
                selected.freeTransform.showHandles();
                this.svg.graph.selected = selected;
            }
        }
    },
    ftcallback = function (ft, event) {
        switch (event[0]) {
            case 'drag start':
                // Animate to active
                ft.subject.animate({"fill-opacity":.8,fill:"#fdd"}, 500);
                break;
            case 'drag end':
                // Animate to normal
                ft.subject.animate({"fill-opacity":.5,fill:"#ddf"}, 500);
                break;
            case 'drag':
                // Move Text
                if (ft.subject.text) {
                    xy = ft.subject.svg.getXY(ft.subject);
                    $('#svg').html(xy.x+' '+xy.y);
                    ft.subject.text.attr(xy);
                }
                // Redraw Connections
                var edges = ft.subject.svg.graph.edges;
                var paper = ft.subject.svg.paper;
                $.each(edges, function(i,edge) {
                    paper.connection(edges[i]);
                });
                // Handle rendering bug in Safari
                paper.safari();
        }
    };

// SVG Object
function svg(canvasid) {
    
    // Canvas ID String
    this.canvasid = canvasid;
    
    // Canvas jQuery Object 
    this.canvas = $('#'+canvasid);
    
    // Raphael Canvas
    this.paper = Raphael(
        this.canvasid,
        this.canvas.width(), 
        this.canvas.height()
    );
    
    // Graph
    this.graph = { 
        nextid:1,
        selected:null,
        nodes:[],
        edges:[]
    };
    
    // Add Shape
    this.addShape = function(shape) {
        var x = this.canvas.width() / 2;
        var y = this.canvas.height() / 2;
        var element;
        switch (shape) {
            case "circle":
                element = this.paper.circle(x,y,30);
                break;
            case "ellipse":
                element = this.paper.ellipse(x,y,50,30);
                break;
            case "rect":
                element = this.paper.rect(x-50,y-30,100,60);
                break;
            case "rrect": // Rounded Rectangle
                element = this.paper.rect(x-50,y-30,100,60,10);
                break;
        }
        
        // Defaults
        element.attr({
            fill:"#ddf", 
            stroke:"#aaa", 
            "fill-opacity":.5, 
            "stroke-width":1, 
            cursor:"move"
        });
        element.node.id = this.graph.nextid++;
        element.svg = this;
        element.mousedown(onmoused);
        this.graph.nodes.push(element);
        
        // Free Transform
        this.paper.freeTransform(
            element,
            {
                attrs: { fill:'#fff', stroke:'#000' }, 
                boundary: this.getBoundary(element),
                distance:1.5, 
                drag:true,
                rotate:false,
                scale:true,
                scaleRange:[.5,1.5],
                //showBBox:true,
                size:4, 
            },
            ftcallback
        );
    };
    
    // Set Shape Text 
    this.setShapeText = function() {
        if (this.graph.selected) {
            var obj = this.graph.selected, value = "";
            if (obj.text!==undefined) {
                value = obj.text.attr('text');
            }
            value = prompt("Enter value for the selected object.",value);
            if (value) {
                var xy = obj.svg.getXY(obj);
                if (obj.text==undefined) {
                    // No existing text object, must create it
                    obj.text = this.paper.text(xy.x,xy.y,value)
                        .attr({'font-family':'Helvetica','font-size':'14px'});
                } else {
                    // Update Text
                    obj.text.attr({text:value,x:xy.x,y:xy.y});
                }
                // Resize Shape
                var bbox = obj.text.getBBox();
                objatt = {
                    width : Math.max(bbox.width+10,obj.attr('width')),
                    height : Math.max(bbox.height,obj.attr('height'))
                };
                objatt.x = obj.attr('x')-((objatt.width-obj.attr('width'))/2);
                obj.attr(objatt);
            }
        } else {
            alert("No object is selected.");
        }
    }
    
    // Remove Shape
    this.removeShape = function() {
        if (this.graph.selected) {
            var selected = this.graph.selected;
            // Remove FreeTransform
            selected.freeTransform.unplug();
            // Remove Text
            if (selected.text) selected.text.remove();
            // Remove Edges
            var edges = this.graph.edges, saved = [];
            $.each(edges,function(i,e) {
                if (e.line.data('source')==selected.node.id ||
                    e.line.data('target')==selected.node.id) {
                    e.line.remove();
                } else {
                    saved.push(e);
                }
            });
            this.graph.edges = saved;
            // Remove from Node list
            var nodes = this.graph.nodes, saved = [];
            $.each(nodes,function(i,e) {
                if (e.node.id!=selected.node.id) {
                    saved.push(e);
                }
            });
            this.graph.nodes = saved;
            // Finally, Remove Element
            selected.remove();
            this.graph.selected = null;
        }
    }
    
    // Connect Shapes
    this.connect = false;
    this.connectShapes = function() {
        if (this.graph.selected===null) {
            $('#tip').html('You must first select a node.');
        } else if (this.connect) {
            this.connect = false;
            $('#tip').html('');
        } else {
            this.connect = true;
            $('#tip').html('Select nodes to connect.');
        }
    }
    
    // Select
    this.select = function(element) {
        if (this.graph.selected!==null) this.deselect();
        this.graph.selected = element.attr({stroke:'#faa', "stroke-width":2});
        this.graph.selected.freeTransform.showHandles();
        this.graph.selected = selected;
    }
    
    // Deselect
    this.deselect = function() {
        // Return previous selected to normal
        this.graph.selected.attr({stroke:'#aaa', "stroke-width":1});
        this.graph.selected.freeTransform.hideHandles();
        this.graph.selected = null;
    }
    
    // Get Coordinates for center of object
    this.getXY = function(element) {
        var bbox = element.getBBox();
        return { 
            x: bbox.x + (bbox.width  / 2), 
            y: bbox.y + (bbox.height / 2)
        };
    }
    
    // Get Boundaries for object
    this.getBoundary = function(element) {
        var cw = this.canvas.width(), ch = this.canvas.height();
        switch (element.type) {
            case "circle": 
                var r = element.attr('r');
                return { x : r, y : r, width : cw - 2*r, height : ch - 2*r }; 
            case "ellipse": 
                var rx = element.attr('rx'), ry = element.attr('ry');
                return { x : rx, y : ry, width : cw - 2*rx, height : ch - 2*ry };
            case "rect": 
            default: 
                var w = element.attr('width'), h = element.attr('height');
                return { x : w/2, y : h/2, width : cw-w, height : ch-h };
        }
    }
    
    // Resize Canvas on Window Resize
    this.resize = function() {
        // Set Size of Canvas
        this.paper.setSize(this.canvas.width(), this.canvas.height());
        // Update Bounding Boxes
        var that = this;
        $.each(this.graph.nodes,function(i,e) {
            e.freeTransform.setOpts({boundary:that.getBoundary(e)});
        });
    }
    
    // to JSON
    this.toJSON = function() {
        return this.paper.toJSON();
    }
}

// $('#json').html(r.toJSON());
// $('#svg').html($('#canvas').html().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
