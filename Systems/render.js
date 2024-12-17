export default class RenderSystem {
    constructor(container) {
        this.container = container;
    }

    update(entities) {
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const visual = entity.getComponent('visual');  // Récupérer le composant visuel

            if (position && visual) {
                // Créer ou mettre à jour un élément DOM pour l'entité
                let entityElement = document.getElementById(entity.id);
                
                if (!entityElement) {
                    // Si l'élément n'existe pas encore, créer un nouveau div
                    entityElement = document.createElement('div');
                    entityElement.id = entity.id;
                    this.container.appendChild(entityElement);
                }

                // Positionner l'élément en fonction des coordonnées de l'entité
                entityElement.style.position = 'absolute';
                entityElement.style.left = `${position.x}px`;
                entityElement.style.top = `${position.y}px`;
                entityElement.style.width = `${visual.width}px`;
                entityElement.style.height = `${visual.height}px`;
                entityElement.style.backgroundColor = visual.color;
            }
        });
        
        
    }
}
