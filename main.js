const game_container = document.getElementById("game-container")

let player = new Entity();
player.addComponent("position", new PositionComponent(0, 0));
player.addComponent("velocity", new VelocityComponent(0, 15));
player.addComponent("visual", new VisualComponent('red', 32, 32));  // Ajout du composant visuel

// Initialisation du système de mouvement et de rendu
let movementSys = new MovementSystem();
let renderSys = new RenderSystem(game_container);

movementSys.update([player]);  
renderSys.update([player]);   

