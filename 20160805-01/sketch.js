'use strict';

//Creates an oscillating grid of faces (as in shapes),
//each face having the color of the pixels of an
//underlying image.

//git-test
//git-test 2

var rows = 40;
var cols = 40;
var xscale, yscale;
var movScale;

var img;

var points = [];

function preload() {
	img = loadImage("obama.jpg");
	console.log("Image was loaded");
}

function setup() {
  createCanvas(800, 800);
  noStroke();

	img.loadPixels();

  xscale = width/(rows-3);
  yscale = height/(cols-3);

  movScale = xscale/4;

	for (var x = 0; x < rows; x++) {
		points[x] = [];
		for (var y = 0; y < cols; y++) {
			points[x].push(new MyPoint(x*xscale+random(-xscale/4, xscale/4)-xscale/2,
																 y*yscale+random(-yscale/4, yscale/4)-yscale/2));
		}
	}
}

function draw() {
	background(0);

  //Update location of grid points and create grid faces
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      points[x][y].update();
			fill(points[x][y].c);

      beginShape();
      if (x < rows-1 && y < cols-1) {
        vertex(points[x][y].loc.x, points[x][y].loc.y);
        vertex(points[x+1][y].loc.x, points[x+1][y].loc.y);
        vertex(points[x+1][y+1].loc.x, points[x+1][y+1].loc.y);
        vertex(points[x][y+1].loc.x, points[x][y+1].loc.y);
      }
      endShape(CLOSE);
    }
  }

	//Show an overlay of the source image
	image(img, mouseX, 0, img.width-mouseX, img.height, mouseX, 0, img.width-mouseX, img.height);
}

function MyPoint(x, y) {
  this.loc = createVector(x, y);
	this.orgLoc = this.loc;
	this.locMod = createVector(0, 0);
  this.modCounter = random(TWO_PI);	//Random starting point in cycle
  this.modSpeed = random(0.02, 0.05);	//Speed of oscillation

	this.pIndex = floor(this.loc.y)*img.width+floor(this.loc.x);
	this.c = color(img.pixels[4*this.pIndex],
								 img.pixels[4*this.pIndex+1],
								 img.pixels[4*this.pIndex+2]);
}

MyPoint.prototype.update = function() {
  //Update position
  this.modCounter += this.modSpeed;
  this.locMod = createVector(cos(this.modCounter)*movScale,
                           sin(this.modCounter)*movScale);
  this.loc = p5.Vector.add(this.orgLoc, this.locMod);

  //Update color based on new position
  this.pIndex = floor(this.loc.y)*img.width+floor(this.loc.x);
  this.c = lerpColor(this.c, color(img.pixels[4*this.pIndex],img.pixels[4*this.pIndex+1],img.pixels[4*this.pIndex+2]), 0.3);
};
