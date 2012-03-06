var element_list = [];
function create() {
	var rect = paper.rect(10,10,200,100);
	rect.data("equation", prompt("Please enter a value for the shape.",""));
	rect.data("text", paper.text(rect.attr('width') / 2 + rect.attr('x'),
								 rect.attr('height') / 2 + rect.attr('y'),
								 rect.data("equation")));
	element_list.push(rect);
}

function update() {
	destroy();
	create();
}

function destroy() {
	shape = element_list.pop();
	shape.data("text").remove();
	shape.remove();
}

