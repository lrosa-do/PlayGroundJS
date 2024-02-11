/*jslint-disable*/
"use strict";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
if (!ctx) 
{
  throw new Error("Failed to get 2d context");
}

const KEY_A = 0x41, KEY_B = 0x42, KEY_C = 0x43, KEY_D = 0x44, KEY_E = 0x45, KEY_F = 0x46, KEY_G = 0x47, KEY_H = 0x48, KEY_I = 0x49, KEY_J = 0x4A, KEY_K = 0x4B, KEY_L = 0x4C, KEY_M = 0x4D, KEY_N = 0x4E, KEY_O = 0x4F, KEY_P = 0x50, KEY_Q = 0x51, KEY_R = 0x52, KEY_S = 0x53, KEY_T = 0x54, KEY_U = 0x55, KEY_V = 0x56, KEY_W = 0x57, KEY_X = 0x58, KEY_Y = 0x59, KEY_Z = 0x5A, KEY_0 = 0x30, KEY_1 = 0x31, KEY_2 = 0x32, KEY_3 = 0x33, KEY_4 = 0x34, KEY_5 = 0x35, KEY_6 = 0x36, KEY_7 = 0x37, KEY_8 = 0x38, KEY_9 = 0x39, KEY_0_PAD = 0x60, KEY_1_PAD = 0x61, KEY_2_PAD = 0x62, KEY_3_PAD = 0x63, KEY_4_PAD = 0x64, KEY_5_PAD = 0x65, KEY_6_PAD = 0x66, KEY_7_PAD = 0x67, KEY_8_PAD = 0x68, KEY_9_PAD = 0x69, KEY_F1 = 0x70, KEY_F2 = 0x71, KEY_F3 = 0x72, KEY_F4 = 0x73, KEY_F5 = 0x74, KEY_F6 = 0x75, KEY_F7 = 0x76, KEY_F8 = 0x77, KEY_F9 = 0x78, KEY_F10 = 0x79, KEY_F11 = 0x7a, KEY_F12 = 0x7b, KEY_ESC = 0x1B, KEY_TILDE = 0xc0, KEY_MINUS = 0xbd, KEY_EQUALS = 0xbb, KEY_BACKSPACE = 0x08, KEY_TAB = 0x09, KEY_OPENBRACE = 0xdb, KEY_CLOSEBRACE = 0xdd, KEY_ENTER = 0x0D, KEY_COLON = 0xba, KEY_QUOTE = 0xde, KEY_BACKSLASH = 0xdc, KEY_COMMA = 0xbc, KEY_STOP = 0xbe, KEY_SLASH = 0xBF, KEY_SPACE = 0x20, KEY_INSERT = 0x2D, KEY_DEL = 0x2E, KEY_HOME = 0x24, KEY_END = 0x23, KEY_PGUP = 0x21, KEY_PGDN = 0x22, KEY_LEFT = 0x25, KEY_RIGHT = 0x27, KEY_UP = 0x26, KEY_DOWN = 0x28, KEY_SLASH_PAD = 0x6F, KEY_ASTERISK = 0x6A, KEY_MINUS_PAD = 0x6D, KEY_PLUS_PAD = 0x6B, KEY_ENTER_PAD = 0x0D, KEY_PRTSCR = 0x2C, KEY_PAUSE = 0x13, KEY_EQUALS_PAD = 0x0C, KEY_LSHIFT = 0x10, KEY_RSHIFT = 0x10, KEY_LCONTROL = 0x11, KEY_RCONTROL = 0x11, KEY_ALT = 0x12, KEY_ALTGR = 0x12, KEY_LWIN = 0x5b, KEY_RWIN = 0x5c, KEY_MENU = 0x5d, KEY_SCRLOCK = 0x9d, KEY_NUMLOCK = 0x90, KEY_CAPSLOCK = 0x14;
/*jslint-enable*/

let SCREEN_WIDTH = 1024;
let SCREEN_HEIGHT = 720;

let game_images = [];

let currentButtonState=[];
let previousButtonState=[];

let MouseX=0;
let MouseY=0;

let previous=0.0;
let elapsed=0.0;
let frameCount = 0;
let fps = 60;
let fpsUpdateTime = 0;
let deltaTime = 0.0;

