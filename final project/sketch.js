let webcam;

var w = 640,
    h = 480;

var ySpeed = 1;
var countOfEspresso = 0; // Keeps track of how many total espresso shots

// Espresso Array
var espresso = [];
var numEspresso = 10; // Initial number of espresso shots

function setup() {
  createCanvas(w, h);
  webcam = createCapture(VIDEO);
  webcam.size(w, h);
  webcam.hide();
  for(i = 0; i < numEspresso; i++) {
      var newEspresso = new Espresso();
      espresso.push(newEspresso);
    }
}

function draw() {
  background(0);
  image(webcam, 0, 0, w, h);
  
  updateAndDisplayEspresso();
}

function updateAndDisplayEspresso() {
    for (var i = 0; i < numEspresso; i++) {
      espresso[i].draw();
      espresso[i].move();
    }
}

function Espresso() {
  this.x = random(0, width);
  this.y = random(0, height);


this.draw = function() {
    fill(139, 69, 19);
    if (this.y <= height + 2 ) {
      ellipse(this.x, this.y, 30, 30);
      noStroke();
    }
    else {
      this.y = -2;
    }
  }
