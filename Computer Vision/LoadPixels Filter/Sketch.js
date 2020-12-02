var capture;

function setup() { 
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  noStroke();
}
function draw() { 
  background(0);
  capture.loadPixels();
  var stepSize = 10;
  for (var x = 0; x < capture.width; x += stepSize) {
    for (var y = 0; y < capture.height; y += stepSize) {
      var index = ((y*capture.width) + x) * 4;
      var redVal = capture.pixels[index];
      var greenVal = capture.pixels[index + 1];
      var blueVal = capture.pixels[index + 2];
      fill(redVal, greenVal, blueVal);
      ellipse(x, y, stepSize, stepSize);
    }
  }
}