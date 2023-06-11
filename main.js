var scoreleftwrist=0;
var scorerightwrist=0;

leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video,0,0,600,500);
    fill("red");
    stroke("black");

    if (scoreleftwrist>0.2){
    circle(leftWristx, leftWristy, 20);
    numberleftwristy = Number(leftWristy);
    remove_decimal = floor(numberleftwristy);
    volume=remove_decimal/500;
    document.getElementById("volumeid").innerHTML= "Volume = "+ volume;
    song.setVolume(volume);
    }

    fill("red");
    stroke("black");
    if (scorerightwrist>0.2){

    circle(rightWristx, rightWristy, 20);
    if(rightWristy >0 && rightWristy <= 100)
{
	document.getElementById("speed").innerHTML = "Speed = 0.5x";		
	song.rate(0.5);
}
else if(rightWristy >100 && rightWristy <= 200){
    document.getElementById("speed").innerHTML = "Speed = 1x";		
	song.rate(1);
}
else if(rightWristy >200 && rightWristy <= 300){
    document.getElementById("speed").innerHTML = "Speed = 1.5x";		
	song.rate(1.5);
}
else if(rightWristy >300 && rightWristy <= 400){
    document.getElementById("speed").innerHTML = "Speed = 2x";		
	song.rate(2);
}
else {
    document.getElementById("speed").innerHTML = "Speed = 1x";		
	song.rate(2.5);
}
    

}}
song="";

function preload() {
    song=loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelloded() {
    console.log("hello!");

}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreleftwrist=results[0].pose.keypoints[9].pose;
        console.log("left wrist score="+scoreleftwrist);

        scorerightwrist=results[0].pose.keypoints[10].pose;
        console.log("right wrist score="+scorerightwrist);

        leftWristx=results[0].pose.leftWrist.x;
        console.log("Left wrist x="+ leftWristx);
        leftWristy=results[0].pose.leftWrist.y;
        console.log("Left wrist y="+ leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        console.log("Right wrist x="+ rightWristx);
        rightWristy=results[0].pose.rightWrist.y;
        console.log("Right wrist y="+ rightWristy);

        
        
    }
}
function stop() {
    song.stop();
}
