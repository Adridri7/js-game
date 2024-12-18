export default class CollisionSystem {
    constructor(container, cameraSystem) {
        this.container = container;
        this.containerRect = container.getBoundingClientRect(); // Dimensions du conteneur de la carte
        this.cameraSystem = cameraSystem; // Système de caméra pour connaître la zone visible
    }

    update(entities) {
        // Récupère la zone visible de la caméra (les coordonnées visibles)
        const visibleArea = this.cameraSystem.getVisibleArea();

        // Vérification des collisions avec les bords du conteneur
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const visual = entity.getComponent('visual'); 

            if (position && visual) {
                // Vérifie si l'entité est dans les limites du conteneur (toujours)
                this.checkBounds(position, visual);
            }
        });

        // Vérification des collisions entre entités visibles
        for (let i = 0; i < entities.length; i++) {
            const entityA = entities[i];
            const positionA = entityA.getComponent('position');
            const visualA = entityA.getComponent('visual'); 

            if (positionA && visualA) {
                if (this.isEntityVisible(positionA, visualA, visibleArea)) {
                    // Vérifier les collisions avec les autres entités visibles
                    for (let j = i + 1; j < entities.length; j++) {
                        const entityB = entities[j];
                        const positionB = entityB.getComponent('position');
                        const visualB = entityB.getComponent('visual'); 

                        if (positionB && visualB) {
                            this.checkEntityCollision(entityA, entityB, positionA, visualA, positionB, visualB);
                        }
                    }
                }
            }
        }
    }

    // Méthode pour vérifier si une entité est dans la zone visible de la caméra
    isEntityVisible(position, visual, visibleArea) {
        return position.x + visual.width > visibleArea.x &&
               position.x < visibleArea.x + visibleArea.width &&
               position.y + visual.height > visibleArea.y &&
               position.y < visibleArea.y + visibleArea.height;
    }

    // Vérifier les limites du conteneur
    checkBounds(position, visual) {
        if (position.x < 0) position.x = 0;
        if (position.x + visual.width > this.containerRect.width) position.x = this.containerRect.width - visual.width;
        if (position.y < 0) position.y = 0;
        if (position.y + visual.height > this.containerRect.height) position.y = this.containerRect.height - visual.height;
    }

    // Vérification des collisions entre deux entités
    checkEntityCollision(entityA, entityB, positionA, visualA, positionB, visualB) {
        // Vérification de la collision avec l'autre entité (A et B)
        const isColliding =
            positionA.x < positionB.x + visualB.width &&
            positionA.x + visualA.width > positionB.x &&
            positionA.y < positionB.y + visualB.height &&
            positionA.y + visualA.height > positionB.y;

        if (isColliding) {
            // Si les entités se touchent, résoudre la collision
            entityA.isColliding = true;
            entityB.isColliding = true;
            this.resolveCollision(positionA, visualA, positionB, visualB);
        } else {
            entityA.isColliding = false;
            entityB.isColliding = false;
        }
    }

    // Méthode pour résoudre la collision entre deux entités
    resolveCollision(positionA, visualA, positionB, visualB) {
        // Calculer la distance entre les entités A et B
        const dx = positionA.x - positionB.x;
        const dy = positionA.y - positionB.y;

        // Calculer les directions de la collision
        const overlapX = (visualA.width + visualB.width) / 2 - Math.abs(dx);
        const overlapY = (visualA.height + visualB.height) / 2 - Math.abs(dy);

        // Si une collision se produit, ajuster la position de A
        if (overlapX > 0 && overlapY > 0) {
            // Résoudre la collision en ajustant la position d'entityA
            if (overlapX < overlapY) {
                // Déplacer entityA sur l'axe X pour résoudre la collision
                positionA.x = dx > 0 ? positionA.x + overlapX : positionA.x - overlapX;
            } else {
                // Déplacer entityA sur l'axe Y pour résoudre la collision
                positionA.y = dy > 0 ? positionA.y + overlapY : positionA.y - overlapY;
            }
        }
    }
}
