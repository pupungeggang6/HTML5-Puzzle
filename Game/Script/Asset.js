let img = {
    block: {
        attack: new Image(),
        shield: new Image(),
        scroll: new Image(),
        energy: new Image(),
    },

    selectFrame: new Image(),
}

function imageLoad() {
    img.block.attack.src = 'Image/BlockAttack.png'
    img.block.shield.src = 'Image/BlockShield.png'
    img.block.scroll.src = 'Image/BlockScroll.png'
    img.block.energy.src = 'Image/BlockEnergy.png'

    img.selectFrame.src = 'Image/SelectFrame.png'
}
