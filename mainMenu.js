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


	var that = this;

	function makeBackground(radius)
	{
		background = context.createRadialGradient(that.x + that.width, that.x + that.height, 1, that.x + that.width, that.x + that.height, radius);
		background.addColorStop(0, that.colour);
		background.addColorStop(1, 'black');
	}

	this.draw = function()
	{
		context.save();
		context.fillStyle = background;
		context.shadowColor = '111';
		context.shadowOffsetX = 16;
		context.shadowOffsetY = 0;
		context.shadowBlur = 20;
		context.fillRect(that.x, that.y, that.width, that.height);
		context.restore();
	};

	this.update = function(deltaTime)
	{
		//pulse the background
		backgroundPulseMs += deltaTime;
		var maxRadius = Math.max(this.width, this.height);
		var minRadius = maxRadius / 2;
		var phaseMs = 16000;
		var radius = Math.floor(minRadius + (Math.sin((backgroundPulseMs / phaseMs) * 2 * Math.PI) + 1) / 2 * (maxRadius - minRadius));
		backgroundPulseMs = loop(backgroundPulseMs, 0, phaseMs);
		makeBackground(radius);
	}

	function loop(value, change, maxValue)
	{
		var result = value + change;
		while (result < 0)
		{
			result += maxValue;
		}
		return result % maxValue;
	};

}