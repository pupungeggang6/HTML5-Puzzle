function loopSelect() {
    displaySelect()
}

function displaySelect() {
    renderInit()

    context.fillText(`Select Character`, UI.select.textTitle[0], UI.select.textTitle[1])
    context.strokeRect(UI.select.buttonBack[0], UI.select.buttonBack[1], UI.select.buttonBack[2], UI.select.buttonBack[3])
    
    for (let i = 0; i < 5; i++) {
        context.strokeRect(UI.select.buttonCharacter[i][0], UI.select.buttonCharacter[i][1], UI.select.buttonCharacter[i][2], UI.select.buttonCharacter[i][3]) 
    }

    context.strokeRect(UI.select.buttonStart[0], UI.select.buttonStart[1], UI.select.buttonStart[2], UI.select.buttonStart[3])
}

function mouseUpSelect(pos, button) {
    if (button === 0) {
        if (menu === false) {
            if (pointInsideRect(pos, UI.select.buttonBack)) {
                scene = 'Title'
                state = ''
                selected.character = -1
            }

            if (state === '') {
                for (let i = 0; i < 5; i++) {
                    if (pointInsideRect(pos, UI.select.buttonCharacter[i])) {
                        selected.character = i
                    }
                }

                if (pointInsideRect(pos, UI.select.buttonStart)) {
                    if (selected.character > -1) {
                        scene = 'Battle'
                        state = 'Start'
                        adventureInit()
                        battleInit()
                    }
                }
            }
        }
    }
}
