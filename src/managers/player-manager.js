import { Entity } from '../entities/entity-object.js';
import { Position } from '../ecm-components/position.js';
import { Gravity } from '../ecm-components/gravity.js';
import { ImageComponent } from '../ecm-components/image-component.js';

export class PlayerManager{
    constructor(){
        this.player = new Entity();
        this.player.addComponent(new Position(50,50));
        this.player.addComponent(new Gravity(0.5));
        this.player.addComponent(new ImageComponent("../../assets/images/pinguin.png"));
    }
}
