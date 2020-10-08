var dog,dog_img, happyDog, database, foodS, foodStock,
milk,milk_img;
var fedTime,lastFed;
var foodObj,feed,add,name,readState,readGameState,update,bedroom, garden,washroom,currentTime,sad,bathing
var gameState="Hungry"
function preload()
{
  dog_img = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  bedroom  = loadImage("Bed Room.png")
  washroom = loadImage("Wash Room.png");
  garden = loadImage("Garden.png");
  sad = loadImage("Lazy.png")
  bathing = loadImage("Happy.png")
 
  

}

function setup() {
  var greeting = createElement('h3')
  var naming = createElement('h2')
  createCanvas(1000, 500);
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  readState = database.ref('gameState');
  readState.on("value",function(data){
    readGameState=data.val();
  });

  dog = createSprite(690,280,20,20);
  dog.addImage("img",dog_img);
  dog.scale=0.3;

 
  
  
  
naming.html("Enter Your Dogname First and click on enter")
naming.position(500,100)
 add = createButton("Add Food");
 add.position(800,105);
 add.mousePressed(addFoods)

 dogname = createInput("ENTER YOUR DOG NAME");
 dogname.position(450,80)
 feedback = createInput("How did you like this game and your pet??");
 feedback.position(1050,80)

 name = dogname.value()
 feed = createButton("Feed Dog")
  feed.position(680,105);
  feed.mousePressed(feedDog)
  
 

//  button = createButton("Enter")
 // button.position(620,80)
 
 


 submit = createButton("SUBMIT");
 submit.position(800,495);
 submit.mousePressed(function (){

  submit.hide();
     feedback.hide();
     feed.hide();
     add.hide();
    dogname.hide();
    naming.hide();
    button.hide();   
     greeting.html("THANKS for feedback from your tommy!!😘😘😍");
     greeting.position(800, 150);
    
 })

 

 foodObj = new Food();
  
  
  
}


function draw() {  
  
  background (46, 139, 87) 

  
 
 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Feed :"+lastFed%12+" PM",350,30);
 }else if(lastFed===0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+lastFed+" AM",350,30)
 }

  currentTime = hour();
 if(currentTime==(lastFed+1)){
   update("Playing")
   foodObj.garden();
 }else if(currentTime==(lastFed+2)){
   update("Sleeping")
   foodObj.bedroom();
 }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
   update("Bathing")
   foodObj.washroom();
 }else{
   update("Hungry");
   foodObj.display();
 }
 

if(gameState!=="Hungry"){
  feed.hide();
  add.hide();
  dog.remove();
  
  
  
}else{
  feed.show();
  add.show();
  dog.visible=false
 image(sad,690,280,250,250)
 
}

// foodObj.display();
  drawSprites();
  
 
  
 //if(foodS!==undefined)  {
   textSize(24);
 fill("yellow")
 text("Available food: "+foodS,450,410);
 //

  
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x==0){
    x=20;
  }
    else{
      x=x-1;
    }
  database.ref('/').update({
    Food:x
  })

}
function addFoods(){
  //foodObj.updateFoodStock(foodS)
  foodS++
  database.ref('/').update({
 Food:foodS
 
  })

}

function feedDog(){

  dog.addImage("happyDog",happyDog)
 
 
  foodS--;
 if(foodS<=0){
 
   foodS=0
 }
 // foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 //fedTime:hour()
 lastFed=hour()

 database.ref('/').update({
  FeedTime:lastFed
 })


 database.ref('/').update({
   Food:foodS
  // Food:foodObj.getFoodStock(),
   
 })  


}

function entername(){
 feed.show();
}
function update(state){

  database.ref('/').update({
    gameState:state

  });
}




