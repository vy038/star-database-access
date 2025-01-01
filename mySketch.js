/* 
	Database Access (Proj. #3)
	Victor Yu
	Created: 2024-12-02
	Modified: 2024-12-08
	Purpose: To create a nice and accessable database where people can look up different stars using just their name
	
	Quicksort algorithm taken from https://openprocessing.org/sketch/2465908
*/

/* Testing Values
Sirius
Proxima Centauri
Vega
82 G. Eri
Groombridge 34
1RXS J160929.1-210524 b
55 Cnc d
OGLE-2011-BLG-0173L b
*/

// declare variables

let starPlottingData = []; // array for star data
let exoplanetPlottingData = []; // array for exoplanet data

let celestialBodyArray = []; // array for word class objects
let originalCelestialBodyArray;

let searchTimeStart, searchTimeEnd;

let displayObject;

let sortOption, searchOption;

let searched = 0;

/*
* function to pre-load the data
*/
function preload() {
	loadTable('./sortedMag_hyglike_from_athyg_v24.csv', handleStarData);
	loadTable('./PS_2024.12.05_11.02.49.csv', handleExoplanetData);
}

function setup() {
	// basic setup, creating radio options
	sortOption = createRadio();
	sortOption.option('Bubble Sort');
	sortOption.option('Quick Sort')
	sortOption.selected('Quick Sort');
	
	searchOption = createRadio();
	searchOption.option('Linear Search');
	searchOption.option('Binary Search');
	searchOption.selected('Binary Search');
	
	createCanvas(windowWidth/1.25, windowHeight/1.25);
	background(0);
	stroke(0);
	
	// filling object array
	for (let i of starPlottingData) {
		star = new Star(i.name, i.rawAscension, i.declination, i.distance, i.spectra, i.id, i.apparentMagnitude, i.absoluteMagnitude, i.constellation, windowWidth/2.5, windowHeight/2.5);
		celestialBodyArray.push(star);
	}
	for (let i of exoplanetPlottingData) {
		exoplanet = new Exoplanet(i.name, i.hostName, i.rawAscension, i.declination, i.distance, i.discoveryMethod, i.discoveryYear, i.mass, i.radius, i.spectraType, windowWidth/2.5, windowHeight/2.5);
		celestialBodyArray.push(exoplanet);
	}
	
	originalCelestialBodyArray = celestialBodyArray;
}

function draw() {
	// continuously drawing the object to make a recursive and interactive design
	background('rgba(0%, 0%, 0%, 0.08)');
	
	// if an object is found
	if (searched == 1) {
		displayObject.show();
		fill(128);
		textSize(10);
		if (displayObject.isStar()) {
			text(`Name: ${displayObject.name}`, windowWidth/1.25 - 175, windowHeight/1.25 - 85);
			text(`Raw Ascension: ${displayObject.rawAscension}`, windowWidth/1.25 - 175, windowHeight/1.25 - 75);
			text(`Declination: ${displayObject.declination}`, windowWidth/1.25 - 175, windowHeight/1.25 - 65);
			text(`Distance (pc): ${displayObject.distance}`, windowWidth/1.25 - 175, windowHeight/1.25 - 55);
			text(`Spectra: ${displayObject.spectra}`, windowWidth/1.25 - 175, windowHeight/1.25 - 45);
			text(`ID: ${displayObject.id}`, windowWidth/1.25 - 175, windowHeight/1.25 - 35);
			text(`Apparent Magnitude: ${displayObject.apparentMagnitude}`, windowWidth/1.25 - 175, windowHeight/1.25 - 25);
			text(`Absolute Magnitude: ${displayObject.absoluteMagnitude}`, windowWidth/1.25 - 175, windowHeight/1.25 - 15);
			text(`Constellation: ${displayObject.constellation}`, windowWidth/1.25 - 175, windowHeight/1.25 - 5);
		} else {
			text(`Name: ${displayObject.name}`, windowWidth/1.25 - 175, windowHeight/1.25 - 95);
			text(`Host Name: ${displayObject.hostName}`, windowWidth/1.25 - 175, windowHeight/1.25 - 85);
			text(`Raw Ascension: ${displayObject.rawAscension}`, windowWidth/1.25 - 175, windowHeight/1.25 - 75);
			text(`Declination: ${displayObject.declination}`, windowWidth/1.25 - 175, windowHeight/1.25 - 65);
			text(`Distance (pc): ${displayObject.distance}`, windowWidth/1.25 - 175, windowHeight/1.25 - 55);
			text(`Discovery Method: ${displayObject.discoveryMethod}`, windowWidth/1.25 - 175, windowHeight/1.25 - 45);
			text(`Discovery Year: ${displayObject.discoveryYear}`, windowWidth/1.25 - 175, windowHeight/1.25 - 35);
			text(`Mass (rel. to earth): ${displayObject.mass}`, windowWidth/1.25 - 175, windowHeight/1.25 - 25);
			text(`Radius (rel. to earth): ${displayObject.radius}`, windowWidth/1.25 - 175, windowHeight/1.25 - 15);
			text(`Spectra Type: ${displayObject.spectraType}`, windowWidth/1.25 - 175, windowHeight/1.25 - 5);
		}
	}
}

