function loopBattle() {
    displayBattle()
}

function displayBattle() {
    renderInit() 

    context.strokeRect(UI.battle.buttonMenu[0], UI.battle.buttonMenu[1], UI.battle.buttonMenu[2], UI.battle.buttonMenu[3])

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
            if (state === '') {
             
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
