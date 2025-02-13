import { Entity } from '../entities/entity-object.js';
import { Position } from '../ecm-components/position.js';
import { Gravity } from '../ecm-components/gravity.js';
import { Velocity } from '../ecm-components/velocity.js';

import { ImageComponent } from '../ecm-components/image-component.js';

export class PlayerManager{
    constructor(){
        this.manager = new Entity();
        this.manager.addComponent(new Position(50,50));
        this.manager.addComponent(new Gravity(0.5));
        this.manager.addComponent(new Velocity(5));
        this.manager.addComponent(new ImageComponent("../../assets/images/flappybird.png"));
    }

    spawn(ctx){
        const imageComponent = this.manager.getComponent("ImageComponent");
        const position = this.manager.getComponent("Position");
        const managerWidth = 70;
        const managerHeight = 60;
        if(imageComponent && position){//Verifica se o componente da imagem e da posição existe

            if(imageComponent.image.complete){//Caso a imagem já tenha sido carregada, desenha ela imediatamente na tela
                ctx.drawImage(imageComponent.image, position.x, position.y, managerWidth, managerHeight);
            } else {
                imageComponent.image.onload = ()=>{//Caso a imagem não tenha sido carregada, espere ela terminar de carregar e após isso desenha ela na tela
                    ctx.drawImage(imageComponent.image, position.x, position.y, managerWidth, managerHeight);
                }
            }

        } else {
            console.log("ERRO: A Imagem ou a Posição do PlayerManager não foi definida!");
        }
    }

    update(){
        const gravidade = this.manager.getComponent("Gravity");
        const velocidade = this.manager.getComponent("Velocity");
        const position = this.manager.getComponent("Position");

        velocidade.velocity += gravidade.gravity;
        position.y +=  velocidade.velocity;
    }
}