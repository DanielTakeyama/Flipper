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

function initialize(ctx, canvas){
    ctx.clearRect(0,0, canvas.width, canvas.height);//Limpa todo o canvas
    
    //Desenha os elementos do game
    cenario.draw(ctx, canvas.width, canvas.height);
    obstaculo.draw(ctx);
    player.spawn(ctx);
    player.update();
    obstaculo.update(canvas);

    if(playerPos.y >= 700 || playerPos.y <= -120){//Se o player encostar no chão acaba o jogo
        gameOver = true;
    }

    if(!gameOver){//Enquanto o player não colidiu com o chão e nem com nenhum obstaculo o jogo continue.
        requestAnimationFrame(()=> initialize(ctx, canvas));
    }
    console.log(playerPos.y)
}


//Inicialização do Jogo
initialize(ctx, canvas);