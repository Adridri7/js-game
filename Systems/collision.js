export default class CollisionSystem {
    constructor(container) {
        this.container = container;
        this.containerRect = container.getBoundingClientRect();
    }

    update(entities) {
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const visual = entity.getComponent('visual'); 
       
            if (position && visual){
                this.checkBounds(position, visual)
            }

        });
        
    }
    checkBounds(position, visual) {
        if (position.x < 0) position.x = 0;
        if (position.x + visual.width > this.containerRect.width) position.x = this.containerRect.width - visual.width;
        if (position.y < 0) position.y = 0;
        if (position.y + visual.height > this.containerRect.height) position.y = this.containerRect.height - visual.height;
    }
}
