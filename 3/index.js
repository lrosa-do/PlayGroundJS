"use strict";

class Atractor extends Actor
{
    constructor()
    {
        super("attractor");
     
     }

   
     ready()
     {
 
        
         this.mass=20;
         this.G=1;

         let body =new Node();
         let spr = new Sprite(4);
         let w = 40;
         let h = 40;
         body.Add(spr);
         body.scaleX=1;
         body.scaleY=1;
         spr.offsetX = -w;
         spr.offsetY = -h;
 
         this.Add(body);
 
         let scaleFactor = Math.min(body.scaleX, body.scaleY);
 
    
         this.radius =(Math.min(w,h) ) * scaleFactor;
   
    
          this.spriteEyes = new Sprite(9);
          this.spriteEyes.offsetX = -w/2;
          this.spriteEyes.offsetY = -h/2;
          body.Add(this.spriteEyes);

          this.SetShape( new CircleShape(this.radius));

          
        //   let collider = new NodeColider();
        //   collider.AddShape(new CircleShape(this.radius));
        //   this.Add(collider);

        
 
      
    
 
       
     }
     attract(mover)
     {
         // Calculate direction of force
        let force = new Vector2(this.x - mover.x, this.y - mover.y);
        
        // Distance between objects
        let distance = force.magnitude();
        
        // Limiting the distance to eliminate "extreme" results for very close or very far objects
        distance = Constrain(distance,5, 25);


        let strength = (this.G * this.mass * mover.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
         force.setMag(strength);
        
         return force;
     }

    process()
    {
        let mover = this.place_free(this.x,this.y,"player");
        if (mover)
        {
            this.spriteEyes.graph=9;
        } else 
        {
            this.spriteEyes.graph=10;
            
        }
        let width = Game.width;
        let height = Game.height;
        //move a janela com o resize do game 
        if (this.x > width-this.width)
        {
            this.x = width-this.width;
        } 
        if (this.y > height-this.height)
        {
            this.y = height-this.height;
        }

    }
    mouse_down(x,y,button)
    {
        this.x = x;
        this.y = y;
    }
    OnCollision(other)
    {
        other.OnHit(this);
    }
 

}
        

class Player extends Actor
{
    constructor(mass,gravitiy)
    {
        super("player");
        this.gravitiy = gravitiy;

        this.mass = mass;
        
    
       
    }

  
    ready()
    {

          
        let body =new Node();
        let spr = new Sprite(random(0,3));
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
  
   
         let spriteEyes = new Sprite(6);
         spriteEyes.offsetX = -w/2;
         spriteEyes.offsetY = -h/2;



         this.animation = new Animator(spriteEyes);

 

         this.animation.AddAnimation("idle",[5,6,7,8,9,10,11,12,13,14,15,16],6);
         this.animation.SetAnimation("idle");
         this.animation.SetFrame(3);

         body.Add(spriteEyes);
         this.Add(this.animation);

         this.SetShape( new CircleShape(this.radius));

        //  let collider = new NodeColider();
        //  collider.AddShape(new CircleShape(this.radius));
        //  this.Add(collider);


     
   

      
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


    }
    
  

}

class MainScene extends Scene 
{

    gravitiy = 0.1;

    

    ready()
    {
        console.log("MAIN");
        

        let backNode = new Node("background");
        backNode.Add(new ScrollBackground(getImageIndex("backgroundColorGrass"),0,0,true,true));
        this.Add(backNode);
        this.players =[];




        for (let i = 0; i < 20; i++) 
        {
           let n= this.addNode(random(10,Game.width-40), random(10,Game.height-40), random(0.1, 1));
           this.players.push(n); 
        }


        this.attractor = new Atractor();
        this.attractor.x = Game.width/2;
        this.attractor.y = Game.height/2;
        this.Add(this.attractor);

        


       




      
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
       this.players =[];
    }
    addNode(x,y,mass)
    {

        
        

        let node = new Player(mass,this.gravitiy);

     
        node.y=y;
    
        node.x= x ;
     
        
        this.Add(node);
        return node;
    }
   

    render(context)
    {
       
      
    }
    update(dt)
    {
        for (let i = 0; i < this.players.length; i++) 
        {
            let force = this.attractor.attract(this.players[i]);
            this.players[i].ApplyForce(force);
        }

       // this.Collide();
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
Game.AddImage('assets/actors/pink_body_squircle.png',"pink_body_squircle");
Game.AddImage('assets/actors/yellow_body_squircle.png',"yellow_body_squircle");//4

Game.AddImage('assets/actors/face_a.png',"face_a");//5
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
Game.AddImage('assets/actors/face_l.png',"face_l");//16

Game.AddImage('assets/Backgrounds/backgroundColorGrass.png',"backgroundColorGrass");




Game.LoadImagesDelay(0).then(() => 
{
    console.log("Images loaded");

    Game.AddScene("main", new MainScene());
    Game.SetCurrentScene("main");

    Game.Start();
});


