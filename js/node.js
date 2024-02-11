"use strict";



class Basic 
{
    constructor(name)
    {
        this.type="BASIC";
        this.tag="";
        this.name=name;
        this.done=false;
        this.visible=true;
        this.active=true;
        this.scene=null;
        this.actions=[];
        this.children=[];
        this.collide=false;
    }

    update(dt)
    {
       
    }
    process()
    {
        
    }
    render(ctx)
    {
        // Game.SetColor(255,0,255);
        // Game.CircleLine(0,0,2);
    }
    ready()
    {

    }
    close()
    {

    }

    mouse_down(x,y,button)
    {
        
    }
    mouse_up(x,y,button)
    {
        
    }
    mouse_move(x,y)
    {
        
    }

    OnCollision(other)
    {
       
        
    }

    OnHit(other)
    {

    }



    OnUpdate(dt)
    {
        this.update(dt);
        for (const child of this.children) 
        {
            child.OnUpdate(dt);
        }

        for (let i = 0; i < this.actions.length; i++) 
        {
            const action = this.actions[i];
            action.update(dt);
            if (action.done) 
            {
                this.actions.splice(i, 1);
                action.close();
                i--;
            }
        }
       
    }
    OnRender(ctx)
    {
      
        for (const child of this.children) 
        {
            child.OnPreRender(ctx);
            child.OnRender(ctx);
            child.OnPostRender(ctx);
        }
        this.render(ctx);
       
    }
    OnPreRender(ctx)
    {

    }
    OnPostRender(ctx)
    {

    }


    OnProcess()
    {

        this.process();
        for (const child of this.children) 
        {
            child.OnProcess();
        }
    }

    OnMouseDown(x,y,button)
    {
        this.mouse_down(x,y,button);
        for (const child of this.children) 
        {
            child.OnMouseDown(x,y,button);
        }
        
    }
    OnMouseUp(x,y,button)
    {
        this.mouse_up(x,y,button);
        for (const child of this.children) 
        {
            child.OnMouseUp(x,y,button);
        }
        
    }
    OnMouseMove(x,y)
    {
        this.mouse_move(x,y);
        for (const child of this.children) 
        {
            child.OnMouseMove(x,y);
        }
        
    }


    AddAction(action)
    {
        action.parent=this;
        this.actions.push(action); 
        return action;
    }

    RemoveAction(tag)
    {
        for (let i = 0; i < this.actions.length; i++) 
        {
            const action = this.actions[i];
            if (action.tag ===tag) 
            {
                this.actions.splice(i, 1);
                break;
            }
        }
    }

    GetActionByTag(tag)
    {
        for (let i = 0; i < this.actions.length; i++) 
        {
            const action = this.actions[i];
            if (action.tag===tag) 
            {
            return tag;
            }
        }
        return null;
    }

    GetAction(index)
    {
        return  this.actions[index];
    }

    Add(childNode)
    {
        childNode.scene=this.scene;
        this.children.push(childNode);
        childNode.parent = this;
        childNode.ready();
    }
    Remove(name)
    {
        for (let i = 0; i < this.children.length; i++) 
        {
            const child = this.children[i];
            if (child.name === name) 
            {
                child.close(); 
                this.children.splice(i, 1);
                break;
            }
        }
    }
    GetChildByType(type)
    {
        for (let i = 0; i < this.children.length; i++) 
        {
            const child = this.children[i];
            if (child.type === type) 
            {
                return child;
            }
        }
        return null;
    
    }
    GetChild(index)
    {
        return  this.children[index];
    
    }
    GetChildByName(name)
    {
        for (let i = 0; i < this.children.length; i++) 
        {
            const child = this.children[i];
            if (child.name === name) 
            {
                return child;
            }
        }
        return null;
    }

    place_free(x,y,name)
    {
        const nodes = this.scene.nodes;
        for (let i = 0; i < nodes.length; i++) 
        {
            const node = nodes[i];
            if (node.name==this.name) continue;


            if (node.collide && node!==this && node.name===name && this.collide) 
            {
                const shape = node.shape;
                shape.Collide(this,shape,node);
               if ( this.shape.CollideAt(x,y,node,shape))
               {
                    return node;
               }

            }
        }
        return null;
    }

   

}



class AnimationFrame 
{
    constructor(frameNumber, duration)
    {
        this.frameNumber = frameNumber;
        this.duration = duration;
    }
}

