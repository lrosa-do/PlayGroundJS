
"use strict";
const PI = 3.14159265;
const PI2 = 2*3.14159265;
const PI_2 = 3.14159265/2;
const PI_3 = 3.14159265/3;
const PI_4 = 3.14159265/4;


function RAD(d) { return -d*PI/180.0;}
function DEG(r) { return -r*180.0/PI;}

function rand()
{
	return Math.floor(65536 * Math.random());
}

function random(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max)
{
	return Math.random() * (max - min) + min;
}

function rand32()
{
	return rand()|(rand()<<16);
}

function Min(a,b)
{
	return Math.min(a,b);
}

function Max(a,b)
{
	return Math.max(a,b);
}
function frand()
{
	return Math.random();
}

function Abs(a) {return (a<0)?(-a):(a);}


function Length(x,y)
{
	return Math.sqrt(x*x+y*y);
}

function Distance(x1,y1,x2,y2)
{
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}


function DistanceQuad(x1,y1,x2,y2)
{
	return (x2-x1)*(x2-x1)+(y2-y1)*(y2-y1);
}


function LineDist(ex1,ey1,ex2,ey2,x,y)
{
	var px = ex2-ex1;
	var py = ey2-ey1;
	var u = ((x - ex1) * px + (y - ey1) * py) / (px*px + py*py);
	if (u > 1)
		u = 1;
	else if (u < 0)
		u = 0;

	var dx = ex1 + u * px - x;
	var dy = ey1 + u * py - y;
	return Math.sqrt(dx*dx + dy*dy);
}

function Lerp(from,to,progress)
{
	return from+(to-from)*progress;
}



function Sign(a)
{
	return a < 0 ? -1 : (a > 0 ? 1 : 0);
}



function GetAngle(x1,y1,x2,y2)
{
	var a = DEG(Math.atan2(y2 - y1, x2 - x1));
	return a < 0 ? a + 360 : a;
}


function AngleDiff(a,b)
{
	var diff = b - a;
	diff /= 360; 
	diff = (diff - floor(diff))*360;
	if (diff > 180) { diff -= 360; }
	return diff;
}

function Clamp(value,min,max)
{
	if (max > min)
	{
		if (value < min) return min;
		else if (value > max) return max;
		else return value;
	} else {
		if (value < max) return max;
		else if (value > min) return min;
		else return value;
	}
}

function ClampAngle(angle) 
{
    return (angle % 360 + 360) % 360;
}


function Scale(value,min,max,min2,max2)
{
	return min2 + ((value - min) / (max - min)) * (max2 - min2);
}


function ScaleClamp(value,min,max,min2,max2)
{
	value = min2 + ((value - min) / (max - min)) * (max2 - min2);
	if (max2 > min2)
	{
		value = value < max2 ? value : max2;
		return value > min2 ? value : min2;
	}
	value = value < min2 ? value : min2;
	return value > max2 ? value : max2;
}

function Constrain(value, min, max)
{
	return Math.min(Math.max(value, min), max);
}

function PointInCircle(x,y,cx,cy,r)
{
	return (x-cx)*(x-cx)+(y-cy)*(y-cy)<r*r;
}

function PointInRect(x,y,rx,ry,rw,rh)
{
	return x>=rx && x<=rx+rw && y>=ry && y<=ry+rh;
}


class Bound 
{
    constructor(x,y,w,h)
    {
        this.width=w;
        this.height=h;
        this.x=x;
        this.y=y;
    }
	contains(pointX, pointY) 
	{
        return (
            pointX >= this.x &&
            pointX <= this.x + this.width &&
            pointY >= this.y &&
            pointY <= this.y + this.height
        );
    }

    intersects(otherBound)
	{
        return (
            this.x < otherBound.x + otherBound.width &&
            this.x + this.width > otherBound.x &&
            this.y < otherBound.y + otherBound.height &&
            this.y + this.height > otherBound.y
        );
    }
}

class Vector2 
{
    constructor(x, y) 
	{
        this.x = x || 0;
        this.y = y || 0;
    }

	get()
	{
		return new Vector2(this.x,this.y);
	}

