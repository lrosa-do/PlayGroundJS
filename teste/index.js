"use strict";

// Obtém o elemento canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 512;

// Cria uma nova imagem
const image = new Image();
image.src = 'assets/backgroundDesert.png';
//image.src='assets/blue_body_square.png';



let scrollX=0;
let scrollY=0;


let scrollSpeedX = 4;
let scrollSpeedY = 0;


let max_dist_x = 0;
let max_dist_y = 0;
let scrollXSize = 0;
let scrollYSize = 0;

let fillX=true;
let fillY=true;

// Espera até que a imagem seja carregada
image.onload = function() 
{

    max_dist_x = Math.ceil(canvas.width / image.width)   + 1;
    max_dist_y = Math.ceil(canvas.height / image.height) + 1;

    scrollXSize =  image.width    + 1;
    scrollYSize =  image.height   + 1;

    console.log(max_dist_x + " " + max_dist_y);
  function drawImage() 
  {
    


    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas


    fillX=true;
    fillY=true;
    let fill_w = (fillX) ? canvas.width  : image.width;
    let fill_h = (fillY) ? canvas.height : image.height;

    let offset_x=0;

    for (let x = 0; x < max_dist_x; x++) {
        for (let y = 0; y < max_dist_y; y++) {
            // ctx.drawImage(image,
            //     -scrollX + x * fill_w,
            //     -scrollY + y * fill_h,
            //     fill_w, fill_h);

   
   
            ctx.drawImage(image, 
                -scrollX + x * image.width ,
                -scrollY + y * image.height ,
            image.width, image.height,0,0, fill_w ,fill_h);


            if (scrollSpeedX<2)
                offset_x += scrollSpeedX;

           // ctx.drawImage(image, drawX, drawY, fill_w, fill_h);

         


        }
    }


    ctx.fillStyle = 'lime';
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${scrollX} ${scrollY}  ${max_dist_x} ${max_dist_y}  ${scrollXSize} ${scrollYSize}`, 180, 80);
       

    
  }

  drawImage();
 function update() 
 {
   

    drawImage();
    scrollX -= scrollSpeedX;
    scrollY -= scrollSpeedY;
    
    if (scrollX > scrollXSize) scrollX = 0;
    if (scrollY > scrollYSize) scrollY = 0;
    if (scrollX < 0) scrollX = image.width;
    if (scrollY < 0) scrollY = image.height;



    requestAnimationFrame(update);
  }

  // Inicia a animação
  update();
};