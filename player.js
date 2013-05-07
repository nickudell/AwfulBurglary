function Player()
{
	this.color = "#00A",
	this.x = 160,
	this.y = 100,
	this.width = 32,
	this.height = 32,
	//draw the player as a blue square
	this.draw = function()
	{
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}