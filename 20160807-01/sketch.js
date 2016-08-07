var bgColor = (22, 22, 29);
var fgColor = (255, 30, 60);

var pg;

var sinCounter = 0;

function setup() {
	createCanvas(600, 600, WEBGL);
	pg = createGraphics(256, 256);

	//ortho(-width, width, -height, height, 0.1, 100);
	//perspective(60, width/height, 0.1, 100);
	camera(0, 0, 2000);
}

function draw() {
	background(bgColor);
	camera(0, 0, 2000);

	var dirY = (mouseY / height - 0.5) *2;
	var dirX = (mouseX / width - 0.5) *2;

	//directionalLight(250, 250, 250, 0, 1, 1);
	pointLight(255, 255, 255, map(mouseX, 0, width, -1, 1), 0, map(mouseY, 0, height, -10, 10));
	ambientMaterial(250);

	var sSize = 250;

	for (i = -1; i < 2; i++) {
		push();
		translate(i*sSize*2.2, 0, 0);
		ambientMaterial(255, 0, 0);
		//sphere(sSize);
		pop();
	}

	pg.background(255, 0, 0);
	fill(255);
	pg.fill(255);
	pg.stroke(255);
	pg.text("hello world");
	texture(pg);
	plane(200);


	sinCounter += 0.01;
}