class Animation 
{
    constructor(name, frames, fps) 
    {
        this.name=name;
        this.ready=false;
        this.duration= 1000/fps;
        this.frames=[];
        for (let i=0;i < frames.length;i++)
        {
            this.frames.push(frames[i]);
           // console.log(frames[i]);
        }
        this.currentFrame = 0;
        this.lastFrameTime = 0;
       
        this.frame = frames[0] || 0;
      
     //   console.log(`Playing  ${this.name}  frame ${this.frame}`);

 
    }

    MaxFrames()
    {
        return this.frames.length;
    }

    update()
    {
        if (!this.ready) {
            return;
        }
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastFrameTime;

        if (deltaTime >= this.duration) 
        {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            this.lastFrameTime = currentTime;
        }

        this.frame = this.frames[this.currentFrame];
      //  console.log(`Playing  ${this.name}  frame ${this.frame}`);
    }

    play()
    {
        this.ready=true;
        this.currentFrame = 0;
        this.lastFrameTime = Date.now();
    }
    stop()
    {
        this.ready=false;
        this.currentFrame = 0;
        this.lastFrameTime = 0;
    }
    setFrame(index)
    {
        if (index < 0) index = 0;
        if (index >= this.MaxFrames()) index = this.MaxFrames() - 1;
        this.currentFrame = index;
        this.frame = this.frames[index];
        //console.log(this.frames);
     //   console.log(`set frame  ${this.name}  frame ${this.frame}`);
    }
    getFrame()
    {
        return this.frame;
    }
}
class Animator extends Basic
{
    constructor (sprite)
    {
        super("Animator");
        this.animations={};
        this.currentAnimation = null;
        this.type="Animator";
        this.sprite=sprite;
        
    }

    AddAnimation(name,frames, fps) 
    {
        let animation = new Animation(name,frames,fps);
        this.animations[name] =    animation;
        this.currentAnimation =    animation;
    }

    SetAnimation(name)
    {
        if (this.animations[name]) 
        {
            this.currentAnimation = this.animations[name];
        } else 
        {
            console.error(`Animação com nome "${name}" não encontrada.`);
        }
    }

    Play(name) 
    {
        if (this.animations[name]) 
        {
            this.currentAnimation = this.animations[name];
            this.currentAnimation.play();
        } else 
        {
            console.error(`Animação com nome "${name}" não encontrada.`);
        }
    }

    Stop()
    {
        if (this.currentAnimation !== null) {
            this.currentAnimation.stop();
        }
    }
    SetFrame(frame)
    {
        if (this.currentAnimation !== null)
        {
            this.currentAnimation.setFrame(frame);
        }
    }
    
    OnUpdate(dt)
    {
        super.OnUpdate(dt);
        if (this.currentAnimation !== null)
        {
            this.currentAnimation.update(dt);
            
            let frame = this.currentAnimation.getFrame();    

            if (this.sprite!==null && frame!==undefined)
            {
                this.sprite.SetGraph(frame);
            }
        }
    }

}


class Sprite extends Basic
{
    constructor(graph, bound)
    {
        super("Sprite");
        this.graph=graph;
        this.offsetX=0;
        this.offsetY=0;
        this.image = getImage(graph);
        if (bound!==undefined)
        {
            this.useClip=true;
            this.clip = bound;
        } else 
        {
            this.clip = new Bound(0,0,1,1);
            this.useClip=false;
           
        }
        this.type="SPRITE";
        this.width=0;
        this.height=0;
        if (this.image!==undefined)
        {
            this.width = this.image.width;
            this.height = this.image.height;
        }
    }
    SetClip(x,y,w,h)
    {
        this.clip.x=x;
        this.clip.y=y;
        this.clip.width =w;
        this.clip.height=h;
        this.useClip=true;
        this.width  = this.clip.width;
        this.height = this.clip.height;


    }
    SetGraph(gr)
    {
        this.graph =gr;
    }
    OnRender(ctx)
    {
        if (!this.visible) return;
        super.OnRender(ctx);

        this.image = getImage(this.graph);
        if (this.image ===undefined)
        {
           return;
        }
        if (this.image !==null)
        {
            if (this.clip!==null && this.useClip===true)
            {   
                ctx.drawImage(this.image.image,this.clip.x,this.clip.y,sourceWidth,sourceHeight,this.offsetX,this.offsetY,sourceWidth,sourceHeight);
            } else
            {
                this.width  = this.image.width;
                this.height = this.image.height;
                ctx.drawImage(this.image.image,this.offsetX,this.offsetY);
            }
            
        }
    }
}

