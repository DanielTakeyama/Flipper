import { ImageComponent } from "../ecm-components/image-component.js";

export class GameOverManager{
    constructor(){
        this.background = new ImageComponent("../../assets/images/background.jpg");
    }

    endgame(ctx, canvas, backgroundMusic, score){
        const background = this.background;

            if(background.image.complete){
                ctx.clearRect(0,0, canvas.width, canvas.height);//Limpa todo o canvas
                backgroundMusic.pause();
                ctx.drawImage(background.image, 0, 0, canvas.width, canvas.height);//Desenha o Background
                ctx.fillStyle = "red";
                ctx.font = "bold 48px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);
                ctx.fillStyle = "black";
                ctx.fillText(`Seu score: ${score}`, canvas.width / 2, canvas.height / 2);
            } else {
                ctx.clearRect(0,0, canvas.width, canvas.height);//Limpa todo o canvas
                backgroundMusic.pause();
                ctx.drawImage(background.image, 0, 0, canvas.width, canvas.height);//Desenha o Background
                ctx.drawImage(textImagePc.image, (canvas.width / 2 - (this.buttonWidth / 2)), (canvas.height / 2 - (this.buttonHeight / 2)), this.buttonWidth, this.buttonHeight);//Desenha o botão de Start
                ctx.fillStyle = "red";
                ctx.font = "bold 48px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);
                ctx.fillStyle = "black";
                ctx.fillText(`Seu score: ${score}`, canvas.width / 2, canvas.height / 2);
            }
        }
}