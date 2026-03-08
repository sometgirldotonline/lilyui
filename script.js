function sendMessage(msg) {
    window.webkit.messageHandlers.pythonBridge.postMessage(msg);
}

// Listen for responses from Python
function onPythonResponse(message) {
}

function scrolltoCard(focusEl) {
    focusEl.classList.add("focus")
    focusEl.id = "focus"
    var friends = [...focusEl.parentElement.children]
    var focusIndex = friends.indexOf(focusEl)
    friends.forEach((el, i) => {
        if (i !== focusIndex) {
            el.id = ""
            el.classList.remove("focus")
        }
    })
    focusEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            // document.querySelector("a.s2f").click()
}
function moveFocus(moveBy = 1) {
    var f = document.querySelector(".focus")
    var friends = [...f.parentElement.children]
    var newF = friends[friends.indexOf(f) + moveBy]
    if(newF !== undefined){
        console.log("MF", f, moveBy, friends[friends.indexOf(f) + moveBy])
        scrolltoCard(newF)
    }
}
/**
 * 12: UP
 * 13: down
 * 14: left
 * 15: right
 * 0: a
 * 1: b
 */

// i had AI write the debounce function, debouning is like a black box to me, i do not understand it.
const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};
var prevBtns = undefined;
function inputLoop() {
    var gg = navigator.getGamepads()
    if (gg.length > 0) {
        console.log(gg[0].buttons[14].pressed, prevBtns[14], gg[0].buttons[15].pressed, prevBtns[15])
        if (gg[0].buttons[14].pressed && !prevBtns[14]) {
            moveFocus(-1)
        }
        else if (gg[0].buttons[15].pressed && !prevBtns[15]) {
            moveFocus(1)
        }
        prevBtns = gg[0].buttons.map(b => b.pressed)
    }

    requestAnimationFrame(inputLoop)
}
window.addEventListener("gamepadconnected", () => {
    console.log("Gamepad connected, starting update loop.");
    prevBtns = navigator.getGamepads()[0].buttons.map(b => b.pressed)
    requestAnimationFrame(inputLoop);
});

// For initial connection check
if (navigator.getGamepads()[0]) {
    prevBtns = navigator.getGamepads()[0].buttons.map(b => b.pressed)
    requestAnimationFrame(inputLoop);
}