class BackGround extends Basic
{
    constructor(graph,width,height)
    {
        super("Background");
        this.graph=graph;
        this.width=width;
        this.height=height;
        this.offsetX=0;
        this.offsetY=0;
        this.image = getImage(graph);
        this.type="BACKGROUND";
    }
    OnRender(ctx)
    {
        if (!this.visible) return;
        this.image = getImage(this.graph);
        if (this.image ===undefined)
        {
           return;
        }

        super.OnRender(ctx);
        if (this.image !==null)
        {
            ctx.drawImage(this.image.image,this.offsetX,this.offsetY,this.width,this.height);
        }
    }
}

class ScrollBackground extends Basic
{
    
 



    constructor(graph, x_factor, y_factor, fill_x, fill_y)
    {
        super("ScrollBackground");
        this.graph=graph;
        this.width=width;
        this.height=height;
        this.offsetX=0;
        this.offsetY=0;
        this.image = getImage(graph);
        this.type="SCROLL_BACKGROUND";

        this.scrollX=0;
        this.scrollY=0;
   
   
        this.scrollSpeedX = x_factor || 0;
        this.scrollSpeedY = y_factor || 0;

        this.frag_x = this.scrollSpeedX - Math.floor(this.scrollSpeedX);
        this.frag_y = this.scrollSpeedY - Math.floor(this.scrollSpeedY);


    

        this.fillX=fill_x || false;
        this.fillY=fill_y || false;

        if (this.image!==undefined)
        {
       
            this.max_dist_x = Math.ceil(Game.width / this.image.width)   + 1;
            this.max_dist_y = Math.ceil(Game.height / this.image.height) + 1;

            this.scrollXSize =  this.image.width    + 1;
            this.scrollYSize =  this.image.height   + 1;
            console.log(this.max_dist_x + " " + this.max_dist_y);   
        }
        
    }
    OnProcess()
    {
        super.OnProcess();
        this.scrollX -= 2 * (this.scrollSpeedX);
        this.scrollY -= 2 * (this.scrollSpeedY);
        if (this.image !==null)
        {
            if (this.scrollX > this.scrollXSize) this.scrollX = 0;
            if (this.scrollY > this.scrollYSize) this.scrollY = 0;
            if (this.scrollX < 0) this.scrollX = this.image.width;
            if (this.scrollY < 0) this.scrollY = this.image.height;
        }
    }
    OnRender(ctx)
    {
        if (!this.visible) return;
        this.image = getImage(this.graph);
        if (this.image === undefined)
        {
            console.log("image not found");
           return;
        }

       

        super.OnRender(ctx);
        if (this.image !==null)
        {
    

            this.max_dist_x = Math.ceil(Game.width / this.image.width)   + 1;
            this.max_dist_y = Math.ceil(Game.height / this.image.height) + 1;
    
            this.scrollXSize =  this.image.width    + 1;
            this.scrollYSize =  this.image.height   + 1;
         
            


            let fill_w = (this.fillX) ? Game.width  : this.image.width;
            let fill_h = (this.fillY) ? Game.height : this.image.height;

      
        
            let off_x=0;
            let off_y=0;
            for (let x = 0; x < this.max_dist_x; x++) 
            {
                for (let y = 0; y < this.max_dist_y; y++) 
                {
                   

                    ctx.drawImage(
                        this.image.image, 
                        (-this.scrollX + x * this.image.width)  -off_x,
                        (-this.scrollY + y * this.image.height) -off_y,
                        this.image.width  -off_x,
                        this.image.height -off_y ,
                        this.offsetX,this.offsetY,fill_w,fill_h
                    );

                    off_x += this.frag_x;
                    off_y += this.frag_y;

                }
            }
            

                

            // ctx.fillStyle = 'lime';
            // ctx.font = '13px Arial';
            // ctx.textAlign = 'center';
            // ctx.fillText(`${this.scrollX} ${this.scrollY}  ${this.max_dist_x} ${this.max_dist_y}  ${this.scrollXSize} ${this.scrollYSize}`, 80, 80);
          
        }
    }
}



class Node extends Basic
{
    x=0;
    y=0;
    pivotX=0;
    pivotY=0;
    scaleX=1;
    scaleY=1;
    angle=0;

