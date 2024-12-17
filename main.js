import PositionComponent from "./Components/position.js";
import VelocityComponent from "./Components/velocity.js";
import VisualComponent from "./Components/visual.js";
import InputComponent from "./Components/input.js";

import MovementSystem from "./Systems/movements.js";
import RenderSystem from "./Systems/render.js";
import CollisionSystem from "./Systems/collision.js";

import Entity from "./Entities/entity.js";

const game_container = document.getElementById("game-container");

let player = new Entity(1);
player.addComponent("position", new PositionComponent(0, 0));
player.addComponent("velocity", new VelocityComponent(5, 5));
player.addComponent("input", new InputComponent());
player.addComponent("visual", new VisualComponent('red', 32, 32));

// Créer les systèmes
let movementSys = new MovementSystem();
let renderSys = new RenderSystem(game_container);
let collisionSys = new CollisionSystem(game_container); 

let lastTime = 0;  // Temps de la dernière frame

function gameLoop(timestamp) {
    // Calcul du deltaTime en secondes
    const deltaTime = ((timestamp - lastTime) / 1000);  
    lastTime = timestamp; 

    // Mettre à jour les systèmes
    movementSys.update([player], deltaTime);  
    collisionSys.update([player]);  
    renderSys.update([player]); 

    // Boucle du jeu
    requestAnimationFrame(gameLoop);
}

// Démarrer la boucle de jeu
requestAnimationFrame(gameLoop);
