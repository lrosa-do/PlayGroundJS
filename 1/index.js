"use strict";



class Player extends Actor
{
    constructor()
    {
        super("player");
        this.mass=1;
       
    }
    ready()
    {
        console.log("Player");


   


        this.spriteEyes = new Sprite(4);
        this.spriteEyes.offsetX=20;
        this.spriteEyes.offsetY=20;
        this.animation = new Animator(this.spriteEyes);

     

        this.animation.AddAnimation("idle",[3,4,5,6,7,8,9,10,11,12,13,14,15],6);
        this.animation.SetAnimation("idle");
        this.animation.SetFrame(3);

        this.nodeHead = new Node();
        this.nodeHead.x=-40;
        this.nodeHead.y=-40;

        this.nodeHead.Add(new Sprite(0));
        
        this.nodeHead.Add(this.spriteEyes);
        this.nodeHead.Add(this.animation);


        let w = 40;
        let h = 40;
        let scaleFactor = Math.min(  this.nodeHead.scaleX,   this.nodeHead.scaleY);
  
        this.radius =(Math.min(w,h) ) * scaleFactor;


        this.Add(this.nodeHead);

      
    }


    process()
    {   
    
         let gravity = new Vector2(0, 0.1);
         this.ApplyForce(gravity);

        let friction = this.velocity.get();
        friction.mult(-1);
        friction.normalize();
        friction.mult(0.01);
        this.ApplyForce(friction);

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
      
  

        if (IsMouseButtonDown(0))
        {
            let x = GetMouseX();
            let y = GetMouseY();
            let mouse = new Vector2(x, y);
            let dir = mouse.subtract(new Vector2(this.x, this.y));
            dir.normalize();
            dir.mult(0.005);
            this.ApplyForce(dir);
        }

        let ground = Game.height - 100;

         this.SetClipBoud(new Bound(0,0,SCREEN_WIDTH,ground),1,0.9);

        // let ground = Game.height - 100;

         if (this.y > ground)
         {
          //   this.velocity.y *= -0.9;
             this.y = ground - this.radius;
            
            
         }
   

    }
    
  

}

class MainScene extends Scene 
{

    ready()
    {
        console.log("MAIN");
        

        let backNode = new Node("background");
        backNode.Add(new ScrollBackground(15,0,0,true,true));
        this.Add(backNode);

        let node = new Player();
        
        node.x=Game.width/2;
        node.y=Game.height/2;
 
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


