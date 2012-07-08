$(function() {
	var game = new Game();
	game.start();
});

var Game = function() {
	var canvas;
	var ctx;
	var resource;
	var stop = true;
	var getHeaders = function() {
		return ["http://tp4.sinaimg.cn/1631661635/180/5617663956/1",
			   "http://tp1.sinaimg.cn/2808421224/180/5635985227/1",
			   "http://tp4.sinaimg.cn/1925320323/180/5635995277/1",
			   "http://tp3.sinaimg.cn/1584480830/180/5629789926/1",
			   "http://tp4.sinaimg.cn/1565248803/180/1299136772/1"];	
	};
	var countOfPlayers = getHeaders().length;
	
	var color = ["club", "spade", "diamond", "heart"];

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

		canvas = document.getElementById("gameBoard");
		canvas.addEventListener("mousedown", function() {
			stop = false;
			shufflePokers();					
		});
		canvas.addEventListener("mouseup", function() {
			stop = true;
		});


		//$(document).bind("keydown", function(e) {
		//	shufflePokers();					
		//});
		ctx = canvas.getContext("2d");
	};

	var shufflePokers = function() {
		var images = [];
		var randPoker = new Poking().pokerDumbbell(countOfPlayers);
		for (var i=0; i<randPoker.length; i++) {
			var img = resource.get(color[randPoker[i].color] + "/" + (randPoker[i].index + 1));
			images.push(img);
			img.addEventListener("click", function() {
				alert(1);		
			});
			ctx.drawImage(img, 490 + i*25, 560, 90, 120);
		}
	
		if (!stop) {
			setTimeout(shufflePokers, 50);
		}
		
		dispatchPokersToPlayers(images);
	};

	var dispatchPokersToPlayers = function(images) {
		for (var i=0; i<countOfPlayers; i++) {
			dispatchPoker(i, images[i]);	
		}	
	};

	var dispatchPoker = function(i, image) {
		var x = 490 + i*25;
		var y = 560; 
		anim(image, x, y);
	};

	var anim = function(image, x, y) {
			ctx.drawImage(image, x, y);	
			x -= 1;
			y -= 1;
			if (x > 50 || y > 150) {
				setTimeout(anim(image, x, y), 3000);
			}
	}
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
			ctx.drawImage(img, 0, 0, 1200, 700);	
		}
	};

	var drawHeaders = function() {
		var headers = getHeaders();
		for (i in headers) {
			var header = headers[i];	
			var img = resource.get(header);
			ctx.drawImage(img, 50 + i*220, 5, 150, 150);
		}
	};

	var getImages = function() {
		var names = [];	
		names.push("common/bg");
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
