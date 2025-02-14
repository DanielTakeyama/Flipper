//Managers
import { PlayerManager } from './managers/player-manager.js';
import { ScenaryManager } from './managers/scenery-manager.js';
import { ObstaclesBottomManager } from './managers/obstacles-bottom-manager.js';
import { ObstaclesTopManager } from './managers/obstacles-top-manager.js';
import { ScoreManager } from './managers/score-manager.js';

//Funções
import { checkColision } from './utils/checkColision.js';

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
const score = new ScoreManager();

//Variáveis Globais
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

document.addEventListener("touchstart", ()=>{//Mobile
    playerVel.velocity = -7;
    playerPos.y -= 50;
});


//Funções
function initialize(ctx, canvas){
    ctx.clearRect(0,0, canvas.width, canvas.height);//Limpa todo o canvas
    
    //Desenha os elementos do game
    cenario.draw(ctx, canvas.width, canvas.height);

    obstaculoTop.draw(ctx);
    obstaculoBottom.draw(ctx);
    score.draw(ctx);
    player.spawn(ctx);

    player.update();
    obstaculoBottom.update(canvas, score.valor);
    obstaculoTop.update(canvas, score.valor);
    score.update(playerPos, obstaculoBottom, obstaculoBottomPos);
    console.log(obstaculoBottom.velocidade.velocity);
    gameOver = checkColision(playerPos.x, player.width, playerPos.y, player.height, obstaculoBottomPos.x, obstaculoBottom.width, obstaculoBottomPos.y, obstaculoBottom.height, obstaculoTopPos.x, obstaculoTop.width, obstaculoTopPos.y, obstaculoTop.height, canvas.height);
    if(!gameOver){//Enquanto o player não colidiu com o chão e nem com nenhum obstaculo o jogo continue.
        requestAnimationFrame(()=> initialize(ctx, canvas));
    }

}

//Inicialização do Jogo
initialize(ctx, canvas);