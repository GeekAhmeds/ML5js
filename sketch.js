let mobilenet;
let classifier;
let video;
let label = '';
let addbtn;
let addbtn2;
let addbtn3;
let addbtn4;
let textInput;
function modelReady() {
  console.log('Model is ready!!!');
}
function videoReady() {
  console.log('Video is ready!!!');
}
function whileTraining(loss) {
  if (loss == null) {
    console.log("Training Complete");
    classifier.classify(gotResults);
  }else{
  console.log(loss)
  }
}
function gotResults(error, result) {
  if (error) {
    // console.error(error);
  } else {
    console.log(result);
    label = result;
    classifier.classify(gotResults);
    createP(label);

  }
}



function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  
  addbtn = createButton('Smile');
  addbtn.mousePressed(function () {
    classifier.addImage('Smile')
  });
  addbtn2 = createButton('Angry');
  addbtn2.mousePressed(function () {
    classifier.addImage('Angry')
  });
  // addbtn4 = createButton('Wow');
  // addbtn4.mousePressed(function () {
  //   classifier.addImage('Wow')
  // });
  addbtn3 = createButton('Train');
  addbtn3.mousePressed(function () {
    classifier.train(whileTraining);
  });
  createP(label);


}

function draw() {
  background(0, 128, 255);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
