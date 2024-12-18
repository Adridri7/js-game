export default class CameraSystem {
    constructor(gameContainer, player, viewportWidth, viewportHeight) {
        this.gameContainer = gameContainer; // La carte complète
        this.player = player; // Le joueur suivi par la caméra
        this.viewportWidth = viewportWidth; // Largeur visible de la caméra
        this.viewportHeight = viewportHeight; // Hauteur visible de la caméra
        
        this.viewport = document.querySelector('.viewport');
        this.viewport.style.width = `${this.viewportWidth}px`;
        this.viewport.style.height = `${this.viewportHeight}px`;
    }

    update() {
        const playerPosition = this.player.getComponent("position");

        if (playerPosition) {
            // Centrer le joueur dans le viewport
            let offsetX = playerPosition.x - this.viewportWidth / 2;
            let offsetY = playerPosition.y - this.viewportHeight / 2;

            // Empêcher la caméra de sortir des limites de la carte
            offsetX = Math.max(0, Math.min(offsetX, this.gameContainer.offsetWidth - this.viewportWidth));
            offsetY = Math.max(0, Math.min(offsetY, this.gameContainer.offsetHeight - this.viewportHeight));

            // Déplacer la game-container pour simuler le déplacement de la caméra
            this.gameContainer.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
        }
    }
}
