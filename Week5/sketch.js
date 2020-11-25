let bugs = [];
var spot = {
  x: 100,
  y: 50
}

var col = {
  r:255,
  g:0,
  b:0
}

function setup() {
    createCanvas(1440,1024);
    background (0);
      for (let i = 0; i < 50; i++) {
      bugs.push(new Jitter());
  }
}

function draw() {
  background (0,5);
  col.r = random(50,255);
  col.g = 0;
  col.b = random(50, 255);
  spot.x = random(0, width);
  spot.y = random(0, height);
  noStroke();
  fill(col.r,col.g,col.b);
  ellipse(spot.x, spot.y, 25, 25);
  
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
}

class Jitter {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}