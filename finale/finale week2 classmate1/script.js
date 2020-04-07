//adding icons to images
let icons = [{val:'🐭',gotSelected:0},{val:'🐱',gotSelected:0},{val:'🐞',gotSelected:0},
{val:'🐼',gotSelected:0},{val:'🐯',gotSelected:0},{val:'🐷',gotSelected:0}];

let images = Array.from(document.querySelectorAll(".image"));

images.forEach((image)=>{
  let searchInProgress = true;
  while(searchInProgress){
    let index = Math.floor(Math.random() * Math.floor(6));
    if(icons[index].gotSelected<2){
      let node = document.createTextNode(icons[index].val);
      image.appendChild(node);
      icons[index].gotSelected++;
      searchInProgress = false;
    }
  }
});
//adding events to wrappers

var numberOpenWrappers = 0;
var wrappers = Array.from(document.querySelectorAll(".wrapper"));
wrappers.forEach((wrapper)=>{
  wrapper.selected = false; //used to determine if wrapper is open
  wrapper.isGreen = false; //used to determine if wrapper is green
  wrapper.addEventListener('click',function(event){
    processWrapper(wrapper);
  });
});
function processWrapper(wrapper){
  if(!wrapper.isGreen){
  wrapper.lastElementChild.style.backgroundColor = "white";
  if(wrapper.selected){
    wrapper.lastElementChild.style.backgroundColor = "white";
    wrapper.selected = false;
    wrapper.firstElementChild.style.transform = "rotateY(0deg)";
    wrapper.firstElementChild.style.transitionDuration = "1s";
    wrapper.firstElementChild.style.zIndex = "1";

    wrapper.lastElementChild.style.transform = "rotateY(0deg)";
    wrapper.lastElementChild.style.transitionDuration = "1s";
    wrapper.lastElementChild.style.zIndex = "0";

    numberOpenWrappers--;
  }
  else{
    if(numberOpenWrappers>1){
      wrappers.filter((wrapper)=>wrapper.selected==true&&wrapper.isGreen==false).forEach((wrapper)=>{processWrapper(wrapper)});
    }
    if(numberOpenWrappers==1){
      let wrapperOpen = wrappers.filter((wrapper)=>wrapper.selected==true&&wrapper.isGreen==false)[0];
      let openEl = wrapperOpen.lastElementChild;
      let currEl = wrapper.lastElementChild;
      if(currEl.innerText===openEl.innerText){
        currEl.style.backgroundColor = "#5AD66F";
        openEl.style.backgroundColor = "#5AD66F";
        wrapper.isGreen = true;
        wrapperOpen.isGreen = true;
        numberOpenWrappers=-1;
      }
      else{
        currEl.style.backgroundColor = "#F44336";
        openEl.style.backgroundColor = "#F44336";
      }

    }
    wrapper.selected = true;
    wrapper.firstElementChild.style.transform = "rotateY(180deg)";
    wrapper.firstElementChild.style.transitionDuration = "1s";
    wrapper.firstElementChild.style.zIndex = "0";

    wrapper.lastElementChild.style.transform = "rotateY(180deg)";
    wrapper.lastElementChild.style.transitionDuration = "1s";
    wrapper.lastElementChild.style.zIndex = "1";

    numberOpenWrappers++;
    if(wrappers.filter((wrapper)=>wrapper.isGreen==true).length==12){
      textAnimation("Win");
      $("#playagain").html("Play again");
      document.querySelector('.notification').style.visibility = "visible";
      document.querySelector('.shadow').style.visibility = "visible";
    }
  }
}
}
//timer functionality
var timerstarted = false;
var timerFinished = null;
function timer(duration, display){
  var timer = duration, minutes, seconds;
  var partyFinished = false;
  timerFinished = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0){
            if(wrappers.filter((wrapper)=>wrapper.isGreen==true).length!==12){
              display.textContent = "00:00";
              textAnimation("Lose");
              $("#playagain").html("Try again");
              document.querySelector('.notification').style.visibility = "visible";
              document.querySelector('.shadow').style.visibility = "visible";
            }
        }
    }, 1000);
}
window.onload = function (){
    $(".wrapper").click(function(){
      if(!timerstarted){
        timerstarted = true;
        var oneMinute = 60 * 1,
            display = document.querySelector('#time');
        timer(oneMinute, display);
      }
    });
};

//refresh the refreshPage
function refreshPage(){
  window.location.reload();
}

//adding text animation
function textAnimation(text){
    for(let i=0; i<text.length; i++){
      let textNode = document.createElement("span");
      textNode.id = i;
      textNode.innerText = text[i];
      textNode.style.animationDelay = `${i}s`;
      document.querySelector("h2").appendChild(textNode);
    }
  clearInterval(timerFinished);
}
