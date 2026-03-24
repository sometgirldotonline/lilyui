function sendMessage(msg) {
    window.webkit.messageHandlers.pythonBridge.postMessage(msg);
}

// Listen for responses from Python
function onPythonResponse(message) {
}

function scrolltoCard(focusEl) {
    focusEl.classList.add("focus")
    var friends = [...focusEl.parentElement.children]
    var focusIndex = friends.indexOf(focusEl)
    friends.forEach((el, i) => {
        if (i !== focusIndex) {
            el.id = ""
            el.classList.remove("focus")
        }
    })
    focusEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}
function moveFocusX(moveBy = 1) {
    var f = document.querySelector(".focus")
    var friends = [...f.parentElement.children]
    var newF = friends[friends.indexOf(f) + moveBy]
    if (friends.indexOf(f) + moveBy < 0) {
        newF = friends[friends.length - 1]
    }
    else if (friends.indexOf(f) + moveBy >= friends.length) {
        newF = friends[0]
    }
    if (newF.parentElement == document.body) {
        newF = newF.children[0]
    }
    if (newF !== undefined) {
        console.log("MF", f, moveBy, friends[friends.indexOf(f) + moveBy])
        if (newF.classList.contains("card")) {
            scrolltoCard(newF)
        }
        else {
            document.querySelector(".focus").classList.remove("focus")
            newF.classList.add("focus")
        }
    }
}

function moveFocusY(moveBy = 1) {
    // save X position!
    var foc = document.querySelector(".focus")
    foc.parentElement.setAttribute("lastPosition", [...foc.parentElement.children].indexOf(foc))


    var f = foc.parentElement
    var friends = [...f.parentElement.children].filter((val) => { return val.tagName == "DIV" })
    var newF = friends[friends.indexOf(f) + moveBy]
    if (friends.indexOf(f) + moveBy < 0) {
        newF = friends[friends.length - 1]
    }
    else if (friends.indexOf(f) + moveBy >= friends.length) {
        newF = friends[0]
    }
    if (newF.tagName !== "DIV") {
        newF = friends[0]
    }
    if (newF !== undefined) {
        lastPos = newF.getAttribute("lastPosition")
        if (lastPos !== null && newF.children.length > lastPos) {
            newF = newF.children[lastPos]
        }
        else {
            newF = newF.children[0]
        }

        if (newF.parentElement == document.body) {
            newF = friends[0].children[0]
        }

    }

    if (newF !== undefined) {
        console.log("MF", f, moveBy, friends[friends.indexOf(f) + moveBy])
        document.querySelector(".focus").classList.remove("focus")
        newF.classList.add("focus")

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

var prevBtns = undefined;
function inputLoop() {
    var gg = navigator.getGamepads()
    if (gg.length > 0) {
        console.log(gg[0].buttons[14].pressed, prevBtns[14], gg[0].buttons[15].pressed, prevBtns[15])
        if (gg[0].buttons[14].pressed && !prevBtns[14]) {
            moveFocusX(-1)
        }
        else if (gg[0].buttons[15].pressed && !prevBtns[15]) {
            moveFocusX(1)
        }
        else if (gg[0].buttons[12].pressed && !prevBtns[12]) {
            moveFocusY(-1)
        }
        else if (gg[0].buttons[13].pressed && !prevBtns[13]) {
            moveFocusY(1)
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

scrolltoCard(document.querySelector(".card.focus"))


window.addEventListener('error', function (event) {
    try {
        for (let i = 10; i > 0; i--) {
            setTimeout(() => {
                document.body.innerHTML = `An error occurred: ${event.message}<br>Reloading page in ${i} seconds...<br><br>${event.filename}:${event.lineno}:${event.colno}`;
            }, (10 - i) * 1000);
        }
        setTimeout(() => {
            location.reload();
        }, 10000);
    } catch (error) {
        document.write("Ah shit.")
        setTimeout(() => {
            location.reload();
        }, 10000);
    }

}, true); 
