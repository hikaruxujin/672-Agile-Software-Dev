(function($) {

$.widget("ui.grmml", {
    
	menu: {
        "Grmml": {
            "About": function() {alert(
                "GRMMML\n"+
                "GraphML & MathML Analytics\n"+
                "Computer Science 672\n\n"+
                "Version 1.0\n"+
                "March 7, 2012\n"
            );},
            "Crunch": function() {
                var url = 'http://130.127.48.51:5000/',
                    json = this.svg.toJSON(),
                    that = this;
                $('#debug').prepend('Sent '+url+' '+json+'<br>');

                //this.svg.fromJSON(json);
                $.ajax({
                    type: 'post',
                    url: url,
                    data: { data: this.svg.toJSON() }, 
                    success: function(data) {
                        $('#debug').prepend('Received '+data+'<br>');
                        that.svg.fromJSON(data);
                        that.dom.status.html('Success');
                    },
                    error: function(jqXHR, status, error) {
                        $('#debug').prepend('Error '+status+'<br>');
                    }
                });
            }
            //"Save": function() {},
            //"Load": function() {}
            //"JSON": function() {$('#console').html(this.svg.toJSON());}

        },
        "Canvas": {
            "New": function() {this.svg.addShape(this.dom.shapes.val());},
            "Next": function() {this.svg.nextShape();},
            "Clear": function() {this.svg.removeShape(true);}
        },
        "Shape": {
            "Edit Text": function() {this.svg.editShapeText(); },
            "Connect": function() {this.svg.connectShapes();},
            "Deselect": function() {this.svg.deselect();},
            "Delete": function() {this.svg.removeShape();}
        }
	},
	
	svg: null,
	dom: {},
	timeout: 500,
    closetimer: 0,
    menuitem: 0,
    
	_create: function() {
		this.id = this.element.attr("id");
        this.dom.wrapper = $('<div>')
            .css({
                position:'relative',
                height:'100%',
                'font-family':'Helvetica',
                'font-size':'12px'
            });
        this.dom.menu = $('<div>')
            .css({
                position:'absolute',
                top:0,left:0,right:0,
                "border-bottom":"1px solid #888"
                //background:'#ddd'
            })
            .addClass('gradient') // testing
            .append($('<ul class="grmml-menu">')
                .css({display:'inline-block'}));
        this.dom.canvas = $('<div id="canvas">')
            .css({
                position:'absolute',
                top:'24px',left:0,right:0,bottom:'24px'
            });
        this.dom.status = $('<div id="status">')
            .css({
                position:'absolute',
                bottom:0,left:0,right:0,
                height:'24px',
                'line-height':'24px',
                'vertical-align':'middle',
                'border-top':'1px solid #bbb',
                background:'white',
                padding:'0 0 0 5px',
                color:'#555'
            });
           this.dom.dialog = $('<div id="dialog">')
            .css({
                display:'none', /* Hide the DIV */
				position:'fixed',  
				_position:'absolute', /* hack for internet explorer 6 */  
				height:'200px',  
				width:'500px', 
				background:'#ddf',  
				left: '300px',
				top: '150px',
				'z-index':'100', /* Layering ( on-top of others), if you have lots of layers: I just maximized, you can change it yourself */
				'margin-left': '15px',  
				
				/* additional features, can be omitted */
				border:'2px solid #fdd',  	
				padding:'15px',
				'font-size':'15px',  
				'-moz-box-shadow': '0 0 5px #fdd',
				'-webkit-box-shadow': '0 0 5px #fdd',
				'box-shadow': '0 0 5px #fdd'
            });
        this.element
            .css({background:'#fff'})
            .html('')
            .append(this.dom.wrapper
                .append(this.dom.menu)
                .append(this.dom.canvas)
                .append(this.dom.status)
                .append(this.dom.dialog)
            );
            
        // Shapes Dropdown
        var shapes = $('<select id="shapes">').css({float:'right'});
        $.each({
            rect:'Rectangle',
            rrect:'Rounded Rectangle',
            circle:'Circle',
            ellipse:'Ellipse'
        },function(v,t) {
            shapes.append($('<option>').val(v).text(t));
        });
        this.dom.shapes = shapes;
        this.dom.menu.append(shapes);

        // Create Menus
		var that=this, ul=this.dom.menu.find('ul'), div;
		$.each(this.menu, function(header,list) {
            // Create Div for Dropdown
            div = $('<div>');
            // Populate Div
            $.each(list, function(sm,f) {
                div.append($('<a href="#">'+sm+'</a>')
                    .click(function(){f.call(that)}));
            });
            // Build li and append to ul
            ul.append($('<li>')
                .mouseover(function(){that.mopen(header)})
                .mouseout(function(){that.mclosetime()})
                .append($('<a href="#">').text(header))
                .append(div));
        });
        
        //SVG
        this.svg = new svg('canvas','status');
        
        //Create dialog
        var note = $('<label>').html('Please input equations of LaTex!');
        var textarea = $('<textarea id="text">')
					  .css({
							'height':'100px',
							'width':'500px',
							'vertical-align':'middle',
					  });
		var self = this;
		var ok = $('<button id="ok">').html('OK').click(function() {
			// Do something
			self.svg.setShapeText();
			unloadPopupBox();	
		});
		var cancel = $('<button id="cancel">').html('CANCEL').click(function() {
			// Do something
			unloadPopupBox();
		});
        this.dom.dialog.append(note)
					   .append(textarea)
					   .append(ok)
					   .append(cancel);
        
	},
	destroy: function() {
		this.element.html('');
		$.Widget.prototype.destroy.apply(this, arguments);
	},
    mopen: function(header) {
    	// cancel close timer
    	this.mcancelclosetime();
    	// close old layer
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
