"use strict";
class Widget extends Basic
{
    constructor()
    {
        super("Widget");
        this.x=0;
        this.y=0;
        this.dragging=false;
        this.width  = 1;
        this.height = 1;
        this.parent=null;
        this.focus =false;
        this.bound = new Bound(0,0,this.width,this.height);
        this.tag="";
    }
    realX()
    {
        if (this.parent!==null)
        {
            return  this.parent.x + this.x;
        }
        return this.x;
    }
    realY()
    {
        if (this.parent!==null)
        {
            return  this.parent.y + this.y;
        }
        return this.y;
    }
    UpdateBound()
    {
        this.bound.x=this.realX();
        this.bound.y=this.realY();
        this.bound.width=this.width;
        this.bound.height=this.height;
    }
    MouseIn(x,y)
    {
        return this.bound.contains(x,y);
    }
    setTag(tag)
    {
        this.tag=tag;
        return this;
    }
}

class Slider extends Widget 
{
    constructor(min, max, value,label, horizontal =true) 
    {
        super();
        this.min = min;
        this.max = max;
        this.value = Math.min(Math.max(value, min), max);
        this.horizontal = horizontal;
        this.label=label || "";
        this.OnChange = null;
        this.red=224;
        this.green=224;
        this.blue=224;
        this.labelSize=14;
    }

    UpdateBound()
    {
        this.bound.x=this.realX()-1;
        this.bound.y=this.realY()-1;
        this.bound.width=this.width  +1;
        this.bound.height=this.height+1;
    }
    setOnChange(event)
    {
        this.OnChange=event;
        return this;
    }

    setLabel(text)
    {
        this.label=text;
        return this;
    }

    OnRender(ctx) 
    {
        this.UpdateBound();
        super.OnRender(ctx);

     

        if (this.focus)
        {
            Game.SetColor(150,200,200);
            Game.SetLineWidth(1.1);
            Game.RectangleLine(this.bound.x, this.bound.y, this.bound.width+1, this.bound.height+1);
            Game.SetLineWidth(1);
            Game.SetCursor("pointer");
        }

    
        if (this.horizontal) 
        {
           
            Game.SetColor(224,224,224);
            Game.Rectangle(this.realX(), this.realY(), this.width, this.height);
            
           
            const normalizedValue = (this.value - this.min) / (this.max - this.min);
            const fillWidth = (this.width * normalizedValue);
     
            Game.SetColor(52,152,219);
  
            Game.Rectangle(this.realX(), this.realY(), fillWidth, this.height,1);
            let lx=this.realX() + (this.width * 0.5);
            let ly=this.realY() + (this.height * 0.5)+((this.labelSize-4)*0.5); 
            Game.SetColor(55,55,55);
            Game.SetFont("Arial",this.labelSize);
            Game.Text(`${this.label} ${this.value.toFixed(1)}`,lx,ly,"center");
        } else 
        {
            Game.SetColor(224,224,224);
            
            Game.Rectangle(this.realX(), this.realY(), this.width, this.height);
            
            
            //ctx.fillStyle = '#3498db';//'#383635';
            const normalizedValue = (this.value - this.min) / (this.max - this.min);
            const fillHeight = (this.height * normalizedValue);
            
            Game.SetColor(52,152,219);
            Game.Rectangle(this.realX(), this.realY() + this.height - fillHeight, this.width, fillHeight);


            let lx=this.realX() + this.width/2;
            let ly=this.realY() + this.height + 10; 
            Game.SetColor(255,255,255);
            Game.Text(`${this.label} ${this.value.toFixed(1)}`,lx,ly,"center");
        }
    }

    mouse_down(x, y, button) 
    {
        this.dragging = true;
       
        this.updateValue(x, y);
    }

    mouse_up(x, y, button) 
    {
        if (!this.focus)
        {
  
        this.focus=false;
        }
        this.dragging = false;
    }

    mouse_move(x, y)
     {
        this.focus=this.MouseIn(x,y);
        if (this.dragging && this.focus) 
        {
            this.updateValue(x, y);
        }
    }

    updateValue(x, y) 
    {
        let normalizedValue = 0;
        if (this.horizontal) 
        {
            normalizedValue = (x - this.realX()) / this.width ;
        } else
        {
            normalizedValue = (this.realY() + this.height - y) / this.height;
        }
        

        this.value = this.min + normalizedValue * (this.max - this.min);
        this.value = Math.min(this.max, Math.max(this.min, this.value));
        if (this.OnChange != null)
        {
            this.OnChange(this.value);
        }
    }
}
class Button extends Widget 
{
    constructor(label, x, y) 
    {
        super();
        this.label = label;
        this.is_down=false;
        this.OnClick = null;
  
        this.width = 90; //  padrão
        this.height = 30; //  padrão
        this.red=224;
        this.green=224;
        this.blue=224;
    }

    setLabel(text)
    {
        this.label=text;
        return this;
    }

