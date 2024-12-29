function loopTitle() {
    displayTitle()
}

function displayTitle() {
    renderInit()
    context.fillText(`Ceramic Puzzle`, UI.title.textTitle[0], UI.title.textTitle[1])
    context.strokeRect(UI.title.buttonStart[0], UI.title.buttonStart[1], UI.title.buttonStart[2], UI.title.buttonStart[3])
    context.strokeRect(UI.title.buttonErase[0], UI.title.buttonErase[1], UI.title.buttonErase[2], UI.title.buttonErase[3])
}

function mouseUpTitle(pos, button) {
    if (button === 0) {
        if (menu === false) {
            if (state === '') {
                if (pointInsideRect(pos, UI.title.buttonStart)) {
                    scene = 'Select'
                    state = ''
                }
            }
        }
    }
}
