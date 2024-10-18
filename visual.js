    let SploopStyle = `
    <style>
    .chat-container input {
    color: yellow;
    text-align: center;
    background-color: #000000ba;
    box-shadow: none;
    width: 315px;
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
    #hat-menu {
    }
    #hat_menu_content {
    padding: initial;
    }
    #homepage {
    background-image: url('') !important;
    }
    </style>
    `;
    $("body").append(SploopStyle)

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
    const grid = document.querySelector('#grid-toggle');
    const pingshw = document.querySelector('#display-ping-toggle');
    grid.click();
    pingshw.click();
