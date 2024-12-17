export default class MovementSystem {
    update(entities, deltaTime) {
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const velocity = entity.getComponent('velocity');

            if (position && velocity) {
                position.x += velocity.vx; 
                position.y += velocity.vy;
                console.log(`Entity ${entity.id} moved to (${position.x}, ${position.y})`);
            }
        });
    }
}