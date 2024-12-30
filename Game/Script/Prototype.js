class Level {
}

class Board {
    block = []
    row = 0
    col = 0

    constructor(size, properties) {
        this.row = size[0]
        this.col = size[1]
        let leftTop = new Vector(UI.battle.boardCenter[0] - UI.blockSize[0] / 2 * (this.col - 1), UI.battle.boardCenter[1] - UI.blockSize[1] / 2 * (this.row - 1))
        console.log(leftTop)
        
        for (let i = 0; i < this.row; i++) {
            let temp = []

            for (let j = 0; j < this.col; j++) {
                let types = ['Attack', 'Shield', 'Scroll', 'Energy']
                let type = types[Math.floor(Math.random() * types.length)]
                temp.push(new Collectable({'Type': type, 'Position': [leftTop.x + j * UI.blockSize[0], leftTop.y + i * UI.blockSize[1]]}))
            }

            this.block.push(temp)
        }
    }

    render() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.block[i][j].render()
            }
        }
    }
}

class Enemy {
}

class Block {
    position = null
    size = null

    constructor() {
        this.size = new Vector(UI.blockSize[0], UI.blockSize[1])
    }
}

class Collectable extends Block {
    type = ''

    constructor(properties) {
        super()
        this.type = properties['Type']
        this.position = new Vector(properties['Position'][0], properties['Position'][1])
    }

    render() {
        if (this.type === 'Attack') {
            context.drawImage(img.block.attack, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        } else if (this.type === 'Shield') {
            context.drawImage(img.block.shield, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        } else if (this.type === 'Energy') {
            context.drawImage(img.block.energy, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        } else if (this.type === 'Scroll') {
            context.drawImage(img.block.scroll, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        }
    }
}

class Vector {
    x = 0
    y = 0

    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
