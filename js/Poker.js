function Poker(image, x, y, dstX, dstY, smallPokerWidth, smallPokerHeight, bigPokerWidth, bigPokerHeight) {
	var times = 20;
	this.image = image;	
	this.x = x;
	this.y = y;
	this.dstX = dstX;
	this.dstY = dstY;
	this.width = smallPokerWidth;
	this.height = smallPokerHeight;

	this.isXArrive = function() {
		return Math.abs(this.x - this.dstX) <= Math.abs(this.speedX);	
	};
	this.isYArrive = function() {
		return Math.abs(this.y - this.dstY) <= Math.abs(this.speedY);	
	};
	this.isArrive = function() {
		return this.isXArrive() && this.isYArrive();
	};

	this.speedX = (this.dstX - this.x) / times;
	this.speedY = (this.dstY - this.y) / times;
	this.speedWidth = (bigPokerWidth - smallPokerWidth) / times;
	this.speedHeight = (bigPokerHeight - smallPokerHeight) / times;
	this.change = function() {
		if (!this.isXArrive()) {
			this.x += this.speedX;
			this.width += this.speedWidth;
		}
		if (!this.isYArrive()) {
			this.y += this.speedY;	
			this.height += this.speedHeight;
		}
	};
}
