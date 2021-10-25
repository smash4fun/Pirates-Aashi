const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var angle
var balls = []
var Boats = []
var isGameOver = false
var isLaughing = false

function preload() {
 backgroundImg = loadImage("./assets/background.gif")
towerImg = loadImage("./assets/tower.png")
background_music = loadSound("./assets/background_music.mp3")
cannon_explosion = loadSound("./assets/cannon_explosion.mp3")
pirate_laugh = loadSound("./assets/pirate_laugh.mp3")


}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15
  var options = {
  isStatic:true

  }
  ground = Bodies.rectangle(0,height-2,width*2,1,options)
  World.add(world,ground)
  tower = Bodies.rectangle(130,350,160,310,options)

  World.add(world,tower)

  
  cannon1 = new cannon(170,150,130,100,angle)
 
  
}

function draw() {
  background(189);
 
  if(!background_music.isPlaying()){
    background_music.play()
    background_music.setVolume(0.05)
  }


image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  
   rect(ground.position.x,ground.position.y,width*2,1)
push()
  imageMode(CENTER)

  image(towerImg,tower.position.x,tower.position.y,160,310)
pop()

showBoats()

cannon1.display()
for(var i = 0;i<balls.length;i++){
  showCannonBalls(balls[i],i)
  collisionwithboats(i)
}


}

function keyPressed() {
  if (keyCode===DOWN_ARROW) {
    var cannonball1 = new cannonball(cannon1.x,cannon1.y)
  balls.push(cannonball1)}
}

function showCannonBalls(ball,i) {
  if(ball){
    ball.display();
    
  }

}

function keyReleased() {
if (keyCode===DOWN_ARROW){
balls[balls.length-1].shoot()

cannon_explosion.play()
cannon_explosion.setVolume(0.1)
}

}

function showBoats(){
  if(Boats.length>0){
    if(Boats.length<4 && Boats[Boats.length-1].body.position.x<width-300){
      var positions = [-40,-60,-70,-20]
      var position = random(positions)
      var boat1 = new boats(width - 79,height- 60,170,170,position)
      Boats.push(boat1)
    }
    for(var i= 0; i<Boats.length;i++){
      if(Boats[i]){
        Matter.Body.setVelocity(Boats[i].body,{x:-0.9,y:0})
        Boats[i].display()
        var collision = Matter.SAT.collides(this.tower,boats[i].body);
        if(collision.collided){
          pirate_laugh.play()
          isLaughing = true
        }
        isGameOver = true
        GameOver()

      }
    }
  }
  else{
    var boat1 = new boats(width - 79,height- 60,170,170,-80)
  Boats.push(boat1)
  }

}

function GameOver(){
  swal({
    title:"Pirate Invasion",
    text:"GAME OVER! Try Again",
    imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize:"150x150",
    confirmButtonText:"Play Again"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload(

      )
    }
  }
  )
}
function collisionwithboats(index) {
   for (var i = 0; i < Boats.length; i++) {
      if (balls[index] !== undefined && Boats[i] !== undefined) {
         var collision = Matter.SAT.collides(balls[index].body, Boats[i].body);
          if (collision.collided) {
             Boats[i].remove(i); Matter.World.remove(world, balls[index].body); 
             delete balls[index];
             }
             } 
             }
             }