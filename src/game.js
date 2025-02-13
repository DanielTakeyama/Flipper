//Managers
import { PlayerManager } from './managers/player-manager.js';
import { ScenaryManager } from './managers/scenery-manager.js';
import { ObstaclesManager } from './managers/obstacles-manager.js';

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Instancias
const player = new PlayerManager();
const cenario = new ScenaryManager();
const obstaculo = new ObstaclesManager();

//Variáveis
let gameOver = false;
//Variáveis do Player
const playerPos = player.manager.getComponent("Position");
const playerVel = player.manager.getComponent("Velocity");
//Variáveis dos Obstaculos
const obstaculoPos = obstaculo.manager.getComponent("Position");


//Eventos
document.addEventListener("keydown", (event)=>{
    if(event.code === "Space"){
        playerVel.velocity = -7;
        playerPos.y -= 50;
    }
});

//Funções

function checkColision(playerX, playerW, playerY, playerH, obstaculoX, obstaculoW, obstaculoY, obstaculoH, canvasH){
    if(playerX + playerW >= obstaculoX &&//Verifica se o lado direito do personagem é maior que o lado esquerdo do obstaculo
        playerX <= obstaculoX + obstaculoW &&//Verifica se o lado esquerdo do personagem é menor que o lado esquerdo do obstaculo // Se essas 2 primeiras linhas forem verdadeira significa que colidiu no eixo X
            playerY + playerH >= obstaculoY &&//Verifica se o lado inferior do personagem é maior que o lado superior do obstaculo
                playerY <= obstaculoY + obstaculoH){//Verifica se o lado superior do personagem é menor que o lado inferior do obstaculo // Se esses 2 ultimas linhas forem verdadeira significa que colidiu no eixo Y
        return true;//Se colidiu no eixo X e no eixo Y ao mesmo tempo, significa que o personagem bateu no obstaculo, dai retorna true para a variável gameOver
    }
    if(playerY >= (canvasH -50) || playerY <= (canvasH - canvasH)){
        return true;
    }
}



function initialize(ctx, canvas){
    ctx.clearRect(0,0, canvas.width, canvas.height);//Limpa todo o canvas
    
    //Desenha os elementos do game
    cenario.draw(ctx, canvas.width, canvas.height);
    obstaculo.draw(ctx);
    player.spawn(ctx);
    player.update();
    obstaculo.update(canvas);

    gameOver = checkColision(playerPos.x, player.width, playerPos.y, player.height, obstaculoPos.x, obstaculo.width, obstaculoPos.y, obstaculo.height, canvas.height);

    if(!gameOver){//Enquanto o player não colidiu com o chão e nem com nenhum obstaculo o jogo continue.
        requestAnimationFrame(()=> initialize(ctx, canvas));
    }

}


//Inicialização do Jogo
initialize(ctx, canvas);