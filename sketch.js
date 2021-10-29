var path , pathImg;
var boy , boyImg;
var coin , coinImg , coinG;
var tree , treeImg , treeG;
var leftBoundary,rightBoundary,bottomBoundary;
var edges;
var score = 0;
var winSound , looseSound;
function preload(){
    pathImg = loadImage("Road.jpg");
    boyImg = loadAnimation("jake1.png ","jake2.png","jake3.png","jake4.PNG","jake5.png");
    coinImg = loadImage("coin_1-removebg-preview.png");
    treeImg = loadImage("tree-removebg-preview.png");
    winSound = loadSound("mario.mp3");
    //looseSound = loadSound("Loosing.mp3");
}


function setup(){
    createCanvas(800,600);

    path = createSprite(400,200);
    path.addImage(pathImg);
    path.velocityY = 4.5;
    path.scale = 1.5;    


    boy = createSprite(180,340,30,30);
    boy.addAnimation("JakeRunning",boyImg);

    coinG = new Group();
    treeG = new Group();

    leftBoundary=createSprite(0,0,100,800);
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;

bottomBoundary=createSprite(0,0,0,800);
bottomBoundary.visible = false;

score = 0;
stroke("red");
fill("red");
textSize(20);
}


function draw(){
    background(0);


    boy.x = World.mouseX;
    edges= createEdgeSprites();
    boy.collide(leftBoundary);
    boy.collide(rightBoundary);
    boy.collide(bottomBoundary);    
    /*if(keyDown("space")){
        boy.velocityY = -10;
    }*/

    //boy.velocityY = boy.velocityY + 0.8;
    if (path.y > 400){
        path.y = height/2;
    }
    
    if(coinG.isTouching(boy)){
        coinG[0].destroy();
        score = score+10;
        winSound.play();

    }
    if(treeG.isTouching(boy)){
        treeG[0].destroy();
        score = score-5;
       // looseSound.play();

    }


    createCoin();
    createTree();
    drawSprites();

    
    text("Score : " +score , 150,30);

}
function createCoin (){
   if(World.frameCount % 200 === 0){
       var coin = createSprite(Math.round(random(100,600), 40,10,10));
       coin.addImage(coinImg);

       coin.scale = 0.5; 
       coin.velocityY = 3;
       coin.lifetime = 150;
       coinG.add(coin);
   }
}

function createTree (){
    if(World.frameCount % 410 === 0){
        var tree = createSprite(Math.round(random(100,600), 40,10,10));
        tree.addImage(treeImg);

        tree.scale = 1;
        tree.velocityY = 3;
        tree.lifetime = 150;
        treeG.add(tree);
    }
}
