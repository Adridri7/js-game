export default class VisualComponent {
    constructor(color, width = 16, height = 16) {
        this.color = color || 'yellow'; 
        this.width = width;  
        this.height = height;
    }
}