	mult(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	setMag( magnitude) 
	{
		// Normalizar o vetor (mantendo a direção)
		let normalizedVector =this.normalize();
		
		// Multiplicar pela magnitude 
		this.x = normalizedVector.x * magnitude;
		this.y = normalizedVector.y * magnitude;
	}

    add(vector) 
	{
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) 
	{
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar)
	{
        return new Vector2(this.x * scalar, this.y * scalar);
    }

	

    divide(scalar) 
	{
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    magnitude()
	 {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize()
	 {
        const mag = this.magnitude();
        if (mag !== 0) {
            return this.divide(mag);
        }
        return new Vector2();
    }

    dot(vector) 
	{
        return this.x * vector.x + this.y * vector.y;
    }

    clone() 
	{
        return new Vector2(this.x, this.y);
    }
	copy(vector)
	{
		this.x = vector.x;
		this.y = vector.y;
		return this;
	}
	setMagnitude(magnitude)
	{
		return this.normalize().multiply(magnitude);
	}

	static Sub(v1,v2)
	{
		return new Vector2(v1.x-v2.x,v1.y-v2.y);
	}
}

function getPowIn(t,pow) 
{
		return Math.pow(t,pow);
}

function getPowOut(t,pow) 
{
	return 1-Math.pow(1-t,pow);
}

function getPowInOut(t,pow) 
{
	if ((t*=2)<1) return 0.5*Math.pow(t,pow);
		return 1-0.5*Math.abs(Math.pow(2-t,pow));
}


function getBackInOut(t,amount) 
{
	amount*=1.525;
	if ((t*=2)<1) return 0.5*(t*t*((amount+1)*t-amount));
	return 0.5*((t-=2)*t*((amount+1)*t+amount)+2);
}

function EaseBackInOut(t)
{
	return getBackInOut(t,1.7);
}


function getElasticIn(t,amplitude,period) 
{
	var pi2 = Math.PI*2;
	if (t==0 || t==1) return t;
	var s = period/pi2*Math.asin(1/amplitude);
	return -(amplitude*Math.pow(2,10*(t-=1))*Math.sin((t-s)*pi2/period));
	
};


function getElasticOut(t,amplitude,period) 
{
	var pi2 = Math.PI*2;
	if (t==0 || t==1) return t;
	var s = period/pi2 * Math.asin(1/amplitude);
	return (amplitude*Math.pow(2,-10*t)*Math.sin((t-s)*pi2/period )+1);

};

function getElasticInOut(t,amplitude,period) 
{
	var pi2 = Math.PI*2;
	var s = period/pi2 * Math.asin(1/amplitude);
	if ((t*=2)<1) return -0.5*(amplitude*Math.pow(2,10*(t-=1))*Math.sin( (t-s)*pi2/period ));
	return amplitude*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*pi2/period)*0.5+1;
	
};

function getBackIn (t,amount)
{
		return t*t*((amount+1)*t-amount);
}

function getBackOut(t,amount) 
{
		return (--t*t*((amount+1)*t + amount) + 1);
}


class Ease 
{
	static Linear(progress) 
	{
	  return progress;
	}
  
	static InQuad(progress) 
	{
	  return getPowIn(progress, 2);
	}
  
	static OutQuad(progress) 
	{
	  return getPowOut(progress, 2);
	}
  
	static InOutQuad(progress) 
	{
	  return getPowInOut(progress, 2);
	}
  
	static SineIn(t) 
	{
	  return 1 - Math.cos(t * Math.PI / 2);
	}
  
	static SineOut(t) 
	{
	  return Math.sin(t * Math.PI / 2);
	}
  
	static SineInOut(t) 
	{
	  return -0.5 * (Math.cos(Math.PI * t) - 1);
	}
  
	static BounceIn(t) 
	{
	  return 1 - BounceOut(1 - t);
	}
  
	static BounceOut(t) 
	{
	  if (t < 1 / 2.75) 
	  {
		return 7.5625 * t * t;
	  } else if (t < 2 / 2.75)
	   {
		return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
	  } else if (t < 2.5 / 2.75)
	  {
		return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
	  } else 
	  {
		return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
	  }
	}
  
	static BounceInOut(t) 
	{
	  if (t < 0.5) return this.BounceIn(t * 2) * 0.5;
	  return this.BounceOut(t * 2 - 1) * 0.5 + 0.5;
	}
  
	static ElasticIn(t) 
	{
	  return getElasticIn(t, 1, 0.3);
	}
  
	static ElasticOut(t) 
	{
	  return getElasticOut(t, 1, 0.3);
	}
  
	static ElasticInOut(t) 
	{
	  return getElasticInOut(t, 1, 0.3 * 1.5);
	}
  
	static BackIn(t) 
	{
	  return getBackIn(t, 1.7);
	}
  
	static BackOut(t) 
	{
	  return getBackOut(t, 1.7);
	}
  
	static BackInOut(t)
	 {
	  return getBackInOut(t, 1.7);
	}
  
	static CircIn(t) 
	{
	  return -(Math.sqrt(1 - t * t) - 1);
	}
  
	static CircOut(t) 
	{
	  return Math.sqrt(1 - (--t) * t);
	}
  
	static CircInOut(t)
	 {
	  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
	  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	}
  
  }
  