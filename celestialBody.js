/**
 * This class creates a celstial body template with the parameters that every celcstial body in the database should have
 * @class  
 */
class CelestialBody {
	
	/**
	 * This creates regular text at a given coordinate with a given size and text
	 *
	 * @constructor
	 *
	 * 
	 */
	constructor(name, rawAscension, declination, distance, canvasX, canvasY) {
		this.name = name; // name of the celectial body
		this.rawAscension = rawAscension // the raw ascension of the object
		this.declination = declination // the declination of the object
		this.distance = distance; // how how far the object is in parsecs
		this.canvasX = canvasX; // the x comp of drawing area
		this.canvasY = canvasY; // the y comp of drawing area
	}
	
	/**     
	 * Draw a generic picture of an object
	 */
	show() {
		drawBody(this.canvasX, this.canvasY, 50);
	}
}


function drawBody(x, y, size) {
	if (size < 5) {
		return;
	} 
	
	circle(x, y, size)
	drawStar(x + (mouseX-x)/5, y + (mouseY-y)/5, size-5);
}