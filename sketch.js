const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var rope1;
var rope2;
var rope3;
var background_image;
var melon;
var scissor1;
var rabbit_sprite;
var rabbit_animation;
var eat_animation;
var eat_sound;
var cutting_foilage_sound;
var sad_animation;
var sad_sound;
var background_sound;
var balloon;
var star_images
var star_2

let engine;
let world;

function preload() {
  background_image = loadImage("background.png");

  melon = loadImage("melon.png");
  rabbit_animation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat_animation = loadAnimation(
    "Rabbit-01.png",
    "eat_2.png",
    "eat_3.png",
    "eat_4.png"
  );
  eat_sound = loadSound("eating_sound.mp3");
  cutting_foilage_sound = loadSound("Cutting Through Foliage.mp3");
  sad_animation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  sad_sound = loadSound("sad.wav");
  background_sound = loadSound("sound1.mp3");
  //balloon = loadImage("baloon2.png");
  star_images = loadImage("star (1).png");
}

function setup() {
  createCanvas(500, 700);
  background_sound.play();
  background_sound.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;
  scissor1 = createImg("cut_btn.png");
  scissor1.position(220, 50);
  scissor1.size(50, 50);
  scissor1.mouseClicked(detach);
  scissor2 = createImg("cut_btn.png");
  scissor2.position(390, 85);
  scissor2.size(50, 50);
  scissor2.mouseClicked(detach2);
  scissor3 = createImg("cut_btn.png");
  scissor3.position(50, 85);
  scissor3.size(50, 50);
  scissor3.mouseClicked(detach3);
  button1 = createImg("baloon2.png");
  button1.position(170, 350);
  button1.size(150, 150);
  button1.mouseClicked(blow_air);
  rope1 = new Rope(5, { x: 245, y: 30 });
  rope2 = new Rope(4, { x: 415, y: 70 });
  rope3 = new Rope(4, { x: 75, y: 70 });

  fruit = Bodies.circle(250, 350, 30);
  //orld.add(world, fruit);
  Matter.Composite.add(rope1.body, fruit);
  //Matter.Composite.add(rope2.body, fruit)
  ground = Bodies.rectangle(250, 690, 500, 10, { isStatic: true });
  World.add(world, ground);
  connection = new Connection(rope1.body, fruit);
  connection2 = new Connection(rope2.body, fruit);
  connection3 = new Connection(rope3.body, fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  //imageMode(CENTER)
  textSize(50);
  rabbit_sprite = createSprite(250, 585, 100, 100);
  rabbit_sprite.addAnimation("eating", eat_animation);
  rabbit_sprite.addAnimation("sad", sad_animation);
  rabbit_sprite.addAnimation("rabbit", rabbit_animation);
  rabbit_sprite.changeAnimation("rabbit");
  rabbit_sprite.scale = 0.37;
  star1 = createSprite(30,50,50,50)
  star1.addImage(star_images)
  star1.scale= 0.03
  star_2= createSprite(470,50,50,50)
  star_2.addImage(star_images)
  star_2.scale= 0.03
  star1.visible=false
  star_2.visible=false
}

function draw() {
  background(background_image);
  Engine.update(engine);
  rope1.show();
  rope2.show();
  rope3.show();
  //ellipse(fruit.position.x, fruit.position.y, 30, 30);
  if (fruit != null) {
    push();
    imageMode(CENTER);
    image(melon, fruit.position.x, fruit.position.y, 105, 105);
    pop();
  }
  if (check_collison(fruit, rabbit_sprite)) {
    rabbit_sprite.changeAnimation("eating");
    background_sound.stop();
    eat_sound.play();
    star1.visible=true
    star_2.visible=true
  }
  if (fruit != null && fruit.position.y >= 650) {
    rabbit_sprite.changeAnimation("sad");
    background_sound.stop();
    sad_sound.play();
    fruit = null;
  }
  drawSprites();
  //rect(ground.position.x, ground.position.y, 500, 10);
}

function detach() {
  cutting_foilage_sound.play();
  rope1.break();
  connection.connectionbreak();
}

function detach2() {
  cutting_foilage_sound.play();
  rope2.break();
  connection2.connectionbreak();
}

function detach3() {
  cutting_foilage_sound.play();
  rope3.break();
  connection3.connectionbreak();
}

function check_collison(bodyA, bodyB) {
  if (bodyA != null) {
    var distance = dist(
      bodyA.position.x,
      bodyA.position.y,
      bodyB.position.x,
      bodyB.position.y
    );
    if (distance < 80) {
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}
function blow_air() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0, y: -0.1 });
}
