Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90

});
camera=document.getElementById("camera");
Webcam.attach(camera);
function shot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="selfi" src="'+data_uri+'">';

    });
}
function speak(){
    synth=window.speechSynthesis;
    speak_data1="First prediction is"+prediction1;
    speak_data2="Second prediction is"+prediction2;
    utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
    
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/j4xHNC3LI/model.json",ModelLoaded);
function ModelLoaded(){
    console.log("model is loaded");

}
function Predict(){
    img=document.getElementById("selfi");
    classifier.classify(img,gotresult);

}
function gotresult(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("em1").innerHTML=results[0].label;
        document.getElementById("em2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="victory") {
            document.getElementById("emo1").innerHTML="&#9996;";
        }
        if(results[0].label=="thumbsup") {
            document.getElementById("emo1").innerHTML="&#128077;";
        }
        if(results[0].label=="hifive") {
            document.getElementById("emo1").innerHTML="&#128400;";
        }

        if(results[1].label=="victory") {
            document.getElementById("emo2").innerHTML="&#9996;";
        }
        if(results[1].label=="thumbsup") {
            document.getElementById("emo2").innerHTML="&#128077;";
        }
        if(results[1].label=="hifive") {
            document.getElementById("emo2").innerHTML="&#128400;";
        }
    }
    
}