    constructor(name)
    {
        super(name);
        this.type="NODE";
        this.shape=null;
    }
    SetShape(shape)
    {
        this.shape=shape;
        this.collide=true;
    }
    SetPosition(x,y)    
    {
        this.x=x;
        this.y=y;
    }
    SetScale(x,y)
    {
        this.scaleX=x;
        this.scaleY=y;
    }
    SetPivot(x,y)
    {
        this.pivotX=x;
        this.pivotY=y;
    }
    SetAngle(angle)
    {
        this.angle=angle;
    }

    OnRender(ctx)
    {
        if (!this.visible) return;
        this.angle = ClampAngle(this.angle,0,360);
        var u = this.scaleX*this.pivotX;
        var v = this.scaleY*this.pivotY;
        ctx.save(); 
        ctx.translate(this.x,this.y);
        ctx.rotate(RAD(this.angle));
        ctx.translate(-this.u,-this.v);
        ctx.scale(this.scaleX,this.scaleY);
        super.OnRender(ctx);
        ctx.restore();
      //  Game.SetColor(255,0,0);
     //   Game.Circle(0,0,5);
    }
    
}

class Shape
{
    constructor(color,solid)
    {
        this.color=color || "red";
        this.solid=solid || false;
    }


    CollideAt(x,y,node,shape)
    {
        if (shape instanceof CircleShape && this instanceof CircleShape) 
        {
            let dx = x - node.x;
            let dy = y - node.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < shape.radius + this.radius) 
            {
                return true;
            }
        } else if (shape instanceof RectangleShape && this instanceof RectangleShape) 
        {
            if (x - shape.width/2 < node.x + this.width/2 &&
                x + shape.width/2 > node.x - this.width/2 &&
                y - shape.height/2 < node.y + this.height/2 &&
                y + shape.height/2 > node.y - this.height/2) 
            {
                return true;
            }
        } else if (shape instanceof CircleShape && this instanceof RectangleShape) 
        {
            let circle = shape;
            let rect = this;
            let distX = Math.abs(x - node.x - rect.width / 2);
            let distY = Math.abs(y - node.y - rect.height / 2);
            if (distX > (rect.width / 2 + circle.radius)) 
            {
                return false;
            }
            if (distY > (rect.height / 2 + circle.radius)) 
            {
                return false;
            }
            if (distX <= (rect.width / 2)) 
            {
                return true;
            }
            if (distY <= (rect.height / 2)) 
            {
                return true;
            }
            let dx = distX - rect.width / 2;
            let dy = distY - rect.height / 2;
            return (dx * dx + dy * dy <= (circle.radius * circle.radius));
        } else if (shape instanceof RectangleShape && this instanceof CircleShape) 
        {
            let circle = this;
            let rect = shape;
            let distX = Math.abs(node.x - x - rect.width / 2);
            let distY = Math.abs(node.y - y - rect.height / 2);
            if (distX > (rect.width / 2 + circle.radius)) 
            {
                return false;
            }
            if (distY > (rect.height / 2 + circle.radius)) 
            {
                return false;
            }
            if (distX <= (rect.width / 2)) 
            {
                return  true;
            }
            if (distY <= (rect.height / 2)) 
            {
                return true;
            }
            let dx = distX - rect.width / 2;
            let dy = distY - rect.height / 2;
            return (dx * dx + dy * dy <= (circle.radius * circle.radius));

        }
        return false;


    }

    Collide(nodeA,shapeA,nodeB)
    {
        if (shapeA instanceof CircleShape && this instanceof CircleShape) 
        {
            let dx = nodeA.x - nodeB.x;
            let dy = nodeA.y - nodeB.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < shapeA.radius + this.radius) 
            {
                return true;
            }
        } else if (shapeA instanceof RectangleShape && this instanceof RectangleShape) 
        {
            if (nodeA.x - shapeA.width/2 < nodeB.x + this.width/2 &&
                nodeA.x + shapeA.width/2 > nodeB.x - this.width/2 &&
                nodeA.y - shapeA.height/2 < nodeB.y + this.height/2 &&
                nodeA.y + shapeA.height/2 > nodeB.y - this.height/2) 
            {
                return true;
            }
        } else if (shapeA instanceof CircleShape && this instanceof RectangleShape) 
        {
            let circle = shapeA;
            let rect = this;
            let distX = Math.abs(nodeA.x - nodeB.x - rect.width / 2);
            let distY = Math.abs(nodeA.y - nodeB.y - rect.height / 2);
            if (distX > (rect.width / 2 + circle.radius)) 
            {
                return false;
            }
            if (distY > (rect.height / 2 + circle.radius)) 
            {
                return false;
            }
            if (distX <= (rect.width / 2)) 
            {
                return true;
            }
            if (distY <= (rect.height / 2)) 
            {
                return true;
            }
            let dx = distX - rect.width / 2;
            let dy = distY - rect.height / 2;
            return (dx * dx + dy * dy <= (circle.radius * circle.radius));
        } else if (shapeA instanceof RectangleShape && this instanceof CircleShape) 
        {
            let circle = this;
            let rect = shapeA;
            let distX = Math.abs(nodeB.x - nodeA.x - rect.width / 2);
            let distY = Math.abs(nodeB.y - nodeA.y - rect.height / 2);
            if (distX > (rect.width / 2 + circle.radius)) 
            {
                return false;
            }
            if (distY > (rect.height / 2 + circle.radius)) 
            {
                return false;
            }
            if (distX <= (rect.width / 2)) 
            {
                return true;
            }
            if (distY <= (rect.height / 2)) 
            {
                return true;
            }
            let dx = distX - rect.width / 2;
            let dy = distY - rect.height / 2;
            return (dx * dx + dy * dy <= (circle.radius * circle.radius));

        }
        return false;
    }

}

