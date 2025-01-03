function loopBattle() {
    displayBattle()

    if (menu === false) {
        if (state === '') {
            board.moveBlock()
        }
    }
}

function displayBattle() {
    renderInit() 

    context.strokeRect(UI.battle.buttonMenu[0], UI.battle.buttonMenu[1], UI.battle.buttonMenu[2], UI.battle.buttonMenu[3])

    board.render()

    if (menu === true) {
        renderMenu()
    }
}

function mouseUpBattle(pos, button) {
    if (button === 0) {
        if (menu === false) {
            if (pointInsideRect(pos, UI.battle.buttonMenu)) {
                menu = true
            }
            if (state === 'Start') {
                state = ''
            } else if (state === '') {
                for (let i = 0; i < board.row; i++) {
                    for (let j = 0; j < board.col; j++) {
                        if (pointInsideRect(pos, [board.leftTop.x + j * UI.blockSize[0] - UI.blockSize[0] / 2, board.leftTop.y + i * UI.blockSize[1] - UI.blockSize[1] / 2, UI.blockSize[0], UI.blockSize[1]])) {
                            board.clickHandle('Normal', i, j, player)
                        }
                    }
                }
            }
        } else if (menu === true) {
            if (pointInsideRect(pos, UI.battle.buttonMenu)) {
                menu = true
            } else if (pointInsideRect(pos, UI.menu.buttonResume)) {
                menu = false
            } else if (pointInsideRect(pos, UI.menu.buttonExit)) {
                menu = false
                selected.character = -1
                scene = 'Title'
                state = ''
            }
        }
    }
}
