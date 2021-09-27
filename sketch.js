
var PLAY =1;
var END  =0;
var gameState = PLAY;

var Score = 0;

function preload(){

//code to load Image of background (path). 
    pathImg = loadImage("game123.jpg");

//code to load Animation of 'runner'.
    runnerImg = loadAnimation("runner3.png");

//code to load image of 'stone'.
    stoneImg = loadImage("stone.png");

//code to load image of 'game over'.
    GameOverImg = loadImage("gameOver.png");

//code to load image of 'game_Coin'.
    CoinImg = loadImage("Coin.png");
    coinImg = loadImage("Coin.png");
    PointImg = loadImage("Coin.png");
    pointImg = loadImage("Coin.png");
    cashImg = loadImage("Coin.png");
    CashImg = loadImage("Coin.png");

//code to load the image of Arrow.
    ArrowImg  = loadImage("arrow0.png");

//code to load the image of lion.
    lionImg = loadImage("lion.png");

//code to losd the image of restart.
    restartImg = loadImage("restart.png")
}

function setup() {

//code to create a Canvas. 
    createCanvas(windowWidth,windowHeight);

//code to give movement to background (path) from '-x' to 'x'.   
    path = createSprite(height/2,300);
    path.addImage("background",pathImg);
    path.velocityX = -2;

//code to create a 'runner'.
    runner = createSprite(width/4,height-160);
    runner.addAnimation("running",runnerImg);
    runner.scale = 0.3;

//code to create a 'lion'.
    lion = createSprite(width/15,height-160);
    lion.addImage("running",lionImg);
    lion.scale = 0.3

//code to create a restart.
    restart = createSprite(700,300);
    restart.addImage(restartImg);

//code to create a gameOver.
    gameOver = createSprite(700,200);
    gameOver.addImage(GameOverImg);

//code to create a invisible ground.
    invisibleGround = createSprite(700,550,1500,10);
    invisibleGround.visible = false;

//code to create BounceWall.
    BounceWall = createSprite(650,5,1500,10);
    BounceWall.visible  = false;
    
//code to create a new group of 'stone'.
    stones = new Group();

//code to create a new group of 'coin'.
    coinG = new Group();
    coinA = new Group();
    coinB = new Group();
    coinC = new Group();
    cashD = new Group();
    CashE = new Group();

//code to create a new group of 'Arrow'.
    Arrows = new Group();

//code to set collider for 'runner'.    
    runner.setCollider("rectangle",5,10,100,500,0);
    runner.debug = false;

//code to set collider for 'lion'.
    lion.setCollider("rectangle",5,10,lion.width,lion.height,0);
    lion.debug = false;



}

function draw() {

if(gameState === PLAY){

//make runner bounceOff from BounceWall.
    runner.bounceOff(BounceWall);

//make path velocityX faster when Score is 250.
    path.velocityX = -(2 + 2* Score/250);

//make 'restart','gameOver' in gameState PLAY.
    restart.visible = false;
    gameOver.visible = false;

//code to reset the background (path) from 'x' to '-x'.
    if (path.x<600){ path.x = path.width/2};

//code to jump the 'runner' when space key is pressed.
    if(keyDown("space")&& runner.y >=14) {
       runner.velocityY = -13;
}

//code to add gravity on 'runner'.
    runner.velocityY = runner.velocityY + 0.6;

//code to add gravity on 'lion'.
    lion.velocityY = lion.velocityY + 0.6;

//code to create a 'stone'.
    createStone();

//code to create a 'coin'.
    createCoin();
    createCoin1();
    createCoin2();
    createCoin3();
    createCash4();
    createCash5();

//code to create a ' Arrow'.
    createArrow();

//code to create a Coins.
if (coinG.isTouching(runner)) {
    coinG.destroyEach();
    Score=Score+10;
  }
 else if (coinA.isTouching(runner)) {
    coinA.destroyEach();
    Score=Score+10;
  }
  else if (coinB.isTouching(runner)) {
    coinB.destroyEach();
    Score=Score+10;
  }
  else if (coinC.isTouching(runner)) {
    coinC.destroyEach();
    Score=Score+10;
  }
  else if (cashD.isTouching(runner)) {
    cashD.destroyEach();
    Score=Score+10;
  } 
  else if (CashE.isTouching(runner)) {
    CashE.destroyEach();
    Score=Score+10;
  }
  else if (stones.isTouching(lion)) {
      lion.velocityY = -12;
  }

//code to destroy a coins when lion touching.
  
if (coinG.isTouching(lion)) {
    coinG.destroyEach();
  }
 else if (coinA.isTouching(lion)) {
    coinA.destroyEach();
  }
  else if (coinB.isTouching(lion)) {
    coinB.destroyEach();
  }
  else if (coinC.isTouching(lion)) {
    coinC.destroyEach();
  }
  else if (cashD.isTouching(lion)) {
    cashD.destroyEach();
  } 
  else if (CashE.isTouching(lion)) {
    CashE.destroyEach();
  }
//code to gameState END when 'boy' is touching 'stone'.
else if (stones.isTouching(runner)) {
    gameState = END;
}

//code to gameState END when 'boy' is touching 'Arrow'.
 else if (Arrows.isTouching(runner)) {
    gameState = END;
}

}

//code for gameState 'END'.
else if (gameState === END) {
//code to visible a Restart.
    restart.visible = true;
//code to visible a gameOver.
    gameOver.visible = true;
//code to set velocity of path , runner.
    path.velocityX = 0;
    runner.velocityY = 0;
//code to change the animations of runner.
    runner.changeAnimation("collide", runnerImg);
//code to destroy stone.
    stones.setLifetimeEach(-1);
    stones.destroyEach();
    stones.setVelocityXEach(0);  
//code to destroy Arrow.
    Arrows.setLifetimeEach(-1);
    Arrows.destroyEach();
    Arrows.setVelocityXEach(0);
//code to destroy coinG.
    coinG.setLifetimeEach(-1);
    coinG.destroyEach();
    coinG.setVelocityXEach(0);
//code to destroy coinA.
    coinA.setLifetimeEach(-1);
    coinA.destroyEach();
    coinA.setVelocityXEach(0);
//code to destroy a coinB.
    coinB.setLifetimeEach(-1);
    coinB.destroyEach();
    coinB.setVelocityXEach(0);
//code to destroy a coinC.
    coinC.setLifetimeEach(-1);
    coinC.destroyEach();
    coinC.setVelocityXEach(0);
//code to destroy a cashD.
    cashD.setLifetimeEach(-1);
    cashD.destroyEach();
    cashD.setVelocityXEach(0);
//code to destroy a CashE.
    CashE.setLifetimeEach(-1);
    CashE.destroyEach();
    CashE.setVelocityXEach(0);
//code to destroy 'runner'.
    runner.visible = false;
//code to destroy 'lion'.
    lion.visible = false;
  }
  //stop 'runner' from falling down
  runner.collide(invisibleGround);

  //stop 'lion' from falling down
  lion.collide(invisibleGround);

  if(mousePressedOver(restart)) {
    reset();
  }


//code for draw sprites.
    drawSprites();
    textSize(30);
    fill(255);
    text("Score: "+ Score,1140,50);
    text("Press_Space_Key = 'JUMP'",10,50)
}

