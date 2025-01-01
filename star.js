/**
 * This class creates a star (circle) which has variable size and position depending on  the input parameters
 *
 * Star function code taken from https://editor.p5js.org/p5/sketches/Form:_Star
 *
 * @class  
 */
class Star extends CelestialBody {
	
	/**
	 * This creates special star text which changes color depending on the spectra of a given star, and changes text size based on its "significance"
	 *
	 * @constructor
	 *
	 * 
	 */
	constructor(name, rawAscension, declination, distance, spectra, id, apparentMagnitude, absoluteMagnitude, constellation, canvasX, canvasY) {
		super(name, rawAscension, declination, distance, canvasX, canvasY); // takes properties from superclass
		this.apparentMagnitude = apparentMagnitude; // apparent magnitude of star
		this.absoluteMagnitude = absoluteMagnitude; // absolute magnitude of star
		this.spectra = spectra; // color of the star to be converted to color of display
		this.id = id; // id of star
		this.constellation = constellation; // constellation the star lies in
		this._significance = abs(25 + (1/(2*map(map(distance, 0, 82083.9594, 0, windowHeight/1.25), 0, 82083.9594, 0, windowHeight/1.25)) + 1/(apparentMagnitude + 3)) * 0.8); // size of the circular recursion display
	}
	
	/**     
	 * Shows the star text with the given positions and sizes, as well as their appropriate color
	 */
	show() {
		// if star text is within boundries and within accepted magnitude range
		if (this.spectra == 0) { // if there is no spectra for star then give it B&W
			if (255 - this.apparentMagnitude < 0) {
				this._fillColor = 0;
			} else {
				this._fillColor = 255 - this.apparentMagnitude;
			}
			fill(this._fillColor, 1);
		} else { // if color extraction failed or colorCheck is false, give it B&W color
			if (colorExtraction(this.spectra) == -1) {
				if (255 - this.apparentMagnitude < 0) {
					fill(0, 50);
				} else {
					fill(255 - this.apparentMagnitude, 50);
				}

			} else { // if there is a successful spectra extraction, give the star a fill color
				colorMode(HSB);
				fill(colorExtraction(this.spectra), saturationExtraction(this.spectra), 100-((this.apparentMagnitude/255)*100), 0.2);
				colorMode(RGB);
			}
		}
		// create the star recursion design
		_drawStar(this.canvasX, this.canvasY, this._significance/25, (this._significance)/25 - (this._significance)/400, 20);
	} 
	
	/**     
	 * Shows whether or not this is a star
	 */
	isStar() {
		return true;
	}
}

/*
* private function to create the recursive display of the star
*
* @param {Number} x - the x-position for the center of the star
* @param {Number} y - the y-position for the center of the star
* @param {Number} outerRadius - the outer radius of the star
* @param {Number} innerRadius - the inner radius of the star
* @param {Number} numberOfPoints - amount of points on the star
* 
*/
function _drawStar(x, y, outerRadius, innerRadius, numberOfPoints) {
	if (outerRadius < 10) {
		return;
	} 
	
	_starShape(x, y, outerRadius, innerRadius, numberOfPoints);
	
	_drawStar(x + ((mouseX-x)/5)*Math.cos(120), y + ((mouseY-y)/5)*Math.sin(120), outerRadius-25, innerRadius-25, numberOfPoints);
	_drawStar(x + ((mouseX-x)/5)*Math.cos(240), y + ((mouseY-y)/5)*Math.sin(240), outerRadius-25, innerRadius-25, numberOfPoints);
	_drawStar(x - ((mouseX-x)/5)*Math.cos(120), y - ((mouseY-y)/5)*Math.sin(120), outerRadius-25, innerRadius-25, numberOfPoints);
	_drawStar(x - ((mouseX-x)/5)*Math.cos(240), y - ((mouseY-y)/5)*Math.sin(240), outerRadius-25, innerRadius-25, numberOfPoints);
}

/*
* private function to create a star shape
*
* @param {Number} x - the x-position for the center of the star
* @param {Number} y - the y-position for the center of the star
* @param {Number} outerRadius - the outer radius of the star
* @param {Number} innerRadius - the inner radius of the star
* @param {Number} numberOfPoints - amount of points on the star
* 
*/
function _starShape(x, y, outerRadius, innerRadius, numberOfPoints) {
		let angle = TWO_PI / numberOfPoints;
		let halfAngle = angle / 2.0;
		beginShape();
		for (let a = 0; a < TWO_PI; a += angle) {
			let sx = x + cos(a) * innerRadius;
			let sy = y + sin(a) * innerRadius;
			vertex(sx, sy);
			sx = x + cos(a + halfAngle) * outerRadius;
			sy = y + sin(a + halfAngle) * outerRadius;
			vertex(sx, sy);
		}
		endShape(CLOSE);
}

/*
* returns a numeric hue HSB value for a star after extracting a character in its spectra
*
* @param {String} colorStr - the complete string of the star spectra in which to convert the character from
* 
* @returns {Number} the numeric hue value for HSB
*/
function colorExtraction(colorStr) {
		// extracts a letter from the spectra and returns a value based on that for color extraction
		if (colorStr[0] == 'O' || colorStr[0] == 'W') { 
			return 240;
		} else if (colorStr[0] == 'B') {
			return 240;
		} else if (colorStr[0] == 'A') {
			return 240;
		} else if (colorStr[0] == 'F') {
			return 240;
		} else if (colorStr[0] == 'G') {
			return 50;
		} else if (colorStr[0] == 'K') {
			return 350;
		} else if (colorStr[0] == 'M' || colorStr[0] == 'C') {
			return 0;
		}	else {
			return -1;
		}
}

/*
* returns a numeric saturation HSB value for a star after extracting a character in its spectra
*
* @param {String} colorStr - the complete string of the star spectra in which to convert the character from
* 
* @returns {Number} the numeric saturation value for HSB
*/
function saturationExtraction(colorStr) {
		// extracts a letter from the spectra and returns a value based on that for saturation extraction
		if (colorStr[0] == 'O' || colorStr[0] == 'W') {
			return 80;
		} else if (colorStr[0] == 'B') {
			return 30;
		} else if (colorStr[0] == 'A') {
			return 20;
		} else if (colorStr[0] == 'F') {
			return 0;
		} else if (colorStr[0] == 'G') {
			return 60;
		} else if (colorStr[0] == 'K') {
			return 50;
		} else if (colorStr[0] == 'M' || colorStr[0] == 'C') {
			return 90;
		} else {
			return 0;
		}
}