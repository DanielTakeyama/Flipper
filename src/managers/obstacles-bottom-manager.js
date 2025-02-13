import { Entity } from '../entities/entity-object.js';
import { Position } from '../ecm-components/position.js';
import { Velocity } from '../ecm-components/velocity.js';
import { ImageComponent } from '../ecm-components/image-component.js';


export class ObstaclesBottomManager{
    constructor(){
        this.manager = new Entity();
        this.manager.addComponent(new Position(850,420));
        this.manager.addComponent(new Velocity(5));
        this.manager.addComponent(new ImageComponent("../../assets/images/bottompipe.png"));
        this.obstaclePosition = this.manager.getComponent("Position");
        this.obstacleImg = this.manager.getComponent("ImageComponent");
        this.width = 100;
        this.height = 500;
    }

    draw(ctx){
        if(this.obstacleImg.image.complete){
            ctx.drawImage(this.obstacleImg.image, this.obstaclePosition.x, this.obstaclePosition.y, this.width, this.height);
        } else {
            this.obstacleImg.image.onload = ()=>{
                ctx.drawImage(this.obstacleImg.image, this.obstaclePosition.x, this.obstaclePosition.y, this.width, this.height);
            }
        }
    }

    update(canvas){
        this.obstaclePosition.x -= 10;
        const janelaCanvas = canvas.width;
        const janela = janelaCanvas - canvas.width;
        const minY = 650;
        const maxY = 420;

        if(this.obstaclePosition.x <= janela -100){
            this.obstaclePosition.x = janelaCanvas + 150;
            this.obstaclePosition.y = Math.floor(Math.random() * (minY - maxY) + maxY);
        }
    }

}