var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var over,endImg
var birdsGroup
var gameState="play"
var restart,restartImg
var score=0
//loads the assets before start executing the code
function preload(){
bgImg = loadImage("assets/bg.png")
endImg= loadImage("assets/gameOver.png")
restartImg=loadImage("assets/restart.png")

birdIMG=loadAnimation("assets/gr.png","assets/gr2.png","assets/gr.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){
createCanvas(1000,600)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);

bg.scale = 1.5

over = createSprite(500,300)
over.addImage("END",endImg)
over.visible=false

restart = createSprite(950,50)
restart.addImage("restart",restartImg)
restart.visible=false


//creating top and bottom grounds
bottomGround = createSprite(500,600,1000,20);
bottomGround.visible = false;

topGround = createSprite(200,10,1600,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
birdsGroup=new Group()

}

function draw() {
  
  //background("black");
        if (gameState=="play"){
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }
          
          score = score + Math.round(getFrameRate()/60);



          //adding gravity
           balloon.velocityY = balloon.velocityY + 1;
          balloon.collide(bottomGround);
        
          if(keyDown("LEFT_ARROW")){
            balloon.x=balloon.x-3
          }

          if(keyDown("RIGHT_ARROW")){
            balloon.x=balloon.x+3
          }
        
          
obstacles()
hit()
        }
        if(gameState=="done"){
          if(mousePressedOver(restart)) {
            reset()


          }


        }


  drawSprites();
text("score: "+score,50,50)        
}
function obstacles(){


if(World.frameCount%45==0){
  var bird = createSprite(1100,500,20,20)
  bird.y=Math.round(random(150,455))
  bird.velocityX=-5
  bird.addAnimation("bird",birdIMG)
  bird.scale=0.21
  birdsGroup.add(bird)
}
}

function hit(){
  if (birdsGroup.isTouching(balloon)){
    over.visible=true
birdsGroup.setVelocityXEach(10)
balloon.visible=false
birdsGroup.destroyEach()
restart.visible=true

gameState="done"


  }

}


function reset(){
  restart.visible=false
  over.visible=false
  balloon.visible=true
  gameState="play"
  score=0

}