/*
* function to extract star data and put it into an object
*/
function handleStarData(data) {
	for (let i = 0; i < data.getRowCount(); i++) { // goes through every row
		if (data.get(i, 13) && data.get(i, 9)) {
				starPlottingData.push({"name": data.get(i, 6), // gets name of stars as string
											"rawAscension": data.get(i, 7), // raw ascension value of star
											"declination": data.get(i, 8), // declination value of star
											"distance" : data.get(i, 9), // mapped distance of star from earth 
											"spectra" : data.get(i, 15), // spectra (color) of star https://en.wikipedia.org/wiki/Stellar_classification#Spectral_types
											"id": data.get(i, 0), // gets id of stars as integer
											"apparentMagnitude" : data.get(i, 13), // takes raw unmodified apparent magnitude
											"absoluteMagnitude" : data.get(i, 14), // raw unmodified absolute magnitude
											"constellation" : data.get(i, 29) // constellation of star
										 });
		}
	}
}

/*
* function to extract exoplanet data and put it into an object
*/
function handleExoplanetData(data) {
	for (let i = 0; i < data.getRowCount(); i++) { // goes through every row
		if (data.get(i, 15)) {
			exoplanetPlottingData.push({
											"name": data.get(i, 0), // gets name of planets as string
											"hostName": data.get(i, 1), // gets name of host stars as string
											"rawAscension": data.get(i, 32), // raw ascension value of star
											"declination": data.get(i, 34), // declination value of star
											"distance" : data.get(i, 35), // mapped distance of planet from earth map (pc)
											"discoveryMethod" : data.get(i, 5), // spectra (color) of star https://en.wikipedia.org/wiki/Stellar_classification#Spectral_types
											"discoveryYear" : data.get(i, 6), // year it was discovered
											"mass": data.get(i, 15), // gets id of stars as integer 
											"radius" : data.get(i, 13), // takes raw unmodified apparent magnitude
											"spectraType" : data.get(i, 23), // takes raw unmodified apparent magnitude
										 });
		}
	}
}

/*
 * Searches for a certain name for an object 
 * 
 * @param {string} searchTerm - The term to search for
 */
function linearSearch(searchTerm) {
	for (let i = 0; i < celestialBodyArray.length; i++) {
		if (celestialBodyArray[i].name == searchTerm) {
			return i;
		}
	}
	return -1;
}

/*
 * Searches for a certain name for an object 
 * 
 * @param {string} searchTerm - The term to search for
 */
function binarySearch(searchTerm) {
	let min = 0;
  let max = celestialBodyArray.length;

  while (min < max) {
    let middle = Math.floor((min + max) / 2);
    
    if (celestialBodyArray[middle].name < searchTerm) {
      min = middle + 1;
    } else {
      max = middle;
    }
  }
	if (celestialBodyArray[min].name == searchTerm && min == max) {
		return min;
	} else {
		return -1;
	}
}

/*
 * Sorts celestial objects in an array based on the attribute given
 * 
 * @param {Any} attribute - The attribute to sort by
 */
function bubbleSort(attribute) {
	let i;
	let j;
	let temp;
	let swapped;
	let sortTimeStart, sortTimeEnd;
	
	sortTimeStart = millis();
	
	for (i = 0; i < celestialBodyArray.length - 1; i++) {
		
			swapped = false;
		
			for (j = 0; j < celestialBodyArray.length - i - 1; j++) {
				
					if (celestialBodyArray[j][attribute] > celestialBodyArray[j + 1][attribute]) {
							temp = celestialBodyArray[j];
							celestialBodyArray[j] = celestialBodyArray[j + 1];
							celestialBodyArray[j + 1] = temp;
							swapped = true;
					}
				
			}

			if (swapped == false) {
				break;
			}
	}
	
	sortTimeEnd = millis();
	
	return sortTimeEnd - sortTimeStart;
}

/*
 * Sorts celestial objects in an array based on the attribute given
 * 
 * @param {Any} attribute - The attribute to sort by
 */
function quickSort(attribute) {
	
	let sortTimeStart, sortTimeEnd;
	
	sortTimeStart = millis();
	
	celestialBodyArray.sort((a, b) => {
		if (typeof a[attribute] === 'string') {
			return a[attribute].localeCompare(b[attribute]);
		} else {
			return a[attribute] - b[attribute]
		}
	});
	
	sortTimeEnd = millis();
	
	return sortTimeEnd - sortTimeStart;
}

/*
 * This is the function that runs when the search button is pressed, taking information from the search bar and applying the sortign and searching algorithms to it
 * 
 */
function search() {
	
	celestialBodyArray = originalCelestialBodyArray;
	
	// sorting the array before searching
	if (sortOption.value() == 'Bubble Sort') {
		document.getElementById("sortTimeText").innerHTML = `Time to sort array is ${bubbleSort("name")} ms`;
	} else {
		document.getElementById("sortTimeText").innerHTML = `Time to sort array is ${quickSort("name")} ms`;
	}
	
	// starting the searching timer
	searchTimeStart = millis();
	
	// searching for the value in the search bar
	if (searchOption.value() == 'Linear Search') {
		displayObject = celestialBodyArray[linearSearch(document.getElementById("searchBar").value)]; 
	} else {
		displayObject = celestialBodyArray[binarySearch(document.getElementById("searchBar").value)]; 
	}
	
	// if object not found, don't show and show an error message, else display the object
	if (displayObject == undefined) {
		searched = 0;
		document.getElementById("searchTimeText").innerHTML = `Object not found. Try again.`;
	} else {
		searched = 1;
		searchTimeEnd = millis();
		document.getElementById("searchTimeText").innerHTML = `Time to find object is ${searchTimeEnd - searchTimeStart} ms`;
		displayObject.show()
	}
}