let mCurrentTime, mElapsedTime, mPreviousTime = Date.now(),
mLagTime = 0;
let kFPS = 60;
// Frames per second
let kFrameTime = 1 / kFPS;
let mUpdateIntervalInSeconds = kFrameTime;
let kMPF = 1000 * kFrameTime; // Milliseconds per frame.

function GetMouseX()
{
    return MouseX;
}

function GetMouseY()
{
    return MouseY;
}
function IsMouseButtonDown(button)
{
    let down = false;
    if (currentButtonState[button] === true) down = true;
    return down;
}


function IsMouseButtonPressed(button)
{
    let pressed = false;

    if ((currentButtonState[button] === true) && (previousButtonState[button] === false)) pressed = true;


    return pressed;
}

function IsMouseButtonReleased(button)
{
    let released = false;
    if ((currentButtonState[button] === false) && (previousButtonState[button] === true)) released = true;

    return released;
}

function IsMouseButtonUp(button)
{
    let up = false;
    if (currentButtonState[button] === false) up = true;
    return up;
}

function getImage(index)
{
    if (index<0)
        index=0;
    if (index>game_images.length)
        index=game_images.length;
    return game_images[index];
}

function setImageName(index,name)
{
    game_images[index].name=name;
}

function getImageIndex(name)
{
    for (let i = 0; i < game_images.length; i++)
    {
        const image = game_images[i];
        if (image.name === name)
        {
            return i;
        }
    }
    console.log(`Imagem "${name}" não encontrada.`);
    return -1;
}


function getImageByName(name)
{
    for (let i = 0; i < game_images.length; i++)
    {   
        const image = game_images[i];
        if (image.name === name)
        {
            return image;
        }
    }
    console.log(`Imagem "${name}" não encontrada.`);
    return null;
}

function resizeCanvas(width, height ) 
{
    SCREEN_WIDTH  = width;
    SCREEN_HEIGHT = height;
    if (Game.fillScreen)
    {
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
    }
    Game.width = SCREEN_WIDTH;
    Game.height = SCREEN_HEIGHT;
  //  console.log(Game.width + " " + Game.height);
}
//********************************************************************************************** */

class Graph
{
    constructor(image,name,id)
    {
        this.image=image;
        this.name=name;
        this.id=id;
        this.width=image.width;
        this.height=image.height;
        console.log("Create Graph "+ name + " " + id+  " (" + this.width + " " + this.height+")");
    }
   

}
class Scene
{
    width=0;
    height=0;
    constructor() 
    {   
      this.name=null;
      this.nodes=[];
      this.nodeToremove=[];
    }

    ready()
    {

    }

    close()
    {

    }

    render(context)
    {

    }

    update(dt)
    {

    }
    process()
    {

    }
    resize(width,height)
    {

    }
    mouse_down(x,y,b)
    {

    }
    mouse_up(x,y,b)
    {

    }
    mouse_move(x,y)
    {

    }

    Count()
    {
        return this.nodes.length;
    }
    
    Clear()
    {
        this.nodeToremove=[];
        this.nodes=[];
    }

    Add(node)
    {
        if (fps<=30) return;
        node.scene=this;
        this.nodes.push(node);
        node.ready();
    }

    Collide()
    {



        for (let i = 0; i < this.nodes.length - 1; i++)
        {
            const nodeA = this.nodes[i];
             for (let j = i + 1; j < this.nodes.length; j++)
            {
                const nodeB = this.nodes[j];

                if (nodeA === nodeB) continue;
                if (nodeA.collide && nodeB.collide)
                {
                    let shapeA = nodeA.shape;
                    let shapeB = nodeB.shape;
                    if (shapeA && shapeB)
                    {
                        if (shapeA.Collide(nodeA,shapeA,nodeB))
                        {
                            nodeA.OnCollision(nodeB);
                            nodeB.OnCollision(nodeA);
                        }
                    }
                }
                           
            }
        } 

    }

