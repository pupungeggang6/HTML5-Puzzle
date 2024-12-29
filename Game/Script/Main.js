window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    context = canvas.getContext('2d')

    canvas.addEventListener('mouseup', mouseUp, false)

    imageLoad()
    saveInit()

    gameFrameCurrent = Date.now()
    gameFramePrevious = Date.now() - 16
    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    gameFramePrevious = gameFrameCurrent
    gameFrameCurrent = Date.now()
    delta = gameFrameCurrent - gameFramePrevious

    if (scene === 'Title') {
        loopTitle()
    } else if (scene === 'Select') {
        loopSelect()
    } else if (scene === 'Map') {
        loopMap()
    } else if (scene === 'Battle') {
        loopBattle()
    }

    gameLoop = requestAnimationFrame(loop)
}

function mouseUp(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    let button = event.button

    if (scene === 'Title') {
        mouseUpTitle({x: x, y: y}, button)
    } else if (scene === 'Select') {
        mouseUpSelect({x: x, y: y}, button)
    } else if (scene === 'Map') {
        mouseUpMap({x: x, y: y}, button)
    } else if (scene === 'Battle') {
        mouseUpBattle({x: x, y: y}, button)
    }
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        alert(`${err}\n${url}\nAt: ${line},${col}`)
        cancelAnimationFrame(gameLoop)
    }
}

function rightClick() {
    return false
}
