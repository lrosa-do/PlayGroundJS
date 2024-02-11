"use strict";



class Player extends Actor
{
    constructor(mass,gravitiy,coeficiente)
    {
        super("player");
        this.gravitiy = gravitiy;
        this.coeficiente = coeficiente;
        this.mass = mass;
        this.water = new Bound(0,SCREEN_HEIGHT-250,SCREEN_WIDTH,SCREEN_HEIGHT-50);
        this.OnWater = false;
     
    
       
    }

    calculateDrag() 
    {
        // Magnitude is coefficient * speed squared
        let speed = this.velocity.magnitude();
        let dragMagnitude = this.coeficiente * speed * speed;
    
        // Direction is inverse of velocity
        let dragForce = new Vector2(-this.velocity.x, -this.velocity.y);
        
    
        // Scale according to magnitude
        let dragForceMagnitude = Math.sqrt(dragForce.x * dragForce.x + dragForce.y * dragForce.y);
            dragForce.x /= dragForceMagnitude;
            dragForce.y /= dragForceMagnitude;
            dragForce.x *= dragMagnitude;
            dragForce.y *= dragMagnitude;

        return dragForce;
      }

    ready()
    {
        
        let body =new Node();
        let spr = new Sprite(random(0,2));
        let w = 40;
        let h = 40;
        body.Add(spr);
        body.scaleX=0.5 * this.mass;
        body.scaleY=0.5 * this.mass;
        spr.offsetX = -w;
        spr.offsetY = -h;

        this.Add(body);

        let scaleFactor = Math.min(body.scaleX, body.scaleY);

   
        this.radius =(Math.min(w,h) ) * scaleFactor;

     //   this.radius = Math.sqrt((w * w + h * h) / 4) * Math.sqrt(body.scaleX * body.scaleY);

   

  
   
         let spriteEyes = new Sprite(4);
         spriteEyes.offsetX = -w/2;
         spriteEyes.offsetY = -h/2;



         this.animation = new Animator(spriteEyes);

        let a = Array.from({ length: 16 }, (_, i) => i);

         this.animation.AddAnimation("idle",[3,4,5,6,7,8,9,10,11,12,13,14,15],6);
         this.animation.SetAnimation("idle");
         this.animation.SetFrame(3);

         body.Add(spriteEyes);
         this.Add(this.animation);


      
    }
    render (context)
    {
        // Game.SetColor(255,55,255);
        // Game.CircleLine(0,0,this.radius);
       
        // Game.SetColor(255,55,55);
        // Game.Circle(0,0,1.5);
    }

    update(dt)
    {   

        this.OnWater = this.y> this.water.y;
        if (this.OnWater)
        {
            let dragForce = this.calculateDrag(this.coeficiente);
            this.ApplyForce(dragForce);
          
        }
        let gravityForce = new Vector2(0, this.gravitiy * this.mass);
        this.ApplyForce(gravityForce);
      


        let velocity = this.velocity.magnitude();
        if (velocity > 5.0 && velocity < 10.5)
        {
            this.animation.SetFrame(1);
        }else
        if (velocity > 10.5)
        {
            this.animation.SetFrame(3);
        }
        else
        {
            this.animation.SetFrame(0);
        }
      //  console.log(velocity);

        let ground = (this.water.y+200);
        if (this.y > ground-this.radius)
        {
            this.velocity.y *= -0.9;
            this.y = ground - this.radius;
           
           
        }



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
        backNode.Add(new ScrollBackground(15,0.5,0,true,true));
        this.Add(backNode);


        let window = new Window("Opções",Game.width-300,100,200,250);
       

        this.massas=[];
        let mass_min = 0.5;
        let mass_max = 5;
        this.massas.push(randomFloat(mass_min,mass_max));
        this.massas.push(randomFloat(mass_min,mass_max));
        this.massas.push(randomFloat(mass_min,mass_max));
        this.massas.push(randomFloat(mass_min,mass_max));


       // window.addSlider(25,10,20,100,0,10,1,"Masa KG ",false);
        window.AddSlider(10,10,180,20,mass_min,mass_max,this.massas[0],"1 Masa KG - ",true).OnChange = (value) =>
        {
            this.massas[0] = value;
        }
        window.AddSlider(10,40,180,20,mass_min,mass_max,this.massas[1],"2 Masa KG - ",true).OnChange = (value) =>
        {
            this.massas[1] = value;
        }
        window.AddSlider(10,70,180,20,mass_min,mass_max,this.massas[2],"3 Masa KG - ",true).OnChange = (value) =>
        {
            this.massas[2] = value;
        }
        window.AddSlider(10,100,180,20,mass_min,mass_max,this.massas[3],"4 Masa KG - ",true).OnChange = (value) =>
        {
            this.massas[3] = value;
        }
        window.AddSlider(10,130,180,20, 0.1,2,this.gravitiy,"Gravidade - ",true).OnChange = (value) =>
        {
            this.gravitiy = value;
        }
        window.AddSlider(10,160,180,20, 0,0.4,this.coeficiente,"Coeficiente - ",true).OnChange = (value) =>
        {
            this.coeficiente = value;
        }


        window.AddButton(50,195,"Recomeçar").OnClick = () =>
        {
            this.removePlayer();
            this.addNodes();
        }

        this.Add(window);
        this.addNodes();
      
    }
    addNodes()
    {
        const canvasWidth = Game.width;
        // Largura de cada objeto
        const objectWidth = 80;
        // Número de objetos
        const numObjects = 4;
        // Calcular o espaço entre os objetos
        const spaceBetween = (canvasWidth - (objectWidth * numObjects)) / (numObjects + 1);


        for (let i = 0; i < this.massas.length; i++)
        {
            let x = spaceBetween * (i + 1) + objectWidth * i; 
            let y = 1;
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
        node.x=x;
        this.Add(node);
        return node;
    }
   

    render(context)
    {
       
        Game.SetColor(45,45,100);
        Game.SetAlpha(50);
        Game.Rectangle(0,SCREEN_HEIGHT-250,SCREEN_WIDTH,300);


        Game.SetColor(45,45,45);
        Game.Rectangle(0,SCREEN_HEIGHT-50,SCREEN_WIDTH,10);

        Game.SetAlpha(255);
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

Game.AddImage('assets/actors/face_a.png',"face_a");
Game.AddImage('assets/actors/face_b.png',"face_b");
Game.AddImage('assets/actors/face_c.png',"face_c");
Game.AddImage('assets/actors/face_d.png',"face_d");
Game.AddImage('assets/actors/face_e.png',"face_e");
Game.AddImage('assets/actors/face_f.png',"face_f");
Game.AddImage('assets/actors/face_g.png',"face_g");
Game.AddImage('assets/actors/face_h.png',"face_h");
Game.AddImage('assets/actors/face_i.png',"face_i");
Game.AddImage('assets/actors/face_j.png',"face_j");
Game.AddImage('assets/actors/face_k.png',"face_k");
Game.AddImage('assets/actors/face_l.png',"face_l");
Game.AddImage('assets/Backgrounds/backgroundDesert.png',"backgroundDesert");




Game.LoadImagesDelay(0).then(() => 
{
    console.log("Images loaded");

    Game.AddScene("main", new MainScene());
    Game.SetCurrentScene("main");

    Game.Start();
});