    Remove(name)
    {
        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
            if (child.name === name) 
            {
                this.nodeToremove.push(child); 

                this.nodes.splice(i, 1);
                break;
            }
        }
    }
    GetNodeByName(name)
    {
        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
            if (child.name === name) 
            {
                return child;
            }
        }
        console.log(`Node "${name}" não encontrado.`);  
        return null;
    }
    GetNodesByName(name)
    {
        let nodes = [];
        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
            if (child.name === name) 
            {
                nodes.push(child);
            }
        }
        return nodes;
    }

    GetNode(index)
    {
        return this.nodes[index];
    }

    Collision(callback)
    {
        

       
    }



    OnRender()
    {
      
        for (const node of this.nodes) 
        {
            if (node.visible)
            {
                node.OnPreRender(ctx);
                node.OnRender(ctx);
                node.OnPostRender(ctx);
                
            }
        } 
        this.render(ctx);
    
    }
    OnProcess()
    {
        this.process();

        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
           
                if (child.active)
                    child.OnProcess();
        }
    }

    OnUpdate(dt)
    {
        this.update(dt);

        

        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
            child.scene=this;
            if (child.done) 
            {
                this.nodeToremove.push(child); 
                this.nodes.splice(i, 1);
                i--;
            } else 
            {
                if (child.active)
                    child.OnUpdate(dt);
            }
         
        }
        
        
        for (const removedNode of this.nodeToremove) 
        {
            removedNode.close();
            console.log(`Node "${removedNode.name}" foi removido.`);
        }
        this.nodeToremove = [];
    }

    OnMouseDown(x,y,b)
    {
        this.mouse_down(x,y,b);
        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
            if (child.active && child.visible)
                child.OnMouseDown(x,y,b);
        }
    }
    OnMouseUp(x,y,b)
    {
        this.mouse_up(x,y,b);
        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
            if (child.active && child.visible)
                child.OnMouseUp(x,y,b);
        }
    }
    OnMouseMove(x,y)
    {
        this.mouse_move(x,y);
        for (let i = 0; i < this.nodes.length; i++) 
        {
            const child = this.nodes[i];
            if (child.active && child.visible)
                child.OnMouseMove(x,y);
        }
    }
    OnResize(w,h)
    {
        this.width  = w;
        this.height = h;
        this.resize(w , h);
    }
 
}


class Game 
{
    static isRunning = false;
    static isReady=false;
    static button = 0;
    static currentScene = null;
    static scenes = {};
    static imagesToLoad=[];
    static width = window.innerWidth;
    static height = window.innerHeight;
    static rect = canvas.getBoundingClientRect();
    static callReady = false;

    static Init(fill,w,h,smooth) 
    {
        smooth = (typeof smooth !== 'undefined') ?  smooth : true;
        this.width  = w || window.innerWidth;
        this.height = h || window.innerHeight;
        this.fillScreen= fill;
        canvas.width = this.width;
        canvas.height = this.height;
        SCREEN_WIDTH = this.width;
        SCREEN_HEIGHT = this.height;
     
     
        	// turn off image aliasing
            ctx.mozImageSmoothingEnabled = smooth;
            ctx.webkitImageSmoothingEnabled = smooth;
            ctx.imageSmoothingEnabled = smooth;
            let wi = this.width/4;
            this.progressBar = 
            {
                x: (this.width  / 2)-wi/2,
                y: this.height / 2,
                width: this.width /4,
                height: 20
            };
       // resizeCanvas(window.innerWidth,window.innerHeight);
        window.addEventListener('resize', (e) => this.handleResize(e));
        window.addEventListener('load', () => this.handleLoad());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        window.addEventListener('mousedown', (e) => this.handleMouseDown(e));

        window.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        window.addEventListener('touchend', (e) => this.handleTouchUp(e));
        window.addEventListener('touchstart', (e) => this.handleTouchDown(e));



        canvas.addEventListener('contextmenu', (e) => this.handleMouseMenu(e));
        

    }

    static AddImage(src,name)
    {
        this.imagesToLoad.push({src:src,name:name});

        return this.imagesToLoad.length-1; 
    }


    
    static Start() 
    {
        this.isRunning = true;
        this.isReady=true;
        this.gameLoop(0);
    }

    static Stop() 
    {
        this.isRunning = false;
    }

