//Managers
import { PlayerManager } from './managers/player-manager.js';
import { ScenaryManager } from './managers/scenery-manager.js';
import { ObstaclesBottomManager } from './managers/obstacles-bottom-manager.js';
import { ObstaclesTopManager } from './managers/obstacles-top-manager.js';
import { ScoreManager } from './managers/score-manager.js';
import { StartManager } from './managers/start-manager.js';
import { GameOverManager } from './managers/gameover-manager.js';

//Funções
import { checkColision } from './utils/checkColision.js';

document.addEventListener('DOMContentLoaded', function(){
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
    const start = new StartManager();
    const backgroundAudio = new Audio('../assets/sound/backgroundflipperost.mp3');
    const gameOverManager = new GameOverManager();

    //Variáveis Globais
    let gameOver = false;
    let jogoIniciado = false;

    //Variáveis do Player
    const playerPos = player.manager.getComponent("Position");
    const playerVel = player.manager.getComponent("Velocity");


    //Variáveis dos Obstaculos
    const obstaculoBottomPos = obstaculoBottom.manager.getComponent("Position");
    const obstaculoTopPos = obstaculoTop.manager.getComponent("Position");

    //Configuração dos audios
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5;

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
        
        gameOver = checkColision(playerPos.x, player.width, playerPos.y, player.height, obstaculoBottomPos.x, obstaculoBottom.width, obstaculoBottomPos.y, obstaculoBottom.height, obstaculoTopPos.x, obstaculoTop.width, obstaculoTopPos.y, obstaculoTop.height, canvas.height);
        if(!gameOver) {
            requestAnimationFrame(() => initialize(ctx, canvas));
        } else {
            gameOverManager.endgame(ctx, canvas, backgroundAudio,score.valor);
            
            setTimeout(()=>{
                location.reload();
            }, 2000);
        }

    }

    //Eventos de Inicialização
    document.addEventListener("touchstart", ()=>{//Mobile
        if(jogoIniciado === true){
            playerVel.velocity = -7;
            playerPos.y -= 50;
        }
    });

    document.addEventListener("keydown", (event)=>{
        if(event.code === "Space" && jogoIniciado === true){
            playerVel.velocity = -7;
            playerPos.y -= 50;
        }
    });

    canvas.addEventListener("mousemove", (event) => {
        if (!jogoIniciado) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
    
            // Posição e tamanho do botão de start
            const buttonX = canvas.width / 2 - start.buttonWidth / 2;
            const buttonY = canvas.height / 2 - start.buttonHeight / 2;
            const buttonWidth = start.buttonWidth;
            const buttonHeight = start.buttonHeight;
    
            if (
                mouseX >= buttonX &&
                mouseX <= buttonX + buttonWidth &&
                mouseY >= buttonY &&
                mouseY <= buttonY + buttonHeight
            ) {
                canvas.style.cursor = "pointer"; // Muda para a seta de clique
            } else {
                canvas.style.cursor = "default"; // Volta ao cursor normal
            }
        }
    });
    
    canvas.addEventListener("click", (event) => {
        if (!jogoIniciado) {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;
    
            // Posição e tamanho do botão Start
            const buttonX = canvas.width / 2 - start.buttonWidth / 2;
            const buttonY = canvas.height / 2 - start.buttonHeight / 2;
            const buttonWidth = start.buttonWidth;
            const buttonHeight = start.buttonHeight;
    
            if (
                clickX >= buttonX &&
                clickX <= buttonX + buttonWidth &&
                clickY >= buttonY &&
                clickY <= buttonY + buttonHeight
            ) {
                initialize(ctx, canvas); // Inicia o jogo
                start.stopAnimation();
                backgroundAudio.play();
                jogoIniciado = true;
                canvas.style.cursor = "default"; // Volta ao cursor normal ao iniciar o jogo
            }
        }
    });

    //Inicialização
    if(jogoIniciado === false && gameOver === false){
        start.initialScreen(ctx, canvas);
    }
});
