    const HATS = {
        BUSH_HAT: 0,
        BERSERKER: 2,
        CRYSTAL_GEAR: 4,
        SPIKE_GEAR: 5,
        IMMUNITY_GEAR: 6,
        BOOST_HAT: 7,
        SCUBA_GEAR: 9,
        HOOD: 10,
        DEMOLIST: 11
    };
 
    // Change your keybinds if you need to, get list of the key codes here: https://keycode.info
    // Please use `event.code` to change keybind
    // If you don't need a keybind, leave the field empty ""
 
    const KEYBINDS = {
        [HATS.BUSH_HAT]: "",
        [HATS.BERSERKER]: "KeyB",
        [HATS.JUNGLE_GEAR]: "",
        [HATS.CRYSTAL_GEAR]: "KeyG",
        [HATS.SPIKE_GEAR]: "KeyT",
        [HATS.IMMUNITY_GEAR]: "KeyL",
        [HATS.BOOST_HAT]: "ShiftLeft",
        [HATS.APPLE_HAT]: "",
        [HATS.SCUBA_GEAR]: "KeyN",
        [HATS.HOOD]: "KeyU",
        [HATS.DEMOLIST]: "KeyZ"
    };
 
    // HAT EQUIP LOGIC GOES BELOW

window.addEventListener("keydown", function(event) {
    if (event.repeat) return;

    for (const key in KEYBINDS) {
        if (event.code === KEYBINDS[key]) {
            const hatNumber = Object.keys(HATS).indexOf(key);
            equip(hatNumber);
            break;
        }
    }
})
