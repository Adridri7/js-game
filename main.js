import PositionComponent from "./Components/position.js";
import VelocityComponent from "./Components/velocity.js";
import VisualComponent from "./Components/visual.js";

import MovementSystem from "./Systems/movements.js";
import RenderSystem from "./Systems/render.js";

import Entity from "./Entities/entity.js";

const game_container = document.getElementById("game-container")

let player = new Entity();
player.addComponent("position", new PositionComponent(0, 0));
player.addComponent("velocity", new VelocityComponent(0, 0));
player.addComponent("visual", new VisualComponent('red', 32, 32));  // Ajout du composant visuel

let movementSys = new MovementSystem();
let renderSys = new RenderSystem(game_container);

movementSys.update([player]);  
renderSys.update([player]);   

/*


let lastTime = 0;  // Temps de la dernière frame

function gameLoop(timestamp) {
    // Calcul du deltaTime en secondes
    const deltaTime = ((timestamp - lastTime) / 1000 );  // Convertir en secondes
    lastTime = timestamp;  // Mise à jour du temps de la dernière frame

    // Mettre à jour les systèmes avec deltaTime
    movementSys.update([player], deltaTime);  // Passer deltaTime à MovementSystem
    renderSys.update([player]);  // Le rendu peut ne pas en avoir besoin pour le deltaTime, mais tu pourrais l'utiliser pour des animations

    // Appeler la boucle de jeu à la prochaine frame
    requestAnimationFrame(gameLoop);
}

// Démarrer la boucle de jeu
requestAnimationFrame(gameLoop);

*/
