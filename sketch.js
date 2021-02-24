
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var treeObj, stoneObj,groundObject, slingshotObj;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8;
var world,boy;
var gameState = "attached";

function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100, 100, 30);
	mango2=new mango(1000, 100, 30);
	mango3=new mango(950, 130, 30);
	mango4=new mango(1020, 180, 30);
	mango5=new mango(1150, 210, 30);
	mango6=new mango(1080, 210, 30);
	mango7=new mango(970, 240, 30);
	mango8=new mango(1200, 250, 30);
	stoneObj = new stone(220, 400, 30)
	treeObj=new tree(1050, 580);
	groundObject=new ground(width/2,600, width,20);
	slingshotObj = new slingshot(stoneObj.body,{x:220, y:400});

	Engine.run(engine);
}

function draw() {

  background(230);
  textSize(30);
  fill("black");
  text("Hit the Mangoes to Make Them Fall!", 80, 100)
  text("Press Space to Try Again!", 125, 150);
  image(boy ,200,340,200,300);

  detect(stoneObj, mango1);
  detect(stoneObj, mango2);
  detect(stoneObj, mango3);
  detect(stoneObj, mango4);
  detect(stoneObj, mango5);
  detect(stoneObj, mango6);
  detect(stoneObj, mango7);
  detect(stoneObj, mango8);

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();
  stoneObj.display();
  slingshotObj.display();
  groundObject.display();
}

function detect(lstone, lmango){
	mangoBodyPosition = lmango.body.position;
	stoneBodyPosition = lstone.body.position;

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);

	if(distance <= lmango.r + lstone.r){
		Matter.Body.setStatic(lmango.body, false);
	}
}

function mouseDragged(){
	Matter.Body.setPosition(stoneObj.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshotObj.fly();
	gameState = "released";
}

function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(stoneObj.body, {x : 220, y : 400});
        slingshotObj.attach(stoneObj.body);
    }
}
