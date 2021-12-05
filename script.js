var audioPlayerElement;
var resultOverlayElement;
var whateverWeWant = [];

window.addEventListener('DOMContentLoaded', function() {

  audioPlayerElement = document.getElementById("resultPlayer");
  resultOverlayElement = document.getElementById("resultOverlay");
  whateverWeWant = document.getElementsByClassName("typedContent");

  document.addEventListener("click", function() {
    console.log("Playing now...");
    resultOverlayElement.remove();
    audioPlayerElement.play();

    for (let i = 0; i < whateverWeWant.length; i++) {
      setTimeout(() => {
        whateverWeWant[i].style.animation = "typing 4s steps(30, end) forwards, blink-caret .75s steps(50, end) infinite";
        if (i > 0){
            whateverWeWant[i-1].style.borderWidth = "0";
        }
      }, i*4000);

    }
  });

});
