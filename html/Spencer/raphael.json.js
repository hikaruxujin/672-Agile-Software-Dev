/*
 * Based on Jonathan Spies's raphael.serialize:
 * https://github.com/jspies/raphael.serialize
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function() {
	Raphael.fn.toJSON = function() {
		var paper = this,
		  elements = new Array,
		  o = null;

		for ( var el = paper.bottom; el != null; el = el.next ) {
			o = {
				type:      el.type,
				attrs:     el.attrs,
				transform: el.matrix.toTransformString(),
            };
            if (el.type == 'path') {
                o['edge'] = { source: el.data('source') , target: el.data('target') }
            } else {
                o['node'] = { id: el.node.id };
            }
            elements.push(o);
		}

		return JSON.stringify(elements);
	}

	Raphael.fn.fromJSON = function(json) {
		var paper = this;

		if ( typeof json === 'string' ) json = JSON.parse(json);

		for ( var i in json ) {
			if ( json.hasOwnProperty(i) ) {
				var element = paper[json[i].type]()
					.attr(json[i].attrs)
					.transform(json[i].transform)
					;

				element.node.id = json[i].node.id;

				paper.set().push(element);
			}
		}
	}
})();