function placeItem(keyCode) {
  switch (keyCode) {
    case 86: // V
      this.place(4); // Spike
      break;
    case 70: // F
      this.place(7); // Trap
      break;
    case 78: // N
      this.place(5); // Mill
      break;
    case 81: // Q
      this.place(2); // Heal
      break;
  }
}

document.addEventListener("keydown", a => {
  placeItem(a.keyCode);
});
