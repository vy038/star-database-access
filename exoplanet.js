/**
 * This class creates a star (circle) which has variable size and position depending on  the input parameters
 * @class  
 */
class Exoplanet extends CelestialBody {
	
	/**
	 * This creates special star text which changes color depending on the spectra of a given star, and changes text size based on its "significance"
	 *
	 * @constructor
	 *
	 * 
	 */
	constructor(name, hostName, rawAscension, declination, distance, discoveryMethod, discoveryYear, mass, radius, spectraType, canvasX, canvasY) {
		super(name, rawAscension, declination, distance, canvasX, canvasY); // takes properties from superclass
		this.hostName = hostName; // name of the star(s) planet orbits
		this.discoveryMethod = discoveryMethod; // method used to discover planet
		this.discoveryYear = discoveryYear; // year discovered
		this.mass = mass; // mass of planet in terms of earth
		this.radius = radius; // radius of the planet in terms of earth
		this.spectraType = spectraType;
	}
	
	/**     
	 * Shows the star text with the given positions and sizes, as well as their appropriate color
	 */
	show() {
		fill(128);
		// create the planet recursion design
		_drawPlanet(this.canvasX, this.canvasY, map(this.mass, 0, 26000, 5, windowHeight/1.25)*2);
	} 
	
	/**     
	 * Shows whether or not this is a star
	 */
	isStar() {
		return false;
	}
}

/*
* private function to create the recursive display of the planet
*
* @param {Number} x - the x-position for the center of the planet
* @param {Number} y - the y-position for the center of the planet
* @param {Number} size - the size of the planet to be drawn
* 
*/
function _drawPlanet(x, y, size) {
	if (size < 5) {
		return 0;
	} 
	
	circle(x, y, size)
	_drawPlanet(x + (mouseX-x)/20, y + (mouseY-y)/20, size-5);
	_drawPlanet(x - (mouseX-x)/20, y - (mouseY-y)/20, size-5);
}