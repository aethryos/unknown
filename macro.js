class Macro {
    constructor(advanced, spike, trap, mill, food) {
        this.advanced = advanced;
        this.spike = spike;
        this.trap = trap;
        this.mill = mill;
        this.food = food;
    };

    update() {
        setTimeout(() => {

            if (keyDown[this.spike]) Sploop.newPlace(4);
            if (keyDown[this.trap]) Sploop.newPlace(7);
            if (keyDown[this.mill]) Sploop.newPlace(5);
            if (keyDown[this.food]) Sploop.newPlace(2);
        }, 14);
    };
};
