"use strict";

// Obtém o elemento canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 512;

// Cria uma nova imagem
const img = new Image();
img.src = 'assets/backgroundDesert.png';
img.scr='assets/blue_body_square.png';


// Define as coordenadas de textura (UV)
let u = 0; // coordenada U
let v = 0; // coordenada V

// Define a velocidade de scroll
const XscrollSpeed =-10;
const YscrollSpeed =10;

const width  = canvas.width;
const height = canvas.height;


//obtemos o tamnho total da imagem de forma o scroll ocupar o canvas 
const scrollXSize = img.width  - width;
const scrollYSize = img.height - height;

// Espera até que a imagem seja carregada
img.onload = function() {

  function drawImage() 
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas


    // if (XscrollSpeed >= 0) 
    // {
    //     ctx.drawImage(img, u-(XscrollSpeed), 0,img.width, img.height, 0, 0, width, height);
    //     ctx.drawImage(img,-width+(u-XscrollSpeed), 0,img.width, img.height, 0, 0, width, height);

    //   } else 
    //   {
    //     ctx.drawImage(img, u + width, 0, img.width, img.height, 0, 0, width, height);
    //     ctx.drawImage(img, u, 0, img.width, img.height, 0, 0, width, height);
    //   }

    // if (YscrollSpeed >= 0)
    // {
    //     ctx.drawImage(img, 0, v-(YscrollSpeed), img.width, img.height, 0, 0, width, height);
    //     ctx.drawImage(img, 0, -height+(v-YscrollSpeed), img.width, img.height, 0, 0, width, height);
    // } else 
    // {
    //     ctx.drawImage(img, 0, v + height, img.width, img.height, 0, 0, width, height);
    //     ctx.drawImage(img, 0, v, img.width, img.height, 0, 0, width, height);
    // }
        
    // ctx.drawImage(img, u, v, img.width, img.height, 0, 0, width, height);

    // let off_y =(v>=0) ? v - img.height : v + img.height;
    // let off_x =(u>=0) ? u - img.width : u + img.width;

    // ctx.drawImage(img, 0, off_y, img.width, img.height, 0, 0, width, height);
    // ctx.drawImage(img, off_x, 0, img.width, img.height, 0, 0, width, height);
    ctx.drawImage(img, u, v, img.width, img.height, 0, 0, width, height);

    // Verifica se as coordenadas de textura (UV) saem dos limites da imagem no eixo horizontal
    if (u >= img.width) {
      ctx.drawImage(img, u - img.width, v, img.width, img.height, 0, 0, width, height);
    } else if (u <= -img.width) {
      ctx.drawImage(img, u + img.width, v, img.width, img.height, 0, 0, width, height);
    }

    // Verifica se as coordenadas de textura (UV) saem dos limites da imagem no eixo vertical
    if (v >= img.height) {
      ctx.drawImage(img, u, v - img.height, img.width, img.height, 0, 0, width, height);
    } else if (v <= -img.height) {
      ctx.drawImage(img, u, v + img.height, img.width, img.height, 0, 0, width, height);
    }

    
  }

  drawImage();
 function update() 
 {
    u += XscrollSpeed;
    v += YscrollSpeed;

    if (u <= -img.width)
    {
        u = img.width;
    } else if (u >= img.width)
    {
        u = 0;
    } 

    if (v <= -img.height) 
    {
        v = img.height;
    } else if (v >= img.height)
    {
        v = 0;
    } 

    console.log(u + " " + v);
    


    drawImage();

    requestAnimationFrame(update);
  }

  // Inicia a animação
  update();
};