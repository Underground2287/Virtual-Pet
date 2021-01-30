var dog,sadDog,happyDog;
var foodStock;
var database;
var fedTime,lastFed;
var foodS,feed,addFood;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();


  foodObj=new Food();
  foodStock=database.ref('Food')
  foodStock.on('value',readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton('feed the dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton('add the food');
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data) {
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if (lastFed>=12){
    text("lastFed : "+lastFed%12 + "PM",350, 50)
  }
  else 
  if (lastFed==0){
    text("lastFed :12AM", 350, 50);
  }  
  else {
    text("lastFed : "+lastFed + "AM",350, 50)
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}