function createOverlay() {
  var overlay = document.querySelector(".dark-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "dark-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "linear-gradient(135deg, rgba(0, 0, 40, 0.2), rgba(25, 0, 65, 0.4))";
    overlay.style.backdropFilter = "blur(0.8px)";
    overlay.style.pointerEvents = "none";
    document.body.appendChild(overlay);
  }
}

function deleteOverlay() {
  var overlay = document.querySelector(".dark-overlay");
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
  }
}
