const cube = document.querySelector('.cube');
let mouseX = 0;
let mouseY = 0;
const rotationValue = 270;
const myElement = document.getElementById("fodase");
function animateBg()
{
  //myElement.style.background = "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 160, 1) 50%, rgba(255, 255, 255, 1) 100%)";
  myElement.style.opacity = 1; 
  /// 20 milliseconds
}
function girarCubo(){
    let d = new Date();
    let time = d.getTime()/50;
    let timeseconds = time%360;
    cube.style.transform = `rotateX(${timeseconds}deg) rotateY(${timeseconds}deg)`;
}
setTimeout(animateBg, 500);
setInterval(girarCubo, 20);
