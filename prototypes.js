function PlacedObject(x, y, width, height, collideable)
{
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.collideable = collideable || false;

	this.collides = function(other)
	{
		if (this.collideable && (other.collideable || typeof(other.collideable) == 'undefined'))
		{

			if (typeof(other.x) == 'undefined' || typeof(other.y) == 'undefined' || typeof(other.width) == 'undefined' || typeof(other.height) == 'undefined')
			{
				console.log("Could not detect collision because other party had undefined properties");
				return false;
			}

			return (other.x - other.width >= this.x && other.y - other.height >= this.y && other.x <= this.x + this.width && other.y <= this.y + this.height);
		}
		else
		{
			return false;
		}
	};
}

function RenderableObject(sprite, placedObject, opacity)
{
	this.prototype = placedObject || new PlacedObject(0, 0);
	this.opacity = opacity || 1;
	this.sprite = sprite;

	var animated = typeof(this.sprite.update) != 'undefined';

	this.draw = function()
	{
		this.sprite.draw(this.x, this.y, this.width, this.height, this.opacity);
	};

	this.update = function(deltaTime)
	{
		//Check iff it's an animated sprite
		if (animated)
		{
			this.sprite.update(deltaTime);
		}
	};
}