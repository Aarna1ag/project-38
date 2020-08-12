var PLAY=1;
var END=0;
var score = 0;

var gameState=PLAY;

var boy, boyImg;
var  invisibleGround;

var ballsGroup, ballImage;
var obstaclesGroup, obstacle1, obstacle2;

var jump,die;

var gameOver,gameOverImage;
var restart,restartImage;
var bg;


function preload(){

  //sound = loadSound("jump.mp3");
  backgroundImg=loadImage("background.jpeg")

  ballImage = loadImage("coinSack.PNG");
  
  obstacle1 = loadImage("obstacle1.PNG");
    
  obstacle2 = loadImage("obstacle2.PNG");
   

boyImg=loadImage("boy.png");
jump = loadSound("jump.mp3");
die = loadSound("die.mp3");
  
  gameOverImage = loadImage("gameOver.jpeg");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth-20,900);
  
 boy = createSprite(100,450,20,50);
  
  boy.addImage(boyImg);
  boy.scale = 0.5;

  camera .position.x = boy .x;
//  camera .position.y = boy .y;

  invisibleGround = createSprite(200,890,3100,10);
  invisibleGround.visible = false;


  
  ballsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(displayWidth-20,displayWidth-10,displayWidth,displayHeight);
  gameOver.addImage("g",gameOverImage);
 gameOver.scale=2.90;
 gameOver.visible=false;
  
  restart = createSprite(800,650);
  restart.addImage("r",restartImage);
  restart.scale=1;
  restart.visible=false;
  
 // score = 0;

 //image (restart)


}

function draw() {
  if(backgroundImg)
  background(backgroundImg);
  getBackgroundImage();
  
 fill ("orange")
 textSize (28);
  
  if(gameState===PLAY){
    

    // score = score + Math.round(getFrameRate()/60);
   
  spawnBalls();
  spawnObstacles();
   if( obstaclesGroup.isTouching(boy)){
     die.play();
     gameState=END;
   }
   if( ballsGroup.isTouching(boy)){
   score=score+1;
    
  }
  if(keyDown("space")){// && boy.y >= 700)
    boy.velocityY = -20 ;

jump.play();
  }
  boy.velocityY = boy.velocityY + 0.8;

  }
  
  else if(gameState===END){
    

    boy.visible=false;
   
    gameOver.visible=true;
    restart.visible=true;

    obstaclesGroup.setVelocityXEach(0);
    ballsGroup.setVelocityXEach(0);
 
    obstaclesGroup.setLifetimeEach(-1);
    ballsGroup.setLifetimeEach(-1);


    if(mousePressedOver(restart)){
      
       reset();
            
    }
   
  }
  
 boy.collide(invisibleGround);
  
  drawSprites();

  text("Score: "+ score, 1540,50);
}

function spawnBalls() {

  if (frameCount % 200 === 0) {
    var ball = createSprite(1500,490,40,40);
    ball.y = Math.round(random(80,120));
    ball.addImage(ballImage);
    ball.scale = 0.5;
    ball.velocityX = -3;
 
    camera .position.x = ball.velocityX;
 //   camera .position.y = ball .y;
   

    ball.depth = boy.depth;
    boy.depth = boy.depth + 1;

   ball.debug=false;
    ball.setCollider("rectangle",0,0,70,498);
    
   // ballsGroup.add(ball);
  }
  
}

function spawnObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(1500,772,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacle1);
    obstacle.debug=false;

    camera .position.x = obstacle.velocityX;
 
    camera .position.y = displayHeight/2;

    obstacle.setCollider("rectangle",50,70);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
    
      default: break;
    }
    obstacle.scale = 0.5;
 
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  boy.visible=true;
  obstaclesGroup.destroyEach();
  ballsGroup.destroyEach();

  score=0;

  
}
async function getBackgroundImage(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responsejson = await response.json();
  var datetime = responsejson.datetime
  var hour = datetime.slice(11,13);
if (hour>=06 && hour<=19){
  
  bg="background.jpeg"

  
}
else{

bg ="night.jpeg"

}
backgroundImg = loadImage(bg);

}

