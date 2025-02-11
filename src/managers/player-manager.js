import { Entity } from '../entities/entity-object.js';
import { Position } from '../ecm-components/position.js';
import { Gravity } from '../ecm-components/gravity.js';
import { ImageComponent } from '../ecm-components/image-component.js';

export class PlayerManager{
    constructor(){
        this.manager = new Entity();
        this.manager.addComponent(new Position(50,50));
        this.manager.addComponent(new Gravity(0.5));
        this.manager.addComponent(new ImageComponent("../../assets/images/pinguin.png"));
    }

    spawn(ctx){
        const imageComponent = this.manager.getComponent("ImageComponent");
        const position = this.manager.getComponent("Position");
        
        if(imageComponent && position){//Verifica se o componente da imagem e da posição existe

            if(imageComponent.image.complete){//Caso a imagem já tenha sido carregada, desenha ela imediatamente na tela
                ctx.drawImage(imageComponent.image, position.x, position.y, 15, 15);
            } else {
                imageComponent.image.onload = ()=>{//Caso a imagem não tenha sido carregada, espere ela terminar de carregar e após isso desenha ela na tela
                    ctx.drawImage(imageComponent.image, position.x, position.y, 15, 15);
                }
            }

        } else {
            console.log("ERRO: A Imagem ou a Posição do PlayerManager não foi definida!");
        }
    }
}