let webcam;
let poseNet;
let pose;

var w = 640,
    h = 480;

var ySpeed = 1;
var countOfEspresso = 0; // Keeps track of how many total espresso shots

// Espresso Array
var espresso = [];
var numEspresso = 10; // Initial number of espresso shots

const video = document.getElementById('webcam');

function setup() {
  createCanvas(w, h);
  webcam = createCapture(VIDEO);
  webcam.size(w, h);
  poseNet = ml5.poseNet(webcam, modelLoaded);
  poseNet.on('pose',gotPoses);
  webcam.hide();
  for(i = 0; i < numEspresso; i++) {
      var newEspresso = new Espresso();
      espresso.push(newEspresso);
    }
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function gotPoses(poses){
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function draw() {
  background(0);
  image(webcam, 0, 0, w, h);
  
  updateAndDisplayEspresso();
  
  if (pose) {
    fill(255,0,0);
    ellipse(pose.leftWrist.x, pose.leftWrist.y,40);
    ellipse(pose.rightWrist.x, pose.rightWrist.y,40);
  }
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

  this.move = function() {
    this.y = this.y + ySpeed;
  }
}
