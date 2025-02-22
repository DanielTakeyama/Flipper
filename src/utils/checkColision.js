export function checkColision(playerX, playerW, playerY, playerH, obstaculoBottomX, obstaculoBottomW, obstaculoBottomY, obstaculoBottomH, obstaculoTopX, obstaculoTopW, obstaculoTopY, obstaculoTopH, canvasH){
    // Em algumas partes da lógica de colisão com os obstaculos eu coloquei o valor -15 que é para dar a sensação do player batendo a cara no obstaculo

    //Analisa se teve colisão com algum obstaculo inferior no eixo X e Y
    if(playerX + playerW -55 >= obstaculoBottomX &&//Verifica se o lado direito do personagem é maior que o lado esquerdo do obstaculo
        playerX <= obstaculoBottomX + obstaculoBottomW &&//Verifica se o lado esquerdo do personagem é menor que o lado direito do obstaculo // Se essas 2 primeiras linhas forem verdadeira significa que colidiu no eixo X
            playerY + playerH -55 >= obstaculoBottomY &&//Verifica se o lado inferior do personagem é maior que o lado superior do obstaculo
                playerY <= obstaculoBottomY + obstaculoBottomH){//Verifica se o lado superior do personagem é menor que o lado inferior do obstaculo // Se esses 2 ultimas linhas forem verdadeira significa que colidiu no eixo Y
        return true;//Se colidiu no eixo X e no eixo Y ao mesmo tempo, significa que o personagem bateu no obstaculo, dai retorna true para a variável gameOver
    }

    //Analisa se teve colisão com algum obstaculo do topo no eixo X e Y
    if(playerX + playerW -55 >= obstaculoTopX &&//Verifica se o lado direito do personagem é maior que o lado esquerdo do obstaculo
        playerX <= obstaculoTopX + obstaculoTopW &&//Verifica se o lado esquerdo do personagem é menor que o lado direito do obstaculo // Se essas 2 primeiras linhas forem verdadeira significa que colidiu no eixo X
            playerY +5 <= obstaculoTopY + obstaculoTopH &&//Verifica se o lado superior do personagem é menor que o lado inferior do obstaculo
                playerY + playerH -55 >= obstaculoTopY){//Verifica se o lado inferior do personagem é maior que o lado superior do obstaculo // Se esses 2 ultimas linhas forem verdadeira significa que colidiu no eixo Y
        return true;//Se colidiu no eixo X e no eixo Y ao mesmo tempo, significa que o personagem bateu no obstaculo, dai retorna true para a variável gameOver
    }

    //Analisa se o player saiu fora da tela
    if(playerY >= (canvasH -50) || playerY <= 0){
        return true;
    }
    return false;
}