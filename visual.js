    let SploopStyle = `
    <style>
    .chat-container input {
    color: yellow;
    text-align: center;
    background-color: #000000ba;
    box-shadow: none;
    width: 315px;
    }
    #play:hover {
    box-shadow: none;
    }
    #play {
    box-shadow: none;
    }
    .background-img-play {
    display: none;
    }
    .game-mode {
    box-shadow: none;
    }
    .dark-blue-button-3-active:hover {
    box-shadow: none;
    }
    .dark-blue-button:hover {
    box-shadow: none;
    }
    #nickname {
    background: #484c52;
    text-align: center;
    color: #9ab3ff;
    width:  340px;
    }
    .input {
    box-shadow: none;
    color: white;
    }
    .menu .content .menu-item {
    }
    #main-content {
    width: auto;
    }
    #hat-menu {
    }
    #hat_menu_content {
    padding: initial;
    }
    .menu .content .menu-item {
    border: none !important;
    }
    #server-select {
    width: 340px;
    }q
    #game-middle-main {
    height: 310px;
    }
    #homepage {
    background-image: url('') !important;
    }
    </style>
    `;
    $("body").append(SploopStyle)

let maingui = `
<div class="modsettings" id="mod">
    <input type="checkbox" id="hp2" class="ui-checkbox" onclick="hp()" checked> <label class="text">Show hitboxes</label>


</div>
    </body>
<style>

    .text {
        font-size: x-large

    }
    .modsettings {
        position: relative;
        top: 400px;
left: 1000px;
border-radius: 25px;
        width: 250px;
       height: 290px;
       background: #2919b6;
        border: 6px solid rgb(16, 29, 84);
    }
    /* checkbox settings 👇 */

.ui-checkbox {
  --primary-color: #1677ff;
  --secondary-color: #fff;
  --primary-hover-color: #4096ff;
  /* checkbox */
  --checkbox-diameter: 20px;
  --checkbox-border-radius: 5px;
  --checkbox-border-color: #d9d9d9;
  --checkbox-border-width: 1px;
  --checkbox-border-style: solid;
  /* checkmark */
  --checkmark-size: 1.2;
}

.ui-checkbox,
.ui-checkbox *,
.ui-checkbox *::before,
.ui-checkbox *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.ui-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--checkbox-diameter);
  height: var(--checkbox-diameter);
  border-radius: var(--checkbox-border-radius);
  background: var(--secondary-color);
  border: var(--checkbox-border-width) var(--checkbox-border-style) var(--checkbox-border-color);
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.ui-checkbox::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) var(--primary-color);
  box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) var(--primary-color);
  border-radius: inherit;
  opacity: 0;
  -webkit-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  -o-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.ui-checkbox::before {
  top: 40%;
  left: 50%;
  content: "";
  position: absolute;
  width: 4px;
  height: 7px;
  border-right: 2px solid var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
  -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  -ms-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),opacity 0.1s;
  -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),opacity 0.1s;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),opacity 0.1s;
}

/* actions */

.ui-checkbox:hover {
  border-color: var(--primary-color);
}

.ui-checkbox:checked {
  background: var(--primary-color);
  border-color: transparent;
}

.ui-checkbox:checked::before {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
  -ms-transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
  transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  -o-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
}

.ui-checkbox:active:not(:checked)::after {
  -webkit-transition: none;
  -o-transition: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  transition: none;
  opacity: 1;
}

</style>
`
//$('body').append(maingui) // currently a WIP, still making this

    const enhanceFillRect = function (fill, cColor) {
        return function (x, y, width, height) {
            if (this.fillStyle === "#a4cc4f") {
                this.fillStyle = cColor;
            }
            fill.call(this, x, y, width, height);
        };
    };

    const customColor = "#397bed";
    const FillRect = CanvasRenderingContext2D.prototype.fillRect;

    CanvasRenderingContext2D.prototype.fillRect = enhanceFillRect(FillRect, customColor);

    CanvasRenderingContext2D.prototype.fillText = new Proxy(CanvasRenderingContext2D.prototype.fillText, {
    apply: function (target, thisArg, argumentsList) {
        thisArg.lineWidth = 8;
        thisArg.strokeStyle = "black";
        thisArg.strokeText.apply(thisArg, argumentsList);
        return target.apply(thisArg, argumentsList);
      }
    });

let hp2 = document.getElementById('hp2');
var text = document.getElementById("trueorfalse");
let gridToggleElement = document.querySelector("#grid-toggle");
    if (gridToggleElement.checked) {
      console.log("disabling grids")
      gridToggleElement.click();
    }
let displayPingToggleElement = document.querySelector("#display-ping-toggle");
if (displayPingToggleElement.checked) {
    console.log("very cool script by very cool dude")
} else {
      displayPingToggleElement.click();
}
