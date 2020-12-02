let webcam;

var tracker
var w = 640,
    h = 480;

function setup() {
  createCanvas(w, h);
  webcam = createCapture(VIDEO);
  webcam.size(w, h);
  webcam.hide();

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(webcam.elt);

}

function draw() {
  background(0);
  image(webcam, 0, 0, w, h);

  
  var positions = tracker.getCurrentPosition();
  
  noFill();
  beginShape();
  for (var i = 0; i < positions.length; i++) {
      vertex(positions[i][0], positions[i][1]);
  }
  endShape();
  noStroke();
  
  var positions = tracker.getCurrentPosition();
  for (var i=0; i<positions.length; i++) {
          // set the color of the ellipse based on position on screen
          fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
          // draw ellipse at each position point
          ellipse(positions[i][0], positions[i][1], 8, 8);
          
  } 
}
