const ga = {
  spike: new x(4, 86, 30),
  trap: new x(7, 70, 30),
  heal: new x(2, 81, 30),
  mill: new x(5, 78, 30)
};

let debounceTimeout = null;
let throttleTimeout = null;

document.addEventListener("keydown", a => {
  const b = a.keyCode;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const properties = Object.keys(ga);
    let index = 0;

    throttleTimeout = setInterval(() => {
      if (index < properties.length) {
        ga[properties[index]].start(b);
        index++;
      } else {
        clearInterval(throttleTimeout);
      }
    }, 50); // Adjust the throttle delay as needed
  }, 300); // Adjust the debounce time as needed
});
