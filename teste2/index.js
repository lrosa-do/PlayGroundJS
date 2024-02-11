"use strict";



class Player extends Actor
{
    constructor(mass,gravitiy,coeficiente)
    {
        super("player");
        this.gravitiy = gravitiy;
        this.coeficiente = coeficiente;
        this.mass = mass;
        

        // let body =new Node();
        // body.Add(new Sprite(getImageIndex("green_body_squircle")));
        // body.x=-40;
        // body.y=-40;
        // this.Add(body);
 
    
       
    }

  
    ready()
    {

        let body =new Node();
        let spr = new Sprite(getImageIndex("green_body_squircle"));
        let w = spr.width;
        let h = spr.height;
        body.Add(spr);
        body.scaleX=0.5 * this.mass;
        body.scaleY=0.5 * this.mass;
        spr.offsetX = -w/2;
        spr.offsetY = -h/2;

        this.Add(body);

   
        this.radius =(Math.min(w,h) / 2) * (body.scaleX * body.scaleY);
   

      
    }
    render (context)
    {
        Game.SetColor(255,55,255);
        Game.CircleLine(0,0,this.radius);
       
        Game.SetColor(255,55,55);
        Game.Circle(0,0,1.5);
        
    }

    update(dt)
    {   

        



    }
    
  

}

class MainScene extends Scene 
{

    gravitiy = 0.1;
    coeficiente = 0.1;
    

    ready()
    {
        console.log("MAIN");
        

        let backNode = new Node("background");
        backNode.Add(new ScrollBackground(getImageIndex("backgroundDesert"),0,0,true,true));
        this.Add(backNode);


        let mass =2;

        let node = new Player(mass,this.gravitiy,this.coeficiente);
        
      //  node.scaleX=0.5 * mass;
      //  node.scaleY=0.5 * mass;
        node.x= 400;
        node.y= 200;
     
        
        this.Add(node);




      
    }
    addNodes()
    {

        for (let i = 0; i < this.massas.length; i++)
        {
            let x = 40 + (i*100);
            let y = 100;
            this.addNode(x,y,this.massas[i]);
        }
    }
    removePlayer()
    {
       for (let i = 0; i < this.nodes.length; i++)
       {
           if (this.nodes[i].name == "player")
           {
               this.nodes.splice(i,1);
              i--;
           }
       }
    }
    addNode(x,y,mass)
    {

        
        

        let node = new Player(mass,this.gravitiy,this.coeficiente);

     
        node.y=y;
        node.scaleX=0.5 * (mass*0.5);
        node.scaleY=0.5 * (mass*0.5);
        node.x= x + (mass * node.scaleX);

     
        
        this.Add(node);
    }
   

    render(context)
    {
       
      
    }
    update(dt)
    {

    }
    
    mouse_down(x,y,button)
    {
        
       
    }
    mouse_up(x,y,button)
    {
         
    }
    resize(w,h)
    {

       
    }
}




let width  = window.innerWidth;
let height =window.innerHeight;

Game.Init(true,width, height);

Game.AddImage('assets/actors/red_body_squircle.png',"red_body_squircle");
Game.AddImage('assets/actors/blue_body_squircle.png',"blue_body_squircle");
Game.AddImage('assets/actors/green_body_squircle.png',"green_body_squircle");


Game.AddImage('assets/Backgrounds/backgroundDesert.png',"backgroundDesert");




Game.LoadImagesDelay(0).then(() => 
{
    console.log("Images loaded");

    Game.AddScene("main", new MainScene());
    Game.SetCurrentScene("main");

    Game.Start();
});


