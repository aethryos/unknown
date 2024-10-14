const KEY_CODES = {
    spike: 86, // V
    trap: 70, // F
    mill: 78, // N
    food: 81  // Q
};

class Macro {
    update() {
        setTimeout(() => {
            if (keyDown[KEY_CODES.spike]) this.place(4);
            if (keyDown[KEY_CODES.trap]) this.place(7);
            if (keyDown[KEY_CODES.mill]) this.place(5);
            if (keyDown[KEY_CODES.food]) this.place(2);
        }, 
