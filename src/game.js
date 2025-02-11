import { PlayerManager } from './managers/player-manager.js';
import { ScenaryManager } from './managers/scenery-manager.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function initialize(ctx, canvas){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    const player = new PlayerManager();
    const cenario = new ScenaryManager();
    
    cenario.draw(ctx, canvas.width, canvas.height);
    player.spawn(ctx);

    
    requestAnimationFrame(()=> initialize(ctx, canvas));
}

initialize(ctx, canvas);