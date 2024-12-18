export default class InputComponent {
    constructor() {
        this.x = 0;  // Déplacement horizontal
        this.y = 0;  // Déplacement vertical
        this.keys = new Set();  // Ensemble des touches pressées

        window.addEventListener("keydown", (e) => {
            this.keys.add(e.key); 
        });

        window.addEventListener("keyup", (e) => {
            this.keys.delete(e.key);
        });
    }

    update() {
        // Réinitialiser les déplacements
        this.x = 0;
        this.y = 0;

        // Mise à jour en fonction des touches pressées
        if (this.keys.has("q")) this.x = -1;
        if (this.keys.has("d")) this.x = 1;
        if (this.keys.has("z")) this.y = -1;
        if (this.keys.has("s")) this.y = 1;
    }
}
