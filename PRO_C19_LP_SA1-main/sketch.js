var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300, 100, 100);
  ghost.scale = 0.5
  ghost.addImage(ghostImg);
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  
}

function draw() {
  background(200);
if(gameState === "play"){


  if(tower.y > 400){
      tower.y = 300
      
    }
    if(keyDown("space")){
      ghost.velocityY = -4
    }
    
    ghost.velocityY = ghost.velocityY +0.7
    
    if(keyDown("left_arrow")){
      ghost.x= ghost.x-4
    }

    if(keyDown("right_arrow")){
      ghost.x =ghost.x + 4
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(ghost.y>600 || invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy()
      gameState = "end"
    }
spawnDoors()
drawSprites();
      }
      if(gameState === "end"){
        textSize(30)
        text('game over', 250, 250);
      }
     
}
function spawnDoors() {
  if(frameCount%300 == 0){
  door = createSprite(200, 200, 30, 50);
  door.scale = 1
  door.addImage(doorImg);
  door.velocityY = 2
  door.x = random(100, 500)

  climber = createSprite(200, 270, 30, 55);
  climber.scale = 1
  climber.addImage(climberImg);
  climber.velocityY = 2
  climber.x = door.x

  invisibleBlock = createSprite(200, 280);
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  invisibleBlock.debug = true
  invisibleBlock.velocityY = 2
  invisibleBlock.x = door.x

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);

  door.depth = ghost.depth
  ghost.depth +=1
}
}