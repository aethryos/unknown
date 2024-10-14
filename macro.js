const ga = {
  spike: new x(4, 86, 20),
  trap: new x(7, 70, 20),
  heal: new x(2, 81, 20),
  mill: new x(5, 78, 20)
};

document.addEventListener("keydown", a => {
  const b = a.keyCode;
  for (let c in ga) {
    ga[c].start(b);
  }
});
