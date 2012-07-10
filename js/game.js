$(function() {
	var game = new Game("gameBoard");
	game.start();
});

var Game = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	var	ctx = canvas.getContext("2d");
	var resource;
	var stop = true;
	var poking = new Poking();
	var getHeaders = function() {
		return ["http://tp4.sinaimg.cn/1631661635/180/5617663956/1",
			   "http://tp1.sinaimg.cn/2808421224/180/5635985227/1",
			   "http://tp4.sinaimg.cn/1925320323/180/5635995277/1",
			   "http://tp3.sinaimg.cn/1584480830/180/5629789926/1"
			   ];	
	};
	var countOfPlayers = getHeaders().length;
	
	var color = ["club", "spade", "diamond", "heart"];
	var config = {
		canvasWidth : canvas.width,
		canvasHeight : canvas.height,
		paddingTop : 5,
		players : countOfPlayers,
		headerWidth : 150,
		headerHeight : 150,
		smallPokerWidth : 70,
		smallPokerHeight : 96,
		bigPokerWidth : 140,
		bigPokerHeight : 192
	};
	var position = new Position(config);

	var start = function() {
		init();
	};
			
	var init = function() {
		resource = new Resource();
		var names = getImages();
		var headers = getHeaders();
		resource.loadImages({
			nameArray : names.concat(headers),
			onLoad : function() {
				//showMenu(); 
				drawHeaders();
				shufflePokers();
			},
			onLoading : function(progress) {
				drawBg();
				drawProgress(progress);
			}
		});

		canvas.addEventListener("mousedown", function() {
			stop = false;
			shufflePokers();					
		});
		canvas.addEventListener("mouseup", function() {
			stop = true;
			currentMovingPoker = 0;
		});


		//$(document).bind("keydown", function(e) {
		//	shufflePokers();					
		//});
	};

	window.requestAnimFrame = (function(callback){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback, 1000 / 30);
			};
	})();
	
	var currentMovingPoker = 0;
	function dispatchPokersToPlayers(pokers) {
			if (currentMovingPoker == countOfPlayers) {
				return;
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawBg();
			drawHeaders();
			drawPokers(pokers);
			movePoker(pokers[currentMovingPoker]);	
			requestAnimFrame(function(){
				dispatchPokersToPlayers(pokers);
			});
	}
	 
	var shufflePokers = function() {
		var pokers = [];
		var randPoker = poking.pokerDumbbell(countOfPlayers);
		for (var i=0; i<randPoker.length; i++) {
			var img = resource.get(color[randPoker[i].color] + "/" + (randPoker[i].index + 1));
			var x = 490 + i*25;
			var y = 560;
			var dst = position.getPoker(i);
			pokers[i] = new Poker(img, x, y, dst.x, dst.y, config.smallPokerWidth, config.smallPokerHeight, config.bigPokerWidth, config.bigPokerHeight);
			ctx.drawImage(img, x, y);
		}
	
		if (!stop) {
			setTimeout(shufflePokers, 50);
		}
		
		dispatchPokersToPlayers(pokers);
	};

	var movePoker = function(poker) {
		if (poker.isArrive()) {
			currentMovingPoker++;
			return;
		}
		poker.change();
	};

	var drawPokers = function(pokers) {
		for (i in pokers) {
			ctx.drawImage(pokers[i].image, pokers[i].x, pokers[i].y, pokers[i].width, pokers[i].height);
		}	
	};
	
	var drawProgress = function(progress) {
		ctx.fillStyle = "rgb(250, 250, 250)";                     
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Loading...  " + progress + "%", 580, 600);
	};

	var drawBg = function() {
		var img = resource.get("common/bg");
		if (img) {
			ctx.drawImage(img, 0, 0, config.canvasWidth, config.canvasHeight);	
		}
	};

	var drawHeaders = function() {
		var headers = getHeaders();
		for (var i=0; i<countOfPlayers; i++) {
			var header = headers[i];	
			var img = resource.get(header);
			var p = position.getHeader(i);
			ctx.drawImage(img, p.x, p.y, config.headerWidth, config.headerHeight);
		}
	};

	var getImages = function() {
		var names = [];	
		names.push("common/bg");
		names.push("common/hide");
		for (var i=0; i<13; i++) {
			names.push("club/" + (i + 1));	
			names.push("heart/" + (i + 1));	
			names.push("spade/" + (i + 1));	
			names.push("diamond/" + (i + 1));	
		}
		return names;
	};


	this.start = start;
};

function Resource() {
	var pool = {};
	var loadedImages = 0;
	var loadImages = function(opts, nameArray, onLoad) {
		$.extend({
			nameArray : [],
			onLoad : function() {},
			onLoading : function(rate) {}
		}, opts);
		for (i in opts.nameArray) {
			loadImage(opts.nameArray[i], opts.onLoad, opts.onLoading, opts.nameArray.length);	
		}
	};

	var loadImage = function(name, onLoad, onLoading, count) {
		var img = new Image();
		img.onload = function() {
			pool[name] = img;	
			loadedImages++;
			onLoading(Math.round(loadedImages / count * 100));
			if (loadedImages == count) {
				onLoad();
			}
		};
		if (name.indexOf("http://") == 0) {
			img.src = name;	
		} else {
			img.src = "images/" + name + ".png";
		}
	};

	var get = function(name) {
		return pool[name];
	};

	this.get = get;
	this.loadImage = loadImage;
	this.loadImages = loadImages;
};
