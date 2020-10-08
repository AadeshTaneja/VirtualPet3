class Food{
    constructor(){
        this.image=loadImage("Milk.png")
         this.foodStock;
        this.lastFed;
        
    }
    bedroom(){
        background(bedroom,550,550)
    } 
    garden(){
        background(garden,550,550)
    }
     washroom(){
        background(washroom,550,550)
     }
     updateFoodStock(food){
        foodS = food;
        database.ref('/').update({Food: food});
    }
  
    display(){
        var x=80,y=50;
        imageMode(CENTER);
      //  image(this.image,720,220,70,70);

        if(this.foodStock!==0){
            for (var i = 0;i<foodS;i++){
                if(i%10===0){
                    x=80
                    y=y+50
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }    
        }
    }

}
