const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// returns random number from min to max

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
function color() {
    let hex = "#";
    for( let i=0; i<6; i++){
        let color = Math.floor(Math.random()*15);
        switch (color) {
            case 10:
                color = "A"
                break;
            case 11:
                color = "B"
                break;
            case 12:
                color = "C"
                break;
            case 13:
                color = "D"
                break;
            case 14:
                color = "E"
                break;
            case 15:
                color = "F"
                break;
            default:
                break;
        }
        hex += color;
    }
    return hex;
}
let colorArray = [];
for(let i=0; i<6; i++){
    let hex = color()
    colorArray.push(hex);
}
const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('resize', () => {
    canvas.width = window.clientWidth;
    canvas.height = window.clientHeight;
    
    init();
});

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.d = 0.05;
    this.distance = randomNumber(50,120);
    this.lastMouse = {
        x: x,
        y: y
    };

    this.update = () => {
        const last = {x: this.x, y: this.y};
        this.angle += this.d;
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;
        this.x = this.lastMouse.x + Math.cos(this.angle) * this.distance; 
        this.y = this.lastMouse.y + Math.sin(this.angle) * this.distance; 
        this.draw(last);
    };

    this.draw = last => {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    };

}

let particles; 
function init() {
    particles = [];
    for(let i=0; i<20; i++){
        const radius = randomNumber(1,3);
        let color = colorArray[Math.floor(Math.random()*colorArray.length)];
        particles.push(new Particle(innerWidth/2, innerHeight/2, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}
init();
animate();