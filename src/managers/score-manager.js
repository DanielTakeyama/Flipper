export class ScoreManager{
    constructor(){
        this.valor = 0;
        this.obstaculoPassado = false;
    }

    draw(ctx){
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`Score: ${this.valor}`, 10, 30);
    }
    
    update(playerPos, obstaculoBottom, obstaculoBottomPos){
        if(playerPos.x >= obstaculoBottomPos.x + obstaculoBottom.width && this.obstaculoPassado === false){
            this.valor += 1;
            this.obstaculoPassado = true;
        }
        if (obstaculoBottomPos.x + obstaculoBottom.width <= 0){
            this.obstaculoPassado = false;
        }
    }
}
