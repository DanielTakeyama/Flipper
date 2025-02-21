import { ImageComponent } from "../ecm-components/image-component.js";

export class StartManager {
    constructor() {
        this.background = new ImageComponent("../../assets/images/background.jpg");
        this.textImagePc = new ImageComponent("../../assets/images/startgamebutton.png");
        this.buttonWidth = 302;
        this.buttonHeight = 135;
        this.growing = true;
        this.animationFrameId = null; // Armazena o ID da animação
    }

    initialScreen(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.background.image, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.textImagePc.image, (canvas.width / 2 - this.buttonWidth / 2), (canvas.height / 2 - this.buttonHeight / 2), this.buttonWidth, this.buttonHeight);

        if (this.growing) {
            this.buttonWidth += 0.5;
            this.buttonHeight += 0.2;
            if (this.buttonWidth >= 320) this.growing = false;
        } else {
            this.buttonWidth -= 0.5;
            this.buttonHeight -= 0.2;
            if (this.buttonWidth <= 302) this.growing = true;
        }

        // Armazena o ID do requestAnimationFrame para poder cancelar depois
        this.animationFrameId = requestAnimationFrame(() => this.initialScreen(ctx, canvas));
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}