//function to create a 'restart'.
    function reset(){
       gameState = PLAY;
       gameOver.visible = false;
       restart.visible = false;
       runner.visible = true;
       lion.visible = true;
       path.velocityX = -2;

       runner.changeAnimation("running",runnerImg);
  
       Score = 0;

}

//Function to create a 'stone'.
    function  createStone() {
        if (frameCount % 300 === 0){
        var stone = createSprite(1400,520,10,40);
        stone.addImage(stoneImg);
        stone.velocityX = -5.6;
        stone.scale = 0.09;
        stone.lifetime = 245;
        stones.add(stone);
        stone.velocityX = -(5.6 + 2* Score/250);
    }
 }
 //function to create a 'Arrow'.
    function  createArrow() {
        if (frameCount % 250 === 0){
        var arrow = createSprite(1400,50,5,40);
        arrow.addImage(ArrowImg);
        arrow.velocityX = -5.6;
        arrow.scale = 0.5;
        arrow.lifetime = 245;
        Arrows.add(arrow);
        arrow.velocityX = -(5.6 + 2* Score/250);
}
}
 //Function to create a 'coin'.
   function  createCoin() {
       if (frameCount % 300 === 0){
       var coin = createSprite(1400,450,10,40);
       coin.addImage(CoinImg);
       coin.velocityX = -5.5;
       coin.scale = 0.03;
       coin.lifetime = 500;
       coinG.add(coin);
       coin.velocityX = -(5.5 + 2* Score/250);
    }
 }
 function  createCoin1() {
    if (frameCount % 280 === 0){
    var coin1 = createSprite(1400,450,10,40);
    coin1.addImage(coinImg);
    coin1.velocityX = -5.5;
    coin1.scale = 0.03;
    coin1.lifetime = 500;
    coinA.add(coin1);
    coin1.velocityX = -(5.5 + 2* Score/250);
   }
}
function  createCoin2() {
    if (frameCount % 260 === 0){
    var coin2 = createSprite(1400,450,10,40);
    coin2.addImage(coinImg);
    coin2.velocityX = -5.5;
    coin2.scale = 0.03;
    coin2.lifetime = 500;
    coinB.add(coin2);
    coin2.velocityX = -(5.5 + 2* Score/250);
 }
}
function  createCoin3() {
    if (frameCount % 240 === 0){
    var coin3 = createSprite(1400,450,10,40);
    coin3.addImage(coinImg);
    coin3.velocityX = -5.5;
    coin3.scale = 0.03;
    coin3.lifetime = 500;
    coinC.add(coin3);
    coin3.velocityX = -(5.5 + 2* Score/250);
 }
}
function  createCash4() {
    if (frameCount % 220 === 0){
    var cash4 = createSprite(1400,450,10,40);
    cash4.addImage(coinImg);
    cash4.velocityX = -5.5;
    cash4.scale = 0.03;
    cash4.lifetime = 500;
    cashD.add(cash4);
    cash4.velocityX = -(5.5 + 2* Score/250);
 }
}
function  createCash5() {
    if (frameCount % 190 === 0){
    var Cash5 = createSprite(1400,450,10,40);
    Cash5.addImage(coinImg);
    Cash5.velocityX = -5.5;
    Cash5.scale = 0.03;
    Cash5.lifetime = 500;
    CashE.add(Cash5);
    Cash5.velocityX = -(5.5 + 2* Score/250);
 }
}

//  ....................THE_END................//