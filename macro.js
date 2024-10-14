const ga = {
  spike: new x(4, 86, 30),
  trap: new x(7, 70, 30),
  heal: new x(2, 81, 30),
  mill: new x(5, 78, 30)
};

document.addEventListener("keydown", a => {
  const b = a.keyCode;
  for (let c in ga) {
    ga[c].start(b);
  }
});
