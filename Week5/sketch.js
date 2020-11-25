
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
  }
  
  function draw() {
    background (0,10);
    col.r = random(100,255);
    col.g = 0;
    col.b = random(100, 255);
    spot.x = random(0, width);
    spot.y = random(0, height);
    noStroke();
    fill(col.r,col.g,col.b);
    ellipse(spot.x, spot.y, 25, 25);
  }
  
  
  