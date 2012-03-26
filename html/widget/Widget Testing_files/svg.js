/***************************
 **        TESTING        **
 ***************************
 
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
                case 49:  /* 1 * $('#shapes').val('rect'); break;
                case 50:  /* 2 * $('#shapes').val('rrect'); break;
                case 51:  /* 3 * $('#shapes').val('circle'); break;
                case 52:  /* 4 * $('#shapes').val('ellipse'); break;
                case 99:  /* C * svgo.connectShapes(); break;
                case 100: /* D * svgo.deselect(); break;
                case 106: /* J * $('#console').html(svgo.toJSON()); break;
                case 110: /* N * svgo.addShape($('#shapes').val()); break;
                case 114: /* R * svgo.removeShape(); break;
                case 116: /* T * svgo.setShapeText(); break;
                case 120: /* X * next();
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
*/

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
            .data({source:obj1.group.node.id,target:obj2.group.node.id});
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
var ondragdown = function(){
        
        // Animate to Active
        this.group.shape.animate({"fill-opacity":.8,fill:"#fdd"}, 500);

        // Get Selected
        var selected = this.group.svg.graph.selected;
        if (selected===null) {
            // Set new selected
            this.group.svg.select(this.group);
        } else if (this.group.node.id!==selected.node.id) {
            if (this.group.svg.connect) {
                // Connection
                var edges = this.group.svg.graph.edges, exists=false, that=this.group;
                $.each(edges, function(i,e) {
                    if ((e.line.data('source')==that.node.id && e.line.data('target')==selected.node.id) ||
                        (e.line.data('source')==selected.node.id && e.line.data('target')==that.node.id)) {
                        exists=true;
                    }
                });
                if (!exists) {
                    var edge = this.group.svg.paper.connection(selected.shape,this.group.shape,'#000');
                    this.group.svg.graph.edges.push(edge);
                }           
            } else { 
                // Return previous selected to normal
                this.group.svg.deselect();               
                // Set new selected
                this.group.svg.select(this.group);
            }
        }
        
        // Save original position for impending movement
        this.group.ox = this.group.x;
        this.group.oy = this.group.y;
    },
    ondragmove = function (dx, dy) {
        // Set new position relative to original
        
        var canvas = this.group.svg.canvas;
        var bbox = this.group.getBBox();
        var x = this.group.ox + dx;
        var y = this.group.oy + dy;
        x = Math.min(Math.max(x,bbox.width/2),canvas.width()-bbox.width/2);
        y = Math.min(Math.max(y,bbox.height/2),canvas.height()-bbox.height/2);

        this.group.setPosition(x, y);
        // Redraw connections
        var edges = this.group.svg.graph.edges;
        var paper = this.group.svg.paper;
        $.each(edges, function(i,edge) {
            paper.connection(edges[i]);
        });
    },
    ondragup = function () {
        // Animate to normal
        this.group.shape.animate({"fill-opacity":.5,fill:"#ddf"}, 500);
    };
    

