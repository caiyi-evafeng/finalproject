let centerElem;
let backgroundElem;
let resetTimeout;

let isResetting = false;

var testPhrase = "我们终将失去理智 We will eventually lose the ability to reason ما در نهایت عقل خود را از دست خواهیم داد Nous finirons par perdre la tête 私たちは最終的に私たちの心を失います В конце концов мы потеряем рассудок";

var myPhraseArray = ["我们终将失去理智", "We will eventually lose the ability to reason", "ما در نهایت عقل خود را از دست خواهیم داد", "Nous finirons par perdre la tête","私たちは最終的に私たちの心を失います","В конце концов мы потеряем рассудок"];

window.addEventListener('DOMContentLoaded', function() {

  centerElem = document.getElementById('center');
  backgroundElem = document.getElementById('backgroundText');

  createPage();


});

function createPage() {

  /*

  1. Select random phrases from phrase array, add them to a new long string...
  2. Pass that new long string as the second parameter in prepareTypingSpans()

  */

  var backgroundString = "";
  var foregroundString = "";

  // backgroundString = backgroundPhrase;
  foregroundString = testPhrase;

  for (var i = 0; i < 500; i++) {
    // Add a random selecton from the Phrase Array to backgroundString
    var randomStringIndex = Math.floor(Math.random() * myPhraseArray.length);
    backgroundString = backgroundString + " " + myPhraseArray[randomStringIndex];
  }

  //for (var i = 0; i < 5; i++) {
    // Add a random selecton from the Phrase Array to foregroundString
  //}

  prepareTypingSpans(backgroundElem, backgroundString);
  prepareTypingSpans(centerElem, foregroundString);

}

function prepareTypingSpans(targetElem, finalText) {

  var currentSubstringEnd = 0;

  for (var i = 0; currentSubstringEnd < finalText.length; i++) {

    var sectionLength = currentSubstringEnd + 20 + Math.floor(Math.random() * 80);

    var thisSectionText = finalText.substring(currentSubstringEnd, sectionLength);
    currentSubstringEnd = sectionLength;

    let mainSpanElem = document.createElement("SPAN");
    mainSpanElem.setAttribute('data-typing-complete', 'false');

    let visibleSpanElem = document.createElement("SPAN");
    visibleSpanElem.classList.add("visibleText");

    var num1 = Math.random() * 255
    var num2 = Math.random() * 255
    var num3 = Math.random() * 255

    // generate a random GREEN
    // generate a random BLUE
    // turn into an rgb(r,g,b) style String
    var colorString = "rgb("+num1+","+num2+","+num3+")";
    var borderStyle = "7px solid " + colorString
    visibleSpanElem.style.borderRight = borderStyle;
    let blinkDelay = Math.floor(Math.random() * 1000);
    visibleSpanElem.style.animationDelay = blinkDelay + "ms";

    let hiddenSpanElem = document.createElement("SPAN");
    hiddenSpanElem.innerText = thisSectionText;
    hiddenSpanElem.style.color = "transparent";

    mainSpanElem.appendChild(visibleSpanElem);
    mainSpanElem.appendChild(hiddenSpanElem);

    targetElem.appendChild(mainSpanElem);

    window.setTimeout(function() {
      typeFromHiddenSpan(mainSpanElem);
    }, 100 + (Math.random() * 400));

  }

}

function typeFromHiddenSpan(mainElem) {

  let visibleElem = mainElem.childNodes[0];
  let invisibleElem = mainElem.childNodes[1];

  let visibleText = visibleElem.innerHTML;
  let invisibleText = invisibleElem.innerHTML;

  visibleText = visibleText + invisibleText.substring(0, 1);
  invisibleText = invisibleText.substring(1);

  visibleElem.innerText = visibleText;
  invisibleElem.innerText = invisibleText;

  if (invisibleText == "") {
    mainElem.setAttribute("data-typing-complete", "true");
  }

  window.setTimeout(function() {
    typeFromHiddenSpan(mainElem);
    checkIfAllTypingComplete();
  }, 100 + (Math.random() * 400));

}

function checkIfAllTypingComplete() {

  let allComplete = false;

  if (checkIfAllChildrenComplete(centerElem) == true && checkIfAllChildrenComplete(backgroundElem) == true) {

    if (isResetting == false) {
      isResetting = true;
      resetTimeout = window.setTimeout(function() {
        centerElem.innerHTML = "";
        backgroundElem.innerHTML = "";
        createPage();
        clearTimeout(resetTimeout);
        isResetting = false;
      }, 5000);
    }

  }

}

function checkIfAllChildrenComplete(parentElemToCheck) {

  let allComplete = true;

  for (var i = 0; i < parentElemToCheck.childNodes.length; i++) {
    if (parentElemToCheck.childNodes[i].getAttribute("data-typing-complete") == "false") {
      allComplete = false;
    }
  }

  return allComplete;
}



/*

  1. Randomly split the final text into sections
  2. Generate empty <span> elements for them to be typed into?
    - Store the text they should have in a data attribute
    - Set right border to a cursor color?
  3. For each new span element set a timer to type.

*/

/*
  3 spans:
  A. contains B and C
    - has data attribute with final string?
  B. Contains visible letters
  C. Contains invisible letters

  Loop:
  1. Check final string
  2. Check count of letters in "B"
  3. Get substring from Final String, plus 1 from "2"
  4. Put them in appropriate child Span?

  Loop:
  1. Receive manSpan
  2. Get references to child 0 and child 1
  3. Get String from child 0
  4. Get

*/
