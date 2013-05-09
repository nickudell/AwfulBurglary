//Canvas properties
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 800;

var canvas;
var context;

//Game loop properties
var loopTimeout;
var isPlaying = true;
var FPS = 30;
var prevTime = Date.now();

var timeString;

var mouse = {
	x: 0,
	y: 0
};

var player = {
	color: "#00A",
	x: 160,
	y: 100,
	width: 32,
	height: 32,
	//draw the player as a blue square
	draw: function()
	{
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
};

var menu;

//Initialize variables and start the game
var Init = function()
{
	console.log("Initialization entered.")
	//Get the canvas
	var canvases = $("<canvas id='canvas' width='" + CANVAS_WIDTH +
		"' height='" + CANVAS_HEIGHT + "'></canvas");
	canvas = canvases[0];
	//respond to mouse clicks
	canvas.addEventListener('click', canvasClicked, true);
	//prevent double clicks from selecting text all over the place
	canvas.addEventListener('selectstart', function(e)
	{
		e.preventDefault();
		return false;
	});
	//respond to mouse motion
	canvas.addEventListener('mousemove', function(e)
	{
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	})

	context = canvas.getContext("2d");

	canvases.appendTo('body');

	menu = new Menu(100, 0, CANVAS_WIDTH - 200, CANVAS_HEIGHT, '08F');

	//Start game loop
	Tick();
	console.log("Initialization exited.")
};

function canvasClicked()
{

	}

//The game loop
var Tick = function()
{
	//Update time difference
	var now = Date.now();
	var deltaTime = now - prevTime;
	prevTime = now;
	Clear('222');
	Update(deltaTime);
	Draw()

	if (isPlaying)
	{
		loopTimeout = setTimeout(Tick, 1000 / FPS);
	}
	else
	{
		console.log('Exiting normally.');
	}
};

//Clear the screen
var Clear = function(colour)
{
	//Set active colour to specified parameter
	context.fillStyle = colour;
	context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

var Update = function(deltaTime)
{
	menu.update(deltaTime);
};

var Draw = function()
{
	player.draw();
	menu.draw();
};

Init();