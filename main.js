song='';
objects=[];
status='';

function preload(){
song=loadSound('alarm_clock.mp3')
}

function setup(){
canvas= createCanvas(500,500);
video=createCapture(VIDEO);
video.size(500,500);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById('status').innerHTML="Status: Detecting objects";
}

function modelLoaded(){
console.log('Model loaded');
status=true;

}

function gotResults(error, results){
if(error){
console.log(error);

}
console.log(results);
objects=results;
}


function draw(){
image(video,0,0,500,500);

r=random(255);
g=random(255);
b=random(255);

objectDetector.detect(video, gotResults);

if(status!=""){
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Status: Objects detected";


    percent=floor(objects[i].confidence*100);

    fill(r,g,b);
    text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect( objects[i].x, objects[i].y,  objects[i].width, objects[i].height);

    if(objects[i],label=='person'){
    document.getElementById('baby_status').innerHTML='Baby found';
    song.stop();
    }
    else{
    document.getElementById('baby_status').innerHTML='Baby not found';
    song.play();
    }
}
if(objects.length==0){
document.getElementById('baby_status').innerHTML='Baby not found';
song.play();
}
}


}