    static AddScene(sceneName,scene) 
    {
        scene.name=sceneName;
        this.scenes[sceneName] = scene;
    }
    static SetCurrentScene(sceneName) 
    {
        if (this.currentScene) 
        {
      
            this.callReady = false;
            this.currentScene.close();
            this.currentScene.clear();
        }

        this.currentScene = this.scenes[sceneName];

       
    }

   static render()
    {
        ctx.save(); 
        if (this.currentScene) 
        {
            this.currentScene.OnRender();
        }
        ctx.restore();

     
        ctx.textAlign = "left";
        ctx.font="10px sans-serif";
        ctx.lineWidth = 1;
	    ctx.strokeStyle="white";
        ctx.fillStyle="white";
        ctx.globalAlpha=1.0;

    }
    static update(dt)
    {

        if (!this.isReady) return;
        if (this.currentScene && !this.callReady) 
        {
            this.callReady = true;
            this.currentScene.ready();
        }

        if (this.currentScene) 
        {
            this.currentScene.OnUpdate(dt);
        }
    }
    static process()
    {
        if (this.currentScene) 
        {
            this.currentScene.OnProcess();
        }
    }

    static drawProgressBar(progress) 
    {
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(this.progressBar.x, this.progressBar.y, this.progressBar.width, this.progressBar.height);

        ctx.fillStyle = 'green';
        const progressWidth = progress * this.progressBar.width;
        ctx.fillRect(this.progressBar.x, this.progressBar.y, progressWidth, this.progressBar.height);

        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`CARREGANDO  ${Math.round(progress * 100)}%`, this.width / 2, this.progressBar.y - 10);
    }
    
    // static AddImage(src,name,id) 
    // {
    //     const image = new Image();
    //     image.src = src;

    //     return new Promise((resolve, reject) =>
    //      {
    //         image.onload = () => 
    //         {
    //             //const path = src;
    //             //const filename = path.split('/').pop();
    //             //const filenameWithoutExtension = filename.split('.').slice(0, -1).join('.'); // Remove a extensão

    //             let graph = new Graph(image,name,id);
    //             game_images.push(graph);
    //             resolve(image);
    //         };

    //         image.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // }
     static   async LoadImagesDelay( delayBetweenImages = 10)
     {
        const totalImages = this.imagesToLoad.length;
        let loadedImages = 0;
        console.log("Total de imagens "+ totalImages);
       

        const loadImageWithDelay = async (src,name) => 
        {
            return new Promise((resolve, reject) =>
             {
                const image = new Image();
                image.src = src;

                image.onload = () => 
                {
                  //  const path = src;
                  //  const filename = path.split('/').pop();
                  //  const filenameWithoutExtension = filename.split('.').slice(0, -1).join('.'); // Remove a extensão

                    let graph = new Graph(image,name,loadedImages);
                    game_images.push(graph);
                   
     
                    resolve(image);
                };

                  image.onerror = (error) =>
                 {
                    reject(error);
                    console.error('Erro ao carregar a imagem:', error); 
                };
            });
        };

        const loadImagesSequentially = async () => 
        {

            for (const image of this.imagesToLoad) 
            {
                await loadImageWithDelay(image.src,image.name,loadedImages);
                loadedImages++;
                const progress = loadedImages / totalImages;
                this.drawProgressBar(progress);
                await new Promise(resolve => setTimeout(resolve, delayBetweenImages));
            }
           
        };

        try 
        {
            await loadImagesSequentially();
            console.log('Todas as imagens foram carregadas com sucesso!');
            Game.isReady=true;
            this.drawProgressBar(1); // Atualiza a barra de progresso para 100% quando todas as imagens são carregadas
        } catch (error) 
        {
            console.error('Erro ao carregar imagens:', error);
        }
    }

    // static async LoadImages() 
    // {
    //     const totalImages = imagesToLoad.length;
    //     let loadedImages = 0;

    //     const promises = imagesToLoad.map(src => 
    //         {
    //         return this.AddImage(src).then(() => 
    //         {
    //             loadedImages++;
    //             const progress = loadedImages / totalImages;
    //             this.drawProgressBar(progress);
                
    //         });
    //     });

    //     try 
    //     {
    //         await Promise.all(promises);
    //         console.log('Todas as imagens foram carregadas com sucesso!');
    //         this.drawProgressBar(1); 
    //     } catch (error) 
    //     {
    //         console.error('Erro ao carregar imagens:', error);
    //     }
    // }
    static gameLoop(tm) 
    {
       
        
        if (!this.isRunning) 
        {
        return;
        }
        frameCount++;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        mCurrentTime = Date.now();
        mElapsedTime = mCurrentTime - mPreviousTime;
        deltaTime = mElapsedTime / 1000;
        mPreviousTime = mCurrentTime;
        mLagTime += mElapsedTime;



        while (mLagTime >= kMPF) 
        {
            mLagTime -= kMPF;
            this.process();
        }
        this.update(deltaTime);
        
        Game.width  = canvas.width;
        Game.height = canvas.height;

        this.render();

        for (let i = 0; i < 3; i++)
        { 
            previousButtonState[i] = currentButtonState[i];
        }

        if (mCurrentTime - fpsUpdateTime > 1000) 
        {
            fps = frameCount;
            frameCount = 0;
            fpsUpdateTime = Date.now();
        }
    
        ctx.fillStyle = "green";
        ctx.fillText("FPS: " + fps, 10, 10);
        ctx.fillText("DT: " + deltaTime.toFixed(4), 10, 20);
        if (this.currentScene)
        {
            ctx.fillStyle="white";
            ctx.fillText(`scene ${this.currentScene.name} ${this.currentScene.Count()}`, 10,35);

        }
        requestAnimationFrame((tm) => this.gameLoop(tm));
    }
    static handleResize(e) 
    {
      resizeCanvas(e.target.innerWidth, e.target.innerHeight);
      if (this.currentScene) 
      {
          this.currentScene.OnResize(e.target.innerWidth, e.target.innerHeight);
      }
    }
    static handleMouseMenu(e)
    {
      e.preventDefault();
    }
  
    static handleKeyDown(e)
      {
  
      e.preventDefault();
      }
  
      handleKeyUp(e)
      {
          
       e.preventDefault();
      }
  
     static handleLoad() 
    {
        //SCREEN_WIDTH = window.innerWidth;
        //SCREEN_HEIGHT = window.innerHeight;
      ///   canvas.width = SCREEN_WIDTH;
     //    canvas.height =SCREEN_HEIGHT;
      
        console.log("Load "+ canvas.width +  " " + canvas.height);
    }
  
    static handleTouchDown(e)
    {
     
      MouseX = e.changedTouches[0].pageX;
      MouseY = e.changedTouches[0].pageY;

    
      
      currentButtonState[0]=true; 
  
      if (this.currentScene) 
      {
          this.currentScene.OnMouseDown(MouseX,MouseY, 0);
      }
      e.preventDefault();
       

    }

    static handleTouchUp(e)
    {
        MouseX = e.changedTouches[0].pageX;
        MouseY = e.changedTouches[0].pageY;
        
      
        currentButtonState[0]=false; 

  
      if (this.currentScene) 
      {
          this.currentScene.OnMouseUp(MouseX,MouseY, 0);
      }
      e.preventDefault();
  
    
    }

    static handleTouchMove(e)
    {
      MouseX = e.changedTouches[0].pageX;
      MouseY = e.changedTouches[0].pageY;
  
      if (this.currentScene) 
      {
          this.currentScene.OnMouseMove(MouseX,MouseY);
      }
  
      e.preventDefault();
  
    }
  
  
    static  handleMouseMove(e) 
    {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
  
      MouseX = (e.clientX - rect.left) * scaleX;
      MouseY = (e.clientY - rect.top) * scaleY;
  
  
      if (this.currentScene) 
      {
          this.currentScene.OnMouseMove(MouseX,MouseY);
      }
  
      e.preventDefault();
  
    }
    static handleMouseUp(e) 
    {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
  
      MouseX= (e.clientX - rect.left) * scaleX;
      MouseY = (e.clientY - rect.top) * scaleY;
      let button = e.which-1;
      currentButtonState[button]=false; 
  
      if (this.currentScene) 
      {
          this.currentScene.OnMouseUp(MouseX,MouseY, button);
      }
  
      e.preventDefault();
     
  
     
  
  
  
    }
    static  handleMouseDown(e) 
    {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
  
      MouseX= (e.clientX - rect.left) * scaleX;
      MouseY = (e.clientY - rect.top) * scaleY;
      let button = e.which-1;
      currentButtonState[button]=true; 
  
      if (this.currentScene) 
      {
          this.currentScene.OnMouseDown(MouseX,MouseY, button);
      }
   
      e.preventDefault();
  
    }
       static ShowMouse()
      {
          canvas.canvas.style.cursor = "auto";
      }
      static HideMouse()
      {
          canvas.canvas.style.cursor = "none";
      }

      static SetLineWidth(width)
        {
            ctx.lineWidth = width;
        }
      static SetColor(red,green,blue)
      {
          ctx.fillStyle = 'rgb('+ red + ',' + green + ',' + blue +')';
          ctx.strokeStyle = 'rgb('+ red + ',' + green + ',' + blue + ')';
      }
      static SetAlpha (alpha)
      {
          ctx.globalAlpha = (alpha/255.0);
      }


    static Line(x1,y1,x2,y2)
    {
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }

    static PolygonLine(vertices,points)
    {
      
        ctx.beginPath();
        for (var c=0;c<vertices;c++)
        {
            if (c) ctx.lineTo(points[c*2],points[c*2+1]);
            else ctx.moveTo(points[c*2],points[c*2+1]);
        }
        ctx.closePath();
        ctx.stroke();
    }

    static Polygon(vertices,points)
    {
        ctx.beginPath();
        for (var c=0;c<vertices;c++)
        {
            if (c) ctx.lineTo(points[c*2],points[c*2+1]);
            else ctx.moveTo(points[c*2],points[c*2+1]);
        }
        ctx.closePath();
        ctx.fill();
    }


    static RectangleLine(x1,y1,w,h)
    {
        ctx.strokeRect(x1,y1,w,h);
    }

    static Rectangle(x1,y1,w,h)
    {
        ctx.fillRect(x1,y1,w,h);
    }

    static CircleLine(x,y,radius)
    {
        ctx.beginPath();
        ctx.arc(x,y,radius,0,PI2);
        ctx.stroke();
    }


    static Circle(x,y,radius)
    {
        ctx.beginPath();
        ctx.arc(x,y,radius,0,PI2);
        ctx.fill();
    }

    static ArcLine(x,y,ang1,ang2,r)
    {
    
        ctx.beginPath();
        if (ang1>ang2)
        {
            ctx.arc(x,y,r,RAD(ang1),RAD(ang2));
        } else {
            ctx.context.arc(x,y,r,RAD(ang1),RAD(ang2));
        }
        ctx.context.stroke();
    }


    static Arc(x,y,ang1,ang2,r)
    {
        ctx.context.beginPath();
        if (ang1>ang2)
        {
            ctx.arc(x,y,r,RAD(ang1),RAD(ang2));
        } else 
        {
            ctx.arc(x,y,r,RAD(ang1),RAD(ang2));
        }
        ctx.fill();
    }


    static EllipseLine(x,y,rx,ry)
    {

        ctx.save();
        ctx.translate(x,y);
        ctx.scale(rx,ry);
        ctx.beginPath();
        ctx.arc(0,0,1,0,PI2);
        ctx.restore();
        ctx.stroke();
    }

    static Ellipse(x,y,rx,ry)
    {
 
        ctx.save();
        ctx.translate(x,y);
        ctx.scale(rx,ry);
        ctx.beginPath();
        ctx.arc(0,0,1,0,PI2);
        ctx.restore();
        ctx.fill();
    }

    static SetFontDefault()
    {
        ctx.font = "10px sans-serif";
    }

    static SetFont(name,size)
    {
        ctx.font = size + "px " + name;
      //  console.log("set"+ctx.font);
    }

    static Text( text, x,y, align)
    {
        align = typeof align !== 'undefined' ?  align : "left";
        ctx.textAlign = align;
        ctx.fillText(text,x,y);
       
    }
    static SetCursor(name)
    {
        canvas.style.cursor = name;
    }


}
