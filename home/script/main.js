window.requestAnimationFrame(draw);

var x = 50;
var y = 50;

var w = 500;
var h = 300;

var r = 15;

var sX = 5;
var sY = 5;

var pause = false;

function draw(){
	var c = document.getElementById("bc-owa");
	var info = document.getElementById("info");

	c.width = w;
	c.height = h;
	var ctx = c.getContext("2d");
	ctx.beginPath();      // Début du chemin
	ctx.restore();
	ctx.arc(x,y, r, 0, Math.PI*2, false);
	ctx.restore();
	ctx.fill();
	ctx.restore();
	if(!pause)
		window.requestAnimationFrame(draw);
	x+=sX;
	y+=sY;
	showInfo();

	if(x+r >= w || x-r<=0)
		sX*=(-1);
	if(y+r >= h || y-r<=0)
		sY*=(-1);
}

function showInfo(text){
	showCoord(x,y);
}

function showCoord(x, y){

	var info = document.getElementById("info");
	info.innerHTML = 'x = ' + x + '; &nbsp;&nbsp;&nbsp;' + 'y = ' + y + ';<br/>';
}

function stopAnim(){
	if(pause){
		pause=false;
		document.getElementById("controlAnim").innerHTML = '&#10074;&#10074;';
	}else{
		pause=true;		
		document.getElementById("controlAnim").innerHTML = '&#9658';
	}
	draw();
}