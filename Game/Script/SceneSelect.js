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
}
