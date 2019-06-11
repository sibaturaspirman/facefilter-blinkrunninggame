// Load in the required modules
const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');
const Scene = require('Scene');
// const Diagnostics = require('Diagnostics');
// const NativeUI = require('NativeUI');
const TouchGestures = require('TouchGestures');

// Locate the plane in the Scene
const player1 = Scene.root.find('player1');
const player1Transform = player1.transform;
const player2 = Scene.root.find('player2');
const player2Transform = player2.transform;
const canvas0 = Scene.root.find('canvas0');

const particle1 = Scene.root.find('particle1');
const particle2 = Scene.root.find('particle2');

particle1.material.opacity = 0;
particle2.material.opacity = 0;

// Store a reference to a detected face
const face = FaceTracking.face(0);
const face2 = FaceTracking.face(1);

const startPositionRunner = -1.4;
const stepRun = 15.5;
const finishRun = 280;

// Register a blink event
FaceGestures.onBlink(face).subscribe(function() {

  const lastPositionX = player1Transform.x.pinLastValue();
  const newPositionX = Reactive.add(lastPositionX, stepRun);
  player1.transform.x = newPositionX;


  if(player1Transform.x.pinLastValue() >= finishRun){    
    particle1.material.opacity = 1;
    particle2.material.opacity = 1;
    player1.transform.x = lastPositionX;
  }

});

FaceGestures.onBlink(face2).subscribe(function() {

  const lastPositionX = player2Transform.x.pinLastValue();
  const newPositionX = Reactive.add(lastPositionX, stepRun);
  player2.transform.x = newPositionX;


  if(player2Transform.x.pinLastValue() >= finishRun){
    particle1.material.opacity = 1;
    particle2.material.opacity = 1;
    player2.transform.x = lastPositionX;
  }

});

TouchGestures.onTap(canvas0).subscribe(function (gesture) {

  player1.transform.x = startPositionRunner;
  player2.transform.x = startPositionRunner;
  particle1.material.opacity = 0;
  particle2.material.opacity = 0;

});