"use strict";

class Action 
{
    constructor(tag)
    {
        this.tag=tag || "action";
        this.parent=null;
        this.done=false;
        this.finished = false;
        this.elapsed = 0;
        this.play=false;
        this.OnStart =  function() {};
        this.OnProgress = function() {};
        this.OnComplete =  function() {};
    }
    update(dt)
    {

    }
    start() 
    {

    }
    stop()
    {

    }
    remove()
    {
        this.parent=null;
    }
}

class Tween extends Action
{
    constructor(tag,startValue,endValue,duration,ease) 
    {
      super(tag);
      this.startValue = startValue;
      this.endValue = endValue;
      this.duration = duration || 1000; // Default duration of 1 second
      this.easingFunction = ease || Ease.Linear;
   
       
    }
  
    start() 
    {
      this.elapsed = 0;
      this.finished = false;
      this.play=true;
      this.OnStart();
      return this;
    }
  
    update(deltaTime) 
    {
        
      if (this.finished || this.done || !this.play) return;
  
      this.elapsed += deltaTime;
  
      const progress = Math.min(this.elapsed / this.duration, 1); 
  
      const easedProgress = this.easingFunction(progress);
      const interpolatedValue = this.startValue + (this.endValue - this.startValue) * easedProgress;
  
      this.OnProgress(interpolatedValue);
       if (this.parent!=null)
      {
        if (this.parent.hasOwnProperty(this.tag))
        {
            this.parent[this.tag]=interpolatedValue;
        }
      }
  
      if (progress >= 1) 
      {
        this.finished = true;
        this.OnComplete();
        this.done=true;
        this.play=false;
      }
    }
  
  }
  

class Sequence extends Action
{
    constructor(tag) 
    {
      super(tag);
      this.actions = [];
      this.currentActionIndex = 0;
    }
  
    start() 
    {
      this.actions[this.currentActionIndex].start();
      this.OnStart();
    }
  
    update(deltaTime) 
    {
      if (this.finished || this.done) return;
  
      const currentAction = this.actions[this.currentActionIndex];
      currentAction.update(deltaTime);
  
      if (currentAction.finished) 
      {
        this.currentActionIndex++;
  
        if (this.currentActionIndex >= this.actions.length) 
        {
          this.finished = true;
          this.OnComplete();
          this.done=true;
          return;
        }
  
        this.actions[this.currentActionIndex].start();
      }
    }
  
    addAction(action) 
    {
      action.parent=this;
      this.actions.push(action);
      return this;
    }
  }

class Repeat extends Action
{
    constructor(tag,action,times) 
    {
      super(tag);
      this.action = action;
      this.times = times;
      this.currentTimes = 0;
    }
  
    start() 
    {
      this.action.start();
      this.OnStart();
    }
  
    update(deltaTime) 
    {
      if (this.finished || this.done) return;
  
      this.action.update(deltaTime);
  
      if (this.action.finished) 
      {
        this.currentTimes++;
  
        if (this.currentTimes >= this.times) 
        {
          this.finished = true;
          this.OnComplete();
          this.done=true;
          return;
        }
  
        this.action.start();
      }
    }
  }

class Delay extends Action
{
    constructor(tag,duration) 
    {
      super(tag);
      this.duration = duration;
    }
  
    start() 
    {
      this.elapsed = 0;
      this.finished = false;
      this.OnStart();
    }
  
    update(deltaTime) 
    {
      if (this.finished || this.done) return;
  
      this.elapsed += deltaTime;
  
      if (this.elapsed >= this.duration) 
      {
        this.finished = true;
        this.OnComplete();
        this.done=true;
      }
    }
  }

