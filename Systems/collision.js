export default class CollisionSystem {
    constructor(container) {
        this.container = container;  // Le conteneur du jeu
        this.containerRect = container.getBoundingClientRect();  // Récupère les dimensions de la div contenant le jeu
    }

    update(entities) {
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const visual = entity.getComponent('visual');  // Récupérer les composant visuel pour connaître la taille de l'entité

            // Vérification des collisions avec les bords du conteneur
            if (position && visual) {
                // Vérifier si l'entité dépasse les bords gauche et droit
                if (position.x < 0) {
                    position.x = 0;
                } else if (position.x + visual.width > this.containerRect.width) {
                    position.x = this.containerRect.width - visual.width;
                }

                // Vérifier si l'entité dépasse les bords haut et bas
                if (position.y < 0) {
                    position.y = 0;
                } else if (position.y + visual.height > this.containerRect.height) {
                    position.y = this.containerRect.height - visual.height;
                }
            }
        });
    }
}
