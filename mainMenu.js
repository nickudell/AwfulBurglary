function Menu(x, y, width, height, colour)
{
	var loop;
	var background;
	var backgroundPulseMs = 0;
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.colour = colour || 'F00';

	function makeBackground(radius)
	{
		background = context.createRadialGradient(this.x + this.width, this.x + this.height, radius);
		background.addColorStop(0, '000');
		background.addColorStop(1, this.colour);
	}

	this.draw = function()
	{
		context.save();
		context.fill = background;
		context.fillRect(this.x, this.y, this.width, this.height);
		context.restore();
	};

	this.update = function(deltaTime)
	{
		//pulse the background
		backgroundPulseMs += deltaTime;
		var maxRadius = this.width / 2;
		var minRadius = this.width / 8;
		var phaseMs = 8000;
		var radius = minRadius + Math.abs((backgroundPulseMs / phaseMs) - phaseMs / 2) * maxRadius;
		backgroundPulseMs = loop(backgroundPulseMs, 0, phaseMs);
		makeBackground(radius);
	}

}