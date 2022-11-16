var element4 = document.querySelector('.element4')
var element2 = document.querySelector('.element2')
var element1 = document.querySelector('.element1')
var slide_3 = document.querySelector('.slide_3')
var canvas = document.getElementById('canvas')

 gsap.to('.element4',{scaleX: 1.1, scaleY: 1.1, duration: .5, repeat: -1, yoyo: true })


 if(typeof window.orientation !== 'undefined'){
  dragElementMobile(element2);
}
else{
  dragElement(element2);
}

function dragElementMobile(elmnt){
  var pos1 = 0, pos2= 0, pos3 = 0, pos4 =0 ;
  if(document.getElementById(elmnt.id + "header")){
      document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
    
  } else{
      elmnt.ontouchstart = dragMouseDown;
      console.log("kkk")
  }
  function dragMouseDown(e){
      console.log("mm")
      e = e.touches[0] || window.event;
      // e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;    
      document.ontouchmove = elementDrag;
  }
  function elementDrag(e) {
      console.log("mmmm")
      e = e.touches[0] || window.event;
      // e.preventDefault();
      pos2 = pos4 - e.clientY;
      // pos1 = pos3 - e.clientX;
      // pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.left = (elmnt.offsetLeft - pos2) + "px";
      leftSpace = elmnt.offsetLeft - pos2;
      draggedResult(elmnt, leftSpace);
    }
  
    function closeDragElement() {
      console.log("oooo")
      document.ontouchend = null;
      document.ontouchmove = null;
    }
}




function dragElement(elmnt) {
    var pos1 = 0, pos2=0, pos3 = 0, pos4=0;
    if(document.getElementById(elmnt.id + "header")){
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;    
        console.log("kk")
    } else{
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e){
       
        e = e || window.event;
        e.preventDefault();
        // pos3 = e.clientX;
        pos4 = e.clientY;
        // console.log("this is pos4")
        // console.log(pos4)
        document.onmouseup = closeDragElement;    
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        // pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.left = (elmnt.offsetLeft - pos2) + "px";
        leftSpace = elmnt.offsetLeft - pos2;
        console.log("y cordinate: ")
        // console.log(pos2)
        // console.log(pos4)
        console.log("leftspace: ")
        console.log(leftSpace)

        draggedResult(elmnt, leftSpace);
      }
    
      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
}

function draggedResult(){
    // console.log("kk")
    element2.style.left = 125 + 'px';
    element2.style.right = 125 + 'px';

    if(leftSpace >  122){
        element4.classList.add('hidden')
        element2.classList.add('swipe');
        setTimeout(function(){
          ani1 = gsap.timeline();
          ani1.to('.element1', {opacity: 0, display: 'none', duration: .1},"<")
              .to('.element2', {opacity: 0, display: 'none', duration: .1}, ">")
            setTimeout(function(){
                fireWork();
                ani= gsap.timeline()
                ani.to('.canvas', { opacity: 1, display: 'block', duration: .7 }, ">")
                setTimeout(function(){ 
                  ani.to('.canvas', { opacity: 0, display: 'none', duration: 5 }, ">")
                  slide_3.classList.remove('hidden')
              },2000)
            },100)
           

            
        },900)
    }
}
function fireWork() {

    console.log('fireWork')
    window.addEventListener("resize", resizeCanvas, false);
    window.addEventListener("DOMContentLoaded", onLoad, false);
    onLoad();
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    
    var canvas, ctx, w, h, particles = [], probability = 0.04,
      xPoint, yPoint;
    
    
    
    
    
    function onLoad() {
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      resizeCanvas();
    
      window.requestAnimationFrame(updateWorld);
    }
    
    function resizeCanvas() {
      if (!!canvas) {
        w = canvas.width = 300;
        h = canvas.height = 250;
      }
    }
    
    function updateWorld() {
      update();
      paint();
      window.requestAnimationFrame(updateWorld);
    }
    
    function update() {
      if (particles.length < 500 && Math.random() < probability) {
        createFirework();
      }
      var alive = [];
      for (var i = 0; i < particles.length; i++) {
        if (particles[i].move()) {
          alive.push(particles[i]);
        }
      }
      particles = alive;
    }
    
    function paint() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
      }
    }
    
    function createFirework() {
      xPoint = Math.random() * (w - 200) + 100;
      yPoint = Math.random() * (h - 200) + 80;
      var nFire = Math.random() * 50 + 25;
      var c = "rgb(255,"
        + (~~(Math.random() * 125 + 130)) + "," + (~~(Math.random() * 115 + 35)) + ")";
      for (var i = 0; i < nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        var vy = Math.sqrt(100 - particle.vx * particle.vx);
        if (Math.abs(particle.vy) > vy) {
          particle.vy = particle.vy > 0 ? vy : -vy;
        }
        particles.push(particle);
      }
    }
    
    function Particle() {
      this.w = this.h = Math.random() * 2 + 1;
    
      this.x = xPoint - this.w / 2;
      this.y = yPoint - this.h / 2;
    
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10;
    
      this.alpha = Math.random() * .3 + .4;
    
      this.color;
    }
    
    Particle.prototype = {
      gravity: 0.05,
      move: function () {
        this.x += this.vx / 4;
        this.vy += this.gravity;
        this.y += this.vy / 4;
        this.alpha -= 0.01;
        if (this.x <= -this.w || this.x >= screen.width ||
          this.y >= screen.height ||
          this.alpha <= 0) {
          return false;
        }
        return true;
      },
      draw: function (c) {
        c.save();
        c.beginPath();
    
        c.translate(this.x + this.w / 2, this.y + this.h / 2);
        c.arc(0, 0, this.w, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
    
        c.closePath();
        c.fill();
        c.restore();
      }
    }
    }