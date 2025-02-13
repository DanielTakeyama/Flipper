import { ImageComponent } from "../ecm-components/image-component.js";

export class ScenaryManager{
    constructor(){
        this.background = new ImageComponent("../../assets/images/background.jpg");
    }

    draw(ctx, backgroundWidth, backgroundHeight){
        const background = this.background;

        if(background.image.complete){
            ctx.drawImage(background.image, 0, 0, backgroundWidth, backgroundHeight);
        } else {
            background.image.onload = ()=>{
                ctx.drawImage(background.image, 0, 0, backgroundWidth, backgroundHeight);
            }
        }
    }
}