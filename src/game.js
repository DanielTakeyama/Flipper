//Managers
import { PlayerManager } from './managers/player-manager.js';
import { ScenaryManager } from './managers/scenery-manager.js';
import { ObstaclesBottomManager } from './managers/obstacles-bottom-manager.js';
import { ObstaclesTopManager } from './managers/obstacles-top-manager.js';
//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Instancias
const player = new PlayerManager();
const cenario = new ScenaryManager();
const obstaculoBottom = new ObstaclesBottomManager();
const obstaculoTop = new ObstaclesTopManager();

//Variáveis
let gameOver = false;
//Variáveis do Player
const playerPos = player.manager.getComponent("Position");
const playerVel = player.manager.getComponent("Velocity");
//Variáveis dos Obstaculos
const obstaculoBottomPos = obstaculoBottom.manager.getComponent("Position");
const obstaculoTopPos = obstaculoTop.manager.getComponent("Position");

//Eventos
document.addEventListener("keydown", (event)=>{
    if(event.code === "Space"){
        playerVel.velocity = -7;
        playerPos.y -= 50;
    }
});

//Funções

function checkColision(playerX, playerW, playerY, playerH, obstaculoBottomX, obstaculoBottomW, obstaculoBottomY, obstaculoBottomH, obstaculoTopX, obstaculoTopW, obstaculoTopY, obstaculoTopH, canvasH){
    // Em algumas partes da lógica de colisão com os obstaculos eu coloquei o valor -15 que é para dar a sensação do player batendo a cara no obstaculo

    //Analisa se teve colisão com algum obstaculo inferior no eixo X e Y
    if(playerX + playerW -15 >= obstaculoBottomX &&//Verifica se o lado direito do personagem é maior que o lado esquerdo do obstaculo
        playerX <= obstaculoBottomX + obstaculoBottomW &&//Verifica se o lado esquerdo do personagem é menor que o lado direito do obstaculo // Se essas 2 primeiras linhas forem verdadeira significa que colidiu no eixo X
            playerY + playerH -15 >= obstaculoBottomY &&//Verifica se o lado inferior do personagem é maior que o lado superior do obstaculo
                playerY <= obstaculoBottomY + obstaculoBottomH){//Verifica se o lado superior do personagem é menor que o lado inferior do obstaculo // Se esses 2 ultimas linhas forem verdadeira significa que colidiu no eixo Y
        return true;//Se colidiu no eixo X e no eixo Y ao mesmo tempo, significa que o personagem bateu no obstaculo, dai retorna true para a variável gameOver
    }

    //Analisa se teve colisão com algum obstaculo do topo no eixo X e Y
    if(playerX + playerW -15 >= obstaculoTopX &&//Verifica se o lado direito do personagem é maior que o lado esquerdo do obstaculo
        playerX <= obstaculoTopX + obstaculoTopW &&//Verifica se o lado esquerdo do personagem é menor que o lado direito do obstaculo // Se essas 2 primeiras linhas forem verdadeira significa que colidiu no eixo X
            playerY <= obstaculoTopY + obstaculoTopH &&//Verifica se o lado superior do personagem é menor que o lado inferior do obstaculo
                playerY + playerH >= obstaculoTopY){//Verifica se o lado inferior do personagem é maior que o lado superior do obstaculo // Se esses 2 ultimas linhas forem verdadeira significa que colidiu no eixo Y
        return true;//Se colidiu no eixo X e no eixo Y ao mesmo tempo, significa que o personagem bateu no obstaculo, dai retorna true para a variável gameOver
    }

    //Analisa se o player saiu fora da tela
    if(playerY >= (canvasH -50) || playerY <= 0){
        return true;
    }

    return false
}



function initialize(ctx, canvas){
    ctx.clearRect(0,0, canvas.width, canvas.height);//Limpa todo o canvas
    
    //Desenha os elementos do game
    cenario.draw(ctx, canvas.width, canvas.height);
    obstaculoTop.draw(ctx)
    obstaculoBottom.draw(ctx);
    player.spawn(ctx);
    player.update();
    obstaculoBottom.update(canvas);
    obstaculoTop.update(canvas);

    gameOver = checkColision(playerPos.x, player.width, playerPos.y, player.height, obstaculoBottomPos.x, obstaculoBottom.width, obstaculoBottomPos.y, obstaculoBottom.height, obstaculoTopPos.x, obstaculoTop.width, obstaculoTopPos.y, obstaculoTop.height, canvas.height);

    if(!gameOver){//Enquanto o player não colidiu com o chão e nem com nenhum obstaculo o jogo continue.
        requestAnimationFrame(()=> initialize(ctx, canvas));
    }

}


//Inicialização do Jogo
initialize(ctx, canvas);