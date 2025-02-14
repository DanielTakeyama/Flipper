import { ImageComponent } from "../ecm-components/image-component.js";

export class StartManager{
    constructor(){
        this.background = new ImageComponent("../../assets/images/background.jpg");
    }

    initialScreen(ctx, backgroundWidth, backgroundHeight){
        const background = this.background;

        if(backgroundWidth < 720){
            if(background.image.complete){
                ctx.drawImage(background.image, 0, 0, backgroundWidth, backgroundHeight);
                let textStart = "Toque na tela para iniciar o jogo!";
                ctx.font = "20px Arial";
                ctx.fillStyle = "black";
                const sizeText = ctx.measureText(textStart).width;
                ctx.fillText(textStart, (backgroundWidth / 2 - sizeText / 2),(backgroundHeight / 2));
    
            } else {
                background.image.onload = ()=>{
                    ctx.drawImage(background.image, 0, 0, backgroundWidth, backgroundHeight);
                    let textStart = "Toque na tela para iniciar o jogo!";
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "black";
                    const sizeText = ctx.measureText(textStart).width;
                    ctx.fillText(textStart, (backgroundWidth / 2 - sizeText / 2),(backgroundHeight / 2));
                }
            }
        } else {
            if(background.image.complete){
                ctx.drawImage(background.image, 0, 0, backgroundWidth, backgroundHeight);
                let textStart = "Pressione a tecla ESPAÇO para iniciar o jogo!";
                ctx.font = "30px Arial";
                ctx.fillStyle = "black";
                const sizeText = ctx.measureText(textStart).width;
                ctx.fillText(textStart, (backgroundWidth / 2 - sizeText / 2),(backgroundHeight / 2));
    
            } else {
                background.image.onload = ()=>{
                    ctx.drawImage(background.image, 0, 0, backgroundWidth, backgroundHeight);
                    let textStart = "Pressione a tecla ESPAÇO para iniciar o jogo!";
                    ctx.font = "30px Arial";
                    ctx.fillStyle = "black";
                    const sizeText = ctx.measureText(textStart).width;
                    ctx.fillText(textStart, (backgroundWidth / 2 - sizeText / 2),(backgroundHeight / 2));
                }
            }
        }

    }
}