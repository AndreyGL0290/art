$('.canvas').mousemove(function(e){
	var target = this.getBoundingClientRect();
	var x = e.clientX - target.left;
	var y = e.clientY - target.top;
	fillRect(x, y, 1, 1)
});