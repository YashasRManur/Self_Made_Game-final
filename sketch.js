var player, PImg, PAni;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fighter = 0;
var cargo = 0;
var enemyGroup, enemy, eani1, eani2, eani3, eani4, eani5, eimg1, eimg2, eimg3, eimg4, eimg5;
var debrisGroup, debris, dani, dimg;
var bg,bimg;
var gameOver, gimg;
var r;

function preload() {
  PAni = loadAnimation("player_0.png", "player_1.png", "player_2.png");
  PImg = loadAnimation("player_3.png");
  eani1 = loadAnimation("e1_1.png", "e1_2.png", "e1_3.png");
  eimg1 = loadAnimation("e1_0.png");
  eani2 = loadAnimation("e2_1.png", "e2_2.png", "e2_3.png");
  eimg2 = loadAnimation("e2_0.png");
  eani3 = loadAnimation("e3_1.png", "e3_2.png", "e3_3.png");
  eimg3 = loadAnimation("e3_0.png");
  eani4 = loadAnimation("e4_1.png", "e4_2.png", "e4_3.png");
  eimg4 = loadAnimation("e4_0.png");
  eani5 = loadAnimation("e5_1.png", "e5_2.png", "e5_3.png");
  eimg5 = loadAnimation("e5_0.png");
  dani = loadAnimation("sprite_1.png", "sprite_2.png", "sprite_3.png");
  dimg = loadAnimation("sprite_0.png")
  bimg = loadImage("bg.jpg");
  gimg = loadImage("gameOver.png")
}
function setup() {
  createCanvas(800,800);
  bg = createSprite(400, 400, 800, 800);
  bg.addImage(bimg);
  bg.scale = 0.29;
  bg.velocityY = 5;
  player = createSprite(400, 725, 50, 50);
  player.addAnimation("running", PAni);
  player.addAnimation("stopped", PImg);
  player.scale = 0.05;
  gameOver = createSprite(400, 400, 50, 50);
  gameOver.addImage(gimg);
  gameOver.visible = false;
  enemyGroup = new Group();
  debrisGroup = new Group();
}

function draw() {
  background(0);  
  if(gameState === PLAY){
  if (player.x > 55){
    if (keyDown(LEFT_ARROW)){
      player.x = player.x - 20;
    }
  }
  if(player.x < 755){
    if (keyDown(RIGHT_ARROW)){
      player.x = player.x + 20;
    }
  }
  player.changeAnimation("running", PImg);
  bg.velocityY = 5;
  gameOver.visible = false;
  if(bg.y > 650){
    bg.y = 800 / 2;
    bg.velocityY = 5;
  }

  Enemies();
  switch (r) {
    case 1:
      enemy.changeAnimation("running", eani1);
      break;
    case 2:
      enemy.changeAnimation("running", eani2);
      break;
    case 3:
      enemy.changeAnimation("running", eani3);
      break;
    case 4:
      enemy.changeAnimation("running", eani4);
      break;
    case 5:
      enemy.changeAnimation("running", eani5);
      break;
  }
  if(frameCount % 60 === 0){
    fighter++;
  }
  SpawnDebris();
  //debris.changeAnimation("running", dani);
  if (debrisGroup.isTouching(player)){
    cargo++;
    debrisGroup.destroyEach();
  }
  if (enemyGroup.isTouching(player)) {
    gameState = END;

  }
}
 else if (gameState === END) {
  bg.velocityY = 0;
  enemyGroup.setLifetimeEach(-1);
  enemyGroup.setVelocityYEach(0);
  debrisGroup.setLifetimeEach(-1);
  debrisGroup.setVelocityYEach(0);
  player.changeAnimation("stopped", PAni);
  //debris.changeAnimation("stopped",dimg)
  switch (r) {
    case 1:
      enemy.changeAnimation("stopped", eimg1);
      break;
    case 2:
      enemy.changeAnimation("stopped", eimg2);
      break;
    case 3:
      enemy.changeAnimation("stopped", eimg3);
      break;
    case 4:
      enemy.changeAnimation("stopped", eimg4);
      break;
    case 5:
      enemy.changeAnimation("stopped", eimg5);
      break;
  }

  gameOver.visible = true;
  if (mousePressedOver(gameOver)){
    fighter = 0;
    cargo = 0;
    gameState = PLAY;
    enemyGroup.destroyEach();
    debrisGroup.destroyEach();
  }
}

  drawSprites();
  textSize(40);
  strokeweight = 13;
  stroke("white");
  fill("white");
  text("Fighters Evaded : " + fighter, 0, 40);
  text("Cargo Destroyed : " + cargo, 425, 40);

}

function Enemies(){
  var pos = Math.round(random(55, 755));
  if (frameCount % 60 === 0) {
    enemy = createSprite(pos, 50, 50, 50);
    enemy.scale = 0.05;
    enemy.velocityY = 10;
    r = Math.round(random(1, 5));
    switch (r) {
      case 1:
        enemy.addAnimation("running", eani1);
        enemy.addAnimation("stopped", eimg1);
        break;
      case 2:
        enemy.addAnimation("running", eani2);
        enemy.addAnimation("stopped", eimg2);
        break;
      case 3:
        enemy.addAnimation("running", eani3);
        enemy.addAnimation("stopped", eimg3);
        break;
      case 4:
        enemy.addAnimation("running", eani4);
        enemy.addAnimation("stopped", eimg4);
        break;
      case 5:
        enemy.addAnimation("running", eani5);
        enemy.addAnimation("stopped", eimg5);
        break;
    }
    enemyGroup.add(enemy);
  }
}

function SpawnDebris() {
  var x = Math.round(random(55, 755))
  if (frameCount % 200 === 0){
    debris = createSprite(x, 50, 50, 50);
    debris.addAnimation("running", dani);
    debris.addAnimation("stopped", dimg);
    debris.scale = 0.05;
    debris.velocityY = 20;
    debrisGroup.add(debris);
  }
}
