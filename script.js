function sendMessage(msg) {
    window.webkit.messageHandlers.pythonBridge.postMessage(msg);
}

// Listen for responses from Python
function onPythonResponse(message) {
}