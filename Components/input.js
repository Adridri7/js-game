export default class InputComponent {
    constructor() {
        this.x = 0
        this.y = 0

        window.addEventListener("keydown", (e) => {
            if (e.key === "q") this.x = -1
            if (e.key === "d") this.x = 1

            if (e.key === "z") this.y = -1
            if (e.key === "s") this.y = 1
        })

        window.addEventListener("keyup", (e) =>{
            if (e.key === "q" || e.key === "d") this.x = 0
            if (e.key === "z" || e.key === "s") this.y = 0
        })
    }
}