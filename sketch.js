var submarine, submarineImg;
var cobaia, cobaiaImg;

var piranha, piranhaImg;
var polvo, polvoImg;
var mergulhador, mergulhadorImg;
var aguaViva, aguaVivaImg
var tiro, tiroImg, explosaoImg;

var submarineX, submarineY;

var atirar = false

function preload(){
  submarineImg = loadImage('imagens/yellow submarine.png');
  tiroImg = loadImage('imagens/tiro2.png');
  
  //explosaoImg = loadImage('imagens/explosao.png');

  //carregando imagens dos monstros
  aguaVivaImg = loadAnimation('imagens/agua viva 1.png', 'imagens/agua viva 2.png');
  piranhaImg = loadAnimation('imagens/piranha 1.png', 'imagens/piranha 2.png');
}

function setup(){
  createCanvas(900, 400);
  grupoAguaviva = createGroup();
  grupoPiranha = createGroup();

  submarine = createSprite(100, 200, 50, 50);
  submarine.addImage('submarino', submarineImg);
  submarine.scale = 0.1;
  submarine.debug = true;

  tiro = createSprite(100, 200, 28, 4);
  tiro.scale = 0.05;
}

function draw(){
  background('purple');
  
  submarine.y = mouseY -15;

  gerador_de_agua_viva();
  gerador_de_piranha();

  if(atirar === false){
    tiro.y = submarine.y +15;
    tiro.x = submarine.x;
  }

  if(mouseIsPressed && atirar === false){
    atirar = true;
  }

  if(atirar === true){
    tiro.addImage('tiro', tiroImg)
    tiro.velocityX = 30;
  }

  if(atirar === true && tiro.x >= 900){
    atirar = false
  }
  //condições de colisões
  if(tiro.isTouching(grupoAguaviva) && atirar === true){
    aguaViva.destroy();
    atirar = false;
  }

  if(tiro.isTouching(grupoPiranha) && atirar === true){
    piranha.destroy();
    atirar = false;
    }
  

  submarine.depth = tiro.depth +10
  drawSprites();
}

function gerador_de_agua_viva(){
  if(frameCount % 200 === 100){
    aguaViva = createSprite(900, random(30, 370), 50, 50);
    aguaViva.velocityX = -5;
    aguaViva.addAnimation('agua viva', aguaVivaImg);
    aguaViva.scale = 0.08;
    grupoAguaviva.add(aguaViva);
  }
}

function gerador_de_piranha(){
  if(frameCount % 60 === 50){
  piranha = createSprite(900, random(30, 370), 50, 50);
  piranha.velocityX = -15;
  piranha.addAnimation('piranha', piranhaImg);
  piranha.scale = 0.05;
  grupoPiranha.add(piranha);
  }
}

// um pixel é o equivalente a 2.5