export default class MovementSystem {
    update(entities) {
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const velocity = entity.getComponent('velocity');
            const input = entity.getComponent('input')


            if (position && velocity) {
                position.x += velocity.vx * input.x; 
                position.y += velocity.vy * input.y;
                //console.log(`Entity ${entity.id} moved to (${position.x}, ${position.y})`);
            }
        });
    }
}