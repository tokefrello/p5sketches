var bgColor = (22, 22, 29);
var fgColor = (255, 30, 60);

function setup() {
	createCanvas(600, 600, WEBGL);
	ortho(-width, width, -height, height, 0.1, 100);
}

function draw() {
	background(bgColor);
	for (i = -3; i < 4; i++) {
		push();
		translate(i*300, 0, 0);
		fill(128);
		sphere(150);
		pop();
	}
}
