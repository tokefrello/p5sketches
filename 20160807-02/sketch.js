var bgColor, fgColor;

var rows = 18;
var cols = 18;

var xscale, yscale;
var movScale;

var points = new Array();

var pointSize = 20;

var maxD = 60;

function setup() {
	createCanvas(800, 800);

	bgColor = color(22, 22, 29);
	fgColor = color(255, 30, 60);

	frameRate(20);

	xscale = width/(rows-3);
	yscale = height/(cols-3);

	movScale = xscale/4;

	//Initialize points
	for (x = 0; x < rows; x++) {
		points[x] = new Array();
		for (y = 0; y < cols; y++) {
			points[x].push(new MyPoint(x*xscale+random(-xscale/4, xscale/4)-xscale/2,
			y*yscale+random(-yscale/4, yscale/4)-yscale/2));
		}
	}
}

function draw() {
	background(0);

	for (x = 0; x < rows; x++) {
		for (y = 0; y < cols; y++) {
			//Update location of grid points
			points[x][y].update();

			//Show point
			points[x][y].display();

			//Check for nearby points
			for (nx = 0; nx < rows; nx++) {
				for (ny = 0; ny < cols; ny++) {
					if (nx != x || ny != y) {
						var d = p5.Vector.dist(points[x][y].loc, points[nx][ny].loc);
						if (d < maxD) {
							if (points[nx][ny].touchedLastFrame) {	//Reacton on nearby active points
								if (frameCount - points[x][y].lastTouch > 30) {
									points[x][y].touchedThisFrame = true;	//Activate oneself
									points[x][y].lastTouch = frameCount;
									stroke(255, 128);
									strokeWeight(3);
									line(points[x][y].loc.x, points[x][y].loc.y, points[nx][ny].loc.x, points[nx][ny].loc.y);
								}
							}
						}
					}
				}
			}
		}
	}

	stroke(0, 0, 255);
	line(mouseX, mouseY-5, mouseX, mouseY+5);
	line(mouseX-5, mouseY, mouseX+5, mouseY);
}

function MyPoint(x, y) {
	this.loc = createVector(x, y);
	this.orgLoc = createVector(x, y);
	this.locMod = createVector(0, 0);
	this.modCounter = random(TWO_PI);	//Random starting point in cycle
	this.modSpeed = random(0.02, 0.05);	//Speed of oscillation

	this.orgC = color(fgColor);
	this.currC = color(fgColor);
	this.orgS = random(pointSize-4, pointSize+4);
	this.currS = this.orgS;

	//Used for registering activations
	this.touchedLastFrame = false;
	this.touchedThisFrame = false;
	this.lastTouch = 0;

	this.update = function() {
		if (this.touchedLastFrame) {
			this.currC = color(255);
			this.touchedLastFrame = false;
		}

		if (this.touchedThisFrame) {
			this.touchedLastFrame = true;
			this.touchedThisFrame = false;
		}

		if (mouseIsPressed) {
			if (collidePointCircle(mouseX, mouseY, this.loc.x, this.loc.y, pointSize)) {
				this.touchedThisFrame = true;
			}
		}

		//Return to normal color
		this.currC = lerpColor(this.currC, this.orgC, 0.2);

		//Update position
		this.modCounter += this.modSpeed;
		this.locMod = createVector(cos(this.modCounter)*movScale,
														 sin(this.modCounter)*movScale);
		this.loc = p5.Vector.add(this.orgLoc, this.locMod);
	}

	this.display = function() {
		fill(this.currC);
		noStroke();
		ellipse(this.loc.x, this.loc.y, this.currS, this.currS);
	}

}
