import { PlayerManager } from './managers/player-manager.js';
import { ScenaryManager } from './managers/scenery-manager.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new PlayerManager();
const cenario = new ScenaryManager();
let gameOver = false;

function initialize(ctx, canvas){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    cenario.draw(ctx, canvas.width, canvas.height);
    player.spawn(ctx);
    player.update();
    
    if(player.manager.components.Position.y === 700){//Se o player encostar no chão acaba o jogo
        gameOver = true;
    }

    if(!gameOver){//Enquanto o player não colidiu com o chão e nem com nenhum obstaculo o jogo continue.
        requestAnimationFrame(()=> initialize(ctx, canvas));
    }
}

initialize(ctx, canvas);