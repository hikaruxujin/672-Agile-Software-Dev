(function($) {

$.widget("ui.grmml", {
  
	menu: {
        "Grmml": {
            "About": function() {alert("grmml")},
            "Save": function() {},
            "Load": function() {}
            //"JSON": function() {$('#console').html(this.svg.toJSON());}
        },
        "Edit": {
            "New": function() {},
            "Delete": function() {},
            "Clear": function() {}
        },
        "Shape": {
            "New": function() {
                //this.svg.addShape($('#shapes').val());
            },
            "Set Text": function() {
                //this.svg.setShapeText();
            },
            "Connect": function() {
                //this.svg.connectShapes();
            },
            "Next": function() {
                /*
                var nodes=this.svg.graph.nodes, next=0;
                if (this.svg.graph.selected) {
                    $.each(nodes,function(i,e) {
                        if (e.node.id==this.svg.graph.selected.node.id) next=i+1;
                    });
                }
                if (next>=nodes.length) next=0;
                this.svg.select(nodes[next]);
                */
            },
            "Delete": function() {
                //this.svg.removeShape();
            }
        },
        "Help":{
            "Version": function() {alert('Version 1.0 '+this.timeout);}
        }
	},
	dom: {},
	timeout: 500,
    closetimer: 0,
    menuitem: 0,
    
	_create: function() {
		this.id = this.element.attr("id");
        this.dom.wrapper = $('<div>').css({position:'relative',height:'100%'});
        this.dom.menu = $('<div>')
            .css({
                position:'absolute',
                top:0,
                left:0,
                right:0,
                background:'#ddd'
            })
            .append($('<ul class="grmml-menu">'));
        this.dom.canvas = $('<div>')
            .css({
                position:'absolute',
                top:'24px',
                left:'0',
                right:'0',
                bottom:'20px'
            }).append('blah');
        this.dom.status = $('<div>')
            .css({
                position:'absolute',
                bottom:0,
                left:0,
                right:0,
                height:'20px'
            });
        this.element
            .css({background:'#f9f9f9'})
            .html('')
            .append(this.dom.wrapper
                .append(this.dom.menu)
                .append(this.dom.canvas)
                .append(this.dom.status)
            );

        // Create Menus
		var that=this, ul=this.dom.menu.find('ul'), div;
		$.each(this.menu, function(header,list) {
            // Create Div for Dropdown
            div = $('<div>');
            // Populate Div
            $.each(list, function(sm,f) {
                div.append($('<a href="#">'+sm+'</a>').click(f.call(that)));
            });
            // Build li and append to ul
            ul.append($('<li>')
                .mouseover(function(){that.mopen(header)})
                .mouseout(function(){that.mclosetime()})
                .append($('<a href="#">').text(header))
                .append(div));
        });
	},
	
	//destroy
	destroy: function() {
		this.element.html('');
		$.Widget.prototype.destroy.apply(this, arguments);
	},
	
	
    mopen: function(header) {
    	// cancel close timer
    	this.mcancelclosetime();
    	// close old layerv
    	if (this.menuitem) this.menuitem.css('visibility','hidden');
    	// get new layer and show it
    	this.menuitem = this.dom.menu.find('ul li > a').filter(function(i){
    	   return $(this).text()==header
        }).next().css('visibility','visible');
    },
    
    
    mclose: function() {
    	if (this.menuitem) this.menuitem.css('visibility','hidden');
    },
    mclosetime: function() {
        var that = this;
    	this.closetimer = window.setTimeout(function(){that.mclose()}, this.timeout);
    },
    mcancelclosetime: function() {
    	if (this.closetimer) {
    		window.clearTimeout(this.closetimer);
    		this.closetimer = null;
    	}
    }
});


})(jQuery);