class CircleShape  extends Shape
{
    constructor(radius,color,solid)
    {
        super(color,solid);
        this.radius=radius;
    }
}

class RectangleShape extends Shape
{
    constructor(width,height,color,solid)
    {
        super(color,solid);
        this.width=width;
        this.height=height;
    }
}

class NodeShape extends Node
{
    constructor(name)
    {
        super(name);
        this.type="NODE_SHAPE";
        this.shape = [];
    }

    render(ctx)
    {
        for (const shape of this.shape) 
        {
            if (shape instanceof CircleShape) 
            {
                if (shape.solid) 
                {
                    ctx.fillStyle = shape.color;
                    ctx.beginPath();
                    ctx.arc(0,0,shape.radius,0,2*Math.PI);
                    ctx.fill();
                } else 
                {
                    ctx.strokeStyle = shape.color;
                    ctx.beginPath();
                    ctx.arc(0,0,shape.radius,0,2*Math.PI);
                    ctx.stroke();
                }
            } else if (shape instanceof RectangleShape) 
            {
                if (shape.solid) 
                {
                    ctx.fillStyle = shape.color;
                    ctx.fillRect(-shape.width/2,-shape.height/2,shape.width,shape.height);
                } else 
                {
                    ctx.strokeStyle = shape.color;
                    ctx.strokeRect(-shape.width/2,-shape.height/2,shape.width,shape.height);
                }
            }
            
        }
    

       
    }

    AddShape(shape)
    {
        this.shape.push(shape);
        return shape;
    }
   
}


// class NodeColider extends Node
// {
//     constructor(name)
//     {
//         super(name);
//         this.type="NODE_COLIDER";
//         this.shapes = [];
//         this.debug=false;
//     }