    OnRender(ctx) 
    {
        this.UpdateBound();


         if (this.focus && !this.is_down)
         {
            Game.SetColor(150,200,200);
            Game.RectangleLine(this.bound.x, this.bound.y, this.bound.width+1, this.bound.height+1,1);
            Game.SetCursor("pointer");
         }
        //     rect(ctx, this.bound.x, this.bound.y, this.bound.width+1, this.bound.height+1, makecol(150,200,200,1),1.5);


       // ctx.fillStyle = '#e0e0e0';
        Game.SetColor(this.red,this.green,this.blue);
        if (this.is_down)
            ctx.fillRect(this.realX()+1, this.realY()+1, this.width+1, this.height);
        else
             ctx.fillRect(this.realX(), this.realY(), this.width, this.height);
        

        Game.SetColor(55,55,55);
        Game.SetFont("Arial",14);

        let textX = this.realX() + (this.width  *0.5 );
        let textY = this.realY() + (this.height *0.5 ) + 6;
        if (this.is_down)
            textX+=1;

   
        Game.Text(this.label,textX, textY,"center");
    }

    mouse_down(x, y, button) 
    {
        if (this.MouseIn(x, y) && button===0)
        {
           this.is_down=true;
            if (this.OnClick!=null)
            {
                this.is_down=false;
                this.OnClick();
             
            }
        }
    }
    mouse_up(x, y, button) 
    {
        if (this.MouseIn(x, y) )
        {
            this.is_down=false;
        }
    }
    mouse_move(x, y)
    {
        this.focus=this.MouseIn(x,y);
    }
}


class Window extends Widget
{
    constructor(label,x,y,width, height)
    {
        super();
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.last_x=x;
        this.last_y=y;
        this.widgets=[];
        this.widgets=[];
        this.hide=false;
        this.on_closer=false;
        this.on_dragger=false;
        this.label = label || "Window";
    }

    add(widget)
    {
        widget.parent=this;
        widget.stage=this.stage;
        this.widgets.push(widget);
    }

    AddSlider(x,y,width,height,min,max,value,label,horizontal)
    {
        let slider = new Slider(min,max,value,label,horizontal);
        slider.x=x;
        slider.y=y;
        slider.width =width;
        slider.height=height;
        this.add(slider);
        return slider;
    }
    AddButton(x,y,label)
    {
        let button = new Button(label)
        button.x=x;
        button.y=y;
        this.add(button);
        return button;
    }
    renderWidgets(ctx)
    {
        for (const child of this.widgets) 
        {
            child.OnRender(ctx);
        }
    }

    updateWidgets(dt)
    {
        for (const child of this.widgets) 
        {
            child.update(dt);
        }
    }

    OnUpdate(dt)
    {
   
        this.updateWidgets(dt);
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

    OnRender(ctx)
    {
        this.UpdateBound();
        super.OnRender(ctx);
        Game.SetCursor("default");
        if (!this.hide) 
            Game.SetColor(55,55,155);
        else
            Game.SetColor(55,55,55);
        Game.Rectangle(this.realX(), this.realY()-15, this.width, 15);
    
        if (!this.hide) 
             Game.SetColor(255,255,255);
        else
            Game.SetColor(155,155,155);
        Game.Text(this.label,this.realX()+5,this.realY()-3);
        
        if (this.on_closer)
        {
            Game.SetColor(255,55,155);
            Game.SetCursor("pointer");
        }
        else 
        {
          
            if (!this.hide) 
                Game.SetColor(195,55,155);
            else
                Game.SetColor(155,190,155);
        }
        Game.Circle(this.realX()+this.width-10, this.realY()-8, 5);
        
        if (!this.hide) 
        {
            Game.SetColor(55,55,55);
            ctx.fillRect(this.realX(), this.realY(), this.width, this.height);
            this.renderWidgets(ctx);
        }
        if (this.on_dragger)
        {
            Game.SetCursor("move");
            Game.SetColor(155,155,155);
            Game.RectangleLine(this.realX(), this.realY()-15, this.width, 15,1);
        
        }

    }
    mouse_down(x,y,button)
    {
        if (this.on_dragger)
        {
            this.dragging=true;
            this.dragX=x-this.realX();
            this.dragY=y-this.realY();
        }
        if (this.on_closer)
        {
            this.hide = !this.hide;
        }
        for (const child of this.widgets) 
        {
            if (child.MouseIn(x,y))
                child.mouse_down(x,y,button);
        }
    }
    mouse_up(x,y,button)
    {
        for (const child of this.widgets) 
        {
            child.mouse_up(x,y,button);
        }
        this.dragging=false;
    }
    mouse_move(x,y)
    {
        this.on_closer=PointInRect(x,y,this.realX()+this.width-20,this.realY()-20,20,20);
        this.on_dragger=PointInRect(x,y,this.realX(),this.realY()-20,this.width-20,20);
        if (this.dragging)
        {
            this.x=x-this.dragX;
            this.y=y-this.dragY;
        }
        for (const child of this.widgets) 
        {  
                child.mouse_move(x,y);
        }

    }
}
