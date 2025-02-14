import { Entity } from '../entities/entity-object.js';
import { Position } from '../ecm-components/position.js';
import { Velocity } from '../ecm-components/velocity.js';
import { ImageComponent } from '../ecm-components/image-component.js';


export class ObstaclesTopManager{
    constructor(){
        this.manager = new Entity();
        this.manager.addComponent(new Position(850,-250));
        this.manager.addComponent(new Velocity(10));
        this.manager.addComponent(new ImageComponent("../../assets/images/toppipe.png"));
        this.obstaclePosition = this.manager.getComponent("Position");
        this.obstacleImg = this.manager.getComponent("ImageComponent");
        this.velocidade = this.manager.getComponent("Velocity");
        this.width = 100;
        this.height = 500;
        this.ultimoScoreAumentado = 0;
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

    update(canvas, score){
        this.obstaclePosition.x -= this.velocidade.velocity;
        
        if(score % 5 === 0 && score !== 0 && score !== this.ultimoScoreAumentado){
            this.velocidade.velocity += 5;
            this.ultimoScoreAumentado = score;        
        }
        const janelaCanvas = canvas.width;
        const janela = janelaCanvas - canvas.width;
        const minY = -450;
        const maxY = -200;

        if(this.obstaclePosition.x + this.width <= 0- this.velocidade.velocity){
            this.obstaclePosition.x = janelaCanvas + 150;
            this.obstaclePosition.y = Math.floor(Math.random() * (minY - maxY) + maxY);
        }
    }

}