//     Collide(other)
//     {
//         for (const shape of this.shapes) 
//         {
//             for (const otherShape of other.shapes) 
//             {
//                 if (shape instanceof CircleShape && otherShape instanceof CircleShape) 
//                 {
//                     let dx = this.x - other.x;
//                     let dy = this.y - other.y;
//                     let distance = Math.sqrt(dx * dx + dy * dy);
//                     if (distance < shape.radius + otherShape.radius) 
//                     {
//                         return true;
//                     }
//                 } else if (shape instanceof RectangleShape && otherShape instanceof RectangleShape) 
//                 {
//                     if (this.x - shape.width/2 < other.x + otherShape.width/2 &&
//                         this.x + shape.width/2 > other.x - otherShape.width/2 &&
//                         this.y - shape.height/2 < other.y + otherShape.height/2 &&
//                         this.y + shape.height/2 > other.y - otherShape.height/2) 
//                     {
//                         return true;
//                     }
//                 } else if (shape instanceof CircleShape && otherShape instanceof RectangleShape) 
//                 {
//                     let circle = shape;
//                     let rect = otherShape;
//                     let distX = Math.abs(this.x - other.x - rect.width / 2);
//                     let distY = Math.abs(this.y - other.y - rect.height / 2);
//                     if (distX > (rect.width / 2 + circle.radius)) 
//                     {
//                         return false;
//                     }
//                     if (distY > (rect.height / 2 + circle.radius)) 
//                     {
//                         return false;
//                     }
//                     if (distX <= (rect.width / 2)) 
//                     {
//                         return true;
//                     }
//                     if (distY <= (rect.height / 2)) 
//                     {
//                         return true;
//                     }
//                     let dx = distX - rect.width / 2;
//                     let dy = distY - rect.height / 2;
//                     return (dx * dx + dy * dy <= (circle.radius * circle.radius));
//                 } else if (shape instanceof RectangleShape && otherShape instanceof CircleShape) 
//                 {
//                     let circle = otherShape;
//                     let rect = shape;
//                     let distX = Math.abs(other.x - this.x - rect.width / 2);
//                     let distY = Math.abs(other.y - this.y - rect.height / 2);
//                     if (distX > (rect.width / 2 + circle.radius)) 
//                     {
//                         return false;
//                     }
//                     if (distY > (rect.height / 2 + circle.radius)) 
//                     {
//                         return false;
//                     }
//                     if (distX <= (rect.width / 2)) 
//                     {
//                         return true;
//                     }
//                     if (distY <= (rect.height / 2)) 
//                     {
//                         return true;
//                     }
//                     let dx = distX - rect.width / 2;
//                     let dy = distY - rect.height / 2;
//                     return (dx * dx + dy * dy <= (circle.radius * circle.radius));
//                 }
//             }
//         }
//         return false;
//     }

//     AddShape(shape)
//     {
//         this.shapes.push(shape);
//         return shape;
//     }
//     OnRender(ctx)
//     {
   
//         if (!this.debug) return;
//         super.OnRender(ctx);
//         for (const shape of this.shapes) 
//         {
//             if (shape instanceof CircleShape) 
//             {
//                 if (shape.solid) 
//                 {
//                     ctx.fillStyle = shape.color;
//                     ctx.beginPath();
//                     ctx.arc(0,0,shape.radius,0,2*Math.PI);
//                     ctx.fill();
//                 } else 
//                 {
             
//                     ctx.strokeStyle = shape.color;
//                     ctx.beginPath();
//                     ctx.arc(0,0,shape.radius,0,2*Math.PI);
//                     ctx.stroke();
//                 }
//             } else if (shape instanceof RectangleShape) 
//             {
//                 if (shape.solid) 
//                 {
//                     ctx.fillStyle = shape.color;
//                     ctx.fillRect(-shape.width/2,-shape.height/2,shape.width,shape.height);
//                 } else 
//                 {
//                     ctx.strokeStyle = shape.color;
//                     ctx.strokeRect(-shape.width/2,-shape.height/2,shape.width,shape.height);
//                 }
//             }
            
//         }
    

       
//     }
// }




class Actor  extends Node
{
    constructor(name, mass)
    {
        super(name);
        this.acceleration = new Vector2();
        this.velocity = new Vector2();
        this.force = new Vector2();
        this.angleVelocity = 0;
        this.angleAcceleration = 0;
        this.mass = mass;
 
        

    }

    // Newton's 2nd law: F = M * A
    // or A = F / M
    ApplyForce(force)
    {
        this.acceleration.x += force.x / this.mass;
        this.acceleration.y += force.y / this.mass;
    }
    SetClipBoud(bound,x_dump,y_dump)
    {   

        if (this.x < bound.x)
        {
            this.velocity.x *= -x_dump;
            this.x = bound.x;
        }
        else if (this.x > bound.width)
        {
            this.velocity.x *= -x_dump;
            this.x = bound.width;
        }
        if (this.y < bound.y)
        {
            this.velocity.y *= -y_dump;
            this.y = bound.y;
        }
        else
        if (this.y > bound.height) 
        {
        this.velocity.y *= -y_dump;
        this.y = bound.height;
        }

    }
  

    OnProcess()
    {

        super.OnProcess();
        
        // Velocity changes according to acceleration
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

         // position changes by velocity

        this.x += this.velocity.x ;
        this.y += this.velocity.y ;   

    
        this.angleVelocity += this.angleAcceleration;
        this.angleVelocity = Constrain(this.angleVelocity, -0.1, 0.1);
        this.angle += this.angleVelocity;
    

         // We must clear acceleration each frame
         this.acceleration.x = 0;
         this.acceleration.y = 0;


    }
}