// SVG Object
function svg(canvasid,tipid) {

    // Canvas ID String
    this.canvasid = canvasid;
    this.tipid = '#'+tipid;
    
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
        nodes:{},
        edges:[]
    };
    
    // Add Shape
    this.addShape = function(shape) {
        var x = this.canvas.width() / 2;
        var y = this.canvas.height() / 2;
        var element;
        switch (shape) {
            case "circle":
                element = this.paper.circle(0,0,30);
                break;
            case "ellipse":
                element = this.paper.ellipse(0,0,50,30);
                break;
            case "rect":
                element = this.paper.rect(-50,-30,100,60);
                break;
            case "rrect": // Rounded Rectangle
                element = this.paper.rect(-50,-30,100,60,10);
                break;
        }
        var textElement = this.paper.text(0, 0, "");
        
        // Defaults
        element.attr({
            fill:"#ddf", 
            stroke:"#aaa", 
            "fill-opacity":.5, 
            "stroke-width":1, 
            cursor:"move"
        });
        textElement.attr({'font-family':'Helvetica','font-size':'14px'});
        
        var group = this.paper.set();
        group.push(element);
        group.push(textElement);
        group.forEach(function(elem){
            elem.group = group;
            // Assign each element the node id for json export?
        });
        
        // Group pointers and functions
        group.shape = element;
        group.text = textElement;
        group.node = {id:this.graph.nextid++}; // Null reference to group.node here
        group.svg = this;
        group.drag(ondragmove, ondragdown, ondragup);
        group.setPosition = function(x, y){
            this.x = x;
            this.y = y;
            this.transform("t"+this.x+","+this.y);
            //this.paper.safari(); // Handle rendering bug in Safari
        };
        group.setText = function(text) {
            // Update
            this.text.attr('text',text);
            var bbox = this.text.getBBox();
            objatt = {
                width : Math.max(bbox.width+10, this.getBBox().width),
                height : Math.max(bbox.height,this.shape.attr('height'))
            };
            objatt.x = this.shape.attr('x')-((objatt.width-this.shape.attr('width'))/2);
            this.shape.attr(objatt);
        }
        group.setPosition(x,y);// Consider placing shapes relative to 0 so this is more useful
        //this.graph.nodes.push(group);
        this.graph.nodes[group.node.id] = group;
        
        // Return Group
        return group;
    };
    
    // Set Shape Text 
    this.setShapeText = function() {
        if (this.graph.selected) {
            var obj = this.graph.selected, value = obj.text.attr('text');
            value = prompt("Enter value for the selected object.",value);
            if (value) {
                // Update Text
                obj.text.attr({text:value});
                // Resize Shape if necessary
                var bbox = obj.text.getBBox();
                objatt = {
                    width : Math.max(bbox.width+10, obj.getBBox().width),
                    height : Math.max(bbox.height,obj.shape.attr('height'))
                };
                objatt.x = obj.shape.attr('x')-((objatt.width-obj.shape.attr('width'))/2);
                obj.shape.attr(objatt);
            }
        } else {
            alert("No object is selected.");
        }
    }
    
    // Remove Shape
    this.removeShape = function(all) {
        if (all===true) {
            // Clear Nodes
            $.each(this.graph.nodes,function(i,node) {node.remove();});
            // Clear Edges
            $.each(this.graph.edges,function(i,edge) {edge.line.remove();});
            // Clear Graph
            this.graph = {nextid:1,selected:null,nodes:[],edges:[]};
        } else if (this.graph.selected) {
            var selected = this.graph.selected;
            // Remove Edges
            var edges = this.graph.edges, saved = [];
            $.each(edges,function(i,e) {
                if (e.line.data('source')==selected.node.id ||
                    e.line.data('target')==selected.node.id) {
                    e.line.remove();
                } else { saved.push(e); }
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
            // Finally, remove the group
            selected.remove();
            this.graph.selected = null;
        }
    }
    
    // Connect Shapes
    this.connect = false;
    this.connectShapes = function() {
        if (this.graph.selected===null) {
            $(this.tipid).html('You must first select a node.');
        } else if (this.connect) {
            this.connect = false;
            $(this.tipid).html('');
        } else {
            this.connect = true;
            $(this.tipid).html('Select nodes to connect.');
        }
    }
    
    // Next
    this.nextShape = function() {
        var nodes = this.graph.nodes, next=0,
            selected = this.graph.selected;
        if (this.graph.selected) {
            $.each(nodes,function(i,e) {
                if (e.node.id==selected.node.id) next=i+1;
            });
        }
        if (next>=nodes.length) next=0;
        this.select(nodes[next]);
    }
    
    // Select
    this.select = function(group) {
        if (this.graph.selected!==null) this.deselect();
        group.shape.attr({stroke:'#faa', "stroke-width":2});
        this.graph.selected = group;
    }
    
    // Deselect
    this.deselect = function() {
        // Return previous selected to normal
        this.graph.selected.shape.attr({stroke:'#aaa', "stroke-width":1});
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
        var nodes = new Array;
        var edges = new Array;
        
        $.each(this.graph.nodes,function(i,n) {
            var attrs = {
                id:     n.node.id,
                type:   n.shape.type,
                x:      n.x,
                y:      n.y,
                text:   n.text.attr('text'),
            };
            nodes.push(attrs);
        });
        
        $.each(this.graph.edges,function(i,e) {
            var attrs = {
                source: e.line.data('source'),
                target: e.line.data('target'),
                type:   "undirected",
            };
            edges.push(attrs);
        });
        
        return '{"nodes":'+JSON.stringify(nodes)
            +',"edges":'+JSON.stringify(edges)+'}';
    }
    
    // from JSON
    this.fromJSON = function(json) {
        this.removeShape(true);
        alert("cleared canvas");
        try {
            json = $.parseJSON(json);
            var group, that=this;
            $.each(json.nodes,function(i,e) {
                group = that.addShape(e.type);
                group.setPosition(e.x,e.y);
                group.setText(e.text);
            });
            $.each(json.edges,function(i,e) {
                that.graph.edges.push(
                    that.paper.connection(
                        that.graph.nodes[e.source].shape,
                        that.graph.nodes[e.target].shape,
                        '#000'
                    ));
            });
        } catch (e) {
            alert(e.message);
        }
    }
}

// $('#json').html(r.toJSON());
// $('#svg').html($('#canvas').html().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));