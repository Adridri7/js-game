import PositionComponent from "./Components/position.js";
import VelocityComponent from "./Components/velocity.js";
import VisualComponent from "./Components/visual.js";
import InputComponent from "./Components/input.js";

import MovementSystem from "./Systems/movements.js";
import RenderSystem from "./Systems/render.js";
import CollisionSystem from "./Systems/collision.js";
import CameraSystem from "./Systems/camera.js"; // Import du système de caméra

import Entity from "./Entities/entity.js";

// Variables initiales de la taille de la caméra
let viewportWidth = 300; // Largeur de la caméra
let viewportHeight = 240; // Hauteur de la caméra

const gameContainer = document.getElementById("game-container");

// Création des entités
let player = new Entity(1);
player.addComponent("position", new PositionComponent(0, 0));
player.addComponent("velocity", new VelocityComponent(5, 5));
player.addComponent("input", new InputComponent());
player.addComponent("visual", new VisualComponent("red", 16, 16));

let player2 = new Entity(2);
player2.addComponent("position", new PositionComponent(100, 100));
player2.addComponent("visual", new VisualComponent("yellow", 16, 16));

let player3 = new Entity(3);
player3.addComponent("position", new PositionComponent(1116, 100));
player3.addComponent("visual", new VisualComponent("blue", 16, 16));

// Création des systèmes
let movementSys = new MovementSystem();
let renderSys = new RenderSystem(gameContainer);
let cameraSys = new CameraSystem(gameContainer, player, viewportWidth, viewportHeight);
let collisionSys = new CollisionSystem(gameContainer, cameraSys);


let lastTime = performance.now(); // Temps de la dernière frame

function gameLoop(timestamp) {
    // Calcul du deltaTime en secondes
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Mettre à jour les systèmes
    movementSys.update([player], deltaTime);
    cameraSys.update(); // Mise à jour de la caméra
    collisionSys.update([player, player2, player3]);
    renderSys.update([player, player2, player3]);



    // Boucle du jeu
    requestAnimationFrame(gameLoop);
}

// Démarrer la boucle de jeu
requestAnimationFrame(gameLoop);
