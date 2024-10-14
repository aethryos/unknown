const KEY_CODES = {
  spike: 86, // V
  trap: 70, // F
  mill: 78, // N
  food: 81  // Q
};

class Macro {
  constructor(advanced) {
    this.advanced = advanced;
    this.place = this.place.bind(this);
  }

  init() {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case KEY_CODES.spike:
          this.place(4);
          break;
        case KEY_CODES.trap:
          this.place(7);
          break;
        case KEY_CODES.mill:
          this.place(5);
          break;
        case KEY_CODES.food:
          this.place(2);
          break;
      }
    });
  }
}
