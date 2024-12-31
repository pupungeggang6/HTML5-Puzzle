class Level {
}

class Board {
    block = []
    selected = []
    row = 0
    col = 0
    leftTop = null

    constructor(size, properties) {
        this.row = size[0]
        this.col = size[1]
        this.leftTop = new Vector(UI.battle.boardCenter[0] - UI.blockSize[0] / 2 * (this.col - 1), UI.battle.boardCenter[1] - UI.blockSize[1] / 2 * (this.row - 1))
        
        for (let i = 0; i < this.row; i++) {
            let temp = []
            let tempSelected = []

            for (let j = 0; j < this.col; j++) {
                let types = ['Attack', 'Shield', 'Scroll', 'Energy']
                let type = types[Math.floor(Math.random() * types.length)]
                temp.push(new Collectable({'Type': type, 'Position': [this.leftTop.x + j * UI.blockSize[0], this.leftTop.y + i * UI.blockSize[1]]}))
                tempSelected.push(0)
            }

            this.block.push(temp)
            this.selected.push(tempSelected)
        }
    }

    createZero(size) {
        let tempBoard = []

        for (let i = 0; i < this.row; i++) {
            let temp = []

            for (let j = 0; j < this.col; j++) {
                temp.push(0)
            }

            tempBoard.push(temp)
        }

        return tempBoard
    }

    findConnected(row, col) {
        let queue = []
        let selectedBlock = this.block[row][col]

        if (selectedBlock instanceof Collectable) {
            this.selected = this.createZero()

            let type = selectedBlock.type
            queue.push([row, col])

            while (queue.length > 0) {
                let first = queue[0]
                this.selected[first[0]][first[1]] = 1
                for (let i = 0; i < 4; i++) {
                    let nextRow = first[0] + neighborBlock[i][0]
                    let nextCol = first[1] + neighborBlock[i][1]
                    if (nextRow >= 0 && nextRow < this.row && nextCol >= 0 && nextCol < this.col) {
                        if (this.block[nextRow][nextCol].type === type && this.selected[nextRow][nextCol] === 0) {
                            queue.push([nextRow, nextCol])
                        }
                    }
                }
                queue.shift()
            }
        }
    }

    render() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.block[i][j].render()

                if (this.selected[i][j] === 1) {
                    context.drawImage(img.selectFrame, this.leftTop.x + j * UI.blockSize[0] - UI.blockSize[0] / 2, this.leftTop.y + i * UI.blockSize[1] - UI.blockSize[1] / 2)
                }
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
