function Position(opts) {
	opts = $.extend({
		canvasWidth : 1000,
		canvasHeight : 800,
		paddingTop : 5,
		players : 5,
		headerWidth : 150,
		headerHeight : 150
	}, opts);

	var _getGap = function(elementWidth) {
		return (opts.canvasWidth - opts.players * elementWidth) / (opts.players + 1);
	};

	this.headerGap = _getGap(opts.headerWidth);
	this.pokerGap = _getGap(opts.bigPokerWidth);
	this.getGap = _getGap;

	this.getHeader = function(i) {
		var x = (i*opts.headerWidth) + (i+1)*this.headerGap;
		var y = opts.paddingTop;
		return {x:x, y:y};
	};

	this.getPoker = function(i) {
		var x = (i*opts.bigPokerWidth) + (i+1) * this.pokerGap;
		var y = opts.paddingTop*2 + opts.headerHeight;
		return {x:x, y:y};
	};
}
